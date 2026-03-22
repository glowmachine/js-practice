class ButtonManager {
    constructor() {
        this.selectedButton = null;
        this.selectedIcon = null;
        this.init();
    }

    init() {
        const buttons = document.querySelectorAll('.todolist__button');
        buttons.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.buttonClickHandler(btn);
            });
        });
        document.addEventListener('click', (e) => this.globalClickHandler(e));
    }

    buttonClickHandler(btn) {
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
        this.selectedIcon = btn.querySelector('.todolist__button-icon');
        if (this.selectedIcon) {
            this.selectedIcon.classList.add('selected');
        }
    }

    deselectButton() {
        if (this.selectedIcon) {
            this.selectedIcon.classList.remove('selected');
        }
        this.selectedButton = null;
        this.selectedIcon = null;
    }

    deleteItem(btn) {
        const item = btn.closest('.todolist__item');
        if (item) {
            item.remove();
        }
        this.deselectButton();
    }
}

const buttonManager = new ButtonManager();