
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Base/Manager/ReportMgr.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3c3bbM36pBKobxS/m0dDP75', 'ReportMgr');
// Script/Base/Manager/ReportMgr.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Paths_1 = require("../Utils/Paths");
var Util_1 = require("../Utils/Util");
var M_1 = require("./M");
var HttpRequest_1 = require("../Network/HttpRequest");
var Apps_1 = require("../Apps");
var BaseConst_1 = require("../BaseConst");
var ReportMgr = /** @class */ (function () {
    function ReportMgr() {
        this.AppKey = '58c0179c656d13089697';
        this.GameId = 550088;
        this.Secret = 'a838d248cceb0fd45c61';
        this.channelIds = ['', 'WE0S0N10001', 'SQ0S0N30101', 'TX0S0N00003', 'OP0S0N02002', 'BG0S0N00002', 'YQ0S0N00003', 'ZC0S0N00000'];
        this.publicHeader = { 'Content-Type': 'application/x-www-form-urlencoded' };
    }
    Object.defineProperty(ReportMgr, "ins", {
        get: function () {
            if (this.instance == null) {
                this.instance = new ReportMgr();
            }
            return this.instance;
        },
        enumerable: false,
        configurable: true
    });
    ReportMgr.prototype.login = function () {
        var userid = M_1.default.runtime.getUserId();
        var userinfo = M_1.default.platform.getUserInfo();
        var data = "sgame_login|" + Util_1.Util.Timer.dateFtt('yyyy-MM-dd hh:mm:ss', new Date()) + "|" + this.AppKey + "|" + M_1.default.device.isAndroid + "|" + userid + "|" + Apps_1.default.Version + "|" + this.channelIds[M_1.default.platform.type - 100] + "|" + JSON.stringify(userinfo);
        if (M_1.default.platform.type == BaseConst_1.PlatformType.Web) {
            console.warn(data);
        }
        else {
            var req = new HttpRequest_1.HttpRequest(Paths_1.default.ReportHost, HttpRequest_1.HttpRequest.METHOD.POST, this.publicHeader, data);
            req.execute().then(function (result) {
                console.log('report login :', data, '\n', 'result:', result);
            });
        }
    };
    ReportMgr.prototype.reportPoint = function (eventId, reportData) {
        var userid = M_1.default.runtime.getUserId();
        var data = "sgame_event|" + Util_1.Util.Timer.dateFtt('yyyy-MM-dd hh:mm:ss', new Date()) + "|" + this.AppKey + "|" + M_1.default.device.isAndroid + "|" + userid + "|" + Apps_1.default.Version + "|" + this.channelIds[M_1.default.platform.type - 100] + "|" + eventId + "|" + reportData;
        if (M_1.default.platform.type == BaseConst_1.PlatformType.Web) {
            console.warn(data);
        }
        else {
            var req = new HttpRequest_1.HttpRequest(Paths_1.default.ReportHost, HttpRequest_1.HttpRequest.METHOD.POST, this.publicHeader, data);
            req.execute().then(function (result) {
                console.log('report point :', data, '\n', 'result:', result);
            });
        }
    };
    /**
     * @param lv 关卡
     * @param result 结果
     * @param stepCount 步数
     * @param buyPorpAry
     */
    ReportMgr.prototype.reportMatchOver = function (lv, result, stepCount, tiemCount /*, buyPorpAry: Array<{ [type: number]: number }>*/) {
        var str = stepCount + ',' + tiemCount;
        // if (buyPorpAry) {
        //     buyPorpAry.forEach(item => {
        //         for (const key in item) {
        //             str += (key + ',' + item[key] + ',')
        //         }
        //     });
        // }
        this.reportPoint('stage', lv + "|" + (result ? 1 : 0) + "|" + str);
    };
    ReportMgr.prototype.reportBuyProp = function (type, count, lv) {
        this.reportPoint('prop', type + "|" + count + "|" + lv);
    };
    //新手引导的数据上报
    ReportMgr.prototype.reportTutorial = function (eventParam) {
        this.reportPoint('tutorial', eventParam);
    };
    //装扮购买解锁上报
    ReportMgr.prototype.reportDecorate = function (eventParam) {
        this.reportPoint('decorate', eventParam);
    };
    ReportMgr.instance = null;
    return ReportMgr;
}());
exports.default = ReportMgr;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCYXNlXFxNYW5hZ2VyXFxSZXBvcnRNZ3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3Q0FBbUM7QUFDbkMsc0NBQXFDO0FBQ3JDLHlCQUFvQjtBQUNwQixzREFBcUQ7QUFDckQsZ0NBQTJCO0FBRTNCLDBDQUE0QztBQUU1QztJQUFBO1FBRVksV0FBTSxHQUFHLHNCQUFzQixDQUFDO1FBQ2hDLFdBQU0sR0FBRyxNQUFNLENBQUM7UUFDaEIsV0FBTSxHQUFHLHNCQUFzQixDQUFDO1FBRWhDLGVBQVUsR0FBRyxDQUFDLEVBQUUsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUczSCxpQkFBWSxHQUFHLEVBQUUsY0FBYyxFQUFFLG1DQUFtQyxFQUFFLENBQUM7SUFzRW5GLENBQUM7SUFsRUcsc0JBQWtCLGdCQUFHO2FBQXJCO1lBQ0ksSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksRUFBRTtnQkFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO2FBQ25DO1lBQ0QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3pCLENBQUM7OztPQUFBO0lBRU0seUJBQUssR0FBWjtRQUNJLElBQU0sTUFBTSxHQUFHLFdBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDckMsSUFBTSxRQUFRLEdBQUcsV0FBQyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMxQyxJQUFNLElBQUksR0FBRyxpQkFBZSxXQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDLFNBQUksSUFBSSxDQUFDLE1BQU0sU0FBSSxXQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsU0FBSSxNQUFNLFNBQUksY0FBSSxD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QUksQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCxVQUFVO0lBQ0gsa0NBQWMsR0FBckIsVUFBc0IsVUFBa0I7UUFDcEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQW5FYSxrQkFBUSxHQUFjLElBQUksQ0FBQztJQW9FN0MsZ0JBQUM7Q0EvRUQsQUErRUMsSUFBQTtrQkEvRW9CLFNBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGF0aHMgZnJvbSBcIi4uL1V0aWxzL1BhdGhzXCI7XG5pbXBvcnQgeyBVdGlsIH0gZnJvbSBcIi4uL1V0aWxzL1V0aWxcIjtcbmltcG9ydCBNIGZyb20gXCIuL01cIjtcbmltcG9ydCB7IEh0dHBSZXF1ZXN0IH0gZnJvbSBcIi4uL05ldHdvcmsvSHR0cFJlcXVlc3RcIjtcbmltcG9ydCBBcHBzIGZyb20gXCIuLi9BcHBzXCI7XG5pbXBvcnQgeyBQcm9wVHlwZSB9IGZyb20gXCIuLi8uLi9Mb2dpYy9EYXRhL0NvbnN0L0NvbnN0YW50XCI7XG5pbXBvcnQgeyBQbGF0Zm9ybVR5cGUgfSBmcm9tIFwiLi4vQmFzZUNvbnN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlcG9ydE1nciB7XG5cbiAgICBwcml2YXRlIEFwcEtleSA9ICc1OGMwMTc5YzY1NmQxMzA4OTY5Nyc7XG4gICAgcHJpdmF0ZSBHYW1lSWQgPSA1NTAwODg7XG4gICAgcHJpdmF0ZSBTZWNyZXQgPSAnYTgzOGQyNDhjY2ViMGZkNDVjNjEnO1xuXG4gICAgcHJpdmF0ZSBjaGFubmVsSWRzID0gWycnLCAnV0UwUzBOMTAwMDEnLCAnU1EwUzBOMzAxMDEnLCAnVFgwUzBOMDAwMDMnLCAnT1AwUzBOMDIwMDInLCAnQkcwUzBOMDAwMDInLCAnWVEwUzBOMDAwMDMnLCAnWkMwUzBOMDAwMDAnXTtcblxuXG4gICAgcHJpdmF0ZSBwdWJsaWNIZWFkZXIgPSB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyB9O1xuXG4gICAgcHVibGljIHN0YXRpYyBpbnN0YW5jZTogUmVwb3J0TWdyID0gbnVsbDtcblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IGlucygpOiBSZXBvcnRNZ3Ige1xuICAgICAgICBpZiAodGhpcy5pbnN0YW5jZSA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlID0gbmV3IFJlcG9ydE1ncigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBsb2dpbigpIHtcbiAgICAgICAgY29uc3QgdXNlcmlkID0gTS5ydW50aW1lLmdldFVzZXJJZCgpO1xuICAgICAgICBjb25zdCB1c2VyaW5mbyA9IE0ucGxhdGZvcm0uZ2V0VXNlckluZm8oKTtcbiAgICAgICAgY29uc3QgZGF0YSA9IGBzZ2FtZV9sb2dpbnwke1V0aWwuVGltZXIuZGF0ZUZ0dCgneXl5eS1NTS1kZCBoaDptbTpzcycsIG5ldyBEYXRlKCkpfXwke3RoaXMuQXBwS2V5fXwke00uZGV2aWNlLmlzQW5kcm9pZH18JHt1c2VyaWR9fCR7QXBwcy5WZXJzaW9ufXwke3RoaXMuY2hhbm5lbElkc1tNLnBsYXRmb3JtLnR5cGUgLSAxMDBdfXwke0pTT04uc3RyaW5naWZ5KHVzZXJpbmZvKX1gXG4gICAgICAgIGlmIChNLnBsYXRmb3JtLnR5cGUgPT0gUGxhdGZvcm1UeXBlLldlYikge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGRhdGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgcmVxID0gbmV3IEh0dHBSZXF1ZXN0KFBhdGhzLlJlcG9ydEhvc3QsIEh0dHBSZXF1ZXN0Lk1FVEhPRC5QT1NULCB0aGlzLnB1YmxpY0hlYWRlciwgZGF0YSk7XG4gICAgICAgICAgICByZXEuZXhlY3V0ZSgpLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZXBvcnQgbG9naW4gOicsIGRhdGEsICdcXG4nLCAncmVzdWx0OicsIHJlc3VsdCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyByZXBvcnRQb2ludChldmVudElkOiBzdHJpbmcsIHJlcG9ydERhdGE6IHN0cmluZykge1xuICAgICAgICBjb25zdCB1c2VyaWQgPSBNLnJ1bnRpbWUuZ2V0VXNlcklkKCk7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBgc2dhbWVfZXZlbnR8JHtVdGlsLlRpbWVyLmRhdGVGdHQoJ3l5eXktTU0tZGQgaGg6bW06c3MnLCBuZXcgRGF0ZSgpKX18JHt0aGlzLkFwcEtleX18JHtNLmRldmljZS5pc0FuZHJvaWR9fCR7dXNlcmlkfXwke0FwcHMuVmVyc2lvbn18JHt0aGlzLmNoYW5uZWxJZHNbTS5wbGF0Zm9ybS50eXBlIC0gMTAwXX18JHtldmVudElkfXwke3JlcG9ydERhdGF9YFxuICAgICAgICBpZiAoTS5wbGF0Zm9ybS50eXBlID09IFBsYXRmb3JtVHlwZS5XZWIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihkYXRhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHJlcSA9IG5ldyBIdHRwUmVxdWVzdChQYXRocy5SZXBvcnRIb3N0LCBIdHRwUmVxdWVzdC5NRVRIT0QuUE9TVCwgdGhpcy5wdWJsaWNIZWFkZXIsIGRhdGEpO1xuICAgICAgICAgICAgcmVxLmV4ZWN1dGUoKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncmVwb3J0IHBvaW50IDonLCBkYXRhLCAnXFxuJywgJ3Jlc3VsdDonLCByZXN1bHQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogXG4gICAgICogQHBhcmFtIGx2IOWFs+WNoVxuICAgICAqIEBwYXJhbSByZXN1bHQg57uT5p6cXG4gICAgICogQHBhcmFtIHN0ZXBDb3VudCDmraXmlbBcbiAgICAgKiBAcGFyYW0gYnV5UG9ycEFyeSBcbiAgICAgKi9cbiAgICBwdWJsaWMgcmVwb3J0TWF0Y2hPdmVyKGx2OiBudW1iZXIsIHJlc3VsdDogYm9vbGVhbiwgc3RlcENvdW50OiBudW1iZXIsIHRpZW1Db3VudDogbnVtYmVyLyosIGJ1eVBvcnBBcnk6IEFycmF5PHsgW3R5cGU6IG51bWJlcl06IG51bWJlciB9PiovKSB7XG4gICAgICAgIGxldCBzdHIgPSBzdGVwQ291bnQgKyAnLCcgKyB0aWVtQ291bnQ7XG4gICAgICAgIC8vIGlmIChidXlQb3JwQXJ5KSB7XG4gICAgICAgIC8vICAgICBidXlQb3JwQXJ5LmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIC8vICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gaXRlbSkge1xuICAgICAgICAvLyAgICAgICAgICAgICBzdHIgKz0gKGtleSArICcsJyArIGl0ZW1ba2V5XSArICcsJylcbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICB9KTtcbiAgICAgICAgLy8gfVxuICAgICAgICB0aGlzLnJlcG9ydFBvaW50KCdzdGFnZScsIGAke2x2fXwke3Jlc3VsdCA/IDEgOiAwfXwke3N0cn1gKVxuICAgIH1cblxuXG4gICAgcHVibGljIHJlcG9ydEJ1eVByb3AodHlwZTogUHJvcFR5cGUsIGNvdW50OiBudW1iZXIsIGx2OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5yZXBvcnRQb2ludCgncHJvcCcsIGAke3R5cGV9fCR7Y291bnR9fCR7bHZ9YCk7XG4gICAgfVxuXG4gICAgLy/mlrDmiYvlvJXlr7znmoTmlbDmja7kuIrmiqVcbiAgICBwdWJsaWMgcmVwb3J0VHV0b3JpYWwoZXZlbnRQYXJhbTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMucmVwb3J0UG9pbnQoJ3R1dG9yaWFsJywgZXZlbnRQYXJhbSk7XG4gICAgfVxuXG4gICAgLy/oo4Xmia7otK3kubDop6PplIHkuIrmiqVcbiAgICBwdWJsaWMgcmVwb3J0RGVjb3JhdGUoZXZlbnRQYXJhbTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMucmVwb3J0UG9pbnQoJ2RlY29yYXRlJywgZXZlbnRQYXJhbSk7XG4gICAgfVxufSJdfQ==