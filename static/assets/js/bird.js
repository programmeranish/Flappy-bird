class Bird {
  constructor(height = 50, width = 50) {
    this.createBird(height, width);
  }
  createBird(birdHeight, birdWidth) {
    this.backgroundContainer = document.getElementsByClassName(
      "background-container"
    )[0];
    this.bird = document.createElement("img");
    this.bird.style.height = toPixel(birdHeight);
    this.bird.style.width = toPixel(birdWidth);
    this.bird.style.position = "absolute";
    this.bird.style.left = "0px";
    this.bottomPosition = 200;
    this.birdHeight = birdHeight;
    this.birdWidth = birdWidth;
    this.bird.src = "./assets/images/bird0.png";
    this.backgroundContainer.appendChild(this.bird);
  }
  moveUp(moveUpNumber = 100) {
    let birdPosition = parseInt(window.getComputedStyle(this.bird).top);

    moveUpNumber = birdPosition - moveUpNumber;
    if (moveUpNumber < 0) {
      moveUpNumber = 0;
    }
    this.bird.style.bottom = "";
    this.bird.style.top = toPixel(moveUpNumber);
  }
  moveDown(moveDownNumber = 5) {
    let birdBottomPosition = parseInt(
      window.getComputedStyle(this.bird).bottom
    );
    moveDownNumber = birdBottomPosition - moveDownNumber;
    if (moveDownNumber < 0) {
      moveDownNumber = 0;
    }
    this.bird.style.top = "";
    this.bottomPosition = moveDownNumber;
    this.bird.style.bottom = toPixel(moveDownNumber);
  }
  faceUp() {
    this.bird.style.transform = "rotate(-30deg)";
  }
  faceDown() {
    this.bird.style.transform = "rotate(60deg)";
  }

  resetRotateBird() {
    this.bird.style.transform = "";
  }

  animateWings(wingIndex) {
    this.bird.src = `./assets/images/bird${wingIndex}.png`;
  }

  checkGroundTouch() {
    if (this.bottomPosition <= 0) {
      return true;
    } else {
      return false;
    }
  }
}
