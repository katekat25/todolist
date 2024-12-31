import "./styles.css";
import { List } from "./todo-list";
import { drawSidebarTitles, drawTodoList } from "./dom-controls";
import { TodoItem } from "./todo-item"

(function start() {
    let todoList = new List("Example list", 0);
    let listOfTodoLists = new List("");
    listOfTodoLists.addItemToList(todoList);
    drawTodoList(todoList);
    drawSidebarTitles(listOfTodoLists);
})()