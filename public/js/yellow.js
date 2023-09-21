const bubbles = document.querySelectorAll('.bubble');

// Place the bubbles in random positions
bubbles.forEach(bubble => {
    // bubble size
    const size = {
        width: bubble.offsetWidth,
        height: bubble.offsetHeight
    };
    bubble.style.left = Math.random() * (window.innerWidth - size.width) + 'px';
    bubble.style.top = Math.random() * (window.innerHeight - size.height) + 'px';
});

// Debounce function to reduce the frequency of resize function calls
function debounce(func, timeout = 300){
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

function randomMorph(bubble) {
    // border-radius: 51% 49% 48% 52% / 62% 44% 56% 38%;
    // random value can be between 40 and 60
    let radomBorderRadius = '';
    for (let i = 0; i < 8; i++) {
        radomBorderRadius += Math.floor(Math.random() * 20) + 40 + '%' + ' ';
        if (i === 3) {
            radomBorderRadius += '/ ';
        }
    }

    // set the border radius
    bubble.style.borderRadius = radomBorderRadius;

    // random scale between 1 and 1.1
    let randomSize = Math.random() * 0.1 + 1;
    // set the scale
    bubble.style.transform = 'scale(' + randomSize + ')';

    // get child img element
    const img = bubble.querySelector('img');
    // set the same border radius for the img
    img.style.borderRadius = radomBorderRadius;
    // get child span.filter element
    const span = bubble.querySelector('span.filter');
    // set the same border radius for the span
    span.style.borderRadius = radomBorderRadius;

    // get child span.reflection element
    const reflection = bubble.querySelector('span.reflection');
    // set a random left position between 60% and 75% for the reflection 
    reflection.style.left = Math.random() * 15 + 60 + '%';
    // set a random top between 40px and 60px position for the reflection
    reflection.style.top = Math.random() * 20 + 40 + 'px';
}

setInterval(() => {
    bubbles.forEach(bubble => {
        randomMorph(bubble);
    });
}, 1000);

// Move bubbles
let x = window.innerWidth/2;
let y = window.innerHeight / 2;
let dx = 2;
let dy = -2;

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }
    
    x += dx;
    y += dy;
}

setInterval(draw, 10);