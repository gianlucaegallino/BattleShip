import { Ship } from "./ship";

it("registers", () => {
  expect(new Ship(2).hitCount).toBe(0);
});

it("registershot", () => {
  let ship = new Ship(2);
  ship.hit();
  expect(ship.hitCount).toBe(1);
});

it("registerdeath", () => {
    let ship = new Ship(2);
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.sunk).toBe(true);
  });

it("returnsValue", ()=>{
    let ship = new Ship(2);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
})


it("returnsValue", ()=>{
    let ship = new Ship(2);

    expect(ship.isSunk()).toBe(false);
})