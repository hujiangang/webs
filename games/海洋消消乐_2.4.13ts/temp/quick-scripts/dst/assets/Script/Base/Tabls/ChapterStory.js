
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Base/Tabls/ChapterStory.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCYXNlXFxUYWJsc1xcQ2hhcHRlclN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFFSSxzQkFBWSxJQUFTO1FBT0wsY0FBUyxHQUFXLElBQUksQ0FBQztRQUV6QixZQUFPLEdBQVcsSUFBSSxDQUFDO1FBRXZCLGVBQVUsR0FBVyxJQUFJLENBQUM7UUFFbkMsV0FBTSxHQUEyRSxJQUFJLENBQUM7UUFaekYsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM1QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDbEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQVVPLHNDQUFlLEdBQXZCLFVBQXdCLEVBQWlCO1FBQXpDLGlCQVVDO1FBVEcsSUFBSSxFQUFFLEVBQUU7WUFDSixJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUNqQixFQUFFLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQztnQkFDUixJQUFJLENBQUMsRUFBRTtvQkFDSCxJQUFNLEVBQUUsR0FBUSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO29CQUM1QixLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQ2pHO1lBQ0wsQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7SUFDTCxtQkFBQztBQUFELENBNUJBLEFBNEJDLElBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBDaGFwdGVyU3Rvcnkge1xuXG4gICAgY29uc3RydWN0b3IoZGF0YTogYW55KSB7XG4gICAgICAgIHRoaXMuY2hhcHRlcklkID0gZGF0YS5pZDtcbiAgICAgICAgdGhpcy50cmlnZ2VyID0gZGF0YS50cmlnZ2VyO1xuICAgICAgICB0aGlzLmluZm9tYXRpb24gPSBkYXRhLmluZm9tYXRpb247XG4gICAgICAgIHRoaXMucmVzZXRDb250ZW50QXJ5KGRhdGEuY29udGVudCk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlYWRvbmx5IGNoYXB0ZXJJZDogbnVtYmVyID0gbnVsbDtcblxuICAgIHB1YmxpYyByZWFkb25seSB0cmlnZ2VyOiBudW1iZXIgPSBudWxsO1xuXG4gICAgcHVibGljIHJlYWRvbmx5IGluZm9tYXRpb246IHN0cmluZyA9IG51bGw7XG5cbiAgICBwdWJsaWMgc3RvcnlzOiBBcnJheTx7IHJpZDogbnVtYmVyLCBuYW1lOiBzdHJpbmcsIGNvbnRlbnQ6IHN0cmluZywgaXNMZWZ0OiBib29sZWFuIH0+ID0gbnVsbDtcblxuICAgIHByaXZhdGUgcmVzZXRDb250ZW50QXJ5KGNzOiBBcnJheTxzdHJpbmc+KSB7XG4gICAgICAgIGlmIChjcykge1xuICAgICAgICAgICAgdGhpcy5zdG9yeXMgPSBbXTtcbiAgICAgICAgICAgIGNzLmZvckVhY2goYyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2MgPSA8YW55PmMuc3BsaXQoJ3wnKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3J5cy5wdXNoKHsgcmlkOiBOdW1iZXIoc2NbMF0pLCBuYW1lOiBzY1sxXSwgaXNMZWZ0OiAhTnVtYmVyKHNjWzJdKSwgY29udGVudDogc2NbM10gfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59Il19