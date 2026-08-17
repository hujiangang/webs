import Apps from "../Apps";

// 个人开关，只对log方法有效
export const LOG_TAG = {
    SOCKET: { desc: 'LOG_SOCKET', isOpen: true },
    TEST: { desc: 'LOG_TEST', isOpen: false },
    CACHE: { desc: 'LOG_CACHE', isOpen: false },
    GUIDE: { desc: 'LOG_GUIDE', isOpen: true }
}

enum LEVEL { DEBUG, INFO, WARN, ERROR };

const CURRENT_LEVEL = LEVEL.DEBUG
const TARGET_TAG = 'SOE => ';

const ShowStackAndTime = false;

export class Log {

    public static d(msg: string | any, ...subst: any[]) {
        (CURRENT_LEVEL < LEVEL.INFO && Apps.isDebug) && console.log(TARGET_TAG, msg, ...subst);
    }

    public static i(msg: string | any, ...subst: any[]) {
        (CURRENT_LEVEL < LEVEL.WARN && Apps.isDebug) && console.log(TARGET_TAG, msg, ...subst);
    }

    public static w(msg: string | any, ...subst: any[]) {
        (CURRENT_LEVEL < LEVEL.ERROR && Apps.isDebug) && console.warn(TARGET_TAG, msg, ...subst);
    }

    public static e(msg: string | any, ...subst: any[]) {
        Apps.isDebug && console.error(TARGET_TAG, msg, ...subst);
    }

    public static log(tag, ...args) {
        var backLog = console.log || cc.log
        if (!tag || !tag.isOpen) {
            return;
        }
        let arr: Array<any> = Array.prototype.slice.call(arguments);
        arr.splice(0, 1, `[${tag.desc}]`);
        this.addStackAndTime(arr);
        backLog.apply(backLog, arr);
    }

    public static warn(...args) {
        var backLog = console.warn || cc.warn
        let arr: Array<any> = Array.prototype.slice.call(arguments);
        this.addStackAndTime(arr);
        backLog.apply(backLog, arr);
    }

    public static error(...args) {
        var backLog = console.error || cc.error
        let arr: Array<any> = Array.prototype.slice.call(arguments);
        this.addStackAndTime(arr);
        backLog.apply(backLog, arr);
    }

    private static addStackAndTime(arr) {
        if (ShowStackAndTime) {
            let info = Log.stack(2) + Log.getDateString() + " ";
            arr.splice(0, 0, info);
        }
    }

    private static getDateString(): string {
        let d = new Date();
        let str = d.getHours().toString();
        let timeStr = "";
        timeStr += (str.length == 1 ? "0" + str : str) + ":";
        str = d.getMinutes().toString();
        timeStr += (str.length == 1 ? "0" + str : str) + ":";
        str = d.getSeconds().toString();
        timeStr += (str.length == 1 ? "0" + str : str) + ":";
        str = d.getMilliseconds().toString();
        if (str.length == 1) str = "00" + str;
        if (str.length == 2) str = "0" + str;
        timeStr += str;

        timeStr = "[" + timeStr + "]";
        return timeStr;
    }

    private static stack(index = 2): string {
        var e = new Error();
        var lines = e.stack.split("\n");
        lines.shift();
        var result = [];
        lines.forEach(function (line) {
            line = line.substring(7);
            var lineBreak = line.split(" ");
            if (lineBreak.length < 2) {
                result.push(lineBreak[0]);
            } else {
                result.push({ [lineBreak[0]]: lineBreak[1] });
            }
        });

        var list = [];
        if (index < result.length - 1) {
            for (var a in result[index]) {
                list.push(a);
            }
        }

        var splitList = list[0].split(".");
        return (splitList[0] + ".js->" + splitList[1] + ":");
    }
}