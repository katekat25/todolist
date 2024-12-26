import { todoListController } from "./index";
import { todoItemController } from "./todo-item";

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

function listDisplayController(listObject, containerListObject) {
    function drawTodoItem(item) {
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
            todoItemController.deleteTodoItem(item);
            drawTodoList();
        })
    }

    function drawTodoList() {
        // console.log("In drawTodoList.");
        // console.log(listObject);

        pageContainer.innerHTML = "";
        const todoListTitle = createDOMElement("h1", { contenteditable: "true" }, listObject.title, pageContainer);

        todoListTitle.addEventListener("input", (event) => {
            listObject.title = todoListTitle.innerHTML;
            drawSidebarTitles(containerListObject);
        });

        const listArray = listObject.getList();
        for (let i = 0; i < listArray.length; i++) {
            drawTodoItem(listObject.list[i]);
        }

        const addButton = createDOMElement("button", { class: "todo-item-add-button" }, "+", pageContainer);
        addButton.addEventListener("click", (event) => {
            event.preventDefault();
            drawPopup("addTask", listObject);
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
            let newItem = todoItemController.generateTodoItem(title.value, description.value, dueDate.value, prioritySelect.value, listObject.getListLength());
            listObject.addItemToList(newItem);
        } else if (popupType === "edit") {
            itemToEdit.title = title.value;
            itemToEdit.description = description.value;
            itemToEdit.dueDate = dueDate.value;
            itemToEdit.prioritySelect = prioritySelect.value;
        } else console.log("Some weird error happened yo");
        todoListController.drawTodoList(listObject);
        modalContainer.innerHTML = "";
    });

    closeButton.addEventListener("click", (event) => {
        event.preventDefault();
        modalContainer.innerHTML = "";
    })
}

// Are we cooking chat?

//What the fuck man who puts a fucking pile of ALMONDS on a HAM AND CHEESE CROISSANT and doesnt LIST ALMONDS AS A MAIN INGREDIENT
//Fuck this place wtf that shit's crazy like y'all are trying to kill me at 10:30 in the morning on a THURSDAY
//Do i just get another sandwich or like what do i do? if i tell them im allergic there will be a big panic? but i need lunch
//Well it was just a little sliver and almonds have never given me much of a problem in the past so I guess it's fine
//Ok back to coding
//I feel like I am going to throw up

function drawSidebarTitles(listHolderObject) {
    console.log("in drawSidebarTitles");
    const sidebarTitleWrapper = document.querySelector(".my-lists");
    sidebarTitleWrapper.innerHTML = "";

    function drawTitle(title) {
        console.log("in drawTitle");
        const titleLi = createDOMElement("li", { class: "sidebar-list-title" }, "", sidebarTitleWrapper);
        createDOMElement("a", { class: "sidebar-list-link" }, title, titleLi);
    }

    // console.log("listHolderObject:");
    // console.log(listHolderObject);
    // console.log("listHolderObject.getList()");
    // console.log(listHolderObject.getList());
    
    const listTitleArray = listHolderObject.getList();
    // console.log("listTitleArray.length:");
    // console.log(listTitleArray.length)
    for (let i = 0; i < listTitleArray.length; i++) {
        // console.log("listTitleArray.list[i].title:");
        // console.log(listTitleArray[i].title);
        drawTitle(listTitleArray[i].title);
    }
}

export { drawPopup, listDisplayController, createDOMElement, drawSidebarTitles }