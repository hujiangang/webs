
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Base/Manager/Plaform/IPlatform.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5ba8cILAa5BPqClnVmR5kPS', 'IPlatform');
// Script/Base/Manager/Plaform/IPlatform.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Options = void 0;
var Options = /** @class */ (function () {
    function Options() {
    }
    return Options;
}());
exports.Options = Options;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCYXNlXFxNYW5hZ2VyXFxQbGFmb3JtXFxJUGxhdGZvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7SUFBQTtJQUlBLENBQUM7SUFBRCxjQUFDO0FBQUQsQ0FKQSxBQUlDLElBQUE7QUFKWSwwQkFBTyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElVc2VySW5mbywgUGxhdGZvcm1UeXBlIH0gZnJvbSBcIi4uLy4uL0Jhc2VDb25zdFwiO1xuXG5leHBvcnQgY2xhc3MgT3B0aW9ucyB7XG4gICAgcHVibGljIGFwcElkOiBzdHJpbmc7XG4gICAgcHVibGljIHRva2VuPzogc3RyaW5nO1xuICAgIHB1YmxpYyBhZElkcz86IHsgQmFubmVyOiBzdHJpbmcsIEludGVyc3RpdGlhbDogc3RyaW5nLCBWaWRlbzogc3RyaW5nIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGludGVyZmFjZSBJUGxhdGZvcm0ge1xuXG4gICAgdHlwZTogUGxhdGZvcm1UeXBlO1xuXG4gICAgaW5pdChvOiBPcHRpb25zKTtcblxuICAgIC8qKiDpgIDlh7rlsI/muLjmiI8gKi9cbiAgICBleGl0KCk6IHZvaWRcblxuICAgIC8qKiDmjojmnYPmjqXlj6MgKi9cbiAgICBhdXRob3JpemUoKTogUHJvbWlzZTxhbnk+XG5cbiAgICAvKirlubPlj7DnmoTnmbvlvZXmjqXlj6MgKi9cbiAgICBsb2dpbigpOiBQcm9taXNlPHsgY29kZTogc3RyaW5nIH0+XG5cbiAgICAvKirojrflj5blvZPliY3nmoTlubPlj7Dns7vnu5/kv6Hmga8gKi9cbiAgICBnZXRTeXN0ZW1JbmZvU3luYygpOiBhbnlcblxuICAgIC8qKuiOt+WPluWPs+S4iuinkuiDtuWbiuS9jee9riAqL1xuICAgIGdldE1lbnVCdXR0b25Cb3VuZGluZ0NsaWVudFJlY3QoKTogY2MuUmVjdDtcblxuICAgIC8qKuiOt+WPluWImOa1t+S9jee9riAqL1xuICAgIGdldFRvcEJhbmdQb3NpdGlvbigpOiBudW1iZXI7XG5cbiAgICAvKiog5rOo5YaM6L+b5YWl55WM6Z2i55uR5ZCsICovXG4gICAgb25TaG93KCk6IHZvaWRcblxuICAgIC8qKiDms6jlhoznm5HlkKzlsI/muLjmiI/pmpDol4/liLDlkI7lj7Dkuovku7bjgILplIHlsY/jgIHmjIkgSE9NRSDplK7pgIDliLDmoYzpnaLjgIHmmL7npLrlnKjogYrlpKnpobbpg6jnrYnmk43kvZzkvJrop6blj5HmraTkuovku7YgKi9cbiAgICBvbkhpZGUoKTogdm9pZFxuXG4gICAgLyoq5rOo5YaM572R57uc5Y+Y5YyW5LqL5Lu2ICovXG4gICAgb25OZXR3b3JrU3RhdHVzQ2hhbmdlKCk6IHZvaWRcblxuICAgIC8qKuiOt+WPluW5s+WPsOS4iueahOeUqOaIt+S/oeaBryAqL1xuICAgIGdldFVzZXJJbmZvKCk6IFByb21pc2U8SVVzZXJJbmZvPlxuXG4gICAgLyoq5Yib5bu65o6I5p2D5oyJ6ZKuICovXG4gICAgY3JlYXRlQXV0aEJ1dHRvbihib3g6IHsgeDogbnVtYmVyLCB5OiBudW1iZXIsIHc6IG51bWJlciwgaDogbnVtYmVyIH0pOiBQcm9taXNlPElVc2VySW5mbz47XG5cbiAgICAvKirojrflj5blvZPliY3lubPlj7DniYjmnKwgKi9cbiAgICBnZXRQbGF0ZnJvbVZlcnNpb24oKTogc3RyaW5nO1xuXG4gICAgLyoq6I635Y+W5paH5Lu25pON5L2c5Y+l5p+EICovXG4gICAgZ2V0RmlsZVN5c3RlbU1ncigpOiBhbnk7XG5cbiAgICAvKirkuIvovb3mlofku7YgKi9cbiAgICBkb3duTG9hZEZpbGUoZGF0YTogeyB1cmw6IHN0cmluZywgZmlsZVBhdGg6IHN0cmluZyB9KTogUHJvbWlzZTxhbnk+O1xuXG4gICAgLyoq6I635Y+W572R57ucL+acrOWcsOWbvueJhyAqL1xuICAgIGxvYWRSZW1vdFBpY3R1cmUodXJsOiBzdHJpbmcsIHR5cGU/OiBzdHJpbmcpOiBQcm9taXNlPGNjLlNwcml0ZUZyYW1lPjtcblxuICAgIC8qKiDnn63mjK/liqggKi9cbiAgICB2aWJyYXRlU2hvcnQoKTogdm9pZDtcblxuICAgIC8qKiDplb/mjK/liqggKi9cbiAgICB2aWJyYXRlTG9uZygpOiB2b2lkO1xuXG4gICAgLyoq5YiG5LqrICovXG4gICAgc2hhcmUodGV4dDogc3RyaW5nLCBpbWdVcmw6IHN0cmluZywgbGV2ZWxGYWlsQWRkU3RlcD8gOiBudW1iZXIpOiBQcm9taXNlPGJvb2xlYW4+XG5cbiAgICAvKipCYW5uZXIgKi9cbiAgICBzaG93QmFubmVyKGFkSWQ6IHN0cmluZyk7XG5cbiAgICBoaWRlQmFubmVyKCk7XG5cbiAgICBzaG93SW50ZXJzdGl0aWFsQWQoYWRJZDogc3RyaW5nKTtcblxuICAgIHNob3dWaWRlb0FkKGFkSWQ6IHN0cmluZyk7XG5cbiAgICAvKiog5qOA5rWL5ri45oiP5piv5ZCm5pyJ5paw54mI5pys6ZyA6KaB5pu05pawICovXG4gICAgY2hlY2tVcGRhdGUoKTogdm9pZDtcblxuICAgIC8qKuino+WOi+aWh+S7tiAqL1xuICAgIHVuemlwKHBhdGg6IHN0cmluZyk6IGJvb2xlYW47XG59XG4iXX0=