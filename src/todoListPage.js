import { createDOMElement, pageContainer } from "./index";
import { drawPopup } from "./popup";
import { todoItemController } from "./todo-item";

function listDisplayController(listObject) {

    const drawTodoItem = (item) => {

        console.log(item);

        //Container div for todo items
        const todoContainer = createDOMElement("div", { class: "todo-item" }, "", pageContainer);

        //Check box container
        const checkboxContainer = createDOMElement("div", {}, "", todoContainer);

        //Check box
        createDOMElement("input", { type: "checkbox", name: "isComplete", value: item.isComplete }, "", checkboxContainer);

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
        const editButton = createDOMElement("button", { class: "todo-edit-button"}, "Edit", endContainer);
        editButton.addEventListener("click", (event) => {
            event.preventDefault();
            drawPopup("edit", item);
        });

        //Delete button
        const deleteButton = createDOMElement("button", { class: "todo-delete-button" }, "Delete", endContainer);
        deleteButton.addEventListener("click", (event) => {
            console.log("In deleteButton.")
            event.preventDefault();
            listObject.removeItemFromList(item);
            todoItemController.deleteTodoItem(item);
            drawTodoList();
        })
    }

    function drawTodoList() {
        console.log("In drawTodoList.");
        console.log(listObject);

        pageContainer.innerHTML = "";
        const todoListTitle = createDOMElement("h1", { contenteditable: "true" }, listObject.title, pageContainer);

        todoListTitle.addEventListener("input", (event) => {
            listObject.title = todoListTitle.innerHTML;
        });

        const listArray = listObject.getList();
        for (let i = 0; i < listArray.length; i++) {
            drawTodoItem(listObject.list[i]);
        }

        const addButton = createDOMElement("button", { class: "todo-item-add-button" }, "+", pageContainer);
        addButton.addEventListener("click", (event) => {
            event.preventDefault();
            drawPopup("addTask");
        });
    }
    return { drawTodoItem, drawTodoList };
};

export { listDisplayController };