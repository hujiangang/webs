
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Base/Tabls/DailyTaskInfo.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '875d2ZQiE9OZYdmPmJ0RPtq', 'DailyTaskInfo');
// Script/Base/Tabls/DailyTaskInfo.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DailyTaskInfo = /** @class */ (function () {
    function DailyTaskInfo(data) {
        this.id = null;
        this.type = null;
        this.name = null;
        this.condition = null;
        this.conditionType = null;
        this.conditionSubType = null;
        this.rewards = null;
        this.id = Number(data.id);
        this.type = Number(data.type);
        this.condition = Number(data.condition);
        this.name = data.name;
        this._parseConditionType(data.conditionType);
        this.rewards = [{ type: Number(data.rewards.name), count: data.rewards.count }];
    }
    DailyTaskInfo.prototype._parseConditionType = function (type) {
        if (type) {
            var tmpData = type.split('|');
            if (tmpData.length == 1) {
                this.conditionType = type;
            }
            else {
                this.conditionType = tmpData[0];
                this.conditionSubType = tmpData[1];
            }
        }
    };
    return DailyTaskInfo;
}());
exports.default = DailyTaskInfo;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCYXNlXFxUYWJsc1xcRGFpbHlUYXNrSW5mby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUdBO0lBVUksdUJBQW1CLElBQUk7UUFSUCxPQUFFLEdBQVcsSUFBSSxDQUFDO1FBQ2xCLFNBQUksR0FBVyxJQUFJLENBQUM7UUFDcEIsU0FBSSxHQUFXLElBQUksQ0FBQztRQUNwQixjQUFTLEdBQVcsSUFBSSxDQUFDO1FBQ2xDLGtCQUFhLEdBQVcsSUFBSSxDQUFDO1FBQzdCLHFCQUFnQixHQUFXLElBQUksQ0FBQztRQUN2QixZQUFPLEdBQXNDLElBQUksQ0FBQztRQUk5RCxJQUFJLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUV4QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFFdEIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUNwRixDQUFDO0lBRU8sMkNBQW1CLEdBQTNCLFVBQTRCLElBQVk7UUFDcEMsSUFBSSxJQUFJLEVBQUU7WUFDTixJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQy9CLElBQUksT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7Z0JBQ3JCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO2FBQzdCO2lCQUFNO2dCQUNILElBQUksQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3RDO1NBQ0o7SUFDTCxDQUFDO0lBRUwsb0JBQUM7QUFBRCxDQWxDQSxBQWtDQyxJQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUNvbmZpZ0l0ZW0gfSBmcm9tIFwiLi4vLi4vTG9naWMvQ29tbW9uL0NvbW1vbkludGVyZmFjZXNcIjtcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYWlseVRhc2tJbmZvIHtcblxuICAgIHB1YmxpYyByZWFkb25seSBpZDogbnVtYmVyID0gbnVsbDtcbiAgICBwdWJsaWMgcmVhZG9ubHkgdHlwZTogbnVtYmVyID0gbnVsbDtcbiAgICBwdWJsaWMgcmVhZG9ubHkgbmFtZTogc3RyaW5nID0gbnVsbDtcbiAgICBwdWJsaWMgcmVhZG9ubHkgY29uZGl0aW9uOiBudW1iZXIgPSBudWxsO1xuICAgIHB1YmxpYyBjb25kaXRpb25UeXBlOiBzdHJpbmcgPSBudWxsO1xuICAgIHB1YmxpYyBjb25kaXRpb25TdWJUeXBlOiBzdHJpbmcgPSBudWxsO1xuICAgIHB1YmxpYyByZWFkb25seSByZXdhcmRzOiB7IHR5cGU6IG51bWJlciwgY291bnQ6IG51bWJlciB9W10gPSBudWxsO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGRhdGEpIHtcblxuICAgICAgICB0aGlzLmlkID0gTnVtYmVyKGRhdGEuaWQpO1xuICAgICAgICB0aGlzLnR5cGUgPSBOdW1iZXIoZGF0YS50eXBlKTtcbiAgICAgICAgdGhpcy5jb25kaXRpb24gPSBOdW1iZXIoZGF0YS5jb25kaXRpb24pO1xuXG4gICAgICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZTtcblxuICAgICAgICB0aGlzLl9wYXJzZUNvbmRpdGlvblR5cGUoZGF0YS5jb25kaXRpb25UeXBlKTtcbiAgICAgICAgdGhpcy5yZXdhcmRzID0gW3sgdHlwZTogTnVtYmVyKGRhdGEucmV3YXJkcy5uYW1lKSwgY291bnQ6IGRhdGEucmV3YXJkcy5jb3VudCB9XTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9wYXJzZUNvbmRpdGlvblR5cGUodHlwZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh0eXBlKSB7XG4gICAgICAgICAgICBjb25zdCB0bXBEYXRhID0gdHlwZS5zcGxpdCgnfCcpXG4gICAgICAgICAgICBpZiAodG1wRGF0YS5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29uZGl0aW9uVHlwZSA9IHR5cGU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY29uZGl0aW9uVHlwZSA9IHRtcERhdGFbMF07XG4gICAgICAgICAgICAgICAgdGhpcy5jb25kaXRpb25TdWJUeXBlID0gdG1wRGF0YVsxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxufSJdfQ==