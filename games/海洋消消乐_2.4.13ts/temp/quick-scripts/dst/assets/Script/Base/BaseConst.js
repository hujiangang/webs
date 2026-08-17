
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Base/BaseConst.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCYXNlXFxCYXNlQ29uc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0JBLElBQVksWUFTWDtBQVRELFdBQVksWUFBWTtJQUNwQiwrQ0FBUyxDQUFBO0lBQ1QscURBQU0sQ0FBQTtJQUNOLDZDQUFFLENBQUE7SUFDRixxREFBTSxDQUFBO0lBQ04saURBQUksQ0FBQTtJQUNKLGlEQUFJLENBQUE7SUFDSixtREFBSyxDQUFBO0lBQ0wsNkNBQUUsQ0FBQTtBQUNOLENBQUMsRUFUVyxZQUFZLEdBQVosb0JBQVksS0FBWixvQkFBWSxRQVN2QjtBQUVELGNBQWM7QUFDZCxJQUFZLFVBS1g7QUFMRCxXQUFZLFVBQVU7SUFDbEIsMkNBQVEsQ0FBQTtJQUNSLGlEQUFPLENBQUE7SUFDUCw2Q0FBSyxDQUFBO0lBQ0wsaURBQU8sQ0FBQTtBQUNYLENBQUMsRUFMVyxVQUFVLEdBQVYsa0JBQVUsS0FBVixrQkFBVSxRQUtyQjtBQUVZLFFBQUEsZ0JBQWdCLEdBQUc7SUFDNUIsTUFBTSxFQUFFLFFBQVE7SUFDaEIsTUFBTSxFQUFFLFFBQVE7SUFDaEIsZ0JBQWdCLEVBQUUsa0JBQWtCO0lBQ3BDLGVBQWUsRUFBRSxpQkFBaUI7Q0FDckMsQ0FBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxuZXhwb3J0IGludGVyZmFjZSBJVXNlckluZm8ge1xuICAgIC8qKiDnlKjmiLfmmLXnp7AqL1xuICAgIG5pY2tOYW1lOiBzdHJpbmc7XG4gICAgLyoqIOeUqOaIt+WktOWDj+WbvueJh+eahCBVUkzjgIJVUkwg5pyA5ZCO5LiA5Liq5pWw5YC85Luj6KGo5q2j5pa55b2i5aS05YOP5aSn5bCP77yI5pyJIDDjgIE0NuOAgTY044CBOTbjgIExMzIg5pWw5YC85Y+v6YCJ77yMMCDku6PooaggNjQweDY0MCDnmoTmraPmlrnlvaLlpLTlg4/vvIw0NiDooajnpLogNDZ4NDYg55qE5q2j5pa55b2i5aS05YOP77yM5Ymp5L2Z5pWw5YC85Lul5q2k57G75o6o44CC6buY6K6kMTMy77yJ77yM55So5oi35rKh5pyJ5aS05YOP5pe26K+l6aG55Li656m644CC6Iul55So5oi35pu05o2i5aS05YOP77yM5Y6f5pyJ5aS05YOPIFVSTCDlsIblpLHmlYjjgIIqL1xuICAgIGF2YXRhclVybDogc3RyaW5nO1xuICAgIC8qKiDnlKjmiLfmgKfliKsqL1xuICAgIGdlbmRlcjogMCB8IDEgfCAyO1xuICAgIC8qKiDnlKjmiLfmiYDlnKjlm73lrrYqL1xuICAgIGNvdW50cnk6IHN0cmluZztcbiAgICAvKiog55So5oi35omA5Zyo55yB5Lu9Ki9cbiAgICBwcm92aW5jZTogc3RyaW5nO1xuICAgIC8qKiDnlKjmiLfmiYDlnKjln47luIIqL1xuICAgIGNpdHk6IHN0cmluZztcbiAgICAvKiog5pi+56S6IGNvdW50cnnvvIxwcm92aW5jZe+8jGNpdHkg5omA55So55qE6K+t6KiAKi9cbiAgICBsYW5ndWFnZTogJ2VuJyB8ICd6aF9DTicgfCAnemhfVFcnXG59XG5cbmV4cG9ydCBlbnVtIFBsYXRmb3JtVHlwZSB7XG4gICAgV2ViID0gMTAwLFxuICAgIFd4R2FtZSxcbiAgICBRUSxcbiAgICBRUVpvbmUsXG4gICAgT3BwbyxcbiAgICBWaXZvLFxuICAgIFdhbkJhLFxuICAgIFVjXG59XG5cbi8qKiDnianlk4FJROWvueW6lOihqCAqL1xuZXhwb3J0IGVudW0gQ3VycmVuY3lJZCB7XG4gICAgQ29pbiA9IDAsXG4gICAgRGlhbW9uZCxcbiAgICBQb3dlcixcbiAgICBUYXNrS2V5XG59XG5cbmV4cG9ydCBjb25zdCBQbGF0Zm9ybUV2ZW5UeXBlID0ge1xuICAgIE9uU2hvdzogXCJPblNob3dcIixcbiAgICBPbkhpZGU6IFwiT25IaWRlXCIsXG4gICAgT25OZXRXb3JrQ2hhbmdlZDogXCJPbk5ldFdvcmtDaGFuZ2VkXCIsXG4gICAgT25NZW1vcnlXYXJuaW5nOiBcIk9uTWVtb3J5V2FybmluZ1wiXG59XG5cbiJdfQ==