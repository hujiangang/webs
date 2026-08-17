"use strict";
cc._RF.push(module, '23081ERW3xF8qqQAbIbrc4Y', 'Sequence');
// Script/Base/Network/Sequence.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sequence = /** @class */ (function () {
    function Sequence() {
        this.counter = 100;
    }
    Sequence.prototype.next = function () {
        return this.counter++;
    };
    Sequence.prototype.nextString = function () {
        return this.next().toString();
    };
    Sequence.prototype.reset = function () {
        this.counter = 1;
    };
    return Sequence;
}());
exports.default = Sequence;

cc._RF.pop();