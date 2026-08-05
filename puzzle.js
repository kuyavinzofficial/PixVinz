let level =
Number(localStorage.getItem("level")) || 1;


let size;


let moves=0;

let seconds=0;

let timer;


let selected=null;


let images=[

"images/level1.jpg",
"images/level2.jpg",
"images/level3.jpg",
"images/level4.jpg",
"images/level5.jpg",
"images/level6.jpg",
"images/level7.jpg",
"images/level8.jpg",
"images/level9.jpg",
"images/level10.jpg"

];



let pieces=[];



function setup(){


size =
level < 3 ? 3 :
level < 5 ? 4 :
level < 7 ? 5 :
level < 9 ? 6 : 7;



document.getElementById("levelTitle")
.innerHTML=
"Level "+level;



startTimer();


createPuzzle();


}




function startTimer(){


timer=setInterval(()=>{


seconds++;


document.getElementById("timer")
.innerHTML=seconds;



},1000);


}




function createPuzzle(){


let total=size*size;


for(let i=0;i<total;i++){

pieces.push(i);

}


shufflePuzzle();


}




function drawPuzzle(){


let board=
document.getElementById("puzzleBoard");


board.style.gridTemplateColumns=
`repeat(${size},1fr)`;


board.innerHTML="";


pieces.forEach((piece,index)=>{


let div=document.createElement("div");


div.className="piece";


div.draggable=true;


let pos =
100/size;


let x =
(piece%size)*pos;


let y =
Math.floor(piece/size)*pos;



div.style.backgroundImage=
`url(${images[level-1]})`;



div.style.backgroundSize=
"100% 100%";



div.style.backgroundPosition=
`${x}% ${y}%`;



div.dataset.index=index;



div.ondragstart=function(){

selected=index;

};



div.ondragover=e=>e.preventDefault();



div.ondrop=function(){


swapPieces(
selected,
index
);


};



board.appendChild(div);



});


}




function swapPieces(a,b){


let temp=pieces[a];

pieces[a]=pieces[b];

pieces[b]=temp;


moves++;


document.getElementById("moves")
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



clearInterval(timer);



let stars;


if(seconds<60 && moves<50)

stars="⭐⭐⭐";

else if(seconds<120)

stars="⭐⭐";

else

stars="⭐";



document.getElementById("stars")
.innerHTML=stars;



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


alert(
"🎉 Level Complete!\n"+stars
);



}



function backHome(){

window.location="index.html";

}



setup();
