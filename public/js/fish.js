class Fish {
    constructor(x, y) {
        this.pos = new Vector(x, y);
        this.spd = new Vector(Math.random(), Math.random());
        this.acc = new Vector(0, 0);
        this.maxSpeed = 6;
        this.maxForce = 0.2;
        this.age = 0;
        this.view = 200;
        this.alignCoef = 1;
        this.cohesCoef = 1;
        this.sepaCoef = 1;
        this.spd.setMag(this.maxSpeed);
    }

    align() {
        let steering = new Vector(0, 0);
        let total = 0;
        backFishes.forEach((fish) => {
            if (fish != this && Vector.dist(this.pos, fish.pos) < this.view) {
                steering.add(fish.spd);
                total++;
            }
        });
        if (total > 0) {
            steering.divide(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.spd);
            steering.limit(this.maxForce * this.alignCoef);
        }
        return steering;
    }

    cohesion() {
        let steering = new Vector(0, 0);
        let total = 0;
        backFishes.forEach((fish) => {
            if (fish != this && Vector.dist(this.pos, fish.pos) < this.view) {
                steering.add(fish.pos);
                total++;
            }
        });
        if (total > 0) {
            steering.divide(total);
            steering.sub(this.pos);
            steering.setMag(this.maxSpeed);
            steering.sub(this.spd);
            steering.limit(this.maxForce * this.cohesCoef);
        }
        return steering;
    }

    separate() {
        let steering = new Vector(0, 0);
        let total = 0;
        backFishes.forEach((fish) => {
            let dist = Vector.dist(this.pos, fish.pos);
            if (fish != this && dist < this.view) {
                let diff = Vector.sub(this.pos, fish.pos);
                diff.divide(dist*dist);
                steering.add(diff);
                total++;
            }
        });
        if (total > 0) {
            steering.divide(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.spd);
            steering.limit(this.maxForce * this.sepaCoef);
        }
        return steering;
    }

    applyForce(force) {
        this.acc.add(force);
    }

    update() {
        this.age++;
        this.applyForce(this.align());
        this.applyForce(this.cohesion());
        this.applyForce(this.separate());
        this.spd.add(this.acc);
        this.pos.add(this.spd);
        this.edges();
        this.acc.mult(0);
    }

    edges() {
        if (this.pos.x < -width) this.pos.x = width * 2;
        if (this.pos.x > 2 * width) this.pos.x = -width;
        if (this.pos.y < -height) this.pos.y = height * 2;
        if (this.pos.y > 2 * height) this.pos.y = -height;
    }

    draw(ctx) {
        let angle = this.spd.heading();
        ctx.fillStyle = 'yellow';
        ctx.translate(this.pos.x, this.pos.y);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.ellipse(0, 0, 15, 7, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.rotate(Math.sin(this.age / 5) * 0.2);
        ctx.beginPath();
        ctx.moveTo(-13, 0);
        ctx.lineTo(-20, 10);
        ctx.lineTo(-20, -10);
        ctx.fill();
        ctx.rotate(-Math.sin(this.age / 5) * 0.2);
        ctx.fillStyle = 'black';
        ctx.fillRect(10, -1.5, 3, 3);
        ctx.rotate(-angle);
        ctx.translate(-this.pos.x, -this.pos.y);
    }
}