/**
*	STUFF TO IMPLEMENT
* ----------------------------
*  Make it so you cant press start twice
*  More Ghosts
*  More Levels
*  Fruit (game apear after so many dots are eaten)
*  
*
*  Random Levels
*  Ghost AI
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
		inky_location: [8,1],
		inky_direction: "left"
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
		inky_location: [5,5],
		inky_direction: "down"
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
		inky_location: [12,7],
		inky_direction: "up",
		pacman_location: [1,1]
	}];

var score = 0;
var level = 0;
var lives = 3;
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
	name: "inky",
	direction: "right",
	x: 5,
	y: 5,
	mode: "chase"
	}
]
var speed = 300;
var pacLoop;
var ghostLoop;
function runnerStart(){
	
	pacLoop = setInterval(function(){
		if (pacman.turn){
			if(canMove(pacman, pacman.nextDirection)){
				pacman.direction = pacman.nextDirection;
				pacman.turn = false;
			}
		}//if can turn, turn
		if(canMove(pacman, pacman.direction)){	
			if(pacman.direction == "right"){
				pacman.x = getLocation(++pacman.x, pacman.y)[0];
			}
			if(pacman.direction == "left"){
				pacman.x = getLocation(--pacman.x, pacman.y)[0];
			}
			if(pacman.direction == "up"){
				pacman.y = getLocation(pacman.x, --pacman.y)[1];
			}
			if(pacman.direction == "down"){
				pacman.y = getLocation(pacman.x, ++pacman.y)[1];
			}
			
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
		directions=[]
		if (canMove(ghosts[0], "right"))
			directions.push("right");
		if(canMove(ghosts[0], "left"))
			directions.push("left");
		if(canMove(ghosts[0],"up"))
			directions.push("up")
		if(canMove(ghosts[0],"down"))
			directions.push("down");
		// pick random valid direction
		
		
		if(directions.length>2 || !((directions[0]=="up"&&directions[1]=="down")||(directions[0]=="right" &&directions[1]=="left"))){
			var dir = directions[Math.floor(Math.random()*directions.length)];
			ghosts[0].direction = dir;
		} //smarter random picking
		
		if(ghosts[0].direction == "right"){
				ghosts[0].x = getLocation(++ghosts[0].x, ghosts[0].y)[0];
			}
		if(ghosts[0].direction == "left"){
				ghosts[0].x = getLocation(--ghosts[0].x, ghosts[0].y)[0];
			}
		if(ghosts[0].direction == "up"){
				ghosts[0].y = getLocation(ghosts[0].x, --ghosts[0].y)[1];
			}
		if(ghosts[0].direction == "down"){
				ghosts[0].y = getLocation(ghosts[0].x, ++ghosts[0].y)[1];
			}
		displayGhosts();
		
		setTimeout(function(){
				if(pacman.x==ghosts[0].x && pacman.y == ghosts[0].y){
					death();
				}
			},10)
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
	$('.inky').css('top', ghosts[0].y*20);
	$('.inky').css('left', ghosts[0].x*20);
	
}

function canMove(actor,direction){ //actor> obj, direction>string
	
	
	if (direction == "right" && world[getLocation(actor.x+1,actor.y)[1]][getLocation(actor.x+1,actor.y)[0]] == BRICK)
		return false;
	else if(direction == "left" && world[getLocation(actor.x-1,actor.y)[1]][getLocation(actor.x-1,actor.y)[0]] == BRICK)
		return false;
	else if (direction == "up" && world[getLocation(actor.x,actor.y-1)[1]][getLocation(actor.x,actor.y-1)[0]] == BRICK)
		return false;
	else if (direction == "down" && world[getLocation(actor.x,actor.y+1)[1]][getLocation(actor.x,actor.y+1)[0]] == BRICK)
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
	ghosts[0].direction = levels[level].inky_direction;
	ghosts[0].x = levels[level].inky_location[0];
	ghosts[0].y = levels[level].inky_location[1];
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
	ghosts[0].direction = levels[level].inky_direction;
	ghosts[0].x = levels[level].inky_location[0];
	ghosts[0].y = levels[level].inky_location[1];
	
	
	
	if(lives == 0){
		alert("Game Over!")
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
		clearInterval(pacLoop);
		clearInterval(ghostLoop);
		$(this).css('background', "orange");
		$('#start').css('background', "blue");
		
	});
	$('#start').on("click",function(){
		runnerStart();
		$(this).css('background', "orange");
		$('#pause').css('background', "blue");
	})
	$('#reset').on("click", function(){
		clearInterval(pacLoop);
		clearInterval(ghostLoop);
		lives = 3;
		level = 0;
		score = 0;
		setUpGame(level);
		$('#start, #pause').show();
	});
	
	$('#world').after('<div class="pacman" direction="right" style="top: '+ pacman.y*20 +'px; left: '+ pacman.x*20 +'px; "></div>');
	$('#world').after('<div class="ghost inky" direction="right" style="top: '+ ghosts[0].y*20 +'px; left: '+ ghosts[0].x*20 +'px; "></div>');
	setUpGame(0);

});//end ready
