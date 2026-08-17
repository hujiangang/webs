import PlatformMgr from "./PlatformMgr";
import Paths from "../Utils/Paths";
import { HttpRequest } from "../Network/HttpRequest";
import { StorageMgr } from "./StorageMgr";
import Apps from "../Apps";
import RuntimeMgr from "../../Logic/Data/RuntimeMgr";
import { APPID } from "../../Logic/Data/Const/Constant";
import M from "./M";
import EventMgr from "../../Base/Manager/EventMgr";


export interface IServerConfig {
    ver: string,
    rank_banner: string,
    res_ver: string,
    conf_ver: string,
    time: number,
    rule_activity: string,
    announcement: {
        text: string, grid: Array<{ text: string, reward: {} }>
    },
    ip_addr: number,
    swicth: string
    maintain_status: string,
    maintain_content: string
}

export default class NetMgr {

    public static instance: NetMgr = null;

    public static get ins(): NetMgr {
        if (this.instance == null) {
            this.instance = new NetMgr();
        }
        return this.instance;
    }

    private access_token: string = null;
    /**过期时间 */
    private expires_in: number = 0;

    private publicHeaders: { [key: string]: string } = null;

    private reTryAuthMaxCount = 3;

    constructor() {
        //公共头!
        this.publicHeaders = !Apps.isEncode ? { 'Content-Type': 'application/x-www-form-urlencoded' } : { 'Content-Type': 'application/x-crypt-data' };  // application/json 
        this.syncAuthInfo();
    }

    /**授权接口 */
    private _auth(): Promise<any> {
        return new Promise(async (resolve) => {
            const platformData = await PlatformMgr.ins.login()
            if (platformData) {
                const url = `${Paths.MainHost}auth/login`;
                platformData['platform'] = ["h5", "wx"][PlatformMgr.ins.type - 100];
                platformData['appid'] = APPID;
                platformData['v'] = Apps.Version;
                platformData['userinfo'] = JSON.stringify(await PlatformMgr.ins.getUserInfo());
                const req = new HttpRequest(url, HttpRequest.METHOD.POST, this.publicHeaders, this._formateData(platformData));
                req.execute().then((result: { msg: string, code: number, data: { uid: string, openid: string, access_token: string, expires_in: number, userdata, awards } }) => {
                    result = this._formateResultData(result)
                    if (result && result.code == 0 && result.data) {
                        this.access_token = 'Bearer ' + result.data.access_token
                        this.expires_in = result.data.expires_in;
                        this.syncAuthInfo(result.data);
                        resolve({ uid: result.data.uid, userdata: result.data.userdata, awards: result.data.awards });
                    } else {
                        console.error('授权失败:', result);
                        resolve(null);
                    }
                });
            } else {
                resolve(null);
            }
        });
    }

    /**获取服务器相关信息与配置! */
    public async getServerData(): Promise<IServerConfig> {
        return new Promise((resolve) => {
            const url = `${Paths.MainHost}game/config`;
            const head = Object.assign({ Authorization: this.access_token }, this.publicHeaders);
            const req = new HttpRequest(url, HttpRequest.METHOD.POST, head, null);
            req.execute().then((result) => {
                result = this._formateResultData(result);
                if (result && result.code == 0) {
                    resolve(result.data);
                } else {
                    resolve(null);
                }
            });
        })
    }

    /**获取用户数据 */
    public async getUserData(): Promise<any> {
        let userdata = null;
        if (this._isExpiresed) {
            userdata = await this._auth()
        } else {
            userdata = await new Promise((resolve) => {
                const url = `${Paths.MainHost}user/data`;
                const head = Object.assign({ Authorization: this.access_token }, this.publicHeaders);
                const req = new HttpRequest(url, HttpRequest.METHOD.GET, head, null);
                req.execute().then((result: { msg: string, code: number, data: string }) => {
                    result = this._formateResultData(result);
                    if (result && result.code == 0) {
                        resolve(result.data);
                    } else {
                        resolve(null);
                    }
                });
            })
        }
        return userdata;
    }

