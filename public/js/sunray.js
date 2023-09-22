class Sunray {
    constructor(x, y, width) {
        this.pos = new Vector(x, y);
        this.width = width;
        this.offset = 600;
        this.age = 0;
    }

    update() {
        this.age++;
    }

    draw(ctx) {
        ctx.fillStyle = '#FFFFFF20';
        ctx.beginPath();
        ctx.moveTo(this.pos.x, this.pos.y);
        ctx.lineTo(this.pos.x + this.offset + Math.sin(this.age / 200) * 100, height + 100);
        ctx.lineTo(this.pos.x + this.offset + this.width + Math.sin(this.age / 200) * 100, height + 100);
        ctx.lineTo(this.pos.x + this.width, this.pos.y);
        ctx.fill();
    }
}