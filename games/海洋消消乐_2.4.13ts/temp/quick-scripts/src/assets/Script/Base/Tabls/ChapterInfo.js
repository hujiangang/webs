"use strict";
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