"use strict";
cc._RF.push(module, '2e934QmhcRJrJAW1PYlvuYi', 'LoadingScene');
// Script/Logic/Loading/LoadingScene.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var M_1 = require("../../Base/Manager/M");
var Common_1 = require("../Common/Common");
var Constant_1 = require("../Data/Const/Constant");
var Level_1 = require("../Data/Interface/Level");
var Paths_1 = require("../../Base/Utils/Paths");
var DailyTaskInfo_1 = require("../../Base/Tabls/DailyTaskInfo");
var BaseTable_1 = require("../../Base/Manager/Table/BaseTable");
var GameTableMgr_1 = require("../../Base/Manager/GameTableMgr");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LoadingScene = /** @class */ (function (_super) {
    __extends(LoadingScene, _super);
    function LoadingScene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loadingLabel = null;
        _this.versionLabel = null;
        _this.loding = null;
        _this.progress = null;
        _this.startButton = null;
        return _this;
    }
    LoadingScene.prototype.onLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        M_1.default.init();
                        M_1.default.platform.init({ appId: Constant_1.APPID });
                        return [4 /*yield*/, this._withTimeout(M_1.default.net.login(), 3000, null, "登录")];
                    case 1:
                        data = _a.sent();
                        /**解析远程用户数据! */
                        M_1.default.runtime.initRemotData(data);
                        /**解析配置表 */
                        return [4 /*yield*/, this._withTimeout(GameTableMgr_1.GameTableMgr.ins.execute(), 5000, false, "配置表加载")];
                    case 2:
                        /**解析配置表 */
                        _a.sent();
                        this._updateProgress(10);
                        /**预加载三消主玩法 */
                        this._preLoadMatch3();
                        /**每日任务模块 */
                        this._initDailyTask();
                        return [2 /*return*/];
                }
            });
        });
    };
    /*
        private _preLoadMapScene() {
            cc.director.preloadScene(Scene.Map, null, (error: Error, asset: cc.SceneAsset) => {
                let buildingArr = [];
                let buildingState = StorageMgr.Storage.getObject(StorageMgr.Storage.BuildingState);
                let exchanges = asset.scene.getComponentsInChildren(Exchange);
                exchanges.forEach((exchange: Exchange) => {
                    if (exchange.enabled) {
                        let key = exchange.buildingId;
                        let singleBuildState = buildingState ? buildingState[key] : null;
                        if (singleBuildState) {
                            buildingArr.push('prefab/map/' + exchange.path + singleBuildState.state);
                        } else {
                            buildingArr.push('prefab/map/' + exchange.path + exchange.state);
                        }
                    }
                });
                for (let i = 1; i <= 25; i++) {
                    buildingArr.push('texture/map/bg/map_' + (i < 10 ? '0' + i : i));
                }
                cc.loader.loadResArray(buildingArr, null, (err, resource: any[]) => {
                    if (!err) {
                        console.log('预加载map资源完毕!');
                    } else {
                        console.warn("加载出错" + err);
                    }
                })
            });
        }
    */
    /**预加载酒店的关系信息 */
    // private _preLoadAccData() {
    //     //请求访客信息
    //     M.net.getOnlineList().then(data => {
    //     });
    //     //请求好友信息
    //     M.net.getFriendList().then(data => {
    //     });
    //     //请求事件信息
    //     M.net.getInteractiveList().then(data => {
    //     });
    // }
    //进入游戏直接加载三消主玩法
    LoadingScene.prototype._preLoadMatch3 = function () {
        var _this = this;
        var preloadArr = [
            "prefab/ui/GameLoading",
            "prefab/ui/GameShowTarget",
            "prefab/ui/GameWin",
            "prefab/ui/GameFail",
            "prefab/ui/GameFailEncourage",
            "texture/guide/guide_role_2"
        ];
        cc.loader.loadResArray(preloadArr, function (completedCount, totalCount, item) {
            _this._updateProgress(Math.ceil(10 + (completedCount / totalCount) * 40));
        }, function (err, resource) {
            if (err) {
                console.error('预加载三消资源出错!', err);
                return;
            }
            cc.director.preloadScene(Constant_1.Scene.Match, function (completedCount, totalCount, item) {
                _this._updateProgress(Math.ceil(50 + (completedCount / totalCount) * 50));
            }, function (error) {
                if (error) {
                    console.error('预加载三消场景出错!', error);
                    return;
                }
                //预加载当前关卡
                Level_1.default.ins.getLvCfgData(null);
                _this._updateProgress(100);
                _this.scheduleOnce(function () {
                    M_1.default.runtime.SelectLevel = 0;
                    Common_1.default.jumpScene(Constant_1.Scene.Match);
                }, 0.2);
            });
        });
    };
    LoadingScene.prototype._initDailyTask = function () {
        var _this = this;
        //请求配置!
        cc.loader.load(Paths_1.default.DailyTaskConfig, function (err, tex) { return __awaiter(_this, void 0, void 0, function () {
            var _a, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (err || !tex) {
                            console.error('获取任务配置出错!');
                            return [2 /*return*/];
                        }
                        GameTableMgr_1.GameTableMgr.ins.DailyTaskInfo = new BaseTable_1.BaseTable("id", "DailyTaskInfo", DailyTaskInfo_1.default, null);
                        GameTableMgr_1.GameTableMgr.ins.DailyTaskInfo['readyOK'](tex);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        _a = M_1.default.runtime;
                        return [4 /*yield*/, this._withTimeout(M_1.default.net.getDailyTask(), 3000, null, "每日任务数据")];
                    case 2:
                        _a.DailyTaskProgress = _b.sent();
                        M_1.default.runtime.initTaskNativeData();
                        console.error(' M.runtime.DailyTaskProgress: ', M_1.default.runtime.DailyTaskProgress);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        console.warn('每日任务初始化失败，不影响主玩法进入:', error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    LoadingScene.prototype._updateProgress = function (progress) {
        this.loadingLabel.string = '加载中 ' + progress + '%';
    };
    LoadingScene.prototype._withTimeout = function (promise, timeoutMs, fallback, name) {
        return new Promise(function (resolve) {
            var finished = false;
            var timer = setTimeout(function () {
                if (finished) {
                    return;
                }
                finished = true;
                console.warn(name + "\u8D85\u65F6\uFF0C\u4F7F\u7528\u672C\u5730\u515C\u5E95\u7EE7\u7EED\u6E38\u620F");
                resolve(fallback);
            }, timeoutMs);
            promise.then(function (result) {
                if (finished) {
                    return;
                }
                finished = true;
                clearTimeout(timer);
                resolve(result);
            }).catch(function (error) {
                if (finished) {
                    return;
                }
                finished = true;
                clearTimeout(timer);
                console.warn(name + "\u5931\u8D25\uFF0C\u4F7F\u7528\u672C\u5730\u515C\u5E95\u7EE7\u7EED\u6E38\u620F:", error);
                resolve(fallback);
            });
        });
    };
    LoadingScene.prototype.testDownloadZip = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = 'https://mini-game-cent251001060.cos.ap-guangzhou.myqcloud.com/soe/test.zip';
                        return [4 /*yield*/, M_1.default.platform.downLoadFile({ url: url, filePath: null })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        property(cc.Label)
    ], LoadingScene.prototype, "loadingLabel", void 0);
    __decorate([
        property(cc.Label)
    ], LoadingScene.prototype, "versionLabel", void 0);
    __decorate([
        property(cc.Node)
    ], LoadingScene.prototype, "loding", void 0);
    __decorate([
        property(cc.Node)
    ], LoadingScene.prototype, "progress", void 0);
    __decorate([
        property(cc.Node)
    ], LoadingScene.prototype, "startButton", void 0);
    LoadingScene = __decorate([
        ccclass
    ], LoadingScene);
    return LoadingScene;
}(cc.Component));
exports.default = LoadingScene;

cc._RF.pop();