const bubbles = document.querySelectorAll('.bubble');
const bubbleMove = document.querySelectorAll('.bubble-move');
const cursor = document.querySelector('.cursor');
const background = document.getElementById('background');
const popup = document.querySelector(".popup")
const context = background.getContext('2d');
let popUpText = null;
let popUpOpen = false;
const totemImg = new Image();
totemImg.src = '../public/images/totem.png';
const width = 1920;
const height = 1080;
const nbFish = 200;
background.width = width;
background.height = height;
let mouseX;
let mouseY;
let backBubbles = [];
let backFishes = [];
let backTurtles = [];
let backBelugas = [];
const sunRays = [];
let totem = null;
let time = 0;
let bubbleDirection = {};

// background animations
function animateBackground() {
    // animation
    spawnCheck();
    context.clearRect(0, 0, width, height);
    drawGradient();
    drawBelugas();
    drawFishes();
    drawTurtles();
    drawBubbles();
    drawTotem();
    drawSunRays();
    drawGradientTransparent();

    if (time < 360) {
        context.fillStyle = 'rgba(253, 214, 29, ' + (1 - ((time / 360))) + ')';
        context.fillRect(0, 0, width, height);
    }

    time++;
    requestAnimationFrame(animateBackground);
}

// draws and update the totem
function drawTotem() {
    if (totem == null) return;
    totem.update();
    totem.draw(context);
    if (totem.finished) totem = null;
}

// draws and update background turtles
function drawTurtles() {
    backTurtles = backTurtles.filter(tur => !tur.finished);
    backTurtles.forEach((tur) => {
        tur.update();
        tur.draw(context);
    });
}

//draws and update background fishes
function drawFishes() {
    let target = new Vector(mouseX, mouseY);
    backFishes.forEach((fis) => {
        fis.update();
        fis.draw(context);
    });
}

// draws and update background belugas
function drawBelugas() {
    backBelugas = backBelugas.filter(bel => !bel.finished);
    backBelugas.forEach((bel) => {
        bel.update();
        bel.draw(context);
    });
}

// draws and update background bubbles
function drawBubbles() {
    backBubbles = backBubbles.filter(bub => !bub.finished);
    backBubbles.forEach((bub) => {
        bub.update();
        bub.draw(context);
    });
}

// draws the background gradient
function drawGradient() {
    const gradient = context.createLinearGradient(0, 0, width / 3, height * 1.8);
    gradient.addColorStop(0, '#0088FF');
    gradient.addColorStop(1, '#000022');
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
}

// draws the transparent gradient
function drawGradientTransparent() {
    const gradient = context.createLinearGradient(0, 0, width / 3, height * 1.8);
    gradient.addColorStop(0, '#0088FF50');
    gradient.addColorStop(1, '#000022FF');
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
}

// draws and update the sunrays
function drawSunRays() {
    sunRays.forEach((sunRay) => {
        sunRay.update();
        sunRay.draw(context);
    });
}

// spawns new animals
function spawnCheck() {
    if (time == 0) spawnFishes();
    if (time % 1849 == 600) spawnBubbles();
    if (time % 3447 == 0) {
        spawnTurtles();
        if (Math.random() > 0.5) spawnTurtles();
    }
    if (time % 10000 == 2000) spawnBeluga();
    if (time % 8500 == 1500) spawnTotem();
}

// spawns the sunRays
function spawnSunRay() {
    sunRays.push(new Sunray(50, -50, 120));
    sunRays.push(new Sunray(180, -50, 40));
    sunRays.push(new Sunray(240, -50, 10));
    sunRays.push(new Sunray(30, -50, 15));
}

// spawns a pack of turtles
function spawnTurtles() {
    let number = Math.round(Math.random() * 7);
    let y = Math.round(Math.random() * height / 2 + height / 4);
    let direction = Math.random() > 0.5 ? 1 : -1;
    for (let i = 0; i < number; i++) {
        backTurtles.push(new Turtle(-400 * direction - i * 50 + (direction == -1 ? width : 0), y + i * 50, direction));
    }
}

// spawns a beluga
function spawnBeluga() {
    let y = Math.round(Math.random() * height / 2 + height / 4);
    backBelugas.push(new Beluga(-200, y));
}

// spawns a totem
function spawnTotem() {
    let x = Math.round(Math.random() * width / 2 + width / 4);
    totem = new Totem(x, -100);
}

// spawns a pack of bubbles
function spawnBubbles() {
    let number = Math.round(Math.random() * 150);
    let x = Math.round(Math.random() * width);
    for (let i = 0; i < number; i++) {
        backBubbles.push(new Bubble(x + Math.random() * 100, height + 200 + Math.random() * 1000));
    }
}

// spawns a pack of fishes
function spawnFishes() {
    for (let i = 0; i < nbFish; i++) {
        backFishes.push(new Fish(Math.random() * width * 2 - width, Math.random() * height * 2 - height));
    }
}

