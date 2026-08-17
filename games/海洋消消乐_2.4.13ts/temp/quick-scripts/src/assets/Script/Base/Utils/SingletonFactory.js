"use strict";
cc._RF.push(module, 'f2ab1LSQVlPKZsVS0JD8Bn6', 'SingletonFactory');
// Script/Base/Utils/SingletonFactory.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingletonFactory = void 0;
/**
 * 单例工厂
 */
var SingletonFactory = /** @class */ (function () {
    function SingletonFactory() {
    }
    SingletonFactory.getInstance = function (c) {
        if (!SingletonFactory.instances.has(c)) {
            var obj = new c();
            SingletonFactory.instances.set(c, obj);
            return obj;
        }
        return SingletonFactory.instances.get(c);
    };
    SingletonFactory.instances = new Map();
    return SingletonFactory;
}());
exports.SingletonFactory = SingletonFactory;

cc._RF.pop();