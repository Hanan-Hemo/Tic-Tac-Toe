

var turn = 'X';
var game_type = 3;
var total_turns = 0;
var robot = true;
var finished = false;
var TimeToChangeTurn = 10000 +1000;

var selections = new Array(); 
	selections['X'] = new Array();
	selections['O'] = new Array();

var scores = new Array(); 
	scores['X'] = 0;
	scores['O'] = 0;

	function Hover()
	{

		var divElem = document.querySelector("div.game-board");
		var inputElements = divElem.querySelectorAll("input");
	
		//console.log(inputElements);

		for (var row = 1; row <= game_type; row++){
			for (var col = 1; col <= game_type; col++) {
				var input=document.getElementById(row+''+col);
				
				input.addEventListener("mouseover",DisplayText(this));
				input.addEventListener("mouseout",RemoveText(this));
			//	console.log(input);
				
			}
		}
	}
	
	
function DisplayText(input)
{

	console.log(input);
	if(turn == 'X' && input.value== ' ')
	{
		input.value = 'X';
		input.style.color = "white";
		console.log(input);
	}
	else if(turn == 'O' && input.value == ' ')
	{
		input.value = 'O';
		input.style.color = "white";
	}

}
function RemoveText(input)
{
	input.value=' ';
}
// Resetting parameters on reseting game
function resetParams() {
	turn = 'X';
	game_type = 3;
	total_turns = 0;
	robot = true;
	finished = false;

	selections['X'] = new Array();
	selections['O'] = new Array();
}


// Change turn after another
function changeTurn(){
	if (turn == 'X') {

		turn = 'O';
		if(robot==true)
		autoTurn();
	
	}
	
	else{
		turn = 'X';
		
	} 
	TimeToChangeTurn = 10000 +1000;
}


// Winner patterns, match selected patterns on every turn for every player
function winnerPatterns() {
	var wins = Array();

	// 3 x 3 winning patterns;
	if (game_type==3) wins = [ 
								[11,12,13], [21,22,23], [31,32,33],
						 		[11,21,31], [12,22,32], [13,23,33], 
						 		[11,22,33], [13,22,31]
						 	];


	// 4 x 4 winning patterns;
	if (game_type==4) wins = [ 
								[11,12,13,14], [21,22,23,24], [31,32,33,34], [41,42,43,44],
						 		[11,21,31,41], [12,22,32,42], [13,23,33,43], [14,24,34,44],
						 		[14,23,32,41], [11,22,33,44]
						 	];


	// 5 x 5 winning patterns;
	if (game_type==5) wins = [ 
								[11,12,13,14],[12,13,14,15], [21,22,23,24], [22,23,24,25],[31,32,33,34],[32,33,34,35], [41,42,43,44],[42,43,44,45], [51,52,53,54],[52,53,54,55],
						 		[11,21,31,41],[21,31,41,51], [12,22,32,42],[22,32,42,52], [13,23,33,43],[23,33,43,53], [14,24,34,44],[24,34,44,54], [15,25,35,45],[25,35,45,55],
						 		[11,22,33,44],[22,33,44,55],[12,23,34,45], [15,24,33,42],[14,23,32,41],[24,33,42,51],[21,32,43,54],[25,34,43,52]
						 	];
	 // 6 x 6 winning patterns;
	if (game_type==6) wins = [ 
								[11,12,13,14],[12,13,14,15],[13,14,15,16], [21,22,23,24], [22,23,24,25],[23,24,25,26],[31,32,33,34],[32,33,34,35],[33,34,35,36], [41,42,43,44],[42,43,44,45],[43,44,45,46], [51,52,53,54],[52,53,54,55],[53,54,55,56],[61,62,63,64],[62,63,64,65],[63,64,65,66],
								[11,21,31,41],[21,31,41,51], [12,22,32,42],[22,32,42,52], [13,23,33,43],[23,33,43,53], [14,24,34,44],[24,34,44,54], [15,25,35,45],[25,35,45,55],[31,41,51,61],[32,42,52,62],[33,43,53,63],[34,44,54,64],[35,45,66,65],[16,26,36,46],[26,36,46,56],[36,46,56,66],
								[11,22,33,44],[22,33,44,55],[12,23,34,45], [15,24,33,42],[14,23,32,41],[24,33,42,51],[21,32,43,54],[25,34,43,52],[33,44,55,66],[24,33,42,51],[16,25,34,43],[34,43,52,61],[62,53,44,35],[53,55,35,26],[36,45,54,63],[46,35,24,13],[56,45,34,23],[45,34,23,12],[65,54,43,32],[64,53,42,31]
	 ];

	 	 // 7 x 7 winning patterns;
	if (game_type==7) wins = [ 
								[11,12,13,14],[12,13,14,15],[13,14,15,16], [21,22,23,24], [22,23,24,25],[23,24,25,26],[31,32,33,34],[32,33,34,35],[33,34,35,36], [41,42,43,44],[42,43,44,45],[43,44,45,46], [51,52,53,54],[52,53,54,55],[53,54,55,56],[61,62,63,64],[62,63,64,65],[63,64,65,66],
								[11,21,31,41],[21,31,41,51], [12,22,32,42],[22,32,42,52], [13,23,33,43],[23,33,43,53], [14,24,34,44],[24,34,44,54], [15,25,35,45],[25,35,45,55],[31,41,51,61],[32,42,52,62],[33,43,53,63],[34,44,54,64],[35,45,66,65],[16,26,36,46],[26,36,46,56],[36,46,56,66],
								[11,22,33,44],[22,33,44,55],[12,23,34,45], [15,24,33,42],[14,23,32,41],[24,33,42,51],[21,32,43,54],[25,34,43,52],[33,44,55,66],[24,33,42,51],[16,25,34,43],[34,43,52,61],[62,53,44,35],[53,55,35,26],[36,45,54,63],[46,35,24,13],[56,45,34,23],[45,34,23,12],[65,54,43,32],[64,53,42,31],
								[14,15,16,17],[24,25,26,27],[34,35,36,37],[44,45,46,47],[54,55,56,57],[64,65,66,67],[71,72,73,74],[72,73,74,75],[73,74,75,76],[74,75,76,77],[41,51,61,71],[42,52,62,72],[43,53,63,73],[44,54,64,74],[54,55,65,75],[46,56,66,67],[17,27,37,47],[27,37,47,57],[37,47,57,67],[47,57,67,77],[44,55,66,77],[67,56,45,34],[57,46,35,24],[47,36,25,14],[76,65,54,43],[76,65,54,43],[75,64,53,42],[74,63,52,41],[17,26,35,44],[27,36,45,54],
								[37,46,55,64],[47,56,65,74],[71,62,,53,44],[72,63,54,45],[73,64,55,46]
						];
	return wins
}


