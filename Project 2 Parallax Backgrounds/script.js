const canvas = document.getElementById('canvas1'); // var to hold element
const ctx = canvas.getContext('2d'); // var ctx that get the context
const CANVAS_WIDTH = canvas.width = 800; //width and height same as in the css file so that doesn't come any distortion.
const CANVAS_HEIGHT = canvas.height = 700;
let gameSpeed = 4; // speed game var
//let gameFrame = 0;

const backgroundLayer1 = new Image(); // take all the 5 images needed
backgroundLayer1.src = 'layer-1.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = 'layer-2.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = 'layer-3.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = 'layer-4.png';
const backgroundLayer5 = new Image();
backgroundLayer5.src = 'layer-5.png';

window.addEventListener('load', function () { // make sure the window is properly loaded before start
    const slider = document.getElementById('slider'); // const to get the element slider
    slider.value = gameSpeed; // set value slider property to gameSpeed 5
    const showGameSpeed = document.getElementById('showGameSpeed'); // var to get showGameSpeed element
    showGameSpeed.innerHTML = gameSpeed; // change the game speed from the slider in the browser
    slider.addEventListener('change', function (e) { // whenever the slider will be clicked (so changed) will run the function
        gameSpeed = e.target.value;
        showGameSpeed.innerHTML = e.target.value;
    });

    class Layer { // create a class with a constructor needed for all the images to look properly and the speed modifier
        constructor(image, speedModifier) {
            this.x = 0;
            this.y = 0;
            this.width = 2400;
            this.height = 700;
            this.image = image;
            this.speedModifier = speedModifier;
            this.speed = gameSpeed * this.speedModifier;
        }
        update() { // update function
            this.speed = gameSpeed * this.speedModifier;
            if (this.x <= -this.width) {
                this.x = 0;
            }
            this.x = this.x - this.speed;
            //this.x = gameFrame * this.speed % this.width;
        }
        draw() { // draw image function
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
        }
    }
    // create all the layers background
    const layer1 = new Layer(backgroundLayer1, 0.2);
    const layer2 = new Layer(backgroundLayer2, 0.4);
    const layer3 = new Layer(backgroundLayer3, 0.6);
    const layer4 = new Layer(backgroundLayer4, 0.8);
    const layer5 = new Layer(backgroundLayer5, 1);

    const gameObject = [layer1, layer2, layer3, layer4, layer5]; // array for the layers needed for the following for loop

    function animate() { // function to animate
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // clear areas from the canvas
        gameObject.forEach(object => { // call functions update and draw through a for each loop for all the gameobject array
            object.update();
            object.draw();
        });
        //gameFrame--; // decrease gameFrame by one for every animation frame
        requestAnimationFrame(animate); // create animation loop and pass animate
    };
    animate();
});
