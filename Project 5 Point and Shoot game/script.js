const canvas = document.getElementById('canvas1'); // var to hold element
const ctx = canvas.getContext('2d'); // var ctx that get the context
canvas.width = window.innerWidth; // canvas width
canvas.height = window.innerHeight; // canvas height
const collisionCanvas = document.getElementById('collisionCanvas'); // var to hold element
const collisionCtx = collisionCanvas.getContext('2d'); // var ctx that get the context
collisionCanvas.width = window.innerWidth; // collisionCanvas width
collisionCanvas.height = window.innerHeight; // collisionCanvas height

let score = 0; // score var
let gameOver = false; // var for gameOver set initially to false
ctx.font = '50px Impact'; // Font text score

let timeToNextRaven = 0;
let ravenInterval = 500;
let lastTime = 0;

let ravens = []; // array
class Raven { // class for all the ravens
    constructor() {
        this.spriteWidth = 271; // sprite width
        this.spriteHeight = 194; // sprite height
        this.sizeModifier = Math.random() * 0.4 + 0.3; // set sizeModifier randomly to modfy the size of the sprites in the next 2 lines
        this.width = this.spriteWidth * this.sizeModifier; // width
        this.height = this.spriteHeight * this.sizeModifier; // height
        this.x = canvas.width; // raven flight to the left
        this.y = Math.random() * (canvas.height - this.height); // vertical raven inside canvas not going out.
        this.directionX = Math.random() * 5 + 3; // orizontally random direction
        this.directionY = Math.random() * 5 - 2.5; // vertically random direction
        this.markedForDeletion = false; // set initially markedForDeletion to false
        this.image = new Image(); // create new image
        this.image.src = 'raven.png'; // image url
        this.frame = 0; // set frame
        this.maxFrame = 4; // set MaxFrame
        this.timeSinceFlap = 0; // Set timesinceflap
        this.flapInterval = Math.random() * 50 + 50; // random flap interval
        this.randomColors = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)]; // give random colors
        this.color = 'rgb(' + this.randomColors[0] + ',' + this.randomColors[1] + ',' + this.randomColors[2] + ')'; // concatenate colors
        this.hasTrail = Math.random() > 0.5; // set has trail with random number
    }
    update(deltaTime) { // update function
        if (this.y < 0 || this.y > canvas.height - this.height) { //if statement
            this.directionY = this.directionY * -1; // set the direction to bounce so that the raven doesn't disappear vertically
        }
        this.x -= this.directionX; // moving to the left
        this.y += this.directionY; // moving vertically
        if (this.x < 0 - this.width) this.markedForDeletion = true; // if statement to check if the raven has left the display to the left side, and if it does, set markedForDeletion to true needed then to filter it out in the animate function
        this.timeSinceFlap += deltaTime; // increase timeSinceFlap by deltaTime
        if (this.timeSinceFlap > this.flapInterval) { // if statement
            if (this.frame > this.maxFrame) this.frame = 0; // if statement frame > maxFrame set this.frame to 0
            else this.frame++; // else statement increase frame by 1
            this.timeSinceFlap = 0; // reset timeSinceFlap to 0
            if (this.hasTrail) { //if statement
                for (let i = 0; i < 5; i++) {// for loop to add more particles
                    particles.push(new Particle(this.x, this.y, this.width, this.color)); // push particles in the array
                }
            }
        }
        if (this.x < 0 - this.width) gameOver = true; // if a raven manage to go all across the screen gameOver set to true
    }
    draw() {// draw function
        collisionCtx.fillStyle = this.color; // fill style colors
        collisionCtx.fillRect(this.x, this.y, this.width, this.height); // fill with assigned properties
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height); // draw image, source and position
    }
}
let explosions = []; // explosions array
class Explosions {// explosions class
    constructor(x, y, size) { // constructor needed in every class
        this.image = new Image(); // create new image
        this.image.src = 'boom.png'; // image url
        this.spriteWidth = 200; // sprite width
        this.spriteHeight = 179; // sprite height
        this.size = size; // size
        this.x = x;
        this.y = y;
        this.frame = 0;
        this.sound = new Audio(); // create new audio
        this.sound.src = 'boom.wav'; // audio url
        this.timeSinceLastFrame = 0;
        this.frameInterval = 200;
        this.markedForDeletion = false;
    }
    update(deltaTime) {// update function with deltaTime as argument
        if (this.frame === 0) this.sound.play(); // play sound if this.frame is equal 0
        this.timeSinceLastFrame += deltaTime;// increase timeSinceLastFrame by deltaTime
        if (this.timeSinceLastFrame > this.frameInterval) {// if statement
            this.frame++; // increase frame by 1
            this.timeSinceLastFrame = 0; // set to 0
            if (this.frame > 5) this.markedForDeletion = true;
        }
    }
    draw() {
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y - this.size / 4, this.size, this.size); // draw image, source and positions
    }
}
// just extra particles feature for fun
let particles = []; // particles array
class Particle {//class particle
    constructor(x, y, size, color) {// construnctor pretty much same as all the others
        this.size = size;
        this.x = x + this.size / 2 + Math.random() * 50 - 25;
        this.y = y + this.size / 3 + Math.random() * 50 - 25;
        this.radius = Math.random() * this.size / 10; // random radius tied size of the raven
        this.maxRadius = Math.random() * 20 + 35; // random number max radius
        this.markedForDeletion = false;
        this.speedX = Math.random() * 1 + 0.5; // orizontal speed x random
        this.color = color;
    }
    update() {//update function
        this.x += this.speedX; // increase x by speedX
        this.radius += 0.5; // increase radius by 0.5
        if (this.radius > this.maxRadius - 5) this.markedForDeletion = true; // set markedForDeletion to true if statement is true
    }
    draw() {//draw function to draw a circle with style and filling
        ctx.save();
        ctx.globalAlpha = 1 - this.radius / this.maxRadius;
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

function drawScore() {// draw score function
    ctx.fillStyle = 'black';//color of the style
    ctx.fillText('Score: ' + score, 50, 75); //text + coordinates where the score go
    ctx.fillStyle = 'white';//color of the style
    ctx.fillText('Score: ' + score, 55, 80); //Same as before just to create shadow effect
};
function drawGameOver() {// function for game over
    ctx.textAlign = 'center'; // align text in the center
    ctx.fillStyle = 'black'; // balck style
    ctx.fillStyle = 'white';//color of the style
    ctx.fillText('GAME OVER, your score is ' + score, canvas.width / 2 + 5, canvas.height / 2 + 5); // text to display
}

window.addEventListener('click', function (e) { // add event listener and function when you click
    const detectPixelColor = collisionCtx.getImageData(e.x, e.y, 1, 1,); // scan the image
    console.log(detectPixelColor);
    const pc = detectPixelColor.data; // hold data array
    ravens.forEach(object => {// for each loop to go through the colors
        if (object.randomColors[0] === pc[0] && object.randomColors[1] === pc[1] && object.randomColors[2] === pc[2]) { // if statement to compare if the random colors are equal to the pc pixel colors
            // collision detected
            object.markedForDeletion = true; // if they match we have collision so set markedForDeletion to true
            score++; // increase score by 1
            explosions.push(new Explosions(object.x, object.y, object.width)); // push into the array new explosions
        }
    });
});

function animate(timestamp) {// function animate with numeric value in milliseconds
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear areas from the  ctx canvas
    collisionCtx.clearRect(0, 0, canvas.width, canvas.height); // clear areas from the collisionCtx canvas
    let deltaTime = timestamp - lastTime; // deltaTime value in milliseconds
    lastTime = timestamp; // lastTime variable pass to the last timestamp
    timeToNextRaven += deltaTime; // increase timeToNextRaven by deltaTime for every animation frame
    if (timeToNextRaven > ravenInterval) {// if statement when timeToNextRaven reach the Interval
        ravens.push(new Raven()); // create raven and push it in the array
        timeToNextRaven = 0; // set timeToNextRaven back to 0 after pushing the raven in the array so it will start counting again
        ravens.sort(function (a, b) { // sort the ravens array in ascending order
            return a.width - b.width;
        });
    };
    drawScore();
    [...particles, ...ravens, ...explosions].forEach(object => object.update(deltaTime)); // create array literal with spreading ravens array; create also a for each loop that will go through the array and trigger update method on all ravens
    [...particles, ...ravens, ...explosions].forEach(object => object.draw()); // same as before but for drawing
    ravens = ravens.filter(object => !object.markedForDeletion); // filter out all the object that doesn't meet the condition, in this case all the ravens that left the display
    explosions = explosions.filter(object => !object.markedForDeletion); // same as before but for explosions
    particles = particles.filter(object => !object.markedForDeletion); // same as before but for particles
    if (!gameOver) requestAnimationFrame(animate); // call animate creating endless animation loop as long as gameOver is not true
    else drawGameOver(); // else call drawGameOver 
}
animate(0);// start the function passing 0 as argument; 0 is the initial value of timestamp