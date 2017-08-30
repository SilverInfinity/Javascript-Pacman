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

var BRICK = 2;
var COIN = 1;
var POWER = 3;
var EMPTY = 0;

var world = [];
var levels = [
	{
		world:[
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
		blinky_location:[11,8],
		blinky_direction: "left",
		pacman_location: [11,16],
		pinky_location: [11,10],
		pinky_direction: "up",
		
	},
	{	world: [
		[2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2],
		[2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
		[2,1,2,2,2,2,2,2,2,1,2,2,2,2,2,1,2,2,2,2,2,2,2,1,2],
		[2,1,1,1,1,1,1,1,1,1,2,0,0,0,2,1,1,1,1,1,1,1,1,1,2],
		[2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2],
		[2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2],
		[1,1,1,1,2,2,1,2,2,1,2,2,0,2,2,1,2,2,1,2,2,1,1,1,1],
		[2,2,2,1,2,2,1,2,2,1,2,0,0,0,2,1,2,2,1,2,2,1,2,2,2],
		[0,0,2,1,1,1,1,2,2,1,2,2,2,2,2,1,2,2,1,1,1,1,2,0,0],
		[0,0,2,2,2,2,2,2,2,1,1,1,1,1,1,1,2,2,2,2,2,2,2,0,0],
		[2,2,2,1,1,1,1,2,2,2,1,2,2,2,1,2,2,2,1,1,1,1,2,2,2],
		[2,1,1,1,2,2,1,1,1,2,1,2,0,2,1,2,1,1,1,2,2,1,1,1,2],
		[2,1,2,2,2,2,2,2,1,2,1,2,2,2,1,2,1,2,2,2,2,2,2,1,2],
		[2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
		[2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2]
		],
		blinky_location: [12,5],
		blinky_direction: "left",
		pacman_location: [1,1],
		pinky_location: [12,7],
		pinky_direction: "up",
	},
	{	
		world:[
		[2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,2,1,2,0,0,0,0,0,2,1,2,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2],
		[2,1,1,1,1,1,1,1,1,1,2,0,0,0,0,2,1,2,0,0,0,0,0,2,1,2,0,0,0,0,2,1,1,1,1,1,1,1,1,1,2],
		[2,1,2,2,2,2,2,2,2,1,2,0,2,2,2,2,1,2,2,2,2,2,2,2,1,2,2,2,2,0,2,1,2,2,2,2,2,2,2,1,2],
		[2,1,2,0,0,2,0,0,2,1,2,0,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,0,2,1,2,0,0,2,0,0,2,1,2],
		[2,1,2,0,0,0,0,0,2,1,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2,2,2,1,2,2,2,1,2,0,0,0,0,0,2,1,2],
		[2,1,2,2,0,0,0,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,0,0,0,2,2,1,2],
		[2,1,2,2,2,0,2,2,2,1,2,2,2,2,1,2,2,2,2,2,1,2,2,2,2,2,1,2,2,2,2,1,2,2,2,0,2,2,2,1,2],
		[2,1,2,2,2,2,2,2,2,1,2,0,0,2,1,1,1,1,1,1,0,1,1,1,1,1,1,2,0,0,2,1,2,2,2,2,2,2,2,1,2],
		[2,1,1,1,1,1,1,1,1,1,2,0,0,2,1,2,2,2,2,2,0,2,2,2,2,2,1,2,0,0,2,1,1,1,1,1,1,1,1,1,2],
		[2,2,1,2,2,2,2,2,2,1,2,0,0,2,1,2,2,2,0,0,0,0,0,2,2,2,1,2,0,0,2,1,2,2,2,2,2,2,1,2,2],
		[1,1,1,1,1,1,1,1,1,1,2,0,0,2,1,2,2,2,2,2,2,2,2,2,2,2,1,2,0,0,2,1,1,1,1,1,1,1,1,1,1],
		[2,2,2,2,2,2,2,2,2,1,2,0,0,2,1,1,1,1,1,1,1,1,1,1,1,1,1,2,0,0,2,1,2,2,2,2,2,2,2,2,2],
		[2,1,1,1,1,1,1,1,2,1,2,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,2,1,2,1,1,1,1,1,1,1,2],
		[2,1,2,2,2,2,2,1,2,1,2,0,0,0,2,1,1,1,1,1,0,1,1,1,1,1,2,0,0,0,2,1,2,1,2,2,2,2,2,1,2],
		[2,1,2,0,0,0,2,1,2,1,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,1,2,1,2,0,0,0,2,1,2],
		[2,1,2,0,0,0,2,1,1,1,1,1,1,1,1,1,2,0,0,0,0,0,0,0,2,1,1,1,1,1,1,1,1,1,2,0,0,0,2,1,2],
		[2,1,2,0,0,0,2,1,2,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,2,1,2,0,0,0,2,1,2],
		[2,1,2,2,2,2,2,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,2,2,2,2,2,1,2],
		[2,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,2],
		[2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,2,1,2,0,0,0,0,0,2,1,2,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2]
	],
		pacman_location: [20,13],
		blinky_location: [20,7],
		blinky_direction: "down",
		pinky_location: [20,9],
		pinky_direction: "down"
	}
	];

var score = 0;
var level = 0;
var lives = 3;
var running = false;
var gameTime = 0;

var coinsRemaining = 0;
var pacman = {
	direction: "right",
	turn: false,
	nextDirection: "right",
	x: 1,
	y: 1
}
var ghosts = [
	{	
	name: "blinky",
	direction: "right",
	x: 5,
	y: 5,
	mode: "chase",
	frightened: false,
	frightCount: 0
	},
	{	
	name: "pinky",
	direction: "right",
	x: 5,
	y: 5,
	mode: "chase",
	frightened: false,
	frightCount: 0
	}
]

var speed = 300;
var ghostSpeed = 300;
var pacLoop;
var ghostLoop;
function runnerStart(){
	running = true;
	pacLoop = setInterval(function(){
		if (pacman.turn){
			if(canMove(pacman, pacman.nextDirection)){
				pacman.direction = pacman.nextDirection;
				pacman.turn = false;
			}
		}//if can turn, turn
		if(canMove(pacman, pacman.direction)){	
			var loc = getLocationInDirection(pacman.x,pacman.y,pacman.direction)
			pacman.x = loc[0];
			pacman.y = loc[1];
			
			displayPacman();
			if(world[pacman.y][pacman.x] == COIN){
				world[pacman.y][pacman.x] = EMPTY;
				score++;
				coinsRemaining--;
				removeCoin(pacman.x,pacman.y);
				updateScore();
			}
			if(world[pacman.y][pacman.x] == POWER){
				world[pacman.y][pacman.x] = EMPTY;
				removeCoin(pacman.x,pacman.y);
				console.log("frightened")
				
				
				for (var i = 0; i<ghosts.length; i++){
						$("."+ghosts[i].name).addClass("frightened");
						ghosts[i].frightened = true;
						ghosts[i].frightCount= 40;
				}
				
			}
			
			
			setTimeout(function(){
				if(coinsRemaining == 0){
					alert("you win!");
					if(level+1<levels.length)
						setUpGame(++level);
					else
						setUpGame(level);
				}
			},10);//give slight delay so pacman will move first before anouncing
			setTimeout(function(){
				for (var i = 0; i<ghosts.length; i++){
				if(pacman.x==ghosts[i].x && pacman.y == ghosts[i].y){
					if(ghosts[i].frightened){
						//return ghost to pen, score ++100
						ghosts[i].x = levels[level].pinky_location[0];
						ghosts[i].y = levels[level].pinky_location[1];
						score+= 100;
						ghostSpeed = speed+200;
						ghosts[i].frightened = false;
					}
						
					else
						death();
				}
				}
			},10)
		}
	},speed)
	
	
	setTimeout(function(){
		ghostLoop = setInterval(function(){
		for(var i = 0; i<ghosts.length; i++){
			var directions=[];
			if (ghosts[i].direction != "left" && canMove(ghosts[i], "right"))
				directions.push("right");
			if(ghosts[i].direction != "right" && canMove(ghosts[i], "left"))
				directions.push("left");
			if(ghosts[i].direction != "down" && canMove(ghosts[i],"up"))
				directions.push("up")
			if(ghosts[i].direction != "up" && canMove(ghosts[i],"down"))
				directions.push("down");
			// get all valid directions that is not backwards
			
			if((!ghosts[i].frightened && gameTime%50 == 0)||(ghosts[i].frightened && ghosts[i].frightCount == 0)){//not sure how to determine when to switch yet
				ghostSpeed = speed;
				$("."+ghosts[i].name).removeClass("frightened");
				if(ghosts[i].mode == "chase")
					ghosts[i].mode = "scatter";
				else if(ghosts[i].mode == "scatter")
					ghosts[i].mode = "chase";
				
				console.log(ghosts[i].mode)
				
				ghosts[i].frightened = false;
				if(ghosts[i].direction == "up")
					ghosts[i].direction = "down";
				else if(ghosts[i].direction == "down")
					ghosts[i].direction = "up";
				else if(ghosts[i].direction == "right")
					ghosts[i].direction = "left";
				else if(ghosts[i].direction == "left")
					ghosts[i].direction = "right";
				
			}//change mode every 20 seconds? go backwards the first time
			
			else if(ghosts[i].frightened){
				//pick a random direction from that list
				var dir = directions[Math.floor(Math.random()*directions.length)];
				ghosts[i].direction = dir;
				ghosts[i].frightCount--;
			}
			
			else if(ghosts[i].mode == "chase"){
				if (ghosts[i].name == "blinky")
				{
					
					if(directions.length>1){
						var bestD = 10000000;
						var best;
						for (var j = 0; j<directions.length; j++){
							var loc = getLocationInDirection(ghosts[i].x,ghosts[i].y,directions[j])
							var locD = Math.sqrt(Math.pow(loc[0]-pacman.x,2)+Math.pow(loc[1]-pacman.y,2));
							if(bestD > locD ){
								best = j;
								bestD = locD;
							}
						}
						ghosts[i].direction = directions[best];
					}
					else //if only 1 direction to go
						ghosts[i].direction = directions[0];

				}//end blinky algorithm
				if(ghosts[i].name == "pinky"){
					if(directions.length>1){
						var bestD = 10000000;
						var best;
						var target = getLocationInDirection(pacman.x, pacman.y,pacman.direction, 4)
						for (var j = 0; j<directions.length; j++){
							var loc = getLocationInDirection(ghosts[i].x,ghosts[i].y,directions[j])
							var locD = Math.sqrt(Math.pow(loc[0]-target[0],2)+Math.pow(loc[1]-target[1],2));
							if(bestD > locD ){
								best = j;
								bestD = locD;
							}
						}
						ghosts[i].direction = directions[best];
					}
					else //if only 1 direction to go
						ghosts[i].direction = directions[0];
				}//end pinky chase algorithm
			}
			//else if scatter
			else if(ghosts[i].mode == "scatter"){
				if(ghosts[i].name == "blinky"){
					if(directions.length>1){
						var bestD = 10000000;
						var best;
						for (var j = 0; j<directions.length; j++){
							var loc = getLocationInDirection(ghosts[i].x,ghosts[i].y,directions[j])
							var locD = Math.sqrt(Math.pow(loc[0]-world[0].length,2)+Math.pow(loc[1]-0,2));
							if(bestD > locD ){
								best = j;
								bestD = locD;
							}
						}
						ghosts[i].direction = directions[best];
					}
					else //if only 1 direction to go
						ghosts[i].direction = directions[0];
					
				}
				if(ghosts[i].name == "pinky"){
					if(directions.length>1){
						var bestD = 10000000;
						var best;
						for (var j = 0; j<directions.length; j++){
							var loc = getLocationInDirection(ghosts[i].x,ghosts[i].y,directions[j])
							var locD = Math.sqrt(Math.pow(loc[0]-0,2)+Math.pow(loc[1]-0,2));
							if(bestD > locD ){
								best = j;
								bestD = locD;
							}
						}
						ghosts[i].direction = directions[best];
					}
					else //if only 1 direction to go
						ghosts[i].direction = directions[0];
					
				}
			}
			var loc = getLocationInDirection(ghosts[i].x,ghosts[i].y,ghosts[i].direction);
			ghosts[i].x = loc[0];
			ghosts[i].y = loc[1];
			
		}//end ghost for loop
		setTimeout(function(){
			for (var i = 0; i<ghosts.length; i++){
				if(pacman.x==ghosts[i].x && pacman.y == ghosts[i].y){
				death();
				}
			}
		},10)
		gameTime++
		
		displayGhosts();
		},ghostSpeed)
	},50)
};

function displayWorld(){
	$('#world').html('');
	for (var r = 0; r<world.length; r++){
		$('#world').append("<div class='row'></div>");
		for (var c = 0; c<world[r].length; c++){
			if (world[r][c] == BRICK)
				$('.row:last-child').append('<div class="brick"></div>');
			if (world[r][c] == COIN)
				$('.row:last-child').append('<div class="coin"></div>');
			if (world[r][c] == POWER)
				$('.row:last-child').append('<div class="power"></div>');
			if (world[r][c] == EMPTY)
				$('.row:last-child').append('<div class="empty"></div>');
		}
	}
}

function removeCoin(x,y){
	var i = (x+1)*(y+1)
	$("#world .row:nth-child("+ (y+1) +") div:nth-child("+ (x+1) +")").removeClass();
	$("#world .row:nth-child("+ (y+1) +") div:nth-child("+ (x+1) +")").addClass("empty");
}

function displayPacman(){
	$('.pacman').css("top", pacman.y*20);
	$('.pacman').css("left", pacman.x*20);
}
function displayGhosts(){
	$('.blinky').css('top', ghosts[0].y*20);
	$('.blinky').css('left', ghosts[0].x*20);
	
	$('.pinky').css('top', ghosts[1].y*20);
	$('.pinky').css('left', ghosts[1].x*20);
	
}

function canMove(actor,direction){ //actor> obj, direction>string
	var loc = getLocationInDirection(actor.x, actor.y,direction)
	if(world[loc[1]][loc[0]] == BRICK)
		return false;
	
	return true;
}

function getLocation(x,y){
	
	if (x<0)
		x = world[0].length-1;
	if (y<0)
		y = world.length-1;
	if (x==world[0].length)
		x = 0;
	else if (y==world.length)
		y = 0;
	return[x,y];
}

function getLocationInDirection(x,y,direction,distance){
	if (distance == undefined)
		distance = 1;
	for (var i = 0; i<distance; i++){
		if (direction == "up")
			y = getLocation(x,y-1)[1];
		if(direction == "down")
			y = getLocation(x,y+1)[1];
		if(direction == "left")
			x = getLocation(x-1,y)[0];
		if(direction == "right")
			x = getLocation(x+1,y)[0];
	}	
	return[x,y]
}

function updateScore(){
	$('#score').text("Score: "+score);
}
function updateLives(){
	$('#lives').html('');
	for (var i = 0; i<lives; i++)
	{
		$('#lives').append('<div class="life"></div>');
	}
}
function setUpGame(lv){
	running = false;
	gameTime = 0;
	clearInterval(pacLoop);
	clearInterval(ghostLoop);
	
	level = lv;
	world = [];
	for (var i = 0; i< levels[level].world.length; i++){
		world.push([]);
		for (var j = 0; j<levels[level].world[i].length; j++)
			world[i].push(levels[level].world[i][j]);
	}//clones the level
	pacman.direction = levels[level].pacman_direction;
	pacman.x = levels[level].pacman_location[0];
	pacman.y = levels[level].pacman_location[1];
	$('.blinky').show()
	ghosts[0].direction = levels[level].blinky_direction;
	ghosts[0].x = levels[level].blinky_location[0];
	ghosts[0].y = levels[level].blinky_location[1];
	
	ghosts[1].x = levels[level].pinky_location[0];
	ghosts[1].y = levels[level].pinky_location[1];
	
	$('h3').text("Level: " + level);
	
	$('#pause').css('background', "orange");
	$('#start').css('background', "blue");
	
	displayWorld();
	displayPacman();
	displayGhosts();
	updateScore();
	updateLives();
	coinsRemaining = $('.coin').length;
}

function death(){
	lives--;
	updateLives();
	pacman.direction = levels[level].pacman_direction;
	pacman.x = levels[level].pacman_location[0];
	pacman.y = levels[level].pacman_location[1];
	ghosts[0].direction = levels[level].blinky_direction;
	ghosts[0].x = levels[level].blinky_location[0];
	ghosts[0].y = levels[level].blinky_location[1];
	
	
	
	if(lives == 0){
		alert("Game Over!")
		running = false;
		clearInterval(pacLoop);
		clearInterval(ghostLoop);
		$('#pause').css('background', "blue");
		$('#start').css('background', "blue");
		$('#pause, #start').hide();
	}
	
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
		clearInterval(pacLoop);
		clearInterval(ghostLoop);
		$(this).css('background', "orange");
		$('#start').css('background', "blue");
		
	});
	$('#start').on("click",function(){
		if(!running)
			runnerStart();
		$(this).css('background', "orange");
		$('#pause').css('background', "blue");
	})
	$('#reset').on("click", function(){
		running = false;
		clearInterval(pacLoop);
		clearInterval(ghostLoop);
		lives = 3;
		level = 0;
		score = 0;
		setUpGame(level);
		$('#start, #pause').show();
	});
	
	$('#world').after('<div class="pacman" direction="right" style="top: '+ pacman.y*20 +'px; left: '+ pacman.x*20 +'px; "></div>');
	$('#world').after('<div class="ghost blinky" style="top: '+ ghosts[0].y*20 +'px; left: '+ ghosts[0].x*20 +'px; "></div>');
	$('#world').after('<div class="ghost pinky" style="top: '+ ghosts[1].y*20 +'px; left: '+ ghosts[1].x*20 +'px; "></div>');
	setUpGame(0);

});//end ready
