function createStorage() {
    return {
        saveData(rootList) {
            window.localStorage.clear();
            window.localStorage.setItem("rootList", JSON.stringify(rootList));
        },
        loadData() {
            if (window.localStorage.getItem("rootList") === null || window.localStorage.getItem("rootList") === undefined) {
                return false;
            }
            let rootList = window.localStorage.getItem("rootList");
            return JSON.parse(rootList);
        }
    }
}

export const storage = createStorage();