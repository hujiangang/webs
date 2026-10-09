class Node {
	public key;
	public data;
	public next: Node;
	public prev: Node;

	public constructor(key?: any, data?: any) {
		this.key = key;
		this.data = data;
	}
}
export class LRUCache {
	private head: Node;
	private tail: Node;
	private capacity: number = 0;
	private _hashmap: any = {};

	public constructor(capacity) {
		this.capacity = capacity;
		this.head = new Node();
		this.tail = new Node();

		this.head.next = this.tail;
		this.tail.prev = this.head;
	}

	public print() {
		console.log(this._hashmap);
	}

	public get(key) {
		var node: Node = this._hashmap[key];
		if (!node) return '';
		if (this.count == 1) return node.data;

		this.detach(node);
		this.attach(this.head, node);

		return node.data;
	}

	public pack(key, data): Node {
		if (this.capacity <= 0) return;

		var node: Node = this._hashmap[key];
		if (node) {
			this.detach(node);
			this.attach(this.head, node);
			node.data = data;
		} else {
			node = new Node(key, data);
			this._hashmap[key] = node;
			this.attach(this.head, node);

			if (this.count > this.capacity) {
				var nodeToRemove: Node = this.tail.prev;
				return nodeToRemove;
			}
		}
		return null;
	}

	public remove(key) {
		var nodeToRemove: Node = this._hashmap[key];
		if (!nodeToRemove) return;
		this.detach(nodeToRemove);
		this._hashmap[key] = null;
		delete this._hashmap[key];
	}

	public removeAll() {
		var keys: any[] = Object.keys(this._hashmap);
		for (var i: number = 0; i < keys.length; i++) {
			this.remove(keys[i]);
		}
	}

	public get hashmap() {
		return this._hashmap;
	}

	public get count() {
		var keys: any[] = Object.keys(this._hashmap);
		return keys.length;
	}

	public get oldNode() {
		return this.tail.prev;
	}

	private attach(head: Node, node: Node) {
		node.prev = head;
		node.next = head.next;
		node.next.prev = node;
		node.prev.next = node;
	}

	private detach(node: Node) {
		node.prev.next = node.next;
		node.next.prev = node.prev;
	}
}
