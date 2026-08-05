let level = Number(localStorage.getItem("level")) || 1;

let size;

let moves = 0;
let seconds = 0;

let timer;

let selected = null;


// Your images (.jpeg)
let images = [

    "images/level1.jpeg",
    "images/level2.jpeg",
    "images/level3.jpeg",
    "images/level4.jpeg",
    "images/level5.jpeg",
    "images/level6.jpeg",
    "images/level7.jpeg",
    "images/level8.jpeg",
    "images/level9.jpeg",
    "images/level10.jpeg"

];


let pieces = [];



// Start Game
function setup(){

    size =
        level <= 2 ? 3 :
        level <= 4 ? 4 :
        level <= 6 ? 5 :
        level <= 8 ? 6 :
        7;


    document.getElementById("levelTitle").innerHTML =
        "Level " + level;


    startTimer();


    createPuzzle();

}



// Timer
function startTimer(){

    timer = setInterval(function(){

        seconds++;

        document.getElementById("timer").innerHTML = seconds;

    },1000);

}



// Create Puzzle Pieces
function createPuzzle(){

    let total = size * size;


    pieces = [];


    for(let i=0;i<total;i++){

        pieces.push(i);

    }


    shufflePuzzle();

}



// Draw Puzzle
function drawPuzzle(){

    let board =
    document.getElementById("puzzleBoard");


    board.innerHTML="";


    // Keep same board size
    board.style.width="350px";
    board.style.height="350px";


    board.style.gridTemplateColumns =
    `repeat(${size},1fr)`;


    let image =
    images[level-1];



    pieces.forEach(function(piece,index){


        let div =
        document.createElement("div");


        div.className="piece";


        div.draggable=true;



        let row =
        Math.floor(piece / size);


        let col =
        piece % size;



        div.style.backgroundImage =
        `url("${image}")`;



        // Important:
        // Image always fills same board
        div.style.backgroundSize =
        `${size * 100}% ${size * 100}%`;



        div.style.backgroundPosition =
        `${(col/(size-1))*100}% ${(row/(size-1))*100}%`;



        div.dataset.index=index;



        div.ondragstart=function(){

            selected=index;

        };


        div.ondragover=function(e){

            e.preventDefault();

        };


        div.ondrop=function(){

            swapPieces(selected,index);

        };


        board.appendChild(div);


    });

}



        // Drag start
        div.ondragstart=function(){

            selected=index;

        };



        // Allow drop
        div.ondragover=function(e){

            e.preventDefault();

        };



        // Drop piece
        div.ondrop=function(){

            swapPieces(selected,index);

        };



        board.appendChild(div);


    });


}



// Swap Pieces
function swapPieces(a,b){


    if(a===b){

        return;

    }



    let temp =
    pieces[a];


    pieces[a]=pieces[b];


    pieces[b]=temp;



    moves++;


    document.getElementById("moves").innerHTML =
    moves;



    drawPuzzle();


    checkWin();


}



// Shuffle
function shufflePuzzle(){


    pieces.sort(function(){

        return Math.random()-0.5;

    });


    drawPuzzle();


}



// Check Completion
function checkWin(){


    for(let i=0;i<pieces.length;i++){


        if(pieces[i]!==i){

            return;

        }

    }



    clearInterval(timer);



    let stars;



    if(seconds < 60 && moves < 50){

        stars="⭐⭐⭐";

    }

    else if(seconds < 120){

        stars="⭐⭐";

    }

    else{

        stars="⭐";

    }



    document.getElementById("stars").innerHTML =
    stars;



    // Save completion

    localStorage.setItem(
        "level"+level,
        "completed"
    );



    // Give coins

    let coins =
    Number(localStorage.getItem("coins")) || 0;



    coins += level * 10;



    localStorage.setItem(
        "coins",
        coins
    );



    setTimeout(function(){

        alert(
        "🎉 Level "+level+" Complete!\n"+
        stars
        );


    },300);



}



// Back button
function backHome(){

    window.location="index.html";

}



// Start
setup();
