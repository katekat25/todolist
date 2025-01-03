function createStorage() {
    return {
        saveData(rootList) {
            window.localStorage.clear();
            window.localStorage.setItem("rootList", JSON.stringify(rootList));
        },
        loadData() {
            let rootList = window.localStorage.getItem("rootList");
            if (rootList === undefined || rootList === null) {
                return false;
            }
            return JSON.parse(rootList);
        }
    }
}

export const storage = createStorage();