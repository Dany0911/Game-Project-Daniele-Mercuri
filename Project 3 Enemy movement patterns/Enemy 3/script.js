/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1'); // var to hold element
const ctx = canvas.getContext('2d'); // var ctx that get the context
const CANVAS_WIDTH = canvas.width = 500; // width and height same as in the css file so that doesn't come any distortion.
const CANVAS_HEIGHT = canvas.height = 1000;
const numberOfEnemies = 50; // var for total enemies
const enemiesArray = [];

let gameFrame = 0;

class Enemy { // enemy class to create all the enemies
    constructor() {
        this.image = new Image();
        this.image.src = 'enemy3.png';
        this.speed = Math.random() * 4 + 1; // random speed and go random directions
        this.spriteWidth = 218;
        this.spriteHeight = 177;
        this.width = this.spriteWidth / 2.5;
        this.height = this.spriteHeight / 2.5;
        this.x = Math.random() * (canvas.width - this.width); // every enemy orizontal position starts randomly
        this.y = Math.random() * (canvas.height - this.height); // every enemy vertical position starts randomly
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1); // flap speed randomly
        this.angle = Math.random() * 500;
        this.angleSpeed = Math.random() * 0.5 + 0.5;
        //this.curve = Math.random() * 200 + 50;
    }
    update() { // update function
        this.x = canvas.width / 2 * Math.sin(this.angle * Math.PI / 90) + (canvas.width / 2 - this.width / 2); // orizontal movement
        this.y = canvas.height / 2 * Math.cos(this.angle * Math.PI / 360) + (canvas.height / 2 - this.height / 2); // vertical movement
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