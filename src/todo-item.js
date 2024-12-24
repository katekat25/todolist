class TodoItem {
    constructor(title, description, dueDate, priority, listIndex, isComplete = false) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.listIndex = listIndex;
        this.isComplete = isComplete;
    }
}

const todoItemController = (function () {
    const generateTodoItem = (title, description, dueDate, priority, listIndex, isComplete) => new TodoItem(title, description, dueDate, priority, listIndex, isComplete);
    const deleteTodoItem = (item) => item = null;
    return { generateTodoItem, deleteTodoItem };
})();

export { TodoItem, todoItemController };