"use strict";
cc._RF.push(module, '2be4bQOm5xAN7D7eSJAob5o', 'PlayerInfo');
// Script/Logic/Data/Player/PlayerInfo.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Constant_1 = require("../Const/Constant");
var StorageMgr_1 = require("../../../Base/Manager/StorageMgr");
var PlayerInfo = /** @class */ (function () {
    function PlayerInfo() {
        /**用户唯一识别id,比如微信就是openid */
        this.userId = -1;
        /** 用户昵称*/
        this.nickName = 'tt';
        /** 用户头像图片的 URL。URL 最后一个数值代表正方形头像大小（有 0、46、64、96、132 数值可选，0 代表 640x640 的正方形头像，46 表示 46x46 的正方形头像，剩余数值以此类推。默认132），用户没有头像时该项为空。若用户更换头像，原有头像 URL 将失效。*/
        this.avatarUrl = '';
        /** 用户性别*/
        this.gender = 0;
        /** 用户所在国家*/
        this.country = 'cn';
        /** 用户所在城市*/
        this.city = 'sz';
        /** 服务器当前的系统时间戳 */
        this.serverTime = 0;
        /** 上一次下线时间戳 */
        this.offlineTime = 0;
        /** 当前场景 */
        this.scene = '';
        /** 开关设置 */
        this.switchSet = {};
        /** 当前体力*/
        this.power = 0;
        /** 用户金钱 */
        this.coin = 0;
        /** 用户钻石 */
        this.diamond = 0;
        /** 用户等级 */
        this.level = 1;
        /** 消除关卡(同步到的最高关卡) */
        this.mathc3Level = 1;
        /**当前章节 */
        this.chapter = 1;
        /** 当前的道具数据(背包信息) */
        this.propData = {};
        /**当前的记时时间 */
        this.timeCounter = 0;
        this.lvMap = new Map();
    }
    /**塞数据 */
    PlayerInfo.prototype.initRemotData = function (data) {
        this.lvMap.clear();
        if (data) {
            if (typeof data == 'string') {
                data = JSON.parse(data);
            }
            if (!data[Constant_1.NativeKey.PlayerInfo]) {
                this.setNormalPower();
            }
            for (var key in data) {
                if (key == Constant_1.NativeKey.PlayerInfo) {
                    this.syncPlayerData(data[key]);
                }
                else if (key.indexOf(Constant_1.NativeKey.LvDataKey.toString() + "_") != -1) {
                    this.lvMap.set(key, JSON.parse(data[key]));
                }
            }
        }
        else {
            this.setNormalPower();
        }
    };
    PlayerInfo.prototype.syncPlayerData = function (data) {
        if (typeof data == 'string')
            data = JSON.parse(data);
        for (var playerKey in data) {
            if (this[playerKey] != undefined) {
                this[playerKey] = data[playerKey];
            }
        }
    };
    PlayerInfo.prototype.setNormalPower = function () {
        var data = StorageMgr_1.StorageMgr.Storage.getObject(Constant_1.NativeKey.PlayerInfo, null);
        if (data) {
            // this.syncPlayerData(data);
            StorageMgr_1.StorageMgr.Storage.removeAll();
        }
        this.power = 30;
        this.saveData('power');
    };
    PlayerInfo.prototype.saveLastTime = function () {
        StorageMgr_1.StorageMgr.Storage.setInt(Constant_1.NativeKey.LastTime, this.serverTime);
    };
    PlayerInfo.prototype.getLastTime = function () {
        return StorageMgr_1.StorageMgr.Storage.getInt(Constant_1.NativeKey.LastTime, 0);
    };
    PlayerInfo.prototype.saveData = function (key) {
        var _this = this;
        return new Promise(function (resolve) {
            var data = StorageMgr_1.StorageMgr.Storage.getObject(Constant_1.NativeKey.PlayerInfo, {});
            data[key] = _this[key];
            StorageMgr_1.StorageMgr.Storage.setObject(Constant_1.NativeKey.PlayerInfo, data, true);
            resolve(true);
        });
    };
    PlayerInfo.prototype._saveAll = function () {
        // StorageMgr.Storage.setStorage(NativeKey.PlayerInfo, this, true);
    };
    return PlayerInfo;
}());
exports.default = PlayerInfo;

cc._RF.pop();