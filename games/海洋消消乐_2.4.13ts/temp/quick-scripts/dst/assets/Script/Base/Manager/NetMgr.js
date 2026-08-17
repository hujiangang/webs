
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Base/Manager/NetMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCYXNlXFxNYW5hZ2VyXFxOZXRNZ3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBd0M7QUFDeEMsd0NBQW1DO0FBQ25DLHNEQUFxRDtBQUNyRCwyQ0FBMEM7QUFDMUMsZ0NBQTJCO0FBQzNCLDBEQUFxRDtBQUNyRCw0REFBd0Q7QUFDeEQseUJBQW9CO0FBb0JwQjtJQW1CSTtRQVJRLGlCQUFZLEdBQVcsSUFBSSxDQUFDO1FBQ3BDLFVBQVU7UUFDRixlQUFVLEdBQVcsQ0FBQyxDQUFDO1FBRXZCLGtCQUFhLEdBQThCLElBQUksQ0FBQztRQUVoRCxzQkFBaUIsR0FBRyxDQUFDLENBQUM7UUFHMUIsTUFBTTtRQUNOLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxjQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLGNBQWMsRUFBRSxtQ0FBbUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLGNBQWMsRUFBRSwwQkFBMEIsRUFBRSxDQUFDLENBQUUsb0JBQW9CO1FBQ3JLLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBbkJELHNCQUFrQixhQUFHO2FBQXJCO1lBQ0ksSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksRUFBRTtnQkFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLE1BQU0sRUFBRSxDQUFDO2FBQ2hDO1lBQ0QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3pCLENBQUM7OztPQUFBO0lBZ0JELFVBQVU7SUFDRixzQkFBSyxHQUFiO1FBQUEsaUJBMEJDO1FBekJHLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBTyxPQUFPOzs7Ozs0QkFDUixxQkFBTSxxQkFBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsRUFBQTs7d0JBQTVDLFlBQVksR0FBRyxTQUE2Qjs2QkFDOUMs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QUFDLENBQUEsK0VBQStFO1FBQ2hHLENBQUM7OztPQUFBO0lBRUQ7OztNQUdFO0lBQ00sNkJBQVksR0FBcEIsVUFBcUIsSUFBVTtRQUMzQixJQUFJLElBQUksRUFBRTtZQUNOLHVCQUFVLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUNqSTthQUFNO1lBQ0gsSUFBTSxXQUFXLEdBQVEsdUJBQVUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN4RSxJQUFJLFdBQVcsRUFBRTtnQkFDYixJQUFJLENBQUMsVUFBVSxHQUFHLFdBQVcsQ0FBQyxVQUFVLENBQUM7Z0JBQ3pDLElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDLFlBQVksQ0FBQzthQUNoRDtTQUNKO0lBQ0wsQ0FBQztJQXZsQmEsZUFBUSxHQUFXLElBQUksQ0FBQztJQXdsQjFDLGFBQUM7Q0ExbEJELEFBMGxCQyxJQUFBO2tCQTFsQm9CLE1BQU0iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGxhdGZvcm1NZ3IgZnJvbSBcIi4vUGxhdGZvcm1NZ3JcIjtcbmltcG9ydCBQYXRocyBmcm9tIFwiLi4vVXRpbHMvUGF0aHNcIjtcbmltcG9ydCB7IEh0dHBSZXF1ZXN0IH0gZnJvbSBcIi4uL05ldHdvcmsvSHR0cFJlcXVlc3RcIjtcbmltcG9ydCB7IFN0b3JhZ2VNZ3IgfSBmcm9tIFwiLi9TdG9yYWdlTWdyXCI7XG5pbXBvcnQgQXBwcyBmcm9tIFwiLi4vQXBwc1wiO1xuaW1wb3J0IFJ1bnRpbWVNZ3IgZnJvbSBcIi4uLy4uL0xvZ2ljL0RhdGEvUnVudGltZU1nclwiO1xuaW1wb3J0IHsgQVBQSUQgfSBmcm9tIFwiLi4vLi4vTG9naWMvRGF0YS9Db25zdC9Db25zdGFudFwiO1xuaW1wb3J0IE0gZnJvbSBcIi4vTVwiO1xuaW1wb3J0IEV2ZW50TWdyIGZyb20gXCIuLi8uLi9CYXNlL01hbmFnZXIvRXZlbnRNZ3JcIjtcblxuXG5leHBvcnQgaW50ZXJmYWNlIElTZXJ2ZXJDb25maWcge1xuICAgIHZlcjogc3RyaW5nLFxuICAgIHJhbmtfYmFubmVyOiBzdHJpbmcsXG4gICAgcmVzX3Zlcjogc3RyaW5nLFxuICAgIGNvbmZfdmVyOiBzdHJpbmcsXG4gICAgdGltZTogbnVtYmVyLFxuICAgIHJ1bGVfYWN0aXZpdHk6IHN0cmluZyxcbiAgICBhbm5vdW5jZW1lbnQ6IHtcbiAgICAgICAgdGV4dDogc3RyaW5nLCBncmlkOiBBcnJheTx7IHRleHQ6IHN0cmluZywgcmV3YXJkOiB7fSB9PlxuICAgIH0sXG4gICAgaXBfYWRkcjogbnVtYmVyLFxuICAgIHN3aWN0aDogc3RyaW5nXG4gICAgbWFpbnRhaW5fc3RhdHVzOiBzdHJpbmcsXG4gICAgbWFpbnRhaW5fY29udGVudDogc3RyaW5nXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5ldE1nciB7XG5cbiAgICBwdWJsaWMgc3RhdGljIGluc3RhbmNlOiBOZXRNZ3IgPSBudWxsO1xuXG4gICAgcHVibGljIHN0YXRpYyBnZXQgaW5zKCk6IE5ldE1nciB7XG4gICAgICAgIGlmICh0aGlzLmluc3RhbmNlID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgTmV0TWdyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhY2Nlc3NfdG9rZW46IHN0cmluZyA9IG51bGw7XG4gICAgLyoq6L+H5pyf5pe26Ze0ICovXG4gICAgcHJpdmF0ZSBleHBpcmVzX2luOiBudW1iZXIgPSAwO1xuXG4gICAgcHJpdmF0ZSBwdWJsaWNIZWFkZXJzOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0gbnVsbDtcblxuICAgIHByaXZhdGUgcmVUcnlBdXRoTWF4Q291bnQgPSAzO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8v5YWs5YWx5aS0IVxuICAgICAgICB0aGlzLnB1YmxpY0hlYWRlcnMgPSAhQXBwcy5pc0VuY29kZSA/IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnIH0gOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC1jcnlwdC1kYXRhJyB9OyAgLy8gYXBwbGljYXRpb24vanNvbiBcbiAgICAgICAgdGhpcy5zeW5jQXV0aEluZm8oKTtcbiAgICB9XG5cbiAgICAvKirmjojmnYPmjqXlj6MgKi9cbiAgICBwcml2YXRlIF9hdXRoKCk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGxhdGZvcm1EYXRhID0gYXdhaXQgUGxhdGZvcm1NZ3IuaW5zLmxvZ2luKClcbiAgICAgICAgICAgIGlmIChwbGF0Zm9ybURhdGEpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB1cmwgPSBgJHtQYXRocy5NYWluSG9zdH1hdXRoL2xvZ2luYDtcbiAgICAgICAgICAgICAgICBwbGF0Zm9ybURhdGFbJ3BsYXRmb3JtJ10gPSBbXCJoNVwiLCBcInd4XCJdW1BsYXRmb3JtTWdyLmlucy50eXBlIC0gMTAwXTtcbiAgICAgICAgICAgICAgICBwbGF0Zm9ybURhdGFbJ2FwcGlkJ10gPSBBUFBJRDtcbiAgICAgICAgICAgICAgICBwbGF0Zm9ybURhdGFbJ3YnXSA9IEFwcHMuVmVyc2lvbjtcbiAgICAgICAgICAgICAgICBwbGF0Zm9ybURhdGFbJ3VzZXJpbmZvJ10gPSBKU09OLnN0cmluZ2lmeShhd2FpdCBQbGF0Zm9ybU1nci5pbnMuZ2V0VXNlckluZm8oKSk7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVxID0gbmV3IEh0dHBSZXF1ZXN0KHVybCwgSHR0cFJlcXVlc3QuTUVUSE9ELlBPU1QsIHRoaXMucHVibGljSGVhZGVycywgdGhpcy5fZm9ybWF0ZURhdGEocGxhdGZvcm1EYXRhKSk7XG4gICAgICAgICAgICAgICAgcmVxLmV4ZWN1dGUoKS50aGVuKChyZXN1bHQ6IHsgbXNnOiBzdHJpbmcsIGNvZGU6IG51bWJlciwgZGF0YTogeyB1aWQ6IHN0cmluZywgb3BlbmlkOiBzdHJpbmcsIGFjY2Vzc190b2tlbjogc3RyaW5nLCBleHBpcmVzX2luOiBudW1iZXIsIHVzZXJkYXRhLCBhd2FyZHMgfSB9KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuX2Zvcm1hdGVSZXN1bHREYXRhKHJlc3VsdClcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAmJiByZXN1bHQuY29kZSA9PSAwICYmIHJlc3VsdC5kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjY2Vzc190b2tlbiA9ICdCZWFyZXIgJyArIHJlc3VsdC5kYXRhLmFjY2Vzc190b2tlblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5leHBpcmVzX2luID0gcmVzdWx0LmRhdGEuZXhwaXJlc19pbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3luY0F1dGhJbmZvKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoeyB1aWQ6IHJlc3VsdC5kYXRhLnVpZCwgdXNlcmRhdGE6IHJlc3VsdC5kYXRhLnVzZXJkYXRhLCBhd2FyZHM6IHJlc3VsdC5kYXRhLmF3YXJkcyB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ+aOiOadg+Wksei0pTonLCByZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKirojrflj5bmnI3liqHlmajnm7jlhbPkv6Hmga/kuI7phY3nva4hICovXG4gICAgcHVibGljIGFzeW5jIGdldFNlcnZlckRhdGEoKTogUHJvbWlzZTxJU2VydmVyQ29uZmlnPiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdXJsID0gYCR7UGF0aHMuTWFpbkhvc3R9Z2FtZS9jb25maWdgO1xuICAgICAgICAgICAgY29uc3QgaGVhZCA9IE9iamVjdC5hc3NpZ24oeyBBdXRob3JpemF0aW9uOiB0aGlzLmFjY2Vzc190b2tlbiB9LCB0aGlzLnB1YmxpY0hlYWRlcnMpO1xuICAgICAgICAgICAgY29uc3QgcmVxID0gbmV3IEh0dHBSZXF1ZXN0KHVybCwgSHR0cFJlcXVlc3QuTUVUSE9ELlBPU1QsIGhlYWQsIG51bGwpO1xuICAgICAgICAgICAgcmVxLmV4ZWN1dGUoKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLl9mb3JtYXRlUmVzdWx0RGF0YShyZXN1bHQpO1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgJiYgcmVzdWx0LmNvZGUgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8qKuiOt+WPlueUqOaIt+aVsOaNriAqL1xuICAgIHB1YmxpYyBhc3luYyBnZXRVc2VyRGF0YSgpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICBsZXQgdXNlcmRhdGEgPSBudWxsO1xuICAgICAgICBpZiAodGhpcy5faXNFeHBpcmVzZWQpIHtcbiAgICAgICAgICAgIHVzZXJkYXRhID0gYXdhaXQgdGhpcy5fYXV0aCgpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB1c2VyZGF0YSA9IGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdXJsID0gYCR7UGF0aHMuTWFpbkhvc3R9dXNlci9kYXRhYDtcbiAgICAgICAgICAgICAgICBjb25zdCBoZWFkID0gT2JqZWN0LmFzc2lnbih7IEF1dGhvcml6YXRpb246IHRoaXMuYWNjZXNzX3Rva2VuIH0sIHRoaXMucHVibGljSGVhZGVycyk7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVxID0gbmV3IEh0dHBSZXF1ZXN0KHVybCwgSHR0cFJlcXVlc3QuTUVUSE9ELkdFVCwgaGVhZCwgbnVsbCk7XG4gICAgICAgICAgICAgICAgcmVxLmV4ZWN1dGUoKS50aGVuKChyZXN1bHQ6IHsgbXNnOiBzdHJpbmcsIGNvZGU6IG51bWJlciwgZGF0YTogc3RyaW5nIH0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5fZm9ybWF0ZVJlc3VsdERhdGEocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAmJiByZXN1bHQuY29kZSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVzZXJkYXRhO1xuICAgIH1cblxuICAgIC8qKuaPkOS6pOeUqOaIt+aVsOaNriAqL1xuICAgIHB1YmxpYyBhc3luYyBwdXRVc2VyRGF0YShkYXRhOiBhbnksIGRlcHRoOiBudW1iZXIgPSAwKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgbGV0IHJlcURhdGEgPSBkYXRhO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhICE9ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgcmVxRGF0YSA9IHsgY29udGVudDogSlNPTi5zdHJpbmdpZnkoZGF0YSkgfTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikgeyB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5faXNFeHBpcmVzZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGVwdGggPCB0aGlzLnJlVHJ5QXV0aE1heENvdW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX2F1dGgoKVxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRoaXMucHV0VXNlckRhdGEoZGF0YSwgZGVwdGggKyAxKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHVybCA9IGAke1BhdGhzLk1haW5Ib3N0fXVzZXIvc2F2ZWBcbiAgICAgICAgICAgICAgICBjb25zdCBoZWFkID0gT2JqZWN0LmFzc2lnbih7IEF1dGhvcml6YXRpb246IHRoaXMuYWNjZXNzX3Rva2VuIH0sIHRoaXMucHVibGljSGVhZGVycyk7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVxID0gbmV3IEh0dHBSZXF1ZXN0KHVybCwgSHR0cFJlcXVlc3QuTUVUSE9ELlBPU1QsIGhlYWQsIHRoaXMuX2Zvcm1hdGVEYXRhKHJlcURhdGEpKTtcbiAgICAgICAgICAgICAgICByZXEuZXhlY3V0ZSgpLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLl9mb3JtYXRlUmVzdWx0RGF0YShyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ3VzZXIvc2F2ZTonLCByZXN1bHQsIHJlcURhdGEpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdCAmJiByZXN1bHQuY29kZSA9PSAwKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5o+Q5Lqk55So5oi35pWw5o2uXG4gICAgICogQHBhcmFtIGRhdGEge25hbWU6W1wiQmFycmllclJhbmtcIixcIlNjb3JlUmFua1wiXSx2YWx1ZSxleHRyYX1cbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgcHV0UmFua0RhdGEoZGF0YTogeyBuYW1lOiBzdHJpbmcsIHZhbHVlOiBudW1iZXIsIGV4dHJhPzogYW55IH0sIGRlcHRoOiBudW1iZXIgPSAwKSB7XG4gICAgICAgIGlmICh0aGlzLl9pc0V4cGlyZXNlZCkge1xuICAgICAgICAgICAgaWYgKGRlcHRoIDwgdGhpcy5yZVRyeUF1dGhNYXhDb3VudCkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX2F1dGgoKVxuICAgICAgICAgICAgICAgIHRoaXMucHV0UmFua0RhdGEoZGF0YSwgZGVwdGggKyAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IGAke1BhdGhzLk1haW5Ib3N0fXJhbmsvcHV0YDtcbiAgICAgICAgICAgIGNvbnN0IGhlYWQgPSBPYmplY3QuYXNzaWduKHsgQXV0aG9yaXphdGlvbjogdGhpcy5hY2Nlc3NfdG9rZW4gfSwgdGhpcy5wdWJsaWNIZWFkZXJzKTtcbiAgICAgICAgICAgIGNvbnN0IHJlcSA9IG5ldyBIdHRwUmVxdWVzdCh1cmwsIEh0dHBSZXF1ZXN0Lk1FVEhPRC5QT1NULCBoZWFkLCB0aGlzLl9mb3JtYXRlRGF0YShkYXRhKSk7XG4gICAgICAgICAgICByZXEuZXhlY3V0ZSgpLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuX2Zvcm1hdGVSZXN1bHREYXRhKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKHJlc3VsdCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBwdXREYWlseVRhc2tQcm9ncmVzcyhpZDogbnVtYmVyIHwgc3RyaW5nLCBjb3VudDogbnVtYmVyLCBkZXB0aDogbnVtYmVyID0gMCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2lzRXhwaXJlc2VkKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRlcHRoIDwgdGhpcy5yZVRyeUF1dGhNYXhDb3VudCkge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9hdXRoKCk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5wdXREYWlseVRhc2tQcm9ncmVzcyhpZCwgY291bnQsIGRlcHRoICsgMSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdXJsID0gYCR7UGF0aHMuTWFpbkhvc3R9dGFzay9wcm9ncmVzc2BcbiAgICAgICAgICAgICAgICBjb25zdCBoZWFkID0gT2JqZWN0LmFzc2lnbih7IEF1dGhvcml6YXRpb246IHRoaXMuYWNjZXNzX3Rva2VuIH0sIHRoaXMucHVibGljSGVhZGVycyk7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVxRGF0YSA9IHsgdGFza2lkOiBpZCwgdmFsdWU6IGNvdW50IH07XG4gICAgICAgICAgICAgICAgY29uc3QgcmVxID0gbmV3IEh0dHBSZXF1ZXN0KHVybCwgSHR0cFJlcXVlc3QuTUVUSE9ELlBPU1QsIGhlYWQsIHRoaXMuX2Zvcm1hdGVEYXRhKHJlcURhdGEpLCB0cnVlKTtcbiAgICAgICAgICAgICAgICByZXEuZXhlY3V0ZSgpLnRoZW4oKHJlc3VsdDogeyBtc2c6IHN0cmluZywgY29kZTogbnVtYmVyLCBkYXRhOiB7IFtpZDogc3RyaW5nXTogbnVtYmVyIH0gfSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ICYmIHJlc3VsdC5jb2RlID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOajgOa1i+S7u+WKoeaYr+WQpuWujOaIkFxuICAgICAqIEBwYXJhbSB0YXNraWQgXG4gICAgICogQHBhcmFtIHJldHJ5Q291bnQg5b2T5YmN6YeN6K+V55qE5o+Q5Lqk5qyh5pWwXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGNoZWNrVGFza0lzT0sodGFza2lkOiBudW1iZXIsIHJldHJ5Q291bnQ6IG51bWJlciA9IDApOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9pc0V4cGlyZXNlZCkge1xuICAgICAgICAgICAgICAgIGlmIChyZXRyeUNvdW50IDwgdGhpcy5yZVRyeUF1dGhNYXhDb3VudCkge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9hdXRoKCk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5jaGVja1Rhc2tJc09LKHRhc2tpZCwgcmV0cnlDb3VudCArIDEpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHVybCA9IGAke1BhdGhzLk1haW5Ib3N0fXRhc2svY2hlY2tgXG4gICAgICAgICAgICAgICAgY29uc3QgaGVhZCA9IE9iamVjdC5hc3NpZ24oeyBBdXRob3JpemF0aW9uOiB0aGlzLmFjY2Vzc190b2tlbiB9LCB0aGlzLnB1YmxpY0hlYWRlcnMpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlcSA9IG5ldyBIdHRwUmVxdWVzdCh1cmwsIEh0dHBSZXF1ZXN0Lk1FVEhPRC5QT1NULCBoZWFkLCB0aGlzLl9mb3JtYXRlRGF0YSh7IHRhc2tpZCB9KSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgcmVxLmV4ZWN1dGUoKS50aGVuKChyZXN1bHQ6IHsgbXNnOiBzdHJpbmcsIGNvZGU6IG51bWJlciwgZGF0YTogYm9vbGVhbiB9KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgJiYgcmVzdWx0LmRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPluWRqOacn+S7u+WKoeWujOaIkOi/m+W6puWIl+ihqFxuICAgICAqIEBwYXJhbSByZXRyeUNvdW50IOW9k+WJjemHjeivleeahOaPkOS6pOasoeaVsCBcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgZ2V0RGFpbHlUYXNrKHJldHJ5Q291bnQ6IG51bWJlciA9IDApOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2lzRXhwaXJlc2VkKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJldHJ5Q291bnQgPCB0aGlzLnJlVHJ5QXV0aE1heENvdW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX2F1dGgoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLmdldERhaWx5VGFzayhyZXRyeUNvdW50ICsgMSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdXJsID0gYCR7UGF0aHMuTWFpbkhvc3R9dGFzay9saXN0YFxuICAgICAgICAgICAgICAgIGNvbnN0IGhlYWQgPSBPYmplY3QuYXNzaWduKHsgQXV0aG9yaXphdGlvbjogdGhpcy5hY2Nlc3NfdG9rZW4gfSwgdGhpcy5wdWJsaWNIZWFkZXJzKTtcbiAgICAgICAgICAgICAgICBjb25zdCByZXEgPSBuZXcgSHR0cFJlcXVlc3QodXJsLCBIdHRwUmVxdWVzdC5NRVRIT0QuUE9TVCwgaGVhZCwgbnVsbCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgcmVxLmV4ZWN1dGUoKS50aGVuKChyZXN1bHQ6IHsgbXNnOiBzdHJpbmcsIGNvZGU6IG51bWJlciwgZGF0YTogeyBbaWQ6IHN0cmluZ106IG51bWJlciB9IH0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAmJiByZXN1bHQuY29kZSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5bmjpLooYzkv6Hmga9cbiAgICAgKiBAcGFyYW0gZGF0YSB7bmFtZTpbXCJCYXJyaWVyUmFuayxTY29yZVJhbmtcIl0sdHlwZTpbXCJBbGwsRGFpbHksV2Vla2x5LE1vbnRobHlcIl19XG4gICAgICogQHBhcmFtIHJldHJ5Q291bnQgXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGdldFJhbmtEYXRhKGRhdGE6IHsgbmFtZTogc3RyaW5nLCB0eXBlOiBzdHJpbmcgfSA9IG51bGwsIHJldHJ5Q291bnQ6IG51bWJlciA9IDApOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9pc0V4cGlyZXNlZCkge1xuICAgICAgICAgICAgICAgIGlmIChyZXRyeUNvdW50IDwgdGhpcy5yZVRyeUF1dGhNYXhDb3VudCkge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9hdXRoKCk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5nZXRSYW5rRGF0YShkYXRhLCByZXRyeUNvdW50ICsgMSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdXJsID0gYCR7UGF0aHMuTWFpbkhvc3R9cmFuay9saXN0YFxuICAgICAgICAgICAgICAgIGRhdGEgPSBkYXRhIHx8IHsgbmFtZTogJ0JhcnJpZXJSYW5rJywgdHlwZTogJ0FsbCcgfTtcbiAgICAgICAgICAgICAgICBjb25zdCBoZWFkID0gT2JqZWN0LmFzc2lnbih7IEF1dGhvcml6YXRpb246IHRoaXMuYWNjZXNzX3Rva2VuIH0sIHRoaXMucHVibGljSGVhZGVycyk7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVxID0gbmV3IEh0dHBSZXF1ZXN0KHVybCwgSHR0cFJlcXVlc3QuTUVUSE9ELlBPU1QsIGhlYWQsIHRoaXMuX2Zvcm1hdGVEYXRhKGRhdGEpKTtcbiAgICAgICAgICAgICAgICByZXEuZXhlY3V0ZSgpLnRoZW4oKHJlc3VsdDogeyBtc2c6IHN0cmluZywgY29kZTogbnVtYmVyLCBkYXRhOiBhbnkgfSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLl9mb3JtYXRlUmVzdWx0RGF0YShyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ICYmIHJlc3VsdC5jb2RlID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8qKlxuICAgICog56a75byA6K6/6ZeuXG4gICAgKiBAcGFyYW0gZnJpZW5kc1VpZCBcbiAgICAqIEBwYXJhbSByZXRyeUNvdW50IFxuICAgICovXG4gICAgcHVibGljIGFzeW5jIGV4aXRWaXNpdChmcmllbmRzVWlkOiBudW1iZXIgfCBzdHJpbmcsIHJldHJ5Q291bnQ6IG51bWJlciA9IDApOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIGlmICghZnJpZW5kc1VpZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuX2lzRXhwaXJlc2VkKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJldHJ5Q291bnQgPCB0aGlzLnJlVHJ5QXV0aE1heENvdW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX2F1dGgoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLnZpc2l0RnJpZW5kKHJldHJ5Q291bnQgKyAxKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCB1cmwgPSBgJHtQYXRocy5NYWluSG9zdH11c2VyL2RlbGV0ZVZpc2l0TGlzdElkYFxuICAgICAgICAgICAgICAgIGNvbnN0IGhlYWQgPSBPYmplY3QuYXNzaWduKHsgQXV0aG9yaXphdGlvbjogdGhpcy5hY2Nlc3NfdG9rZW4gfSwgdGhpcy5wdWJsaWNIZWFkZXJzKTtcbiAgICAgICAgICAgICAgICBjb25zdCByZXEgPSBuZXcgSHR0cFJlcXVlc3QodXJsLCBIdHRwUmVxdWVzdC5NRVRIT0QuUE9TVCwgaGVhZCwgdGhpcy5fZm9ybWF0ZURhdGEoeyB2aXNpdElkOiBmcmllbmRzVWlkIH0pKTtcbiAgICAgICAgICAgICAgICByZXEuZXhlY3V0ZSgpLnRoZW4oKHJlc3VsdDogeyBtc2c6IHN0cmluZywgY29kZTogbnVtYmVyLCBkYXRhOiBhbnkgfSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLl9mb3JtYXRlUmVzdWx0RGF0YShyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ICYmIHJlc3VsdC5jb2RlID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiuv+mXruS4gOS4quWlveWPi1xuICAgICAqIEBwYXJhbSBmcmllbmRzVWlkIFxuICAgICAqIEBwYXJhbSByZXRyeUNvdW50IFxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyB2aXNpdEZyaWVuZChmcmllbmRzVWlkOiBudW1iZXIgfCBzdHJpbmcsIHJldHJ5Q291bnQ6IG51bWJlciA9IDApOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIGlmICghZnJpZW5kc1VpZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuX2lzRXhwaXJlc2VkKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJldHJ5Q291bnQgPCB0aGlzLnJlVHJ5QXV0aE1heENvdW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX2F1dGgoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLnZpc2l0RnJpZW5kKHJldHJ5Q291bnQgKyAxKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCB1cmwgPSBgJHtQYXRocy5NYWluSG9zdH11c2VyL3Zpc2l0YFxuICAgICAgICAgICAgICAgIGNvbnN0IGhlYWQgPSBPYmplY3QuYXNzaWduKHsgQXV0aG9yaXphdGlvbjogdGhpcy5hY2Nlc3NfdG9rZW4gfSwgdGhpcy5wdWJsaWNIZWFkZXJzKTtcbiAgICAgICAgICAgICAgICBjb25zdCByZXEgPSBuZXcgSHR0cFJlcXVlc3QodXJsLCBIdHRwUmVxdWVzdC5NRVRIT0QuUE9TVCwgaGVhZCwgdGhpcy5fZm9ybWF0ZURhdGEoeyB1aWQ6IGZyaWVuZHNVaWQgfSkpO1xuICAgICAgICAgICAgICAgIHJlcS5leGVjdXRlKCkudGhlbigocmVzdWx0OiB7IG1zZzogc3RyaW5nLCBjb2RlOiBudW1iZXIsIGRhdGE6IGFueSB9KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuX2Zvcm1hdGVSZXN1bHREYXRhKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgJiYgcmVzdWx0LmNvZGUgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiDkupLliqgo54K56LWeLOWIhuS6qy4uLilcbiAgICAqIEBwYXJhbSByZXRyeUNvdW50IFxuICAgICovXG4gICAgcHVibGljIGFzeW5jIGludGVyYWN0aXZlKGZyaWVuZHNVaWQ6IHN0cmluZyB8IG51bWJlciwgZXZlbnRJZDogbnVtYmVyLCByZXRyeUNvdW50OiBudW1iZXIgPSAwKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5faXNFeHBpcmVzZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAocmV0cnlDb3VudCA8IHRoaXMucmVUcnlBdXRoTWF4Q291bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5fYXV0aCgpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRoaXMuZ2V0RnJpZW5kTGlzdChyZXRyeUNvdW50ICsgMSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdXJsID0gYCR7UGF0aHMuTWFpbkhvc3R9dXNlci9pbnRlcmFjdGl2ZWBcbiAgICAgICAgICAgICAgICBjb25zdCBoZWFkID0gT2JqZWN0LmFzc2lnbih7IEF1dGhvcml6YXRpb246IHRoaXMuYWNjZXNzX3Rva2VuIH0sIHRoaXMucHVibGljSGVhZGVycyk7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVxID0gbmV3IEh0dHBSZXF1ZXN0KHVybCwgSHR0cFJlcXVlc3QuTUVUSE9ELlBPU1QsIGhlYWQsIHRoaXMuX2Zvcm1hdGVEYXRhKHsgdWlkOiBmcmllbmRzVWlkLCBldmVudDogZXZlbnRJZCB9KSk7XG4gICAgICAgICAgICAgICAgcmVxLmV4ZWN1dGUoKS50aGVuKChyZXN1bHQ6IHsgbXNnOiBzdHJpbmcsIGNvZGU6IG51bWJlciwgZGF0YTogYW55IH0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5fZm9ybWF0ZVJlc3VsdERhdGEocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAmJiByZXN1bHQuY29kZSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5tc2cpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPluS6i+S7tuWIl+ihqFxuICAgICAqIEBwYXJhbSByZXRyeUNvdW50IFxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBnZXRJbnRlcmFjdGl2ZUxpc3QocmV0cnlDb3VudDogbnVtYmVyID0gMCk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2lzRXhwaXJlc2VkKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJldHJ5Q291bnQgPCB0aGlzLnJlVHJ5QXV0aE1heENvdW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuX2F1dGgoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLmdldEZyaWVuZExpc3QocmV0cnlDb3VudCArIDEpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHVybCA9IGAke1BhdGhzLk1haW5Ib3N0fXVzZXIvaW50ZXJhY3RpdmVMaXN0YFxuICAgICAgICAgICAgICAgIGNvbnN0IGhlYWQgPSBPYmplY3QuYXNzaWduKHsgQXV0aG9yaXphdGlvbjogdGhpcy5hY2Nlc3NfdG9rZW4gfSwgdGhpcy5wdWJsaWNIZWFkZXJzKTtcbiAgICAgICAgICAgICAgICBjb25zdCByZXEgPSBuZXcgSHR0cFJlcXVlc3QodXJsLCBIdHRwUmVxdWVzdC5NRVRIT0QuR0VULCBoZWFkKTtcbiAgICAgICAgICAgICAgICByZXEuZXhlY3V0ZSgpLnRoZW4oKHJlc3VsdDogeyBtc2c6IHN0cmluZywgY29kZTogbnVtYmVyLCBkYXRhOiBhbnkgfSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLl9mb3JtYXRlUmVzdWx0RGF0YShyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ICYmIHJlc3VsdC5jb2RlID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy90ZXN0IG1vY2sgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5blnKjnur/orr/pl67nlKjmiLfliJfooahcbiAgICAgKiBAcGFyYW0gcmV0cnlDb3VudCBcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgZ2V0T25saW5lTGlzdChyZXRyeUNvdW50OiBudW1iZXIgPSAwKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICBpZiAoIU0ucnVudGltZS5Vc2VySWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLl9pc0V4cGlyZXNlZCkge1xuICAgICAgICAgICAgICAgIGlmIChyZXRyeUNvdW50IDwgdGhpcy5yZVRyeUF1dGhNYXhDb3VudCkge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9hdXRoKCk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5nZXRGcmllbmRMaXN0KHJldHJ5Q291bnQgKyAxKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCB1cmwgPSBgJHtQYXRocy5NYWluSG9zdH11c2VyL3Zpc2l0TGlzdGBcbiAgICAgICAgICAgICAgICBjb25zdCBoZWFkID0gT2JqZWN0LmFzc2lnbih7IEF1dGhvcml6YXRpb246IHRoaXMuYWNjZXNzX3Rva2VuIH0sIHRoaXMucHVibGljSGVhZGVycyk7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVxID0gbmV3IEh0dHBSZXF1ZXN0KHVybCwgSHR0cFJlcXVlc3QuTUVUSE9ELlBPU1QsIGhlYWQsIHRoaXMuX2Zvcm1hdGVEYXRhKHsgdWlkOiBNLnJ1bnRpbWUuVXNlcklkIH0pKTtcbiAgICAgICAgICAgICAgICByZXEuZXhlY3V0ZSgpLnRoZW4oKHJlc3VsdDogeyBtc2c6IHN0cmluZywgY29kZTogbnVtYmVyLCBkYXRhOiBhbnkgfSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLl9mb3JtYXRlUmVzdWx0RGF0YShyZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ICYmIHJlc3VsdC5jb2RlID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPluWlveWPi+WIl+ihqCBcbiAgICAgKiBAcGFyYW0gcmV0cnlDb3VudCBcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgZ2V0RnJpZW5kTGlzdChyZXRyeUNvdW50OiBudW1iZXIgPSAwKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICBpZiAoIU0ucnVudGltZS5Vc2VySWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLl9pc0V4cGlyZXNlZCkge1xuICAgICAgICAgICAgICAgIGlmIChyZXRyeUNvdW50IDwgdGhpcy5yZVRyeUF1dGhNYXhDb3VudCkge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLl9hdXRoKCk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5nZXRGcmllbmRMaXN0KHJldHJ5Q291bnQgKyAxKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCB1cmwgPSBgJHtQYXRocy5NYWluSG9zdH11c2VyL2ludml0ZUxpc3RgXG4gICAgICAgICAgICAgICAgY29uc3QgaGVhZCA9IE9iamVjdC5hc3NpZ24oeyBBdXRob3JpemF0aW9uOiB0aGlzLmFjY2Vzc190b2tlbiB9LCB0aGlzLnB1YmxpY0hlYWRlcnMpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlcSA9IG5ldyBIdHRwUmVxdWVzdCh1cmwsIEh0dHBSZXF1ZXN0Lk1FVEhPRC5QT1NULCBoZWFkLCB0aGlzLl9mb3JtYXRlRGF0YSh7IHVpZDogTS5ydW50aW1lLlVzZXJJZCB9KSk7XG4gICAgICAgICAgICAgICAgcmVxLmV4ZWN1dGUoKS50aGVuKChyZXN1bHQ6IHsgbXNnOiBzdHJpbmcsIGNvZGU6IG51bWJlciwgZGF0YTogYW55IH0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5fZm9ybWF0ZVJlc3VsdERhdGEocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAmJiByZXN1bHQuY29kZSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDmt7vliqDlpb3lj4tcbiAgICAgKiBAcGFyYW0gdWlkIFxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBhZGRGcmllbmQodWlkOiBudW1iZXIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignYWRkRnJpZW5kMScsIE0ucnVudGltZS5Vc2VySWQpO1xuXG4gICAgICAgIGlmIChNLnJ1bnRpbWUuVXNlcklkID09IHVpZCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB1cmwgPSBgJHtQYXRocy5NYWluSG9zdH11c2VyL2ludml0ZWBcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB7IHJlZl91aWQ6IHVpZCB9O1xuICAgICAgICAgICAgY29uc3QgaGVhZCA9IE9iamVjdC5hc3NpZ24oeyBBdXRob3JpemF0aW9uOiB0aGlzLmFjY2Vzc190b2tlbiB9LCB0aGlzLnB1YmxpY0hlYWRlcnMpO1xuICAgICAgICAgICAgY29uc3QgcmVxID0gbmV3IEh0dHBSZXF1ZXN0KHVybCwgSHR0cFJlcXVlc3QuTUVUSE9ELlBPU1QsIGhlYWQsIHRoaXMuX2Zvcm1hdGVEYXRhKGRhdGEpLCB0cnVlKTtcbiAgICAgICAgICAgIHJlcS5leGVjdXRlKCkudGhlbigocmVzdWx0OiB7IG1zZzogc3RyaW5nLCBjb2RlOiBudW1iZXIsIGRhdGE6IGFueSB9KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignYWRkRnJpZW5kMjonLCByZXN1bHQpO1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgJiYgcmVzdWx0LmNvZGUgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICog54K55Ye75YiG5Lqr6L+b5YWl5ri45oiPXG4gICAgICogQHBhcmFtIHVpZCBcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgY2xpY2tTaGFyZUVudGVyR2FtZSh1aWQ6IG51bWJlcikge1xuICAgICAgICBpZiAoTS5ydW50aW1lLlVzZXJJZCA9PSB1aWQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IGAke1BhdGhzLk1haW5Ib3N0fXVzZXIvcG9zdFNoYXJlVXNlcklkYFxuICAgICAgICAgICAgY29uc3QgZGF0YSA9IHsgdWlkOiB1aWQgfTtcbiAgICAgICAgICAgIGNvbnN0IGhlYWQgPSBPYmplY3QuYXNzaWduKHsgQXV0aG9yaXphdGlvbjogdGhpcy5hY2Nlc3NfdG9rZW4gfSwgdGhpcy5wdWJsaWNIZWFkZXJzKTtcbiAgICAgICAgICAgIGNvbnN0IHJlcSA9IG5ldyBIdHRwUmVxdWVzdCh1cmwsIEh0dHBSZXF1ZXN0Lk1FVEhPRC5QT1NULCBoZWFkLCB0aGlzLl9mb3JtYXRlRGF0YShkYXRhKSwgdHJ1ZSk7XG4gICAgICAgICAgICByZXEuZXhlY3V0ZSgpLnRoZW4oKHJlc3VsdDogeyBtc2c6IHN0cmluZywgY29kZTogbnVtYmVyLCBkYXRhOiBhbnkgfSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IocmVzdWx0KTtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0ICYmIHJlc3VsdC5jb2RlID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWFs+WNoeWksei0peavj+enkuafpeivoiDliIbkuqvov5vlhaXmuLjmiI/liqDmraXmlbBcbiAgICAgKiBAcGFyYW0gdWlkIFxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBBc2tRdWVyeVd4RnJpZW5kQ2xpY2tTaGFyZSh1aWQ6IG51bWJlcikge1xuICAgICAgICBjYy5sb2coXCLmr4/np5Lmn6Xor6Llpb3lj4vngrnlh7tcIik7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdXJsID0gYCR7UGF0aHMuTWFpbkhvc3R9dXNlci9nZXRTaGFyZVVzZXJNYXJrYFxuICAgICAgICAgICAgY29uc3QgZGF0YSA9IHsgdWlkOiB1aWQgfTtcbiAgICAgICAgICAgIGNvbnN0IGhlYWQgPSBPYmplY3QuYXNzaWduKHsgQXV0aG9yaXphdGlvbjogdGhpcy5hY2Nlc3NfdG9rZW4gfSwgdGhpcy5wdWJsaWNIZWFkZXJzKTtcbiAgICAgICAgICAgIGNvbnN0IHJlcSA9IG5ldyBIdHRwUmVxdWVzdCh1cmwsIEh0dHBSZXF1ZXN0Lk1FVEhPRC5QT1NULCBoZWFkLCB0aGlzLl9mb3JtYXRlRGF0YShkYXRhKSwgdHJ1ZSk7XG4gICAgICAgICAgICByZXEuZXhlY3V0ZSgpLnRoZW4oKHJlc3VsdDogeyBtc2c6IHN0cmluZywgY29kZTogbnVtYmVyLCBkYXRhOiBhbnkgfSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IocmVzdWx0KTtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0ICYmIHJlc3VsdC5jb2RlID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICB9XG5cblxuXG4gICAgLyoq55m75b2VICovXG4gICAgcHVibGljIGFzeW5jIGxvZ2luKHJlQXV0aDogYm9vbGVhbiA9IGZhbHNlKTogUHJvbWlzZTx7IHVpZDogbnVtYmVyLCB1c2VyZGF0YTogYW55LCBhd2FyZHM6IEFycmF5PHsgaWQ6IG51bWJlciwgY250OiBudW1iZXIgfT4gfT4ge1xuICAgICAgICBsZXQgZGF0YSA9IGF3YWl0IHRoaXMuX2F1dGgoKTs7XG4gICAgICAgIC8vIGlmICh0aGlzLl9pc0V4cGlyZXNlZCB8fCByZUF1dGgpIHtcbiAgICAgICAgLy8gICAgIHVzZXJEYXRhID0gYXdhaXQgdGhpcy5fYXV0aCgpO1xuICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAvLyAgICAgdXNlckRhdGEgPSBhd2FpdCB0aGlzLmdldFVzZXJEYXRhKCk7XG4gICAgICAgIC8vIH1cbiAgICAgICAgZGF0YSAmJiBjb25zb2xlLmxvZygn55m75b2V5oiQ5YqfIScpO1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICAvLyDmuIXnkIbotKblj7fmlbDmja5cbiAgICBwdWJsaWMgYXN5bmMgY2xlYW5QbGF5ZXIoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgLy8gJ2h0dHA6Ly8xMC4xMDAuNTM6OTUwMS9hcGkvdjEvJyA6ICdodHRwczovL3h5eGh5LmlmdW5za3kuY29tL1xuXG4gICAgICAgICAgICBjb25zdCB1cmwgPSBcImh0dHBzOi8veHl4LWh5LmlreS5jb20vQmFja2VuZC9HTS9kZWxVc2VyP2FwcD1nbWMmc2lnbj0wbGo4bHMubWg5MiZ1aWQ9XCIgKyBSdW50aW1lTWdyLmlucy5nZXRVc2VySWQoKTsvL2Ake1BhdGhzLk1haW5Ib3N0fXJhbmsvcHV0YDtcbiAgICAgICAgICAgIGNvbnN0IGhlYWQgPSBPYmplY3QuYXNzaWduKHsgQXV0aG9yaXphdGlvbjogdGhpcy5hY2Nlc3NfdG9rZW4gfSwgdGhpcy5wdWJsaWNIZWFkZXJzKTtcbiAgICAgICAgICAgIGNvbnN0IHJlcSA9IG5ldyBIdHRwUmVxdWVzdCh1cmwsIEh0dHBSZXF1ZXN0Lk1FVEhPRC5QT1NULCBoZWFkLCBcIlwiKTtcbiAgICAgICAgICAgIHJlcS5leGVjdXRlKCkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gcmVzdWx0ID0gdGhpcy5fZm9ybWF0ZVJlc3VsdERhdGEocmVzdWx0KTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4ocmVzdWx0KTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKuagvOW8j+WMluWPkemAgeaVsOaNriAqL1xuICAgIHByaXZhdGUgX2Zvcm1hdGVEYXRhKGRhdGEpOiBzdHJpbmcge1xuICAgICAgICBsZXQgcmVzdWx0ID0gZGF0YTtcbiAgICAgICAgaWYgKCFBcHBzLmlzRW5jb2RlKSB7XG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLmZvcm1hdFNlYXJjaFBhcmFtcyhkYXRhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMueG9yQ3J5cHQoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoq5qC85byP5YyW57uT5p6c5pWw5o2uICovXG4gICAgcHJpdmF0ZSBfZm9ybWF0ZVJlc3VsdERhdGEoZGF0YSkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gZGF0YTtcbiAgICAgICAgaWYgKEFwcHMuaXNFbmNvZGUpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMueG9yQ3J5cHQoZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlc3VsdCA9IEpTT04ucGFyc2UocmVzdWx0KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gSlNPTi5wYXJzZShyZXN1bHQpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoq5ou85o6ldXJs5a2X5LiyICovXG4gICAgcHJpdmF0ZSBmb3JtYXRTZWFyY2hQYXJhbXMoZGF0YTogYW55KTogc3RyaW5nIHtcbiAgICAgICAgbGV0IHN0ciA9IG51bGw7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnN0IHYgPSBkYXRhW2tleV07XG4gICAgICAgICAgICBzdHIgPSBzdHIgPT0gbnVsbCA/ICcnIDogKHN0ciArICcmJyk7XG4gICAgICAgICAgICBzdHIgKz0gYCR7a2V5fT0ke3YgPT0gJ251bGwnID8gJycgOiB2fWBcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cblxuICAgIC8qKuWKoOWvhuWtl+S4sueul+azlSEgKi9cbiAgICBwcml2YXRlIHhvckNyeXB0KHN0cik6IHN0cmluZyB7XG4gICAgICAgIGxldCBvdXRwdXQgPSAnJ1xuICAgICAgICBsZXQga2V5ID0gNlxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgb3V0cHV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoa2V5IF4gc3RyLmNoYXJDb2RlQXQoaSkpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dHB1dFxuICAgIH1cblxuICAgIC8qKuaYr+WQpui/h+acnyAqL1xuICAgIHByaXZhdGUgZ2V0IF9pc0V4cGlyZXNlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlOy8vQXBwcy5pc09wZW5OZXQgPyB0aGlzLmV4cGlyZXNfaW4gLSAoRGF0ZS5ub3coKSAvIDEwMDApIDw9IDAgOiBBcHBzLmlzT3Blbk5ldDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIOWPjOWQkeWQjOatpeaOpeWPoyFcbiAgICAqIEBwYXJhbSBpbmZvIFxuICAgICovXG4gICAgcHJpdmF0ZSBzeW5jQXV0aEluZm8oaW5mbz86IGFueSkge1xuICAgICAgICBpZiAoaW5mbykge1xuICAgICAgICAgICAgU3RvcmFnZU1nci5TdG9yYWdlLnNldE9iamVjdCgnQXV0aEluZm8nLCB7IGV4cGlyZXNfaW46IGluZm8uZXhwaXJlc19pbiwgYWNjZXNzX3Rva2VuOiAnQmVhcmVyICcgKyBpbmZvLmFjY2Vzc190b2tlbiB9LCBmYWxzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBuYXRpdmVDYWNoZTogYW55ID0gU3RvcmFnZU1nci5TdG9yYWdlLmdldE9iamVjdCgnQXV0aEluZm8nLCBudWxsKTtcbiAgICAgICAgICAgIGlmIChuYXRpdmVDYWNoZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZXhwaXJlc19pbiA9IG5hdGl2ZUNhY2hlLmV4cGlyZXNfaW47XG4gICAgICAgICAgICAgICAgdGhpcy5hY2Nlc3NfdG9rZW4gPSBuYXRpdmVDYWNoZS5hY2Nlc3NfdG9rZW47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59Il19