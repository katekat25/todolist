//Contains multiple todo items

class TodoList {
    constructor () {
        this.list = [];
    }
    addItemToList (item) {
        this.list.push(item);
    }
    removeItemFromList (item) {
        let oldIndex = item.listIndex;
        // Shifts the index number of each following item
        this.list.splice(oldIndex, 1);
        for (let i = oldIndex; i < this.list.length; i++) {
            this.list[i].listIndex = i;
        };
    }
    getList () {
        return this.list;
    }

    getListLength () {
        return this.list.length;
    }
}

export { TodoList }