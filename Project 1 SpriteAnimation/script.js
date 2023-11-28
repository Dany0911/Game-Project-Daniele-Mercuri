let playerState = 'fall';
const dropdown = document.getElementById('animations');
dropdown.addEventListener('change', function (e) { //whenever the animations in the dropdown change set the value
    playerState = e.target.value;
})


const canvas = document.getElementById('canvas1'); // var to hold element
const ctx = canvas.getContext('2d'); // var ctx that get the context
const CANVAS_WIDTH = canvas.width = 600; //width and height same as in the css file so that doesn't come any distortion.
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();  // bring image in the project
playerImage.src = 'shadow_dog.png'; // set the path of the imag
const spriteWidth = 575;
const spriteHeight = 523;

let gameFrame = 0;
const staggerFrames = 5;
const spriteAnimations = []; // sprite animations array
const animationStates = [ // animation states array
    {
        name: 'idle',
        frames: 7,
    },
    {
        name: 'jump',
        frames: 7,
    },
    {
        name: 'fall',
        frames: 7,
    },
    {
        name: 'run',
        frames: 9,
    },
    {
        name: 'dizzy',
        frames: 11,
    },
    {
        name: 'sit',
        frames: 5,
    },
    {
        name: 'roll',
        frames: 7,
    },
    {
        name: 'bite',
        frames: 7,
    },
    {
        name: 'ko',
        frames: 12,
    },
    {
        name: 'gethit',
        frames: 4,
    },
];
animationStates.forEach((state, index) => { // for each loop
    let frames = {
        loc: [], // loc array
    }
    for (let j = 0; j < state.frames; j++) { // for loop to calculate positions
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({ x: positionX, y: positionY }); // push positions in the loc array
    }
    spriteAnimations[state.name] = frames;
});
console.log(spriteAnimations);

function animate() { // function to animate
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // clear areas from the canvas
    let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length; // we will increase spriteanimations times gameFrame before to advance, dividing gameFrame to staggeredFrames
    let frameX = spriteWidth * position;
    let frameY = spriteAnimations[playerState].loc[position].y;

    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0,
        spriteWidth, spriteHeight); // pass the image and position

    gameFrame++; // increase gameframe by 1
    requestAnimationFrame(animate); // create animation loop and pass animate
};
animate();


