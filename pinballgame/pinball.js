const canvas = document.getElementById('pinballGame');
const ctx = canvas.getContext('2d');

// Ball properties
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    dx: 2,
    dy: -2,
    radius: 10,
    color: '#FFD700'
};

// Player paddle properties
const playerPaddle = {
    width: 75,
    height: 10,
    x: (canvas.width - 75) / 2,
    y: canvas.height - 20,
    color: '#00FF00',
    speed: 5
};

// Robot paddle properties
const robotPaddle = {
    width: 75,
    height: 10,
    x: (canvas.width - 75) / 2,
    y: 10,
    color: '#FF0000',
    speed: 3
};

// Draw the ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

// Draw a paddle
function drawPaddle(paddle) {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.fillStyle = paddle.color;
    ctx.fill();
    ctx.closePath();
}

// Move the player paddle with mouse
canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    playerPaddle.x = event.clientX - rect.left - playerPaddle.width / 2;
});

// Move the robot paddle (simple AI)
function moveRobotPaddle() {
    if (robotPaddle.x + robotPaddle.width / 2 < ball.x) {
        robotPaddle.x += robotPaddle.speed;
    } else {
        robotPaddle.x -= robotPaddle.speed;
    }
}

// Check for collisions
function checkCollisions() {
    // Ball collision with walls
    if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
        ball.dx = -ball.dx;
    }

    // Ball collision with player paddle
    if (
        ball.y + ball.dy > playerPaddle.y - ball.radius &&
        ball.x > playerPaddle.x &&
        ball.x < playerPaddle.x + playerPaddle.width
    ) {
        ball.dy = -ball.dy;
    }

    // Ball collision with robot paddle
    if (
        ball.y + ball.dy < robotPaddle.y + robotPaddle.height + ball.radius &&
        ball.x > robotPaddle.x &&
        ball.x < robotPaddle.x + robotPaddle.width
    ) {
        ball.dy = -ball.dy;
    }

    // Ball out of bounds (game over)
    if (ball.y + ball.dy > canvas.height - ball.radius || ball.y + ball.dy < ball.radius) {
        resetGame();
    }
}

// Reset the game
function resetGame() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = 2;
    ball.dy = -2;
}

// Main game loop
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBall();
    drawPaddle(playerPaddle);
    drawPaddle(robotPaddle);

    moveRobotPaddle();
    checkCollisions();

    ball.x += ball.dx;
    ball.y += ball.dy;

    requestAnimationFrame(draw);
}

// Start the game
draw();