class Turtle {
    constructor(x, y, direction) {
        this.pos = new Vector(x, y);
        this.spd = new Vector(0, 0);
        this.acc = new Vector(0, 0);
        this.size = Math.random() + 0.5;
        this.direction = direction;
        this.age = Math.random() * 200;
        this.finished = false;
    }

    update() {
        this.age++;
        if (this.age % 200 < 25) {
            this.acc.x += 0.02 * this.direction;
            if (Math.random() < 0.1) backBubbles.push(new Bubble(this.pos.x + this.size * 50 * this.direction, this.pos.y - this.size * 7));
        }
        else this.acc.x = this.spd.x * -0.025;
        this.spd.y = Math.sin(this.age / 50) * 0.3;
        this.spd.add(this.acc);
        this.pos.add(this.spd);
        if (this.pos.x < -800) this.finished = true;
        if (this.pos.x > width + 800) this.finished = true;
    }

    draw(ctx) {
        // body
        ctx.fillStyle = '#267F00';
        ctx.beginPath();
        ctx.ellipse(this.pos.x, this.pos.y, this.size * 50, this.size * 10, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.strokeStyle = '#045D00';
        ctx.beginPath();
        ctx.ellipse(this.pos.x, this.pos.y, this.size * 50, this.size * 10, 0, Math.PI, 2 * Math.PI, true);
        ctx.stroke();
        // shell
        ctx.fillStyle = '#554643';
        ctx.beginPath();
        ctx.ellipse(this.pos.x, this.pos.y - this.size * 7, this.size * 46, this.size * 10, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.strokeStyle = '#887976';
        ctx.beginPath();
        ctx.ellipse(this.pos.x, this.pos.y - this.size * 7, this.size * 46, this.size * 10, 0, Math.PI, 2 * Math.PI);
        ctx.stroke();
        // head
        ctx.fillStyle = '#267F00';
        ctx.beginPath();
        ctx.ellipse(this.pos.x + this.size * 50 * this.direction, this.pos.y - this.size * 7, this.size * 10, this.size * 10, 0, 0, 2 * Math.PI);
        ctx.fill();
        // fins
        ctx.beginPath();
        ctx.ellipse(this.pos.x + this.size * 30, this.pos.y + this.size * 15, this.size * 15, this.size * 6, (0.3 * this.direction + this.spd.x / 15) * Math.PI, 0, 2 * Math.PI);
        ctx.ellipse(this.pos.x - this.size * 30, this.pos.y + this.size * 15, this.size * 15, this.size * 6, (0.3 * this.direction + this.spd.x / 15) * Math.PI, 0, 2 * Math.PI);
        ctx.fill();
        // eye
        ctx.fillStyle = '#000000';
        ctx.fillRect(this.pos.x + this.size * 52 * this.direction, this.pos.y - this.size * 9, this.size * 2, this.size * 2);
        // bandana
        ctx.fillStyle = '#FFFF00';
        ctx.fillRect(this.pos.x + this.size * 40 * this.direction, this.pos.y - this.size * 14, this.size * 20 * this.direction, this.size * 4);
    }
}