function getRandomNumber(min, max) {
  return `${Math.floor(Math.random() * (min - max)) + min}`;
}

function toPixel(number) {
  return `${number}px`;
}

function getHighscore() {
  let highScore = localStorage.getItem("highscore");
  if (highScore) {
    return parseInt(highScore);
  } else {
    return 0;
  }
}
function setHighscore(highScore) {
  localStorage.setItem("highscore", highScore);
}
