
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Common/Common.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcQ29tbW9uXFxDb21tb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1REFBa0Q7QUFFbEQsOENBQTZDO0FBQzdDLG1EQUFtRztBQUNuRyw4REFBeUQ7QUFDekQsOEVBQXlFO0FBR3pFLDBDQUFxQztBQUdyQyxJQUFNLGFBQWEsR0FBRztJQUNsQixPQUFPLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFO0lBQ3pFLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxHQUFHO0lBQ3pELE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRTtDQUM5RCxDQUFBO0FBRUQsSUFBTSxnQkFBZ0IsR0FBRztJQUNyQixNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDN0IsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDOUIsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUIsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMvQixNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FB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SyxFQUFFO29CQUNkLEtBQUssSUFBSSxNQUFNLElBQUksVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFO3dCQUNoQyxJQUFNLENBQUMsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQ2xDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO3FCQUNoRDtpQkFDSjtxQkFBTTtvQkFDSCxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztpQkFDM0Q7YUFDSjtTQUNKO1FBQ0QsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBM2NhLGVBQVEsR0FBVyxJQUFJLENBQUM7SUFDeEIsZUFBUSxHQUFXLElBQUksQ0FBQztJQUN4QixhQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ1osYUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNaLHNCQUFlLEdBQVksSUFBSSxDQUFDO0lBQ2hDLFdBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBdWNoRixhQUFDO0NBOWNELEFBOGNDLElBQUE7a0JBOWNvQixNQUFNO0FBZ2QzQixNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsTUFBTSxDQUFDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdhbWVNb2RlbCBmcm9tIFwiLi4vTWF0Y2gzL01vZGVsL0dhbWVNb2RlbFwiO1xuaW1wb3J0IHsgQ2VsbE1vZGVsIH0gZnJvbSBcIi4uL01hdGNoMy9Nb2RlbC9DZWxsTW9kZWxcIjtcbmltcG9ydCB7IFV0aWwgfSBmcm9tIFwiLi4vLi4vQmFzZS9VdGlscy9VdGlsXCI7XG5pbXBvcnQgeyBDZWxsVHlwZSwgTm9kZVBvb2xLZXksIFNjb3JlQ29uZmlnLCBTY2VuZSwgTWluT2ZmbGluZVRpbWUgfSBmcm9tICcuLi9EYXRhL0NvbnN0L0NvbnN0YW50JztcbmltcG9ydCBOb2RlUG9vbE1nciBmcm9tIFwiLi4vLi4vQmFzZS9NYW5hZ2VyL05vZGVQb29sTWdyXCI7XG5pbXBvcnQgU3BpbmVQbGF5ZXJDdHJsIGZyb20gXCIuLi8uLi9CYXNlL0N1c3RvbUNvbXBvbmVudC9TcGluZVBsYXllckN0cmxcIjtcbmltcG9ydCB7IElMZXZlbCB9IGZyb20gXCIuLi9EYXRhL0ludGVyZmFjZS9MZXZlbC9JTGV2ZWxcIjtcbmltcG9ydCB7IEN1cnJlbmN5SWQgfSBmcm9tIFwiLi4vLi4vQmFzZS9CYXNlQ29uc3RcIjtcbmltcG9ydCBNIGZyb20gXCIuLi8uLi9CYXNlL01hbmFnZXIvTVwiO1xuXG5cbmNvbnN0IGJhY2tncnVuZEluZm8gPSB7XG4gICAgXCJpZHhfMVwiOiB7IFwibmFtZVwiOiBcImJnXCIsIFwidHlwZVwiOiBcIndhdGVyXCIsIFwiY2ZnXCI6IFwiZXh0XCIsIFwiaXNXYXRlclwiOiB0cnVlIH0sXG4gICAgXCJpZHhfMlwiOiB7IFwibmFtZVwiOiBcImJnXCIsIFwidHlwZVwiOiBcImdyYXNzXCIsIFwiY2ZnXCI6IFwiZXh0XCIsIH0sXG4gICAgXCJpZHhfM1wiOiB7IFwibmFtZVwiOiBcImJnXCIsIFwidHlwZVwiOiBcInNhbmRcIiwgXCJjZmdcIjogXCJleHRcIiwgfSAvL1xufVxuXG5jb25zdCBHcm91bmRCb3JkZXJJbmZvID0ge1xuICAgIFwiMDAwMVwiOiBbXCIwMDAxXCIsIGNjLnYyKDEsIDEpXSxcbiAgICBcIjAwMTBcIjogW1wiMDAwMVwiLCBjYy52MigtMSwgMSldLFxuICAgIFwiMDEwMFwiOiBbXCIwMDAxXCIsIGNjLnYyKDEsIC0xKV0sXG4gICAgXCIxMDAwXCI6IFtcIjAwMDFcIiwgY2MudjIoLTEsIC0xKV0sXG4gICAgXCIwMDExXCI6IFtcIjAwMTFcIiwgY2MudjIoMSwgMSldLFxuICAgIFwiMTEwMFwiOiBbXCIwMDExXCIsIGNjLnYyKDEsIC0xKV0sXG4gICAgXCIwMTAxXCI6IFtcIjAxMDFcIiwgY2MudjIoMSwgMSldLFxuICAgIFwiMTAxMFwiOiBbXCIwMTAxXCIsIGNjLnYyKC0xLCAxKV0sXG4gICAgXCIwMTExXCI6IFtcIjAxMTFcIiwgY2MudjIoMSwgMSldLFxuICAgIFwiMTAxMVwiOiBbXCIwMTExXCIsIGNjLnYyKC0xLCAxKV0sXG4gICAgXCIxMTAxXCI6IFtcIjAxMTFcIiwgY2MudjIoMSwgLTEpXSxcbiAgICBcIjExMTBcIjogW1wiMDExMVwiLCBjYy52MigtMSwgLTEpXSxcbiAgICBcIjAxMTBcIjogW1wiMDExMFwiLCBjYy52MigxLCAxKV0sXG4gICAgXCIxMDAxXCI6IFtcIjAxMTBcIiwgY2MudjIoLTEsIDEpXVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21tb24ge1xuXG4gICAgcHVibGljIHN0YXRpYyBwcmVTY2VuZTogc3RyaW5nID0gbnVsbDtcbiAgICBwdWJsaWMgc3RhdGljIGN1clNjZW5lOiBzdHJpbmcgPSBudWxsO1xuICAgIHB1YmxpYyBzdGF0aWMgR1JJRF9IID0gODQ7XG4gICAgcHVibGljIHN0YXRpYyBHUklEX1cgPSA4NDtcbiAgICBwdWJsaWMgc3RhdGljIEN1cnJlbnRDdHJsVmlldzogY2MuTm9kZSA9IG51bGw7XG4gICAgcHVibGljIHN0YXRpYyBEaXI0ID0gW2NjLnYyKC0xLCAwKSwgY2MudjIoMSwgMCksIGNjLnYyKDAsIDEpLCBjYy52MigwLCAtMSldO1xuXG4gICAgcHVibGljIHN0YXRpYyBzYWZlR2V0MkFycmF5VmFsdWU8VD4oZGF0YTogVFtdW10sIHBvczogY2MuVmVjMik6IFQge1xuICAgICAgICBsZXQgcmVzdWx0ID0gbnVsbDtcbiAgICAgICAgaWYgKHBvcyAmJiBkYXRhW3Bvcy55XSkge1xuICAgICAgICAgICAgcmVzdWx0ID0gZGF0YVtwb3MueV1bcG9zLnhdXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHNhZmVTZXQyQXJyYXlWYWx1ZTxUPihsaXN0OiBUW11bXSwgcG9zOiBjYy5WZWMyLCBkYXRhOiBUKSB7XG4gICAgICAgIGxpc3RbcG9zLnldICYmIChsaXN0W3Bvcy55XVtwb3MueF0gPSBkYXRhKTtcbiAgICB9XG5cbiAgICAvKirlsIbnlYzpnaLlnZDmoIfovazmjaLmiJDnvZHmoLzlnZDmoIcgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNvbnZldFBvcyhwb3MsIGluZGV4OiBudW1iZXIgPSBudWxsKTogY2MuVmVjMiB7XG4gICAgICAgIGxldCBjX3ggPSAwLCBjX3kgPSAwO1xuICAgICAgICBsZXQgZ3MgPSBHYW1lTW9kZWwuR3JpZFNpemU7XG4gICAgICAgIGlmIChpbmRleCAhPSBudWxsKSB7XG4gICAgICAgICAgICBncyA9IEdhbWVNb2RlbC5pbnMuZ2V0TWFwcygpW2luZGV4XS5zaXplO1xuICAgICAgICB9XG4gICAgICAgIHBvcy54ID0gTWF0aC5yb3VuZChwb3MueCk7XG4gICAgICAgIHBvcy55ID0gTWF0aC5yb3VuZChwb3MueSk7XG4gICAgICAgIGlmIChncy5XICUgMiA9PSAwKSB7XG4gICAgICAgICAgICBjX3ggPSBncy5XIC8gMiArIE1hdGguZmxvb3IocG9zLnggLyB0aGlzLkdSSURfVyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjX3ggPSAoZ3MuVyAtIDEpIC8gMiArIE1hdGguZmxvb3IocG9zLnggLyB0aGlzLkdSSURfVyArIDAuNSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZ3MuSCAlIDIgPT0gMCkge1xuICAgICAgICAgICAgY195ID0gZ3MuSCAvIDIgLSBNYXRoLmNlaWwocG9zLnkgLyB0aGlzLkdSSURfSCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjX3kgPSAoZ3MuSCAtIDEpIC8gMiAtIE1hdGguY2VpbChwb3MueSAvIHRoaXMuR1JJRF9IIC0gMC41KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2MudjIoY194LCBjX3kpO1xuICAgIH1cblxuICAgIC8qKue9keagvOWdkOagh+i9rOaNouaIkOeVjOmdouWdkOaghyAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0UG9zKHgsIHksIGluZGV4OiBudW1iZXIgPSBudWxsKTogY2MuVmVjMiB7XG4gICAgICAgIGxldCBzX3gsIHNfeSwgc19weCwgc19weTtcbiAgICAgICAgbGV0IGdzID0gR2FtZU1vZGVsLkdyaWRTaXplO1xuICAgICAgICBpZiAoaW5kZXggIT0gbnVsbCkge1xuICAgICAgICAgICAgZ3MgPSBHYW1lTW9kZWwuaW5zLmdldE1hcHMoKVtpbmRleF0uc2l6ZTtcbiAgICAgICAgfVxuICAgICAgICBzX3B4ID0gMC41OyBzX3B5ID0gMC41O1xuICAgICAgICBpZiAoZ3MuVyAlIDIgPT0gMCkge1xuICAgICAgICAgICAgc194ID0gZ3MuVyAvIDI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzX3ggPSAoZ3MuVyAtIDEpIC8gMjsgc19weCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGdzLkggJSAyID09IDApIHtcbiAgICAgICAgICAgIHNfeSA9IGdzLkggLyAyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc195ID0gKGdzLkggLSAxKSAvIDI7IHNfcHkgPSAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjYy52MihcbiAgICAgICAgICAgICh4IC0gc194ICsgc19weCkgKiB0aGlzLkdSSURfVyxcbiAgICAgICAgICAgIC0gKHkgLSBzX3kgKyBzX3B5KSAqIHRoaXMuR1JJRF9IXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXRCZ0luZm8oYmdJbmRleDogbnVtYmVyKTogeyBuYW1lOiBzdHJpbmcsIHR5cGU6IHN0cmluZywgY2ZnOiBzdHJpbmcsIGlzV2F0ZXI6IGJvb2xlYW4gfSB7XG4gICAgICAgIHJldHVybiBiYWNrZ3J1bmRJbmZvW2BpZHhfJHtiZ0luZGV4fWBdO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0R3JvdW5kQm9yZGVySW5mbyhrZXk6IHN0cmluZyk6IEFycmF5PGFueT4ge1xuICAgICAgICByZXR1cm4gR3JvdW5kQm9yZGVySW5mb1trZXldO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOS7juS4gOS4quS4reW/g+eCueiOt+WPluWRqOi+ueeahOWchueOr+ihjOeahOebruagh1xuICAgICAqIEBwYXJhbSBjZW50ZXIgXG4gICAgICogQHBhcmFtIGRlcHRoIFxuICAgICAqIEByZXR1cm5zIENlbGwgTW9kZWwgTGlzdFxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0QXJvdW5kQ2lyY2xlQ2VsbHMoY2VudGVyOiBjYy5WZWMyLCBkZXB0aDogbnVtYmVyID0gMSwgaXNMYXN0OiBib29sZWFuKTogU2V0PENlbGxNb2RlbD4ge1xuICAgICAgICAvL+WRqOWbtOS4gOWciOeahOaWueWQkeWPguaVsCAgICAgXG4gICAgICAgIGNvbnN0IHJzdEFyeTogU2V0PENlbGxNb2RlbD4gPSBuZXcgU2V0KCk7XG4gICAgICAgIGlmIChjZW50ZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IHJvd051bSA9IChkZXB0aCAqIDIpICsgMTtcbiAgICAgICAgICAgIGNvbnN0IGxpc3QgPSBHYW1lTW9kZWwuaW5zLkNlbGxMaXN0O1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCByb3dOdW07IGorKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHYgPSBNYXRoLmNlaWwoKGogLyAyKSk7XG4gICAgICAgICAgICAgICAgY29uc3QgdjIgPSAoKGogJSAyKSAqIC0xKSA9PSAwID8gdiA6IC12O1xuICAgICAgICAgICAgICAgIC8v4pGj5Liq5pa55ZCRICAgIFxuICAgICAgICAgICAgICAgIGNvbnN0IGRpcnMgPSBbY2MudjIoZGVwdGgsIHYyKSwgY2MudjIodjIsIGRlcHRoKSwgY2MudjIoLWRlcHRoLCB2MiksIGNjLnYyKHYyLCAtZGVwdGgpXVxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGlycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkaXIgPSBkaXJzW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0JvbWJSYW5kKGlzTGFzdCwgZGVwdGgsIGRpcikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLnNhZmVHZXQyQXJyYXlWYWx1ZShsaXN0LCBjZW50ZXIuYWRkKGRpcikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbSAmJiByc3RBcnkuYWRkKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByc3RBcnk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W5LiA5Liq5Z2Q5qCH5Zyo5Z+65pys5Lit5b+D5Z2Q5qCH55qE5pa55ZCRXG4gICAgICogQHBhcmFtIHRhcmdldFBvcyBcbiAgICAgKiBAcGFyYW0gc2VsZlBvcyBcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGdldERpcmN0aW9uKHRhcmdldFBvczogY2MuVmVjMiwgc2VsZlBvczogY2MuVmVjMik6IGNjLlZlYzIge1xuICAgICAgICAvL+ehruWumuS4iuS4iyBcbiAgICAgICAgbGV0IHkgPSAwXG4gICAgICAgIGlmIChzZWxmUG9zLnkgPCB0YXJnZXRQb3MueSlcbiAgICAgICAgICAgIHkgPSAxO1xuICAgICAgICBlbHNlIGlmIChzZWxmUG9zLnkgPiB0YXJnZXRQb3MueSlcbiAgICAgICAgICAgIHkgPSAtMTtcbiAgICAgICAgLy/noa7lrprlt6blj7NcbiAgICAgICAgbGV0IHggPSAwXG4gICAgICAgIGlmIChzZWxmUG9zLnggPCB0YXJnZXRQb3MueClcbiAgICAgICAgICAgIHggPSAxO1xuICAgICAgICBlbHNlIGlmIChzZWxmUG9zLnggPiB0YXJnZXRQb3MueClcbiAgICAgICAgICAgIHggPSAtMTtcblxuICAgICAgICByZXR1cm4gY2MudjIoeCwgeSk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBjb252ZXJ0Q3VyV29ybGRQb3MocG9zOiBjYy5WZWMyKTogY2MuVmVjMiB7XG4gICAgICAgIHJldHVybiB0aGlzLkN1cnJlbnRDdHJsVmlldyAmJiB0aGlzLkN1cnJlbnRDdHJsVmlldy5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIocG9zKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldFdvcmxkUG9zKHNlbGY6IGNjLk5vZGUpIHtcbiAgICAgICAgbGV0IHBvcyA9IG51bGw7XG4gICAgICAgIGlmIChzZWxmICYmIHNlbGYucGFyZW50KSB7XG4gICAgICAgICAgICBwb3MgPSBzZWxmLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoc2VsZi5wb3NpdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBvcztcbiAgICB9XG5cbiAgICAvKirmi7/kuIDkuKrmjIflrprngrnnmoTlkajlm7TnmoTlhYPntKAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGdldFJvdW5kT25lUG9zKHBvczogY2MuVmVjMik6IGNjLlZlYzIge1xuICAgICAgICBsZXQgbmV3UG9zID0gbnVsbDtcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuRGlyNC5sZW5ndGg7IGktLTspIHtcbiAgICAgICAgICAgIGNvbnN0IHAgPSBwb3MuYWRkKHRoaXMuRGlyNFtpXSk7XG4gICAgICAgICAgICBjb25zdCBjZWxsID0gdGhpcy5zYWZlR2V0MkFycmF5VmFsdWUoR2FtZU1vZGVsLmlucy5DZWxsTGlzdCwgcClcbiAgICAgICAgICAgIGlmIChwLnggPj0gMCAmJiBwLnkgPj0gMCAmJiBjZWxsICYmICFjZWxsLmlzRW1wdHkgJiYgIWNlbGwuaXNCb21iICYmXG4gICAgICAgICAgICAgICAgIUdhbWVNb2RlbC5pbnMuaXNIYXZhU3BlKGNlbGwucG9zKSAmJiAhR2FtZU1vZGVsLmlucy5pc0hvbGQoY2VsbC5wb3MpKSB7XG4gICAgICAgICAgICAgICAgbmV3UG9zID0gcDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3UG9zO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgc2V0QWxpZ25tZW50KG5vZGU6IGNjLk5vZGUsIGRpcjogc3RyaW5nLCB2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIGxldCB3ID0gbm9kZS5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KTtcbiAgICAgICAgaWYgKCF3KSB7XG4gICAgICAgICAgICB3ID0gbm9kZS5hZGRDb21wb25lbnQoY2MuV2lkZ2V0KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBsZXR0ZXIgPSBkaXJbMF0udG9VcHBlckNhc2UoKTtcbiAgICAgICAgd1tgaXNBbGlnbiR7bGV0dGVyfSR7ZGlyLnN1YnN0cmluZygxLCBkaXIubGVuZ3RoKX1gXSA9IHRydWU7XG4gICAgICAgIHdbZGlyXSA9IHZhbHVlO1xuICAgICAgICB3LnVwZGF0ZUFsaWdubWVudCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0UmVzPFQ+KHBhdGgsIHR5cGUpOiBQcm9taXNlPFQ+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhwYXRoLCB0eXBlLCAoZXJyLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyIHx8ICFyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIgPyBlcnIgOiAnbG9hZFJlcyByZXMgaXMgbnVsbCEnKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXRSZW1vdFBpYyh1cmwsIHNpemU/OiBjYy5TaXplLCB0eXBlOiBzdHJpbmcgPSAnanBnJyk6IFByb21pc2U8Y2MuU3ByaXRlRnJhbWU+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICBjYy5sb2FkZXIubG9hZCh7IHVybCwgdHlwZSB9LCAoZXJyLCB0ZXgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyIHx8ICF0ZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4LmhlaWdodCA9IHNpemUud2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXgud2lkdGggPSBzaXplLmhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG5ldyBjYy5TcHJpdGVGcmFtZSh0ZXgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIGlzQm9tYlJhbmQoaXNMYXN0OiBib29sZWFuLCBkZXB0aDogbnVtYmVyLCBwb3M6IGNjLlZlYzIpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICFpc0xhc3QgfHwgTWF0aC5hYnMocG9zLngpICE9IGRlcHRoIHx8IE1hdGguYWJzKHBvcy55KSAhPSBkZXB0aFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWIpOaWreaYr+WQpuaYr+S4gOS4queJueauiueahOato+aWueW9oumYn+W9olxuICAgICAqIEBwYXJhbSBjb2wg56uW55qE5pS26ZuG5qCH5pysXG4gICAgICogQHBhcmFtIHJvdyDmqKrnmoTmlLbpm4bmoIfmnKxcbiAgICAgKiBAcGFyYW0gY2hlY2tUeXBlIOajgOa1i+ebruagh+exu+Wei1xuICAgICAqIEBwYXJhbSBjaGVja1BvcyDmo4DmtYvnmoTkuIvmoIdcbiAgICAgKiBAcGFyYW0gbGlzdCDlvZPliY3mo4DmtYvnmoTmo4vnm5hcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGdldFNxdWFyZVNpbmdsZUNlbGwoY29sOiBTZXQ8Q2VsbE1vZGVsPiwgcm93OiBTZXQ8Q2VsbE1vZGVsPiwgY2hlY2tUeXBlOiBDZWxsVHlwZSwgY2hlY2tQb3M6IGNjLlZlYzIsIGxpc3Q6IENlbGxNb2RlbFtdW10pOiBDZWxsTW9kZWwge1xuICAgICAgICAvL+aJvuWHuua2iOmZpOeCueeahOWkueinkueahDLkuKrlhYPntKAgXG4gICAgICAgIGxldCBtYWluQXJyID0gbnVsbFxuICAgICAgICBsZXQgc3ViQXJyID0gbnVsbDtcbiAgICAgICAgbGV0IG1haW5LZXkgPSBudWxsO1xuICAgICAgICBpZiAoY29sLnNpemUgPiByb3cuc2l6ZSkge1xuICAgICAgICAgICAgbWFpbkFyciA9IEFycmF5LmZyb20oY29sKTtcbiAgICAgICAgICAgIHN1YkFyciA9IEFycmF5LmZyb20ocm93KTtcbiAgICAgICAgICAgIG1haW5LZXkgPSAneSdcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1haW5BcnIgPSBBcnJheS5mcm9tKHJvdyk7XG4gICAgICAgICAgICBzdWJBcnIgPSBBcnJheS5mcm9tKGNvbCk7XG4gICAgICAgICAgICBtYWluS2V5ID0gJ3gnXG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc3ViS2V5ID0gKG1haW5LZXkgPT0gJ3gnID8gJ3knIDogJ3gnKTtcbiAgICAgICAgbGV0IHJlc3VsdCA9IG51bGw7XG4gICAgICAgIGZvciAobGV0IGkgPSBtYWluQXJyLmxlbmd0aDsgaS0tOykge1xuICAgICAgICAgICAgY29uc3QgY2VsbCA9IG1haW5BcnJbaV07XG4gICAgICAgICAgICBpZiAoTWF0aC5hYnMoY2VsbC5wb3NbbWFpbktleV0gLSBjaGVja1Bvc1ttYWluS2V5XSkgPT0gMSkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSBzdWJBcnIubGVuZ3RoOyBqLS07KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNjZWxsID0gc3ViQXJyW2pdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMoc2NlbGwucG9zW3N1YktleV0gLSBjaGVja1Bvc1tzdWJLZXldKSA9PSAxICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBNYXRoLmFicyhjZWxsLnBvc1ttYWluS2V5XSAtIHNjZWxsLnBvc1ttYWluS2V5XSkgPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRhcmdldFBvcyA9IGNjLnYyKDAsIDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoZWNrUG9zLnggPT0gY2VsbC5wb3MueCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldFBvcy55ID0gY2VsbC5wb3MueVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRQb3MueSA9IHNjZWxsLnBvcy55XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hlY2tQb3MueSA9PSBjZWxsLnBvcy55KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0UG9zLnggPSBjZWxsLnBvcy54XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldFBvcy54ID0gc2NlbGwucG9zLnhcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IENvbW1vbi5zYWZlR2V0MkFycmF5VmFsdWUobGlzdCwgdGFyZ2V0UG9zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXQgJiYgdGFyZ2V0LmdldFR5cGUoKSA9PSBjaGVja1R5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0YXJnZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy/moLnmja7lpLnop5LlhYPntKDmib7lh7rkuI7mtojpmaTngrnlr7nop5LlhYPntKAgIFxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgaXNNZXJnZUJvbWIoYm9tYlR5cGUxOiBDZWxsVHlwZSwgYm9tYlR5cGUyOiBDZWxsVHlwZSwgdHlwZTE6IENlbGxUeXBlLCB0eXBlMjogQ2VsbFR5cGUpIHtcbiAgICAgICAgLy90YW5ndGFuZ3Rhbmd0YW5nIDTnp43nu4TlkIhcbiAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICBpZiAodHlwZTEgPT0gYm9tYlR5cGUxICYmIHR5cGUyID09IGJvbWJUeXBlMiB8fFxuICAgICAgICAgICAgdHlwZTEgPT0gYm9tYlR5cGUyICYmIHR5cGUyID09IGJvbWJUeXBlMSB8fFxuICAgICAgICAgICAgKCh0eXBlMSA9PSBib21iVHlwZTEgJiYgdHlwZTIgPT0gYm9tYlR5cGUxKSAmJlxuICAgICAgICAgICAgICAgICh0eXBlMSA9PSBib21iVHlwZTIgJiYgdHlwZTIgPT0gYm9tYlR5cGUyKSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXN1bHQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgc3RhdGljIHJhbmRvbUdldE9uZUNlbGwoKTogY2MuVmVjMiB7XG4gICAgICAgIGNvbnN0IHkgPSBVdGlsLlRvb2wucmFuZ2VJbnQoMCwgR2FtZU1vZGVsLkdyaWRTaXplLkgsIGZhbHNlKTtcbiAgICAgICAgY29uc3QgeCA9IFV0aWwuVG9vbC5yYW5nZUludCgwLCBHYW1lTW9kZWwuR3JpZFNpemUuVywgZmFsc2UpO1xuICAgICAgICBjb25zdCBjZWxsID0gdGhpcy5zYWZlR2V0MkFycmF5VmFsdWUoR2FtZU1vZGVsLmlucy5DZWxsTGlzdCwgY2MudjIoeCwgeSkpO1xuICAgICAgICBpZiAoIWNlbGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJhbmRvbUdldE9uZUNlbGwoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2VsbC5wb3M7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6K6+572u5LiA5Liqc3ByaXRl55qE54Gw6Imy54q25oCBXG4gICAgICogQHBhcmFtIG9wdCBcbiAgICAgKiBAcGFyYW0gbm9kZSBcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHN3aXRjaEdyYXkob3B0OiBib29sZWFuLCBub2RlOiBjYy5Ob2RlKSB7XG4gICAgICAgIC8vIGlmIChjYy5nYW1lLnJlbmRlclR5cGUgPT09IGNjLmdhbWUuUkVOREVSX1RZUEVfQ0FOVkFTKSB7XG4gICAgICAgIC8vICAgICByZXR1cm47XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gaWYgKG5vZGVbJ2lzR3JheSddICYmIG9wdCB8fCAhbm9kZVsnaXNHcmF5J10gJiYgIW9wdCkge1xuICAgICAgICAvLyAgICAgcmV0dXJuO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vIGxldCBtYXRlcmlhbDtcbiAgICAgICAgLy8gbGV0IHRtcE1hdGVyaWFsOiBhbnkgPSBjYy5NYXRlcmlhbDtcbiAgICAgICAgLy8gbGV0IHNwcml0ZSA9IG5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICAgIC8vIGlmIChvcHQpIHtcbiAgICAgICAgLy8gICAgIG1hdGVyaWFsID0gdG1wTWF0ZXJpYWwuZ2V0SW5zdGFudGlhdGVkTWF0ZXJpYWwodG1wTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKCcyZC1ncmF5LXNwcml0ZScpLCBzcHJpdGUpO1xuICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAvLyAgICAgbWF0ZXJpYWwgPSB0bXBNYXRlcmlhbC5nZXRJbnN0YW50aWF0ZWRNYXRlcmlhbCh0bXBNYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoJzJkLXNwcml0ZScsIHNwcml0ZSksIHNwcml0ZSk7XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gbm9kZVsnaXNHcmF5J10gPSBvcHQ7XG4gICAgICAgIC8vIHNwcml0ZS5zZXRNYXRlcmlhbCgwLCBtYXRlcmlhbCk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGVTcHJpdGUoa2V5OiBOb2RlUG9vbEtleSwgZnJhbWU6IGNjLlNwcml0ZUZyYW1lLCBwYXJlbnQ6IGNjLk5vZGUgPSBudWxsKTogY2MuU3ByaXRlIHtcbiAgICAgICAgbGV0IG5vZGUgPSBOb2RlUG9vbE1nci5pbnMuZ2V0SXRlbShrZXksIG51bGwpO1xuICAgICAgICBjb25zdCBzcHJpdGUgPSBub2RlLmFkZENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICBzcHJpdGUuc3ByaXRlRnJhbWUgPSBmcmFtZTtcbiAgICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNwcml0ZVxuICAgIH1cblxuXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGVFZmZQcmVmYWIocGFyZW50OiBjYy5Ob2RlLCBrZXk6IE5vZGVQb29sS2V5LCBwcmVmYWI6IGNjLlByZWZhYiwgcG9zOiBjYy5WZWMyIHwgY2MuVmVjMyA9IG51bGwpOiB7IG5vZGU6IGNjLk5vZGUsIGN0cmw6IGNjLkFuaW1hdGlvbiB9IHtcbiAgICAgICAgbGV0IG5vZGUgPSBudWxsO1xuICAgICAgICBpZiAoa2V5KSB7XG4gICAgICAgICAgICBub2RlID0gTS5ub2RlUG9vbC5nZXRJdGVtKGtleSwgcHJlZmFiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5vZGUgPSBNLm5vZGVQb29sLmNyZWF0ZUl0ZW0ocHJlZmFiKTtcbiAgICAgICAgfVxuICAgICAgICBub2RlLnBhcmVudCA9IHBhcmVudDtcbiAgICAgICAgcG9zICYmIG5vZGUuc2V0UG9zaXRpb24ocG9zKTtcbiAgICAgICAgY29uc3QgY3RybCA9IG5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XG4gICAgICAgIHJldHVybiB7IG5vZGUsIGN0cmwgfTtcbiAgICB9XG5cblxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlU3BpbmVOb2RlKHBhcmVudDogY2MuTm9kZSwgcHJlZmFiOiBjYy5QcmVmYWIsIGtleT86IE5vZGVQb29sS2V5LCBwb3M6IGNjLlZlYzIgfCBjYy5WZWMzID0gbnVsbCk6IHsgbm9kZTogY2MuTm9kZSwgY3RybDogU3BpbmVQbGF5ZXJDdHJsIH0ge1xuICAgICAgICBsZXQgbm9kZSA9IG51bGw7XG4gICAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgICAgIG5vZGUgPSBOb2RlUG9vbE1nci5pbnMuZ2V0SXRlbShrZXksIHByZWZhYik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBub2RlID0gTm9kZVBvb2xNZ3IuaW5zLmNyZWF0ZUl0ZW0ocHJlZmFiKTtcbiAgICAgICAgfVxuICAgICAgICBub2RlLnBhcmVudCA9IHBhcmVudDtcbiAgICAgICAgcG9zICYmIG5vZGUuc2V0UG9zaXRpb24ocG9zKTtcbiAgICAgICAgY29uc3QgY3RybCA9IG5vZGUuZ2V0Q29tcG9uZW50KFNwaW5lUGxheWVyQ3RybCk7XG4gICAgICAgIHJldHVybiB7IG5vZGUsIGN0cmwgfTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGlzQm9tYlR5cGUodHlwZTogQ2VsbFR5cGUpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHR5cGUgPj0gQ2VsbFR5cGUuQm9tYjEgJiYgdHlwZSA8IENlbGxUeXBlLkJvbWIxMDA7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBwYXJzZVJhbmtEYXRhKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHsgc2NvcmU6IHZhbHVlICYgMGIxMTExMTExMTExMTExMTExMTExMSwgbGV2ZWw6IHZhbHVlID4+IDIwIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHN0cmluZ2lmeVJhbmtEYXRhKGx2OiBudW1iZXIsIHNvY3JlOiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gKGx2IDw8IDIwKSB8IHNvY3JlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgdGVzdEdyb3VuZEJvcmRlckRpc3BsYXkoeDogbnVtYmVyLCB5OiBudW1iZXIsIG1vZGVscywgdHlwZSkge1xuICAgICAgICByZXR1cm4gWyF0aGlzLmdldFN0YXR1c0J5VHlwZSh4LCB5IC0gMSwgbW9kZWxzLCB0eXBlKSxcbiAgICAgICAgIXRoaXMuZ2V0U3RhdHVzQnlUeXBlKHgsIHkgKyAxLCBtb2RlbHMsIHR5cGUpLFxuICAgICAgICAhdGhpcy5nZXRTdGF0dXNCeVR5cGUoeCAtIDEsIHksIG1vZGVscywgdHlwZSksXG4gICAgICAgICF0aGlzLmdldFN0YXR1c0J5VHlwZSh4ICsgMSwgeSwgbW9kZWxzLCB0eXBlKV1cbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldFNwcml0ZU5hbWVCeVR5cGUoeDogbnVtYmVyLCB5OiBudW1iZXIsIG1vZGVsczogYW55LCB0eXBlOiBhbnkpOiBzdHJpbmcge1xuICAgICAgICBsZXQgY29mZiA9ICcnO1xuICAgICAgICBjb2ZmICs9IHRoaXMuZ2V0U3RhdHVzQnlUeXBlKHggLSAxLCB5IC0gMSwgbW9kZWxzLCB0eXBlKTtcbiAgICAgICAgY29mZiArPSB0aGlzLmdldFN0YXR1c0J5VHlwZSh4LCB5IC0gMSwgbW9kZWxzLCB0eXBlKTtcbiAgICAgICAgY29mZiArPSB0aGlzLmdldFN0YXR1c0J5VHlwZSh4IC0gMSwgeSwgbW9kZWxzLCB0eXBlKTtcbiAgICAgICAgY29mZiArPSB0aGlzLmdldFN0YXR1c0J5VHlwZSh4LCB5LCBtb2RlbHMsIHR5cGUpO1xuICAgICAgICByZXR1cm4gY29mZjtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXRpYyBnZXRTdGF0dXNCeVR5cGUoeCwgeSwgbW9kZWxzLCB0eXBlKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IDE7XG4gICAgICAgIGlmICghbW9kZWxzW3ldKSB7XG4gICAgICAgICAgICByZXN1bHQgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKCFtb2RlbHNbeV1beF0pIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAobW9kZWxzW3ldW3hdLmdldFR5cGUoKSAhPSB0eXBlIHx8IG1vZGVsc1t5XVt4XS5pc0RlYXRoKSB7XG4gICAgICAgICAgICByZXN1bHQgPSAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBleGVjRGVsYXlUYXNrKGZ1bjogRnVuY3Rpb24sIGRlbGF5VGltZTogbnVtYmVyKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuLCBkZWxheVRpbWUgKiAxMDAwKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldFN0cmluZ2tleShwb3M6IGNjLlZlYzIpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYCR7cG9zLnh9XyR7cG9zLnl9YFxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0U3BlY2lhbEFkZFNjb3JlQnlUeXBlKHR5cGU6IGFueSk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBTY29yZUNvbmZpZy5TcGVjaWFsW3R5cGVdO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0T2ZmbGluZVRpbWUobGFzdE9mZmxpbmVUaW1lOiBudW1iZXIsIGN1cnJlbnRUaW1lOiBudW1iZXIpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBvZmZsaW5lVGltZSA9IChjdXJyZW50VGltZSAtIGxhc3RPZmZsaW5lVGltZSkgLyAxMDAwIC8gNjBcbiAgICAgICAgaWYgKG9mZmxpbmVUaW1lID4gTWluT2ZmbGluZVRpbWUpIHtcbiAgICAgICAgICAgIHJldHVybiBvZmZsaW5lVGltZVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIDBcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGp1bXBTY2VuZSh0YXJnZXRTY2VuZU5hbWU6IHN0cmluZywgbGFudWNoZWROZXh0PywgZGVsYXlUaW1lOiBudW1iZXIgPSAwKSB7XG4gICAgICAgIGlmICh0YXJnZXRTY2VuZU5hbWUgIT09IHRoaXMuY3VyU2NlbmUpIHtcbiAgICAgICAgICAgIHRoaXMucHJlU2NlbmUgPSB0aGlzLmN1clNjZW5lO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3VyU2NlbmUgPSB0YXJnZXRTY2VuZU5hbWU7XG4gICAgICAgIGxldCB0aW1lID0gZGVsYXlUaW1lICogMTAwMDtcbiAgICAgICAgaWYgKHRpbWUgPiAwKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUodGFyZ2V0U2NlbmVOYW1lLCBsYW51Y2hlZE5leHQpO1xuICAgICAgICAgICAgfSwgdGltZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUodGFyZ2V0U2NlbmVOYW1lLCBsYW51Y2hlZE5leHQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIOWNleS9jei9rOaNoiAqL1xuICAgIHN0YXRpYyBieXRlc1RvU2l6ZShieXRlczogbnVtYmVyLCBpc0Jsb29kOiBib29sZWFuID0gZmFsc2UpOiBzdHJpbmcge1xuICAgICAgICBpZiAoYnl0ZXMgPCAxMDAwMCkge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoYnl0ZXMpLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGJ5dGVzID09PSAwKSByZXR1cm4gJzAnO1xuICAgICAgICBsZXQgayA9IDEwMDAsIC8vIG9yIDEwMjRcbiAgICAgICAgICAgIHNpemVzID0gWycnLCAnSycsICdNJywgJ0cnLCAnVCcsICdQJywgJ0UnLCAnWicsICdZJywgJ2FhJywgJ2JiJywgJ2NjJywgJ2RkJywgJ2VlJywgJ2ZmJywgJ2dnJywgJ2hoJywgJ2lpJywgJ2pqJywgJ2trJywgJ21tJywgJ25uJywgJ3BwJywgJ3FxJywgJ3JyJywgJ3NzJywgJ3R0JywgJ3V1JywgJ3Z2JywgJ3d3JywgJ3h4JywgJ3p6J10sXG4gICAgICAgICAgICBpID0gTWF0aC5mbG9vcihNYXRoLmxvZyhieXRlcykgLyBNYXRoLmxvZyhrKSk7XG4gICAgICAgIGxldCB1bml0ID0gJyc7XG4gICAgICAgIGlmIChpIDwgc2l6ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB1bml0ID0gc2l6ZXNbaV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBudW1MZW5naHQgPSBpIC0gc2l6ZXMubGVuZ3RoO1xuICAgICAgICAgICAgdW5pdCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoOTcgKyBudW1MZW5naHQgJSAyNik7XG4gICAgICAgICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgMSArIE1hdGguZmxvb3IobnVtTGVuZ2h0IC8gNjUpOyBpbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgdW5pdCA9IHVuaXQgKyB1bml0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChpc0Jsb29kKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5hYnMocGFyc2VJbnQoKGJ5dGVzIC8gTWF0aC5wb3coaywgaSkpLnRvUHJlY2lzaW9uKDMpKSkgKyB1bml0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIChieXRlcyAvIE1hdGgucG93KGssIGkpKS50b1ByZWNpc2lvbigzKSArICcnICsgdW5pdDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0Q3VycmVuY3lOYW1lKHR5cGU6IEN1cnJlbmN5SWQpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gWyfph5HluIEnLCAn6ZK755+zJywgJ+iDvemHjyddW3R5cGVdO1xuICAgIH1cblxuICAgIC8qKue7hOWQiOWlluWKseS/oeaBryAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0UmV3YXJkQXJyYXkocmV3YXJkRGF0YTogYW55KSB7XG4gICAgICAgIGNvbnN0IGFycjogQXJyYXk8eyB0eXBlOiBOdW1iZXIsIGNvdW50OiBudW1iZXIgfT4gPSBbXTtcbiAgICAgICAgaWYgKHJld2FyZERhdGEpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiByZXdhcmREYXRhKSB7XG4gICAgICAgICAgICAgICAgaWYgKGtleSA9PSAnYm94Jykge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBib3hLZXkgaW4gcmV3YXJkRGF0YVtrZXldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2ID0gcmV3YXJkRGF0YVtrZXldW2JveEtleV07XG4gICAgICAgICAgICAgICAgICAgICAgICBhcnIucHVzaCh7IHR5cGU6IE51bWJlcihib3hLZXkpLCBjb3VudDogdiB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGFyci5wdXNoKHsgdHlwZTogTnVtYmVyKGtleSksIGNvdW50OiByZXdhcmREYXRhW2tleV0gfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcnI7XG4gICAgfVxufVxuXG53aW5kb3dbXCJDb21tb25cIl0gPSBDb21tb247Il19