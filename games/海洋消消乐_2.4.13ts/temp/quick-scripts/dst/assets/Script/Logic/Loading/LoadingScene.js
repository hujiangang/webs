
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Loading/LoadingScene.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcTG9hZGluZ1xcTG9hZGluZ1NjZW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDBDQUFxQztBQUNyQywyQ0FBc0M7QUFDdEMsbURBQXNEO0FBQ3RELGlEQUE0QztBQUM1QyxnREFBMkM7QUFDM0MsZ0VBQTJEO0FBQzNELGdFQUErRDtBQUMvRCxnRUFBK0Q7QUFFekQsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBMEMsZ0NBQVk7SUFBdEQ7UUFBQSxxRUFvTEM7UUFqTEcsa0JBQVksR0FBYSxJQUFJLENBQUM7UUFHOUIsa0JBQVksR0FBYSxJQUFJLENBQUM7UUFHOUIsWUFBTSxHQUFZLElBQUksQ0FBQztRQUd2QixjQUFRLEdBQVksSUFBSSxDQUFDO1FBR3pCLGlCQUFXLEdBQVksSUFBSSxDQUFDOztJQXFLaEMsQ0FBQztJQW5LUyw2QkFBTSxHQUFaOzs7Ozs7d0JBRUksV0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO3dCQUNULFdBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLGdCQUFLLEVBQUUsQ0FBQyxDQUFDO3dCQUdyQixxQkFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBQTs7d0JBQS9ELElBQUksR0FBRyxTQUF3RDt3QkFDckUsZUFBZTt3QkFDZixXQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDOUIsV0FBVzt3QkFDWCxxQkFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLDJCQUFZLENBQUMsR0FBRyxD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QyxDQXBMeUMsRUFBRSxDQUFDLFNBQVMsR0FvTHJEO2tCQXBMb0IsWUFBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IE0gZnJvbSBcIi4uLy4uL0Jhc2UvTWFuYWdlci9NXCI7XG5pbXBvcnQgQ29tbW9uIGZyb20gXCIuLi9Db21tb24vQ29tbW9uXCI7XG5pbXBvcnQgeyBTY2VuZSwgQVBQSUQgfSBmcm9tIFwiLi4vRGF0YS9Db25zdC9Db25zdGFudFwiO1xuaW1wb3J0IExldmVsIGZyb20gXCIuLi9EYXRhL0ludGVyZmFjZS9MZXZlbFwiO1xuaW1wb3J0IFBhdGhzIGZyb20gXCIuLi8uLi9CYXNlL1V0aWxzL1BhdGhzXCI7XG5pbXBvcnQgRGFpbHlUYXNrSW5mbyBmcm9tIFwiLi4vLi4vQmFzZS9UYWJscy9EYWlseVRhc2tJbmZvXCI7XG5pbXBvcnQgeyBCYXNlVGFibGUgfSBmcm9tIFwiLi4vLi4vQmFzZS9NYW5hZ2VyL1RhYmxlL0Jhc2VUYWJsZVwiO1xuaW1wb3J0IHsgR2FtZVRhYmxlTWdyIH0gZnJvbSBcIi4uLy4uL0Jhc2UvTWFuYWdlci9HYW1lVGFibGVNZ3JcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvYWRpbmdTY2VuZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgbG9hZGluZ0xhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gICAgdmVyc2lvbkxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBsb2Rpbmc6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcHJvZ3Jlc3M6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgc3RhcnRCdXR0b246IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgYXN5bmMgb25Mb2FkKCkge1xuXG4gICAgICAgIE0uaW5pdCgpO1xuICAgICAgICBNLnBsYXRmb3JtLmluaXQoeyBhcHBJZDogQVBQSUQgfSk7XG5cbiAgICAgICAgLyoq6L+b6KGM55m75b2V77yM5rWL6K+V546v5aKD572R57uc5byC5bi45pe25LiN6Zi75aGe6L+b5YWl5Li7546p5rOVICovXG4gICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLl93aXRoVGltZW91dChNLm5ldC5sb2dpbigpLCAzMDAwLCBudWxsLCBcIueZu+W9lVwiKTtcbiAgICAgICAgLyoq6Kej5p6Q6L+c56iL55So5oi35pWw5o2uISAqL1xuICAgICAgICBNLnJ1bnRpbWUuaW5pdFJlbW90RGF0YShkYXRhKTtcbiAgICAgICAgLyoq6Kej5p6Q6YWN572u6KGoICovXG4gICAgICAgIGF3YWl0IHRoaXMuX3dpdGhUaW1lb3V0KEdhbWVUYWJsZU1nci5pbnMuZXhlY3V0ZSgpLCA1MDAwLCBmYWxzZSwgXCLphY3nva7ooajliqDovb1cIik7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVByb2dyZXNzKDEwKTtcbiAgICAgICAgLyoq6aKE5Yqg6L295LiJ5raI5Li7546p5rOVICovXG4gICAgICAgIHRoaXMuX3ByZUxvYWRNYXRjaDMoKTtcbiAgICAgICAgLyoq5q+P5pel5Lu75Yqh5qih5Z2XICovXG4gICAgICAgIHRoaXMuX2luaXREYWlseVRhc2soKTtcbiAgICB9XG4gICAgLypcbiAgICAgICAgcHJpdmF0ZSBfcHJlTG9hZE1hcFNjZW5lKCkge1xuICAgICAgICAgICAgY2MuZGlyZWN0b3IucHJlbG9hZFNjZW5lKFNjZW5lLk1hcCwgbnVsbCwgKGVycm9yOiBFcnJvciwgYXNzZXQ6IGNjLlNjZW5lQXNzZXQpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYnVpbGRpbmdBcnIgPSBbXTtcbiAgICAgICAgICAgICAgICBsZXQgYnVpbGRpbmdTdGF0ZSA9IFN0b3JhZ2VNZ3IuU3RvcmFnZS5nZXRPYmplY3QoU3RvcmFnZU1nci5TdG9yYWdlLkJ1aWxkaW5nU3RhdGUpO1xuICAgICAgICAgICAgICAgIGxldCBleGNoYW5nZXMgPSBhc3NldC5zY2VuZS5nZXRDb21wb25lbnRzSW5DaGlsZHJlbihFeGNoYW5nZSk7XG4gICAgICAgICAgICAgICAgZXhjaGFuZ2VzLmZvckVhY2goKGV4Y2hhbmdlOiBFeGNoYW5nZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXhjaGFuZ2UuZW5hYmxlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGtleSA9IGV4Y2hhbmdlLmJ1aWxkaW5nSWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2luZ2xlQnVpbGRTdGF0ZSA9IGJ1aWxkaW5nU3RhdGUgPyBidWlsZGluZ1N0YXRlW2tleV0gOiBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNpbmdsZUJ1aWxkU3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWlsZGluZ0Fyci5wdXNoKCdwcmVmYWIvbWFwLycgKyBleGNoYW5nZS5wYXRoICsgc2luZ2xlQnVpbGRTdGF0ZS5zdGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1aWxkaW5nQXJyLnB1c2goJ3ByZWZhYi9tYXAvJyArIGV4Y2hhbmdlLnBhdGggKyBleGNoYW5nZS5zdGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSAyNTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkaW5nQXJyLnB1c2goJ3RleHR1cmUvbWFwL2JnL21hcF8nICsgKGkgPCAxMCA/ICcwJyArIGkgOiBpKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzQXJyYXkoYnVpbGRpbmdBcnIsIG51bGwsIChlcnIsIHJlc291cmNlOiBhbnlbXSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+mihOWKoOi9vW1hcOi1hOa6kOWujOavlSEnKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIuWKoOi9veWHuumUmVwiICsgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICovXG5cbiAgICAvKirpooTliqDovb3phZLlupfnmoTlhbPns7vkv6Hmga8gKi9cbiAgICAvLyBwcml2YXRlIF9wcmVMb2FkQWNjRGF0YSgpIHtcbiAgICAvLyAgICAgLy/or7fmsYLorr/lrqLkv6Hmga9cbiAgICAvLyAgICAgTS5uZXQuZ2V0T25saW5lTGlzdCgpLnRoZW4oZGF0YSA9PiB7XG5cbiAgICAvLyAgICAgfSk7XG4gICAgLy8gICAgIC8v6K+35rGC5aW95Y+L5L+h5oGvXG4gICAgLy8gICAgIE0ubmV0LmdldEZyaWVuZExpc3QoKS50aGVuKGRhdGEgPT4ge1xuXG4gICAgLy8gICAgIH0pO1xuICAgIC8vICAgICAvL+ivt+axguS6i+S7tuS/oeaBr1xuICAgIC8vICAgICBNLm5ldC5nZXRJbnRlcmFjdGl2ZUxpc3QoKS50aGVuKGRhdGEgPT4ge1xuXG4gICAgLy8gICAgIH0pO1xuICAgIC8vIH1cblxuICAgIC8v6L+b5YWl5ri45oiP55u05o6l5Yqg6L295LiJ5raI5Li7546p5rOVXG4gICAgcHJpdmF0ZSBfcHJlTG9hZE1hdGNoMygpIHtcbiAgICAgICAgY29uc3QgcHJlbG9hZEFyciA9IFtcbiAgICAgICAgICAgIFwicHJlZmFiL3VpL0dhbWVMb2FkaW5nXCIsXG4gICAgICAgICAgICBcInByZWZhYi91aS9HYW1lU2hvd1RhcmdldFwiLFxuICAgICAgICAgICAgXCJwcmVmYWIvdWkvR2FtZVdpblwiLFxuICAgICAgICAgICAgXCJwcmVmYWIvdWkvR2FtZUZhaWxcIixcbiAgICAgICAgICAgIFwicHJlZmFiL3VpL0dhbWVGYWlsRW5jb3VyYWdlXCIsXG4gICAgICAgICAgICBcInRleHR1cmUvZ3VpZGUvZ3VpZGVfcm9sZV8yXCJcbiAgICAgICAgXTtcbiAgICAgICAgY2MubG9hZGVyLmxvYWRSZXNBcnJheShwcmVsb2FkQXJyLCAoY29tcGxldGVkQ291bnQ6IG51bWJlciwgdG90YWxDb3VudDogbnVtYmVyLCBpdGVtOiBhbnkpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVByb2dyZXNzKE1hdGguY2VpbCgxMCArIChjb21wbGV0ZWRDb3VudCAvIHRvdGFsQ291bnQpICogNDApKTtcbiAgICAgICAgfSwgKGVyciwgcmVzb3VyY2U6IGFueVtdKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcign6aKE5Yqg6L295LiJ5raI6LWE5rqQ5Ye66ZSZIScsIGVycik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2MuZGlyZWN0b3IucHJlbG9hZFNjZW5lKFNjZW5lLk1hdGNoLCAoY29tcGxldGVkQ291bnQ6IG51bWJlciwgdG90YWxDb3VudDogbnVtYmVyLCBpdGVtOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVQcm9ncmVzcyhNYXRoLmNlaWwoNTAgKyAoY29tcGxldGVkQ291bnQgLyB0b3RhbENvdW50KSAqIDUwKSk7XG4gICAgICAgICAgICB9LCAoZXJyb3I6IEVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ+mihOWKoOi9veS4iea2iOWcuuaZr+WHuumUmSEnLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy/pooTliqDovb3lvZPliY3lhbPljaFcbiAgICAgICAgICAgICAgICBMZXZlbC5pbnMuZ2V0THZDZmdEYXRhKG51bGwpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVByb2dyZXNzKDEwMCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBNLnJ1bnRpbWUuU2VsZWN0TGV2ZWwgPSAwO1xuICAgICAgICAgICAgICAgICAgICBDb21tb24uanVtcFNjZW5lKFNjZW5lLk1hdGNoKTtcbiAgICAgICAgICAgICAgICB9LCAwLjIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2luaXREYWlseVRhc2soKSB7XG4gICAgICAgIC8v6K+35rGC6YWN572uIVxuICAgICAgICBjYy5sb2FkZXIubG9hZChQYXRocy5EYWlseVRhc2tDb25maWcsIGFzeW5jIChlcnIsIHRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKGVyciB8fCAhdGV4KSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcign6I635Y+W5Lu75Yqh6YWN572u5Ye66ZSZIScpO1xuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgR2FtZVRhYmxlTWdyLmlucy5EYWlseVRhc2tJbmZvID0gbmV3IEJhc2VUYWJsZTxudW1iZXIsIERhaWx5VGFza0luZm8+KFwiaWRcIiwgXCJEYWlseVRhc2tJbmZvXCIsIERhaWx5VGFza0luZm8sIG51bGwpO1xuICAgICAgICAgICAgR2FtZVRhYmxlTWdyLmlucy5EYWlseVRhc2tJbmZvWydyZWFkeU9LJ10odGV4KTtcblxuICAgICAgICAgICAgLy/op6PooajlrozmiJB+XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIE0ucnVudGltZS5EYWlseVRhc2tQcm9ncmVzcyA9IGF3YWl0IHRoaXMuX3dpdGhUaW1lb3V0KE0ubmV0LmdldERhaWx5VGFzaygpLCAzMDAwLCBudWxsLCBcIuavj+aXpeS7u+WKoeaVsOaNrlwiKTtcbiAgICAgICAgICAgICAgICBNLnJ1bnRpbWUuaW5pdFRhc2tOYXRpdmVEYXRhKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignIE0ucnVudGltZS5EYWlseVRhc2tQcm9ncmVzczogJywgTS5ydW50aW1lLkRhaWx5VGFza1Byb2dyZXNzKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCfmr4/ml6Xku7vliqHliJ3lp4vljJblpLHotKXvvIzkuI3lvbHlk43kuLvnjqnms5Xov5vlhaU6JywgZXJyb3IpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3VwZGF0ZVByb2dyZXNzKHByb2dyZXNzOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5sb2FkaW5nTGFiZWwuc3RyaW5nID0gJ+WKoOi9veS4rSAnICsgcHJvZ3Jlc3MgKyAnJSc7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfd2l0aFRpbWVvdXQ8VD4ocHJvbWlzZTogUHJvbWlzZTxUPiwgdGltZW91dE1zOiBudW1iZXIsIGZhbGxiYWNrOiBULCBuYW1lOiBzdHJpbmcpOiBQcm9taXNlPFQ+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPFQ+KChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICBsZXQgZmluaXNoZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGNvbnN0IHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGZpbmlzaGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZmluaXNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgJHtuYW1lfei2heaXtu+8jOS9v+eUqOacrOWcsOWFnOW6lee7p+e7rea4uOaIj2ApO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoZmFsbGJhY2spO1xuICAgICAgICAgICAgfSwgdGltZW91dE1zKTtcblxuICAgICAgICAgICAgcHJvbWlzZS50aGVuKChyZXN1bHQ6IFQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZmluaXNoZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmaW5pc2hlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZmluaXNoZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmaW5pc2hlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYCR7bmFtZX3lpLHotKXvvIzkvb/nlKjmnKzlnLDlhZzlupXnu6fnu63muLjmiI86YCwgZXJyb3IpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoZmFsbGJhY2spO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyB0ZXN0RG93bmxvYWRaaXAoKSB7XG4gICAgICAgIGNvbnN0IHVybCA9ICdodHRwczovL21pbmktZ2FtZS1jZW50MjUxMDAxMDYwLmNvcy5hcC1ndWFuZ3pob3UubXlxY2xvdWQuY29tL3NvZS90ZXN0LnppcCc7XG5cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgTS5wbGF0Zm9ybS5kb3duTG9hZEZpbGUoeyB1cmw6IHVybCwgZmlsZVBhdGg6IG51bGwgfSk7XG4gICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoJ2Rvd25sb2FkIG9rIDogJywgcmVzdWx0KTtcblxuICAgIH1cbn1cbiJdfQ==