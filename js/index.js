class ButtonManager {
    constructor() {
        this.selectedButton = null;
        this.selectedIcon = null;
        this.init();
    }

    init() {
        const buttons = document.querySelectorAll('.todolist__action-button');
        buttons.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.actionButtonClickHandler(btn);
            });
        });
        document.addEventListener('click', (e) => this.globalClickHandler(e));

        const addButton = document.querySelector('.todolist__add-button');
        addButton.addEventListener('click', (e) => {
            this.addButtonClickHandler(addButton);
        });
    }

    addButtonClickHandler(btn) {
        const item = btn.closest('.todolist__item');
        this.addItem(item);
    }

    actionButtonClickHandler(btn) {
        if (this.selectedButton === btn) {
            //clicked button again
            this.deleteItem(btn);
        }
        else if (this.selectedButton && this.selectedButton != btn) {
            //clicked a different button
            this.deselectButton();
            this.selectButton(btn);
        }
        else {
            //clicked a button
            this.selectButton(btn);
        }
    }

    globalClickHandler(e) {
        if (this.selectedButton && this.selectedButton != e.target) {
            this.deselectButton();
        }
    }

    selectButton(btn) {
        this.selectedButton = btn;
        this.selectedIcon = btn.querySelector('.todolist__action-button-icon');
        if (this.selectedButton) {
            this.selectedButton.classList.add('selected');
            this.selectedIcon.classList.add('selected');
        }
    }

    deselectButton() {
        if (this.selectedButton) {
            this.selectedButton.classList.remove('selected');
            this.selectedIcon.classList.remove('selected');
        }
        this.selectedButton = null;
        this.selectedIcon = null;
    }

    addItem(item) {
        this.insertCheckbox(item);
        this.insertActionButton(item);

        const li = document.createElement('li');
        li.classList.add('todolist__item');
        const input = document.createElement('input');
        input.classList.add('todolist__field');

        //move add-button to new item
        li.appendChild(item.querySelector('.todolist__add-button'));
        li.appendChild(input);

        item.insertAdjacentElement('afterend', li);
    }

    deleteItem(btn) {
        const item = btn.closest('.todolist__item');
        if (item) {
            item.remove();
        }
        this.deselectButton();
    }

    insertCheckbox(item) {
        const label = document.createElement('label');
        label.classList.add('todolist__checkbox');
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.classList.add('todolist__checkbox-box');
        const span = document.createElement('span');
        span.classList.add('todolist__checkbox-style');
        label.appendChild(input);
        label.appendChild(span);
        item.insertAdjacentElement('afterbegin', label);
    }

    insertActionButton(item) {
        const button = document.createElement('button');
        button.classList.add('todolist__action-button');
        const span = document.createElement('span');
        span.classList.add('todolist__action-button-icon');

        button.addEventListener('click', (e) => {
            e.stopPropagation();
            this.actionButtonClickHandler(button);
        });
        button.appendChild(span);
        item.insertAdjacentElement('beforeend', button);
    }
}

const buttonManager = new ButtonManager();