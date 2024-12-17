function drawModal () {
    const container = document.querySelector(".modal");

    const modalBackground = document.createElement("div");
    modalBackground.classList.add("modal-background");
    container.appendChild(modalBackground);

    const modalContent = document.createElement("div");
    modalContent.textContent = "Testing!";
    modalContent.classList.add("modal-content");
    modalBackground.appendChild(modalContent);

    const form = document.createElement("form");
    // method post? action?
    modalContent.appendChild(form);

    const h1 = document.createElement("h1");
    h1.textContent = "New task";
    form.appendChild(h1);

    const inputs = document.createElement("div");
    inputs.classList.add("inputs");
    form.appendChild(inputs);

    const titleLabel = document.createElement("label");
    titleLabel.setAttribute("for", "title");
    titleLabel.textContent = "Title:";
    inputs.appendChild(titleLabel);

    const titleInput = document.createElement("input");
    titleInput.setAttribute("type", "text");
    titleInput.id = "title";
    inputs.appendChild(titleInput);

    const descriptionLabel = document.createElement("label");
    descriptionLabel.setAttribute("for", "description");
    descriptionLabel.textContent = "Description:";
    inputs.appendChild(descriptionLabel);

    const descriptionInput = document.createElement("input");
    descriptionInput.setAttribute("type", "text");
    descriptionInput.id = "description";
    inputs.appendChild(descriptionInput);

    const dueDateLabel = document.createElement("label");
    dueDateLabel.setAttribute("for", "dueDate");
    dueDateLabel.textContent = "Due date:";
    inputs.appendChild(dueDateLabel);

    const dueDateInput = document.createElement("input");
    dueDateInput.setAttribute("type", "datetime-local");
    dueDateInput.id = "dueDate";
    inputs.appendChild(dueDateInput);

    const priorityLabel = document.createElement("label");
    priorityLabel.setAttribute("for", "priority");
    priorityLabel.textContent = "Priority:";
    inputs.appendChild(priorityLabel);

    const prioritySelect = document.createElement("select");
    prioritySelect.setAttribute("name", "Priority");
    inputs.appendChild(prioritySelect);

    const option1 = document.createElement("option");
    option1.setAttribute("value", 1);
    option1.textContent = "High";
    prioritySelect.appendChild(option1);

    
    const option2 = document.createElement("option");
    option2.setAttribute("value", 2);
    option2.textContent = "Medium";
    prioritySelect.appendChild(option2);


    const option3 = document.createElement("option");
    option3.setAttribute("value", 3);
    option3.textContent = "Low";
    prioritySelect.appendChild(option3);

    const submitButton = document.createElement("button");
    submitButton.setAttribute("type", "submit");
    submitButton.textContent = "Submit";
    form.appendChild(submitButton);
}

export{ drawModal };