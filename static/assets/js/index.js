function playGame() {
  //flappy bird objects
  let flappyBird = new Bird();
  let birdWingIndex = 0;
  let wingIntervalId = setInterval(() => {
    birdWingIndex += 1;
    if (birdWingIndex > 2) {
      birdWingIndex = 0;
    }
    flappyBird.animateWings(birdWingIndex);
  }, 1000 / 10);
  //wing flap
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
      flappyBird.moveUp(100);
      initialVelocity = 0;
      resumeMoveDown();
    }
  });

  //obstacles
  let obstacleArrays = [];
  let obstacleId = setInterval(() => {
    obstacleArrays.push(new Obstacle());
  }, 5000);

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

  let collide = false;
  let gameOverState = false;
  let score = 0;

  let scoreElement = document.createElement("div");
  function createScoreElement() {
    scoreElement.textContent = score;
    scoreElement.style.color = "green";
    scoreElement.style.position = "absolute";
    scoreElement.style.left = "calc(50% - 100px)";
    scoreElement.style.top = "0px";
    document
      .getElementsByClassName("background-container")[0]
      .appendChild(scoreElement);
  }
  createScoreElement();

  function changeScore(score) {
    scoreElement.innerText = score;
  }

  function moveObstacle() {
    requestAnimationFrame(() => {
      obstacleArrays.forEach((obstacle) => {
        collide = checkCollision(flappyBird, obstacle);
        if (!collide) {
          obstacle.move();

          if (obstacle.checkOutView()) {
            let shiftedElement = obstacleArrays.shift();
            shiftedElement.deleteElement();
            delete shiftedElement;
            score += 1;
            changeScore(score);
          }
        } else {
          gameOverState = true;
        }
      });
      if (gameOverState) {
        gameOver();
      } else {
        moveObstacle();
      }
    });
  }
  if (!collide) moveObstacle();
  else {
    gameOver();
  }
  function gameOver() {
    clearInterval(obstacleId);
    clearInterval(wingIntervalId);
    let gameOverText = document.createElement("div");
    gameOverText.innerHTML = "<h1>Game Over</h1><br><br><h2>Try again</h2>";
    gameOverText.style.height = "100vh";
    gameOverText.style.width = "100vw";
    gameOverText.style.textAlign = "center";
    gameOverText.style.position = "absolute";
    gameOverText.style.backgroundColor = "rgb(0,0,0,0.5)";
    gameOverText.style.color = "red";

    gameOverText.addEventListener("click", () => {
      document.getElementsByClassName("background-container")[0].innerHTML = "";
      delete flappyBird;
      obstacleArrays = [];
      playGame();
    });

    //highscore element create;
    document
      .getElementsByClassName("background-container")[0]
      .appendChild(gameOverText);
  }
}

playGame();
