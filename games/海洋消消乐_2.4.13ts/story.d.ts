interface Story {
	id: string
	jump: any[]
	content: Content[]
}
interface Content {
	id: any
	bgID: number
	roleID: number
	figureID: number
	words: string
}
interface Background {
	id: string
	name: string
	url: string
}
interface Role {
	id: string
	name: string
	figure: Figure[]
}
interface Figure {
	roleID: any
	figureId: number
	url: string
}
