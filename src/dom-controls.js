import { todoListController } from "./index";
import { List } from "./todo-list";
import { TodoItem } from "./todo-item";

const pageContainer = document.querySelector(".content");

function createDOMElement(type, attributes = {}, textContent = "", parent = null) {
    const element = document.createElement(type);
    for (const [key, value] of Object.entries(attributes)) {
        element.setAttribute(key, value);
    }
    if (textContent) element.textContent = textContent;
    if (parent) parent.appendChild(element);

    return element;
}

function listDisplayController(containerListObject) {
    function drawTodoItem(listObject, item) {
        //Container div for todo items
        const todoContainer = createDOMElement("div", { class: "todo-item" }, "", pageContainer);

        //Check box container
        const checkboxContainer = createDOMElement("div", {}, "", todoContainer);
        //Check box
        const checkBox = createDOMElement("input", { type: "checkbox", name: "isComplete", value: item.isComplete }, "", checkboxContainer);
        checkBox.addEventListener("click", () => {
            item.isComplete ? item.isComplete = false : item.isComplete = true;
        });

        //Middle portion container
        const middleContainer = createDOMElement("div", {}, "", todoContainer);
        //Title
        const title = createDOMElement("div", { class: "todo-title" }, item.title, middleContainer);
        //Description
        createDOMElement("div", { class: "todo-description " }, item.description, middleContainer);

        //Container for todo item details
        const todoDetails = createDOMElement("div", { class: "todo-details" }, "", middleContainer);
        //Due date
        createDOMElement("div", { class: "todo-due-date" }, "Due: " + item.dueDate, todoDetails);
        //Priority (may edit this out later and change title color instead)
        createDOMElement("div", { class: "todo-priority" }, "Priority: " + item.priority, todoDetails);

        //End portion container
        const endContainer = createDOMElement("div", {}, "", todoContainer)
        //Edit button
        const editButton = createDOMElement("button", { class: "todo-edit-button" }, "Edit", endContainer);
        editButton.addEventListener("click", () => {
            drawPopup("edit", listObject, item);
        });

        //Delete button
        const deleteButton = createDOMElement("button", { class: "todo-delete-button" }, "Delete", endContainer);
        deleteButton.addEventListener("click", () => {
            //Redraw list
            listObject.removeItemFromList(item);
            item.deleteItem();
            drawTodoList(listObject);
        })
    }

    function drawTodoList(list) {
        pageContainer.innerHTML = "";
        const todoListTitle = createDOMElement("h1", { contenteditable: "true" }, list.title, pageContainer);

        todoListTitle.addEventListener("input", (event) => {
            list.title = todoListTitle.innerHTML;
            drawSidebarTitles(containerListObject);
        });

        const listArray = list.getList();
        for (let i = 0; i < listArray.length; i++) {
            drawTodoItem(list, list.list[i]);
        }

        const addButton = createDOMElement("button", { class: "todo-item-add-button" }, "+", pageContainer);
        addButton.addEventListener("click", (event) => {
            event.preventDefault();
            drawPopup("addTask", list);
        });
    }
    return { drawTodoItem, drawTodoList };
};

function drawPopup(popupType, listObject, itemToEdit = null) {
    const modalContainer = document.querySelector(".modal");

    // Modal background
    const modalBackground = createDOMElement("div", { class: "modal-background" }, "", modalContainer);
    // Modal content
    const modalContent = createDOMElement("div", { class: "modal-content" }, "", modalBackground);
    // Close button
    const closeButton = createDOMElement("Button", { class: "close-button" }, "X", modalContent);
    // Form
    const form = createDOMElement("form", {}, "", modalContent);
    // Title
    createDOMElement("h1", {}, popupType == "addTask" ? "New task" :
            popupType == "addList" ? "New list" :
            "Edit task",
            form);
    // Inputs container
    const inputs = createDOMElement("div", { class: "inputs" }, "", form);
    // Title Input
    createDOMElement("label", { for: "title" }, "Title:", inputs);
    const title = createDOMElement("input", { type: "text", id: "title" }, "", inputs);

    //If I don't define prioritySelect here I get a reference error for some reason, even though description and dueDate don't. w/e
    let prioritySelect;
    if (popupType !== "addList") {
        // Description Input
        createDOMElement("label", { for: "description" }, "Description:", inputs);
        const description = createDOMElement("input", { type: "text", id: "description" }, "", inputs);
        // Due Date Input
        createDOMElement("label", { for: "dueDate" }, "Due date:", inputs);
        const dueDate = createDOMElement("input", { type: "datetime-local", id: "dueDate" }, "", inputs);
        // Priority Select
        createDOMElement("label", { for: "priority" }, "Priority:", inputs);
        prioritySelect = createDOMElement("select", { name: "Priority" }, "", inputs);

        createDOMElement("option", { value: "1" }, "High", prioritySelect);
        createDOMElement("option", { value: "2" }, "Medium", prioritySelect);
        createDOMElement("option", { value: "3" }, "Low", prioritySelect);
    }

    // Submit Button
    const submitButton = createDOMElement("button", { type: "submit" }, "Submit", form);
    submitButton.addEventListener("click", (event) => {
        event.preventDefault();
        if (popupType === "addTask") {
            let newItem = new TodoItem(title.value, description.value, dueDate.value, prioritySelect.value, listObject.getListLength(), false);
            listObject.addItemToList(newItem);
            todoListController.drawTodoList(listObject);
        } else if (popupType === "edit") {
            itemToEdit.title = title.value;
            itemToEdit.description = description.value;
            itemToEdit.dueDate = dueDate.value;
            itemToEdit.prioritySelect = prioritySelect.value;
            todoListController.drawTodoList(listObject);
        } else if (popupType === "addList") {
            let newTodoList = new List(title.value, listObject.getListLength());
            listObject.addItemToList(newTodoList);
            drawSidebarTitles(listObject);
        } else console.log("Some weird error happened yo");
        modalContainer.innerHTML = "";
    });

    //Close button
    closeButton.addEventListener("click", (event) => {
        event.preventDefault();
        modalContainer.innerHTML = "";
    })
}

function drawSidebarTitles(listHolderObject) {
    const sidebarTitleWrapper = document.querySelector(".my-lists");
    sidebarTitleWrapper.innerHTML = "";

    function drawTitle(entry) {
        const titleLi = createDOMElement("li", { class: "sidebar-list-title" }, "", sidebarTitleWrapper);
        const link = createDOMElement("a", { class: "sidebar-list-link" }, entry.title, titleLi);
        link.addEventListener("click", (event) => {
            todoListController.drawTodoList(entry);
        })
    }

    const listTitleArray = listHolderObject.getList();
    for (let i = 0; i < listTitleArray.length; i++) {
        drawTitle(listTitleArray[i]);
    }

    const newListLi = createDOMElement("li", { class: "sidebar-new-list" }, "", sidebarTitleWrapper);
    //add href to below later
    createDOMElement("a", { class: "sidebar-new-list-link " }, "Create a new list", newListLi);
    newListLi.addEventListener("click", (event) => {
        drawPopup("addList", listHolderObject);
    });
}

export { drawPopup, listDisplayController, createDOMElement, drawSidebarTitles }