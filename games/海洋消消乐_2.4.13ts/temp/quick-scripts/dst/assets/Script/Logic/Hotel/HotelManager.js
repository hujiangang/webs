
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Hotel/HotelManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9ee38Kl/4lPILv8TfumUtUm', 'HotelManager');
// Script/Logic/Hotel/HotelManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelManager = void 0;
var HotelData_1 = require("./HotelData");
var HotelManager = /** @class */ (function () {
    function HotelManager() {
    }
    /** 查看该物件是否已经修缮完毕 */
    HotelManager.getSlotUnlock = function (roomId, slotId) {
        var slotData = HotelData_1.HotelData.getSlotData(roomId, slotId);
        return (slotData && slotData.state > 0);
    };
    /** 判断该物件是否显示解锁icon //显示逻辑: 每次最多显示两个可以解锁物件。按顺序显示 */
    HotelManager.checkSlotUnlockShow = function (roomId, index) {
        var config = HotelData_1.HotelData.getRoomSlotsConfig(roomId);
        var isOpen = this.getSlotUnlock(roomId, config.get(index - 1).slotId);
        if (isOpen)
            return false;
        //检查前一组是否都解锁完毕
        var lastGroupIndex = index % 2 == 0 ? [index - 3, index - 2] : [index - 2, index - 1];
        for (var i = 0; i < lastGroupIndex.length; ++i) {
            if (lastGroupIndex[i] <= 0) {
                continue;
            }
            if (!this.getSlotUnlock(roomId, config.get(lastGroupIndex[i] - 1).slotId)) {
                return false;
            }
        }
        return true;
    };
    /** 判断房间内物件全部解锁完毕 */
    HotelManager.checkRoomSlotsFinished = function (roomId) {
        if (roomId < 1)
            return true;
        var result = true;
        var configs = HotelData_1.HotelData.getRoomSlotsConfig(roomId).values();
        var cfg = null;
        while (cfg = configs.next(), !cfg.done) {
            var checkOpen = HotelManager.getSlotUnlock(roomId, cfg.value.slotId);
            if (!checkOpen) {
                result = false;
                break;
            }
        }
        return result;
    };
    return HotelManager;
}());
exports.HotelManager = HotelManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcSG90ZWxcXEhvdGVsTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBd0M7QUFJeEM7SUFBQTtJQTBDQSxDQUFDO0lBeENHLG9CQUFvQjtJQUNOLDBCQUFhLEdBQTNCLFVBQTRCLE1BQU0sRUFBRSxNQUFNO1FBQ3RDLElBQUksUUFBUSxHQUFHLHFCQUFTLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNyRCxPQUFPLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELG1EQUFtRDtJQUNyQyxnQ0FBbUIsR0FBakMsVUFBa0MsTUFBYyxFQUFFLEtBQWE7UUFDM0QsSUFBTSxNQUFNLEdBQUcscUJBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVwRCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0RSxJQUFJLE1BQU07WUFBRSxPQUFPLEtBQUssQ0FBQztRQUN6QixjQUFjO1FBQ2QsSUFBSSxjQUFjLEdBQUcsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdEYsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUU7WUFDNUMsSUFBSSxjQUFjLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN4QixTQUFTO2FBQ1o7WUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ3ZFLE9BQU8sS0FBSyxDQUFDO2FBQ2hCO1NBQ0o7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsb0JBQW9CO0lBQ04sbUNBQXNCLEdBQXBDLFVBQXFDLE1BQU07UUFDdkMsSUFBSSxNQUFNLEdBQUcsQ0FBQztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBQzVCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQTtRQUNqQixJQUFJLE9BQU8sR0FBRyxxQkFBUyxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzVELElBQUksR0FBRyxHQUFpQyxJQUFJLENBQUE7UUFDNUMsT0FBTyxHQUFHLEdBQUcsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRTtZQUNwQyxJQUFJLFNBQVMsR0FBRyxZQUFZLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3JFLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ1osTUFBTSxHQUFHLEtBQUssQ0FBQztnQkFDZixNQUFNO2FBQ1Q7U0FDSjtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFDTCxtQkFBQztBQUFELENBMUNBLEFBMENDLElBQUE7QUExQ1ksb0NBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIb3RlbERhdGEgfSBmcm9tIFwiLi9Ib3RlbERhdGFcIjtcbmltcG9ydCBIb3RlbFJvb21DZmcgZnJvbSBcIi4uLy4uL0Jhc2UvVGFibHMvSG90ZWxSb29tQ2ZnXCI7XG5cblxuZXhwb3J0IGNsYXNzIEhvdGVsTWFuYWdlciB7XG5cbiAgICAvKiog5p+l55yL6K+l54mp5Lu25piv5ZCm5bey57uP5L+u57yu5a6M5q+VICovXG4gICAgcHVibGljIHN0YXRpYyBnZXRTbG90VW5sb2NrKHJvb21JZCwgc2xvdElkKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBzbG90RGF0YSA9IEhvdGVsRGF0YS5nZXRTbG90RGF0YShyb29tSWQsIHNsb3RJZCk7XG4gICAgICAgIHJldHVybiAoc2xvdERhdGEgJiYgc2xvdERhdGEuc3RhdGUgPiAwKTtcbiAgICB9XG5cbiAgICAvKiog5Yik5pat6K+l54mp5Lu25piv5ZCm5pi+56S66Kej6ZSBaWNvbiAvL+aYvuekuumAu+i+kTog5q+P5qyh5pyA5aSa5pi+56S65Lik5Liq5Y+v5Lul6Kej6ZSB54mp5Lu244CC5oyJ6aG65bqP5pi+56S6ICovXG4gICAgcHVibGljIHN0YXRpYyBjaGVja1Nsb3RVbmxvY2tTaG93KHJvb21JZDogbnVtYmVyLCBpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGNvbmZpZyA9IEhvdGVsRGF0YS5nZXRSb29tU2xvdHNDb25maWcocm9vbUlkKTtcblxuICAgICAgICBsZXQgaXNPcGVuID0gdGhpcy5nZXRTbG90VW5sb2NrKHJvb21JZCwgY29uZmlnLmdldChpbmRleCAtIDEpLnNsb3RJZCk7XG4gICAgICAgIGlmIChpc09wZW4pIHJldHVybiBmYWxzZTtcbiAgICAgICAgLy/mo4Dmn6XliY3kuIDnu4TmmK/lkKbpg73op6PplIHlrozmr5VcbiAgICAgICAgbGV0IGxhc3RHcm91cEluZGV4ID0gaW5kZXggJSAyID09IDAgPyBbaW5kZXggLSAzLCBpbmRleCAtIDJdIDogW2luZGV4IC0gMiwgaW5kZXggLSAxXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsYXN0R3JvdXBJbmRleC5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgaWYgKGxhc3RHcm91cEluZGV4W2ldIDw9IDApIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdGhpcy5nZXRTbG90VW5sb2NrKHJvb21JZCwgY29uZmlnLmdldChsYXN0R3JvdXBJbmRleFtpXSAtIDEpLnNsb3RJZCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLyoqIOWIpOaWreaIv+mXtOWGheeJqeS7tuWFqOmDqOino+mUgeWujOavlSAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY2hlY2tSb29tU2xvdHNGaW5pc2hlZChyb29tSWQpIHtcbiAgICAgICAgaWYgKHJvb21JZCA8IDEpIHJldHVybiB0cnVlO1xuICAgICAgICBsZXQgcmVzdWx0ID0gdHJ1ZVxuICAgICAgICBsZXQgY29uZmlncyA9IEhvdGVsRGF0YS5nZXRSb29tU2xvdHNDb25maWcocm9vbUlkKS52YWx1ZXMoKTtcbiAgICAgICAgbGV0IGNmZzogSXRlcmF0b3JSZXN1bHQ8SG90ZWxSb29tQ2ZnPiA9IG51bGxcbiAgICAgICAgd2hpbGUgKGNmZyA9IGNvbmZpZ3MubmV4dCgpLCAhY2ZnLmRvbmUpIHtcbiAgICAgICAgICAgIGxldCBjaGVja09wZW4gPSBIb3RlbE1hbmFnZXIuZ2V0U2xvdFVubG9jayhyb29tSWQsIGNmZy52YWx1ZS5zbG90SWQpO1xuICAgICAgICAgICAgaWYgKCFjaGVja09wZW4pIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn0iXX0=