// global values

var globalScore = 0; //variable for scoring
var COLLX = 160; //collision box width
var COLLY = 85; // collision box height
var ROWS = [70,150,235];// these specify the Y coord for 3 enemy rows
var ROW1 = 70; // these specify the Y coord for 3 enemy rows
var ROW2 = 150;
var ROW3 = 235;
var THREE_YS_MAN = [ROW1, ROW2, ROW3]; // array with 3 row variables (used when randomly generating enemy row)
var DIFFFACTOR = 20; //increase to make game more difficult (enemies move faster at start)
var SPEEDLOWER = 100; //these two affect the range of variable enemy speed
var SPEEDUPPER = 200;
var STARTX = -100; //x value where enemies start
var ENEMY_SPRITES = ['images/enemy-bug.png',
        'images/enemy-bug2.png',
        'images/enemy-bug3.png',
        'images/enemy-bug4.png']; //array with 4 enemy png file paths
var GOALS = ['images/Star.png',
        'images/Gem Green.png',
        'images/Gem Orange.png',
        'images/Gem Blue.png']; // array with 4 goal png image paths
var GOALS_LOC = [0,100,200,300,400]; //columns where GOALS can appear (always in top row)
var HERO_START_X = 200; //hero start location and step size X/Y variables
var HERO_START_Y= 402;
var HERO_STEP_X= 100;
var HERO_STEP_Y = 82;
var allEnemies=[]; // declaration for allEnemies array - this gets filled up in a for loop later on
$('#score').text(globalScore);
var selHero = selectedHero.value;



// random # generator -- source:
// http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// use to generate radom speed of bugs with upper and lower limit
function randomSpeed() {
  return getRandomInt(SPEEDLOWER, SPEEDUPPER);
}

// difficulty increases as score increases
function difficulty(){
    return globalScore * DIFFFACTOR;
}


// Enemies and Heros 
var allSprites = function(sprite,x,y){
    this.x = x;
    this.y = y;
    this.sprite = sprite;    
};

allSprites.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Random selection of bug sprite: 
// http://stackoverflow.com/questions/5915096/get-random-item-from-javascript-array
function pickaBug(){
    var bugNum = Math.floor(Math.random()*ENEMY_SPRITES.length);
    return ENEMY_SPRITES[bugNum];
}

//Random selection of goal sprite: 
// http://stackoverflow.com/questions/5915096/get-random-item-from-javascript-array
function pickaGoal(){
    var goalNum = Math.floor(Math.random()*GOALS.length);
    return GOALS[goalNum];
}

//Randomly picks a spot for a goal on update
function locateGoal(){
    var locNum = Math.floor(Math.random()*GOALS_LOC.length);
    return GOALS_LOC[locNum];
}

// Enemies our player must avoid
var Enemy = function(sprite,x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    if (typeof this.sprite === 'undefined') { this.sprite = pickaBug(); }
    this.x = STARTX;
    this.y = newY();
    allSprites.call(this, sprite, x, y); //
    this.enemySpeed = randomSpeed(); // speed of enemy
};

Enemy.prototype = Object.create(allSprites.prototype);

// using the following resource for collision detection:
// https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
Enemy.prototype.yBegin = [ROW1,ROW2,ROW3];
Enemy.prototype.hitRect = {width: COLLX, height: COLLY};
Enemy.prototype.constructor = Enemy;

Enemy.prototype.reset = function(){
    this.x = STARTX;
    this.y = newY();
    this.sprite = pickaBug();
    this.enemySpeed = randomSpeed();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x <= (canvas.width + this.hitRect.width/2)) {
        this.x += (this.enemySpeed + difficulty()) * dt;
    }
    // else if over edge...
    else {
         //console.log(canvas.width + this.hitRect/2);
        this.reset();
    }

    if (player.collisions(this)){
        globalScore = globalScore - 1;
        $('#score').text(globalScore);
        //player reset call in collisions code
    }

};

//source for newY funct: 
// http://stackoverflow.com/questions/5915096/get-random-item-from-javascript-array
function newY(){
    var num = Math.floor(Math.random()*THREE_YS_MAN.length);
    var num2 = THREE_YS_MAN[num];
    return num2;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

for (i = 0; i < ROWS.length; i++) {
    allEnemies[i] = new Enemy(pickaBug(), STARTX,ROWS[i]);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var PlayerClass = function(){
    if (typeof this.sprite === 'undefined') { this.sprite = selHero;}
    this.x = HERO_START_X;
    this.y = HERO_START_Y;
    allSprites.call(this, this.sprite, this.x, this.y); //render the sprite (superclass)
};



PlayerClass.prototype = Object.create(allSprites.prototype); //using superclass to render
PlayerClass.prototype.constructor = PlayerClass;
PlayerClass.prototype.update = function(){
    selHero = selectedHero.value;
    this.sprite = selHero;
    switch(this.action){
        //using parameters from engine.js line 30
        case 'up':
            if (this.y > canvas.boundaries.up){
                this.y -= HERO_STEP_Y;
            }
            break;
        case 'down':
            if (this.y < canvas.boundaries.down){
                this.y += HERO_STEP_Y;
            }
            break;            
        case 'right':
            if (this.x < canvas.boundaries.right){
                this.x += HERO_STEP_X;
            }
            break;
        case 'left':
            if (this.x > canvas.boundaries.left){
                this.x -= HERO_STEP_X;
            }
            break;
        default:
            break;
    }
    //so hero only takes one step
  this.action = null;
  //reset and take point if player falls in the water
  if (this.y < 20){
    globalScore = globalScore - 1;
    $('#score').text(globalScore);
    this.reset();
  }
};


PlayerClass.prototype.handleInput = function(e){
    this.action = e;
};

//handles collisions
// algo to check for collisions
// source: https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
PlayerClass.prototype.collisions= function(something){
    if (this.x > something.x - something.hitRect.width/2 &&
        this.x < something.x + something.hitRect.width/2 &&
        this.y > something.y - something.hitRect.height/2 &&
        this.y < something.y + something.hitRect.height/2){
        this.reset();
        return true;
    }
    else{
        return false;
    }

};


//resets hero after hits but or prize
PlayerClass.prototype.reset = function(){
    this.x = HERO_START_X;
    this.y = HERO_START_Y;
};

//for the prize and points
var goalClass = function(){
    if (typeof this.sprite === 'undefined') { this.sprite = pickaGoal(); }
    this.x = locateGoal();
    this.y = ROW1;
    allSprites.call(this, this.sprite, this.x, this.y); //render the sprite (superclass)
};

goalClass.prototype = Object.create(PlayerClass.prototype);
goalClass.prototype.hitRect = {width: COLLX, height: COLLY};
goalClass.prototype.x = locateGoal();
goalClass.prototype.constructor = goalClass;
goalClass.prototype.reset = function(){
    this.x = locateGoal();
    this.y = ROW1;
};
goalClass.prototype.update = function(dt) {
  // handle collisions with player
  if (player.collisions(this)) {
    this.reset();
    this.x = locateGoal();
    this.sprite = pickaGoal();
    globalScore += 1;
    $('#score').text(globalScore);
  }
};


//defines player
var player = new PlayerClass();
var goal = new goalClass();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
// Run the init() function in the Engine file everytime player
// dies or makes it across the road...
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };


    player.handleInput(allowedKeys[e.keyCode]);
});
