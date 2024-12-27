//do this tomorrow

function localStorage() {
    function saveItem(itemType, item) {
        if (!localStorage.getItem(`${itemType}`)) {
            localStorage.setItem(`${itemType}`, item);
        } else return console.log("Something's fucked dude.");
    }
    function loadData() {

    }
}