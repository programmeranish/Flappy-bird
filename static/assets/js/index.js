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

  function moveDown() {
    flappyBird.resetRotateBird();
    moveDownIntervalId = setInterval(() => {
      flappyBird.faceDown();
      flappyBird.moveDown(initialVelocity + birdDownSpeed);
      initialVelocity += 2;
    }, 1000 / 30);
  }

  // moving flappy bird up on key down pressed
  document.addEventListener("keydown", async (event) => {
    if (event.code === "Space") {
      clearInterval(moveDownIntervalId);
      let moveUptoIndex = 200;
      let movedIndex = 0;
      function animateUp() {
        flappyBird.faceUp();
        return new Promise((resolve, reject) => {
          requestAnimationFrame(() => {
            if (movedIndex < moveUptoIndex) {
              flappyBird.moveUp(1);
              movedIndex++;
              animateUp();
            }
          });

          resolve("true");
        });
      }
      await animateUp();

      initialVelocity = 0;
      moveDown();
    }
  });

  //obstacles
  let obstacleArrays = [new Obstacle()];
  let obstacleId = setInterval(() => {
    obstacleArrays.push(new Obstacle());
  }, 5000);

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
  let highScore = 0;

  highScore = getHighscore();

  let scoreElement = document.createElement("div");
  function createScoreElement() {
    scoreElement.innerHTML = `<h1>HighScore:${highScore}</h1><br><h2>Score:${score}</h2>`;
    scoreElement.style.color = "green";
    scoreElement.style.textAlign = "center";
    scoreElement.style.position = "absolute";
    scoreElement.style.left = "calc(50% - 100px)";
    scoreElement.style.top = "0px";
    document
      .getElementsByClassName("background-container")[0]
      .appendChild(scoreElement);
  }
  createScoreElement();

  function changeScore(score) {
    scoreElement.innerHTML = `<h1>HighScore:${highScore}</h1><br><h2>Score:${score}</h2>`;
  }

  function moveObstacle() {
    requestAnimationFrame(() => {
      obstacleArrays.forEach((obstacle) => {
        collide = checkCollision(flappyBird, obstacle);
        if (collide || flappyBird.checkGroundTouch()) {
          gameOverState = true;
        } else {
          obstacle.move();

          if (obstacle.checkOutView()) {
            let shiftedElement = obstacleArrays.shift();
            shiftedElement.deleteElement();
            delete shiftedElement;
            score += 1;
            changeScore(score);
            if (score >= highScore) {
              setHighscore(score);
              highScore = score;
            }
          }
        }
      });
      if (gameOverState) {
        gameOver();
      } else {
        moveObstacle();
      }
    });
  }
  if (!collide || flappyBird.checkgroundTouch()) moveObstacle();
  else {
    gameOver();
  }
  function gameOver() {
    clearInterval(obstacleId);
    clearInterval(wingIntervalId);
    let gameOverText = document.createElement("div");
    gameOverText.innerHTML = `<h1>Game Over</h1><br><p>Your Score:${score}<br><h2>Click to Try again</h2>`;
    gameOverText.id = "game-over";
    gameOverText.style.height = "100%";
    gameOverText.style.width = "100%";
    gameOverText.style.textAlign = "center";
    gameOverText.style.position = "absolute";
    gameOverText.style.backgroundColor = "rgb(0,0,0,0.8)";
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

let playElement = document.createElement("div");
playElement.innerHTML = "<h1>Click to play</h1>";
playElement.style.textAlign = "center";
playElement.style.height = "100vh";
playElement.style.width = "100%";
playElement.style.position = "absolute";
playElement.style.paddingTop = "300px";
playElement.addEventListener("click", () => {
  playElement.remove();
  playGame();
});
document
  .getElementsByClassName("background-container")[0]
  .appendChild(playElement);
