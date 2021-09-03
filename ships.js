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
  document.getElementById('table').classList.remove("invisible");
}


//Generates random ship locations
function generator(){

  let eliminatedDown=[];
  let eliminatedSide=[];

  function generatorDown(){
    let first=Math.ceil(Math.random()*6).toString();
    let second=Math.ceil(Math.random()*5).toString();
    let num=Number(first+second);

    if(eliminatedDown.includes(num)){
      return generatorDown();
    }

    return num;
  };

  function generatorSide(){
    let first=Math.ceil(Math.random()*4).toString();
    let second=Math.ceil(Math.random()*7).toString();
    let num=Number(first+second);

    if(eliminatedSide.includes(num)){
      return generatorSide();
    }

    return num;
  };


  let a=generatorDown();
  let b=a+1;
  let c=b+1;

  eliminatedDown.push(
    a,b,c,
    a-1,a-2,a-3,c+1
    ,a-10,b-10,c-10,
    a+10,b+10,c+10,
    c+1+10,c+1-10,
    a-1+10,a-2+10,a-3+10,
    a-1-10,a-2-10,a-3-10
    );

  let d=generatorDown();
  let e=d+1;
  let f=e+1;

  eliminatedSide.push(
    a,b,c,d,e,f,
    a-1,d-1,c+1,f+1,
    a+10,b+10,c+10,d+10,e+10,f+10,
    a-10,b-10,c-10,d-10,e-10,f-10,
    a-20,b-20,c-20,d-20,e-20,f-20,
    a-30,b-30,c-30,d-30,e-30,f-30,
    a-1+10,a-1-10,a-1-20,a-1-30,
    c+1+10,c+1-10,c+1-20,c+1-30,
    d-1+10,d-1-10,d-1-20,d-1-30,
    f+1+10,f+1-10,f+1-20,f+1-30
    );

  let g=generatorSide();
  let h=g+10;
  let i=h+10;

  eliminatedSide.push(
    g,h,i,
    g-1,h-1,i-1,
    g+1,h+1,i+1,
    i+10,g-10,g-20,g-30,
    g-1-10,g-1-20,g-1-30,
    g+1-10,g+1-20,g+1-30,
    i-1-10,i+1+10
    );

  let j=generatorSide();
  let k=j+10;
  let l=k+10;

  return [[a,b,c],[d,e,f],[g,h,i],[j,k,l]];
}



//function for playing the game by clicking on cells rather than typing in
function action(button){
  let id=button.id;
  for(let i=0;i<4;i++){
    for(let j=0;j<3;j++){
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


//converter(example: receives 'A0' or 'a0' and returns 01)
fire.onclick=function convert(){
  let input=document.getElementById('aim').value;
  let alphabet=['A','B','C','D','E','F','G'];
  let minibet=['a','b','c','d','e','f','g'];
  if(input.length==2&&Number(input[1])<8&&Number(input[1])>0&&(alphabet.includes(input[0])||minibet.includes(input[0]))){
    if(alphabet.includes(input[0])){
    let letter=input[0];
    let number=alphabet.indexOf(letter);
    let conversion=number+input[1];
    response(conversion);
    document.getElementById('aim').value="";
    state.guesses++;
    }
    else{
    let letter=input[0];
    let number=minibet.indexOf(letter);
    let conversion=number+input[1];
    response(conversion);
    document.getElementById('aim').value="";
    state.guesses++;
    }
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
  water.play();
  return false;
}
