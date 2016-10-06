// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

        var bugX = this.x;
        var bugY = this.y;
        
        //Enemy movement
        if(bugX < 550) {
        this.x = bugX + 200 * dt;
        }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //Loop Enemy movement
    if(this.x > 510) {
        this.x = 0;
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

Player.prototype.update = function() {
    //Player goes back to initial position on winning
    if (this.y == 0) {
        this.y = 375;
    }
};
var counter = 0;

//Score counter. Score updates when Player wins.
Player.prototype.score = function() {
    ctx.fillStyle = "white";
    ctx.font = "16px impact";
    ctx.textAlign = "right";
    
    if(this.y == 0) {
        counter++;
    }
    var Score = "Score: " + " " + counter;
    ctx.fillText(Score, 470,100);

}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    moveX = 100;
    moveY = 75;
    //Move up
    if(key == 'up' && this.y > 0) {
        this.y = this.y - moveY;
    }
    //Move down
    if(key == 'down' && this.y < 375) {
        this.y = this.y + moveY;
    }
    //Move left
    if(key == 'left' && this.x > 0) {
        this.x = this.x - moveX;
    }
    //Move Right
    if(key == 'right' && this.x < 400) {
        this.x = this.x + moveX;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(250,65), new Enemy(100,145), new Enemy(200,225), new Enemy(400,145)];
var player = new Player(200,375);

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
