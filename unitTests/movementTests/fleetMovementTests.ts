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

import { Fleet } from "../../armies/fleet";
import { GameState } from "../../gameState";
import { FieldType, Field } from "../../map/field";
import { Move } from "../../armies/move";
import { Direction } from "../../map/direction";
import { QUnit } from "../qunit";

const { test } = QUnit;

export function fleetMovementTests() {
    test("Shallows -> lowlands", function (t: any) {
        let fleet = new Fleet(311, GameState.realms[0], 21, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.SHALLOWS), new Field([0, -1], FieldType.LOWLANDS)];
        fleet.clickedMoves();
        t.moveImpossible(new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test("Shallows -> desert", function (t: any) {
        let fleet = new Fleet(311, GameState.realms[0], 21, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.SHALLOWS), new Field([0, -1], FieldType.DESERT)];
        fleet.clickedMoves();
        t.moveImpossible(new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test("Shallows -> woods", function (t: any) {
        let fleet = new Fleet(311, GameState.realms[0], 21, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.SHALLOWS), new Field([0, -1], FieldType.DESERT)];
        fleet.clickedMoves();
        t.moveImpossible(new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test("Shallows -> swamp", function (t: any) {
        let fleet = new Fleet(311, GameState.realms[0], 21, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.SHALLOWS), new Field([0, -1], FieldType.SWAMP)];
        fleet.clickedMoves();
        t.moveImpossible(new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test("Shallows -> hills", function (t: any) {
        let fleet = new Fleet(311, GameState.realms[0], 21, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.SHALLOWS), new Field([0, -1], FieldType.HILLS)];
        fleet.clickedMoves();
        t.moveImpossible(new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test("Shallows -> highlands", function (t: any) {
        let fleet = new Fleet(311, GameState.realms[0], 21, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.SHALLOWS), new Field([0, -1], FieldType.HIGHLANDS)];
        fleet.clickedMoves();
        t.moveImpossible(new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test("Shallows -> mountains", function (t: any) {
        let fleet = new Fleet(311, GameState.realms[0], 21, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.SHALLOWS), new Field([0, -1], FieldType.MOUNTAINS)];
        fleet.clickedMoves();
        t.moveImpossible(new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test("Shallows -> shallows", function (t: any) {
        let fleet = new Fleet(311, GameState.realms[0], 21, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.SHALLOWS), new Field([0, -1], FieldType.SHALLOWS)];
        fleet.clickedMoves();
        t.movePossible(fleet.possibleMoves, new Move(7, 0, false, false, [0, -1], Direction.NW));
    });
    test("Shallows -> shallows on coast", function (t: any) {
        let fleet = new Fleet(311, GameState.realms[0], 21, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.SHALLOWS), new Field([0, -1], FieldType.SHALLOWS),
        new Field([1, -1], FieldType.LOWLANDS)];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 1 && field.coordinates[1] === -1);
        fleet.clickedMoves();
        t.movePossible(fleet.possibleMoves, new Move(5, 0, false, false, [0, -1], Direction.NW));
    });
    test("Shallows -> shallows on coast (distance two)", function (t: any) {
        let fleet = new Fleet(311, GameState.realms[0], 21, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.SHALLOWS), new Field([0, -1], FieldType.SHALLOWS),
        new Field([1, -1], FieldType.SHALLOWS), new Field([1, -1], FieldType.LOWLANDS)];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 2 && field.coordinates[1] === -1);
        fleet.clickedMoves();
        t.movePossible(fleet.possibleMoves, new Move(5, 0, false, false, [0, -1], Direction.NW));
    });
    test("Shallows -> deepsea", function (t: any) {
        let fleet = new Fleet(311, GameState.realms[0], 21, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.SHALLOWS), new Field([0, -1], FieldType.DEEPSEA)];
        fleet.clickedMoves();
        t.movePossible(fleet.possibleMoves, new Move(12, 0, false, false, [0, -1], Direction.NW));
    });
    test("Shallows -> deepsea on coast", function (t: any) {
        let fleet = new Fleet(311, GameState.realms[0], 21, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.SHALLOWS), new Field([0, -1], FieldType.DEEPSEA),
        new Field([1, -1], FieldType.LOWLANDS)];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 1 && field.coordinates[1] === -1);
        fleet.clickedMoves();
        t.movePossible(fleet.possibleMoves, new Move(8, 0, false, false, [0, -1], Direction.NW));
    });
    test("Deepsea -> lowlands", function (t: any) {
        let fleet = new Fleet(311, GameState.realms[0], 21, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.DEEPSEA), new Field([0, -1], FieldType.LOWLANDS)];
        fleet.clickedMoves();
        t.moveImpossible(new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test("Deepsea -> desert", function (t: any) {
        let fleet = new Fleet(311, GameState.realms[0], 21, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.DEEPSEA), new Field([0, -1], FieldType.DESERT)];
        fleet.clickedMoves();
        t.moveImpossible(new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test("Deepsea -> woods", function (t: any) {
        let fleet = new Fleet(311, GameState.realms[0], 21, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.DEEPSEA), new Field([0, -1], FieldType.DESERT)];
        fleet.clickedMoves();
        t.moveImpossible(new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test("Deepsea -> swamp", function (t: any) {
        let fleet = new Fleet(311, GameState.realms[0], 21, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.DEEPSEA), new Field([0, -1], FieldType.SWAMP)];
        fleet.clickedMoves();
        t.moveImpossible(new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test("Deepsea -> hills", function (t: any) {
        let fleet = new Fleet(311, GameState.realms[0], 21, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.DEEPSEA), new Field([0, -1], FieldType.HILLS)];
        fleet.clickedMoves();
        t.moveImpossible(new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test("Deepsea -> highlands", function (t: any) {
        let fleet = new Fleet(311, GameState.realms[0], 21, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.DEEPSEA), new Field([0, -1], FieldType.HIGHLANDS)];
        fleet.clickedMoves();
        t.moveImpossible(new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test("Deepsea -> mountains", function (t: any) {
        let fleet = new Fleet(311, GameState.realms[0], 21, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.DEEPSEA), new Field([0, -1], FieldType.MOUNTAINS)];
        fleet.clickedMoves();
        t.moveImpossible(new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test("Deepsea -> shallows", function (t: any) {
        let fleet = new Fleet(311, GameState.realms[0], 21, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.DEEPSEA), new Field([0, -1], FieldType.SHALLOWS),
        new Field([1, -1], FieldType.LOWLANDS)];
        fleet.clickedMoves();
        t.movePossible(fleet.possibleMoves, new Move(7, 0, false, false, [0, -1], Direction.NW));
    });
    test("Deepsea -> shallows on coast", function (t: any) {
        let fleet = new Fleet(311, GameState.realms[0], 21, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.DEEPSEA), new Field([0, -1], FieldType.SHALLOWS),
        new Field([1, -1], FieldType.LOWLANDS)];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 1 && field.coordinates[1] === -1);
        fleet.clickedMoves();
        t.movePossible(fleet.possibleMoves, new Move(5, 0, false, false, [0, -1], Direction.NW));
    });
    test("Deepsea -> deepsea", function (t: any) {
        let fleet = new Fleet(311, GameState.realms[0], 21, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.DEEPSEA), new Field([0, -1], FieldType.DEEPSEA),
        new Field([1, -1], FieldType.LOWLANDS)];
        fleet.clickedMoves();
        t.movePossible(fleet.possibleMoves, new Move(12, 0, false, false, [0, -1], Direction.NW));
    });
    test("Deepsea -> deepsea on coast", function (t: any) {
        let fleet = new Fleet(311, GameState.realms[0], 21, 1, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.DEEPSEA), new Field([0, -1], FieldType.DEEPSEA),
        new Field([1, -1], FieldType.LOWLANDS)];
        GameState.realms[0].territory = GameState.fields.filter(field =>
            field.coordinates[0] === 1 && field.coordinates[1] === -1);
        fleet.clickedMoves();
        t.movePossible(fleet.possibleMoves, new Move(8, 0, false, false, [0, -1], Direction.NW));
    });
}