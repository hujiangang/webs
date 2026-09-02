"use strict";
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