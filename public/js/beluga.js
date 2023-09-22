class Beluga {
    constructor(x, y) {
        this.pos = new Vector(x, y);
        this.spd = new Vector(0.5, 0);
        this.size = Math.random() + 1;
        this.age = 0;
        this.finished = false;
    }

    update() {
        this.age++;
        this.spd.y = Math.sin(this.age / 200) * 0.1;
        this.pos.add(this.spd);
        if (this.pos.x > width + 200) this.finished = true;
    }

    draw(ctx) {
        // body
        ctx.fillStyle = '#000050';
        ctx.beginPath();
        ctx.ellipse(this.pos.x, this.pos.y, this.size * 100, this.size * 20, 0, 0, 2 * Math.PI);
        ctx.fill();
        // forehead
        ctx.beginPath();
        ctx.ellipse(this.pos.x + this.size * 58, this.pos.y - this.size * 8, this.size * 40, this.size * 20, 0, 0, 2 * Math.PI);
        ctx.fill();
        // fins
        ctx.beginPath();
        ctx.ellipse(this.pos.x + this.size * 20, this.pos.y + this.size * 8, this.size * 25, this.size * 15, (0.5 * Math.PI) + Math.sin(this.age/35) * 0.5, 0, 2 * Math.PI);
        ctx.fill();
        // tail
        ctx.beginPath();
        ctx.ellipse(this.pos.x - this.size * 90, this.pos.y + Math.sin(this.age/35) * 8, this.size * 12, this.size * 35, (0.5 * Math.PI) - Math.sin(this.age/35) * 0.15, 0, 2 * Math.PI);
        ctx.fill();
    }
}