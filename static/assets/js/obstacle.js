class Obstacle {
  constructor(width = 150, gap = 250) {
    this.width = width;
    this.gap = gap;
    this.createPipe();
  }

  createPipe() {
    this.backgroundContainer = document.getElementsByClassName(
      "background-container"
    )[0];
    this.pipe1 = document.createElement("img");
    this.pipe2 = document.createElement("img");
    this.pipe1.style.width = toPixel(this.width);
    this.pipe1.style.height = "100%";
    this.pipe1.style.position = "absolute";
    this.pipe1.src = "./assets/images/greenPiperotate.png";
    this.pipe2.style.width = toPixel(this.width);
    this.pipe2.style.height = "100%";
    this.pipe2.style.position = "absolute";
    this.pipe2.src = "./assets/images/greenPipe.png";

    this.pipe1.style.left = "100vw";
    this.pipe2.style.left = "100vw";

    let randomPipePosition = getRandomNumber(400, 100);
    this.pipe1.style.bottom = toPixel(randomPipePosition);
    this.pipe1.bottomPosition = randomPipePosition;
    let pipe2TopPosition = window.innerHeight - randomPipePosition + this.gap;
    this.pipe2.style.top = toPixel(pipe2TopPosition);
    this.pipe2.topPosition = pipe2TopPosition;

    this.backgroundContainer.appendChild(this.pipe1);
    this.backgroundContainer.appendChild(this.pipe2);
  }
  move(moveNumber = 2) {
    let currentPosition = parseInt(window.getComputedStyle(this.pipe1).left);
    moveNumber = currentPosition - moveNumber;
    this.pipe1.style.left = toPixel(moveNumber);
    this.pipe2.style.left = toPixel(moveNumber);
  }
  checkOutView() {
    let position = parseInt(window.getComputedStyle(this.pipe1).left);
    if (position < 0 - this.width) {
      return true;
    } else {
      return false;
    }
  }
  deleteElement() {
    this.pipe1.remove();
    this.pipe2.remove();
  }
}
