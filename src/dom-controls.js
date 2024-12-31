import { TodoItem } from "./todo-item.js";

function createDOMElement(type, attributes = {}, textContent = "", parent = null) {
    const element = document.createElement(type);
    Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
    });
    if (textContent) element.textContent = textContent;
    if (parent) parent.appendChild(element);

    return element;
}



function drawSidebarTitles(listHolderObject) {
    const sidebarTitleWrapper = document.querySelector(".my-lists");
    sidebarTitleWrapper.innerHTML = "";

    listHolderObject.getList().forEach(entry => {
        const titleLi = createDOMElement("li", { class: "sidebar-list-title" }, "", sidebarTitleWrapper);
        createDOMElement("a", { class: "sidebar-list-link" }, entry.title, titleLi);
        titleLi.addEventListener("click", () => {
            drawTodoList(entry);
        });
    });

    const newListLi = createDOMElement("li", { class: "sidebar-new-list" }, "", sidebarTitleWrapper);
    createDOMElement("a", { class: "sidebar-new-list-link" }, "Create a new list", newListLi);
    newListLi.addEventListener("click", () => {
        drawPopup("addList", listHolderObject);
    });
}

function drawTodoList(todoList) {
    const pageContainer = document.querySelector(".content");
    pageContainer.innerHTML = "";
    const todoListTitle = createDOMElement("h1", { contenteditable: "true" }, todoList.title, pageContainer);

    todoListTitle.addEventListener("input", () => {
        todoList.title = todoListTitle.textContent;
        drawSidebarTitles(listContainer);
    });

    todoList.getList().forEach(todoItem => {
        drawTodoItem(todoList, todoItem);
    });

    const addButton = createDOMElement("button", { class: "todo-item-add-button" }, "+", pageContainer);
    addButton.addEventListener("click", (event) => {
        event.preventDefault();
        drawPopup("addTask", todoList);
    });
}

function drawPopup(popupType, listObject, itemToEdit = null) {
    const popupContainer = document.querySelector(".popup");
    popupContainer.innerHTML = "";

    const popupBackground = createDOMElement("div", { class: "popup-background" }, "", popupContainer);
    const popupContent = createDOMElement("div", { class: "popup-content" }, "", popupBackground);
    const closeButton = createDOMElement("button", { class: "close-button" }, "X", popupContent);
    closeButton.addEventListener("click", () => {
        popupContainer.innerHTML = "";
    });

    const form = createDOMElement("form", {}, "", popupContent);
    createDOMElement("h1", {}, popupType === "addTask" ? "New Task" : popupType === "addList" ? "New List" : "Edit Task", form);

    const inputs = createDOMElement("div", { class: "inputs" }, "", form);
    createDOMElement("label", { for: "title" }, "Title:", inputs);
    const titleInput = createDOMElement("input", { type: "text", id: "title" }, "", inputs);

    let prioritySelect, descriptionInput, dueDateInput;
    if (popupType !== "addList") {
        createDOMElement("label", { for: "description" }, "Description:", inputs);
        descriptionInput = createDOMElement("input", { type: "text", id: "description" }, "", inputs);

        createDOMElement("label", { for: "dueDate" }, "Due Date:", inputs);
        dueDateInput = createDOMElement("input", { type: "datetime-local", id: "dueDate" }, "", inputs);

        createDOMElement("label", { for: "priority" }, "Priority:", inputs);
        prioritySelect = createDOMElement("select", { name: "priority" }, "", inputs);
        ["High", "Medium", "Low"].forEach(priority => {
            createDOMElement("option", { value: priority }, priority, prioritySelect);
        });

        if (popupType === "edit" && itemToEdit) {
            titleInput.value = itemToEdit.title;
            descriptionInput.value = itemToEdit.description;
            dueDateInput.value = itemToEdit.dueDate;
            prioritySelect.value = itemToEdit.priority;
        }
    }

    const submitButton = createDOMElement("button", { type: "submit" }, "Submit", form);
    submitButton.addEventListener("click", (event) => {
        event.preventDefault();

        if (popupType === "addTask") {
            const newItem = new TodoItem(
                titleInput.value,
                descriptionInput?.value,
                dueDateInput?.value,
                prioritySelect?.value,
                listObject.getListLength(),
                false
            );
            listObject.addItemToList(newItem);
            drawTodoList(listObject);
        } else if (popupType === "edit" && itemToEdit) {
            itemToEdit.title = titleInput.value;
            itemToEdit.description = descriptionInput.value;
            itemToEdit.dueDate = dueDateInput.value;
            itemToEdit.priority = prioritySelect.value;
            drawTodoList(listObject);
        } else if (popupType === "addList") {
            const newList = new List(titleInput.value, listObject.getListLength());
            listObject.addItemToList(newList);
            drawSidebarTitles(listObject);
        }

        popupContainer.innerHTML = "";
    });
}



function drawTodoItem(todoList, todoItem) {
    const pageContainer = document.querySelector(".content");
    const todoContainer = createDOMElement("div", { class: "todo-item" }, "", pageContainer);

    const checkboxContainer = createDOMElement("div", {}, "", todoContainer);
    const checkBox = createDOMElement("input", { type: "checkbox", name: "isComplete", value: todoItem.isComplete }, "", checkboxContainer);
    checkBox.checked = todoItem.isComplete;
    checkBox.addEventListener("click", () => {
        todoItem.isComplete = !todoItem.isComplete;
    });

    const middleContainer = createDOMElement("div", {}, "", todoContainer);
    createDOMElement("div", { class: "todo-title" }, todoItem.title, middleContainer);
    createDOMElement("div", { class: "todo-description" }, todoItem.description, middleContainer);

    const todoDetails = createDOMElement("div", { class: "todo-details" }, "", middleContainer);
    createDOMElement("div", { class: "todo-due-date" }, `Due: ${todoItem.dueDate}`, todoDetails);
    createDOMElement("div", { class: "todo-priority" }, `Priority: ${todoItem.priority}`, todoDetails);

    const endContainer = createDOMElement("div", {}, "", todoContainer);
    const editButton = createDOMElement("button", { class: "todo-edit-button" }, "Edit", endContainer);
    editButton.addEventListener("click", () => {
        drawPopup("edit", todoList, todoItem);
    });

    const deleteButton = createDOMElement("button", { class: "todo-delete-button" }, "Delete", endContainer);
    deleteButton.addEventListener("click", () => {
        todoList.removeItemFromList(todoItem);
        todoItem.deleteItem();
        drawTodoList(todoList);
    });
}

export { createDOMElement, drawSidebarTitles, drawTodoList };
