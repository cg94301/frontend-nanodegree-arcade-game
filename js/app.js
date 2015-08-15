// Enemies our player must avoid
var Enemy = function(row,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 0;
    this.y = 63 + (row-1) * 82;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
    this.x = this.x + dt * this.speed;
    
    if (this.x >= 525) {
	this.x = -100;
    }
    
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = 205;
    this.y = 320;
    this.key = undefined;
    this.sprite = 'images/char-boy.png';
    this.collision = false;
    this.score = 0;
    this.hits = 0;
};

Player.prototype.left = function() { 
    this.x = this.x - 101; 
    if (this.x < 0) this.x = 0;
};

Player.prototype.right = function() { 
    this.x = this.x + 101; 
    if (this.x > 400) this.x = 400;
};

Player.prototype.up = function() { 
    this.y = this.y - 83 ;
    if (this.y < 40) {
	this.y = 320;
	this.score += 1;
	//alert((this.score - this.hits) + " POINTS" + "\nscore:" + this.score + " collisions:" + this.hits);
    }
};

Player.prototype.down = function() { 
    this.y = this.y + 83; 
    if (this.y > 400) this.y = 400;
};

Player.prototype.handleInput = function(key) {
    this.key = key;
};

Player.prototype.update = function() {
    
    if (this.key !== undefined) {
	
	if (this.key == 'left') this.left();
	if (this.key == 'right') this.right();
	if (this.key == 'up') this.up();
	if (this.key == 'down') this.down();
	
	this.key = undefined;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var lane1 = 3;
var lane2 = 1;
var lane3 = 2;
var lane4 = getRandomIntInclusive(1,3);
var lane5 = getRandomIntInclusive(1,3);

var speed1 = getRandomIntInclusive(65,85);
var speed2 = getRandomIntInclusive(85,115);
var speed3 = getRandomIntInclusive(120,130);
var speed4 = getRandomIntInclusive(150,170);
var speed5 = getRandomIntInclusive(175,190);

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(lane1,speed1), new Enemy(lane2,speed2), new Enemy(lane3,speed3), 
		  new Enemy(lane4,speed4), new Enemy(lane5,speed5)];
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
