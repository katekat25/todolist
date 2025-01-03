import "./styles.css";
import { List } from "./list";
import { TodoItem } from "./todo-item";
import { drawSidebar, drawTodoList } from "./dom-controls";
import { storage } from "./local-storage";

(function start() {
    // window.localStorage.clear();
    let rootList = new List("Root list");
    let starterTodoList;
    if (storage.loadData() === false) {
        console.log("No save data found.");
        starterTodoList = new List("Example list", 0);
        rootList.addItemToList(starterTodoList);
    } else {
        console.log("Save data found.");
        let importedRootList = storage.loadData();
        let rootListArray = Object.keys(importedRootList).map(key => [key, importedRootList[key]]);

        for (let i = 0; i < rootListArray[0][1].length; i++) {
            let todoListArray = Object.keys(importedRootList.list[i]).map(key => [key, importedRootList.list[i][key]]);
            let newTodoList = new List(todoListArray[1][1], todoListArray[2][1], []);
            rootList.addItemToList(newTodoList);
            for (let j = 0; j < todoListArray[0][1].length; j++) {
                let todoItemArray = Object.keys(importedRootList.list[i].list[j]).map(key => [key, importedRootList.list[i].list[j][key]]);
                let newItem = new TodoItem(todoItemArray[0][1],
                    todoItemArray[1][1],
                    todoItemArray[2][1],
                    todoItemArray[3][1],
                    todoItemArray[4][1],
                    todoItemArray[5][1],);
                newTodoList.addItemToList(newItem);
                drawTodoList(newTodoList);
            }
        }
        starterTodoList = rootList.list[0];
    }
    drawTodoList(starterTodoList, rootList);
    drawSidebar(rootList);
})()