    /**提交用户数据 */
    public async putUserData(data: any, depth: number = 0): Promise<boolean> {
        return new Promise(async (resolve) => {
            let reqData = data;
            if (typeof data != 'string') {
                try {
                    reqData = { content: JSON.stringify(data) };
                } catch (error) { }
            }
            if (this._isExpiresed) {
                if (depth < this.reTryAuthMaxCount) {
                    await this._auth()
                    resolve(this.putUserData(data, depth + 1));
                } else {
                    resolve(null);
                }
            } else {
                const url = `${Paths.MainHost}user/save`
                const head = Object.assign({ Authorization: this.access_token }, this.publicHeaders);
                const req = new HttpRequest(url, HttpRequest.METHOD.POST, head, this._formateData(reqData));
                req.execute().then((result) => {
                    result = this._formateResultData(result);
                    console.warn('user/save:', result, reqData);
                    resolve(result && result.code == 0);
                });
            }
        });
    }

    /**
     * 提交用户数据
     * @param data {name:["BarrierRank","ScoreRank"],value,extra}
     */
    public async putRankData(data: { name: string, value: number, extra?: any }, depth: number = 0) {
        if (this._isExpiresed) {
            if (depth < this.reTryAuthMaxCount) {
                await this._auth()
                this.putRankData(data, depth + 1);
            }
        } else {
            const url = `${Paths.MainHost}rank/put`;
            const head = Object.assign({ Authorization: this.access_token }, this.publicHeaders);
            const req = new HttpRequest(url, HttpRequest.METHOD.POST, head, this._formateData(data));
            req.execute().then((result) => {
                result = this._formateResultData(result);
                console.warn(result);
            });
        }
    }

    public putDailyTaskProgress(id: number | string, count: number, depth: number = 0) {
        return new Promise(async (resolve, reject) => {
            if (this._isExpiresed) {
                if (depth < this.reTryAuthMaxCount) {
                    await this._auth();
                    resolve(this.putDailyTaskProgress(id, count, depth + 1));
                }
            } else {
                const url = `${Paths.MainHost}task/progress`
                const head = Object.assign({ Authorization: this.access_token }, this.publicHeaders);
                const reqData = { taskid: id, value: count };
                const req = new HttpRequest(url, HttpRequest.METHOD.POST, head, this._formateData(reqData), true);
                req.execute().then((result: { msg: string, code: number, data: { [id: string]: number } }) => {
                    if (result && result.code == 0) {
                        resolve(result.data);
                    } else {
                        resolve(null);
                    }
                })
            }
        });
    }

