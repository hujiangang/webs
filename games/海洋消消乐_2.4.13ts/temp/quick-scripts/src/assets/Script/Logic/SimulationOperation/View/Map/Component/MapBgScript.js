"use strict";
cc._RF.push(module, 'de001LKxaVP/YzA2WAL/FWw', 'MapBgScript');
// Script/Logic/SimulationOperation/View/Map/Component/MapBgScript.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MapBgScript = /** @class */ (function (_super) {
    __extends(MapBgScript, _super);
    function MapBgScript() {
        // @property(cc.Sprite)
        // mapSprite: cc.Sprite = null;
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._mapScale = 2;
        return _this;
        // showInEditor: boolean = true;
        // onEnable() {
        //     if (CC_EDITOR && this.showInEditor) {
        //         console.error("sss");
        //         // cc.loader.loadRes("texture/map/bg/" + this.mapId, cc.SpriteFrame, (error, spriteFrame) => {
        //         //     if (!error) this.spriteBg.spriteFrame = spriteFrame;
        //         // });
        //     }
        //     this.node.scale = this._mapScale;
        // }
    }
    // @property(cc.String)
    // mapId: string = "";
    // @property(cc.Sprite)
    // spriteBg: cc.Sprite = null;
    MapBgScript.prototype.onLoad = function () {
        // this.node.width = 1000;
        // this.node.height = 800;
        this.node.scale = this._mapScale;
    };
    MapBgScript = __decorate([
        ccclass
    ], MapBgScript);
    return MapBgScript;
}(cc.Component));
exports.default = MapBgScript;

cc._RF.pop();