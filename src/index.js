import "./styles.css";
import { List } from "./list";
import { TodoItem } from "./todo-item";
import { drawSidebar, drawTodoList } from "./dom-controls";
import { storage } from "./local-storage";

(function start() {
    // window.localStorage.clear();
    let rootList = new List("Root list", 0);
    let starterTodoList;
    if (storage.loadData() === false) {
        starterTodoList = new List("Example list", 0);
    } else {
        let importedRootList = storage.loadData();
        console.log(importedRootList);
        let rootListArray = Object.keys(importedRootList).map(key => [key, importedRootList[key]]);
        console.log(rootListArray);

        for (let i = 0; i <= rootListArray[0][1].length; i++) {
            console.log(importedRootList.list);
            let todoListArray = Object.keys(importedRootList.list[i]).map(key => [key, importedRootList.list[i][key]]);
            console.log(todoListArray);
            let newTodoList = new List(todoListArray[1][1], todoListArray[2][1], []);
            // console.log(newTodoList);
            rootList.addItemToList(newTodoList);
            // console.log(todoListArray[0][1].length);
            for (let j = 0; j <= todoListArray[0][1].length; j++) {
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
        // console.log(starterTodoList);
    }
    drawTodoList(starterTodoList, rootList);
    drawSidebar(rootList);
})()