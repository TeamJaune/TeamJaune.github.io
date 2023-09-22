class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static add(vector1, vector2) {
        return new Vector(vector1.x + vector2.x, vector1.y + vector2.y);
    }

    static sub(vector1, vector2) {
        return new Vector(vector1.x - vector2.x, vector1.y - vector2.y);
    }

    static dist(vector1, vector2) {
        return Math.sqrt((vector2.x - vector1.x) * (vector2.x - vector1.x) + (vector2.y - vector1.y) * (vector2.y - vector1.y))
    }

    mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    heading() {
        return Math.atan2(this.y, this.x);
    }

    setMag(mag) {
        this.normalize();
        this.mult(mag);
    }

    normalize() {
        this.divide(this.mag());
    }

    limit(mag) {
        if (this.mag() > mag) this.setMag(mag);
    }

    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
    }

    sub(vector) {
        this.x -= vector.x;
        this.y -= vector.y;
    }

    mult(num) {
        this.x *= num;
        this.y *= num;
    }

    divide(num) {
        this.x /= num;
        this.y /= num;
    }
}