"use strict";
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