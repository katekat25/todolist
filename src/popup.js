import { createDOMElement, testList, todoListController } from "./index";
import { todoItemController } from "./todo-item";

function drawPopup(popupType, itemToEdit = null) {
    const container = document.querySelector(".modal");

    // Modal background
    const modalBackground = createDOMElement("div", { class: "modal-background" }, "", container);

    // Modal content
    const modalContent = createDOMElement("div", { class: "modal-content" }, "", modalBackground);

    // Close button
    const closeButton = createDOMElement("Button", { class: "close-button" }, "X", modalContent);

    // Form
    const form = createDOMElement("form", {}, "", modalContent);

    // Title
    createDOMElement("h1", {}, popupType == "addTask" ? "New task" : "Edit task", form);

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
        console.log("popup type is " + popupType);
        event.preventDefault();
        if (popupType === "addTask") {
            console.log("adding task");
            let newItem = todoItemController.generateTodoItem(title.value, description.value, dueDate.value, prioritySelect.value, testList.getListLength());
            testList.addItemToList(newItem);
        } else if (popupType === "edit") {
            itemToEdit.title = title.value;
            itemToEdit.description = description.value;
            itemToEdit.dueDate = dueDate.value;
            itemToEdit.prioritySelect = prioritySelect.value;
        } else console.log("Some weird error happened yo");
        todoListController.drawTodoList(testList);
        container.innerHTML = "";
    });

    closeButton.addEventListener("click", (event) => {
        event.preventDefault();
        container.innerHTML = "";
    })
}

export { drawPopup };
