class Drawer {
    constructor(canvasID) {
        this.canvas = document.getElementById(canvasID);
        this.renderer = this.canvas.getContext("2d");
        const scale = window.devicePixelRatio;
        this.canvas.width = this.canvas.clientWidth * scale;
        this.canvas.height = this.canvas.clientHeight * scale;
        this.renderer.scale(scale, scale);
        this.clear();
    }
    
    clear(){
        this.renderer.fillStyle = "black";
        this.renderer.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    center() {
        return {
            x: this.canvas.clientWidth / 2,
            y: this.canvas.clientHeight / 2,
        };
    }
    drawPoint(x, y, color = "black") {
        this.renderer.fillStyle = color;
        this.renderer.fillRect(x, y, 1, 1);
    }
}