    /**
     * 检测任务是否完成
     * @param taskid 
     * @param retryCount 当前重试的提交次数
     */
    public async checkTaskIsOK(taskid: number, retryCount: number = 0): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            if (this._isExpiresed) {
                if (retryCount < this.reTryAuthMaxCount) {
                    await this._auth();
                    resolve(this.checkTaskIsOK(taskid, retryCount + 1));
                }
            } else {
                const url = `${Paths.MainHost}task/check`
                const head = Object.assign({ Authorization: this.access_token }, this.publicHeaders);
                const req = new HttpRequest(url, HttpRequest.METHOD.POST, head, this._formateData({ taskid }), true);
                req.execute().then((result: { msg: string, code: number, data: boolean }) => {
                    if (result && result.data) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                })
            }
        });
    }

    /**
     * 获取周期任务完成进度列表
     * @param retryCount 当前重试的提交次数 
     */
    public async getDailyTask(retryCount: number = 0): Promise<any> {
        return new Promise(async (resolve, reject) => {
            if (this._isExpiresed) {
                if (retryCount < this.reTryAuthMaxCount) {
                    await this._auth();
                    resolve(this.getDailyTask(retryCount + 1));
                }
            } else {
                const url = `${Paths.MainHost}task/list`
                const head = Object.assign({ Authorization: this.access_token }, this.publicHeaders);
                const req = new HttpRequest(url, HttpRequest.METHOD.POST, head, null, true);
                req.execute().then((result: { msg: string, code: number, data: { [id: string]: number } }) => {
                    if (result && result.code == 0) {
                        resolve(result.data);
                    } else {
                        resolve(null);
                    }
                })
            }
        });
    }

    /**
     * 获取排行信息
     * @param data {name:["BarrierRank,ScoreRank"],type:["All,Daily,Weekly,Monthly"]}
     * @param retryCount 
     */
    public async getRankData(data: { name: string, type: string } = null, retryCount: number = 0): Promise<any> {
        return new Promise(async (resolve) => {
            if (this._isExpiresed) {
                if (retryCount < this.reTryAuthMaxCount) {
                    await this._auth();
                    resolve(this.getRankData(data, retryCount + 1));
                }
            } else {
                const url = `${Paths.MainHost}rank/list`
                data = data || { name: 'BarrierRank', type: 'All' };
                const head = Object.assign({ Authorization: this.access_token }, this.publicHeaders);
                const req = new HttpRequest(url, HttpRequest.METHOD.POST, head, this._formateData(data));
                req.execute().then((result: { msg: string, code: number, data: any }) => {
                    result = this._formateResultData(result);
                    if (result && result.code == 0) {
                        resolve(result.data);
                    } else {
                        resolve(null);
                    }
                });
            }
        })
    }

    /**
    * 离开访问
    * @param friendsUid 
    * @param retryCount 
    */
    public async exitVisit(friendsUid: number | string, retryCount: number = 0): Promise<any> {
        return new Promise(async (resolve) => {
            if (!friendsUid) {
                return resolve(null);
            }
            if (this._isExpiresed) {
                if (retryCount < this.reTryAuthMaxCount) {
                    await this._auth();
                    resolve(this.visitFriend(retryCount + 1));
                }
            } else {
                const url = `${Paths.MainHost}user/deleteVisitListId`
                const head = Object.assign({ Authorization: this.access_token }, this.publicHeaders);
                const req = new HttpRequest(url, HttpRequest.METHOD.POST, head, this._formateData({ visitId: friendsUid }));
                req.execute().then((result: { msg: string, code: number, data: any }) => {
                    result = this._formateResultData(result);
                    if (result && result.code == 0) {
                        resolve(result.data);
                    } else {
                        resolve(null);
                    }
                });
            }
        })
    }

    /**
     * 访问一个好友
     * @param friendsUid 
     * @param retryCount 
     */
    public async visitFriend(friendsUid: number | string, retryCount: number = 0): Promise<any> {
        return new Promise(async (resolve) => {
            if (!friendsUid) {
                return resolve(null);
            }
            if (this._isExpiresed) {
                if (retryCount < this.reTryAuthMaxCount) {
                    await this._auth();
                    resolve(this.visitFriend(retryCount + 1));
                }
            } else {
                const url = `${Paths.MainHost}user/visit`
                const head = Object.assign({ Authorization: this.access_token }, this.publicHeaders);
                const req = new HttpRequest(url, HttpRequest.METHOD.POST, head, this._formateData({ uid: friendsUid }));
                req.execute().then((result: { msg: string, code: number, data: any }) => {
                    result = this._formateResultData(result);
                    if (result && result.code == 0) {
                        resolve(result.data);
                    } else {
                        resolve(null);
                    }
                });
            }
        })
    }

    /**
    * 互动(点赞,分享...)
    * @param retryCount 
    */
    public async interactive(friendsUid: string | number, eventId: number, retryCount: number = 0): Promise<any> {
        return new Promise(async (resolve) => {
            if (this._isExpiresed) {
                if (retryCount < this.reTryAuthMaxCount) {
                    await this._auth();
                    resolve(this.getFriendList(retryCount + 1));
                }
            } else {
                const url = `${Paths.MainHost}user/interactive`
                const head = Object.assign({ Authorization: this.access_token }, this.publicHeaders);
                const req = new HttpRequest(url, HttpRequest.METHOD.POST, head, this._formateData({ uid: friendsUid, event: eventId }));
                req.execute().then((result: { msg: string, code: number, data: any }) => {
                    result = this._formateResultData(result);
                    if (result && result.code == 0) {
                        resolve(result.msg);
                    } else {
                        resolve(null);
                    }
                });
            }
        })
    }

    /**
     * 获取事件列表
     * @param retryCount 
     */
    public async getInteractiveList(retryCount: number = 0): Promise<any> {
        return new Promise(async (resolve) => {
            if (this._isExpiresed) {
                if (retryCount < this.reTryAuthMaxCount) {
                    await this._auth();
                    resolve(this.getFriendList(retryCount + 1));
                }
            } else {
                const url = `${Paths.MainHost}user/interactiveList`
                const head = Object.assign({ Authorization: this.access_token }, this.publicHeaders);
                const req = new HttpRequest(url, HttpRequest.METHOD.GET, head);
                req.execute().then((result: { msg: string, code: number, data: any }) => {
                    result = this._formateResultData(result);
                    if (result && result.code == 0) {
                        resolve(result.data);
                    } else {
                        //test mock   
                        resolve(null);
                    }
                });
            }
        })
    }

    /**
     * 获取在线访问用户列表
     * @param retryCount 
     */
    public async getOnlineList(retryCount: number = 0): Promise<any> {
        return new Promise(async (resolve) => {
            if (!M.runtime.UserId) {
                return resolve(null);
            }
            if (this._isExpiresed) {
                if (retryCount < this.reTryAuthMaxCount) {
                    await this._auth();
                    resolve(this.getFriendList(retryCount + 1));
                }
            } else {
                const url = `${Paths.MainHost}user/visitList`
                const head = Object.assign({ Authorization: this.access_token }, this.publicHeaders);
                const req = new HttpRequest(url, HttpRequest.METHOD.POST, head, this._formateData({ uid: M.runtime.UserId }));
                req.execute().then((result: { msg: string, code: number, data: any }) => {
                    result = this._formateResultData(result);
                    if (result && result.code == 0) {
                        resolve(result.data);
                    } else {
                        resolve(null);
                    }
                });
            }
        })
    }

    /**
     * 获取好友列表 
     * @param retryCount 
     */
    public async getFriendList(retryCount: number = 0): Promise<any> {
        return new Promise(async (resolve) => {
            if (!M.runtime.UserId) {
                return resolve(null);
            }
            if (this._isExpiresed) {
                if (retryCount < this.reTryAuthMaxCount) {
                    await this._auth();
                    resolve(this.getFriendList(retryCount + 1));
                }
            } else {
                const url = `${Paths.MainHost}user/inviteList`
                const head = Object.assign({ Authorization: this.access_token }, this.publicHeaders);
                const req = new HttpRequest(url, HttpRequest.METHOD.POST, head, this._formateData({ uid: M.runtime.UserId }));
                req.execute().then((result: { msg: string, code: number, data: any }) => {
                    result = this._formateResultData(result);
                    if (result && result.code == 0) {
                        resolve(result.data);
                    } else {
                        resolve(null);
                    }
                });
            }
        })
    }

    /**
     * 添加好友
     * @param uid 
     */
    public async addFriend(uid: number) {
        console.error('addFriend1', M.runtime.UserId);

        if (M.runtime.UserId == uid) {
            return null;
        }
        return new Promise(async (resolve) => {
            const url = `${Paths.MainHost}user/invite`
            const data = { ref_uid: uid };
            const head = Object.assign({ Authorization: this.access_token }, this.publicHeaders);
            const req = new HttpRequest(url, HttpRequest.METHOD.POST, head, this._formateData(data), true);
            req.execute().then((result: { msg: string, code: number, data: any }) => {
                console.error('addFriend2:', result);
                if (result && result.code == 0) {
                    resolve(result.data);
                } else {
                    resolve(null);
                }
            });
        })
    }


    /**
     * 点击分享进入游戏
     * @param uid 
     */
    public async clickShareEnterGame(uid: number) {
        if (M.runtime.UserId == uid) {
            return null;
        }


        return new Promise(async (resolve) => {
            const url = `${Paths.MainHost}user/postShareUserId`
            const data = { uid: uid };
            const head = Object.assign({ Authorization: this.access_token }, this.publicHeaders);
            const req = new HttpRequest(url, HttpRequest.METHOD.POST, head, this._formateData(data), true);
            req.execute().then((result: { msg: string, code: number, data: any }) => {
                console.error(result);
                if (result && result.code == 0) {
                    resolve(null);
                } else {
                    resolve(null);
                }
            });
        })
    }

    /**
     * 关卡失败每秒查询 分享进入游戏加步数
     * @param uid 
     */
    public async AskQueryWxFriendClickShare(uid: number) {
        cc.log("每秒查询好友点击");
        return new Promise(async (resolve) => {
            const url = `${Paths.MainHost}user/getShareUserMark`
            const data = { uid: uid };
            const head = Object.assign({ Authorization: this.access_token }, this.publicHeaders);
            const req = new HttpRequest(url, HttpRequest.METHOD.POST, head, this._formateData(data), true);
            req.execute().then((result: { msg: string, code: number, data: any }) => {
                console.error(result);
                if (result && result.code == 0) {
                    resolve(result.data);
                } else {
                    resolve(null);
                }
            });
        })
    }



    /**登录 */
    public async login(reAuth: boolean = false): Promise<{ uid: number, userdata: any, awards: Array<{ id: number, cnt: number }> }> {
        let data = await this._auth();;
        // if (this._isExpiresed || reAuth) {
        //     userData = await this._auth();
        // } else {
        //     userData = await this.getUserData();
        // }
        data && console.log('登录成功!');
        return data;
    }

    // 清理账号数据
    public async cleanPlayer() {
        return new Promise(async (resolve) => {
            // 'http://10.100.53:9501/api/v1/' : 'https://xyxhy.ifunsky.com/

            const url = "https://xyx-hy.iky.com/Backend/GM/delUser?app=gmc&sign=0lj8ls.mh92&uid=" + RuntimeMgr.ins.getUserId();//`${Paths.MainHost}rank/put`;
            const head = Object.assign({ Authorization: this.access_token }, this.publicHeaders);
            const req = new HttpRequest(url, HttpRequest.METHOD.POST, head, "");
            req.execute().then((result) => {
                // result = this._formateResultData(result);
                console.warn(result);
                resolve(true);
            });
        });
    }

    /**格式化发送数据 */
    private _formateData(data): string {
        let result = data;
        if (!Apps.isEncode) {
            result = this.formatSearchParams(data);
        } else {
            result = this.xorCrypt(JSON.stringify(data));
        }
        return result;
    }

    /**格式化结果数据 */
    private _formateResultData(data) {
        let result = data;
        if (Apps.isEncode) {
            result = this.xorCrypt(data);
        }
        try {
            result = JSON.parse(result);
        } catch (error) {
            try {
                result = JSON.parse(result);
            } catch (error) {
                console.error(error);
                result = null;
            }
        }
        return result;
    }

    /**拼接url字串 */
    private formatSearchParams(data: any): string {
        let str = null;
        for (const key in data) {
            const v = data[key];
            str = str == null ? '' : (str + '&');
            str += `${key}=${v == 'null' ? '' : v}`
        }
        return str;
    }

    /**加密字串算法! */
    private xorCrypt(str): string {
        let output = ''
        let key = 6
        for (var i = 0; i < str.length; ++i) {
            output += String.fromCharCode(key ^ str.charCodeAt(i))
        }
        return output
    }

    /**是否过期 */
    private get _isExpiresed(): boolean {
        return false;//Apps.isOpenNet ? this.expires_in - (Date.now() / 1000) <= 0 : Apps.isOpenNet;
    }

    /**
    * 双向同步接口!
    * @param info 
    */
    private syncAuthInfo(info?: any) {
        if (info) {
            StorageMgr.Storage.setObject('AuthInfo', { expires_in: info.expires_in, access_token: 'Bearer ' + info.access_token }, false);
        } else {
            const nativeCache: any = StorageMgr.Storage.getObject('AuthInfo', null);
            if (nativeCache) {
                this.expires_in = nativeCache.expires_in;
                this.access_token = nativeCache.access_token;
            }
        }
    }
}