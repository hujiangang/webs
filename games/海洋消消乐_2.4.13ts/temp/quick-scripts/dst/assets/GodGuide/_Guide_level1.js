
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/GodGuide/_Guide_level1.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '84b9biq5ktMyrmxHOKMwthF', '_Guide_level1');
// GodGuide/_Guide_level1.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.task = void 0;
var GuideCondition_1 = require("./GuideCondition");
var GuideUtils_1 = require("./GuideUtils");
var GuideData_1 = require("./GuideData");
exports.task = {
    name: "关卡1 首次进入游戏",
    debug: false,
    autorun: false,
    filename: "_Guide_level1",
    steps: [
        {
            guideId: 1,
            onStart: function (next) {
                var result = GuideCondition_1.GuideCondition.checkLevelFinished(1);
                // GuideUtils.logError("guide result ", result);
                if (result) {
                    GuideData_1.GuideData.pushFinishedTask("_Guide_level1");
                    next(GuideUtils_1.EGuideStart.Stop);
                }
                else {
                    next(GuideUtils_1.EGuideStart.None);
                }
            },
            desc: '首次进入游戏',
            command: { cmd: 'text', args: '欢迎来到小岛！先来一局游戏吧！', role: 2 },
            noCheckDone: true,
            mask: true,
        },
        {
            guideId: 2,
            desc: '点击开始游戏',
            command: { cmd: 'finger', args: 'UI > Bottom > goMatchBtn' },
            // delayTime: 1,
            if: "-checkLevelFinished",
            param: 1,
            noCheckDone: true,
        },
        {
            guideId: 3,
            desc: '点击开始关卡按钮',
            command: { cmd: 'finger', args: 'UIRoot:SelectShowTarget/btn_green' },
            delayTime: 0.5,
            noCheckDone: true,
        },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcR29kR3VpZGVcXF9HdWlkZV9sZXZlbDEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQWlEO0FBQ2pELDJDQUEyQztBQUMzQyx5Q0FBd0M7QUFFM0IsUUFBQSxJQUFJLEdBQUc7SUFDaEIsSUFBSSxFQUFFLFlBQVk7SUFDbEIsS0FBSyxFQUFFLEtBQUs7SUFDWixPQUFPLEVBQUUsS0FBSztJQUNkLFFBQVEsRUFBRSxlQUFlO0lBQ3pCLEtBQUssRUFBRTtRQUNIO1lBQ0ksT0FBTyxFQUFFLENBQUM7WUFDVixPQUFPLFlBQUMsSUFBSTtnQkFDUixJQUFJLE1BQU0sR0FBRywrQkFBYyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsRCxnREFBZ0Q7Z0JBQ2hELElBQUksTUFBTSxFQUFFO29CQUNSLHFCQUFTLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLENBQUM7b0JBQzVDLElBQUksQ0FBQyx3QkFBVyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUMxQjtxQkFBTTtvQkFDSCxJQUFJLENBQUMsd0JBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDMUI7WUFDTCxDQUFDO1lBQ0QsSUFBSSxFQUFFLFFBQVE7WUFDZCxPQUFPLEVBQUUsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFO1lBQzFELFdBQVcsRUFBRSxJQUFJO1lBQ2pCLElBQUksRUFBRSxJQUFJO1NBQ2I7UUFDRDtZQUNJLE9BQU8sRUFBRSxDQUFDO1lBQ1YsSUFBSSxFQUFFLFFBQVE7WUFDZCxPQUFPLEVBQUUsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSwwQkFBMEIsRUFBRTtZQUM1RCxnQkFBZ0I7WUFDaEIsRUFBRSxFQUFFLHFCQUFxQjtZQUN6QixLQUFLLEVBQUUsQ0FBQztZQUNSLFdBQVcsRUFBRSxJQUFJO1NBQ3BCO1FBQ0Q7WUFDSSxPQUFPLEVBQUUsQ0FBQztZQUNWLElBQUksRUFBRSxVQUFVO1lBQ2hCLE9BQU8sRUFBRSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLG1DQUFtQyxFQUFFO1lBQ3JFLFNBQVMsRUFBRSxHQUFHO1lBQ2QsV0FBVyxFQUFFLElBQUk7U0FDcEI7S0FDSjtDQUNKLENBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHdWlkZUNvbmRpdGlvbiB9IGZyb20gXCIuL0d1aWRlQ29uZGl0aW9uXCJcbmltcG9ydCB7IEVHdWlkZVN0YXJ0IH0gZnJvbSBcIi4vR3VpZGVVdGlsc1wiO1xuaW1wb3J0IHsgR3VpZGVEYXRhIH0gZnJvbSBcIi4vR3VpZGVEYXRhXCI7XG5cbmV4cG9ydCBjb25zdCB0YXNrID0ge1xuICAgIG5hbWU6IFwi5YWz5Y2hMSDpppbmrKHov5vlhaXmuLjmiI9cIixcbiAgICBkZWJ1ZzogZmFsc2UsXG4gICAgYXV0b3J1bjogZmFsc2UsXG4gICAgZmlsZW5hbWU6IFwiX0d1aWRlX2xldmVsMVwiLFxuICAgIHN0ZXBzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIGd1aWRlSWQ6IDEsXG4gICAgICAgICAgICBvblN0YXJ0KG5leHQpIHtcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gR3VpZGVDb25kaXRpb24uY2hlY2tMZXZlbEZpbmlzaGVkKDEpO1xuICAgICAgICAgICAgICAgIC8vIEd1aWRlVXRpbHMubG9nRXJyb3IoXCJndWlkZSByZXN1bHQgXCIsIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICBHdWlkZURhdGEucHVzaEZpbmlzaGVkVGFzayhcIl9HdWlkZV9sZXZlbDFcIik7XG4gICAgICAgICAgICAgICAgICAgIG5leHQoRUd1aWRlU3RhcnQuU3RvcCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dChFR3VpZGVTdGFydC5Ob25lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzYzogJ+mmluasoei/m+WFpea4uOaIjycsXG4gICAgICAgICAgICBjb21tYW5kOiB7IGNtZDogJ3RleHQnLCBhcmdzOiAn5qyi6L+O5p2l5Yiw5bCP5bKb77yB5YWI5p2l5LiA5bGA5ri45oiP5ZCn77yBJywgcm9sZTogMiB9LFxuICAgICAgICAgICAgbm9DaGVja0RvbmU6IHRydWUsXG4gICAgICAgICAgICBtYXNrOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBndWlkZUlkOiAyLFxuICAgICAgICAgICAgZGVzYzogJ+eCueWHu+W8gOWni+a4uOaIjycsXG4gICAgICAgICAgICBjb21tYW5kOiB7IGNtZDogJ2ZpbmdlcicsIGFyZ3M6ICdVSSA+IEJvdHRvbSA+IGdvTWF0Y2hCdG4nIH0sXG4gICAgICAgICAgICAvLyBkZWxheVRpbWU6IDEsXG4gICAgICAgICAgICBpZjogXCItY2hlY2tMZXZlbEZpbmlzaGVkXCIsXG4gICAgICAgICAgICBwYXJhbTogMSxcbiAgICAgICAgICAgIG5vQ2hlY2tEb25lOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBndWlkZUlkOiAzLFxuICAgICAgICAgICAgZGVzYzogJ+eCueWHu+W8gOWni+WFs+WNoeaMiemSricsXG4gICAgICAgICAgICBjb21tYW5kOiB7IGNtZDogJ2ZpbmdlcicsIGFyZ3M6ICdVSVJvb3Q6U2VsZWN0U2hvd1RhcmdldC9idG5fZ3JlZW4nIH0sXG4gICAgICAgICAgICBkZWxheVRpbWU6IDAuNSxcbiAgICAgICAgICAgIG5vQ2hlY2tEb25lOiB0cnVlLFxuICAgICAgICB9LFxuICAgIF1cbn0gIl19