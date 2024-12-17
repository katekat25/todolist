import "./styles.css";
import { TodoList } from "./todo-list";
import { TodoItem, todoItemController } from "./todo-item";
import { drawModal } from "./newItemPage";

drawModal();


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

export { createDOMElement };

// STEPS:
// 1.)Write the logic that stores 
// 2.)Write the DOM
// 3.)???
// 4.)Profit