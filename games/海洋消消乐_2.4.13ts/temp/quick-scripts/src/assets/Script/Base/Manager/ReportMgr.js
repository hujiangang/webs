"use strict";
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