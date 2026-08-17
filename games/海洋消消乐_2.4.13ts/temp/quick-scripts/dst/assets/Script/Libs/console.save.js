
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Libs/console.save.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0439296jzBBe4ZEufwWAxRe', 'console.save');
// Script/Libs/console.save.js

"use strict";

(function (console) {
  console.save = function (data, filename) {
    if (!data) {
      console.error('Console.save: No data');
      return;
    }
    if (!filename) filename = 'console.json';
    if (typeof data === "object") {
      data = JSON.stringify(data, undefined, 4);
    }
    var blob = new Blob([data], {
        type: 'text/json'
      }),
      e = document.createEvent('MouseEvents'),
      a = document.createElement('a');
    a.download = filename;
    a.href = window.URL.createObjectURL(blob);
    a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);
  };
})(console);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMaWJzXFxjb25zb2xlLnNhdmUuanMiXSwibmFtZXMiOlsiY29uc29sZSIsInNhdmUiLCJkYXRhIiwiZmlsZW5hbWUiLCJlcnJvciIsIkpTT04iLCJzdHJpbmdpZnkiLCJ1bmRlZmluZWQiLCJibG9iIiwiQmxvYiIsInR5cGUiLCJlIiwiZG9jdW1lbnQiLCJjcmVhdGVFdmVudCIsImEiLCJjcmVhdGVFbGVtZW50IiwiZG93bmxvYWQiLCJocmVmIiwid2luZG93IiwiVVJMIiwiY3JlYXRlT2JqZWN0VVJMIiwiZGF0YXNldCIsImRvd25sb2FkdXJsIiwiam9pbiIsImluaXRNb3VzZUV2ZW50IiwiZGlzcGF0Y2hFdmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxDQUFDLFVBQVVBLE9BQU8sRUFBRTtFQUVsQkEsT0FBTyxDQUFDQyxJQUFJLEdBQUcsVUFBVUMsSUFBSSxFQUFFQyxRQUFRLEVBQUU7SUFFdkMsSUFBSSxDQUFDRCxJQUFJLEVBQUU7TUFDVEYsT0FBTyxDQUFDSSxLQUFLLENBQUMsdUJBQXVCLENBQUM7TUFDdEM7SUFDRjtJQUVBLElBQUksQ0FBQ0QsUUFBUSxFQUFFQSxRQUFRLEdBQUcsY0FBYztJQUV4QyxJQUFJLE9BQU9ELElBQUksS0FBSyxRQUFRLEVBQUU7TUFDNUJBLElBQUksR0FBR0csSUFBSSxDQUFDQyxTQUFTLENBQUNKLElBQUksRUFBRUssU0FBUyxFQUFFLENBQUMsQ0FBQztJQUMzQztJQUVBLElBQUlDLElBQUksR0FBRyxJQUFJQyxJQUFJLENBQUMsQ0FBQ1AsSUFBSSxDQUFDLEVBQUU7UUFDeEJRLElBQUksRUFBRTtNQUNSLENBQUMsQ0FBQztNQUNGQyxDQUFDLEdBQUdDLFFBQVEsQ0FBQ0MsV0FBVyxDQUFDLGFBQWEsQ0FBQztNQUN2Q0MsQ0FBQyxHQUFHRixRQUFRLENBQUNHLGFBQWEsQ0FBQyxHQUFHLENBQUM7SUFFakNELENBQUMsQ0FBQ0UsUUFBUSxHQUFHYixRQUFRO0lBQ3JCVyxDQUFDLENBQUNHLElBQUksR0FBR0MsTUFBTSxDQUFDQyxHQUFHLENBQUNDLGVBQWUsQ0FBQ1osSUFBSSxDQUFDO0lBQ3pDTSxDQUFDLENBQUNPLE9BQU8sQ0FBQ0MsV0FBVyxHQUFHLENBQUMsV0FBVyxFQUFFUixDQUFDLENBQUNFLFFBQVEsRUFBRUYsQ0FBQyxDQUFDRyxJQUFJLENBQUMsQ0FBQ00sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNuRVosQ0FBQyxDQUFDYSxjQUFjLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUVOLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDO0lBQ2xHSixDQUFDLENBQUNXLGFBQWEsQ0FBQ2QsQ0FBQyxDQUFDO0VBQ3BCLENBQUM7QUFDSCxDQUFDLEVBQUVYLE9BQU8sQ0FBQyIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIChjb25zb2xlKSB7XG5cbiAgY29uc29sZS5zYXZlID0gZnVuY3Rpb24gKGRhdGEsIGZpbGVuYW1lKSB7XG5cbiAgICBpZiAoIWRhdGEpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0NvbnNvbGUuc2F2ZTogTm8gZGF0YScpXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFmaWxlbmFtZSkgZmlsZW5hbWUgPSAnY29uc29sZS5qc29uJ1xuXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSBcIm9iamVjdFwiKSB7XG4gICAgICBkYXRhID0gSlNPTi5zdHJpbmdpZnkoZGF0YSwgdW5kZWZpbmVkLCA0KVxuICAgIH1cblxuICAgIHZhciBibG9iID0gbmV3IEJsb2IoW2RhdGFdLCB7XG4gICAgICAgIHR5cGU6ICd0ZXh0L2pzb24nXG4gICAgICB9KSxcbiAgICAgIGUgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnTW91c2VFdmVudHMnKSxcbiAgICAgIGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcblxuICAgIGEuZG93bmxvYWQgPSBmaWxlbmFtZVxuICAgIGEuaHJlZiA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpXG4gICAgYS5kYXRhc2V0LmRvd25sb2FkdXJsID0gWyd0ZXh0L2pzb24nLCBhLmRvd25sb2FkLCBhLmhyZWZdLmpvaW4oJzonKVxuICAgIGUuaW5pdE1vdXNlRXZlbnQoJ2NsaWNrJywgdHJ1ZSwgZmFsc2UsIHdpbmRvdywgMCwgMCwgMCwgMCwgMCwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIDAsIG51bGwpXG4gICAgYS5kaXNwYXRjaEV2ZW50KGUpXG4gIH1cbn0pKGNvbnNvbGUpIl19