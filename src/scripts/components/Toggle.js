class Toggle {
    constructor(switcher, item) {
        this.switcher = document.querySelector(switcher);
        this.item = document.querySelector(item);
    }
    show(className) {
        this.switcher.addEventListener('click', () => {
            this.item.classList.add(`${className}--open`);
            this.switcher.style.opacity = '0';
        })
    }
    hide(className) {
        this.item.addEventListener('click', (e) => {
            if(e.target.classList.contains(className)) {
                this.item.classList.remove(`${className}--open`);
                this.switcher.style.opacity = '1';
            }
        })
    }
}

export default Toggle;