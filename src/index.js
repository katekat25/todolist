import "./styles.css";
import { List } from "./todo-list";
import { drawTodoList, listDisplayController, drawSidebarTitles } from "./dom-controls";

let todoList = new List("Example list", 0);
let listOfTodoLists = new List("");
listOfTodoLists.addItemToList(todoList);

const todoListController = listDisplayController(todoList, listOfTodoLists);
todoListController.drawTodoList(todoList);
drawSidebarTitles(listOfTodoLists);

export { todoList, listOfTodoLists, todoListController };