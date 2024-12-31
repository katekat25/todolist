function createDOMElement(type, attributes = {}, textContent = "", parent = null) {
    const element = document.createElement(type);
    Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
    });
    if (textContent) element.textContent = textContent;
    if (parent) parent.appendChild(element);

    return element;
}

export { createDOMElement };
