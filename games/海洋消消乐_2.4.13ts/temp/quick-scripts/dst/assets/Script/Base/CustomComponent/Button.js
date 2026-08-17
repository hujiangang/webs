
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Base/CustomComponent/Button.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCYXNlXFxDdXN0b21Db21wb25lbnRcXEJ1dHRvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnREFBMkM7QUFDM0Msc0RBQXFEO0FBQ3JELDBEQUF1RDtBQUVqRCxJQUFBLEtBQW1DLEVBQUUsQ0FBQyxVQUFVLEVBQTlDLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBQSxFQUFFLFNBQVMsZUFBa0IsQ0FBQztBQUl2RDtJQUFvQywwQkFBUztJQUE3QztRQUFBLHFFQWVDO1FBVEcsZUFBUyxHQUFXLENBQUMsQ0FBQzs7SUFTMUIsQ0FBQztJQVBHLDhCQUFhLEdBQWIsVUFBYyxLQUFLO1FBQ2YsaUJBQU0sZUFBZSxDQUFDLFlBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUIsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2hCLGtCQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFLLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDL0Q7SUFDTCxDQUFDO0lBUEQ7UUFKQyxRQUFRLENBQUM7WUFDTixJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxtQkFBTyxDQUFDO1lBQ3RCLFdBQVcsRUFBRSxRQUFRO1NBQ3hCLENBQUM7NkNBQ29CO0lBTkwsTUFBTTtRQUYxQixPQUFPO1FBQ1AsU0FBUyxDQUFDLHNDQUFzQyxDQUFDO09BQzdCLE1BQU0sQ0FlMUI7SUFBRCxhQUFDO0NBZkQsQUFlQyxDQWZtQyxFQUFFLENBQUMsTUFBTSxHQWU1QztrQkFmb0IsTUFBTSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFdmVudE1nciBmcm9tIFwiLi4vTWFuYWdlci9FdmVudE1nclwiO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tIFwiLi4vLi4vTG9naWMvRGF0YS9Db25zdC9FdmVudFwiO1xuaW1wb3J0IHsgQXVkaW9JRCB9IGZyb20gXCIuLi8uLi9Mb2dpYy9Db21tb24vQXVkaW9DdHJsXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHksIGluc3BlY3RvciB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbkBpbnNwZWN0b3IoJ3BhY2thZ2VzOi8vQ3VzdG9tQ29tcG9uZW50L2J1dHRvbi5qcycpXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdXR0b24gZXh0ZW5kcyBjYy5CdXR0b24ge1xuXG4gICAgQHByb3BlcnR5KHtcbiAgICAgICAgdHlwZTogY2MuRW51bShBdWRpb0lEKSxcbiAgICAgICAgZGlzcGxheU5hbWU6IFwi6YCJ5oup6Kem5Y+R6Z+z5pWIXCJcbiAgICB9KVxuICAgIHNvdW5kTmFtZTogbnVtYmVyID0gMDtcblxuICAgIF9vblRvdWNoRW5kZWQoZXZlbnQpIHtcbiAgICAgICAgc3VwZXJbJ19vblRvdWNoRW5kZWQnXShldmVudCk7XG4gICAgICAgIGlmICh0aGlzLnNvdW5kTmFtZSkge1xuICAgICAgICAgICAgRXZlbnRNZ3IuaW5zLnNlbmQoRXZlbnQuU291bmQuUGxheVNvdW5kRWZmLCB0aGlzLnNvdW5kTmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==