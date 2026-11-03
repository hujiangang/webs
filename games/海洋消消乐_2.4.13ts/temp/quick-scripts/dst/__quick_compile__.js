
(function () {
var scripts = [{"deps":{"./assets/Script/Application/Apps":9,"./assets/Script/Application/Loading/LoadingScene":1,"./assets/Script/Debug/test":37,"./assets/Script/Debug/SpecialValidation":10,"./assets/Script/Framework/Async/withTimeout":11,"./assets/Script/Framework/Components/SpinePlayerCtrl":32,"./assets/Script/Framework/Components/TTMask":5,"./assets/Script/Framework/Components/SlideButton":36,"./assets/Script/Framework/Events/EventMgr":14,"./assets/Script/Framework/FrameworkOptions":35,"./assets/Script/Framework/Network/NetBase":16,"./assets/Script/Framework/Network/Sequence":38,"./assets/Script/Framework/Network/Socket":39,"./assets/Script/Framework/Network/HttpRequest":40,"./assets/Script/Framework/Pool/NodePoolMgr":13,"./assets/Script/Framework/Pool/DataPool":41,"./assets/Script/Framework/Resources/CacheMgr":15,"./assets/Script/Framework/Shader/ShaderTime":18,"./assets/Script/Framework/Shader/ShaderHelper":45,"./assets/Script/Framework/Utils/Log":47,"./assets/Script/Framework/Utils/MemoryDetector":19,"./assets/Script/Framework/Utils/NumberUtils":48,"./assets/Script/Framework/Utils/RoadUtil":59,"./assets/Script/Framework/Utils/SingletonFactory":44,"./assets/Script/Framework/Utils/Util":43,"./assets/Script/Framework/Utils/LRUCache":42,"./assets/Script/ThirdParty/console.save":17,"./assets/Script/Application/GameBootstrap":46,"./assets/Script/Game/Common/Common":49,"./assets/Script/Game/Common/CommonEnums":56,"./assets/Script/Game/Common/CommonInterfaces":50,"./assets/Script/Game/Common/GroupAnimatCtrl":53,"./assets/Script/Game/Common/ActionCtrl":51,"./assets/Script/Game/Common/Components/Button":6,"./assets/Script/Game/Common/UI/BagGridItemCtrl":52,"./assets/Script/Game/Common/UI/BoxGiftCtrl":54,"./assets/Script/Game/Common/UI/BoxOpenCtrl":64,"./assets/Script/Game/Common/UI/BoxTipsCtrl":61,"./assets/Script/Game/Common/UI/BuyPowerCtrl":55,"./assets/Script/Game/Common/UI/BuyPropPanel":57,"./assets/Script/Game/Common/UI/DialogPanel":58,"./assets/Script/Game/Common/UI/ForestUI":65,"./assets/Script/Game/Common/UI/GameFailEncouragePanel":62,"./assets/Script/Game/Common/UI/LoadingProgress":60,"./assets/Script/Game/Common/UI/MoreCoin":68,"./assets/Script/Game/Common/UI/MountainArt":80,"./assets/Script/Game/Common/UI/OverHightLightCtrl":63,"./assets/Script/Game/Common/UI/PlayerPanels":66,"./assets/Script/Game/Common/UI/SettingViewCtrl":67,"./assets/Script/Game/Common/UI/StoryTalkPanel":71,"./assets/Script/Game/Common/UI/TempLoadingPanel":73,"./assets/Script/Game/Common/UI/ToyArt":69,"./assets/Script/Game/Common/UI/UIBase":74,"./assets/Script/Game/Common/UI/UIMgr":76,"./assets/Script/Game/Common/UI/BagCtrl":72,"./assets/Script/Game/Common/UI/dailyTask/DailyItem":70,"./assets/Script/Game/Common/UI/dailyTask/DailyTaskPanel":75,"./assets/Script/Game/Common/UI/dailyTask/TimerTaskItem":2,"./assets/Script/Game/Common/UI/dailyTask/CustomTaskItem":77,"./assets/Script/Game/Common/UI/notify/NotifyRewardItemCtrl":21,"./assets/Script/Game/Common/UI/notify/NotifyPanel":86,"./assets/Script/Game/Common/UI/shop/ShopToolsItemCtrl":84,"./assets/Script/Game/Common/UI/shop/ShopPanel":22,"./assets/Script/Game/Common/Views/View":20,"./assets/Script/Game/Common/Views/Tips":82,"./assets/Script/Game/Config/Paths":78,"./assets/Script/Game/Config/GameTableMgr":83,"./assets/Script/Game/Config/Loader/BytesTable":7,"./assets/Script/Game/Config/Loader/BaseTable":79,"./assets/Script/Game/Config/Tables/ChapterInfo":81,"./assets/Script/Game/Config/Tables/ChapterStory":23,"./assets/Script/Game/Config/Tables/DailyTaskInfo":85,"./assets/Script/Game/Config/Tables/LevelUpReward":89,"./assets/Script/Game/Config/Tables/PropInfo":90,"./assets/Script/Game/Config/Tables/ShareCfg":91,"./assets/Script/Game/Config/Tables/ShopInfo":93,"./assets/Script/Game/Config/Tables/Titles":94,"./assets/Script/Game/Config/Tables/BoxRewardInfo":98,"./assets/Script/Game/Data/RuntimeMgr":88,"./assets/Script/Game/Data/StorageMgr":87,"./assets/Script/Game/Data/Const/Constant":24,"./assets/Script/Game/Data/Const/Event":92,"./assets/Script/Game/Data/Const/TimeConfig":100,"./assets/Script/Game/Data/Const/BaseConst":97,"./assets/Script/Game/Data/Interface/Tutorial":96,"./assets/Script/Game/Data/Interface/UIData":101,"./assets/Script/Game/Data/Interface/Level":95,"./assets/Script/Game/Data/Interface/Level/ITutorial":3,"./assets/Script/Game/Data/Interface/Level/ILevel":105,"./assets/Script/Game/Data/MoneyManager":102,"./assets/Script/Game/Data/Player/PlayerInfo":25,"./assets/Script/Game/Home/HomeNavigation":27,"./assets/Script/Game/Home/HomeScene":107,"./assets/Script/Game/Home/LobbyCatalog":99,"./assets/Script/Game/Home/HomeArt":106,"./assets/Script/Game/Match3/ResCtrl":103,"./assets/Script/Game/Match3/Config/ResourcePath":26,"./assets/Script/Game/Match3/Control/RotatingCtrl":108,"./assets/Script/Game/Match3/Control/TaskCtrl":28,"./assets/Script/Game/Match3/Control/LockCtrl":109,"./assets/Script/Game/Match3/MainCtrl":114,"./assets/Script/Game/Match3/Model/CellBase":104,"./assets/Script/Game/Match3/Model/CellModel":115,"./assets/Script/Game/Match3/Model/CollectModel":110,"./assets/Script/Game/Match3/Model/EnergyModel":111,"./assets/Script/Game/Match3/Model/GameModel":122,"./assets/Script/Game/Match3/Model/GameTaskModel":113,"./assets/Script/Game/Match3/Model/GroundCellModel":116,"./assets/Script/Game/Match3/Model/GroundModel":112,"./assets/Script/Game/Match3/Model/MultipleGridColModel":119,"./assets/Script/Game/Match3/Model/PropModel":121,"./assets/Script/Game/Match3/Model/SpecialCell":117,"./assets/Script/Game/Match3/Model/UpGroundCellModel":120,"./assets/Script/Game/Match3/Model/UpGroundModel":124,"./assets/Script/Game/Match3/Model/BombModel":129,"./assets/Script/Game/Match3/Model/SpecialPlug/Girl":4,"./assets/Script/Game/Match3/Model/SpecialPlug/Mushroom":118,"./assets/Script/Game/Match3/Model/SpecialPlug/Conveyer":123,"./assets/Script/Game/Match3/Model/multipleGridCol/GnomeModel":30,"./assets/Script/Game/Match3/Model/multipleGridCol/MultipleGridColBase":127,"./assets/Script/Game/Match3/Model/multipleGridCol/TurtlesModel":126,"./assets/Script/Game/Match3/Model/multipleGridCol/CrabModel":125,"./assets/Script/Game/Match3/Skin/Match3Skin":29,"./assets/Script/Game/Match3/View/BaseView":134,"./assets/Script/Game/Match3/View/BasicCellViewCtrl":130,"./assets/Script/Game/Match3/View/ComboFeedback":137,"./assets/Script/Game/Match3/View/EffLayerCtrl":128,"./assets/Script/Game/Match3/View/EffectTimeline":131,"./assets/Script/Game/Match3/View/GroundViewCtrl":141,"./assets/Script/Game/Match3/View/ItemBasicCellCtrl":148,"./assets/Script/Game/Match3/View/ItemGroundCtrl":132,"./assets/Script/Game/Match3/View/ItemUpgroundCtrl":136,"./assets/Script/Game/Match3/View/Match3TutorialCtrl":142,"./assets/Script/Game/Match3/View/SpecialEffects":133,"./assets/Script/Game/Match3/View/SpecialPieceArt":135,"./assets/Script/Game/Match3/View/TouchHintCtrl":138,"./assets/Script/Game/Match3/View/TutorialBorderCtrl":145,"./assets/Script/Game/Match3/View/TutorialBubbleCtrl":144,"./assets/Script/Game/Match3/View/UpGroundViewCtrl":143,"./assets/Script/Game/Match3/View/BaseItemView":139,"./assets/Script/Game/Match3/View/Comp/Tuituji":31,"./assets/Script/Game/Match3/View/UI/InfoPanelCtrl":140,"./assets/Script/Game/Match3/View/UI/MainUiCtrl":149,"./assets/Script/Game/Match3/View/UI/PropCtrl":146,"./assets/Script/Game/Match3/View/UI/PropItemCtrl":8,"./assets/Script/Game/Match3/View/UI/SelectPropCtrl":150,"./assets/Script/Game/Match3/View/UI/CollectItemCtrl":154,"./assets/Script/Game/Platform/PlatformMgr":147,"./assets/Script/Game/Platform/Adapters/Webapp":12,"./assets/Script/Game/Platform/Adapters/Wechat":151,"./assets/Script/Game/Platform/Adapters/IPlatform":152,"./assets/Script/Game/Platform/DeviceMgr":153,"./assets/Script/Game/Services/NetMgr":160,"./assets/Script/Game/Services/ReportMgr":33,"./assets/Script/Game/Services/ShareMgr":159,"./assets/Script/Game/Services/DailyTaskMgr":158,"./assets/Script/Game/Views/GMView":34,"./assets/Script/Game/Views/PropDropView":155,"./assets/Script/Game/Views/CommonRewardView":157,"./assets/Script/Game/Common/AudioCtrl":161,"./assets/Script/Application/M":156},"path":"preview-scripts/__qc_index__.js"},{"deps":{"../Apps":9,"../GameBootstrap":46,"../../Game/Common/Common":49,"../../Game/Data/Const/Constant":24,"../../Game/Common/UI/ForestUI":65,"../../Game/Common/UI/MountainArt":80,"../../Game/Common/UI/ToyArt":69,"../../Game/Common/UI/LoadingProgress":60},"path":"preview-scripts/assets/Script/Application/Loading/LoadingScene.js"},{"deps":{"../../../Data/StorageMgr":87,"../../../../Application/M":156,"../../../Data/Const/Event":92,"../../../../Framework/Utils/Util":43,"../../../Data/Interface/UIData":101},"path":"preview-scripts/assets/Script/Game/Common/UI/dailyTask/TimerTaskItem.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Data/Interface/Level/ITutorial.js"},{"deps":{"../GameModel":122,"../../../Common/Common":49,"../../../Data/Const/Constant":24},"path":"preview-scripts/assets/Script/Game/Match3/Model/SpecialPlug/Girl.js"},{"deps":{},"path":"preview-scripts/assets/Script/Framework/Components/TTMask.js"},{"deps":{"../../../Framework/Events/EventMgr":14,"../../Data/Const/Event":92,"../AudioCtrl":161},"path":"preview-scripts/assets/Script/Game/Common/Components/Button.js"},{"deps":{"../Paths":78},"path":"preview-scripts/assets/Script/Game/Config/Loader/BytesTable.js"},{"deps":{"../../../Common/UI/ForestUI":65,"../../../Common/UI/PlayerPanels":66,"../../../Home/LobbyCatalog":99,"../../../../Application/M":156,"../../../Data/Const/Event":92},"path":"preview-scripts/assets/Script/Game/Match3/View/UI/PropItemCtrl.js"},{"deps":{"../Framework/FrameworkOptions":35,"../Framework/Utils/Util":43},"path":"preview-scripts/assets/Script/Application/Apps.js"},{"deps":{},"path":"preview-scripts/assets/Script/Debug/SpecialValidation.js"},{"deps":{},"path":"preview-scripts/assets/Script/Framework/Async/withTimeout.js"},{"deps":{"../../Data/Const/BaseConst":97,"../../../Framework/Utils/Log":47,"../../Data/StorageMgr":87},"path":"preview-scripts/assets/Script/Game/Platform/Adapters/Webapp.js"},{"deps":{"../Utils/SingletonFactory":44},"path":"preview-scripts/assets/Script/Framework/Pool/NodePoolMgr.js"},{"deps":{"../Pool/DataPool":41,"../Utils/SingletonFactory":44},"path":"preview-scripts/assets/Script/Framework/Events/EventMgr.js"},{"deps":{"../Utils/SingletonFactory":44},"path":"preview-scripts/assets/Script/Framework/Resources/CacheMgr.js"},{"deps":{"./Sequence":38},"path":"preview-scripts/assets/Script/Framework/Network/NetBase.js"},{"deps":{},"path":"preview-scripts/assets/Script/ThirdParty/console.save.js"},{"deps":{},"path":"preview-scripts/assets/Script/Framework/Shader/ShaderTime.js"},{"deps":{},"path":"preview-scripts/assets/Script/Framework/Utils/MemoryDetector.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Common/Views/View.js"},{"deps":{"../../Common":49,"../../../Data/Const/Constant":24,"../../../Data/Const/BaseConst":97},"path":"preview-scripts/assets/Script/Game/Common/UI/notify/NotifyRewardItemCtrl.js"},{"deps":{"../UIBase":74,"../../../Data/Interface/UIData":101,"../../../../Application/M":156,"./ShopToolsItemCtrl":84},"path":"preview-scripts/assets/Script/Game/Common/UI/shop/ShopPanel.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Config/Tables/ChapterStory.js"},{"deps":{"../../../Framework/Utils/Util":43},"path":"preview-scripts/assets/Script/Game/Data/Const/Constant.js"},{"deps":{"../Const/Constant":24,"../StorageMgr":87},"path":"preview-scripts/assets/Script/Game/Data/Player/PlayerInfo.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Match3/Config/ResourcePath.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Home/HomeNavigation.js"},{"deps":{"../../../Application/M":156,"../../Data/Const/Event":92,"../../Data/Const/TimeConfig":100,"../Model/GameTaskModel":113,"../../../Framework/Pool/DataPool":41},"path":"preview-scripts/assets/Script/Game/Match3/Control/TaskCtrl.js"},{"deps":{"../../Common/Common":49,"../Config/ResourcePath":26},"path":"preview-scripts/assets/Script/Game/Match3/Skin/Match3Skin.js"},{"deps":{"./MultipleGridColBase":127,"../../../Common/Common":49},"path":"preview-scripts/assets/Script/Game/Match3/Model/multipleGridCol/GnomeModel.js"},{"deps":{"../../Model/GameModel":122,"../../../Common/GroupAnimatCtrl":53,"../../../Data/Const/Constant":24},"path":"preview-scripts/assets/Script/Game/Match3/View/Comp/Tuituji.js"},{"deps":{},"path":"preview-scripts/assets/Script/Framework/Components/SpinePlayerCtrl.js"},{"deps":{"../Config/Paths":78,"../../Framework/Utils/Util":43,"../../Application/M":156,"../../Framework/Network/HttpRequest":40,"../../Application/Apps":9,"../Data/Const/BaseConst":97},"path":"preview-scripts/assets/Script/Game/Services/ReportMgr.js"},{"deps":{"../Common/UI/UIBase":74,"../../Application/M":156,"../Data/Const/BaseConst":97,"../Common/UI/UIMgr":76,"../Data/Interface/UIData":101,"../Common/Common":49,"../Data/Const/Constant":24,"../Data/StorageMgr":87,"../Services/NetMgr":160,"../Data/Const/Event":92,"../../Application/Apps":9},"path":"preview-scripts/assets/Script/Game/Views/GMView.js"},{"deps":{},"path":"preview-scripts/assets/Script/Framework/FrameworkOptions.js"},{"deps":{},"path":"preview-scripts/assets/Script/Framework/Components/SlideButton.js"},{"deps":{"../Framework/Events/EventMgr":14,"../Framework/Network/HttpRequest":40,"../Framework/Network/Socket":39,"../Game/Data/Const/Event":92,"../Game/Config/GameTableMgr":83,"../Game/Data/RuntimeMgr":88,"../Game/Data/Const/BaseConst":97,"../Game/Data/Interface/Level":95},"path":"preview-scripts/assets/Script/Debug/test.js"},{"deps":{},"path":"preview-scripts/assets/Script/Framework/Network/Sequence.js"},{"deps":{"./NetBase":16,"../Utils/Log":47},"path":"preview-scripts/assets/Script/Framework/Network/Socket.js"},{"deps":{"./NetBase":16,"../Utils/Log":47,"../FrameworkOptions":35},"path":"preview-scripts/assets/Script/Framework/Network/HttpRequest.js"},{"deps":{},"path":"preview-scripts/assets/Script/Framework/Pool/DataPool.js"},{"deps":{},"path":"preview-scripts/assets/Script/Framework/Utils/LRUCache.js"},{"deps":{},"path":"preview-scripts/assets/Script/Framework/Utils/Util.js"},{"deps":{},"path":"preview-scripts/assets/Script/Framework/Utils/SingletonFactory.js"},{"deps":{},"path":"preview-scripts/assets/Script/Framework/Shader/ShaderHelper.js"},{"deps":{"./M":156,"../Game/Data/Const/Constant":24,"../Game/Config/GameTableMgr":83,"../Game/Config/Paths":78,"../Game/Config/Tables/DailyTaskInfo":85,"../Game/Config/Loader/BaseTable":79,"../Framework/Async/withTimeout":11},"path":"preview-scripts/assets/Script/Application/GameBootstrap.js"},{"deps":{"../FrameworkOptions":35},"path":"preview-scripts/assets/Script/Framework/Utils/Log.js"},{"deps":{},"path":"preview-scripts/assets/Script/Framework/Utils/NumberUtils.js"},{"deps":{"../Match3/Model/GameModel":122,"../../Framework/Utils/Util":43,"../Data/Const/Constant":24,"../../Framework/Pool/NodePoolMgr":13,"../../Framework/Components/SpinePlayerCtrl":32,"../../Application/M":156},"path":"preview-scripts/assets/Script/Game/Common/Common.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Common/CommonInterfaces.js"},{"deps":{"../../Framework/Utils/SingletonFactory":44,"../Match3/Model/GameModel":122,"./Common":49,"../../Framework/Utils/Util":43,"../Data/Const/TimeConfig":100,"../Data/Const/Constant":24},"path":"preview-scripts/assets/Script/Game/Common/ActionCtrl.js"},{"deps":{"../../../Application/M":156,"../../Data/Const/Event":92,"../Common":49},"path":"preview-scripts/assets/Script/Game/Common/UI/BagGridItemCtrl.js"},{"deps":{"../../Framework/Utils/SingletonFactory":44,"../Match3/Model/GameModel":122,"./Common":49,"../Data/Const/TimeConfig":100,"../../Application/M":156,"../Data/Const/Event":92,"../Data/Const/Constant":24,"../../Framework/Utils/Util":43,"./AudioCtrl":161},"path":"preview-scripts/assets/Script/Game/Common/GroupAnimatCtrl.js"},{"deps":{"../../../Application/M":156,"../Common":49,"../../../Framework/Utils/Util":43,"../../Data/Interface/UIData":101,"../../Data/Const/Event":92,"./BoxTipsCtrl":61},"path":"preview-scripts/assets/Script/Game/Common/UI/BoxGiftCtrl.js"},{"deps":{"../../../Application/M":156,"../../Data/Const/Constant":24,"../../Data/Const/BaseConst":97,"../Common":49,"../../Data/Const/Event":92,"../../../Framework/Utils/Util":43,"../../Data/MoneyManager":102},"path":"preview-scripts/assets/Script/Game/Common/UI/BuyPowerCtrl.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Common/CommonEnums.js"},{"deps":{"./UIBase":74,"../../Data/Const/Constant":24,"../../../Application/M":156,"../Common":49,"../../Data/Interface/UIData":101,"../../Services/ReportMgr":33},"path":"preview-scripts/assets/Script/Game/Common/UI/BuyPropPanel.js"},{"deps":{"./ForestUI":65,"../../../Application/M":156,"./UIBase":74,"./UIMgr":76,"../../Data/Interface/UIData":101,"../../Match3/View/UI/CollectItemCtrl":154,"../../Data/Const/Event":92,"../../Data/Const/Constant":24,"../../../Framework/Components/SlideButton":36,"../../Data/RuntimeMgr":88,"../Common":49,"../../../Framework/Events/EventMgr":14,"../../Data/Const/BaseConst":97,"../../Match3/View/UI/SelectPropCtrl":150,"../../Data/StorageMgr":87,"../../Services/ShareMgr":159,"../AudioCtrl":161},"path":"preview-scripts/assets/Script/Game/Common/UI/DialogPanel.js"},{"deps":{},"path":"preview-scripts/assets/Script/Framework/Utils/RoadUtil.js"},{"deps":{"./ForestUI":65},"path":"preview-scripts/assets/Script/Game/Common/UI/LoadingProgress.js"},{"deps":{"../../../Application/M":156,"../../Data/Const/Constant":24,"../../Data/Const/BaseConst":97,"../Common":49,"../../../Framework/Utils/Util":43},"path":"preview-scripts/assets/Script/Game/Common/UI/BoxTipsCtrl.js"},{"deps":{"./ForestUI":65,"./UIBase":74,"../../../Application/M":156,"../Common":49,"../../Data/Interface/UIData":101,"../../Data/Const/BaseConst":97,"../../Data/Const/Event":92,"../../Match3/Model/GameModel":122,"../../Data/StorageMgr":87,"../../Data/Const/Constant":24,"../../../Framework/Events/EventMgr":14,"../../Config/Paths":78,"../../Match3/ResCtrl":103},"path":"preview-scripts/assets/Script/Game/Common/UI/GameFailEncouragePanel.js"},{"deps":{"../../Match3/Model/GameModel":122,"../../../Application/M":156,"../../Data/Const/Event":92},"path":"preview-scripts/assets/Script/Game/Common/UI/OverHightLightCtrl.js"},{"deps":{"./UIBase":74,"../../../Application/M":156,"../../Data/Interface/UIData":101,"../../Data/Const/Event":92,"../../../Framework/Events/EventMgr":14,"../AudioCtrl":161},"path":"preview-scripts/assets/Script/Game/Common/UI/BoxOpenCtrl.js"},{"deps":{"./ToyArt":69,"./MountainArt":80,"../../Match3/View/SpecialPieceArt":135},"path":"preview-scripts/assets/Script/Game/Common/UI/ForestUI.js"},{"deps":{"./ForestUI":65,"../../../Application/M":156,"../../Data/Const/Event":92,"../../Data/Const/Constant":24,"../../Data/StorageMgr":87,"../Common":49,"../../Home/LobbyCatalog":99},"path":"preview-scripts/assets/Script/Game/Common/UI/PlayerPanels.js"},{"deps":{"../../Data/Const/Constant":24,"../../../Application/M":156,"../../Data/Const/Event":92,"../Common":49,"../../Data/Interface/UIData":101,"../../Data/StorageMgr":87,"../../Services/ReportMgr":33,"../../Match3/Model/GameModel":122},"path":"preview-scripts/assets/Script/Game/Common/UI/SettingViewCtrl.js"},{"deps":{"./UIBase":74,"./UIMgr":76,"../../Data/Interface/UIData":101},"path":"preview-scripts/assets/Script/Game/Common/UI/MoreCoin.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Common/UI/ToyArt.js"},{"deps":{"../../../../Application/M":156,"../../../Data/Const/Constant":24,"../../../Data/StorageMgr":87,"../../../Services/DailyTaskMgr":158,"../../../Data/Interface/UIData":101},"path":"preview-scripts/assets/Script/Game/Common/UI/dailyTask/DailyItem.js"},{"deps":{"./UIBase":74,"./UIMgr":76,"../../Data/Interface/UIData":101},"path":"preview-scripts/assets/Script/Game/Common/UI/StoryTalkPanel.js"},{"deps":{"./UIBase":74,"./UIMgr":76,"../../Data/Interface/UIData":101,"../../../Application/M":156,"./BagGridItemCtrl":52,"../../Data/Const/Constant":24,"../../Data/Const/Event":92,"../../Data/Const/BaseConst":97,"../Common":49},"path":"preview-scripts/assets/Script/Game/Common/UI/BagCtrl.js"},{"deps":{"./UIBase":74,"./ForestUI":65,"./MountainArt":80,"./LoadingProgress":60,"../../Data/Const/Event":92},"path":"preview-scripts/assets/Script/Game/Common/UI/TempLoadingPanel.js"},{"deps":{"../../../Framework/Events/EventMgr":14},"path":"preview-scripts/assets/Script/Game/Common/UI/UIBase.js"},{"deps":{"../UIBase":74,"../../../../Application/M":156,"../../../Data/Interface/UIData":101,"./DailyItem":70,"./TimerTaskItem":2,"../../../Data/Const/Event":92,"../../../../Framework/Utils/Util":43,"./CustomTaskItem":77,"../../../Services/DailyTaskMgr":158},"path":"preview-scripts/assets/Script/Game/Common/UI/dailyTask/DailyTaskPanel.js"},{"deps":{"./UIBase":74,"../../Data/Interface/UIData":101,"../../../Framework/Utils/Log":47,"../../../Framework/Utils/LRUCache":42,"../../../Framework/Events/EventMgr":14,"../../Data/Const/BaseConst":97,"../../Data/Const/Event":92},"path":"preview-scripts/assets/Script/Game/Common/UI/UIMgr.js"},{"deps":{"../../../Services/DailyTaskMgr":158,"../../../../Application/M":156,"../../../Data/Const/Event":92,"../../../Data/Interface/UIData":101},"path":"preview-scripts/assets/Script/Game/Common/UI/dailyTask/CustomTaskItem.js"},{"deps":{"../../Application/Apps":9},"path":"preview-scripts/assets/Script/Game/Config/Paths.js"},{"deps":{"./BytesTable":7,"../../../Framework/Utils/Util":43,"../../../Framework/Utils/Log":47},"path":"preview-scripts/assets/Script/Game/Config/Loader/BaseTable.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Common/UI/MountainArt.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Config/Tables/ChapterInfo.js"},{"deps":{"./View":20},"path":"preview-scripts/assets/Script/Game/Common/Views/Tips.js"},{"deps":{"./Loader/BaseTable":79,"../../Framework/Utils/SingletonFactory":44,"./Tables/Titles":94,"./Tables/ChapterStory":23,"./Tables/ChapterInfo":81,"./Tables/PropInfo":90,"./Tables/BoxRewardInfo":98,"./Tables/LevelUpReward":89,"./Tables/ShareCfg":91,"./Tables/ShopInfo":93},"path":"preview-scripts/assets/Script/Game/Config/GameTableMgr.js"},{"deps":{"../../Common":49,"../../../Data/MoneyManager":102,"../../../../Application/M":156},"path":"preview-scripts/assets/Script/Game/Common/UI/shop/ShopToolsItemCtrl.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Config/Tables/DailyTaskInfo.js"},{"deps":{"../UIBase":74,"../../../../Application/M":156,"../UIMgr":76,"../../../Data/Interface/UIData":101,"./NotifyRewardItemCtrl":21,"../BoxTipsCtrl":61},"path":"preview-scripts/assets/Script/Game/Common/UI/notify/NotifyPanel.js"},{"deps":{"../Services/NetMgr":160,"../Platform/PlatformMgr":147,"./Const/BaseConst":97},"path":"preview-scripts/assets/Script/Game/Data/StorageMgr.js"},{"deps":{"./Player/PlayerInfo":25,"../../Framework/Utils/SingletonFactory":44,"./Const/BaseConst":97,"../../Framework/Events/EventMgr":14,"./Const/Event":92,"./Const/Constant":24,"../../Application/M":156,"../../Application/Apps":9,"./StorageMgr":87,"../Services/ReportMgr":33,"../Common/Common":49,"../Services/DailyTaskMgr":158},"path":"preview-scripts/assets/Script/Game/Data/RuntimeMgr.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Config/Tables/LevelUpReward.js"},{"deps":{"../../Data/Const/BaseConst":97},"path":"preview-scripts/assets/Script/Game/Config/Tables/PropInfo.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Config/Tables/ShareCfg.js"},{"deps":{"../../../Framework/Utils/Util":43},"path":"preview-scripts/assets/Script/Game/Data/Const/Event.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Config/Tables/ShopInfo.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Config/Tables/Titles.js"},{"deps":{"../../../Framework/Utils/SingletonFactory":44,"../RuntimeMgr":88,"../../Config/Paths":78},"path":"preview-scripts/assets/Script/Game/Data/Interface/Level.js"},{"deps":{"../../../Framework/Utils/SingletonFactory":44,"../RuntimeMgr":88,"../../Config/Paths":78},"path":"preview-scripts/assets/Script/Game/Data/Interface/Tutorial.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Data/Const/BaseConst.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Config/Tables/BoxRewardInfo.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Home/LobbyCatalog.js"},{"deps":{"../../../Framework/Utils/Util":43,"./Constant":24},"path":"preview-scripts/assets/Script/Game/Data/Const/TimeConfig.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Data/Interface/UIData.js"},{"deps":{"./Const/BaseConst":97,"../../Application/M":156,"./Const/Constant":24},"path":"preview-scripts/assets/Script/Game/Data/MoneyManager.js"},{"deps":{"./View/SpecialPieceArt":135,"../Data/Const/Constant":24,"../Data/RuntimeMgr":88,"../Common/Common":49,"./Model/GameModel":122,"./Config/ResourcePath":26},"path":"preview-scripts/assets/Script/Game/Match3/ResCtrl.js"},{"deps":{"../../Common/Common":49},"path":"preview-scripts/assets/Script/Game/Match3/Model/CellBase.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Data/Interface/Level/ILevel.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Home/HomeArt.js"},{"deps":{"../Common/UI/ToyArt":69,"../Common/UI/MountainArt":80,"./HomeArt":106,"../../Application/GameBootstrap":46,"../../Application/M":156,"../../Application/Apps":9,"../Common/AudioCtrl":161,"../Data/Const/Event":92,"../Common/Common":49,"../Data/Const/Constant":24,"./HomeNavigation":27,"../Data/Interface/Level":95,"../Data/Interface/UIData":101,"../../Debug/SpecialValidation":10,"../Common/UI/ForestUI":65,"../Common/UI/PlayerPanels":66,"./LobbyCatalog":99,"../Match3/View/ComboFeedback":137},"path":"preview-scripts/assets/Script/Game/Home/HomeScene.js"},{"deps":{"../../Data/Const/TimeConfig":100},"path":"preview-scripts/assets/Script/Game/Match3/Control/RotatingCtrl.js"},{"deps":{"../../Common/Common":49,"../../../Framework/Utils/Util":43,"../Model/GameModel":122},"path":"preview-scripts/assets/Script/Game/Match3/Control/LockCtrl.js"},{"deps":{"../../../Application/M":156,"../../Data/Const/Event":92,"../../../Framework/Utils/Log":47,"./GameModel":122,"../../Common/Common":49,"../../Data/Const/Constant":24},"path":"preview-scripts/assets/Script/Game/Match3/Model/CollectModel.js"},{"deps":{"../../../Application/M":156,"../../Data/Const/Event":92,"../../../Framework/Utils/SingletonFactory":44,"./GameModel":122,"../../Common/Common":49,"../../../Framework/Utils/Util":43,"../../Data/Const/Constant":24},"path":"preview-scripts/assets/Script/Game/Match3/Model/EnergyModel.js"},{"deps":{"./GroundCellModel":116},"path":"preview-scripts/assets/Script/Game/Match3/Model/GroundModel.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Match3/Model/GameTaskModel.js"},{"deps":{"../Common/UI/ToyArt":69,"../Common/UI/MountainArt":80,"../Common/Common":49,"../../Application/M":156,"../Data/Interface/Level":95,"../Data/Interface/Tutorial":96,"./Model/GameModel":122,"../../Framework/Utils/Log":47,"../Data/Const/Event":92,"./View/UI/MainUiCtrl":149,"./View/GroundViewCtrl":141,"./View/UpGroundViewCtrl":143,"./View/BasicCellViewCtrl":130,"./View/EffLayerCtrl":128,"../../Framework/Utils/Util":43,"../Data/Const/Constant":24,"../Common/ActionCtrl":51,"./Model/CollectModel":110,"../Common/GroupAnimatCtrl":53,"../Data/Const/TimeConfig":100,"./Model/CellBase":104,"../Common/UI/UIMgr":76,"../Data/Interface/UIData":101,"./View/Match3TutorialCtrl":142,"../Common/AudioCtrl":161,"../Common/UI/OverHightLightCtrl":63,"./Skin/Match3Skin":29,"./ResCtrl":103},"path":"preview-scripts/assets/Script/Game/Match3/MainCtrl.js"},{"deps":{"../../Common/Common":49,"./GameModel":122,"./SpecialPlug/Girl":4,"./BombModel":129,"./CellBase":104,"../../../Framework/Utils/Util":43,"../../Data/Const/TimeConfig":100,"../../Data/Const/Constant":24,"../../../Application/M":156,"../../../Framework/Events/EventMgr":14,"../../Data/Const/Event":92,"../../Common/AudioCtrl":161},"path":"preview-scripts/assets/Script/Game/Match3/Model/CellModel.js"},{"deps":{"./CellBase":104,"../../Common/Common":49,"./GameModel":122,"./CollectModel":110,"./SpecialPlug/Conveyer":123,"../../Data/Const/Constant":24,"./SpecialPlug/Mushroom":118},"path":"preview-scripts/assets/Script/Game/Match3/Model/GroundCellModel.js"},{"deps":{"../../Data/Const/Constant":24},"path":"preview-scripts/assets/Script/Game/Match3/Model/SpecialCell.js"},{"deps":{"../GameModel":122},"path":"preview-scripts/assets/Script/Game/Match3/Model/SpecialPlug/Mushroom.js"},{"deps":{"./multipleGridCol/GnomeModel":30,"./multipleGridCol/TurtlesModel":126,"./multipleGridCol/CrabModel":125},"path":"preview-scripts/assets/Script/Game/Match3/Model/MultipleGridColModel.js"},{"deps":{"./CellBase":104,"./SpecialCell":117,"../../Common/Common":49,"./GameModel":122,"./CollectModel":110,"../../../Application/M":156,"../../Data/Const/Constant":24},"path":"preview-scripts/assets/Script/Game/Match3/Model/UpGroundCellModel.js"},{"deps":{"../../../Framework/Events/EventMgr":14,"../../Data/Const/Event":92,"../../Data/Const/Constant":24,"../../Common/Common":49,"../../Data/RuntimeMgr":88,"../../../Application/M":156,"./CellBase":104,"../../../Framework/Utils/Util":43,"../../Data/Const/BaseConst":97,"../../Common/AudioCtrl":161,"../View/EffLayerCtrl":128},"path":"preview-scripts/assets/Script/Game/Match3/Model/PropModel.js"},{"deps":{"./CellModel":115,"../../Common/Common":49,"./CellBase":104,"./MultipleGridColModel":119,"../../../Application/M":156,"./PropModel":121,"./GroundModel":112,"../../../Framework/Utils/Log":47,"../../Data/Const/Event":92,"../../../Framework/Utils/Util":43,"./UpGroundModel":124,"../../../Framework/Events/EventMgr":14,"./CollectModel":110,"../../Data/RuntimeMgr":88,"../../Data/Const/Constant":24,"./EnergyModel":111,"../../Data/Const/TimeConfig":100,"../../../Framework/Network/Sequence":38,"../Control/TaskCtrl":28,"../Control/LockCtrl":109,"./SpecialPlug/Girl":4,"./SpecialPlug/Conveyer":123},"path":"preview-scripts/assets/Script/Game/Match3/Model/GameModel.js"},{"deps":{"../GameModel":122,"../../../Common/Common":49,"../../MainCtrl":114},"path":"preview-scripts/assets/Script/Game/Match3/Model/SpecialPlug/Conveyer.js"},{"deps":{"./UpGroundCellModel":120},"path":"preview-scripts/assets/Script/Game/Match3/Model/UpGroundModel.js"},{"deps":{"./MultipleGridColBase":127,"../../../Common/Common":49,"../GameModel":122,"../CellBase":104,"../../../Data/Const/Constant":24},"path":"preview-scripts/assets/Script/Game/Match3/Model/multipleGridCol/CrabModel.js"},{"deps":{"./MultipleGridColBase":127,"../GameModel":122,"../../../Common/Common":49,"../CellBase":104},"path":"preview-scripts/assets/Script/Game/Match3/Model/multipleGridCol/TurtlesModel.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Match3/Model/multipleGridCol/MultipleGridColBase.js"},{"deps":{"./SpecialEffects":133,"./ComboFeedback":137,"../../../Application/M":156,"../../Data/Const/Constant":24,"../../Data/Const/Event":92,"../../Data/Const/TimeConfig":100,"../../Common/Common":49},"path":"preview-scripts/assets/Script/Game/Match3/View/EffLayerCtrl.js"},{"deps":{"./CellBase":104,"./GameModel":122,"../../Common/Common":49,"../../Data/RuntimeMgr":88,"../../Data/Const/Constant":24,"../../Data/Const/TimeConfig":100,"../View/EffLayerCtrl":128,"../../Common/GroupAnimatCtrl":53},"path":"preview-scripts/assets/Script/Game/Match3/Model/BombModel.js"},{"deps":{"../../../Application/M":156,"../../Data/Const/Constant":24,"./ItemBasicCellCtrl":148,"./BaseView":134,"../../Data/Const/Event":92,"../../Common/ActionCtrl":51,"../Model/GameModel":122,"../Skin/Match3Skin":29},"path":"preview-scripts/assets/Script/Game/Match3/View/BasicCellViewCtrl.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Match3/View/EffectTimeline.js"},{"deps":{"./BaseItemView":139,"../../../Application/M":156,"../../Data/Const/Constant":24,"../../../Framework/Components/SpinePlayerCtrl":32,"../../Data/Const/Event":92,"../../Data/Const/TimeConfig":100,"../ResCtrl":103,"../../Common/Common":49,"./Comp/Tuituji":31,"../Skin/Match3Skin":29},"path":"preview-scripts/assets/Script/Game/Match3/View/ItemGroundCtrl.js"},{"deps":{"./SpecialPieceArt":135,"./EffectTimeline":131,"../../Common/Common":49,"../Model/GameModel":122},"path":"preview-scripts/assets/Script/Game/Match3/View/SpecialEffects.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Match3/View/BaseView.js"},{"deps":{"../../Common/UI/ToyArt":69},"path":"preview-scripts/assets/Script/Game/Match3/View/SpecialPieceArt.js"},{"deps":{"./BaseItemView":139,"../../../Application/M":156,"../../Data/Const/Event":92,"../../Common/Common":49,"../../Data/Const/TimeConfig":100,"../../Data/Const/Constant":24,"../ResCtrl":103,"../Skin/Match3Skin":29},"path":"preview-scripts/assets/Script/Game/Match3/View/ItemUpgroundCtrl.js"},{"deps":{"../../../Application/M":156,"../../Data/Const/Constant":24,"../../Data/Const/Event":92,"../../Common/AudioCtrl":161},"path":"preview-scripts/assets/Script/Game/Match3/View/ComboFeedback.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Match3/View/TouchHintCtrl.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Match3/View/BaseItemView.js"},{"deps":{"../../../../Application/M":156,"../../Model/GameModel":122,"../../../Data/Const/Event":92,"./CollectItemCtrl":154,"../../../Data/RuntimeMgr":88,"../../Model/EnergyModel":111,"../../../Common/Common":49,"../../../Common/UI/ForestUI":65},"path":"preview-scripts/assets/Script/Game/Match3/View/UI/InfoPanelCtrl.js"},{"deps":{"../../Common/Common":49,"./BaseView":134,"../../../Application/M":156,"./ItemGroundCtrl":132,"../../Data/Const/Event":92,"../../Data/Const/Constant":24,"../Model/CollectModel":110,"../Model/GameModel":122,"../../../Framework/Components/SpinePlayerCtrl":32,"../../Data/Const/TimeConfig":100,"../../Common/ActionCtrl":51,"../Skin/Match3Skin":29},"path":"preview-scripts/assets/Script/Game/Match3/View/GroundViewCtrl.js"},{"deps":{"../../Common/Common":49,"./TutorialBubbleCtrl":144,"./TutorialBorderCtrl":145,"./TouchHintCtrl":138,"../../../Application/M":156,"../../Data/Const/Event":92},"path":"preview-scripts/assets/Script/Game/Match3/View/Match3TutorialCtrl.js"},{"deps":{"../Model/UpGroundCellModel":120,"../../../Application/M":156,"../../Data/Const/Constant":24,"./ItemUpgroundCtrl":136,"./BaseView":134,"../Model/GameModel":122,"../../Common/ActionCtrl":51,"../../Data/Const/Event":92,"../../Common/Common":49,"../../../Framework/Components/SpinePlayerCtrl":32,"../Skin/Match3Skin":29},"path":"preview-scripts/assets/Script/Game/Match3/View/UpGroundViewCtrl.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Match3/View/TutorialBubbleCtrl.js"},{"deps":{"../../Common/Common":49},"path":"preview-scripts/assets/Script/Game/Match3/View/TutorialBorderCtrl.js"},{"deps":{"../../../../Application/M":156,"./PropItemCtrl":8,"../../../Data/Const/Constant":24},"path":"preview-scripts/assets/Script/Game/Match3/View/UI/PropCtrl.js"},{"deps":{"./Adapters/Webapp":12,"./Adapters/Wechat":151,"../../Framework/Utils/Util":43,"../Data/Const/BaseConst":97},"path":"preview-scripts/assets/Script/Game/Platform/PlatformMgr.js"},{"deps":{"./SpecialPieceArt":135,"../../Common/Common":49,"../../../Application/M":156,"./BaseItemView":139,"../Model/CellBase":104,"../../Data/Const/Constant":24,"../../Data/Const/Event":92,"../../Data/Const/TimeConfig":100,"../../../Framework/Utils/Util":43,"../Control/RotatingCtrl":108,"../Model/GameModel":122,"../../Common/AudioCtrl":161,"../ResCtrl":103,"../Model/CollectModel":110,"../../../Application/Apps":9,"../../Common/GroupAnimatCtrl":53},"path":"preview-scripts/assets/Script/Game/Match3/View/ItemBasicCellCtrl.js"},{"deps":{"../../../Common/UI/ForestUI":65,"../../../Common/UI/PlayerPanels":66,"../../../Common/UI/OverHightLightCtrl":63,"./PropCtrl":146,"./InfoPanelCtrl":140,"../../../../Application/M":156,"../../../Data/Const/Event":92,"../../../Common/UI/UIMgr":76,"../../../Data/Interface/UIData":101,"../../../Data/Const/Constant":24,"../../../Common/Common":49,"../../../Services/ReportMgr":33,"../../../../Application/Apps":9},"path":"preview-scripts/assets/Script/Game/Match3/View/UI/MainUiCtrl.js"},{"deps":{"../../../Data/Const/Constant":24,"../../../../Application/M":156,"../../../Data/Interface/UIData":101,"../../../Data/Const/Event":92},"path":"preview-scripts/assets/Script/Game/Match3/View/UI/SelectPropCtrl.js"},{"deps":{"../../Data/Const/BaseConst":97,"../../../Framework/Events/EventMgr":14,"../../../Framework/Utils/Log":47,"../../../Framework/Utils/Util":43,"../../Config/Paths":78,"../../../Application/M":156,"../../Data/RuntimeMgr":88,"../../Services/NetMgr":160},"path":"preview-scripts/assets/Script/Game/Platform/Adapters/Wechat.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Platform/Adapters/IPlatform.js"},{"deps":{"./PlatformMgr":147,"../../Framework/Utils/SingletonFactory":44},"path":"preview-scripts/assets/Script/Game/Platform/DeviceMgr.js"},{"deps":{"../SpecialPieceArt":135,"../../ResCtrl":103,"../../../../Application/M":156,"../../Model/GameModel":122,"../../../Data/Const/Event":92,"../../Model/CollectModel":110,"../../../Data/Const/Constant":24,"../../../Common/Common":49,"../../../Data/RuntimeMgr":88},"path":"preview-scripts/assets/Script/Game/Match3/View/UI/CollectItemCtrl.js"},{"deps":{"../Common/UI/UIBase":74,"../../Application/M":156,"../Match3/View/UI/PropItemCtrl":8,"../Common/UI/UIMgr":76,"../Data/Interface/UIData":101},"path":"preview-scripts/assets/Script/Game/Views/PropDropView.js"},{"deps":{"../Game/Data/Const/Event":92,"../Game/Platform/PlatformMgr":147,"../Game/Platform/DeviceMgr":153,"../Framework/Pool/NodePoolMgr":13,"../Framework/Events/EventMgr":14,"../Game/Config/GameTableMgr":83,"../Framework/Resources/CacheMgr":15,"../Game/Common/UI/UIMgr":76,"../Game/Data/RuntimeMgr":88,"../Game/Common/Views/Tips":82,"../Game/Common/AudioCtrl":161,"../Game/Services/NetMgr":160},"path":"preview-scripts/assets/Script/Application/M.js"},{"deps":{"../Common/UI/UIBase":74,"../Common/UI/UIMgr":76,"../Data/Interface/UIData":101,"../../Application/M":156},"path":"preview-scripts/assets/Script/Game/Views/CommonRewardView.js"},{"deps":{"../Data/Const/Constant":24,"../../Application/M":156,"../Data/StorageMgr":87,"../Data/Const/Event":92},"path":"preview-scripts/assets/Script/Game/Services/DailyTaskMgr.js"},{"deps":{"../../Application/M":156,"../Data/Const/BaseConst":97,"../Config/Paths":78},"path":"preview-scripts/assets/Script/Game/Services/ShareMgr.js"},{"deps":{"../Platform/PlatformMgr":147,"../Config/Paths":78,"../../Framework/Network/HttpRequest":40,"../Data/StorageMgr":87,"../../Application/Apps":9,"../Data/RuntimeMgr":88,"../Data/Const/Constant":24,"../../Application/M":156},"path":"preview-scripts/assets/Script/Game/Services/NetMgr.js"},{"deps":{"../../Framework/Events/EventMgr":14,"../Data/Const/Event":92,"../Config/Paths":78,"../Data/Const/Constant":24,"../Data/StorageMgr":87},"path":"preview-scripts/assets/Script/Game/Common/AudioCtrl.js"}];
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
    