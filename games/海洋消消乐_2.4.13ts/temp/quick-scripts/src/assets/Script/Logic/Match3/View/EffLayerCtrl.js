"use strict";
cc._RF.push(module, '98a33qumQtJkZvEl7frOI0a', 'EffLayerCtrl');
// Script/Logic/Match3/View/EffLayerCtrl.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var SpinePlayerCtrl_1 = require("../../../Base/CustomComponent/SpinePlayerCtrl");
var M_1 = require("../../../Base/Manager/M");
var Constant_1 = require("../../Data/Const/Constant");
var Event_1 = require("../../Data/Const/Event");
var TimeConfig_1 = require("../../Data/Const/TimeConfig");
var Common_1 = require("../../Common/Common");
var AudioCtrl_1 = require("../../Common/AudioCtrl");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var EffLayerCtrl = /** @class */ (function (_super) {
    __extends(EffLayerCtrl, _super);
    function EffLayerCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bombEffPrefab = null;
        _this.littleBombPrefab = null;
        _this.mergeBombPrefab = null;
        _this.comboPrefab = null;
        _this.rowColBombPrefab = null;
        _this.fishBombPrefab = null;
        _this.rainbowBombPrefab = null;
        _this.shootStarPrefab = null;
        _this.haimaShootOverEff = null;
        _this.zyJumpPrefab = null;
        _this.zyJumpOverPrefab = null;
        _this.zyJumpElimatePrefab = null;
        _this.brokenPrefab = null;
        _this.LeavesBrokenPrefab = null;
        _this.boxBrokenPrefab = null;
        _this.overShootPrefab = null;
        _this.addScorePrefab = null;
        _this.addScoreOverPrefab = null;
        _this.dotPrefab = null;
        _this.bombAndBombPrefab = null;
        _this.haimaAndHetuanPrefab = null;
        _this.haimaAndHaimaPrefab = null;
        _this.zhangyuAndJianyu = null; //章鱼+剑鱼，章鱼+气泡鱼
        _this.hetuanAndJianyu = null; //气泡鱼+剑鱼，剑鱼+剑鱼
        _this.chuizi = null; //锤子
        _this.bombAndFishPrefab = null;
        _this.haimaAndZhangyuPrefab = null;
        _this._tmpShootStar = [];
        _this._tmpShootOver = [];
        return _this;
    }
    EffLayerCtrl_1 = EffLayerCtrl;
    EffLayerCtrl.prototype.onLoad = function () {
        EffLayerCtrl_1.ins = this;
        this.registerEvent();
        this._preLoadNodePool();
        this.node.zIndex = 100;
    };
    EffLayerCtrl.prototype.onDestroy = function () {
        this.removeEvent();
        M_1.default.nodePool.destory();
    };
    EffLayerCtrl.prototype._preLoadNodePool = function () {
        //这里可以做精细化加载.....
        // console.error(Date.now());
        var now = Date.now();
        M_1.default.nodePool.create(Constant_1.NodePoolKey.HaimaAndZhangyu, this.haimaAndZhangyuPrefab, 5);
        //console.error(Date.now() - now);
        M_1.default.nodePool.create(Constant_1.NodePoolKey.BombAndFish, this.bombAndFishPrefab, 5);
        // console.error(Date.now() - now);
        M_1.default.nodePool.create(Constant_1.NodePoolKey.BombAndBomb, this.bombAndBombPrefab, 5);
        //console.error(Date.now() - now);
        M_1.default.nodePool.create(Constant_1.NodePoolKey.MergeBomb, this.mergeBombPrefab, 20);
        //console.error(Date.now() - now);
        M_1.default.nodePool.create(Constant_1.NodePoolKey.LittleBomb, this.littleBombPrefab, 50);
        // console.error(Date.now() - now);
        M_1.default.nodePool.create(Constant_1.NodePoolKey.Broken, this.brokenPrefab, 50);
        // console.error(Date.now() - now);
        M_1.default.nodePool.create(Constant_1.NodePoolKey.LeafBroken, this.LeavesBrokenPrefab, 20);
        //console.error(Date.now() - now);
        M_1.default.nodePool.create(Constant_1.NodePoolKey.BombEff, this.bombEffPrefab, 20);
        //console.error(Date.now() - now);
        M_1.default.nodePool.create(Constant_1.NodePoolKey.RowColEff, this.rowColBombPrefab, 20);
        //console.error(Date.now() - now);
        M_1.default.nodePool.create(Constant_1.NodePoolKey.ZyJumpElimate, this.zyJumpElimatePrefab, 20);
        //console.error(Date.now() - now);
        M_1.default.nodePool.create(Constant_1.NodePoolKey.ZyJumpOver, this.zyJumpOverPrefab, 20);
        // console.error(Date.now() - now);
        M_1.default.nodePool.create(Constant_1.NodePoolKey.HaiMaOver, this.haimaShootOverEff, 20);
        // console.error(Date.now() - now);
        M_1.default.nodePool.create(Constant_1.NodePoolKey.AddScoreOverEff, this.addScoreOverPrefab, 20);
        // console.error(Date.now() - now);
        M_1.default.nodePool.create(Constant_1.NodePoolKey.AddScoreEff, this.addScorePrefab, 50);
        //console.error(Date.now() - now);
    };
    EffLayerCtrl.prototype.registerEvent = function () {
        M_1.default.event.register(Event_1.Event.Effect.LittleBomb, this.playLittleBomb, this);
        M_1.default.event.register(Event_1.Event.Effect.SpeedLine, this.playSpeedLine, this);
        M_1.default.event.register(Event_1.Event.Effect.ShootStar, this.onShootStar, this);
        M_1.default.event.register(Event_1.Event.Effect.OverShoot, this.overShoot, this);
        M_1.default.event.register(Event_1.Event.Effect.Combo, this.playComboEff, this);
        M_1.default.event.register(Event_1.Event.Effect.Broken, this.playBrokenEff, this);
        M_1.default.event.register(Event_1.Event.Effect.CollectOver, this.normalCollectOverEff, this);
        M_1.default.event.register(Event_1.Event.Effect.AddScore, this.playAddScoreEff, this);
        // M.event.register(Event.Effect.ShowDot, this.onShowDot, this);
    };
    EffLayerCtrl.prototype.removeEvent = function () {
        M_1.default.event.unRegister(Event_1.Event.Effect.LittleBomb, this.playLittleBomb, this);
        M_1.default.event.unRegister(Event_1.Event.Effect.SpeedLine, this.playSpeedLine, this);
        M_1.default.event.unRegister(Event_1.Event.Effect.OverShoot, this.overShoot, this);
        M_1.default.event.unRegister(Event_1.Event.Effect.ShootStar, this.onShootStar, this);
        M_1.default.event.unRegister(Event_1.Event.Effect.Combo, this.playComboEff, this);
        M_1.default.event.unRegister(Event_1.Event.Effect.Broken, this.playBrokenEff, this);
        M_1.default.event.unRegister(Event_1.Event.Effect.AddScore, this.playAddScoreEff, this);
        M_1.default.event.unRegister(Event_1.Event.Effect.CollectOver, this.normalCollectOverEff, this);
        // M.event.unRegister(Event.Effect.ShowDot, this.onShowDot, this);
    };
    EffLayerCtrl.prototype.playComboEff = function (level) {
        var name = Constant_1.ComboLevel[level];
        if (name) {
            var comboNode = M_1.default.nodePool.getItem(Constant_1.NodePoolKey.ComboEff, this.comboPrefab);
            comboNode.parent = this.node;
            var animation = comboNode.getComponent(cc.Animation);
            animation.play(name);
            animation.on('finished', this.effCompleted.bind(this, Constant_1.NodePoolKey.ComboEff, animation, comboNode), this);
        }
    };
    // private onShowDot(type: ElimateType, startPoint: cc.Vec2) {
    //     let count = Util.Tool.rangeInt(2, 5);
    //     for (let i = count; i--;) {
    //         const dotNode = M.nodePool.getItem(NodePoolKey.Dot, this.dotPrefab);
    //         dotNode.parent = this.node;
    //         dotNode.setScale(Util.Tool.rangeInt(3, 7) / 10);
    //         dotNode.setPosition(this.node.convertToNodeSpaceAR(startPoint));
    //         const targetPos = this.node.convertToNodeSpaceAR(Common.getWorldPos(this.scoreBar.node)) as cc.Vec2;
    //         let moveTime = dotNode.position.sub(targetPos).mag() * (Util.Tool.rangeInt(10, 20) / 10000);
    //         const a0 = cc.moveTo(moveTime, targetPos);
    //         const a1 = cc.callFunc(() => {
    //             M.nodePool.freeItem(NodePoolKey.Dot, dotNode);
    //         })
    //         dotNode.runAction(cc.sequence(a0, a1));
    //         if (type != ElimateType.Default) {
    //             M.event.send(Event.UI.AddScore, ScoreConfig.SingleElimate[type], startPoint)
    //         }
    //     }
    // }
    EffLayerCtrl.prototype.effCompleted = function (key, anim, comboNode) {
        anim.off('finished', this.effCompleted, this);
        M_1.default.nodePool.freeItem(key, comboNode);
    };
    EffLayerCtrl.prototype.playAddScoreEff = function (score, pos, isOver) {
        if (isOver === void 0) { isOver = false; }
        var node = null;
        if (isOver) {
            // pos = this.node.convertToNodeSpaceAR(pos) as cc.Vec2;
            node = M_1.default.nodePool.getItem(Constant_1.NodePoolKey.AddScoreOverEff, this.addScoreOverPrefab);
        }
        else {
            pos = this.node.convertToNodeSpaceAR(pos);
            pos = pos.add(cc.v2(-Common_1.default.GRID_W / 4, Common_1.default.GRID_H / 2));
            node = M_1.default.nodePool.getItem(Constant_1.NodePoolKey.AddScoreEff, this.addScorePrefab);
        }
        node.parent = this.node;
        node.opacity = 255;
        node.setAnchorPoint(cc.v2(1, 0));
        node.setPosition(pos);
        if (isOver) {
            node.getChildByName('score').getComponent(cc.Label).string = score.toString();
            var animation = node.getComponent(cc.Animation);
            animation.play();
            // animation.on('finished', this.effCompleted.bind(this, NodePoolKey.AddScoreEffOver, animation, node), this);
            var a1 = cc.delayTime(0.5);
            var a2 = cc.fadeOut(0.5);
            var a3 = cc.callFunc(function () {
                M_1.default.nodePool.freeItem(Constant_1.NodePoolKey.AddScoreOverEff, node);
            });
            node.runAction(cc.sequence(a1, a2, a3));
        }
        else {
            node.getComponent(cc.Label).string = score.toString();
            var a1 = cc.scaleTo(0.2, 1.2);
            var a2 = cc.scaleTo(0.2, 1);
            var a3 = cc.moveBy(0.3, cc.v2(0, 30));
            var a4 = cc.fadeOut(0.2);
            var a5 = cc.callFunc(function () {
                M_1.default.nodePool.freeItem(Constant_1.NodePoolKey.AddScoreEff, node);
            });
            node.runAction(cc.sequence(a1, a2, a3, a4, a5));
        }
    };
    EffLayerCtrl.prototype.playZyJump = function (startPos, targetPos, callback, conveType) {
        var _this = this;
        startPos = this.node.convertToNodeSpaceAR(startPos);
        targetPos = this.node.convertToNodeSpaceAR(targetPos);
        this.scheduleOnce(function () {
            _this.playZyJumpEliamteEff(startPos);
            M_1.default.event.send(Event_1.Event.Sound.PlaySoundEff, AudioCtrl_1.AudioID.Octopus);
        }, 0);
        var eff = this.createSpineNode(Constant_1.NodePoolKey.ZyJump, this.zyJumpPrefab, startPos);
        var animName = "zhangyu_tiao";
        if (conveType == Constant_1.CellType.Bomb2) {
            //章鱼+剑鱼
            animName = "zhangyu_tiao_jianyu";
        }
        else if (conveType == Constant_1.CellType.Bomb1) {
            //章鱼+气泡鱼
            animName = "zhangyu_tiao_hetun";
        }
        eff.ctrl.play(animName, 0, false, function () { });
        var tmpx = Math.abs(Math.abs(startPos.x) - Math.abs(targetPos.x)) / 2;
        var tmpy = (startPos.y > targetPos.y ? startPos.y : targetPos.y) + 400;
        var centerPos = cc.v2(startPos.x > targetPos.x ? -tmpx : tmpx, tmpy);
        var a0 = cc.delayTime(0.2);
        var a1 = cc.bezierTo(TimeConfig_1.GapTime.OctopusJumpSpeed, [startPos, centerPos, targetPos]);
        var a2 = cc.callFunc(function () {
            M_1.default.nodePool.freeItem(Constant_1.NodePoolKey.ZyJump, eff.node);
            var bomb = _this.createSpineNode(Constant_1.NodePoolKey.ZyJumpOver, _this.zyJumpOverPrefab, targetPos);
            bomb.ctrl.play('FX_zhangyu_xiaochu', 0, false, function () {
                M_1.default.nodePool.freeItem(Constant_1.NodePoolKey.ZyJumpOver, bomb.node);
            });
            callback && callback();
        }, this);
        eff.node.runAction(cc.sequence(a0, a1, a2));
    };
    EffLayerCtrl.prototype.playZyJumpEliamteEff = function (startPos) {
        var eff = this.createSpineNode(Constant_1.NodePoolKey.ZyJumpElimate, this.zyJumpElimatePrefab, startPos);
        eff.node.zIndex = -1;
        eff.ctrl.play('zhangyu_tiaoFX', 0, false, function () {
            M_1.default.nodePool.freeItem(Constant_1.NodePoolKey.ZyJumpElimate, eff.node);
        });
    };
    EffLayerCtrl.prototype.playBrokenEff = function (pos, callback, type, name) {
        var key = Constant_1.NodePoolKey.Broken;
        var prefab = this.brokenPrefab;
        var playName = 'tongyog_posui';
        var eff = null;
        if (type) {
            if (type == Constant_1.GroundType.Leaves) {
                key = Constant_1.NodePoolKey.LeafBroken;
                prefab = this.LeavesBrokenPrefab;
            }
            else if (type == Constant_1.UpGroundType.Box) {
                key = Constant_1.NodePoolKey.BoxBroken;
                prefab = this.boxBrokenPrefab;
                playName = name;
            }
        }
        if (type == Constant_1.UpGroundType.Box) {
            eff = this.createEffPrefab(key, prefab, this.node.convertToNodeSpaceAR(pos));
            eff.ctrl.play(playName);
        }
        else {
            eff = this.createSpineNode(key, prefab, this.node.convertToNodeSpaceAR(pos));
            eff.ctrl.play(playName, 0, false, function () {
                M_1.default.nodePool.freeItem(key, eff.node);
                callback && callback();
            });
        }
    };
    EffLayerCtrl.prototype.playRowColEff = function (type, centerPos) {
        var angle = 0;
        if (type == Constant_1.CellType.Bomb3) {
            //竖
            angle = 90;
        }
        centerPos = this.node.convertToNodeSpaceAR(centerPos);
        var item = this.createSpineNode(Constant_1.NodePoolKey.RowColEff, this.rowColBombPrefab, centerPos);
        item.node.angle = angle;
        item.ctrl.play('hengsudan_fashe', 0, false, function () {
            M_1.default.nodePool.freeItem(Constant_1.NodePoolKey.RowColEff, item.node);
        });
    };
    EffLayerCtrl.prototype.playFishBombEff = function (pos) {
        pos = this.node.convertToNodeSpaceAR(pos);
        var item = this.createSpineNode(Constant_1.NodePoolKey.FishBombEff, this.fishBombPrefab, pos);
        item.ctrl.play('baozhayu_bom', 0, false, function () {
            M_1.default.nodePool.freeItem(Constant_1.NodePoolKey.FishBombEff, item.node);
        });
    };
    //播放道具2合1时的 动画
    EffLayerCtrl.prototype.playItemHeti = function (pos, key, prefab, animName, isNeedPlayBombEff) {
        var _this = this;
        if (isNeedPlayBombEff === void 0) { isNeedPlayBombEff = true; }
        //位置 方向.都需要计算 
        return new Promise(function (resolve) {
            var item = _this.createSpineNode(key, prefab, _this.node.convertToNodeSpaceAR(pos));
            cc.log("播放道具2合1时的动画，动画名称: " + animName);
            item.ctrl.play(animName, 0, false, function () {
                if (isNeedPlayBombEff == true) {
                    //this.playBombEff(0, pos, 1.5);
                    //cc.log("playBombEff");
                }
                M_1.default.nodePool.freeItem(key, item.node);
                resolve();
            });
        });
    };
    //章鱼+箭鱼
    EffLayerCtrl.prototype.playZhangyuAndJianyu = function (animName, pos, targetPos, fun) {
        var _this = this;
        return new Promise(function (resolve) {
            var item = _this.createSpineNode(Constant_1.NodePoolKey.ZhangyuAndJianyu, _this.zhangyuAndJianyu, _this.node.convertToNodeSpaceAR(pos));
            cc.log("跳跃动画名称: " + animName);
            // 创建一个移动动作
            var a1 = cc.moveTo(0.2, 150, 300);
            item.ctrl.scheduleOnce(resolve, 0.2);
            item.ctrl.play(animName, 0, false, function () {
                //M.nodePool.freeItem(NodePoolKey.ZhangyuAndJianyu, item.node);
                //resolve();
            });
            var a2 = cc.delayTime(0.2);
            var a3 = cc.moveTo(0.5, targetPos);
            var a4 = cc.callFunc(function () {
                if (fun) {
                    //cc.log("创建目标炸弹")
                    fun();
                    M_1.default.nodePool.freeItem(Constant_1.NodePoolKey.ZhangyuAndJianyu, item.node);
                }
            });
            item.node.runAction(cc.sequence(a1, a2, a3, a4));
        });
    };
    //章鱼+章鱼
    EffLayerCtrl.prototype.playZhangyuAndZhangyu = function (pos) {
        var _this = this;
        return new Promise(function (resolve) {
            var item = _this.createSpineNode(Constant_1.NodePoolKey.HaimaAndHetun, _this.haimaAndHetuanPrefab, _this.node.convertToNodeSpaceAR(pos));
            item.ctrl.scheduleOnce(resolve, 0.6);
            item.ctrl.play('zhangyuZhangyu', 0, false, function () {
                M_1.default.nodePool.freeItem(Constant_1.NodePoolKey.HaimaAndHetun, item.node);
            });
        });
    };
    //锤子动画
    EffLayerCtrl.prototype.playChuizi = function (pos) {
        var _this = this;
        return new Promise(function (resolve) {
            var item = _this.createSpineNode(Constant_1.NodePoolKey.Chuizi, _this.chuizi, _this.node.convertToNodeSpaceAR(pos));
            //item.ctrl.scheduleOnce(resolve, 0.6)
            item.ctrl.play('animation', 0, false, function () {
                M_1.default.nodePool.freeItem(Constant_1.NodePoolKey.Chuizi, item.node);
                resolve();
            });
        });
    };
    EffLayerCtrl.prototype.playHaimaAndZhangyu = function (pos) {
        var _this = this;
        return new Promise(function (resolve) {
            var item = _this.createSpineNode(Constant_1.NodePoolKey.HaimaAndZhangyu, _this.haimaAndZhangyuPrefab, _this.node.convertToNodeSpaceAR(pos));
            // item.ctrl.scheduleOnce(resolve, 1)
            item.ctrl.play('hetunHaima', 0, false, function () {
                M_1.default.nodePool.freeItem(Constant_1.NodePoolKey.HaimaAndZhangyu, item.node);
                resolve();
            });
        });
    };
    EffLayerCtrl.prototype.playHaimaAndHaima = function (pos) {
        var _this = this;
        return new Promise(function (resolve) {
            var item = _this.createSpineNode(Constant_1.NodePoolKey.HaimaAndHaima, _this.haimaAndHaimaPrefab, _this.node.convertToNodeSpaceAR(pos));
            item.ctrl.scheduleOnce(resolve, 4);
            item.ctrl.play('haimaHaima', 0, false, function () {
                M_1.default.nodePool.freeItem(Constant_1.NodePoolKey.HaimaAndHaima, item.node);
            });
        });
    };
    EffLayerCtrl.prototype.playFishAndFish = function (pos) {
        var _this = this;
        return new Promise(function (resolve) {
            var item = _this.createSpineNode(Constant_1.NodePoolKey.BombAndFish, _this.bombAndFishPrefab, _this.node.convertToNodeSpaceAR(pos));
            item.ctrl.scheduleOnce(resolve, 1);
            item.ctrl.play('jianyuJianyu', 0, false, function () {
                M_1.default.nodePool.freeItem(Constant_1.NodePoolKey.BombAndFish, item.node);
            });
        });
    };
    EffLayerCtrl.prototype.playBombAndFish = function (pos) {
        var _this = this;
        return new Promise(function (resolve) {
            var item = _this.createSpineNode(Constant_1.NodePoolKey.BombAndFish, _this.bombAndFishPrefab, _this.node.convertToNodeSpaceAR(pos));
            item.ctrl.scheduleOnce(resolve, 1);
            item.ctrl.play('jianyuHetun', 0, false, function () {
                M_1.default.nodePool.freeItem(Constant_1.NodePoolKey.BombAndFish, item.node);
            });
        });
    };
    EffLayerCtrl.prototype.playBombAndBomb = function (pos) {
        var _this = this;
        //位置 方向.都需要计算 
        return new Promise(function (resolve) {
            var item = _this.createSpineNode(Constant_1.NodePoolKey.BombAndBomb, _this.bombAndBombPrefab, _this.node.convertToNodeSpaceAR(pos));
            item.ctrl.play('hetunHeti', 0, false, function () {
                _this.playBombEff(0, pos, 1.5);
                M_1.default.nodePool.freeItem(Constant_1.NodePoolKey.BombAndBomb, item.node);
                resolve();
            });
        });
    };
    EffLayerCtrl.prototype.playBombEff = function (bombLv, pos, scale) {
        if (scale === void 0) { scale = 1; }
        pos = this.node.convertToNodeSpaceAR(pos);
        var item = this.createSpineNode(Constant_1.NodePoolKey.BombEff, this.bombEffPrefab, pos);
        item.node.scale = scale;
        item.ctrl.play('beiek_baozha', 0, false, function () {
            M_1.default.nodePool.freeItem(Constant_1.NodePoolKey.BombEff, item.node);
        });
    };
    EffLayerCtrl.prototype.playLittleBomb = function (pos) {
        pos = this.node.convertToNodeSpaceAR(pos);
        var item = this.createSpineNode(Constant_1.NodePoolKey.LittleBomb, this.littleBombPrefab, pos);
        item.ctrl.play('ciaochu01', 0, false, function () {
            M_1.default.nodePool.freeItem(Constant_1.NodePoolKey.LittleBomb, item.node);
        });
    };
    EffLayerCtrl.prototype.playRainbowBomb = function (pos, callback) {
        pos = this.node.convertToNodeSpaceAR(pos);
        var rainbowBombNode = M_1.default.nodePool.getItem(Constant_1.NodePoolKey.RainbowBomb, this.rainbowBombPrefab);
        rainbowBombNode.parent = this.node;
        rainbowBombNode.setPosition(pos);
        var effCtrl = rainbowBombNode.getComponent(SpinePlayerCtrl_1.default);
        //caihong_baozha ,原来动画名称
        effCtrl.timeScale = 3;
        effCtrl.play('skill_haima1', 0, false, function () {
            callback();
            effCtrl.timeScale = 1;
            effCtrl.play('skill_haima2', 0, false, function () {
                M_1.default.nodePool.freeItem(Constant_1.NodePoolKey.RainbowBomb, rainbowBombNode);
            });
        });
    };
    EffLayerCtrl.prototype.overShoot = function (centerPos, targetPos, cm, callback) {
        centerPos = this.node.convertToNodeSpaceAR(centerPos);
        targetPos = this.node.convertToNodeSpaceAR(targetPos);
        var handle = this.createSpineNode(Constant_1.NodePoolKey.OverShoot, this.overShootPrefab, centerPos);
        var a0 = cc.moveTo(1, targetPos);
        var a1 = cc.callFunc(function () {
            // node.removeFromParent(true); 
            M_1.default.runtime.OverStepCount++;
            if (M_1.default.runtime.OverStepCount > 7) {
                M_1.default.runtime.OverStepCount = 7;
            }
            M_1.default.event.send(Event_1.Event.UI.AddScore, Constant_1.ScoreConfig.OverStep[M_1.default.runtime.OverStepCount], targetPos, true);
            callback(cm);
        });
        M_1.default.event.send(Event_1.Event.Sound.PlaySoundEff, AudioCtrl_1.AudioID.partytime_shoot);
        handle.node.runAction(cc.sequence(a0, a1));
    };
    EffLayerCtrl.prototype.onShootStar = function (centerPos, targetPos, callback) {
        var _this = this;
        centerPos = this.node.convertToNodeSpaceAR(centerPos);
        targetPos = this.node.convertToNodeSpaceAR(targetPos);
        var handle = this.createSpineNode(Constant_1.NodePoolKey.ShootStar, this.shootStarPrefab, centerPos);
        //设置特效长度，distance 就是算出来的距离了
        var distance = Math.sqrt(Math.pow(centerPos.x - targetPos.x, 2) + Math.pow(centerPos.y - targetPos.y, 2));
        //cc.log("scaleY: "+ (distance/309-0.2))
        // handle.node.setContentSize(68,distance);
        var scaleY = distance / 309 - 0.2;
        handle.node.scaleY = scaleY;
        // handle.ctrl.play(`anim_haimaDian${Util.Tool.rangeInt(1, 2)}`, 0, false);
        if (scaleY > 0.5) {
            handle.ctrl.play("anim_haimaDian" + 2, 0, false);
        }
        else {
            handle.ctrl.play("anim_haimaDian" + 1, 0, false);
        }
        //设置旋转角度
        var dirVec = targetPos.sub(centerPos); //获得从startPos指向endPos的方向向量
        var comVec = new cc.Vec2(1, 0); //计算夹角的参考方向，这里选择x轴正方向
        var radian = dirVec.signAngle(comVec); //获得带方向的夹角弧度值(参考方向顺时针为正值，逆时针为负值)
        var degree = Math.floor(cc.misc.radiansToDegrees(radian));
        //console.log("x角度：" + degree)
        handle.node.angle = -(degree - 90);
        // handle.node.setRotation(degree - 90);
        this._tmpShootStar.push(handle.node);
        //const a0 = cc.moveTo(GapTime.StarsShootSpeed, targetPos);
        var a1 = cc.repeatForever(cc.rotateBy(1.0, 360));
        var a2 = cc.callFunc(function () {
            var h = _this.createSpineNode(Constant_1.NodePoolKey.HaiMaOver, _this.haimaShootOverEff, targetPos);
            _this._tmpShootOver.push(h.node);
            h.ctrl.play('mingzhong', 0, true);
            callback();
        }, this);
        //handle.node.runAction(a1);
        // handle.node.runAction(cc.sequence(a0, a2));
        handle.node.runAction(a2);
    };
    EffLayerCtrl.prototype.removeShootStars = function () {
        if (this._tmpShootStar && this._tmpShootStar.length > 0) {
            this._tmpShootStar.forEach(function (node) {
                node.stopAllActions();
                M_1.default.nodePool.freeItem(Constant_1.NodePoolKey.ShootStar, node);
            });
        }
        if (this._tmpShootOver && this._tmpShootOver.length > 0) {
            this._tmpShootOver.forEach(function (node) {
                node.stopAllActions();
                M_1.default.nodePool.freeItem(Constant_1.NodePoolKey.HaiMaOver, node);
            });
        }
    };
    EffLayerCtrl.prototype.normalCollectOverEff = function (pos, targetName) {
        if (targetName === void 0) { targetName = null; }
        var item = this.createSpineNode(Constant_1.NodePoolKey.MergeBomb, this.mergeBombPrefab, pos);
        item.ctrl.play(targetName || 'shouji', 0, false, function () {
            M_1.default.nodePool.freeItem(Constant_1.NodePoolKey.MergeBomb, item.node);
        });
    };
    //合成炸弹,  区分方向与个数!!!
    EffLayerCtrl.prototype.playSpeedLine = function (pos, dir) {
        pos = this.node.convertToNodeSpaceAR(pos);
        var item = this.createSpineNode(Constant_1.NodePoolKey.MergeBomb, this.mergeBombPrefab, pos);
        item.node.angle = 0;
        var over = function () {
            M_1.default.nodePool.freeItem(Constant_1.NodePoolKey.MergeBomb, item.node);
        };
        var isCenter = (dir.x == 0 && dir.y == 0);
        var isOblique = (dir.x != 0 && dir.y != 0);
        if (isCenter) {
            item.ctrl.play('hecheng01', 0, false, over);
        }
        else {
            var angle = [0, 90, 180, 270]; //左 上 右 下 斜 45
            var index = 0;
            var p = cc.v3(Common_1.default.GRID_W, Common_1.default.GRID_H);
            if (isOblique) {
                angle = [45, 225, -45, -225];
                if (dir.x == 1 && dir.y == -1) {
                    index = 1;
                    p.y = p.y;
                    p.x = p.x;
                }
                ;
                if (dir.x == -1 && dir.y == 1) {
                    index = 0;
                    p.y = -p.y;
                    p.x = -p.x;
                }
                ;
                if (dir.x == 1 && dir.y == 1) {
                    index = 3;
                    p.y = -p.y;
                    p.x = p.x;
                }
                ;
                if (dir.x == -1 && dir.y == -1) {
                    index = 2;
                    p.y = p.y;
                    p.x = -p.x;
                }
                ;
            }
            else {
                if (dir.x == 1) {
                    index = 2;
                    p.x = p.x;
                    p.y = 0;
                }
                ;
                if (dir.x == -1) {
                    index = 0;
                    p.x = -p.x;
                    p.y = 0;
                }
                ;
                if (dir.y == 1) {
                    index = 1;
                    p.y = -p.y;
                    p.x = 0;
                }
                ;
                if (dir.y == -1) {
                    index = 3;
                    p.y = p.y;
                    p.x = 0;
                }
                ;
            }
            item.node.angle = angle[index];
            item.node.position = item.node.position.add(p);
            item.ctrl.play('hecheng01_1', 0, false, over);
        }
    };
    EffLayerCtrl.prototype.preFallingCountDown = function (remainStep, callback) {
        var _this = this;
        return new Promise(function (resolve) {
            var node = _this.node.getChildByName('tmpCountDown');
            node.active = true;
            node.y = 0;
            var lable = node.getComponent(cc.Label);
            var countDown = function (count, isfrist, cb) {
                _this.schedule(function () {
                    lable.string = "\u62A2\u5206\u5012\u8BA1\u65F6: " + count;
                    count--;
                    if (count < 0) {
                        node.runAction(cc.moveBy(1, cc.v2(0, 360)));
                        cb();
                        if (isfrist) {
                            countDown(remainStep, false, callback);
                        }
                        else {
                            node.active = false;
                        }
                    }
                }, 1, count);
            };
            countDown(2, true, resolve);
        });
    };
    EffLayerCtrl.prototype.createSpineNode = function (key, prefab, pos) {
        if (pos === void 0) { pos = null; }
        return Common_1.default.createSpineNode(this.node, prefab, key, pos);
    };
    EffLayerCtrl.prototype.createEffPrefab = function (key, prefab, pos) {
        if (pos === void 0) { pos = null; }
        return Common_1.default.createEffPrefab(this.node, key, prefab, pos);
    };
    var EffLayerCtrl_1;
    EffLayerCtrl.ins = null;
    __decorate([
        property(cc.Prefab)
    ], EffLayerCtrl.prototype, "bombEffPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], EffLayerCtrl.prototype, "littleBombPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], EffLayerCtrl.prototype, "mergeBombPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], EffLayerCtrl.prototype, "comboPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], EffLayerCtrl.prototype, "rowColBombPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], EffLayerCtrl.prototype, "fishBombPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], EffLayerCtrl.prototype, "rainbowBombPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], EffLayerCtrl.prototype, "shootStarPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], EffLayerCtrl.prototype, "haimaShootOverEff", void 0);
    __decorate([
        property(cc.Prefab)
    ], EffLayerCtrl.prototype, "zyJumpPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], EffLayerCtrl.prototype, "zyJumpOverPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], EffLayerCtrl.prototype, "zyJumpElimatePrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], EffLayerCtrl.prototype, "brokenPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], EffLayerCtrl.prototype, "LeavesBrokenPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], EffLayerCtrl.prototype, "boxBrokenPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], EffLayerCtrl.prototype, "overShootPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], EffLayerCtrl.prototype, "addScorePrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], EffLayerCtrl.prototype, "addScoreOverPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], EffLayerCtrl.prototype, "dotPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], EffLayerCtrl.prototype, "bombAndBombPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], EffLayerCtrl.prototype, "haimaAndHetuanPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], EffLayerCtrl.prototype, "haimaAndHaimaPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], EffLayerCtrl.prototype, "zhangyuAndJianyu", void 0);
    __decorate([
        property(cc.Prefab)
    ], EffLayerCtrl.prototype, "hetuanAndJianyu", void 0);
    __decorate([
        property(cc.Prefab)
    ], EffLayerCtrl.prototype, "chuizi", void 0);
    __decorate([
        property(cc.Prefab)
    ], EffLayerCtrl.prototype, "bombAndFishPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], EffLayerCtrl.prototype, "haimaAndZhangyuPrefab", void 0);
    EffLayerCtrl = EffLayerCtrl_1 = __decorate([
        ccclass
    ], EffLayerCtrl);
    return EffLayerCtrl;
}(cc.Component));
exports.default = EffLayerCtrl;

cc._RF.pop();