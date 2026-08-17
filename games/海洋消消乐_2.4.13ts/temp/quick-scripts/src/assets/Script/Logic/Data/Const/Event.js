"use strict";
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