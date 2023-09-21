const bubbles = document.querySelectorAll('.bubble');
const bubbleMove = document.querySelectorAll('.bubble-move');

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

        // set bubble speed to 5
        bubble.dataset.speedx = 2;
        bubble.dataset.speedy = 2;
        // set timout to reset speed to default
        setTimeout(() => {
            setRandomSpeed(bubble);
        }, 1000);
    });
}

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
                newPosition.x < 0 + window.innerWidth / 10 || 
                newPosition.x > window.innerWidth - (size.width + window.innerWidth / 10)
            ) {
                // if so, change the direction
                bubble.dataset.directionx = -direction.x;
                // set a new random speed
                setRandomSpeed(bubble);
            }

            if (
                newPosition.y < 0 + window.innerHeight / 10 ||
                newPosition.y > window.innerHeight - (size.height + window.innerHeight / 10)
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
