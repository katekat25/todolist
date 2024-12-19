import { createDOMElement, testList } from "./index";

function drawTodoListDisplay() {
    const drawTodoItem = (item) => {
        const pageContainer = document.querySelector(".content");

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
    return { drawTodoItem };
};

export { drawTodoListDisplay };