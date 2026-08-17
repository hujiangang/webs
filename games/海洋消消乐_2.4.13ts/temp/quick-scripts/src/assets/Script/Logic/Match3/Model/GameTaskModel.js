"use strict";
cc._RF.push(module, '33e53A8Jo5EH6QH0Y1KoCBY', 'GameTaskModel');
// Script/Logic/Match3/Model/GameTaskModel.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameTaskModel = void 0;
var GameTaskModel = /** @class */ (function () {
    function GameTaskModel() {
        this.type = 0;
        this.action = null;
        this.model1 = null;
        this.model2 = null;
        this.size = 0;
        /**额外附加的数据 */
        this.extData = 0;
        /**待销毁的集合 */
        this.closeAry = null;
        this.cp1 = null;
        this.cp2 = null;
        this.keepTime = 0;
        this.isNeedShowEff = true;
        this.init();
    }
    GameTaskModel.prototype.destory = function () {
        this.init();
    };
    GameTaskModel.prototype.init = function () {
        this.type = 0;
        this.action = null;
        this.model1 = null;
        this.model2 = null;
        this.size = 0;
        this.extData = 0;
        this.closeAry = null;
        this.cp1 = null;
        this.cp2 = null;
        this.keepTime = 0;
    };
    return GameTaskModel;
}());
exports.GameTaskModel = GameTaskModel;

cc._RF.pop();