// Robot patterns, for auto players of every game board
function DefaultRobotPatterns() {
	var robot_turns = Array();

	// 3 x 3 winning patterns;
	if (game_type==3) robot_turns = [22,11,33,13,21,23,12,32,31];


	// 4 x 4 winning patterns;
	if (game_type==4) robot_turns = [11,22,33,44,14,13,12,21,31,41,42,43,24,34,32,23];


	// 5 x 5 winning patterns;
	if (game_type==5) robot_turns = [11,22,33,44,55,15,14,13,12,51,41,31,21,35,45,25,53,52,54,42,43,32,34,23,24];


	// 6 x 6 winning patterns;
	if (game_type==6) robot_turns = [11,22,33,44,55,66,16,15,14,13,12,61,51,41,31,21,36,35,45,25,64,63,53,52,54,42,43,32,65,34,23,24];
	
	// 7 x 7 winning patterns;
	if (game_type==7) robot_turns = [11,22,33,44,55,66,77,17,16,15,14,13,12,71,61,51,41,31,21,76,36,35,75,45,25,64,72,63,53,52,54,74,76,42,43,32,65,34,23,24];
	return robot_turns
}


// Checking winner of selected type on selection
function checkWinner() {

	var selected = selections[turn].sort();
	var win_patterns = winnerPatterns();

	finished = false;
	for (var x=0; x < win_patterns.length; x++) {
		
		if (finished != true) { 
			finished = isWinner(win_patterns[x], selections[turn]);

			if ( finished === true ) {
				

				
				// Updating score card
				scoreUpdate(turn);

				// On winning disabled all boxes
				disableAllBoxes();
				
				
				swal("Winner!",'Player '+turn+' Won !!');
				document.getElementById("countdown").style.visibility="hidden";
				var collection = win_patterns[x];
				var match = Array.from(collection);
				ColorMatches(match,turn);
				TimeToChangeTurn=0;
				clearInterval(CountDown);
				
				finished=false;
			
				break;
				
				

			
			} 
		}
						
	}
	// If no one wins; declare DRAW
	if ( ( total_turns == (game_type*game_type) ) && finished === false ) { 
		swal('Game Draw!');
		finished = true;
		disableAllBoxes(); 
	}

	
}


