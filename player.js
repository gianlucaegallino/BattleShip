import { Gameboard } from "./gameboard"

class Player{
    constructor(isBot = true){
        this.isBot = isBot;
        this.normalBoard = new Gameboard();
        this.enemyBoard = new Gameboard();
    }
}

export {Player}