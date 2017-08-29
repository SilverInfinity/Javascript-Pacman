/**
*	STUFF TO IMPLEMENT
* ----------------------------
*  More Ghosts
*  More Levels
*  Fruit (game apear after so many dots are eaten)
*  big dot things that let you eat ghosts
*
*  Random Levels
*  Ghost AI
*  Ghost Modes
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
var EMPTY = 0;

var world = [];
var levels = [
	{
		world:[
		[2,2,2,2,2,2,2,2,2,2],
		[1,1,1,1,1,1,1,1,1,1],
		[2,2,2,2,2,2,2,2,2,2]
		],
		pacman_location: [1,1],
		pacman_direction: "right",
		blinky_location: [8,1],
		blinky_direction: "left"
	},
	
	
	
	{	world:[
			[2,2,2,2,2,1,2,2,2,2,2],
			[2,0,1,1,1,1,1,1,1,1,2],
			[2,1,2,2,2,2,2,2,2,1,2],
			[2,1,2,1,1,2,1,1,2,1,2],
			[1,1,2,1,1,1,1,1,2,1,1],
			[2,1,2,2,1,1,1,2,2,1,2],
			[2,1,2,2,2,1,2,2,2,1,2],
			[2,1,1,1,1,1,1,1,1,1,2],
			[2,2,2,2,2,1,2,2,2,2,2]],
		pacman_location: [1,1],
		blinky_location: [5,5],
		blinky_direction: "down"
	},
	{
		world:[
			[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
			[2,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,2],
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
			[2,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,2],
			[2,2,2,1,2,1,2,1,2,2,2,2,2,2,2,1,2,1,2,1,2,2,2],
			[2,1,1,1,1,1,2,1,1,1,1,2,1,1,1,1,2,1,1,1,1,1,2],
			[2,1,2,2,2,2,2,2,2,2,1,2,1,2,2,2,2,2,2,2,2,1,2],
			[2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
			[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
		],
		blinky_location:[11,8],
		blinky_direction: "left",
		pacman_location: [11,16]
		
	},
	{	world: [
		[2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2],
		[2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
		[2,1,2,2,2,2,2,2,2,1,2,2,2,2,2,1,2,2,2,2,2,2,2,1,2],
		[2,1,1,1,1,1,1,1,1,1,2,0,0,0,2,1,1,1,1,1,1,1,1,1,2],
		[2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2],
		[2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2],
		[1,1,1,1,2,2,1,2,2,1,2,2,1,2,2,1,2,2,1,2,2,1,1,1,1],
		[2,2,2,1,2,2,1,2,2,1,2,2,0,2,2,1,2,2,1,2,2,1,2,2,2],
		[0,0,2,1,1,1,1,2,2,1,2,2,2,2,2,1,2,2,1,1,1,1,2,0,0],
		[0,0,2,2,2,2,2,2,2,1,1,1,1,1,1,1,2,2,2,2,2,2,2,0,0],
		[2,2,2,1,1,1,1,2,2,2,1,2,2,2,1,2,2,2,1,1,1,1,2,2,2],
		[2,1,1,1,2,2,1,1,1,2,1,2,0,2,1,2,1,1,1,2,2,1,1,1,2],
		[2,1,2,2,2,2,2,2,1,2,1,2,2,2,1,2,1,2,2,2,2,2,2,1,2],
		[2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
		[2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2]
		],
		blinky_location: [12,7],
		blinky_direction: "up",
		pacman_location: [1,1]
	}];

var score = 0;
var level = 0;
var lives = 3;
var running = false;
gameTime = 0;

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
	corner: "top-right"
	}
]
var speed = 300;
var pacLoop;
var ghostLoop;
function runnerStart(){
	running = true;
	console.log("runner start");
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
				displayWorld();
				updateScore();
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
				if(pacman.x==ghosts[0].x && pacman.y == ghosts[0].y){
					death();
				}
			},10)
		}
	},speed)
	
	
	setTimeout(function(){
		ghostLoop = setInterval(function(){
		for(var i = 0; i<ghosts.length; i++){
			directions=[];
			if (ghosts[i].direction != "left" && canMove(ghosts[i], "right"))
				directions.push("right");
			if(ghosts[i].direction != "right" && canMove(ghosts[i], "left"))
				directions.push("left");
			if(ghosts[i].direction != "down" && canMove(ghosts[i],"up"))
				directions.push("up")
			if(ghosts[i].direction != "up" && canMove(ghosts[i],"down"))
				directions.push("down");
			// get all valid directions that is not backwards
			console.log(directions);
			
			if(ghosts[i].mode != "frightened" && gameTime%50 == 0){//not sure how to determine when to switch yet
				if(ghosts[i].mode == "chase")
					ghosts[i].mode = "scatter";
				else if(ghosts[i].mode == "scatter")
					ghosts[i].mode = "chase";
				
				if(ghosts[i].direction == "up")
					ghosts[i].direction = "down";
				else if(ghosts[i].direction == "down")
					ghosts[i].direction = "up";
				else if(ghosts[i].direction == "right")
					ghosts[i].direction = "left";
				else if(ghosts[i].direction == "left")
					ghosts[i].direction = "right";
				console.log(i,"mode switch",ghosts[i].mode);
				
			}//change mode every 20 seconds? go backwards the first time
			
			else if(ghosts[i].mode == "frightened"){
				//pick a random direction from that list
				console.log(i, "frightened ghost")
				var dir = directions[Math.floor(Math.random()*directions.length)];
				ghosts[i].direction = dir;
				console.log(dir);
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
			}
			//else if scatter
			else if(ghosts[i].mode = "scatter"){
				if(ghosts[i].name = "blinky"){
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
			}
			console.log(ghosts[i].direction);
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
		console.log(gameTime);
		displayGhosts();
		},speed)
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
			
			if (world[r][c] == EMPTY)
				$('.row:last-child').append('<div class="empty"></div>');
		}
	}
}

function displayPacman(){
	$('.pacman').css("top", pacman.y*20);
	$('.pacman').css("left", pacman.x*20);
}
function displayGhosts(){
	$('.blinky').css('top', ghosts[0].y*20);
	$('.blinky').css('left', ghosts[0].x*20);
	
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

function getLocationInDirection(x,y,direction){
	if (direction == "up")
		y = getLocation(x,y-1)[1];
	if(direction == "down")
		y = getLocation(x,y+1)[1];
	if(direction == "left")
		x = getLocation(x-1,y)[0];
	if(direction == "right")
		x = getLocation(x+1,y)[0];
	
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
	ghosts[0].direction = levels[level].blinky_direction;
	ghosts[0].x = levels[level].blinky_location[0];
	ghosts[0].y = levels[level].blinky_location[1];
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
	$('#world').after('<div class="ghost blinky" direction="right" style="top: '+ ghosts[0].y*20 +'px; left: '+ ghosts[0].x*20 +'px; "></div>');
	setUpGame(0);

});//end ready
