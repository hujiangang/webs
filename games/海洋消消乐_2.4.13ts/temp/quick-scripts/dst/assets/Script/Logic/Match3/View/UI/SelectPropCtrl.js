
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Match3/View/UI/SelectPropCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '284fcdVga5K8qWYoC2UQCUB', 'SelectPropCtrl');
// Script/Logic/Match3/View/UI/SelectPropCtrl.ts

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
var Constant_1 = require("../../../Data/Const/Constant");
var M_1 = require("../../../../Base/Manager/M");
var UIData_1 = require("../../../Data/Interface/UIData");
var Event_1 = require("../../../Data/Const/Event");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SelectPropCtrl = /** @class */ (function (_super) {
    __extends(SelectPropCtrl, _super);
    function SelectPropCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prop1 = null;
        _this.prop2 = null;
        _this.prop3 = null;
        _this.tipsNode = null;
        _this.tipsContent = null;
        _this.propFrames = [];
        return _this;
    }
    SelectPropCtrl.prototype.onLoad = function () {
        M_1.default.event.register(Event_1.Event.UI.PropCount, this.onPropCountChanged, this);
    };
    SelectPropCtrl.prototype.onDestroy = function () {
        M_1.default.event.unRegister(Event_1.Event.UI.PropCount, this.onPropCountChanged, this);
    };
    SelectPropCtrl.prototype.init = function () {
        this._hideTips();
        this._initPropLockState();
        this._initSelect();
    };
    SelectPropCtrl.prototype._initPropLockState = function () {
        var _this = this;
        var types = [Constant_1.PropType.Add3Step, Constant_1.PropType.StartBomb, Constant_1.PropType.StartStar];
        types.forEach(function (type) {
            var index = type - Constant_1.PropType.Add3Step;
            if (M_1.default.runtime.isPropUnLocked(type)) {
                var sprite_1 = _this["prop" + (index + 1)];
                var node_1 = sprite_1.node;
                //sprite.spriteFrame = this.propFrames[index];
                //node.y = 0;
                //node.scale = 0.6;
                // this._updateIconState(type, node);
                node_1.getChildByName('add').active = true;
                var lbNum = node_1.getChildByName('titleNoOpen').getComponent(cc.Label);
                lbNum.string = "暂未开启";
            }
            else if (!_this.tipsNode.active) {
                var sprite_2 = _this["prop" + (index + 1)];
                var node_2 = sprite_2.node;
                _this._showTips(sprite_2.node.position, type);
                node_2.getChildByName('add').active = false;
                var lbNum = node_2.getChildByName('titleNoOpen').getComponent(cc.Label);
                lbNum.string = "暂未开启";
            }
            //显示加号
            var sprite = _this["prop" + (index + 1)];
            var node = sprite.node;
            _this._updateIconState(type, node);
            //暂未解锁提示是否显示
            //const sprite2: cc.Sprite = this[`prop${index + 1}`]
            //sprite2.node.getChildByName('titleNoOpen').active = !M.runtime.isPropUnLocked(type);
        });
    };
    SelectPropCtrl.prototype._updateIconState = function (type, node) {
        var data = M_1.default.runtime.getPropData(type);
        if (!data || data.count <= 0) {
            //node.getChildByName('add').active = true;
            //node.getChildByName('titleNoOpen').active=true;
        }
        else {
            node.getChildByName('add').active = false;
            // node.getChildByName('titleNoOpen').active=true;
            var lbNum = node.getChildByName('titleNoOpen').getComponent(cc.Label);
            lbNum.string = data.count.toString();
            cc.log("数量： " + data.count);
        }
        // node.getChildByName('titleNoOpen').active = !M.runtime.isPropUnLocked(type);
    };
    SelectPropCtrl.prototype._hideTips = function () {
        this.tipsNode.active = false;
    };
    SelectPropCtrl.prototype._showTips = function (pos, type) {
        this.tipsNode.x = pos.x;
        this.tipsNode.active = true;
        var info = M_1.default.table.PropInfo.getByPrimaryKey(type);
        this.tipsContent.string = info.unlockLv + "\u5173\u5F00\u542F!";
    };
    SelectPropCtrl.prototype._initSelect = function () {
        for (var i = 1; i <= 3; i++) {
            var node = this["prop" + i].node.getChildByName('selected');
            if (M_1.default.runtime.SelectProp && M_1.default.runtime.SelectProp == (Constant_1.PropType.Add3Step + (i - 1))) {
                node.active = true;
            }
            else {
                node.active = false;
            }
        }
    };
    SelectPropCtrl.prototype.onPropCountChanged = function (type) {
        if (this.node.active && this.node.activeInHierarchy) {
            var index = type - Constant_1.PropType.Add3Step;
            var sprite = this["prop" + (index + 1)];
            this._updateIconState(type, sprite.node);
        }
    };
    SelectPropCtrl.prototype.onClick = function (event, cv) {
        var type = Number(cv);
        var data = M_1.default.runtime.getPropData(type);
        if (M_1.default.runtime.isPropUnLocked(type)) {
            if (!data || data.count <= 0) {
                M_1.default.ui.showUI(UIData_1.UIHudDef.BuyProp, type);
                cc.log("选中: " + type);
            }
            else {
                this._updateSelectPropDisplay(type);
                M_1.default.runtime.SelectProp = type;
                cc.log("选中data.count: " + data.count);
            }
        }
        else {
            cc.log("选中 isPropUnLocked: false");
        }
    };
    SelectPropCtrl.prototype._updateSelectPropDisplay = function (type) {
        var index = type - Constant_1.PropType.Add3Step + 1;
        if (M_1.default.runtime.SelectProp == type) {
            var node = this["prop" + (type - Constant_1.PropType.Add3Step + 1)].node.getChildByName('selected');
            if (node.active == true) {
                node.active = false;
            }
            else {
                node.active = true;
            }
            //node.active = !node.active;
            if (node.active == true)
                M_1.default.runtime.SelectProp = null;
            var node1 = this["prop" + (type - Constant_1.PropType.Add3Step + 1)].node;
            //node1.getChildByName('titleNoOpen').active = !M.runtime.isPropUnLocked(type);
        }
        else {
            for (var i = 1; i <= 3; i++) {
                var node = this["prop" + i].node.getChildByName('selected');
                if (index == i) {
                    node.active = true;
                }
                else {
                    node.active = false;
                }
                var node1 = this["prop" + i].node;
                //node1.getChildByName('titleNoOpen').active = !M.runtime.isPropUnLocked(type);
            }
        }
    };
    __decorate([
        property(cc.Sprite)
    ], SelectPropCtrl.prototype, "prop1", void 0);
    __decorate([
        property(cc.Sprite)
    ], SelectPropCtrl.prototype, "prop2", void 0);
    __decorate([
        property(cc.Sprite)
    ], SelectPropCtrl.prototype, "prop3", void 0);
    __decorate([
        property(cc.Node)
    ], SelectPropCtrl.prototype, "tipsNode", void 0);
    __decorate([
        property(cc.Label)
    ], SelectPropCtrl.prototype, "tipsContent", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], SelectPropCtrl.prototype, "propFrames", void 0);
    SelectPropCtrl = __decorate([
        ccclass
    ], SelectPropCtrl);
    return SelectPropCtrl;
}(cc.Component));
exports.default = SelectPropCtrl;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcTWF0Y2gzXFxWaWV3XFxVSVxcU2VsZWN0UHJvcEN0cmwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseURBQW9FO0FBQ3BFLGdEQUEyQztBQUMzQyx5REFBMEQ7QUFDMUQsbURBQWtEO0FBRTVDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTRDLGtDQUFZO0lBQXhEO1FBQUEscUVBMEtDO1FBdktHLFdBQUssR0FBYyxJQUFJLENBQUM7UUFHeEIsV0FBSyxHQUFjLElBQUksQ0FBQztRQUd4QixXQUFLLEdBQWMsSUFBSSxDQUFDO1FBR3hCLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFHekIsaUJBQVcsR0FBYSxJQUFJLENBQUM7UUFHN0IsZ0JBQVUsR0FBcUIsRUFBRSxDQUFDOztJQXdKdEMsQ0FBQztJQXRKRywrQkFBTSxHQUFOO1FBQ0ksV0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsYUFBSyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFRCxrQ0FBUyxHQUFUO1FBQ0ksV0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsYUFBSyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFTSw2QkFBSSxHQUFYO1FBQ0ksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRU8sMkNBQWtCLEdBQTFCO1FBQUEsaUJBdUNDO1FBdENHLElBQU0sS0FBSyxH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USxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7aURBQ0k7SUFHeEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztpREFDSTtJQUd4QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO29EQUNPO0lBR3pCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7dURBQ1U7SUFHN0I7UUFEQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7c0RBQ087SUFsQmpCLGNBQWM7UUFEbEMsT0FBTztPQUNhLGNBQWMsQ0EwS2xDO0lBQUQscUJBQUM7Q0ExS0QsQUEwS0MsQ0ExSzJDLEVBQUUsQ0FBQyxTQUFTLEdBMEt2RDtrQkExS29CLGNBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcm9wVHlwZSwgV2FyaW5nVGlwcyB9IGZyb20gJy4uLy4uLy4uL0RhdGEvQ29uc3QvQ29uc3RhbnQnO1xuaW1wb3J0IE0gZnJvbSAnLi4vLi4vLi4vLi4vQmFzZS9NYW5hZ2VyL00nO1xuaW1wb3J0IHsgVUlIdWREZWYgfSBmcm9tICcuLi8uLi8uLi9EYXRhL0ludGVyZmFjZS9VSURhdGEnO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tICcuLi8uLi8uLi9EYXRhL0NvbnN0L0V2ZW50JztcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlbGVjdFByb3BDdHJsIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgcHJvcDE6IGNjLlNwcml0ZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICAgIHByb3AyOiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBwcm9wMzogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHRpcHNOb2RlOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICB0aXBzQ29udGVudDogY2MuTGFiZWwgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVGcmFtZV0pXG4gICAgcHJvcEZyYW1lczogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBNLmV2ZW50LnJlZ2lzdGVyKEV2ZW50LlVJLlByb3BDb3VudCwgdGhpcy5vblByb3BDb3VudENoYW5nZWQsIHRoaXMpO1xuICAgIH1cblxuICAgIG9uRGVzdHJveSgpIHtcbiAgICAgICAgTS5ldmVudC51blJlZ2lzdGVyKEV2ZW50LlVJLlByb3BDb3VudCwgdGhpcy5vblByb3BDb3VudENoYW5nZWQsIHRoaXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBpbml0KCkge1xuICAgICAgICB0aGlzLl9oaWRlVGlwcygpO1xuICAgICAgICB0aGlzLl9pbml0UHJvcExvY2tTdGF0ZSgpO1xuICAgICAgICB0aGlzLl9pbml0U2VsZWN0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaW5pdFByb3BMb2NrU3RhdGUoKSB7XG4gICAgICAgIGNvbnN0IHR5cGVzID0gW1Byb3BUeXBlLkFkZDNTdGVwLCBQcm9wVHlwZS5TdGFydEJvbWIsIFByb3BUeXBlLlN0YXJ0U3Rhcl07XG4gICAgICAgIHR5cGVzLmZvckVhY2godHlwZSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHR5cGUgLSBQcm9wVHlwZS5BZGQzU3RlcDtcblxuICAgICAgICAgICAgXG5cblxuICAgICAgICAgICAgaWYgKE0ucnVudGltZS5pc1Byb3BVbkxvY2tlZCh0eXBlKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNwcml0ZTogY2MuU3ByaXRlID0gdGhpc1tgcHJvcCR7aW5kZXggKyAxfWBdXG4gICAgICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHNwcml0ZS5ub2RlO1xuICAgICAgICAgICAgICAgIC8vc3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5wcm9wRnJhbWVzW2luZGV4XTtcbiAgICAgICAgICAgICAgICAvL25vZGUueSA9IDA7XG4gICAgICAgICAgICAgICAgLy9ub2RlLnNjYWxlID0gMC42O1xuICAgICAgICAgICAgICAgIC8vIHRoaXMuX3VwZGF0ZUljb25TdGF0ZSh0eXBlLCBub2RlKTtcbiAgICAgICAgICAgICAgICBub2RlLmdldENoaWxkQnlOYW1lKCdhZGQnKS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGxldCBsYk51bSA9ICBub2RlLmdldENoaWxkQnlOYW1lKCd0aXRsZU5vT3BlbicpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XG4gICAgICAgICAgICAgICAgbGJOdW0uc3RyaW5nID0gXCLmmoLmnKrlvIDlkK9cIjtcblxuICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcy50aXBzTm9kZS5hY3RpdmUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzcHJpdGU6IGNjLlNwcml0ZSA9IHRoaXNbYHByb3Ake2luZGV4ICsgMX1gXTtcbiAgICAgICAgICAgICAgICBjb25zdCBub2RlID0gc3ByaXRlLm5vZGU7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvd1RpcHMoc3ByaXRlLm5vZGUucG9zaXRpb24sIHR5cGUpO1xuXG4gICAgICAgICAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZSgnYWRkJykuYWN0aXZlID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBsZXQgbGJOdW0gPSAgbm9kZS5nZXRDaGlsZEJ5TmFtZSgndGl0bGVOb09wZW4nKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgICAgICAgICAgICAgIGxiTnVtLnN0cmluZyA9IFwi5pqC5pyq5byA5ZCvXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8v5pi+56S65Yqg5Y+3XG4gICAgICAgICAgICBjb25zdCBzcHJpdGU6IGNjLlNwcml0ZSA9IHRoaXNbYHByb3Ake2luZGV4ICsgMX1gXVxuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHNwcml0ZS5ub2RlO1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlSWNvblN0YXRlKHR5cGUsIG5vZGUpO1xuXG4gICAgICAgICAgICAvL+aaguacquino+mUgeaPkOekuuaYr+WQpuaYvuekulxuICAgICAgICAgICAgLy9jb25zdCBzcHJpdGUyOiBjYy5TcHJpdGUgPSB0aGlzW2Bwcm9wJHtpbmRleCArIDF9YF1cbiAgICAgICAgICAgIC8vc3ByaXRlMi5ub2RlLmdldENoaWxkQnlOYW1lKCd0aXRsZU5vT3BlbicpLmFjdGl2ZSA9ICFNLnJ1bnRpbWUuaXNQcm9wVW5Mb2NrZWQodHlwZSk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdXBkYXRlSWNvblN0YXRlKHR5cGUsIG5vZGU6IGNjLk5vZGUpIHtcbiAgICAgICAgY29uc3QgZGF0YTogeyBjb3VudDogbnVtYmVyIH0gPSBNLnJ1bnRpbWUuZ2V0UHJvcERhdGEodHlwZSk7XG4gICAgICAgIGlmICghZGF0YSB8fCBkYXRhLmNvdW50IDw9IDApIHtcbiAgICAgICAgICAgIC8vbm9kZS5nZXRDaGlsZEJ5TmFtZSgnYWRkJykuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIC8vbm9kZS5nZXRDaGlsZEJ5TmFtZSgndGl0bGVOb09wZW4nKS5hY3RpdmU9dHJ1ZTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbm9kZS5nZXRDaGlsZEJ5TmFtZSgnYWRkJykuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgIC8vIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3RpdGxlTm9PcGVuJykuYWN0aXZlPXRydWU7XG4gICAgICAgICAgIGxldCBsYk51bSA9ICBub2RlLmdldENoaWxkQnlOYW1lKCd0aXRsZU5vT3BlbicpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XG4gICAgICAgICAgIGxiTnVtLnN0cmluZyA9IGRhdGEuY291bnQudG9TdHJpbmcoKTtcbiAgICAgICAgICAgY2MubG9nKFwi5pWw6YeP77yaIFwiK2RhdGEuY291bnQpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3RpdGxlTm9PcGVuJykuYWN0aXZlID0gIU0ucnVudGltZS5pc1Byb3BVbkxvY2tlZCh0eXBlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9oaWRlVGlwcygpIHtcbiAgICAgICAgdGhpcy50aXBzTm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9zaG93VGlwcyhwb3M6IGNjLlZlYzIsIHR5cGU6IFByb3BUeXBlKSB7XG4gICAgICAgIHRoaXMudGlwc05vZGUueCA9IHBvcy54O1xuICAgICAgICB0aGlzLnRpcHNOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIGNvbnN0IGluZm8gPSBNLnRhYmxlLlByb3BJbmZvLmdldEJ5UHJpbWFyeUtleSh0eXBlKTtcbiAgICAgICAgdGhpcy50aXBzQ29udGVudC5zdHJpbmcgPSBgJHtpbmZvLnVubG9ja0x2feWFs+W8gOWQryFgXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaW5pdFNlbGVjdCgpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gMzsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBub2RlOiBjYy5Ob2RlID0gdGhpc1tgcHJvcCR7aX1gXS5ub2RlLmdldENoaWxkQnlOYW1lKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgaWYgKE0ucnVudGltZS5TZWxlY3RQcm9wICYmIE0ucnVudGltZS5TZWxlY3RQcm9wID09IChQcm9wVHlwZS5BZGQzU3RlcCArIChpIC0gMSkpKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvblByb3BDb3VudENoYW5nZWQodHlwZTogUHJvcFR5cGUpIHtcbiAgICAgICAgaWYgKHRoaXMubm9kZS5hY3RpdmUgJiYgdGhpcy5ub2RlLmFjdGl2ZUluSGllcmFyY2h5KSB7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHR5cGUgLSBQcm9wVHlwZS5BZGQzU3RlcDtcbiAgICAgICAgICAgIGNvbnN0IHNwcml0ZTogY2MuU3ByaXRlID0gdGhpc1tgcHJvcCR7aW5kZXggKyAxfWBdO1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlSWNvblN0YXRlKHR5cGUsIHNwcml0ZS5ub2RlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvbkNsaWNrKGV2ZW50LCBjdjogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHR5cGUgPSBOdW1iZXIoY3YpO1xuICAgICAgICBjb25zdCBkYXRhOiB7IGNvdW50OiBudW1iZXIgfSA9IE0ucnVudGltZS5nZXRQcm9wRGF0YSh0eXBlKTtcbiAgICAgICAgaWYgKE0ucnVudGltZS5pc1Byb3BVbkxvY2tlZCh0eXBlKSkge1xuICAgICAgICAgICAgaWYgKCFkYXRhIHx8IGRhdGEuY291bnQgPD0gMCkge1xuICAgICAgICAgICAgICAgIE0udWkuc2hvd1VJKFVJSHVkRGVmLkJ1eVByb3AsIHR5cGUpO1xuICAgICAgICAgICAgICAgIGNjLmxvZyhcIumAieS4rTogXCIrdHlwZSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlU2VsZWN0UHJvcERpc3BsYXkodHlwZSk7XG4gICAgICAgICAgICAgICAgTS5ydW50aW1lLlNlbGVjdFByb3AgPSB0eXBlO1xuICAgICAgICAgICAgICAgIGNjLmxvZyhcIumAieS4rWRhdGEuY291bnQ6IFwiK2RhdGEuY291bnQpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICBjYy5sb2coXCLpgInkuK0gaXNQcm9wVW5Mb2NrZWQ6IGZhbHNlXCIpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF91cGRhdGVTZWxlY3RQcm9wRGlzcGxheSh0eXBlOiBQcm9wVHlwZSkge1xuICAgICAgICBjb25zdCBpbmRleCA9IHR5cGUgLSBQcm9wVHlwZS5BZGQzU3RlcCArIDE7XG4gICAgICAgIGlmIChNLnJ1bnRpbWUuU2VsZWN0UHJvcCA9PSB0eXBlKSB7XG4gICAgICAgICAgICBjb25zdCBub2RlOiBjYy5Ob2RlID0gdGhpc1tgcHJvcCR7dHlwZSAtIFByb3BUeXBlLkFkZDNTdGVwICsgMX1gXS5ub2RlLmdldENoaWxkQnlOYW1lKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgaWYobm9kZS5hY3RpdmU9PXRydWUpe1xuICAgICAgICAgICAgICAgIG5vZGUuYWN0aXZlID0gZmFsc2VcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIG5vZGUuYWN0aXZlID0gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9ub2RlLmFjdGl2ZSA9ICFub2RlLmFjdGl2ZTtcbiAgICAgICAgICAgIGlmIChub2RlLmFjdGl2ZT09dHJ1ZSkgTS5ydW50aW1lLlNlbGVjdFByb3AgPSBudWxsO1xuXG5cbiAgICAgICAgICAgIGNvbnN0IG5vZGUxOiBjYy5Ob2RlID0gdGhpc1tgcHJvcCR7dHlwZSAtIFByb3BUeXBlLkFkZDNTdGVwICsgMX1gXS5ub2RlXG4gICAgICAgICAgICAvL25vZGUxLmdldENoaWxkQnlOYW1lKCd0aXRsZU5vT3BlbicpLmFjdGl2ZSA9ICFNLnJ1bnRpbWUuaXNQcm9wVW5Mb2NrZWQodHlwZSk7XG4gICAgICAgICAgICBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDM7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5vZGU6IGNjLk5vZGUgPSB0aGlzW2Bwcm9wJHtpfWBdLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID09IGkpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGNvbnN0IG5vZGUxOiBjYy5Ob2RlID0gdGhpc1tgcHJvcCR7aX1gXS5ub2RlXG4gICAgICAgICAgICAgICAgLy9ub2RlMS5nZXRDaGlsZEJ5TmFtZSgndGl0bGVOb09wZW4nKS5hY3RpdmUgPSAhTS5ydW50aW1lLmlzUHJvcFVuTG9ja2VkKHR5cGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=