/**
*	STUFF TO IMPLEMENT
* ----------------------------
*  
*  More Ghosts
*  More Levels
*  Fruit (game apear after so many dots are eaten)
*  big dot things that let you eat ghosts
*  flip pacman in the direction he is going
*
*  Random Levels?
*  Ghost AI
*  Blinky's chase
*  Better documentation
**/

/**
* Original Game notes: 
* -------------
*  ghosts’ speed is greatly reduced while they are in the tunnel.
*  each ghost has a different algorithm for traversing the maze, interesting
**/

/**
*  ennumerated variables.
**/
var EMPTY = 0;
var COIN = 1;
var BRICK = 2;
var POWER = 3;

/**
* array of all level's data
**/
var leveldata = [
	{
		grid:[
			[2,2,2,2,2,2,2],
			[0,1,1,1,1,1,1],
			[2,2,2,2,2,2,2]
			],
		pacman_home:{
			x:0,
			y:1
		}
	},	
	{
	grid:[
			[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
			[2,3,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,3,2],
			[2,1,2,2,2,1,2,2,2,2,1,2,1,2,2,2,2,1,2,2,2,1,2],
			[2,1,2,2,2,1,2,2,2,2,1,2,1,2,2,2,2,1,2,2,2,1,2],
			[2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
			[2,1,2,2,2,1,2,1,2,2,2,2,2,2,2,1,2,1,2,2,2,1,2],
			[2,1,1,1,1,1,2,1,1,1,1,2,1,1,1,1,2,1,1,1,1,1,2],
			[2,2,2,2,2,1,2,2,2,2,1,2,1,2,2,2,2,1,2,2,2,2,2],
			[0,0,0,0,2,1,2,1,1,1,1,0,1,1,1,1,2,1,2,0,0,0,0],
			[2,2,2,2,2,1,2,1,2,2,2,0,2,2,2,1,2,1,2,2,2,2,2],
			[1,1,1,1,1,1,1,1,2,0,0,0,0,0,2,1,1,1,1,1,1,1,1],
			[2,2,2,2,2,1,2,1,2,2,2,2,2,2,2,1,2,1,2,2,2,2,2],
			[0,0,0,0,2,1,2,1,1,1,1,1,1,1,1,1,2,1,2,0,0,0,0],
			[2,2,2,2,2,1,2,1,2,2,2,2,2,2,2,1,2,1,2,2,2,2,2],
			[2,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,2],
			[2,1,2,2,2,1,2,2,2,2,1,2,1,2,2,2,2,1,2,2,2,1,2],
			[2,1,1,1,2,1,1,1,1,1,1,0,1,1,1,1,1,1,2,1,1,1,2],
			[2,2,2,1,2,1,2,1,2,2,2,2,2,2,2,1,2,1,2,1,2,2,2],
			[2,1,1,1,1,1,2,1,1,1,1,2,1,1,1,1,2,1,1,1,1,1,2],
			[2,1,2,2,2,2,2,2,2,2,1,2,1,2,2,2,2,2,2,2,2,1,2],
			[2,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,2],
			[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
		],
		pacman_home: {
			x:11,
			y:16
		}
	}
]

/**
*  true when game is running/not paused
*  runner stores the interval function
**/
var running = false;
var runner;

/**
* how fast each game tick is
**/
var gameSpeed = 300;

/**
* Object representing Pinky
**/
var pinky = {
	name: "pinky",
	direction: "right",
	x: 0,
	y: 0,
	
	/**
	* selects a direction based on the chase algorithm
	**/
	chase: function(directions, grid){
		if(directions.length>1){
			var bestD = 10000000;
			var best;
			var target = grid.getLocationInDirection(pacman.x, pacman.y,pacman.direction, 4)
			for (var j = 0; j<directions.length; j++){
				var loc = grid.getLocationInDirection(this.x,this.y,directions[j])
				var locD = Math.sqrt(Math.pow(loc[0]-target[0],2)+Math.pow(loc[1]-target[1],2));
				var locD = Math.sqrt(Math.pow(loc[0]-target[0],2)+Math.pow(loc[1]-target[1],2));
				if(bestD > locD ){
					best = j;
					bestD = locD;
				}
			}
			this.direction = directions[best];
		}
		else //if only 1 direction to go
			this.direction = directions[0];
	},
}

/**
* Object representing Pacman
**/
var pacman = {
	direction: "right",
	turn: false,
	nextDirection: "right",
	x: 0,
	y: 0,
	home: {
		x:0,
		y:0
	},
	/**
	*  sets pacman's x and y to home values
	**/
	goHome: function(){
		this.x = this.home.x;
		this.y = this.home.y;
	},
	
	/**
	*  updates pacman's position on the page
	**/
	update: function(){
		$('.pacman').css("top", this.y*20);
		$('.pacman').css("left", this.x*20);
	}
	
}

/**
*  represents an instance of a grid
**/
function Grid(original){
	/**
	*  The grid itself
	**/
	this.array = [];
	
	/**
	*  total number of coins in the level
	**/
	this.coins = 0;
	
	//initializes the grid array when new instance created, and counts the coins
	for (var i = 0; i< original.length; i++){
		this.array.push([]);
		for(var j = 0; j< original[i].length; j++){
			this.array[i].push(original[i][j]);
			if(original[i][j] == COIN)
			this.coins++;
		}
	}
	
	/**
	* @returns the contents of the grid at a location
	**/
	this.getContents = function(x,y){
		return this.array[y][x];
	}
	
	/**
	* @returns the total coins in the level;
	**/
	this.getCoins = function(){
		return this.coins;
	}
	
	/**
	*  @returns the number of rows
	**/
	this.getHeight = function(){
		return this.array.length;
	}
	
	this.getWidth = function(){
		return this.array[0].length;
	}
	
	/**
	* sets a value into the grid at a given location. 
	**/
	this.setContents = function(x,y,value){
		this.array[y][x] = value;
	}
	
	/**
	* @returns a valid location on the grid a given distance and direction from x and y
	**/
	this.getLocationInDirection = function(x,y,direction,distance){
		if (distance == undefined)
			distance = 1;
		for (var i = 0; i<distance; i++){
			if (direction == "up")
				y--;
			if(direction == "down")
				y++;
			if(direction == "left")
				x--;
			if(direction == "right")
				x++;
		}
		if (x<0)
			x = this.array[0].length-1;
		else if (y<0)
			y = this.array.length-1;
		else if (x==this.array[0].length)
			x = 0;
		else if (y==this.array.length)
			y = 0;
		return[x,y];
	}
	
	/**
	* @returns a boolean. true if the given location is not a wall
	**/
	this.canMove = function(x,y){
		return (this.array[y][x] != BRICK)
	}
	
	
	
}


function Game(lv){
	
	/**
	* an object containing an instance of Grid
	**/
	this.grid;
	
	/**
	* an array that contains all the ghosts
	**/
	this.ghosts;
	
	/**
	* current game score. 
	**/
	this.score = 0;
	
	/**
	* the current level
	**/
	this.level = lv;
	
	/**
	* coins collected in the current level
	**/
	this.coinsCollected = 0;
	
	/**
	* Number. keeps track of how many game tics have passed
	**/
	this.gameTime;
	
	/**
	* String containing the current ghost mode
	**/
	this.mode;
	
	/**
	* Boolean. true if ghosts are frightened
	**/
	this.frightened;
	
	/**
	* Number. Keeps track of how long till ghosts are no longer frightened
	**/
	this.frightCountDown;
	
	/**
	* resets the game to default
	**/
	this.reset = function(){
		clearInterval(runner);
		running = false;
		this.score = 0;
		$('#score').text("Score: "+this.score);
		this.newLevel(0);
	}
	
	/**
	* sets up the grid for a new level
	**/
	this.newLevel = function(level){
		clearInterval(runner);
		running = false;
		$('#pause').css('background', "orange");
		$('#start').css('background', "blue");
		$('h3').text("Level: " + level);
		this.grid = new Grid(leveldata[level].grid);
		this.gameTime = 0;
		this.coinsCollected = 0;
		this.frightened = false;
		this.mode = "scatter";
		$('#world').html('');
		for (var y = 0; y<this.grid.getHeight(); y++){
			$('#world').append("<div class='row'></div>");
			for (var x = 0; x<this.grid.getWidth(); x++){
				var contents = this.grid.getContents(x,y);
				if (contents == BRICK)
					$('.row:last-child').append('<div class="brick"></div>');
				if (contents == COIN)
					$('.row:last-child').append('<div class="coin"></div>');
				if (contents == POWER)
					$('.row:last-child').append('<div class="power"></div>');
				if (contents == EMPTY)
					$('.row:last-child').append('<div class="empty"></div>');
			}
		}
		pacman.home.x = leveldata[level].pacman_home.x;
		pacman.home.y = leveldata[level].pacman_home.y;
		pacman.goHome();
		pacman.update();
		
	}
	
	/**
	* One game tick
	**/
	this.step = function() {
		
		
		//move pacman
		if (pacman.turn){
			var loc = this.grid.getLocationInDirection(pacman.x,pacman.y,pacman.nextDirection);
			if(this.grid.canMove(loc[0],loc[1])){
				pacman.direction = pacman.nextDirection;
				pacman.turn = false;
			}
		}
		var loc = this.grid.getLocationInDirection(pacman.x,pacman.y,pacman.direction);
		if(this.grid.canMove(loc[0],loc[1])){
			pacman.x = loc[0];
			pacman.y = loc[1];
			pacman.update();
		}
		
		//check if in the same position as a ghost
			//consequenses
		
		//collect coins
		if(this.grid.getContents(pacman.x,pacman.y) == COIN){
			this.grid.setContents(pacman.x,pacman.y, EMPTY);
			this.score++;
			this.coinsCollected++;
			$('#score').text("Score: "+this.score);
			$("#world .row:nth-child("+ (pacman.y+1) +") div:nth-child("+ (pacman.x+1) +")").removeClass();
			$("#world .row:nth-child("+ (pacman.y+1) +") div:nth-child("+ (pacman.x+1) +")").addClass("empty");
		}
		//check if collected all coins	
		if(this.coinsCollected == this.grid.getCoins()){
			var that = this;
			setTimeout(function(){
				alert("you win!");
				if(that.level+1<leveldata.length)
					that.newLevel(++that.level);
				else
					that.newLevel(that.level);
			
			},20);//give slight delay so pacman will move first before anouncing
		}
		//move ghosts
		//check if in same position as pacman
		
		this.gameTime++;
	}
	
	
	
	this.newLevel(this.level);
}
$(document).ready(function(){
	$(document).on("keydown", function(e){
		var key = event.which || event.keyCode;
		if (key == 87 || key == 38)//up
			pacman.nextDirection = "up";

		else if (key == 83 || key == 40)//down
			pacman.nextDirection = "down";
		
		else if (key == 65 || key == 37)//left
			pacman.nextDirection = "left";
		
		else if (key == 68 || key == 39)//right
			pacman.nextDirection = "right";
		
		if(pacman.nextDirection !== pacman.direction)
			pacman.turn = true;
		else
			pacman.turn = false;
		
	});
	$('#pause').on("click", function(){
		running = false;
		clearInterval(runner);
		$(this).css('background', "orange");
		$('#start').css('background', "blue");
		
	});
	$('#start').on("click",function(){
		if(running) 
			return;
		runner = setInterval(function(){
			game.step();
		
		},gameSpeed);
		running = true;
		$(this).css('background', "orange");
		$('#pause').css('background', "blue");
	})
	$('#reset').on("click", function(){
		game.reset();
		$('#start, #pause').show();
	});
	$('#world').after('<div class="pacman" direction="right" style="top: '+ pacman.y*20 +'px; left: '+ pacman.x*20 +'px; "></div>');
	//$('#world').after('<div class="ghost blinky" style="top: '+ blinky.y*20 +'px; left: '+ ghosts[0].x*20 +'px; "></div>');
	//$('#world').after('<div class="ghost pinky" style="top: '+ ghosts[1].y*20 +'px; left: '+ ghosts[1].x*20 +'px; "></div>');
	
	var game = new Game(0);
	
	 
	//setInterval game.loop speed
});