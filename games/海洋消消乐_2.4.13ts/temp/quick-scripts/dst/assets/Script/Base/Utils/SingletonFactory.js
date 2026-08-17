
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Base/Utils/SingletonFactory.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCYXNlXFxVdGlsc1xcU2luZ2xldG9uRmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTs7R0FFRztBQUNIO0lBQUE7SUFZQSxDQUFDO0lBUmlCLDRCQUFXLEdBQXpCLFVBQTZCLENBQWU7UUFDeEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDcEMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNsQixnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUN2QyxPQUFPLEdBQUcsQ0FBQztTQUNkO1FBQ0QsT0FBVSxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFUYywwQkFBUyxHQUEyQixJQUFJLEdBQUcsRUFBcUIsQ0FBQztJQVVwRix1QkFBQztDQVpELEFBWUMsSUFBQTtBQVpZLDRDQUFnQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxuLyoqXG4gKiDljZXkvovlt6XljoJcbiAqL1xuZXhwb3J0IGNsYXNzIFNpbmdsZXRvbkZhY3Rvcnkge1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2VzOiBNYXA8eyBuZXcoKSB9LCBPYmplY3Q+ID0gbmV3IE1hcDx7IG5ldygpIH0sIE9iamVjdD4oKTtcblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2U8VD4oYzogeyBuZXcoKTogVCB9KTogVCB7XG4gICAgICAgIGlmICghU2luZ2xldG9uRmFjdG9yeS5pbnN0YW5jZXMuaGFzKGMpKSB7XG4gICAgICAgICAgICBsZXQgb2JqID0gbmV3IGMoKTtcbiAgICAgICAgICAgIFNpbmdsZXRvbkZhY3RvcnkuaW5zdGFuY2VzLnNldChjLCBvYmopO1xuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gPFQ+U2luZ2xldG9uRmFjdG9yeS5pbnN0YW5jZXMuZ2V0KGMpO1xuICAgIH1cbn0iXX0=