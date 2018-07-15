/*Copyright 2018 Janos Klieber, Roberts Kolosovs, Peter Spieler
This file is part of Phoenixclient.

Phoenixclient is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Phoenixclient is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Phoenixclient.  If not, see <http://www.gnu.org/licenses/>.*/

import { GameState } from "../../gameState";
import { FootArmy } from "../../armies/footArmy";
import { FieldType, Field } from "../../map/field";
import { Move } from "../../armies/move";
import { Direction } from "../../map/direction";
import { NonDestructibleBuilding } from "../../buildings/nonDestructibleBuilding";
import { BuildingType } from "../../buildings/building";
import { Fleet } from "../../armies/fleet";

const test  = QUnit.test;

export function footMovementTests() {
    test("Lowlands -> lowlands (nw direction)", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0,
            0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS),
        new Field([1, 0], FieldType.DEEPSEA), new Field([1, 1], FieldType.SHALLOWS),
        new Field([0, 1], FieldType.DEEPSEA), new Field([-1, 0], FieldType.DEEPSEA),
        new Field([0, -1], FieldType.LOWLANDS), new Field([1, -1], FieldType.DEEPSEA)];
        army.clickedMoves();
        t.movePossible(army.possibleMoves,
            new Move(7, 0, false, false, [0, -1], Direction.NW));
    });

    test("Lowlands -> lowlands on street (ne direction)", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0,
            0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS),
        new Field([1, 0], FieldType.DEEPSEA), new Field([1, 1], FieldType.DEEPSEA),
        new Field([0, 1], FieldType.DEEPSEA), new Field([-1, 0], FieldType.DEEPSEA),
        new Field([0, -1], FieldType.DEEPSEA), new Field([1, -1], FieldType.LOWLANDS)];
        GameState.buildings = [
            new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [1, -1], GameState.realms[0])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves,
            new Move(4, 0, false, false, [1, -1], Direction.NE));
    });

    test("Lowlands -> lowlands in homeland (e direction)", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0,
            0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS),
        new Field([1, 0], FieldType.LOWLANDS), new Field([1, 1], FieldType.DEEPSEA),
        new Field([0, 1], FieldType.DEEPSEA), new Field([-1, 0], FieldType.DEEPSEA),
        new Field([0, -1], FieldType.DEEPSEA), new Field([1, -1], FieldType.DEEPSEA)];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 1 && field.coordinates[1] === 0);
        army.clickedMoves();
        t.movePossible(army.possibleMoves,
            new Move(4, 0, false, false, [1, 0], Direction.E));
    });
    
    test("Lowlands -> lowlands on street in homeland (se direction)", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS),
        new Field([1, 0], FieldType.DEEPSEA), new Field([1, 1], FieldType.LOWLANDS),
        new Field([0, 1], FieldType.DEEPSEA), new Field([-1, 0], FieldType.DEEPSEA),
        new Field([0, -1], FieldType.DEEPSEA), new Field([1, -1], FieldType.DEEPSEA)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [1, 1], [0, 0], GameState.realms[0])];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 1 && field.coordinates[1] === 0);
        army.clickedMoves();
        t.movePossible(army.possibleMoves,
            new Move(3, 0, false, false, [1, 1], Direction.SE));
    });
    
    test("Lowlands -> desert (sw direction)", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS),
        new Field([1, 0], FieldType.DEEPSEA), new Field([1, 1], FieldType.DEEPSEA),
        new Field([0, 1], FieldType.DESERT), new Field([-1, 0], FieldType.DEEPSEA),
        new Field([0, -1], FieldType.DEEPSEA), new Field([1, -1], FieldType.DEEPSEA)];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(7, 0, false, false, [0, 1], Direction.SW));
    });
    
    test("Lowlands -> desert on street (w direction)", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS),
        new Field([1, 0], FieldType.DEEPSEA), new Field([1, 1], FieldType.DEEPSEA),
        new Field([0, 1], FieldType.DEEPSEA), new Field([-1, 0], FieldType.DESERT),
        new Field([0, -1], FieldType.DEEPSEA), new Field([1, -1], FieldType.DEEPSEA)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [-1, 0], [0, 0], GameState.realms[0])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 0, false, false, [-1, 0], Direction.W));
    });
    
    test("Lowlands -> desert in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, -1], FieldType.DESERT)];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 0, false, false, [0, -1], Direction.NW));
    });
    
    test("Lowlands -> desert on street in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, -1], FieldType.DESERT)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(3, 0, false, false, [0, -1], Direction.NW));
    });
    
    test("Lowlands -> woods", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, -1], FieldType.WOODS)];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(7, 0, false, false, [0, -1], Direction.NW));
    });
    
    test("Lowlands -> woods on street", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, -1], FieldType.WOODS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 0, false, false, [0, -1], Direction.NW));
    });
    
    test("Lowlands -> woods in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, -1], FieldType.WOODS)];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 0, false, false, [0, -1], Direction.NW));
    });
    
    test("Lowlands -> woods on street in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, -1], FieldType.WOODS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(3, 0, false, false, [0, -1], Direction.NW));
    });
    
    test("Lowlands -> swamp", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, -1], FieldType.SWAMP)];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(7, 0, false, false, [0, -1], Direction.NW));
    });
    
    test("Lowlands -> swamp on street", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, -1], FieldType.SWAMP)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 0, false, false, [0, -1], Direction.NW));
    });
    
    test("Lowlands -> swamp in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, -1], FieldType.SWAMP)];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 0, false, false, [0, -1], Direction.NW));
    });
    
    test("Lowlands -> swamp on street in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, -1], FieldType.SWAMP)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(3, 0, false, false, [0, -1], Direction.NW));
    });
    
    test("Lowlands -> hills", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, -1], FieldType.HILLS)];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(7, 2, false, false, [0, -1], Direction.NW));
    });
    
    test("Lowlands -> hills on street", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, -1], FieldType.HILLS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 1, false, false, [0, -1], Direction.NW));
    });
    
    test("Lowlands -> hills in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, -1], FieldType.HILLS)];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 2, false, false, [0, -1], Direction.NW));
    });
    
    test("Lowlands -> hills on street in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, -1], FieldType.HILLS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(3, 1, false, false, [0, -1], Direction.NW));
    });
    
    test("Lowlands -> highlands", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, -1], FieldType.HIGHLANDS)];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    
    test("Lowlands -> mountains", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, -1], FieldType.MOUNTAINS)];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    
    test("Lowlands -> shallows", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, -1], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, -1], FieldType.SHALLOWS)];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(0, 2, true, false, [0, -1], Direction.NW));
    });
    
    test("Lowlands -> shallows with harbor", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, -1], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, -1], FieldType.SHALLOWS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.HARBOR, [0, 0], [0, -1], GameState.realms[0])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(0, 1, true, false, [0, -1], Direction.NW));
    });
    
    test("Lowlands -> deepsea", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, -1], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, -1], FieldType.DEEPSEA)];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(0, 2, true, false, [0, -1], Direction.NW));
    });
    
    test("Lowlands -> deepsea with harbor", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, -1], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, -1], FieldType.DEEPSEA)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.HARBOR, [0, 0], [0, -1], GameState.realms[0])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(0, 1, true, false, [0, -1], Direction.NW));
    });
    
    test("Desert -> lowlands", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.DESERT), new Field([0, -1], FieldType.LOWLANDS)];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(7, 0, true, false, [0, -1], Direction.NW));
    });
    
    test("Desert -> lowlands on street", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.DESERT), new Field([0, -1], FieldType.LOWLANDS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 0, false, false, [0, -1], Direction.NW));
    });
    
    test("Desert -> lowlands in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.DESERT), new Field([0, -1], FieldType.LOWLANDS)];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 0, false, false, [0, -1], Direction.NW));
    });
    
    test("Desert -> lowlands on street in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.DESERT), new Field([0, -1], FieldType.LOWLANDS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(3, 0, false, false, [0, -1], Direction.NW));
    });
    
    test("Desert -> desert", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.DESERT), new Field([0, -1], FieldType.DESERT)];

        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(7, 0, true, false, [0, -1], Direction.NW));
    });
    
    test("Desert -> desert on street", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.DESERT), new Field([0, -1], FieldType.DESERT)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 0, false, false, [0, -1], Direction.NW));
    });
    
    test("Desert -> desert in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.DESERT), new Field([0, -1], FieldType.DESERT)];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 0, false, false, [0, -1], Direction.NW));
    });
    
    test("Desert -> desert on street in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.DESERT), new Field([0, -1], FieldType.DESERT)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(3, 0, false, false, [0, -1], Direction.NW));
    });
    
    test("Desert -> woods", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.DESERT), new Field([0, -1], FieldType.WOODS)];

        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(7, 0, true, false, [0, -1], Direction.NW));
    });
    
    test("Desert -> woods on street", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.DESERT), new Field([0, -1], FieldType.WOODS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 0, false, false, [0, -1], Direction.NW));
    });
    
    test("Desert -> woods in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.DESERT), new Field([0, -1], FieldType.WOODS)];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 0, false, false, [0, -1], Direction.NW));
    });
    
    test("Desert -> woods on street in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.DESERT), new Field([0, -1], FieldType.WOODS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(3, 0, false, false, [0, -1], Direction.NW));
    });
    
    test("Desert -> swamp", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.DESERT), new Field([0, -1], FieldType.SWAMP)];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(7, 0, true, false, [0, -1], Direction.NW));
    });
    
    test("Desert -> swamp on street", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.DESERT), new Field([0, -1], FieldType.SWAMP)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 0, false, false, [0, -1], Direction.NW));
    });
    
    test("Desert -> swamp in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.DESERT), new Field([0, -1], FieldType.SWAMP)];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 0, false, false, [0, -1], Direction.NW));
    });
    
    test("Desert -> swamp on street in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.DESERT), new Field([0, -1], FieldType.SWAMP)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(3, 0, false, false, [0, -1], Direction.NW));
    });
    
    test("Desert -> hills", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.DESERT), new Field([0, -1], FieldType.HILLS)];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(7, 2, false, false, [0, -1], Direction.NW));
    });
    
    test("Desert -> hills on street", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.DESERT), new Field([0, -1], FieldType.HILLS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 1, false, false, [0, -1], Direction.NW));
    });
    
    test("Desert -> hills in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.DESERT), new Field([0, -1], FieldType.HILLS)];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 2, false, false, [0, -1], Direction.NW));
    });
    
    test("Desert -> hills on street in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.DESERT), new Field([0, -1], FieldType.HILLS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(3, 1, false, false, [0, -1], Direction.NW));
    });
    
    test("Desert -> highlands", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.DESERT), new Field([0, -1], FieldType.HIGHLANDS)];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    
    test("Desert -> mountains", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.DESERT), new Field([0, -1], FieldType.MOUNTAINS)];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    
    test("Desert -> shallows", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, -1], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        GameState.fields = [new Field([0, 0], FieldType.DESERT), new Field([0, -1], FieldType.SHALLOWS)];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(0, 2, true, false, [0, -1], Direction.NW));
    });
    
    test("Desert -> shallows with harbor", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, -1], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        GameState.fields = [new Field([0, 0], FieldType.DESERT), new Field([0, -1], FieldType.SHALLOWS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.HARBOR, [0, 0], [0, -1], GameState.realms[0])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(0, 1, true, false, [0, -1], Direction.NW));
    });
    
    test("Desert -> deepsea", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, -1], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        GameState.fields = [new Field([0, 0], FieldType.DESERT), new Field([0, -1], FieldType.DEEPSEA)];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(0, 2, true, false, [0, -1], Direction.NW));
    });
    
    test("Desert -> deepsea with harbor", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, -1], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        GameState.fields = [new Field([0, 0], FieldType.DESERT), new Field([0, -1], FieldType.DEEPSEA)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.HARBOR, [0, 0], [0, -1], GameState.realms[0])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(0, 1, true, false, [0, -1], Direction.NW));
    });
    
    test("Woods -> lowlands", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.WOODS), new Field([0, -1], FieldType.LOWLANDS)];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(7, 0, true, false, [0, -1], Direction.NW));
    });
    
    test("Woods -> lowlands on street", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.WOODS), new Field([0, -1], FieldType.LOWLANDS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 0, false, false, [0, -1], Direction.NW));
    });
    
    test("Woods -> lowlands in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.WOODS), new Field([0, -1], FieldType.LOWLANDS)];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 0, false, false, [0, -1], Direction.NW));
    });
    
    test("Woods -> lowlands on street in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.WOODS), new Field([0, -1], FieldType.LOWLANDS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(3, 0, false, false, [0, -1], Direction.NW));
    });
    
    test("Woods -> desert", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.WOODS), new Field([0, -1], FieldType.DESERT)];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(7, 0, true, false, [0, -1], Direction.NW));
    });
    
    test("Woods -> desert on street", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.WOODS), new Field([0, -1], FieldType.DESERT)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 0, false, false, [0, -1], Direction.NW));
    });
    
    test("Woods -> desert in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.WOODS), new Field([0, -1], FieldType.DESERT)];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 0, false, false, [0, -1], Direction.NW));
    });
    
    test("Woods -> desert on street in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.WOODS), new Field([0, -1], FieldType.DESERT)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(3, 0, false, false, [0, -1], Direction.NW));
    });
    
    test("Woods -> woods", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.WOODS), new Field([0, -1], FieldType.WOODS)];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(7, 0, true, false, [0, -1], Direction.NW));
    });
    
    test("Woods -> woods on street", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.WOODS), new Field([0, -1], FieldType.WOODS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 0, false, false, [0, -1], Direction.NW));
    });
    
    test("Woods -> woods in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.WOODS), new Field([0, -1], FieldType.WOODS)];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 0, false, false, [0, -1], Direction.NW));
    });
    
    test("Woods -> woods on street in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.WOODS), new Field([0, -1], FieldType.WOODS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(3, 0, false, false, [0, -1], Direction.NW));
    });
    
    test("Woods -> swamp", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.WOODS), new Field([0, -1], FieldType.SWAMP)];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(7, 0, true, false, [0, -1], Direction.NW));
    });
    
    test("Woods -> swamp on street", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.WOODS), new Field([0, -1], FieldType.SWAMP)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 0, false, false, [0, -1], Direction.NW));
    });
    
    test("Woods -> swamp in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.WOODS), new Field([0, -1], FieldType.SWAMP)];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 0, false, false, [0, -1], Direction.NW));
    });
    
    test("Woods -> swamp on street in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.WOODS), new Field([0, -1], FieldType.SWAMP)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(3, 0, false, false, [0, -1], Direction.NW));
    });
    
    test("Woods -> hills", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.WOODS), new Field([0, -1], FieldType.HILLS)];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(7, 2, false, false, [0, -1], Direction.NW));
    });
    
    test("Woods -> hills on street", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.WOODS), new Field([0, -1], FieldType.HILLS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 1, false, false, [0, -1], Direction.NW));
    });
    
    test("Woods -> hills in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.WOODS), new Field([0, -1], FieldType.HILLS)];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 2, false, false, [0, -1], Direction.NW));
    });
    
    test("Woods -> hills on street in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.WOODS), new Field([0, -1], FieldType.HILLS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(3, 1, false, false, [0, -1], Direction.NW));
    });
    
    test("Woods -> highlands", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.WOODS), new Field([0, -1], FieldType.HIGHLANDS)];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    
    test("Woods -> mountains", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.WOODS), new Field([0, -1], FieldType.MOUNTAINS)];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    
    test("Woods -> shallows", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, -1], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        GameState.fields = [new Field([0, 0], FieldType.WOODS), new Field([0, -1], FieldType.SHALLOWS)];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(0, 2, true, false, [0, -1], Direction.NW));
    });
    
    test("Woods -> shallows with harbor", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, -1], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        GameState.fields = [new Field([0, 0], FieldType.WOODS), new Field([0, -1], FieldType.SHALLOWS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.HARBOR, [0, 0], [0, -1], GameState.realms[0])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(0, 1, true, false, [0, -1], Direction.NW));
    });
    
    test("Woods -> deepsea", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, -1], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        GameState.fields = [new Field([0, 0], FieldType.WOODS), new Field([0, -1], FieldType.DEEPSEA)];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(0, 2, true, false, [0, -1], Direction.NW));
    });
    
    test("Woods -> deepsea with harbor", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, -1], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        GameState.fields = [new Field([0, 0], FieldType.WOODS), new Field([0, -1], FieldType.DEEPSEA)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.HARBOR, [0, 0], [0, -1], GameState.realms[0])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(0, 1, true, false, [0, -1], Direction.NW));
    });
    
    test("Swamp -> lowlands", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.SWAMP), new Field([0, -1], FieldType.LOWLANDS)];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(7, 0, true, false, [0, -1], Direction.NW));
    });
    
    test("Swamp -> lowlands on street", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.SWAMP), new Field([0, -1], FieldType.LOWLANDS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 0, false, false, [0, -1], Direction.NW));
    });
    
    test("Swamp -> lowlands in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.SWAMP), new Field([0, -1], FieldType.LOWLANDS)];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 0, false, false, [0, -1], Direction.NW));
    });
    
    test("Swamp -> lowlands on street in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.SWAMP), new Field([0, -1], FieldType.LOWLANDS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(3, 0, false, false, [0, -1], Direction.NW));
    });
    
    test("Swamp -> desert", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.SWAMP), new Field([0, -1], FieldType.DESERT)];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(7, 0, true, false, [0, -1], Direction.NW));
    });
    
    test("Swamp -> desert on street", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.SWAMP), new Field([0, -1], FieldType.DESERT)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 0, false, false, [0, -1], Direction.NW));
    });
    
    test("Swamp -> desert in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.SWAMP), new Field([0, -1], FieldType.DESERT)];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 0, false, false, [0, -1], Direction.NW));
    });
    
    test("Swamp -> desert on street in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.SWAMP), new Field([0, -1], FieldType.DESERT)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(3, 0, false, false, [0, -1], Direction.NW));
    });
    
    test("Swamp -> woods", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.SWAMP), new Field([0, -1], FieldType.WOODS)];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(7, 0, true, false, [0, -1], Direction.NW));
    });
    
    test("Swamp -> woods on street", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.SWAMP), new Field([0, -1], FieldType.WOODS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 0, false, false, [0, -1], Direction.NW));
    });
    
    test("Swamp -> woods in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.SWAMP), new Field([0, -1], FieldType.WOODS)];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 0, false, false, [0, -1], Direction.NW));
    });
    
    test("Swamp -> woods on street in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.SWAMP), new Field([0, -1], FieldType.WOODS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(3, 0, false, false, [0, -1], Direction.NW));
    });
    
    test("Swamp -> swamp", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.SWAMP), new Field([0, -1], FieldType.SWAMP)];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(7, 0, true, false, [0, -1], Direction.NW));
    });
    
    test("Swamp -> swamp on street", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.SWAMP), new Field([0, -1], FieldType.SWAMP)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 0, false, false, [0, -1], Direction.NW));
    });
    
    test("Swamp -> swamp in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.SWAMP), new Field([0, -1], FieldType.SWAMP)];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 0, false, false, [0, -1], Direction.NW));
    });
    
    test("Swamp -> swamp on street in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.SWAMP), new Field([0, -1], FieldType.SWAMP)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(3, 0, false, false, [0, -1], Direction.NW));
    });
    
    test("Swamp -> hills", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.SWAMP), new Field([0, -1], FieldType.HILLS)];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(7, 2, false, false, [0, -1], Direction.NW));
    });
    
    test("Swamp -> hills on street", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.SWAMP), new Field([0, -1], FieldType.HILLS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 1, false, false, [0, -1], Direction.NW));
    });
    
    test("Swamp -> hills in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.SWAMP), new Field([0, -1], FieldType.HILLS)];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 2, false, false, [0, -1], Direction.NW));
    });
    
    test("Swamp -> hills on street in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.SWAMP), new Field([0, -1], FieldType.HILLS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(3, 1, false, false, [0, -1], Direction.NW));
    });
    
    test("Swamp -> highlands", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.SWAMP), new Field([0, -1], FieldType.HIGHLANDS)];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    
    test("Swamp -> mountains", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.SWAMP), new Field([0, -1], FieldType.MOUNTAINS)];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    
    test("Swamp -> shallows", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, -1], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        GameState.fields = [new Field([0, 0], FieldType.SWAMP), new Field([0, -1], FieldType.SHALLOWS)];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(0, 2, true, false, [0, -1], Direction.NW));
    });
    
    test("Swamp -> shallows with harbor", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, -1], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        GameState.fields = [new Field([0, 0], FieldType.SWAMP), new Field([0, -1], FieldType.SHALLOWS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.HARBOR, [0, 0], [0, -1], GameState.realms[0])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(0, 1, true, false, [0, -1], Direction.NW));
    });
    
    test("Swamp -> deepsea", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, -1], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        GameState.fields = [new Field([0, 0], FieldType.SWAMP), new Field([0, -1], FieldType.DEEPSEA)];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(0, 2, true, false, [0, -1], Direction.NW));
    });
    
    test("Swamp -> deepsea with harbor", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, -1], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        GameState.fields = [new Field([0, 0], FieldType.SWAMP), new Field([0, -1], FieldType.DEEPSEA)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.HARBOR, [0, 0], [0, -1], GameState.realms[0])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(0, 1, true, false, [0, -1], Direction.NW));
    });
    
    test("Hills -> lowlands", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.HILLS), new Field([0, -1], FieldType.LOWLANDS)];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(7, 2, false, false, [0, -1], Direction.NW));
    });
    
    test("Hills -> lowlands on street", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.HILLS), new Field([0, -1], FieldType.LOWLANDS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 1, false, false, [0, -1], Direction.NW));
    });
    
    test("Hills -> lowlands in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.HILLS), new Field([0, -1], FieldType.LOWLANDS)];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 2, false, false, [0, -1], Direction.NW));
    });
    
    test("Hills -> lowlands on street in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.HILLS), new Field([0, -1], FieldType.LOWLANDS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(3, 1, false, false, [0, -1], Direction.NW));
    });
    
    test("Hills -> desert", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.HILLS), new Field([0, -1], FieldType.DESERT)];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(7, 2, false, false, [0, -1], Direction.NW));
    });
    
    test("Hills -> desert on street", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.HILLS), new Field([0, -1], FieldType.DESERT)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 1, false, false, [0, -1], Direction.NW));
    });
    
    test("Hills -> desert in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.HILLS), new Field([0, -1], FieldType.DESERT)];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 2, false, false, [0, -1], Direction.NW));
    });
    
    test("Hills -> desert on street in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.HILLS), new Field([0, -1], FieldType.DESERT)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(3, 1, false, false, [0, -1], Direction.NW));
    });
    
    test("Hills -> woods", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.HILLS), new Field([0, -1], FieldType.WOODS)];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(7, 2, false, false, [0, -1], Direction.NW));
    });
    
    test("Hills -> woods on street", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.HILLS), new Field([0, -1], FieldType.WOODS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 1, false, false, [0, -1], Direction.NW));
    });
    
    test("Hills -> woods in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.HILLS), new Field([0, -1], FieldType.WOODS)];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 2, false, false, [0, -1], Direction.NW));
    });
    
    test("Hills -> woods on street in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.HILLS), new Field([0, -1], FieldType.WOODS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(3, 1, false, false, [0, -1], Direction.NW));
    });
    
    test("Hills -> swamp", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.HILLS), new Field([0, -1], FieldType.SWAMP)];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(7, 2, false, false, [0, -1], Direction.NW));
    });
    
    test("Hills -> swamp on street", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.HILLS), new Field([0, -1], FieldType.SWAMP)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 1, false, false, [0, -1], Direction.NW));
    });
    
    test("Hills -> swamp in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.HILLS), new Field([0, -1], FieldType.SWAMP)];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 2, false, false, [0, -1], Direction.NW));
    });

    test("Hills -> swamp on street in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.HILLS), new Field([0, -1], FieldType.SWAMP)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(3, 1, false, false, [0, -1], Direction.NW));
    });

    test("Hills -> hills", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.HILLS), new Field([0, -1], FieldType.HILLS)];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(7, 0, true, false, [0, -1], Direction.NW));
    });

    test("Hills -> hills on street", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.HILLS), new Field([0, -1], FieldType.HILLS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 0, false, false, [0, -1], Direction.NW));
    });

    test("Hills -> hills in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.HILLS), new Field([0, -1], FieldType.HILLS)];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 0, false, false, [0, -1], Direction.NW));
    });

    test("Hills -> hills on street in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.HILLS), new Field([0, -1], FieldType.HILLS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(3, 0, false, false, [0, -1], Direction.NW));
    });

    test("Hills -> highlands", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.HILLS), new Field([0, -1], FieldType.HIGHLANDS)];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(7, 2, false, false, [0, -1], Direction.NW));
    });

    test("Hills -> highlands on street", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.HILLS), new Field([0, -1], FieldType.HIGHLANDS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 1, false, false, [0, -1], Direction.NW));
    });

    test("Hills -> highlands in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.HILLS), new Field([0, -1], FieldType.HIGHLANDS)];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 2, false, false, [0, -1], Direction.NW));
    });

    test("Hills -> highlands on street in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.HILLS), new Field([0, -1], FieldType.HIGHLANDS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(3, 1, false, false, [0, -1], Direction.NW));
    });

    test("Hills -> mountains", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.HILLS), new Field([0, -1], FieldType.MOUNTAINS)];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });

    test("Hills -> shallows", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, -1], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        GameState.fields = [new Field([0, 0], FieldType.HILLS), new Field([0, -1], FieldType.SHALLOWS)];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });

    test("Hills -> deepsea", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, -1], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        GameState.fields = [new Field([0, 0], FieldType.HILLS), new Field([0, -1], FieldType.DEEPSEA)];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });

    test("Highlands -> lowlands", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, -1], FieldType.LOWLANDS)];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });

    test("Highlands -> desert", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, -1], FieldType.DESERT)];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });

    test("Highlands -> woods", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, -1], FieldType.WOODS)];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });

    test("Highlands -> swamp", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, -1], FieldType.SWAMP)];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });

    test("Highlands -> hills", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, -1], FieldType.HILLS)];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(7, 2, false, false, [0, -1], Direction.NW));
    });

    test("Highlands -> hills on street", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, -1], FieldType.HILLS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 1, false, false, [0, -1], Direction.NW));
    });

    test("Highlands -> hills in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, -1], FieldType.HILLS)];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 2, false, false, [0, -1], Direction.NW));
    });

    test("Highlands -> hills on street in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, -1], FieldType.HILLS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(3, 1, false, false, [0, -1], Direction.NW));
    });

    test("Highlands -> highlands", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, -1], FieldType.HIGHLANDS)];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(7, 0, true, false, [0, -1], Direction.NW));
    });

    test("Highlands -> highlands on street", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, -1], FieldType.HIGHLANDS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 0, false, false, [0, -1], Direction.NW));
    });

    test("Highlands -> highlands in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, -1], FieldType.HIGHLANDS)];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 0, false, false, [0, -1], Direction.NW));
    });

    test("Highlands -> highlands on street in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, -1], FieldType.HIGHLANDS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(3, 0, false, false, [0, -1], Direction.NW));
    });

    test("Highlands -> mountains", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, -1], FieldType.MOUNTAINS)];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(7, 2, false, false, [0, -1], Direction.NW));
    });

    test("Highlands -> mountains on street", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, -1], FieldType.MOUNTAINS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 1, false, false, [0, -1], Direction.NW));
    });

    test("Highlands -> mountains in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, -1], FieldType.MOUNTAINS)];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 2, false, false, [0, -1], Direction.NW));
    });

    test("Highlands -> mountains on street in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, -1], FieldType.MOUNTAINS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(3, 1, false, false, [0, -1], Direction.NW));
    });

    test("Highlands -> shallows", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, -1], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, -1], FieldType.SHALLOWS)];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });

    test("Highlands -> deepsea", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, -1], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, -1], FieldType.DEEPSEA)];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });

    test("Mountains -> lowlands", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.MOUNTAINS), new Field([0, -1], FieldType.LOWLANDS)];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });

    test("Mountains -> desert", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.MOUNTAINS), new Field([0, -1], FieldType.DESERT)];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });

    test("Mountains -> woods", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.MOUNTAINS), new Field([0, -1], FieldType.WOODS)];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });

    test("Mountains -> swamp", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.MOUNTAINS), new Field([0, -1], FieldType.SWAMP)];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });

    test("Mountains -> hills", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.MOUNTAINS), new Field([0, -1], FieldType.HILLS)];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });

    test("Mountains -> highlands", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.MOUNTAINS), new Field([0, -1], FieldType.HIGHLANDS)];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(7, 2, false, false, [0, -1], Direction.NW));
    });

    test("Mountains -> highlands on street", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.MOUNTAINS), new Field([0, -1], FieldType.HIGHLANDS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 1, false, false, [0, -1], Direction.NW));
    });

    test("Mountains -> highlands in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.MOUNTAINS), new Field([0, -1], FieldType.HIGHLANDS)];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 2, false, false, [0, -1], Direction.NW));
    });

    test("Mountains -> highlands on street in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.MOUNTAINS), new Field([0, -1], FieldType.HIGHLANDS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(3, 1, false, false, [0, -1], Direction.NW));
    });

    test("Mountains -> mountains", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.MOUNTAINS), new Field([0, -1], FieldType.MOUNTAINS)];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(7, 0, true, false, [0, -1], Direction.NW));
    });

    test("Mountains -> mountains on street", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.MOUNTAINS), new Field([0, -1], FieldType.MOUNTAINS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 0, false, false, [0, -1], Direction.NW));
    });

    test("Mountains -> mountains in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.MOUNTAINS), new Field([0, -1], FieldType.MOUNTAINS)];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 0, false, false, [0, -1], Direction.NW));
    });

    test("Mountains -> mountains on street in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.MOUNTAINS), new Field([0, -1], FieldType.MOUNTAINS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(3, 0, false, false, [0, -1], Direction.NW));
    });

    test("Mountains -> shallows", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, -1], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        GameState.fields = [new Field([0, 0], FieldType.MOUNTAINS), new Field([0, -1], FieldType.SHALLOWS)];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });

    test("Mountains -> deepsea", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        GameState.fields = [new Field([0, 0], FieldType.MOUNTAINS), new Field([0, -1], FieldType.DEEPSEA)];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });

    test("Shallows -> lowlands", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [new Field([0, 0], FieldType.SHALLOWS), new Field([0, -1], FieldType.LOWLANDS)];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(7, 2, false, true, [0, -1], Direction.NW));
    });

    test("Shallows -> lowlands with harbor", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [new Field([0, 0], FieldType.SHALLOWS), new Field([0, -1], FieldType.LOWLANDS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.HARBOR, [0, -1], [0, 0], GameState.realms[0])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(7, 1, false, true, [0, -1], Direction.NW));
    });

    test("Shallows -> lowlands in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [new Field([0, 0], FieldType.SHALLOWS), new Field([0, -1], FieldType.LOWLANDS)];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 2, false, true, [0, -1], Direction.NW));
    });

    test("Shallows -> lowlands with harbor in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [new Field([0, 0], FieldType.SHALLOWS), new Field([0, -1], FieldType.LOWLANDS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.HARBOR, [0, -1], [0, 0], GameState.realms[0])];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 1, false, true, [0, -1], Direction.NW));
    });

    test("Shallows -> desert", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [new Field([0, 0], FieldType.SHALLOWS), new Field([0, -1], FieldType.DESERT)];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(7, 2, false, true, [0, -1], Direction.NW));
    });

    test("Shallows -> desert with harbor", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [new Field([0, 0], FieldType.SHALLOWS), new Field([0, -1], FieldType.DESERT)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.HARBOR, [0, -1], [0, 0], GameState.realms[0])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(7, 1, false, true, [0, -1], Direction.NW));
    });

    test("Shallows -> desert in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [new Field([0, 0], FieldType.SHALLOWS), new Field([0, -1], FieldType.DESERT)];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 2, false, true, [0, -1], Direction.NW));
    });

    test("Shallows -> desert with harbor in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [new Field([0, 0], FieldType.SHALLOWS), new Field([0, -1], FieldType.DESERT)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.HARBOR, [0, -1], [0, 0], GameState.realms[0])];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 1, false, true, [0, -1], Direction.NW));
    });

    test("Shallows -> woods", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [new Field([0, 0], FieldType.SHALLOWS), new Field([0, -1], FieldType.WOODS)];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(7, 2, false, true, [0, -1], Direction.NW));
    });

    test("Shallows -> woods with harbor", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [new Field([0, 0], FieldType.SHALLOWS), new Field([0, -1], FieldType.WOODS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.HARBOR, [0, -1], [0, 0], GameState.realms[0])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(7, 1, false, true, [0, -1], Direction.NW));
    });

    test("Shallows -> woods in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [new Field([0, 0], FieldType.SHALLOWS), new Field([0, -1], FieldType.WOODS)];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 2, false, true, [0, -1], Direction.NW));
    });

    test("Shallows -> woods with harbor in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [new Field([0, 0], FieldType.SHALLOWS), new Field([0, -1], FieldType.WOODS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.HARBOR, [0, -1], [0, 0], GameState.realms[0])];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 1, false, true, [0, -1], Direction.NW));
    });

    test("Shallows -> swamp", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [new Field([0, 0], FieldType.SHALLOWS), new Field([0, -1], FieldType.SWAMP)];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(7, 2, false, true, [0, -1], Direction.NW));
    });

    test("Shallows -> swamp with harbor", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [new Field([0, 0], FieldType.SHALLOWS), new Field([0, -1], FieldType.SWAMP)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.HARBOR, [0, -1], [0, 0], GameState.realms[0])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(7, 1, false, true, [0, -1], Direction.NW));
    });

    test("Shallows -> swamp in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [new Field([0, 0], FieldType.SHALLOWS), new Field([0, -1], FieldType.SWAMP)];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 2, false, true, [0, -1], Direction.NW));
    });

    test("Shallows -> swamp with harbor in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [new Field([0, 0], FieldType.SHALLOWS), new Field([0, -1], FieldType.SWAMP)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.HARBOR, [0, -1], [0, 0], GameState.realms[0])];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 1, false, true, [0, -1], Direction.NW));
    });

    test("Shallows -> hills", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [new Field([0, 0], FieldType.SHALLOWS), new Field([0, -1], FieldType.HILLS)];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });

    test("Shallows -> highlands", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [new Field([0, 0], FieldType.SHALLOWS), new Field([0, -1], FieldType.HIGHLANDS)];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });

    test("Shallows -> mountains", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [new Field([0, 0], FieldType.SHALLOWS), new Field([0, -1], FieldType.MOUNTAINS)];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });

    test("Shallows -> shallows", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        let anotherFleet = new Fleet(322, GameState.realms[0], 20, 1, 0, 0, [0, -1], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet, anotherFleet];
        fleet.loadArmy(army);
        GameState.fields = [new Field([0, 0], FieldType.SHALLOWS), new Field([0, -1], FieldType.SHALLOWS)];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });

    test("Shallows -> deepsea", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        let anotherFleet = new Fleet(322, GameState.realms[0], 20, 1, 0, 0, [0, -1], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet, anotherFleet];
        fleet.loadArmy(army);
        GameState.fields = [new Field([0, 0], FieldType.SHALLOWS), new Field([0, -1], FieldType.DEEPSEA)];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });

    test("Deepsea -> lowlands", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [new Field([0, 0], FieldType.DEEPSEA), new Field([0, -1], FieldType.LOWLANDS)];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(7, 2, false, true, [0, -1], Direction.NW));
    });

    test("Deepsea -> lowlands with harbor", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [new Field([0, 0], FieldType.DEEPSEA), new Field([0, -1], FieldType.LOWLANDS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.HARBOR, [0, -1], [0, 0], GameState.realms[0])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(7, 1, false, true, [0, -1], Direction.NW));
    });

    test("Deepsea -> lowlands in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [new Field([0, 0], FieldType.DEEPSEA), new Field([0, -1], FieldType.LOWLANDS)];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 2, false, true, [0, -1], Direction.NW));
    });

    test("Deepsea -> lowlands with harbor in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [new Field([0, 0], FieldType.DEEPSEA), new Field([0, -1], FieldType.LOWLANDS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.HARBOR, [0, -1], [0, 0], GameState.realms[0])];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 1, false, true, [0, -1], Direction.NW));
    });

    test("Deepsea -> desert", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [new Field([0, 0], FieldType.DEEPSEA), new Field([0, -1], FieldType.DESERT)];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(7, 2, false, true, [0, -1], Direction.NW));
    });

    test("Deepsea -> desert with harbor", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [new Field([0, 0], FieldType.DEEPSEA), new Field([0, -1], FieldType.DESERT)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.HARBOR, [0, -1], [0, 0], GameState.realms[0])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(7, 1, false, true, [0, -1], Direction.NW));
    });

    test("Deepsea -> desert in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [new Field([0, 0], FieldType.DEEPSEA), new Field([0, -1], FieldType.DESERT)];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 2, false, true, [0, -1], Direction.NW));
    });

    test("Deepsea -> desert with harbor in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [new Field([0, 0], FieldType.DEEPSEA), new Field([0, -1], FieldType.DESERT)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.HARBOR, [0, -1], [0, 0], GameState.realms[0])];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 1, false, true, [0, -1], Direction.NW));
    });

    test("Deepsea -> woods", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [new Field([0, 0], FieldType.DEEPSEA), new Field([0, -1], FieldType.WOODS)];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(7, 2, false, true, [0, -1], Direction.NW));
    });

    test("Deepsea -> woods with harbor", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [new Field([0, 0], FieldType.DEEPSEA), new Field([0, -1], FieldType.WOODS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.HARBOR, [0, -1], [0, 0], GameState.realms[0])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(7, 1, false, true, [0, -1], Direction.NW));
    });

    test("Deepsea -> woods in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [new Field([0, 0], FieldType.DEEPSEA), new Field([0, -1], FieldType.WOODS)];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 2, false, true, [0, -1], Direction.NW));
    });

    test("Deepsea -> woods with harbor in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [new Field([0, 0], FieldType.DEEPSEA), new Field([0, -1], FieldType.WOODS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.HARBOR, [0, -1], [0, 0], GameState.realms[0])];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 1, false, true, [0, -1], Direction.NW));
    });

    test("Deepsea -> swamp", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [new Field([0, 0], FieldType.DEEPSEA), new Field([0, -1], FieldType.SWAMP)];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(7, 2, false, true, [0, -1], Direction.NW));
    });

    test("Deepsea -> swamp with harbor", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [new Field([0, 0], FieldType.DEEPSEA), new Field([0, -1], FieldType.SWAMP)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.HARBOR, [0, -1], [0, 0], GameState.realms[0])];
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(7, 1, false, true, [0, -1], Direction.NW));
    });

    test("Deepsea -> swamp in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [new Field([0, 0], FieldType.DEEPSEA), new Field([0, -1], FieldType.SWAMP)];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 2, false, true, [0, -1], Direction.NW));
    });

    test("Deepsea -> swamp with harbor in homeland", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [new Field([0, 0], FieldType.DEEPSEA), new Field([0, -1], FieldType.SWAMP)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.HARBOR, [0, -1], [0, 0], GameState.realms[0])];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible(army.possibleMoves, new Move(4, 1, false, true, [0, -1], Direction.NW));
    });

    test("Deepsea -> hills", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [new Field([0, 0], FieldType.DEEPSEA), new Field([0, -1], FieldType.HILLS)];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });

    test("Deepsea -> highlands", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [new Field([0, 0], FieldType.DEEPSEA), new Field([0, -1], FieldType.HIGHLANDS)];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });

    test("Deepsea -> mountains", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [new Field([0, 0], FieldType.DEEPSEA), new Field([0, -1], FieldType.MOUNTAINS)];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });

    test("Deepsea -> shallows", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        let anotherFleet = new Fleet(322, GameState.realms[0], 20, 1, 0, 0, [0, -1], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet, anotherFleet];
        fleet.loadArmy(army);
        GameState.fields = [new Field([0, 0], FieldType.DEEPSEA), new Field([0, -1], FieldType.SHALLOWS)];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });

    test("Deepsea -> deepsea", function (t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0],
            FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, false);
        let fleet = new Fleet(311, GameState.realms[0], 20, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        let anotherFleet = new Fleet(322, GameState.realms[0], 20, 1, 0, 0, [0, -1], Fleet.MAX_MOVE_POINTS, false);
        GameState.armies = [army, fleet, anotherFleet];
        fleet.loadArmy(army);
        GameState.fields = [new Field([0, 0], FieldType.DEEPSEA), new Field([0, -1], FieldType.DEEPSEA)];
        army.clickedMoves();
        t.moveImpossible(army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
};