
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Match3/View/GroundViewCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '837e7BFspRJ2bwmth8o2HEm', 'GroundViewCtrl');
// Script/Logic/Match3/View/GroundViewCtrl.ts

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
var Common_1 = require("../../Common/Common");
var BaseView_1 = require("./BaseView");
var M_1 = require("../../../Base/Manager/M");
var ItemGroundCtrl_1 = require("./ItemGroundCtrl");
var Event_1 = require("../../Data/Const/Event");
var Constant_1 = require("../../Data/Const/Constant");
var CollectModel_1 = require("../Model/CollectModel");
var GameModel_1 = require("../Model/GameModel");
var SpinePlayerCtrl_1 = require("../../../Base/CustomComponent/SpinePlayerCtrl");
var TimeConfig_1 = require("../../Data/Const/TimeConfig");
var ActionCtrl_1 = require("../../Common/ActionCtrl");
var Match3Skin_1 = require("../Skin/Match3Skin");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**托盘基于中心的偏移量 */
var TrayOffset = cc.v2(12, 45);
var GroundViewCtrl = /** @class */ (function (_super) {
    __extends(GroundViewCtrl, _super);
    function GroundViewCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.borderParent = null;
        //地板之上树叶等之下(河道等..)
        _this.waterParent = null;
        //地板上遮住收集物的物品(树叶...等)
        _this.multFuncParent = null;
        _this.gnomeParent = null;
        _this._cfg = null;
        _this._complexItemMap = null;
        /**当前地图类型 water grass */
        _this.type = null;
        _this.gnomeAry = {};
        _this.crabAry = {};
        _this.monkeyTreeAry = {};
        _this.turtlesAry = {};
        return _this;
    }
    GroundViewCtrl.prototype.onLoad = function () { };
    GroundViewCtrl.prototype.initView = function (models, data, cfg, groundType) {
        _super.prototype.initView.call(this, models);
        this.type = groundType;
        this._cfg = cfg;
        var groundBasePrefab = Match3Skin_1.default.requirePrefab("groundBase");
        var groundItemPrefab = Match3Skin_1.default.requirePrefab("groundItem");
        var gnomePrefab = Match3Skin_1.default.requirePrefab("gnome");
        var turtlesPrefab = Match3Skin_1.default.requirePrefab("turtles");
        var crabPrefab = Match3Skin_1.default.requirePrefab("crab");
        var monkeyTreePrefab = Match3Skin_1.default.requirePrefab("monkeyTree");
        var gemPrefab = Match3Skin_1.default.requirePrefab("gem");
        if (groundBasePrefab) {
            M_1.default.nodePool.create(Constant_1.NodePoolKey.GroundCell, groundBasePrefab, 150);
        }
        if (GameModel_1.default.ins.isHaveGem && gemPrefab) {
            M_1.default.nodePool.create(Constant_1.NodePoolKey.GemNode, gemPrefab, 20);
        }
        if (groundItemPrefab) {
            M_1.default.nodePool.create(Constant_1.NodePoolKey.GroundMulti, groundItemPrefab, 130);
        }
        this.initBaseView(models);
        this.initGnome(data.mgModel.getConfig(CollectModel_1.CollectType.gnome), gnomePrefab);
        this.initTurtles(data.mgModel.getConfig(CollectModel_1.CollectType.turtles), turtlesPrefab);
        this.initCrab(data.mgModel.getConfig(CollectModel_1.CollectType.crab), crabPrefab);
        this.initMonkeyTree(cfg.monkeyTree, monkeyTreePrefab);
        this.initLawnmower(cfg.lawnmower);
    };
    GroundViewCtrl.prototype.initCrab = function (crabCfg, crabPrefab) {
        if (!crabCfg)
            return;
        if (!crabPrefab) {
            console.error("[Match3Skin] missing crab prefab");
            return;
        }
        for (var i = 0; i < crabCfg.length; i++) {
            var cfg = crabCfg[i];
            var node = M_1.default.nodePool.createItem(crabPrefab);
            var topPos = Common_1.default.getPos(cfg.x, cfg.y, cfg.index);
            var tmpScaleHeight = 20;
            node['cfg'] = cfg;
            node.parent = this.gnomeParent;
            node.x = topPos.x - Common_1.default.GRID_W / 2;
            node.y = topPos.y + Common_1.default.GRID_H / 2;
            node.setScale((Common_1.default.GRID_H - tmpScaleHeight) / (node.height / ((Math.floor(cfg.type / 2) + 1) * 2)));
            if (cfg.type % 2 == 0) {
                node.angle = 90;
                node.y -= (node.width * node.scale);
                cfg.type < 2 && (node.x += tmpScaleHeight);
            }
            else {
                cfg.type < 2 && (node.y -= tmpScaleHeight);
            }
            if (cfg.x < (GameModel_1.default.GridSize.W - 1) / 2) {
                var item = node.getChildByName('item');
                item.scaleX = -item.scaleX;
            }
            this.crabAry[i] = node;
        }
    };
    GroundViewCtrl.prototype.initMonkeyTree = function (monkeyTreeCfg, monkeyTreePrefab) {
        if (!monkeyTreeCfg)
            return;
        if (!monkeyTreePrefab) {
            console.error("[Match3Skin] missing monkeyTree prefab");
            return;
        }
        for (var i = 0; i < monkeyTreeCfg.length; i++) {
            var cfg = monkeyTreeCfg[i];
            var pos = cc.v2(cfg.x, cfg.y);
            var data = this.createMonkeyTree(Common_1.default.getPos(pos.x, pos.y, cfg.index), monkeyTreePrefab);
            data.pos = pos;
            data.exp = 0;
            data.remainLabel = cc.find('qipao/count', data.tree.node).getComponent(cc.Label);
            this.monkeyTreeAry[i] = data;
            this.updateMoneyTreeState(i);
        }
    };
    GroundViewCtrl.prototype.initLawnmower = function (lawnmowerCfg) {
        if (!lawnmowerCfg)
            return;
        for (var i = 0; i < lawnmowerCfg.length; i++) {
            var cfg = lawnmowerCfg[i];
            var pos = cc.v2(cfg.x, cfg.y);
            var groundCell = Common_1.default.safeGet2ArrayValue(GameModel_1.default.ins.GroundList, pos);
            if (groundCell) {
                //锁定这个坐标!
                groundCell.change2TargetType(Constant_1.GroundType.Tuituji, cfg);
            }
            GameModel_1.default.ins.CollectModel.collectPowerCells[cfg.type] = groundCell;
        }
    };
    GroundViewCtrl.prototype.initTurtles = function (turtlesCfg, turtlesPrefab) {
        if (!turtlesCfg)
            return;
        if (!turtlesPrefab) {
            console.error("[Match3Skin] missing turtles prefab");
            return;
        }
        for (var i = 0; i < turtlesCfg.length; i++) {
            var cfg = turtlesCfg[i];
            var pos = Common_1.default.getPos(cfg.x, cfg.y, cfg.index);
            var result = Common_1.default.createSpineNode(this.gnomeParent, turtlesPrefab, null, pos.add(cc.v2(Common_1.default.GRID_W / 2, -Common_1.default.GRID_H / 2)));
            this.turtlesAry[i] = { ctrl: result.ctrl, pos: cc.v2(cfg.x, cfg.y) };
        }
    };
    GroundViewCtrl.prototype.initGnome = function (gnomeCfg, gnomePrefab) {
        if (!gnomeCfg)
            return;
        if (!gnomePrefab) {
            console.error("[Match3Skin] missing gnome prefab");
            return;
        }
        for (var i = 0; i < gnomeCfg.length; i++) {
            var cfg = gnomeCfg[i];
            var node = M_1.default.nodePool.createItem(gnomePrefab);
            var topPos = Common_1.default.getPos(cfg.x, cfg.y, cfg.index);
            var tmpScaleHeight = 20;
            node.parent = this.gnomeParent;
            node.x = topPos.x - Common_1.default.GRID_W / 2;
            node.y = topPos.y + Common_1.default.GRID_H / 2;
            node.setScale(Common_1.default.GRID_H / (node.height / ((Math.floor(cfg.type / 2) + 1) * 2)));
            if (cfg.type % 2 == 0) {
                node.angle = 90;
                node.y -= (node.width * node.scale - tmpScaleHeight * node.scale);
            }
            this.gnomeAry[i] = node;
        }
    };
    GroundViewCtrl.prototype.playCrabAni = function (upLayer, index) {
        var _this = this;
        var item = this.crabAry[index];
        if (item) {
            item.parent = upLayer;
            item.setPosition(upLayer.convertToNodeSpaceAR(Common_1.default.getWorldPos(item)));
            var pxCtrl = item.getChildByName('item').getComponent(SpinePlayerCtrl_1.default);
            var cfg_1 = item['cfg'];
            var dir_1 = cc.v2(-1, 0);
            M_1.default.event.send(Event_1.Event.UI.UpdateInfoPanel, CollectModel_1.CollectType.crab);
            if (cfg_1.x < (GameModel_1.default.GridSize.W - 1) / 2) {
                dir_1.x = 1;
            }
            pxCtrl.play('pangxie2', 0, false, function () {
                item.destroy();
            });
            //开始执行消除操作! 
            this.scheduleOnce(function () {
                GameModel_1.default.ins.getMgModel().onComplet(CollectModel_1.CollectType.crab, dir_1.x, cc.v2(cfg_1.x, cfg_1.y));
                _this.scheduleOnce(function () {
                    var m = GameModel_1.default.ins.getMgModel().getModel(CollectModel_1.CollectType.crab);
                    m && m.freeGrid(cc.v2(cfg_1.x, cfg_1.y), index);
                }, TimeConfig_1.GapTime.CrabStartedFallGap);
            }, TimeConfig_1.GapTime.CrabStartElimate);
        }
    };
    GroundViewCtrl.prototype.playTurtlesAni = function (upLayer, index) {
        var item = this.turtlesAry[index];
        if (item) {
            item.ctrl.node.parent = upLayer;
            item.ctrl.play('haigui_run', 0, false, function () {
                // const targetPos = cc.v2(-1000, 700);
                var node = item.ctrl.node;
                // const rotation = Math.atan2(Math.abs(targetPos.y) - Math.abs(node.y), Math.abs(targetPos.x) - Math.abs(node.x)) / Math.PI * 180;
                // const a0 = cc.rotateTo(1, rotation);
                // const a1 = cc.callFunc(() => {
                //     //通知上面开始掉落!!!
                //     GameModel.ins.getGnomeModel().turtlesComplet(index, item.pos);
                // });
                // const a2 = cc.moveTo(2, targetPos);
                // const a3 = cc.callFunc(() => {
                node.destroy();
                // });
                // node.runAction(cc.sequence(a0, a1, a2, a3)); 
            });
            this.scheduleOnce(function () {
                M_1.default.event.send(Event_1.Event.UI.UpdateInfoPanel, CollectModel_1.CollectType.turtles);
                GameModel_1.default.ins.getMgModel().onComplet(CollectModel_1.CollectType.turtles, index, item.pos);
            }, TimeConfig_1.GapTime.TurtlesOver);
        }
    };
    GroundViewCtrl.prototype.playFireflyAni = function (parent, selfPos, targetPos) {
        var prefab = Match3Skin_1.default.requirePrefab("firefly");
        if (!prefab) {
            return;
        }
        var node = M_1.default.nodePool.getItem(Constant_1.NodePoolKey.Firefly, prefab);
        node.parent = parent;
        node.setPosition(parent.convertToNodeSpaceAR(this.waterParent.convertToWorldSpaceAR(selfPos)));
        ActionCtrl_1.default.ins.runCollectGem(node, targetPos, parent).then(function () {
            M_1.default.nodePool.freeItem(Constant_1.NodePoolKey.Firefly, node);
            M_1.default.event.send(Event_1.Event.UI.UpdateInfoPanel, CollectModel_1.CollectType.firefly);
        });
    };
    GroundViewCtrl.prototype.playGemAni = function (parent, selfPos, targetPos) {
        var prefab = Match3Skin_1.default.requirePrefab("gem");
        if (!prefab) {
            return;
        }
        var node = M_1.default.nodePool.getItem(Constant_1.NodePoolKey.GemNode, prefab);
        node.parent = parent;
        node.setPosition(parent.convertToNodeSpaceAR(this.waterParent.convertToWorldSpaceAR(selfPos)));
        ActionCtrl_1.default.ins.runCollectGem(node, targetPos, parent).then(function () {
            M_1.default.nodePool.freeItem(Constant_1.NodePoolKey.GemNode, node);
            M_1.default.event.send(Event_1.Event.UI.UpdateInfoPanel, CollectModel_1.CollectType.gem);
        });
    };
    GroundViewCtrl.prototype.playGnomeAni = function (parent, index, targetPos) {
        var gn = this.gnomeAry[index];
        if (gn) {
            ActionCtrl_1.default.ins.runCollectGnome(gn, targetPos, parent).then(function () {
                gn.destroy();
                M_1.default.event.send(Event_1.Event.UI.UpdateInfoPanel, CollectModel_1.CollectType.gnome);
            });
        }
    };
    GroundViewCtrl.prototype.getGnomeAry = function () {
        return this.gnomeAry;
    };
    /**
     * 获取老头收集物的移动距离
     * @param curView
     * @param maskNode
     */
    GroundViewCtrl.prototype.checkCollectMoveDistance = function (curView, maskNode) {
        var moveGap = 0;
        if (curView.height > 0) {
            //遍历检测所有的收集物是否有在中心的 
            for (var key in this.gnomeAry) {
                var gnomeNode = this.gnomeAry[key];
                var wp = gnomeNode.parent.convertToWorldSpaceAR(gnomeNode.position);
                var mp = maskNode.convertToNodeSpaceAR(wp);
                if (mp.y < 0 && mp.y < maskNode.height / 3) {
                    var distance = Math.abs(mp.y) + (gnomeNode.angle != 0 ? gnomeNode.width : gnomeNode.height) * gnomeNode.scale;
                    var maxDistance = (curView.height / 2 - curView.y) - maskNode.height / 2 + Common_1.default.GRID_H / 2;
                    moveGap = distance > maxDistance ? maxDistance : distance;
                }
                else {
                    moveGap = 0;
                    break;
                }
            }
        }
        return moveGap;
    };
    GroundViewCtrl.prototype.initBaseView = function (models) {
        var yLength = models.length;
        var xLength = models[0].length;
        var index = null;
        for (var y = 0; y <= yLength; y++) {
            for (var x = 0; x <= xLength; x++) {
                var gItem = models[y] ? models[y][x] : null;
                //显示地板
                var cmp = null;
                if (gItem) {
                    if (index == null) {
                        index = gItem.getMapIndex();
                    }
                    var baseSprite = null;
                    if (gItem.getType() != null) {
                        var groundBasePrefab = Match3Skin_1.default.requirePrefab("groundBase");
                        if (groundBasePrefab) {
                            var groundBase = M_1.default.nodePool.getItem(Constant_1.NodePoolKey.GroundCell, groundBasePrefab);
                            groundBase.setPosition(gItem.getPosition());
                            baseSprite = groundBase.getComponent(cc.Sprite);
                            this.setGroundSprite(baseSprite, x, y);
                            groundBase.parent = this.borderParent;
                            groundBase.zIndex = 2;
                        }
                    }
                    var groundItemPrefab = Match3Skin_1.default.requirePrefab("groundItem");
                    if (!groundItemPrefab) {
                        continue;
                    }
                    var node = M_1.default.nodePool.getItem(Constant_1.NodePoolKey.GroundMulti, groundItemPrefab);
                    if (!node) {
                        console.error("[Match3Skin] create groundItem node failed");
                        continue;
                    }
                    node['baseSprite'] = baseSprite;
                    node.parent = this.multFuncParent;
                    cmp = node.getComponent(ItemGroundCtrl_1.default);
                    if (!cmp) {
                        var skinConfig = Match3Skin_1.default.getConfig();
                        var prefabPath = skinConfig && skinConfig.prefabs ? skinConfig.prefabs.groundItem : null;
                        console.error("[Match3Skin] groundItem prefab missing ItemGroundCtrl:", node.name, prefabPath);
                        node.destroy();
                        continue;
                    }
                    cmp.init(gItem, this.borderParent);
                    gItem.extData = node;
                    gItem.extCtrl = cmp;
                }
                this.showComplexItem(x, y, Constant_1.GroundType.Water);
                // this.showComplexItem(x, y, GroundType.Ground);
                var borderCoff = this.getBorderSpriteName(x, y);
                if (Common_1.default.getGroundBorderInfo(borderCoff)) {
                    this.initBorderView(borderCoff, x, y, index);
                }
            }
        }
        // this.checkTray();
    };
    /**
     * 更新指定位置的复杂水/地块显示
     * @param pos
     */
    GroundViewCtrl.prototype.updateComlexIteamByPos = function (pos) {
        //删除指定点周围的显示
        // if (this._complexItemMap) {
        //     //删除位置的原始信息!
        //     const dirs = [cc.v2(0, 0), cc.v2(1, 0), cc.v2(0, 1), cc.v2(1, 1)];
        //     for (let index = 0; index < dirs.length; index++) {
        //         const targetPos = pos.add(dirs[index]);
        //         if (this._complexItemMap[targetPos.y]) {
        //             const targetNode = this._complexItemMap[targetPos.y][targetPos.x];
        //             M.nodePool.freeItem(NodePoolKey.ComplexGround, targetNode);
        //             this.showComplexItem(targetPos.x, targetPos.y, GroundType.Ground);
        //         }
        //     }
        // }
    };
    GroundViewCtrl.prototype.showComplexItem = function (x, y, type) {
        var groundCoff = Common_1.default.getSpriteNameByType(x, y, this.models, type);
        if (groundCoff != "0000") {
            this.initViewByType(groundCoff, x, y, type);
        }
    };
    /**设置地面的格子颜色! */
    GroundViewCtrl.prototype.setGroundSprite = function (sprite, x, y) {
        var frame = Match3Skin_1.default.getCellBaseFrame(this.type, (x + y) % 2);
        if (!frame) {
            console.error('[Match3Skin] missing cell base frame:', this.type, (x + y) % 2);
        }
        sprite.spriteFrame = frame;
    };
    GroundViewCtrl.prototype.getBorderSpriteName = function (x, y) {
        var coff = "";
        coff += this.getCellEmptyStatus(x - 1, y - 1);
        coff += this.getCellEmptyStatus(x, y - 1);
        coff += this.getCellEmptyStatus(x - 1, y);
        coff += this.getCellEmptyStatus(x, y);
        return coff;
    };
    GroundViewCtrl.prototype.initBorderView = function (coff, x, y, index) {
        var cfg = Common_1.default.getGroundBorderInfo(coff);
        var pos = Common_1.default.getPos(x, y, index);
        pos.x -= Common_1.default.GRID_W / 2;
        pos.y += Common_1.default.GRID_H / 2;
        this.createMiddleBorder(pos, coff);
        this.createUpBorder(pos, cfg, coff);
    };
    /*
    private checkTray() {
        if (this.type != 'water') {
            return;
        }
        const fragments = GameModel.ins.getLastFragment();
        fragments.forEach((f: Array<GroundCellModel>) => {
            const l = f.length;
            if (l >= 2 && l < 4) {
                this.createTray(0, f[0].pos);
            } else if (l >= 4 && l < 6) {
                this.createTray(1, f[l - 1].pos, false);
            } else if (l >= 6) {
                this.createTray(0, f[0].pos);
                this.createTray(1, f[l - 1].pos, false);
            }
        });
    }

    private createTray(type: number, pos: cc.Vec2, isPre: boolean = true) {
        const frame = this.trayFrames[type];
        if (frame) {
            const taryNode = new cc.Node();
            const sprite = taryNode.addComponent(cc.Sprite);
            sprite.spriteFrame = frame;
            taryNode.parent = this.borderParent;
            taryNode.setAnchorPoint(isPre ? 0 : 1, 1);
            taryNode.zIndex = 2;
            let basePos = Common.getPos(pos.x, pos.y + 1);
            let position = cc.v2(basePos.x - Common.GRID_W / 2 - TrayOffset.x, basePos.y + Common.GRID_H / 2 - TrayOffset.y);
            if (!isPre) {
                position = cc.v2(basePos.x + Common.GRID_W / 2 + TrayOffset.x, basePos.y + Common.GRID_H / 2 - TrayOffset.y);
            }
            taryNode.setPosition(position)
        }
    }
    */
    GroundViewCtrl.prototype.createMonkeyTree = function (pos, monkeyTreePrefab) {
        var ctrls = {};
        if (!monkeyTreePrefab) {
            return ctrls;
        }
        var result = Common_1.default.createSpineNode(this.gnomeParent, monkeyTreePrefab, null, pos.add(cc.v2(Common_1.default.GRID_W / 2, -Common_1.default.GRID_H / 2)));
        ctrls.tree = result.ctrl;
        result.ctrl._setMix('yezishu_yaoshu', 'yezishu_xiuxian');
        return ctrls;
    };
    GroundViewCtrl.prototype.getRandMonkeyTree = function () {
        var data = null;
        for (var key in this.monkeyTreeAry) {
            data = { index: key, data: this.monkeyTreeAry[key] };
            break;
        }
        return data;
    };
    GroundViewCtrl.prototype.monkeyTreeExpUp = function (upLayer, index) {
        var _this = this;
        var data = this.monkeyTreeAry[index];
        if (data) {
            data.exp++;
            data.remainLabel.string = "x" + (9 - (data.exp % 9));
            if (data.exp % 9 == 0) {
                this.scheduleOnce(function () {
                    _this.monkeyWakeUp(upLayer, index);
                }, 0.5);
            }
        }
    };
    GroundViewCtrl.prototype.monkeyWakeUp = function (upLayer, index) {
        var data = this.monkeyTreeAry[index];
        if (data) {
            data.tree.play('yezishu_yaoshu', 0, false, function () {
                data.tree.play('yezishu_xiuxian', 0, true);
            });
            M_1.default.event.send(Event_1.Event.GameCMD.ChangeCell, Constant_1.CellType.Coconut);
        }
    };
    GroundViewCtrl.prototype.updateMoneyTreeState = function (index) {
        var data = this.monkeyTreeAry[index];
        if (data) {
            this.scheduleOnce(function () {
                data.tree.play('yezishu_xiuxian', 0, true);
                var baseDirs = [cc.v2(0, 0), cc.v2(1, 0), cc.v2(0, -1), cc.v2(1, -1), cc.v2(0, -2), cc.v2(1, -2)];
                baseDirs.forEach(function (dir) {
                    var cm = Common_1.default.safeGet2ArrayValue(GameModel_1.default.ins.GroundList, data.pos.add(dir));
                    cm && cm.initMonkeyTreePos();
                });
            }, 0);
        }
    };
    GroundViewCtrl.prototype.createMiddleBorder = function (pos, name) {
        if (name == '1101' || name == '1110' || name == '0110' || name == '1001') {
            name = '1100';
        }
        var frame = Match3Skin_1.default.getMiddleBorderFrame(this.type, name);
        if (frame) {
            var borderNode = new cc.Node();
            var sprite = borderNode.addComponent(cc.Sprite);
            sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
            borderNode.parent = this.borderParent;
            borderNode.anchorY = 1;
            borderNode.zIndex = 1;
            sprite.spriteFrame = frame;
            var offset = cc.v2(0, -14);
            switch (name) {
                case '0100':
                    borderNode.anchorX = 16 / (51.5);
                    offset = cc.v2(0, Common_1.default.GRID_H / 2 - 8);
                    break;
                case '1000':
                    borderNode.anchorX = 1 - (16 / (51.5));
                    offset = cc.v2(0, Common_1.default.GRID_H / 2 - 8);
                    break;
                case '1100':
                    borderNode.setContentSize(cc.size(Common_1.default.GRID_W, borderNode.height));
                    break;
            }
            borderNode.setPosition(pos.add(offset));
        }
        else {
            console.error('[Match3Skin] missing middle border frame:', this.type, name);
        }
    };
    GroundViewCtrl.prototype.createUpBorder = function (pos, cfg, name) {
        var borderNode = new cc.Node();
        var sprite = borderNode.addComponent(cc.Sprite);
        sprite.trim = false;
        sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        borderNode.parent = this.borderParent;
        borderNode.name = name + "_" + cfg[0];
        borderNode.zIndex = 2;
        var frame = Match3Skin_1.default.getUpBorderFrame(this.type, cfg[0]);
        if (!frame) {
            console.error('[Match3Skin] missing up border frame:', this.type, cfg[0]);
        }
        sprite.spriteFrame = frame;
        borderNode.setPosition(pos);
        borderNode.setScale(cfg[1]);
        borderNode.setContentSize(Common_1.default.GRID_W, Common_1.default.GRID_H);
    };
    /**
     * 初始化水的显示!
     * @param coff  搞定这里.就能搞定50个dc
     */
    GroundViewCtrl.prototype.initViewByType = function (coff, x, y, type) {
        var offset = cc.v2(-Common_1.default.GRID_W / 2, Common_1.default.GRID_H / 2);
        var node = M_1.default.nodePool.getItem(Constant_1.NodePoolKey.ComplexGround);
        node.name = coff;
        var sprite = node.addComponent(cc.Sprite);
        sprite.spriteFrame = this.getFrameByType(coff, type);
        sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        sprite.trim = false;
        node.parent = this.waterParent;
        node.setPosition(Common_1.default.getPos(x, y).add(offset));
        node.setContentSize(cc.size(Common_1.default.GRID_W, Common_1.default.GRID_H));
        // if (type == GroundType.Ground) {
        //     this._saveComplexObject(x, y, node);
        // }
    };
    /**
     * 存储复杂水或者地块的对象
     * @param x
     * @param y
     * @param node
     */
    GroundViewCtrl.prototype._saveComplexObject = function (x, y, node) {
        if (!this._complexItemMap) {
            this._complexItemMap = [];
        }
        if (!this._complexItemMap[y]) {
            this._complexItemMap[y] = [];
        }
        this._complexItemMap[y][x] = node;
    };
    GroundViewCtrl.prototype.getFrameByType = function (coff, type) {
        var skinFrame = type == Constant_1.GroundType.Water ? Match3Skin_1.default.getComplexGroundFrame(this.type, coff) : null;
        if (skinFrame) {
            return skinFrame;
        }
        console.error('[Match3Skin] missing complex ground frame:', this.type, coff);
        return null;
    };
    GroundViewCtrl.prototype.getCellEmptyStatus = function (x, y) {
        var result = 1;
        if (!this.models[y]) {
            result = 0;
        }
        else if (!this.models[y][x]) {
            result = 0;
        }
        else if (this.models[y][x].getType() == null) {
            result = 0;
        }
        return result;
    };
    GroundViewCtrl.prototype.update = function (dt) {
    };
    __decorate([
        property(cc.Node)
    ], GroundViewCtrl.prototype, "borderParent", void 0);
    __decorate([
        property(cc.Node)
    ], GroundViewCtrl.prototype, "waterParent", void 0);
    __decorate([
        property(cc.Node)
    ], GroundViewCtrl.prototype, "multFuncParent", void 0);
    __decorate([
        property(cc.Node)
    ], GroundViewCtrl.prototype, "gnomeParent", void 0);
    GroundViewCtrl = __decorate([
        ccclass
    ], GroundViewCtrl);
    return GroundViewCtrl;
}(BaseView_1.default));
exports.default = GroundViewCtrl;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcTWF0Y2gzXFxWaWV3XFxHcm91bmRWaWV3Q3RybC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSw4Q0FBeUM7QUFDekMsdUNBQWtDO0FBQ2xDLDZDQUF3QztBQUN4QyxtREFBOEM7QUFDOUMsZ0RBQStDO0FBRS9DLHNEQUE4RTtBQUU5RSxzREFBb0Q7QUFDcEQsZ0RBQTBEO0FBQzFELGlGQUE0RTtBQUM1RSwwREFBc0Q7QUFFdEQsc0RBQWlEO0FBQ2pELGlEQUE0QztBQUV0QyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUk1QyxnQkFBZ0I7QUFDaEIsSUFBTSxVQUFVLEdBQVksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFHMUM7SUFBNEMsa0NBQTZCO0lBQXpFO1FBQUEscUVBb21CQztRQWptQkcsa0JBQVksR0FBWSxJQUFJLENBQUM7UUFDN0Isa0JBQWtCO1FBRWxCLGlCQUFXLEdBQVksSUFBSSxDQUFDO1FBQzVCLHFCQUFxQjtRQUVyQixvQkFBYyxHQUFZLElBQUksQ0FBQztRQUcvQixpQkFBVyxHQUFZLElBQUksQ0FBQztRQUVwQixVQUFJLEdBQVcsSUFBSSxDQUFDO1FBRXBCLHFCQUFlLEdBQTBCLElBQUksQ0FBQztRQUV0RCx3QkFBd0I7UUFDaEIsVUFBSSxHQUFXLElBQUksQ0FBQztRQUVwQixjQUFRLEdBQStCLEVBQUUsQ0FBQztRQUMxQyxhQUFPLEdBQStCLEVBQUUsQ0FBQztRQUN6QyxtQkFBYSxHQUFtQyxFQUFFLENBQUM7UUFDbkQsZ0JBQVUsR0FBK0QsRUFBRSxDQUFDOztJQTRrQnhGLENBQUM7SUExa0JHLCtCQUFNLEdBQU4sY0FBVyxDQUFDO0lBRUwsaUNBQVEsR0FBZixVQUFnQixNQUEyQixFQUFFLElBQWdC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O09BQ2EsY0FBYyxDQW9tQmxDO0lBQUQscUJBQUM7Q0FwbUJELEFBb21CQyxDQXBtQjJDLGtCQUFRLEdBb21CbkQ7a0JBcG1Cb0IsY0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IENvbW1vbiBmcm9tICcuLi8uLi9Db21tb24vQ29tbW9uJztcbmltcG9ydCBCYXNlVmlldyBmcm9tIFwiLi9CYXNlVmlld1wiO1xuaW1wb3J0IE0gZnJvbSBcIi4uLy4uLy4uL0Jhc2UvTWFuYWdlci9NXCI7XG5pbXBvcnQgSXRlbUdyb3VuZEN0cmwgZnJvbSBcIi4vSXRlbUdyb3VuZEN0cmxcIjtcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSBcIi4uLy4uL0RhdGEvQ29uc3QvRXZlbnRcIjtcbmltcG9ydCBHcm91bmRDZWxsTW9kZWwgZnJvbSBcIi4uL01vZGVsL0dyb3VuZENlbGxNb2RlbFwiO1xuaW1wb3J0IHsgTm9kZVBvb2xLZXksIENlbGxUeXBlLCBHcm91bmRUeXBlIH0gZnJvbSBcIi4uLy4uL0RhdGEvQ29uc3QvQ29uc3RhbnRcIjtcbmltcG9ydCB7IEdub21lLCBJTGV2ZWwsIElMYXdubW93ZXIgfSBmcm9tIFwiLi4vLi4vRGF0YS9JbnRlcmZhY2UvTGV2ZWwvSUxldmVsXCI7XG5pbXBvcnQgeyBDb2xsZWN0VHlwZSB9IGZyb20gXCIuLi9Nb2RlbC9Db2xsZWN0TW9kZWxcIjtcbmltcG9ydCBHYW1lTW9kZWwsIHsgSUdyaWREYXRhIH0gZnJvbSBcIi4uL01vZGVsL0dhbWVNb2RlbFwiO1xuaW1wb3J0IFNwaW5lUGxheWVyQ3RybCBmcm9tIFwiLi4vLi4vLi4vQmFzZS9DdXN0b21Db21wb25lbnQvU3BpbmVQbGF5ZXJDdHJsXCI7XG5pbXBvcnQgeyBHYXBUaW1lIH0gZnJvbSBcIi4uLy4uL0RhdGEvQ29uc3QvVGltZUNvbmZpZ1wiO1xuaW1wb3J0IENyYWJNb2RlbCBmcm9tIFwiLi4vTW9kZWwvbXVsdGlwbGVHcmlkQ29sL0NyYWJNb2RlbFwiO1xuaW1wb3J0IEFjdGlvbkN0cmwgZnJvbSBcIi4uLy4uL0NvbW1vbi9BY3Rpb25DdHJsXCI7XG5pbXBvcnQgTWF0Y2gzU2tpbiBmcm9tIFwiLi4vU2tpbi9NYXRjaDNTa2luXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbmludGVyZmFjZSBJTW9ua2V5VHJlZSB7IHRyZWU6IFNwaW5lUGxheWVyQ3RybDsgcG9zOiBjYy5WZWMyLCBleHA6IG51bWJlciwgcmVtYWluTGFiZWw6IGNjLkxhYmVsIH1cblxuLyoq5omY55uY5Z+65LqO5Lit5b+D55qE5YGP56e76YePICovXG5jb25zdCBUcmF5T2Zmc2V0OiBjYy5WZWMyID0gY2MudjIoMTIsIDQ1KTtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyb3VuZFZpZXdDdHJsIGV4dGVuZHMgQmFzZVZpZXc8R3JvdW5kQ2VsbE1vZGVsW11bXT4ge1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgYm9yZGVyUGFyZW50OiBjYy5Ob2RlID0gbnVsbDtcbiAgICAvL+WcsOadv+S5i+S4iuagkeWPtuetieS5i+S4iyjmsrPpgZPnrYkuLilcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICB3YXRlclBhcmVudDogY2MuTm9kZSA9IG51bGw7XG4gICAgLy/lnLDmnb/kuIrpga7kvY/mlLbpm4bniannmoTnianlk4Eo5qCR5Y+2Li4u562JKVxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIG11bHRGdW5jUGFyZW50OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGdub21lUGFyZW50OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIHByaXZhdGUgX2NmZzogSUxldmVsID0gbnVsbDtcblxuICAgIHByaXZhdGUgX2NvbXBsZXhJdGVtTWFwOiBBcnJheTxBcnJheTxjYy5Ob2RlPj4gPSBudWxsO1xuXG4gICAgLyoq5b2T5YmN5Zyw5Zu+57G75Z6LIHdhdGVyIGdyYXNzICovXG4gICAgcHJpdmF0ZSB0eXBlOiBzdHJpbmcgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBnbm9tZUFyeTogeyBbaW54OiBudW1iZXJdOiBjYy5Ob2RlIH0gPSB7fTtcbiAgICBwcml2YXRlIGNyYWJBcnk6IHsgW2lueDogbnVtYmVyXTogY2MuTm9kZSB9ID0ge307XG4gICAgcHJpdmF0ZSBtb25rZXlUcmVlQXJ5OiB7IFtpbng6IG51bWJlcl06IElNb25rZXlUcmVlIH0gPSB7fTtcbiAgICBwcml2YXRlIHR1cnRsZXNBcnk6IHsgW2lueDogbnVtYmVyXTogeyBjdHJsOiBTcGluZVBsYXllckN0cmwsIHBvczogY2MuVmVjMiB9IH0gPSB7fTtcblxuICAgIG9uTG9hZCgpIHsgfVxuXG4gICAgcHVibGljIGluaXRWaWV3KG1vZGVsczogR3JvdW5kQ2VsbE1vZGVsW11bXSwgZGF0YT86IElHcmlkRGF0YSwgY2ZnPzogSUxldmVsLCBncm91bmRUeXBlPzogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyLmluaXRWaWV3KG1vZGVscyk7XG4gICAgICAgIHRoaXMudHlwZSA9IGdyb3VuZFR5cGU7XG4gICAgICAgIHRoaXMuX2NmZyA9IGNmZztcbiAgICAgICAgY29uc3QgZ3JvdW5kQmFzZVByZWZhYiA9IE1hdGNoM1NraW4ucmVxdWlyZVByZWZhYihcImdyb3VuZEJhc2VcIik7XG4gICAgICAgIGNvbnN0IGdyb3VuZEl0ZW1QcmVmYWIgPSBNYXRjaDNTa2luLnJlcXVpcmVQcmVmYWIoXCJncm91bmRJdGVtXCIpO1xuICAgICAgICBjb25zdCBnbm9tZVByZWZhYiA9IE1hdGNoM1NraW4ucmVxdWlyZVByZWZhYihcImdub21lXCIpO1xuICAgICAgICBjb25zdCB0dXJ0bGVzUHJlZmFiID0gTWF0Y2gzU2tpbi5yZXF1aXJlUHJlZmFiKFwidHVydGxlc1wiKTtcbiAgICAgICAgY29uc3QgY3JhYlByZWZhYiA9IE1hdGNoM1NraW4ucmVxdWlyZVByZWZhYihcImNyYWJcIik7XG4gICAgICAgIGNvbnN0IG1vbmtleVRyZWVQcmVmYWIgPSBNYXRjaDNTa2luLnJlcXVpcmVQcmVmYWIoXCJtb25rZXlUcmVlXCIpO1xuICAgICAgICBjb25zdCBnZW1QcmVmYWIgPSBNYXRjaDNTa2luLnJlcXVpcmVQcmVmYWIoXCJnZW1cIik7XG5cbiAgICAgICAgaWYgKGdyb3VuZEJhc2VQcmVmYWIpIHtcbiAgICAgICAgICAgIE0ubm9kZVBvb2wuY3JlYXRlKE5vZGVQb29sS2V5Lkdyb3VuZENlbGwsIGdyb3VuZEJhc2VQcmVmYWIsIDE1MCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKEdhbWVNb2RlbC5pbnMuaXNIYXZlR2VtICYmIGdlbVByZWZhYikge1xuICAgICAgICAgICAgTS5ub2RlUG9vbC5jcmVhdGUoTm9kZVBvb2xLZXkuR2VtTm9kZSwgZ2VtUHJlZmFiLCAyMCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZ3JvdW5kSXRlbVByZWZhYikge1xuICAgICAgICAgICAgTS5ub2RlUG9vbC5jcmVhdGUoTm9kZVBvb2xLZXkuR3JvdW5kTXVsdGksIGdyb3VuZEl0ZW1QcmVmYWIsIDEzMCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmluaXRCYXNlVmlldyhtb2RlbHMpO1xuICAgICAgICB0aGlzLmluaXRHbm9tZShkYXRhLm1nTW9kZWwuZ2V0Q29uZmlnKENvbGxlY3RUeXBlLmdub21lKSwgZ25vbWVQcmVmYWIpO1xuICAgICAgICB0aGlzLmluaXRUdXJ0bGVzKGRhdGEubWdNb2RlbC5nZXRDb25maWcoQ29sbGVjdFR5cGUudHVydGxlcyksIHR1cnRsZXNQcmVmYWIpO1xuICAgICAgICB0aGlzLmluaXRDcmFiKGRhdGEubWdNb2RlbC5nZXRDb25maWcoQ29sbGVjdFR5cGUuY3JhYiksIGNyYWJQcmVmYWIpO1xuICAgICAgICB0aGlzLmluaXRNb25rZXlUcmVlKGNmZy5tb25rZXlUcmVlLCBtb25rZXlUcmVlUHJlZmFiKTtcbiAgICAgICAgdGhpcy5pbml0TGF3bm1vd2VyKGNmZy5sYXdubW93ZXIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdENyYWIoY3JhYkNmZzogQXJyYXk8R25vbWU+LCBjcmFiUHJlZmFiOiBjYy5QcmVmYWIpIHtcbiAgICAgICAgaWYgKCFjcmFiQ2ZnKSByZXR1cm47XG4gICAgICAgIGlmICghY3JhYlByZWZhYikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIltNYXRjaDNTa2luXSBtaXNzaW5nIGNyYWIgcHJlZmFiXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY3JhYkNmZy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgY2ZnID0gY3JhYkNmZ1tpXTtcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSBNLm5vZGVQb29sLmNyZWF0ZUl0ZW0oY3JhYlByZWZhYik7XG4gICAgICAgICAgICBjb25zdCB0b3BQb3MgPSBDb21tb24uZ2V0UG9zKGNmZy54LCBjZmcueSwgY2ZnLmluZGV4KTtcbiAgICAgICAgICAgIGNvbnN0IHRtcFNjYWxlSGVpZ2h0ID0gMjA7XG4gICAgICAgICAgICBub2RlWydjZmcnXSA9IGNmZztcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5nbm9tZVBhcmVudDtcbiAgICAgICAgICAgIG5vZGUueCA9IHRvcFBvcy54IC0gQ29tbW9uLkdSSURfVyAvIDI7XG4gICAgICAgICAgICBub2RlLnkgPSB0b3BQb3MueSArIENvbW1vbi5HUklEX0ggLyAyO1xuXG4gICAgICAgICAgICBub2RlLnNldFNjYWxlKChDb21tb24uR1JJRF9IIC0gdG1wU2NhbGVIZWlnaHQpIC8gKG5vZGUuaGVpZ2h0IC8gKChNYXRoLmZsb29yKGNmZy50eXBlIC8gMikgKyAxKSAqIDIpKSk7XG4gICAgICAgICAgICBpZiAoY2ZnLnR5cGUgJSAyID09IDApIHtcbiAgICAgICAgICAgICAgICBub2RlLmFuZ2xlID0gOTA7XG4gICAgICAgICAgICAgICAgbm9kZS55IC09IChub2RlLndpZHRoICogbm9kZS5zY2FsZSk7XG4gICAgICAgICAgICAgICAgY2ZnLnR5cGUgPCAyICYmIChub2RlLnggKz0gdG1wU2NhbGVIZWlnaHQpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNmZy50eXBlIDwgMiAmJiAobm9kZS55IC09IHRtcFNjYWxlSGVpZ2h0KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNmZy54IDwgKEdhbWVNb2RlbC5HcmlkU2l6ZS5XIC0gMSkgLyAyKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IG5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2l0ZW0nKTtcbiAgICAgICAgICAgICAgICBpdGVtLnNjYWxlWCA9IC1pdGVtLnNjYWxlWDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY3JhYkFyeVtpXSA9IG5vZGU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRNb25rZXlUcmVlKG1vbmtleVRyZWVDZmc6IEFycmF5PEdub21lPiwgbW9ua2V5VHJlZVByZWZhYjogY2MuUHJlZmFiKSB7XG4gICAgICAgIGlmICghbW9ua2V5VHJlZUNmZykgcmV0dXJuO1xuICAgICAgICBpZiAoIW1vbmtleVRyZWVQcmVmYWIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJbTWF0Y2gzU2tpbl0gbWlzc2luZyBtb25rZXlUcmVlIHByZWZhYlwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1vbmtleVRyZWVDZmcubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGNmZyA9IG1vbmtleVRyZWVDZmdbaV07XG4gICAgICAgICAgICBjb25zdCBwb3MgPSBjYy52MihjZmcueCwgY2ZnLnkpO1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMuY3JlYXRlTW9ua2V5VHJlZShDb21tb24uZ2V0UG9zKHBvcy54LCBwb3MueSwgY2ZnLmluZGV4KSwgbW9ua2V5VHJlZVByZWZhYik7XG4gICAgICAgICAgICBkYXRhLnBvcyA9IHBvcztcbiAgICAgICAgICAgIGRhdGEuZXhwID0gMDtcbiAgICAgICAgICAgIGRhdGEucmVtYWluTGFiZWwgPSBjYy5maW5kKCdxaXBhby9jb3VudCcsIGRhdGEudHJlZS5ub2RlKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgICAgICAgICAgdGhpcy5tb25rZXlUcmVlQXJ5W2ldID0gZGF0YTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTW9uZXlUcmVlU3RhdGUoaSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRMYXdubW93ZXIobGF3bm1vd2VyQ2ZnOiBJTGF3bm1vd2VyW10pIHtcbiAgICAgICAgaWYgKCFsYXdubW93ZXJDZmcpIHJldHVybjtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsYXdubW93ZXJDZmcubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGNmZyA9IGxhd25tb3dlckNmZ1tpXTtcbiAgICAgICAgICAgIGNvbnN0IHBvcyA9IGNjLnYyKGNmZy54LCBjZmcueSk7XG4gICAgICAgICAgICBjb25zdCBncm91bmRDZWxsID0gQ29tbW9uLnNhZmVHZXQyQXJyYXlWYWx1ZShHYW1lTW9kZWwuaW5zLkdyb3VuZExpc3QsIHBvcyk7XG4gICAgICAgICAgICBpZiAoZ3JvdW5kQ2VsbCkge1xuICAgICAgICAgICAgICAgIC8v6ZSB5a6a6L+Z5Liq5Z2Q5qCHIVxuICAgICAgICAgICAgICAgIGdyb3VuZENlbGwuY2hhbmdlMlRhcmdldFR5cGUoR3JvdW5kVHlwZS5UdWl0dWppLCBjZmcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgR2FtZU1vZGVsLmlucy5Db2xsZWN0TW9kZWwuY29sbGVjdFBvd2VyQ2VsbHNbY2ZnLnR5cGVdID0gZ3JvdW5kQ2VsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdFR1cnRsZXModHVydGxlc0NmZzogQXJyYXk8R25vbWU+LCB0dXJ0bGVzUHJlZmFiOiBjYy5QcmVmYWIpIHtcbiAgICAgICAgaWYgKCF0dXJ0bGVzQ2ZnKSByZXR1cm47XG4gICAgICAgIGlmICghdHVydGxlc1ByZWZhYikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIltNYXRjaDNTa2luXSBtaXNzaW5nIHR1cnRsZXMgcHJlZmFiXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHVydGxlc0NmZy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgY2ZnID0gdHVydGxlc0NmZ1tpXTtcbiAgICAgICAgICAgIGNvbnN0IHBvcyA9IENvbW1vbi5nZXRQb3MoY2ZnLngsIGNmZy55LCBjZmcuaW5kZXgpO1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gQ29tbW9uLmNyZWF0ZVNwaW5lTm9kZSh0aGlzLmdub21lUGFyZW50LCB0dXJ0bGVzUHJlZmFiLCBudWxsLCBwb3MuYWRkKGNjLnYyKENvbW1vbi5HUklEX1cgLyAyLCAtQ29tbW9uLkdSSURfSCAvIDIpKSk7XG4gICAgICAgICAgICB0aGlzLnR1cnRsZXNBcnlbaV0gPSB7IGN0cmw6IHJlc3VsdC5jdHJsLCBwb3M6IGNjLnYyKGNmZy54LCBjZmcueSkgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdEdub21lKGdub21lQ2ZnOiBBcnJheTxHbm9tZT4sIGdub21lUHJlZmFiOiBjYy5QcmVmYWIpIHtcbiAgICAgICAgaWYgKCFnbm9tZUNmZykgcmV0dXJuO1xuICAgICAgICBpZiAoIWdub21lUHJlZmFiKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiW01hdGNoM1NraW5dIG1pc3NpbmcgZ25vbWUgcHJlZmFiXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ25vbWVDZmcubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGNmZyA9IGdub21lQ2ZnW2ldO1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IE0ubm9kZVBvb2wuY3JlYXRlSXRlbShnbm9tZVByZWZhYik7XG4gICAgICAgICAgICBjb25zdCB0b3BQb3MgPSBDb21tb24uZ2V0UG9zKGNmZy54LCBjZmcueSwgY2ZnLmluZGV4KTtcbiAgICAgICAgICAgIGNvbnN0IHRtcFNjYWxlSGVpZ2h0ID0gMjA7XG5cbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5nbm9tZVBhcmVudDtcbiAgICAgICAgICAgIG5vZGUueCA9IHRvcFBvcy54IC0gQ29tbW9uLkdSSURfVyAvIDI7XG4gICAgICAgICAgICBub2RlLnkgPSB0b3BQb3MueSArIENvbW1vbi5HUklEX0ggLyAyO1xuICAgICAgICAgICAgbm9kZS5zZXRTY2FsZShDb21tb24uR1JJRF9IIC8gKG5vZGUuaGVpZ2h0IC8gKChNYXRoLmZsb29yKGNmZy50eXBlIC8gMikgKyAxKSAqIDIpKSk7XG4gICAgICAgICAgICBpZiAoY2ZnLnR5cGUgJSAyID09IDApIHtcbiAgICAgICAgICAgICAgICBub2RlLmFuZ2xlID0gOTA7XG4gICAgICAgICAgICAgICAgbm9kZS55IC09IChub2RlLndpZHRoICogbm9kZS5zY2FsZSAtIHRtcFNjYWxlSGVpZ2h0ICogbm9kZS5zY2FsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmdub21lQXJ5W2ldID0gbm9kZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBwbGF5Q3JhYkFuaSh1cExheWVyOiBjYy5Ob2RlLCBpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmNyYWJBcnlbaW5kZXhdO1xuICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgICAgaXRlbS5wYXJlbnQgPSB1cExheWVyO1xuICAgICAgICAgICAgaXRlbS5zZXRQb3NpdGlvbih1cExheWVyLmNvbnZlcnRUb05vZGVTcGFjZUFSKENvbW1vbi5nZXRXb3JsZFBvcyhpdGVtKSkpO1xuICAgICAgICAgICAgY29uc3QgcHhDdHJsID0gaXRlbS5nZXRDaGlsZEJ5TmFtZSgnaXRlbScpLmdldENvbXBvbmVudChTcGluZVBsYXllckN0cmwpO1xuICAgICAgICAgICAgY29uc3QgY2ZnOiBHbm9tZSA9IGl0ZW1bJ2NmZyddO1xuICAgICAgICAgICAgbGV0IGRpciA9IGNjLnYyKC0xLCAwKTtcbiAgICAgICAgICAgIE0uZXZlbnQuc2VuZChFdmVudC5VSS5VcGRhdGVJbmZvUGFuZWwsIENvbGxlY3RUeXBlLmNyYWIpO1xuICAgICAgICAgICAgaWYgKGNmZy54IDwgKEdhbWVNb2RlbC5HcmlkU2l6ZS5XIC0gMSkgLyAyKSB7XG4gICAgICAgICAgICAgICAgZGlyLnggPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHhDdHJsLnBsYXkoJ3Bhbmd4aWUyJywgMCwgZmFsc2UsICgpID0+IHtcbiAgICAgICAgICAgICAgICBpdGVtLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy/lvIDlp4vmiafooYzmtojpmaTmk43kvZwhIFxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIEdhbWVNb2RlbC5pbnMuZ2V0TWdNb2RlbCgpLm9uQ29tcGxldChDb2xsZWN0VHlwZS5jcmFiLCBkaXIueCwgY2MudjIoY2ZnLngsIGNmZy55KSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBtID0gR2FtZU1vZGVsLmlucy5nZXRNZ01vZGVsKCkuZ2V0TW9kZWwoQ29sbGVjdFR5cGUuY3JhYikgYXMgQ3JhYk1vZGVsXG4gICAgICAgICAgICAgICAgICAgIG0gJiYgbS5mcmVlR3JpZChjYy52MihjZmcueCwgY2ZnLnkpLCBpbmRleCk7XG4gICAgICAgICAgICAgICAgfSwgR2FwVGltZS5DcmFiU3RhcnRlZEZhbGxHYXApO1xuICAgICAgICAgICAgfSwgR2FwVGltZS5DcmFiU3RhcnRFbGltYXRlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBwbGF5VHVydGxlc0FuaSh1cExheWVyOiBjYy5Ob2RlLCBpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLnR1cnRsZXNBcnlbaW5kZXhdO1xuICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgICAgaXRlbS5jdHJsLm5vZGUucGFyZW50ID0gdXBMYXllcjtcbiAgICAgICAgICAgIGl0ZW0uY3RybC5wbGF5KCdoYWlndWlfcnVuJywgMCwgZmFsc2UsICgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBjb25zdCB0YXJnZXRQb3MgPSBjYy52MigtMTAwMCwgNzAwKTtcbiAgICAgICAgICAgICAgICBjb25zdCBub2RlID0gaXRlbS5jdHJsLm5vZGU7XG4gICAgICAgICAgICAgICAgLy8gY29uc3Qgcm90YXRpb24gPSBNYXRoLmF0YW4yKE1hdGguYWJzKHRhcmdldFBvcy55KSAtIE1hdGguYWJzKG5vZGUueSksIE1hdGguYWJzKHRhcmdldFBvcy54KSAtIE1hdGguYWJzKG5vZGUueCkpIC8gTWF0aC5QSSAqIDE4MDtcbiAgICAgICAgICAgICAgICAvLyBjb25zdCBhMCA9IGNjLnJvdGF0ZVRvKDEsIHJvdGF0aW9uKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zdCBhMSA9IGNjLmNhbGxGdW5jKCgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyAgICAgLy/pgJrnn6XkuIrpnaLlvIDlp4vmjonokL0hISFcbiAgICAgICAgICAgICAgICAvLyAgICAgR2FtZU1vZGVsLmlucy5nZXRHbm9tZU1vZGVsKCkudHVydGxlc0NvbXBsZXQoaW5kZXgsIGl0ZW0ucG9zKTtcbiAgICAgICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgICAgICAgICAvLyBjb25zdCBhMiA9IGNjLm1vdmVUbygyLCB0YXJnZXRQb3MpO1xuICAgICAgICAgICAgICAgIC8vIGNvbnN0IGEzID0gY2MuY2FsbEZ1bmMoKCkgPT4ge1xuICAgICAgICAgICAgICAgIG5vZGUuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIC8vIH0pO1xuICAgICAgICAgICAgICAgIC8vIG5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGEwLCBhMSwgYTIsIGEzKSk7IFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBNLmV2ZW50LnNlbmQoRXZlbnQuVUkuVXBkYXRlSW5mb1BhbmVsLCBDb2xsZWN0VHlwZS50dXJ0bGVzKTtcbiAgICAgICAgICAgICAgICBHYW1lTW9kZWwuaW5zLmdldE1nTW9kZWwoKS5vbkNvbXBsZXQoQ29sbGVjdFR5cGUudHVydGxlcywgaW5kZXgsIGl0ZW0ucG9zKTtcbiAgICAgICAgICAgIH0sIEdhcFRpbWUuVHVydGxlc092ZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHBsYXlGaXJlZmx5QW5pKHBhcmVudDogY2MuTm9kZSwgc2VsZlBvczogY2MuVmVjMiwgdGFyZ2V0UG9zOiBjYy5WZWMyKSB7XG4gICAgICAgIGNvbnN0IHByZWZhYiA9IE1hdGNoM1NraW4ucmVxdWlyZVByZWZhYihcImZpcmVmbHlcIik7XG4gICAgICAgIGlmICghcHJlZmFiKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgbm9kZSA9IE0ubm9kZVBvb2wuZ2V0SXRlbShOb2RlUG9vbEtleS5GaXJlZmx5LCBwcmVmYWIpO1xuICAgICAgICBub2RlLnBhcmVudCA9IHBhcmVudDtcbiAgICAgICAgbm9kZS5zZXRQb3NpdGlvbihwYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIodGhpcy53YXRlclBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoc2VsZlBvcykpKTtcblxuICAgICAgICBBY3Rpb25DdHJsLmlucy5ydW5Db2xsZWN0R2VtKG5vZGUsIHRhcmdldFBvcywgcGFyZW50KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIE0ubm9kZVBvb2wuZnJlZUl0ZW0oTm9kZVBvb2xLZXkuRmlyZWZseSwgbm9kZSk7XG4gICAgICAgICAgICBNLmV2ZW50LnNlbmQoRXZlbnQuVUkuVXBkYXRlSW5mb1BhbmVsLCBDb2xsZWN0VHlwZS5maXJlZmx5KTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBwdWJsaWMgcGxheUdlbUFuaShwYXJlbnQ6IGNjLk5vZGUsIHNlbGZQb3M6IGNjLlZlYzIsIHRhcmdldFBvczogY2MuVmVjMikge1xuICAgICAgICBjb25zdCBwcmVmYWIgPSBNYXRjaDNTa2luLnJlcXVpcmVQcmVmYWIoXCJnZW1cIik7XG4gICAgICAgIGlmICghcHJlZmFiKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgbm9kZSA9IE0ubm9kZVBvb2wuZ2V0SXRlbShOb2RlUG9vbEtleS5HZW1Ob2RlLCBwcmVmYWIpO1xuICAgICAgICBub2RlLnBhcmVudCA9IHBhcmVudDtcbiAgICAgICAgbm9kZS5zZXRQb3NpdGlvbihwYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIodGhpcy53YXRlclBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoc2VsZlBvcykpKTtcblxuICAgICAgICBBY3Rpb25DdHJsLmlucy5ydW5Db2xsZWN0R2VtKG5vZGUsIHRhcmdldFBvcywgcGFyZW50KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIE0ubm9kZVBvb2wuZnJlZUl0ZW0oTm9kZVBvb2xLZXkuR2VtTm9kZSwgbm9kZSk7XG4gICAgICAgICAgICBNLmV2ZW50LnNlbmQoRXZlbnQuVUkuVXBkYXRlSW5mb1BhbmVsLCBDb2xsZWN0VHlwZS5nZW0pO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIHB1YmxpYyBwbGF5R25vbWVBbmkocGFyZW50OiBjYy5Ob2RlLCBpbmRleDogbnVtYmVyLCB0YXJnZXRQb3M6IGNjLlZlYzIpIHtcbiAgICAgICAgY29uc3QgZ24gPSB0aGlzLmdub21lQXJ5W2luZGV4XTtcbiAgICAgICAgaWYgKGduKSB7XG4gICAgICAgICAgICBBY3Rpb25DdHJsLmlucy5ydW5Db2xsZWN0R25vbWUoZ24sIHRhcmdldFBvcywgcGFyZW50KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBnbi5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgTS5ldmVudC5zZW5kKEV2ZW50LlVJLlVwZGF0ZUluZm9QYW5lbCwgQ29sbGVjdFR5cGUuZ25vbWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0R25vbWVBcnkoKTogeyBbaW54OiBudW1iZXJdOiBjYy5Ob2RlIH0ge1xuICAgICAgICByZXR1cm4gdGhpcy5nbm9tZUFyeTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5bogIHlpLTmlLbpm4bniannmoTnp7vliqjot53nprtcbiAgICAgKiBAcGFyYW0gY3VyVmlldyBcbiAgICAgKiBAcGFyYW0gbWFza05vZGUgXG4gICAgICovXG4gICAgcHVibGljIGNoZWNrQ29sbGVjdE1vdmVEaXN0YW5jZShjdXJWaWV3OiBjYy5Ob2RlLCBtYXNrTm9kZTogY2MuTm9kZSk6IG51bWJlciB7XG4gICAgICAgIGxldCBtb3ZlR2FwID0gMDtcbiAgICAgICAgaWYgKGN1clZpZXcuaGVpZ2h0ID4gMCkge1xuICAgICAgICAgICAgLy/pgY3ljobmo4DmtYvmiYDmnInnmoTmlLbpm4bnianmmK/lkKbmnInlnKjkuK3lv4PnmoQgXG4gICAgICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5nbm9tZUFyeSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGdub21lTm9kZSA9IHRoaXMuZ25vbWVBcnlba2V5XTtcbiAgICAgICAgICAgICAgICBjb25zdCB3cCA9IGdub21lTm9kZS5wYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKGdub21lTm9kZS5wb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgY29uc3QgbXAgPSBtYXNrTm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUih3cCk7XG4gICAgICAgICAgICAgICAgaWYgKG1wLnkgPCAwICYmIG1wLnkgPCBtYXNrTm9kZS5oZWlnaHQgLyAzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpc3RhbmNlID0gTWF0aC5hYnMobXAueSkgKyAoZ25vbWVOb2RlLmFuZ2xlICE9IDAgPyBnbm9tZU5vZGUud2lkdGggOiBnbm9tZU5vZGUuaGVpZ2h0KSAqIGdub21lTm9kZS5zY2FsZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWF4RGlzdGFuY2UgPSAoY3VyVmlldy5oZWlnaHQgLyAyIC0gY3VyVmlldy55KSAtIG1hc2tOb2RlLmhlaWdodCAvIDIgKyBDb21tb24uR1JJRF9IIC8gMlxuICAgICAgICAgICAgICAgICAgICBtb3ZlR2FwID0gZGlzdGFuY2UgPiBtYXhEaXN0YW5jZSA/IG1heERpc3RhbmNlIDogZGlzdGFuY2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbW92ZUdhcCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbW92ZUdhcDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRCYXNlVmlldyhtb2RlbHM6IEFycmF5PEFycmF5PEdyb3VuZENlbGxNb2RlbD4+KSB7XG4gICAgICAgIGNvbnN0IHlMZW5ndGggPSBtb2RlbHMubGVuZ3RoO1xuICAgICAgICBjb25zdCB4TGVuZ3RoID0gbW9kZWxzWzBdLmxlbmd0aDtcbiAgICAgICAgbGV0IGluZGV4ID0gbnVsbDtcbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPD0geUxlbmd0aDsgeSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8PSB4TGVuZ3RoOyB4KyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBnSXRlbSA9IG1vZGVsc1t5XSA/IG1vZGVsc1t5XVt4XSA6IG51bGw7XG4gICAgICAgICAgICAgICAgLy/mmL7npLrlnLDmnb9cbiAgICAgICAgICAgICAgICBsZXQgY21wOiBJdGVtR3JvdW5kQ3RybCA9IG51bGw7XG4gICAgICAgICAgICAgICAgaWYgKGdJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleCA9IGdJdGVtLmdldE1hcEluZGV4KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbGV0IGJhc2VTcHJpdGU6IGNjLlNwcml0ZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGlmIChnSXRlbS5nZXRUeXBlKCkgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZ3JvdW5kQmFzZVByZWZhYiA9IE1hdGNoM1NraW4ucmVxdWlyZVByZWZhYihcImdyb3VuZEJhc2VcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ3JvdW5kQmFzZVByZWZhYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGdyb3VuZEJhc2UgPSBNLm5vZGVQb29sLmdldEl0ZW0oTm9kZVBvb2xLZXkuR3JvdW5kQ2VsbCwgZ3JvdW5kQmFzZVByZWZhYik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdW5kQmFzZS5zZXRQb3NpdGlvbihnSXRlbS5nZXRQb3NpdGlvbigpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYXNlU3ByaXRlID0gZ3JvdW5kQmFzZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEdyb3VuZFNwcml0ZShiYXNlU3ByaXRlLCB4LCB5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91bmRCYXNlLnBhcmVudCA9IHRoaXMuYm9yZGVyUGFyZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VuZEJhc2UuekluZGV4ID0gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBncm91bmRJdGVtUHJlZmFiID0gTWF0Y2gzU2tpbi5yZXF1aXJlUHJlZmFiKFwiZ3JvdW5kSXRlbVwiKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFncm91bmRJdGVtUHJlZmFiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBub2RlID0gTS5ub2RlUG9vbC5nZXRJdGVtKE5vZGVQb29sS2V5Lkdyb3VuZE11bHRpLCBncm91bmRJdGVtUHJlZmFiKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiW01hdGNoM1NraW5dIGNyZWF0ZSBncm91bmRJdGVtIG5vZGUgZmFpbGVkXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbm9kZVsnYmFzZVNwcml0ZSddID0gYmFzZVNwcml0ZTtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLm11bHRGdW5jUGFyZW50O1xuICAgICAgICAgICAgICAgICAgICBjbXAgPSBub2RlLmdldENvbXBvbmVudChJdGVtR3JvdW5kQ3RybCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghY21wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBza2luQ29uZmlnID0gTWF0Y2gzU2tpbi5nZXRDb25maWcoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHByZWZhYlBhdGggPSBza2luQ29uZmlnICYmIHNraW5Db25maWcucHJlZmFicyA/IHNraW5Db25maWcucHJlZmFicy5ncm91bmRJdGVtIDogbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJbTWF0Y2gzU2tpbl0gZ3JvdW5kSXRlbSBwcmVmYWIgbWlzc2luZyBJdGVtR3JvdW5kQ3RybDpcIiwgbm9kZS5uYW1lLCBwcmVmYWJQYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY21wLmluaXQoZ0l0ZW0sIHRoaXMuYm9yZGVyUGFyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgZ0l0ZW0uZXh0RGF0YSA9IG5vZGU7XG4gICAgICAgICAgICAgICAgICAgIGdJdGVtLmV4dEN0cmwgPSBjbXA7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93Q29tcGxleEl0ZW0oeCwgeSwgR3JvdW5kVHlwZS5XYXRlcik7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5zaG93Q29tcGxleEl0ZW0oeCwgeSwgR3JvdW5kVHlwZS5Hcm91bmQpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgYm9yZGVyQ29mZiA9IHRoaXMuZ2V0Qm9yZGVyU3ByaXRlTmFtZSh4LCB5KTtcbiAgICAgICAgICAgICAgICBpZiAoQ29tbW9uLmdldEdyb3VuZEJvcmRlckluZm8oYm9yZGVyQ29mZikpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0Qm9yZGVyVmlldyhib3JkZXJDb2ZmLCB4LCB5LCBpbmRleCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHRoaXMuY2hlY2tUcmF5KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5pu05paw5oyH5a6a5L2N572u55qE5aSN5p2C5rC0L+WcsOWdl+aYvuekulxuICAgICAqIEBwYXJhbSBwb3MgXG4gICAgICovXG4gICAgcHVibGljIHVwZGF0ZUNvbWxleEl0ZWFtQnlQb3MocG9zOiBjYy5WZWMyKSB7XG4gICAgICAgIC8v5Yig6Zmk5oyH5a6a54K55ZGo5Zu055qE5pi+56S6XG4gICAgICAgIC8vIGlmICh0aGlzLl9jb21wbGV4SXRlbU1hcCkge1xuICAgICAgICAvLyAgICAgLy/liKDpmaTkvY3nva7nmoTljp/lp4vkv6Hmga8hXG4gICAgICAgIC8vICAgICBjb25zdCBkaXJzID0gW2NjLnYyKDAsIDApLCBjYy52MigxLCAwKSwgY2MudjIoMCwgMSksIGNjLnYyKDEsIDEpXTtcbiAgICAgICAgLy8gICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBkaXJzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAvLyAgICAgICAgIGNvbnN0IHRhcmdldFBvcyA9IHBvcy5hZGQoZGlyc1tpbmRleF0pO1xuICAgICAgICAvLyAgICAgICAgIGlmICh0aGlzLl9jb21wbGV4SXRlbU1hcFt0YXJnZXRQb3MueV0pIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgY29uc3QgdGFyZ2V0Tm9kZSA9IHRoaXMuX2NvbXBsZXhJdGVtTWFwW3RhcmdldFBvcy55XVt0YXJnZXRQb3MueF07XG4gICAgICAgIC8vICAgICAgICAgICAgIE0ubm9kZVBvb2wuZnJlZUl0ZW0oTm9kZVBvb2xLZXkuQ29tcGxleEdyb3VuZCwgdGFyZ2V0Tm9kZSk7XG4gICAgICAgIC8vICAgICAgICAgICAgIHRoaXMuc2hvd0NvbXBsZXhJdGVtKHRhcmdldFBvcy54LCB0YXJnZXRQb3MueSwgR3JvdW5kVHlwZS5Hcm91bmQpO1xuICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfVxuICAgIH1cblxuICAgIHB1YmxpYyBzaG93Q29tcGxleEl0ZW0oeDogbnVtYmVyLCB5OiBudW1iZXIsIHR5cGU6IEdyb3VuZFR5cGUpIHtcbiAgICAgICAgY29uc3QgZ3JvdW5kQ29mZiA9IENvbW1vbi5nZXRTcHJpdGVOYW1lQnlUeXBlKHgsIHksIHRoaXMubW9kZWxzLCB0eXBlKTtcbiAgICAgICAgaWYgKGdyb3VuZENvZmYgIT0gXCIwMDAwXCIpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdFZpZXdCeVR5cGUoZ3JvdW5kQ29mZiwgeCwgeSwgdHlwZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKirorr7nva7lnLDpnaLnmoTmoLzlrZDpopzoibIhICovXG4gICAgcHJpdmF0ZSBzZXRHcm91bmRTcHJpdGUoc3ByaXRlOiBjYy5TcHJpdGUsIHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGZyYW1lID0gTWF0Y2gzU2tpbi5nZXRDZWxsQmFzZUZyYW1lKHRoaXMudHlwZSwgKHggKyB5KSAlIDIpO1xuICAgICAgICBpZiAoIWZyYW1lKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdbTWF0Y2gzU2tpbl0gbWlzc2luZyBjZWxsIGJhc2UgZnJhbWU6JywgdGhpcy50eXBlLCAoeCArIHkpICUgMik7XG4gICAgICAgIH1cbiAgICAgICAgc3ByaXRlLnNwcml0ZUZyYW1lID0gZnJhbWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRCb3JkZXJTcHJpdGVOYW1lKHg6IG51bWJlciwgeTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICAgICAgdmFyIGNvZmYgPSBcIlwiO1xuICAgICAgICBjb2ZmICs9IHRoaXMuZ2V0Q2VsbEVtcHR5U3RhdHVzKHggLSAxLCB5IC0gMSk7XG4gICAgICAgIGNvZmYgKz0gdGhpcy5nZXRDZWxsRW1wdHlTdGF0dXMoeCwgeSAtIDEpO1xuICAgICAgICBjb2ZmICs9IHRoaXMuZ2V0Q2VsbEVtcHR5U3RhdHVzKHggLSAxLCB5KTtcbiAgICAgICAgY29mZiArPSB0aGlzLmdldENlbGxFbXB0eVN0YXR1cyh4LCB5KTtcbiAgICAgICAgcmV0dXJuIGNvZmY7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0Qm9yZGVyVmlldyhjb2ZmOiBzdHJpbmcsIHgsIHksIGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgY2ZnID0gQ29tbW9uLmdldEdyb3VuZEJvcmRlckluZm8oY29mZik7XG4gICAgICAgIGNvbnN0IHBvcyA9IENvbW1vbi5nZXRQb3MoeCwgeSwgaW5kZXgpO1xuXG4gICAgICAgIHBvcy54IC09IENvbW1vbi5HUklEX1cgLyAyO1xuICAgICAgICBwb3MueSArPSBDb21tb24uR1JJRF9IIC8gMjtcblxuICAgICAgICB0aGlzLmNyZWF0ZU1pZGRsZUJvcmRlcihwb3MsIGNvZmYpO1xuICAgICAgICB0aGlzLmNyZWF0ZVVwQm9yZGVyKHBvcywgY2ZnLCBjb2ZmKTtcbiAgICB9XG5cbiAgICAvKlxuICAgIHByaXZhdGUgY2hlY2tUcmF5KCkge1xuICAgICAgICBpZiAodGhpcy50eXBlICE9ICd3YXRlcicpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmcmFnbWVudHMgPSBHYW1lTW9kZWwuaW5zLmdldExhc3RGcmFnbWVudCgpO1xuICAgICAgICBmcmFnbWVudHMuZm9yRWFjaCgoZjogQXJyYXk8R3JvdW5kQ2VsbE1vZGVsPikgPT4ge1xuICAgICAgICAgICAgY29uc3QgbCA9IGYubGVuZ3RoO1xuICAgICAgICAgICAgaWYgKGwgPj0gMiAmJiBsIDwgNCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlVHJheSgwLCBmWzBdLnBvcyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGwgPj0gNCAmJiBsIDwgNikge1xuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlVHJheSgxLCBmW2wgLSAxXS5wb3MsIGZhbHNlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobCA+PSA2KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVUcmF5KDAsIGZbMF0ucG9zKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVRyYXkoMSwgZltsIC0gMV0ucG9zLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlVHJheSh0eXBlOiBudW1iZXIsIHBvczogY2MuVmVjMiwgaXNQcmU6IGJvb2xlYW4gPSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IGZyYW1lID0gdGhpcy50cmF5RnJhbWVzW3R5cGVdO1xuICAgICAgICBpZiAoZnJhbWUpIHtcbiAgICAgICAgICAgIGNvbnN0IHRhcnlOb2RlID0gbmV3IGNjLk5vZGUoKTtcbiAgICAgICAgICAgIGNvbnN0IHNwcml0ZSA9IHRhcnlOb2RlLmFkZENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICAgICAgc3ByaXRlLnNwcml0ZUZyYW1lID0gZnJhbWU7XG4gICAgICAgICAgICB0YXJ5Tm9kZS5wYXJlbnQgPSB0aGlzLmJvcmRlclBhcmVudDtcbiAgICAgICAgICAgIHRhcnlOb2RlLnNldEFuY2hvclBvaW50KGlzUHJlID8gMCA6IDEsIDEpO1xuICAgICAgICAgICAgdGFyeU5vZGUuekluZGV4ID0gMjtcbiAgICAgICAgICAgIGxldCBiYXNlUG9zID0gQ29tbW9uLmdldFBvcyhwb3MueCwgcG9zLnkgKyAxKTtcbiAgICAgICAgICAgIGxldCBwb3NpdGlvbiA9IGNjLnYyKGJhc2VQb3MueCAtIENvbW1vbi5HUklEX1cgLyAyIC0gVHJheU9mZnNldC54LCBiYXNlUG9zLnkgKyBDb21tb24uR1JJRF9IIC8gMiAtIFRyYXlPZmZzZXQueSk7XG4gICAgICAgICAgICBpZiAoIWlzUHJlKSB7XG4gICAgICAgICAgICAgICAgcG9zaXRpb24gPSBjYy52MihiYXNlUG9zLnggKyBDb21tb24uR1JJRF9XIC8gMiArIFRyYXlPZmZzZXQueCwgYmFzZVBvcy55ICsgQ29tbW9uLkdSSURfSCAvIDIgLSBUcmF5T2Zmc2V0LnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGFyeU5vZGUuc2V0UG9zaXRpb24ocG9zaXRpb24pXG4gICAgICAgIH1cbiAgICB9XG4gICAgKi9cblxuICAgIHByaXZhdGUgY3JlYXRlTW9ua2V5VHJlZShwb3M6IGNjLlZlYzIsIG1vbmtleVRyZWVQcmVmYWI6IGNjLlByZWZhYik6IElNb25rZXlUcmVlIHtcbiAgICAgICAgbGV0IGN0cmxzOiBJTW9ua2V5VHJlZSA9IDxhbnk+e307XG4gICAgICAgIGlmICghbW9ua2V5VHJlZVByZWZhYikge1xuICAgICAgICAgICAgcmV0dXJuIGN0cmxzO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IENvbW1vbi5jcmVhdGVTcGluZU5vZGUodGhpcy5nbm9tZVBhcmVudCwgbW9ua2V5VHJlZVByZWZhYiwgbnVsbCwgcG9zLmFkZChjYy52MihDb21tb24uR1JJRF9XIC8gMiwgLUNvbW1vbi5HUklEX0ggLyAyKSkpXG4gICAgICAgIGN0cmxzLnRyZWUgPSByZXN1bHQuY3RybDtcbiAgICAgICAgcmVzdWx0LmN0cmwuX3NldE1peCgneWV6aXNodV95YW9zaHUnLCAneWV6aXNodV94aXV4aWFuJyk7XG4gICAgICAgIHJldHVybiBjdHJscztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UmFuZE1vbmtleVRyZWUoKTogeyBpbmRleDogbnVtYmVyLCBkYXRhOiBJTW9ua2V5VHJlZSB9IHtcbiAgICAgICAgbGV0IGRhdGEgPSBudWxsO1xuICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5tb25rZXlUcmVlQXJ5KSB7XG4gICAgICAgICAgICBkYXRhID0geyBpbmRleDoga2V5LCBkYXRhOiB0aGlzLm1vbmtleVRyZWVBcnlba2V5XSB9O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGFcbiAgICB9XG5cbiAgICBwdWJsaWMgbW9ua2V5VHJlZUV4cFVwKHVwTGF5ZXI6IGNjLk5vZGUsIGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMubW9ua2V5VHJlZUFyeVtpbmRleF07XG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICBkYXRhLmV4cCsrO1xuICAgICAgICAgICAgZGF0YS5yZW1haW5MYWJlbC5zdHJpbmcgPSBgeCR7OSAtIChkYXRhLmV4cCAlIDkpfWBcbiAgICAgICAgICAgIGlmIChkYXRhLmV4cCAlIDkgPT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb25rZXlXYWtlVXAodXBMYXllciwgaW5kZXgpO1xuICAgICAgICAgICAgICAgIH0sIDAuNSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG1vbmtleVdha2VVcCh1cExheWVyOiBjYy5Ob2RlLCBpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLm1vbmtleVRyZWVBcnlbaW5kZXhdO1xuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgZGF0YS50cmVlLnBsYXkoJ3llemlzaHVfeWFvc2h1JywgMCwgZmFsc2UsICgpID0+IHtcbiAgICAgICAgICAgICAgICBkYXRhLnRyZWUucGxheSgneWV6aXNodV94aXV4aWFuJywgMCwgdHJ1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIE0uZXZlbnQuc2VuZChFdmVudC5HYW1lQ01ELkNoYW5nZUNlbGwsIENlbGxUeXBlLkNvY29udXQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVNb25leVRyZWVTdGF0ZShpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLm1vbmtleVRyZWVBcnlbaW5kZXhdO1xuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGRhdGEudHJlZS5wbGF5KCd5ZXppc2h1X3hpdXhpYW4nLCAwLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBsZXQgYmFzZURpcnMgPSBbY2MudjIoMCwgMCksIGNjLnYyKDEsIDApLCBjYy52MigwLCAtMSksIGNjLnYyKDEsIC0xKSwgY2MudjIoMCwgLTIpLCBjYy52MigxLCAtMildO1xuICAgICAgICAgICAgICAgIGJhc2VEaXJzLmZvckVhY2goZGlyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY20gPSBDb21tb24uc2FmZUdldDJBcnJheVZhbHVlKEdhbWVNb2RlbC5pbnMuR3JvdW5kTGlzdCwgZGF0YS5wb3MuYWRkKGRpcikpO1xuICAgICAgICAgICAgICAgICAgICBjbSAmJiBjbS5pbml0TW9ua2V5VHJlZVBvcygpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZU1pZGRsZUJvcmRlcihwb3M6IGNjLlZlYzIsIG5hbWU6IHN0cmluZykge1xuXG4gICAgICAgIGlmIChuYW1lID09ICcxMTAxJyB8fCBuYW1lID09ICcxMTEwJyB8fCBuYW1lID09ICcwMTEwJyB8fCBuYW1lID09ICcxMDAxJykge1xuICAgICAgICAgICAgbmFtZSA9ICcxMTAwJztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGZyYW1lID0gTWF0Y2gzU2tpbi5nZXRNaWRkbGVCb3JkZXJGcmFtZSh0aGlzLnR5cGUsIG5hbWUpO1xuICAgICAgICBpZiAoZnJhbWUpIHtcbiAgICAgICAgICAgIGNvbnN0IGJvcmRlck5vZGUgPSBuZXcgY2MuTm9kZSgpO1xuICAgICAgICAgICAgY29uc3Qgc3ByaXRlID0gYm9yZGVyTm9kZS5hZGRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICAgICAgICAgIHNwcml0ZS5zaXplTW9kZSA9IGNjLlNwcml0ZS5TaXplTW9kZS5DVVNUT007XG4gICAgICAgICAgICBib3JkZXJOb2RlLnBhcmVudCA9IHRoaXMuYm9yZGVyUGFyZW50O1xuICAgICAgICAgICAgYm9yZGVyTm9kZS5hbmNob3JZID0gMTtcbiAgICAgICAgICAgIGJvcmRlck5vZGUuekluZGV4ID0gMTtcbiAgICAgICAgICAgIHNwcml0ZS5zcHJpdGVGcmFtZSA9IGZyYW1lO1xuICAgICAgICAgICAgbGV0IG9mZnNldCA9IGNjLnYyKDAsIC0xNCk7XG4gICAgICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICcwMTAwJzpcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyTm9kZS5hbmNob3JYID0gMTYgLyAoNTEuNSk7XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldCA9IGNjLnYyKDAsIENvbW1vbi5HUklEX0ggLyAyIC0gOCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJzEwMDAnOlxuICAgICAgICAgICAgICAgICAgICBib3JkZXJOb2RlLmFuY2hvclggPSAxIC0gKDE2IC8gKDUxLjUpKTtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gY2MudjIoMCwgQ29tbW9uLkdSSURfSCAvIDIgLSA4KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnMTEwMCc6XG5cbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyTm9kZS5zZXRDb250ZW50U2l6ZShjYy5zaXplKENvbW1vbi5HUklEX1csIGJvcmRlck5vZGUuaGVpZ2h0KSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYm9yZGVyTm9kZS5zZXRQb3NpdGlvbihwb3MuYWRkKG9mZnNldCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignW01hdGNoM1NraW5dIG1pc3NpbmcgbWlkZGxlIGJvcmRlciBmcmFtZTonLCB0aGlzLnR5cGUsIG5hbWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVVcEJvcmRlcihwb3M6IGNjLlZlYzIsIGNmZzogYW55LCBuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgYm9yZGVyTm9kZSA9IG5ldyBjYy5Ob2RlKCk7XG4gICAgICAgIGNvbnN0IHNwcml0ZSA9IGJvcmRlck5vZGUuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICAgIHNwcml0ZS50cmltID0gZmFsc2U7XG4gICAgICAgIHNwcml0ZS5zaXplTW9kZSA9IGNjLlNwcml0ZS5TaXplTW9kZS5DVVNUT007XG4gICAgICAgIGJvcmRlck5vZGUucGFyZW50ID0gdGhpcy5ib3JkZXJQYXJlbnQ7XG4gICAgICAgIGJvcmRlck5vZGUubmFtZSA9IGAke25hbWV9XyR7Y2ZnWzBdfWA7XG4gICAgICAgIGJvcmRlck5vZGUuekluZGV4ID0gMjtcbiAgICAgICAgY29uc3QgZnJhbWUgPSBNYXRjaDNTa2luLmdldFVwQm9yZGVyRnJhbWUodGhpcy50eXBlLCBjZmdbMF0pO1xuICAgICAgICBpZiAoIWZyYW1lKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdbTWF0Y2gzU2tpbl0gbWlzc2luZyB1cCBib3JkZXIgZnJhbWU6JywgdGhpcy50eXBlLCBjZmdbMF0pO1xuICAgICAgICB9XG4gICAgICAgIHNwcml0ZS5zcHJpdGVGcmFtZSA9IGZyYW1lO1xuICAgICAgICBib3JkZXJOb2RlLnNldFBvc2l0aW9uKHBvcyk7XG4gICAgICAgIGJvcmRlck5vZGUuc2V0U2NhbGUoY2ZnWzFdKTtcbiAgICAgICAgYm9yZGVyTm9kZS5zZXRDb250ZW50U2l6ZShDb21tb24uR1JJRF9XLCBDb21tb24uR1JJRF9IKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliJ3lp4vljJbmsLTnmoTmmL7npLohICBcbiAgICAgKiBAcGFyYW0gY29mZiAg5pCe5a6a6L+Z6YeMLuWwseiDveaQnuWumjUw5LiqZGNcbiAgICAgKi9cbiAgICBwcml2YXRlIGluaXRWaWV3QnlUeXBlKGNvZmY6IHN0cmluZywgeCwgeSwgdHlwZTogR3JvdW5kVHlwZSkge1xuICAgICAgICBsZXQgb2Zmc2V0ID0gY2MudjIoLUNvbW1vbi5HUklEX1cgLyAyLCBDb21tb24uR1JJRF9IIC8gMik7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBNLm5vZGVQb29sLmdldEl0ZW0oTm9kZVBvb2xLZXkuQ29tcGxleEdyb3VuZCk7XG4gICAgICAgIG5vZGUubmFtZSA9IGNvZmY7XG4gICAgICAgIGNvbnN0IHNwcml0ZSA9IG5vZGUuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICAgIHNwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMuZ2V0RnJhbWVCeVR5cGUoY29mZiwgdHlwZSk7XG4gICAgICAgIHNwcml0ZS5zaXplTW9kZSA9IGNjLlNwcml0ZS5TaXplTW9kZS5DVVNUT007XG4gICAgICAgIHNwcml0ZS50cmltID0gZmFsc2U7XG4gICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy53YXRlclBhcmVudFxuICAgICAgICBub2RlLnNldFBvc2l0aW9uKENvbW1vbi5nZXRQb3MoeCwgeSkuYWRkKG9mZnNldCkpO1xuICAgICAgICBub2RlLnNldENvbnRlbnRTaXplKGNjLnNpemUoQ29tbW9uLkdSSURfVywgQ29tbW9uLkdSSURfSCkpO1xuICAgICAgICAvLyBpZiAodHlwZSA9PSBHcm91bmRUeXBlLkdyb3VuZCkge1xuICAgICAgICAvLyAgICAgdGhpcy5fc2F2ZUNvbXBsZXhPYmplY3QoeCwgeSwgbm9kZSk7XG4gICAgICAgIC8vIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlrZjlgqjlpI3mnYLmsLTmiJbogIXlnLDlnZfnmoTlr7nosaFcbiAgICAgKiBAcGFyYW0geCBcbiAgICAgKiBAcGFyYW0geSBcbiAgICAgKiBAcGFyYW0gbm9kZSBcbiAgICAgKi9cbiAgICBwcml2YXRlIF9zYXZlQ29tcGxleE9iamVjdCh4OiBudW1iZXIsIHk6IG51bWJlciwgbm9kZTogY2MuTm9kZSkge1xuICAgICAgICBpZiAoIXRoaXMuX2NvbXBsZXhJdGVtTWFwKSB7XG4gICAgICAgICAgICB0aGlzLl9jb21wbGV4SXRlbU1hcCA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5fY29tcGxleEl0ZW1NYXBbeV0pIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbXBsZXhJdGVtTWFwW3ldID0gW107XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY29tcGxleEl0ZW1NYXBbeV1beF0gPSBub2RlO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0RnJhbWVCeVR5cGUoY29mZjogc3RyaW5nLCB0eXBlOiBHcm91bmRUeXBlKTogY2MuU3ByaXRlRnJhbWUge1xuICAgICAgICBjb25zdCBza2luRnJhbWUgPSB0eXBlID09IEdyb3VuZFR5cGUuV2F0ZXIgPyBNYXRjaDNTa2luLmdldENvbXBsZXhHcm91bmRGcmFtZSh0aGlzLnR5cGUsIGNvZmYpIDogbnVsbDtcbiAgICAgICAgaWYgKHNraW5GcmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIHNraW5GcmFtZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmVycm9yKCdbTWF0Y2gzU2tpbl0gbWlzc2luZyBjb21wbGV4IGdyb3VuZCBmcmFtZTonLCB0aGlzLnR5cGUsIGNvZmYpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cblxuICAgIHByaXZhdGUgZ2V0Q2VsbEVtcHR5U3RhdHVzKHgsIHkpOiBudW1iZXIge1xuICAgICAgICBsZXQgcmVzdWx0ID0gMTtcbiAgICAgICAgaWYgKCF0aGlzLm1vZGVsc1t5XSkge1xuICAgICAgICAgICAgcmVzdWx0ID0gMDtcbiAgICAgICAgfSBlbHNlIGlmICghdGhpcy5tb2RlbHNbeV1beF0pIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5tb2RlbHNbeV1beF0uZ2V0VHlwZSgpID09IG51bGwpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cblxuICAgIHVwZGF0ZShkdCkge1xuXG4gICAgfVxufVxuIl19