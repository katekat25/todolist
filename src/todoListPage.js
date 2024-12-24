import { createDOMElement } from "./index";
import { drawPopup } from "./newTaskPopup";
import { TodoList } from "./todo-list";

function listDisplayController() {
    const pageContainer = document.querySelector(".content");

    const drawTodoItem = (item) => {

        console.log(item);

        //Container div for todo items
        const todoContainer = createDOMElement("div", { class: "todo-item" }, "", pageContainer);

        //Check box container
        const checkboxContainer = createDOMElement("div", {}, "", todoContainer);

        //Check box
        createDOMElement("input", { type: "checkbox", name: "isComplete", value: item.isComplete }, "", checkboxContainer);

        //"Everything else" container

        const everythingElseContainer = createDOMElement("div", {}, "", todoContainer);

        //Title
        createDOMElement("div", { class: "todo-title" }, item.title, everythingElseContainer);

        //Description
        createDOMElement("div", { class: "todo-description " }, item.description, everythingElseContainer);

        //Container for todo item details
        const todoDetails = createDOMElement("div", { class: "todo-details" }, "", everythingElseContainer);

        //Due date
        createDOMElement("div", { class: "todo-due-date" }, "Due: " + item.dueDate, todoDetails);

        //Priority (may edit this out later and change title color instead)
        createDOMElement("div", { class: "todo-priority" }, "Priority: " + item.priority, todoDetails);
    }

    function drawTodoList(listObject) {
        console.log(listObject);

        pageContainer.innerHTML = "";
        const todoListLitle = createDOMElement("h1", {}, listObject.title, pageContainer);

        const listArray = listObject.getList();
        for (let i = 0; i < listArray.length; i++) {
            drawTodoItem(listObject.list[i]);
        }

        const addButton = createDOMElement("button", { class: "todo-item-add-button" }, "+", pageContainer);
        addButton.addEventListener("click", (event) => {
            event.preventDefault();
            drawPopup();
        });
    }
    return { drawTodoItem, drawTodoList };
};

export { listDisplayController };