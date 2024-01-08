const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
let balls = [];
let numBallsInput = document.getElementById('numBalls');
let collisionThresholdInput = document.getElementById('collisionThreshold');
let repulsionForceInput = document.getElementById('repulsionForce');
let attractionForceInput = document.getElementById('attractionForce');
let collisionThreshold = parseInt(collisionThresholdInput.value);
let repulsionForce = parseFloat(repulsionForceInput.value);
let attractionForce = parseFloat(attractionForceInput.value);
let requestId;

function start() {
    cancelAnimationFrame(requestId);
    balls = [];
    createBalls(parseInt(numBallsInput.value));
    animate();
}

function reset() {
    cancelAnimationFrame(requestId);
    balls = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function createBalls(num) {
    for (let i = 0; i < num; i++) {
        let radius = Math.random() * 20 + 10;
        let x = Math.random() * (canvas.width - 2 * radius) + radius;
        let y = Math.random() * (canvas.height - 2 * radius) + radius;
        let dx = (Math.random() - 0.5) * 4;
        let dy = (Math.random() - 0.5) * 4;
        balls.push({ x, y, radius, dx, dy });
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < balls.length; i++) {
        let ball = balls[i];

        ball.x += ball.dx;
        ball.y += ball.dy;

        if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
            ball.dx = -ball.dx;
        }

        if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
            ball.dy = -ball.dy;
        }

        // Odpychanie/przyciąganie kursora myszy
        let mouseX = event.clientX - canvas.getBoundingClientRect().left;
        let mouseY = event.clientY - canvas.getBoundingClientRect().top;
        let distanceToMouse = Math.sqrt((ball.x - mouseX) ** 2 + (ball.y - mouseY) ** 2);

        if (distanceToMouse < 100) {
            let angle = Math.atan2(mouseY - ball.y, mouseX - ball.x);
            let force = distanceToMouse < 50 ? repulsionForce : attractionForce;
            ball.dx += force * Math.cos(angle);
            ball.dy += force * Math.sin(angle);
        }

        // Sprawdź kolizje między kulami
        for (let j = i + 1; j < balls.length; j++) {
            let otherBall = balls[j];
            let distance = Math.sqrt((ball.x - otherBall.x) ** 2 + (ball.y - otherBall.y) ** 2);

            if (distance < collisionThreshold / 100 * canvas.width) {
                ctx.beginPath();
                ctx.moveTo(ball.x, ball.y);
                ctx.lineTo(otherBall.x, otherBall.y);
                ctx.strokeStyle = '#000';
                ctx.stroke();
            }
        }

        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#0095DD';
        ctx.fill();
        ctx.closePath();
    }

    requestId = requestAnimationFrame(animate);
}

function handleMouseClick(event) {
    let mouseX = event.clientX - canvas.getBoundingClientRect().left;
    let mouseY = event.clientY - canvas.getBoundingClientRect().top;

    for (let i = 0; i < balls.length; i++) {
        let ball = balls[i];
        let distanceToClick = Math.sqrt((ball.x - mouseX) ** 2 + (ball.y - mouseY) ** 2);

        if (distanceToClick < ball.radius) {
            // Usunięcie klikniętej kuli
            balls.splice(i, 1);

            // Utworzenie dwóch nowych kul
            createBalls(2);

            break;
        }
    }
}

canvas.addEventListener('click', handleMouseClick);
start();
