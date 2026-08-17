
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Views/LevelMap/SelectChapterCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxWaWV3c1xcTGV2ZWxNYXBcXFNlbGVjdENoYXB0ZXJDdHJsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDBDQUFxQztBQUNyQyxxREFBZ0Q7QUFFMUMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBK0MscUNBQVk7SUFBM0Q7UUFBQSxxRUFxQkM7UUFsQkcsYUFBTyxHQUFZLElBQUksQ0FBQztRQUd4QixnQkFBVSxHQUFjLElBQUksQ0FBQzs7SUFlakMsQ0FBQztJQWJHLGtDQUFNLEdBQU47SUFFQSxDQUFDO0lBRU0sZ0NBQUksR0FBWCxVQUFZLFFBQW1CO1FBQS9CLGlCQU9DO1FBTkcsSUFBTSxLQUFLLEdBQUcsV0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUE7UUFDM0MsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7WUFDZCxJQUFNLElBQUksR0FBRyxXQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDcEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFJLENBQUMsT0FBTyxDQUFDO1lBQzNCLElBQUksQ0FBQyxZQUFZLENBQUMseUJBQWUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2pFLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQWhCRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3NEQUNNO0lBR3hCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7eURBQ1M7SUFOWixpQkFBaUI7UUFEckMsT0FBTztPQUNhLGlCQUFpQixDQXFCckM7SUFBRCx3QkFBQztDQXJCRCxBQXFCQyxDQXJCOEMsRUFBRSxDQUFDLFNBQVMsR0FxQjFEO2tCQXJCb0IsaUJBQWlCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE0gZnJvbSBcIi4uLy4uL0Jhc2UvTWFuYWdlci9NXCI7XG5pbXBvcnQgQ2hhcHRlckl0ZW1DdHJsIGZyb20gXCIuL0NoYXB0ZXJJdGVtQ3RybFwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VsZWN0Q2hhcHRlckN0cmwgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgY29udGVudDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIGl0ZW1QcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XG5cbiAgICBvbkxvYWQoKSB7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgaW5pdChjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XG4gICAgICAgIGNvbnN0IGRhdGFzID0gTS50YWJsZS5DaGFwdGVySW5mby5nZXREYXRhKClcbiAgICAgICAgZGF0YXMuZm9yRWFjaChpbmZvID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBNLm5vZGVQb29sLmNyZWF0ZUl0ZW0odGhpcy5pdGVtUHJlZmFiKTtcbiAgICAgICAgICAgIGl0ZW0ucGFyZW50ID0gdGhpcy5jb250ZW50O1xuICAgICAgICAgICAgaXRlbS5nZXRDb21wb25lbnQoQ2hhcHRlckl0ZW1DdHJsKS5pbml0KGluZm8sIDAuNywgY2FsbGJhY2spO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cbiJdfQ==