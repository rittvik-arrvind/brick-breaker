var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;
var dx=2;
var dy=-2;
var ballRadius = 10;
var paddleHeight =10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var bricRowCount =3 ;
var brickColumnCount =5 ;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsettop = 30;
var brickOffsetLeft = 30;
var score = 0;

var bricks = [];
for(var c = 0; c<brickColumnCount; c++){
    bricks[c] = [];
    for(var r=0;r<brickRowCount; r++){
        brick[c][r] = {x:0 , y:0, status:1};
    }
    }

document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);
document.addEventListener("mousemove", mouseMoveHandler, false)
  
function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
       rightPressed = true ;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true ;}
}

function keyUpHandler(e){
    if(e.key == "Right" || e.key == "ArrowRight"){
       rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft"){
        leftPressed = false ;}
}

function mousemove(e){
    var relativeX =e.clientX - canvas.offsetLeft;
    if(relativeX>0 && relativeX<canvas.width){
        paddleX=relativeX- paddleWidth/2;
    }
}


function drawBall(){
    ctx.beginPath();
    ctx.arc(x,y,ballRadius,0,Math.PI);
    ctx.fillStyle = "orangered";
    ctx.fill();
    ctx.closePath();

}

function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX,canvas.height-paddleHeight,paddleHeight,paddleWidth);
    ctx.fillStyle = "orangered";
    ctx.fill();
    ctx.closePath();

}

function drawBricks(){
    for(var c = 0; c<brickColumnCount; c++){
     
        for(var r=0;r<brickRowCount; r++){
            if(bricks[c][r].status == 1){
            var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
            var brickY = (r*(brickWidth+brickPadding))+brickOffsettop;
            bricks [c][r].x=brickX;
            bricks [c][r].y=brickY;
            ctx.beginPath(0,0,brickWidth,brickHeight)
            ctx.fillStyle = "orangered";
            ctx.fill();
            ctx.closePath();}
        }
}
}

function drawScore(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "orangered";
    ctx.fillText("Score" +score,8,20)
}


function collisionDetection(){
    for(var c = 0; c<brickColumnCount; c++){
     
        for(var r=0;r<brickRowCount; r++){
            var b = bricks[c][r];
            if(b.status == 1)
            if(x>b.x && x<b.x+brickWidth && y>b.y && y<b.y+brickHeight){
                dy = -dy;
                b.status = 0;
                score++;
                if(score == brickRowCount*brickColumnCount){
                    alert("YOU WIN, CONGRATS!");
                    document.location.reload();
                    clearInterval(interval);
                }

                
            }
        }}

        
}
function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();
    drawScore();
    collisionDetection();

   
    if(x+dx < canvas.width-ballRadius  || x+dx < ballRadius){
        dx= -dx
    }

    if(y+dy < ballRadius ){
    dy= -dy
}

else if (y+dy>canvas.height-ballRadius){
    if(x>paddleX && x<paddleX+paddleWidth){
        dy= -dy;  
}

else (y + dy > canvas.height-ballRadius)
    alert("GAME OVER")
    document.location.reload();
    clearInterval(interval);
}



if(rightPressed){
    paddleX+= 7
    if(paddleX + paddleWidth > canvas.width){
        paddleX = canvas.width - paddleWidth;
    }
}
    else if(leftPressed){
    paddleX -= 7;
    if(paddleX<0){
        paddleX=0
    }
    }
}




var interval = setInterval(draw,10);