// Verifying each selections with winning pattern
function isWinner(win_pattern, selections){
	var match = 0;
	var winmatch=[];
	for (var x=0; x<win_pattern.length; x++) {
		for (var y=0; y<selections.length; y++) {
			if (win_pattern[x]==selections[y]) {
				match++;	
				winmatch.push(win_pattern[x]);
			}
		}
	}





	if (match==win_pattern.length)
	{
	
	   return true;
   }

	
	return false;
}




// Disable all boxes after winning/draw
function disableAllBoxes() {

	var elements = document.getElementsByClassName("grid-box");
	for (var i = 0; i < elements.length; i++) {
	  elements[i].disabled =true;
	}

}


// Resetting autoplayer to true on change games
function resetAIButton() {
	var checkbox = document.getElementById('robot'); 	
	checkbox.checked = 'checked';

}
function WelcomeMessage() {

	const today = new Date();
	var player1 = document.getElementById("player1");	
	var player2 = document.getElementById("player2");


	var phase = today.getHours();
	if (phase < 12) {
		var time = "Morning";
	  } else if (phase < 18) {
		var time = "Afternoon";
	  } else {
		var time = "Evening";
	  }
	
	var CurrentTime = GetTime();
	swal("Welcome!", "\n\nWelcome " +player1.value + " and " +" "+ player2.value+ " and Good " + time + "!\n\n"+ CurrentTime );
		
	   
	}

  function GetTime()
  {
	const today = new Date();
	var date =today.getDate() +'/'+(today.getMonth()+1)+'/'+today.getFullYear();
	let h = today.getHours();
	let m = today.getMinutes();
	let s = today.getSeconds();
	var returendTime="";
	
	m = checkTime(m);
	s = checkTime(s);

    returendTime =date + " " +  h + ":" + m + ":" + s;
    return returendTime;
  }
  





  function checkTime(i) {
	if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
	return i;
  }

function RestartButton()
{
	var nicknames =document.getElementById("nicknames") ;
	nicknames.style.display ="block";
	document.getElementById("countdown").style.visibility="hidden";
	document.getElementById('game-board').innerHTML = "Please select your game from above, Enter your Nicnames and choose your color then press 'Start Game'.";
	document.getElementById("player1").value='';
	document.getElementById("player2").value='';
	document.getElementById("colorX").value="#FF0000";
	document.getElementById("colorO").value="#0000FF";
	document.getElementById("game_type").value="3";
	document.getElementById("score-X").innerHTML="0";
	document.getElementById("score-O").innerHTML="0";
	document.getElementById("score-X").style.backgroundColor="transparent";
	document.getElementById("score-O").style.backgroundColor="transparent";
	
	clearInterval(CountDown);
	resetParams();
	resetAIButton();

}



// Generating a board for new game
function generateGame(){

	var restart = document.getElementById("button");
	var player1 = document.getElementById("player1").value;	
	var player2 = document.getElementById("player2").value;
	if(restart.value == "Start Game")
	{
		
		if(player1 == "" || player2 == "")
		{
			
			swal("Oops!", "You Must Enter Names!", "error");
		   
   
		}
		else{
			var nicknames =document.getElementById("nicknames") ;
			nicknames.style.display ="none";
			WelcomeMessage();
			
			resetParams();
			// Clearing board for new game
			document.getElementById('game-board').innerHTML = '';
			// Getting Variables to update global param
			game_type = Number(document.getElementById('game_type').value);

			// is auto player selected 
			robot_object = document.getElementById('robot'); 
			if (robot_object.checked === true) robot = true; 
			else  robot = false;

			

						// Generating board
			for (var row = 1; row <= game_type; row++){
				for (var col = 1; col <= game_type; col++) {
					var unique_name = 'grid-'+row+'-'+col;
					var unique_id = row+''+col;
					var button = document.createElement("input");

					button.setAttribute("value", ' ');
					button.setAttribute("id", unique_id);
					button.setAttribute("name", unique_name);
					button.setAttribute("class", 'grid-box');
					button.setAttribute("type", 'button');
					button.setAttribute("onclick", "markCheck(this)");
					button.setAttribute("onmouseover", "DisplayText(this)");
					button.setAttribute("onmouseout", "RemoveText(this)");
					
					document.getElementById('game-board').appendChild(button);
				
				}
				
				var breakline = document.createElement("br");
					document.getElementById('game-board').appendChild(breakline);
			}

	TimeToChangeTurn = 10000+1000;
	Timer();
	Hover();
		
		}

	
	}
	
	
		function Timer()
			{

				
				document.getElementById("countdown").style.visibility="visible";
				CountDown=setInterval(function(){
					TimeToChangeTurn -= 1000
					var seconds = Math.floor((TimeToChangeTurn % (1000 * 60)) / 1000);
						if (turn == 'X') {
							document.getElementById("countdown").innerHTML = turn + "'s Turn <br>"
								+ seconds + " seconds remaining";
						}
						else{
							document.getElementById("countdown").innerHTML = turn + "'s Turn <br>"
								+ seconds + " seconds remaining";
						}

						if(seconds <=3)
						{
							document.getElementById("countdown").style.color ="red";
						}
						else
						document.getElementById("countdown").style.color ="white";
						if (TimeToChangeTurn == 0) {
							if(robot === true)
							{
								autoTurn(false);
								
							}
							
							changeTurn();
						}
					}
					,1000)
				


				
			
				
				}
}		

