import UIBase from "../UI/UIBase";
import UIData, { ViewZorder, UIHudDef } from "../../Logic/Data/Interface/UIData";
import { Log } from "../Utils/Log";
import { LRUCache } from "../Utils/LRUCache";
import EventMgr from "./EventMgr";
import { PlatformEvenType } from "../BaseConst";
import { Event } from "../../Logic/Data/Const/Event";


export default class UIMgr {
    private static instance: UIMgr;

    private uiMap: Map<UIHudDef, UIBase> = new Map<UIHudDef, UIBase>();

    private uiData: Map<UIHudDef, { prefabPath: string, viewZOrder: ViewZorder, hold?: boolean, tween?: boolean, blackBg?: boolean, autoClose?: boolean }> = UIData;

    private uiRoot: cc.Node;

    private blackBg: cc.Node;

    private prefabRoot = 'prefab/ui/';

    private isOpening = false;

    private lru: LRUCache = new LRUCache(5); //内存中存在的UI面板数的警告值

    public static get ins(): UIMgr {
        if (this.instance == null) {
            this.instance = new UIMgr();
        }
        return this.instance;
    }

    private constructor() {
        this.uiRoot = new cc.Node('UIRoot');

        this.uiRoot.x = cc.winSize.width / 2;
        this.uiRoot.y = cc.winSize.height / 2;
        this.uiRoot.width = cc.winSize.width;
        this.uiRoot.height = cc.winSize.height;

        cc.game.addPersistRootNode(this.uiRoot);

        const widget = this.uiRoot.addComponent(cc.Widget);
        widget.alignMode = cc.Widget.AlignMode.ALWAYS;
        widget.bottom = widget.top = widget.left = widget.right = 0;

        this.blackBg = new cc.Node('BlackBg');
        this.blackBg.active = false;
        this.blackBg.setContentSize(cc.winSize);
        let graphics = this.blackBg.addComponent(cc.Graphics);
        graphics.rect(-cc.winSize.width / 2, -cc.winSize.height / 2, 2 * cc.winSize.width, 2 * cc.winSize.height);
        graphics.fillColor = cc.color(0, 0, 0, 180);
        graphics.fill();
        this.uiRoot.addChild(this.blackBg);

        this.blackBg.addComponent(cc.BlockInputEvents);

        this.blackBg.on(cc.Node.EventType.TOUCH_END, (event: cc.Touch) => {
            this.uiMap.forEach((ui: UIBase, uiHudDef: UIHudDef) => {
                if (this.isShowing(uiHudDef)) {
                    if (!this.isOpening && !ui.node.getBoundingBoxToWorld().contains(event.getLocationInView())) {
                        this.blackBgOnClick(uiHudDef);
                    }
                }
            })
        });
        EventMgr.ins.register(Event.System.CacheWarning, this.closeOld, this);
        EventMgr.ins.register(PlatformEvenType.OnMemoryWarning, this.closeOld, this);
    }

    // 内存使用过多时关掉部分界面
    private closeOld() {
        if (this.lru.oldNode && !this.isShowing(this.lru.oldNode.key)) {
            let uiData = this.uiData.get(this.lru.oldNode.key);
            if (uiData && !uiData.hold) {
                // console.warn('Waring.. 收到内存警告!!!!! 但是我把他关了!');
                // this.closeUI(this.lru.oldNode.key, true);
            }
        }
    }

    private blackBgOnClick(type: UIHudDef) {
        const def = this.uiData.get(type);
        if (def && def.autoClose) {
            this.hideUI(type);
        }
    }

    public openUI(uiHudDef: UIHudDef, args?: any, callback?: Function, closeCallback?: Function) {
        this.isOpening = true;
        let uiData = this.uiData.get(uiHudDef);
        // console.error("openUI", uiHudDef);
        if (this.hasUI(uiHudDef)) {
            Log.error(`OpenUI 1: ui ${UIHudDef[uiHudDef]} is already exist, please check`);
            this.isOpening = false;
            return;
        }
        let path = this.prefabRoot + uiData.prefabPath;
        cc.loader.loadRes(path, (error: Error, prefab: cc.Prefab) => {
            if (error) {
                Log.error(`OpenUI: load ui error: ${error}`);
                this.isOpening = false;
                return;
            }
            if (this.hasUI(uiHudDef)) {
                Log.error(`OpenUI 2: ui ${UIHudDef[uiHudDef]} is already exist, please check`);
                this.isOpening = false;
                return;
            }

            let uiNode: cc.Node = cc.instantiate(prefab);
            let ui = uiNode.getComponent(UIBase);
            if (!ui) {
                Log.error(`${path}没有绑定UI脚本!!!`);
                this.isOpening = false;
                return;
            }
            ui.init(args);
            ui.uiHudDef = uiHudDef;
            uiNode.opacity = 0;
            uiNode.parent = this.uiRoot;
            uiNode.zIndex = uiData.viewZOrder;
            uiNode.active = true;
            this.show(ui, uiHudDef, closeCallback);

            this.uiMap.set(uiHudDef, ui);

            callback && callback(ui);

            let remove = this.lru.pack(uiHudDef, ui);
            if (remove && !this.isShowing(remove.key)) {
                this.closeUI(remove.key, true);
            }
        });
    }


