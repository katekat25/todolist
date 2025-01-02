function createStorage() {
    return {
        saveData(rootList) {
            console.log("Attempting to save data");
            console.log(rootList);
            for (const [key, value] of Object.entries(rootList)) {
                console.log(`${key}: ${value}`);
                if (key == "list") {
                    for (let i = 0; i < rootList.list.length; i++) {
                        for (const [key, value] of Object.entries(rootList.list[i])) {
                            console.log(`${key}: ${value}`);
                        }
                    }
                }
            }
        },
        loadData() {
            //something
        }
    }
}

export const storage = createStorage();