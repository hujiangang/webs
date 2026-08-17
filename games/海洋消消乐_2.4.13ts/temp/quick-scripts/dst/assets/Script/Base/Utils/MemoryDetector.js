
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Base/Utils/MemoryDetector.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6529cs4SbNNW7oablE8pLYz', 'MemoryDetector');
// Script/Base/Utils/MemoryDetector.ts

// const { ccclass, property } = cc._decorator;
// @ccclass
// export class MemoryDetector {
//     private static _inited: boolean = false;
//     public static showMemoryStatus(): void {
//         if (cc.sys.isNative) {
//             return;
//         }
//         if (MemoryDetector._inited) {
//             return;
//         }
//         let _memLabel = null;
//         let profiler = cc["profiler"];
//         profiler.showStats();
//         let createMemLabel = function () {
//             _memLabel = document.createElement('div');
//             profiler._fps = document.getElementById('fps');
//             profiler._fps.style.height = '100px';
//             let style = _memLabel.style;
//             style.color = 'rgb(0, 255, 255)';
//             style.font = 'bold 12px Helvetica, Arial';
//             style.lineHeight = '20px;';
//             style.width = '100%';
//             profiler._fps.appendChild(_memLabel);
//         }
//         createMemLabel();
//         let afterVisit = function () {
//             let count = 0;
//             let totalBytes = 0;
//             let locTexrues = cc.textureCache["_textures"];
//             for (let key in locTexrues) {
//                 let selTexture = locTexrues[key];
//                 count++;
//                 totalBytes += selTexture.getPixelWidth() * selTexture.getPixelHeight() * 4;
//             }
//             let locTextureColorsCache = cc.textureCache["_textureColorsCache"];
//             for (let key in locTextureColorsCache) {
//                 let selCanvasColorsArr = locTextureColorsCache[key];
//                 for (let selCanvasKey in selCanvasColorsArr) {
//                     let selCanvas = selCanvasColorsArr[selCanvasKey];
//                     count++;
//                     totalBytes += selCanvas.width * selCanvas.height * 4;
//                 }
//             }
//             _memLabel.innerHTML = "  Memory  " + (totalBytes / (1024.0 * 1024.0)).toFixed(2) + " M";
//         }
//         cc.director.on(cc.Director.EVENT_AFTER_VISIT, afterVisit);
//         MemoryDetector._inited = true;
//     }
// }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxCYXNlXFxVdGlsc1xcTWVtb3J5RGV0ZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsK0NBQStDO0FBQy9DLFdBQVc7QUFDWCxnQ0FBZ0M7QUFFaEMsK0NBQStDO0FBRS9DLCtDQUErQztBQUMvQyxpQ0FBaUM7QUFDakMsc0JBQXNCO0FBQ3RCLFlBQVk7QUFFWix3Q0FBd0M7QUFDeEMsc0JBQXNCO0FBQ3RCLFlBQVk7QUFFWixnQ0FBZ0M7QUFDaEMseUNBQXlDO0FBQ3pDLGdDQUFnQztBQUVoQyw2Q0FBNkM7QUFDN0MseURBQXlEO0FBQ3pELDhEQUE4RDtBQUM5RCxvREFBb0Q7QUFFcEQsMkNBQTJDO0FBQzNDLGdEQUFnRDtBQUNoRCx5REFBeUQ7QUFDekQsMENBQTBDO0FBQzFDLG9DQUFvQztBQUNwQyxvREFBb0Q7QUFDcEQsWUFBWTtBQUVaLDRCQUE0QjtBQUU1Qix5Q0FBeUM7QUFDekMsNkJBQTZCO0FBQzdCLGtDQUFrQztBQUVsQyw2REFBNkQ7QUFFN0QsNENBQTRDO0FBQzVDLG9EQUFvRDtBQUNwRCwyQkFBMkI7QUFDM0IsOEZBQThGO0FBQzlGLGdCQUFnQjtBQUVoQixrRkFBa0Y7QUFFbEYsdURBQXVEO0FBQ3ZELHVFQUF1RTtBQUN2RSxpRUFBaUU7QUFDakUsd0VBQXdFO0FBQ3hFLCtCQUErQjtBQUMvQiw0RUFBNEU7QUFDNUUsb0JBQW9CO0FBQ3BCLGdCQUFnQjtBQUNoQix1R0FBdUc7QUFDdkcsWUFBWTtBQUVaLHFFQUFxRTtBQUNyRSx5Q0FBeUM7QUFDekMsUUFBUTtBQUNSLElBQUkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcbi8vIGNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG4vLyBAY2NjbGFzc1xuLy8gZXhwb3J0IGNsYXNzIE1lbW9yeURldGVjdG9yIHtcblxuLy8gICAgIHByaXZhdGUgc3RhdGljIF9pbml0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuLy8gICAgIHB1YmxpYyBzdGF0aWMgc2hvd01lbW9yeVN0YXR1cygpOiB2b2lkIHtcbi8vICAgICAgICAgaWYgKGNjLnN5cy5pc05hdGl2ZSkge1xuLy8gICAgICAgICAgICAgcmV0dXJuO1xuLy8gICAgICAgICB9XG5cbi8vICAgICAgICAgaWYgKE1lbW9yeURldGVjdG9yLl9pbml0ZWQpIHtcbi8vICAgICAgICAgICAgIHJldHVybjtcbi8vICAgICAgICAgfVxuXG4vLyAgICAgICAgIGxldCBfbWVtTGFiZWwgPSBudWxsO1xuLy8gICAgICAgICBsZXQgcHJvZmlsZXIgPSBjY1tcInByb2ZpbGVyXCJdO1xuLy8gICAgICAgICBwcm9maWxlci5zaG93U3RhdHMoKTtcblxuLy8gICAgICAgICBsZXQgY3JlYXRlTWVtTGFiZWwgPSBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICBfbWVtTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbi8vICAgICAgICAgICAgIHByb2ZpbGVyLl9mcHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZnBzJyk7XG4vLyAgICAgICAgICAgICBwcm9maWxlci5fZnBzLnN0eWxlLmhlaWdodCA9ICcxMDBweCc7XG5cbi8vICAgICAgICAgICAgIGxldCBzdHlsZSA9IF9tZW1MYWJlbC5zdHlsZTtcbi8vICAgICAgICAgICAgIHN0eWxlLmNvbG9yID0gJ3JnYigwLCAyNTUsIDI1NSknO1xuLy8gICAgICAgICAgICAgc3R5bGUuZm9udCA9ICdib2xkIDEycHggSGVsdmV0aWNhLCBBcmlhbCc7XG4vLyAgICAgICAgICAgICBzdHlsZS5saW5lSGVpZ2h0ID0gJzIwcHg7Jztcbi8vICAgICAgICAgICAgIHN0eWxlLndpZHRoID0gJzEwMCUnO1xuLy8gICAgICAgICAgICAgcHJvZmlsZXIuX2Zwcy5hcHBlbmRDaGlsZChfbWVtTGFiZWwpO1xuLy8gICAgICAgICB9XG5cbi8vICAgICAgICAgY3JlYXRlTWVtTGFiZWwoKTtcblxuLy8gICAgICAgICBsZXQgYWZ0ZXJWaXNpdCA9IGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIGxldCBjb3VudCA9IDA7XG4vLyAgICAgICAgICAgICBsZXQgdG90YWxCeXRlcyA9IDA7XG5cbi8vICAgICAgICAgICAgIGxldCBsb2NUZXhydWVzID0gY2MudGV4dHVyZUNhY2hlW1wiX3RleHR1cmVzXCJdO1xuXG4vLyAgICAgICAgICAgICBmb3IgKGxldCBrZXkgaW4gbG9jVGV4cnVlcykge1xuLy8gICAgICAgICAgICAgICAgIGxldCBzZWxUZXh0dXJlID0gbG9jVGV4cnVlc1trZXldO1xuLy8gICAgICAgICAgICAgICAgIGNvdW50Kys7XG4vLyAgICAgICAgICAgICAgICAgdG90YWxCeXRlcyArPSBzZWxUZXh0dXJlLmdldFBpeGVsV2lkdGgoKSAqIHNlbFRleHR1cmUuZ2V0UGl4ZWxIZWlnaHQoKSAqIDQ7XG4vLyAgICAgICAgICAgICB9XG5cbi8vICAgICAgICAgICAgIGxldCBsb2NUZXh0dXJlQ29sb3JzQ2FjaGUgPSBjYy50ZXh0dXJlQ2FjaGVbXCJfdGV4dHVyZUNvbG9yc0NhY2hlXCJdO1xuXG4vLyAgICAgICAgICAgICBmb3IgKGxldCBrZXkgaW4gbG9jVGV4dHVyZUNvbG9yc0NhY2hlKSB7XG4vLyAgICAgICAgICAgICAgICAgbGV0IHNlbENhbnZhc0NvbG9yc0FyciA9IGxvY1RleHR1cmVDb2xvcnNDYWNoZVtrZXldO1xuLy8gICAgICAgICAgICAgICAgIGZvciAobGV0IHNlbENhbnZhc0tleSBpbiBzZWxDYW52YXNDb2xvcnNBcnIpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgbGV0IHNlbENhbnZhcyA9IHNlbENhbnZhc0NvbG9yc0FycltzZWxDYW52YXNLZXldO1xuLy8gICAgICAgICAgICAgICAgICAgICBjb3VudCsrO1xuLy8gICAgICAgICAgICAgICAgICAgICB0b3RhbEJ5dGVzICs9IHNlbENhbnZhcy53aWR0aCAqIHNlbENhbnZhcy5oZWlnaHQgKiA0O1xuLy8gICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgIF9tZW1MYWJlbC5pbm5lckhUTUwgPSBcIiAgTWVtb3J5ICBcIiArICh0b3RhbEJ5dGVzIC8gKDEwMjQuMCAqIDEwMjQuMCkpLnRvRml4ZWQoMikgKyBcIiBNXCI7XG4vLyAgICAgICAgIH1cblxuLy8gICAgICAgICBjYy5kaXJlY3Rvci5vbihjYy5EaXJlY3Rvci5FVkVOVF9BRlRFUl9WSVNJVCwgYWZ0ZXJWaXNpdCk7XG4vLyAgICAgICAgIE1lbW9yeURldGVjdG9yLl9pbml0ZWQgPSB0cnVlO1xuLy8gICAgIH1cbi8vIH0iXX0=