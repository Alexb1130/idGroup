class Canvas {
    constructor() {
        this.canvas = document.querySelector('.form-block__canvas');
        this.fileInput = document.querySelector('#preview-image');
        this.fileReader = new FileReader();
        this.image = new Image();
        this.dropZone = document.querySelector('.drop-zone');
    }
    
    init() {

        this.dropZone.addEventListener("drop", (e) => {
            e.stopPropagation();
            e.preventDefault();

            const dt = e.dataTransfer;
            const file = dt.files[0];

            if (file) {
                this.fileReader.readAsDataURL(file);
            }

            this.image.src = file.name;
            this.canvas.append(this.image);
        });
        
        this.dropZone.addEventListener("dragenter", this.dragenter);
        this.dropZone.addEventListener("dragover", this.dragover);

        this.fileReader.addEventListener('load', (e) => {
            this.image.src = this.fileReader.result;
            this.canvas.append(this.image);
        })

        this.fileInput.addEventListener('change', (e) => {
            e.preventDefault();

            const file = e.target.files[0];

            if (file) {
                this.fileReader.readAsDataURL(file);
            }
        })
    }

    dragenter(e) {
        e.stopPropagation();
        e.preventDefault();
    }

    dragover(e) {
        e.stopPropagation();
        e.preventDefault();
    }
}

export default Canvas;