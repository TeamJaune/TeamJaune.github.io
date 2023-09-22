class Totem {
    constructor(x, y) {
        this.pos = new Vector(x, y);
        this.spd = new Vector(0, 2);
        this.finished = false;
    }

    update() {
        this.pos.add(this.spd);
        backBubbles.push(new Bubble(this.pos.x + Math.random() * 60, this.pos.y + Math.random() * 50))
        if (this.pos.y > height + 200) this.finished = true;
    }

    draw(ctx) {
        ctx.translate(this.pos.x, this.pos.y);
        ctx.rotate(20 * Math.PI / 180);
        ctx.drawImage(totemImg, 0, 0);
        ctx.rotate(-20 * Math.PI / 180);
        ctx.translate(-this.pos.x, -this.pos.y);
    }
}