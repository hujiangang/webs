"use strict";
cc._RF.push(module, '304739Pt39JFIg5Ch23iiH5', 'NetMgr');
// Script/Base/Manager/NetMgr.ts

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var PlatformMgr_1 = require("./PlatformMgr");
var Paths_1 = require("../Utils/Paths");
var HttpRequest_1 = require("../Network/HttpRequest");
var StorageMgr_1 = require("./StorageMgr");
var Apps_1 = require("../Apps");
var RuntimeMgr_1 = require("../../Logic/Data/RuntimeMgr");
var Constant_1 = require("../../Logic/Data/Const/Constant");
var M_1 = require("./M");
var NetMgr = /** @class */ (function () {
    function NetMgr() {
        this.access_token = null;
        /**过期时间 */
        this.expires_in = 0;
        this.publicHeaders = null;
        this.reTryAuthMaxCount = 3;
        //公共头!
        this.publicHeaders = !Apps_1.default.isEncode ? { 'Content-Type': 'application/x-www-form-urlencoded' } : { 'Content-Type': 'application/x-crypt-data' }; // application/json 
        this.syncAuthInfo();
    }
    Object.defineProperty(NetMgr, "ins", {
        get: function () {
            if (this.instance == null) {
                this.instance = new NetMgr();
            }
            return this.instance;
        },
        enumerable: false,
        configurable: true
    });
    /**授权接口 */
    NetMgr.prototype._auth = function () {
        var _this = this;
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var platformData, url, _a, _b, _c, _d, req;
            var _this = this;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, PlatformMgr_1.default.ins.login()];
                    case 1:
                        platformData = _e.sent();
                        if (!platformData) return [3 /*break*/, 3];
                        url = Paths_1.default.MainHost + "auth/login";
                        platformData['platform'] = ["h5", "wx"][PlatformMgr_1.default.ins.type - 100];
                        platformData['appid'] = Constant_1.APPID;
                        platformData['v'] = Apps_1.default.Version;
                        _a = platformData;
                        _b = 'userinfo';
                        _d = (_c = JSON).stringify;
                        return [4 /*yield*/, PlatformMgr_1.default.ins.getUserInfo()];
                    case 2:
                        _a[_b] = _d.apply(_c, [_e.sent()]);
                        req = new HttpRequest_1.HttpRequest(url, HttpRequest_1.HttpRequest.METHOD.POST, this.publicHeaders, this._formateData(platformData));
                        req.execute().then(function (result) {
                            result = _this._formateResultData(result);
                            if (result && result.code == 0 && result.data) {
                                _this.access_token = 'Bearer ' + result.data.access_token;
                                _this.expires_in = result.data.expires_in;
                                _this.syncAuthInfo(result.data);
                                resolve({ uid: result.data.uid, userdata: result.data.userdata, awards: result.data.awards });
                            }
                            else {
                                console.error('授权失败:', result);
                                resolve(null);
                            }
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        resolve(null);
                        _e.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    /**获取服务器相关信息与配置! */
    NetMgr.prototype.getServerData = function () {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        var url = Paths_1.default.MainHost + "game/config";
                        var head = Object.assign({ Authorization: _this.access_token }, _this.publicHeaders);
                        var req = new HttpRequest_1.HttpRequest(url, HttpRequest_1.HttpRequest.METHOD.POST, head, null);
                        req.execute().then(function (result) {
                            result = _this._formateResultData(result);
                            if (result && result.code == 0) {
                                resolve(result.data);
                            }
                            else {
                                resolve(null);
                            }
                        });
                    })];
            });
        });
    };
    /**获取用户数据 */
    NetMgr.prototype.getUserData = function () {
        return __awaiter(this, void 0, Promise, function () {
            var userdata;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userdata = null;
                        if (!this._isExpiresed) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._auth()];
                    case 1:
                        userdata = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, new Promise(function (resolve) {
                            var url = Paths_1.default.MainHost + "user/data";
                            var head = Object.assign({ Authorization: _this.access_token }, _this.publicHeaders);
                            var req = new HttpRequest_1.HttpRequest(url, HttpRequest_1.HttpRequest.METHOD.GET, head, null);
                            req.execute().then(function (result) {
                                result = _this._formateResultData(result);
                                if (result && result.code == 0) {
                                    resolve(result.data);
                                }
                                else {
                                    resolve(null);
                                }
                            });
                        })];
                    case 3:
                        userdata = _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, userdata];
                }
            });
        });
    };
    /**提交用户数据 */
    NetMgr.prototype.putUserData = function (data, depth) {
        if (depth === void 0) { depth = 0; }
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var reqData, url, head, req;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    reqData = data;
                                    if (typeof data != 'string') {
                                        try {
                                            reqData = { content: JSON.stringify(data) };
                                        }
                                        catch (error) { }
                                    }
                                    if (!this._isExpiresed) return [3 /*break*/, 4];
                                    if (!(depth < this.reTryAuthMaxCount)) return [3 /*break*/, 2];
                                    return [4 /*yield*/, this._auth()];
                                case 1:
                                    _a.sent();
                                    resolve(this.putUserData(data, depth + 1));
                                    return [3 /*break*/, 3];
                                case 2:
                                    resolve(null);
                                    _a.label = 3;
                                case 3: return [3 /*break*/, 5];
                                case 4:
                                    url = Paths_1.default.MainHost + "user/save";
                                    head = Object.assign({ Authorization: this.access_token }, this.publicHeaders);
                                    req = new HttpRequest_1.HttpRequest(url, HttpRequest_1.HttpRequest.METHOD.POST, head, this._formateData(reqData));
                                    req.execute().then(function (result) {
                                        result = _this._formateResultData(result);
                                        console.warn('user/save:', result, reqData);
                                        resolve(result && result.code == 0);
                                    });
                                    _a.label = 5;
                                case 5: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    /**
     * 提交用户数据
     * @param data {name:["BarrierRank","ScoreRank"],value,extra}
     */
    NetMgr.prototype.putRankData = function (data, depth) {
        if (depth === void 0) { depth = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var url, head, req;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._isExpiresed) return [3 /*break*/, 3];
                        if (!(depth < this.reTryAuthMaxCount)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._auth()];
                    case 1:
                        _a.sent();
                        this.putRankData(data, depth + 1);
                        _a.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        url = Paths_1.default.MainHost + "rank/put";
                        head = Object.assign({ Authorization: this.access_token }, this.publicHeaders);
                        req = new HttpRequest_1.HttpRequest(url, HttpRequest_1.HttpRequest.METHOD.POST, head, this._formateData(data));
                        req.execute().then(function (result) {
                            result = _this._formateResultData(result);
                            console.warn(result);
                        });
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    NetMgr.prototype.putDailyTaskProgress = function (id, count, depth) {
        var _this = this;
        if (depth === void 0) { depth = 0; }
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var url, head, reqData, req;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._isExpiresed) return [3 /*break*/, 3];
                        if (!(depth < this.reTryAuthMaxCount)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._auth()];
                    case 1:
                        _a.sent();
                        resolve(this.putDailyTaskProgress(id, count, depth + 1));
                        _a.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        url = Paths_1.default.MainHost + "task/progress";
                        head = Object.assign({ Authorization: this.access_token }, this.publicHeaders);
                        reqData = { taskid: id, value: count };
                        req = new HttpRequest_1.HttpRequest(url, HttpRequest_1.HttpRequest.METHOD.POST, head, this._formateData(reqData), true);
                        req.execute().then(function (result) {
                            if (result && result.code == 0) {
                                resolve(result.data);
                            }
                            else {
                                resolve(null);
                            }
                        });
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    /**
     * 检测任务是否完成
     * @param taskid
     * @param retryCount 当前重试的提交次数
     */
    NetMgr.prototype.checkTaskIsOK = function (taskid, retryCount) {
        if (retryCount === void 0) { retryCount = 0; }
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var url, head, req;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!this._isExpiresed) return [3 /*break*/, 3];
                                    if (!(retryCount < this.reTryAuthMaxCount)) return [3 /*break*/, 2];
                                    return [4 /*yield*/, this._auth()];
                                case 1:
                                    _a.sent();
                                    resolve(this.checkTaskIsOK(taskid, retryCount + 1));
                                    _a.label = 2;
                                case 2: return [3 /*break*/, 4];
                                case 3:
                                    url = Paths_1.default.MainHost + "task/check";
                                    head = Object.assign({ Authorization: this.access_token }, this.publicHeaders);
                                    req = new HttpRequest_1.HttpRequest(url, HttpRequest_1.HttpRequest.METHOD.POST, head, this._formateData({ taskid: taskid }), true);
                                    req.execute().then(function (result) {
                                        if (result && result.data) {
                                            resolve(true);
                                        }
                                        else {
                                            resolve(false);
                                        }
                                    });
                                    _a.label = 4;
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    /**
     * 获取周期任务完成进度列表
     * @param retryCount 当前重试的提交次数
     */
    NetMgr.prototype.getDailyTask = function (retryCount) {
        if (retryCount === void 0) { retryCount = 0; }
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var url, head, req;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!this._isExpiresed) return [3 /*break*/, 3];
                                    if (!(retryCount < this.reTryAuthMaxCount)) return [3 /*break*/, 2];
                                    return [4 /*yield*/, this._auth()];
                                case 1:
                                    _a.sent();
                                    resolve(this.getDailyTask(retryCount + 1));
                                    _a.label = 2;
                                case 2: return [3 /*break*/, 4];
                                case 3:
                                    url = Paths_1.default.MainHost + "task/list";
                                    head = Object.assign({ Authorization: this.access_token }, this.publicHeaders);
                                    req = new HttpRequest_1.HttpRequest(url, HttpRequest_1.HttpRequest.METHOD.POST, head, null, true);
                                    req.execute().then(function (result) {
                                        if (result && result.code == 0) {
                                            resolve(result.data);
                                        }
                                        else {
                                            resolve(null);
                                        }
                                    });
                                    _a.label = 4;
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    /**
     * 获取排行信息
     * @param data {name:["BarrierRank,ScoreRank"],type:["All,Daily,Weekly,Monthly"]}
     * @param retryCount
     */
    NetMgr.prototype.getRankData = function (data, retryCount) {
        if (data === void 0) { data = null; }
        if (retryCount === void 0) { retryCount = 0; }
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var url, head, req;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!this._isExpiresed) return [3 /*break*/, 3];
                                    if (!(retryCount < this.reTryAuthMaxCount)) return [3 /*break*/, 2];
                                    return [4 /*yield*/, this._auth()];
                                case 1:
                                    _a.sent();
                                    resolve(this.getRankData(data, retryCount + 1));
                                    _a.label = 2;
                                case 2: return [3 /*break*/, 4];
                                case 3:
                                    url = Paths_1.default.MainHost + "rank/list";
                                    data = data || { name: 'BarrierRank', type: 'All' };
                                    head = Object.assign({ Authorization: this.access_token }, this.publicHeaders);
                                    req = new HttpRequest_1.HttpRequest(url, HttpRequest_1.HttpRequest.METHOD.POST, head, this._formateData(data));
                                    req.execute().then(function (result) {
                                        result = _this._formateResultData(result);
                                        if (result && result.code == 0) {
                                            resolve(result.data);
                                        }
                                        else {
                                            resolve(null);
                                        }
                                    });
                                    _a.label = 4;
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    /**
    * 离开访问
    * @param friendsUid
    * @param retryCount
    */
    NetMgr.prototype.exitVisit = function (friendsUid, retryCount) {
        if (retryCount === void 0) { retryCount = 0; }
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var url, head, req;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!friendsUid) {
                                        return [2 /*return*/, resolve(null)];
                                    }
                                    if (!this._isExpiresed) return [3 /*break*/, 3];
                                    if (!(retryCount < this.reTryAuthMaxCount)) return [3 /*break*/, 2];
                                    return [4 /*yield*/, this._auth()];
                                case 1:
                                    _a.sent();
                                    resolve(this.visitFriend(retryCount + 1));
                                    _a.label = 2;
                                case 2: return [3 /*break*/, 4];
                                case 3:
                                    url = Paths_1.default.MainHost + "user/deleteVisitListId";
                                    head = Object.assign({ Authorization: this.access_token }, this.publicHeaders);
                                    req = new HttpRequest_1.HttpRequest(url, HttpRequest_1.HttpRequest.METHOD.POST, head, this._formateData({ visitId: friendsUid }));
                                    req.execute().then(function (result) {
                                        result = _this._formateResultData(result);
                                        if (result && result.code == 0) {
                                            resolve(result.data);
                                        }
                                        else {
                                            resolve(null);
                                        }
                                    });
                                    _a.label = 4;
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    /**
     * 访问一个好友
     * @param friendsUid
     * @param retryCount
     */
    NetMgr.prototype.visitFriend = function (friendsUid, retryCount) {
        if (retryCount === void 0) { retryCount = 0; }
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var url, head, req;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!friendsUid) {
                                        return [2 /*return*/, resolve(null)];
                                    }
                                    if (!this._isExpiresed) return [3 /*break*/, 3];
                                    if (!(retryCount < this.reTryAuthMaxCount)) return [3 /*break*/, 2];
                                    return [4 /*yield*/, this._auth()];
                                case 1:
                                    _a.sent();
                                    resolve(this.visitFriend(retryCount + 1));
                                    _a.label = 2;
                                case 2: return [3 /*break*/, 4];
                                case 3:
                                    url = Paths_1.default.MainHost + "user/visit";
                                    head = Object.assign({ Authorization: this.access_token }, this.publicHeaders);
                                    req = new HttpRequest_1.HttpRequest(url, HttpRequest_1.HttpRequest.METHOD.POST, head, this._formateData({ uid: friendsUid }));
                                    req.execute().then(function (result) {
                                        result = _this._formateResultData(result);
                                        if (result && result.code == 0) {
                                            resolve(result.data);
                                        }
                                        else {
                                            resolve(null);
                                        }
                                    });
                                    _a.label = 4;
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    /**
    * 互动(点赞,分享...)
    * @param retryCount
    */
    NetMgr.prototype.interactive = function (friendsUid, eventId, retryCount) {
        if (retryCount === void 0) { retryCount = 0; }
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var url, head, req;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!this._isExpiresed) return [3 /*break*/, 3];
                                    if (!(retryCount < this.reTryAuthMaxCount)) return [3 /*break*/, 2];
                                    return [4 /*yield*/, this._auth()];
                                case 1:
                                    _a.sent();
                                    resolve(this.getFriendList(retryCount + 1));
                                    _a.label = 2;
                                case 2: return [3 /*break*/, 4];
                                case 3:
                                    url = Paths_1.default.MainHost + "user/interactive";
                                    head = Object.assign({ Authorization: this.access_token }, this.publicHeaders);
                                    req = new HttpRequest_1.HttpRequest(url, HttpRequest_1.HttpRequest.METHOD.POST, head, this._formateData({ uid: friendsUid, event: eventId }));
                                    req.execute().then(function (result) {
                                        result = _this._formateResultData(result);
                                        if (result && result.code == 0) {
                                            resolve(result.msg);
                                        }
                                        else {
                                            resolve(null);
                                        }
                                    });
                                    _a.label = 4;
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    /**
     * 获取事件列表
     * @param retryCount
     */
    NetMgr.prototype.getInteractiveList = function (retryCount) {
        if (retryCount === void 0) { retryCount = 0; }
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var url, head, req;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!this._isExpiresed) return [3 /*break*/, 3];
                                    if (!(retryCount < this.reTryAuthMaxCount)) return [3 /*break*/, 2];
                                    return [4 /*yield*/, this._auth()];
                                case 1:
                                    _a.sent();
                                    resolve(this.getFriendList(retryCount + 1));
                                    _a.label = 2;
                                case 2: return [3 /*break*/, 4];
                                case 3:
                                    url = Paths_1.default.MainHost + "user/interactiveList";
                                    head = Object.assign({ Authorization: this.access_token }, this.publicHeaders);
                                    req = new HttpRequest_1.HttpRequest(url, HttpRequest_1.HttpRequest.METHOD.GET, head);
                                    req.execute().then(function (result) {
                                        result = _this._formateResultData(result);
                                        if (result && result.code == 0) {
                                            resolve(result.data);
                                        }
                                        else {
                                            //test mock   
                                            resolve(null);
                                        }
                                    });
                                    _a.label = 4;
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    /**
     * 获取在线访问用户列表
     * @param retryCount
     */
    NetMgr.prototype.getOnlineList = function (retryCount) {
        if (retryCount === void 0) { retryCount = 0; }
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var url, head, req;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!M_1.default.runtime.UserId) {
                                        return [2 /*return*/, resolve(null)];
                                    }
                                    if (!this._isExpiresed) return [3 /*break*/, 3];
                                    if (!(retryCount < this.reTryAuthMaxCount)) return [3 /*break*/, 2];
                                    return [4 /*yield*/, this._auth()];
                                case 1:
                                    _a.sent();
                                    resolve(this.getFriendList(retryCount + 1));
                                    _a.label = 2;
                                case 2: return [3 /*break*/, 4];
                                case 3:
                                    url = Paths_1.default.MainHost + "user/visitList";
                                    head = Object.assign({ Authorization: this.access_token }, this.publicHeaders);
                                    req = new HttpRequest_1.HttpRequest(url, HttpRequest_1.HttpRequest.METHOD.POST, head, this._formateData({ uid: M_1.default.runtime.UserId }));
                                    req.execute().then(function (result) {
                                        result = _this._formateResultData(result);
                                        if (result && result.code == 0) {
                                            resolve(result.data);
                                        }
                                        else {
                                            resolve(null);
                                        }
                                    });
                                    _a.label = 4;
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    /**
     * 获取好友列表
     * @param retryCount
     */
    NetMgr.prototype.getFriendList = function (retryCount) {
        if (retryCount === void 0) { retryCount = 0; }
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var url, head, req;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!M_1.default.runtime.UserId) {
                                        return [2 /*return*/, resolve(null)];
                                    }
                                    if (!this._isExpiresed) return [3 /*break*/, 3];
                                    if (!(retryCount < this.reTryAuthMaxCount)) return [3 /*break*/, 2];
                                    return [4 /*yield*/, this._auth()];
                                case 1:
                                    _a.sent();
                                    resolve(this.getFriendList(retryCount + 1));
                                    _a.label = 2;
                                case 2: return [3 /*break*/, 4];
                                case 3:
                                    url = Paths_1.default.MainHost + "user/inviteList";
                                    head = Object.assign({ Authorization: this.access_token }, this.publicHeaders);
                                    req = new HttpRequest_1.HttpRequest(url, HttpRequest_1.HttpRequest.METHOD.POST, head, this._formateData({ uid: M_1.default.runtime.UserId }));
                                    req.execute().then(function (result) {
                                        result = _this._formateResultData(result);
                                        if (result && result.code == 0) {
                                            resolve(result.data);
                                        }
                                        else {
                                            resolve(null);
                                        }
                                    });
                                    _a.label = 4;
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    /**
     * 添加好友
     * @param uid
     */
    NetMgr.prototype.addFriend = function (uid) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                console.error('addFriend1', M_1.default.runtime.UserId);
                if (M_1.default.runtime.UserId == uid) {
                    return [2 /*return*/, null];
                }
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var url, data, head, req;
                        return __generator(this, function (_a) {
                            url = Paths_1.default.MainHost + "user/invite";
                            data = { ref_uid: uid };
                            head = Object.assign({ Authorization: this.access_token }, this.publicHeaders);
                            req = new HttpRequest_1.HttpRequest(url, HttpRequest_1.HttpRequest.METHOD.POST, head, this._formateData(data), true);
                            req.execute().then(function (result) {
                                console.error('addFriend2:', result);
                                if (result && result.code == 0) {
                                    resolve(result.data);
                                }
                                else {
                                    resolve(null);
                                }
                            });
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    /**
     * 点击分享进入游戏
     * @param uid
     */
    NetMgr.prototype.clickShareEnterGame = function (uid) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (M_1.default.runtime.UserId == uid) {
                    return [2 /*return*/, null];
                }
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var url, data, head, req;
                        return __generator(this, function (_a) {
                            url = Paths_1.default.MainHost + "user/postShareUserId";
                            data = { uid: uid };
                            head = Object.assign({ Authorization: this.access_token }, this.publicHeaders);
                            req = new HttpRequest_1.HttpRequest(url, HttpRequest_1.HttpRequest.METHOD.POST, head, this._formateData(data), true);
                            req.execute().then(function (result) {
                                console.error(result);
                                if (result && result.code == 0) {
                                    resolve(null);
                                }
                                else {
                                    resolve(null);
                                }
                            });
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    /**
     * 关卡失败每秒查询 分享进入游戏加步数
     * @param uid
     */
    NetMgr.prototype.AskQueryWxFriendClickShare = function (uid) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                cc.log("每秒查询好友点击");
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var url, data, head, req;
                        return __generator(this, function (_a) {
                            url = Paths_1.default.MainHost + "user/getShareUserMark";
                            data = { uid: uid };
                            head = Object.assign({ Authorization: this.access_token }, this.publicHeaders);
                            req = new HttpRequest_1.HttpRequest(url, HttpRequest_1.HttpRequest.METHOD.POST, head, this._formateData(data), true);
                            req.execute().then(function (result) {
                                console.error(result);
                                if (result && result.code == 0) {
                                    resolve(result.data);
                                }
                                else {
                                    resolve(null);
                                }
                            });
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    /**登录 */
    NetMgr.prototype.login = function (reAuth) {
        if (reAuth === void 0) { reAuth = false; }
        return __awaiter(this, void 0, Promise, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._auth()];
                    case 1:
                        data = _a.sent();
                        ;
                        // if (this._isExpiresed || reAuth) {
                        //     userData = await this._auth();
                        // } else {
                        //     userData = await this.getUserData();
                        // }
                        data && console.log('登录成功!');
                        return [2 /*return*/, data];
                }
            });
        });
    };
    // 清理账号数据
    NetMgr.prototype.cleanPlayer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var url, head, req;
                        return __generator(this, function (_a) {
                            url = "https://xyx-hy.iky.com/Backend/GM/delUser?app=gmc&sign=0lj8ls.mh92&uid=" + RuntimeMgr_1.default.ins.getUserId();
                            head = Object.assign({ Authorization: this.access_token }, this.publicHeaders);
                            req = new HttpRequest_1.HttpRequest(url, HttpRequest_1.HttpRequest.METHOD.POST, head, "");
                            req.execute().then(function (result) {
                                // result = this._formateResultData(result);
                                console.warn(result);
                                resolve(true);
                            });
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    /**格式化发送数据 */
    NetMgr.prototype._formateData = function (data) {
        var result = data;
        if (!Apps_1.default.isEncode) {
            result = this.formatSearchParams(data);
        }
        else {
            result = this.xorCrypt(JSON.stringify(data));
        }
        return result;
    };
    /**格式化结果数据 */
    NetMgr.prototype._formateResultData = function (data) {
        var result = data;
        if (Apps_1.default.isEncode) {
            result = this.xorCrypt(data);
        }
        try {
            result = JSON.parse(result);
        }
        catch (error) {
            try {
                result = JSON.parse(result);
            }
            catch (error) {
                console.error(error);
                result = null;
            }
        }
        return result;
    };
    /**拼接url字串 */
    NetMgr.prototype.formatSearchParams = function (data) {
        var str = null;
        for (var key in data) {
            var v = data[key];
            str = str == null ? '' : (str + '&');
            str += key + "=" + (v == 'null' ? '' : v);
        }
        return str;
    };
    /**加密字串算法! */
    NetMgr.prototype.xorCrypt = function (str) {
        var output = '';
        var key = 6;
        for (var i = 0; i < str.length; ++i) {
            output += String.fromCharCode(key ^ str.charCodeAt(i));
        }
        return output;
    };
    Object.defineProperty(NetMgr.prototype, "_isExpiresed", {
        /**是否过期 */
        get: function () {
            return false; //Apps.isOpenNet ? this.expires_in - (Date.now() / 1000) <= 0 : Apps.isOpenNet;
        },
        enumerable: false,
        configurable: true
    });
    /**
    * 双向同步接口!
    * @param info
    */
    NetMgr.prototype.syncAuthInfo = function (info) {
        if (info) {
            StorageMgr_1.StorageMgr.Storage.setObject('AuthInfo', { expires_in: info.expires_in, access_token: 'Bearer ' + info.access_token }, false);
        }
        else {
            var nativeCache = StorageMgr_1.StorageMgr.Storage.getObject('AuthInfo', null);
            if (nativeCache) {
                this.expires_in = nativeCache.expires_in;
                this.access_token = nativeCache.access_token;
            }
        }
    };
    NetMgr.instance = null;
    return NetMgr;
}());
exports.default = NetMgr;

cc._RF.pop();