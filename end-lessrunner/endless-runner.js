const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Player properties
const player = {
    x: 50,
    y: canvas.height - 60,
    width: 20,
    height: 40,
    color: '#000000',
    dy: 0,
    gravity: 0.6,
    jumpStrength: -10,
    grounded: false
};

// Obstacle properties
const obstacles = [];
const obstacleSpeed = 3;
let spawnRate = 100; // Lower = more frequent
let frameCount = 0;

// Score and death counters
let score = 0;
let deaths = 0;
const scoreDisplay = document.getElementById('score');
const deathsDisplay = document.getElementById('deaths');

// Draw stick figure player
function drawPlayer() {
    ctx.strokeStyle = player.color;
    ctx.lineWidth = 2;

    // Body
    ctx.beginPath();
    ctx.moveTo(player.x + player.width / 2, player.y);
    ctx.lineTo(player.x + player.width / 2, player.y + player.height);
    ctx.stroke();

    // Legs
    ctx.beginPath();
    ctx.moveTo(player.x + player.width / 2, player.y + player.height);
    ctx.lineTo(player.x, player.y + player.height + 20);
    ctx.moveTo(player.x + player.width / 2, player.y + player.height);
    ctx.lineTo(player.x + player.width, player.y + player.height + 20);
    ctx.stroke();

    // Arms
    ctx.beginPath();
    ctx.moveTo(player.x + player.width / 2, player.y + player.height / 2);
    ctx.lineTo(player.x, player.y + player.height / 2 + 10);
    ctx.moveTo(player.x + player.width / 2, player.y + player.height / 2);
    ctx.lineTo(player.x + player.width, player.y + player.height / 2 + 10);
    ctx.stroke();

    // Head
    ctx.beginPath();
    ctx.arc(player.x + player.width / 2, player.y - 10, 10, 0, Math.PI * 2);
    ctx.stroke();
}

// Draw obstacles
function drawObstacles() {
    ctx.fillStyle = '#FF0000';
    obstacles.forEach((obstacle, index) => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        obstacle.x -= obstacleSpeed;

        // Remove obstacle if off screen
        if (obstacle.x + obstacle.width < 0) {
            obstacles.splice(index, 1);
            score++; // Increase score when obstacle is passed
            scoreDisplay.textContent = score;
        }

        // Check for collision with player
        if (
            player.x < obstacle.x + obstacle.width &&
            player.x + player.width > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y
        ) {
            deaths++; // Increase death counter
            deathsDisplay.textContent = deaths;
            resetGame();
        }
    });
}

// Spawn obstacles
function spawnObstacle() {
    const height = Math.random() * 20 + 20; // Shorter obstacles
    obstacles.push({
        x: canvas.width,
        y: canvas.height - height,
        width: 20,
        height: height
    });
}

// Jump mechanic
function jump() {
    if (player.grounded) {
        player.dy = player.jumpStrength;
        player.grounded = false;
    }
}

// Reset game
function resetGame() {
    player.y = canvas.height - 60;
    player.dy = 0;
    player.grounded = false;
    obstacles.length = 0;
    frameCount = 0;
    spawnRate = 100;
}

// Update player position
function updatePlayer() {
    player.dy += player.gravity;
    player.y += player.dy;

    // Ground collision
    if (player.y + player.height > canvas.height - 20) {
        player.y = canvas.height - player.height - 20;
        player.dy = 0;
        player.grounded = true;
    }
}

// Main game loop
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPlayer();
    drawObstacles();
    updatePlayer();

    // Spawn obstacles
    if (frameCount % spawnRate === 0) {
        spawnObstacle();
        if (spawnRate > 40) spawnRate -= 2; // Increase spawn rate over time
    }

    frameCount++;
    requestAnimationFrame(draw);
}

// Jump on spacebar
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        jump();
    }
});

// Start the game
draw();