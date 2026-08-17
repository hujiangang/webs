import PlatformMgr from "./PlatformMgr";
import { SingletonFactory } from "../Utils/SingletonFactory";


export default class DeviceMgr {

    public static ins: DeviceMgr = SingletonFactory.getInstance(DeviceMgr);

    /**获取设备型号! */
    public getDeviceModel() {
        const systemInfo = PlatformMgr.ins.getSystemInfoSync();
        if (!systemInfo || !systemInfo['system']) {
            return null;
        }
        if (systemInfo['system'].indexOf("Android") >= 0) {
            return "Android";
        } else if (systemInfo['model'].indexOf("iPhone X") >= 0 || systemInfo['model'].indexOf("unknow") >= 0) {
            return "ipX";
        } else {
            return "iphone";
        }
    }

    public get isAndroid() {
        if (cc.sys.platform == cc.sys.ANDROID) {
            return 1;
        }
        return 0;
    }
}