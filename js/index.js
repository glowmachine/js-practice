class ListItem {
    isChecked = false;

    constructor(element) {
        this.element = element;
        this.addButton = this.element.querySelector('.todolist__add-button');
        this.checkbox = this.element.querySelector('.todolist__checkbox');
        this.actionButton = this.element.querySelector('.todolist__action-button');
        this.field = this.element.querySelector('.todolist__field');
        this.value = this.element.querySelector('.todolist__field').value;
    }
    toJSON() {
        return {
            text: this.value,
            checked: this.isChecked
        };
    }
    getElement() {
        return this.element;
    }
    getAddButton() {
        if (this.addButton) {
            return this.addButton;
        }
        else {
            return null;
        }
    }
    getCheckbox() {
        if (this.checkbox) {
            return this.checkbox;
        }
        else {
            return null;
        }
    }
    getActionButton() {
        if (this.actionButton) {
            return this.actionButton;
        }
        else {
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
    select() {
        this.actionButton.querySelector('.todolist__action-button-icon').classList.add('selected');
    }
    deselect() {
        this.actionButton.querySelector('.todolist__action-button-icon').classList.remove('selected');
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

        this.addButton.remove();
    }
    addActionButton() {
        const button = document.createElement('button');
        button.className = 'todolist__action-button';
        const span = document.createElement('span');
        span.className = 'todolist__action-button-icon';
        button.appendChild(span);
        this.element.appendChild(button);
        this.actionButton = button;
    }
    replaceCheckbox() {
        this.hasCheckbox = false;
        this.hasAddButton = true;
    }
    check() {
        this.isChecked = true;
    }
    uncheck() {
        this.isChecked = false;
    }
    setValue(value) {
        this.value = value;
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

        this.fieldChangeListener();
        this.loadButtonListener();
        this.saveButtonListener();
    }

    loadList() {
        const savedData = JSON.parse(sessionStorage.getItem('mySavedData'));
        if (!savedData) return;

        savedData.forEach((item) => {
            console.log(item);
            this.addItem(item.text);
        });
    }

    saveList() {
        const jsonItems = this.items.map(item => item.toJSON());
        sessionStorage.setItem('mySavedData', JSON.stringify(jsonItems));
        const myRetrievedData = JSON.parse(sessionStorage.getItem('mySavedData'));
    }
    loadButtonListener() {
        document.querySelector('.load-button').addEventListener('click', (e) => {
            this.loadList();
        });
    }
    saveButtonListener() {
        document.querySelector('.save-button').addEventListener('click', (e) => {
            this.saveList();
        });
    }

    createNewItem(loadedItem = '') {
        const newItem = document.createElement('li');
        newItem.className = 'todolist__item';
        const button = document.createElement('button');
        button.type = 'submit';
        button.className = 'todolist__add-button';
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'todolist__field';
        input.value = loadedItem;

        newItem.appendChild(button);
        newItem.appendChild(input);
        return newItem;
    }

    addItem(loadedItem = '') {
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

        const newItem = new ListItem(this.createNewItem(loadedItem));
        newItem.getAddButton().addEventListener('click', (e) => {
            this.addItem();
        });
        newItem.getField().addEventListener('change', (e) => {
            newItem.setValue(e.target.value);
        });

        this.items.push(newItem);

        document.querySelector('.todolist').append(this.items[this.items.length - 1].getElement());

    }
    deleteItem(item) {
        item.getElement().remove();
        this.items.splice(this.items.indexOf(item), 1);
    }

    fieldChangeListener() {
        this.items.forEach(item => {
            item.getField().addEventListener('change', (e) => {
                item.setValue(e.target.value);
            });
        });
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
                    if (e.target.checked) {
                        item.getField().style.textDecoration = 'line-through';
                        item.check();
                    }
                    else {
                        item.getField().style.textDecoration = 'none';
                        item.uncheck();
                    }
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
                }
            }
        });
    }
}

const todolist = new ToDoListApp();