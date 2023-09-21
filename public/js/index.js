// Selecting DOM elements
const canvas = document.getElementById("waveCanvas");
const yellowTeamButton = document.getElementById("yellowTeamButton");
const redTeamButton = document.getElementById("redTeamButton");
const versusElement = document.getElementById("versus");
const links = document.querySelectorAll("a");
let isYellowTeamActive = true;

// wave variables
let degree = 0;
const amplitude = 25;
const period = 1000;
const speed = 2;
let waveDirection = null; // Animation direction of the wave (null means no animation)
let waveAnimationOffset = 0; // Wave animation offset
const waveAnimationSpeed = 15; // Wave animation speed
const linkClickDelay = 1000; // Delay for link click

// Getting CSS values for yellow and red colors from :root
const root = document.querySelector(':root');
const yellowColor = getComputedStyle(root).getPropertyValue('--yellow');
const redColor = getComputedStyle(root).getPropertyValue('--red');

// Setting canvas width and height
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Debounce function to reduce the frequency of resize function calls
function debounce(func, timeout = 300){
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

// Click handler for yellow team button
yellowTeamButton.addEventListener("click", () => {
    // Update animation direction and add CSS classes
    waveDirection = isYellowTeamActive ? "yellow" : "red";
    redTeamButton.classList.add("remove");
    versusElement.classList.add("remove");
    yellowTeamButton.classList.add("activeYellow");
});

// Resize handler for the canvas
window.addEventListener("resize", debounce(() => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}));

// Mouseenter handler for the red team button
redTeamButton.addEventListener("mouseenter", () => {
    // Toggle active team and update CSS classes
    isYellowTeamActive = !isYellowTeamActive;
    yellowTeamButton.classList.toggle("red");
    yellowTeamButton.classList.toggle("yellow");
    yellowTeamButton.classList.toggle("flip");
    redTeamButton.classList.toggle("yellow");
    redTeamButton.classList.toggle("red");
    redTeamButton.classList.toggle("flip");
    document.body.classList.toggle("swap");
});

// Click handlers for the links
links.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        setTimeout(() => {
            // Redirect to the link after a delay
            window.location.href = link.href;
        }, linkClickDelay);
    });
});

if (canvas.getContext) {
    let ctx = canvas.getContext('2d');

    // Function to draw the wave
    function drawWave() {
        ctx.fillStyle = isYellowTeamActive ? yellowColor : redColor;
        ctx.strokeStyle = "#202020";
        
        // Animation of the wave origin
        if (waveDirection !== null) {
            waveAnimationOffset += 1 * waveAnimationSpeed;
        }

        // Calculating the slope of the curve
        let slope = canvas.height / canvas.width;

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.moveTo(canvas.width, 0);
        ctx.lineTo(0, 0);
        ctx.lineTo(0, canvas.height);

        // Drawing the wave
        for (let x = 0, slopeAdd = 0; x <= canvas.width; x++, slopeAdd += slope) {
            // Calculating the y coordinate of the wave
            let y = -amplitude * Math.sin((Math.PI / period) * (degree + x));

            // make the wave animation smooth if the wave is moving
            if (waveDirection == "yellow") {
                ctx.lineTo(x, y + canvas.height - slopeAdd + waveAnimationOffset);
            } else if (waveDirection == "red") {
                ctx.lineTo(x, y + canvas.height - slopeAdd - waveAnimationOffset);
            } else {
                ctx.lineTo(x, y + canvas.height - slopeAdd);
            }
        }

        ctx.fill();
        ctx.closePath();

        ctx.beginPath();

        // Drawing the wave points
        for (let x = 0, slopeAdd = 0; x <= canvas.width; x++, slopeAdd += slope) {
            // Calculating the y coordinate of the wave
            let y = -amplitude * Math.sin((Math.PI / period) * (degree + x));

            // make the wave animation smooth if the wave is moving
            if (waveDirection == "yellow") {
                ctx.rect(x, y + canvas.height - slopeAdd + waveAnimationOffset, 10, 10);
            } else if (waveDirection == "red") {
                ctx.rect(x, y + canvas.height - slopeAdd - waveAnimationOffset, 10, 10);
            } else {
                ctx.rect(x, y + canvas.height - slopeAdd, 10, 10);
            }
        }

        ctx.stroke();
        ctx.closePath();

        // Resetting the angle
        if (degree == 2000) {
            degree = 0;
        }
        degree += speed;
        window.requestAnimationFrame(drawWave);
    }

    // Initial call to the draw function
    drawWave();
}
