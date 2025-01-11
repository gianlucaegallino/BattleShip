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

    //create ship
    let length = this.coordinateDistance(start, end);
    if (length === 0) return false;

    let ship = new Ship(length);

    //set spaces to ship
    let coords = this.getCoordinates(start, end);

    coords.forEach((coord) => {
      this.cells[coord[0]][coord[1]] = ship;
    });

    return true;
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
      coordinate[0] > 10 ||
      coordinate[1] < 0 ||
      coordinate[1] > 10
    )
      return false;
    return true;
  }

  isInline(a, b) {
    //the points arent in line
    if (a[0] != b[0] && a[1] != b[1]) return false;
    return true;
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
