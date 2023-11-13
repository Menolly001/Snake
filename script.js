let canvasWidth = 800;
let canvasHeight = 600;
let blockSize = 20;
let snake = [];
let isPaused = false; // état de pause
let gameSpeed = 100; // vitesse du jeu
let direction = "right"; // direction initiale


// creation du canvas
let canvas = document.getElementById("canvas");
document.body.appendChild(canvas);
canvas.width = canvasWidth;
canvas.height = canvasHeight;
canvas.style.border = "20px solid gray";
canvas.style.margin = "50px auto";
canvas.style.display = "block";

canvas = document.getElementById("canvas");
let container = document.getElementById("canvas-container");
container.appendChild(canvas);
canvas.width = canvasWidth;
canvas.height = canvasHeight;

// void ctx.arc(x, y, rayon, angleDépart, angleFin, sensAntiHoraire);




let ctx = canvas.getContext("2d");
ctx.arc = 
snake[0] = { x: 4 * blockSize, y: 4 * blockSize };


function drawSnake() {
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "#006400" : "#228B22"; // Couleur du serpent, différente pour la tête
    ctx.fillRect(snake[i].x, snake[i].y, blockSize, blockSize);

    ctx.strokeStyle = "#FBE4A4";
    ctx.strokeRect(snake[i].x, snake[i].y, blockSize, blockSize);
  }
}

let food = {
  x: Math.floor(Math.random() * (canvasWidth / blockSize)) * blockSize,
  y: Math.floor(Math.random() * (canvasHeight / blockSize)) * blockSize,
};
// Gestion des entrées clavier
document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  if (event.keyCode === 37 && direction !== "right") direction = "left";
  if (event.keyCode === 38 && direction !== "down") direction = "up";
  if (event.keyCode === 39 && direction !== "left") direction = "right";
  if (event.keyCode === 40 && direction !== "up") direction = "down";
  if (event.keyCode === 80) { // 80 est le code clé pour 'P'
    
    isPaused = !isPaused; // état de pause
    if (!isPaused) startGame(); // Redémarre le jeu si il n'est plus en pause
    return;
  }

  if (isPaused) return; // Ne change pas de direction si le jeu est en pause
}
function drawFood() {
  ctx.fillStyle = "#FF0000"; // Couleur de la nourriture
  ctx.fillRect(food.x, food.y, blockSize, blockSize);
}

function updateSnakePosition() {
  let head = { x: snake[0].x, y: snake[0].y };

  // Mettre à jour la position de la tête en fonction de la direction
  if (direction === "right") head.x += blockSize;
  if (direction === "left") head.x -= blockSize;
  if (direction === "up") head.y -= blockSize;
  if (direction === "down") head.y += blockSize;

  // Faire traverser le serpent de l'autre côté du canvas
  if (head.x >= canvasWidth) head.x = 0;
  if (head.y >= canvasHeight) head.y = 0;
  if (head.x < 0) head.x = canvasWidth - blockSize;
  if (head.y < 0) head.y = canvasHeight - blockSize;

   // Vérifier si la tête du serpent entre en collision avec le corps
   for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
        // Collision détectée, fin du jeu
        alert("Game Over!"); // Afficher un message de fin de jeu
        clearInterval(gameInterval); // Arrêter la boucle de jeu
        return; // Sortir de la fonction pour ne pas continuer à mettre à jour le serpent
    }
}
  // Ajouter la nouvelle tête au début du tableau
  snake.unshift(head);

  // Vérifier si le serpent a mangé la nourriture
  if (head.x === food.x && head.y === food.y) {
    // Générer une nouvelle nourriture
    food = {
      x: Math.floor(Math.random() * (canvasWidth / blockSize)) * blockSize,
      y: Math.floor(Math.random() * (canvasHeight / blockSize)) * blockSize,
    };
  } else {
    // Enlever le dernier segment du serpent
    snake.pop();
  }
}

// Fonction pour mettre à jour le jeu
function drawGame() {
  if (isPaused) return; // Ne met pas à jour le jeu si il est en pause
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  drawSnake();
  drawFood();
  updateSnakePosition();

  // Collision detection, game over conditions, etc. can be added here
}
document.getElementById("newGameButton").addEventListener("click", function () {
  // Réinitialiser le jeu
  snake = [{ x: 4 * blockSize, y: 4 * blockSize }]; // Réinitialise le serpent
  direction = "right"; // Réinitialise la direction
  isPaused = false; // Assurez-vous que le jeu n'est pas en pause
  startGame(); // Redémarre le jeu
});

let gameInterval;
function startGame() {
  if (gameInterval) clearInterval(gameInterval);
  gameInterval = setInterval(drawGame, gameSpeed);
}

document.addEventListener("keydown", changeDirection);
startGame();
