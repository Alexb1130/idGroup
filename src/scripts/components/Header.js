class Header {
    constructor(item) {
        this.item = document.querySelector(item);
        // this.itemHeight = this.item.offsetHeight;
    }
    init() {
        let lastScroll;

        window.addEventListener('scroll', () => {
            let scrollPos = window.pageYOffset;

            if(scrollPos > lastScroll) {
                this.item.classList.add('header--hide');
            } else {
                this.item.classList.remove('header--hide');
            }
            lastScroll = scrollPos <= 0 ? 0 : scrollPos;
        })
    }
}

export default Header;