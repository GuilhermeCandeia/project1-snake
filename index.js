// setTimeOut - Vai permitir que se faça updates na tela, o que é necessário uma vez que a snake gradativamente aumenta de tamanho

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// inserindo classe para aumentar o tamanho da snake
class snakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let speed = 8;

// o board tem 400x400. Tamanho disponível seria 20x20. Tamanho da snake será 18x18.
let tileCount = 20;
//tileSize pode ser calculado canvas.width / tileCount - 2  ===> 400 / 20 -2
let tileSize = 18;
let headX = 10;
let headY = 10;

const snakeParts = [];
let tailLength = 2;

let appleX = 5;
let appleY = 5;

//utilizadas para aumentar e diminuir velocidade da snake
let xVelocity = 0;
let yVelocity = 0;

let score = 0;

//game loop
function drawGame() {
  changeSnakePosition();
  let result = isGameOver();
  if (result) {
    return;
  }

  clearScreen();
  checkAppleCollision();
  drawApple();
  drawSnake();

  drawScore();
  //condições para aumento de dificuldade
  if (score > 2) {
    speed = 11;
  }
  if (score > 5) {
    speed = 15;
  }
  if (score > 10) {
    speed = 17;
  }
  if (score > 20) {
    speed = 22;
  }

  setTimeout(drawGame, 1000 / speed);
}

function isGameOver() {
  let gameOver = false;

  //o jogo só se iniciará quando tiver alguma velocidade
  if (yVelocity === 0 && xVelocity === 0) {
    return false;
  }

  //caso a snake bata na parede
  if (headX < 0) {
    gameOver = true;
  } else if (headX === tileCount) {
    gameOver = true;
  } else if (headY < 0) {
    gameOver = true;
  } else if (headY === tileCount) {
    gameOver = true;
  }

  // condicao para detectar se o corpo da snake está ocupando a mesma parte da cabeça
  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    if (part.x === headX && part.y === headY) {
      gameOver = true;
      break;
    }
  }

  if (gameOver) {
    ctx.fillStyle = "red";
    ctx.font = "50px Verdana";

    ctx.fillText("YOU DIED", canvas.width / 6.5, canvas.height / 2);
  }
  return gameOver;
}

function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "10px Verdana";
  ctx.fillText("Score " + score, canvas.width - 50, 10);
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

  ctx.fillStyle = "green";
  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
  }

  snakeParts.push(new snakePart(headX, headY)); //coloca um item ao final da lista próximo a cabeça
  // condicional que permite que a cauda se mova juntamente com a cabeça da snake
  //WHILE pode ser utilizado no lugar do IF nessa situação
  if (snakeParts.length > tailLength) {
    snakeParts.shift();
  }
}

//mover snake para esquerda ou direita, o valor poderá ser positivo ou negativo
function changeSnakePosition() {
  headX = headX + xVelocity;
  headY = headY + yVelocity;
}

function drawApple() {
  ctx.fillStyle = "red";
  ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

//condições de colisão
function checkAppleCollision() {
  if (appleX === headX && appleY === headY) {
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
    tailLength++;
    score++;
  }
}

document.body.addEventListener("keydown", keyDown);

// caso a snake esteja se movendo para esquerda, ela só deverá mover pra cima ou pra baixo. Devemos evitar que ela vá para direita e entre no próprio corpo. Deve-se implementar o oposto da x/yVelocity e retornar.

function keyDown(event) {
  //up arrow
  if (event.keyCode == 38) {
    if (yVelocity == 1) return;
    yVelocity = -1;
    xVelocity = 0;
  }
  //down arrow
  if (event.keyCode == 40) {
    if (yVelocity == -1) return;
    yVelocity = 1;
    xVelocity = 0;
  }
  //left arrow
  if (event.keyCode == 37) {
    if (xVelocity == 1) return;
    yVelocity = 0;
    xVelocity = -1;
  }
  //right arrow
  if (event.keyCode == 39) {
    if (xVelocity == -1) return;
    yVelocity = 0;
    xVelocity = 1;
  }
}

drawGame();