// Place the bubbles in the center of the screen
function placeBubbles() {
    bubbleMove.forEach(bubble => {
        // bubble size
        const size = {
            width: bubble.offsetWidth,
            height: bubble.offsetHeight
        };
        // bubble position
        bubble.style.left = window.innerWidth / 2 - size.width / 2 + 'px';
        bubble.style.top = window.innerHeight / 2 - size.height / 2 + 'px';
        resetBubbleDirection(bubble);

        // set bubble speed to 5
        bubble.dataset.speedx = 2;
        bubble.dataset.speedy = 2;
        // set timout to reset speed to default
        setTimeout(() => {
            setRandomSpeed(bubble);
        }, 250);
    });
}

// Debounce function to reduce the frequency of resize function calls
function debounce(func, timeout = 300) {
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
    // set a random transform for the reflection
    reflection.style.transform = 'translate3d(calc(' + Math.random() * 100 + 60 + '% - 50%), calc(' + Math.random() * 20 + 40 + 'px - 50%), 0)';
}

// Add event listener for each bubble
bubbles.forEach(bubble => {
    // on mouse enter
    bubble.addEventListener('mouseenter', () => {
        // set the data-hovered attribute to true
        bubble.dataset.hovered = "true";
    });
    // on mouse leave
    bubble.addEventListener('mouseleave', () => {
        // set the data-hovered attribute to false
        bubble.dataset.hovered = "false";
    });
});

bubbleMove.forEach(bubble => {
    bubble.addEventListener("click", () => {
        let id = bubble.dataset.id;
        popUpText = document.getElementById(id);
        popup.style.display = "block";
        popUpText.style.display = "block";
        popUpOpen = true;
    });
})

popup.addEventListener("click", () => {
    if (popUpOpen) {
        popUpText.style.display = "none";
        popup.style.display = "none";
        popUpOpen = false;
    }
})

function setRandomSpeed(bubble) {
    // set a random speed between 0.2 and 0.4
    bubble.dataset.speedx = Math.random() * 0.2 + 0.2;
    bubble.dataset.speedy = Math.random() * 0.2 + 0.2;
}

// Move bubbles
function moveBubbles() {
    bubbleMove.forEach(bubble => {
        // get the bubble child div.bubble
        const bubbleChild = bubble.querySelector('.bubble');
        // test if the bubble is not hovered
        if (bubbleChild.dataset.hovered === "false" || bubbleChild.dataset.hovered === undefined) {

            if (bubble.dataset.speedx === "0" && bubble.dataset.speedy === "0") {
                // set default bubbleMove speed between 0.2 and 0.4
                setRandomSpeed(bubble);
            }

            // get the bubble size
            const size = {
                width: bubbleChild.offsetWidth,
                height: bubbleChild.offsetHeight
            };
            // get the bubble position
            const position = {
                x: parseFloat(bubble.style.left),
                y: parseFloat(bubble.style.top)
            };
            // get the bubble speed
            const speed = {
                x: parseFloat(bubble.dataset.speedx),
                y: parseFloat(bubble.dataset.speedy)
            };
            // get the bubble direction
            const direction = {
                x: parseFloat(bubble.dataset.directionx),
                y: parseFloat(bubble.dataset.directiony)
            };
            // get the bubble new position
            const newPosition = {
                x: position.x + speed.x * direction.x,
                y: position.y + speed.y * direction.y
            };

            // test if the bubble is out of the screen
            if (
                newPosition.x < 0 + window.innerWidth / 15 ||
                newPosition.x > window.innerWidth - (size.width + window.innerWidth / 15)
            ) {
                // if so, change the direction
                bubble.dataset.directionx = -direction.x;
                // set a new random speed
                setRandomSpeed(bubble);
            }

            if (
                newPosition.y < 0 + window.innerHeight / 15 ||
                newPosition.y > window.innerHeight - (size.height + window.innerHeight / 15)
            ) {
                // if so, change the direction
                bubble.dataset.directiony = -direction.y;
                // set a new random speed
                setRandomSpeed(bubble);
            }
            // set the new position
            bubble.style.left = newPosition.x + 'px';
            bubble.style.top = newPosition.y + 'px';
        } else {
            // stop the bubble
            bubble.dataset.speedx = 0;
            bubble.dataset.speedy = 0;
        }
    });

    // call the animation frame
    requestAnimationFrame(moveBubbles);
}

// store default direction for each bubble
bubbleMove.forEach(bubble => {
    bubbleDirection[bubble.dataset.id] = {
        x: parseFloat(bubble.dataset.directionx),
        y: parseFloat(bubble.dataset.directiony)
    };
});

// reset bubble direction to default
function resetBubbleDirection(bubble) {
    bubble.dataset.directionx = bubbleDirection[bubble.dataset.id].x;
    bubble.dataset.directiony = bubbleDirection[bubble.dataset.id].y;
}

// call the randomMorph function every 1 second
setInterval(() => {
    bubbles.forEach(bubble => {
        // test if the bubble is not hovered
        if (bubble.dataset.hovered === "false" || bubble.dataset.hovered === undefined) {
            // if not, morph it
            randomMorph(bubble);
        }
    });
}, 1000);

// on resize
window.addEventListener('resize', debounce(() => {
    placeBubbles();
}, 1000));

// place the bubbles
placeBubbles();

// call the animation frame
moveBubbles();

// spawn sunRays
spawnSunRay();

// start background animation
animateBackground()