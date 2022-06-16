//flappy bird objects
let flappyBird = new Bird();

let moveDownIntervalId;
let initialVelocity = 0;
let birdDownSpeed = 1;
function resumeMoveDown() {
  moveDownIntervalId = setInterval(() => {
    flappyBird.moveDown(initialVelocity + birdDownSpeed);
    initialVelocity += 2;
  }, 1000 / 30);
}

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    clearInterval(moveDownIntervalId);
    flappyBird.moveUp(20);
    initialVelocity = 0;
    resumeMoveDown();
  }
});

//obstacles
let obstacleArrays = [];
setInterval(() => {
  obstacleArrays.push(new Obstacle());
}, 10000);

let obstacle = new Obstacle();

function checkCollision(obj1, obj2) {
  let x1 = 0;
  let bird = { height: obj1.birdHeight, width: obj1.birdWidth };
  let y1Top = parseInt(window.getComputedStyle(obj1.bird).top);
  let y1 = parseInt(window.getComputedStyle(obj1.bird).bottom);
  let y2 = obj2.pipe1.bottomPosition;
  let y3 = obj2.pipe2.topPosition;
  let x2 = parseInt(window.getComputedStyle(obj2.pipe1).left);
  let x3 = parseInt(window.getComputedStyle(obj2.pipe2).left);
  let obstacle = { height: 500, width: obj2.width };
  if (
    (x2 > bird.width + x1 || y2 > y1 + bird.height) &&
    (x2 > bird.width + x1 || y3 > y1Top + bird.height)
  ) {
    return false;
  } else {
    return true;
  }
}

function moveObstacle() {
  requestAnimationFrame(() => {
    obstacleArrays.forEach((obstacle) => {
      let collsion = checkCollision(flappyBird, obstacle);

      obstacle.move();

      if (obstacle.checkOutView()) {
        let shiftedElement = obstacleArrays.shift();
        shiftedElement.deleteElement();
        delete shiftedElement;
      }
    });

    moveObstacle();
  });
}
moveObstacle();
