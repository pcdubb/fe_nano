// global values

var globalScore = 0; //variable for scoring
var collX = 160; //collision box width
var collY = 85; // collision box height
var row1 = 70; // these specify the Y coord for 3 enemy rows
var row2 = 150;
var row3 = 235;
var threeYsMan = [row1, row2, row3]; // array with 3 row variables (used when randomly generating enemy row)
var diffFactor = 20; //increase to make game more difficult (enemies move faster at start)
var speedLower = 100; //these two affect the range of variable enemy speed
var speedUpper = 200;
var startX = -100; //x value where enemies start
var enemySprites = ['images/enemy-bug.png',
        'images/enemy-bug2.png',
        'images/enemy-bug3.png',
        'images/enemy-bug4.png']; //array with 4 enemy png file paths
var goals = ['images/Star.png',
        'images/Gem Green.png',
        'images/Gem Orange.png',
        'images/Gem Blue.png']; // array with 4 goal png image paths
var goalsLoc = [0,100,200,300,400]; //columns where goals can appear (always in top row)
var heroStartX = 200; //hero start location and step size X/Y variables
var heroStartY = 402;
var heroStepX = 100;
var heroStepY = 82;
$('#score').text(globalScore);
var selHero = selectedHero.value;







// random # generator -- source:
// http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// use to generate radom speed of bugs with upper and lower limit
function randomSpeed() {
  return getRandomInt(speedLower, speedUpper);
}

// difficulty increases as score increases
function difficulty(){
    return globalScore * diffFactor;
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
    var bugNum = Math.floor(Math.random()*enemySprites.length);
    return enemySprites[bugNum];
}

//Random selection of goal sprite: 
// http://stackoverflow.com/questions/5915096/get-random-item-from-javascript-array
function pickaGoal(){
    var goalNum = Math.floor(Math.random()*goals.length);
    return goals[goalNum];
}

//Randomly picks a spot for a goal on update
function locateGoal(){
    var locNum = Math.floor(Math.random()*goalsLoc.length);
    return goalsLoc[locNum];
}

// Enemies our player must avoid
var Enemy = function(sprite,x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    if (typeof this.sprite === 'undefined') { this.sprite = pickaBug(); }
    this.x = startX;
    this.y = newY();
    allSprites.call(this, sprite, x, y); //
    this.enemySpeed = randomSpeed(); // speed of enemy
};

Enemy.prototype = Object.create(allSprites.prototype);

// using the following resource for collision detection:
// https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
Enemy.prototype.yBegin = [row1,row2,row3];
Enemy.prototype.hitRect = {width: collX, height: collY};
Enemy.prototype.constructor = Enemy;

Enemy.prototype.reset = function(){
    this.x = startX;
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
    var num = Math.floor(Math.random()*threeYsMan.length);
    var num2 = threeYsMan[num];
    return num2;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [
    new Enemy(pickaBug(), startX, row1),
    new Enemy(pickaBug(), startX, row2),
    new Enemy(pickaBug(), startX, row3)
];

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var playerClass = function(){
    if (typeof this.sprite === 'undefined') { this.sprite = selHero;}
    this.x = heroStartX;
    this.y = heroStartY;
    allSprites.call(this, this.sprite, this.x, this.y); //render the sprite (superclass)
};



playerClass.prototype = Object.create(allSprites.prototype); //using superclass to render
playerClass.prototype.constructor = playerClass;
playerClass.prototype.update = function(){
    selHero = selectedHero.value;
    this.sprite = selHero;
    switch(this.action){
        //using parameters from engine.js line 30
        case 'up':
            if (this.y > canvas.boundaries.up){
                this.y -= heroStepY;
            }
            break;
        case 'down':
            if (this.y < canvas.boundaries.down){
                this.y += heroStepY;
            }
            break;            
        case 'right':
            if (this.x < canvas.boundaries.right){
                this.x += heroStepX;
            }
            break;
        case 'left':
            if (this.x > canvas.boundaries.left){
                this.x -= heroStepX;
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


playerClass.prototype.handleInput = function(e){
    this.action = e;
};

//handles collisions
// algo to check for collisions
// source: https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
playerClass.prototype.collisions= function(something){
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
playerClass.prototype.reset = function(){
    this.x = heroStartX;
    this.y = heroStartY;
};

//for the prize and points
var goalClass = function(){
    if (typeof this.sprite === 'undefined') { this.sprite = pickaGoal(); }
    this.x = locateGoal();
    this.y = row1;
    allSprites.call(this, this.sprite, this.x, this.y); //render the sprite (superclass)
};

goalClass.prototype = Object.create(playerClass.prototype);
goalClass.prototype.hitRect = {width: collX, height: collY};
goalClass.prototype.x = locateGoal();
goalClass.prototype.constructor = goalClass;
goalClass.prototype.reset = function(){
    this.x = locateGoal();
    this.y = row1;
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
var player = new playerClass();
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
