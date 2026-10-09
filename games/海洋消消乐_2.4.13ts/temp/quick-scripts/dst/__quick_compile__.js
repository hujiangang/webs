
(function () {
var scripts = [{"deps":{"./assets/Script/Application/Apps":33,"./assets/Script/Application/Loading/LoadingScene":5,"./assets/Script/Debug/test":6,"./assets/Script/Debug/SpecialValidation":32,"./assets/Script/Framework/Async/withTimeout":10,"./assets/Script/Framework/Components/SpinePlayerCtrl":39,"./assets/Script/Framework/Components/TTMask":38,"./assets/Script/Framework/Components/SlideButton":13,"./assets/Script/Framework/Events/EventMgr":1,"./assets/Script/Framework/FrameworkOptions":36,"./assets/Script/Framework/Network/NetBase":12,"./assets/Script/Framework/Network/Sequence":34,"./assets/Script/Framework/Network/Socket":37,"./assets/Script/Framework/Network/HttpRequest":40,"./assets/Script/Framework/Pool/NodePoolMgr":14,"./assets/Script/Framework/Pool/DataPool":42,"./assets/Script/Framework/Resources/CacheMgr":15,"./assets/Script/Framework/Shader/ShaderTime":43,"./assets/Script/Framework/Shader/ShaderHelper":17,"./assets/Script/Framework/Utils/Log":16,"./assets/Script/Framework/Utils/MemoryDetector":45,"./assets/Script/Framework/Utils/NumberUtils":41,"./assets/Script/Framework/Utils/RoadUtil":47,"./assets/Script/Framework/Utils/SingletonFactory":53,"./assets/Script/Framework/Utils/Util":44,"./assets/Script/Framework/Utils/LRUCache":51,"./assets/Script/ThirdParty/console.save":18,"./assets/Script/Application/GameBootstrap":48,"./assets/Script/Game/Common/Common":52,"./assets/Script/Game/Common/CommonEnums":49,"./assets/Script/Game/Common/CommonInterfaces":46,"./assets/Script/Game/Common/GroupAnimatCtrl":57,"./assets/Script/Game/Common/ActionCtrl":58,"./assets/Script/Game/Common/Components/Button":7,"./assets/Script/Game/Common/UI/BagGridItemCtrl":50,"./assets/Script/Game/Common/UI/BoxGiftCtrl":55,"./assets/Script/Game/Common/UI/BoxOpenCtrl":59,"./assets/Script/Game/Common/UI/BoxTipsCtrl":54,"./assets/Script/Game/Common/UI/BuyPowerCtrl":56,"./assets/Script/Game/Common/UI/BuyPropPanel":60,"./assets/Script/Game/Common/UI/DialogPanel":61,"./assets/Script/Game/Common/UI/ForestUI":63,"./assets/Script/Game/Common/UI/GameFailEncouragePanel":62,"./assets/Script/Game/Common/UI/MoreCoin":65,"./assets/Script/Game/Common/UI/OverHightLightCtrl":64,"./assets/Script/Game/Common/UI/PlayerPanels":68,"./assets/Script/Game/Common/UI/SettingViewCtrl":67,"./assets/Script/Game/Common/UI/StoryTalkPanel":69,"./assets/Script/Game/Common/UI/TempLoadingPanel":71,"./assets/Script/Game/Common/UI/ToyArt":73,"./assets/Script/Game/Common/UI/UIBase":75,"./assets/Script/Game/Common/UI/UIMgr":76,"./assets/Script/Game/Common/UI/BagCtrl":74,"./assets/Script/Game/Common/UI/dailyTask/DailyItem":2,"./assets/Script/Game/Common/UI/dailyTask/DailyTaskPanel":66,"./assets/Script/Game/Common/UI/dailyTask/TimerTaskItem":72,"./assets/Script/Game/Common/UI/dailyTask/CustomTaskItem":70,"./assets/Script/Game/Common/UI/notify/NotifyRewardItemCtrl":22,"./assets/Script/Game/Common/UI/notify/NotifyPanel":79,"./assets/Script/Game/Common/UI/shop/ShopToolsItemCtrl":80,"./assets/Script/Game/Common/UI/shop/ShopPanel":20,"./assets/Script/Game/Common/Views/View":77,"./assets/Script/Game/Common/Views/Tips":19,"./assets/Script/Game/Config/Paths":83,"./assets/Script/Game/Config/GameTableMgr":84,"./assets/Script/Game/Config/Loader/BytesTable":8,"./assets/Script/Game/Config/Loader/BaseTable":82,"./assets/Script/Game/Config/Tables/ChapterInfo":21,"./assets/Script/Game/Config/Tables/ChapterStory":78,"./assets/Script/Game/Config/Tables/DailyTaskInfo":88,"./assets/Script/Game/Config/Tables/LevelUpReward":81,"./assets/Script/Game/Config/Tables/PropInfo":87,"./assets/Script/Game/Config/Tables/ShareCfg":90,"./assets/Script/Game/Config/Tables/ShopInfo":85,"./assets/Script/Game/Config/Tables/Titles":93,"./assets/Script/Game/Config/Tables/BoxRewardInfo":92,"./assets/Script/Game/Data/RuntimeMgr":86,"./assets/Script/Game/Data/StorageMgr":89,"./assets/Script/Game/Data/Const/Constant":100,"./assets/Script/Game/Data/Const/Event":25,"./assets/Script/Game/Data/Const/TimeConfig":91,"./assets/Script/Game/Data/Const/BaseConst":95,"./assets/Script/Game/Data/Interface/Tutorial":97,"./assets/Script/Game/Data/Interface/UIData":98,"./assets/Script/Game/Data/Interface/Level":104,"./assets/Script/Game/Data/Interface/Level/ITutorial":96,"./assets/Script/Game/Data/Interface/Level/ILevel":3,"./assets/Script/Game/Data/MoneyManager":94,"./assets/Script/Game/Data/Player/PlayerInfo":26,"./assets/Script/Game/Home/HomeScene":101,"./assets/Script/Game/Home/LobbyCatalog":23,"./assets/Script/Game/Home/HomeNavigation":99,"./assets/Script/Game/Match3/ResCtrl":102,"./assets/Script/Game/Match3/Config/ResourcePath":27,"./assets/Script/Game/Match3/Control/RotatingCtrl":24,"./assets/Script/Game/Match3/Control/TaskCtrl":103,"./assets/Script/Game/Match3/Control/LockCtrl":105,"./assets/Script/Game/Match3/MainCtrl":109,"./assets/Script/Game/Match3/Model/CellBase":106,"./assets/Script/Game/Match3/Model/CellModel":108,"./assets/Script/Game/Match3/Model/CollectModel":112,"./assets/Script/Game/Match3/Model/EnergyModel":107,"./assets/Script/Game/Match3/Model/GameModel":122,"./assets/Script/Game/Match3/Model/GameTaskModel":110,"./assets/Script/Game/Match3/Model/GroundCellModel":115,"./assets/Script/Game/Match3/Model/GroundModel":111,"./assets/Script/Game/Match3/Model/MultipleGridColModel":116,"./assets/Script/Game/Match3/Model/PropModel":118,"./assets/Script/Game/Match3/Model/SpecialCell":114,"./assets/Script/Game/Match3/Model/UpGroundCellModel":119,"./assets/Script/Game/Match3/Model/UpGroundModel":121,"./assets/Script/Game/Match3/Model/BombModel":124,"./assets/Script/Game/Match3/Model/SpecialPlug/Girl":113,"./assets/Script/Game/Match3/Model/SpecialPlug/Mushroom":4,"./assets/Script/Game/Match3/Model/SpecialPlug/Conveyer":117,"./assets/Script/Game/Match3/Model/multipleGridCol/GnomeModel":28,"./assets/Script/Game/Match3/Model/multipleGridCol/MultipleGridColBase":120,"./assets/Script/Game/Match3/Model/multipleGridCol/TurtlesModel":125,"./assets/Script/Game/Match3/Model/multipleGridCol/CrabModel":127,"./assets/Script/Game/Match3/Skin/Match3Skin":29,"./assets/Script/Game/Match3/View/BaseView":123,"./assets/Script/Game/Match3/View/BasicCellViewCtrl":126,"./assets/Script/Game/Match3/View/EffLayerCtrl":129,"./assets/Script/Game/Match3/View/EffectTimeline":130,"./assets/Script/Game/Match3/View/GroundViewCtrl":132,"./assets/Script/Game/Match3/View/ItemBasicCellCtrl":137,"./assets/Script/Game/Match3/View/ItemGroundCtrl":131,"./assets/Script/Game/Match3/View/ItemUpgroundCtrl":128,"./assets/Script/Game/Match3/View/Match3TutorialCtrl":133,"./assets/Script/Game/Match3/View/SpecialEffects":135,"./assets/Script/Game/Match3/View/SpecialPieceArt":136,"./assets/Script/Game/Match3/View/TouchHintCtrl":134,"./assets/Script/Game/Match3/View/TutorialBorderCtrl":138,"./assets/Script/Game/Match3/View/TutorialBubbleCtrl":141,"./assets/Script/Game/Match3/View/UpGroundViewCtrl":140,"./assets/Script/Game/Match3/View/BaseItemView":139,"./assets/Script/Game/Match3/View/Comp/Tuituji":9,"./assets/Script/Game/Match3/View/UI/InfoPanelCtrl":145,"./assets/Script/Game/Match3/View/UI/MainUiCtrl":147,"./assets/Script/Game/Match3/View/UI/PropCtrl":31,"./assets/Script/Game/Match3/View/UI/PropItemCtrl":150,"./assets/Script/Game/Match3/View/UI/SelectPropCtrl":155,"./assets/Script/Game/Match3/View/UI/CollectItemCtrl":153,"./assets/Script/Game/Platform/PlatformMgr":142,"./assets/Script/Game/Platform/Adapters/Webapp":11,"./assets/Script/Game/Platform/Adapters/Wechat":151,"./assets/Script/Game/Platform/Adapters/IPlatform":149,"./assets/Script/Game/Platform/DeviceMgr":143,"./assets/Script/Game/Services/NetMgr":148,"./assets/Script/Game/Services/ReportMgr":30,"./assets/Script/Game/Services/ShareMgr":144,"./assets/Script/Game/Services/DailyTaskMgr":146,"./assets/Script/Game/Views/GMView":156,"./assets/Script/Game/Views/PropDropView":157,"./assets/Script/Game/Views/CommonRewardView":35,"./assets/Script/Game/Common/AudioCtrl":154,"./assets/Script/Application/M":152},"path":"preview-scripts/__qc_index__.js"},{"deps":{"../Pool/DataPool":42,"../Utils/SingletonFactory":53},"path":"preview-scripts/assets/Script/Framework/Events/EventMgr.js"},{"deps":{"../../../../Application/M":152,"../../../Data/Const/Constant":100,"../../../Data/StorageMgr":89,"../../../Services/DailyTaskMgr":146,"../../../Data/Interface/UIData":98},"path":"preview-scripts/assets/Script/Game/Common/UI/dailyTask/DailyItem.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Data/Interface/Level/ILevel.js"},{"deps":{"../GameModel":122},"path":"preview-scripts/assets/Script/Game/Match3/Model/SpecialPlug/Mushroom.js"},{"deps":{"../Apps":33,"../GameBootstrap":48,"../../Game/Common/Common":52,"../../Game/Data/Const/Constant":100},"path":"preview-scripts/assets/Script/Application/Loading/LoadingScene.js"},{"deps":{"../Framework/Events/EventMgr":1,"../Framework/Network/HttpRequest":40,"../Framework/Network/Socket":37,"../Game/Data/Const/Event":25,"../Game/Config/GameTableMgr":84,"../Game/Data/RuntimeMgr":86,"../Game/Data/Const/BaseConst":95,"../Game/Data/Interface/Level":104},"path":"preview-scripts/assets/Script/Debug/test.js"},{"deps":{"../../../Framework/Events/EventMgr":1,"../../Data/Const/Event":25,"../AudioCtrl":154},"path":"preview-scripts/assets/Script/Game/Common/Components/Button.js"},{"deps":{"../Paths":83},"path":"preview-scripts/assets/Script/Game/Config/Loader/BytesTable.js"},{"deps":{"../../Model/GameModel":122,"../../../Common/GroupAnimatCtrl":57,"../../../Data/Const/Constant":100},"path":"preview-scripts/assets/Script/Game/Match3/View/Comp/Tuituji.js"},{"deps":{},"path":"preview-scripts/assets/Script/Framework/Async/withTimeout.js"},{"deps":{"../../Data/Const/BaseConst":95,"../../../Framework/Utils/Log":16,"../../Data/StorageMgr":89},"path":"preview-scripts/assets/Script/Game/Platform/Adapters/Webapp.js"},{"deps":{"./Sequence":34},"path":"preview-scripts/assets/Script/Framework/Network/NetBase.js"},{"deps":{},"path":"preview-scripts/assets/Script/Framework/Components/SlideButton.js"},{"deps":{"../Utils/SingletonFactory":53},"path":"preview-scripts/assets/Script/Framework/Pool/NodePoolMgr.js"},{"deps":{"../Utils/SingletonFactory":53},"path":"preview-scripts/assets/Script/Framework/Resources/CacheMgr.js"},{"deps":{"../FrameworkOptions":36},"path":"preview-scripts/assets/Script/Framework/Utils/Log.js"},{"deps":{},"path":"preview-scripts/assets/Script/Framework/Shader/ShaderHelper.js"},{"deps":{},"path":"preview-scripts/assets/Script/ThirdParty/console.save.js"},{"deps":{"./View":77},"path":"preview-scripts/assets/Script/Game/Common/Views/Tips.js"},{"deps":{"../UIBase":75,"../../../Data/Interface/UIData":98,"../../../../Application/M":152,"./ShopToolsItemCtrl":80},"path":"preview-scripts/assets/Script/Game/Common/UI/shop/ShopPanel.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Config/Tables/ChapterInfo.js"},{"deps":{"../../Common":52,"../../../Data/Const/Constant":100,"../../../Data/Const/BaseConst":95},"path":"preview-scripts/assets/Script/Game/Common/UI/notify/NotifyRewardItemCtrl.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Home/LobbyCatalog.js"},{"deps":{"../../Data/Const/TimeConfig":91},"path":"preview-scripts/assets/Script/Game/Match3/Control/RotatingCtrl.js"},{"deps":{"../../../Framework/Utils/Util":44},"path":"preview-scripts/assets/Script/Game/Data/Const/Event.js"},{"deps":{"../Const/Constant":100,"../StorageMgr":89},"path":"preview-scripts/assets/Script/Game/Data/Player/PlayerInfo.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Match3/Config/ResourcePath.js"},{"deps":{"./MultipleGridColBase":120,"../../../Common/Common":52},"path":"preview-scripts/assets/Script/Game/Match3/Model/multipleGridCol/GnomeModel.js"},{"deps":{"../../Common/Common":52,"../Config/ResourcePath":27},"path":"preview-scripts/assets/Script/Game/Match3/Skin/Match3Skin.js"},{"deps":{"../Config/Paths":83,"../../Framework/Utils/Util":44,"../../Application/M":152,"../../Framework/Network/HttpRequest":40,"../../Application/Apps":33,"../Data/Const/BaseConst":95},"path":"preview-scripts/assets/Script/Game/Services/ReportMgr.js"},{"deps":{"../../../../Application/M":152,"./PropItemCtrl":150,"../../../Data/Const/Constant":100},"path":"preview-scripts/assets/Script/Game/Match3/View/UI/PropCtrl.js"},{"deps":{},"path":"preview-scripts/assets/Script/Debug/SpecialValidation.js"},{"deps":{"../Framework/FrameworkOptions":36,"../Framework/Utils/Util":44},"path":"preview-scripts/assets/Script/Application/Apps.js"},{"deps":{},"path":"preview-scripts/assets/Script/Framework/Network/Sequence.js"},{"deps":{"../Common/UI/UIBase":75,"../Common/UI/UIMgr":76,"../Data/Interface/UIData":98,"../../Application/M":152},"path":"preview-scripts/assets/Script/Game/Views/CommonRewardView.js"},{"deps":{},"path":"preview-scripts/assets/Script/Framework/FrameworkOptions.js"},{"deps":{"./NetBase":12,"../Utils/Log":16},"path":"preview-scripts/assets/Script/Framework/Network/Socket.js"},{"deps":{},"path":"preview-scripts/assets/Script/Framework/Components/TTMask.js"},{"deps":{},"path":"preview-scripts/assets/Script/Framework/Components/SpinePlayerCtrl.js"},{"deps":{"./NetBase":12,"../Utils/Log":16,"../FrameworkOptions":36},"path":"preview-scripts/assets/Script/Framework/Network/HttpRequest.js"},{"deps":{},"path":"preview-scripts/assets/Script/Framework/Utils/NumberUtils.js"},{"deps":{},"path":"preview-scripts/assets/Script/Framework/Pool/DataPool.js"},{"deps":{},"path":"preview-scripts/assets/Script/Framework/Shader/ShaderTime.js"},{"deps":{},"path":"preview-scripts/assets/Script/Framework/Utils/Util.js"},{"deps":{},"path":"preview-scripts/assets/Script/Framework/Utils/MemoryDetector.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Common/CommonInterfaces.js"},{"deps":{},"path":"preview-scripts/assets/Script/Framework/Utils/RoadUtil.js"},{"deps":{"./M":152,"../Game/Data/Const/Constant":100,"../Game/Config/GameTableMgr":84,"../Game/Config/Paths":83,"../Game/Config/Tables/DailyTaskInfo":88,"../Game/Config/Loader/BaseTable":82,"../Framework/Async/withTimeout":10},"path":"preview-scripts/assets/Script/Application/GameBootstrap.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Common/CommonEnums.js"},{"deps":{"../../../Application/M":152,"../../Data/Const/Event":25,"../Common":52},"path":"preview-scripts/assets/Script/Game/Common/UI/BagGridItemCtrl.js"},{"deps":{},"path":"preview-scripts/assets/Script/Framework/Utils/LRUCache.js"},{"deps":{"../Match3/Model/GameModel":122,"../../Framework/Utils/Util":44,"../Data/Const/Constant":100,"../../Framework/Pool/NodePoolMgr":14,"../../Framework/Components/SpinePlayerCtrl":39,"../../Application/M":152},"path":"preview-scripts/assets/Script/Game/Common/Common.js"},{"deps":{},"path":"preview-scripts/assets/Script/Framework/Utils/SingletonFactory.js"},{"deps":{"../../../Application/M":152,"../../Data/Const/Constant":100,"../../Data/Const/BaseConst":95,"../Common":52,"../../../Framework/Utils/Util":44},"path":"preview-scripts/assets/Script/Game/Common/UI/BoxTipsCtrl.js"},{"deps":{"../../../Application/M":152,"../Common":52,"../../../Framework/Utils/Util":44,"../../Data/Interface/UIData":98,"../../Data/Const/Event":25,"./BoxTipsCtrl":54},"path":"preview-scripts/assets/Script/Game/Common/UI/BoxGiftCtrl.js"},{"deps":{"../../../Application/M":152,"../../Data/Const/Constant":100,"../../Data/Const/BaseConst":95,"../Common":52,"../../Data/Const/Event":25,"../../../Framework/Utils/Util":44,"../../Data/MoneyManager":94},"path":"preview-scripts/assets/Script/Game/Common/UI/BuyPowerCtrl.js"},{"deps":{"../../Framework/Utils/SingletonFactory":53,"../Match3/Model/GameModel":122,"./Common":52,"../Data/Const/TimeConfig":91,"../../Application/M":152,"../Data/Const/Event":25,"../Data/Const/Constant":100,"../../Framework/Utils/Util":44,"./AudioCtrl":154},"path":"preview-scripts/assets/Script/Game/Common/GroupAnimatCtrl.js"},{"deps":{"../../Framework/Utils/SingletonFactory":53,"../Match3/Model/GameModel":122,"./Common":52,"../../Framework/Utils/Util":44,"../Data/Const/TimeConfig":91,"../Data/Const/Constant":100},"path":"preview-scripts/assets/Script/Game/Common/ActionCtrl.js"},{"deps":{"./UIBase":75,"../../../Application/M":152,"../../Data/Interface/UIData":98,"../../Data/Const/Event":25,"../../../Framework/Events/EventMgr":1,"../AudioCtrl":154},"path":"preview-scripts/assets/Script/Game/Common/UI/BoxOpenCtrl.js"},{"deps":{"./UIBase":75,"../../Data/Const/Constant":100,"../../../Application/M":152,"../Common":52,"../../Data/Interface/UIData":98,"../../Services/ReportMgr":30},"path":"preview-scripts/assets/Script/Game/Common/UI/BuyPropPanel.js"},{"deps":{"./ForestUI":63,"../../../Application/M":152,"./UIBase":75,"./UIMgr":76,"../../Data/Interface/UIData":98,"../../Match3/View/UI/CollectItemCtrl":153,"../../Data/Const/Event":25,"../../Data/Const/Constant":100,"../../../Framework/Components/SlideButton":13,"../../Data/RuntimeMgr":86,"../Common":52,"../../../Framework/Events/EventMgr":1,"../../Data/Const/BaseConst":95,"../../Match3/View/UI/SelectPropCtrl":155,"../../Data/StorageMgr":89,"../../Services/ShareMgr":144,"../AudioCtrl":154},"path":"preview-scripts/assets/Script/Game/Common/UI/DialogPanel.js"},{"deps":{"./ForestUI":63,"./UIBase":75,"../../../Application/M":152,"../Common":52,"../../Data/Interface/UIData":98,"../../Data/Const/BaseConst":95,"../../Data/Const/Event":25,"../../Match3/Model/GameModel":122,"../../Data/StorageMgr":89,"../../Data/Const/Constant":100,"../../../Framework/Events/EventMgr":1,"../../Config/Paths":83,"../../Match3/ResCtrl":102},"path":"preview-scripts/assets/Script/Game/Common/UI/GameFailEncouragePanel.js"},{"deps":{"./ToyArt":73,"../../Match3/View/SpecialPieceArt":136},"path":"preview-scripts/assets/Script/Game/Common/UI/ForestUI.js"},{"deps":{"../../Match3/Model/GameModel":122,"../../../Application/M":152,"../../Data/Const/Event":25},"path":"preview-scripts/assets/Script/Game/Common/UI/OverHightLightCtrl.js"},{"deps":{"./UIBase":75,"./UIMgr":76,"../../Data/Interface/UIData":98},"path":"preview-scripts/assets/Script/Game/Common/UI/MoreCoin.js"},{"deps":{"../UIBase":75,"../../../../Application/M":152,"../../../Data/Interface/UIData":98,"./DailyItem":2,"./TimerTaskItem":72,"../../../Data/Const/Event":25,"../../../../Framework/Utils/Util":44,"./CustomTaskItem":70,"../../../Services/DailyTaskMgr":146},"path":"preview-scripts/assets/Script/Game/Common/UI/dailyTask/DailyTaskPanel.js"},{"deps":{"../../Data/Const/Constant":100,"../../../Application/M":152,"../../Data/Const/Event":25,"../Common":52,"../../Data/Interface/UIData":98,"../../Data/StorageMgr":89,"../../Services/ReportMgr":30,"../../Match3/Model/GameModel":122},"path":"preview-scripts/assets/Script/Game/Common/UI/SettingViewCtrl.js"},{"deps":{"./ForestUI":63,"../../../Application/M":152,"../../Data/Const/Event":25,"../../Data/Const/Constant":100,"../../Data/StorageMgr":89,"../Common":52,"../../Home/LobbyCatalog":23},"path":"preview-scripts/assets/Script/Game/Common/UI/PlayerPanels.js"},{"deps":{"./UIBase":75,"./UIMgr":76,"../../Data/Interface/UIData":98},"path":"preview-scripts/assets/Script/Game/Common/UI/StoryTalkPanel.js"},{"deps":{"../../../Services/DailyTaskMgr":146,"../../../../Application/M":152,"../../../Data/Const/Event":25,"../../../Data/Interface/UIData":98},"path":"preview-scripts/assets/Script/Game/Common/UI/dailyTask/CustomTaskItem.js"},{"deps":{"../../Data/Const/Constant":100,"../../../Framework/Utils/Util":44,"../../../Framework/Events/EventMgr":1,"../../Data/Const/Event":25,"./UIBase":75},"path":"preview-scripts/assets/Script/Game/Common/UI/TempLoadingPanel.js"},{"deps":{"../../../Data/StorageMgr":89,"../../../../Application/M":152,"../../../Data/Const/Event":25,"../../../../Framework/Utils/Util":44,"../../../Data/Interface/UIData":98},"path":"preview-scripts/assets/Script/Game/Common/UI/dailyTask/TimerTaskItem.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Common/UI/ToyArt.js"},{"deps":{"./UIBase":75,"./UIMgr":76,"../../Data/Interface/UIData":98,"../../../Application/M":152,"./BagGridItemCtrl":50,"../../Data/Const/Constant":100,"../../Data/Const/Event":25,"../../Data/Const/BaseConst":95,"../Common":52},"path":"preview-scripts/assets/Script/Game/Common/UI/BagCtrl.js"},{"deps":{"../../../Framework/Events/EventMgr":1},"path":"preview-scripts/assets/Script/Game/Common/UI/UIBase.js"},{"deps":{"./UIBase":75,"../../Data/Interface/UIData":98,"../../../Framework/Utils/Log":16,"../../../Framework/Utils/LRUCache":51,"../../../Framework/Events/EventMgr":1,"../../Data/Const/BaseConst":95,"../../Data/Const/Event":25},"path":"preview-scripts/assets/Script/Game/Common/UI/UIMgr.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Common/Views/View.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Config/Tables/ChapterStory.js"},{"deps":{"../UIBase":75,"../../../../Application/M":152,"../UIMgr":76,"../../../Data/Interface/UIData":98,"./NotifyRewardItemCtrl":22,"../BoxTipsCtrl":54},"path":"preview-scripts/assets/Script/Game/Common/UI/notify/NotifyPanel.js"},{"deps":{"../../Common":52,"../../../Data/MoneyManager":94,"../../../../Application/M":152},"path":"preview-scripts/assets/Script/Game/Common/UI/shop/ShopToolsItemCtrl.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Config/Tables/LevelUpReward.js"},{"deps":{"./BytesTable":8,"../../../Framework/Utils/Util":44,"../../../Framework/Utils/Log":16},"path":"preview-scripts/assets/Script/Game/Config/Loader/BaseTable.js"},{"deps":{"../../Application/Apps":33},"path":"preview-scripts/assets/Script/Game/Config/Paths.js"},{"deps":{"./Loader/BaseTable":82,"../../Framework/Utils/SingletonFactory":53,"./Tables/Titles":93,"./Tables/ChapterStory":78,"./Tables/ChapterInfo":21,"./Tables/PropInfo":87,"./Tables/BoxRewardInfo":92,"./Tables/LevelUpReward":81,"./Tables/ShareCfg":90,"./Tables/ShopInfo":85},"path":"preview-scripts/assets/Script/Game/Config/GameTableMgr.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Config/Tables/ShopInfo.js"},{"deps":{"./StorageMgr":89,"./Player/PlayerInfo":26,"./Const/Event":25,"./Const/Constant":100,"./Const/BaseConst":95,"../../Application/Apps":33,"../../Application/M":152,"../Services/DailyTaskMgr":146,"../Services/ReportMgr":30,"../Common/Common":52,"../../Framework/Events/EventMgr":1,"../../Framework/Utils/SingletonFactory":53},"path":"preview-scripts/assets/Script/Game/Data/RuntimeMgr.js"},{"deps":{"../../Data/Const/BaseConst":95},"path":"preview-scripts/assets/Script/Game/Config/Tables/PropInfo.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Config/Tables/DailyTaskInfo.js"},{"deps":{"../Services/NetMgr":148,"../Platform/PlatformMgr":142,"./Const/BaseConst":95},"path":"preview-scripts/assets/Script/Game/Data/StorageMgr.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Config/Tables/ShareCfg.js"},{"deps":{"../../../Framework/Utils/Util":44,"./Constant":100},"path":"preview-scripts/assets/Script/Game/Data/Const/TimeConfig.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Config/Tables/BoxRewardInfo.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Config/Tables/Titles.js"},{"deps":{"./Const/BaseConst":95,"../../Application/M":152,"./Const/Constant":100},"path":"preview-scripts/assets/Script/Game/Data/MoneyManager.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Data/Const/BaseConst.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Data/Interface/Level/ITutorial.js"},{"deps":{"../../../Framework/Utils/SingletonFactory":53,"../RuntimeMgr":86,"../../Config/Paths":83},"path":"preview-scripts/assets/Script/Game/Data/Interface/Tutorial.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Data/Interface/UIData.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Home/HomeNavigation.js"},{"deps":{"../../../Framework/Utils/Util":44},"path":"preview-scripts/assets/Script/Game/Data/Const/Constant.js"},{"deps":{"../Common/UI/ToyArt":73,"../../Application/GameBootstrap":48,"../../Application/M":152,"../../Application/Apps":33,"../Common/Common":52,"../Data/Const/Constant":100,"./HomeNavigation":99,"../Data/Interface/Level":104,"../../Debug/SpecialValidation":32,"../Common/UI/ForestUI":63,"../Common/UI/PlayerPanels":68,"./LobbyCatalog":23},"path":"preview-scripts/assets/Script/Game/Home/HomeScene.js"},{"deps":{"./View/SpecialPieceArt":136,"../Data/Const/Constant":100,"../Data/RuntimeMgr":86,"../Common/Common":52,"./Model/GameModel":122,"./Config/ResourcePath":27},"path":"preview-scripts/assets/Script/Game/Match3/ResCtrl.js"},{"deps":{"../../../Application/M":152,"../../Data/Const/Event":25,"../../Data/Const/TimeConfig":91,"../Model/GameTaskModel":110,"../../../Framework/Pool/DataPool":42},"path":"preview-scripts/assets/Script/Game/Match3/Control/TaskCtrl.js"},{"deps":{"../../../Framework/Utils/SingletonFactory":53,"../RuntimeMgr":86,"../../Config/Paths":83},"path":"preview-scripts/assets/Script/Game/Data/Interface/Level.js"},{"deps":{"../../Common/Common":52,"../../../Framework/Utils/Util":44,"../Model/GameModel":122},"path":"preview-scripts/assets/Script/Game/Match3/Control/LockCtrl.js"},{"deps":{"../../Common/Common":52},"path":"preview-scripts/assets/Script/Game/Match3/Model/CellBase.js"},{"deps":{"../../../Application/M":152,"../../Data/Const/Event":25,"../../../Framework/Utils/SingletonFactory":53,"./GameModel":122,"../../Common/Common":52,"../../../Framework/Utils/Util":44,"../../Data/Const/Constant":100},"path":"preview-scripts/assets/Script/Game/Match3/Model/EnergyModel.js"},{"deps":{"../../Common/Common":52,"./GameModel":122,"./SpecialPlug/Girl":113,"./BombModel":124,"./CellBase":106,"../../../Framework/Utils/Util":44,"../../Data/Const/TimeConfig":91,"../../Data/Const/Constant":100,"../../../Application/M":152,"../../../Framework/Events/EventMgr":1,"../../Data/Const/Event":25,"../../Common/AudioCtrl":154},"path":"preview-scripts/assets/Script/Game/Match3/Model/CellModel.js"},{"deps":{"../Common/UI/ToyArt":73,"../Common/UI/ForestUI":63,"../Common/Common":52,"../../Application/M":152,"../Data/Interface/Level":104,"../Data/Interface/Tutorial":97,"./Model/GameModel":122,"../Config/Paths":83,"../../Framework/Utils/Log":16,"../Data/Const/Event":25,"./View/UI/MainUiCtrl":147,"./View/GroundViewCtrl":132,"./View/UpGroundViewCtrl":140,"./View/BasicCellViewCtrl":126,"./View/EffLayerCtrl":129,"../../Framework/Utils/Util":44,"../Data/Const/Constant":100,"../Common/ActionCtrl":58,"./Model/CollectModel":112,"../Common/GroupAnimatCtrl":57,"../Data/Const/TimeConfig":91,"./Model/CellBase":106,"../Common/UI/UIMgr":76,"../Data/Interface/UIData":98,"./View/Match3TutorialCtrl":133,"../Common/AudioCtrl":154,"../Common/UI/OverHightLightCtrl":64,"./Skin/Match3Skin":29,"./ResCtrl":102},"path":"preview-scripts/assets/Script/Game/Match3/MainCtrl.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Match3/Model/GameTaskModel.js"},{"deps":{"./GroundCellModel":115},"path":"preview-scripts/assets/Script/Game/Match3/Model/GroundModel.js"},{"deps":{"../../../Application/M":152,"../../Data/Const/Event":25,"../../../Framework/Utils/Log":16,"./GameModel":122,"../../Common/Common":52,"../../Data/Const/Constant":100},"path":"preview-scripts/assets/Script/Game/Match3/Model/CollectModel.js"},{"deps":{"../GameModel":122,"../../../Common/Common":52,"../../../Data/Const/Constant":100},"path":"preview-scripts/assets/Script/Game/Match3/Model/SpecialPlug/Girl.js"},{"deps":{"../../Data/Const/Constant":100},"path":"preview-scripts/assets/Script/Game/Match3/Model/SpecialCell.js"},{"deps":{"./CellBase":106,"../../Common/Common":52,"./GameModel":122,"./CollectModel":112,"./SpecialPlug/Conveyer":117,"../../Data/Const/Constant":100,"./SpecialPlug/Mushroom":4},"path":"preview-scripts/assets/Script/Game/Match3/Model/GroundCellModel.js"},{"deps":{"./multipleGridCol/GnomeModel":28,"./multipleGridCol/TurtlesModel":125,"./multipleGridCol/CrabModel":127},"path":"preview-scripts/assets/Script/Game/Match3/Model/MultipleGridColModel.js"},{"deps":{"../GameModel":122,"../../../Common/Common":52,"../../MainCtrl":109},"path":"preview-scripts/assets/Script/Game/Match3/Model/SpecialPlug/Conveyer.js"},{"deps":{"../../../Framework/Events/EventMgr":1,"../../Data/Const/Event":25,"../../Data/Const/Constant":100,"../../Common/Common":52,"../../Data/RuntimeMgr":86,"../../../Application/M":152,"./CellBase":106,"../../../Framework/Utils/Util":44,"../../Data/Const/BaseConst":95,"../../Common/AudioCtrl":154,"../View/EffLayerCtrl":129},"path":"preview-scripts/assets/Script/Game/Match3/Model/PropModel.js"},{"deps":{"./CellBase":106,"./SpecialCell":114,"../../Common/Common":52,"./GameModel":122,"./CollectModel":112,"../../../Application/M":152,"../../Data/Const/Constant":100},"path":"preview-scripts/assets/Script/Game/Match3/Model/UpGroundCellModel.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Match3/Model/multipleGridCol/MultipleGridColBase.js"},{"deps":{"./UpGroundCellModel":119},"path":"preview-scripts/assets/Script/Game/Match3/Model/UpGroundModel.js"},{"deps":{"./CellModel":108,"../../Common/Common":52,"./CellBase":106,"./MultipleGridColModel":116,"../../../Application/M":152,"./PropModel":118,"./GroundModel":111,"../../../Framework/Utils/Log":16,"../../Data/Const/Event":25,"../../../Framework/Utils/Util":44,"./UpGroundModel":121,"../../../Framework/Events/EventMgr":1,"./CollectModel":112,"../../Data/RuntimeMgr":86,"../../Data/Const/Constant":100,"./EnergyModel":107,"../../Data/Const/TimeConfig":91,"../../../Framework/Network/Sequence":34,"../Control/TaskCtrl":103,"../Control/LockCtrl":105,"./SpecialPlug/Girl":113,"./SpecialPlug/Conveyer":117},"path":"preview-scripts/assets/Script/Game/Match3/Model/GameModel.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Match3/View/BaseView.js"},{"deps":{"./CellBase":106,"./GameModel":122,"../../Common/Common":52,"../../Data/RuntimeMgr":86,"../../Data/Const/Constant":100,"../../Data/Const/TimeConfig":91,"../View/EffLayerCtrl":129,"../../Common/GroupAnimatCtrl":57},"path":"preview-scripts/assets/Script/Game/Match3/Model/BombModel.js"},{"deps":{"./MultipleGridColBase":120,"../GameModel":122,"../../../Common/Common":52,"../CellBase":106},"path":"preview-scripts/assets/Script/Game/Match3/Model/multipleGridCol/TurtlesModel.js"},{"deps":{"../../../Application/M":152,"../../Data/Const/Constant":100,"./ItemBasicCellCtrl":137,"./BaseView":123,"../../Data/Const/Event":25,"../../Common/ActionCtrl":58,"../Model/GameModel":122,"../Skin/Match3Skin":29},"path":"preview-scripts/assets/Script/Game/Match3/View/BasicCellViewCtrl.js"},{"deps":{"./MultipleGridColBase":120,"../../../Common/Common":52,"../GameModel":122,"../CellBase":106,"../../../Data/Const/Constant":100},"path":"preview-scripts/assets/Script/Game/Match3/Model/multipleGridCol/CrabModel.js"},{"deps":{"./BaseItemView":139,"../../../Application/M":152,"../../Data/Const/Event":25,"../../Common/Common":52,"../../Data/Const/TimeConfig":91,"../../Data/Const/Constant":100,"../ResCtrl":102,"../Skin/Match3Skin":29},"path":"preview-scripts/assets/Script/Game/Match3/View/ItemUpgroundCtrl.js"},{"deps":{"./SpecialEffects":135,"../../../Application/M":152,"../../Data/Const/Constant":100,"../../Data/Const/Event":25,"../../Data/Const/TimeConfig":91,"../../Common/Common":52},"path":"preview-scripts/assets/Script/Game/Match3/View/EffLayerCtrl.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Match3/View/EffectTimeline.js"},{"deps":{"./BaseItemView":139,"../../../Application/M":152,"../../Data/Const/Constant":100,"../../../Framework/Components/SpinePlayerCtrl":39,"../../Data/Const/Event":25,"../../Data/Const/TimeConfig":91,"../ResCtrl":102,"../../Common/Common":52,"./Comp/Tuituji":9,"../Skin/Match3Skin":29},"path":"preview-scripts/assets/Script/Game/Match3/View/ItemGroundCtrl.js"},{"deps":{"../../Common/Common":52,"./BaseView":123,"../../../Application/M":152,"./ItemGroundCtrl":131,"../../Data/Const/Event":25,"../../Data/Const/Constant":100,"../Model/CollectModel":112,"../Model/GameModel":122,"../../../Framework/Components/SpinePlayerCtrl":39,"../../Data/Const/TimeConfig":91,"../../Common/ActionCtrl":58,"../Skin/Match3Skin":29},"path":"preview-scripts/assets/Script/Game/Match3/View/GroundViewCtrl.js"},{"deps":{"../../Common/Common":52,"./TutorialBubbleCtrl":141,"./TutorialBorderCtrl":138,"./TouchHintCtrl":134,"../../../Application/M":152,"../../Data/Const/Event":25},"path":"preview-scripts/assets/Script/Game/Match3/View/Match3TutorialCtrl.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Match3/View/TouchHintCtrl.js"},{"deps":{"./SpecialPieceArt":136,"./EffectTimeline":130,"../../Common/Common":52,"../Model/GameModel":122},"path":"preview-scripts/assets/Script/Game/Match3/View/SpecialEffects.js"},{"deps":{"../../Common/UI/ToyArt":73},"path":"preview-scripts/assets/Script/Game/Match3/View/SpecialPieceArt.js"},{"deps":{"./SpecialPieceArt":136,"../../Common/Common":52,"../../../Application/M":152,"./BaseItemView":139,"../Model/CellBase":106,"../../Data/Const/Constant":100,"../../Data/Const/Event":25,"../../Data/Const/TimeConfig":91,"../../../Framework/Utils/Util":44,"../Control/RotatingCtrl":24,"../Model/GameModel":122,"../../Common/AudioCtrl":154,"../ResCtrl":102,"../Model/CollectModel":112,"../../../Application/Apps":33,"../../Common/GroupAnimatCtrl":57},"path":"preview-scripts/assets/Script/Game/Match3/View/ItemBasicCellCtrl.js"},{"deps":{"../../Common/Common":52},"path":"preview-scripts/assets/Script/Game/Match3/View/TutorialBorderCtrl.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Match3/View/BaseItemView.js"},{"deps":{"../Model/UpGroundCellModel":119,"../../../Application/M":152,"../../Data/Const/Constant":100,"./ItemUpgroundCtrl":128,"./BaseView":123,"../Model/GameModel":122,"../../Common/ActionCtrl":58,"../../Data/Const/Event":25,"../../Common/Common":52,"../../../Framework/Components/SpinePlayerCtrl":39,"../Skin/Match3Skin":29},"path":"preview-scripts/assets/Script/Game/Match3/View/UpGroundViewCtrl.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Match3/View/TutorialBubbleCtrl.js"},{"deps":{"./Adapters/Webapp":11,"./Adapters/Wechat":151,"../../Framework/Utils/Util":44,"../Data/Const/BaseConst":95},"path":"preview-scripts/assets/Script/Game/Platform/PlatformMgr.js"},{"deps":{"./PlatformMgr":142,"../../Framework/Utils/SingletonFactory":53},"path":"preview-scripts/assets/Script/Game/Platform/DeviceMgr.js"},{"deps":{"../../Application/M":152,"../Data/Const/BaseConst":95,"../Config/Paths":83},"path":"preview-scripts/assets/Script/Game/Services/ShareMgr.js"},{"deps":{"../../../../Application/M":152,"../../Model/GameModel":122,"../../../Data/Const/Event":25,"./CollectItemCtrl":153,"../../../Data/RuntimeMgr":86,"../../Model/EnergyModel":107,"../../../Common/Common":52,"../../../Common/UI/ForestUI":63},"path":"preview-scripts/assets/Script/Game/Match3/View/UI/InfoPanelCtrl.js"},{"deps":{"../Data/Const/Constant":100,"../../Application/M":152,"../Data/StorageMgr":89,"../Data/Const/Event":25},"path":"preview-scripts/assets/Script/Game/Services/DailyTaskMgr.js"},{"deps":{"./PropCtrl":31,"./InfoPanelCtrl":145,"../../../../Application/Apps":33,"../../../../Application/M":152,"../../../Common/UI/PlayerPanels":68,"../../../Common/UI/OverHightLightCtrl":64,"../../../Common/UI/UIMgr":76,"../../../Common/UI/ForestUI":63,"../../../Common/Common":52,"../../../Services/ReportMgr":30,"../../Model/GameModel":122,"../../../Data/Const/Event":25,"../../../Data/Interface/UIData":98,"../../../Data/Const/Constant":100,"../../../../Framework/Utils/Util":44},"path":"preview-scripts/assets/Script/Game/Match3/View/UI/MainUiCtrl.js"},{"deps":{"../Platform/PlatformMgr":142,"../Config/Paths":83,"../../Framework/Network/HttpRequest":40,"../Data/StorageMgr":89,"../../Application/Apps":33,"../Data/RuntimeMgr":86,"../Data/Const/Constant":100,"../../Application/M":152},"path":"preview-scripts/assets/Script/Game/Services/NetMgr.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Platform/Adapters/IPlatform.js"},{"deps":{"../../../Common/UI/ForestUI":63,"../../../Common/UI/PlayerPanels":68,"../../../Home/LobbyCatalog":23,"../../../../Application/M":152,"../../../Data/Const/Event":25},"path":"preview-scripts/assets/Script/Game/Match3/View/UI/PropItemCtrl.js"},{"deps":{"../../Data/Const/BaseConst":95,"../../../Framework/Events/EventMgr":1,"../../../Framework/Utils/Log":16,"../../../Framework/Utils/Util":44,"../../Config/Paths":83,"../../../Application/M":152,"../../Data/RuntimeMgr":86,"../../Services/NetMgr":148},"path":"preview-scripts/assets/Script/Game/Platform/Adapters/Wechat.js"},{"deps":{"../Game/Data/Const/Event":25,"../Game/Platform/PlatformMgr":142,"../Game/Platform/DeviceMgr":143,"../Framework/Pool/NodePoolMgr":14,"../Framework/Events/EventMgr":1,"../Game/Config/GameTableMgr":84,"../Framework/Resources/CacheMgr":15,"../Game/Common/UI/UIMgr":76,"../Game/Data/RuntimeMgr":86,"../Game/Common/Views/Tips":19,"../Game/Common/AudioCtrl":154,"../Game/Services/NetMgr":148},"path":"preview-scripts/assets/Script/Application/M.js"},{"deps":{"../SpecialPieceArt":136,"../../ResCtrl":102,"../../../../Application/M":152,"../../Model/GameModel":122,"../../../Data/Const/Event":25,"../../Model/CollectModel":112,"../../../Data/Const/Constant":100,"../../../Common/Common":52,"../../../Data/RuntimeMgr":86},"path":"preview-scripts/assets/Script/Game/Match3/View/UI/CollectItemCtrl.js"},{"deps":{"../../Framework/Events/EventMgr":1,"../Data/Const/Event":25,"../Config/Paths":83,"../Data/Const/Constant":100,"../Data/StorageMgr":89},"path":"preview-scripts/assets/Script/Game/Common/AudioCtrl.js"},{"deps":{"../../../Data/Const/Constant":100,"../../../../Application/M":152,"../../../Data/Interface/UIData":98,"../../../Data/Const/Event":25},"path":"preview-scripts/assets/Script/Game/Match3/View/UI/SelectPropCtrl.js"},{"deps":{"../Common/UI/UIBase":75,"../../Application/M":152,"../Data/Const/BaseConst":95,"../Common/UI/UIMgr":76,"../Data/Interface/UIData":98,"../Common/Common":52,"../Data/Const/Constant":100,"../Data/StorageMgr":89,"../Services/NetMgr":148,"../Data/Const/Event":25,"../../Application/Apps":33},"path":"preview-scripts/assets/Script/Game/Views/GMView.js"},{"deps":{"../Common/UI/UIBase":75,"../../Application/M":152,"../Match3/View/UI/PropItemCtrl":150,"../Common/UI/UIMgr":76,"../Data/Interface/UIData":98},"path":"preview-scripts/assets/Script/Game/Views/PropDropView.js"}];
var entries = ["preview-scripts/__qc_index__.js"];
var bundleScript = 'preview-scripts/__qc_bundle__.js';

/**
 * Notice: This file can not use ES6 (for IE 11)
 */
var modules = {};
var name2path = {};

// Will generated by module.js plugin
// var scripts = ${scripts};
// var entries = ${entries};
// var bundleScript = ${bundleScript};

if (typeof global === 'undefined') {
    window.global = window;
}

var isJSB = typeof jsb !== 'undefined';

function getXMLHttpRequest () {
    return window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject('MSXML2.XMLHTTP');
}

function downloadText(url, callback) {
    if (isJSB) {
        var result = jsb.fileUtils.getStringFromFile(url);
        callback(null, result);
        return;
    }

    var xhr = getXMLHttpRequest(),
        errInfo = 'Load text file failed: ' + url;
    xhr.open('GET', url, true);
    if (xhr.overrideMimeType) xhr.overrideMimeType('text\/plain; charset=utf-8');
    xhr.onload = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 0) {
                callback(null, xhr.responseText);
            }
            else {
                callback({status:xhr.status, errorMessage:errInfo + ', status: ' + xhr.status});
            }
        }
        else {
            callback({status:xhr.status, errorMessage:errInfo + '(wrong readyState)'});
        }
    };
    xhr.onerror = function(){
        callback({status:xhr.status, errorMessage:errInfo + '(error)'});
    };
    xhr.ontimeout = function(){
        callback({status:xhr.status, errorMessage:errInfo + '(time out)'});
    };
    xhr.send(null);
};

