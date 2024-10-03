export type Node<T> = {
    value: T,
    next?: Node<T>
}

export default class SinglyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;
    

    constructor() {
        this.length = 0;
        this.head = undefined;
        this.tail = undefined;
    }

    prepend(item: T): void {
        const node = {value: item} as Node<T>;
        this.length++;
        if(!this.head) {
            this.head = this.tail = node;
            return;
        }

        node.next = this.head;
        this.head = node;
    }
    insertAt(item: T, idx: number): void {
        // First attach new node, second break the old links.
        if (idx > this.length) {
            throw new Error("The index is larger than the list.");
        } else if (idx === this.length) {
            this.append(item);
            return;
        } else if (idx === 0) {
            this.prepend(item);
            return;
        }
        this.length++;
        const {prev, curr} = this.getAt(idx);
        const node = {value: item} as Node<T>;
        node.next = curr;
        prev.next = node;
    }
    append(item: T): void {
        this.length++;
        const node = {value: item} as Node<T>;
        if (!this.tail) {
            this.head = this.tail = node;
            return;
        }
        this.tail.next = node;
        this.tail = node;
    }
    remove(item: T): T | undefined {
        let curr = this.head;
        let prev = undefined;
        for (let i = 0; curr && i < this.length; ++i) {
            if (item === curr.value) {
                break;
            }
            prev = curr;
            curr = curr.next;
        }
        if (!curr) {
            return undefined;
        }
        return this.removeNode(curr, prev);
    }
    get(idx: number): T | undefined {
        const {curr} = this.getAt(idx);
        return curr?.value;
    }
    removeAt(idx: number): T | undefined {
        const {prev, curr} = this.getAt(idx);
        if (!curr) {
            return undefined;
        }
        return this.removeNode(curr, prev)
    }
    private getAt(idx: number): {prev: Node<T>, curr: Node<T> | undefined} {
        let curr = this.head;
        let prev = undefined;
        for (let i = 0; curr && i < idx; ++i) {
            prev = curr;
            curr = curr.next
        }
        prev = prev as Node<T>
        return { prev, curr };
    }
    private removeNode(node: Node<T>, prev: Node<T> | undefined): T | undefined {
        this.length--;
        if (this.length === 0) {
            const out = this.head?.value;
            this.head = this.tail = undefined;
            return out;
        }
        if (prev) {
            prev.next = node.next;
            return node.value
        }
        this.head = node.next;
        return node.value
    }
    private debug() {
        let curr = this.head;
        let out = "";
        for (let i = 0; curr && i < this.length; ++i) {
            out += `${i} => ${curr.value} `;
            curr = curr.next;
        }
        console.log(out);
    }
}