function ColorTiles(obj , color)
{

	obj.style.backgroundColor =color;
	obj.style.color = "white";
}

function ColorMatches(obj , turn)
{
	var ColorX= document.getElementById("colorX").value;
	var ColorO= document.getElementById("colorO").value;
	
	
	for (var i = 0; i <obj.length ; i++){
	
			
		var tile = document.getElementById(obj[i]);
				if(turn == 'X')
				{
				tile.style.backgroundColor ="#000000";
				tile.style.color = ColorX;
				}
				else if(turn =='O')
				{
					
					tile.style.backgroundColor ="#000000";
					tile.style.color = ColorO;
				}
			}	
}

// Selecting check for desired position
function markCheck(obj){

	obj.value = turn;
	total_turns++;
	var ColorX= document.getElementById("colorX").value;
	var ColorO= document.getElementById("colorO").value;

	if (turn == 'X' ) {
		obj.setAttribute("class", 'x-player');
		ColorTiles(obj , ColorX);
	} else {
		obj.setAttribute("class", 'o-player');
		ColorTiles(obj , ColorO);
	}

	obj.setAttribute("disabled", 'disabled');
	selections[turn].push(Number(obj.id));
	
	checkWinner();
	changeTurn();

}


// Auto player robot turn for O
function autoTurn(again=false) {

	is_empty_result = true;

	// Ignore for X player as well as if already finished
	if (turn === 'X' || finished === true) return false;

	// Get which winning pattern match most
	// Run according to the selected pattern
	var robot_pattern = '';
	if (again==true) robot_pattern = DefaultRobotPatterns();
	else robot_pattern = getAutoTurnPattern(); 

	for(var x = 0; x < robot_pattern.length; x++) {
		var desired_obj = document.getElementById(robot_pattern[x]);
		if (desired_obj.value == '' || desired_obj.value == ' ') { 
			markCheck(desired_obj); 
			is_empty_result = false;
			break;
		} 
	}

}


// Getting most nearest winning and lossing pattern
function getAutoTurnPattern() {

	var pattern = [];
	pattern = getMostNearestPattern('O');
	if (pattern.length <= 0) {
		pattern = getMostNearestPattern('X');
		if (pattern.length <= 0) {
			pattern = DefaultRobotPatterns();
		}
	}

	return pattern;
	
}


// Getting most applicable pattern for any player
function getMostNearestPattern(turn){

	var matches = 0;

	var selected = selections[turn].sort();
	var win_patterns = winnerPatterns();

	finished = false;
	for (var x=0; x < win_patterns.length; x++) {
		var intersected = intersectionArray(selected, win_patterns[x]);

		if ( intersected.length==(win_patterns[x].length-1) ) { //return win_patterns[x];

			// if any position is found empty then return that pattern; otherwise will check another one from list
			for (var y=0; y < win_patterns[x].length; y++) {
				obj = document.getElementById(win_patterns[x][y]);
				if (obj.value == '' || obj.value == ' ') {
					// Return pattern if got an empty; otherwise will match others 
					return win_patterns[x];	
				}
			}
		}

	}
	return [];
}


// Return intersaction result by comparing 
// Players' turns and Winning patterns
function intersectionArray(x, y){

    var response = [];
    for (var i = 0; i < x.length; i++) {
        for (var z = 0; z < y.length; z++) {
            if (x[i] == y[z]) {
                response.push(x[i]);
                break;
            }
        }
    }
    return response;

}


function scoreUpdate(turn){
	var ColorX= document.getElementById("colorX").value;
	var ColorO= document.getElementById("colorO").value;
	var ScoreX= document.getElementById("score-X");
	var ScoreO= document.getElementById("score-O");
	ScoreX.style.backgroundColor=ColorX;
	ScoreO.style.backgroundColor=ColorO;
	scores[turn]++;
	document.getElementById('score-'+turn).innerHTML = scores[turn];
}