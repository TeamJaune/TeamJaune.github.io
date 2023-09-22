class Bubble {
    constructor(x, y) {
        this.pos = new Vector(x, y);
        this.spd = new Vector(0, -4);
        this.size = Math.random() * 4 + 4;
        this.finished = false;
    }

    update() {
        this.spd.x = Math.sin(this.pos.y / 25) * 1.2;
        this.pos.add(this.spd);
        if (this.pos.y < -this.size) this.finished = true;
    }

    draw(ctx) {
        ctx.fillStyle = '#00BBFF';
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(this.pos.x + this.size / 3, this.pos.y - this.size / 3, this.size / 3, this.size / 3);
    }
}