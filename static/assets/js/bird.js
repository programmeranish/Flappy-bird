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
    this.bird.src = "/static/assets/images/bird0.png";
    this.backgroundContainer.appendChild(this.bird);
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
  moveUp(moveUpNumber = 100) {
    let birdPosition = parseInt(window.getComputedStyle(this.bird).top);
    moveUpNumber = birdPosition - moveUpNumber;
    if (moveUpNumber < 0) {
      moveUpNumber = 0;
    }
    this.bird.style.bottom = "";
    this.bird.style.top = toPixel(moveUpNumber);
  }
  animateWings(wingIndex) {
    this.bird.src = `/static/assets/images/bird${wingIndex}.png`;
  }
}
