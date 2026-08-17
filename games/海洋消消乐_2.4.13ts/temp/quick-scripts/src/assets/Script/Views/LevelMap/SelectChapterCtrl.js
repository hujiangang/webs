"use strict";
cc._RF.push(module, '89787NCWnFLzr25fv4owYu2', 'SelectChapterCtrl');
// Script/Views/LevelMap/SelectChapterCtrl.ts

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
var M_1 = require("../../Base/Manager/M");
var ChapterItemCtrl_1 = require("./ChapterItemCtrl");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SelectChapterCtrl = /** @class */ (function (_super) {
    __extends(SelectChapterCtrl, _super);
    function SelectChapterCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.content = null;
        _this.itemPrefab = null;
        return _this;
    }
    SelectChapterCtrl.prototype.onLoad = function () {
    };
    SelectChapterCtrl.prototype.init = function (callback) {
        var _this = this;
        var datas = M_1.default.table.ChapterInfo.getData();
        datas.forEach(function (info) {
            var item = M_1.default.nodePool.createItem(_this.itemPrefab);
            item.parent = _this.content;
            item.getComponent(ChapterItemCtrl_1.default).init(info, 0.7, callback);
        });
    };
    __decorate([
        property(cc.Node)
    ], SelectChapterCtrl.prototype, "content", void 0);
    __decorate([
        property(cc.Prefab)
    ], SelectChapterCtrl.prototype, "itemPrefab", void 0);
    SelectChapterCtrl = __decorate([
        ccclass
    ], SelectChapterCtrl);
    return SelectChapterCtrl;
}(cc.Component));
exports.default = SelectChapterCtrl;

cc._RF.pop();