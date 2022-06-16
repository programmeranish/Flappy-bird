function getRandomNumber(min, max) {
  return `${Math.floor(Math.random() * (min - max)) + min}`;
}

function toPixel(number) {
  return `${number}px`;
}
