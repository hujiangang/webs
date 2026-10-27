
(function () {
var scripts = [{"deps":{"./assets/Script/Application/Apps":5,"./assets/Script/Application/Loading/LoadingScene":156,"./assets/Script/Debug/test":31,"./assets/Script/Debug/SpecialValidation":10,"./assets/Script/Framework/Async/withTimeout":157,"./assets/Script/Framework/Components/SpinePlayerCtrl":1,"./assets/Script/Framework/Components/TTMask":30,"./assets/Script/Framework/Components/SlideButton":35,"./assets/Script/Framework/Events/EventMgr":12,"./assets/Script/Framework/FrameworkOptions":34,"./assets/Script/Framework/Network/NetBase":36,"./assets/Script/Framework/Network/Sequence":11,"./assets/Script/Framework/Network/Socket":38,"./assets/Script/Framework/Network/HttpRequest":37,"./assets/Script/Framework/Pool/NodePoolMgr":14,"./assets/Script/Framework/Pool/DataPool":39,"./assets/Script/Framework/Resources/CacheMgr":13,"./assets/Script/Framework/Shader/ShaderTime":42,"./assets/Script/Framework/Shader/ShaderHelper":16,"./assets/Script/Framework/Utils/Log":17,"./assets/Script/Framework/Utils/MemoryDetector":40,"./assets/Script/Framework/Utils/NumberUtils":43,"./assets/Script/Framework/Utils/RoadUtil":47,"./assets/Script/Framework/Utils/SingletonFactory":54,"./assets/Script/Framework/Utils/Util":45,"./assets/Script/Framework/Utils/LRUCache":53,"./assets/Script/ThirdParty/console.save":15,"./assets/Script/Application/GameBootstrap":41,"./assets/Script/Game/Common/Common":49,"./assets/Script/Game/Common/CommonEnums":46,"./assets/Script/Game/Common/CommonInterfaces":44,"./assets/Script/Game/Common/GroupAnimatCtrl":50,"./assets/Script/Game/Common/ActionCtrl":52,"./assets/Script/Game/Common/Components/Button":6,"./assets/Script/Game/Common/UI/BagGridItemCtrl":48,"./assets/Script/Game/Common/UI/BoxGiftCtrl":59,"./assets/Script/Game/Common/UI/BoxOpenCtrl":56,"./assets/Script/Game/Common/UI/BoxTipsCtrl":55,"./assets/Script/Game/Common/UI/BuyPowerCtrl":60,"./assets/Script/Game/Common/UI/BuyPropPanel":51,"./assets/Script/Game/Common/UI/DialogPanel":57,"./assets/Script/Game/Common/UI/ForestUI":61,"./assets/Script/Game/Common/UI/GameFailEncouragePanel":58,"./assets/Script/Game/Common/UI/LoadingProgress":160,"./assets/Script/Game/Common/UI/MoreCoin":62,"./assets/Script/Game/Common/UI/MountainArt":158,"./assets/Script/Game/Common/UI/OverHightLightCtrl":67,"./assets/Script/Game/Common/UI/PlayerPanels":64,"./assets/Script/Game/Common/UI/SettingViewCtrl":79,"./assets/Script/Game/Common/UI/StoryTalkPanel":63,"./assets/Script/Game/Common/UI/TempLoadingPanel":66,"./assets/Script/Game/Common/UI/ToyArt":69,"./assets/Script/Game/Common/UI/UIBase":71,"./assets/Script/Game/Common/UI/UIMgr":70,"./assets/Script/Game/Common/UI/BagCtrl":65,"./assets/Script/Game/Common/UI/dailyTask/DailyItem":2,"./assets/Script/Game/Common/UI/dailyTask/DailyTaskPanel":72,"./assets/Script/Game/Common/UI/dailyTask/TimerTaskItem":76,"./assets/Script/Game/Common/UI/dailyTask/CustomTaskItem":68,"./assets/Script/Game/Common/UI/notify/NotifyRewardItemCtrl":20,"./assets/Script/Game/Common/UI/notify/NotifyPanel":75,"./assets/Script/Game/Common/UI/shop/ShopToolsItemCtrl":19,"./assets/Script/Game/Common/UI/shop/ShopPanel":74,"./assets/Script/Game/Common/Views/View":18,"./assets/Script/Game/Common/Views/Tips":73,"./assets/Script/Game/Config/Paths":77,"./assets/Script/Game/Config/GameTableMgr":78,"./assets/Script/Game/Config/Loader/BytesTable":81,"./assets/Script/Game/Config/Loader/BaseTable":7,"./assets/Script/Game/Config/Tables/ChapterInfo":83,"./assets/Script/Game/Config/Tables/ChapterStory":21,"./assets/Script/Game/Config/Tables/DailyTaskInfo":82,"./assets/Script/Game/Config/Tables/LevelUpReward":92,"./assets/Script/Game/Config/Tables/PropInfo":84,"./assets/Script/Game/Config/Tables/ShareCfg":85,"./assets/Script/Game/Config/Tables/ShopInfo":91,"./assets/Script/Game/Config/Tables/Titles":87,"./assets/Script/Game/Config/Tables/BoxRewardInfo":89,"./assets/Script/Game/Data/RuntimeMgr":86,"./assets/Script/Game/Data/StorageMgr":80,"./assets/Script/Game/Data/Const/Constant":22,"./assets/Script/Game/Data/Const/Event":88,"./assets/Script/Game/Data/Const/TimeConfig":90,"./assets/Script/Game/Data/Const/BaseConst":94,"./assets/Script/Game/Data/Interface/Tutorial":99,"./assets/Script/Game/Data/Interface/UIData":98,"./assets/Script/Game/Data/Interface/Level":96,"./assets/Script/Game/Data/Interface/Level/ITutorial":3,"./assets/Script/Game/Data/Interface/Level/ILevel":95,"./assets/Script/Game/Data/MoneyManager":93,"./assets/Script/Game/Data/Player/PlayerInfo":24,"./assets/Script/Game/Home/HomeNavigation":100,"./assets/Script/Game/Home/HomeScene":101,"./assets/Script/Game/Home/LobbyCatalog":23,"./assets/Script/Game/Home/HomeArt":159,"./assets/Script/Game/Match3/ResCtrl":97,"./assets/Script/Game/Match3/Config/ResourcePath":26,"./assets/Script/Game/Match3/Control/RotatingCtrl":102,"./assets/Script/Game/Match3/Control/TaskCtrl":25,"./assets/Script/Game/Match3/Control/LockCtrl":104,"./assets/Script/Game/Match3/MainCtrl":105,"./assets/Script/Game/Match3/Model/CellBase":103,"./assets/Script/Game/Match3/Model/CellModel":106,"./assets/Script/Game/Match3/Model/CollectModel":109,"./assets/Script/Game/Match3/Model/EnergyModel":108,"./assets/Script/Game/Match3/Model/GameModel":119,"./assets/Script/Game/Match3/Model/GameTaskModel":112,"./assets/Script/Game/Match3/Model/GroundCellModel":107,"./assets/Script/Game/Match3/Model/GroundModel":110,"./assets/Script/Game/Match3/Model/MultipleGridColModel":113,"./assets/Script/Game/Match3/Model/PropModel":111,"./assets/Script/Game/Match3/Model/SpecialCell":114,"./assets/Script/Game/Match3/Model/UpGroundCellModel":118,"./assets/Script/Game/Match3/Model/UpGroundModel":116,"./assets/Script/Game/Match3/Model/BombModel":121,"./assets/Script/Game/Match3/Model/SpecialPlug/Girl":4,"./assets/Script/Game/Match3/Model/SpecialPlug/Mushroom":117,"./assets/Script/Game/Match3/Model/SpecialPlug/Conveyer":123,"./assets/Script/Game/Match3/Model/multipleGridCol/GnomeModel":27,"./assets/Script/Game/Match3/Model/multipleGridCol/MultipleGridColBase":126,"./assets/Script/Game/Match3/Model/multipleGridCol/TurtlesModel":122,"./assets/Script/Game/Match3/Model/multipleGridCol/CrabModel":125,"./assets/Script/Game/Match3/Skin/Match3Skin":28,"./assets/Script/Game/Match3/View/BaseView":115,"./assets/Script/Game/Match3/View/BasicCellViewCtrl":127,"./assets/Script/Game/Match3/View/ComboFeedback":161,"./assets/Script/Game/Match3/View/EffLayerCtrl":128,"./assets/Script/Game/Match3/View/EffectTimeline":120,"./assets/Script/Game/Match3/View/GroundViewCtrl":129,"./assets/Script/Game/Match3/View/ItemBasicCellCtrl":141,"./assets/Script/Game/Match3/View/ItemGroundCtrl":124,"./assets/Script/Game/Match3/View/ItemUpgroundCtrl":131,"./assets/Script/Game/Match3/View/Match3TutorialCtrl":133,"./assets/Script/Game/Match3/View/SpecialEffects":130,"./assets/Script/Game/Match3/View/SpecialPieceArt":132,"./assets/Script/Game/Match3/View/TouchHintCtrl":138,"./assets/Script/Game/Match3/View/TutorialBorderCtrl":135,"./assets/Script/Game/Match3/View/TutorialBubbleCtrl":134,"./assets/Script/Game/Match3/View/UpGroundViewCtrl":137,"./assets/Script/Game/Match3/View/BaseItemView":139,"./assets/Script/Game/Match3/View/Comp/Tuituji":8,"./assets/Script/Game/Match3/View/UI/InfoPanelCtrl":29,"./assets/Script/Game/Match3/View/UI/MainUiCtrl":140,"./assets/Script/Game/Match3/View/UI/PropCtrl":142,"./assets/Script/Game/Match3/View/UI/PropItemCtrl":146,"./assets/Script/Game/Match3/View/UI/SelectPropCtrl":147,"./assets/Script/Game/Match3/View/UI/CollectItemCtrl":151,"./assets/Script/Game/Platform/PlatformMgr":144,"./assets/Script/Game/Platform/Adapters/Webapp":9,"./assets/Script/Game/Platform/Adapters/Wechat":143,"./assets/Script/Game/Platform/Adapters/IPlatform":149,"./assets/Script/Game/Platform/DeviceMgr":136,"./assets/Script/Game/Services/NetMgr":145,"./assets/Script/Game/Services/ReportMgr":148,"./assets/Script/Game/Services/ShareMgr":32,"./assets/Script/Game/Services/DailyTaskMgr":152,"./assets/Script/Game/Views/GMView":155,"./assets/Script/Game/Views/PropDropView":33,"./assets/Script/Game/Views/CommonRewardView":153,"./assets/Script/Game/Common/AudioCtrl":154,"./assets/Script/Application/M":150},"path":"preview-scripts/__qc_index__.js"},{"deps":{},"path":"preview-scripts/assets/Script/Framework/Components/SpinePlayerCtrl.js"},{"deps":{"../../../../Application/M":150,"../../../Data/Const/Constant":22,"../../../Data/StorageMgr":80,"../../../Services/DailyTaskMgr":152,"../../../Data/Interface/UIData":98},"path":"preview-scripts/assets/Script/Game/Common/UI/dailyTask/DailyItem.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Data/Interface/Level/ITutorial.js"},{"deps":{"../GameModel":119,"../../../Common/Common":49,"../../../Data/Const/Constant":22},"path":"preview-scripts/assets/Script/Game/Match3/Model/SpecialPlug/Girl.js"},{"deps":{"../Framework/FrameworkOptions":34,"../Framework/Utils/Util":45},"path":"preview-scripts/assets/Script/Application/Apps.js"},{"deps":{"../../../Framework/Events/EventMgr":12,"../../Data/Const/Event":88,"../AudioCtrl":154},"path":"preview-scripts/assets/Script/Game/Common/Components/Button.js"},{"deps":{"./BytesTable":81,"../../../Framework/Utils/Util":45,"../../../Framework/Utils/Log":17},"path":"preview-scripts/assets/Script/Game/Config/Loader/BaseTable.js"},{"deps":{"../../Model/GameModel":119,"../../../Common/GroupAnimatCtrl":50,"../../../Data/Const/Constant":22},"path":"preview-scripts/assets/Script/Game/Match3/View/Comp/Tuituji.js"},{"deps":{"../../Data/Const/BaseConst":94,"../../../Framework/Utils/Log":17,"../../Data/StorageMgr":80},"path":"preview-scripts/assets/Script/Game/Platform/Adapters/Webapp.js"},{"deps":{},"path":"preview-scripts/assets/Script/Debug/SpecialValidation.js"},{"deps":{},"path":"preview-scripts/assets/Script/Framework/Network/Sequence.js"},{"deps":{"../Pool/DataPool":39,"../Utils/SingletonFactory":54},"path":"preview-scripts/assets/Script/Framework/Events/EventMgr.js"},{"deps":{"../Utils/SingletonFactory":54},"path":"preview-scripts/assets/Script/Framework/Resources/CacheMgr.js"},{"deps":{"../Utils/SingletonFactory":54},"path":"preview-scripts/assets/Script/Framework/Pool/NodePoolMgr.js"},{"deps":{},"path":"preview-scripts/assets/Script/ThirdParty/console.save.js"},{"deps":{},"path":"preview-scripts/assets/Script/Framework/Shader/ShaderHelper.js"},{"deps":{"../FrameworkOptions":34},"path":"preview-scripts/assets/Script/Framework/Utils/Log.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Common/Views/View.js"},{"deps":{"../../Common":49,"../../../Data/MoneyManager":93,"../../../../Application/M":150},"path":"preview-scripts/assets/Script/Game/Common/UI/shop/ShopToolsItemCtrl.js"},{"deps":{"../../Common":49,"../../../Data/Const/Constant":22,"../../../Data/Const/BaseConst":94},"path":"preview-scripts/assets/Script/Game/Common/UI/notify/NotifyRewardItemCtrl.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Config/Tables/ChapterStory.js"},{"deps":{"../../../Framework/Utils/Util":45},"path":"preview-scripts/assets/Script/Game/Data/Const/Constant.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Home/LobbyCatalog.js"},{"deps":{"../Const/Constant":22,"../StorageMgr":80},"path":"preview-scripts/assets/Script/Game/Data/Player/PlayerInfo.js"},{"deps":{"../../../Application/M":150,"../../Data/Const/Event":88,"../../Data/Const/TimeConfig":90,"../Model/GameTaskModel":112,"../../../Framework/Pool/DataPool":39},"path":"preview-scripts/assets/Script/Game/Match3/Control/TaskCtrl.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Match3/Config/ResourcePath.js"},{"deps":{"./MultipleGridColBase":126,"../../../Common/Common":49},"path":"preview-scripts/assets/Script/Game/Match3/Model/multipleGridCol/GnomeModel.js"},{"deps":{"../../Common/Common":49,"../Config/ResourcePath":26},"path":"preview-scripts/assets/Script/Game/Match3/Skin/Match3Skin.js"},{"deps":{"./CollectItemCtrl":151,"../../../../Application/M":150,"../../Model/EnergyModel":108,"../../Model/GameModel":119,"../../../Data/Const/Event":88,"../../../Data/RuntimeMgr":86,"../../../Common/Common":49,"../../../Common/UI/ForestUI":61},"path":"preview-scripts/assets/Script/Game/Match3/View/UI/InfoPanelCtrl.js"},{"deps":{},"path":"preview-scripts/assets/Script/Framework/Components/TTMask.js"},{"deps":{"../Framework/Events/EventMgr":12,"../Framework/Network/HttpRequest":37,"../Framework/Network/Socket":38,"../Game/Data/Const/Event":88,"../Game/Config/GameTableMgr":78,"../Game/Data/RuntimeMgr":86,"../Game/Data/Const/BaseConst":94,"../Game/Data/Interface/Level":96},"path":"preview-scripts/assets/Script/Debug/test.js"},{"deps":{"../../Application/M":150,"../Data/Const/BaseConst":94,"../Config/Paths":77},"path":"preview-scripts/assets/Script/Game/Services/ShareMgr.js"},{"deps":{"../Common/UI/UIBase":71,"../../Application/M":150,"../Match3/View/UI/PropItemCtrl":146,"../Common/UI/UIMgr":70,"../Data/Interface/UIData":98},"path":"preview-scripts/assets/Script/Game/Views/PropDropView.js"},{"deps":{},"path":"preview-scripts/assets/Script/Framework/FrameworkOptions.js"},{"deps":{},"path":"preview-scripts/assets/Script/Framework/Components/SlideButton.js"},{"deps":{"./Sequence":11},"path":"preview-scripts/assets/Script/Framework/Network/NetBase.js"},{"deps":{"./NetBase":36,"../Utils/Log":17,"../FrameworkOptions":34},"path":"preview-scripts/assets/Script/Framework/Network/HttpRequest.js"},{"deps":{"./NetBase":36,"../Utils/Log":17},"path":"preview-scripts/assets/Script/Framework/Network/Socket.js"},{"deps":{},"path":"preview-scripts/assets/Script/Framework/Pool/DataPool.js"},{"deps":{},"path":"preview-scripts/assets/Script/Framework/Utils/MemoryDetector.js"},{"deps":{"./M":150,"../Game/Data/Const/Constant":22,"../Game/Config/GameTableMgr":78,"../Game/Config/Paths":77,"../Game/Config/Tables/DailyTaskInfo":82,"../Game/Config/Loader/BaseTable":7,"../Framework/Async/withTimeout":157},"path":"preview-scripts/assets/Script/Application/GameBootstrap.js"},{"deps":{},"path":"preview-scripts/assets/Script/Framework/Shader/ShaderTime.js"},{"deps":{},"path":"preview-scripts/assets/Script/Framework/Utils/NumberUtils.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Common/CommonInterfaces.js"},{"deps":{},"path":"preview-scripts/assets/Script/Framework/Utils/Util.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Common/CommonEnums.js"},{"deps":{},"path":"preview-scripts/assets/Script/Framework/Utils/RoadUtil.js"},{"deps":{"../../../Application/M":150,"../../Data/Const/Event":88,"../Common":49},"path":"preview-scripts/assets/Script/Game/Common/UI/BagGridItemCtrl.js"},{"deps":{"../Match3/Model/GameModel":119,"../../Framework/Utils/Util":45,"../Data/Const/Constant":22,"../../Framework/Pool/NodePoolMgr":14,"../../Framework/Components/SpinePlayerCtrl":1,"../../Application/M":150},"path":"preview-scripts/assets/Script/Game/Common/Common.js"},{"deps":{"../../Framework/Utils/SingletonFactory":54,"../Match3/Model/GameModel":119,"./Common":49,"../Data/Const/TimeConfig":90,"../../Application/M":150,"../Data/Const/Event":88,"../Data/Const/Constant":22,"../../Framework/Utils/Util":45,"./AudioCtrl":154},"path":"preview-scripts/assets/Script/Game/Common/GroupAnimatCtrl.js"},{"deps":{"./UIBase":71,"../../Data/Const/Constant":22,"../../../Application/M":150,"../Common":49,"../../Data/Interface/UIData":98,"../../Services/ReportMgr":148},"path":"preview-scripts/assets/Script/Game/Common/UI/BuyPropPanel.js"},{"deps":{"../../Framework/Utils/SingletonFactory":54,"../Match3/Model/GameModel":119,"./Common":49,"../../Framework/Utils/Util":45,"../Data/Const/TimeConfig":90,"../Data/Const/Constant":22},"path":"preview-scripts/assets/Script/Game/Common/ActionCtrl.js"},{"deps":{},"path":"preview-scripts/assets/Script/Framework/Utils/LRUCache.js"},{"deps":{},"path":"preview-scripts/assets/Script/Framework/Utils/SingletonFactory.js"},{"deps":{"../../../Application/M":150,"../../Data/Const/Constant":22,"../../Data/Const/BaseConst":94,"../Common":49,"../../../Framework/Utils/Util":45},"path":"preview-scripts/assets/Script/Game/Common/UI/BoxTipsCtrl.js"},{"deps":{"./UIBase":71,"../../../Application/M":150,"../../Data/Interface/UIData":98,"../../Data/Const/Event":88,"../../../Framework/Events/EventMgr":12,"../AudioCtrl":154},"path":"preview-scripts/assets/Script/Game/Common/UI/BoxOpenCtrl.js"},{"deps":{"./ForestUI":61,"./UIBase":71,"./UIMgr":70,"../Common":49,"../AudioCtrl":154,"../../../Application/M":150,"../../Data/StorageMgr":80,"../../Data/Interface/UIData":98,"../../Data/Const/Constant":22,"../../Data/Const/BaseConst":94,"../../Data/Const/Event":88,"../../Data/RuntimeMgr":86,"../../Services/ShareMgr":32,"../../../Framework/Events/EventMgr":12,"../../../Framework/Components/SlideButton":35,"../../Match3/View/UI/SelectPropCtrl":147,"../../Match3/View/UI/CollectItemCtrl":151},"path":"preview-scripts/assets/Script/Game/Common/UI/DialogPanel.js"},{"deps":{"./ForestUI":61,"./UIBase":71,"../Common":49,"../../../Application/M":150,"../../Data/Interface/UIData":98,"../../Data/Const/Event":88,"../../Data/Const/Constant":22,"../../Data/Const/BaseConst":94,"../../Data/StorageMgr":80,"../../Config/Paths":77,"../../Match3/Model/GameModel":119,"../../Match3/ResCtrl":97,"../../../Framework/Events/EventMgr":12},"path":"preview-scripts/assets/Script/Game/Common/UI/GameFailEncouragePanel.js"},{"deps":{"../../../Application/M":150,"../Common":49,"../../../Framework/Utils/Util":45,"../../Data/Interface/UIData":98,"../../Data/Const/Event":88,"./BoxTipsCtrl":55},"path":"preview-scripts/assets/Script/Game/Common/UI/BoxGiftCtrl.js"},{"deps":{"../../../Application/M":150,"../../Data/Const/Constant":22,"../../Data/Const/BaseConst":94,"../Common":49,"../../Data/Const/Event":88,"../../../Framework/Utils/Util":45,"../../Data/MoneyManager":93},"path":"preview-scripts/assets/Script/Game/Common/UI/BuyPowerCtrl.js"},{"deps":{"./ToyArt":69,"./MountainArt":158,"../../Match3/View/SpecialPieceArt":132},"path":"preview-scripts/assets/Script/Game/Common/UI/ForestUI.js"},{"deps":{"./UIBase":71,"./UIMgr":70,"../../Data/Interface/UIData":98},"path":"preview-scripts/assets/Script/Game/Common/UI/MoreCoin.js"},{"deps":{"./UIBase":71,"./UIMgr":70,"../../Data/Interface/UIData":98},"path":"preview-scripts/assets/Script/Game/Common/UI/StoryTalkPanel.js"},{"deps":{"./ForestUI":61,"../Common":49,"../../../Application/M":150,"../../Data/Const/Constant":22,"../../Data/Const/Event":88,"../../Data/StorageMgr":80,"../../Home/LobbyCatalog":23},"path":"preview-scripts/assets/Script/Game/Common/UI/PlayerPanels.js"},{"deps":{"./UIBase":71,"./UIMgr":70,"../../Data/Interface/UIData":98,"../../../Application/M":150,"./BagGridItemCtrl":48,"../../Data/Const/Constant":22,"../../Data/Const/Event":88,"../../Data/Const/BaseConst":94,"../Common":49},"path":"preview-scripts/assets/Script/Game/Common/UI/BagCtrl.js"},{"deps":{"./UIBase":71,"./ForestUI":61,"./MountainArt":158,"./LoadingProgress":160,"../../../Framework/Events/EventMgr":12,"../../Data/Const/Event":88},"path":"preview-scripts/assets/Script/Game/Common/UI/TempLoadingPanel.js"},{"deps":{"../../Match3/Model/GameModel":119,"../../../Application/M":150,"../../Data/Const/Event":88},"path":"preview-scripts/assets/Script/Game/Common/UI/OverHightLightCtrl.js"},{"deps":{"../../../Services/DailyTaskMgr":152,"../../../../Application/M":150,"../../../Data/Const/Event":88,"../../../Data/Interface/UIData":98},"path":"preview-scripts/assets/Script/Game/Common/UI/dailyTask/CustomTaskItem.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Common/UI/ToyArt.js"},{"deps":{"./UIBase":71,"../../Data/Interface/UIData":98,"../../../Framework/Utils/Log":17,"../../../Framework/Utils/LRUCache":53,"../../../Framework/Events/EventMgr":12,"../../Data/Const/BaseConst":94,"../../Data/Const/Event":88},"path":"preview-scripts/assets/Script/Game/Common/UI/UIMgr.js"},{"deps":{"../../../Framework/Events/EventMgr":12},"path":"preview-scripts/assets/Script/Game/Common/UI/UIBase.js"},{"deps":{"../UIBase":71,"../../../../Application/M":150,"../../../Data/Interface/UIData":98,"./DailyItem":2,"./TimerTaskItem":76,"../../../Data/Const/Event":88,"../../../../Framework/Utils/Util":45,"./CustomTaskItem":68,"../../../Services/DailyTaskMgr":152},"path":"preview-scripts/assets/Script/Game/Common/UI/dailyTask/DailyTaskPanel.js"},{"deps":{"./View":18},"path":"preview-scripts/assets/Script/Game/Common/Views/Tips.js"},{"deps":{"../UIBase":71,"../../../Data/Interface/UIData":98,"../../../../Application/M":150,"./ShopToolsItemCtrl":19},"path":"preview-scripts/assets/Script/Game/Common/UI/shop/ShopPanel.js"},{"deps":{"../UIBase":71,"../../../../Application/M":150,"../UIMgr":70,"../../../Data/Interface/UIData":98,"./NotifyRewardItemCtrl":20,"../BoxTipsCtrl":55},"path":"preview-scripts/assets/Script/Game/Common/UI/notify/NotifyPanel.js"},{"deps":{"../../../Data/StorageMgr":80,"../../../../Application/M":150,"../../../Data/Const/Event":88,"../../../../Framework/Utils/Util":45,"../../../Data/Interface/UIData":98},"path":"preview-scripts/assets/Script/Game/Common/UI/dailyTask/TimerTaskItem.js"},{"deps":{"../../Application/Apps":5},"path":"preview-scripts/assets/Script/Game/Config/Paths.js"},{"deps":{"./Loader/BaseTable":7,"../../Framework/Utils/SingletonFactory":54,"./Tables/Titles":87,"./Tables/ChapterStory":21,"./Tables/ChapterInfo":83,"./Tables/PropInfo":84,"./Tables/BoxRewardInfo":89,"./Tables/LevelUpReward":92,"./Tables/ShareCfg":85,"./Tables/ShopInfo":91},"path":"preview-scripts/assets/Script/Game/Config/GameTableMgr.js"},{"deps":{"../../Data/Const/Constant":22,"../../../Application/M":150,"../../Data/Const/Event":88,"../Common":49,"../../Data/Interface/UIData":98,"../../Data/StorageMgr":80,"../../Services/ReportMgr":148,"../../Match3/Model/GameModel":119},"path":"preview-scripts/assets/Script/Game/Common/UI/SettingViewCtrl.js"},{"deps":{"../Services/NetMgr":145,"../Platform/PlatformMgr":144,"./Const/BaseConst":94},"path":"preview-scripts/assets/Script/Game/Data/StorageMgr.js"},{"deps":{"../Paths":77},"path":"preview-scripts/assets/Script/Game/Config/Loader/BytesTable.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Config/Tables/DailyTaskInfo.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Config/Tables/ChapterInfo.js"},{"deps":{"../../Data/Const/BaseConst":94},"path":"preview-scripts/assets/Script/Game/Config/Tables/PropInfo.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Config/Tables/ShareCfg.js"},{"deps":{"./Player/PlayerInfo":24,"../../Framework/Utils/SingletonFactory":54,"./Const/BaseConst":94,"../../Framework/Events/EventMgr":12,"./Const/Event":88,"./Const/Constant":22,"../../Application/M":150,"../../Application/Apps":5,"./StorageMgr":80,"../Services/ReportMgr":148,"../Common/Common":49,"../Services/DailyTaskMgr":152},"path":"preview-scripts/assets/Script/Game/Data/RuntimeMgr.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Config/Tables/Titles.js"},{"deps":{"../../../Framework/Utils/Util":45},"path":"preview-scripts/assets/Script/Game/Data/Const/Event.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Config/Tables/BoxRewardInfo.js"},{"deps":{"../../../Framework/Utils/Util":45,"./Constant":22},"path":"preview-scripts/assets/Script/Game/Data/Const/TimeConfig.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Config/Tables/ShopInfo.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Config/Tables/LevelUpReward.js"},{"deps":{"./Const/BaseConst":94,"../../Application/M":150,"./Const/Constant":22},"path":"preview-scripts/assets/Script/Game/Data/MoneyManager.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Data/Const/BaseConst.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Data/Interface/Level/ILevel.js"},{"deps":{"../../../Framework/Utils/SingletonFactory":54,"../RuntimeMgr":86,"../../Config/Paths":77},"path":"preview-scripts/assets/Script/Game/Data/Interface/Level.js"},{"deps":{"./View/SpecialPieceArt":132,"../Data/Const/Constant":22,"../Data/RuntimeMgr":86,"../Common/Common":49,"./Model/GameModel":119,"./Config/ResourcePath":26},"path":"preview-scripts/assets/Script/Game/Match3/ResCtrl.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Data/Interface/UIData.js"},{"deps":{"../../../Framework/Utils/SingletonFactory":54,"../RuntimeMgr":86,"../../Config/Paths":77},"path":"preview-scripts/assets/Script/Game/Data/Interface/Tutorial.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Home/HomeNavigation.js"},{"deps":{"./HomeArt":159,"./HomeNavigation":100,"./LobbyCatalog":23,"../../Application/M":150,"../../Application/Apps":5,"../../Application/GameBootstrap":41,"../Common/Common":49,"../Common/UI/MountainArt":158,"../Common/UI/ForestUI":61,"../Common/UI/PlayerPanels":64,"../Common/UI/ToyArt":69,"../Common/AudioCtrl":154,"../../Debug/SpecialValidation":10,"../Data/Const/Event":88,"../Data/Interface/UIData":98,"../Data/Interface/Level":96,"../Data/Const/Constant":22,"../Match3/View/ComboFeedback":161},"path":"preview-scripts/assets/Script/Game/Home/HomeScene.js"},{"deps":{"../../Data/Const/TimeConfig":90},"path":"preview-scripts/assets/Script/Game/Match3/Control/RotatingCtrl.js"},{"deps":{"../../Common/Common":49},"path":"preview-scripts/assets/Script/Game/Match3/Model/CellBase.js"},{"deps":{"../../Common/Common":49,"../../../Framework/Utils/Util":45,"../Model/GameModel":119},"path":"preview-scripts/assets/Script/Game/Match3/Control/LockCtrl.js"},{"deps":{"./ResCtrl":97,"../Common/ActionCtrl":52,"../Common/GroupAnimatCtrl":50,"../Common/AudioCtrl":154,"../Common/UI/MountainArt":158,"../Common/UI/UIMgr":70,"../Common/UI/OverHightLightCtrl":67,"../Common/UI/ToyArt":69,"../Common/Common":49,"../../Application/M":150,"./Model/CollectModel":109,"./Model/CellBase":103,"./Model/GameModel":119,"../Config/Paths":77,"./View/UpGroundViewCtrl":137,"./View/BasicCellViewCtrl":127,"./View/EffLayerCtrl":128,"./View/Match3TutorialCtrl":133,"./View/UI/MainUiCtrl":140,"./View/GroundViewCtrl":129,"./Skin/Match3Skin":28,"../Data/Interface/UIData":98,"../Data/Interface/Level":96,"../Data/Const/Constant":22,"../Data/Const/TimeConfig":90,"../Data/Const/Event":88,"../Data/Interface/Tutorial":99,"../../Framework/Utils/Log":17,"../../Framework/Utils/Util":45},"path":"preview-scripts/assets/Script/Game/Match3/MainCtrl.js"},{"deps":{"../../Common/Common":49,"./GameModel":119,"./SpecialPlug/Girl":4,"./BombModel":121,"./CellBase":103,"../../../Framework/Utils/Util":45,"../../Data/Const/TimeConfig":90,"../../Data/Const/Constant":22,"../../../Application/M":150,"../../../Framework/Events/EventMgr":12,"../../Data/Const/Event":88,"../../Common/AudioCtrl":154},"path":"preview-scripts/assets/Script/Game/Match3/Model/CellModel.js"},{"deps":{"./CellBase":103,"../../Common/Common":49,"./GameModel":119,"./CollectModel":109,"./SpecialPlug/Conveyer":123,"../../Data/Const/Constant":22,"./SpecialPlug/Mushroom":117},"path":"preview-scripts/assets/Script/Game/Match3/Model/GroundCellModel.js"},{"deps":{"../../../Application/M":150,"../../Data/Const/Event":88,"../../../Framework/Utils/SingletonFactory":54,"./GameModel":119,"../../Common/Common":49,"../../../Framework/Utils/Util":45,"../../Data/Const/Constant":22},"path":"preview-scripts/assets/Script/Game/Match3/Model/EnergyModel.js"},{"deps":{"../../../Application/M":150,"../../Data/Const/Event":88,"../../../Framework/Utils/Log":17,"./GameModel":119,"../../Common/Common":49,"../../Data/Const/Constant":22},"path":"preview-scripts/assets/Script/Game/Match3/Model/CollectModel.js"},{"deps":{"./GroundCellModel":107},"path":"preview-scripts/assets/Script/Game/Match3/Model/GroundModel.js"},{"deps":{"../../../Framework/Events/EventMgr":12,"../../Data/Const/Event":88,"../../Data/Const/Constant":22,"../../Common/Common":49,"../../Data/RuntimeMgr":86,"../../../Application/M":150,"./CellBase":103,"../../../Framework/Utils/Util":45,"../../Data/Const/BaseConst":94,"../../Common/AudioCtrl":154,"../View/EffLayerCtrl":128},"path":"preview-scripts/assets/Script/Game/Match3/Model/PropModel.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Match3/Model/GameTaskModel.js"},{"deps":{"./multipleGridCol/GnomeModel":27,"./multipleGridCol/TurtlesModel":122,"./multipleGridCol/CrabModel":125},"path":"preview-scripts/assets/Script/Game/Match3/Model/MultipleGridColModel.js"},{"deps":{"../../Data/Const/Constant":22},"path":"preview-scripts/assets/Script/Game/Match3/Model/SpecialCell.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Match3/View/BaseView.js"},{"deps":{"./UpGroundCellModel":118},"path":"preview-scripts/assets/Script/Game/Match3/Model/UpGroundModel.js"},{"deps":{"../GameModel":119},"path":"preview-scripts/assets/Script/Game/Match3/Model/SpecialPlug/Mushroom.js"},{"deps":{"./CellBase":103,"./SpecialCell":114,"../../Common/Common":49,"./GameModel":119,"./CollectModel":109,"../../../Application/M":150,"../../Data/Const/Constant":22},"path":"preview-scripts/assets/Script/Game/Match3/Model/UpGroundCellModel.js"},{"deps":{"./CellModel":106,"../../Common/Common":49,"./CellBase":103,"./MultipleGridColModel":113,"../../../Application/M":150,"./PropModel":111,"./GroundModel":110,"../../../Framework/Utils/Log":17,"../../Data/Const/Event":88,"../../../Framework/Utils/Util":45,"./UpGroundModel":116,"../../../Framework/Events/EventMgr":12,"./CollectModel":109,"../../Data/RuntimeMgr":86,"../../Data/Const/Constant":22,"./EnergyModel":108,"../../Data/Const/TimeConfig":90,"../../../Framework/Network/Sequence":11,"../Control/TaskCtrl":25,"../Control/LockCtrl":104,"./SpecialPlug/Girl":4,"./SpecialPlug/Conveyer":123},"path":"preview-scripts/assets/Script/Game/Match3/Model/GameModel.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Match3/View/EffectTimeline.js"},{"deps":{"./CellBase":103,"./GameModel":119,"../../Common/Common":49,"../../Data/RuntimeMgr":86,"../../Data/Const/Constant":22,"../../Data/Const/TimeConfig":90,"../View/EffLayerCtrl":128,"../../Common/GroupAnimatCtrl":50},"path":"preview-scripts/assets/Script/Game/Match3/Model/BombModel.js"},{"deps":{"./MultipleGridColBase":126,"../GameModel":119,"../../../Common/Common":49,"../CellBase":103},"path":"preview-scripts/assets/Script/Game/Match3/Model/multipleGridCol/TurtlesModel.js"},{"deps":{"../GameModel":119,"../../../Common/Common":49,"../../MainCtrl":105},"path":"preview-scripts/assets/Script/Game/Match3/Model/SpecialPlug/Conveyer.js"},{"deps":{"./BaseItemView":139,"../../../Application/M":150,"../../Data/Const/Constant":22,"../../../Framework/Components/SpinePlayerCtrl":1,"../../Data/Const/Event":88,"../../Data/Const/TimeConfig":90,"../ResCtrl":97,"../../Common/Common":49,"./Comp/Tuituji":8,"../Skin/Match3Skin":28},"path":"preview-scripts/assets/Script/Game/Match3/View/ItemGroundCtrl.js"},{"deps":{"./MultipleGridColBase":126,"../../../Common/Common":49,"../GameModel":119,"../CellBase":103,"../../../Data/Const/Constant":22},"path":"preview-scripts/assets/Script/Game/Match3/Model/multipleGridCol/CrabModel.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Match3/Model/multipleGridCol/MultipleGridColBase.js"},{"deps":{"../../../Application/M":150,"../../Data/Const/Constant":22,"./ItemBasicCellCtrl":141,"./BaseView":115,"../../Data/Const/Event":88,"../../Common/ActionCtrl":52,"../Model/GameModel":119,"../Skin/Match3Skin":28},"path":"preview-scripts/assets/Script/Game/Match3/View/BasicCellViewCtrl.js"},{"deps":{"./SpecialEffects":130,"./ComboFeedback":161,"../../../Application/M":150,"../../Common/Common":49,"../../Data/Const/TimeConfig":90,"../../Data/Const/Constant":22,"../../Data/Const/Event":88},"path":"preview-scripts/assets/Script/Game/Match3/View/EffLayerCtrl.js"},{"deps":{"./BaseView":115,"./ItemGroundCtrl":124,"../../Common/ActionCtrl":52,"../../Common/Common":49,"../../../Application/M":150,"../Model/GameModel":119,"../Model/CollectModel":109,"../Skin/Match3Skin":28,"../../Data/Const/TimeConfig":90,"../../Data/Const/Event":88,"../../Data/Const/Constant":22,"../../../Framework/Components/SpinePlayerCtrl":1},"path":"preview-scripts/assets/Script/Game/Match3/View/GroundViewCtrl.js"},{"deps":{"./SpecialPieceArt":132,"./EffectTimeline":120,"../../Common/Common":49,"../Model/GameModel":119},"path":"preview-scripts/assets/Script/Game/Match3/View/SpecialEffects.js"},{"deps":{"./BaseItemView":139,"../../../Application/M":150,"../../Data/Const/Event":88,"../../Common/Common":49,"../../Data/Const/TimeConfig":90,"../../Data/Const/Constant":22,"../ResCtrl":97,"../Skin/Match3Skin":28},"path":"preview-scripts/assets/Script/Game/Match3/View/ItemUpgroundCtrl.js"},{"deps":{"../../Common/UI/ToyArt":69},"path":"preview-scripts/assets/Script/Game/Match3/View/SpecialPieceArt.js"},{"deps":{"../../Common/Common":49,"./TutorialBubbleCtrl":134,"./TutorialBorderCtrl":135,"./TouchHintCtrl":138,"../../../Application/M":150,"../../Data/Const/Event":88},"path":"preview-scripts/assets/Script/Game/Match3/View/Match3TutorialCtrl.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Match3/View/TutorialBubbleCtrl.js"},{"deps":{"../../Common/Common":49},"path":"preview-scripts/assets/Script/Game/Match3/View/TutorialBorderCtrl.js"},{"deps":{"./PlatformMgr":144,"../../Framework/Utils/SingletonFactory":54},"path":"preview-scripts/assets/Script/Game/Platform/DeviceMgr.js"},{"deps":{"../Model/UpGroundCellModel":118,"../../../Application/M":150,"../../Data/Const/Constant":22,"./ItemUpgroundCtrl":131,"./BaseView":115,"../Model/GameModel":119,"../../Common/ActionCtrl":52,"../../Data/Const/Event":88,"../../Common/Common":49,"../../../Framework/Components/SpinePlayerCtrl":1,"../Skin/Match3Skin":28},"path":"preview-scripts/assets/Script/Game/Match3/View/UpGroundViewCtrl.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Match3/View/TouchHintCtrl.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Match3/View/BaseItemView.js"},{"deps":{"./PropCtrl":142,"./InfoPanelCtrl":29,"../../../../Application/Apps":5,"../../../../Application/M":150,"../../../Common/UI/PlayerPanels":64,"../../../Common/UI/OverHightLightCtrl":67,"../../../Common/UI/UIMgr":70,"../../../Common/UI/ForestUI":61,"../../../Common/Common":49,"../../../Services/ReportMgr":148,"../../Model/GameModel":119,"../../../Data/Const/Event":88,"../../../Data/Interface/UIData":98,"../../../Data/Const/Constant":22,"../../../../Framework/Utils/Util":45},"path":"preview-scripts/assets/Script/Game/Match3/View/UI/MainUiCtrl.js"},{"deps":{"./SpecialPieceArt":132,"../../Common/Common":49,"../../../Application/M":150,"./BaseItemView":139,"../Model/CellBase":103,"../../Data/Const/Constant":22,"../../Data/Const/Event":88,"../../Data/Const/TimeConfig":90,"../../../Framework/Utils/Util":45,"../Control/RotatingCtrl":102,"../Model/GameModel":119,"../../Common/AudioCtrl":154,"../ResCtrl":97,"../Model/CollectModel":109,"../../../Application/Apps":5,"../../Common/GroupAnimatCtrl":50},"path":"preview-scripts/assets/Script/Game/Match3/View/ItemBasicCellCtrl.js"},{"deps":{"../../../../Application/M":150,"./PropItemCtrl":146,"../../../Data/Const/Constant":22},"path":"preview-scripts/assets/Script/Game/Match3/View/UI/PropCtrl.js"},{"deps":{"../../Data/Const/BaseConst":94,"../../../Framework/Events/EventMgr":12,"../../../Framework/Utils/Log":17,"../../../Framework/Utils/Util":45,"../../Config/Paths":77,"../../../Application/M":150,"../../Data/RuntimeMgr":86,"../../Services/NetMgr":145},"path":"preview-scripts/assets/Script/Game/Platform/Adapters/Wechat.js"},{"deps":{"./Adapters/Webapp":9,"./Adapters/Wechat":143,"../../Framework/Utils/Util":45,"../Data/Const/BaseConst":94},"path":"preview-scripts/assets/Script/Game/Platform/PlatformMgr.js"},{"deps":{"../Platform/PlatformMgr":144,"../Config/Paths":77,"../../Framework/Network/HttpRequest":37,"../Data/StorageMgr":80,"../../Application/Apps":5,"../Data/RuntimeMgr":86,"../Data/Const/Constant":22,"../../Application/M":150},"path":"preview-scripts/assets/Script/Game/Services/NetMgr.js"},{"deps":{"../../../Home/LobbyCatalog":23,"../../../../Application/M":150,"../../../Common/UI/ForestUI":61,"../../../Common/UI/PlayerPanels":64,"../../../Data/Const/Event":88},"path":"preview-scripts/assets/Script/Game/Match3/View/UI/PropItemCtrl.js"},{"deps":{"../../../Data/Const/Constant":22,"../../../../Application/M":150,"../../../Data/Interface/UIData":98,"../../../Data/Const/Event":88},"path":"preview-scripts/assets/Script/Game/Match3/View/UI/SelectPropCtrl.js"},{"deps":{"../Config/Paths":77,"../../Framework/Utils/Util":45,"../../Application/M":150,"../../Framework/Network/HttpRequest":37,"../../Application/Apps":5,"../Data/Const/BaseConst":94},"path":"preview-scripts/assets/Script/Game/Services/ReportMgr.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Platform/Adapters/IPlatform.js"},{"deps":{"../Game/Data/Const/Event":88,"../Game/Platform/PlatformMgr":144,"../Game/Platform/DeviceMgr":136,"../Framework/Pool/NodePoolMgr":14,"../Framework/Events/EventMgr":12,"../Game/Config/GameTableMgr":78,"../Framework/Resources/CacheMgr":13,"../Game/Common/UI/UIMgr":70,"../Game/Data/RuntimeMgr":86,"../Game/Common/Views/Tips":73,"../Game/Common/AudioCtrl":154,"../Game/Services/NetMgr":145},"path":"preview-scripts/assets/Script/Application/M.js"},{"deps":{"../SpecialPieceArt":132,"../../ResCtrl":97,"../../../../Application/M":150,"../../Model/GameModel":119,"../../../Data/Const/Event":88,"../../Model/CollectModel":109,"../../../Data/Const/Constant":22,"../../../Common/Common":49,"../../../Data/RuntimeMgr":86},"path":"preview-scripts/assets/Script/Game/Match3/View/UI/CollectItemCtrl.js"},{"deps":{"../Data/Const/Constant":22,"../../Application/M":150,"../Data/StorageMgr":80,"../Data/Const/Event":88},"path":"preview-scripts/assets/Script/Game/Services/DailyTaskMgr.js"},{"deps":{"../Common/UI/UIBase":71,"../Common/UI/UIMgr":70,"../Data/Interface/UIData":98,"../../Application/M":150},"path":"preview-scripts/assets/Script/Game/Views/CommonRewardView.js"},{"deps":{"../Config/Paths":77,"../Data/Const/Constant":22,"../Data/Const/Event":88,"../Data/StorageMgr":80,"../../Framework/Events/EventMgr":12},"path":"preview-scripts/assets/Script/Game/Common/AudioCtrl.js"},{"deps":{"../Common/UI/UIBase":71,"../../Application/M":150,"../Data/Const/BaseConst":94,"../Common/UI/UIMgr":70,"../Data/Interface/UIData":98,"../Common/Common":49,"../Data/Const/Constant":22,"../Data/StorageMgr":80,"../Services/NetMgr":145,"../Data/Const/Event":88,"../../Application/Apps":5},"path":"preview-scripts/assets/Script/Game/Views/GMView.js"},{"deps":{"../Apps":5,"../GameBootstrap":41,"../../Game/Common/UI/MountainArt":158,"../../Game/Common/UI/ToyArt":69,"../../Game/Common/UI/LoadingProgress":160,"../../Game/Common/UI/ForestUI":61,"../../Game/Common/Common":49,"../../Game/Data/Const/Constant":22},"path":"preview-scripts/assets/Script/Application/Loading/LoadingScene.js"},{"deps":{},"path":"preview-scripts/assets/Script/Framework/Async/withTimeout.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Common/UI/MountainArt.js"},{"deps":{},"path":"preview-scripts/assets/Script/Game/Home/HomeArt.js"},{"deps":{"./ForestUI":61},"path":"preview-scripts/assets/Script/Game/Common/UI/LoadingProgress.js"},{"deps":{"../../../Application/M":150,"../../Common/AudioCtrl":154,"../../Data/Const/Constant":22,"../../Data/Const/Event":88},"path":"preview-scripts/assets/Script/Game/Match3/View/ComboFeedback.js"}];
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
    