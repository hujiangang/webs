"use strict";
cc._RF.push(module, '927ffRr7ZROl7Y6I+3f4UNU', 'Titles');
// Script/Base/Tabls/Titles.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Titles = /** @class */ (function () {
    function Titles(data) {
        this.showTargetContent = null;
        this.novContent = null;
        this.lv = data.lv;
        this.setTC(data.showTargetContent);
        this.setNC(data.novContent);
    }
    Titles.prototype.setTC = function (c) {
        if (c && c != '') {
            this.showTargetContent = c;
        }
    };
    Titles.prototype.setNC = function (c) {
        if (c && c != '') {
            this.novContent = c;
        }
    };
    return Titles;
}());
exports.default = Titles;

cc._RF.pop();