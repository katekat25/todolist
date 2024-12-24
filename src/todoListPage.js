import { createDOMElement } from "./index";
import { TodoList } from "./todo-list";

function listDisplayController() {
    const pageContainer = document.querySelector(".content");
    
    const drawTodoItem = (item) => {

        console.log(item);

        //Container div for todo items
        const todoContainer = createDOMElement("div", { class: "todo-item" }, "", pageContainer);

        //Check box
        createDOMElement("input", { type: "checkbox", name: "isComplete", value: item.isComplete }, "", todoContainer);

        //Title
        createDOMElement("div", { class: "todo-title" }, item.title, todoContainer);

        //Description
        createDOMElement("div", { class: "todo-description "}, item.description, todoContainer);

        //Container for todo item details
        const todoDetails = createDOMElement("div", { class: "todo-details" }, "", todoContainer);

        //Due date
        createDOMElement("div", { class: "todo-due-date"}, "Due: " + item.dueDate, todoDetails);

        //Priority (may edit this out later and change title color instead)
        createDOMElement("div", { class: "todo-priority"}, "Priority: " + item.priority, todoDetails);
    }

    function drawTodoList(listObject) {
        pageContainer.innerHTML = "";
        const listArray = listObject.getList();
        for (let i = 0; i < listArray.length; i++) {
            drawTodoItem(listObject.list[i]);
        }
    }
    return { drawTodoItem, drawTodoList };
};

export { listDisplayController };