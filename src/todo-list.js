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
        list.splice(oldIndex, 1);
        for (let i = oldIndex; i < list.length; i++) {
            list[i].listIndex = i;
        };
    }
}

export { TodoList }