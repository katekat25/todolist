function createStorage() {
    return {
        saveData(rootList) {
            stringifyList(rootList);
            
            function stringifyList(list) {
                // console.log("Stringifying a list.");
                for (const [key, value] of Object.entries(list)) {
                    console.log(`${key}: ${value}`);
                    JSON.stringify({key: value});
                    console.log("Key value pair as JSON: " + JSON.stringify(key, value));
                    window.localStorage.setItem(key, value);
                    if (key === "list") {
                        // console.log("Above is a list. Printing list");
                        for (let i = 0; i < list.list.length; i++) {
                            // console.log(list.list[i]);
                            if (list === rootList) {
                                // console.log("List inputted is rootList. Looping again.");
                                stringifyList(list.list[i])
                            } else {
                                for (const [key, value] of Object.entries(list.list[i])) {
                                    console.log(`${key}: ${value}`);
                                    JSON.stringify({key: value});
                                    console.log("Key value pair as JSON: " + JSON.stringify(key, value));
                                    window.localStorage.setItem(key, value);
                                }
                            }
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