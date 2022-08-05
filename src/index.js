import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
const dictionary = '012345678910ABCDEF'
var x = 15
var y = 15

var size = 20
function NavBar() {
  return (
    <div class="topnav">
      <a class="active" href="">Home</a>
    </div>
  )
}

function Footer() {
  return (
    <div class="footer">
      <p>speed of circle is : {speed}</p>
    </div>
  )
}

let o = 0;
let l = 500
var objY = -size*2;
var objX = 500;
var gameOver = false
let speed = 5

function refreshPage() {
  window.location.reload(false);
}

function StartAgain(){
  return (
    <div>
      <button id='startAgainBtn' onClick={refreshPage}>Start Again</button>
    </div>
  );
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const Canvas = props => {

  const canvasRef = useRef(null)



  const draw = (ctx, canvas) => {
    ctx.fillStyle = "#fff"
    ctx.beginPath()
    ctx.arc(x, y, size, 0, 2 * Math.PI)
    ctx.fill()

    ctx.beginPath()
    ctx.fillStyle = "#0f0"
    ctx.arc(objX, objY, size*2, 0, 2 * Math.PI)
    ctx.fill()
    
  }

  function showMsg(ctx, canvas) {
    ctx.fillStyle = "#fff"
    ctx.font = '48px serif';
    ctx.textAlign = 'centre'
    ctx.fillText('Game Over', canvas.width/2 - 100, canvas.height/2);
  }

  function showCoin(ctx, canvas) {
    ctx.fillStyle = "#fff"
    ctx.font = '30px serif';
    ctx.fillText(speed, 10, 50);
  }

  useEffect(() => {
    
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    context.clearRect(0, 0, canvas.width, canvas.height);

    canvas.addEventListener('mousemove', function(event) {
      const rect = canvas.getBoundingClientRect()
      x = event.clientX - rect.left
      y = event.clientY - rect.top
    });

    canvas.addEventListener('click', function(event) {
      o++;
    });

    canvas.addEventListener('contextmenu', function(event) {
      event.preventDefault()
      if (size != 0)
        size--;
    });

    //Our draw come here
    if (!gameOver)
      draw(context, canvas)
    else
      showMsg(context, canvas)
    objY+=speed/2;
    
    if (objY + size*2 >= y - size && Math.abs(objX - x) <= size)
      gameOver = true

    if (objY >= canvas.height + size*2){
      objY = -size*2
      objX = getRandomInt(canvas.width)
      speed+=1;
    }
    if (!gameOver)
      showCoin(context, canvas)
  }, [draw])

  return <canvas id='mCanvas' width={500} height={500} ref={canvasRef} {...props} />
}

setInterval(function () {
  const element = (
    <div>
      <NavBar />
      <Canvas />
      <Footer />
      <StartAgain/>
    </div>
  );
  root.render(element);
}, 10);
