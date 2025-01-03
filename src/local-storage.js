function createStorage() {
    return {
        saveData(rootList) {
            window.localStorage.clear();
            console.log("Saving data.");
            console.log(JSON.stringify(rootList));
            window.localStorage.setItem("rootList", JSON.stringify(rootList));
        },
        loadData() {
            console.log("Loading data.");
            if (window.localStorage.getItem("rootList") === null) {
                return false;
            }
            let rootList = window.localStorage.getItem("rootList");
            console.log(rootList);
            return JSON.parse(rootList);
        }
    }
}

export const storage = createStorage();