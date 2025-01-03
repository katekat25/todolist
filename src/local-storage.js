function createStorage() {
    return {
        saveData(rootList) {
            console.log("Saving data.");
            window.localStorage.clear();
            window.localStorage.setItem("rootList", JSON.stringify(rootList));
            console.log("Stringified rootList:");
            console.log(JSON.stringify(rootList));
        },
        loadData() {
            console.log("Retrieving data.");
            if (window.localStorage.getItem("rootList") === null) {
                console.log("No saved rootList found. Returning false.")
                return false;
            }
            let rootList = window.localStorage.getItem("rootList");
            console.log("Rootlist found. Retrieved rootlist as JSON:");
            console.log(rootList);
            return JSON.parse(rootList);
        }
    }
}

export const storage = createStorage();