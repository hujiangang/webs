
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/SimulationOperation/View/Map/Component/MapBgScript.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcU2ltdWxhdGlvbk9wZXJhdGlvblxcVmlld1xcTWFwXFxDb21wb25lbnRcXE1hcEJnU2NyaXB0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFNLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXlDLCtCQUFZO0lBQXJEO1FBRUksdUJBQXVCO1FBQ3ZCLCtCQUErQjtRQUhuQyxxRUE2QkM7UUF4QkcsZUFBUyxHQUFHLENBQUMsQ0FBQzs7UUFjZCxnQ0FBZ0M7UUFDaEMsZUFBZTtRQUNmLDRDQUE0QztRQUM1QyxnQ0FBZ0M7UUFDaEMseUdBQXlHO1FBQ3pHLHNFQUFzRTtRQUN0RSxpQkFBaUI7UUFDakIsUUFBUTtRQUNSLHdDQUF3QztRQUN4QyxJQUFJO0lBQ1IsQ0FBQztJQXRCRyx1QkFBdUI7SUFDdkIsc0JBQXNCO0lBRXRCLHVCQUF1QjtJQUN2Qiw4QkFBOEI7SUFFOUIsNEJBQU0sR0FBTjtRQUNJLDBCQUEwQjtRQUMxQiwwQkFBMEI7UUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUNyQyxDQUFDO0lBakJnQixXQUFXO1FBRC9CLE9BQU87T0FDYSxXQUFXLENBNkIvQjtJQUFELGtCQUFDO0NBN0JELEFBNkJDLENBN0J3QyxFQUFFLENBQUMsU0FBUyxHQTZCcEQ7a0JBN0JvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hcEJnU2NyaXB0IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIC8vIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgLy8gbWFwU3ByaXRlOiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgX21hcFNjYWxlID0gMjtcblxuICAgIC8vIEBwcm9wZXJ0eShjYy5TdHJpbmcpXG4gICAgLy8gbWFwSWQ6IHN0cmluZyA9IFwiXCI7XG5cbiAgICAvLyBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICAgIC8vIHNwcml0ZUJnOiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICAvLyB0aGlzLm5vZGUud2lkdGggPSAxMDAwO1xuICAgICAgICAvLyB0aGlzLm5vZGUuaGVpZ2h0ID0gODAwO1xuICAgICAgICB0aGlzLm5vZGUuc2NhbGUgPSB0aGlzLl9tYXBTY2FsZTtcbiAgICB9XG5cbiAgICAvLyBzaG93SW5FZGl0b3I6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8vIG9uRW5hYmxlKCkge1xuICAgIC8vICAgICBpZiAoQ0NfRURJVE9SICYmIHRoaXMuc2hvd0luRWRpdG9yKSB7XG4gICAgLy8gICAgICAgICBjb25zb2xlLmVycm9yKFwic3NzXCIpO1xuICAgIC8vICAgICAgICAgLy8gY2MubG9hZGVyLmxvYWRSZXMoXCJ0ZXh0dXJlL21hcC9iZy9cIiArIHRoaXMubWFwSWQsIGNjLlNwcml0ZUZyYW1lLCAoZXJyb3IsIHNwcml0ZUZyYW1lKSA9PiB7XG4gICAgLy8gICAgICAgICAvLyAgICAgaWYgKCFlcnJvcikgdGhpcy5zcHJpdGVCZy5zcHJpdGVGcmFtZSA9IHNwcml0ZUZyYW1lO1xuICAgIC8vICAgICAgICAgLy8gfSk7XG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgdGhpcy5ub2RlLnNjYWxlID0gdGhpcy5fbWFwU2NhbGU7XG4gICAgLy8gfVxufSJdfQ==