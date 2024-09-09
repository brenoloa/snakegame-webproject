const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

const box = 20;
const snake = [];
snake[0] = { x: 10 * box, y: 10 * box };

let direction = "RIGHT";
let food = {};
let score = 0;


function spawnFood() {
    // Gerar uma posição aleatória para a comida
    food.x = Math.floor(Math.random() * (canvas.width / box)) * box;
    food.y = Math.floor(Math.random() * (canvas.height / box)) * box;

    // Verificar se a posição da comida colide com a cobra
    for (let i = 0; i < snake.length; i++) {
        if (food.x === snake[i].x && food.y === snake[i].y) {
            // Se a comida colidir com a cobra, gerar uma nova posição
            spawnFood();
            return;
        }
    }
}

// Controle da direção da cobra
document.addEventListener("keydown", setDirection);

function setDirection(event) {
    if (event.keyCode === 37 && direction !== "RIGHT") {
        direction = "LEFT";
    } else if (event.keyCode === 38 && direction !== "DOWN") {
        direction = "UP";
    } else if (event.keyCode === 39 && direction !== "LEFT") {
        direction = "RIGHT";
    } else if (event.keyCode === 40 && direction !== "UP") {
        direction = "DOWN";
    }
}

function checkCollision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

function draw() {
    
    context.fillStyle = "black"; // Cor de fundo
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Desenha a borda do campo
    context.strokeStyle = "#333"; // Cor da borda (diferente do fundo preto)
    context.lineWidth = 4;
    context.strokeRect(0, 0, canvas.width, canvas.height);

    // Desenha a cobra
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = "green"; // Cor da cobra (só verde)
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }

    // Desenha a comida
    context.fillStyle = "white"; // Cor da comida (branca)
    context.fillRect(food.x, food.y, box, box);

    // Posição da cabeça da cobra
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Direção da cobra
    if (direction === "LEFT") snakeX -= box;
    if (direction === "UP") snakeY -= box;
    if (direction === "RIGHT") snakeX += box;
    if (direction === "DOWN") snakeY += box;

    // Verificar colisão com a parede
    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || checkCollision({ x: snakeX, y: snakeY }, snake)) {
        clearInterval(game);
        alert("Game Over! Pressione F5 para reiniciar.");
        return;
    }

    // Verificar se comeu a comida
    if (snakeX === food.x && snakeY === food.y) {
        spawnFood();
        score++; // Incrementa a pontuação
    } else {
        snake.pop(); // Remover a cauda
    }

    // Adicionar nova cabeça
    const newHead = { x: snakeX, y: snakeY };
    snake.unshift(newHead);

    // Atualizar a pontuação na tela
    context.fillStyle = "white";
    context.font = "20px Arial";
    context.fillText(`Score: ${score}`, 10, 20);
}




spawnFood();


const game = setInterval(draw, 100);
