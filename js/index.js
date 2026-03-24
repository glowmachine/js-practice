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
        this.field = this.element.querySelector('.todolist__field');
        this.value = this.element.querySelector('.todolist__field').value;
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
    getField() {
        if (this.field)
            return this.field;
        else
            return null;
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
    replaceAddButton() {
        const label = document.createElement('label');
        label.className = 'todolist__checkbox';
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.className = 'todolist__checkbox-box';
        const span = document.createElement('span');
        span.className = 'todolist__checkbox-style';
        label.appendChild(input);
        label.appendChild(span);
        this.element.prepend(label);
        this.checkbox = label;
        this.hasCheckbox = true;

        this.addButton.remove();
        this.hasAddButton = false;
    }
    addActionButton() {
        const button = document.createElement('button');
        button.className = 'todolist__action-button';
        const span = document.createElement('span');
        span.className = 'todolist__action-button-icon';
        button.appendChild(span);
        this.element.appendChild(button);
        this.actionButton = button;
        this.hasActionButton = true;
    }
    replaceCheckbox() {
        this.hasCheckbox = false;
        this.hasAddButton = true;
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
        this.addButtonClickListener();
        this.checkboxListener();
        this.actionButtonClickListeners();
        this.globalClickListener();
    }

    createNewItem() {
        const newItem = document.createElement('li');
        newItem.className = 'todolist__item';
        const button = document.createElement('button');
        button.type = 'submit';
        button.className = 'todolist__add-button';
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'todolist__field';
        input.value = '';

        newItem.appendChild(button);
        newItem.appendChild(input);
        return newItem;
    }

    addItem() {
        // console.log('addItem() was called...');
        const lastItem = this.items[this.items.length - 1];

        lastItem.replaceAddButton();
        lastItem.getCheckbox().addEventListener('change', (e) => {
            if (e.target.checked)
                lastItem.getField().style.textDecoration = 'line-through';
            else
                lastItem.getField().style.textDecoration = 'none';
        });

        lastItem.addActionButton();
        lastItem.getActionButton().addEventListener('click', (e) => {
            e.stopPropagation();
            const actionButton = e.target.closest('.todolist__action-button');
            if (this.selectedItem && this.selectedItem.getActionButton() == actionButton) {
                //there was already a selected item, and this is the same button
                this.deleteItem(lastItem);
            } else if (this.selectedItem && this.selectedItem.getActionButton() !== actionButton) {
                //there was already a selected item, but this is not the same button
                this.selectedItem.deselect();
                this.selectedItem = lastItem;
                this.selectedItem.select();
            }
            else {
                //there was not a selected item, make this the selected item
                this.selectedItem = lastItem;
                lastItem.select();
            }
        });

        const newItem = new ListItem(this.createNewItem());
        newItem.getAddButton().addEventListener('click', (e) => {
            this.addItem();
        });
        this.items.push(newItem);

        document.querySelector('.todolist').append(this.items[this.items.length - 1].getElement());

    }
    deleteItem(item) {
        item.getElement().remove();
        this.items.splice(this.items.indexOf(item), 1);
        // console.log('deleteItem(item) was called...');
    }

    addButtonClickListener() {
        const addButton = document.querySelector('.todolist__add-button');
        addButton.addEventListener('click', (e) => {
            this.addItem();
        });
    }
    checkboxListener() {
        this.items.forEach(item => {
            if (item.getCheckbox()) {
                const checkbox = item.getCheckbox();
                if (checkbox.checked) {
                    item.getField().style.textDecoration = 'line-through';
                }
                else {
                    item.getField().style.textDecoration = 'none';
                }

                item.getCheckbox().addEventListener('change', (e) => {
                    if (e.target.checked)
                        item.getField().style.textDecoration = 'line-through';
                    else
                        item.getField().style.textDecoration = 'none';
                });
            }
        });
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
                    // console.log('clearing selected item');
                }
            }
        });
    }
}

const todolist = new ToDoListApp();