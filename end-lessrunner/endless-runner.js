const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Load images
const playerImage = new Image();
playerImage.src = '/end-lessrunner/stickfigure.webp'; // Replace with your stick figure image










const obstacleImages = [
    '/end-lessrunner/rock.jpeg', // Replace with your rock image
    '/end-lessrunner/tree.jpeg', // Replace with your tree image
    '/end-lessrunner/hill.png'  // Replace with your hill image
].map(src => {
    const img = new Image();
    img.src = src;
    return img;
});

// Player properties
const player = {
    x: 50,
    y: canvas.height - 60,
    width: 30,
    height: 50,
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

// Game state
let isPaused = false;

// Start screen elements
const startScreen = document.getElementById('startScreen');
const gameScreen = document.getElementById('gameScreen');
const startButton = document.getElementById('startButton');

// Show start screen initially
startScreen.style.display = 'block';
gameScreen.style.display = 'none';

// Start the game when the start button is clicked
startButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    resetGame();
    draw();
});

// Draw player
function drawPlayer() {
    ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);
}

// Draw obstacles
function drawObstacles() {
    obstacles.forEach((obstacle, index) => {
        ctx.drawImage(obstacle.image, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
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
    const image = obstacleImages[Math.floor(Math.random() * obstacleImages.length)];
    const height = Math.random() * 30 + 30; // Random height
    const width = height; // Keep aspect ratio
    obstacles.push({
        x: canvas.width,
        y: canvas.height - height,
        width: width,
        height: height,
        image: image
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
    score = 0;
    scoreDisplay.textContent = score;
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

// Pause the game
function togglePause() {
    isPaused = !isPaused;
    document.getElementById('pauseButton').textContent = isPaused ? 'Resume' : 'Pause';
    if (!isPaused) {
        draw(); // Resume the game loop
    }
}

// Main game loop
function draw() {
    if (isPaused) return; // Stop the game loop if paused

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

// Event listeners
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        jump();
    }
});

document.getElementById('pauseButton').addEventListener('click', togglePause);