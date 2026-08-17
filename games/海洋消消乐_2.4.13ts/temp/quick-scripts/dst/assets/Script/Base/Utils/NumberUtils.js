
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Base/Utils/NumberUtils.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '218f2uuShVPnqfXZUB+P3dN', 'NumberUtils');
// Script/Base/Utils/NumberUtils.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberUtil = void 0;
var NumberUtil = /** @class */ (function () {
    function NumberUtil() {
    }
    /**
    * 加法运算，避免数据相加小数点后产生多位数和计算精度损失。
    *
    * @param num1加数1 | num2加数2
    */
    NumberUtil.numAdd = function (num1, num2) {
        var baseNum, baseNum1, baseNum2;
        try {
            baseNum1 = num1.toString().split(".")[1].length;
        }
        catch (e) {
            baseNum1 = 0;
        }
        try {
            baseNum2 = num2.toString().split(".")[1].length;
        }
        catch (e) {
            baseNum2 = 0;
        }
        baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
        return Number((num1 * baseNum + num2 * baseNum) / baseNum);
    };
    /**
    * 加法运算，避免数据相减小数点后产生多位数和计算精度损失。
    *
    * @param num1被减数 | num2减数
    */
    NumberUtil.numSub = function (num1, num2) {
        var baseNum, baseNum1, baseNum2;
        var precision; // 精度 
        try {
            baseNum1 = num1.toString().split(".")[1].length;
        }
        catch (e) {
            baseNum1 = 0;
        }
        try {
            baseNum2 = num2.toString().split(".")[1].length;
        }
        catch (e) {
            baseNum2 = 0;
        }
        baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
        precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2;
        return Number(((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision));
    };
    /**
    * 乘法运算，避免数据相乘小数点后产生多位数和计算精度损失。
    *
    * @param num1被乘数 | num2乘数
    */
    NumberUtil.numMulti = function (num1, num2) {
        var baseNum = 0;
        try {
            baseNum += num1.toString().split(".")[1].length;
        }
        catch (e) {
        }
        try {
            baseNum += num2.toString().split(".")[1].length;
        }
        catch (e) {
        }
        return Number(num1.toString().replace(".", "")) * Number(num2.toString().replace(".", "")) / Math.pow(10, baseNum);
    };
    ;
    /**
    * 除法运算，避免数据相除小数点后产生多位数和计算精度损失。
    *
    * @param num1被除数 | num2除数
    */
    NumberUtil.numDiv = function (num1, num2) {
        var baseNum1 = 0, baseNum2 = 0;
        var baseNum3, baseNum4;
        try {
            baseNum1 = num1.toString().split(".")[1].length;
        }
        catch (e) {
            baseNum1 = 0;
        }
        try {
            baseNum2 = num2.toString().split(".")[1].length;
        }
        catch (e) {
            baseNum2 = 0;
        }
        baseNum3 = Number(num1.toString().replace(".", ""));
        baseNum4 = Number(num2.toString().replace(".", ""));
        return (baseNum3 / baseNum4) * Math.pow(10, baseNum2 - baseNum1);
    };
    ;
    return NumberUtil;
}());
exports.NumberUtil = NumberUtil;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCYXNlXFxVdGlsc1xcTnVtYmVyVXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFBQTtJQW9GQSxDQUFDO0lBbkZHOzs7O01BSUU7SUFDWSxpQkFBTSxHQUFwQixVQUFxQixJQUFJLEVBQUUsSUFBSTtRQUMzQixJQUFJLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDO1FBQ2hDLElBQUk7WUFDQSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7U0FDbkQ7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNSLFFBQVEsR0FBRyxDQUFDLENBQUM7U0FDaEI7UUFDRCxJQUFJO1lBQ0EsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1NBQ25EO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDUixRQUFRLEdBQUcsQ0FBQyxDQUFDO1NBQ2hCO1FBQ0QsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDckQsT0FBTyxNQUFNLENBQUMsQ0FBQyxJQUFJLEdBQUcsT0FBTyxHQUFHLElBQUksR0FBRyxPQUFPLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQ7Ozs7TUFJRTtJQUNZLGlCQUFNLEdBQXBCLFVBQXFCLElBQUksRUFBRSxJQUFJO1FBQzNCLElBQUksT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUM7UUFDaEMsSUFBSSxTQUFTLENBQUMsQ0FBQSxNQUFNO1FBQ3BCLElBQUk7WUFDQSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFB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UUFBUSxHQUFHLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLFFBQVEsR0FBRyxRQUFRLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBQUEsQ0FBQztJQUNOLGlCQUFDO0FBQUQsQ0FwRkEsQUFvRkMsSUFBQTtBQXBGWSxnQ0FBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBOdW1iZXJVdGlsIHtcbiAgICAvKiogXG4gICAgKiDliqDms5Xov5DnrpfvvIzpgb/lhY3mlbDmja7nm7jliqDlsI/mlbDngrnlkI7kuqfnlJ/lpJrkvY3mlbDlkozorqHnrpfnsr7luqbmjZ/lpLHjgIIgXG4gICAgKiBcbiAgICAqIEBwYXJhbSBudW0x5Yqg5pWwMSB8IG51bTLliqDmlbAyIFxuICAgICovXG4gICAgcHVibGljIHN0YXRpYyBudW1BZGQobnVtMSwgbnVtMik6IG51bWJlciB7XG4gICAgICAgIHZhciBiYXNlTnVtLCBiYXNlTnVtMSwgYmFzZU51bTI7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBiYXNlTnVtMSA9IG51bTEudG9TdHJpbmcoKS5zcGxpdChcIi5cIilbMV0ubGVuZ3RoO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBiYXNlTnVtMSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGJhc2VOdW0yID0gbnVtMi50b1N0cmluZygpLnNwbGl0KFwiLlwiKVsxXS5sZW5ndGg7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGJhc2VOdW0yID0gMDtcbiAgICAgICAgfVxuICAgICAgICBiYXNlTnVtID0gTWF0aC5wb3coMTAsIE1hdGgubWF4KGJhc2VOdW0xLCBiYXNlTnVtMikpO1xuICAgICAgICByZXR1cm4gTnVtYmVyKChudW0xICogYmFzZU51bSArIG51bTIgKiBiYXNlTnVtKSAvIGJhc2VOdW0pO1xuICAgIH1cblxuICAgIC8qKiBcbiAgICAqIOWKoOazlei/kOeul++8jOmBv+WFjeaVsOaNruebuOWHj+Wwj+aVsOeCueWQjuS6p+eUn+WkmuS9jeaVsOWSjOiuoeeul+eyvuW6puaNn+WkseOAgiBcbiAgICAqIFxuICAgICogQHBhcmFtIG51bTHooqvlh4/mlbAgfCBudW0y5YeP5pWwIFxuICAgICovXG4gICAgcHVibGljIHN0YXRpYyBudW1TdWIobnVtMSwgbnVtMik6IG51bWJlciB7XG4gICAgICAgIHZhciBiYXNlTnVtLCBiYXNlTnVtMSwgYmFzZU51bTI7XG4gICAgICAgIHZhciBwcmVjaXNpb247Ly8g57K+5bqmIFxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYmFzZU51bTEgPSBudW0xLnRvU3RyaW5nKCkuc3BsaXQoXCIuXCIpWzFdLmxlbmd0aDtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgYmFzZU51bTEgPSAwO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBiYXNlTnVtMiA9IG51bTIudG9TdHJpbmcoKS5zcGxpdChcIi5cIilbMV0ubGVuZ3RoO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBiYXNlTnVtMiA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgYmFzZU51bSA9IE1hdGgucG93KDEwLCBNYXRoLm1heChiYXNlTnVtMSwgYmFzZU51bTIpKTtcbiAgICAgICAgcHJlY2lzaW9uID0gKGJhc2VOdW0xID49IGJhc2VOdW0yKSA/IGJhc2VOdW0xIDogYmFzZU51bTI7XG4gICAgICAgIHJldHVybiBOdW1iZXIoKChudW0xICogYmFzZU51bSAtIG51bTIgKiBiYXNlTnVtKSAvIGJhc2VOdW0pLnRvRml4ZWQocHJlY2lzaW9uKSk7XG4gICAgfVxuXG4gICAgLyoqIFxuICAgICog5LmY5rOV6L+Q566X77yM6YG/5YWN5pWw5o2u55u45LmY5bCP5pWw54K55ZCO5Lqn55Sf5aSa5L2N5pWw5ZKM6K6h566X57K+5bqm5o2f5aSx44CCIFxuICAgICogXG4gICAgKiBAcGFyYW0gbnVtMeiiq+S5mOaVsCB8IG51bTLkuZjmlbAgXG4gICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIG51bU11bHRpKG51bTEsIG51bTIpOiBudW1iZXIge1xuICAgICAgICB2YXIgYmFzZU51bSA9IDA7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBiYXNlTnVtICs9IG51bTEudG9TdHJpbmcoKS5zcGxpdChcIi5cIilbMV0ubGVuZ3RoO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGJhc2VOdW0gKz0gbnVtMi50b1N0cmluZygpLnNwbGl0KFwiLlwiKVsxXS5sZW5ndGg7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gTnVtYmVyKG51bTEudG9TdHJpbmcoKS5yZXBsYWNlKFwiLlwiLCBcIlwiKSkgKiBOdW1iZXIobnVtMi50b1N0cmluZygpLnJlcGxhY2UoXCIuXCIsIFwiXCIpKSAvIE1hdGgucG93KDEwLCBiYXNlTnVtKTtcbiAgICB9O1xuICAgIC8qKiBcbiAgICAqIOmZpOazlei/kOeul++8jOmBv+WFjeaVsOaNruebuOmZpOWwj+aVsOeCueWQjuS6p+eUn+WkmuS9jeaVsOWSjOiuoeeul+eyvuW6puaNn+WkseOAgiBcbiAgICAqIFxuICAgICogQHBhcmFtIG51bTHooqvpmaTmlbAgfCBudW0y6Zmk5pWwIFxuICAgICovXG4gICAgcHVibGljIHN0YXRpYyBudW1EaXYobnVtMSwgbnVtMik6IG51bWJlciB7XG4gICAgICAgIHZhciBiYXNlTnVtMSA9IDAsIGJhc2VOdW0yID0gMDtcbiAgICAgICAgdmFyIGJhc2VOdW0zLCBiYXNlTnVtNDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGJhc2VOdW0xID0gbnVtMS50b1N0cmluZygpLnNwbGl0KFwiLlwiKVsxXS5sZW5ndGg7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGJhc2VOdW0xID0gMDtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgYmFzZU51bTIgPSBudW0yLnRvU3RyaW5nKCkuc3BsaXQoXCIuXCIpWzFdLmxlbmd0aDtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgYmFzZU51bTIgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGJhc2VOdW0zID0gTnVtYmVyKG51bTEudG9TdHJpbmcoKS5yZXBsYWNlKFwiLlwiLCBcIlwiKSk7XG4gICAgICAgIGJhc2VOdW00ID0gTnVtYmVyKG51bTIudG9TdHJpbmcoKS5yZXBsYWNlKFwiLlwiLCBcIlwiKSk7XG4gICAgICAgIHJldHVybiAoYmFzZU51bTMgLyBiYXNlTnVtNCkgKiBNYXRoLnBvdygxMCwgYmFzZU51bTIgLSBiYXNlTnVtMSk7XG4gICAgfTtcbn0iXX0=