
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Logic/Data/Const/Event.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '18f8anA3BJIsLntdQeRwvEI', 'Event');
// Script/Logic/Data/Const/Event.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
var Util_1 = require("../../../Base/Utils/Util");
/**声音事件*/
var Event;
(function (Event) {
    var Sound;
    (function (Sound) {
        Sound[Sound["PlaySoundEff"] = 0] = "PlaySoundEff";
        Sound[Sound["PlayBGM"] = 1] = "PlayBGM";
        Sound[Sound["StopBGM"] = 2] = "StopBGM";
        Sound[Sound["UpdateOpt"] = 3] = "UpdateOpt";
    })(Sound = Event.Sound || (Event.Sound = {}));
    Util_1.Util.Enum.convert2EventEnum(Sound);
    var Model;
    (function (Model) {
        Model[Model["CheckGameOver"] = 0] = "CheckGameOver";
    })(Model = Event.Model || (Event.Model = {}));
    Util_1.Util.Enum.convert2EventEnum(Model);
    var UI;
    (function (UI) {
        /**钱发生了变动 */
        UI[UI["UpdateCurrency"] = 0] = "UpdateCurrency";
        UI[UI["HideDock"] = 1] = "HideDock";
        UI[UI["ShowDock"] = 2] = "ShowDock";
        UI[UI["PropCount"] = 3] = "PropCount";
        UI[UI["UpdateInfoPanel"] = 4] = "UpdateInfoPanel";
        UI[UI["CollectComplet"] = 5] = "CollectComplet";
        UI[UI["UpdateLv"] = 6] = "UpdateLv";
        UI[UI["ChangeScene"] = 7] = "ChangeScene";
        UI[UI["CloseTutorial"] = 8] = "CloseTutorial";
        UI[UI["UpdateTmpLoadingProgress"] = 9] = "UpdateTmpLoadingProgress";
        // ShowSelectLevelView,
        UI[UI["HideSelectLevelView"] = 10] = "HideSelectLevelView";
        UI[UI["AddScore"] = 11] = "AddScore";
        UI[UI["UpdateRemainAddPowerTime"] = 12] = "UpdateRemainAddPowerTime";
        UI[UI["updateBoxState"] = 13] = "updateBoxState";
        UI[UI["ShowBagTips"] = 14] = "ShowBagTips";
        UI[UI["MapMenuUpdate"] = 15] = "MapMenuUpdate";
        UI[UI["LevelSceneTouched"] = 16] = "LevelSceneTouched";
        UI[UI["ChapterUnlock"] = 17] = "ChapterUnlock";
    })(UI = Event.UI || (Event.UI = {}));
    Util_1.Util.Enum.convert2EventEnum(UI);
    var Effect;
    (function (Effect) {
        Effect[Effect["LittleBomb"] = 0] = "LittleBomb";
        Effect[Effect["SpeedLine"] = 1] = "SpeedLine";
        Effect[Effect["Combo"] = 2] = "Combo";
        Effect[Effect["ShootStar"] = 3] = "ShootStar";
        Effect[Effect["OverShoot"] = 4] = "OverShoot";
        Effect[Effect["ShowDot"] = 5] = "ShowDot";
        Effect[Effect["Broken"] = 6] = "Broken";
        Effect[Effect["BoxBroken"] = 7] = "BoxBroken";
        Effect[Effect["CollectOver"] = 8] = "CollectOver";
        Effect[Effect["AddScore"] = 9] = "AddScore";
    })(Effect = Event.Effect || (Event.Effect = {}));
    Util_1.Util.Enum.convert2EventEnum(Effect);
    var GameCMD;
    (function (GameCMD) {
        GameCMD[GameCMD["MainCMD"] = 0] = "MainCMD";
        GameCMD[GameCMD["Exchange"] = 1] = "Exchange";
        GameCMD[GameCMD["Elimate"] = 2] = "Elimate";
        GameCMD[GameCMD["CBomb_RainbowFly"] = 3] = "CBomb_RainbowFly";
        GameCMD[GameCMD["AddNewCell"] = 4] = "AddNewCell";
        GameCMD[GameCMD["MoveGrid"] = 5] = "MoveGrid";
        GameCMD[GameCMD["GameResume"] = 6] = "GameResume";
        GameCMD[GameCMD["GameOver"] = 7] = "GameOver";
        GameCMD[GameCMD["ChangeCell"] = 8] = "ChangeCell";
        GameCMD[GameCMD["PropClick"] = 9] = "PropClick";
        GameCMD[GameCMD["PropUsed"] = 10] = "PropUsed";
        GameCMD[GameCMD["PromptCanElimate"] = 11] = "PromptCanElimate";
        GameCMD[GameCMD["StopPrompts"] = 12] = "StopPrompts";
        GameCMD[GameCMD["EnergyStorage"] = 13] = "EnergyStorage";
        GameCMD[GameCMD["SpeCollect"] = 14] = "SpeCollect";
        GameCMD[GameCMD["GameReset"] = 15] = "GameReset";
        GameCMD[GameCMD["GameTutorial"] = 16] = "GameTutorial";
        GameCMD[GameCMD["UpdateComplexView"] = 17] = "UpdateComplexView";
        GameCMD[GameCMD["UpdateCollectPower"] = 18] = "UpdateCollectPower";
        GameCMD[GameCMD["ShowGameResult"] = 19] = "ShowGameResult";
        GameCMD[GameCMD["GameOverFall"] = 20] = "GameOverFall";
        GameCMD[GameCMD["GameGetStepContinue"] = 21] = "GameGetStepContinue";
    })(GameCMD = Event.GameCMD || (Event.GameCMD = {}));
    Util_1.Util.Enum.convert2EventEnum(GameCMD);
    var System;
    (function (System) {
        System[System["CacheWarning"] = 0] = "CacheWarning";
    })(System = Event.System || (Event.System = {}));
    Util_1.Util.Enum.convert2EventEnum(System);
    var Map;
    (function (Map) {
        Map[Map["CameraMoveTo"] = 0] = "CameraMoveTo";
        Map[Map["MapTouchMoveEnable"] = 1] = "MapTouchMoveEnable";
        Map[Map["WalkEnd"] = 2] = "WalkEnd";
        Map[Map["ShowTool"] = 3] = "ShowTool";
        Map[Map["HideTool"] = 4] = "HideTool";
        Map[Map["UnLock"] = 5] = "UnLock";
        Map[Map["ShowLock"] = 6] = "ShowLock";
        Map[Map["Upgrade"] = 7] = "Upgrade";
        Map[Map["UnLockIsland"] = 8] = "UnLockIsland";
        Map[Map["GuideMask"] = 9] = "GuideMask";
    })(Map = Event.Map || (Event.Map = {}));
    Util_1.Util.Enum.convert2EventEnum(Map);
    var Guide;
    (function (Guide) {
        Guide[Guide["ReplaceMapObj"] = 0] = "ReplaceMapObj";
    })(Guide = Event.Guide || (Event.Guide = {}));
    Util_1.Util.Enum.convert2EventEnum(Guide);
    var Hotel;
    (function (Hotel) {
        Hotel[Hotel["UIRoomUnlock"] = 0] = "UIRoomUnlock";
        Hotel[Hotel["SlotUnlock"] = 1] = "SlotUnlock";
        Hotel[Hotel["MapScrollBegin"] = 2] = "MapScrollBegin";
        Hotel[Hotel["RoomFinished"] = 3] = "RoomFinished";
        Hotel[Hotel["ShowSubSlot"] = 4] = "ShowSubSlot";
        Hotel[Hotel["HideSubSlot"] = 5] = "HideSubSlot";
        Hotel[Hotel["UpateSubSlotState"] = 6] = "UpateSubSlotState";
        Hotel[Hotel["ShowGuestRoom"] = 7] = "ShowGuestRoom";
        Hotel[Hotel["TouchSlotIcon"] = 8] = "TouchSlotIcon";
        Hotel[Hotel["ChangeSlot"] = 9] = "ChangeSlot";
        Hotel[Hotel["SelectSubSlot"] = 10] = "SelectSubSlot";
    })(Hotel = Event.Hotel || (Event.Hotel = {}));
    Util_1.Util.Enum.convert2EventEnum(Hotel);
    var DailyTask;
    (function (DailyTask) {
        DailyTask[DailyTask["UpdateProgress"] = 0] = "UpdateProgress";
        DailyTask[DailyTask["UpdateTimerTaskActive"] = 1] = "UpdateTimerTaskActive";
        DailyTask[DailyTask["UpdateTaskKey"] = 2] = "UpdateTaskKey";
    })(DailyTask = Event.DailyTask || (Event.DailyTask = {}));
    Util_1.Util.Enum.convert2EventEnum(DailyTask);
})(Event = exports.Event || (exports.Event = {}));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxMb2dpY1xcRGF0YVxcQ29uc3RcXEV2ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUFnRDtBQUVoRCxTQUFTO0FBQ1QsSUFBaUIsS0FBSyxDQTZIckI7QUE3SEQsV0FBaUIsS0FBSztJQUVsQixJQUFZLEtBS1g7SUFMRCxXQUFZLEtBQUs7UUFDYixpREFBWSxDQUFBO1FBQ1osdUNBQU8sQ0FBQTtRQUNQLHVDQUFPLENBQUE7UUFDUCwyQ0FBUyxDQUFBO0lBQ2IsQ0FBQyxFQUxXLEtBQUssR0FBTCxXQUFLLEtBQUwsV0FBSyxRQUtoQjtJQUNELFdBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFbkMsSUFBWSxLQUVYO0lBRkQsV0FBWSxLQUFLO1FBQ2IsbURBQWEsQ0FBQTtJQUNqQixDQUFDLEVBRlcsS0FBSyxHQUFMLFdBQUssS0FBTCxXQUFLLFFBRWhCO0lBQ0QsV0FBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUVuQyxJQUFZLEVBc0JYO0lBdEJELFdBQVksRUFBRTtRQUNWLFlBQVk7UUFDWiwrQ0FBYyxDQUFBO1FBQ2QsbUNBQVEsQ0FBQTtRQUNSLG1DQUFRLENBQUE7UUFDUixxQ0FBUyxDQUFBO1FBQ1QsaURBQWUsQ0FBQTtRQUNmLCtDQUFjLENBQUE7UUFDZCxtQ0FBUSxDQUFBO1FBQ1IseUNBQVcsQ0FBQTtRQUNYLDZDQUFhLENBQUE7UUFDYixtRUFBd0IsQ0FBQTtRQUN4Qix1QkFBdUI7UUFDdkIsMERBQW1CLENBQUE7UUFDbkIsb0NBQVEsQ0FBQTtRQUNSLG9FQUF3QixDQUFBO1FBQ3hCLGdEQUFjLENBQUE7UUFDZCwwQ0FBVyxDQUFBO1FBQ1gsOENBQWEsQ0FBQTtRQUNiLHNEQUFpQixDQUFBO1FBQ2pCLDhDQUFhLENBQUE7SUFFakIsQ0FBQyxFQXRCVyxFQUFFLEdBQUYsUUFBRSxL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LENBQUE7UUFDckIsMkRBQWEsQ0FBQTtJQUNqQixDQUFDLEVBSlcsU0FBUyxHQUFULGVBQVMsS0FBVCxlQUFTLFFBSXBCO0lBQ0QsV0FBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUMzQyxDQUFDLEVBN0hnQixLQUFLLEdBQUwsYUFBSyxLQUFMLGFBQUssUUE2SHJCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVXRpbCB9IGZyb20gXCIuLi8uLi8uLi9CYXNlL1V0aWxzL1V0aWxcIjtcblxuLyoq5aOw6Z+z5LqL5Lu2Ki9cbmV4cG9ydCBuYW1lc3BhY2UgRXZlbnQge1xuXG4gICAgZXhwb3J0IGVudW0gU291bmQge1xuICAgICAgICBQbGF5U291bmRFZmYsXG4gICAgICAgIFBsYXlCR00sXG4gICAgICAgIFN0b3BCR00sXG4gICAgICAgIFVwZGF0ZU9wdFxuICAgIH1cbiAgICBVdGlsLkVudW0uY29udmVydDJFdmVudEVudW0oU291bmQpO1xuXG4gICAgZXhwb3J0IGVudW0gTW9kZWwge1xuICAgICAgICBDaGVja0dhbWVPdmVyXG4gICAgfVxuICAgIFV0aWwuRW51bS5jb252ZXJ0MkV2ZW50RW51bShNb2RlbCk7XG5cbiAgICBleHBvcnQgZW51bSBVSSB7XG4gICAgICAgIC8qKumSseWPkeeUn+S6huWPmOWKqCAqL1xuICAgICAgICBVcGRhdGVDdXJyZW5jeSxcbiAgICAgICAgSGlkZURvY2ssXG4gICAgICAgIFNob3dEb2NrLFxuICAgICAgICBQcm9wQ291bnQsXG4gICAgICAgIFVwZGF0ZUluZm9QYW5lbCxcbiAgICAgICAgQ29sbGVjdENvbXBsZXQsXG4gICAgICAgIFVwZGF0ZUx2LFxuICAgICAgICBDaGFuZ2VTY2VuZSxcbiAgICAgICAgQ2xvc2VUdXRvcmlhbCxcbiAgICAgICAgVXBkYXRlVG1wTG9hZGluZ1Byb2dyZXNzLFxuICAgICAgICAvLyBTaG93U2VsZWN0TGV2ZWxWaWV3LFxuICAgICAgICBIaWRlU2VsZWN0TGV2ZWxWaWV3LFxuICAgICAgICBBZGRTY29yZSxcbiAgICAgICAgVXBkYXRlUmVtYWluQWRkUG93ZXJUaW1lLFxuICAgICAgICB1cGRhdGVCb3hTdGF0ZSxcbiAgICAgICAgU2hvd0JhZ1RpcHMsXG4gICAgICAgIE1hcE1lbnVVcGRhdGUsICAgICAgICAgIC8v5rW35bKb55WM6Z2iVUnmm7TmlrBcbiAgICAgICAgTGV2ZWxTY2VuZVRvdWNoZWQsICAgICAgLy9sZXZlbOWcuuaZr+aYr+WQpuWPr+S7peiiq+eCueWHu1xuICAgICAgICBDaGFwdGVyVW5sb2NrLCAgICAgICAgICAvL+eroOiKguino+mUgSAgIFxuXG4gICAgfVxuICAgIFV0aWwuRW51bS5jb252ZXJ0MkV2ZW50RW51bShVSSk7XG5cbiAgICBleHBvcnQgZW51bSBFZmZlY3Qge1xuICAgICAgICBMaXR0bGVCb21iLFxuICAgICAgICBTcGVlZExpbmUsXG4gICAgICAgIENvbWJvLFxuICAgICAgICBTaG9vdFN0YXIsXG4gICAgICAgIE92ZXJTaG9vdCxcbiAgICAgICAgU2hvd0RvdCxcbiAgICAgICAgQnJva2VuLFxuICAgICAgICBCb3hCcm9rZW4sXG4gICAgICAgIENvbGxlY3RPdmVyLFxuICAgICAgICBBZGRTY29yZVxuICAgIH1cbiAgICBVdGlsLkVudW0uY29udmVydDJFdmVudEVudW0oRWZmZWN0KTtcblxuICAgIGV4cG9ydCBlbnVtIEdhbWVDTUQge1xuICAgICAgICBNYWluQ01ELFxuICAgICAgICBFeGNoYW5nZSxcbiAgICAgICAgRWxpbWF0ZSxcbiAgICAgICAgQ0JvbWJfUmFpbmJvd0ZseSxcbiAgICAgICAgQWRkTmV3Q2VsbCxcbiAgICAgICAgTW92ZUdyaWQsXG4gICAgICAgIEdhbWVSZXN1bWUsXG4gICAgICAgIEdhbWVPdmVyLFxuICAgICAgICBDaGFuZ2VDZWxsLFxuICAgICAgICBQcm9wQ2xpY2ssXG4gICAgICAgIFByb3BVc2VkLFxuICAgICAgICBQcm9tcHRDYW5FbGltYXRlLFxuICAgICAgICBTdG9wUHJvbXB0cyxcbiAgICAgICAgRW5lcmd5U3RvcmFnZSxcbiAgICAgICAgU3BlQ29sbGVjdCxcbiAgICAgICAgR2FtZVJlc2V0LFxuICAgICAgICBHYW1lVHV0b3JpYWwsXG4gICAgICAgIFVwZGF0ZUNvbXBsZXhWaWV3LFxuICAgICAgICBVcGRhdGVDb2xsZWN0UG93ZXIsXG4gICAgICAgIFNob3dHYW1lUmVzdWx0LFxuICAgICAgICBHYW1lT3ZlckZhbGwsXG4gICAgICAgIEdhbWVHZXRTdGVwQ29udGludWUsLy/liIbkuqvngrnlh7vkuobojrflvpfmraXmlbDnu6fnu63muLjmiI9cbiAgICB9XG4gICAgVXRpbC5FbnVtLmNvbnZlcnQyRXZlbnRFbnVtKEdhbWVDTUQpO1xuXG4gICAgZXhwb3J0IGVudW0gU3lzdGVtIHtcbiAgICAgICAgQ2FjaGVXYXJuaW5nXG4gICAgfVxuICAgIFV0aWwuRW51bS5jb252ZXJ0MkV2ZW50RW51bShTeXN0ZW0pO1xuXG4gICAgZXhwb3J0IGVudW0gTWFwIHtcbiAgICAgICAgQ2FtZXJhTW92ZVRvLFxuICAgICAgICBNYXBUb3VjaE1vdmVFbmFibGUsXG4gICAgICAgIFdhbGtFbmQsXG4gICAgICAgIFNob3dUb29sLFxuICAgICAgICBIaWRlVG9vbCxcbiAgICAgICAgVW5Mb2NrLFxuICAgICAgICBTaG93TG9jayxcbiAgICAgICAgVXBncmFkZSxcbiAgICAgICAgVW5Mb2NrSXNsYW5kLCAvL+ino+mUgea1t+Wym+WKqOeUu1xuICAgICAgICBHdWlkZU1hc2ssXG4gICAgfVxuICAgIFV0aWwuRW51bS5jb252ZXJ0MkV2ZW50RW51bShNYXApO1xuXG4gICAgZXhwb3J0IGVudW0gR3VpZGUge1xuICAgICAgICBSZXBsYWNlTWFwT2JqXG4gICAgfVxuICAgIFV0aWwuRW51bS5jb252ZXJ0MkV2ZW50RW51bShHdWlkZSk7XG5cbiAgICBleHBvcnQgZW51bSBIb3RlbCB7XG4gICAgICAgIFVJUm9vbVVubG9jaywgICAgICAvL+eJqeS7tuino+mUgemdouadvyBcbiAgICAgICAgU2xvdFVubG9jaywgICAgICAgIC8v54mp5Lu26LSt5Lmw5oiQ5Yqf6Kej6ZSBXG4gICAgICAgIE1hcFNjcm9sbEJlZ2luLCAgICAvL+mFkuW6l+WcsOWbvuW8gOWni+a7muWKqOS6i+S7tiBcbiAgICAgICAgUm9vbUZpbmlzaGVkLCAgICAgIC8v6YWS5bqX5oi/6Ze05YWo6YOo6Kej6ZSB5a6M5q+VIFxuICAgICAgICBTaG93U3ViU2xvdCwgICAgICAgLy/lsZXnpLrlpJrkuKrlrZDpg6jku7bor6bmg4VcbiAgICAgICAgSGlkZVN1YlNsb3QsXG4gICAgICAgIFVwYXRlU3ViU2xvdFN0YXRlLFxuICAgICAgICBTaG93R3Vlc3RSb29tLFxuICAgICAgICBUb3VjaFNsb3RJY29uLFxuICAgICAgICBDaGFuZ2VTbG90LFxuICAgICAgICBTZWxlY3RTdWJTbG90XG4gICAgfVxuICAgIFV0aWwuRW51bS5jb252ZXJ0MkV2ZW50RW51bShIb3RlbCk7XG5cbiAgICBleHBvcnQgZW51bSBEYWlseVRhc2sge1xuICAgICAgICBVcGRhdGVQcm9ncmVzcyxcbiAgICAgICAgVXBkYXRlVGltZXJUYXNrQWN0aXZlLFxuICAgICAgICBVcGRhdGVUYXNrS2V5XG4gICAgfVxuICAgIFV0aWwuRW51bS5jb252ZXJ0MkV2ZW50RW51bShEYWlseVRhc2spO1xufVxuIl19