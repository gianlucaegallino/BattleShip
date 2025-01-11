import { Gameboard } from "./gameboard"

class Player{
    constructor(name = "Computer", isBot = true){
        this.name = name;
        this.isBot = isBot;
        this.board = new Gameboard();
    }
}

export {Player}