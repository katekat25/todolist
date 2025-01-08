import "./styles.css";
import { List } from "./list";
import { TodoItem } from "./todo-item";
import { drawSidebar, drawTodoList } from "./dom-controls";
import { storage } from "./local-storage";

(function start() {
  // window.localStorage.clear();
  let rootList = new List("Root list");

  if (!storage.loadData()) {
    const starterTodoList = new List("Example list");
    rootList.addItemToList(starterTodoList);
  } else {
    const importedRootList = storage.loadData();
    rootList = deserializeList(importedRootList);
  }

  const starterTodoList = rootList.list[0] || new List("Example list");
  drawTodoList(starterTodoList, rootList);
  drawSidebar(rootList);
})();

function deserializeList(data) {
  const newList = new List(data.title, data.index);
  newList.list = data.list.map((subListData) => {
    const subList = new List(subListData.title, subListData.index, []);
    subList.list = subListData.list.map(
      (itemData) =>
        new TodoItem(
          itemData.title,
          itemData.description,
          itemData.dueDate,
          itemData.priority,
          itemData.isComplete,
          itemData.index,
        ),
    );
    return subList;
  });
  return newList;
}
