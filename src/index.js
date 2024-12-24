import "./styles.css";
import { TodoList } from "./todo-list";
import { TodoItem, todoItemController } from "./todo-item";
import { drawPopup } from "./popup";
import { listDisplayController } from "./todoListPage";

let testList = new TodoList("Example list");
const todoListController = listDisplayController(testList);
todoListController.drawTodoList(testList);

function createDOMElement(type, attributes = {}, textContent = "", parent = null) {
    const element = document.createElement(type);
    // Set attributes
    for (const [key, value] of Object.entries(attributes)) {
        element.setAttribute(key, value);
    }
    // Set text content
    if (textContent) element.textContent = textContent;
    // Append to parent
    if (parent) parent.appendChild(element);

    return element;
}

export { createDOMElement, testList, todoListController };

// STEPS:
// 1.)Write the logic that stores 
// 2.)Write the DOM
// 3.)???
// 4.)Profit