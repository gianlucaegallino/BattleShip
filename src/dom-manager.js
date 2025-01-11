class DomManager {
  constructor() {
    this.CURR_GRID = document.querySelector(".grid");
    this.OPP_GRID = document.querySelector(".gridEnemy");
    this.CURR_NAME = document.querySelector(".name1");
    this.OPP_NAME = document.querySelector(".name2");
    this.STARTBTN = document.querySelector(".start");
  }

  renderCurrBoard(player) {
    this.CURR_GRID.innerHTML = "";
    for (let i = 0; i < 10; i++) {
      //Creates Rows
      let row = document.createElement("div");
      row.setAttribute("class", "row");

      for (let j = 0; j < 10; j++) {
        //Creates Squares, and adds any special conditions.
        let square = document.createElement("div");
        this.addSpecialEffects(square, player.board.cells[i][j]);
        row.appendChild(square);
      }

      this.CURR_GRID.appendChild(row);
    }
  }

  renderEnemyBoard(enemy) {
    this.OPP_GRID.innerHTML = "";
    for (let i = 0; i < 10; i++) {
      //Creates Rows
      let row = document.createElement("div");
      row.setAttribute("class", "row");

      for (let j = 0; j < 10; j++) {
        //Creates Squares, and adds any special conditions.
        let square = document.createElement("div");
        square.setAttribute("data-row", i);
        square.setAttribute("data-col", j);
        this.addEnemyEffects(square, enemy.board.cells[i][j]);
        row.appendChild(square);
      }

      this.OPP_GRID.appendChild(row);
    }
  }

  renderEnemyChange(enemy, row, col) {
    let square = document.querySelector(`[data-row="${row}"][data-col="${col}"]`)
    this.addEnemyEffects(square, enemy.board.cells[row][col]);
  }

  addSpecialEffects(element, cell) {
    if (cell == "hit") {
      element.setAttribute("class", "square hit");
    } else if (cell == "miss") {
      element.setAttribute("class", "square miss");
    } else if (cell == null) {
      element.setAttribute("class", "square");
    } else {
      element.setAttribute("class", "square ship");
    }
  }

  addEnemyEffects(element, cell) {
    if (cell == "hit") {
      element.setAttribute("class", "squareEnemy hit");
    } else if (cell == "miss") {
      element.setAttribute("class", "squareEnemy miss");
    } else {
      element.setAttribute("class", "squareEnemy water");
    }
  }
}

export { DomManager };
