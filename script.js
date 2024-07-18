const playboard=document.querySelector(".play-board");
const scoreE=document.querySelector(".Score");
const HscoreE=document.querySelector(".High-Score");
let gameover=false;

let foodx,foody;
let snakex=5,snakey=10;
let velocityx=0,velocityy=0;
let snakebody=[];
let intervalid;
let score=0;


let highscore=localStorage.getItem("High-score")||0;
HscoreE.innerText=`High-Score: ${highscore}`;


const changefood=()=>{
    foodx=Math.floor(Math.random()*30)+1;
    foody=Math.floor(Math.random()*30)+1;

}
const handlegameover=()=>{
  clearInterval(intervalid);
    alert("Game-over press ok to continue ");
    location.reload();
}




const changeposition=(e)=>{
  if(e.key==="ArrowDown"&& velocityy!=1){
    velocityx=0;
    velocityy=1;
  }else if(e.key==="ArrowUp"&& velocityy!=1){
    velocityx=0;
    velocityy=-1;
  }
  else if(e.key==="ArrowLeft"&& velocityx!=1){
    velocityx=-1;
    velocityy=0;
  }
  else if(e.key==="ArrowRight"&& velocityx!=-1){
    velocityx=1;
    velocityy=0;
  }
  initgame();
}



const initgame=()=>{
     if(gameover)return handlegameover();
    let htmlmarkup=`<div class="food" style="grid-area: ${foody}/${foodx}"></div>`;

    if(snakex==foodx && snakey==foody){
        changefood();
        snakebody.push([foodx,foody]);
        score++;

        highscore=score>=highscore?score:highscore;
        localStorage.setItem("High-score",highscore);
        scoreE.innerText=`Score: ${score}`;
        HscoreE.innerText=`High-Score: ${highscore}`;
        

    }

    for (let i = snakebody.length-1; i >0; i--){
     snakebody[i]=snakebody[i-1];
    
    }
    snakebody[0]=[snakex,snakey];

    snakex+=velocityx;
    snakey+=velocityy;

    if(snakex<=0||snakex>30|| snakey<=0||snakey>30){
      gameover=true;
    }
    for (let i = 0; i < snakebody.length; i++) {
      htmlmarkup+=`<div class="head" style="grid-area: ${snakebody[i][1]}/${snakebody[i][0]}"></div>`;
      if(i!==0 && snakebody[0][1]===snakebody[i][1]&& snakebody[0][0]===snakebody[i][0])
        gameover=true;
    }

    
    playboard.innerHTML=htmlmarkup;
}


changefood();
intervalid=setInterval(initgame,125);
document.addEventListener("keydown",changeposition);