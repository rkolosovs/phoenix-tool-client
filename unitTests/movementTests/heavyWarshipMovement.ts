import {Fleet} from "../../armies/fleet";
import {GameState} from "../../gameState";
import { FieldType, Field } from "../../map/field";
import { Move } from "../../armies/move";
import { Direction } from "../../map/direction";
import { NonDestructibleBuilding } from "../../buildings/nonDestructibleBuilding";
import { BuildingType } from "../../buildings/building";
import {QUnit} from "qunit";

const { test } = QUnit;

export function heavyWarshipMovementTests() {
    test( "Shallows -> lowlands", function(t: any) {
        let fleet = new Fleet(311, GameState.realms[0], 21, 1, 0, 1, [0, 1], Fleet.MAX_MOVE_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.SHALLOWS), new Field([0, -1], FieldType.LOWLANDS)];
        fleet.clickedMoves();
        t.moveImpossible( fleet.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Shallows -> desert", function(t: any) {
        let fleet = new Fleet(311, GameState.realms[0], 21, 1, 0, 1, [0, 1], Fleet.MAX_MOVE_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.SHALLOWS), new Field([0, -1], FieldType.DESERT)];
        fleet.clickedMoves();
        t.moveImpossible( fleet.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Shallows -> woods", function(t: any) {
        let fleet = new Fleet(311, GameState.realms[0], 21, 1, 0, 1, [0, 1], Fleet.MAX_MOVE_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.SHALLOWS), new Field([0, -1], FieldType.WOODS)];
        fleet.clickedMoves();
        t.moveImpossible( fleet.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Shallows -> swamp", function(t: any) {
        let fleet = new Fleet(311, GameState.realms[0], 21, 1, 0, 1, [0, 1], Fleet.MAX_MOVE_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.SHALLOWS), new Field([0, -1], FieldType.SWAMP)];
        fleet.clickedMoves();
        t.moveImpossible( fleet.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Shallows -> hills", function(t: any) {
        let fleet = new Fleet(311, GameState.realms[0], 21, 1, 0, 1, [0, 1], Fleet.MAX_MOVE_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.SHALLOWS), new Field([0, -1], FieldType.HILLS)];
        fleet.clickedMoves();
        t.moveImpossible( fleet.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Shallows -> highlands", function(t: any) {
        let fleet = new Fleet(311, GameState.realms[0], 21, 1, 0, 1, [0, 1], Fleet.MAX_MOVE_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.SHALLOWS), new Field([0, -1], FieldType.HIGHLANDS)];
        fleet.clickedMoves();
        t.moveImpossible( fleet.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Shallows -> mountains", function(t: any) {
        let fleet = new Fleet(311, GameState.realms[0], 21, 1, 0, 1, [0, 1], Fleet.MAX_MOVE_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.SHALLOWS), new Field([0, -1], FieldType.MOUNTAINS)];
        fleet.clickedMoves();
        t.moveImpossible( fleet.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Shallows -> shallows", function(t: any) {
        let fleet = new Fleet(311, GameState.realms[0], 21, 1, 0, 1, [0, 1], Fleet.MAX_MOVE_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.SHALLOWS), new Field([0, -1], FieldType.SHALLOWS), new Field([1, -1], FieldType.LOWLANDS)];
        fleet.clickedMoves();
        t.movePossible( fleet.possibleMoves, new Move(10, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Shallows -> shallows on coast", function(t: any) {
        let fleet = new Fleet(311, GameState.realms[0], 21, 1, 0, 1, [0, 1], Fleet.MAX_MOVE_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.SHALLOWS), new Field([0, -1], FieldType.SHALLOWS), new Field([1, -1], FieldType.LOWLANDS)];
        GameState.realms[0].territory = GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
        fleet.clickedMoves();
        t.movePossible( fleet.possibleMoves, new Move(7, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Shallows -> deepsea", function(t: any) {
        let fleet = new Fleet(311, GameState.realms[0], 21, 1, 0, 1, [0, 1], Fleet.MAX_MOVE_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.SHALLOWS), new Field([0, -1], FieldType.DEEPSEA), new Field([1, -1], FieldType.LOWLANDS)];
        fleet.clickedMoves();
        t.movePossible( fleet.possibleMoves, new Move(21, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Shallows -> deepsea on coast", function(t: any) {
        let fleet = new Fleet(311, GameState.realms[0], 21, 1, 0, 1, [0, 1], Fleet.MAX_MOVE_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.SHALLOWS), new Field([0, -1], FieldType.DEEPSEA), new Field([1, -1], FieldType.LOWLANDS)];
        GameState.realms[0].territory = GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
        fleet.clickedMoves();
        t.movePossible( fleet.possibleMoves, new Move(14, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Deepsea -> lowlands", function(t: any) {
        let fleet = new Fleet(311, GameState.realms[0], 21, 1, 0, 1, [0, 1], Fleet.MAX_MOVE_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.DEEPSEA), new Field([0, -1], FieldType.LOWLANDS)];
        fleet.clickedMoves();
        t.moveImpossible( fleet.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Deepsea -> desert", function(t: any) {
        let fleet = new Fleet(311, GameState.realms[0], 21, 1, 0, 1, [0, 1], Fleet.MAX_MOVE_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.DEEPSEA), new Field([0, -1], FieldType.DESERT)];
        fleet.clickedMoves();
        t.moveImpossible( fleet.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Deepsea -> woods", function(t: any) {
        let fleet = new Fleet(311, GameState.realms[0], 21, 1, 0, 1, [0, 1], Fleet.MAX_MOVE_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.DEEPSEA), new Field([0, -1], FieldType.WOODS)];
        fleet.clickedMoves();
        t.moveImpossible( fleet.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Deepsea -> swamp", function(t: any) {
        let fleet = new Fleet(311, GameState.realms[0], 21, 1, 0, 1, [0, 1], Fleet.MAX_MOVE_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.DEEPSEA), new Field([0, -1], FieldType.SWAMP)];
        fleet.clickedMoves();
        t.moveImpossible( fleet.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Deepsea -> hills", function(t: any) {
        let fleet = new Fleet(311, GameState.realms[0], 21, 1, 0, 1, [0, 1], Fleet.MAX_MOVE_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.DEEPSEA), new Field([0, -1], FieldType.HILLS)];
        fleet.clickedMoves();
        t.moveImpossible( fleet.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Deepsea -> highlands", function(t: any) {
        let fleet = new Fleet(311, GameState.realms[0], 21, 1, 0, 1, [0, 1], Fleet.MAX_MOVE_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.DEEPSEA), new Field([0, -1], FieldType.HIGHLANDS)];
        fleet.clickedMoves();
        t.moveImpossible( fleet.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Deepsea -> mountains", function(t: any) {
        let fleet = new Fleet(311, GameState.realms[0], 21, 1, 0, 1, [0, 1], Fleet.MAX_MOVE_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.DEEPSEA), new Field([0, -1], FieldType.MOUNTAINS)];
        fleet.clickedMoves();
        t.moveImpossible( fleet.possibleMoves, new Move(0, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Deepsea -> shallows", function(t: any) {
        let fleet = new Fleet(311, GameState.realms[0], 21, 1, 0, 1, [0, 1], Fleet.MAX_MOVE_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.DEEPSEA), new Field([0, -1], FieldType.SHALLOWS), new Field([1, -1], FieldType.LOWLANDS)];
        fleet.clickedMoves();
        t.movePossible( fleet.possibleMoves, new Move(10, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Deepsea -> shallows on coast", function(t: any) {
        let fleet = new Fleet(311, GameState.realms[0], 21, 1, 0, 1, [0, 1], Fleet.MAX_MOVE_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.DEEPSEA), new Field([0, -1], FieldType.SHALLOWS), new Field([1, -1], FieldType.LOWLANDS)];
        GameState.realms[0].territory = GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
        fleet.clickedMoves();
        t.movePossible( fleet.possibleMoves, new Move(7, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Deepsea -> deepsea", function(t: any) {
        let fleet = new Fleet(311, GameState.realms[0], 21, 1, 0, 1, [0, 1], Fleet.MAX_MOVE_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.DEEPSEA), new Field([0, -1], FieldType.DEEPSEA), new Field([1, -1], FieldType.LOWLANDS)];
        fleet.clickedMoves();
        t.movePossible( fleet.possibleMoves, new Move(21, 0, false, false, [0, -1], Direction.NW));
    });
    test( "Deepsea -> deepsea on coast", function(t: any) {
        let fleet = new Fleet(311, GameState.realms[0], 21, 1, 0, 1, [0, 1], Fleet.MAX_MOVE_POINTS, false);
        GameState.fields = [new Field([0, 0], FieldType.DEEPSEA), new Field([0, -1], FieldType.DEEPSEA), new Field([1, -1], FieldType.LOWLANDS)];
        GameState.realms[0].territory = GameState.fields.filter(field => field.coordinates[0] === 0 && field.coordinates[1] === -1);
        fleet.clickedMoves();
        t.movePossible( fleet.possibleMoves, new Move(14, 0, false, false, [0, -1], Direction.NW));
    });
}