function loadScript (src, cb) {
    if (typeof require !== 'undefined') {
        require(src);
        return cb();
    }

    // var timer = 'load ' + src;
    // console.time(timer);

    var scriptElement = document.createElement('script');

    function done() {
        // console.timeEnd(timer);
        // deallocation immediate whatever
        scriptElement.remove();
    }

    scriptElement.onload = function () {
        done();
        cb();
    };
    scriptElement.onerror = function () {
        done();
        var error = 'Failed to load ' + src;
        console.error(error);
        cb(new Error(error));
    };
    scriptElement.setAttribute('type','text/javascript');
    scriptElement.setAttribute('charset', 'utf-8');
    scriptElement.setAttribute('src', src);

    document.head.appendChild(scriptElement);
}

function loadScripts (srcs, cb) {
    var n = srcs.length;

    srcs.forEach(function (src) {
        loadScript(src, function () {
            n--;
            if (n === 0) {
                cb();
            }
        });
    })
}

function formatPath (path) {
    let destPath = window.__quick_compile_project__.destPath;
    if (destPath) {
        let prefix = 'preview-scripts';
        if (destPath[destPath.length - 1] === '/') {
            prefix += '/';
        }
        path = path.replace(prefix, destPath);
    }
    return path;
}

window.__quick_compile_project__ = {
    destPath: '',

    registerModule: function (path, module) {
        path = formatPath(path);
        modules[path].module = module;
    },

    registerModuleFunc: function (path, func) {
        path = formatPath(path);
        modules[path].func = func;

        var sections = path.split('/');
        var name = sections[sections.length - 1];
        name = name.replace(/\.(?:js|ts|json)$/i, '');
        name2path[name] = path;
    },

    require: function (request, path) {
        var m, requestScript;

        path = formatPath(path);
        if (path) {
            m = modules[path];
            if (!m) {
                console.warn('Can not find module for path : ' + path);
                return null;
            }
        }

        if (m) {
            let depIndex = m.deps[request];
            // dependence script was excluded
            if (depIndex === -1) {
                return null;
            }
            else {
                requestScript = scripts[ m.deps[request] ];
            }
        }
        
        let requestPath = '';
        if (!requestScript) {
            // search from name2path when request is a dynamic module name
            if (/^[\w- .]*$/.test(request)) {
                requestPath = name2path[request];
            }

            if (!requestPath) {
                if (CC_JSB) {
                    return require(request);
                }
                else {
                    console.warn('Can not find deps [' + request + '] for path : ' + path);
                    return null;
                }
            }
        }
        else {
            requestPath = formatPath(requestScript.path);
        }

        let requestModule = modules[requestPath];
        if (!requestModule) {
            console.warn('Can not find request module for path : ' + requestPath);
            return null;
        }

        if (!requestModule.module && requestModule.func) {
            requestModule.func();
        }

        if (!requestModule.module) {
            console.warn('Can not find requestModule.module for path : ' + path);
            return null;
        }

        return requestModule.module.exports;
    },

    run: function () {
        entries.forEach(function (entry) {
            entry = formatPath(entry);
            var module = modules[entry];
            if (!module.module) {
                module.func();
            }
        });
    },

    load: function (cb) {
        var self = this;

        var srcs = scripts.map(function (script) {
            var path = formatPath(script.path);
            modules[path] = script;

            if (script.mtime) {
                path += ("?mtime=" + script.mtime);
            }
            return path;
        });

        console.time && console.time('load __quick_compile_project__');
        // jsb can not analysis sourcemap, so keep separate files.
        if (bundleScript && !isJSB) {
            downloadText(formatPath(bundleScript), function (err, bundleSource) {
                console.timeEnd && console.timeEnd('load __quick_compile_project__');
                if (err) {
                    console.error(err);
                    return;
                }

                let evalTime = 'eval __quick_compile_project__ : ' + srcs.length + ' files';
                console.time && console.time(evalTime);
                var sources = bundleSource.split('\n//------QC-SOURCE-SPLIT------\n');
                for (var i = 0; i < sources.length; i++) {
                    if (sources[i]) {
                        window.eval(sources[i]);
                        // not sure why new Function cannot set breakpoints precisely
                        // new Function(sources[i])()
                    }
                }
                self.run();
                console.timeEnd && console.timeEnd(evalTime);
                cb();
            })
        }
        else {
            loadScripts(srcs, function () {
                self.run();
                console.timeEnd && console.timeEnd('load __quick_compile_project__');
                cb();
            });
        }
    }
};

// Polyfill for IE 11
if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function () {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}
})();
    