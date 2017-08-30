/**
*	STUFF TO IMPLEMENT
* ----------------------------
*  More Levels
*  Fruit (game apear after 70/170 many dots are eaten)
*  Ghost entry conditions
*  flip pacman in the direction he is going
*
*  Random Levels?
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
			[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
			[2,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,2],
			[2,1,2,2,2,1,2,2,2,2,1,2,1,2,2,2,2,1,2,2,2,1,2],
			[2,3,2,2,2,1,2,2,2,2,1,2,1,2,2,2,2,1,2,2,2,3,2],
			[2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
			[2,1,2,2,2,1,2,1,2,2,2,2,2,2,2,1,2,1,2,2,2,1,2],
			[2,1,1,1,1,1,2,1,1,1,1,2,1,1,1,1,2,1,1,1,1,1,2],
			[2,2,2,2,2,1,2,2,2,2,1,2,1,2,2,2,2,1,2,2,2,2,2],
			[0,0,0,0,2,1,2,1,1,1,1,0,1,1,1,1,2,1,2,0,0,0,0],
			[2,2,2,2,2,1,2,1,2,2,2,0,2,2,2,1,2,1,2,2,2,2,2],
			[0,0,0,0,0,1,1,1,2,0,0,0,0,0,2,1,1,1,0,0,0,0,0],
			[2,2,2,2,2,1,2,1,2,2,2,2,2,2,2,1,2,1,2,2,2,2,2],
			[0,0,0,0,2,1,2,1,1,1,1,1,1,1,1,1,2,1,2,0,0,0,0],
			[2,2,2,2,2,1,2,1,2,2,2,2,2,2,2,1,2,1,2,2,2,2,2],
			[2,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,2],
			[2,1,2,2,2,1,2,2,2,2,1,2,1,2,2,2,2,1,2,2,2,1,2],
			[2,3,1,1,2,1,1,1,1,1,1,0,1,1,1,1,1,1,2,1,1,3,2],
			[2,2,2,1,2,1,2,1,2,2,2,2,2,2,2,1,2,1,2,1,2,2,2],
			[2,1,1,1,1,1,2,1,1,1,1,2,1,1,1,1,2,1,1,1,1,1,2],
			[2,1,2,2,2,2,2,2,2,2,1,2,1,2,2,2,2,2,2,2,2,1,2],
			[2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
			[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
		],
		pacman_home: {
			x:11,
			y:16
		},
		//ghost homes in order: blinky, pinky, inky, clyde
		ghosts: [{x: 11, y:8},{x:11,y:10},{x:12,y:10},{x:10,y:10}],
		phases: [7,27,34,54,59,79,84]
		
	},
	{
		grid: [
		[2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,2,0,2,0,0,0,0,0,2,0,2,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2],
		[2,1,1,1,1,1,1,1,1,3,2,0,0,0,0,2,0,2,0,0,0,0,0,2,0,2,0,0,0,0,2,3,1,1,1,1,1,1,1,1,2],
		[2,1,2,2,2,2,2,2,2,1,2,0,2,2,2,2,0,2,2,2,2,2,2,2,0,2,2,2,2,0,2,1,2,2,2,2,2,2,2,1,2],
		[2,1,2,0,0,2,0,0,2,1,2,0,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,0,2,1,2,0,0,2,0,0,2,1,2],
		[2,1,2,0,0,0,0,0,2,1,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2,2,2,1,2,2,2,1,2,0,0,0,0,0,2,1,2],
		[2,1,2,2,0,0,0,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,0,0,0,2,2,1,2],
		[2,1,2,2,2,0,2,2,2,1,2,2,2,2,1,2,2,2,2,2,1,2,2,2,2,2,1,2,2,2,2,1,2,2,2,0,2,2,2,1,2],
		[2,1,2,2,2,2,2,2,2,1,2,2,2,2,1,1,1,1,1,1,0,1,1,1,1,1,1,2,2,2,2,1,2,2,2,2,2,2,2,1,2],
		[2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,0,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
		[2,2,2,2,1,2,2,2,2,1,2,2,2,2,1,2,2,2,0,0,0,0,0,2,2,2,1,2,2,2,2,1,2,2,2,2,1,2,2,2,2],
		[0,0,0,0,1,1,1,1,1,1,2,0,0,2,1,2,2,2,2,2,2,2,2,2,2,2,1,2,0,0,2,1,1,1,1,1,1,0,0,0,0],
		[2,2,2,2,1,2,2,2,2,1,2,0,0,2,1,1,1,1,1,1,1,1,1,1,1,1,1,2,0,0,2,1,2,2,2,2,1,2,2,2,2],
		[2,1,1,1,1,1,1,3,2,1,2,0,0,2,2,1,2,2,2,2,2,2,2,2,2,1,2,2,0,0,2,1,2,3,1,1,1,1,1,1,2],
		[2,1,2,2,1,2,2,1,2,1,2,0,0,0,2,1,1,1,1,1,0,1,1,1,1,1,2,0,0,0,2,1,2,1,2,2,1,2,2,1,2],
		[2,1,2,2,1,2,2,1,2,1,2,2,2,2,2,2,1,2,2,2,2,2,2,2,1,2,2,2,2,2,2,1,2,1,2,2,1,2,2,1,2],
		[2,1,2,2,1,2,2,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,1,2],
		[2,1,2,2,1,2,2,1,2,1,2,2,2,2,2,2,1,2,2,2,2,2,2,2,1,2,2,2,2,2,2,1,2,1,2,2,1,2,2,1,2],
		[2,1,2,2,1,2,2,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,2,2,1,2,2,1,2],
		[2,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,0,2,2,2,2,2,2,2,0,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,2],
		[2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,2,0,2,0,0,0,0,0,2,0,2,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2]
		],
		pacman_home:{
			x:20,
			y:13
		},
		ghosts:[{x:20,y:7},{x:20,y:9},{x:19,y:9},{x:21,y:9}],
		phases: [7,27,34,54,59,79,84]
	},
	{
	grid:[
			[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
			[2,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,2],
			[2,1,2,2,2,1,2,2,2,2,1,2,1,2,2,2,2,1,2,2,2,1,2],
			[2,3,2,2,2,1,2,2,2,2,1,2,1,2,2,2,2,1,2,2,2,3,2],
			[2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
			[2,1,2,2,2,1,2,1,2,2,2,2,2,2,2,1,2,1,2,2,2,1,2],
			[2,1,1,1,1,1,2,1,1,1,1,2,1,1,1,1,2,1,1,1,1,1,2],
			[2,2,2,2,2,1,2,2,2,2,1,2,1,2,2,2,2,1,2,2,2,2,2],
			[0,0,0,0,2,1,2,1,1,1,1,0,1,1,1,1,2,1,2,0,0,0,0],
			[2,2,2,2,2,1,2,1,2,2,2,0,2,2,2,1,2,1,2,2,2,2,2],
			[0,0,0,0,0,1,1,1,2,0,0,0,0,0,2,1,1,1,0,0,0,0,0],
			[2,2,2,2,2,1,2,1,2,2,2,2,2,2,2,1,2,1,2,2,2,2,2],
			[0,0,0,0,2,1,2,1,1,1,1,1,1,1,1,1,2,1,2,0,0,0,0],
			[2,2,2,2,2,1,2,1,2,2,2,2,2,2,2,1,2,1,2,2,2,2,2],
			[2,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,2],
			[2,1,2,2,2,1,2,2,2,2,1,2,1,2,2,2,2,1,2,2,2,1,2],
			[2,3,1,1,2,1,1,1,1,1,1,0,1,1,1,1,1,1,2,1,1,3,2],
			[2,2,2,1,2,1,2,1,2,2,2,2,2,2,2,1,2,1,2,1,2,2,2],
			[2,1,1,1,1,1,2,1,1,1,1,2,1,1,1,1,2,1,1,1,1,1,2],
			[2,1,2,2,2,2,2,2,2,2,1,2,1,2,2,2,2,2,2,2,2,1,2],
			[2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
			[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
		],
		pacman_home: {
			x:11,
			y:16
		},
		//ghost homes in order: blinky, pinky, inky, clyde
		ghosts: [{x: 11, y:8},{x:11,y:10},{x:12,y:10},{x:10,y:10}],
		phases: [7,27,34,54,59,1092,1093]
		
	},
	{
		grid: [
		[2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,2,0,2,0,0,0,0,0,2,0,2,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2],
		[2,1,1,1,1,1,1,1,1,3,2,0,0,0,0,2,0,2,0,0,0,0,0,2,0,2,0,0,0,0,2,3,1,1,1,1,1,1,1,1,2],
		[2,1,2,2,2,2,2,2,2,1,2,0,2,2,2,2,0,2,2,2,2,2,2,2,0,2,2,2,2,0,2,1,2,2,2,2,2,2,2,1,2],
		[2,1,2,0,0,2,0,0,2,1,2,0,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,0,2,1,2,0,0,2,0,0,2,1,2],
		[2,1,2,0,0,0,0,0,2,1,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2,2,2,1,2,2,2,1,2,0,0,0,0,0,2,1,2],
		[2,1,2,2,0,0,0,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,0,0,0,2,2,1,2],
		[2,1,2,2,2,0,2,2,2,1,2,2,2,2,1,2,2,2,2,2,1,2,2,2,2,2,1,2,2,2,2,1,2,2,2,0,2,2,2,1,2],
		[2,1,2,2,2,2,2,2,2,1,2,2,2,2,1,1,1,1,1,1,0,1,1,1,1,1,1,2,2,2,2,1,2,2,2,2,2,2,2,1,2],
		[2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,0,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
		[2,2,2,2,1,2,2,2,2,1,2,2,2,2,1,2,2,2,0,0,0,0,0,2,2,2,1,2,2,2,2,1,2,2,2,2,1,2,2,2,2],
		[0,0,0,0,1,1,1,1,1,1,2,0,0,2,1,2,2,2,2,2,2,2,2,2,2,2,1,2,0,0,2,1,1,1,1,1,1,0,0,0,0],
		[2,2,2,2,1,2,2,2,2,1,2,0,0,2,1,1,1,1,1,1,1,1,1,1,1,1,1,2,0,0,2,1,2,2,2,2,1,2,2,2,2],
		[2,1,1,1,1,1,1,3,2,1,2,0,0,2,2,1,2,2,2,2,2,2,2,2,2,1,2,2,0,0,2,1,2,3,1,1,1,1,1,1,2],
		[2,1,2,2,1,2,2,1,2,1,2,0,0,0,2,1,1,1,1,1,0,1,1,1,1,1,2,0,0,0,2,1,2,1,2,2,1,2,2,1,2],
		[2,1,2,2,1,2,2,1,2,1,2,2,2,2,2,2,1,2,2,2,2,2,2,2,1,2,2,2,2,2,2,1,2,1,2,2,1,2,2,1,2],
		[2,1,2,2,1,2,2,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,1,2],
		[2,1,2,2,1,2,2,1,2,1,2,2,2,2,2,2,1,2,2,2,2,2,2,2,1,2,2,2,2,2,2,1,2,1,2,2,1,2,2,1,2],
		[2,1,2,2,1,2,2,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,2,2,1,2,2,1,2],
		[2,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,0,2,2,2,2,2,2,2,0,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,2],
		[2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,2,0,2,0,0,0,0,0,2,0,2,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2]
		],
		pacman_home:{
			x:20,
			y:13
		},
		ghosts:[{x:20,y:7},{x:20,y:9},{x:19,y:9},{x:21,y:9}],
		phases: [7,27,34,54,59,1092,1093]
		
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
var gameSpeed = 200;

/**
*  Object representing Blinky
**/
var blinky = {
	name: "blinky",
	direction: "left",
	x: 0,
	y: 0,
	home: {
		x:0,
		y:0
	},
	frightened: false,
	frightCountDown: 0,
	chase: function(directions, grid){
		if(directions.length>1){
			var bestD = 10000000;
			var best;
			for (var j = 0; j<directions.length; j++){
				var loc = grid.getLocationInDirection(this.x,this.y,directions[j])
				var locD = Math.sqrt(Math.pow(loc[0]-pacman.x,2)+Math.pow(loc[1]-pacman.y,2));
				if(bestD > locD ){
					best = j;
					bestD = locD;
				}
			}
			this.direction = directions[best];
		}
		else //if only 1 direction to go
			this.direction = directions[0];
		var loc = grid.getLocationInDirection(this.x,this.y,this.direction)
		this.x = loc[0];
		this.y = loc[1];
		
	},
	scatter: function(directions, grid){
		if(directions.length>1){
			var bestD = 10000000;
			var best;
			for (var j = 0; j<directions.length; j++){
				var loc = grid.getLocationInDirection(this.x,this.y,directions[j])
				var locD = Math.sqrt(Math.pow(loc[0]-grid.getWidth(),2)+Math.pow(loc[1]-0,2));
				if(bestD > locD ){
					best = j;
					bestD = locD;
				}
			}
			this.direction = directions[best];
		}
		else //if only 1 direction to go
			this.direction = directions[0];
		var loc = grid.getLocationInDirection(this.x,this.y,this.direction)
		this.x = loc[0];
		this.y = loc[1];
	},
	goHome: function(){
		this.x = this.home.x;
		this.y = this.home.y;
	},
	update: function(){
		//$('.blinky').animate({top: this.y*20, left: this.x*20},gameSpeed-20)
		$('.blinky').css("top", this.y*20);
		$('.blinky').css("left", this.x*20);
	}
}

