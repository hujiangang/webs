"use strict";
cc._RF.push(module, '9cf99WPNKRITKn63x49g3kT', 'DiningHall');
// Script/Logic/SimulationOperation/View/Map/DiningHall.ts

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
var Exchange_1 = require("./Exchange");
var SpinePlayerCtrl_1 = require("../../../../Base/CustomComponent/SpinePlayerCtrl");
var EventMgr_1 = require("../../../../Base/Manager/EventMgr");
var Event_1 = require("../../../Data/Const/Event");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var DiningHall = /** @class */ (function (_super) {
    __extends(DiningHall, _super);
    function DiningHall() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DiningHall.prototype.onLoad = function () {
        var _this = this;
        var exchange = this.node.getComponent(Exchange_1.default);
        cc.loader.loadRes('prefab/map/canting/canting', cc.Prefab, function (err, prefab) {
            if (!err) {
                var node = cc.instantiate(prefab);
                _this.node.addChild(node);
                var sp = _this.sp = node.getComponentInChildren(SpinePlayerCtrl_1.default);
                sp.play("dianmian_jinzhi" + (exchange.state + 1), 0);
                EventMgr_1.default.ins.register(Event_1.Event.Map.Upgrade, _this.exchangeState, _this);
            }
        });
    };
    DiningHall.prototype.onDestroy = function () {
        EventMgr_1.default.ins.unRegister(Event_1.Event.Map.Upgrade, this.exchangeState, this);
    };
    DiningHall.prototype.exchangeState = function (state) {
        var exchange = this.node.getComponent(Exchange_1.default);
        this.sp.play(state == 1 ? 'dianmian' : 'dianmian2', 0, false, function () {
            exchange.inAnim = false;
        });
    };
    DiningHall.prototype.showState = function (state) {
        this.sp.play("dianmian_jinzhi" + (state + 1), 0);
    };
    DiningHall.prototype.start = function () {
    };
    DiningHall = __decorate([
        ccclass
    ], DiningHall);
    return DiningHall;
}(cc.Component));
exports.default = DiningHall;

cc._RF.pop();