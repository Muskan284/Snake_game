var cx=100;
var cy=100;
var clx=0;
var cly=0;
var s=0;
var d=0;

function component(w,h,c){
    this.width=w;
    this.height=h;
    this.update=function(){
    ctx=canvas.getContext("2d");
    ctx.fillStyle=c;
    ctx.fillRect(cx,cy, this.width,this.height);
    }
    /*this.newpos=function(){
     cx+=this.speedx;
     cy+=this.speedy;
    }*/
}

var sound = new Howl({
    src: ['start.mp3']
});
sound.play();

var sound1 = new Howl({
    src: ['eat.mp3']
});


var csx=50;
var csy=10;

var snake=[];
for(var i=0;i<10;i++){
snake.push(new component1(3,3,"blue",csx-3*i,csy));
snake[i].update();
}



function component1(w,h,c,x,y){
    this.width=w;
    this.height=h;
    this.x=x;
    this.y=y;
    this.update=function(){
    ctx=canvas.getContext("2d");
    ctx.fillStyle=c;
    ctx.fillRect(this.x ,this.y, this.width,this.height);
    }
    /*this.newpos=function(){
     cx+=this.speedx;
     cy+=this.speedy;
    }*/
}

var obs=[];
function creat(){
    var x=Math.random()*300;
    var y=Math.random()*150;
    obs.push(new component1(3,3,"green",x,y));
}

for(var i =0;i <= 20;i++)
{  creat(i);
   obs[i].update();
}

function moveup(){
    /*gamepiece.speedx=0;
    gamepiece.speedy=0;
    gamepiece.speedy-=0.1;*/
    cy-=2;
}

function movedown(){
    /*gamepiece.speedx=0;
    gamepiece.speedy=0;
    gamepiece.speedy+=0.1;*/
    cy+=2;
}

function moveleft(){
   /* gamepiece.speedx=0;
    gamepiece.speedy=0;
    gamepiece.speedx-=0.1;*/
    cx-=2;
}

function moveright(){
    /*gamepiece.speedx=0;
    gamepiece.speedy=0;
    gamepiece.speedx+=0.1;*/
    cx+=2;
}

function clear(){
    gamearea.getContext("2d").clearRect(0, 0, gamearea.width, gamearea.height)
    for(var i =0;i < 20  ;i++){ 
          obs[i].update();
}
}

function hit(a,b){
    var a1=a.x;
    var a2=a.y;
    var a3=a.x+a.width;
    var a4=a.y+a.height;
    var b1=b.x;
    var b2=b.y;
    var b3=b.x+b.width;
    var b4=b.y+b.height;

    if(((a1>b3)||(a3<b1))||((a2>b4)||(a4<b2))){
        return false;
    }
    else
    {   sound1.play();
        return true;}
}


function hitown(){
    for(var i=1;i<snake.length;i++){
        if(snake[0].x===snake[i].x && snake[0].y===snake[i].y)
                 return true;
    }
    return false;
}

function ch(){
    for(var i=0;i<20;i++)
    {
        if(hit(snake[0],obs[i])===true)
          {   var x=Math.random()*(gamearea.width);
              var y=Math.random()*(gamearea.height);
              obs[i]=new component1(3,3,"yellow",x,y);
              obs[i].update();
              s++;
              if(d===1)
              {  var a=snake[0].x;
                 var b=snake[0].y;
                 a+=3;
                 snake.unshift(new component1(3,3,"blue",a,b));
              }
              else if(d===2){
                var a=snake[0].x;
                var b=snake[0].y;
                b-=3;
                snake.unshift(new component1(3,3,"blue",a,b));
              }
              else if(d===3){
                var a=snake[0].x;
                var b=snake[0].y;
                a-=3;
                snake.unshift(new component1(3,3,"blue",a,b));
              }
              else{
                 var a=snake[0].x;
                 var b=snake[0].y;
                 b+=3;
                 snake.unshift(new component1(3,3,"blue",a,b));

              }
          }
    }
}

var up=document.getElementById("up");
var down=document.getElementById("down");
var left=document.getElementById("left");
var right=document.getElementById("right");
var gamearea=document.getElementById("canvas");
var gamepiece=new component(3,3,"red");
var sco=document.getElementById("score");
gamepiece.update();

up.addEventListener("click",function(){
    clear();
    moveup();
    //gamepiece.newpos();
    gamepiece.update();
    
})

down.addEventListener("click",function(){
    clear();
    movedown();
    //gamepiece.newpos();
    gamepiece.update();
})

left.addEventListener("click",function(){
    clear();
    moveleft();
    //gamepiece.newpos();
    gamepiece.update();
})

right.addEventListener("click",function(){
    clear();
    moveright();
    //gamepiece.newpos();
    gamepiece.update();
})

function stop(){
    gamepiece.speedx=0;
    gamepiece.speedy=0;  
}


window.addEventListener("keydown",function(e){
    if(e.keyCode===38)
    {  
        clear();
        moveup();
        //gamepiece.newpos();
        gamepiece.update();
     /*window.addEventListener("keyup",function(){
         stop();
     })*/
    }
    if(e.keyCode===40)
    {   
        clear();
        movedown();
        //gamepiece.newpos();
        gamepiece.update();
     /*window.addEventListener("keyup",function(){
        stop();
    })*/
    }
    if(e.keyCode===37)
    {   
        clear();
        moveleft();
        //gamepiece.newpos();
        gamepiece.update();
     /*window.addEventListener("keyup",function(){
        stop();
    })*/
    }
    if(e.keyCode===39)
    {   
        clear();
        moveright();
        //gamepiece.newpos();
        gamepiece.update();
     /*window.addEventListener("keyup",function(){
        stop();
    })*/
    }
})



window.addEventListener("keydown",function(e){
    if(e.keyCode===38)
    {  //up
        snake.pop();
        var a=snake[0].y;
        a-=3;
        var b=snake[0].x;
        snake.unshift(new component1(3,3,"blue",b,a));
        for(var i=0;i<snake.length;i++)
        snake[i].update();
        d=2;
    }
    if(e.keyCode===40)
    {   snake.pop();
        var a=snake[0].y;
        a+=3;
        var b=snake[0].x;
        snake.unshift(new component1(3,3,"blue",b,a));
        for(var i=0;i<snake.length;i++)
        snake[i].update();
        d=4;
    }
    if(e.keyCode===37)
    {   snake.pop();
        var a=snake[0].y;
        var b=snake[0].x;
        b-=3;
        snake.unshift(new component1(3,3,"blue",b,a));
        for(var i=0;i<snake.length;i++)
        snake[i].update();
        d=1;
    }
    if(e.keyCode===39)
    {   snake.pop();
        var a=snake[0].y;
        var b=snake[0].x;
        b+=3;
        snake.unshift(new component1(3,3,"blue",b,a));
        for(var i=0;i<snake.length;i++)
        snake[i].update();
        d=3;
    }
    ch();
    sco.textContent=s;
    if(s>=100)
    alert("you won");
    /*if(hitown()===true)
    alert("Game over");*/
})
