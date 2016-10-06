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
        this.x = bugX + 150 * dt;
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

//Score counter. Score increases by 3pts when Player wins.
Player.prototype.score = function() {
    if(this.y == 0) {
        counter+=3;
    }
    var Score = "Score: " + " " + counter;
    text(Score, 470, 100);

    //Different Levels of Game. Game changes from level 1 to level 2 when score is greater than 25.
    if(counter < 25) {
        text("Level  1", 70, 100);
    }
    else {
        text("Level  2", 70, 100);
    }

    function text(text, posX, posY) {
        ctx.fillStyle = "white";
        ctx.font = "16px impact";
        ctx.textAlign = "right";
        ctx.fillText(text, posX, posY);
    }

}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Handles input by moving the player
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

//Collision Detection
Player.prototype.collision = function(x, y) {
    bugX = x;
    bugY = y;
    bugWidth = 70;
    bugHeight = 40;
    playerWidth = 60;
    playerHeight = 65;
    if (this.x < bugX + bugWidth && 
        this.x + playerWidth > bugX &&
        this.y < bugY + bugHeight &&
        this.y + playerHeight > bugY) 
    {
        //Player goes to initial position after collision. Score reduces by 1pt. 
        //If score is greater than or equal to 25, it reduces by 5 on collision
        if (counter < 25) {
            this.y = 375;
            counter--;
        }
        else {
           this.y = 375;
            counter-=5; 
        }
    }
};

//Gems for Player to collect.
var Gem = function(x,y) {
    this.sprite = 'images/Gem_Blue.png';
    this.x = x;
    this.y = y;
};

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Gems collection. Colleting gems increase score by 3pts or 5pts.
Gem.prototype.collect = function(x, y) {
    playerX = x;
    playerY = y;
    gemWidth = 70;
    gemHeight = 40;
    playerWidth = 60;
    playerHeight = 65;
    if (this.x < playerX + playerWidth && 
        this.x + gemWidth > playerX &&
        this.y < playerY + playerHeight &&
        this.y + gemHeight > playerY)
    {
        if (counter < 25) {
            this.x = rand1();
            this.y = rand2();
            counter+=3;
        }
        else {
            this.x = rand1();
            this.y = rand2();
            counter+=5;
        }
        
    }
    //On reaching Level 2, Green Gem is displayed.
    if (counter >= 25) {
        this.sprite = 'images/Gem_Green.png';
    }

    //Functions for random generation of Gems
    function rand1() {
        var rand = Math.random();
        if(rand <= 0.3) {
            return(100);
        }
        if(rand > 0.3 && rand < 0.6) {
            return(200);
        }
        if(rand >= 0.6) {
            return(300);
        }
    }

    function rand2() {
        var rand = Math.random();
        if(rand <= 0.3) {
            return(75);
        }
        if(rand > 0.3 && rand < 0.6) {
            return(160);
        }
        if(rand >= 0.6) {
            return(230);
        }
    }

}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(50,65), new Enemy(120,145), new Enemy(280,225), new Enemy(430,145)];
var player = new Player(200,375);
var gem = new Gem(420,75);

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
