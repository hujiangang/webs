
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GodGuide/GodText.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '83aa0WddPdOa6LnZ49stCZ5', 'GodText');
// GodGuide/GodText.ts

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
var GodText = /** @class */ (function (_super) {
    __extends(GodText, _super);
    function GodText() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //显示的文本
        _this.label = null;
        _this.contentNode = null;
        _this.personSp = null;
        _this.roleSprites = [];
        _this._positionY = 0;
        _this._loaded = false;
        _this._curText = "";
        return _this;
    }
    GodText.prototype.start = function () {
        var _this = this;
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            _this.node["_touchListener"].setSwallowTouches(false);
            //隐藏文本提示
            if (_this.node.active) {
                // this.node.active = false;
                _this.hide();
                _this.node.emit('click');
                return;
            }
        });
        // this.contentNode.position.y = this._positionY;
        this.contentNode.active = true;
        this.contentNode.setPosition(0, this._positionY);
        this._loaded = true;
    };
    GodText.prototype.setText = function (txt, role, positionY, cb) {
        this.callback = cb;
        this._positionY = positionY;
        if (!this.label) {
            // this.label = this.node.getComponentInChildren(cc.Label);
            return;
        }
        this.personSp.spriteFrame = this.roleSprites[role - 1];
        this.label.string = "";
        this.showText(txt);
        // this.label.string = txt;
        this._curText = txt;
        if (this._loaded) {
            this.contentNode.active = true;
            this.contentNode.setPosition(0, this._positionY);
        }
        else {
            this.contentNode.active = false;
        }
        gsap.TweenLite.to(this.node, 0.5, { opacity: 255 });
        this.node.active = true;
    };
    GodText.prototype.showText = function (text) {
        this.unscheduleAllCallbacks();
        var i = 0;
        this.schedule(function () {
            this.label.string += text[i];
            i++;
        }, 0.08, text.length - 1, 0);
    };
    GodText.prototype.hide = function () {
        var _this = this;
        this.unscheduleAllCallbacks();
        this.label.string = this._curText;
        gsap.TweenLite.to(this.node, 0.5, {
            opacity: 0,
            onComplete: function () {
                _this.node.active = false;
            }
        });
    };
    __decorate([
        property(cc.Label)
    ], GodText.prototype, "label", void 0);
    __decorate([
        property(cc.Node)
    ], GodText.prototype, "contentNode", void 0);
    __decorate([
        property(cc.Sprite)
    ], GodText.prototype, "personSp", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], GodText.prototype, "roleSprites", void 0);
    GodText = __decorate([
        ccclass
    ], GodText);
    return GodText;
}(cc.Component));
exports.default = GodText;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR29kR3VpZGVcXEdvZFRleHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRU0sSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFFNUM7SUFBcUMsMkJBQVk7SUFBakQ7UUFBQSxxRUE0RUM7UUExRUcsT0FBTztRQUVQLFdBQUssR0FBYSxJQUFJLENBQUM7UUFJdkIsaUJBQVcsR0FBWSxJQUFJLENBQUM7UUFHNUIsY0FBUSxHQUFjLElBQUksQ0FBQztRQUczQixpQkFBVyxHQUFxQixFQUFFLENBQUM7UUFFM0IsZ0JBQVUsR0FBVyxDQUFDLENBQUM7UUFDdkIsYUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixjQUFRLEdBQVcsRUFBRSxDQUFDOztJQTBEbEMsQ0FBQztJQXpERyx1QkFBSyxHQUFMO1FBQUEsaUJBZUM7UUFkRyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsVUFBQyxLQUFLO1lBQzlDLEtBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNyRCxRQUFRO1lBQ1IsSUFBSSxLQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDbEIsNEJBQTRCO2dCQUM1QixLQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ1osS0FBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3hCLE9BQU87YUFDVjtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsaURBQWlEO1FBQ2pELElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUMvQixJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ3hCLENBQUM7SUFFRCx5QkFBTyxHQUFQLFVBQVEsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFBRztRQUM3QixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNiLDJEQUEyRDtZQUMzRCxPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQiwyQkFBMkI7UUFDM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7UUFDcEIsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQy9CLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDcEQ7YUFBTTtZQUNILElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztTQUNuQztRQUNELElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQzVCLENBQUM7SUFFRCwwQkFBUSxHQUFSLFVBQVMsSUFBSTtRQUNULElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNWLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDVixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0IsQ0FBQyxFQUFFLENBQUM7UUFDUixDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxzQkFBSSxHQUFKO1FBQUEsaUJBUUM7UUFQRyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFO1lBQzlCLE9BQU8sRUFBRSxDQUFDO1lBQUUsVUFBVSxFQUFFO2dCQUNwQixLQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDN0IsQ0FBQztTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7SUF2RUQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzswQ0FDSTtJQUl2QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2dEQUNVO0lBRzVCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7NkNBQ087SUFHM0I7UUFEQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7Z0RBQ1E7SUFkbEIsT0FBTztRQUQzQixPQUFPO09BQ2EsT0FBTyxDQTRFM0I7SUFBRCxjQUFDO0NBNUVELEFBNEVDLENBNUVvQyxFQUFFLENBQUMsU0FBUyxHQTRFaEQ7a0JBNUVvQixPQUFPIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVXRpbCB9IGZyb20gXCIuLi9TY3JpcHQvQmFzZS9VdGlscy9VdGlsXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR29kVGV4dCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICAvL+aYvuekuueahOaWh+acrFxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBsYWJlbDogY2MuTGFiZWwgPSBudWxsO1xuICAgIGNhbGxiYWNrOiBhbnk7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBjb250ZW50Tm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICAgIHBlcnNvblNwOiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVGcmFtZV0pXG4gICAgcm9sZVNwcml0ZXM6IGNjLlNwcml0ZUZyYW1lW10gPSBbXTtcblxuICAgIHByaXZhdGUgX3Bvc2l0aW9uWTogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIF9sb2FkZWQgPSBmYWxzZTtcbiAgICBwcml2YXRlIF9jdXJUZXh0OiBzdHJpbmcgPSBcIlwiO1xuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5ub2RlW1wiX3RvdWNoTGlzdGVuZXJcIl0uc2V0U3dhbGxvd1RvdWNoZXMoZmFsc2UpO1xuICAgICAgICAgICAgLy/pmpDol4/mlofmnKzmj5DnpLpcbiAgICAgICAgICAgIGlmICh0aGlzLm5vZGUuYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5lbWl0KCdjbGljaycpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vIHRoaXMuY29udGVudE5vZGUucG9zaXRpb24ueSA9IHRoaXMuX3Bvc2l0aW9uWTtcbiAgICAgICAgdGhpcy5jb250ZW50Tm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLmNvbnRlbnROb2RlLnNldFBvc2l0aW9uKDAsIHRoaXMuX3Bvc2l0aW9uWSk7XG4gICAgICAgIHRoaXMuX2xvYWRlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgc2V0VGV4dCh0eHQsIHJvbGUsIHBvc2l0aW9uWSwgY2I/KSB7XG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYjtcbiAgICAgICAgdGhpcy5fcG9zaXRpb25ZID0gcG9zaXRpb25ZO1xuICAgICAgICBpZiAoIXRoaXMubGFiZWwpIHtcbiAgICAgICAgICAgIC8vIHRoaXMubGFiZWwgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihjYy5MYWJlbCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wZXJzb25TcC5zcHJpdGVGcmFtZSA9IHRoaXMucm9sZVNwcml0ZXNbcm9sZSAtIDFdO1xuICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IFwiXCI7XG4gICAgICAgIHRoaXMuc2hvd1RleHQodHh0KTtcbiAgICAgICAgLy8gdGhpcy5sYWJlbC5zdHJpbmcgPSB0eHQ7XG4gICAgICAgIHRoaXMuX2N1clRleHQgPSB0eHQ7XG4gICAgICAgIGlmICh0aGlzLl9sb2FkZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudE5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuY29udGVudE5vZGUuc2V0UG9zaXRpb24oMCwgdGhpcy5fcG9zaXRpb25ZKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudE5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZ3NhcC5Ud2VlbkxpdGUudG8odGhpcy5ub2RlLCAwLjUsIHsgb3BhY2l0eTogMjU1IH0pO1xuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBzaG93VGV4dCh0ZXh0KSB7XG4gICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIHRoaXMuc2NoZWR1bGUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgKz0gdGV4dFtpXTtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfSwgMC4wOCwgdGV4dC5sZW5ndGggLSAxLCAwKTtcbiAgICB9XG5cbiAgICBoaWRlKCkge1xuICAgICAgICB0aGlzLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcbiAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSB0aGlzLl9jdXJUZXh0O1xuICAgICAgICBnc2FwLlR3ZWVuTGl0ZS50byh0aGlzLm5vZGUsIDAuNSwge1xuICAgICAgICAgICAgb3BhY2l0eTogMCwgb25Db21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19