    /**
     * 这里是个巨坑!  by tt .....  后期看需要怎么优化吧!
     * 清除依赖资源 
     * @param prefabUrl 
     */
    private clearDependsRes(prefabUrl) {
        let deps = cc.loader.getDependsRecursively(prefabUrl);
        // Log.log(`UIMng clearDependsRes: release ${prefabUrl} depends resources `, deps);
        deps.forEach((item) => {
            // todo：排除公共资源，然后清理
            // if (item.indexOf('common') === -1) {
            /**
             * 可能会出现资源遗失问题
            cc.loader.release(item);
             */
            // }
        });
    }

    public closeUI(uiHudDef: UIHudDef, release: boolean = false, callback: Function = null) {
        if (this.hasUI(uiHudDef)) {
            let ui: UIBase = this.uiMap.get(uiHudDef);
            if (cc.isValid(ui.node)) {
                this.uiMap.delete(uiHudDef);
                this.lru.remove(uiHudDef);
                this.hide(ui, uiHudDef, () => {
                    ui.node.destroy();
                    if (release) {
                        let uiData = this.uiData.get(uiHudDef);
                        this.clearDependsRes(this.prefabRoot + uiData.prefabPath);
                    }
                    callback && callback();
                });
            }
            return;
        }
    }

    public closeAllUI() {
        this.uiMap.forEach((ui: UIBase, uiHudDef: UIHudDef) => {
            this.closeUI(uiHudDef);
        })
    }

    public showUI(uiHudDef: UIHudDef, args?: any, callback?: Function, closeCB?: Function) {
        let ui = this.getUI(uiHudDef);
        if (!ui) {
            Log.warn(`showUI: ui ${UIHudDef[uiHudDef]} not exist`);
            this.openUI(uiHudDef, args, callback, closeCB);
            return;
        }
        ui.init(args);
        ui.isShow = true;
        ui.node.active = true;

        this.isOpening = true;

        this.show(ui, uiHudDef, closeCB);

        this.lru.get(uiHudDef);
        callback && callback(ui);
    }

    public hideUI(uiHudDef: UIHudDef, callback?: Function) {
        let ui = this.getUI(uiHudDef);
        if (ui) {
            ui.isShow = false;
            this.hide(ui, uiHudDef, () => {
                //条件控制,防止hide后立即调用显示回调隐藏弹框的BUG
                if (!ui.isShow) {
                    ui.node.active = false;
                    callback && callback();
                }
            });
        }
    }

    public getUI(uiHudDef: UIHudDef): UIBase {
        if (this.hasUI(uiHudDef)) {
            return this.uiMap.get(uiHudDef);
        }
        return null;
    }

    public hasUI(uiHudDef: UIHudDef): boolean {
        return this.uiMap.has(uiHudDef);
    }

    public isShowing(uiHudDef: UIHudDef) {
        let ui = this.getUI(uiHudDef);
        if (!ui) {
            return false;
        }
        return ui.node.active;
    }

    private show(ui: UIBase, uiHudDef: UIHudDef, closeCallBack: Function) {
        let uiData = this.uiData.get(uiHudDef);
        if ((uiData.blackBg == undefined || uiData.blackBg == true)/* && !this.blackBg.active*/) {
            // console.error("black show");
            this.blackBg.stopAllActions();
            this.blackBg.active = true;
            this.blackBg.opacity = 0;
            this.blackBg.zIndex = uiData.viewZOrder - 1;
            this.blackBg.runAction(cc.fadeIn(0.3));
        }

        if (uiData.tween == undefined || uiData.tween == true) {
            let tween = new gsap.TimelineLite();
            tween.set(ui.node, { scale: 0.5, opacity: 0 })
                .to(ui.node, 0.5, {
                    scale: 1, opacity: 255, ease: gsap.Back.easeInOut, onComplete: () => {
                        this.isOpening = false;
                        ui.onShow(closeCallBack);
                    }
                })
        } else {
            ui.node.opacity = 255;
            this.isOpening = false;
            ui.onShow(closeCallBack);
        }
    }

    private hide(ui: UIBase, uiHudDef: UIHudDef, callback: Function) {
        let uiData = this.uiData.get(uiHudDef);

        if (uiData.blackBg == undefined || uiData.blackBg == true) {
            const a0 = cc.fadeOut(0.1);
            const a1 = cc.callFunc(() => {
                this.blackBg.active = false;
            }, this)
            this.blackBg.runAction(cc.sequence(a0, a1));
        } else {
            this.blackBg.active = false;
        }

        if (uiData.tween == undefined || uiData.tween == true) {
            gsap.TweenLite.to(ui.node, 0.3, {
                scale: 0.5, opacity: 0, ease: gsap.Expo.easeOut, onComplete: callback
            })
        } else {
            ui.node.active = false;
            callback();
        }
    }
}