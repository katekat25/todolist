class TodoItem {
    constructor(title, description, dueDate, priority, listIndex) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.listIndex = listIndex;
    }
}

const todoItemController = (function () {
    const generateTodoItem = (title, description, dueDate, priority, listIndex) => new TodoItem(title, description, dueDate, priority, listIndex);
    const deleteTodoItem = (item) => item = null;
    return { generateTodoItem, deleteTodoItem };
})();

export { TodoItem, todoItemController };