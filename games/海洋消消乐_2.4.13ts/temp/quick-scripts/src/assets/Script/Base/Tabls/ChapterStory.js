"use strict";
cc._RF.push(module, '8cb9d3nx9hAPqIstmeotG6W', 'ChapterStory');
// Script/Base/Tabls/ChapterStory.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChapterStory = /** @class */ (function () {
    function ChapterStory(data) {
        this.chapterId = null;
        this.trigger = null;
        this.infomation = null;
        this.storys = null;
        this.chapterId = data.id;
        this.trigger = data.trigger;
        this.infomation = data.infomation;
        this.resetContentAry(data.content);
    }
    ChapterStory.prototype.resetContentAry = function (cs) {
        var _this = this;
        if (cs) {
            this.storys = [];
            cs.forEach(function (c) {
                if (c) {
                    var sc = c.split('|');
                    _this.storys.push({ rid: Number(sc[0]), name: sc[1], isLeft: !Number(sc[2]), content: sc[3] });
                }
            });
        }
    };
    return ChapterStory;
}());
exports.default = ChapterStory;

cc._RF.pop();