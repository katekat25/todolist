import "./styles.css";
import { TodoList } from "./todo-list";
import { TodoItem, todoItemController } from "./todo-item";

const testList = new TodoList();
console.log(testList);
const testTask = todoItemController.generateTodoItem("Test this shit", "It's going to be kind of difficult, but that's OK.", "12/22/2024", 0, 0);
testList.addItemToList(testTask);
console.log(testList);
console.log(testTask.description);

// STEPS:
// 1.)Write the logic that stores 
// 2.)Write the DOM
// 3.)???
// 4.)Profit