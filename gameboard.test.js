import { Gameboard } from "./gameboard";

it("returnsValue", () => {
  let brd = new Gameboard();
  expect(brd.placeShip([1, 1], [1, 3])).toBe(true);
});

it("handlesInvalidLocation", () => {
  let brd = new Gameboard();
  expect(brd.placeShip([-1, 1], [3, 11])).toBe(false);
});

it("handlesDiagonals", () => {
  let brd = new Gameboard();
  expect(brd.placeShip([1, 1], [3, 3])).toBe(false);
});

it("hasShipStats", () => {
  let brd = new Gameboard();
  brd.placeShip([1, 1], [1, 3]);
  expect(brd.cells[1][1]).not.toBe(null);
});

it("sameShipStats", () => {
  let brd = new Gameboard();
  brd.placeShip([1, 1], [1, 3]);
  expect(JSON.stringify([brd.cells[1][1]])).toBe(
    JSON.stringify([brd.cells[1][3]])
  );
});

it("sameShipDamage", () => {
  let brd = new Gameboard();
  brd.placeShip([1, 1], [1, 3]);
  brd.cells[1][1].hit();
  expect(JSON.stringify([brd.cells[1][1]])).toBe(
    JSON.stringify([brd.cells[1][3]])
  );
});



it("handleHit", ()=>{
  let brd = new Gameboard();
  brd.placeShip([1, 1], [1, 3]);

  expect(brd.recieveAttack(1,2)).toBe("hit")
});

it("handleDoubleHits", ()=>{
  let brd = new Gameboard();
  brd.placeShip([1, 1], [1, 3]);
  brd.recieveAttack(1,1)
  expect(brd.recieveAttack(1,1)).toBe(null)
});

it("handleMiss", ()=>{
  let brd = new Gameboard();
  brd.placeShip([1, 1], [1, 3]);

  expect(brd.recieveAttack(4,4)).toBe("miss")
});

it("shipsSunk", ()=>{
  let brd = new Gameboard();
  brd.placeShip([1, 1], [1, 3]);
  brd.recieveAttack(1,1);
  brd.recieveAttack(1,2);
  brd.recieveAttack(1,3)
  expect(brd.areAllShipsSunk()).toBe(true)
});

it("shipsNotSunk", ()=>{
  let brd = new Gameboard();
  brd.placeShip([1, 1], [1, 3]);
  brd.recieveAttack(1,1);
  brd.recieveAttack(1,2);
  expect(brd.areAllShipsSunk()).toBe(false)
});
