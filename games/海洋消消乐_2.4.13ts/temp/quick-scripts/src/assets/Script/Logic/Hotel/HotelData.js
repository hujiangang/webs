"use strict";
cc._RF.push(module, 'f05c9SviIpIgbSgwdnxKEya', 'HotelData');
// Script/Logic/Hotel/HotelData.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelData = void 0;
var StorageMgr_1 = require("../../Base/Manager/StorageMgr");
var M_1 = require("../../Base/Manager/M");
var Constant_1 = require("../Data/Const/Constant");
var HotelData = /** @class */ (function () {
    function HotelData() {
    }
    HotelData.initData = function () {
        this._roomData = {};
        var roomDatas = StorageMgr_1.StorageMgr.Storage.getObject(StorageMgr_1.StorageMgr.Storage.HotelData, {});
        for (var i in roomDatas) {
            // roomDatas[i]['slots'] 
            this._roomData[Number(i)] = roomDatas[i];
        }
        this._slotData = StorageMgr_1.StorageMgr.Storage.getObject(Constant_1.NativeKey.HotelSlotData, {});
        console.error("房间数据", this._roomData);
    };
    HotelData.addLockItem = function (roomid, slotid, item) {
        if (!this._lockItems) {
            this._lockItems = new Map();
        }
        this._lockItems.set([roomid, slotid].join('_'), item);
    };
    HotelData.getLockItem = function (roomid, slotid) {
        var result = null;
        if (this._lockItems) {
            result = this._lockItems.get([roomid, slotid].join('_'));
        }
        return result;
    };
    /**获取配件的购买状态 */
    HotelData.getSubSlotStateData = function (data) {
        return this._slotData[[data.roomId, data.slotId, data.subId].join('')];
    };
    /**设置配件的购买状态 */
    HotelData.setSubSlotStateData = function (data) {
        var key = [data.roomId, data.slotId, data.subId].join('');
        this._slotData[key] = 1;
        StorageMgr_1.StorageMgr.Storage.setObject(Constant_1.NativeKey.HotelSlotData, this._slotData);
    };
    /** 返回酒店房间的配置 */
    HotelData.getHotelRoomConfig = function (roomId) {
        var configs = M_1.default.table.HotelCfg.getData();
        for (var i = 0; i < configs.length; ++i) {
            if (configs[i].roomId == roomId) {
                return configs[i];
            }
        }
        return null;
    };
    /**返回该房间所有物件的配置*/
    HotelData.getRoomSlotsConfig = function (roomId) {
        var configs = M_1.default.table.HotelRoomCfg.getData();
        var curConfig = new Map();
        configs.forEach(function (iconfig, i) {
            if (iconfig.roomId == roomId) {
                curConfig.set(i, iconfig);
            }
        });
        return curConfig;
    };
    HotelData.getSlotBonusByCount = function (roomId, count) {
        var data = M_1.default.table.SlotBonusCfg.getData();
        var result = 0;
        var roomCfg = [];
        for (var i = 0; i < data.length; i++) {
            if (data[i].roomId == roomId) {
                roomCfg.push(data[i]);
            }
        }
        for (var i = 0; i < roomCfg.length; i++) {
            var cfg = roomCfg[i];
            var nextCfg = roomCfg[i + 1];
            if (nextCfg && count >= cfg.count && count < nextCfg.count) {
                result = cfg.bonus;
                break;
            }
            else if (count == cfg.count) {
                result = cfg.bonus;
                break;
            }
        }
        return result;
    };
    /** 获取房间单个物件的配置 */
    HotelData.getSlotConfig = function (roomId, slotId) {
        return M_1.default.table.HotelRoomCfg.getByPrimaryKeys(roomId, slotId);
    };
    //返回房间的数据
    HotelData.getRoomData = function (roomId) {
        return this._roomData[roomId];
    };
    //放回房间物件的数据
    HotelData.getSlotData = function (roomId, slotId) {
        var roomData = this.getRoomData(roomId);
        if (roomData && roomData.slots && roomData.slots[slotId]) {
            return roomData.slots[slotId];
        }
        return null;
    };
    //更新物件数据
    HotelData.updateSlotData = function (slotData) {
        var roomData = this.getRoomData(slotData.roomId);
        if (roomData == null) {
            roomData = { roomId: slotData.roomId, slots: {}, score: 0 };
        }
        roomData.slots[slotData.slotId] = slotData; //[slotData.roomId, slotData.slotId, slotData.subId, slotData.state];
        this._roomData[slotData.roomId] = roomData;
        StorageMgr_1.StorageMgr.Storage.setObject(StorageMgr_1.StorageMgr.Storage.HotelData, this._roomData, true);
        return roomData;
    };
    HotelData.getScoreByRoomId = function (roomId) {
        var roomData = this.getRoomData(roomId);
        return roomData ? roomData.score || 0 : 0;
    };
    HotelData.updateRoomScore = function (roomId, score) {
        var roomData = this.getRoomData(roomId);
        if (!roomData) {
            roomData = { roomId: roomId, slots: {}, score: score };
        }
        else {
            roomData.score = score;
        }
        this._roomData[roomId] = roomData;
        StorageMgr_1.StorageMgr.Storage.setObject(StorageMgr_1.StorageMgr.Storage.HotelData, this._roomData, true);
    };
    //所有房间的数据
    HotelData._roomData = null;
    HotelData._slotData = null;
    HotelData._lockItems = null;
    return HotelData;
}());
exports.HotelData = HotelData;
window["HotelData"] = HotelData;

cc._RF.pop();