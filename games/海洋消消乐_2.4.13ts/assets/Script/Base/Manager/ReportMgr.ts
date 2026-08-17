import Paths from "../Utils/Paths";
import { Util } from "../Utils/Util";
import M from "./M";
import { HttpRequest } from "../Network/HttpRequest";
import Apps from "../Apps";
import { PropType } from "../../Logic/Data/Const/Constant";
import { PlatformType } from "../BaseConst";

export default class ReportMgr {

    private AppKey = '58c0179c656d13089697';
    private GameId = 550088;
    private Secret = 'a838d248cceb0fd45c61';

    private channelIds = ['', 'WE0S0N10001', 'SQ0S0N30101', 'TX0S0N00003', 'OP0S0N02002', 'BG0S0N00002', 'YQ0S0N00003', 'ZC0S0N00000'];


    private publicHeader = { 'Content-Type': 'application/x-www-form-urlencoded' };

    public static instance: ReportMgr = null;

    public static get ins(): ReportMgr {
        if (this.instance == null) {
            this.instance = new ReportMgr();
        }
        return this.instance;
    }

    public login() {
        const userid = M.runtime.getUserId();
        const userinfo = M.platform.getUserInfo();
        const data = `sgame_login|${Util.Timer.dateFtt('yyyy-MM-dd hh:mm:ss', new Date())}|${this.AppKey}|${M.device.isAndroid}|${userid}|${Apps.Version}|${this.channelIds[M.platform.type - 100]}|${JSON.stringify(userinfo)}`
        if (M.platform.type == PlatformType.Web) {
            console.warn(data);
        } else {
            const req = new HttpRequest(Paths.ReportHost, HttpRequest.METHOD.POST, this.publicHeader, data);
            req.execute().then((result) => {
                console.log('report login :', data, '\n', 'result:', result);
            });
        }
    }

    public reportPoint(eventId: string, reportData: string) {
        const userid = M.runtime.getUserId();
        const data = `sgame_event|${Util.Timer.dateFtt('yyyy-MM-dd hh:mm:ss', new Date())}|${this.AppKey}|${M.device.isAndroid}|${userid}|${Apps.Version}|${this.channelIds[M.platform.type - 100]}|${eventId}|${reportData}`
        if (M.platform.type == PlatformType.Web) {
            console.warn(data);
        } else {
            const req = new HttpRequest(Paths.ReportHost, HttpRequest.METHOD.POST, this.publicHeader, data);
            req.execute().then((result) => {
                console.log('report point :', data, '\n', 'result:', result);
            });
        }
    }

    /** 
     * @param lv 关卡
     * @param result 结果
     * @param stepCount 步数
     * @param buyPorpAry 
     */
    public reportMatchOver(lv: number, result: boolean, stepCount: number, tiemCount: number/*, buyPorpAry: Array<{ [type: number]: number }>*/) {
        let str = stepCount + ',' + tiemCount;
        // if (buyPorpAry) {
        //     buyPorpAry.forEach(item => {
        //         for (const key in item) {
        //             str += (key + ',' + item[key] + ',')
        //         }
        //     });
        // }
        this.reportPoint('stage', `${lv}|${result ? 1 : 0}|${str}`)
    }


    public reportBuyProp(type: PropType, count: number, lv: number) {
        this.reportPoint('prop', `${type}|${count}|${lv}`);
    }

    //新手引导的数据上报
    public reportTutorial(eventParam: string) {
        this.reportPoint('tutorial', eventParam);
    }

    //装扮购买解锁上报
    public reportDecorate(eventParam: string) {
        this.reportPoint('decorate', eventParam);
    }
}