class Entry {
    id;
    text;
    completed;
    order;
    createdAt;
}

class ListItem {
    hasAddButton;
    hasCheckbox;
    hasActionButton;
    isChecked;
    deleteReady = false;

    constructor(element) {
        this.element = element;
        this.addButton = this.element.querySelector('.todolist__add-button');
        this.checkbox = this.element.querySelector('.todolist__checkbox');
        this.actionButton = this.element.querySelector('.todolist__action-button');
        this.value = this.element.querySelector('.todolist__field').value;
        this.getAddButton();
        this.getCheckbox();
        this.getActionButton();
        this.getValue();
    }
    getElement() {
        return this.element;
    }
    getAddButton() {
        if (this.addButton) {
            this.hasAddButton = true;
            return this.addButton;
        }
        else {
            this.hasAddButton = false;
            return null;
        }
    }
    getCheckbox() {
        if (this.checkbox) {
            this.hasCheckbox = true;
            return this.checkbox;
        }
        else {
            this.hasCheckbox = false;
            return null;
        }
    }
    getActionButton() {
        if (this.actionButton) {
            this.hasActionButton = true;
            return this.actionButton;
        }
        else {
            this.hasActionButton = false;
            return null;
        }
    }
    getValue() {
        if (this.value)
            return this.value;
        else
            return null;
    }
    getSelectStatus() {
        return this.isSelected;
    }
    select() {
        // console.log('selecting');
        this.actionButton.querySelector('.todolist__action-button-icon').classList.add('selected');
        this.isSelected = true;
        return this.isSelected;
    }
    deselect() {
        // console.log('deselecting');
        this.actionButton.querySelector('.todolist__action-button-icon').classList.remove('selected');
        this.isSelected = false;
        return this.isSelected;
    }
}

class ToDoListApp {
    items = [];
    selectedItem = null;

    constructor() {
        this.listElements = document.querySelector('.todolist');
        this.itemElements = this.listElements.querySelectorAll('.todolist__item');
        this.itemElements.forEach(item => {
            this.items.push(new ListItem(item));
        });

        this.init();
    }

    init() {
        this.actionButtonClickListeners();
        this.globalClickListener();
    }

    // addItem() {
    // }
    deleteItem(item) {
        item.getElement().remove();
        this.items.splice(this.items.indexOf(item), 1);
        // console.log('deleteItem(item) was called...');
    }

    actionButtonClickListeners() {
        this.items.forEach(item => {
            if (item.getActionButton()) {
                item.getActionButton().addEventListener('click', (e) => {
                    e.stopPropagation();
                    const actionButton = e.target.closest('.todolist__action-button');
                    if (this.selectedItem && this.selectedItem.getActionButton() == actionButton) {
                        //there was already a selected item, and this is the same button
                        this.deleteItem(item);
                    } else if (this.selectedItem && this.selectedItem.getActionButton() !== actionButton) {
                        //there was already a selected item, but this is not the same button
                        this.selectedItem.deselect();
                        this.selectedItem = item;
                        this.selectedItem.select();
                    }
                    else {
                        //there was not a selected item, make this the selected item
                        this.selectedItem = item;
                        item.select();
                    }
                });
            }
        });
    }
    globalClickListener() {
        document.addEventListener('click', (e) => {
            if (!e.target.classList.contains('todolist__action-button' ||
                !e.target.classList.contains('todolist__action-button-icon'))) {
                // the target is not an action button
                if (this.selectedItem) {
                    //if there is a selected item, deselect it
                    this.selectedItem.deselect();
                    this.selectedItem = null;
                    console.log('clearing selected item');
                }
            }
        });
    }
}

const todolist = new ToDoListApp();