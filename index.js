// setTimeOut - Vai permitir que se faça updates na tela, o que é necessário uma vez que a snake gradativamente aumenta de tamanho

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let speed = 7;

// o board tem 400x400. Tamanho disponível seria 20x20. Tamanho da snake será 18x18.
let tileCount = 20;
//tileSize pode ser calculado canvas.width / tileCount - 2  ===> 400 / 20 -2
let tileSize = 18;
headX = 10;
headY = 10;

let xVelocity = 0;
let yVelocity = 0;

//game loop
function drawGame() {
  clearScreen();
  drawSnake();
  setTimeout(drawGame, 1000 / speed);
}

//clear the screen
//simula um pincel, desenhar um retangulo (iniciando 0,0 topo esquerdo da tela) e pintar da cor preta ===> EIXO Y É INVERTIDO AO USAR O CANVAS
function clearScreen() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, (width = "400"), (height = "400"));
}

function drawSnake() {
  ctx.fillStyle = "orange";
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

drawGame();
