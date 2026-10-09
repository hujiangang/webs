
export interface IUserInfo {
    /** 用户昵称*/
    nickName: string;
    /** 用户头像图片的 URL。URL 最后一个数值代表正方形头像大小（有 0、46、64、96、132 数值可选，0 代表 640x640 的正方形头像，46 表示 46x46 的正方形头像，剩余数值以此类推。默认132），用户没有头像时该项为空。若用户更换头像，原有头像 URL 将失效。*/
    avatarUrl: string;
    /** 用户性别*/
    gender: 0 | 1 | 2;
    /** 用户所在国家*/
    country: string;
    /** 用户所在省份*/
    province: string;
    /** 用户所在城市*/
    city: string;
    /** 显示 country，province，city 所用的语言*/
    language: 'en' | 'zh_CN' | 'zh_TW'
}

export enum PlatformType {
    Web = 100,
    WxGame,
    QQ,
    QQZone,
    Oppo,
    Vivo,
    WanBa,
    Uc
}

/** 物品ID对应表 */
export enum CurrencyId {
    Coin = 0,
    Diamond,
    Power,
    TaskKey
}

export const PlatformEvenType = {
    OnShow: "OnShow",
    OnHide: "OnHide",
    OnNetWorkChanged: "OnNetWorkChanged",
    OnMemoryWarning: "OnMemoryWarning"
}

