
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Base/Shader/ShaderHelper.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9d7f37H18xI4qQZLe2GtX08', 'ShaderHelper');
// Script/Base/Shader/ShaderHelper.ts

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
exports.ShaderProperty = void 0;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executeInEditMode = _a.executeInEditMode;
var ShaderProperty = /** @class */ (function () {
    function ShaderProperty() {
        this.key = '';
        this.value = 0.0;
    }
    __decorate([
        property({ readonly: true })
    ], ShaderProperty.prototype, "key", void 0);
    __decorate([
        property(cc.Float)
    ], ShaderProperty.prototype, "value", void 0);
    ShaderProperty = __decorate([
        ccclass('ShaderProperty')
    ], ShaderProperty);
    return ShaderProperty;
}());
exports.ShaderProperty = ShaderProperty;
;
var ShaderEnum = cc.Enum({});
var ShaderHelper = /** @class */ (function (_super) {
    __extends(ShaderHelper, _super);
    function ShaderHelper() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //枚举Shader程序
        _this._program = 0;
        //shader参数
        _this._props = [];
        //材质对象
        _this.material = null;
        return _this;
    }
    ShaderHelper_1 = ShaderHelper;
    Object.defineProperty(ShaderHelper.prototype, "program", {
        get: function () {
            return this._program;
        },
        set: function (value) {
            if (this._program === value) {
                return;
            }
            this._program = value;
            this.applyEffect();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ShaderHelper.prototype, "props", {
        get: function () {
            return this._props;
        },
        set: function (value) {
            this._props = value;
            this.applyEffect();
        },
        enumerable: false,
        configurable: true
    });
    ShaderHelper.prototype.start = function () {
        var _this = this;
        if (CC_EDITOR) {
            setTimeout(function () {
                _this.applyEffect();
            }, 1000);
        }
        else {
            this.applyEffect();
        }
        //this.node.on(cc.Node.EventType.TOUCH_END, this.next, this);
    };
    ShaderHelper.prototype.applyEffect = function () {
        //获取精灵组件
        var sprite = this.node.getComponent(cc.Sprite);
        if (!sprite) {
            return;
        }
        var effectAsset = ShaderHelper_1.effectAssets[this.program];
        //实例化一个材质对象
        var material = cc.Material.create(effectAsset);
        //在材质对象上开启USE_TEXTURE定义
        var defineUserTexture = !!effectAsset.shaders.find(function (shader) { return shader.defines.find(function (def) { return def.name === 'USE_TEXTURE'; }); });
        if (defineUserTexture) {
            material.define('USE_TEXTURE', true);
        }
        //为材质设置effect，也是就绑定Shader了
        // material.effectAsset = effectAsset
        material.name = effectAsset.name;
        //将材质绑定到精灵组件上，精灵可以绑定多个材质
        //这里我们替换0号默认材质
        sprite.setMaterial(0, material);
        //从精灵组件上获取材质，这步很重要，不然没效果
        this.material = sprite.getMaterial(0);
        this.setProperty(effectAsset);
        this.node.emit('effect-changed', this, this.material);
    };
    ShaderHelper.prototype.setProperty = function (effectAsset) {
        var _this = this;
        if (CC_EDITOR && false) {
            var oldProps = this._props;
            this._props = [];
            var keys = Object.keys(effectAsset._effect._properties);
            //@ts-ignore
            var values = Object.values(effectAsset._effect._properties);
            var _loop_1 = function (i) {
                var value = values[i].value;
                var key = keys[i];
                var type = values[i].type;
                if (value !== null && (type === 4 || type === 13)) {
                    var oldItem = oldProps.find(function (item) { return item.key === key; });
                    if (oldItem) {
                        value = oldItem.value;
                    }
                    var sp = new ShaderProperty();
                    sp.key = key;
                    sp.value = typeof (value) === 'object' ? value[0] : value;
                    this_1._props.push(sp);
                }
            };
            var this_1 = this;
            for (var i = 0; i < values.length; i++) {
                _loop_1(i);
            }
            // setTimeout(() => {
            var shaderTimer = this.getComponent('ShaderTime');
            //cc.log(shaderTimer.max);
            if (shaderTimer) {
                shaderTimer.max = shaderTimer.max;
            }
            //}, 1000);
        }
        if (this._props.length) {
            this._props.forEach(function (item) { return item.key && _this.material.setProperty(item.key, item.value || 0); });
        }
        // @ts-ignore
        cc.Class.Attr.setClassAttr(ShaderHelper_1, 'props', 'visible', !!this._props.length);
    };
    ShaderHelper.prototype.next = function () {
        this.program = (this.program + 1) % ShaderHelper_1.effectAssets.length;
    };
    ShaderHelper.prototype.prev = function () {
        if (this.program === 0) {
            this.program = ShaderHelper_1.effectAssets.length - 1;
            return;
        }
        this.program = (this.program - 1) % ShaderHelper_1.effectAssets.length;
    };
    var ShaderHelper_1;
    //effect的数组
    ShaderHelper.effectAssets = null;
    __decorate([
        property
    ], ShaderHelper.prototype, "_program", void 0);
    __decorate([
        property({ type: ShaderEnum })
    ], ShaderHelper.prototype, "program", null);
    __decorate([
        property({ type: [ShaderProperty] })
    ], ShaderHelper.prototype, "_props", void 0);
    __decorate([
        property({ type: [ShaderProperty] })
    ], ShaderHelper.prototype, "props", null);
    ShaderHelper = ShaderHelper_1 = __decorate([
        ccclass,
        executeInEditMode
    ], ShaderHelper);
    return ShaderHelper;
}(cc.Component));
exports.default = ShaderHelper;
cc.game.on(cc.game.EVENT_ENGINE_INITED, function () {
    cc.dynamicAtlasManager.enabled = false;
    cc.loader.loadResDir('effect', cc.EffectAsset, function (error, res) {
        ShaderHelper.effectAssets = res;
        var array = ShaderHelper.effectAssets.map(function (item, i) {
            return { name: item._name, value: i };
        });
        //@ts-ignore
        cc.Class.Attr.setClassAttr(ShaderHelper, 'program', 'enumList', array);
    });
});

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCYXNlXFxTaGFkZXJcXFNoYWRlckhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQU0sSUFBQSxLQUEyQyxFQUFFLENBQUMsVUFBVSxFQUF0RCxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQUEsRUFBRSxpQkFBaUIsdUJBQWtCLENBQUM7QUFHL0Q7SUFBQTtRQUVJLFFBQUcsR0FBRyxFQUFFLENBQUM7UUFHVCxVQUFLLEdBQUcsR0FBRyxDQUFDO0lBQ2hCLENBQUM7SUFKRztRQURDLFFBQVEsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzsrQ0FDcEI7SUFHVDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2lEQUNQO0lBTEgsY0FBYztRQUQxQixPQUFPLENBQUMsZ0JBQWdCLENBQUM7T0FDYixjQUFjLENBTTFCO0lBQUQscUJBQUM7Q0FORCxBQU1DLElBQUE7QUFOWSx3Q0FBYztBQU0xQixDQUFDO0FBRUYsSUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUkvQjtJQUEwQyxnQ0FBWTtJQUF0RDtRQUFBLHFFQXFJQztRQW5JRyxZQUFZO1FBRVosY0FBUSxHQUFHLENBQUMsQ0FBQztRQWFiLFVBQVU7UUFFVixZQUFNLEdBQXFCLEVBQUUsQ0FBQztRQVk5QixNQUFNO1FBQ04sY0FBUSxHQUFnQixJQUFJLENBQUM7O0lBcUdqQyxDQUFDO3FCQXJJb0IsWUFBWTtJQU03QixzQkFBSSxpQ0FBTzthQUFYO1lBQ0ksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3pCLENBQUM7YUFDRCxVQUFZLEtBQUs7WUFDYixJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssS0FBSyxFQUFFO2dCQUN6QixPQUFPO2FBQ1Y7WUFDRCxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUN0QixJ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Q0FxSWhDO0lBQUQsbUJBQUM7Q0FySUQsQUFxSUMsQ0FySXlDLEVBQUUsQ0FBQyxTQUFTLEdBcUlyRDtrQkFySW9CLFlBQVk7QUF1SWpDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUU7SUFDcEMsRUFBRSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDdkMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxXQUFXLEVBQUUsVUFBQyxLQUFLLEVBQUUsR0FBRztRQUN0RCxZQUFZLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztRQUNoQyxJQUFJLEtBQUssR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQUksRUFBRSxDQUFDO1lBQzlDLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFDMUMsQ0FBQyxDQUFDLENBQUM7UUFFSCxZQUFZO1FBQ1osRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzNFLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5LCBleGVjdXRlSW5FZGl0TW9kZSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3MoJ1NoYWRlclByb3BlcnR5JylcbmV4cG9ydCBjbGFzcyBTaGFkZXJQcm9wZXJ0eSB7XG4gICAgQHByb3BlcnR5KHsgcmVhZG9ubHk6IHRydWUgfSlcbiAgICBrZXkgPSAnJztcblxuICAgIEBwcm9wZXJ0eShjYy5GbG9hdClcbiAgICB2YWx1ZSA9IDAuMDtcbn07XG5cbmNvbnN0IFNoYWRlckVudW0gPSBjYy5FbnVtKHt9KTtcblxuQGNjY2xhc3NcbkBleGVjdXRlSW5FZGl0TW9kZVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hhZGVySGVscGVyIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIC8v5p6a5Li+U2hhZGVy56iL5bqPXG4gICAgQHByb3BlcnR5XG4gICAgX3Byb2dyYW0gPSAwO1xuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IFNoYWRlckVudW0gfSlcbiAgICBnZXQgcHJvZ3JhbSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb2dyYW07XG4gICAgfVxuICAgIHNldCBwcm9ncmFtKHZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLl9wcm9ncmFtID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3Byb2dyYW0gPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5hcHBseUVmZmVjdCgpO1xuICAgIH1cblxuICAgIC8vc2hhZGVy5Y+C5pWwXG4gICAgQHByb3BlcnR5KHsgdHlwZTogW1NoYWRlclByb3BlcnR5XSB9KVxuICAgIF9wcm9wczogU2hhZGVyUHJvcGVydHlbXSA9IFtdO1xuXG4gICAgQHByb3BlcnR5KHsgdHlwZTogW1NoYWRlclByb3BlcnR5XSB9KVxuICAgIGdldCBwcm9wcygpOiBTaGFkZXJQcm9wZXJ0eVtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb3BzO1xuICAgIH1cblxuICAgIHNldCBwcm9wcyh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9wcm9wcyA9IHZhbHVlO1xuICAgICAgICB0aGlzLmFwcGx5RWZmZWN0KCk7XG4gICAgfVxuXG4gICAgLy/mnZDotKjlr7nosaFcbiAgICBtYXRlcmlhbDogY2MuTWF0ZXJpYWwgPSBudWxsO1xuXG4gICAgLy9lZmZlY3TnmoTmlbDnu4RcbiAgICBzdGF0aWMgZWZmZWN0QXNzZXRzOiBhbnlbXSA9IG51bGw7XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgaWYgKENDX0VESVRPUikge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHBseUVmZmVjdCgpO1xuICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFwcGx5RWZmZWN0KCk7XG4gICAgICAgIH1cbiAgICAgICAgLy90aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm5leHQsIHRoaXMpO1xuICAgIH1cblxuICAgIGFwcGx5RWZmZWN0KCkge1xuXG4gICAgICAgIC8v6I635Y+W57K+54G157uE5Lu2XG4gICAgICAgIGxldCBzcHJpdGUgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICAgIGlmICghc3ByaXRlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZWZmZWN0QXNzZXQgPSBTaGFkZXJIZWxwZXIuZWZmZWN0QXNzZXRzW3RoaXMucHJvZ3JhbV07XG4gICAgICAgIC8v5a6e5L6L5YyW5LiA5Liq5p2Q6LSo5a+56LGhXG4gICAgICAgIGxldCBtYXRlcmlhbCA9IGNjLk1hdGVyaWFsLmNyZWF0ZShlZmZlY3RBc3NldCk7XG5cbiAgICAgICAgLy/lnKjmnZDotKjlr7nosaHkuIrlvIDlkK9VU0VfVEVYVFVSReWumuS5iVxuICAgICAgICBsZXQgZGVmaW5lVXNlclRleHR1cmUgPSAhIWVmZmVjdEFzc2V0LnNoYWRlcnMuZmluZChzaGFkZXIgPT4gc2hhZGVyLmRlZmluZXMuZmluZChkZWYgPT4gZGVmLm5hbWUgPT09ICdVU0VfVEVYVFVSRScpKTtcbiAgICAgICAgaWYgKGRlZmluZVVzZXJUZXh0dXJlKSB7XG4gICAgICAgICAgICBtYXRlcmlhbC5kZWZpbmUoJ1VTRV9URVhUVVJFJywgdHJ1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvL+S4uuadkOi0qOiuvue9rmVmZmVjdO+8jOS5n+aYr+Wwsee7keWumlNoYWRlcuS6hlxuICAgICAgICAvLyBtYXRlcmlhbC5lZmZlY3RBc3NldCA9IGVmZmVjdEFzc2V0XG4gICAgICAgIG1hdGVyaWFsLm5hbWUgPSBlZmZlY3RBc3NldC5uYW1lO1xuXG4gICAgICAgIC8v5bCG5p2Q6LSo57uR5a6a5Yiw57K+54G157uE5Lu25LiK77yM57K+54G15Y+v5Lul57uR5a6a5aSa5Liq5p2Q6LSoXG4gICAgICAgIC8v6L+Z6YeM5oiR5Lus5pu/5o2iMOWPt+m7mOiupOadkOi0qFxuICAgICAgICBzcHJpdGUuc2V0TWF0ZXJpYWwoMCwgbWF0ZXJpYWwpO1xuXG4gICAgICAgIC8v5LuO57K+54G157uE5Lu25LiK6I635Y+W5p2Q6LSo77yM6L+Z5q2l5b6I6YeN6KaB77yM5LiN54S25rKh5pWI5p6cXG4gICAgICAgIHRoaXMubWF0ZXJpYWwgPSBzcHJpdGUuZ2V0TWF0ZXJpYWwoMCk7XG4gICAgICAgIHRoaXMuc2V0UHJvcGVydHkoZWZmZWN0QXNzZXQpO1xuICAgICAgICB0aGlzLm5vZGUuZW1pdCgnZWZmZWN0LWNoYW5nZWQnLCB0aGlzLCB0aGlzLm1hdGVyaWFsKTtcbiAgICB9XG5cbiAgICBzZXRQcm9wZXJ0eShlZmZlY3RBc3NldCkge1xuICAgICAgICBpZiAoQ0NfRURJVE9SICYmIGZhbHNlKSB7XG4gICAgICAgICAgICBsZXQgb2xkUHJvcHMgPSB0aGlzLl9wcm9wcztcbiAgICAgICAgICAgIHRoaXMuX3Byb3BzID0gW107XG5cbiAgICAgICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXMoZWZmZWN0QXNzZXQuX2VmZmVjdC5fcHJvcGVydGllcyk7XG4gICAgICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgICAgIGxldCB2YWx1ZXM6IGFueSA9IE9iamVjdC52YWx1ZXMoZWZmZWN0QXNzZXQuX2VmZmVjdC5fcHJvcGVydGllcyk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlOiBudW1iZXIgPSB2YWx1ZXNbaV0udmFsdWU7XG4gICAgICAgICAgICAgICAgbGV0IGtleSA9IGtleXNbaV07XG4gICAgICAgICAgICAgICAgbGV0IHR5cGUgPSB2YWx1ZXNbaV0udHlwZTtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgKHR5cGUgPT09IDQgfHwgdHlwZSA9PT0gMTMpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBvbGRJdGVtID0gb2xkUHJvcHMuZmluZChpdGVtID0+IGl0ZW0ua2V5ID09PSBrZXkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAob2xkSXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBvbGRJdGVtLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGxldCBzcCA9IG5ldyBTaGFkZXJQcm9wZXJ0eSgpXG4gICAgICAgICAgICAgICAgICAgIHNwLmtleSA9IGtleTtcbiAgICAgICAgICAgICAgICAgICAgc3AudmFsdWUgPSB0eXBlb2YgKHZhbHVlKSA9PT0gJ29iamVjdCcgPyB2YWx1ZVswXSA6IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wcm9wcy5wdXNoKHNwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHNoYWRlclRpbWVyID0gdGhpcy5nZXRDb21wb25lbnQoJ1NoYWRlclRpbWUnKTtcbiAgICAgICAgICAgIC8vY2MubG9nKHNoYWRlclRpbWVyLm1heCk7XG4gICAgICAgICAgICBpZiAoc2hhZGVyVGltZXIpIHtcbiAgICAgICAgICAgICAgICBzaGFkZXJUaW1lci5tYXggPSBzaGFkZXJUaW1lci5tYXg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL30sIDEwMDApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX3Byb3BzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5fcHJvcHMuZm9yRWFjaChpdGVtID0+IGl0ZW0ua2V5ICYmIHRoaXMubWF0ZXJpYWwuc2V0UHJvcGVydHkoaXRlbS5rZXksIGl0ZW0udmFsdWUgfHwgMCkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgY2MuQ2xhc3MuQXR0ci5zZXRDbGFzc0F0dHIoU2hhZGVySGVscGVyLCAncHJvcHMnLCAndmlzaWJsZScsICEhdGhpcy5fcHJvcHMubGVuZ3RoKTtcbiAgICB9XG5cbiAgICBuZXh0KCkge1xuICAgICAgICB0aGlzLnByb2dyYW0gPSAodGhpcy5wcm9ncmFtICsgMSkgJSBTaGFkZXJIZWxwZXIuZWZmZWN0QXNzZXRzLmxlbmd0aDtcbiAgICB9XG5cbiAgICBwcmV2KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9ncmFtID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnByb2dyYW0gPSBTaGFkZXJIZWxwZXIuZWZmZWN0QXNzZXRzLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcm9ncmFtID0gKHRoaXMucHJvZ3JhbSAtIDEpICUgU2hhZGVySGVscGVyLmVmZmVjdEFzc2V0cy5sZW5ndGg7XG4gICAgfVxuXG59XG5cbmNjLmdhbWUub24oY2MuZ2FtZS5FVkVOVF9FTkdJTkVfSU5JVEVELCAoKSA9PiB7XG4gICAgY2MuZHluYW1pY0F0bGFzTWFuYWdlci5lbmFibGVkID0gZmFsc2U7XG4gICAgY2MubG9hZGVyLmxvYWRSZXNEaXIoJ2VmZmVjdCcsIGNjLkVmZmVjdEFzc2V0LCAoZXJyb3IsIHJlcykgPT4ge1xuICAgICAgICBTaGFkZXJIZWxwZXIuZWZmZWN0QXNzZXRzID0gcmVzO1xuICAgICAgICBsZXQgYXJyYXkgPSBTaGFkZXJIZWxwZXIuZWZmZWN0QXNzZXRzLm1hcCgoaXRlbSwgaSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHsgbmFtZTogaXRlbS5fbmFtZSwgdmFsdWU6IGkgfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgIGNjLkNsYXNzLkF0dHIuc2V0Q2xhc3NBdHRyKFNoYWRlckhlbHBlciwgJ3Byb2dyYW0nLCAnZW51bUxpc3QnLCBhcnJheSk7XG4gICAgfSk7XG59KSJdfQ==