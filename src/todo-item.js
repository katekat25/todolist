import { isPast } from "date-fns";

class TodoItem {
  constructor(
    title,
    description,
    dueDate,
    priority,
    index,
    isComplete = false,
  ) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.index = index;
    this.isComplete = isComplete;
  }

  deleteSelf = () => (this.item = null);

  checkIfPastDueDate = () => isPast(this.dueDate);
}

export { TodoItem };
