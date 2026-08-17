import EventMgr from "./Base/Manager/EventMgr";
import { HttpRequest } from "./Base/Network/HttpRequest";
import Scoket from "./Base/Network/Socket";
import { Event } from "./Logic/Data/Const/Event";
import { GameTableMgr } from "./Base/Manager/GameTableMgr";
import RuntimeMgr from "./Logic/Data/RuntimeMgr";
import { CurrencyId } from "./Base/BaseConst";
import Level from "./Logic/Data/Interface/Level";
const { ccclass, property } = cc._decorator;


@ccclass
export default class test extends cc.Component {

    async onLoad() {
        // this._initEvent();


        console.error('onload');


        const result = await Level.ins.getLvCfgData();
        console.error(result);

    }

    start() {

        // this._requestTest();
        // this._websocketTest();
        // this._testSound();
        this._testGetTable();
        this._testPlayerMgr();


        EventMgr.ins.register(Event.UI.UpdateCurrency, (type, count) => {

            console.error(type, count);

        }, this);

    }

    private async _testLoadLv() {
        const data = await Level.ins.getLvCfgData();
        console.error(data);

    }

    private _testPlayerMgr() {

    }

    private async _testGetTable() {

        await GameTableMgr.ins.execute();
        //test
        // Log.i('id1 表内容 : ', GameTableMgr.ins.testTable.getByPrimaryKey(1));
        // Log.i('多表内容 : ', GameTableMgr.ins.testTable.getByPrimaryKeys([2, 3]));
        // Log.i(GameTableMgr.ins.testTable.getData());
    }

    private _testSound() {
        this.scheduleOnce(() => {
            EventMgr.ins.send(Event.Sound.PlayBGM);
        }, 1)
    }

    private _initEvent() {

        EventMgr.ins.register('1', this.test1, this);
        EventMgr.ins.register('1', this.test2, this);

    }

    private ws: Scoket = null
    private async _websocketTest() {
        this.ws = new Scoket('ws://192.168.91.102:3001');
        await this.ws.connect();

        this.ws.send('hello ws');
    }

    public onCloseWS() {
        this.ws.disconnect();
    }

    private _requestTest() {
        const url = 'http://19.8.91.102:3000/';

        const req = new HttpRequest(url, HttpRequest.METHOD.GET);
        req.execute().then((result) => {
            console.warn(result);
        });

    }

    private test2() {
        console.warn('test2');
    }

    private test1() {
        console.warn('test1');
    }

    private test3() {
        console.warn('test3');
    }

    public onTouchTestBtn() {
        EventMgr.ins.send('1');
        EventMgr.ins.unRegister('1', this.test1, this);
    }

    public onTouchAddCoinOrDiamon(event, customStr) {
        let type = CurrencyId.Coin
        if (customStr == 1) {
            type = CurrencyId.Diamond
        }
        RuntimeMgr.ins.addCurrency(type, 100);

        this._testLoadLv();
    }
}
