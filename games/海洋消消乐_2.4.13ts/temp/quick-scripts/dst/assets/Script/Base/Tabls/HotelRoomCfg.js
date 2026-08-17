
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Base/Tabls/HotelRoomCfg.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '508baU8zyVEJKefr30j1/Nf', 'HotelRoomCfg');
// Script/Base/Tabls/HotelRoomCfg.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HotelRoomCfg = /** @class */ (function () {
    function HotelRoomCfg(data) {
        this.id = null;
        this.roomId = null;
        this.slotId = null;
        this.slotName = null;
        this.prices = null;
        this.animationOpts = null;
        this.id = data.id;
        this.roomId = data.roomId;
        this.slotId = data.slotId;
        this.slotName = data.name;
        this._parsePrices(data.price);
        this._parseAnimationOpt(data.animation);
    }
    HotelRoomCfg.prototype._parseAnimationOpt = function (opt) {
        if (opt) {
            this.animationOpts = new Map();
            var opts = opt.split('|');
            for (var i = 1; i <= opts.length; i++) {
                this.animationOpts.set(i, !!Number(opts[i - 1]));
            }
        }
    };
    HotelRoomCfg.prototype._parsePrices = function (data) {
        if (!this.prices && data) {
            this.prices = [];
            for (var i = 0; i < data.length; i++) {
                var sd = data[i].split('|');
                if (sd[0]) {
                    this.prices.push({ id: i + 1, itemId: Number(sd[0]), num: Number(sd[1]), extData: Number(sd[2]) });
                }
            }
        }
    };
    return HotelRoomCfg;
}());
exports.default = HotelRoomCfg;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCYXNlXFxUYWJsc1xcSG90ZWxSb29tQ2ZnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBVUE7SUFTSSxzQkFBbUIsSUFBSTtRQVBQLE9BQUUsR0FBVyxJQUFJLENBQUM7UUFDbEIsV0FBTSxHQUFXLElBQUksQ0FBQztRQUN0QixXQUFNLEdBQVcsSUFBSSxDQUFDO1FBQ3RCLGFBQVEsR0FBVyxJQUFJLENBQUM7UUFDakMsV0FBTSxHQUFrQixJQUFJLENBQUE7UUFDNUIsa0JBQWEsR0FBeUIsSUFBSSxDQUFDO1FBRzlDLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzFCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUMxQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFTyx5Q0FBa0IsR0FBMUIsVUFBMkIsR0FBVztRQUNsQyxJQUFJLEdBQUcsRUFBRTtZQUNMLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUMvQixJQUFNLElBQUksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQzNCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNuQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNwRDtTQUNKO0lBQ0wsQ0FBQztJQUVPLG1DQUFZLEdBQXBCLFVBQXFCLElBQWM7UUFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1lBQ2pCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNsQyxJQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUM3QixJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDUCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztpQkFDdEc7YUFDSjtTQUNKO0lBQ0wsQ0FBQztJQUNMLG1CQUFDO0FBQUQsQ0F2Q0EsQUF1Q0MsSUFBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDb25maWdJdGVtIH0gZnJvbSBcIi4uLy4uL0xvZ2ljL0NvbW1vbi9Db21tb25JbnRlcmZhY2VzXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUhvdGVsUm9vbUNmZyB7XG4gICAgaWQ6IG51bWJlclxuICAgIHJvb21JZDogbnVtYmVyXG4gICAgc2xvdElkOiBudW1iZXJcbiAgICBwcmljZXM6IElDb25maWdJdGVtW11cbiAgICBzbG90TmFtZTogc3RyaW5nXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhvdGVsUm9vbUNmZyBpbXBsZW1lbnRzIElIb3RlbFJvb21DZmcge1xuXG4gICAgcHVibGljIHJlYWRvbmx5IGlkOiBudW1iZXIgPSBudWxsO1xuICAgIHB1YmxpYyByZWFkb25seSByb29tSWQ6IG51bWJlciA9IG51bGw7XG4gICAgcHVibGljIHJlYWRvbmx5IHNsb3RJZDogbnVtYmVyID0gbnVsbDtcbiAgICBwdWJsaWMgcmVhZG9ubHkgc2xvdE5hbWU6IHN0cmluZyA9IG51bGw7XG4gICAgcHVibGljIHByaWNlczogSUNvbmZpZ0l0ZW1bXSA9IG51bGxcbiAgICBwdWJsaWMgYW5pbWF0aW9uT3B0czogTWFwPG51bWJlciwgYm9vbGVhbj4gPSBudWxsO1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGRhdGEpIHtcbiAgICAgICAgdGhpcy5pZCA9IGRhdGEuaWQ7XG4gICAgICAgIHRoaXMucm9vbUlkID0gZGF0YS5yb29tSWQ7XG4gICAgICAgIHRoaXMuc2xvdElkID0gZGF0YS5zbG90SWQ7XG4gICAgICAgIHRoaXMuc2xvdE5hbWUgPSBkYXRhLm5hbWU7XG4gICAgICAgIHRoaXMuX3BhcnNlUHJpY2VzKGRhdGEucHJpY2UpO1xuICAgICAgICB0aGlzLl9wYXJzZUFuaW1hdGlvbk9wdChkYXRhLmFuaW1hdGlvbik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcGFyc2VBbmltYXRpb25PcHQob3B0OiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKG9wdCkge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25PcHRzID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgY29uc3Qgb3B0cyA9IG9wdC5zcGxpdCgnfCcpXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBvcHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb25PcHRzLnNldChpLCAhIU51bWJlcihvcHRzW2kgLSAxXSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcGFyc2VQcmljZXMoZGF0YTogc3RyaW5nW10pIHtcbiAgICAgICAgaWYgKCF0aGlzLnByaWNlcyAmJiBkYXRhKSB7XG4gICAgICAgICAgICB0aGlzLnByaWNlcyA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2QgPSBkYXRhW2ldLnNwbGl0KCd8JylcbiAgICAgICAgICAgICAgICBpZiAoc2RbMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmljZXMucHVzaCh7IGlkOiBpICsgMSwgaXRlbUlkOiBOdW1iZXIoc2RbMF0pLCBudW06IE51bWJlcihzZFsxXSksIGV4dERhdGE6IE51bWJlcihzZFsyXSkgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSJdfQ==