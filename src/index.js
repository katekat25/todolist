import "./styles.css";
import { TodoList } from "./todo-list";
import { drawTodoList, listDisplayController } from "./dom-controls";

let testList = new TodoList("Example list");
console.log(listDisplayController);
const todoListController = listDisplayController(testList);
todoListController.drawTodoList(testList);

export { testList, todoListController };