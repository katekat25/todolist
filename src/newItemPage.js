// Helper function to create an element, set attributes, and append to a parent

import { createDOMElement, testList } from "./index";
import { todoItemController } from "./todo-item";

function drawModal() {
    const container = document.querySelector(".modal");

    // Modal background
    const modalBackground = createDOMElement("div", { class: "modal-background" }, "", container);

    // Modal content
    const modalContent = createDOMElement("div", { class: "modal-content" }, "Testing!", modalBackground);

    // Form
    const form = createDOMElement("form", {}, "", modalContent);

    // Title
    createDOMElement("h1", {}, "New task", form);

    // Inputs container
    const inputs = createDOMElement("div", { class: "inputs" }, "", form);

    // Title Input
    createDOMElement("label", { for: "title" }, "Title:", inputs);
    const title = createDOMElement("input", { type: "text", id: "title" }, "", inputs);

    // Description Input
    createDOMElement("label", { for: "description" }, "Description:", inputs);
    const description = createDOMElement("input", { type: "text", id: "description" }, "", inputs);

    // Due Date Input
    createDOMElement("label", { for: "dueDate" }, "Due date:", inputs);
    const dueDate = createDOMElement("input", { type: "datetime-local", id: "dueDate" }, "", inputs);

    // Priority Select
    createDOMElement("label", { for: "priority" }, "Priority:", inputs);
    const prioritySelect = createDOMElement("select", { name: "Priority" }, "", inputs);

    createDOMElement("option", { value: "1" }, "High", prioritySelect);
    createDOMElement("option", { value: "2" }, "Medium", prioritySelect);
    createDOMElement("option", { value: "3" }, "Low", prioritySelect);

    // Submit Button
    const submitButton = createDOMElement("button", { type: "submit" }, "Submit", form);
    submitButton.addEventListener("click", (event) => {
        event.preventDefault();
        let newItem = todoItemController.generateTodoItem(title.value, description.value, dueDate.value, prioritySelect.value, testList.getListLength());
        testList.addItemToList(newItem);
        console.log(testList);
    });
}

export { drawModal };
