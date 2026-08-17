
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Hotel/HotelData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcSG90ZWxcXEhvdGVsRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0REFBMkQ7QUFDM0QsMENBQXFDO0FBR3JDLG1EQUFtRDtBQW1CbkQ7SUFBQTtJQTZJQSxDQUFDO0lBcElpQixrQkFBUSxHQUF0QjtRQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLElBQUksU0FBUyxHQUFHLHVCQUFVLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyx1QkFBVSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDL0UsS0FBSyxJQUFJLENBQUMsSUFBSSxTQUFTLEVBQUU7WUFDckIseUJBQXlCO1lBQ3pCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzVDO1FBQ0QsSUFBSSxDQUFDLFNBQVMsR0FBRyx1QkFBVSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsb0JBQVMsQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDM0UsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFYSxxQkFBVyxHQUF6QixVQUEwQixNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUk7UUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO1NBQy9CO1FBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFYSxxQkFBVyxHQUF6QixVQUEwQixN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S0FBSyxDQUFDO1NBQzFCO1FBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxRQUFRLENBQUM7UUFDbEMsdUJBQVUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLHVCQUFVLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3JGLENBQUM7SUF6SUQsU0FBUztJQUNNLG1CQUFTLEdBQWlDLElBQUksQ0FBQztJQUMvQyxtQkFBUyxHQUFHLElBQUksQ0FBQztJQUVqQixvQkFBVSxHQUF5QixJQUFJLENBQUM7SUF1STNELGdCQUFDO0NBN0lELEFBNklDLElBQUE7QUE3SVksOEJBQVM7QUErSXRCLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxTQUFTLENBQUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdG9yYWdlTWdyIH0gZnJvbSBcIi4uLy4uL0Jhc2UvTWFuYWdlci9TdG9yYWdlTWdyXCI7XG5pbXBvcnQgTSBmcm9tIFwiLi4vLi4vQmFzZS9NYW5hZ2VyL01cIjtcbmltcG9ydCBIb3RlbFJvb21DZmcgZnJvbSBcIi4uLy4uL0Jhc2UvVGFibHMvSG90ZWxSb29tQ2ZnXCI7XG5pbXBvcnQgSG90ZWxDZmcgZnJvbSBcIi4uLy4uL0Jhc2UvVGFibHMvSG90ZWxDZmdcIjtcbmltcG9ydCB7IE5hdGl2ZUtleSB9IGZyb20gXCIuLi9EYXRhL0NvbnN0L0NvbnN0YW50XCI7XG5pbXBvcnQgU2xvdEJvbnVzQ2ZnIGZyb20gXCIuLi8uLi9CYXNlL1RhYmxzL1Nsb3RCb251c0NmZ1wiO1xuXG4vL+S4gOS4quaIv+mXtOWGheeahOaJgOacieaVsOaNrlxuZXhwb3J0IGludGVyZmFjZSBJUm9vbURhdGEge1xuICAgIHJvb21JZDogbnVtYmVyLCAgLy/miL/pl7RpZFxuICAgIHNsb3RzOiB7IFtrZXk6IG51bWJlcl06IElTbG90RGF0YSB9LCAgLy/nianku7ZpZFxuICAgIHNjb3JlOiBudW1iZXJcbn1cblxuLy/kuIDkuKrnianku7bnmoTmlbDmja5cbmV4cG9ydCBpbnRlcmZhY2UgSVNsb3REYXRhIHtcbiAgICByb29tSWQ6IG51bWJlciwgIC8v5omA5bGe5oi/6Ze0aWRcbiAgICBzbG90SWQ6IG51bWJlciwgIC8v5pys54mp5Lu2aWRcbiAgICBzdWJJZDogbnVtYmVyLCAgIC8v54mp5Lu255qE5a2QaWQs5Zug5Li65pyJ5aSa5Liq55qu6IKkXG4gICAgc3RhdGU6IG51bWJlciwgICAvL+eJqeS7tueahOeKtuaAgSAwPeacquino+mUgSAxPeW3suino+mUgem7mOiupOearuiCpFxuICAgIHBvc2l0aW9uPzogY2MuVmVjMiwgICAgICAgLy/nianku7bnmoTkvY3nva4gICBcbn1cblxuZXhwb3J0IGNsYXNzIEhvdGVsRGF0YSB7XG5cbiAgICAvL+aJgOacieaIv+mXtOeahOaVsOaNrlxuICAgIHByaXZhdGUgc3RhdGljIF9yb29tRGF0YTogeyBba2V5OiBudW1iZXJdOiBJUm9vbURhdGEgfSA9IG51bGw7XG4gICAgcHJpdmF0ZSBzdGF0aWMgX3Nsb3REYXRhID0gbnVsbDtcblxuICAgIHByaXZhdGUgc3RhdGljIF9sb2NrSXRlbXM6IE1hcDxzdHJpbmcsIGNjLk5vZGU+ID0gbnVsbDtcblxuXG4gICAgcHVibGljIHN0YXRpYyBpbml0RGF0YSgpIHtcbiAgICAgICAgdGhpcy5fcm9vbURhdGEgPSB7fTtcbiAgICAgICAgbGV0IHJvb21EYXRhcyA9IFN0b3JhZ2VNZ3IuU3RvcmFnZS5nZXRPYmplY3QoU3RvcmFnZU1nci5TdG9yYWdlLkhvdGVsRGF0YSwge30pO1xuICAgICAgICBmb3IgKGxldCBpIGluIHJvb21EYXRhcykge1xuICAgICAgICAgICAgLy8gcm9vbURhdGFzW2ldWydzbG90cyddIFxuICAgICAgICAgICAgdGhpcy5fcm9vbURhdGFbTnVtYmVyKGkpXSA9IHJvb21EYXRhc1tpXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zbG90RGF0YSA9IFN0b3JhZ2VNZ3IuU3RvcmFnZS5nZXRPYmplY3QoTmF0aXZlS2V5LkhvdGVsU2xvdERhdGEsIHt9KTtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIuaIv+mXtOaVsOaNrlwiLCB0aGlzLl9yb29tRGF0YSk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBhZGRMb2NrSXRlbShyb29taWQsIHNsb3RpZCwgaXRlbSkge1xuICAgICAgICBpZiAoIXRoaXMuX2xvY2tJdGVtcykge1xuICAgICAgICAgICAgdGhpcy5fbG9ja0l0ZW1zID0gbmV3IE1hcCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2xvY2tJdGVtcy5zZXQoW3Jvb21pZCwgc2xvdGlkXS5qb2luKCdfJyksIGl0ZW0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0TG9ja0l0ZW0ocm9vbWlkLCBzbG90aWQpOiBjYy5Ob2RlIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IG51bGw7XG4gICAgICAgIGlmICh0aGlzLl9sb2NrSXRlbXMpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuX2xvY2tJdGVtcy5nZXQoW3Jvb21pZCwgc2xvdGlkXS5qb2luKCdfJykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoq6I635Y+W6YWN5Lu255qE6LSt5Lmw54q25oCBICovXG4gICAgcHVibGljIHN0YXRpYyBnZXRTdWJTbG90U3RhdGVEYXRhKGRhdGE6IElTbG90RGF0YSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2xvdERhdGFbW2RhdGEucm9vbUlkLCBkYXRhLnNsb3RJZCwgZGF0YS5zdWJJZF0uam9pbignJyldO1xuICAgIH1cblxuICAgIC8qKuiuvue9rumFjeS7tueahOi0reS5sOeKtuaAgSAqL1xuICAgIHB1YmxpYyBzdGF0aWMgc2V0U3ViU2xvdFN0YXRlRGF0YShkYXRhOiBJU2xvdERhdGEpIHtcbiAgICAgICAgY29uc3Qga2V5ID0gW2RhdGEucm9vbUlkLCBkYXRhLnNsb3RJZCwgZGF0YS5zdWJJZF0uam9pbignJyk7XG4gICAgICAgIHRoaXMuX3Nsb3REYXRhW2tleV0gPSAxO1xuICAgICAgICBTdG9yYWdlTWdyLlN0b3JhZ2Uuc2V0T2JqZWN0KE5hdGl2ZUtleS5Ib3RlbFNsb3REYXRhLCB0aGlzLl9zbG90RGF0YSk7XG4gICAgfVxuXG4gICAgLyoqIOi/lOWbnumFkuW6l+aIv+mXtOeahOmFjee9riAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SG90ZWxSb29tQ29uZmlnKHJvb21JZDogbnVtYmVyKTogSG90ZWxDZmcge1xuICAgICAgICBsZXQgY29uZmlncyA9IE0udGFibGUuSG90ZWxDZmcuZ2V0RGF0YSgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbmZpZ3MubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGlmIChjb25maWdzW2ldLnJvb21JZCA9PSByb29tSWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29uZmlnc1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKirov5Tlm57or6XmiL/pl7TmiYDmnInnianku7bnmoTphY3nva4qL1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0Um9vbVNsb3RzQ29uZmlnKHJvb21JZDogbnVtYmVyKTogTWFwPG51bWJlciwgSG90ZWxSb29tQ2ZnPiB7XG4gICAgICAgIGxldCBjb25maWdzID0gTS50YWJsZS5Ib3RlbFJvb21DZmcuZ2V0RGF0YSgpO1xuICAgICAgICBsZXQgY3VyQ29uZmlnOiBNYXA8bnVtYmVyLCBIb3RlbFJvb21DZmc+ID0gbmV3IE1hcCgpO1xuICAgICAgICBjb25maWdzLmZvckVhY2goKGljb25maWcsIGkpID0+IHtcbiAgICAgICAgICAgIGlmIChpY29uZmlnLnJvb21JZCA9PSByb29tSWQpIHtcbiAgICAgICAgICAgICAgICBjdXJDb25maWcuc2V0KGksIGljb25maWcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGN1ckNvbmZpZztcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldFNsb3RCb251c0J5Q291bnQocm9vbUlkOiBudW1iZXIsIGNvdW50OiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IE0udGFibGUuU2xvdEJvbnVzQ2ZnLmdldERhdGEoKTtcbiAgICAgICAgbGV0IHJlc3VsdCA9IDA7XG4gICAgICAgIGxldCByb29tQ2ZnOiBBcnJheTxTbG90Qm9udXNDZmc+ID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGRhdGFbaV0ucm9vbUlkID09IHJvb21JZCkge1xuICAgICAgICAgICAgICAgIHJvb21DZmcucHVzaChkYXRhW2ldKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm9vbUNmZy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgY2ZnID0gcm9vbUNmZ1tpXTtcbiAgICAgICAgICAgIGNvbnN0IG5leHRDZmcgPSByb29tQ2ZnW2kgKyAxXTtcbiAgICAgICAgICAgIGlmIChuZXh0Q2ZnICYmIGNvdW50ID49IGNmZy5jb3VudCAmJiBjb3VudCA8IG5leHRDZmcuY291bnQpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBjZmcuYm9udXM7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNvdW50ID09IGNmZy5jb3VudCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGNmZy5ib251cztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8qKiDojrflj5bmiL/pl7TljZXkuKrnianku7bnmoTphY3nva4gKi9cbiAgICBwdWJsaWMgc3RhdGljIGdldFNsb3RDb25maWcocm9vbUlkOiBudW1iZXIsIHNsb3RJZDogbnVtYmVyKTogSG90ZWxSb29tQ2ZnIHtcbiAgICAgICAgcmV0dXJuIE0udGFibGUuSG90ZWxSb29tQ2ZnLmdldEJ5UHJpbWFyeUtleXMocm9vbUlkLCBzbG90SWQpO1xuICAgIH1cblxuICAgIC8v6L+U5Zue5oi/6Ze055qE5pWw5o2uXG4gICAgcHVibGljIHN0YXRpYyBnZXRSb29tRGF0YShyb29tSWQpOiBJUm9vbURhdGEge1xuICAgICAgICByZXR1cm4gdGhpcy5fcm9vbURhdGFbcm9vbUlkXTtcbiAgICB9XG5cbiAgICAvL+aUvuWbnuaIv+mXtOeJqeS7tueahOaVsOaNrlxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0U2xvdERhdGEocm9vbUlkOiBudW1iZXIsIHNsb3RJZDogbnVtYmVyIHwgc3RyaW5nKTogSVNsb3REYXRhIHtcbiAgICAgICAgbGV0IHJvb21EYXRhID0gdGhpcy5nZXRSb29tRGF0YShyb29tSWQpO1xuICAgICAgICBpZiAocm9vbURhdGEgJiYgcm9vbURhdGEuc2xvdHMgJiYgcm9vbURhdGEuc2xvdHNbc2xvdElkXSkge1xuICAgICAgICAgICAgcmV0dXJuIHJvb21EYXRhLnNsb3RzW3Nsb3RJZF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy/mm7TmlrDnianku7bmlbDmja5cbiAgICBwdWJsaWMgc3RhdGljIHVwZGF0ZVNsb3REYXRhKHNsb3REYXRhOiBJU2xvdERhdGEpIHtcblxuICAgICAgICBsZXQgcm9vbURhdGEgPSB0aGlzLmdldFJvb21EYXRhKHNsb3REYXRhLnJvb21JZCkgYXMgSVJvb21EYXRhO1xuICAgICAgICBpZiAocm9vbURhdGEgPT0gbnVsbCkge1xuICAgICAgICAgICAgcm9vbURhdGEgPSB7IHJvb21JZDogc2xvdERhdGEucm9vbUlkLCBzbG90czoge30sIHNjb3JlOiAwIH07XG4gICAgICAgIH1cbiAgICAgICAgcm9vbURhdGEuc2xvdHNbc2xvdERhdGEuc2xvdElkXSA9IHNsb3REYXRhOyAgLy9bc2xvdERhdGEucm9vbUlkLCBzbG90RGF0YS5zbG90SWQsIHNsb3REYXRhLnN1YklkLCBzbG90RGF0YS5zdGF0ZV07XG4gICAgICAgIHRoaXMuX3Jvb21EYXRhW3Nsb3REYXRhLnJvb21JZF0gPSByb29tRGF0YTtcbiAgICAgICAgU3RvcmFnZU1nci5TdG9yYWdlLnNldE9iamVjdChTdG9yYWdlTWdyLlN0b3JhZ2UuSG90ZWxEYXRhLCB0aGlzLl9yb29tRGF0YSwgdHJ1ZSk7XG4gICAgICAgIHJldHVybiByb29tRGF0YTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldFNjb3JlQnlSb29tSWQocm9vbUlkOiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICBsZXQgcm9vbURhdGEgPSB0aGlzLmdldFJvb21EYXRhKHJvb21JZCkgYXMgSVJvb21EYXRhO1xuICAgICAgICByZXR1cm4gcm9vbURhdGEgPyByb29tRGF0YS5zY29yZSB8fCAwIDogMDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHVwZGF0ZVJvb21TY29yZShyb29tSWQ6IG51bWJlciwgc2NvcmU6IG51bWJlcikge1xuICAgICAgICBsZXQgcm9vbURhdGEgPSB0aGlzLmdldFJvb21EYXRhKHJvb21JZCkgYXMgSVJvb21EYXRhO1xuICAgICAgICBpZiAoIXJvb21EYXRhKSB7XG4gICAgICAgICAgICByb29tRGF0YSA9IHsgcm9vbUlkLCBzbG90czoge30sIHNjb3JlIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByb29tRGF0YS5zY29yZSA9IHNjb3JlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3Jvb21EYXRhW3Jvb21JZF0gPSByb29tRGF0YTtcbiAgICAgICAgU3RvcmFnZU1nci5TdG9yYWdlLnNldE9iamVjdChTdG9yYWdlTWdyLlN0b3JhZ2UuSG90ZWxEYXRhLCB0aGlzLl9yb29tRGF0YSwgdHJ1ZSk7XG4gICAgfVxuXG59XG5cbndpbmRvd1tcIkhvdGVsRGF0YVwiXSA9IEhvdGVsRGF0YTsiXX0=