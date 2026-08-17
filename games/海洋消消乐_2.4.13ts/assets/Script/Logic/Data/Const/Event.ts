import { Util } from "../../../Base/Utils/Util";

/**声音事件*/
export namespace Event {

    export enum Sound {
        PlaySoundEff,
        PlayBGM,
        StopBGM,
        UpdateOpt
    }
    Util.Enum.convert2EventEnum(Sound);

    export enum Model {
        CheckGameOver
    }
    Util.Enum.convert2EventEnum(Model);

    export enum UI {
        /**钱发生了变动 */
        UpdateCurrency,
        HideDock,
        ShowDock,
        PropCount,
        UpdateInfoPanel,
        CollectComplet,
        UpdateLv,
        ChangeScene,
        CloseTutorial,
        UpdateTmpLoadingProgress,
        // ShowSelectLevelView,
        HideSelectLevelView,
        AddScore,
        UpdateRemainAddPowerTime,
        updateBoxState,
        ShowBagTips,
        MapMenuUpdate,          //海岛界面UI更新
        LevelSceneTouched,      //level场景是否可以被点击
        ChapterUnlock,          //章节解锁   

    }
    Util.Enum.convert2EventEnum(UI);

    export enum Effect {
        LittleBomb,
        SpeedLine,
        Combo,
        ShootStar,
        OverShoot,
        ShowDot,
        Broken,
        BoxBroken,
        CollectOver,
        AddScore
    }
    Util.Enum.convert2EventEnum(Effect);

    export enum GameCMD {
        MainCMD,
        Exchange,
        Elimate,
        CBomb_RainbowFly,
        AddNewCell,
        MoveGrid,
        GameResume,
        GameOver,
        ChangeCell,
        PropClick,
        PropUsed,
        PromptCanElimate,
        StopPrompts,
        EnergyStorage,
        SpeCollect,
        GameReset,
        GameTutorial,
        UpdateComplexView,
        UpdateCollectPower,
        ShowGameResult,
        GameOverFall,
        GameGetStepContinue,//分享点击了获得步数继续游戏
    }
    Util.Enum.convert2EventEnum(GameCMD);

    export enum System {
        CacheWarning
    }
    Util.Enum.convert2EventEnum(System);

    export enum Map {
        CameraMoveTo,
        MapTouchMoveEnable,
        WalkEnd,
        ShowTool,
        HideTool,
        UnLock,
        ShowLock,
        Upgrade,
        UnLockIsland, //解锁海岛动画
        GuideMask,
    }
    Util.Enum.convert2EventEnum(Map);

    export enum Guide {
        ReplaceMapObj
    }
    Util.Enum.convert2EventEnum(Guide);

    export enum Hotel {
        UIRoomUnlock,      //物件解锁面板 
        SlotUnlock,        //物件购买成功解锁
        MapScrollBegin,    //酒店地图开始滚动事件 
        RoomFinished,      //酒店房间全部解锁完毕 
        ShowSubSlot,       //展示多个子部件详情
        HideSubSlot,
        UpateSubSlotState,
        ShowGuestRoom,
        TouchSlotIcon,
        ChangeSlot,
        SelectSubSlot
    }
    Util.Enum.convert2EventEnum(Hotel);

    export enum DailyTask {
        UpdateProgress,
        UpdateTimerTaskActive,
        UpdateTaskKey
    }
    Util.Enum.convert2EventEnum(DailyTask);
}
