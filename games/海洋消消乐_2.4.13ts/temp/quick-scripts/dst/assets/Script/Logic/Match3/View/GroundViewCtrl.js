
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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
/**托盘基于中心的偏移量 */
var TrayOffset = cc.v2(12, 45);
var GroundViewCtrl = /** @class */ (function (_super) {
    __extends(GroundViewCtrl, _super);
    function GroundViewCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.borderFrames = [];
        _this.middleFrames = [];
        _this.waterFrames = [];
        _this.borderParent = null;
        //地板之上树叶等之下(河道等..)
        _this.waterParent = null;
        //地板上遮住收集物的物品(树叶...等)
        _this.multFuncParent = null;
        _this.gnomeParent = null;
        _this.gnomePrefab = null;
        _this.turtlesPrefab = null;
        _this.crabPrefab = null;
        _this.monkeyTreePrefab = null;
        _this.groundBasePrefab = null;
        //用来做收集时动画使用!
        _this.gemPrefab = null;
        //萤火虫用来做收集时动画使用!
        _this.firefly = null;
        _this.baseFrames = [];
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
        M_1.default.nodePool.create(Constant_1.NodePoolKey.GroundCell, this.groundBasePrefab, 150);
        if (GameModel_1.default.ins.isHaveGem) {
            M_1.default.nodePool.create(Constant_1.NodePoolKey.GemNode, this.gemPrefab, 20);
        }
        // M.nodePool.create(NodePoolKey.GroundMulti, this.ItemPrefab, 130);
        this.initBaseView(models);
        this.initGnome(data.mgModel.getConfig(CollectModel_1.CollectType.gnome));
        this.initTurtles(data.mgModel.getConfig(CollectModel_1.CollectType.turtles));
        this.initCrab(data.mgModel.getConfig(CollectModel_1.CollectType.crab));
        this.initMonkeyTree(cfg.monkeyTree);
        this.initLawnmower(cfg.lawnmower);
    };
    GroundViewCtrl.prototype.initCrab = function (crabCfg) {
        if (!crabCfg)
            return;
        for (var i = 0; i < crabCfg.length; i++) {
            var cfg = crabCfg[i];
            var node = M_1.default.nodePool.createItem(this.crabPrefab);
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
    GroundViewCtrl.prototype.initMonkeyTree = function (monkeyTreeCfg) {
        if (!monkeyTreeCfg)
            return;
        for (var i = 0; i < monkeyTreeCfg.length; i++) {
            var cfg = monkeyTreeCfg[i];
            var pos = cc.v2(cfg.x, cfg.y);
            var data = this.createMonkeyTree(Common_1.default.getPos(pos.x, pos.y, cfg.index));
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
    GroundViewCtrl.prototype.initTurtles = function (turtlesCfg) {
        if (!turtlesCfg)
            return;
        for (var i = 0; i < turtlesCfg.length; i++) {
            var cfg = turtlesCfg[i];
            var pos = Common_1.default.getPos(cfg.x, cfg.y, cfg.index);
            var result = Common_1.default.createSpineNode(this.gnomeParent, this.turtlesPrefab, null, pos.add(cc.v2(Common_1.default.GRID_W / 2, -Common_1.default.GRID_H / 2)));
            this.turtlesAry[i] = { ctrl: result.ctrl, pos: cc.v2(cfg.x, cfg.y) };
        }
    };
    GroundViewCtrl.prototype.initGnome = function (gnomeCfg) {
        if (!gnomeCfg)
            return;
        for (var i = 0; i < gnomeCfg.length; i++) {
            var cfg = gnomeCfg[i];
            var node = M_1.default.nodePool.createItem(this.gnomePrefab);
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
        var node = M_1.default.nodePool.getItem(Constant_1.NodePoolKey.Firefly, this.firefly);
        node.parent = parent;
        node.setPosition(parent.convertToNodeSpaceAR(this.waterParent.convertToWorldSpaceAR(selfPos)));
        ActionCtrl_1.default.ins.runCollectGem(node, targetPos, parent).then(function () {
            M_1.default.nodePool.freeItem(Constant_1.NodePoolKey.Firefly, node);
            M_1.default.event.send(Event_1.Event.UI.UpdateInfoPanel, CollectModel_1.CollectType.firefly);
        });
    };
    GroundViewCtrl.prototype.playGemAni = function (parent, selfPos, targetPos) {
        var node = M_1.default.nodePool.getItem(Constant_1.NodePoolKey.GemNode, this.gemPrefab);
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
                        var groundBase = M_1.default.nodePool.getItem(Constant_1.NodePoolKey.GroundCell, this.groundBasePrefab);
                        groundBase.setPosition(gItem.getPosition());
                        baseSprite = groundBase.getComponent(cc.Sprite);
                        this.setGroundSprite(baseSprite, x, y);
                        groundBase.parent = this.borderParent;
                        groundBase.zIndex = 2;
                    }
                    var node = M_1.default.nodePool.getItem(Constant_1.NodePoolKey.GroundMulti, this.ItemPrefab);
                    node['baseSprite'] = baseSprite;
                    node.parent = this.multFuncParent;
                    cmp = node.getComponent(ItemGroundCtrl_1.default);
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
        var startIndex = 0;
        switch (this.type) {
            case 'water':
                startIndex = 0;
                break;
            case 'grass':
                startIndex = 2;
                break;
            case 'sand':
                startIndex = 4;
                break;
        }
        sprite.spriteFrame = this.baseFrames[startIndex];
        // if (y % 2 == 0) {
        //     if (x % 2 == 0) {
        //         sprite.spriteFrame = this.baseFrames[startIndex];
        //     } else {
        //         sprite.spriteFrame = this.baseFrames[startIndex + 1];
        //     }
        // } else {
        //     if (x % 2 == 1) {
        //         sprite.spriteFrame = this.baseFrames[startIndex];
        //     } else {
        //         sprite.spriteFrame = this.baseFrames[startIndex + 1];
        //     }
        // }
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
    GroundViewCtrl.prototype.createMonkeyTree = function (pos) {
        var ctrls = {};
        var result = Common_1.default.createSpineNode(this.gnomeParent, this.monkeyTreePrefab, null, pos.add(cc.v2(Common_1.default.GRID_W / 2, -Common_1.default.GRID_H / 2)));
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
        var frame = this.getBorderFrame(this.middleFrames, "m" + name, 3);
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
    };
    GroundViewCtrl.prototype.createUpBorder = function (pos, cfg, name) {
        var borderNode = new cc.Node();
        var sprite = borderNode.addComponent(cc.Sprite);
        sprite.trim = false;
        sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        borderNode.parent = this.borderParent;
        borderNode.name = name + "_" + cfg[0];
        borderNode.zIndex = 2;
        sprite.spriteFrame = this.getBorderFrame(this.borderFrames, cfg[0], 5);
        borderNode.setPosition(pos);
        borderNode.setScale(cfg[1]);
        borderNode.setContentSize(Common_1.default.GRID_W, Common_1.default.GRID_H);
    };
    GroundViewCtrl.prototype.getBorderFrame = function (container, sid, gapIndex) {
        var startIdx = 0;
        switch (this.type) {
            case 'water':
                startIdx = 0;
                break;
            case 'grass':
                startIdx = gapIndex;
                break;
            case 'sand':
                startIdx = gapIndex * 2;
                break;
        }
        var frame = null;
        for (var i = 5; i--;) {
            var f = container[startIdx + i];
            if (f && f.name == this.type + "_" + sid) {
                frame = f;
                break;
            }
        }
        return frame;
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
        var result = null;
        var frames = type == Constant_1.GroundType.Water ? this.waterFrames : [];
        for (var i = frames.length; i--;) {
            var water = frames[i];
            if (water.name.indexOf(coff) != -1) {
                result = water;
                break;
            }
        }
        if (!result) {
            console.error('没找到资源:----->', coff);
        }
        return result;
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
        property([cc.SpriteFrame])
    ], GroundViewCtrl.prototype, "borderFrames", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], GroundViewCtrl.prototype, "middleFrames", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], GroundViewCtrl.prototype, "waterFrames", void 0);
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
    __decorate([
        property(cc.Prefab)
    ], GroundViewCtrl.prototype, "gnomePrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], GroundViewCtrl.prototype, "turtlesPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], GroundViewCtrl.prototype, "crabPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], GroundViewCtrl.prototype, "monkeyTreePrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], GroundViewCtrl.prototype, "groundBasePrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], GroundViewCtrl.prototype, "gemPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], GroundViewCtrl.prototype, "firefly", void 0);
    __decorate([
        property([cc.SpriteFrame])
    ], GroundViewCtrl.prototype, "baseFrames", void 0);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcTWF0Y2gzXFxWaWV3XFxHcm91bmRWaWV3Q3RybC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSw4Q0FBeUM7QUFDekMsdUNBQWtDO0FBQ2xDLDZDQUF3QztBQUN4QyxtREFBOEM7QUFDOUMsZ0RBQStDO0FBRS9DLHNEQUE4RTtBQUU5RSxzREFBb0Q7QUFDcEQsZ0RBQTBEO0FBQzFELGlGQUE0RTtBQUM1RSwwREFBc0Q7QUFFdEQsc0RBQWlEO0FBRTNDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBSTVDLGdCQUFnQjtBQUNoQixJQUFNLFVBQVUsR0FBWSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUcxQztJQUE0QyxrQ0FBNkI7SUFBekU7UUFBQSxxRUFxbkJDO1FBbG5CRyxrQkFBWSxHQUFxQixFQUFFLENBQUM7UUFHcEMsa0JBQVksR0FBcUIsRUFBRSxDQUFDO1FBR3BDLGlCQUFXLEdBQXFCLEVBQUUsQ0FBQztRQUduQyxrQkFBWSxHQUFZLElBQUksQ0FBQztRQUM3QixrQkFBa0I7UUFFbEIsaUJBQVcsR0FBWSxJQUFJLENBQUM7UUFDNUIscUJBQXFCO1FBRXJCLG9CQUFjLEdBQVksSUFBSSxDQUFDO1FBRy9CLGlCQUFXLEdBQVksSUFBSSxDQUFDO1FBRzVCLGlCQUFXLEdBQWMsSUFBSSxDQUFDO1FBRzlCLG1CQUFhLEdBQWMsSUFBSSxDQUFDO1FBR2hDLGdCQUFVLEdBQWMsSUFBSSxDQUFDO1FBRzdCLHNCQUFnQixHQUFjLElBQUksQ0FBQztRQUduQyxzQkFBZ0IsR0FBYyxJQUFJLENBQUM7UUFFbkMsYUFBYTtRQUViLGVBQVMsR0FBYyxJQUFJLENBQUM7UUFDNUIsZ0JBQWdCO1FBRWhCLGFBQU8sR0FBYyxJQUFJLENBQUM7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QUUsQ0FBQyxXQUFXLENBQUMsQ0FBQzt3REFDUztJQUdwQztRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQzt3REFDUztJQUdwQztRQURDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQzt1REFDUTtJQUduQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3dEQUNXO0lBRzdCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7dURBQ1U7SUFHNUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzswREFDYTtJQUcvQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3VEQUNVO0lBRzVCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7dURBQ1U7SUFHOUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzt5REFDWTtJQUdoQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3NEQUNTO0lBRzdCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7NERBQ2U7SUFHbkM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzs0REFDZTtJQUluQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3FEQUNRO0lBRzVCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7bURBQ007SUFHMUI7UUFEQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7c0RBQ087SUE5Q2pCLGNBQWM7UUFEbEMsT0FBTztPQUNhLGNBQWMsQ0FxbkJsQztJQUFELHFCQUFDO0NBcm5CRCxBQXFuQkMsQ0FybkIyQyxrQkFBUSxHQXFuQm5EO2tCQXJuQm9CLGNBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBDb21tb24gZnJvbSAnLi4vLi4vQ29tbW9uL0NvbW1vbic7XG5pbXBvcnQgQmFzZVZpZXcgZnJvbSBcIi4vQmFzZVZpZXdcIjtcbmltcG9ydCBNIGZyb20gXCIuLi8uLi8uLi9CYXNlL01hbmFnZXIvTVwiO1xuaW1wb3J0IEl0ZW1Hcm91bmRDdHJsIGZyb20gXCIuL0l0ZW1Hcm91bmRDdHJsXCI7XG5pbXBvcnQgeyBFdmVudCB9IGZyb20gXCIuLi8uLi9EYXRhL0NvbnN0L0V2ZW50XCI7XG5pbXBvcnQgR3JvdW5kQ2VsbE1vZGVsIGZyb20gXCIuLi9Nb2RlbC9Hcm91bmRDZWxsTW9kZWxcIjtcbmltcG9ydCB7IE5vZGVQb29sS2V5LCBDZWxsVHlwZSwgR3JvdW5kVHlwZSB9IGZyb20gXCIuLi8uLi9EYXRhL0NvbnN0L0NvbnN0YW50XCI7XG5pbXBvcnQgeyBHbm9tZSwgSUxldmVsLCBJTGF3bm1vd2VyIH0gZnJvbSBcIi4uLy4uL0RhdGEvSW50ZXJmYWNlL0xldmVsL0lMZXZlbFwiO1xuaW1wb3J0IHsgQ29sbGVjdFR5cGUgfSBmcm9tIFwiLi4vTW9kZWwvQ29sbGVjdE1vZGVsXCI7XG5pbXBvcnQgR2FtZU1vZGVsLCB7IElHcmlkRGF0YSB9IGZyb20gXCIuLi9Nb2RlbC9HYW1lTW9kZWxcIjtcbmltcG9ydCBTcGluZVBsYXllckN0cmwgZnJvbSBcIi4uLy4uLy4uL0Jhc2UvQ3VzdG9tQ29tcG9uZW50L1NwaW5lUGxheWVyQ3RybFwiO1xuaW1wb3J0IHsgR2FwVGltZSB9IGZyb20gXCIuLi8uLi9EYXRhL0NvbnN0L1RpbWVDb25maWdcIjtcbmltcG9ydCBDcmFiTW9kZWwgZnJvbSBcIi4uL01vZGVsL211bHRpcGxlR3JpZENvbC9DcmFiTW9kZWxcIjtcbmltcG9ydCBBY3Rpb25DdHJsIGZyb20gXCIuLi8uLi9Db21tb24vQWN0aW9uQ3RybFwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5pbnRlcmZhY2UgSU1vbmtleVRyZWUgeyB0cmVlOiBTcGluZVBsYXllckN0cmw7IHBvczogY2MuVmVjMiwgZXhwOiBudW1iZXIsIHJlbWFpbkxhYmVsOiBjYy5MYWJlbCB9XG5cbi8qKuaJmOebmOWfuuS6juS4reW/g+eahOWBj+enu+mHjyAqL1xuY29uc3QgVHJheU9mZnNldDogY2MuVmVjMiA9IGNjLnYyKDEyLCA0NSk7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcm91bmRWaWV3Q3RybCBleHRlbmRzIEJhc2VWaWV3PEdyb3VuZENlbGxNb2RlbFtdW10+IHtcblxuICAgIEBwcm9wZXJ0eShbY2MuU3ByaXRlRnJhbWVdKVxuICAgIGJvcmRlckZyYW1lczogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xuXG4gICAgQHByb3BlcnR5KFtjYy5TcHJpdGVGcmFtZV0pXG4gICAgbWlkZGxlRnJhbWVzOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XG5cbiAgICBAcHJvcGVydHkoW2NjLlNwcml0ZUZyYW1lXSlcbiAgICB3YXRlckZyYW1lczogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgYm9yZGVyUGFyZW50OiBjYy5Ob2RlID0gbnVsbDtcbiAgICAvL+WcsOadv+S5i+S4iuagkeWPtuetieS5i+S4iyjmsrPpgZPnrYkuLilcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICB3YXRlclBhcmVudDogY2MuTm9kZSA9IG51bGw7XG4gICAgLy/lnLDmnb/kuIrpga7kvY/mlLbpm4bniannmoTnianlk4Eo5qCR5Y+2Li4u562JKVxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIG11bHRGdW5jUGFyZW50OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGdub21lUGFyZW50OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5QcmVmYWIpXG4gICAgZ25vbWVQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIHR1cnRsZXNQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIGNyYWJQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIG1vbmtleVRyZWVQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIGdyb3VuZEJhc2VQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XG5cbiAgICAvL+eUqOadpeWBmuaUtumbhuaXtuWKqOeUu+S9v+eUqCFcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIGdlbVByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcbiAgICAvL+iQpOeBq+iZq+eUqOadpeWBmuaUtumbhuaXtuWKqOeUu+S9v+eUqCFcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIGZpcmVmbHk6IGNjLlByZWZhYiA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoW2NjLlNwcml0ZUZyYW1lXSlcbiAgICBiYXNlRnJhbWVzOiBjYy5TcHJpdGVGcmFtZVtdID0gW107XG5cbiAgICBwcml2YXRlIF9jZmc6IElMZXZlbCA9IG51bGw7XG5cbiAgICBwcml2YXRlIF9jb21wbGV4SXRlbU1hcDogQXJyYXk8QXJyYXk8Y2MuTm9kZT4+ID0gbnVsbDtcblxuICAgIC8qKuW9k+WJjeWcsOWbvuexu+WeiyB3YXRlciBncmFzcyAqL1xuICAgIHByaXZhdGUgdHlwZTogc3RyaW5nID0gbnVsbDtcblxuICAgIHByaXZhdGUgZ25vbWVBcnk6IHsgW2lueDogbnVtYmVyXTogY2MuTm9kZSB9ID0ge307XG4gICAgcHJpdmF0ZSBjcmFiQXJ5OiB7IFtpbng6IG51bWJlcl06IGNjLk5vZGUgfSA9IHt9O1xuICAgIHByaXZhdGUgbW9ua2V5VHJlZUFyeTogeyBbaW54OiBudW1iZXJdOiBJTW9ua2V5VHJlZSB9ID0ge307XG4gICAgcHJpdmF0ZSB0dXJ0bGVzQXJ5OiB7IFtpbng6IG51bWJlcl06IHsgY3RybDogU3BpbmVQbGF5ZXJDdHJsLCBwb3M6IGNjLlZlYzIgfSB9ID0ge307XG5cbiAgICBvbkxvYWQoKSB7IH1cblxuICAgIHB1YmxpYyBpbml0Vmlldyhtb2RlbHM6IEdyb3VuZENlbGxNb2RlbFtdW10sIGRhdGE/OiBJR3JpZERhdGEsIGNmZz86IElMZXZlbCwgZ3JvdW5kVHlwZT86IHN0cmluZykge1xuICAgICAgICBzdXBlci5pbml0Vmlldyhtb2RlbHMpO1xuICAgICAgICB0aGlzLnR5cGUgPSBncm91bmRUeXBlO1xuICAgICAgICB0aGlzLl9jZmcgPSBjZmc7XG4gICAgICAgIE0ubm9kZVBvb2wuY3JlYXRlKE5vZGVQb29sS2V5Lkdyb3VuZENlbGwsIHRoaXMuZ3JvdW5kQmFzZVByZWZhYiwgMTUwKTtcbiAgICAgICAgaWYgKEdhbWVNb2RlbC5pbnMuaXNIYXZlR2VtKSB7XG4gICAgICAgICAgICBNLm5vZGVQb29sLmNyZWF0ZShOb2RlUG9vbEtleS5HZW1Ob2RlLCB0aGlzLmdlbVByZWZhYiwgMjApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gTS5ub2RlUG9vbC5jcmVhdGUoTm9kZVBvb2xLZXkuR3JvdW5kTXVsdGksIHRoaXMuSXRlbVByZWZhYiwgMTMwKTtcblxuICAgICAgICB0aGlzLmluaXRCYXNlVmlldyhtb2RlbHMpO1xuICAgICAgICB0aGlzLmluaXRHbm9tZShkYXRhLm1nTW9kZWwuZ2V0Q29uZmlnKENvbGxlY3RUeXBlLmdub21lKSk7XG4gICAgICAgIHRoaXMuaW5pdFR1cnRsZXMoZGF0YS5tZ01vZGVsLmdldENvbmZpZyhDb2xsZWN0VHlwZS50dXJ0bGVzKSk7XG4gICAgICAgIHRoaXMuaW5pdENyYWIoZGF0YS5tZ01vZGVsLmdldENvbmZpZyhDb2xsZWN0VHlwZS5jcmFiKSk7XG4gICAgICAgIHRoaXMuaW5pdE1vbmtleVRyZWUoY2ZnLm1vbmtleVRyZWUpO1xuICAgICAgICB0aGlzLmluaXRMYXdubW93ZXIoY2ZnLmxhd25tb3dlcik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0Q3JhYihjcmFiQ2ZnOiBBcnJheTxHbm9tZT4pIHtcbiAgICAgICAgaWYgKCFjcmFiQ2ZnKSByZXR1cm47XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY3JhYkNmZy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgY2ZnID0gY3JhYkNmZ1tpXTtcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSBNLm5vZGVQb29sLmNyZWF0ZUl0ZW0odGhpcy5jcmFiUHJlZmFiKTtcbiAgICAgICAgICAgIGNvbnN0IHRvcFBvcyA9IENvbW1vbi5nZXRQb3MoY2ZnLngsIGNmZy55LCBjZmcuaW5kZXgpO1xuICAgICAgICAgICAgY29uc3QgdG1wU2NhbGVIZWlnaHQgPSAyMDtcbiAgICAgICAgICAgIG5vZGVbJ2NmZyddID0gY2ZnO1xuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLmdub21lUGFyZW50O1xuICAgICAgICAgICAgbm9kZS54ID0gdG9wUG9zLnggLSBDb21tb24uR1JJRF9XIC8gMjtcbiAgICAgICAgICAgIG5vZGUueSA9IHRvcFBvcy55ICsgQ29tbW9uLkdSSURfSCAvIDI7XG5cbiAgICAgICAgICAgIG5vZGUuc2V0U2NhbGUoKENvbW1vbi5HUklEX0ggLSB0bXBTY2FsZUhlaWdodCkgLyAobm9kZS5oZWlnaHQgLyAoKE1hdGguZmxvb3IoY2ZnLnR5cGUgLyAyKSArIDEpICogMikpKTtcbiAgICAgICAgICAgIGlmIChjZmcudHlwZSAlIDIgPT0gMCkge1xuICAgICAgICAgICAgICAgIG5vZGUuYW5nbGUgPSA5MDtcbiAgICAgICAgICAgICAgICBub2RlLnkgLT0gKG5vZGUud2lkdGggKiBub2RlLnNjYWxlKTtcbiAgICAgICAgICAgICAgICBjZmcudHlwZSA8IDIgJiYgKG5vZGUueCArPSB0bXBTY2FsZUhlaWdodClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2ZnLnR5cGUgPCAyICYmIChub2RlLnkgLT0gdG1wU2NhbGVIZWlnaHQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2ZnLnggPCAoR2FtZU1vZGVsLkdyaWRTaXplLlcgLSAxKSAvIDIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gbm9kZS5nZXRDaGlsZEJ5TmFtZSgnaXRlbScpO1xuICAgICAgICAgICAgICAgIGl0ZW0uc2NhbGVYID0gLWl0ZW0uc2NhbGVYO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jcmFiQXJ5W2ldID0gbm9kZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdE1vbmtleVRyZWUobW9ua2V5VHJlZUNmZzogQXJyYXk8R25vbWU+KSB7XG4gICAgICAgIGlmICghbW9ua2V5VHJlZUNmZykgcmV0dXJuO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1vbmtleVRyZWVDZmcubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGNmZyA9IG1vbmtleVRyZWVDZmdbaV07XG4gICAgICAgICAgICBjb25zdCBwb3MgPSBjYy52MihjZmcueCwgY2ZnLnkpO1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMuY3JlYXRlTW9ua2V5VHJlZShDb21tb24uZ2V0UG9zKHBvcy54LCBwb3MueSwgY2ZnLmluZGV4KSk7XG4gICAgICAgICAgICBkYXRhLnBvcyA9IHBvcztcbiAgICAgICAgICAgIGRhdGEuZXhwID0gMDtcbiAgICAgICAgICAgIGRhdGEucmVtYWluTGFiZWwgPSBjYy5maW5kKCdxaXBhby9jb3VudCcsIGRhdGEudHJlZS5ub2RlKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xuICAgICAgICAgICAgdGhpcy5tb25rZXlUcmVlQXJ5W2ldID0gZGF0YTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTW9uZXlUcmVlU3RhdGUoaSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGluaXRMYXdubW93ZXIobGF3bm1vd2VyQ2ZnOiBJTGF3bm1vd2VyW10pIHtcbiAgICAgICAgaWYgKCFsYXdubW93ZXJDZmcpIHJldHVybjtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsYXdubW93ZXJDZmcubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGNmZyA9IGxhd25tb3dlckNmZ1tpXTtcbiAgICAgICAgICAgIGNvbnN0IHBvcyA9IGNjLnYyKGNmZy54LCBjZmcueSk7XG4gICAgICAgICAgICBjb25zdCBncm91bmRDZWxsID0gQ29tbW9uLnNhZmVHZXQyQXJyYXlWYWx1ZShHYW1lTW9kZWwuaW5zLkdyb3VuZExpc3QsIHBvcyk7XG4gICAgICAgICAgICBpZiAoZ3JvdW5kQ2VsbCkge1xuICAgICAgICAgICAgICAgIC8v6ZSB5a6a6L+Z5Liq5Z2Q5qCHIVxuICAgICAgICAgICAgICAgIGdyb3VuZENlbGwuY2hhbmdlMlRhcmdldFR5cGUoR3JvdW5kVHlwZS5UdWl0dWppLCBjZmcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgR2FtZU1vZGVsLmlucy5Db2xsZWN0TW9kZWwuY29sbGVjdFBvd2VyQ2VsbHNbY2ZnLnR5cGVdID0gZ3JvdW5kQ2VsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdFR1cnRsZXModHVydGxlc0NmZzogQXJyYXk8R25vbWU+KSB7XG4gICAgICAgIGlmICghdHVydGxlc0NmZykgcmV0dXJuO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHR1cnRsZXNDZmcubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGNmZyA9IHR1cnRsZXNDZmdbaV07XG4gICAgICAgICAgICBjb25zdCBwb3MgPSBDb21tb24uZ2V0UG9zKGNmZy54LCBjZmcueSwgY2ZnLmluZGV4KTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IENvbW1vbi5jcmVhdGVTcGluZU5vZGUodGhpcy5nbm9tZVBhcmVudCwgdGhpcy50dXJ0bGVzUHJlZmFiLCBudWxsLCBwb3MuYWRkKGNjLnYyKENvbW1vbi5HUklEX1cgLyAyLCAtQ29tbW9uLkdSSURfSCAvIDIpKSk7XG4gICAgICAgICAgICB0aGlzLnR1cnRsZXNBcnlbaV0gPSB7IGN0cmw6IHJlc3VsdC5jdHJsLCBwb3M6IGNjLnYyKGNmZy54LCBjZmcueSkgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdEdub21lKGdub21lQ2ZnOiBBcnJheTxHbm9tZT4pIHtcbiAgICAgICAgaWYgKCFnbm9tZUNmZykgcmV0dXJuO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdub21lQ2ZnLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBjZmcgPSBnbm9tZUNmZ1tpXTtcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSBNLm5vZGVQb29sLmNyZWF0ZUl0ZW0odGhpcy5nbm9tZVByZWZhYik7XG4gICAgICAgICAgICBjb25zdCB0b3BQb3MgPSBDb21tb24uZ2V0UG9zKGNmZy54LCBjZmcueSwgY2ZnLmluZGV4KTtcbiAgICAgICAgICAgIGNvbnN0IHRtcFNjYWxlSGVpZ2h0ID0gMjA7XG5cbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5nbm9tZVBhcmVudDtcbiAgICAgICAgICAgIG5vZGUueCA9IHRvcFBvcy54IC0gQ29tbW9uLkdSSURfVyAvIDI7XG4gICAgICAgICAgICBub2RlLnkgPSB0b3BQb3MueSArIENvbW1vbi5HUklEX0ggLyAyO1xuICAgICAgICAgICAgbm9kZS5zZXRTY2FsZShDb21tb24uR1JJRF9IIC8gKG5vZGUuaGVpZ2h0IC8gKChNYXRoLmZsb29yKGNmZy50eXBlIC8gMikgKyAxKSAqIDIpKSk7XG4gICAgICAgICAgICBpZiAoY2ZnLnR5cGUgJSAyID09IDApIHtcbiAgICAgICAgICAgICAgICBub2RlLmFuZ2xlID0gOTA7XG4gICAgICAgICAgICAgICAgbm9kZS55IC09IChub2RlLndpZHRoICogbm9kZS5zY2FsZSAtIHRtcFNjYWxlSGVpZ2h0ICogbm9kZS5zY2FsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmdub21lQXJ5W2ldID0gbm9kZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBwbGF5Q3JhYkFuaSh1cExheWVyOiBjYy5Ob2RlLCBpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmNyYWJBcnlbaW5kZXhdO1xuICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgICAgaXRlbS5wYXJlbnQgPSB1cExheWVyO1xuICAgICAgICAgICAgaXRlbS5zZXRQb3NpdGlvbih1cExheWVyLmNvbnZlcnRUb05vZGVTcGFjZUFSKENvbW1vbi5nZXRXb3JsZFBvcyhpdGVtKSkpO1xuICAgICAgICAgICAgY29uc3QgcHhDdHJsID0gaXRlbS5nZXRDaGlsZEJ5TmFtZSgnaXRlbScpLmdldENvbXBvbmVudChTcGluZVBsYXllckN0cmwpO1xuICAgICAgICAgICAgY29uc3QgY2ZnOiBHbm9tZSA9IGl0ZW1bJ2NmZyddO1xuICAgICAgICAgICAgbGV0IGRpciA9IGNjLnYyKC0xLCAwKTtcbiAgICAgICAgICAgIE0uZXZlbnQuc2VuZChFdmVudC5VSS5VcGRhdGVJbmZvUGFuZWwsIENvbGxlY3RUeXBlLmNyYWIpO1xuICAgICAgICAgICAgaWYgKGNmZy54IDwgKEdhbWVNb2RlbC5HcmlkU2l6ZS5XIC0gMSkgLyAyKSB7XG4gICAgICAgICAgICAgICAgZGlyLnggPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHhDdHJsLnBsYXkoJ3Bhbmd4aWUyJywgMCwgZmFsc2UsICgpID0+IHtcbiAgICAgICAgICAgICAgICBpdGVtLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy/lvIDlp4vmiafooYzmtojpmaTmk43kvZwhIFxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIEdhbWVNb2RlbC5pbnMuZ2V0TWdNb2RlbCgpLm9uQ29tcGxldChDb2xsZWN0VHlwZS5jcmFiLCBkaXIueCwgY2MudjIoY2ZnLngsIGNmZy55KSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBtID0gR2FtZU1vZGVsLmlucy5nZXRNZ01vZGVsKCkuZ2V0TW9kZWwoQ29sbGVjdFR5cGUuY3JhYikgYXMgQ3JhYk1vZGVsXG4gICAgICAgICAgICAgICAgICAgIG0gJiYgbS5mcmVlR3JpZChjYy52MihjZmcueCwgY2ZnLnkpLCBpbmRleCk7XG4gICAgICAgICAgICAgICAgfSwgR2FwVGltZS5DcmFiU3RhcnRlZEZhbGxHYXApO1xuICAgICAgICAgICAgfSwgR2FwVGltZS5DcmFiU3RhcnRFbGltYXRlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBwbGF5VHVydGxlc0FuaSh1cExheWVyOiBjYy5Ob2RlLCBpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLnR1cnRsZXNBcnlbaW5kZXhdO1xuICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgICAgaXRlbS5jdHJsLm5vZGUucGFyZW50ID0gdXBMYXllcjtcbiAgICAgICAgICAgIGl0ZW0uY3RybC5wbGF5KCdoYWlndWlfcnVuJywgMCwgZmFsc2UsICgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBjb25zdCB0YXJnZXRQb3MgPSBjYy52MigtMTAwMCwgNzAwKTtcbiAgICAgICAgICAgICAgICBjb25zdCBub2RlID0gaXRlbS5jdHJsLm5vZGU7XG4gICAgICAgICAgICAgICAgLy8gY29uc3Qgcm90YXRpb24gPSBNYXRoLmF0YW4yKE1hdGguYWJzKHRhcmdldFBvcy55KSAtIE1hdGguYWJzKG5vZGUueSksIE1hdGguYWJzKHRhcmdldFBvcy54KSAtIE1hdGguYWJzKG5vZGUueCkpIC8gTWF0aC5QSSAqIDE4MDtcbiAgICAgICAgICAgICAgICAvLyBjb25zdCBhMCA9IGNjLnJvdGF0ZVRvKDEsIHJvdGF0aW9uKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zdCBhMSA9IGNjLmNhbGxGdW5jKCgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyAgICAgLy/pgJrnn6XkuIrpnaLlvIDlp4vmjonokL0hISFcbiAgICAgICAgICAgICAgICAvLyAgICAgR2FtZU1vZGVsLmlucy5nZXRHbm9tZU1vZGVsKCkudHVydGxlc0NvbXBsZXQoaW5kZXgsIGl0ZW0ucG9zKTtcbiAgICAgICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgICAgICAgICAvLyBjb25zdCBhMiA9IGNjLm1vdmVUbygyLCB0YXJnZXRQb3MpO1xuICAgICAgICAgICAgICAgIC8vIGNvbnN0IGEzID0gY2MuY2FsbEZ1bmMoKCkgPT4ge1xuICAgICAgICAgICAgICAgIG5vZGUuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIC8vIH0pO1xuICAgICAgICAgICAgICAgIC8vIG5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGEwLCBhMSwgYTIsIGEzKSk7IFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBNLmV2ZW50LnNlbmQoRXZlbnQuVUkuVXBkYXRlSW5mb1BhbmVsLCBDb2xsZWN0VHlwZS50dXJ0bGVzKTtcbiAgICAgICAgICAgICAgICBHYW1lTW9kZWwuaW5zLmdldE1nTW9kZWwoKS5vbkNvbXBsZXQoQ29sbGVjdFR5cGUudHVydGxlcywgaW5kZXgsIGl0ZW0ucG9zKTtcbiAgICAgICAgICAgIH0sIEdhcFRpbWUuVHVydGxlc092ZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHBsYXlGaXJlZmx5QW5pKHBhcmVudDogY2MuTm9kZSwgc2VsZlBvczogY2MuVmVjMiwgdGFyZ2V0UG9zOiBjYy5WZWMyKSB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBNLm5vZGVQb29sLmdldEl0ZW0oTm9kZVBvb2xLZXkuRmlyZWZseSwgdGhpcy5maXJlZmx5KTtcbiAgICAgICAgbm9kZS5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgICAgIG5vZGUuc2V0UG9zaXRpb24ocGFyZW50LmNvbnZlcnRUb05vZGVTcGFjZUFSKHRoaXMud2F0ZXJQYXJlbnQuY29udmVydFRvV29ybGRTcGFjZUFSKHNlbGZQb3MpKSk7XG5cbiAgICAgICAgQWN0aW9uQ3RybC5pbnMucnVuQ29sbGVjdEdlbShub2RlLCB0YXJnZXRQb3MsIHBhcmVudCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBNLm5vZGVQb29sLmZyZWVJdGVtKE5vZGVQb29sS2V5LkZpcmVmbHksIG5vZGUpO1xuICAgICAgICAgICAgTS5ldmVudC5zZW5kKEV2ZW50LlVJLlVwZGF0ZUluZm9QYW5lbCwgQ29sbGVjdFR5cGUuZmlyZWZseSk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcHVibGljIHBsYXlHZW1BbmkocGFyZW50OiBjYy5Ob2RlLCBzZWxmUG9zOiBjYy5WZWMyLCB0YXJnZXRQb3M6IGNjLlZlYzIpIHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IE0ubm9kZVBvb2wuZ2V0SXRlbShOb2RlUG9vbEtleS5HZW1Ob2RlLCB0aGlzLmdlbVByZWZhYik7XG4gICAgICAgIG5vZGUucGFyZW50ID0gcGFyZW50O1xuICAgICAgICBub2RlLnNldFBvc2l0aW9uKHBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0aGlzLndhdGVyUGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihzZWxmUG9zKSkpO1xuXG4gICAgICAgIEFjdGlvbkN0cmwuaW5zLnJ1bkNvbGxlY3RHZW0obm9kZSwgdGFyZ2V0UG9zLCBwYXJlbnQpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgTS5ub2RlUG9vbC5mcmVlSXRlbShOb2RlUG9vbEtleS5HZW1Ob2RlLCBub2RlKTtcbiAgICAgICAgICAgIE0uZXZlbnQuc2VuZChFdmVudC5VSS5VcGRhdGVJbmZvUGFuZWwsIENvbGxlY3RUeXBlLmdlbSk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcHVibGljIHBsYXlHbm9tZUFuaShwYXJlbnQ6IGNjLk5vZGUsIGluZGV4OiBudW1iZXIsIHRhcmdldFBvczogY2MuVmVjMikge1xuICAgICAgICBjb25zdCBnbiA9IHRoaXMuZ25vbWVBcnlbaW5kZXhdO1xuICAgICAgICBpZiAoZ24pIHtcbiAgICAgICAgICAgIEFjdGlvbkN0cmwuaW5zLnJ1bkNvbGxlY3RHbm9tZShnbiwgdGFyZ2V0UG9zLCBwYXJlbnQpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGduLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICBNLmV2ZW50LnNlbmQoRXZlbnQuVUkuVXBkYXRlSW5mb1BhbmVsLCBDb2xsZWN0VHlwZS5nbm9tZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXRHbm9tZUFyeSgpOiB7IFtpbng6IG51bWJlcl06IGNjLk5vZGUgfSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdub21lQXJ5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPluiAgeWktOaUtumbhueJqeeahOenu+WKqOi3neemu1xuICAgICAqIEBwYXJhbSBjdXJWaWV3IFxuICAgICAqIEBwYXJhbSBtYXNrTm9kZSBcbiAgICAgKi9cbiAgICBwdWJsaWMgY2hlY2tDb2xsZWN0TW92ZURpc3RhbmNlKGN1clZpZXc6IGNjLk5vZGUsIG1hc2tOb2RlOiBjYy5Ob2RlKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IG1vdmVHYXAgPSAwO1xuICAgICAgICBpZiAoY3VyVmlldy5oZWlnaHQgPiAwKSB7XG4gICAgICAgICAgICAvL+mBjeWOhuajgOa1i+aJgOacieeahOaUtumbhueJqeaYr+WQpuacieWcqOS4reW/g+eahCBcbiAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLmdub21lQXJ5KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZ25vbWVOb2RlID0gdGhpcy5nbm9tZUFyeVtrZXldO1xuICAgICAgICAgICAgICAgIGNvbnN0IHdwID0gZ25vbWVOb2RlLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoZ25vbWVOb2RlLnBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICBjb25zdCBtcCA9IG1hc2tOb2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHdwKTtcbiAgICAgICAgICAgICAgICBpZiAobXAueSA8IDAgJiYgbXAueSA8IG1hc2tOb2RlLmhlaWdodCAvIDMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGlzdGFuY2UgPSBNYXRoLmFicyhtcC55KSArIChnbm9tZU5vZGUuYW5nbGUgIT0gMCA/IGdub21lTm9kZS53aWR0aCA6IGdub21lTm9kZS5oZWlnaHQpICogZ25vbWVOb2RlLnNjYWxlO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXhEaXN0YW5jZSA9IChjdXJWaWV3LmhlaWdodCAvIDIgLSBjdXJWaWV3LnkpIC0gbWFza05vZGUuaGVpZ2h0IC8gMiArIENvbW1vbi5HUklEX0ggLyAyXG4gICAgICAgICAgICAgICAgICAgIG1vdmVHYXAgPSBkaXN0YW5jZSA+IG1heERpc3RhbmNlID8gbWF4RGlzdGFuY2UgOiBkaXN0YW5jZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBtb3ZlR2FwID0gMDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtb3ZlR2FwO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5pdEJhc2VWaWV3KG1vZGVsczogQXJyYXk8QXJyYXk8R3JvdW5kQ2VsbE1vZGVsPj4pIHtcbiAgICAgICAgY29uc3QgeUxlbmd0aCA9IG1vZGVscy5sZW5ndGg7XG4gICAgICAgIGNvbnN0IHhMZW5ndGggPSBtb2RlbHNbMF0ubGVuZ3RoO1xuICAgICAgICBsZXQgaW5kZXggPSBudWxsO1xuICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8PSB5TGVuZ3RoOyB5KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDw9IHhMZW5ndGg7IHgrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGdJdGVtID0gbW9kZWxzW3ldID8gbW9kZWxzW3ldW3hdIDogbnVsbDtcbiAgICAgICAgICAgICAgICAvL+aYvuekuuWcsOadv1xuICAgICAgICAgICAgICAgIGxldCBjbXA6IEl0ZW1Hcm91bmRDdHJsID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpZiAoZ0l0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ID0gZ0l0ZW0uZ2V0TWFwSW5kZXgoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBsZXQgYmFzZVNwcml0ZTogY2MuU3ByaXRlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdJdGVtLmdldFR5cGUoKSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBncm91bmRCYXNlID0gTS5ub2RlUG9vbC5nZXRJdGVtKE5vZGVQb29sS2V5Lkdyb3VuZENlbGwsIHRoaXMuZ3JvdW5kQmFzZVByZWZhYik7XG4gICAgICAgICAgICAgICAgICAgICAgICBncm91bmRCYXNlLnNldFBvc2l0aW9uKGdJdGVtLmdldFBvc2l0aW9uKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFzZVNwcml0ZSA9IGdyb3VuZEJhc2UuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEdyb3VuZFNwcml0ZShiYXNlU3ByaXRlLCB4LCB5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VuZEJhc2UucGFyZW50ID0gdGhpcy5ib3JkZXJQYXJlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBncm91bmRCYXNlLnpJbmRleCA9IDI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgbm9kZSA9IE0ubm9kZVBvb2wuZ2V0SXRlbShOb2RlUG9vbEtleS5Hcm91bmRNdWx0aSwgdGhpcy5JdGVtUHJlZmFiKTtcbiAgICAgICAgICAgICAgICAgICAgbm9kZVsnYmFzZVNwcml0ZSddID0gYmFzZVNwcml0ZTtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLm11bHRGdW5jUGFyZW50O1xuICAgICAgICAgICAgICAgICAgICBjbXAgPSBub2RlLmdldENvbXBvbmVudChJdGVtR3JvdW5kQ3RybCk7XG4gICAgICAgICAgICAgICAgICAgIGNtcC5pbml0KGdJdGVtLCB0aGlzLmJvcmRlclBhcmVudCk7XG4gICAgICAgICAgICAgICAgICAgIGdJdGVtLmV4dERhdGEgPSBub2RlO1xuICAgICAgICAgICAgICAgICAgICBnSXRlbS5leHRDdHJsID0gY21wO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0NvbXBsZXhJdGVtKHgsIHksIEdyb3VuZFR5cGUuV2F0ZXIpO1xuICAgICAgICAgICAgICAgIC8vIHRoaXMuc2hvd0NvbXBsZXhJdGVtKHgsIHksIEdyb3VuZFR5cGUuR3JvdW5kKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGJvcmRlckNvZmYgPSB0aGlzLmdldEJvcmRlclNwcml0ZU5hbWUoeCwgeSk7XG4gICAgICAgICAgICAgICAgaWYgKENvbW1vbi5nZXRHcm91bmRCb3JkZXJJbmZvKGJvcmRlckNvZmYpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdEJvcmRlclZpZXcoYm9yZGVyQ29mZiwgeCwgeSwgaW5kZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyB0aGlzLmNoZWNrVHJheSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOabtOaWsOaMh+WumuS9jee9rueahOWkjeadguawtC/lnLDlnZfmmL7npLpcbiAgICAgKiBAcGFyYW0gcG9zIFxuICAgICAqL1xuICAgIHB1YmxpYyB1cGRhdGVDb21sZXhJdGVhbUJ5UG9zKHBvczogY2MuVmVjMikge1xuICAgICAgICAvL+WIoOmZpOaMh+WumueCueWRqOWbtOeahOaYvuekulxuICAgICAgICAvLyBpZiAodGhpcy5fY29tcGxleEl0ZW1NYXApIHtcbiAgICAgICAgLy8gICAgIC8v5Yig6Zmk5L2N572u55qE5Y6f5aeL5L+h5oGvIVxuICAgICAgICAvLyAgICAgY29uc3QgZGlycyA9IFtjYy52MigwLCAwKSwgY2MudjIoMSwgMCksIGNjLnYyKDAsIDEpLCBjYy52MigxLCAxKV07XG4gICAgICAgIC8vICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgZGlycy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgLy8gICAgICAgICBjb25zdCB0YXJnZXRQb3MgPSBwb3MuYWRkKGRpcnNbaW5kZXhdKTtcbiAgICAgICAgLy8gICAgICAgICBpZiAodGhpcy5fY29tcGxleEl0ZW1NYXBbdGFyZ2V0UG9zLnldKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgIGNvbnN0IHRhcmdldE5vZGUgPSB0aGlzLl9jb21wbGV4SXRlbU1hcFt0YXJnZXRQb3MueV1bdGFyZ2V0UG9zLnhdO1xuICAgICAgICAvLyAgICAgICAgICAgICBNLm5vZGVQb29sLmZyZWVJdGVtKE5vZGVQb29sS2V5LkNvbXBsZXhHcm91bmQsIHRhcmdldE5vZGUpO1xuICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLnNob3dDb21wbGV4SXRlbSh0YXJnZXRQb3MueCwgdGFyZ2V0UG9zLnksIEdyb3VuZFR5cGUuR3JvdW5kKTtcbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc2hvd0NvbXBsZXhJdGVtKHg6IG51bWJlciwgeTogbnVtYmVyLCB0eXBlOiBHcm91bmRUeXBlKSB7XG4gICAgICAgIGNvbnN0IGdyb3VuZENvZmYgPSBDb21tb24uZ2V0U3ByaXRlTmFtZUJ5VHlwZSh4LCB5LCB0aGlzLm1vZGVscywgdHlwZSk7XG4gICAgICAgIGlmIChncm91bmRDb2ZmICE9IFwiMDAwMFwiKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRWaWV3QnlUeXBlKGdyb3VuZENvZmYsIHgsIHksIHR5cGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoq6K6+572u5Zyw6Z2i55qE5qC85a2Q6aKc6ImyISAqL1xuICAgIHByaXZhdGUgc2V0R3JvdW5kU3ByaXRlKHNwcml0ZTogY2MuU3ByaXRlLCB4OiBudW1iZXIsIHk6IG51bWJlcikge1xuICAgICAgICBsZXQgc3RhcnRJbmRleCA9IDA7XG4gICAgICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICd3YXRlcic6IHN0YXJ0SW5kZXggPSAwOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2dyYXNzJzogc3RhcnRJbmRleCA9IDI7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnc2FuZCc6IHN0YXJ0SW5kZXggPSA0OyBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBzcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLmJhc2VGcmFtZXNbc3RhcnRJbmRleF07XG4gICAgICAgIC8vIGlmICh5ICUgMiA9PSAwKSB7XG4gICAgICAgIC8vICAgICBpZiAoeCAlIDIgPT0gMCkge1xuICAgICAgICAvLyAgICAgICAgIHNwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMuYmFzZUZyYW1lc1tzdGFydEluZGV4XTtcbiAgICAgICAgLy8gICAgIH0gZWxzZSB7XG4gICAgICAgIC8vICAgICAgICAgc3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5iYXNlRnJhbWVzW3N0YXJ0SW5kZXggKyAxXTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgLy8gICAgIGlmICh4ICUgMiA9PSAxKSB7XG4gICAgICAgIC8vICAgICAgICAgc3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5iYXNlRnJhbWVzW3N0YXJ0SW5kZXhdO1xuICAgICAgICAvLyAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gICAgICAgICBzcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLmJhc2VGcmFtZXNbc3RhcnRJbmRleCArIDFdO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRCb3JkZXJTcHJpdGVOYW1lKHg6IG51bWJlciwgeTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICAgICAgdmFyIGNvZmYgPSBcIlwiO1xuICAgICAgICBjb2ZmICs9IHRoaXMuZ2V0Q2VsbEVtcHR5U3RhdHVzKHggLSAxLCB5IC0gMSk7XG4gICAgICAgIGNvZmYgKz0gdGhpcy5nZXRDZWxsRW1wdHlTdGF0dXMoeCwgeSAtIDEpO1xuICAgICAgICBjb2ZmICs9IHRoaXMuZ2V0Q2VsbEVtcHR5U3RhdHVzKHggLSAxLCB5KTtcbiAgICAgICAgY29mZiArPSB0aGlzLmdldENlbGxFbXB0eVN0YXR1cyh4LCB5KTtcbiAgICAgICAgcmV0dXJuIGNvZmY7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbml0Qm9yZGVyVmlldyhjb2ZmOiBzdHJpbmcsIHgsIHksIGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgY2ZnID0gQ29tbW9uLmdldEdyb3VuZEJvcmRlckluZm8oY29mZik7XG4gICAgICAgIGNvbnN0IHBvcyA9IENvbW1vbi5nZXRQb3MoeCwgeSwgaW5kZXgpO1xuXG4gICAgICAgIHBvcy54IC09IENvbW1vbi5HUklEX1cgLyAyO1xuICAgICAgICBwb3MueSArPSBDb21tb24uR1JJRF9IIC8gMjtcblxuICAgICAgICB0aGlzLmNyZWF0ZU1pZGRsZUJvcmRlcihwb3MsIGNvZmYpO1xuICAgICAgICB0aGlzLmNyZWF0ZVVwQm9yZGVyKHBvcywgY2ZnLCBjb2ZmKTtcbiAgICB9XG5cbiAgICAvKlxuICAgIHByaXZhdGUgY2hlY2tUcmF5KCkge1xuICAgICAgICBpZiAodGhpcy50eXBlICE9ICd3YXRlcicpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmcmFnbWVudHMgPSBHYW1lTW9kZWwuaW5zLmdldExhc3RGcmFnbWVudCgpO1xuICAgICAgICBmcmFnbWVudHMuZm9yRWFjaCgoZjogQXJyYXk8R3JvdW5kQ2VsbE1vZGVsPikgPT4ge1xuICAgICAgICAgICAgY29uc3QgbCA9IGYubGVuZ3RoO1xuICAgICAgICAgICAgaWYgKGwgPj0gMiAmJiBsIDwgNCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlVHJheSgwLCBmWzBdLnBvcyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGwgPj0gNCAmJiBsIDwgNikge1xuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlVHJheSgxLCBmW2wgLSAxXS5wb3MsIGZhbHNlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobCA+PSA2KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVUcmF5KDAsIGZbMF0ucG9zKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVRyYXkoMSwgZltsIC0gMV0ucG9zLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlVHJheSh0eXBlOiBudW1iZXIsIHBvczogY2MuVmVjMiwgaXNQcmU6IGJvb2xlYW4gPSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IGZyYW1lID0gdGhpcy50cmF5RnJhbWVzW3R5cGVdO1xuICAgICAgICBpZiAoZnJhbWUpIHtcbiAgICAgICAgICAgIGNvbnN0IHRhcnlOb2RlID0gbmV3IGNjLk5vZGUoKTtcbiAgICAgICAgICAgIGNvbnN0IHNwcml0ZSA9IHRhcnlOb2RlLmFkZENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICAgICAgc3ByaXRlLnNwcml0ZUZyYW1lID0gZnJhbWU7XG4gICAgICAgICAgICB0YXJ5Tm9kZS5wYXJlbnQgPSB0aGlzLmJvcmRlclBhcmVudDtcbiAgICAgICAgICAgIHRhcnlOb2RlLnNldEFuY2hvclBvaW50KGlzUHJlID8gMCA6IDEsIDEpO1xuICAgICAgICAgICAgdGFyeU5vZGUuekluZGV4ID0gMjtcbiAgICAgICAgICAgIGxldCBiYXNlUG9zID0gQ29tbW9uLmdldFBvcyhwb3MueCwgcG9zLnkgKyAxKTtcbiAgICAgICAgICAgIGxldCBwb3NpdGlvbiA9IGNjLnYyKGJhc2VQb3MueCAtIENvbW1vbi5HUklEX1cgLyAyIC0gVHJheU9mZnNldC54LCBiYXNlUG9zLnkgKyBDb21tb24uR1JJRF9IIC8gMiAtIFRyYXlPZmZzZXQueSk7XG4gICAgICAgICAgICBpZiAoIWlzUHJlKSB7XG4gICAgICAgICAgICAgICAgcG9zaXRpb24gPSBjYy52MihiYXNlUG9zLnggKyBDb21tb24uR1JJRF9XIC8gMiArIFRyYXlPZmZzZXQueCwgYmFzZVBvcy55ICsgQ29tbW9uLkdSSURfSCAvIDIgLSBUcmF5T2Zmc2V0LnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGFyeU5vZGUuc2V0UG9zaXRpb24ocG9zaXRpb24pXG4gICAgICAgIH1cbiAgICB9XG4gICAgKi9cblxuICAgIHByaXZhdGUgY3JlYXRlTW9ua2V5VHJlZShwb3M6IGNjLlZlYzIpOiBJTW9ua2V5VHJlZSB7XG4gICAgICAgIGxldCBjdHJsczogSU1vbmtleVRyZWUgPSA8YW55Pnt9O1xuICAgICAgICBjb25zdCByZXN1bHQgPSBDb21tb24uY3JlYXRlU3BpbmVOb2RlKHRoaXMuZ25vbWVQYXJlbnQsIHRoaXMubW9ua2V5VHJlZVByZWZhYiwgbnVsbCwgcG9zLmFkZChjYy52MihDb21tb24uR1JJRF9XIC8gMiwgLUNvbW1vbi5HUklEX0ggLyAyKSkpXG4gICAgICAgIGN0cmxzLnRyZWUgPSByZXN1bHQuY3RybDtcbiAgICAgICAgcmVzdWx0LmN0cmwuX3NldE1peCgneWV6aXNodV95YW9zaHUnLCAneWV6aXNodV94aXV4aWFuJyk7XG4gICAgICAgIHJldHVybiBjdHJscztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UmFuZE1vbmtleVRyZWUoKTogeyBpbmRleDogbnVtYmVyLCBkYXRhOiBJTW9ua2V5VHJlZSB9IHtcbiAgICAgICAgbGV0IGRhdGEgPSBudWxsO1xuICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5tb25rZXlUcmVlQXJ5KSB7XG4gICAgICAgICAgICBkYXRhID0geyBpbmRleDoga2V5LCBkYXRhOiB0aGlzLm1vbmtleVRyZWVBcnlba2V5XSB9O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGFcbiAgICB9XG5cbiAgICBwdWJsaWMgbW9ua2V5VHJlZUV4cFVwKHVwTGF5ZXI6IGNjLk5vZGUsIGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMubW9ua2V5VHJlZUFyeVtpbmRleF07XG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICBkYXRhLmV4cCsrO1xuICAgICAgICAgICAgZGF0YS5yZW1haW5MYWJlbC5zdHJpbmcgPSBgeCR7OSAtIChkYXRhLmV4cCAlIDkpfWBcbiAgICAgICAgICAgIGlmIChkYXRhLmV4cCAlIDkgPT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb25rZXlXYWtlVXAodXBMYXllciwgaW5kZXgpO1xuICAgICAgICAgICAgICAgIH0sIDAuNSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG1vbmtleVdha2VVcCh1cExheWVyOiBjYy5Ob2RlLCBpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLm1vbmtleVRyZWVBcnlbaW5kZXhdO1xuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgZGF0YS50cmVlLnBsYXkoJ3llemlzaHVfeWFvc2h1JywgMCwgZmFsc2UsICgpID0+IHtcbiAgICAgICAgICAgICAgICBkYXRhLnRyZWUucGxheSgneWV6aXNodV94aXV4aWFuJywgMCwgdHJ1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIE0uZXZlbnQuc2VuZChFdmVudC5HYW1lQ01ELkNoYW5nZUNlbGwsIENlbGxUeXBlLkNvY29udXQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVNb25leVRyZWVTdGF0ZShpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLm1vbmtleVRyZWVBcnlbaW5kZXhdO1xuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGRhdGEudHJlZS5wbGF5KCd5ZXppc2h1X3hpdXhpYW4nLCAwLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBsZXQgYmFzZURpcnMgPSBbY2MudjIoMCwgMCksIGNjLnYyKDEsIDApLCBjYy52MigwLCAtMSksIGNjLnYyKDEsIC0xKSwgY2MudjIoMCwgLTIpLCBjYy52MigxLCAtMildO1xuICAgICAgICAgICAgICAgIGJhc2VEaXJzLmZvckVhY2goZGlyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY20gPSBDb21tb24uc2FmZUdldDJBcnJheVZhbHVlKEdhbWVNb2RlbC5pbnMuR3JvdW5kTGlzdCwgZGF0YS5wb3MuYWRkKGRpcikpO1xuICAgICAgICAgICAgICAgICAgICBjbSAmJiBjbS5pbml0TW9ua2V5VHJlZVBvcygpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZU1pZGRsZUJvcmRlcihwb3M6IGNjLlZlYzIsIG5hbWU6IHN0cmluZykge1xuXG4gICAgICAgIGlmIChuYW1lID09ICcxMTAxJyB8fCBuYW1lID09ICcxMTEwJyB8fCBuYW1lID09ICcwMTEwJyB8fCBuYW1lID09ICcxMDAxJykge1xuICAgICAgICAgICAgbmFtZSA9ICcxMTAwJztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGZyYW1lID0gdGhpcy5nZXRCb3JkZXJGcmFtZSh0aGlzLm1pZGRsZUZyYW1lcywgYG0ke25hbWV9YCwgMyk7XG4gICAgICAgIGlmIChmcmFtZSkge1xuICAgICAgICAgICAgY29uc3QgYm9yZGVyTm9kZSA9IG5ldyBjYy5Ob2RlKCk7XG4gICAgICAgICAgICBjb25zdCBzcHJpdGUgPSBib3JkZXJOb2RlLmFkZENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICAgICAgc3ByaXRlLnNpemVNb2RlID0gY2MuU3ByaXRlLlNpemVNb2RlLkNVU1RPTTtcbiAgICAgICAgICAgIGJvcmRlck5vZGUucGFyZW50ID0gdGhpcy5ib3JkZXJQYXJlbnQ7XG4gICAgICAgICAgICBib3JkZXJOb2RlLmFuY2hvclkgPSAxO1xuICAgICAgICAgICAgYm9yZGVyTm9kZS56SW5kZXggPSAxO1xuICAgICAgICAgICAgc3ByaXRlLnNwcml0ZUZyYW1lID0gZnJhbWU7XG4gICAgICAgICAgICBsZXQgb2Zmc2V0ID0gY2MudjIoMCwgLTE0KTtcbiAgICAgICAgICAgIHN3aXRjaCAobmFtZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJzAxMDAnOlxuICAgICAgICAgICAgICAgICAgICBib3JkZXJOb2RlLmFuY2hvclggPSAxNiAvICg1MS41KTtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gY2MudjIoMCwgQ29tbW9uLkdSSURfSCAvIDIgLSA4KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnMTAwMCc6XG4gICAgICAgICAgICAgICAgICAgIGJvcmRlck5vZGUuYW5jaG9yWCA9IDEgLSAoMTYgLyAoNTEuNSkpO1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXQgPSBjYy52MigwLCBDb21tb24uR1JJRF9IIC8gMiAtIDgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICcxMTAwJzpcblxuICAgICAgICAgICAgICAgICAgICBib3JkZXJOb2RlLnNldENvbnRlbnRTaXplKGNjLnNpemUoQ29tbW9uLkdSSURfVywgYm9yZGVyTm9kZS5oZWlnaHQpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBib3JkZXJOb2RlLnNldFBvc2l0aW9uKHBvcy5hZGQob2Zmc2V0KSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZVVwQm9yZGVyKHBvczogY2MuVmVjMiwgY2ZnOiBhbnksIG5hbWU6IHN0cmluZykge1xuICAgICAgICBjb25zdCBib3JkZXJOb2RlID0gbmV3IGNjLk5vZGUoKTtcbiAgICAgICAgY29uc3Qgc3ByaXRlID0gYm9yZGVyTm9kZS5hZGRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICAgICAgc3ByaXRlLnRyaW0gPSBmYWxzZTtcbiAgICAgICAgc3ByaXRlLnNpemVNb2RlID0gY2MuU3ByaXRlLlNpemVNb2RlLkNVU1RPTTtcbiAgICAgICAgYm9yZGVyTm9kZS5wYXJlbnQgPSB0aGlzLmJvcmRlclBhcmVudDtcbiAgICAgICAgYm9yZGVyTm9kZS5uYW1lID0gYCR7bmFtZX1fJHtjZmdbMF19YDtcbiAgICAgICAgYm9yZGVyTm9kZS56SW5kZXggPSAyO1xuICAgICAgICBzcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLmdldEJvcmRlckZyYW1lKHRoaXMuYm9yZGVyRnJhbWVzLCBjZmdbMF0sIDUpO1xuICAgICAgICBib3JkZXJOb2RlLnNldFBvc2l0aW9uKHBvcyk7XG4gICAgICAgIGJvcmRlck5vZGUuc2V0U2NhbGUoY2ZnWzFdKTtcbiAgICAgICAgYm9yZGVyTm9kZS5zZXRDb250ZW50U2l6ZShDb21tb24uR1JJRF9XLCBDb21tb24uR1JJRF9IKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEJvcmRlckZyYW1lKGNvbnRhaW5lcjogQXJyYXk8Y2MuU3ByaXRlRnJhbWU+LCBzaWQ6IHN0cmluZywgZ2FwSW5kZXg6IG51bWJlcik6IGNjLlNwcml0ZUZyYW1lIHtcbiAgICAgICAgbGV0IHN0YXJ0SWR4ID0gMDtcbiAgICAgICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3dhdGVyJzpcbiAgICAgICAgICAgICAgICBzdGFydElkeCA9IDA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdncmFzcyc6XG4gICAgICAgICAgICAgICAgc3RhcnRJZHggPSBnYXBJbmRleDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3NhbmQnOlxuICAgICAgICAgICAgICAgIHN0YXJ0SWR4ID0gZ2FwSW5kZXggKiAyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGxldCBmcmFtZSA9IG51bGw7XG4gICAgICAgIGZvciAobGV0IGkgPSA1OyBpLS07KSB7XG4gICAgICAgICAgICBjb25zdCBmID0gY29udGFpbmVyW3N0YXJ0SWR4ICsgaV07XG4gICAgICAgICAgICBpZiAoZiAmJiBmLm5hbWUgPT0gYCR7dGhpcy50eXBlfV8ke3NpZH1gKSB7XG4gICAgICAgICAgICAgICAgZnJhbWUgPSBmO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmcmFtZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDliJ3lp4vljJbmsLTnmoTmmL7npLohICBcbiAgICAgKiBAcGFyYW0gY29mZiAg5pCe5a6a6L+Z6YeMLuWwseiDveaQnuWumjUw5LiqZGNcbiAgICAgKi9cbiAgICBwcml2YXRlIGluaXRWaWV3QnlUeXBlKGNvZmY6IHN0cmluZywgeCwgeSwgdHlwZTogR3JvdW5kVHlwZSkge1xuICAgICAgICBsZXQgb2Zmc2V0ID0gY2MudjIoLUNvbW1vbi5HUklEX1cgLyAyLCBDb21tb24uR1JJRF9IIC8gMik7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBNLm5vZGVQb29sLmdldEl0ZW0oTm9kZVBvb2xLZXkuQ29tcGxleEdyb3VuZCk7XG4gICAgICAgIG5vZGUubmFtZSA9IGNvZmY7XG4gICAgICAgIGNvbnN0IHNwcml0ZSA9IG5vZGUuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICAgIHNwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMuZ2V0RnJhbWVCeVR5cGUoY29mZiwgdHlwZSk7XG4gICAgICAgIHNwcml0ZS5zaXplTW9kZSA9IGNjLlNwcml0ZS5TaXplTW9kZS5DVVNUT007XG4gICAgICAgIHNwcml0ZS50cmltID0gZmFsc2U7XG4gICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy53YXRlclBhcmVudFxuICAgICAgICBub2RlLnNldFBvc2l0aW9uKENvbW1vbi5nZXRQb3MoeCwgeSkuYWRkKG9mZnNldCkpO1xuICAgICAgICBub2RlLnNldENvbnRlbnRTaXplKGNjLnNpemUoQ29tbW9uLkdSSURfVywgQ29tbW9uLkdSSURfSCkpO1xuICAgICAgICAvLyBpZiAodHlwZSA9PSBHcm91bmRUeXBlLkdyb3VuZCkge1xuICAgICAgICAvLyAgICAgdGhpcy5fc2F2ZUNvbXBsZXhPYmplY3QoeCwgeSwgbm9kZSk7XG4gICAgICAgIC8vIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlrZjlgqjlpI3mnYLmsLTmiJbogIXlnLDlnZfnmoTlr7nosaFcbiAgICAgKiBAcGFyYW0geCBcbiAgICAgKiBAcGFyYW0geSBcbiAgICAgKiBAcGFyYW0gbm9kZSBcbiAgICAgKi9cbiAgICBwcml2YXRlIF9zYXZlQ29tcGxleE9iamVjdCh4OiBudW1iZXIsIHk6IG51bWJlciwgbm9kZTogY2MuTm9kZSkge1xuICAgICAgICBpZiAoIXRoaXMuX2NvbXBsZXhJdGVtTWFwKSB7XG4gICAgICAgICAgICB0aGlzLl9jb21wbGV4SXRlbU1hcCA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5fY29tcGxleEl0ZW1NYXBbeV0pIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbXBsZXhJdGVtTWFwW3ldID0gW107XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY29tcGxleEl0ZW1NYXBbeV1beF0gPSBub2RlO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0RnJhbWVCeVR5cGUoY29mZjogc3RyaW5nLCB0eXBlOiBHcm91bmRUeXBlKTogY2MuU3ByaXRlRnJhbWUge1xuICAgICAgICBsZXQgcmVzdWx0OiBjYy5TcHJpdGVGcmFtZSA9IG51bGw7XG4gICAgICAgIGNvbnN0IGZyYW1lcyA9IHR5cGUgPT0gR3JvdW5kVHlwZS5XYXRlciA/IHRoaXMud2F0ZXJGcmFtZXMgOiBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IGZyYW1lcy5sZW5ndGg7IGktLTspIHtcbiAgICAgICAgICAgIGxldCB3YXRlciA9IGZyYW1lc1tpXTtcbiAgICAgICAgICAgIGlmICh3YXRlci5uYW1lLmluZGV4T2YoY29mZikgIT0gLTEpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB3YXRlcjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcign5rKh5om+5Yiw6LWE5rqQOi0tLS0tPicsIGNvZmYpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIGdldENlbGxFbXB0eVN0YXR1cyh4LCB5KTogbnVtYmVyIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IDE7XG4gICAgICAgIGlmICghdGhpcy5tb2RlbHNbeV0pIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoIXRoaXMubW9kZWxzW3ldW3hdKSB7XG4gICAgICAgICAgICByZXN1bHQgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMubW9kZWxzW3ldW3hdLmdldFR5cGUoKSA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXN1bHQgPSAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG5cbiAgICB1cGRhdGUoZHQpIHtcblxuICAgIH1cbn1cbiJdfQ==