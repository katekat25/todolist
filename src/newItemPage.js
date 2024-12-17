function drawModal () {
    const container = document.querySelector(".modal");

    const modalBackground = document.createElement("div");
    modalBackground.classList.add("modal-background");
    container.appendChild(modalBackground);

    const modalPopup = document.createElement("div");
    modalPopup.textContent = "Testing!";
    modalPopup.classList.add("modal-content");
    modalBackground.appendChild(modalPopup);
}

function killModal () {
    const container = document.querySelector(".modal");
    container.innerHTML = "";
}

export{ drawModal, killModal };