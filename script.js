let totalLevels = 10;


function openLevels(){

window.location="levels.html";

}



function backHome(){

window.location="index.html";

}




function loadLevels(){


let container =
document.getElementById("levelContainer");


let coins =
Number(localStorage.getItem("coins")) || 0;


document.getElementById("coins")
.innerHTML=coins;



for(let i=1;i<=totalLevels;i++){


let button=
document.createElement("button");


button.className="level-card";



let unlocked =
i===1 ||
localStorage.getItem("level"+(i-1))
==="completed";



let completed =
localStorage.getItem("level"+i)
==="completed";



if(completed){

button.className+=" completed";

button.innerHTML=
"⭐ "+i;


}

else if(unlocked){

button.className+=" unlocked";

button.innerHTML=
"Level "+i;


button.onclick=function(){

playLevel(i);

};


}

else{


button.className+=" locked";

button.innerHTML=
"🔒 "+i;


}



container.appendChild(button);



}



}



function playLevel(level){

localStorage.setItem(
"level",
level
);


window.location="game.html";

}




if(
window.location.pathname.includes("levels")
){

loadLevels();

}
