class List {
  constructor(title, index) {
    this.list = [];
    this.title = title;
    this.index = index;
  }
  addItemToList(item) {
    this.list.push(item);
  }
  removeItemFromList(item) {
    let oldIndex = item.index;
    // Shifts the index number of each following item
    this.list.splice(oldIndex, 1);
    for (let i = oldIndex; i < this.list.length; i++) {
      this.list[i].index = i;
    }
  }

  getList() {
    return this.list;
  }

  getListLength() {
    return this.list.length;
  }

  deleteSelf = () => (this.item = null);
}

export { List };
