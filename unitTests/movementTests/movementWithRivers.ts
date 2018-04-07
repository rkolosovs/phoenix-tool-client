import { GameState } from "../../gameState";
import { FootArmy } from "../../armies/footArmy";
import { FieldType, Field } from "../../map/field";
import { Move } from "../../armies/move";
import { Direction } from "../../map/direction";
import { NonDestructibleBuilding } from "../../buildings/nonDestructibleBuilding";
import { BuildingType } from "../../buildings/building";
import { River } from "../../map/river"
import {RiderArmy} from "../../armies/riderArmy";
import {QUnit} from "qunit";

const { test } = QUnit;

export function movementWithRiversTests() {
    test( "Foot lowlands -> lowlands over a river", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, 0], FieldType.LOWLANDS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(9, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot lowlands -> lowlands over a river with a bridge", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, 0], FieldType.LOWLANDS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.BRIDGE, [0, 0], [0, -1], GameState.realms[0])];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(7, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot lowlands -> lowlands over a river with a street", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, 0], FieldType.LOWLANDS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(9, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot lowlands -> lowlands over a river with a bridge and a street", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, 0], FieldType.LOWLANDS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0]),
            new NonDestructibleBuilding(BuildingType.BRIDGE, [0, 0], [0, -1], GameState.realms[0])];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(4, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot lowlands -> lowlands over a river in homeland", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, 0], FieldType.LOWLANDS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        GameState.realms[0].territory = GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(9, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot lowlands -> lowlands over a river with a bridge in homeland", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, 0], FieldType.LOWLANDS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.BRIDGE, [0, 0], [0, -1], GameState.realms[0])];
        GameState.rivers = [new River([0, 0], [0, -1])];
        GameState.realms[0].territory = GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(4, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot lowlands -> lowlands over a river with a street in homeland", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, 0], FieldType.LOWLANDS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        GameState.rivers = [new River([0, 0], [0, -1])];
        GameState.realms[0].territory = GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(9, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot lowlands -> lowlands over a river with a bridge and a street in homeland", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, 0], FieldType.LOWLANDS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0]),
            new NonDestructibleBuilding(BuildingType.BRIDGE, [0, 0], [0, -1], GameState.realms[0])];
        GameState.rivers = [new River([0, 0], [0, -1])];
        GameState.realms[0].territory = GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(3, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot lowlands -> hills over a river", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, 0], FieldType.HILLS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot lowlands -> hills over a river with a street", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, 0], FieldType.HILLS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot lowlands -> hills over a river in homeland", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, 0], FieldType.HILLS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        GameState.realms[0].territory = GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot lowlands -> hills over a river with a street in homeland", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, 0], FieldType.HILLS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        GameState.rivers = [new River([0, 0], [0, -1])];
        GameState.realms[0].territory = GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot lowlands -> desert over a river", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, 0], FieldType.DESERT)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(9, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot lowlands -> desert over a river with a bridge", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, 0], FieldType.DESERT)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.BRIDGE, [0, 0], [0, -1], GameState.realms[0])];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(7, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot lowlands -> woods over a river", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, 0], FieldType.WOODS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(9, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot lowlands -> woods over a river with a bridge", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, 0], FieldType.WOODS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.BRIDGE, [0, 0], [0, -1], GameState.realms[0])];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(7, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot lowlands -> swamp over a river", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, 0], FieldType.SWAMP)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(9, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot lowlands -> swamp over a river with a bridge", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, 0], FieldType.SWAMP)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.BRIDGE, [0, 0], [0, -1], GameState.realms[0])];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(7, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot lowlands -> highlands over a river", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, 0], FieldType.HIGHLANDS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot lowlands -> mountains over a river", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, 0], FieldType.MOUNTAINS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot desert -> lowlands over a river", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.DESERT), new Field([0, 0], FieldType.LOWLANDS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(9, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot desert -> lowlands over a river with a bridge", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.DESERT), new Field([0, 0], FieldType.LOWLANDS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.BRIDGE, [0, 0], [0, -1], GameState.realms[0])];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(7, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot desert -> desert over a river", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.DESERT), new Field([0, 0], FieldType.DESERT)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(9, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot desert -> desert over a river with a bridge", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.DESERT), new Field([0, 0], FieldType.DESERT)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.BRIDGE, [0, 0], [0, -1], GameState.realms[0])];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(7, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot desert -> woods over a river", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.DESERT), new Field([0, 0], FieldType.WOODS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(9, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot desert -> woods over a river with a bridge", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.DESERT), new Field([0, 0], FieldType.WOODS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.BRIDGE, [0, 0], [0, -1], GameState.realms[0])];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(7, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot desert -> swamp over a river", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.DESERT), new Field([0, 0], FieldType.SWAMP)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(9, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot desert -> swamp over a river with a bridge", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.DESERT), new Field([0, 0], FieldType.SWAMP)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.BRIDGE, [0, 0], [0, -1], GameState.realms[0])];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(7, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot desert -> hills over a river", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.DESERT), new Field([0, 0], FieldType.HILLS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot desert -> highlands over a river", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.DESERT), new Field([0, 0], FieldType.HIGHLANDS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot desert -> mountains over a river", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.DESERT), new Field([0, 0], FieldType.MOUNTAINS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot woods -> lowlands over a river", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.WOODS), new Field([0, 0], FieldType.LOWLANDS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(9, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot woods -> lowlands over a river with a bridge", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.WOODS), new Field([0, 0], FieldType.LOWLANDS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.BRIDGE, [0, 0], [0, -1], GameState.realms[0])];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(7, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot woods -> desert over a river", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.WOODS), new Field([0, 0], FieldType.DESERT)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(9, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot woods -> desert over a river with a bridge", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.WOODS), new Field([0, 0], FieldType.DESERT)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.BRIDGE, [0, 0], [0, -1], GameState.realms[0])];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(7, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot woods -> woods over a river", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.WOODS), new Field([0, 0], FieldType.WOODS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(9, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot woods -> woods over a river with a bridge", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.WOODS), new Field([0, 0], FieldType.WOODS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.BRIDGE, [0, 0], [0, -1], GameState.realms[0])];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(7, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot woods -> swamp over a river", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.WOODS), new Field([0, 0], FieldType.SWAMP)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(9, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot woods -> swamp over a river with a bridge", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.WOODS), new Field([0, 0], FieldType.SWAMP)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.BRIDGE, [0, 0], [0, -1], GameState.realms[0])];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(7, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot woods -> hills over a river", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.WOODS), new Field([0, 0], FieldType.HILLS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot woods -> highlands over a river", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.WOODS), new Field([0, 0], FieldType.HIGHLANDS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot woods -> mountains over a river", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.WOODS), new Field([0, 0], FieldType.MOUNTAINS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot swamp -> lowlands over a river", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.SWAMP), new Field([0, 0], FieldType.LOWLANDS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(9, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot swamp -> lowlands over a river with a bridge", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.SWAMP), new Field([0, 0], FieldType.LOWLANDS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.BRIDGE, [0, 0], [0, -1], GameState.realms[0])];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(7, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot swamp -> desert over a river", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.SWAMP), new Field([0, 0], FieldType.DESERT)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(9, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot swamp -> desert over a river with a bridge", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.SWAMP), new Field([0, 0], FieldType.DESERT)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.BRIDGE, [0, 0], [0, -1], GameState.realms[0])];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(7, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot swamp -> woods over a river", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.SWAMP), new Field([0, 0], FieldType.WOODS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(9, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot swamp -> woods over a river with a bridge", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.SWAMP), new Field([0, 0], FieldType.WOODS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.BRIDGE, [0, 0], [0, -1], GameState.realms[0])];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(7, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot swamp -> swamp over a river", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.SWAMP), new Field([0, 0], FieldType.SWAMP)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(9, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot swamp -> swamp over a river with a bridge", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.SWAMP), new Field([0, 0], FieldType.SWAMP)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.BRIDGE, [0, 0], [0, -1], GameState.realms[0])];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(7, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot swamp -> hills over a river", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.SWAMP), new Field([0, 0], FieldType.HILLS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot swamp -> highlands over a river", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.SWAMP), new Field([0, 0], FieldType.HIGHLANDS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot swamp -> mountains over a river", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.SWAMP), new Field([0, 0], FieldType.MOUNTAINS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot hills -> lowlands over a river", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.HILLS), new Field([0, 0], FieldType.LOWLANDS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot hills -> lowlands over a river with a street", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.HILLS), new Field([0, 0], FieldType.LOWLANDS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot hills -> lowlands over a river in homeland", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.HILLS), new Field([0, 0], FieldType.LOWLANDS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        GameState.realms[0].territory = GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot hills -> lowlands over a river with a street in homeland", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.HILLS), new Field([0, 0], FieldType.LOWLANDS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.STREET, [0, 0], [0, -1], GameState.realms[0])];
        GameState.rivers = [new River([0, 0], [0, -1])];
        GameState.realms[0].territory = GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot hills -> desert over a river", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.HILLS), new Field([0, 0], FieldType.DESERT)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot hills -> woods over a river", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.HILLS), new Field([0, 0], FieldType.WOODS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot hills -> swamp over a river", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.HILLS), new Field([0, 0], FieldType.SWAMP)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot hills -> hills over a river", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.HILLS), new Field([0, 0], FieldType.HILLS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(9, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot hills -> hills over a river with a bridge", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.HILLS), new Field([0, 0], FieldType.HILLS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.BRIDGE, [0, 0], [0, -1], GameState.realms[0])];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(7, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot hills -> highlands over a river", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.HILLS), new Field([0, 0], FieldType.HIGHLANDS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot hills -> mountains over a river", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.HILLS), new Field([0, 0], FieldType.MOUNTAINS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot highlands -> lowlands over a river", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.HIGHLANDS), new Field([0, 0], FieldType.LOWLANDS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot highlands -> desert over a river", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.HIGHLANDS), new Field([0, 0], FieldType.DESERT)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot highlands -> woods over a river", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.HIGHLANDS), new Field([0, 0], FieldType.WOODS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot highlands -> swamp over a river", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.HIGHLANDS), new Field([0, 0], FieldType.SWAMP)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot highlands -> hills over a river", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.HIGHLANDS), new Field([0, 0], FieldType.HILLS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot highlands -> highlands over a river", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.HIGHLANDS), new Field([0, 0], FieldType.HIGHLANDS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(9, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot highlands -> highlands over a river with a bridge", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.HIGHLANDS), new Field([0, 0], FieldType.HIGHLANDS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.BRIDGE, [0, 0], [0, -1], GameState.realms[0])];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(7, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot highlands -> mountains over a river", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.HIGHLANDS), new Field([0, 0], FieldType.MOUNTAINS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot mountains -> lowlands over a river", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.MOUNTAINS), new Field([0, 0], FieldType.LOWLANDS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot mountains -> desert over a river", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.MOUNTAINS), new Field([0, 0], FieldType.DESERT)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot mountains -> woods over a river", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.MOUNTAINS), new Field([0, 0], FieldType.WOODS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot mountains -> swamp over a river", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.MOUNTAINS), new Field([0, 0], FieldType.SWAMP)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot mountains -> hills over a river", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.MOUNTAINS), new Field([0, 0], FieldType.HILLS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot mountains -> highlands over a river", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.MOUNTAINS), new Field([0, 0], FieldType.HIGHLANDS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot mountains -> mountains over a river", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.MOUNTAINS), new Field([0, 0], FieldType.MOUNTAINS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(9, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Foot mountains -> mountains over a river with a bridge", function(t: any) {
        let army = new FootArmy(111, GameState.realms[0], 1000, 1, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
        GameState.fields = [new Field([0, 0], FieldType.MOUNTAINS), new Field([0, 0], FieldType.MOUNTAINS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.BRIDGE, [0, 0], [0, -1], GameState.realms[0])];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(7, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse lowlands -> lowlands over a river", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, 0], FieldType.LOWLANDS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(21, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse lowlands -> lowlands over a river with a bridge", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, 0], FieldType.LOWLANDS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.BRIDGE, [0, 0], [0, -1], GameState.realms[0])];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(7, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse lowlands -> desert over a river", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, 0], FieldType.DESERT)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(21, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse lowlands -> desert over a river with a bridge", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, 0], FieldType.DESERT)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.BRIDGE, [0, 0], [0, -1], GameState.realms[0])];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(7, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse lowlands -> woods over a river", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, 0], FieldType.WOODS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(21, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse lowlands -> woods over a river with a bridge", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, 0], FieldType.WOODS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.BRIDGE, [0, 0], [0, -1], GameState.realms[0])];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(10, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse lowlands -> swamp over a river", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, 0], FieldType.SWAMP)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(21, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse lowlands -> swamp over a river with a bridge", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, 0], FieldType.SWAMP)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.BRIDGE, [0, 0], [0, -1], GameState.realms[0])];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(10, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse lowlands -> hills over a river", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, 0], FieldType.HILLS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse lowlands -> highlands over a river", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, 0], FieldType.HIGHLANDS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse lowlands -> mountains over a river", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.LOWLANDS), new Field([0, 0], FieldType.MOUNTAINS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse desert -> lowlands over a river", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.DESERT), new Field([0, 0], FieldType.LOWLANDS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(21, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse desert -> lowlands over a river with a bridge", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.DESERT), new Field([0, 0], FieldType.LOWLANDS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.BRIDGE, [0, 0], [0, -1], GameState.realms[0])];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(7, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse desert -> desert over a river", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.DESERT), new Field([0, 0], FieldType.DESERT)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(21, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse desert -> desert over a river with a bridge", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.DESERT), new Field([0, 0], FieldType.DESERT)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.BRIDGE, [0, 0], [0, -1], GameState.realms[0])];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(7, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse desert -> woods over a river", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.DESERT), new Field([0, 0], FieldType.WOODS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(21, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse desert -> woods over a river with a bridge", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.DESERT), new Field([0, 0], FieldType.WOODS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.BRIDGE, [0, 0], [0, -1], GameState.realms[0])];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(10, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse desert -> swamp over a river", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.DESERT), new Field([0, 0], FieldType.SWAMP)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(21, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse desert -> swamp over a river with a bridge", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.DESERT), new Field([0, 0], FieldType.SWAMP)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.BRIDGE, [0, 0], [0, -1], GameState.realms[0])];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(10, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse desert -> hills over a river", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.DESERT), new Field([0, 0], FieldType.HILLS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse desert -> highlands over a river", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.DESERT), new Field([0, 0], FieldType.HIGHLANDS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse desert -> mountains over a river", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.DESERT), new Field([0, 0], FieldType.MOUNTAINS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse woods -> lowlands over a river", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.WOODS), new Field([0, 0], FieldType.LOWLANDS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(21, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse woods -> lowlands over a river with a bridge", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.WOODS), new Field([0, 0], FieldType.LOWLANDS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.BRIDGE, [0, 0], [0, -1], GameState.realms[0])];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(7, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse woods -> desert over a river", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.WOODS), new Field([0, 0], FieldType.DESERT)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(21, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse woods -> desert over a river with a bridge", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.WOODS), new Field([0, 0], FieldType.DESERT)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.BRIDGE, [0, 0], [0, -1], GameState.realms[0])];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(7, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse woods -> woods over a river", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.WOODS), new Field([0, 0], FieldType.WOODS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(21, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse woods -> woods over a river with a bridge", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.WOODS), new Field([0, 0], FieldType.WOODS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.BRIDGE, [0, 0], [0, -1], GameState.realms[0])];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(10, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse woods -> swamp over a river", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.WOODS), new Field([0, 0], FieldType.SWAMP)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(21, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse woods -> swamp over a river with a bridge", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.WOODS), new Field([0, 0], FieldType.SWAMP)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.BRIDGE, [0, 0], [0, -1], GameState.realms[0])];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(10, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse woods -> hills over a river", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.WOODS), new Field([0, 0], FieldType.HILLS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse woods -> highlands over a river", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.WOODS), new Field([0, 0], FieldType.HIGHLANDS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse woods -> mountains over a river", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.WOODS), new Field([0, 0], FieldType.MOUNTAINS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse swamp -> lowlands over a river", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.SWAMP), new Field([0, 0], FieldType.LOWLANDS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(21, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse swamp -> lowlands over a river with a bridge", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.SWAMP), new Field([0, 0], FieldType.LOWLANDS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.BRIDGE, [0, 0], [0, -1], GameState.realms[0])];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(7, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse swamp -> desert over a river", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.SWAMP), new Field([0, 0], FieldType.DESERT)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(21, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse swamp -> desert over a river with a bridge", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.SWAMP), new Field([0, 0], FieldType.DESERT)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.BRIDGE, [0, 0], [0, -1], GameState.realms[0])];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(7, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse swamp -> woods over a river", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.SWAMP), new Field([0, 0], FieldType.WOODS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(21, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse swamp -> woods over a river with a bridge", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.SWAMP), new Field([0, 0], FieldType.WOODS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.BRIDGE, [0, 0], [0, -1], GameState.realms[0])];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(10, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse swamp -> swamp over a river", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.SWAMP), new Field([0, 0], FieldType.SWAMP)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(21, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse swamp -> swamp over a river with a bridge", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.SWAMP), new Field([0, 0], FieldType.SWAMP)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.BRIDGE, [0, 0], [0, -1], GameState.realms[0])];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(10, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse swamp -> hills over a river", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.SWAMP), new Field([0, 0], FieldType.HILLS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse swamp -> highlands over a river", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.SWAMP), new Field([0, 0], FieldType.HIGHLANDS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse swamp -> mountains over a river", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.SWAMP), new Field([0, 0], FieldType.MOUNTAINS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse hills -> lowlands over a river", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.HILLS), new Field([0, 0], FieldType.LOWLANDS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse hills -> desert over a river", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.HILLS), new Field([0, 0], FieldType.DESERT)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse hills -> woods over a river", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.HILLS), new Field([0, 0], FieldType.WOODS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse hills -> swamp over a river", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.HILLS), new Field([0, 0], FieldType.SWAMP)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse hills -> hills over a river", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.HILLS), new Field([0, 0], FieldType.HILLS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(21, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse hills -> hills over a river with a bridge", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.HILLS), new Field([0, 0], FieldType.HILLS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.BRIDGE, [0, 0], [0, -1], GameState.realms[0])];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(7, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse hills -> highlands over a river", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.HILLS), new Field([0, 0], FieldType.HIGHLANDS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse hills -> mountains over a river", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.HILLS), new Field([0, 0], FieldType.MOUNTAINS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse highlands -> lowlands over a river", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.HIGHLANDS), new Field([0, 0], FieldType.LOWLANDS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse highlands -> desert over a river", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.HIGHLANDS), new Field([0, 0], FieldType.DESERT)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse highlands -> woods over a river", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.HIGHLANDS), new Field([0, 0], FieldType.WOODS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse highlands -> swamp over a river", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.HIGHLANDS), new Field([0, 0], FieldType.SWAMP)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse highlands -> hills over a river", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.HIGHLANDS), new Field([0, 0], FieldType.HILLS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse highlands -> highlands over a river", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.HIGHLANDS), new Field([0, 0], FieldType.HIGHLANDS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(21, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse highlands -> highlands over a river with a bridge", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.HIGHLANDS), new Field([0, 0], FieldType.HIGHLANDS)];
        GameState.buildings = [new NonDestructibleBuilding(BuildingType.BRIDGE, [0, 0], [0, -1], GameState.realms[0])];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, new Move(21, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Horse highlands -> mountains over a river", function(t: any) {
        let army= new RiderArmy(211, GameState.realms[0], 1000, 1, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
        GameState.fields = [new Field([0, 0], FieldType.HIGHLANDS), new Field([0, 0], FieldType.MOUNTAINS)];
        GameState.rivers = [new River([0, 0], [0, -1])];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
}