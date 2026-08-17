"use strict";
cc._RF.push(module, 'c280cedyGVDG7v+8Xo5Ts+t', 'PropDropView');
// Script/Views/PropDropView.ts

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
var UIBase_1 = require("../Base/UI/UIBase");
var M_1 = require("../Base/Manager/M");
var PropItemCtrl_1 = require("../Logic/Match3/View/UI/PropItemCtrl");
var UIMgr_1 = require("../Base/Manager/UIMgr");
var UIData_1 = require("../Logic/Data/Interface/UIData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**
 * 用法： 在三消场景获得道具 在界面上弹一下飞往道具列表
 * 注意： 仅限于三消场景
 */
var PropDropView = /** @class */ (function (_super) {
    __extends(PropDropView, _super);
    function PropDropView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.itemPrefab = null;
        _this._curItem = null;
        _this._curData = null;
        return _this;
    }
    PropDropView.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
    };
    //目前只支持一个道具飘落 如需多个道具依次飘落 自己写！
    PropDropView.prototype.onInit = function (itemData) {
        var item = M_1.default.nodePool.createItem(this.itemPrefab);
        var itemCtrl = item.getComponent(PropItemCtrl_1.default);
        itemCtrl && itemCtrl.initOnlyType(itemData.itemId, itemData.num);
        item.parent = this.node;
        item.setScale(0.2);
        this._curItem = item;
        this._curData = itemData;
        this.flyToPropsBar();
    };
    PropDropView.prototype.flyToPropsBar = function () {
        var _this = this;
        var node = this._curItem;
        var destinationPos = this.getDestination(this._curData.itemId);
        // console.error(destinationPos);
        var timeline = new gsap.TimelineMax();
        timeline
            .to(node, 0.6, { scale: 1.1, x: 0, y: 100 })
            .to(node, 0.6, { x: destinationPos.x, y: destinationPos.y, scale: 0.5, ease: gsap.Back.easeIn })
            .add(function () {
            M_1.default.runtime.updatePropCount(_this._curData.itemId, _this._curData.num);
            timeline.remove(timeline);
            UIMgr_1.default.ins.closeUI(UIData_1.UIHudDef.PropDropView);
        });
    };
    PropDropView.prototype.getDestination = function (itemId) {
        var propBar = cc.find("Canvas/ui/bottom/propsBar");
        if (propBar) {
            var itemNode = propBar.getChildByName("item_" + itemId);
            if (itemNode) {
                var itemNodeWorldPos = propBar.convertToWorldSpaceAR(itemNode.position);
                return itemNodeWorldPos.sub(cc.v3(cc.winSize.width / 2, cc.winSize.height / 2));
            }
        }
        return cc.v2(0, -600);
    };
    __decorate([
        property(cc.Prefab)
    ], PropDropView.prototype, "itemPrefab", void 0);
    PropDropView = __decorate([
        ccclass
    ], PropDropView);
    return PropDropView;
}(UIBase_1.default));
exports.default = PropDropView;

cc._RF.pop();