class Ship {
  constructor(length) {
    this.length = length;
    this.hitCount = 0;
    this.sunk = false;
  }

  hit() {
    if (!this.isSunk()) {
      this.hitCount += 1;
    } else this.sunk = true;
  }

  isSunk() {
    return this.hitCount >= this.length;
  }
}

export { Ship };
