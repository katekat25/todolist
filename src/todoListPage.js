import { createDOMElement } from "./index";
import { TodoList } from "./todo-list";

function listDisplayController() {
    const pageContainer = document.querySelector(".content");
    
    const drawTodoItem = (item) => {

        // console.log("Drawing an item");

        //Container div for todo items
        const todoContainer = createDOMElement("div", { class: "todo-item" }, "", pageContainer);

        //Check box
        createDOMElement("input", { name: "isComplete", value: "complete" }, "", todoContainer);

        //Title
        createDOMElement("div", { class: "todo-title" }, "Example title", todoContainer);

        //Description
        createDOMElement("div", { class: "todo-description "}, "Here's an example description.", todoContainer);

        //Container for todo item details
        const todoDetails = createDOMElement("div", { class: "todo-details" }, "", todoContainer);

        //Due date
        createDOMElement("div", { class: "todo-due-date"}, "Due: NOW!!", todoDetails);

        //Priority (may edit this out later and change title color instead)
        createDOMElement("div", { class: "todo-priority"}, "Priority: HIGH AF!!", todoDetails);
    }

    function drawTodoList(list) {
        // console.log("In drawTodoList");
        // console.log(list);
        // console.log(typeof(list));
        // console.log("list.length is " + list.getListLength());
        pageContainer.innerHTML = "";
        for (let i = 0; i < list.getListLength(); i++) {
            drawTodoItem(list[i]);
        }
    }
    return { drawTodoItem, drawTodoList };
};

export { listDisplayController };