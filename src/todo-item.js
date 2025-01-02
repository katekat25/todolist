import { format, parseISO } from 'date-fns';

class TodoItem {
    constructor(title, description, dueDate, priority, listIndex, isComplete = false) {
        this.title = title;
        this.description = description;
        try {this.dueDate = format(parseISO(dueDate), "LLL do, yyyy hh:mmb")} catch {this.dueDate = dueDate};
        this.priority = priority;
        this.listIndex = listIndex;
        this.isComplete = isComplete;
    }

    deleteSelf = () => this.item = null;
}

export { TodoItem };