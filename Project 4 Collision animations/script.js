const canvas = document.getElementById('canvas1'); // var to hold element
const ctx = canvas.getContext('2d'); // var ctx that get the context
canvas.width = 500; // canvas width
canvas.height = 700; // canvas height
const explosions = []; // explosions array
let canvasPosition = canvas.getBoundingClientRect();

class Explosions {// explosions class
    constructor(x, y) { // constructor needed in every class
        this.spriteWidth = 200; // sprite width
        this.spriteHeight = 179; // sprite height
        this.width = this.spriteWidth * 0.7;
        this.height = this.spriteHeight * 0.7;
        this.x = x;
        this.y = y;
        this.image = new Image(); // create new image
        this.image.src = 'boom.png'; // image url
        this.frame = 0;
        this.timer = 0;
        this.angle = Math.random() * 6.2;
        this.sound = new Audio(); // create new audio
        this.sound.src = 'boom.wav'; // audio url
    }
    update() { // update function
        if(this.frame === 0) this.sound.play(); // play sound just once
        this.timer++; // increase timer by one
        if (this.timer % 10 === 0) { // if statement
            this.frame++; // increase frame by 1
        };
    }
    draw() { // draw function
        ctx.save(); // save current state of canvas
        ctx.translate(this.x, this.y); // translate rotation center point
        ctx.rotate(this.angle); // rotate entire canvas contex by random angle value
        ctx.drawImage(this.image, this.spriteWidth * this.frame, 0, this.spriteWidth, this.spriteHeight, 0 - this.width/2, 0-this.height/2, this.width, this.height); // draw image, source and position
        ctx.restore(); // restore canvas context
    }
}

window.addEventListener('click', function (e) { // eventlistener when click
    createAnimation(e); // calling createAnimation function
   });
/*    window.addEventListener('mousemove', function(e){ // same as before but when mouse move
    createAnimation(e);
   }) */

function createAnimation(e) {// createAnimation function
    let poistionX = e.x - canvasPosition.left; // var positionX
    let positionY = e.y - canvasPosition.top; // var positionY
    explosions.push(new Explosions(poistionX, positionY)); // push all the explosions in the array with the 2 posiions as a value
}

function animate() { // animate function
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear areas from the canvas
    for (let i = 0; i < explosions.length; i++) { // for loop to go through the array
        explosions[i].update(); // calling the update function for each explosion in the array with Index value
        explosions[i].draw(); // calling the draw function for each explosion in the array with index value
        if(explosions[i].frame > 5){
            explosions.splice(i, 1);
            i--;
        }
    }
    requestAnimationFrame(animate);
};
animate(); // call animate