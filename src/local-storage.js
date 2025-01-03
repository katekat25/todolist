function createStorage() {
    return {
        saveData(rootList) {
            window.localStorage.clear();
            window.localStorage.setItem("rootList", JSON.stringify(rootList));
        },
        loadData() {
            let rootList = window.localStorage.getItem("rootList");
            if (rootList === null) {
                return false;
            }
            try {
                return JSON.parse(rootList);
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }
}

export const storage = createStorage();