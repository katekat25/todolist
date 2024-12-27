import { format, parseISO } from 'date-fns';

class TodoItem {
    constructor(title, description, dueDate, priority, listIndex, isComplete = false) {
        this.title = title;
        this.description = description;
        this.dueDate = format(parseISO(dueDate), "LLL do, yyyy hh:mmb");
        this.priority = priority;
        this.listIndex = listIndex;
        this.isComplete = isComplete;
    }

    deleteItem = () => this.item = null;
}

export { TodoItem };