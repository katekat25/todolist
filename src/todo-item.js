class TodoItem {
    constructor(title, description, dueDate, priority, listIndex, isComplete = false) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.listIndex = listIndex;
        this.isComplete = isComplete;
    }

    deleteItem = () => this.item = null;
}

export { TodoItem };