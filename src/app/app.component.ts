import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Snake_Game';
  snakeBodyArray:any[] = [{ x: 13, y: 13 }];
  foodPosition={x:0,y:0};
  board:any;
  currentDirection={x:0,y:0};
  pastDirection={x:0,y:0};
  interval:any;
  score:number=0;
  speed:number=150;

ngOnInit(){
 this.board=document.querySelector<HTMLElement>('.game_board');
  this.snakeBody();
  this.updateFrames();

  const snakeElement = document.createElement('div')
  snakeElement.style.gridRowStart = String(this.foodPosition.y)
  snakeElement.style.gridColumnStart = String(this.foodPosition.x)
  snakeElement.classList.add('food')
  this.board.appendChild(snakeElement)


this.updateFood();
  document.addEventListener('keydown', (event) => {
    this.onKeypressEvent(event)
    // var name = event.key;
    // var code = event.code;
    // // Alert the key name and key code on keydown
    // alert(`Key pressed ${name} \r\n Key code value: ${code}`);
  }, false);
}
updateFrames(){
  this.interval=setInterval(()=>{
    this.updateSnake();
  },this.speed)
}
updateSnake(){
  let snakeBoxArray= document.querySelectorAll<HTMLElement>('.snake')
  let startArray={x:this.snakeBodyArray[0].x + this.currentDirection.x,y:this.snakeBodyArray[0].y+ this.currentDirection.y,}
  this.snakeBodyArray.unshift(startArray)
  this.snakeBodyArray.pop()
for(let z=0;z<this.snakeBodyArray.length;z++){
  snakeBoxArray[z].style.gridRowStart = String(this.snakeBodyArray[z].y )
  snakeBoxArray[z].style.gridColumnStart = String(this.snakeBodyArray[z].x)
}
this.score=this.snakeBodyArray.length-1
this.foodEaten();
this.stopGame();
this.updateSpeed();
}
updateSpeed(){
  let updatedspeed=150;
  if(this.score>10){
    updatedspeed=140;
  }
  else if(this.score>25){
    updatedspeed=125;
  }
  else if(this.score>50){
    updatedspeed=115;
  }
  else if(this.score>150){
    updatedspeed=100;
  }
  else if(this.score>250){
    updatedspeed=90;
  }
  if(updatedspeed != this.speed){
    this.newframeSpeed(updatedspeed)
  }
}
newframeSpeed(speed:number){
  clearInterval(this.interval);
  this.speed=speed;
  this.updateFrames();
}
updateFood(){
let foodPosition=this.getRandomPosition();
if((this.snakeBodyArray.findIndex(x=> (x.x==foodPosition.x && x.y==foodPosition.y)))== -1){
  this.foodPosition=foodPosition;
  let foodElement= document.querySelector<HTMLElement>('.food')
  foodElement!.style.gridRowStart = String(  this.foodPosition.y )
  foodElement!.style.gridColumnStart = String(  this.foodPosition.x)
}
else{
  this.updateFood()
}
}

snakeBody(){
this.snakeBodyArray.forEach(segment => {
  this.creatingsnakeElements(segment)
})
}
creatingsnakeElements(segment:any){
const snakeElement = document.createElement('div')
snakeElement.style.gridRowStart = String(segment.y)
snakeElement.style.gridColumnStart = String(segment.x)
snakeElement.classList.add('snake')
this.board.appendChild(snakeElement)
}
foodEaten(){
  if(this.snakeBodyArray[0].x==this.foodPosition.x && this.snakeBodyArray[0].y==this.foodPosition.y){
    //let newbodyposition={x:this.snakeBodyArray[this.snakeBodyArray.length-1].x+1,y:this.snakeBodyArray[this.snakeBodyArray.length-1].y+1}
    this.snakeBodyArray.push(this.snakeBodyArray[this.snakeBodyArray.length-1])
    this.creatingsnakeElements(this.snakeBodyArray[this.snakeBodyArray.length-1])

    this.updateFood()
  }
}
stopGame(){
  let resultIntersection =this.checkIntersection();
 let resultBoundary= this.checkOutOfBoundry();
 if(resultIntersection || resultBoundary){
  let text = "Game Over";
  clearInterval(this.interval);
  if (confirm(text) == true) {
    window.location.reload();
  } else {
    window.location.reload();
  }
  console.log(text)
 }
}
checkIntersection():boolean{
  if(this.snakeBodyArray.length>3){
  let result=this.snakeBodyArray.filter( data => (data.x==this.snakeBodyArray[0].x && data.y== this.snakeBodyArray[0].y  ))
  if(result.length==2){
    return true;
  }
  else{
    return false;
  }
}
return false;
}
checkOutOfBoundry(){
  if(this.snakeBodyArray[0].x <1 || this.snakeBodyArray[0].x >25 || this.snakeBodyArray[0].y <1 ||this.snakeBodyArray[0].y>25 ){
    return true;
  }
  return false;
}
onKeypressEvent(event:KeyboardEvent){
  switch(event.key) { 
    case 'ArrowUp': { 
      if(this.pastDirection.y !=1){
      this.currentDirection={x:0,y:-1};
      }
       break; 
    } 
    case 'ArrowLeft': { 
      if(this.pastDirection.x !=1){
      this.currentDirection={x:-1,y:0};
      }
       break; 
    } 
    case 'ArrowDown': { 
      if(this.pastDirection.y != -1){
      this.currentDirection={x:0,y:1}; 
      }
      break; 
   } 
   case 'ArrowRight': { 
    if(this.pastDirection.x != -1){
    this.currentDirection={x:1,y:0};
    }
    break; 
  } 
  }
  this.pastDirection=this.currentDirection;
}

getRandomPosition(){
  let poisitionX=Math.floor(((Math.random()*25)+1));
  let poisitionY=Math.floor(((Math.random()*25)+1));
  return {x:poisitionX,y:poisitionY}
}

}