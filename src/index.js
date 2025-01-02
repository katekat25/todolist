import "./styles.css";
import { List } from "./list";
import { drawSidebar, drawTodoList } from "./dom-controls";

(function start() {
    let starterTodoList = new List("Example list", 0);
    let rootList = new List("Root list");
    console.log(starterTodoList);
    console.log(rootList);
    rootList.addItemToList(starterTodoList);
    drawTodoList(starterTodoList, rootList);
    drawSidebar(rootList);
})()