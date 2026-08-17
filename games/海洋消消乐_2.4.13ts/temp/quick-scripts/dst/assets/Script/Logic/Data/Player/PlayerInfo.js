
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Data/Player/PlayerInfo.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcRGF0YVxcUGxheWVyXFxQbGF5ZXJJbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQXdEO0FBRXhELCtEQUE4RDtBQUU5RDtJQUFBO1FBRUksMkJBQTJCO1FBQ3BCLFdBQU0sR0FBVyxDQUFDLENBQUMsQ0FBQztRQUMzQixVQUFVO1FBQ0gsYUFBUSxHQUFXLElBQUksQ0FBQztRQUMvQixvSkFBb0o7UUFDN0ksY0FBUyxHQUFXLEVBQUUsQ0FBQztRQUM5QixVQUFVO1FBQ0gsV0FBTSxHQUFjLENBQUMsQ0FBQztRQUM3QixZQUFZO1FBQ0wsWUFBTyxHQUFXLElBQUksQ0FBQztRQUM5QixZQUFZO1FBQ0wsU0FBSSxHQUFXLElBQUksQ0FBQztRQUMzQixrQkFBa0I7UUFDWCxlQUFVLEdBQVcsQ0FBQyxDQUFDO1FBQzlCLGVBQWU7UUFDUixnQkFBVyxHQUFXLENBQUMsQ0FBQztRQUMvQixXQUFXO1FBQ0osVUFBSyxHQUFXLEVBQUUsQ0FBQztRQUMxQixXQUFXO1FBQ0osY0FBUyxHQUFRLEVBQUUsQ0FBQztRQUUzQixVQUFVO1FBQ0gsVUFBSyxHQUFXLENBQUMsQ0FBQztRQUN6QixXQUFXO1FBQ0osU0FBSSxHQUFXLENBQUMsQ0FBQztRQUN4QixXQUFXO1FBQ0osWUFBTyxHQUFXLENBQUMsQ0FBQztRQUMzQixXQUFXO1FBQ0osVUFBSyxHQUFXLENBQUMsQ0FBQztRQUN6QixxQkFBcUI7UUFDZCxnQkFBVyxHQUFXLENBQUMsQ0FBQztRQUMvQixVQUFVO1FBQ0gsWUFBTyxHQUFXLENBQUMsQ0FBQztRQUMzQixvQkFBb0I7UUFDYixhQUFRLEdBQStDLEVBQUUsQ0FBQztRQUNqRSxhQUFhO1FBQ04sZ0JBQVcsR0FBVyxDQUFDLENBQUM7UUFFeEIsVUFBSyxHQUEwRCxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBK0RwRixDQUFDO0lBN0RHLFNBQVM7SUFDRixrQ0FBYSxHQUFwQixV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QUFtRTtJQUN2RSxDQUFDO0lBQ0wsaUJBQUM7QUFBRCxDQXZHQSxBQXVHQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJvcFR5cGUsIE5hdGl2ZUtleSB9IGZyb20gXCIuLi9Db25zdC9Db25zdGFudFwiO1xuaW1wb3J0IHsgVXRpbCB9IGZyb20gXCIuLi8uLi8uLi9CYXNlL1V0aWxzL1V0aWxcIjtcbmltcG9ydCB7IFN0b3JhZ2VNZ3IgfSBmcm9tIFwiLi4vLi4vLi4vQmFzZS9NYW5hZ2VyL1N0b3JhZ2VNZ3JcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVySW5mbyB7XG5cbiAgICAvKirnlKjmiLfllK/kuIDor4bliKtpZCzmr5TlpoLlvq7kv6HlsLHmmK9vcGVuaWQgKi9cbiAgICBwdWJsaWMgdXNlcklkOiBudW1iZXIgPSAtMTtcbiAgICAvKiog55So5oi35pi156ewKi9cbiAgICBwdWJsaWMgbmlja05hbWU6IHN0cmluZyA9ICd0dCc7XG4gICAgLyoqIOeUqOaIt+WktOWDj+WbvueJh+eahCBVUkzjgIJVUkwg5pyA5ZCO5LiA5Liq5pWw5YC85Luj6KGo5q2j5pa55b2i5aS05YOP5aSn5bCP77yI5pyJIDDjgIE0NuOAgTY044CBOTbjgIExMzIg5pWw5YC85Y+v6YCJ77yMMCDku6PooaggNjQweDY0MCDnmoTmraPmlrnlvaLlpLTlg4/vvIw0NiDooajnpLogNDZ4NDYg55qE5q2j5pa55b2i5aS05YOP77yM5Ymp5L2Z5pWw5YC85Lul5q2k57G75o6o44CC6buY6K6kMTMy77yJ77yM55So5oi35rKh5pyJ5aS05YOP5pe26K+l6aG55Li656m644CC6Iul55So5oi35pu05o2i5aS05YOP77yM5Y6f5pyJ5aS05YOPIFVSTCDlsIblpLHmlYjjgIIqL1xuICAgIHB1YmxpYyBhdmF0YXJVcmw6IHN0cmluZyA9ICcnO1xuICAgIC8qKiDnlKjmiLfmgKfliKsqL1xuICAgIHB1YmxpYyBnZW5kZXI6IDAgfCAxIHwgMiA9IDA7XG4gICAgLyoqIOeUqOaIt+aJgOWcqOWbveWutiovXG4gICAgcHVibGljIGNvdW50cnk6IHN0cmluZyA9ICdjbic7XG4gICAgLyoqIOeUqOaIt+aJgOWcqOWfjuW4giovXG4gICAgcHVibGljIGNpdHk6IHN0cmluZyA9ICdzeic7XG4gICAgLyoqIOacjeWKoeWZqOW9k+WJjeeahOezu+e7n+aXtumXtOaIsyAqL1xuICAgIHB1YmxpYyBzZXJ2ZXJUaW1lOiBudW1iZXIgPSAwO1xuICAgIC8qKiDkuIrkuIDmrKHkuIvnur/ml7bpl7TmiLMgKi9cbiAgICBwdWJsaWMgb2ZmbGluZVRpbWU6IG51bWJlciA9IDA7XG4gICAgLyoqIOW9k+WJjeWcuuaZryAqL1xuICAgIHB1YmxpYyBzY2VuZTogc3RyaW5nID0gJyc7XG4gICAgLyoqIOW8gOWFs+iuvue9riAqL1xuICAgIHB1YmxpYyBzd2l0Y2hTZXQ6IGFueSA9IHt9O1xuXG4gICAgLyoqIOW9k+WJjeS9k+WKmyovXG4gICAgcHVibGljIHBvd2VyOiBudW1iZXIgPSAwO1xuICAgIC8qKiDnlKjmiLfph5HpkrEgKi9cbiAgICBwdWJsaWMgY29pbjogbnVtYmVyID0gMDtcbiAgICAvKiog55So5oi36ZK755+zICovXG4gICAgcHVibGljIGRpYW1vbmQ6IG51bWJlciA9IDA7XG4gICAgLyoqIOeUqOaIt+etiee6pyAqL1xuICAgIHB1YmxpYyBsZXZlbDogbnVtYmVyID0gMTtcbiAgICAvKiog5raI6Zmk5YWz5Y2hKOWQjOatpeWIsOeahOacgOmrmOWFs+WNoSkgKi9cbiAgICBwdWJsaWMgbWF0aGMzTGV2ZWw6IG51bWJlciA9IDE7XG4gICAgLyoq5b2T5YmN56ug6IqCICovXG4gICAgcHVibGljIGNoYXB0ZXI6IG51bWJlciA9IDE7XG4gICAgLyoqIOW9k+WJjeeahOmBk+WFt+aVsOaNrijog4zljIXkv6Hmga8pICovXG4gICAgcHVibGljIHByb3BEYXRhOiB7IFt0eXBlOiBudW1iZXJdOiB7IGNvdW50OiBudW1iZXIgfSB9ID0gPGFueT57fTtcbiAgICAvKirlvZPliY3nmoTorrDml7bml7bpl7QgKi9cbiAgICBwdWJsaWMgdGltZUNvdW50ZXI6IG51bWJlciA9IDA7XG5cbiAgICBwdWJsaWMgbHZNYXA6IE1hcDxudW1iZXIgfCBzdHJpbmcsIHsgc2NvcmU6IG51bWJlciwgc3RhcjogbnVtYmVyIH0+ID0gbmV3IE1hcCgpO1xuXG4gICAgLyoq5aGe5pWw5o2uICovXG4gICAgcHVibGljIGluaXRSZW1vdERhdGEoZGF0YSkge1xuICAgICAgICB0aGlzLmx2TWFwLmNsZWFyKCk7XG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGRhdGEgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghZGF0YVtOYXRpdmVLZXkuUGxheWVySW5mb10pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldE5vcm1hbFBvd2VyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBkYXRhKSB7XG4gICAgICAgICAgICAgICAgaWYgKGtleSA9PSA8YW55Pk5hdGl2ZUtleS5QbGF5ZXJJbmZvKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3luY1BsYXllckRhdGEoZGF0YVtrZXldKVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5LmluZGV4T2YoYCR7TmF0aXZlS2V5Lkx2RGF0YUtleS50b1N0cmluZygpfV9gKSAhPSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmx2TWFwLnNldChrZXksIEpTT04ucGFyc2UoZGF0YVtrZXldKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXROb3JtYWxQb3dlcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzeW5jUGxheWVyRGF0YShkYXRhKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZGF0YSA9PSAnc3RyaW5nJykgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICAgIGZvciAoY29uc3QgcGxheWVyS2V5IGluIGRhdGEpIHtcbiAgICAgICAgICAgIGlmICh0aGlzW3BsYXllcktleV0gIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpc1twbGF5ZXJLZXldID0gZGF0YVtwbGF5ZXJLZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXROb3JtYWxQb3dlcigpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IFN0b3JhZ2VNZ3IuU3RvcmFnZS5nZXRPYmplY3QoTmF0aXZlS2V5LlBsYXllckluZm8sIG51bGwpXG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICAvLyB0aGlzLnN5bmNQbGF5ZXJEYXRhKGRhdGEpO1xuICAgICAgICAgICAgU3RvcmFnZU1nci5TdG9yYWdlLnJlbW92ZUFsbCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucG93ZXIgPSAzMDtcbiAgICAgICAgdGhpcy5zYXZlRGF0YSgncG93ZXInKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2F2ZUxhc3RUaW1lKCkge1xuICAgICAgICBTdG9yYWdlTWdyLlN0b3JhZ2Uuc2V0SW50KE5hdGl2ZUtleS5MYXN0VGltZSwgdGhpcy5zZXJ2ZXJUaW1lKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0TGFzdFRpbWUoKSB7XG4gICAgICAgIHJldHVybiBTdG9yYWdlTWdyLlN0b3JhZ2UuZ2V0SW50KE5hdGl2ZUtleS5MYXN0VGltZSwgMCk7XG4gICAgfVxuXG4gICAgcHVibGljIHNhdmVEYXRhKGtleTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IFN0b3JhZ2VNZ3IuU3RvcmFnZS5nZXRPYmplY3QoTmF0aXZlS2V5LlBsYXllckluZm8sIHt9KTtcbiAgICAgICAgICAgIGRhdGFba2V5XSA9IHRoaXNba2V5XTtcbiAgICAgICAgICAgIFN0b3JhZ2VNZ3IuU3RvcmFnZS5zZXRPYmplY3QoTmF0aXZlS2V5LlBsYXllckluZm8sIGRhdGEsIHRydWUpO1xuICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBwdWJsaWMgX3NhdmVBbGwoKSB7XG4gICAgICAgIC8vIFN0b3JhZ2VNZ3IuU3RvcmFnZS5zZXRTdG9yYWdlKE5hdGl2ZUtleS5QbGF5ZXJJbmZvLCB0aGlzLCB0cnVlKTtcbiAgICB9XG59Il19