
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Base/Tabls/Titles.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCYXNlXFxUYWJsc1xcVGl0bGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFFSSxnQkFBWSxJQUFTO1FBUWQsc0JBQWlCLEdBQVcsSUFBSSxDQUFDO1FBRWpDLGVBQVUsR0FBVyxJQUFJLENBQUM7UUFUN0IsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQVFPLHNCQUFLLEdBQWIsVUFBYyxDQUFTO1FBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDZCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDO1NBQzlCO0lBQ0wsQ0FBQztJQUVPLHNCQUFLLEdBQWIsVUFBYyxDQUFTO1FBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDZCxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztTQUN2QjtJQUNMLENBQUM7SUFDTCxhQUFDO0FBQUQsQ0F6QkEsQUF5QkMsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpdGxlcyB7XG5cbiAgICBjb25zdHJ1Y3RvcihkYXRhOiBhbnkpIHtcbiAgICAgICAgdGhpcy5sdiA9IGRhdGEubHY7XG4gICAgICAgIHRoaXMuc2V0VEMoZGF0YS5zaG93VGFyZ2V0Q29udGVudCk7XG4gICAgICAgIHRoaXMuc2V0TkMoZGF0YS5ub3ZDb250ZW50KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbHY6IG51bWJlcjtcblxuICAgIHB1YmxpYyBzaG93VGFyZ2V0Q29udGVudDogc3RyaW5nID0gbnVsbDtcblxuICAgIHB1YmxpYyBub3ZDb250ZW50OiBzdHJpbmcgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBzZXRUQyhjOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKGMgJiYgYyAhPSAnJykge1xuICAgICAgICAgICAgdGhpcy5zaG93VGFyZ2V0Q29udGVudCA9IGM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHNldE5DKGM6IHN0cmluZykge1xuICAgICAgICBpZiAoYyAmJiBjICE9ICcnKSB7XG4gICAgICAgICAgICB0aGlzLm5vdkNvbnRlbnQgPSBjO1xuICAgICAgICB9XG4gICAgfVxufSJdfQ==