
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Base/Manager/View/View.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6efe3wputNIJJPqqx3Q0G8J', 'View');
// Script/Base/Manager/View/View.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SHOW_ACT_TYPE = void 0;
// View显示的动画类型
var SHOW_ACT_TYPE;
(function (SHOW_ACT_TYPE) {
    SHOW_ACT_TYPE[SHOW_ACT_TYPE["DEFAULT"] = 1] = "DEFAULT";
    SHOW_ACT_TYPE[SHOW_ACT_TYPE["SCALE"] = 2] = "SCALE";
})(SHOW_ACT_TYPE = exports.SHOW_ACT_TYPE || (exports.SHOW_ACT_TYPE = {}));
var View = /** @class */ (function () {
    function View(type) {
        this.mRootNode = null;
        this.mNode = null;
        this.mType = null;
        this.showActType = SHOW_ACT_TYPE.DEFAULT;
        this.mType = type;
        this.init();
    }
    View.prototype.init = function () {
        this.mRootNode = new cc.Node; //cc.find('Canvas');
        this.mRootNode.x = cc.winSize.width / 2;
        this.mRootNode.y = cc.winSize.height / 2;
        this.mRootNode.width = cc.winSize.width;
        this.mRootNode.height = cc.winSize.height;
        cc.game.addPersistRootNode(this.mRootNode);
    };
    //有关闭
    View.prototype.onHide = function () {
        this.mNode && (this.playHideAnimate());
    };
    //有开启
    View.prototype.onShow = function () {
        if (this.mNode) {
            this.playShowAnimate();
        }
        else {
            throw (new Error('Error: View must be init ! '));
        }
    };
    // 显示的动画类型
    View.prototype.setShowActType = function (showActType) {
        this.showActType = showActType;
    };
    View.prototype.destroy = function () {
        this.mNode = null;
        this.mRootNode = null;
    };
    return View;
}());
exports.default = View;
;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCYXNlXFxNYW5hZ2VyXFxWaWV3XFxWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLGNBQWM7QUFDZCxJQUFZLGFBR1g7QUFIRCxXQUFZLGFBQWE7SUFDckIsdURBQVcsQ0FBQTtJQUNYLG1EQUFTLENBQUE7QUFDYixDQUFDLEVBSFcsYUFBYSxHQUFiLHFCQUFhLEtBQWIscUJBQWEsUUFHeEI7QUFFRDtJQVNJLGNBQVksSUFBWTtRQVBkLGNBQVMsR0FBWSxJQUFJLENBQUM7UUFDMUIsVUFBSyxHQUFZLElBQUksQ0FBQztRQUV4QixVQUFLLEdBQVcsSUFBSSxDQUFDO1FBRW5CLGdCQUFXLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQztRQUcxQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVNLG1CQUFJLEdBQVg7UUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFBLG9CQUFvQjtRQUNqRCxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQzFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCxLQUFLO0lBQ0sscUJBQU0sR0FBaEI7UUFDSSxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELEtBQUs7SUFDSyxxQkFBTSxHQUFoQjtRQUNJLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNaLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUMxQjthQUFNO1lBQ0gsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLDZCQUE2QixDQUFDLENBQUMsQ0FBQztTQUNwRDtJQUNMLENBQUM7SUFFRCxVQUFVO0lBQ0gsNkJBQWMsR0FBckIsVUFBc0IsV0FBMEI7UUFDNUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7SUFDbkMsQ0FBQztJQUVNLHNCQUFPLEdBQWQ7UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztJQUMxQixDQUFDO0lBSUwsV0FBQztBQUFELENBakRBLEFBaURDLElBQUE7O0FBQUEsQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxuLy8gVmlld+aYvuekuueahOWKqOeUu+exu+Wei1xuZXhwb3J0IGVudW0gU0hPV19BQ1RfVFlQRSB7XG4gICAgREVGQVVMVCA9IDEsXG4gICAgU0NBTEUgPSAyLFxufVxuXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBWaWV3IHtcblxuICAgIHByb3RlY3RlZCBtUm9vdE5vZGU6IGNjLk5vZGUgPSBudWxsO1xuICAgIHByb3RlY3RlZCBtTm9kZTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBwcml2YXRlIG1UeXBlOiBzdHJpbmcgPSBudWxsO1xuXG4gICAgcHJvdGVjdGVkIHNob3dBY3RUeXBlID0gU0hPV19BQ1RfVFlQRS5ERUZBVUxUO1xuXG4gICAgY29uc3RydWN0b3IodHlwZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMubVR5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5tUm9vdE5vZGUgPSBuZXcgY2MuTm9kZTsvL2NjLmZpbmQoJ0NhbnZhcycpO1xuICAgICAgICB0aGlzLm1Sb290Tm9kZS54ID0gY2Mud2luU2l6ZS53aWR0aCAvIDI7XG4gICAgICAgIHRoaXMubVJvb3ROb2RlLnkgPSBjYy53aW5TaXplLmhlaWdodCAvIDI7XG4gICAgICAgIHRoaXMubVJvb3ROb2RlLndpZHRoID0gY2Mud2luU2l6ZS53aWR0aDtcbiAgICAgICAgdGhpcy5tUm9vdE5vZGUuaGVpZ2h0ID0gY2Mud2luU2l6ZS5oZWlnaHQ7XG4gICAgICAgIGNjLmdhbWUuYWRkUGVyc2lzdFJvb3ROb2RlKHRoaXMubVJvb3ROb2RlKTtcbiAgICB9XG5cbiAgICAvL+acieWFs+mXrVxuICAgIHByb3RlY3RlZCBvbkhpZGUoKSB7XG4gICAgICAgIHRoaXMubU5vZGUgJiYgKHRoaXMucGxheUhpZGVBbmltYXRlKCkpO1xuICAgIH1cblxuICAgIC8v5pyJ5byA5ZCvXG4gICAgcHJvdGVjdGVkIG9uU2hvdygpIHtcbiAgICAgICAgaWYgKHRoaXMubU5vZGUpIHtcbiAgICAgICAgICAgIHRoaXMucGxheVNob3dBbmltYXRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyAobmV3IEVycm9yKCdFcnJvcjogVmlldyBtdXN0IGJlIGluaXQgISAnKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyDmmL7npLrnmoTliqjnlLvnsbvlnotcbiAgICBwdWJsaWMgc2V0U2hvd0FjdFR5cGUoc2hvd0FjdFR5cGU6IFNIT1dfQUNUX1RZUEUpIHtcbiAgICAgICAgdGhpcy5zaG93QWN0VHlwZSA9IHNob3dBY3RUeXBlO1xuICAgIH1cblxuICAgIHB1YmxpYyBkZXN0cm95KCkge1xuICAgICAgICB0aGlzLm1Ob2RlID0gbnVsbDtcbiAgICAgICAgdGhpcy5tUm9vdE5vZGUgPSBudWxsO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBwbGF5U2hvd0FuaW1hdGUoKTtcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgcGxheUhpZGVBbmltYXRlKCk7XG59O1xuXG5cblxuXG4iXX0=