/**
* Object representing Pinky
**/
var pinky = {
	name: "pinky",
	direction: "left",
	x: 0,
	y: 0,
	home: {
		x:0,
		y:0
	},
	frightened: false,
	frightCountDown: 0,
	chase: function(directions, grid){
		if(directions.length>1){
			var bestD = 10000000;
			var best;
			var target = grid.getLocationInDirection(pacman.x, pacman.y,pacman.direction, 4)
			for (var j = 0; j<directions.length; j++){
				var loc = grid.getLocationInDirection(this.x,this.y,directions[j])
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
		var loc = grid.getLocationInDirection(this.x,this.y,this.direction)
		this.x = loc[0];
		this.y = loc[1];
	},
	scatter: function(directions, grid){
		if(directions.length > 1){
			var bestD = 10000000;
			var best;
			for (var j = 0; j<directions.length; j++){
				var loc = grid.getLocationInDirection(this.x,this.y,directions[j])
				var locD = Math.sqrt(Math.pow(loc[0]-0,2)+Math.pow(loc[1]-0,2));
				if(bestD > locD ){
					best = j;
					bestD = locD;
				}
			}
			this.direction = directions[best];
		}
		else //if only 1 direction to go
			this.direction = directions[0];
		var loc = grid.getLocationInDirection(this.x,this.y,this.direction)
		this.x = loc[0];
		this.y = loc[1];
	},
	goHome: function(){
		this.x = this.home.x;
		this.y = this.home.y;
	},
	update: function(){
		//$('.pinky').animate({top: this.y*20, left: this.x*20},gameSpeed-20)
		$('.pinky').css("top", this.y*20);
		$('.pinky').css("left", this.x*20);
	}
}

/**
* Object representing Inky
**/
var inky = {
	name: "inky",
	direction: "left",
	x: 0,
	y: 0,
	home: {
		x:0,
		y:0
	},
	frightened: false,
	frightCountDown: 0,
	chase: function(directions, grid){
		if(directions.length>1){
			var bestD = 10000000;
			var best;
			var target = grid.getLocationInDirection(pacman.x, pacman.y,pacman.direction, 2);
			var targetY = Math.abs(blinky.y - (blinky.x-target[0]*2));
			var targetX = Math.abs(blinky.x - (blinky.y-target[1]*2));
			
			for (var j = 0; j<directions.length; j++){
				var loc = grid.getLocationInDirection(this.x,this.y,directions[j])
				var locD = Math.sqrt(Math.pow(loc[0]-targetX,2)+Math.pow(loc[1]-targetY,2));
				if(bestD > locD ){
					best = j;
					bestD = locD;
				}
			}
			this.direction = directions[best];
		}
		else //if only 1 direction to go
			this.direction = directions[0];
		var loc = grid.getLocationInDirection(this.x,this.y,this.direction)
		this.x = loc[0];
		this.y = loc[1];
	},
	scatter: function(directions, grid){
		if(directions.length > 1){
			var bestD = 10000000;
			var best;
			for (var j = 0; j<directions.length; j++){
				var loc = grid.getLocationInDirection(this.x,this.y,directions[j])
				var locD = Math.sqrt(Math.pow(loc[0]-grid.getWidth(),2)+Math.pow(loc[1]-grid.getHeight(),2));
				if(bestD > locD ){
					best = j;
					bestD = locD;
				}
			}
			this.direction = directions[best];
		}
		else //if only 1 direction to go
			this.direction = directions[0];
		var loc = grid.getLocationInDirection(this.x,this.y,this.direction)
		this.x = loc[0];
		this.y = loc[1];
	},
	goHome: function(){
		this.x = this.home.x;
		this.y = this.home.y;
	},
	update: function(){
		//$('.inky').animate({top: this.y*20, left: this.x*20},gameSpeed-20)
		$('.inky').css("top", this.y*20);
		$('.inky').css("left", this.x*20);
	}
	
}

/**
* Object representing Clyde
**/
var clyde = {
	name: "clyde",
	direction: "left",
	x: 0,
	y: 0,
	home: {
		x:0,
		y:0
	},
	frightened: false,
	frightCountDown: 0,
	chase: function(directions, grid){
		if(directions.length>1){
			if(Math.sqrt(Math.pow(this.x-pacman.x,2)+Math.pow(this.y-pacman.y,2)) > 8){
				
				var bestD = 10000000;
				var best;
				for (var j = 0; j<directions.length; j++){
					var loc = grid.getLocationInDirection(this.x,this.y,directions[j])
					var locD = Math.sqrt(Math.pow(loc[0]-pacman.x,2)+Math.pow(loc[1]-pacman.y,2));
					if(bestD > locD ){
						best = j;
						bestD = locD;
					}
				}
				this.direction = directions[best];
			}
			else{
				var bestD = 10000000;
				var best;
				for (var j = 0; j<directions.length; j++){
					var loc = grid.getLocationInDirection(this.x,this.y,directions[j])
					var locD = Math.sqrt(Math.pow(loc[0],2)+Math.pow(loc[1]-grid.getHeight(),2));
					if(bestD > locD ){
						best = j;
						bestD = locD;
					}
				}
				this.direction = directions[best];
			}
		}
		else //if only 1 direction to go
			this.direction = directions[0];
		var loc = grid.getLocationInDirection(this.x,this.y,this.direction)
		this.x = loc[0];
		this.y = loc[1];
	},
	scatter: function(directions, grid){
		if(directions.length > 1){
			var bestD = 10000000;
			var best;
			for (var j = 0; j<directions.length; j++){
				var loc = grid.getLocationInDirection(this.x,this.y,directions[j])
				var locD = Math.sqrt(Math.pow(loc[0],2)+Math.pow(loc[1]-grid.getHeight(),2));
				if(bestD > locD ){
					best = j;
					bestD = locD;
				}
			}
			this.direction = directions[best];
		}
		else //if only 1 direction to go
			this.direction = directions[0];
		var loc = grid.getLocationInDirection(this.x,this.y,this.direction)
		this.x = loc[0];
		this.y = loc[1];
	},
	goHome: function(){
		this.x = this.home.x;
		this.y = this.home.y;
	},
	update: function(){
		//$('.clyde').animate({top: this.y*20, left: this.x*20},gameSpeed-20)
		$('.clyde').css("top", this.y*20);
		$('.clyde').css("left", this.x*20);
	}
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
	lives: 3,
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
		//$('.pacman').animate({top: this.y*20, left: this.x*20},gameSpeed-20)
		$('.pacman').css("top", this.y*20);
		$('.pacman').css("left", this.x*20);
	},
	death: function(){
		this.goHome();
		this.lives -=1;
		$('#lives').html('');
		for (var i = 0; i<this.lives; i++)
		{
			$('#lives').append('<div class="life"></div>');
		}
		inky.goHome();
		pinky.goHome();
		clyde.goHome();
		blinky.goHome();
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
	*  @returns the number of rows in the grid
	**/
	this.getHeight = function(){
		return this.array.length;
	}
	
	/**
	*  @returns the width of the grid
	**/
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
	*  @return a valid location on the grid. most importanatly, it wraps if out of bounds
	**/
	this.getLocation = function(x,y){
		
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
	* @returns a valid location on the grid a given distance and direction from x and y
	**/
	this.getLocationInDirection = function(x,y,direction,distance){
		if (distance == undefined)
			distance = 1;
		for (var i = 0; i<distance; i++){
			if (direction == "up")
				y = this.getLocation(x,y-1)[1];
			if(direction == "down")
				y = this.getLocation(x,y+1)[1];
			if(direction == "left")
				x = this.getLocation(x-1,y)[0];
			if(direction == "right")
				x = this.getLocation(x+1,y)[0];
		}
		return[x,y];
	}
	
	/**
	* @returns a boolean. true if the given location is not a wall
	**/
	this.canMove = function(x,y,direction){
		var loc = this.getLocationInDirection(x,y,direction);
		return (this.array[loc[1]][loc[0]] != BRICK)
	}
	
	/**
	*  @returns an array of all directions a ghost could go
	**/
	this.getNextDirections = function(x,y,dir){
		var directions = [];
		if(dir != "left" && this.canMove(x,y,"right"))
			directions.push("right");
		if(dir != "right" && this.canMove(x,y,"left"))
			directions.push("left");
		if(dir != "up" && this.canMove(x,y,"down"))
			directions.push("down");
		if(dir != "down" && this.canMove(x,y,"up"))
			directions.push("up");
		return directions;
	}
	
}

/**
*  represents an instance of a game;
**/
function Game(lv){
	
	/**
	* an object containing an instance of Grid
	**/
	this.grid;
	
	/**
	* an array that contains all the ghosts
	* expected order: blinky, pinky, inky, clyde
	**/
	this.ghosts = [blinky, pinky, inky, clyde];
	
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
	this.mode = "scatter";
	
	/**
	*  boolean. true if the game should change modes next turn.
	**/
	this.changeMode = false;
	
	/**
	*  number. what numbered phase the game is in
	**/
	this.phase = 0;
	
	/**
	* resets the game to default
	**/
	this.reset = function(){
		clearInterval(runner);
		running = false;
		this.score = 0;
		$('#score').text("Score: "+this.score);
		this.newLevel(0);
		pacman.lives = 3;
		$('#lives').html('');
		for (var i = 0; i<lives; i++)
		{
			$('#lives').append('<div class="life"></div>');
		}
		this.level = 0;
		this.newLevel(this.level);
		$('#start, #pause').show();
	}
	
	/**
	* sets up the grid for a new level
	**/
	this.newLevel = function(level){
		clearInterval(runner);
		running = false;
		$('#pause').css('background', "orange");
		$('#start').css('background', "blue");
		$('h3').text("Level: " + (level+1));
		this.grid = new Grid(leveldata[level].grid);
		this.gameTime = 0;
		this.coinsCollected = 0;
		for (var i = 0; i<this.ghosts[0]; i++){
			this.ghosts[i].frightened = false;
			this.ghosts[i].frightCountDown = 0;
		}
		$(".ghost").removeClass("frightened");
		
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
		for(var i = 0; i<this.ghosts.length;i++){
			this.ghosts[i].home.x = leveldata[level].ghosts[i].x;
			this.ghosts[i].home.y = leveldata[level].ghosts[i].y;
			this.ghosts[i].goHome();
			this.ghosts[i].update();
		}
		$('#lives').html('');
		for (var i = 0; i<pacman.lives; i++)
		{
			$('#lives').append('<div class="life"></div>');
		}
	}
	
	/**
	* One game tick
	**/
	this.step = function() {

		//move pacman
		if (pacman.turn){
			
			if(this.grid.canMove(pacman.x,pacman.y,pacman.nextDirection)){
				pacman.direction = pacman.nextDirection;
				pacman.turn = false;
				if(pacman.direction == "right"){
					$('.pacman').css({
					"-ms-transform": "rotate(0deg)",
						"-webkit-transform": "rotate(0deg)",
						"transform": "rotate(0deg)"
						
					})
				}
				if(pacman.direction == "left"){
					$('.pacman').css({
						"-ms-transform": "rotate(180deg)",
						"-webkit-transform": "rotate(180deg)",
						"transform": "rotate(180deg)"
						
					})
				}
				if(pacman.direction == "up"){
					$('.pacman').css({
						"-ms-transform": "rotate(270deg)",
						"-webkit-transform": "rotate(270deg)",
						"transform": "rotate(270deg)"
						
					})
				}
				if(pacman.direction == "down"){
					$('.pacman').css({
						"-ms-transform": "rotate(90deg)",
						"-webkit-transform": "rotate(90deg)",
						"transform": "rotate(90deg)"
					})
				}
				
				
				
			}
		}
		
		if(this.grid.canMove(pacman.x,pacman.y,pacman.direction)){
			var loc = this.grid.getLocationInDirection(pacman.x,pacman.y,pacman.direction)
			pacman.x = loc[0];
			pacman.y = loc[1];
			pacman.update();
		}
		
		//check if in the same position as a ghost & consequenses
		for (var i = 0; i< this.ghosts.length; i++){
			if(pacman.x == this.ghosts[i].x && pacman.y == this.ghosts[i].y){
				if(this.ghosts[i].frightened){
					$('.'+this.ghosts[i].name).removeClass("frightened")
					this.score+=100;
					$('#score').text("Score: "+this.score);
					this.ghosts[i].goHome();
					this.ghosts[i].frightened = false;
					this.ghosts[i].frightCountDown = 0;
				}
				else{
					pacman.death();
					pacman.update();
					this.ghosts[i].goHome();
					if (pacman.lives == 0){
						alert("Game Over!")
						running = false;
						clearInterval(runner);
						$('#pause').css('background', "blue");
						$('#start').css('background', "blue");
						$('#pause, #start').hide();
						return;
					}
				}
			}
		}
		
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
		
		//collect powerups
		if(this.grid.getContents(pacman.x,pacman.y) == POWER){
			this.grid.setContents(pacman.x,pacman.y, EMPTY);
			this.score++;
			$('#score').text("Score: "+this.score);
			$("#world .row:nth-child("+ (pacman.y+1) +") div:nth-child("+ (pacman.x+1) +")").removeClass();
			$("#world .row:nth-child("+ (pacman.y+1) +") div:nth-child("+ (pacman.x+1) +")").addClass("empty");
			$(".ghost").addClass("frightened");
			for (var i = 0; i<this.ghosts.length; i++){
				this.ghosts[i].frightened = true;
				this.ghosts[i].frightCountDown = 40;
			}
			
		}
		
		//move ghosts
		for(var i = 0; i<this.ghosts.length;i++){
			if(this.ghosts[i].frightened && this.ghosts[i].frightCountDown != 0){ //if frightened, pick random direction
				var dir = this.grid.getNextDirections(this.ghosts[i].x,this.ghosts[i].y,this.ghosts[i].direction)
				this.ghosts[i].direction = dir[Math.floor(Math.random()*dir.length)];
				this.ghosts[i].frightCountDown--
				if(this.gameTime%2 ==0){
				var loc = this.grid.getLocationInDirection(this.ghosts[i].x,this.ghosts[i].y,this.ghosts[i].direction)
				this.ghosts[i].x = loc[0];
				this.ghosts[i].y = loc[1];
				}
			
			}
		
			else if(this.changeMode || (this.ghosts[i].frightened && this.ghosts[i].frightCountDown == 0)){
				$("."+this.ghosts[i].name).removeClass("frightened");
				this.ghosts[i].frightened = false;
				if(this.ghosts[i].direction == "up")
					this.ghosts[i].direction = "down";
				else if(this.ghosts[i].direction == "down")
					this.ghosts[i].direction = "up";
				else if(this.ghosts[i].direction == "right")
					this.ghosts[i].direction = "left";
				else if(this.ghosts[i].direction == "left")
					this.ghosts[i].direction = "right";
				this.changeMode = false;
				
				var loc = this.grid.getLocationInDirection(this.ghosts[i].x,this.ghosts[i].y,this.ghosts[i].direction)
				this.ghosts[i].x = loc[0];
				this.ghosts[i].y = loc[1];
			}
			else if(this.mode == "chase"){
				this.ghosts[i].chase(this.grid.getNextDirections(this.ghosts[i].x,this.ghosts[i].y,this.ghosts[i].direction),this.grid);
			}
			else if(this.mode == "scatter"){
				this.ghosts[i].scatter(this.grid.getNextDirections(this.ghosts[i].x,this.ghosts[i].y,this.ghosts[i].direction),this.grid);
			}
			this.ghosts[i].update()
		}
		
		//check if a ghost is in same position as pacman
		for (var i = 0; i< this.ghosts.length; i++){
			if(pacman.x == this.ghosts[i].x && pacman.y == this.ghosts[i].y){
				if(this.ghosts[i].frightened){
					$('.'+this.ghosts[i].name).removeClass("frightened")
					this.score+=100;
					$('#score').text("Score: "+this.score);
					this.ghosts[i].goHome();
					this.ghosts[i].frightened = false;
					this.ghosts[i].frightCountDown = 0;
				}
				else{
					pacman.death();
					pacman.update();
					this.ghosts[i].goHome();
					if (pacman.lives == 0){
						alert("Game Over!")
						running = false;
						clearInterval(runner);
						$('#pause').css('background', "blue");
						$('#start').css('background', "blue");
						$('#pause, #start').hide();
						return;
					}
				}
			}
		}
		//check if its time to change mode
		if(this.phase < leveldata[this.level].phases.length && Math.floor(this.gameTime*(gameSpeed/1000)) == leveldata[this.level].phases[this.phase]){
			this.changeMode = true;
			this.phase++;
			if(this.mode == "scatter")
				this.mode = "chase";
			else
				this.mode = "scatter";
		}
		
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
	$('#world').after('<div class="ghost blinky" style="top: '+ blinky.y*20 +'px; left: '+ blinky.x*20 +'px; "></div>');
	$('#world').after('<div class="ghost pinky" style="top: '+ pinky.y*20 +'px; left: '+ pinky.x*20 +'px; "></div>');
	$('#world').after('<div class="ghost inky" style="top: '+ inky.y*20 +'px; left: '+ inky.x*20 +'px; "></div>');
	$('#world').after('<div class="ghost clyde" style="top: '+ clyde.y*20 +'px; left: '+ clyde.x*20 +'px; "></div>');
	
	
	var game = new Game(0);
	
	 
	//setInterval game.loop speed
});