"use strict";
cc._RF.push(module, '1db8aCZ+txIbaiX7cOWqp/x', 'Common');
// Script/Logic/Common/Common.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameModel_1 = require("../Match3/Model/GameModel");
var Util_1 = require("../../Base/Utils/Util");
var Constant_1 = require("../Data/Const/Constant");
var NodePoolMgr_1 = require("../../Base/Manager/NodePoolMgr");
var SpinePlayerCtrl_1 = require("../../Base/CustomComponent/SpinePlayerCtrl");
var M_1 = require("../../Base/Manager/M");
var backgrundInfo = {
    "idx_1": { "name": "bg", "type": "water", "cfg": "ext", "isWater": true },
    "idx_2": { "name": "bg", "type": "grass", "cfg": "ext", },
    "idx_3": { "name": "bg", "type": "sand", "cfg": "ext", } //
};
var GroundBorderInfo = {
    "0001": ["0001", cc.v2(1, 1)],
    "0010": ["0001", cc.v2(-1, 1)],
    "0100": ["0001", cc.v2(1, -1)],
    "1000": ["0001", cc.v2(-1, -1)],
    "0011": ["0011", cc.v2(1, 1)],
    "1100": ["0011", cc.v2(1, -1)],
    "0101": ["0101", cc.v2(1, 1)],
    "1010": ["0101", cc.v2(-1, 1)],
    "0111": ["0111", cc.v2(1, 1)],
    "1011": ["0111", cc.v2(-1, 1)],
    "1101": ["0111", cc.v2(1, -1)],
    "1110": ["0111", cc.v2(-1, -1)],
    "0110": ["0110", cc.v2(1, 1)],
    "1001": ["0110", cc.v2(-1, 1)]
};
var Common = /** @class */ (function () {
    function Common() {
    }
    Common.safeGet2ArrayValue = function (data, pos) {
        var result = null;
        if (pos && data[pos.y]) {
            result = data[pos.y][pos.x];
        }
        return result;
    };
    Common.safeSet2ArrayValue = function (list, pos, data) {
        list[pos.y] && (list[pos.y][pos.x] = data);
    };
    /**将界面坐标转换成网格坐标 */
    Common.convetPos = function (pos, index) {
        if (index === void 0) { index = null; }
        var c_x = 0, c_y = 0;
        var gs = GameModel_1.default.GridSize;
        if (index != null) {
            gs = GameModel_1.default.ins.getMaps()[index].size;
        }
        pos.x = Math.round(pos.x);
        pos.y = Math.round(pos.y);
        if (gs.W % 2 == 0) {
            c_x = gs.W / 2 + Math.floor(pos.x / this.GRID_W);
        }
        else {
            c_x = (gs.W - 1) / 2 + Math.floor(pos.x / this.GRID_W + 0.5);
        }
        if (gs.H % 2 == 0) {
            c_y = gs.H / 2 - Math.ceil(pos.y / this.GRID_H);
        }
        else {
            c_y = (gs.H - 1) / 2 - Math.ceil(pos.y / this.GRID_H - 0.5);
        }
        return cc.v2(c_x, c_y);
    };
    /**网格坐标转换成界面坐标 */
    Common.getPos = function (x, y, index) {
        if (index === void 0) { index = null; }
        var s_x, s_y, s_px, s_py;
        var gs = GameModel_1.default.GridSize;
        if (index != null) {
            gs = GameModel_1.default.ins.getMaps()[index].size;
        }
        s_px = 0.5;
        s_py = 0.5;
        if (gs.W % 2 == 0) {
            s_x = gs.W / 2;
        }
        else {
            s_x = (gs.W - 1) / 2;
            s_px = 0;
        }
        if (gs.H % 2 == 0) {
            s_y = gs.H / 2;
        }
        else {
            s_y = (gs.H - 1) / 2;
            s_py = 0;
        }
        return cc.v2((x - s_x + s_px) * this.GRID_W, -(y - s_y + s_py) * this.GRID_H);
    };
    Common.getBgInfo = function (bgIndex) {
        return backgrundInfo["idx_" + bgIndex];
    };
    Common.getGroundBorderInfo = function (key) {
        return GroundBorderInfo[key];
    };
    /**
     * 从一个中心点获取周边的圆环行的目标
     * @param center
     * @param depth
     * @returns Cell Model List
     */
    Common.getAroundCircleCells = function (center, depth, isLast) {
        if (depth === void 0) { depth = 1; }
        //周围一圈的方向参数     
        var rstAry = new Set();
        if (center) {
            var rowNum = (depth * 2) + 1;
            var list = GameModel_1.default.ins.CellList;
            for (var j = 0; j < rowNum; j++) {
                var v = Math.ceil((j / 2));
                var v2 = ((j % 2) * -1) == 0 ? v : -v;
                //④个方向    
                var dirs = [cc.v2(depth, v2), cc.v2(v2, depth), cc.v2(-depth, v2), cc.v2(v2, -depth)];
                for (var i = 0; i < dirs.length; i++) {
                    var dir = dirs[i];
                    if (this.isBombRand(isLast, depth, dir)) {
                        var item = this.safeGet2ArrayValue(list, center.add(dir));
                        item && rstAry.add(item);
                    }
                }
            }
        }
        return rstAry;
    };
    /**
     * 获取一个坐标在基本中心坐标的方向
     * @param targetPos
     * @param selfPos
     */
    Common.getDirction = function (targetPos, selfPos) {
        //确定上下 
        var y = 0;
        if (selfPos.y < targetPos.y)
            y = 1;
        else if (selfPos.y > targetPos.y)
            y = -1;
        //确定左右
        var x = 0;
        if (selfPos.x < targetPos.x)
            x = 1;
        else if (selfPos.x > targetPos.x)
            x = -1;
        return cc.v2(x, y);
    };
    Common.convertCurWorldPos = function (pos) {
        return this.CurrentCtrlView && this.CurrentCtrlView.convertToWorldSpaceAR(pos);
    };
    Common.getWorldPos = function (self) {
        var pos = null;
        if (self && self.parent) {
            pos = self.parent.convertToWorldSpaceAR(self.position);
        }
        return pos;
    };
    /**拿一个指定点的周围的元素 */
    Common.getRoundOnePos = function (pos) {
        var newPos = null;
        for (var i = this.Dir4.length; i--;) {
            var p = pos.add(this.Dir4[i]);
            var cell = this.safeGet2ArrayValue(GameModel_1.default.ins.CellList, p);
            if (p.x >= 0 && p.y >= 0 && cell && !cell.isEmpty && !cell.isBomb &&
                !GameModel_1.default.ins.isHavaSpe(cell.pos) && !GameModel_1.default.ins.isHold(cell.pos)) {
                newPos = p;
                break;
            }
        }
        return newPos;
    };
    Common.setAlignment = function (node, dir, value) {
        var w = node.getComponent(cc.Widget);
        if (!w) {
            w = node.addComponent(cc.Widget);
        }
        var letter = dir[0].toUpperCase();
        w["isAlign" + letter + dir.substring(1, dir.length)] = true;
        w[dir] = value;
        w.updateAlignment();
    };
    Common.getRes = function (path, type) {
        return new Promise(function (resolve) {
            cc.loader.loadRes(path, type, function (err, res) {
                if (err || !res) {
                    console.error(err ? err : 'loadRes res is null!');
                    return resolve(null);
                }
                resolve(res);
            });
        });
    };
    Common.getRemotPic = function (url, size, type) {
        if (type === void 0) { type = 'jpg'; }
        return new Promise(function (resolve) {
            cc.loader.load({ url: url, type: type }, function (err, tex) {
                if (err || !tex) {
                    resolve(null);
                }
                else {
                    if (size) {
                        tex.height = size.width;
                        tex.width = size.height;
                    }
                    resolve(new cc.SpriteFrame(tex));
                }
            });
        });
    };
    Common.isBombRand = function (isLast, depth, pos) {
        return !isLast || Math.abs(pos.x) != depth || Math.abs(pos.y) != depth;
    };
    /**
     * 判断是否是一个特殊的正方形队形
     * @param col 竖的收集标本
     * @param row 横的收集标本
     * @param checkType 检测目标类型
     * @param checkPos 检测的下标
     * @param list 当前检测的棋盘
     */
    Common.getSquareSingleCell = function (col, row, checkType, checkPos, list) {
        //找出消除点的夹角的2个元素 
        var mainArr = null;
        var subArr = null;
        var mainKey = null;
        if (col.size > row.size) {
            mainArr = Array.from(col);
            subArr = Array.from(row);
            mainKey = 'y';
        }
        else {
            mainArr = Array.from(row);
            subArr = Array.from(col);
            mainKey = 'x';
        }
        var subKey = (mainKey == 'x' ? 'y' : 'x');
        var result = null;
        for (var i = mainArr.length; i--;) {
            var cell = mainArr[i];
            if (Math.abs(cell.pos[mainKey] - checkPos[mainKey]) == 1) {
                for (var j = subArr.length; j--;) {
                    var scell = subArr[j];
                    if (Math.abs(scell.pos[subKey] - checkPos[subKey]) == 1 &&
                        Math.abs(cell.pos[mainKey] - scell.pos[mainKey]) == 1) {
                        var targetPos = cc.v2(0, 0);
                        if (checkPos.x == cell.pos.x) {
                            targetPos.y = cell.pos.y;
                        }
                        else {
                            targetPos.y = scell.pos.y;
                        }
                        if (checkPos.y == cell.pos.y) {
                            targetPos.x = cell.pos.x;
                        }
                        else {
                            targetPos.x = scell.pos.x;
                        }
                        var target = Common.safeGet2ArrayValue(list, targetPos);
                        if (target && target.getType() == checkType) {
                            result = target;
                            i = 0;
                            break;
                        }
                    }
                }
            }
        }
        //根据夹角元素找出与消除点对角元素  
        return result;
    };
    Common.isMergeBomb = function (bombType1, bombType2, type1, type2) {
        //tangtangtangtang 4种组合
        var result = false;
        if (type1 == bombType1 && type2 == bombType2 ||
            type1 == bombType2 && type2 == bombType1 ||
            ((type1 == bombType1 && type2 == bombType1) &&
                (type1 == bombType2 && type2 == bombType2))) {
            result = true;
        }
        return result;
    };
    Common.randomGetOneCell = function () {
        var y = Util_1.Util.Tool.rangeInt(0, GameModel_1.default.GridSize.H, false);
        var x = Util_1.Util.Tool.rangeInt(0, GameModel_1.default.GridSize.W, false);
        var cell = this.safeGet2ArrayValue(GameModel_1.default.ins.CellList, cc.v2(x, y));
        if (!cell) {
            return this.randomGetOneCell();
        }
        return cell.pos;
    };
    /**
     * 设置一个sprite的灰色状态
     * @param opt
     * @param node
     */
    Common.switchGray = function (opt, node) {
        // if (cc.game.renderType === cc.game.RENDER_TYPE_CANVAS) {
        //     return;
        // }
        // if (node['isGray'] && opt || !node['isGray'] && !opt) {
        //     return;
        // }
        // let material;
        // let tmpMaterial: any = cc.Material;
        // let sprite = node.getComponent(cc.Sprite);
        // if (opt) {
        //     material = tmpMaterial.getInstantiatedMaterial(tmpMaterial.getBuiltinMaterial('2d-gray-sprite'), sprite);
        // } else {
        //     material = tmpMaterial.getInstantiatedMaterial(tmpMaterial.getBuiltinMaterial('2d-sprite', sprite), sprite);
        // }
        // node['isGray'] = opt;
        // sprite.setMaterial(0, material);
    };
    Common.createSprite = function (key, frame, parent) {
        if (parent === void 0) { parent = null; }
        var node = NodePoolMgr_1.default.ins.getItem(key, null);
        var sprite = node.addComponent(cc.Sprite);
        sprite.spriteFrame = frame;
        if (parent) {
            node.parent = parent;
        }
        return sprite;
    };
    Common.createEffPrefab = function (parent, key, prefab, pos) {
        if (pos === void 0) { pos = null; }
        var node = null;
        if (key) {
            node = M_1.default.nodePool.getItem(key, prefab);
        }
        else {
            node = M_1.default.nodePool.createItem(prefab);
        }
        node.parent = parent;
        pos && node.setPosition(pos);
        var ctrl = node.getComponent(cc.Animation);
        return { node: node, ctrl: ctrl };
    };
    Common.createSpineNode = function (parent, prefab, key, pos) {
        if (pos === void 0) { pos = null; }
        var node = null;
        if (key) {
            node = NodePoolMgr_1.default.ins.getItem(key, prefab);
        }
        else {
            node = NodePoolMgr_1.default.ins.createItem(prefab);
        }
        node.parent = parent;
        pos && node.setPosition(pos);
        var ctrl = node.getComponent(SpinePlayerCtrl_1.default);
        return { node: node, ctrl: ctrl };
    };
    Common.isBombType = function (type) {
        return type >= Constant_1.CellType.Bomb1 && type < Constant_1.CellType.Bomb100;
    };
    Common.parseRankData = function (value) {
        return { score: value & 1048575, level: value >> 20 };
    };
    Common.stringifyRankData = function (lv, socre) {
        return (lv << 20) | socre;
    };
    Common.testGroundBorderDisplay = function (x, y, models, type) {
        return [!this.getStatusByType(x, y - 1, models, type),
            !this.getStatusByType(x, y + 1, models, type),
            !this.getStatusByType(x - 1, y, models, type),
            !this.getStatusByType(x + 1, y, models, type)];
    };
    Common.getSpriteNameByType = function (x, y, models, type) {
        var coff = '';
        coff += this.getStatusByType(x - 1, y - 1, models, type);
        coff += this.getStatusByType(x, y - 1, models, type);
        coff += this.getStatusByType(x - 1, y, models, type);
        coff += this.getStatusByType(x, y, models, type);
        return coff;
    };
    Common.getStatusByType = function (x, y, models, type) {
        var result = 1;
        if (!models[y]) {
            result = 0;
        }
        else if (!models[y][x]) {
            result = 0;
        }
        else if (models[y][x].getType() != type || models[y][x].isDeath) {
            result = 0;
        }
        return result;
    };
    Common.execDelayTask = function (fun, delayTime) {
        setTimeout(fun, delayTime * 1000);
    };
    Common.getStringkey = function (pos) {
        return pos.x + "_" + pos.y;
    };
    Common.getSpecialAddScoreByType = function (type) {
        return Constant_1.ScoreConfig.Special[type];
    };
    Common.getOfflineTime = function (lastOfflineTime, currentTime) {
        var offlineTime = (currentTime - lastOfflineTime) / 1000 / 60;
        if (offlineTime > Constant_1.MinOfflineTime) {
            return offlineTime;
        }
        return 0;
    };
    Common.jumpScene = function (targetSceneName, lanuchedNext, delayTime) {
        if (delayTime === void 0) { delayTime = 0; }
        if (targetSceneName !== this.curScene) {
            this.preScene = this.curScene;
        }
        this.curScene = targetSceneName;
        var time = delayTime * 1000;
        if (time > 0) {
            setTimeout(function () {
                cc.director.loadScene(targetSceneName, lanuchedNext);
            }, time);
        }
        else {
            cc.director.loadScene(targetSceneName, lanuchedNext);
        }
    };
    /** 单位转换 */
    Common.bytesToSize = function (bytes, isBlood) {
        if (isBlood === void 0) { isBlood = false; }
        if (bytes < 10000) {
            return Math.floor(bytes).toString();
        }
        if (bytes === 0)
            return '0';
        var k = 1000, // or 1024
        sizes = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y', 'aa', 'bb', 'cc', 'dd', 'ee', 'ff', 'gg', 'hh', 'ii', 'jj', 'kk', 'mm', 'nn', 'pp', 'qq', 'rr', 'ss', 'tt', 'uu', 'vv', 'ww', 'xx', 'zz'], i = Math.floor(Math.log(bytes) / Math.log(k));
        var unit = '';
        if (i < sizes.length) {
            unit = sizes[i];
        }
        else {
            var numLenght = i - sizes.length;
            unit = String.fromCharCode(97 + numLenght % 26);
            for (var index = 0; index < 1 + Math.floor(numLenght / 65); index++) {
                unit = unit + unit;
            }
        }
        if (isBlood) {
            return Math.abs(parseInt((bytes / Math.pow(k, i)).toPrecision(3))) + unit;
        }
        else {
            return (bytes / Math.pow(k, i)).toPrecision(3) + '' + unit;
        }
    };
    Common.getCurrencyName = function (type) {
        return ['金币', '钻石', '能量'][type];
    };
    /**组合奖励信息 */
    Common.getRewardArray = function (rewardData) {
        var arr = [];
        if (rewardData) {
            for (var key in rewardData) {
                if (key == 'box') {
                    for (var boxKey in rewardData[key]) {
                        var v = rewardData[key][boxKey];
                        arr.push({ type: Number(boxKey), count: v });
                    }
                }
                else {
                    arr.push({ type: Number(key), count: rewardData[key] });
                }
            }
        }
        return arr;
    };
    Common.preScene = null;
    Common.curScene = null;
    Common.GRID_H = 84;
    Common.GRID_W = 84;
    Common.CurrentCtrlView = null;
    Common.Dir4 = [cc.v2(-1, 0), cc.v2(1, 0), cc.v2(0, 1), cc.v2(0, -1)];
    return Common;
}());
exports.default = Common;
window["Common"] = Common;

cc._RF.pop();