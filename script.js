// LIst of features:::

// 1)have Javascript build the world
//DONE 1.1)have javascript display the world
// 2)have pacman move up and down

//win condition: eat all coins
	//keep track of coins on field

var PACMAN = 3;
var BRICK = 2;
var COIN = 1;
var EMPTY = 0;

var world;
var levels = {
	level1: [
	[BRICK,BRICK,BRICK,BRICK,BRICK,BRICK,BRICK,BRICK,BRICK,BRICK],
	[BRICK,EMPTY,COIN,COIN,COIN,COIN,COIN,COIN,COIN,BRICK],
	[BRICK,COIN,BRICK,BRICK,BRICK,COIN,BRICK,COIN,COIN,BRICK],
	[BRICK,COIN,BRICK,COIN,BRICK,COIN,BRICK,EMPTY,COIN,BRICK],
	[BRICK,COIN,BRICK,COIN,BRICK,COIN,BRICK,COIN,COIN,BRICK],
	[BRICK,COIN,COIN,COIN,COIN,BRICK,COIN,COIN,COIN,BRICK],
	[BRICK,BRICK,BRICK,BRICK,BRICK,BRICK,BRICK,BRICK,BRICK,BRICK]],
	
	level2:[
	[2,2,2,2,2,1,2,2,2,2,2],
	[2,0,1,1,1,1,1,1,1,1,2],
	[2,1,2,2,2,2,2,2,2,1,2],
	[2,1,2,1,1,2,1,1,2,1,2],
	[1,1,2,1,1,1,1,1,2,1,1],
	[2,1,2,2,1,1,1,2,2,1,2],
	[2,1,2,2,2,1,2,2,2,1,2],
	[2,1,1,1,1,1,1,1,1,1,2],
	[2,2,2,2,2,1,2,2,2,2,2]],
	
	
	
	
	
}
var score = 0;
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
	direction: "down",
	x: 5,
	y: 5
	}
]
var speed = 1000;
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
			setTimeout(function(){if(coinsRemaining == 0)
				{alert("you win!");
				clearInterval(pacLoop);
				$('#pause').css('background', "orange");
				$('#start').css('background', "blue");
				
				}
				},50);//give slight delay so pacman will move first before anouncing
				
		}
	},speed)
	
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
		var dir = directions[Math.floor(Math.random()*directions.length)];
		console.log(directions, dir);
		ghosts[0].direction = dir;
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
	},speed)
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
	
	world = levels.level2;
	displayWorld();
	updateScore();
	$('#world').after('<div class="pacman" direction="right" style="top: '+ pacman.y*20 +'px; left: '+ pacman.x*20 +'px; "></div>');
	$('#world').after('<div class="ghost inky" direction="right" style="top: '+ ghosts[0].y*20 +'px; left: '+ ghosts[0].x*20 +'px; "></div>');
	coinsRemaining = $('.coin').length;

	
	
});//end ready
