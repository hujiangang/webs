interface Hotelroomcfg {
	id: number
	roomId: number
	slotId: number
	name: string
	animation: string
	price: any[]
}
interface Slotbonus {
	id: number
	roomId: number
	count: number
	bonus: number
}
interface Chapterstory {
	id: any
	trigger: any
	infomation: string
	content: any[]
}
interface Shoptools {
	id: any
	name: string
	price: string
	content: any[]
	flag: string
	detail: string
	res: string
}
interface Propinfo {
	id: any
	name: string
	v: number
	unlock: number
	price: string
	baguse: number
	detail: string
	res: any
}
interface Boxreward {
	id: any
	content: any[]
}
interface Titles {
	lv: any
	showTargetContent: string
	novContent: string
}
interface Islandunlockcfg {
	id: number
	starlv: number
	buildId: number
	buildName: string
	desc: string
	choose: number
	iconId: number
	price: any[]
	isShare: number
}
interface Sharecfg {
	id: number
	shareType: number
	shareImg: string
	shareText: string
	reward: any[]
	level: number
	buildId: number
}
interface Hotelcfg {
	id: number
	roomId: number
	openLevel: number
	roomName: string
	finishReward: any[]
}
interface Chapterinfo {
	id: any
	name: string
	lv: string
	detail: string
	res: any
}
interface Levelupreward {
	id: any
	reward: any[]
}
