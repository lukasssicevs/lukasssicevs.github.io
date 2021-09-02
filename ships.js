let fire=document.getElementById('fire');
let ship=document.getElementsByClassName('cell');
let ships=[[02,12,22],[43,44,45],[14,15,16],[61,62,63]];
let alive=[[1,1,1],[1,1,1],[1,1,1],[1,1,1]];
let state={
  guesses:0,
}

let randomShips=generator();
let boom=new Audio();
boom.src='audio/boom.wav';

let water=new Audio();
water.src='audio/water.wav';

let win=new Audio();
win.src='audio/win.wav';

let error=new Audio();
error.src='audio/error.wav';

let drowned=new Audio();
drowned.src='audio/drowned.wav';

let start=new Audio();
start.src='audio/start.wav';

let invalid=new Audio();
invalid.src='audio/invalid.wav';

function invisible(){
  document.getElementById('popUp').classList.add("invisible");
  document.getElementById('instruct').classList.add("invisible");
  document.getElementById('instructions').classList.add("invisible");
  document.getElementById('start').classList.add("invisible");
  start.play();
  document.getElementById('panel').classList.remove("invisible");
}


//Generates random ship locations
function generator(){

  function generatorDown(){
    let num=Math.ceil(Math.random()*65).toString();
    if(num[num.length-1]>0&&num[num.length-1]<6){
      return Number(num);
    }
    return generatorDown();
  };

  function generatorSide(){
    let num=Math.ceil(Math.random()*65).toString();
    if(num[num.length-1]>0&&num[num.length-1]<8&&num[0]<5){
      return Number(num);
    }
    return generatorSide();
  };

  function checker(){
    let alpha=[a,b,c,d,e,f,g,h,i,j,k,l];
    let beta=[a,b,c,d,e,f,g,h,i,j,k,l];
    for(let x=0;x<alpha.length;x++){
      beta[x]=0;
      if(beta.includes(alpha[x])){
        return false;
      }
      beta=[a,b,c,d,e,f,g,h,i,j,k,l];
    }
  }

  let a=generatorDown();
  let b=a+1;
  let c=b+1;

  let d=generatorDown();
  let e=d+1;
  let f=e+1;

  let g=generatorSide();
  let h=g+10;
  let i=h+10;

  let j=generatorSide();
  let k=j+10;
  let l=k+10;

  if(checker()==false){
    generator();
  }else{
    return [[a,b,c],[d,e,f],[g,h,i],[j,k,l]];
  }
}



//function for playing the game by clicking on cells rather than typing in
function action(button){
  let id=button.id;
  for(let i=0;i<4;i++){
    for(let j=0;j<4;j++){
      if(id==randomShips[i][j]){
        if(alive[i][j]==0){
          document.getElementById('command').innerHTML='ALREADY PUNISHED!';
          error.play();
        }
        else{
          state.guesses++;
          alive[i][j]=0;
          if(alive[0]=='0,0,0'&&alive[1]=='0,0,0'&&alive[2]=='0,0,0'&&alive[3]=='0,0,0'){
            document.getElementById('command').innerHTML='SHIPS DEFEATED IN '+state.guesses+' MOVES!';
            document.getElementById(id).classList.add("hit");
            win.play();
            document.getElementById('popUp').classList.add("win");
          }
          else if(alive[i]=='0,0,0'){
            document.getElementById('command').innerHTML='SHIP DROWNED!';
            document.getElementById(id).classList.add("hit");
            drowned.play();
          }
          else{
          document.getElementById('command').innerHTML='HIT!!!KEEP IT UP!';
          document.getElementById(id).classList.add("hit");
          boom.play();
          }
        }
        return true;
      }
    }
  }
  document.getElementById('command').innerHTML='YOU MISSED! :(';
  document.getElementById(id).classList.add("miss");
  water.play();
  state.guesses++;
  return false;
}


//converter(example: from received 'A0' it gets 01)
fire.onclick=function convert(){
  let input=document.getElementById('aim').value;
  let alphabet=['A','B','C','D','E','F','G'];
  if(input.length==2&&Number(input[1])<8&&Number(input[1])>0&&alphabet.includes(input[0])){
    let letter=input[0];
    let number=alphabet.indexOf(letter);
    let conversion=number+input[1];
    response(conversion);
    document.getElementById('aim').value="";
    state.guesses++;
  }
  else{
    document.getElementById('command').innerHTML='INVALID INPUT :(';
    invalid.play();
  }
}


//response to player depending on the input received from converter
function response(num){
  for(let i=0;i<4;i++){
    for(let j=0;j<4;j++){
      if(num==randomShips[i][j]){
        if(alive[i][j]==0){
          document.getElementById('command').innerHTML='ALREADY PUNISHED!';
          error.play();
        }
        else{
          state.guesses++;
          alive[i][j]=0;
          if(alive[0]=='0,0,0'&&alive[1]=='0,0,0'&&alive[2]=='0,0,0'&&alive[3]=='0,0,0'){
            document.getElementById('command').innerHTML='SHIPS DEFEATED IN '+state.guesses+' MOVES!';
            document.getElementById('popUp').classList.add("win");
            document.getElementById(num).classList.add("hit");
            win.play();
          }else if(alive[i]=='0,0,0'){
            document.getElementById('command').innerHTML='SHIP DROWNED!';
            document.getElementById(num).classList.add("hit");
            drowned.play();
          }else{
            document.getElementById('command').innerHTML='HIT!!!KEEP IT UP!';
            document.getElementById(num).classList.add("hit");
            boom.play();
          }
        }
        return true;
      }
    }
  }
  document.getElementById('command').innerHTML='YOU MISSED! :(';
  document.getElementById(num).classList.add("miss");
  splash.play();
  return false;
}
