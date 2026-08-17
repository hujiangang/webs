"use strict";
cc._RF.push(module, '112c0ssqxdIXac/9R15QICk', 'Button');
// Script/Base/CustomComponent/Button.ts

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
var EventMgr_1 = require("../Manager/EventMgr");
var Event_1 = require("../../Logic/Data/Const/Event");
var AudioCtrl_1 = require("../../Logic/Common/AudioCtrl");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, inspector = _a.inspector;
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.soundName = 0;
        return _this;
    }
    Button.prototype._onTouchEnded = function (event) {
        _super.prototype['_onTouchEnded'].call(this, event);
        if (this.soundName) {
            EventMgr_1.default.ins.send(Event_1.Event.Sound.PlaySoundEff, this.soundName);
        }
    };
    __decorate([
        property({
            type: cc.Enum(AudioCtrl_1.AudioID),
            displayName: "选择触发音效"
        })
    ], Button.prototype, "soundName", void 0);
    Button = __decorate([
        ccclass,
        inspector('packages://CustomComponent/button.js')
    ], Button);
    return Button;
}(cc.Button));
exports.default = Button;

cc._RF.pop();