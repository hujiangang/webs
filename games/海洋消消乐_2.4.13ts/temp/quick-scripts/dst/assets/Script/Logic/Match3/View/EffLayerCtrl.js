
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Match3/View/EffLayerCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcTWF0Y2gzXFxWaWV3XFxFZmZMYXllckN0cmwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUZBQTRFO0FBQzVFLDZDQUF3QztBQUN4QyxzREFBcUg7QUFDckgsZ0RBQStDO0FBQy9DLDBEQUFzRDtBQUN0RCw4Q0FBeUM7QUFFekMsb0RBQWlEO0FBRTNDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTBDLGdDQUFZO0lBQXREO1FBQUEscUVBc29CQztRQW5vQkcsbUJBQWEsR0FBYyxJQUFJLENBQUM7UUFHaEMsc0JBQWdCLEdBQWMsSUFBSSxDQUFDO1FBR25DLHFCQUFlLEdBQWMsSUFBSSxDQUFDO1FBR2xDLGlCQUFXLEdBQWMsSUFBSSxDQUFDO1FBRzlCLHNCQUFnQixHQUFjLElBQUksQ0FBQztRQUduQyxvQkFBYyxHQUFjLElBQUksQ0FBQztRQUdqQyx1QkFBaUIsR0FBYyxJQUFJLENBQUM7UUFHcEMscUJBQWUsR0FBYyxJQUFJLENBQUM7UUFHbEMsdUJBQWlCLEdBQWMsSUFBSSxDQUFDO1FBR3BDLGtCQUFZLEdBQWMsSUFBSSxDQUFDO1FBRy9CLHNCQUFnQixHQUFjLElBQUksQ0FBQztRQUduQyx5QkFBbUIsR0FBYyxJQUFJLENBQUM7UUFHdEMsa0JBQVksR0FBYyxJQUFJLENBQUM7UUFHL0Isd0JBQWtCLEdBQWMsSUFBSSxDQUFDO1FBR3JDLHFCQUFlLEdBQWMsSUFBSSxDQUFDO1FBR2xDLHFCQUFlLEdBQWMsSUFBSSxDQUFDO1FBR2xDLG9CQUFjLEdBQWMsSUFBSSxDQUFDO1FBR2pDLHdCQUFrQixHQUFjLElBQUksQ0FBQztRQUdyQyxlQUFTLEdBQWMsSUFBSSxDQUFDO1FBRzVCLHVCQUFpQixHQUFjLElBQUksQ0FBQztRQUdwQywwQkFBb0IsR0FBYyxJQUFJLENBQUM7UUFHdkMseUJBQW1CLEdBQWMsSUFBSSxDQUFDO1FBR3RDLHNCQUFnQixHQUFjLElBQUksQ0FBQyxDQUFBLGNBQWM7UUFHakQscUJBQWUsR0FBYyxJQUFJLENBQUMsQ0FBQSxjQUFjO1FBR2hELFlBQU0sR0FBYyxJQUFJLENBQUMsQ0FBQSxJQUFJO1FBRzdCLHVCQUFpQixHQUFjLElBQUksQ0FBQztRQUdwQywyQkFBcUIsR0FBYyxJQUFJLENBQUM7UUFFaEMsbUJBQWEsR0FBbUIsRUFBRSxDQUFDO1FBQ25DLG1CQUFhLEdBQW1CLEVBQUUsQ0FBQzs7SUFrakIvQyxDQUFDO3FCQXRvQm9CLFlBQVk7SUF3RjdCLDZCQUFNLEdBQU47UUFDSSxjQUFZLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQztRQUN4QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO0lBQzNCLENBQUM7SUFFRCxnQ0FBUyxHQUFUO1FBQ0ksSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLFdBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVPLHVDQUFnQixHQUF4QjtRQUNJLGlCQUFpQjtRQUNsQiw2QkFBNkI7UUFDNUIsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLFdBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLHNCQUFXLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM5RSxrQ0FBa0M7UUFDbEMsV0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsc0JBQVcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZFLG1DQUFtQztRQUNsQyxXQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxzQkFBVyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdEUsa0NBQWtDO1FBQ2xDLFdBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLHNCQUFXLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDbkUsa0NBQWtDO1FBQ2xDLFdBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLHNCQUFXLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN0RSxtQ0FBbUM7UUFDbEMsV0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsc0JBQVcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM5RCxtQ0FBbUM7UUFDbEMsV0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsc0JBQVcsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZFLGtDQUFrQztRQUNsQyxXQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxzQkFBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQy9ELGtDQUFrQztRQUNsQyxXQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxzQkFBVyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDcEUsa0NBQWtDO1FBQ2xDLFdBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLHNCQUFXLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMzRSxrQ0FBa0M7UUFDbEMsV0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsc0JBQVcsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3RFLG1DQUFtQztRQUNsQyxXQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxzQkFBVyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdEUsbUNBQW1DO1FBQ2xDLFdBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLHNCQUFXLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM3RSxtQ0FBbUM7UUFDbEMsV0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsc0JBQVcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNwRSxrQ0FBa0M7SUFDdEMsQ0FBQztJQUVPLG9DQUFhLEdBQXJCO1FBQ0ksV0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsYUFBSyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyRSxXQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxhQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25FLFdBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGFBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDakUsV0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsYUFBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvRCxXQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxhQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzlELFdBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGFBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDaEUsV0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsYUFBSyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzVFLFdBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGFBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDcEUsZ0VBQWdFO0lBQ3BFLENBQUM7SUFFTyxrQ0FBVyxHQUFuQjtRQUNJLFdBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLGFBQUssQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdkUsV0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsYUFBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNyRSxXQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxhQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2pFLFdBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLGFBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkUsV0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsYUFBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNoRSxXQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxhQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xFLFdBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLGFBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdEUsV0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsYUFBSyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzlFLGtFQUFrRTtJQUN0RSxDQUFDO0lBRU0sbUNBQVksR0FBbkIsVUFBb0IsS0FBYTtRQUM3QixJQUFNLElBQUksR0FBRyxxQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9CLElBQUksSUFBSSxFQUFFO1lBQ04sSUFBTSxTQUFTLEdBQUcsV0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsc0JBQVcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzdFLFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztZQUM3QixJQUFNLFNBQVMsR0FBRyxTQUFTLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN2RCxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JCLFNBQVMsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxzQkFBVyxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDNUc7SUFDTCxDQUFDO0lBRUQsOERBQThEO0lBQzlELDRDQUE0QztJQUM1QyxrQ0FBa0M7SUFDbEMsK0VBQStFO0lBQy9FLHNDQUFzQztJQUV0QywyREFBMkQ7SUFDM0QsMkVBQTJFO0lBQzNFLCtHQUErRztJQUMvRyx1R0FBdUc7SUFFdkcscURBQXFEO0lBQ3JELHlDQUF5QztJQUN6Qyw2REFBNkQ7SUFDN0QsYUFBYTtJQUNiLGtEQUFrRDtJQUVsRCw2Q0FBNkM7SUFDN0MsMkZBQTJGO0lBQzNGLFlBQVk7SUFDWixRQUFRO0lBQ1IsSUFBSTtJQUVJLG1DQUFZLEdBQXBCLFVBQXFCLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUztRQUNyQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzlDLFdBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRU8sc0NBQWUsR0FBdkIsVUFBd0IsS0FBYSxFQUFFLEdBQVksRUFBRSxNQUF1QjtRQUF2Qix1QkFBQSxFQUFBLGNBQXVCO1FBQ3hFLElBQUksSUFBSSxHQUFZLElBQUksQ0FBQztRQUN6QixJQUFJLE1BQU0sRUFBRTtZQUNSLHdEQUF3RDtZQUN4RCxJQUFJLEdBQUcsV0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsc0JBQVcsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7U0FDbkY7YUFBTTtZQUNILEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBWSxDQUFDO1lBQ3JELEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxnQkFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsZ0JBQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1RCxJQUFJLEdBQUcsV0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsc0JBQVcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQzNFO1FBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1FBQ25CLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNoQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLElBQUksTUFBTSxFQUFFO1lBQ1IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDOUUsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDbEQsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2pCLDhHQUE4RztZQUM5RyxJQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzdCLElBQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDM0IsSUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFDbkIsV0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsc0JBQVcsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDM0QsQ0FBQyxDQUFDLENBQUE7WUFDRixJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQzNDO2FBQU07WUFDSCxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3RELElBQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ2hDLElBQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzlCLElBQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDeEMsSUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMzQixJQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQUNuQixXQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxzQkFBVyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN2RCxDQUFDLENBQUMsQ0FBQTtZQUNGLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNuRDtJQUNMLENBQUM7SUFFTSxpQ0FBVSxHQUFqQixVQUFrQixRQUFpQixFQUFFLFNBQWtCLEVBQUUsUUFBbUIsRUFBRSxTQUFvQjtRQUFsRyxpQkFtQ0M7UUFsQ0csUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFZLENBQUM7UUFDL0QsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsU0FBUyxDQUFZLENBQUM7UUFDakUsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUNkLEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNwQyxXQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFLLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxtQkFBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVELENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNOLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsc0JBQVcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUdsRixJQUFJLFFBQVEsR0FBRyxjQUFjLENBQUM7UUFDOUIsSUFBSSxTQUFTLElBQUksbUJBQVEsQ0FBQyxLQUFLLEVBQUU7WUFDN0IsT0FBTztZQUNQLFFBQVEsR0FBRyxxQkFBcUIsQ0FBQztTQUNwQzthQUFNLElBQUksU0FBUyxJQUFJLG1CQUFRLENBQUMsS0FBSyxFQUFFO1lBQ3BDLFFBQVE7WUFDUixRQUFRLEdBQUcsb0JBQW9CLENBQUM7U0FDbkM7UUFDRCxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxjQUFRLENBQUMsQ0FBQyxDQUFDO1FBRTdDLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEUsSUFBTSxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDekUsSUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFdkUsSUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM3QixJQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLG9CQUFPLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDbkYsSUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQztZQUNuQixXQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxzQkFBVyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEQsSUFBTSxJQUFJLEdBQUcsS0FBSSxDQUFDLGVBQWUsQ0FBQyxzQkFBVyxDQUFDLFVBQVUsRUFBRSxLQUFJLENBQUMsZ0JBQWdCLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDNUYsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRTtnQkFDM0MsV0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsc0JBQVcsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNELENBQUMsQ0FBQyxDQUFDO1lBQ0gsUUFBUSxJQUFJLFFBQVEsRUFBRSxDQUFDO1FBQzNCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUNSLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFTywyQ0FBb0IsR0FBNUIsVUFBNkIsUUFBMkI7UUFDcEQsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxzQkFBVyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDaEcsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDckIsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRTtZQUN0QyxXQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxzQkFBVyxDQUFDLGFBQWEsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0QsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sb0NBQWEsR0FBcEIsVUFBcUIsR0FBWSxFQUFFLFFBQWtCLEVBQUUsSUFBSyxFQUFFLElBQUs7UUFDL0QsSUFBSSxHQUFHLEdBQUcsc0JBQVcsQ0FBQyxNQUFNLENBQUM7UUFDN0IsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUMvQixJQUFJLFFBQVEsR0FBVyxlQUFlLENBQUM7UUFDdkMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDO1FBQ2YsSUFBSSxJQUFJLEVBQUU7WUFDTixJQUFJLElBQUksSUFBSSxxQkFBVSxDQUFDLE1BQU0sRUFBRTtnQkFDM0IsR0FBRyxHQUFHLHNCQUFXLENBQUMsVUFBVSxDQUFDO2dCQUM3QixNQUFNLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDO2FBQ3BDO2lCQUFNLElBQUksSUFBSSxJQUFJLHVCQUFZLENBQUMsR0FBRyxFQUFFO2dCQUNqQyxHQUFHLEdBQUcsc0JBQVcsQ0FBQyxTQUFTLENBQUE7Z0JBQzNCLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO2dCQUM5QixRQUFRLEdBQUcsSUFBSSxDQUFDO2FBQ25CO1NBQ0o7UUFDRCxJQUFJLElBQUksSUFBSSx1QkFBWSxDQUFDLEdBQUcsRUFBRTtZQUMxQixHQUFHLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtZQUM1RSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUMzQjthQUFNO1lBQ0gsR0FBRyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDN0UsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUU7Z0JBQzlCLFdBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ25DLFFBQVEsSUFBSSxRQUFRLEVBQUUsQ0FBQztZQUMzQixDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUVNLG9DQUFhLEdBQXBCLFVBQXFCLElBQWMsRUFBRSxTQUFrQjtRQUNuRCxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDZCxJQUFJLElBQUksSUFBSSxtQkFBUSxDQUFDLEtBQUssRUFBRTtZQUN4QixHQUFHO1lBQ0gsS0FBSyxHQUFHLEVBQUUsQ0FBQztTQUNkO1FBQ0QsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsU0FBUyxDQUFZLENBQUE7UUFDaEUsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxzQkFBVyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDM0YsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUU7WUFDeEMsV0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsc0JBQVcsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLHNDQUFlLEdBQXRCLFVBQXVCLEdBQVk7UUFDL0IsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFZLENBQUE7UUFDcEQsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxzQkFBVyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3JGLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFO1lBQ3JDLFdBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLHNCQUFXLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1RCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxjQUFjO0lBQ1AsbUNBQVksR0FBbkIsVUFBb0IsR0FBWSxFQUFFLEdBQWdCLEVBQUUsTUFBaUIsRUFBRSxRQUFnQixFQUFFLGlCQUFpQztRQUExSCxpQkFjQztRQWR3RixrQ0FBQSxFQUFBLHdCQUFpQztRQUN0SCxjQUFjO1FBQ2QsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU87WUFDdkIsSUFBTSxJQUFJLEdBQUcsS0FBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNwRixFQUFFLENBQUMsR0FBRyxDQUFDLG9CQUFvQixHQUFHLFFBQVEsQ0FBQyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFO2dCQUMvQixJQUFJLGlCQUFpQixJQUFJLElBQUksRUFBRTtvQkFDM0IsZ0NBQWdDO29CQUNoQyx3QkFBd0I7aUJBQzNCO2dCQUNELFdBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3BDLE9BQU8sRUFBRSxDQUFDO1lBQ2QsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFHRCxPQUFPO0lBQ0EsMkNBQW9CLEdBQTNCLFVBQTRCLFFBQWdCLEVBQUUsR0FBWSxFQUFFLFNBQWtCLEVBQUUsR0FBYTtRQUE3RixpQkE0QkM7UUEzQkcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU87WUFDdkIsSUFBTSxJQUFJLEdBQUcsS0FBSSxDQUFDLGVBQWUsQ0FBQyxzQkFBVyxDQUFDLGdCQUFnQixFQUFFLEtBQUksQ0FBQyxnQkFBZ0IsRUFBRSxLQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFFNUgsRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLENBQUE7WUFFN0IsV0FBVztZQUNYLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUVsQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUE7WUFDcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUU7Z0JBQy9CLCtEQUErRDtnQkFDL0QsWUFBWTtZQUNoQixDQUFDLENBQUMsQ0FBQztZQUVILElBQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDN0IsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFFbkMsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFDakIsSUFBSSxHQUFHLEVBQUU7b0JBQ0wsa0JBQWtCO29CQUNsQixHQUFHLEVBQUUsQ0FBQztvQkFDTixXQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxzQkFBVyxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDaEU7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNyRCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFHRCxPQUFPO0lBQ0EsNENBQXFCLEdBQTVCLFVBQTZCLEdBQVk7UUFBekMsaUJBUUM7UUFQRyxPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTztZQUN2QixJQUFNLElBQUksR0FBRyxLQUFJLENBQUMsZUFBZSxDQUFDLHNCQUFXLENBQUMsYUFBYSxFQUFFLEtBQUksQ0FBQyxvQkFBb0IsRUFBRSxLQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDN0gsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFBO1lBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUU7Z0JBQ3ZDLFdBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLHNCQUFXLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5RCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUdELE1BQU07SUFDQyxpQ0FBVSxHQUFqQixVQUFrQixHQUFZO1FBQTlCLGlCQVNDO1FBUkcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU87WUFDdkIsSUFBTSxJQUFJLEdBQUcsS0FBSSxDQUFDLGVBQWUsQ0FBQyxzQkFBVyxDQUFDLE1BQU0sRUFBRSxLQUFJLENBQUMsTUFBTSxFQUFFLEtBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN4RyxzQ0FBc0M7WUFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUU7Z0JBQ2xDLFdBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLHNCQUFXLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbkQsT0FBTyxFQUFFLENBQUM7WUFDZCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVNLDBDQUFtQixHQUExQixVQUEyQixHQUFZO1FBQXZDLGlCQVNDO1FBUkcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU87WUFDdkIsSUFBTSxJQUFJLEdBQUcsS0FBSSxDQUFDLGVBQWUsQ0FBQyxzQkFBVyxDQUFDLGVBQWUsRUFBRSxLQUFJLENBQUMscUJBQXFCLEVBQUUsS0FBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2hJLHFDQUFxQztZQUNyQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRTtnQkFDbkMsV0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsc0JBQVcsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM1RCxPQUFPLEVBQUUsQ0FBQztZQUNkLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRU0sd0NBQWlCLEdBQXhCLFVBQXlCLEdBQVk7UUFBckMsaUJBUUM7UUFQRyxPQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTztZQUN2QixJQUFNLElBQUksR0FBRyxLQUFJLENBQUMsZUFBZSxDQUFDLHNCQUFXLENBQUMsYUFBYSxFQUFFLEtBQUksQ0FBQyxtQkFBbUIsRUFBRSxLQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDNUgsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFO2dCQUNuQyxXQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxzQkFBVyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUQsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSxzQ0FBZSxHQUF0QixVQUF1QixHQUFZO1FBQW5DLGlCQVFDO1FBUEcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU87WUFDdkIsSUFBTSxJQUFJLEdBQUcsS0FBSSxDQUFDLGVBQWUsQ0FBQyxzQkFBVyxDQUFDLFdBQVcsRUFBRSxLQUFJLENBQUMsaUJBQWlCLEVBQUUsS0FBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3hILElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQTtZQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRTtnQkFDckMsV0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsc0JBQVcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVELENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRU0sc0NBQWUsR0FBdEIsVUFBdUIsR0FBWTtRQUFuQyxpQkFRQztRQVBHLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPO1lBQ3ZCLElBQU0sSUFBSSxHQUFHLEtBQUksQ0FBQyxlQUFlLENBQUMsc0JBQVcsQ0FBQyxXQUFXLEVBQUUsS0FBSSxDQUFDLGlCQUFpQixFQUFFLEtBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN4SCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUE7WUFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUU7Z0JBQ3BDLFdBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLHNCQUFXLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM1RCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVNLHNDQUFlLEdBQXRCLFVBQXVCLEdBQVk7UUFBbkMsaUJBVUM7UUFURyxjQUFjO1FBQ2QsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU87WUFDdkIsSUFBTSxJQUFJLEdBQUcsS0FBSSxDQUFDLGVBQWUsQ0FBQyxzQkFBVyxDQUFDLFdBQVcsRUFBRSxLQUFJLENBQUMsaUJBQWlCLEVBQUUsS0FBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3hILElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFO2dCQUNsQyxLQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQzlCLFdBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLHNCQUFXLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDeEQsT0FBTyxFQUFFLENBQUM7WUFDZCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVNLGtDQUFXLEdBQWxCLFVBQW1CLE1BQWMsRUFBRSxHQUFZLEVBQUUsS0FBaUI7UUFBakIsc0JBQUEsRUFBQSxTQUFpQjtRQUM5RCxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQVksQ0FBQTtRQUNwRCxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLHNCQUFXLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDaEYsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFO1lBQ3JDLFdBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLHNCQUFXLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4RCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSxxQ0FBYyxHQUFyQixVQUFzQixHQUFZO1FBQzlCLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBWSxDQUFBO1FBQ3BELElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsc0JBQVcsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3RGLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFO1lBQ2xDLFdBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLHNCQUFXLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzRCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSxzQ0FBZSxHQUF0QixVQUF1QixHQUFZLEVBQUUsUUFBUTtRQUN6QyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQVksQ0FBQTtRQUNwRCxJQUFNLGVBQWUsR0FBRyxXQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxzQkFBVyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUM1RixlQUFlLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDbkMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQyxJQUFNLE9BQU8sR0FBRyxlQUFlLENBQUMsWUFBWSxDQUFDLHlCQUFlLENBQUMsQ0FBQztRQUM5RCx3QkFBd0I7UUFFeEIsT0FBTyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDdEIsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRTtZQUNuQyxRQUFRLEVBQUUsQ0FBQztZQUNYLE9BQU8sQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1lBQ3RCLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUU7Z0JBQ25DLFdBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLHNCQUFXLENBQUMsV0FBVyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1lBQ2xFLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFHUCxDQUFDO0lBRU8sZ0NBQVMsR0FBakIsVUFBa0IsU0FBa0IsRUFBRSxTQUFTLEVBQUUsRUFBYSxFQUFFLFFBQWtCO1FBRTlFLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFNBQVMsQ0FBWSxDQUFBO1FBQ2hFLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFNBQVMsQ0FBWSxDQUFBO1FBQ2hFLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsc0JBQVcsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUM1RixJQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNuQyxJQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDO1lBQ25CLGdDQUFnQztZQUNoQyxXQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFBO1lBQ3pCLElBQUksV0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEdBQUcsQ0FBQyxFQUFFO2dCQUM3QixXQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7YUFDL0I7WUFDRCxXQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFLLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxzQkFBVyxDQUFDLFFBQVEsQ0FBQyxXQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQTtZQUUvRixRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUM7UUFDSCxXQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFLLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxtQkFBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ2hFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVPLGtDQUFXLEdBQW5CLFVBQW9CLFNBQWtCLEVBQUUsU0FBa0IsRUFBRSxRQUFrQjtRQUE5RSxpQkEyQ0M7UUExQ0csU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsU0FBUyxDQUFZLENBQUE7UUFDaEUsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsU0FBUyxDQUFZLENBQUE7UUFFaEUsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxzQkFBVyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsZUFBZSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRTVGLDJCQUEyQjtRQUMzQixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUcsd0NBQXdDO1FBQ3hDLDJDQUEyQztRQUMzQyxJQUFJLE1BQU0sR0FBRyxRQUFRLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDNUIsMkVBQTJFO1FBQzNFLElBQUksTUFBTSxHQUFHLEdBQUcsRUFBRTtZQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFpQixDQUFHLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ3BEO2FBQU07WUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBaUIsQ0FBRyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUNwRDtRQUdELFFBQVE7UUFDUixJQUFJLE1BQU0sR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUEsMEJBQTBCO1FBQ2hFLElBQUksTUFBTSxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQSxxQkFBcUI7UUFDcEQsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBLGdDQUFnQztRQUN0RSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUMxRCw4QkFBOEI7UUFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsQ0FBQTtRQUNsQyx3Q0FBd0M7UUFFeEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXJDLDJEQUEyRDtRQUMzRCxJQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDbkQsSUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQztZQUNuQixJQUFNLENBQUMsR0FBRyxLQUFJLENBQUMsZUFBZSxDQUFDLHNCQUFXLENBQUMsU0FBUyxFQUFFLEtBQUksQ0FBQyxpQkFBaUIsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUN6RixLQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNsQyxRQUFRLEVBQUUsQ0FBQztRQUNmLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUVSLDRCQUE0QjtRQUM1Qiw4Q0FBOEM7UUFDOUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVNLHVDQUFnQixHQUF2QjtRQUNJLElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDckQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO2dCQUMzQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3RCLFdBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLHNCQUFXLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3JELENBQUMsQ0FBQyxDQUFBO1NBQ0w7UUFDRCxJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3JELElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtnQkFDM0IsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN0QixXQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxzQkFBVyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNyRCxDQUFDLENBQUMsQ0FBQTtTQUNMO0lBQ0wsQ0FBQztJQUVNLDJDQUFvQixHQUEzQixVQUE0QixHQUFZLEVBQUUsVUFBeUI7UUFBekIsMkJBQUEsRUFBQSxpQkFBeUI7UUFDL0QsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxzQkFBVyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsZUFBZSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3BGLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxRQUFRLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRTtZQUM3QyxXQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxzQkFBVyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUQsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsbUJBQW1CO0lBQ1osb0NBQWEsR0FBcEIsVUFBcUIsR0FBWSxFQUFFLEdBQVk7UUFDM0MsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFZLENBQUM7UUFDckQsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxzQkFBVyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsZUFBZSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3BGLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNwQixJQUFNLElBQUksR0FBRztZQUNULFdBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLHNCQUFXLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxRCxDQUFDLENBQUE7UUFDRCxJQUFJLFFBQVEsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDMUMsSUFBSSxTQUFTLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzNDLElBQUksUUFBUSxFQUFFO1lBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDL0M7YUFBTTtZQUNILElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxjQUFjO1lBQzdDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztZQUNkLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsZ0JBQU0sQ0FBQyxNQUFNLEVBQUUsZ0JBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM1QyxJQUFJLFNBQVMsRUFBRTtnQkFDWCxLQUFLLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzdCLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtvQkFBRSxLQUFLLEdBQUcsQ0FBQyxDQUFDO29CQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7aUJBQUU7Z0JBQUEsQ0FBQztnQkFDbkUsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUFFLEtBQUssR0FBRyxDQUFDLENBQUM7b0JBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7aUJBQUU7Z0JBQUEsQ0FBQztnQkFDckUsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFBRSxLQUFLLEdBQUcsQ0FBQyxDQUFDO29CQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtpQkFBRTtnQkFBQSxDQUFDO2dCQUNuRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtvQkFBRSxLQUFLLEdBQUcsQ0FBQyxDQUFDO29CQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtpQkFBRTtnQkFBQSxDQUFDO2FBQ3hFO2lCQUFNO2dCQUNILElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQUUsS0FBSyxHQUFHLENBQUMsQ0FBQztvQkFBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7aUJBQUU7Z0JBQUEsQ0FBQztnQkFDbEQsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO29CQUFFLEtBQUssR0FBRyxDQUFDLENBQUM7b0JBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7aUJBQUU7Z0JBQUEsQ0FBQztnQkFDcEQsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFBRSxLQUFLLEdBQUcsQ0FBQyxDQUFDO29CQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO2lCQUFFO2dCQUFBLENBQUM7Z0JBQ25ELElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtvQkFBRSxLQUFLLEdBQUcsQ0FBQyxDQUFDO29CQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtpQkFBRTtnQkFBQSxDQUFDO2FBQ3REO1lBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNqRDtJQUNMLENBQUM7SUFFTSwwQ0FBbUIsR0FBMUIsVUFBMkIsVUFBa0IsRUFBRSxRQUFrQjtRQUFqRSxpQkF1QkM7UUF0QkcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU87WUFDdkIsSUFBTSxJQUFJLEdBQUcsS0FBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDdEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDbkIsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDWCxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxQyxJQUFNLFNBQVMsR0FBRyxVQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsRUFBRTtnQkFDakMsS0FBSSxDQUFDLFFBQVEsQ0FBQztvQkFDVixLQUFLLENBQUMsTUFBTSxHQUFHLHFDQUFVLEtBQU8sQ0FBQztvQkFDakMsS0FBSyxFQUFFLENBQUM7b0JBQ1IsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFO3dCQUNYLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM1QyxFQUFFLEVBQUUsQ0FBQzt3QkFDTCxJQUFJLE9BQU8sRUFBRTs0QkFDVCxTQUFTLENBQUMsVUFBVSxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQzt5QkFDMUM7NkJBQU07NEJBQ0gsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7eUJBQ3ZCO3FCQUNKO2dCQUNMLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDakIsQ0FBQyxDQUFBO1lBQ0QsU0FBUyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU8sc0NBQWUsR0FBdkIsVUFBd0IsR0FBZ0IsRUFBRSxNQUFpQixFQUFFLEdBQTZCO1FBQTdCLG9CQUFBLEVBQUEsVUFBNkI7UUFDdEYsT0FBTyxnQkFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVPLHNDQUFlLEdBQXZCLFVBQXdCLEdBQWdCLEVBQUUsTUFBaUIsRUFBRSxHQUE2QjtRQUE3QixvQkFBQSxFQUFBLFVBQTZCO1FBQ3RGLE9BQU8sZ0JBQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQzlELENBQUM7O0lBL2lCYSxnQkFBRyxHQUFpQixJQUFJLENBQUM7SUFuRnZDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7dURBQ1k7SUFHaEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzswREFDZTtJQUduQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3lEQUNjO0lBR2xDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7cURBQ1U7SUFHOUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzswREFDZTtJQUduQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3dEQUNhO0lBR2pDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7MkRBQ2dCO0lBR3BDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7eURBQ2M7SUFHbEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzsyREFDZ0I7SUFHcEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztzREFDVztJQUcvQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzBEQUNlO0lBR25DO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7NkRBQ2tCO0lBR3RDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7c0RBQ1c7SUFHL0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzs0REFDaUI7SUFHckM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzt5REFDYztJQUdsQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3lEQUNjO0lBR2xDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7d0RBQ2E7SUFHakM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzs0REFDaUI7SUFHckM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzttREFDUTtJQUc1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzJEQUNnQjtJQUdwQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzhEQUNtQjtJQUd2QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzZEQUNrQjtJQUd0QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzBEQUNlO0lBR25DO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7eURBQ2M7SUFHbEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztnREFDSztJQUd6QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzJEQUNnQjtJQUdwQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOytEQUNvQjtJQWpGdkIsWUFBWTtRQURoQyxPQUFPO09BQ2EsWUFBWSxDQXNvQmhDO0lBQUQsbUJBQUM7Q0F0b0JELEFBc29CQyxDQXRvQnlDLEVBQUUsQ0FBQyxTQUFTLEdBc29CckQ7a0JBdG9Cb0IsWUFBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTcGluZVBsYXllckN0cmwgZnJvbSBcIi4uLy4uLy4uL0Jhc2UvQ3VzdG9tQ29tcG9uZW50L1NwaW5lUGxheWVyQ3RybFwiO1xuaW1wb3J0IE0gZnJvbSBcIi4uLy4uLy4uL0Jhc2UvTWFuYWdlci9NXCI7XG5pbXBvcnQgeyBOb2RlUG9vbEtleSwgQ2VsbFR5cGUsIENvbWJvTGV2ZWwsIEdyb3VuZFR5cGUsIFNjb3JlQ29uZmlnLCBVcEdyb3VuZFR5cGUgfSBmcm9tICcuLi8uLi9EYXRhL0NvbnN0L0NvbnN0YW50JztcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSBcIi4uLy4uL0RhdGEvQ29uc3QvRXZlbnRcIjtcbmltcG9ydCB7IEdhcFRpbWUgfSBmcm9tIFwiLi4vLi4vRGF0YS9Db25zdC9UaW1lQ29uZmlnXCI7XG5pbXBvcnQgQ29tbW9uIGZyb20gXCIuLi8uLi9Db21tb24vQ29tbW9uXCI7XG5pbXBvcnQgeyBDZWxsTW9kZWwgfSBmcm9tIFwiLi4vTW9kZWwvQ2VsbE1vZGVsXCI7XG5pbXBvcnQgeyBBdWRpb0lEIH0gZnJvbSBcIi4uLy4uL0NvbW1vbi9BdWRpb0N0cmxcIjtcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVmZkxheWVyQ3RybCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIGJvbWJFZmZQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIGxpdHRsZUJvbWJQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIG1lcmdlQm9tYlByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXG4gICAgY29tYm9QcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIHJvd0NvbEJvbWJQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIGZpc2hCb21iUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcbiAgICByYWluYm93Qm9tYlByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXG4gICAgc2hvb3RTdGFyUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcbiAgICBoYWltYVNob290T3ZlckVmZjogY2MuUHJlZmFiID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXG4gICAgenlKdW1wUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcbiAgICB6eUp1bXBPdmVyUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcbiAgICB6eUp1bXBFbGltYXRlUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcbiAgICBicm9rZW5QcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIExlYXZlc0Jyb2tlblByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXG4gICAgYm94QnJva2VuUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcbiAgICBvdmVyU2hvb3RQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIGFkZFNjb3JlUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcbiAgICBhZGRTY29yZU92ZXJQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIGRvdFByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXG4gICAgYm9tYkFuZEJvbWJQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIGhhaW1hQW5kSGV0dWFuUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcbiAgICBoYWltYUFuZEhhaW1hUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcbiAgICB6aGFuZ3l1QW5kSmlhbnl1OiBjYy5QcmVmYWIgPSBudWxsOy8v56ug6bG8K+WJkemxvO+8jOeroOmxvCvmsJTms6HpsbxcblxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXG4gICAgaGV0dWFuQW5kSmlhbnl1OiBjYy5QcmVmYWIgPSBudWxsOy8v5rCU5rOh6bG8K+WJkemxvO+8jOWJkemxvCvliZHpsbxcblxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXG4gICAgY2h1aXppOiBjYy5QcmVmYWIgPSBudWxsOy8v6ZSk5a2QXG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIGJvbWJBbmRGaXNoUHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcbiAgICBoYWltYUFuZFpoYW5neXVQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XG5cbiAgICBwcml2YXRlIF90bXBTaG9vdFN0YXI6IEFycmF5PGNjLk5vZGU+ID0gW107XG4gICAgcHJpdmF0ZSBfdG1wU2hvb3RPdmVyOiBBcnJheTxjYy5Ob2RlPiA9IFtdO1xuXG4gICAgcHVibGljIHN0YXRpYyBpbnM6IEVmZkxheWVyQ3RybCA9IG51bGw7XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIEVmZkxheWVyQ3RybC5pbnMgPSB0aGlzO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnQoKTtcbiAgICAgICAgdGhpcy5fcHJlTG9hZE5vZGVQb29sKCk7XG4gICAgICAgIHRoaXMubm9kZS56SW5kZXggPSAxMDA7XG4gICAgfVxuXG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnJlbW92ZUV2ZW50KCk7XG4gICAgICAgIE0ubm9kZVBvb2wuZGVzdG9yeSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3ByZUxvYWROb2RlUG9vbCgpIHtcbiAgICAgICAgLy/ov5nph4zlj6/ku6XlgZrnsr7nu4bljJbliqDovb0uLi4uLlxuICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoRGF0ZS5ub3coKSk7XG4gICAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIE0ubm9kZVBvb2wuY3JlYXRlKE5vZGVQb29sS2V5LkhhaW1hQW5kWmhhbmd5dSwgdGhpcy5oYWltYUFuZFpoYW5neXVQcmVmYWIsIDUpO1xuICAgICAgICAvL2NvbnNvbGUuZXJyb3IoRGF0ZS5ub3coKSAtIG5vdyk7XG4gICAgICAgIE0ubm9kZVBvb2wuY3JlYXRlKE5vZGVQb29sS2V5LkJvbWJBbmRGaXNoLCB0aGlzLmJvbWJBbmRGaXNoUHJlZmFiLCA1KTtcbiAgICAgICAvLyBjb25zb2xlLmVycm9yKERhdGUubm93KCkgLSBub3cpO1xuICAgICAgICBNLm5vZGVQb29sLmNyZWF0ZShOb2RlUG9vbEtleS5Cb21iQW5kQm9tYiwgdGhpcy5ib21iQW5kQm9tYlByZWZhYiwgNSk7XG4gICAgICAgIC8vY29uc29sZS5lcnJvcihEYXRlLm5vdygpIC0gbm93KTtcbiAgICAgICAgTS5ub2RlUG9vbC5jcmVhdGUoTm9kZVBvb2xLZXkuTWVyZ2VCb21iLCB0aGlzLm1lcmdlQm9tYlByZWZhYiwgMjApO1xuICAgICAgICAvL2NvbnNvbGUuZXJyb3IoRGF0ZS5ub3coKSAtIG5vdyk7XG4gICAgICAgIE0ubm9kZVBvb2wuY3JlYXRlKE5vZGVQb29sS2V5LkxpdHRsZUJvbWIsIHRoaXMubGl0dGxlQm9tYlByZWZhYiwgNTApO1xuICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoRGF0ZS5ub3coKSAtIG5vdyk7XG4gICAgICAgIE0ubm9kZVBvb2wuY3JlYXRlKE5vZGVQb29sS2V5LkJyb2tlbiwgdGhpcy5icm9rZW5QcmVmYWIsIDUwKTtcbiAgICAgICAvLyBjb25zb2xlLmVycm9yKERhdGUubm93KCkgLSBub3cpO1xuICAgICAgICBNLm5vZGVQb29sLmNyZWF0ZShOb2RlUG9vbEtleS5MZWFmQnJva2VuLCB0aGlzLkxlYXZlc0Jyb2tlblByZWZhYiwgMjApO1xuICAgICAgICAvL2NvbnNvbGUuZXJyb3IoRGF0ZS5ub3coKSAtIG5vdyk7XG4gICAgICAgIE0ubm9kZVBvb2wuY3JlYXRlKE5vZGVQb29sS2V5LkJvbWJFZmYsIHRoaXMuYm9tYkVmZlByZWZhYiwgMjApO1xuICAgICAgICAvL2NvbnNvbGUuZXJyb3IoRGF0ZS5ub3coKSAtIG5vdyk7XG4gICAgICAgIE0ubm9kZVBvb2wuY3JlYXRlKE5vZGVQb29sS2V5LlJvd0NvbEVmZiwgdGhpcy5yb3dDb2xCb21iUHJlZmFiLCAyMCk7XG4gICAgICAgIC8vY29uc29sZS5lcnJvcihEYXRlLm5vdygpIC0gbm93KTtcbiAgICAgICAgTS5ub2RlUG9vbC5jcmVhdGUoTm9kZVBvb2xLZXkuWnlKdW1wRWxpbWF0ZSwgdGhpcy56eUp1bXBFbGltYXRlUHJlZmFiLCAyMCk7XG4gICAgICAgIC8vY29uc29sZS5lcnJvcihEYXRlLm5vdygpIC0gbm93KTtcbiAgICAgICAgTS5ub2RlUG9vbC5jcmVhdGUoTm9kZVBvb2xLZXkuWnlKdW1wT3ZlciwgdGhpcy56eUp1bXBPdmVyUHJlZmFiLCAyMCk7XG4gICAgICAgLy8gY29uc29sZS5lcnJvcihEYXRlLm5vdygpIC0gbm93KTtcbiAgICAgICAgTS5ub2RlUG9vbC5jcmVhdGUoTm9kZVBvb2xLZXkuSGFpTWFPdmVyLCB0aGlzLmhhaW1hU2hvb3RPdmVyRWZmLCAyMCk7XG4gICAgICAgLy8gY29uc29sZS5lcnJvcihEYXRlLm5vdygpIC0gbm93KTtcbiAgICAgICAgTS5ub2RlUG9vbC5jcmVhdGUoTm9kZVBvb2xLZXkuQWRkU2NvcmVPdmVyRWZmLCB0aGlzLmFkZFNjb3JlT3ZlclByZWZhYiwgMjApO1xuICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoRGF0ZS5ub3coKSAtIG5vdyk7XG4gICAgICAgIE0ubm9kZVBvb2wuY3JlYXRlKE5vZGVQb29sS2V5LkFkZFNjb3JlRWZmLCB0aGlzLmFkZFNjb3JlUHJlZmFiLCA1MCk7XG4gICAgICAgIC8vY29uc29sZS5lcnJvcihEYXRlLm5vdygpIC0gbm93KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlZ2lzdGVyRXZlbnQoKSB7XG4gICAgICAgIE0uZXZlbnQucmVnaXN0ZXIoRXZlbnQuRWZmZWN0LkxpdHRsZUJvbWIsIHRoaXMucGxheUxpdHRsZUJvbWIsIHRoaXMpO1xuICAgICAgICBNLmV2ZW50LnJlZ2lzdGVyKEV2ZW50LkVmZmVjdC5TcGVlZExpbmUsIHRoaXMucGxheVNwZWVkTGluZSwgdGhpcyk7XG4gICAgICAgIE0uZXZlbnQucmVnaXN0ZXIoRXZlbnQuRWZmZWN0LlNob290U3RhciwgdGhpcy5vblNob290U3RhciwgdGhpcyk7XG4gICAgICAgIE0uZXZlbnQucmVnaXN0ZXIoRXZlbnQuRWZmZWN0Lk92ZXJTaG9vdCwgdGhpcy5vdmVyU2hvb3QsIHRoaXMpO1xuICAgICAgICBNLmV2ZW50LnJlZ2lzdGVyKEV2ZW50LkVmZmVjdC5Db21ibywgdGhpcy5wbGF5Q29tYm9FZmYsIHRoaXMpO1xuICAgICAgICBNLmV2ZW50LnJlZ2lzdGVyKEV2ZW50LkVmZmVjdC5Ccm9rZW4sIHRoaXMucGxheUJyb2tlbkVmZiwgdGhpcyk7XG4gICAgICAgIE0uZXZlbnQucmVnaXN0ZXIoRXZlbnQuRWZmZWN0LkNvbGxlY3RPdmVyLCB0aGlzLm5vcm1hbENvbGxlY3RPdmVyRWZmLCB0aGlzKTtcbiAgICAgICAgTS5ldmVudC5yZWdpc3RlcihFdmVudC5FZmZlY3QuQWRkU2NvcmUsIHRoaXMucGxheUFkZFNjb3JlRWZmLCB0aGlzKTtcbiAgICAgICAgLy8gTS5ldmVudC5yZWdpc3RlcihFdmVudC5FZmZlY3QuU2hvd0RvdCwgdGhpcy5vblNob3dEb3QsIHRoaXMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVtb3ZlRXZlbnQoKSB7XG4gICAgICAgIE0uZXZlbnQudW5SZWdpc3RlcihFdmVudC5FZmZlY3QuTGl0dGxlQm9tYiwgdGhpcy5wbGF5TGl0dGxlQm9tYiwgdGhpcyk7XG4gICAgICAgIE0uZXZlbnQudW5SZWdpc3RlcihFdmVudC5FZmZlY3QuU3BlZWRMaW5lLCB0aGlzLnBsYXlTcGVlZExpbmUsIHRoaXMpO1xuICAgICAgICBNLmV2ZW50LnVuUmVnaXN0ZXIoRXZlbnQuRWZmZWN0Lk92ZXJTaG9vdCwgdGhpcy5vdmVyU2hvb3QsIHRoaXMpO1xuICAgICAgICBNLmV2ZW50LnVuUmVnaXN0ZXIoRXZlbnQuRWZmZWN0LlNob290U3RhciwgdGhpcy5vblNob290U3RhciwgdGhpcyk7XG4gICAgICAgIE0uZXZlbnQudW5SZWdpc3RlcihFdmVudC5FZmZlY3QuQ29tYm8sIHRoaXMucGxheUNvbWJvRWZmLCB0aGlzKTtcbiAgICAgICAgTS5ldmVudC51blJlZ2lzdGVyKEV2ZW50LkVmZmVjdC5Ccm9rZW4sIHRoaXMucGxheUJyb2tlbkVmZiwgdGhpcyk7XG4gICAgICAgIE0uZXZlbnQudW5SZWdpc3RlcihFdmVudC5FZmZlY3QuQWRkU2NvcmUsIHRoaXMucGxheUFkZFNjb3JlRWZmLCB0aGlzKTtcbiAgICAgICAgTS5ldmVudC51blJlZ2lzdGVyKEV2ZW50LkVmZmVjdC5Db2xsZWN0T3ZlciwgdGhpcy5ub3JtYWxDb2xsZWN0T3ZlckVmZiwgdGhpcyk7XG4gICAgICAgIC8vIE0uZXZlbnQudW5SZWdpc3RlcihFdmVudC5FZmZlY3QuU2hvd0RvdCwgdGhpcy5vblNob3dEb3QsIHRoaXMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBwbGF5Q29tYm9FZmYobGV2ZWw6IG51bWJlcikge1xuICAgICAgICBjb25zdCBuYW1lID0gQ29tYm9MZXZlbFtsZXZlbF07XG4gICAgICAgIGlmIChuYW1lKSB7XG4gICAgICAgICAgICBjb25zdCBjb21ib05vZGUgPSBNLm5vZGVQb29sLmdldEl0ZW0oTm9kZVBvb2xLZXkuQ29tYm9FZmYsIHRoaXMuY29tYm9QcmVmYWIpO1xuICAgICAgICAgICAgY29tYm9Ob2RlLnBhcmVudCA9IHRoaXMubm9kZTtcbiAgICAgICAgICAgIGNvbnN0IGFuaW1hdGlvbiA9IGNvbWJvTm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcbiAgICAgICAgICAgIGFuaW1hdGlvbi5wbGF5KG5hbWUpO1xuICAgICAgICAgICAgYW5pbWF0aW9uLm9uKCdmaW5pc2hlZCcsIHRoaXMuZWZmQ29tcGxldGVkLmJpbmQodGhpcywgTm9kZVBvb2xLZXkuQ29tYm9FZmYsIGFuaW1hdGlvbiwgY29tYm9Ob2RlKSwgdGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBwcml2YXRlIG9uU2hvd0RvdCh0eXBlOiBFbGltYXRlVHlwZSwgc3RhcnRQb2ludDogY2MuVmVjMikge1xuICAgIC8vICAgICBsZXQgY291bnQgPSBVdGlsLlRvb2wucmFuZ2VJbnQoMiwgNSk7XG4gICAgLy8gICAgIGZvciAobGV0IGkgPSBjb3VudDsgaS0tOykge1xuICAgIC8vICAgICAgICAgY29uc3QgZG90Tm9kZSA9IE0ubm9kZVBvb2wuZ2V0SXRlbShOb2RlUG9vbEtleS5Eb3QsIHRoaXMuZG90UHJlZmFiKTtcbiAgICAvLyAgICAgICAgIGRvdE5vZGUucGFyZW50ID0gdGhpcy5ub2RlO1xuXG4gICAgLy8gICAgICAgICBkb3ROb2RlLnNldFNjYWxlKFV0aWwuVG9vbC5yYW5nZUludCgzLCA3KSAvIDEwKTtcbiAgICAvLyAgICAgICAgIGRvdE5vZGUuc2V0UG9zaXRpb24odGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHN0YXJ0UG9pbnQpKTtcbiAgICAvLyAgICAgICAgIGNvbnN0IHRhcmdldFBvcyA9IHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihDb21tb24uZ2V0V29ybGRQb3ModGhpcy5zY29yZUJhci5ub2RlKSkgYXMgY2MuVmVjMjtcbiAgICAvLyAgICAgICAgIGxldCBtb3ZlVGltZSA9IGRvdE5vZGUucG9zaXRpb24uc3ViKHRhcmdldFBvcykubWFnKCkgKiAoVXRpbC5Ub29sLnJhbmdlSW50KDEwLCAyMCkgLyAxMDAwMCk7XG5cbiAgICAvLyAgICAgICAgIGNvbnN0IGEwID0gY2MubW92ZVRvKG1vdmVUaW1lLCB0YXJnZXRQb3MpO1xuICAgIC8vICAgICAgICAgY29uc3QgYTEgPSBjYy5jYWxsRnVuYygoKSA9PiB7XG4gICAgLy8gICAgICAgICAgICAgTS5ub2RlUG9vbC5mcmVlSXRlbShOb2RlUG9vbEtleS5Eb3QsIGRvdE5vZGUpO1xuICAgIC8vICAgICAgICAgfSlcbiAgICAvLyAgICAgICAgIGRvdE5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGEwLCBhMSkpO1xuXG4gICAgLy8gICAgICAgICBpZiAodHlwZSAhPSBFbGltYXRlVHlwZS5EZWZhdWx0KSB7XG4gICAgLy8gICAgICAgICAgICAgTS5ldmVudC5zZW5kKEV2ZW50LlVJLkFkZFNjb3JlLCBTY29yZUNvbmZpZy5TaW5nbGVFbGltYXRlW3R5cGVdLCBzdGFydFBvaW50KVxuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9XG4gICAgLy8gfVxuXG4gICAgcHJpdmF0ZSBlZmZDb21wbGV0ZWQoa2V5LCBhbmltLCBjb21ib05vZGUpIHtcbiAgICAgICAgYW5pbS5vZmYoJ2ZpbmlzaGVkJywgdGhpcy5lZmZDb21wbGV0ZWQsIHRoaXMpO1xuICAgICAgICBNLm5vZGVQb29sLmZyZWVJdGVtKGtleSwgY29tYm9Ob2RlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHBsYXlBZGRTY29yZUVmZihzY29yZTogbnVtYmVyLCBwb3M6IGNjLlZlYzIsIGlzT3ZlcjogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgICAgIGxldCBub2RlOiBjYy5Ob2RlID0gbnVsbDtcbiAgICAgICAgaWYgKGlzT3Zlcikge1xuICAgICAgICAgICAgLy8gcG9zID0gdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHBvcykgYXMgY2MuVmVjMjtcbiAgICAgICAgICAgIG5vZGUgPSBNLm5vZGVQb29sLmdldEl0ZW0oTm9kZVBvb2xLZXkuQWRkU2NvcmVPdmVyRWZmLCB0aGlzLmFkZFNjb3JlT3ZlclByZWZhYik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwb3MgPSB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIocG9zKSBhcyBjYy5WZWMyO1xuICAgICAgICAgICAgcG9zID0gcG9zLmFkZChjYy52MigtQ29tbW9uLkdSSURfVyAvIDQsIENvbW1vbi5HUklEX0ggLyAyKSk7XG4gICAgICAgICAgICBub2RlID0gTS5ub2RlUG9vbC5nZXRJdGVtKE5vZGVQb29sS2V5LkFkZFNjb3JlRWZmLCB0aGlzLmFkZFNjb3JlUHJlZmFiKTtcbiAgICAgICAgfVxuICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMubm9kZTtcbiAgICAgICAgbm9kZS5vcGFjaXR5ID0gMjU1O1xuICAgICAgICBub2RlLnNldEFuY2hvclBvaW50KGNjLnYyKDEsIDApKVxuICAgICAgICBub2RlLnNldFBvc2l0aW9uKHBvcyk7XG4gICAgICAgIGlmIChpc092ZXIpIHtcbiAgICAgICAgICAgIG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3Njb3JlJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBzY29yZS50b1N0cmluZygpO1xuICAgICAgICAgICAgY29uc3QgYW5pbWF0aW9uID0gbm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcbiAgICAgICAgICAgIGFuaW1hdGlvbi5wbGF5KCk7XG4gICAgICAgICAgICAvLyBhbmltYXRpb24ub24oJ2ZpbmlzaGVkJywgdGhpcy5lZmZDb21wbGV0ZWQuYmluZCh0aGlzLCBOb2RlUG9vbEtleS5BZGRTY29yZUVmZk92ZXIsIGFuaW1hdGlvbiwgbm9kZSksIHRoaXMpO1xuICAgICAgICAgICAgY29uc3QgYTEgPSBjYy5kZWxheVRpbWUoMC41KTtcbiAgICAgICAgICAgIGNvbnN0IGEyID0gY2MuZmFkZU91dCgwLjUpO1xuICAgICAgICAgICAgY29uc3QgYTMgPSBjYy5jYWxsRnVuYygoKSA9PiB7XG4gICAgICAgICAgICAgICAgTS5ub2RlUG9vbC5mcmVlSXRlbShOb2RlUG9vbEtleS5BZGRTY29yZU92ZXJFZmYsIG5vZGUpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIG5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGExLCBhMiwgYTMpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBzY29yZS50b1N0cmluZygpO1xuICAgICAgICAgICAgY29uc3QgYTEgPSBjYy5zY2FsZVRvKDAuMiwgMS4yKTtcbiAgICAgICAgICAgIGNvbnN0IGEyID0gY2Muc2NhbGVUbygwLjIsIDEpO1xuICAgICAgICAgICAgY29uc3QgYTMgPSBjYy5tb3ZlQnkoMC4zLCBjYy52MigwLCAzMCkpO1xuICAgICAgICAgICAgY29uc3QgYTQgPSBjYy5mYWRlT3V0KDAuMik7XG4gICAgICAgICAgICBjb25zdCBhNSA9IGNjLmNhbGxGdW5jKCgpID0+IHtcbiAgICAgICAgICAgICAgICBNLm5vZGVQb29sLmZyZWVJdGVtKE5vZGVQb29sS2V5LkFkZFNjb3JlRWZmLCBub2RlKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShhMSwgYTIsIGEzLCBhNCwgYTUpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBwbGF5WnlKdW1wKHN0YXJ0UG9zOiBjYy5WZWMyLCB0YXJnZXRQb3M6IGNjLlZlYzIsIGNhbGxiYWNrPzogRnVuY3Rpb24sIGNvbnZlVHlwZT86IENlbGxUeXBlKSB7XG4gICAgICAgIHN0YXJ0UG9zID0gdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHN0YXJ0UG9zKSBhcyBjYy5WZWMyO1xuICAgICAgICB0YXJnZXRQb3MgPSB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIodGFyZ2V0UG9zKSBhcyBjYy5WZWMyO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsYXlaeUp1bXBFbGlhbXRlRWZmKHN0YXJ0UG9zKTtcbiAgICAgICAgICAgIE0uZXZlbnQuc2VuZChFdmVudC5Tb3VuZC5QbGF5U291bmRFZmYsIEF1ZGlvSUQuT2N0b3B1cyk7XG4gICAgICAgIH0sIDApO1xuICAgICAgICBjb25zdCBlZmYgPSB0aGlzLmNyZWF0ZVNwaW5lTm9kZShOb2RlUG9vbEtleS5aeUp1bXAsIHRoaXMuenlKdW1wUHJlZmFiLCBzdGFydFBvcyk7XG5cblxuICAgICAgICB2YXIgYW5pbU5hbWUgPSBcInpoYW5neXVfdGlhb1wiO1xuICAgICAgICBpZiAoY29udmVUeXBlID09IENlbGxUeXBlLkJvbWIyKSB7XG4gICAgICAgICAgICAvL+eroOmxvCvliZHpsbxcbiAgICAgICAgICAgIGFuaW1OYW1lID0gXCJ6aGFuZ3l1X3RpYW9famlhbnl1XCI7XG4gICAgICAgIH0gZWxzZSBpZiAoY29udmVUeXBlID09IENlbGxUeXBlLkJvbWIxKSB7XG4gICAgICAgICAgICAvL+eroOmxvCvmsJTms6HpsbxcbiAgICAgICAgICAgIGFuaW1OYW1lID0gXCJ6aGFuZ3l1X3RpYW9faGV0dW5cIjtcbiAgICAgICAgfVxuICAgICAgICBlZmYuY3RybC5wbGF5KGFuaW1OYW1lLCAwLCBmYWxzZSwgKCkgPT4geyB9KTtcblxuICAgICAgICBjb25zdCB0bXB4ID0gTWF0aC5hYnMoTWF0aC5hYnMoc3RhcnRQb3MueCkgLSBNYXRoLmFicyh0YXJnZXRQb3MueCkpIC8gMjtcbiAgICAgICAgY29uc3QgdG1weSA9IChzdGFydFBvcy55ID4gdGFyZ2V0UG9zLnkgPyBzdGFydFBvcy55IDogdGFyZ2V0UG9zLnkpICsgNDAwO1xuICAgICAgICBjb25zdCBjZW50ZXJQb3MgPSBjYy52MihzdGFydFBvcy54ID4gdGFyZ2V0UG9zLnggPyAtdG1weCA6IHRtcHgsIHRtcHkpO1xuXG4gICAgICAgIGNvbnN0IGEwID0gY2MuZGVsYXlUaW1lKDAuMik7XG4gICAgICAgIGNvbnN0IGExID0gY2MuYmV6aWVyVG8oR2FwVGltZS5PY3RvcHVzSnVtcFNwZWVkLCBbc3RhcnRQb3MsIGNlbnRlclBvcywgdGFyZ2V0UG9zXSk7XG4gICAgICAgIGNvbnN0IGEyID0gY2MuY2FsbEZ1bmMoKCkgPT4ge1xuICAgICAgICAgICAgTS5ub2RlUG9vbC5mcmVlSXRlbShOb2RlUG9vbEtleS5aeUp1bXAsIGVmZi5ub2RlKTtcbiAgICAgICAgICAgIGNvbnN0IGJvbWIgPSB0aGlzLmNyZWF0ZVNwaW5lTm9kZShOb2RlUG9vbEtleS5aeUp1bXBPdmVyLCB0aGlzLnp5SnVtcE92ZXJQcmVmYWIsIHRhcmdldFBvcyk7XG4gICAgICAgICAgICBib21iLmN0cmwucGxheSgnRlhfemhhbmd5dV94aWFvY2h1JywgMCwgZmFsc2UsICgpID0+IHtcbiAgICAgICAgICAgICAgICBNLm5vZGVQb29sLmZyZWVJdGVtKE5vZGVQb29sS2V5Llp5SnVtcE92ZXIsIGJvbWIubm9kZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XG4gICAgICAgIH0sIHRoaXMpXG4gICAgICAgIGVmZi5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShhMCwgYTEsIGEyKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwbGF5WnlKdW1wRWxpYW10ZUVmZihzdGFydFBvczogY2MuVmVjMiB8IGNjLlZlYzMpIHtcbiAgICAgICAgY29uc3QgZWZmID0gdGhpcy5jcmVhdGVTcGluZU5vZGUoTm9kZVBvb2xLZXkuWnlKdW1wRWxpbWF0ZSwgdGhpcy56eUp1bXBFbGltYXRlUHJlZmFiLCBzdGFydFBvcyk7XG4gICAgICAgIGVmZi5ub2RlLnpJbmRleCA9IC0xO1xuICAgICAgICBlZmYuY3RybC5wbGF5KCd6aGFuZ3l1X3RpYW9GWCcsIDAsIGZhbHNlLCAoKSA9PiB7XG4gICAgICAgICAgICBNLm5vZGVQb29sLmZyZWVJdGVtKE5vZGVQb29sS2V5Llp5SnVtcEVsaW1hdGUsIGVmZi5ub2RlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIHBsYXlCcm9rZW5FZmYocG9zOiBjYy5WZWMyLCBjYWxsYmFjazogRnVuY3Rpb24sIHR5cGU/LCBuYW1lPykge1xuICAgICAgICBsZXQga2V5ID0gTm9kZVBvb2xLZXkuQnJva2VuO1xuICAgICAgICBsZXQgcHJlZmFiID0gdGhpcy5icm9rZW5QcmVmYWI7XG4gICAgICAgIGxldCBwbGF5TmFtZTogc3RyaW5nID0gJ3Rvbmd5b2dfcG9zdWknO1xuICAgICAgICBsZXQgZWZmID0gbnVsbDtcbiAgICAgICAgaWYgKHR5cGUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlID09IEdyb3VuZFR5cGUuTGVhdmVzKSB7XG4gICAgICAgICAgICAgICAga2V5ID0gTm9kZVBvb2xLZXkuTGVhZkJyb2tlbjtcbiAgICAgICAgICAgICAgICBwcmVmYWIgPSB0aGlzLkxlYXZlc0Jyb2tlblByZWZhYjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PSBVcEdyb3VuZFR5cGUuQm94KSB7XG4gICAgICAgICAgICAgICAga2V5ID0gTm9kZVBvb2xLZXkuQm94QnJva2VuXG4gICAgICAgICAgICAgICAgcHJlZmFiID0gdGhpcy5ib3hCcm9rZW5QcmVmYWI7XG4gICAgICAgICAgICAgICAgcGxheU5hbWUgPSBuYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlID09IFVwR3JvdW5kVHlwZS5Cb3gpIHtcbiAgICAgICAgICAgIGVmZiA9IHRoaXMuY3JlYXRlRWZmUHJlZmFiKGtleSwgcHJlZmFiLCB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIocG9zKSlcbiAgICAgICAgICAgIGVmZi5jdHJsLnBsYXkocGxheU5hbWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWZmID0gdGhpcy5jcmVhdGVTcGluZU5vZGUoa2V5LCBwcmVmYWIsIHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihwb3MpKTtcbiAgICAgICAgICAgIGVmZi5jdHJsLnBsYXkocGxheU5hbWUsIDAsIGZhbHNlLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgTS5ub2RlUG9vbC5mcmVlSXRlbShrZXksIGVmZi5ub2RlKTtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgcGxheVJvd0NvbEVmZih0eXBlOiBDZWxsVHlwZSwgY2VudGVyUG9zOiBjYy5WZWMyKSB7XG4gICAgICAgIGxldCBhbmdsZSA9IDA7XG4gICAgICAgIGlmICh0eXBlID09IENlbGxUeXBlLkJvbWIzKSB7XG4gICAgICAgICAgICAvL+erllxuICAgICAgICAgICAgYW5nbGUgPSA5MDtcbiAgICAgICAgfVxuICAgICAgICBjZW50ZXJQb3MgPSB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIoY2VudGVyUG9zKSBhcyBjYy5WZWMyXG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmNyZWF0ZVNwaW5lTm9kZShOb2RlUG9vbEtleS5Sb3dDb2xFZmYsIHRoaXMucm93Q29sQm9tYlByZWZhYiwgY2VudGVyUG9zKTtcbiAgICAgICAgaXRlbS5ub2RlLmFuZ2xlID0gYW5nbGU7XG4gICAgICAgIGl0ZW0uY3RybC5wbGF5KCdoZW5nc3VkYW5fZmFzaGUnLCAwLCBmYWxzZSwgKCkgPT4ge1xuICAgICAgICAgICAgTS5ub2RlUG9vbC5mcmVlSXRlbShOb2RlUG9vbEtleS5Sb3dDb2xFZmYsIGl0ZW0ubm9kZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBwbGF5RmlzaEJvbWJFZmYocG9zOiBjYy5WZWMyKSB7XG4gICAgICAgIHBvcyA9IHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihwb3MpIGFzIGNjLlZlYzJcbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuY3JlYXRlU3BpbmVOb2RlKE5vZGVQb29sS2V5LkZpc2hCb21iRWZmLCB0aGlzLmZpc2hCb21iUHJlZmFiLCBwb3MpO1xuICAgICAgICBpdGVtLmN0cmwucGxheSgnYmFvemhheXVfYm9tJywgMCwgZmFsc2UsICgpID0+IHtcbiAgICAgICAgICAgIE0ubm9kZVBvb2wuZnJlZUl0ZW0oTm9kZVBvb2xLZXkuRmlzaEJvbWJFZmYsIGl0ZW0ubm9kZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8v5pKt5pS+6YGT5YW3MuWQiDHml7bnmoQg5Yqo55S7XG4gICAgcHVibGljIHBsYXlJdGVtSGV0aShwb3M6IGNjLlZlYzIsIGtleTogTm9kZVBvb2xLZXksIHByZWZhYjogY2MuUHJlZmFiLCBhbmltTmFtZTogc3RyaW5nLCBpc05lZWRQbGF5Qm9tYkVmZjogYm9vbGVhbiA9IHRydWUpIHtcbiAgICAgICAgLy/kvY3nva4g5pa55ZCRLumDvemcgOimgeiuoeeulyBcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5jcmVhdGVTcGluZU5vZGUoa2V5LCBwcmVmYWIsIHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihwb3MpKTtcbiAgICAgICAgICAgIGNjLmxvZyhcIuaSreaUvumBk+WFtzLlkIgx5pe255qE5Yqo55S777yM5Yqo55S75ZCN56ewOiBcIiArIGFuaW1OYW1lKTtcbiAgICAgICAgICAgIGl0ZW0uY3RybC5wbGF5KGFuaW1OYW1lLCAwLCBmYWxzZSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpc05lZWRQbGF5Qm9tYkVmZiA9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy5wbGF5Qm9tYkVmZigwLCBwb3MsIDEuNSk7XG4gICAgICAgICAgICAgICAgICAgIC8vY2MubG9nKFwicGxheUJvbWJFZmZcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIE0ubm9kZVBvb2wuZnJlZUl0ZW0oa2V5LCBpdGVtLm5vZGUpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgIH1cblxuXG4gICAgLy/nq6Dpsbwr566t6bG8XG4gICAgcHVibGljIHBsYXlaaGFuZ3l1QW5kSmlhbnl1KGFuaW1OYW1lOiBzdHJpbmcsIHBvczogY2MuVmVjMiwgdGFyZ2V0UG9zOiBjYy5WZWMyLCBmdW46IEZ1bmN0aW9uKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuY3JlYXRlU3BpbmVOb2RlKE5vZGVQb29sS2V5LlpoYW5neXVBbmRKaWFueXUsIHRoaXMuemhhbmd5dUFuZEppYW55dSwgdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHBvcykpO1xuXG4gICAgICAgICAgICBjYy5sb2coXCLot7Pot4PliqjnlLvlkI3np7A6IFwiICsgYW5pbU5hbWUpXG5cbiAgICAgICAgICAgIC8vIOWIm+W7uuS4gOS4quenu+WKqOWKqOS9nFxuICAgICAgICAgICAgdmFyIGExID0gY2MubW92ZVRvKDAuMiwgMTUwLCAzMDApO1xuXG4gICAgICAgICAgICBpdGVtLmN0cmwuc2NoZWR1bGVPbmNlKHJlc29sdmUsIDAuMilcbiAgICAgICAgICAgIGl0ZW0uY3RybC5wbGF5KGFuaW1OYW1lLCAwLCBmYWxzZSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vTS5ub2RlUG9vbC5mcmVlSXRlbShOb2RlUG9vbEtleS5aaGFuZ3l1QW5kSmlhbnl1LCBpdGVtLm5vZGUpO1xuICAgICAgICAgICAgICAgIC8vcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNvbnN0IGEyID0gY2MuZGVsYXlUaW1lKDAuMik7XG4gICAgICAgICAgICB2YXIgYTMgPSBjYy5tb3ZlVG8oMC41LCB0YXJnZXRQb3MpO1xuXG4gICAgICAgICAgICB2YXIgYTQgPSBjYy5jYWxsRnVuYygoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGZ1bikge1xuICAgICAgICAgICAgICAgICAgICAvL2NjLmxvZyhcIuWIm+W7uuebruagh+eCuOW8uVwiKVxuICAgICAgICAgICAgICAgICAgICBmdW4oKTtcbiAgICAgICAgICAgICAgICAgICAgTS5ub2RlUG9vbC5mcmVlSXRlbShOb2RlUG9vbEtleS5aaGFuZ3l1QW5kSmlhbnl1LCBpdGVtLm5vZGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdGVtLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGExLCBhMiwgYTMsIGE0KSk7XG4gICAgICAgIH0pXG4gICAgfVxuXG5cbiAgICAvL+eroOmxvCvnq6DpsbxcbiAgICBwdWJsaWMgcGxheVpoYW5neXVBbmRaaGFuZ3l1KHBvczogY2MuVmVjMikge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmNyZWF0ZVNwaW5lTm9kZShOb2RlUG9vbEtleS5IYWltYUFuZEhldHVuLCB0aGlzLmhhaW1hQW5kSGV0dWFuUHJlZmFiLCB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIocG9zKSk7XG4gICAgICAgICAgICBpdGVtLmN0cmwuc2NoZWR1bGVPbmNlKHJlc29sdmUsIDAuNilcbiAgICAgICAgICAgIGl0ZW0uY3RybC5wbGF5KCd6aGFuZ3l1Wmhhbmd5dScsIDAsIGZhbHNlLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgTS5ub2RlUG9vbC5mcmVlSXRlbShOb2RlUG9vbEtleS5IYWltYUFuZEhldHVuLCBpdGVtLm5vZGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgfVxuXG5cbiAgICAvL+mUpOWtkOWKqOeUu1xuICAgIHB1YmxpYyBwbGF5Q2h1aXppKHBvczogY2MuVmVjMikge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmNyZWF0ZVNwaW5lTm9kZShOb2RlUG9vbEtleS5DaHVpemksIHRoaXMuY2h1aXppLCB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIocG9zKSk7XG4gICAgICAgICAgICAvL2l0ZW0uY3RybC5zY2hlZHVsZU9uY2UocmVzb2x2ZSwgMC42KVxuICAgICAgICAgICAgaXRlbS5jdHJsLnBsYXkoJ2FuaW1hdGlvbicsIDAsIGZhbHNlLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgTS5ub2RlUG9vbC5mcmVlSXRlbShOb2RlUG9vbEtleS5DaHVpemksIGl0ZW0ubm9kZSk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcHVibGljIHBsYXlIYWltYUFuZFpoYW5neXUocG9zOiBjYy5WZWMyKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuY3JlYXRlU3BpbmVOb2RlKE5vZGVQb29sS2V5LkhhaW1hQW5kWmhhbmd5dSwgdGhpcy5oYWltYUFuZFpoYW5neXVQcmVmYWIsIHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihwb3MpKTtcbiAgICAgICAgICAgIC8vIGl0ZW0uY3RybC5zY2hlZHVsZU9uY2UocmVzb2x2ZSwgMSlcbiAgICAgICAgICAgIGl0ZW0uY3RybC5wbGF5KCdoZXR1bkhhaW1hJywgMCwgZmFsc2UsICgpID0+IHtcbiAgICAgICAgICAgICAgICBNLm5vZGVQb29sLmZyZWVJdGVtKE5vZGVQb29sS2V5LkhhaW1hQW5kWmhhbmd5dSwgaXRlbS5ub2RlKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBwdWJsaWMgcGxheUhhaW1hQW5kSGFpbWEocG9zOiBjYy5WZWMyKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuY3JlYXRlU3BpbmVOb2RlKE5vZGVQb29sS2V5LkhhaW1hQW5kSGFpbWEsIHRoaXMuaGFpbWFBbmRIYWltYVByZWZhYiwgdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHBvcykpO1xuICAgICAgICAgICAgaXRlbS5jdHJsLnNjaGVkdWxlT25jZShyZXNvbHZlLCA0KTtcbiAgICAgICAgICAgIGl0ZW0uY3RybC5wbGF5KCdoYWltYUhhaW1hJywgMCwgZmFsc2UsICgpID0+IHtcbiAgICAgICAgICAgICAgICBNLm5vZGVQb29sLmZyZWVJdGVtKE5vZGVQb29sS2V5LkhhaW1hQW5kSGFpbWEsIGl0ZW0ubm9kZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIHBsYXlGaXNoQW5kRmlzaChwb3M6IGNjLlZlYzIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5jcmVhdGVTcGluZU5vZGUoTm9kZVBvb2xLZXkuQm9tYkFuZEZpc2gsIHRoaXMuYm9tYkFuZEZpc2hQcmVmYWIsIHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihwb3MpKTtcbiAgICAgICAgICAgIGl0ZW0uY3RybC5zY2hlZHVsZU9uY2UocmVzb2x2ZSwgMSlcbiAgICAgICAgICAgIGl0ZW0uY3RybC5wbGF5KCdqaWFueXVKaWFueXUnLCAwLCBmYWxzZSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIE0ubm9kZVBvb2wuZnJlZUl0ZW0oTm9kZVBvb2xLZXkuQm9tYkFuZEZpc2gsIGl0ZW0ubm9kZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBwdWJsaWMgcGxheUJvbWJBbmRGaXNoKHBvczogY2MuVmVjMikge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmNyZWF0ZVNwaW5lTm9kZShOb2RlUG9vbEtleS5Cb21iQW5kRmlzaCwgdGhpcy5ib21iQW5kRmlzaFByZWZhYiwgdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHBvcykpO1xuICAgICAgICAgICAgaXRlbS5jdHJsLnNjaGVkdWxlT25jZShyZXNvbHZlLCAxKVxuICAgICAgICAgICAgaXRlbS5jdHJsLnBsYXkoJ2ppYW55dUhldHVuJywgMCwgZmFsc2UsICgpID0+IHtcbiAgICAgICAgICAgICAgICBNLm5vZGVQb29sLmZyZWVJdGVtKE5vZGVQb29sS2V5LkJvbWJBbmRGaXNoLCBpdGVtLm5vZGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcHVibGljIHBsYXlCb21iQW5kQm9tYihwb3M6IGNjLlZlYzIpIHtcbiAgICAgICAgLy/kvY3nva4g5pa55ZCRLumDvemcgOimgeiuoeeulyBcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5jcmVhdGVTcGluZU5vZGUoTm9kZVBvb2xLZXkuQm9tYkFuZEJvbWIsIHRoaXMuYm9tYkFuZEJvbWJQcmVmYWIsIHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihwb3MpKTtcbiAgICAgICAgICAgIGl0ZW0uY3RybC5wbGF5KCdoZXR1bkhldGknLCAwLCBmYWxzZSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucGxheUJvbWJFZmYoMCwgcG9zLCAxLjUpO1xuICAgICAgICAgICAgICAgIE0ubm9kZVBvb2wuZnJlZUl0ZW0oTm9kZVBvb2xLZXkuQm9tYkFuZEJvbWIsIGl0ZW0ubm9kZSk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcHVibGljIHBsYXlCb21iRWZmKGJvbWJMdjogbnVtYmVyLCBwb3M6IGNjLlZlYzIsIHNjYWxlOiBudW1iZXIgPSAxKSB7XG4gICAgICAgIHBvcyA9IHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihwb3MpIGFzIGNjLlZlYzJcbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuY3JlYXRlU3BpbmVOb2RlKE5vZGVQb29sS2V5LkJvbWJFZmYsIHRoaXMuYm9tYkVmZlByZWZhYiwgcG9zKTtcbiAgICAgICAgaXRlbS5ub2RlLnNjYWxlID0gc2NhbGU7XG4gICAgICAgIGl0ZW0uY3RybC5wbGF5KCdiZWlla19iYW96aGEnLCAwLCBmYWxzZSwgKCkgPT4ge1xuICAgICAgICAgICAgTS5ub2RlUG9vbC5mcmVlSXRlbShOb2RlUG9vbEtleS5Cb21iRWZmLCBpdGVtLm5vZGUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcGxheUxpdHRsZUJvbWIocG9zOiBjYy5WZWMyKSB7XG4gICAgICAgIHBvcyA9IHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihwb3MpIGFzIGNjLlZlYzJcbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuY3JlYXRlU3BpbmVOb2RlKE5vZGVQb29sS2V5LkxpdHRsZUJvbWIsIHRoaXMubGl0dGxlQm9tYlByZWZhYiwgcG9zKTtcbiAgICAgICAgaXRlbS5jdHJsLnBsYXkoJ2NpYW9jaHUwMScsIDAsIGZhbHNlLCAoKSA9PiB7XG4gICAgICAgICAgICBNLm5vZGVQb29sLmZyZWVJdGVtKE5vZGVQb29sS2V5LkxpdHRsZUJvbWIsIGl0ZW0ubm9kZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBwbGF5UmFpbmJvd0JvbWIocG9zOiBjYy5WZWMyLCBjYWxsYmFjaykge1xuICAgICAgICBwb3MgPSB0aGlzLm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIocG9zKSBhcyBjYy5WZWMyXG4gICAgICAgIGNvbnN0IHJhaW5ib3dCb21iTm9kZSA9IE0ubm9kZVBvb2wuZ2V0SXRlbShOb2RlUG9vbEtleS5SYWluYm93Qm9tYiwgdGhpcy5yYWluYm93Qm9tYlByZWZhYik7XG4gICAgICAgIHJhaW5ib3dCb21iTm9kZS5wYXJlbnQgPSB0aGlzLm5vZGU7XG4gICAgICAgIHJhaW5ib3dCb21iTm9kZS5zZXRQb3NpdGlvbihwb3MpO1xuICAgICAgICBjb25zdCBlZmZDdHJsID0gcmFpbmJvd0JvbWJOb2RlLmdldENvbXBvbmVudChTcGluZVBsYXllckN0cmwpO1xuICAgICAgICAvL2NhaWhvbmdfYmFvemhhICzljp/mnaXliqjnlLvlkI3np7BcblxuICAgICAgICBlZmZDdHJsLnRpbWVTY2FsZSA9IDM7XG4gICAgICAgIGVmZkN0cmwucGxheSgnc2tpbGxfaGFpbWExJywgMCwgZmFsc2UsICgpID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICBlZmZDdHJsLnRpbWVTY2FsZSA9IDE7XG4gICAgICAgICAgICBlZmZDdHJsLnBsYXkoJ3NraWxsX2hhaW1hMicsIDAsIGZhbHNlLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgTS5ub2RlUG9vbC5mcmVlSXRlbShOb2RlUG9vbEtleS5SYWluYm93Qm9tYiwgcmFpbmJvd0JvbWJOb2RlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvdmVyU2hvb3QoY2VudGVyUG9zOiBjYy5WZWMyLCB0YXJnZXRQb3MsIGNtOiBDZWxsTW9kZWwsIGNhbGxiYWNrOiBGdW5jdGlvbikge1xuXG4gICAgICAgIGNlbnRlclBvcyA9IHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihjZW50ZXJQb3MpIGFzIGNjLlZlYzJcbiAgICAgICAgdGFyZ2V0UG9zID0gdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHRhcmdldFBvcykgYXMgY2MuVmVjMlxuICAgICAgICBjb25zdCBoYW5kbGUgPSB0aGlzLmNyZWF0ZVNwaW5lTm9kZShOb2RlUG9vbEtleS5PdmVyU2hvb3QsIHRoaXMub3ZlclNob290UHJlZmFiLCBjZW50ZXJQb3MpO1xuICAgICAgICBjb25zdCBhMCA9IGNjLm1vdmVUbygxLCB0YXJnZXRQb3MpO1xuICAgICAgICBjb25zdCBhMSA9IGNjLmNhbGxGdW5jKCgpID0+IHtcbiAgICAgICAgICAgIC8vIG5vZGUucmVtb3ZlRnJvbVBhcmVudCh0cnVlKTsgXG4gICAgICAgICAgICBNLnJ1bnRpbWUuT3ZlclN0ZXBDb3VudCsrXG4gICAgICAgICAgICBpZiAoTS5ydW50aW1lLk92ZXJTdGVwQ291bnQgPiA3KSB7XG4gICAgICAgICAgICAgICAgTS5ydW50aW1lLk92ZXJTdGVwQ291bnQgPSA3O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgTS5ldmVudC5zZW5kKEV2ZW50LlVJLkFkZFNjb3JlLCBTY29yZUNvbmZpZy5PdmVyU3RlcFtNLnJ1bnRpbWUuT3ZlclN0ZXBDb3VudF0sIHRhcmdldFBvcywgdHJ1ZSlcblxuICAgICAgICAgICAgY2FsbGJhY2soY20pO1xuICAgICAgICB9KTtcbiAgICAgICAgTS5ldmVudC5zZW5kKEV2ZW50LlNvdW5kLlBsYXlTb3VuZEVmZiwgQXVkaW9JRC5wYXJ0eXRpbWVfc2hvb3QpO1xuICAgICAgICBoYW5kbGUubm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoYTAsIGExKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvblNob290U3RhcihjZW50ZXJQb3M6IGNjLlZlYzIsIHRhcmdldFBvczogY2MuVmVjMiwgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XG4gICAgICAgIGNlbnRlclBvcyA9IHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihjZW50ZXJQb3MpIGFzIGNjLlZlYzJcbiAgICAgICAgdGFyZ2V0UG9zID0gdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHRhcmdldFBvcykgYXMgY2MuVmVjMlxuXG4gICAgICAgIGNvbnN0IGhhbmRsZSA9IHRoaXMuY3JlYXRlU3BpbmVOb2RlKE5vZGVQb29sS2V5LlNob290U3RhciwgdGhpcy5zaG9vdFN0YXJQcmVmYWIsIGNlbnRlclBvcyk7XG5cbiAgICAgICAgLy/orr7nva7nibnmlYjplb/luqbvvIxkaXN0YW5jZSDlsLHmmK/nrpflh7rmnaXnmoTot53nprvkuoZcbiAgICAgICAgbGV0IGRpc3RhbmNlID0gTWF0aC5zcXJ0KE1hdGgucG93KGNlbnRlclBvcy54IC0gdGFyZ2V0UG9zLngsIDIpICsgTWF0aC5wb3coY2VudGVyUG9zLnkgLSB0YXJnZXRQb3MueSwgMikpO1xuICAgICAgICAvL2NjLmxvZyhcInNjYWxlWTogXCIrIChkaXN0YW5jZS8zMDktMC4yKSlcbiAgICAgICAgLy8gaGFuZGxlLm5vZGUuc2V0Q29udGVudFNpemUoNjgsZGlzdGFuY2UpO1xuICAgICAgICBsZXQgc2NhbGVZID0gZGlzdGFuY2UgLyAzMDkgLSAwLjI7XG4gICAgICAgIGhhbmRsZS5ub2RlLnNjYWxlWSA9IHNjYWxlWTtcbiAgICAgICAgLy8gaGFuZGxlLmN0cmwucGxheShgYW5pbV9oYWltYURpYW4ke1V0aWwuVG9vbC5yYW5nZUludCgxLCAyKX1gLCAwLCBmYWxzZSk7XG4gICAgICAgIGlmIChzY2FsZVkgPiAwLjUpIHtcbiAgICAgICAgICAgIGhhbmRsZS5jdHJsLnBsYXkoYGFuaW1faGFpbWFEaWFuJHsyfWAsIDAsIGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGhhbmRsZS5jdHJsLnBsYXkoYGFuaW1faGFpbWFEaWFuJHsxfWAsIDAsIGZhbHNlKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy/orr7nva7ml4vovazop5LluqZcbiAgICAgICAgbGV0IGRpclZlYyA9IHRhcmdldFBvcy5zdWIoY2VudGVyUG9zKTsvL+iOt+W+l+S7jnN0YXJ0UG9z5oyH5ZCRZW5kUG9z55qE5pa55ZCR5ZCR6YePXG4gICAgICAgIGxldCBjb21WZWMgPSBuZXcgY2MuVmVjMigxLCAwKTsvL+iuoeeul+WkueinkueahOWPguiAg+aWueWQke+8jOi/memHjOmAieaLqXjovbTmraPmlrnlkJFcbiAgICAgICAgbGV0IHJhZGlhbiA9IGRpclZlYy5zaWduQW5nbGUoY29tVmVjKTsvL+iOt+W+l+W4puaWueWQkeeahOWkueinkuW8p+W6puWAvCjlj4LogIPmlrnlkJHpobrml7bpkojkuLrmraPlgLzvvIzpgIbml7bpkojkuLrotJ/lgLwpXG4gICAgICAgIGxldCBkZWdyZWUgPSBNYXRoLmZsb29yKGNjLm1pc2MucmFkaWFuc1RvRGVncmVlcyhyYWRpYW4pKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcInjop5LluqbvvJpcIiArIGRlZ3JlZSlcbiAgICAgICAgaGFuZGxlLm5vZGUuYW5nbGUgPSAtKGRlZ3JlZSAtIDkwKVxuICAgICAgICAvLyBoYW5kbGUubm9kZS5zZXRSb3RhdGlvbihkZWdyZWUgLSA5MCk7XG5cbiAgICAgICAgdGhpcy5fdG1wU2hvb3RTdGFyLnB1c2goaGFuZGxlLm5vZGUpO1xuXG4gICAgICAgIC8vY29uc3QgYTAgPSBjYy5tb3ZlVG8oR2FwVGltZS5TdGFyc1Nob290U3BlZWQsIHRhcmdldFBvcyk7XG4gICAgICAgIGNvbnN0IGExID0gY2MucmVwZWF0Rm9yZXZlcihjYy5yb3RhdGVCeSgxLjAsIDM2MCkpO1xuICAgICAgICBjb25zdCBhMiA9IGNjLmNhbGxGdW5jKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGggPSB0aGlzLmNyZWF0ZVNwaW5lTm9kZShOb2RlUG9vbEtleS5IYWlNYU92ZXIsIHRoaXMuaGFpbWFTaG9vdE92ZXJFZmYsIHRhcmdldFBvcyk7XG4gICAgICAgICAgICB0aGlzLl90bXBTaG9vdE92ZXIucHVzaChoLm5vZGUpO1xuICAgICAgICAgICAgaC5jdHJsLnBsYXkoJ21pbmd6aG9uZycsIDAsIHRydWUpO1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgfSwgdGhpcylcblxuICAgICAgICAvL2hhbmRsZS5ub2RlLnJ1bkFjdGlvbihhMSk7XG4gICAgICAgIC8vIGhhbmRsZS5ub2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShhMCwgYTIpKTtcbiAgICAgICAgaGFuZGxlLm5vZGUucnVuQWN0aW9uKGEyKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVtb3ZlU2hvb3RTdGFycygpIHtcbiAgICAgICAgaWYgKHRoaXMuX3RtcFNob290U3RhciAmJiB0aGlzLl90bXBTaG9vdFN0YXIubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fdG1wU2hvb3RTdGFyLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICAgICAgICAgICAgbm9kZS5zdG9wQWxsQWN0aW9ucygpO1xuICAgICAgICAgICAgICAgIE0ubm9kZVBvb2wuZnJlZUl0ZW0oTm9kZVBvb2xLZXkuU2hvb3RTdGFyLCBub2RlKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3RtcFNob290T3ZlciAmJiB0aGlzLl90bXBTaG9vdE92ZXIubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fdG1wU2hvb3RPdmVyLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICAgICAgICAgICAgbm9kZS5zdG9wQWxsQWN0aW9ucygpO1xuICAgICAgICAgICAgICAgIE0ubm9kZVBvb2wuZnJlZUl0ZW0oTm9kZVBvb2xLZXkuSGFpTWFPdmVyLCBub2RlKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgbm9ybWFsQ29sbGVjdE92ZXJFZmYocG9zOiBjYy5WZWMyLCB0YXJnZXROYW1lOiBzdHJpbmcgPSBudWxsKSB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmNyZWF0ZVNwaW5lTm9kZShOb2RlUG9vbEtleS5NZXJnZUJvbWIsIHRoaXMubWVyZ2VCb21iUHJlZmFiLCBwb3MpO1xuICAgICAgICBpdGVtLmN0cmwucGxheSh0YXJnZXROYW1lIHx8ICdzaG91amknLCAwLCBmYWxzZSwgKCkgPT4ge1xuICAgICAgICAgICAgTS5ub2RlUG9vbC5mcmVlSXRlbShOb2RlUG9vbEtleS5NZXJnZUJvbWIsIGl0ZW0ubm9kZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8v5ZCI5oiQ54K45by5LCAg5Yy65YiG5pa55ZCR5LiO5Liq5pWwISEhXG4gICAgcHVibGljIHBsYXlTcGVlZExpbmUocG9zOiBjYy5WZWMyLCBkaXI6IGNjLlZlYzIpIHtcbiAgICAgICAgcG9zID0gdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHBvcykgYXMgY2MuVmVjMjtcbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuY3JlYXRlU3BpbmVOb2RlKE5vZGVQb29sS2V5Lk1lcmdlQm9tYiwgdGhpcy5tZXJnZUJvbWJQcmVmYWIsIHBvcyk7XG4gICAgICAgIGl0ZW0ubm9kZS5hbmdsZSA9IDA7XG4gICAgICAgIGNvbnN0IG92ZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICBNLm5vZGVQb29sLmZyZWVJdGVtKE5vZGVQb29sS2V5Lk1lcmdlQm9tYiwgaXRlbS5ub2RlKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgaXNDZW50ZXIgPSAoZGlyLnggPT0gMCAmJiBkaXIueSA9PSAwKTtcbiAgICAgICAgbGV0IGlzT2JsaXF1ZSA9IChkaXIueCAhPSAwICYmIGRpci55ICE9IDApO1xuICAgICAgICBpZiAoaXNDZW50ZXIpIHtcbiAgICAgICAgICAgIGl0ZW0uY3RybC5wbGF5KCdoZWNoZW5nMDEnLCAwLCBmYWxzZSwgb3Zlcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgYW5nbGUgPSBbMCwgOTAsIDE4MCwgMjcwXTsgLy/lt6Yg5LiKIOWPsyDkuIsg5pacIDQ1XG4gICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICAgICAgbGV0IHAgPSBjYy52MyhDb21tb24uR1JJRF9XLCBDb21tb24uR1JJRF9IKTtcbiAgICAgICAgICAgIGlmIChpc09ibGlxdWUpIHtcbiAgICAgICAgICAgICAgICBhbmdsZSA9IFs0NSwgMjI1LCAtNDUsIC0yMjVdO1xuICAgICAgICAgICAgICAgIGlmIChkaXIueCA9PSAxICYmIGRpci55ID09IC0xKSB7IGluZGV4ID0gMTsgcC55ID0gcC55OyBwLnggPSBwLnggfTtcbiAgICAgICAgICAgICAgICBpZiAoZGlyLnggPT0gLTEgJiYgZGlyLnkgPT0gMSkgeyBpbmRleCA9IDA7IHAueSA9IC1wLnk7IHAueCA9IC1wLnggfTtcbiAgICAgICAgICAgICAgICBpZiAoZGlyLnggPT0gMSAmJiBkaXIueSA9PSAxKSB7IGluZGV4ID0gMzsgcC55ID0gLXAueTsgcC54ID0gcC54IH07XG4gICAgICAgICAgICAgICAgaWYgKGRpci54ID09IC0xICYmIGRpci55ID09IC0xKSB7IGluZGV4ID0gMjsgcC55ID0gcC55OyBwLnggPSAtcC54IH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChkaXIueCA9PSAxKSB7IGluZGV4ID0gMjsgcC54ID0gcC54OyBwLnkgPSAwIH07XG4gICAgICAgICAgICAgICAgaWYgKGRpci54ID09IC0xKSB7IGluZGV4ID0gMDsgcC54ID0gLXAueDsgcC55ID0gMCB9O1xuICAgICAgICAgICAgICAgIGlmIChkaXIueSA9PSAxKSB7IGluZGV4ID0gMTsgcC55ID0gLXAueTsgcC54ID0gMCB9O1xuICAgICAgICAgICAgICAgIGlmIChkaXIueSA9PSAtMSkgeyBpbmRleCA9IDM7IHAueSA9IHAueTsgcC54ID0gMCB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaXRlbS5ub2RlLmFuZ2xlID0gYW5nbGVbaW5kZXhdO1xuICAgICAgICAgICAgaXRlbS5ub2RlLnBvc2l0aW9uID0gaXRlbS5ub2RlLnBvc2l0aW9uLmFkZChwKTtcbiAgICAgICAgICAgIGl0ZW0uY3RybC5wbGF5KCdoZWNoZW5nMDFfMScsIDAsIGZhbHNlLCBvdmVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBwcmVGYWxsaW5nQ291bnREb3duKHJlbWFpblN0ZXA6IG51bWJlciwgY2FsbGJhY2s6IEZ1bmN0aW9uKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBub2RlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCd0bXBDb3VudERvd24nKTtcbiAgICAgICAgICAgIG5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIG5vZGUueSA9IDA7XG4gICAgICAgICAgICBjb25zdCBsYWJsZSA9IG5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcbiAgICAgICAgICAgIGNvbnN0IGNvdW50RG93biA9IChjb3VudCwgaXNmcmlzdCwgY2IpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGFibGUuc3RyaW5nID0gYOaKouWIhuWAkuiuoeaXtjogJHtjb3VudH1gO1xuICAgICAgICAgICAgICAgICAgICBjb3VudC0tO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY291bnQgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnJ1bkFjdGlvbihjYy5tb3ZlQnkoMSwgY2MudjIoMCwgMzYwKSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2IoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc2ZyaXN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY291bnREb3duKHJlbWFpblN0ZXAsIGZhbHNlLCBjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCAxLCBjb3VudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb3VudERvd24oMiwgdHJ1ZSwgcmVzb2x2ZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlU3BpbmVOb2RlKGtleTogTm9kZVBvb2xLZXksIHByZWZhYjogY2MuUHJlZmFiLCBwb3M6IGNjLlZlYzIgfCBjYy5WZWMzID0gbnVsbCk6IHsgbm9kZTogY2MuTm9kZSwgY3RybDogU3BpbmVQbGF5ZXJDdHJsIH0ge1xuICAgICAgICByZXR1cm4gQ29tbW9uLmNyZWF0ZVNwaW5lTm9kZSh0aGlzLm5vZGUsIHByZWZhYiwga2V5LCBwb3MpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlRWZmUHJlZmFiKGtleTogTm9kZVBvb2xLZXksIHByZWZhYjogY2MuUHJlZmFiLCBwb3M6IGNjLlZlYzIgfCBjYy5WZWMzID0gbnVsbCk6IHsgbm9kZTogY2MuTm9kZSwgY3RybDogY2MuQW5pbWF0aW9uIH0ge1xuICAgICAgICByZXR1cm4gQ29tbW9uLmNyZWF0ZUVmZlByZWZhYih0aGlzLm5vZGUsIGtleSwgcHJlZmFiLCBwb3MpXG4gICAgfVxufVxuIl19