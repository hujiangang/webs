
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Base/Tabls/ChapterInfo.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a02328K7UZK37f/ouKQarPQ', 'ChapterInfo');
// Script/Base/Tabls/ChapterInfo.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChapterInfo = /** @class */ (function () {
    function ChapterInfo(data) {
        this.id = null;
        this.name = null;
        this.detail = null;
        this.resId = null;
        this.minLv = 0;
        this.maxLv = 0;
        this.id = data.id;
        this.name = data.name;
        this.detail = data.detail || '';
        this.resId = data.res;
        this.setLv(data.lv);
    }
    ChapterInfo.prototype.setLv = function (cs) {
        if (cs) {
            var sc = cs.split('|');
            this.minLv = Number(sc[0]);
            this.maxLv = Number(sc[1]);
        }
    };
    return ChapterInfo;
}());
exports.default = ChapterInfo;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCYXNlXFxUYWJsc1xcQ2hhcHRlckluZm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtJQUVJLHFCQUFZLElBQVM7UUFRTCxPQUFFLEdBQVcsSUFBSSxDQUFDO1FBRWxCLFNBQUksR0FBVyxJQUFJLENBQUM7UUFFcEIsV0FBTSxHQUFXLElBQUksQ0FBQztRQUV0QixVQUFLLEdBQVcsSUFBSSxDQUFDO1FBRTlCLFVBQUssR0FBVyxDQUFDLENBQUM7UUFFbEIsVUFBSyxHQUFXLENBQUMsQ0FBQztRQWpCckIsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUN0QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUN2QixDQUFDO0lBZU8sMkJBQUssR0FBYixVQUFjLEVBQVU7UUFDcEIsSUFBSSxFQUFFLEVBQUU7WUFDSixJQUFNLEVBQUUsR0FBUSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQzdCLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzlCO0lBQ0wsQ0FBQztJQUNMLGtCQUFDO0FBQUQsQ0E5QkEsQUE4QkMsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIENoYXB0ZXJJbmZvIHtcblxuICAgIGNvbnN0cnVjdG9yKGRhdGE6IGFueSkge1xuICAgICAgICB0aGlzLmlkID0gZGF0YS5pZDtcbiAgICAgICAgdGhpcy5uYW1lID0gZGF0YS5uYW1lO1xuICAgICAgICB0aGlzLmRldGFpbCA9IGRhdGEuZGV0YWlsIHx8ICcnO1xuICAgICAgICB0aGlzLnJlc0lkID0gZGF0YS5yZXM7XG4gICAgICAgIHRoaXMuc2V0THYoZGF0YS5sdilcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVhZG9ubHkgaWQ6IG51bWJlciA9IG51bGw7XG5cbiAgICBwdWJsaWMgcmVhZG9ubHkgbmFtZTogc3RyaW5nID0gbnVsbDtcblxuICAgIHB1YmxpYyByZWFkb25seSBkZXRhaWw6IHN0cmluZyA9IG51bGw7XG5cbiAgICBwdWJsaWMgcmVhZG9ubHkgcmVzSWQ6IHN0cmluZyA9IG51bGw7XG5cbiAgICBwdWJsaWMgbWluTHY6IG51bWJlciA9IDA7XG5cbiAgICBwdWJsaWMgbWF4THY6IG51bWJlciA9IDA7XG5cblxuICAgIHByaXZhdGUgc2V0THYoY3M6IHN0cmluZykge1xuICAgICAgICBpZiAoY3MpIHtcbiAgICAgICAgICAgIGNvbnN0IHNjID0gPGFueT5jcy5zcGxpdCgnfCcpXG4gICAgICAgICAgICB0aGlzLm1pbkx2ID0gTnVtYmVyKHNjWzBdKTtcbiAgICAgICAgICAgIHRoaXMubWF4THYgPSBOdW1iZXIoc2NbMV0pO1xuICAgICAgICB9XG4gICAgfVxufSJdfQ==