const canvas = document.getElementById("wave");
const yellowTeam = document.getElementById("yellow");
const redTeam = document.getElementById("red");
const versus = document.getElementById("versus");
const links = document.querySelectorAll("a");
let degree = 0;
const amplitude = 25;
const period = 1000;
const speed = 2;
let commingFrom = null;
let commingFromAnimation = 0;
const commingFromSpeed = 15;
const linkTimer = 1000;

// get css properties on :root element called yellow
const root = document.querySelector(':root');
const yellow = getComputedStyle(root).getPropertyValue('--yellow');

// set canvas width and height
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function debounce(func, timeout = 300){
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

yellowTeam.addEventListener("click", () => {
    commingFrom = "yellow";
    redTeam.classList.add("remove");
    versus.classList.add("remove");
    yellowTeam.classList.add("activeYellow");
});

redTeam.addEventListener("click", () => {
    commingFrom = "red";
    yellowTeam.classList.add("remove");
    versus.classList.add("remove");
    redTeam.classList.add("activeRed");
});

// canvas resize listener
window.addEventListener("resize", debounce(() => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}));

// links listener
links.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        setTimeout(() => {
            // go to the link
            window.location.href = link.href;
        }, linkTimer);
    });
});

if (canvas.getContext) {
    let ctx = canvas.getContext('2d');

    function drawWave() {

        ctx.fillStyle = yellow;
        ctx.strokeStyle = "#202020";
        if (commingFrom !== null) {
            commingFromAnimation += 1 * commingFromSpeed;
        }

        // calculates the slope of the curve
        let pante = canvas.height / canvas.width;

        // clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        // make a triangle
        ctx.moveTo(canvas.width, 0);
        ctx.lineTo(0, 0);
        ctx.lineTo(0, canvas.height);
        for (let x = 0, panteAdd = 0; x <= canvas.width; x++, panteAdd += pante) {
            // calc the courbe of sinus for the wave
            let y = -amplitude * Math.sin((Math.PI / period) * (degree + x));
            if (commingFrom == "yellow") {
                ctx.lineTo(x, y + canvas.height - panteAdd + commingFromAnimation);
            } else if (commingFrom == "red") {
                ctx.lineTo(x, y + canvas.height - panteAdd - commingFromAnimation);
            } else {
                ctx.lineTo(x, y + canvas.height - panteAdd);
            }
        }
        ctx.fill();
        ctx.closePath();

        // draw line on hypotenuse
        ctx.beginPath();
        for (let x = 0, panteAdd = 0; x <= canvas.width; x++, panteAdd += pante) {
            // calc the courbe of sinus for the wave
            let y = -amplitude * Math.sin((Math.PI / period) * (degree + x));
            // draw line on hypotenuse
            // ctx.rect(x, y + canvas.height - panteAdd, 10, 10);
            if (commingFrom == "yellow") {
                ctx.rect(x, y + canvas.height - panteAdd + commingFromAnimation, 10, 10);
            } else if (commingFrom == "red") {
                ctx.rect(x, y + canvas.height - panteAdd - commingFromAnimation, 10, 10);
            } else {
                ctx.rect(x, y + canvas.height - panteAdd, 10, 10);
            }
        }
        ctx.stroke();
        ctx.closePath();

        // reset memory
        if (degree == 2000) {
            degree = 0;
        }
        degree += speed;
        window.requestAnimationFrame(drawWave);
    }

    drawWave();

}