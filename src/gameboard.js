import { Ship } from "./ship";
class Gameboard {
  constructor() {
    this.cells = [];
    for (let i = 0; i < 10; i++) {
      const row = [];
      for (let j = 0; j < 10; j++) {
        row.push(null);
      }
      this.cells.push(row);
    }
  }

  placeShip(start, end) {
    //verify position validity
    if (!this.isValid(start) || !this.isValid(end)) return false;
    if (!this.isInline(start, end)) return false;
    if (this.isOccupied(start, end)) return false;

    //create ship
    let length = this.coordinateDistance(start, end);
    if (length === 0) return false;

    let ship = new Ship(length);

    //set spaces to ship
    let coords = this.getCoordinates(start, end);

    for (let i = 0; i < coords.length; i++) {
      this.cells[coords[i][0]][coords[i][1]] = ship;
    }

    return true;
  }

  placeRandomShips(Ships) {
    //for the amount of ships to be placed

    let placedships = 0;
    let startCoord;
    let endCoord;

    while (placedships < Ships.length) {
      let len = Ships[placedships]
      //pick an axis
      let axis = this.getRandomInt(2) == 0 ? "hor" : "vert";
      //pick increasing or decreasing
      let increasing = this.getRandomInt(2) == 0 ? "true" : "false";
      //pick a row / column
      let base = this.getRandomInt(10);
      //pick a starting point
      let start = this.getRandomInt(10);

      if (axis === "hor") {
        startCoord = [base, start];
        if (increasing) {
          endCoord = [base, start + (len - 1)];
        } else {
          endCoord = [base, start - (len - 1)];
        }
      } else {
        startCoord = [start, base];
        if (increasing) {
          endCoord = [start + (len - 1), base];
        } else {
          endCoord = [start - (len - 1), base];
        }
      }

      if (this.placeShip(startCoord, endCoord) === true) {
        placedships++;
      }
    }
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  getCoordinates(a, b) {
    let list = [];
    let biggest, smallest;
    //find out if vertical or horizontal
    if (a[0] == b[0]) {
      biggest = Math.max(a[1], b[1]);
      smallest = Math.min(a[1], b[1]);

      for (let i = smallest; i <= biggest; i++) {
        list.push([a[0], i]);
      }
    } else if (a[1] === b[1]) {
      biggest = Math.max(a[0], b[0]);
      smallest = Math.min(a[0], b[0]);

      for (let i = smallest; i <= biggest; i++) {
        list.push([i, a[1]]);
      }
    }
    
    return list;
  }

  isValid(coordinate) {
    if (
      coordinate[0] < 0 ||
      coordinate[0] > 9 ||
      coordinate[1] < 0 ||
      coordinate[1] > 9
    )
      return false;
    return true;
  }

  isInline(a, b) {
    //the points arent in line
    if (a[0] != b[0] && a[1] != b[1]) return false;
    return true;
  }

  isOccupied(a, b) {
    let coords = this.getCoordinates(a, b);
    for (let i = 0; i < coords.length; i++) {
      if (this.cells[coords[i][0]][coords[i][1]] != null) return true;
    }
    return false;
  }

  coordinateDistance(start, end) {
    return Math.abs(start[0] - end[0]) + Math.abs(start[1] - end[1]) + 1;
  }

  recieveAttack(hor, vert) {
    let cell = this.cells[hor][vert];

    //handle same-spot attack by returning null
    if (cell == "hit" || cell == "miss") return null;

    //handle missed attack
    if (cell === null) {
      this.cells[hor][vert] = "miss";
    } else {
      //handle correct attack
      this.cells[hor][vert].hit();
      this.cells[hor][vert] = "hit";
    }
    return this.cells[hor][vert];
  }

  areAllShipsSunk() {
    let size = this.cells.length;
    //run through all of the squares.
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        let cell = this.cells[i][j];
        if (cell != "hit" && cell != "miss" && cell != null) {
          return false;
        }
      }
    }
    return true;
  }
}

export { Gameboard };
