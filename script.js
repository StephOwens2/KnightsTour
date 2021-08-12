//var startSquare = 35; // 0 - 63
var startSquare = Math.floor(Math.random()*63) + 1;

//var p1Knight = '&#9816;'; //White Knight
var p1Knight = '&#9822;'; //Black Knight
//var p1Knight = '&#127943;'; //Cartoon Jockey

var clk; //clicked
var prev = ""; //previous
var remaining = 63;
var candsCount; 

function buildBoard(){
  var isPlaybox = false;
  document.write("<table id='board'>");
  
  for(var i = 0; i < 8; i++)
  {
    isPlaybox = !isPlaybox;
    document.write("<tr>");
    for(var j = 0; j < 8; j++)
    {
      isPlaybox = !isPlaybox;
      document.write("<td");
      if (isPlaybox)
      {       
        document.write(" style='background-color: #778899; color: #778899' ");
      }
      document.write(" class='goal' onclick='movePiece("+i+","+j+");'></td>");
    }
    document.write("</tr>");
  }
  document.write("</table>");
};

function setPieces(){
    var tds = document.getElementsByTagName("td");

    for(i=0; i<64; i++)
    {
        if(i==startSquare){
            tds[i].innerHTML = p1Knight;
            tds[i].classList = ("Knight","selected");
            
            //begin with selected Knight
            a = tds[i].closest('tr').rowIndex; 
            b = tds[i].cellIndex; 
            
            //begin with a "previous," already. Used in movePiece(); 
            prev = tds[i];
        }
        else{
            //tds[i].innerHTML = i;
            tds[i].innerHTML = '&#9734' //star;
        }
    }
    
    //Begin with candidates: 
    findCand(a,b);
};

function findCand(a,b){
    var candTDs = document.getElementsByTagName("td");
    
    for (i=0; i<64; i++)
    {
        if
        (
            candTDs[i].classList.contains("goal")&&
            (
                //Candidates are two squares up/down/left/right, AND one square up/down/left/right... 
                ////So, plus and minus 2, by plus and minus 1: 
                (Math.abs(candTDs[i].closest("tr").rowIndex - a) == 2 &&
                Math.abs(candTDs[i].cellIndex - b) == 1)||
                
                (Math.abs(candTDs[i].closest("tr").rowIndex - a) == 1 &&
                Math.abs(candTDs[i].cellIndex - b) == 2)
            ) 
        )
        {
            candTDs[i].classList.add("candidate");
        }
    }
    candsCount = document.getElementsByClassName("candidate").length;
}

function forgetCand(){
    var candTDs = document.getElementsByClassName("candidate");
    while (candTDs.length){
        candTDs[0].classList.remove("candidate");
    }
}

function movePiece(a,b){
    clk = board.rows[a].cells[b];
    
    //Move the piece
    if(clk.classList.contains("candidate")){
        clk.innerHTML = prev.innerHTML;
        clk.classList = prev.classList;
        prev.innerHTML = " ";
        prev.classList = '';

        forgetCand();
        findCand(a,b);
        prev = clk;
        
        //scorecard
        document.getElementById('scorecardScore').innerHTML = --remaining;
    }

        if(candsCount == 0 && remaining > 0)
        {
        document.getElementById('scorecardGameOver').innerHTML = "</br>Game Over!";
        document.getElementById('btnPlayAgain').style.visibility = "visible";
        }
        if(remaining == 0)
        {
        document.getElementById('scorecardGameOver').innerHTML = "</br>YOU WIN!";
        document.getElementById('btnPlayAgain').style.visibility = "visible";
        }
}

function playAgain(){
//    document.getElementById('board').reload();

    window.location.reload();
/*    
    buildBoard();
    setPieces();
*/
}


