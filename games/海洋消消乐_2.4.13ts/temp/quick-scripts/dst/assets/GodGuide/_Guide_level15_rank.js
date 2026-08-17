
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GodGuide/_Guide_level15_rank.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '29d8bvE4mRB+LfgVoxDf1W5', '_Guide_level15_rank');
// GodGuide/_Guide_level15_rank.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.task = void 0;
exports.task = {
    name: "关卡15 游戏结束后去排行榜",
    debug: false,
    autorun: false,
    filename: "_Guide_level5_rank",
    steps: [
        {
            guideId: 1501,
            // onStart(next) {
            //     next(EGuideStart.None);
            // },
            desc: '关卡15 游戏结束后去排行榜',
            command: { cmd: 'text', args: '我们已经获得足够的积分，来看看我们在全服的排名吧。', role: 2 },
            mask: true,
        },
        {
            guideId: 1502,
            desc: "手指指引点击排行榜",
            command: { cmd: "finger", args: "Canvas/UI/Bottom/leftBtns/main_icon_phb" },
        }
    ]
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR29kR3VpZGVcXF9HdWlkZV9sZXZlbDE1X3JhbmsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ2EsUUFBQSxJQUFJLEdBQUc7SUFDaEIsSUFBSSxFQUFFLGdCQUFnQjtJQUN0QixLQUFLLEVBQUUsS0FBSztJQUNaLE9BQU8sRUFBRSxLQUFLO0lBQ2QsUUFBUSxFQUFFLG9CQUFvQjtJQUM5QixLQUFLLEVBQUU7UUFDSDtZQUNJLE9BQU8sRUFBRSxJQUFJO1lBQ2Isa0JBQWtCO1lBQ2xCLDhCQUE4QjtZQUM5QixLQUFLO1lBQ0wsSUFBSSxFQUFFLGdCQUFnQjtZQUN0QixPQUFPLEVBQUUsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSwyQkFBMkIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFO1lBQ3BFLElBQUksRUFBRSxJQUFJO1NBRWI7UUFFRDtZQUNJLE9BQU8sRUFBRSxJQUFJO1lBQ2IsSUFBSSxFQUFFLFdBQVc7WUFDakIsT0FBTyxFQUFFLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUseUNBQXlDLEVBQUU7U0FFOUU7S0FDSjtDQUNKLENBQUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcbmV4cG9ydCBjb25zdCB0YXNrID0ge1xuICAgIG5hbWU6IFwi5YWz5Y2hMTUg5ri45oiP57uT5p2f5ZCO5Y675o6S6KGM5qacXCIsXG4gICAgZGVidWc6IGZhbHNlLFxuICAgIGF1dG9ydW46IGZhbHNlLFxuICAgIGZpbGVuYW1lOiBcIl9HdWlkZV9sZXZlbDVfcmFua1wiLFxuICAgIHN0ZXBzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIGd1aWRlSWQ6IDE1MDEsXG4gICAgICAgICAgICAvLyBvblN0YXJ0KG5leHQpIHtcbiAgICAgICAgICAgIC8vICAgICBuZXh0KEVHdWlkZVN0YXJ0Lk5vbmUpO1xuICAgICAgICAgICAgLy8gfSxcbiAgICAgICAgICAgIGRlc2M6ICflhbPljaExNSDmuLjmiI/nu5PmnZ/lkI7ljrvmjpLooYzmppwnLFxuICAgICAgICAgICAgY29tbWFuZDogeyBjbWQ6ICd0ZXh0JywgYXJnczogJ+aIkeS7rOW3sue7j+iOt+W+l+i2s+Wkn+eahOenr+WIhu+8jOadpeeci+eci+aIkeS7rOWcqOWFqOacjeeahOaOkuWQjeWQp+OAgicsIHJvbGU6IDIgfSxcbiAgICAgICAgICAgIG1hc2s6IHRydWUsXG4gICAgICAgICAgICAvLyBub0NoZWNrRG9uZTogdHJ1ZSxcbiAgICAgICAgfSxcblxuICAgICAgICB7XG4gICAgICAgICAgICBndWlkZUlkOiAxNTAyLFxuICAgICAgICAgICAgZGVzYzogXCLmiYvmjIfmjIflvJXngrnlh7vmjpLooYzmppxcIixcbiAgICAgICAgICAgIGNvbW1hbmQ6IHsgY21kOiBcImZpbmdlclwiLCBhcmdzOiBcIkNhbnZhcy9VSS9Cb3R0b20vbGVmdEJ0bnMvbWFpbl9pY29uX3BoYlwiIH0sXG4gICAgICAgICAgICAvLyBub0NoZWNrRG9uZTogdHJ1ZSxcbiAgICAgICAgfVxuICAgIF1cbn07Il19