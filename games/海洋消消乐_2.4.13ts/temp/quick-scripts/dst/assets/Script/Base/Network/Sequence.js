
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Base/Network/Sequence.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCYXNlXFxOZXR3b3JrXFxTZXF1ZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0lBQUE7UUFFWSxZQUFPLEdBQUcsR0FBRyxDQUFDO0lBYzFCLENBQUM7SUFaVSx1QkFBSSxHQUFYO1FBQ0ksT0FBTyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVNLDZCQUFVLEdBQWpCO1FBQ0ksT0FBTyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbEMsQ0FBQztJQUVNLHdCQUFLLEdBQVo7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBRUwsZUFBQztBQUFELENBaEJBLEFBZ0JDLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBTZXF1ZW5jZSB7XG5cbiAgICBwcml2YXRlIGNvdW50ZXIgPSAxMDA7XG5cbiAgICBwdWJsaWMgbmV4dCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5jb3VudGVyKys7XG4gICAgfVxuXG4gICAgcHVibGljIG5leHRTdHJpbmcoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmV4dCgpLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlc2V0KCkge1xuICAgICAgICB0aGlzLmNvdW50ZXIgPSAxO1xuICAgIH1cblxufSJdfQ==