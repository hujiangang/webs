"use strict";
cc._RF.push(module, 'df9e4bIlQBOGLN7g6bVfllT', 'BaseConst');
// Script/Base/BaseConst.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformEvenType = exports.CurrencyId = exports.PlatformType = void 0;
var PlatformType;
(function (PlatformType) {
    PlatformType[PlatformType["Web"] = 100] = "Web";
    PlatformType[PlatformType["WxGame"] = 101] = "WxGame";
    PlatformType[PlatformType["QQ"] = 102] = "QQ";
    PlatformType[PlatformType["QQZone"] = 103] = "QQZone";
    PlatformType[PlatformType["Oppo"] = 104] = "Oppo";
    PlatformType[PlatformType["Vivo"] = 105] = "Vivo";
    PlatformType[PlatformType["WanBa"] = 106] = "WanBa";
    PlatformType[PlatformType["Uc"] = 107] = "Uc";
})(PlatformType = exports.PlatformType || (exports.PlatformType = {}));
/** 物品ID对应表 */
var CurrencyId;
(function (CurrencyId) {
    CurrencyId[CurrencyId["Coin"] = 0] = "Coin";
    CurrencyId[CurrencyId["Diamond"] = 1] = "Diamond";
    CurrencyId[CurrencyId["Power"] = 2] = "Power";
    CurrencyId[CurrencyId["TaskKey"] = 3] = "TaskKey";
})(CurrencyId = exports.CurrencyId || (exports.CurrencyId = {}));
exports.PlatformEvenType = {
    OnShow: "OnShow",
    OnHide: "OnHide",
    OnNetWorkChanged: "OnNetWorkChanged",
    OnMemoryWarning: "OnMemoryWarning"
};

cc._RF.pop();