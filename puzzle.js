let size = 3;

let moves = 0;

let selected = null;


let image =
"images/sample.jpg";


let pieces=[];



function createPuzzle(){


let board =
document.getElementById("puzzleBoard");


board.innerHTML="";


pieces=[];


for(let i=0;i<size*size;i++){


pieces.push(i);


}



shufflePuzzle();



}



function drawPuzzle(){


let board =
document.getElementById("puzzleBoard");


board.innerHTML="";


pieces.forEach((piece,index)=>{


let div=document.createElement("div");


div.className="piece";


let x =
(piece % size)*100;


let y =
Math.floor(piece/size)*100;



div.style.backgroundImage=
`url(${image})`;


div.style.backgroundPosition=
`-${x}px -${y}px`;



div.onclick=function(){

selectPiece(index);

}



board.appendChild(div);



});


}



function selectPiece(index){


if(selected===null){

selected=index;

document
.getElementsByClassName("piece")[index]
.classList.add("selected");


}

else{


swapPieces(selected,index);


selected=null;


}

}



function swapPieces(a,b){


let temp=pieces[a];

pieces[a]=pieces[b];

pieces[b]=temp;


moves++;


document
.getElementById("moves")
.innerHTML=moves;


drawPuzzle();


checkWin();


}



function shufflePuzzle(){


pieces.sort(()=>Math.random()-0.5);


drawPuzzle();


}



function checkWin(){


for(let i=0;i<pieces.length;i++){


if(pieces[i]!=i)

return;


}


alert("🎉 Puzzle Completed!");

}



function backHome(){

window.location="index.html";

}



createPuzzle();
