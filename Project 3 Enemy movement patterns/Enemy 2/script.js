/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1'); // var to hold element
const ctx = canvas.getContext('2d'); // var ctx that get the context
const CANVAS_WIDTH = canvas.width = 500; // width and height same as in the css file so that doesn't come any distortion.
const CANVAS_HEIGHT = canvas.height = 1000;
const numberOfEnemies = 20; // var for total enemies
const enemiesArray = [];

let gameFrame = 0;

class Enemy { // enemy class to create all the enemies
    constructor() {
        this.image = new Image();
        this.image.src = 'enemy2.png';
        this.speed = Math.random() * 4 + 1; // random speed and go random directions
        this.spriteWidth = 266;
        this.spriteHeight = 188;
        this.width = this.spriteWidth / 2.5;
        this.height = this.spriteHeight / 2.5;
        this.x = Math.random() * (canvas.width - this.width); // every enemy orizontal position starts randomly
        this.y = Math.random() * (canvas.height - this.height); // every enemy vertical position starts randomly
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1); // flap speed randomly
        this.angle = 0;
        this.angleSpeed = Math.random() * 0.2;
        this.curve = Math.random() * 7;
    }
    update() { // update function
        this.x -= this.speed;
        this.y += this.curve * Math.sin(this.angle); // sin angles make the enemy move in a curve direction
        this.angle += this.angleSpeed;
        if (this.x + this.width < 0) this.x = canvas.width;
        // animate sprites
        if (gameFrame % this.flapSpeed === 0) { // run this code only every tot loops; if else statement
            this.frame > 4 ? this.frame = 0 : this.frame++;
        }
    }
    draw() { // draw function
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height); // draw image enemy, source sprite and position
    }
};

for (let i = 0; i < numberOfEnemies; i++) {// for loop for creating 100 enemies
    enemiesArray.push(new Enemy()); // push all the enemies in the array using the new Enemy constructor
}

function animate() { // animate function
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // clear areas from the canvas
    enemiesArray.forEach(enemy => { // for each enemy in the array call the update and draw function
        enemy.update();
        enemy.draw();
    });
    gameFrame++;
    requestAnimationFrame(animate); // create animation loop and pass animate
};
animate();