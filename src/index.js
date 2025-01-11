import { Ship } from "./ship";
import { Gameboard } from "./gameboard";
import { Player } from "./player";
import { DomManager } from "./dom-manager";

//Import .css
import "./normalize.css";
import "./styles.css";

let startBtn = document.querySelector(".start");
let randomBtn = document.querySelector(".random");
let dom = new DomManager();

  //Create players and initialize boats
let currentPlayer = new Player("Player", false);
currentPlayer.board.placeRandomShips([5,4,3,3,2]);
dom.renderCurrBoard(currentPlayer);
let oppositePlayer = new Player();
oppositePlayer.board.placeRandomShips([5,4,3,3,2]);

randomBtn.addEventListener("click", () => {
    currentPlayer = new Player("Player", false);
    dom.renderEnemyBoard(oppositePlayer);
    currentPlayer.board.placeRandomShips([5,4,3,3,2]);
    dom.renderCurrBoard(currentPlayer);
})

startBtn.addEventListener("click", () => {

  //render boards.
  dom.renderCurrBoard(currentPlayer);
  dom.renderEnemyBoard(oppositePlayer);

  //Add water box listener
  let waterlist = document.querySelectorAll(".water");

  waterlist.forEach((box) => {
    box.addEventListener("click", () => {
      let row = box.getAttribute("data-row");
      let col = box.getAttribute("data-col");
      //check if the water box is a hit or not. add corresponding class
      if (oppositePlayer.board.recieveAttack(row, col) != null) {
        //re-render enemy screen (at this point, check if listeners have to be readded, or if the now non-water boxes still trigger.)
        dom.renderEnemyChange(oppositePlayer, row, col);

        //bot will make a move.
        //selects a location
        let rowToShoot = Math.floor(Math.random()*10);
        let colToShoot = Math.floor(Math.random()*10); 

        //shoots until a valid shot is gotten
        while (currentPlayer.board.recieveAttack(rowToShoot, colToShoot) == null){
            rowToShoot = Math.floor(Math.random()*10);
            colToShoot = Math.floor(Math.random()*10); 
        }

        //re-render my own board.
        dom.renderCurrBoard(currentPlayer);

        //checks for any win conditions
        let hasCurrentLost = currentPlayer.board.areAllShipsSunk();
        let hasEnemyLost = oppositePlayer.board.areAllShipsSunk();

        if (hasCurrentLost || hasEnemyLost) {
            let message = (hasEnemyLost) ? "You win! You saved the world, congratulations <3" : "The automatons have defeated you, and humanity has turned into dust.";
            alert(message)

            dom.renderCurrBoard(currentPlayer);
            dom.renderEnemyBoard(oppositePlayer);

            //prepares for a next match, in case no random button is pressed
            currentPlayer = new Player("Player", false);
            currentPlayer.board.placeRandomShips([5,4,3,3,2]);
            oppositePlayer = new Player();
            oppositePlayer.board.placeRandomShips([5,4,3,3,2]);
        }
      } else {
        alert("You already made this move! Try again.");
      }
    });
  });
});
