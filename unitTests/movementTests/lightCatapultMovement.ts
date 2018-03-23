import {FootArmy} from "../../armies/footArmy";
import {GameState} from "../../gameState";
import {Fleet} from "../../armies/fleet";
import {QUnit} from "qunit";

const { test } = QUnit;

export function lightCatapultMovementTests() {
    test( "Lowlands -> lowlands", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':2}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Lowlands -> lowlands on street", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':2}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Lowlands -> lowlands in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':2}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Lowlands -> lowlands on street in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':2}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Lowlands -> desert", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':7}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Lowlands -> desert on street", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':7}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Lowlands -> desert in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':7}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Lowlands -> desert on street in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':7}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Lowlands -> woods", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':3}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Lowlands -> woods on street", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':3}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Lowlands -> woods in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':3}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Lowlands -> woods on street in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':3}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Lowlands -> swamp", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':8}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Lowlands -> swamp on street", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':8}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Lowlands -> swamp in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':8}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Lowlands -> swamp on street in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':8}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Lowlands -> hills", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':4}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Lowlands -> hills on street", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':4}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Lowlands -> hills in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':4}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Lowlands -> hills on street in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':4}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Lowlands -> highlands", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':5}];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Lowlands -> mountains", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':6}];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Lowlands -> shallows", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, -1, 1);
        GameState.armies = [army, fleet];
        GameState.fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':0}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 0, height: 2, landunit: true,x: 0, y: -1, load: true} );
    });
    test( "Lowlands -> shallows with harbor", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, -1, 1);
        GameState.armies = [army, fleet];
        GameState.fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':0}];
        buildings = [{'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': 0, 'direction': "nw"}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 0, height: 1, landunit: true,x: 0, y: -1, load: true} );
    });
    test( "Lowlands -> deepsea", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, -1, 1);
        GameState.armies = [army, fleet];
        GameState.fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':1}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 0, height: 2, landunit: true,x: 0, y: -1, load: true} );
    });
    test( "Lowlands -> deepsea with harbor", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, -1, 1);
        GameState.armies = [army, fleet];
        GameState.fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':1}];
        buildings = [{'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': 0, 'direction': "nw"}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 0, height: 1, landunit: true,x: 0, y: -1, load: true} );
    });
    test( "Desert -> lowlands", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':2}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Desert -> lowlands on street", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':2}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Desert -> lowlands in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':2}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Desert -> lowlands on street in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':2}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Desert -> desert", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':7}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Desert -> desert on street", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':7}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Desert -> desert in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':7}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Desert -> desert on street in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':7}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Desert -> woods", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':3}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Desert -> woods on street", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':3}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Desert -> woods in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':3}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Desert -> woods on street in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':3}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Desert -> swamp", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':8}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Desert -> swamp on street", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':8}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Desert -> swamp in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':8}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Desert -> swamp on street in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':8}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Desert -> hills", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':4}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Desert -> hills on street", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':4}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Desert -> hills in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':4}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Desert -> hills on street in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':4}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Desert -> highlands", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':5}];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Desert -> mountains", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':6}];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Desert -> shallows", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, -1, 1);
        GameState.armies = [army, fleet];
        GameState.fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':0}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 0, height: 2, landunit: true,x: 0, y: -1, load: true} );
    });
    test( "Desert -> shallows with harbor", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, -1, 1);
        GameState.armies = [army, fleet];
        GameState.fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':0}];
        buildings = [{'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': 0, 'direction': "nw"}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 0, height: 1, landunit: true,x: 0, y: -1, load: true} );
    });
    test( "Desert -> deepsea", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, -1, 1);
        GameState.armies = [army, fleet];
        GameState.fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':1}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 0, height: 2, landunit: true,x: 0, y: -1, load: true} );
    });
    test( "Desert -> deepsea with harbor", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, -1, 1);
        GameState.armies = [army, fleet];
        GameState.fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':1}];
        buildings = [{'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': 0, 'direction': "nw"}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 0, height: 1, landunit: true,x: 0, y: -1, load: true} );
    });
    test( "Woods -> lowlands", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':2}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Woods -> lowlands on street", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':2}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Woods -> lowlands in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':2}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Woods -> lowlands on street in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':2}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Woods -> desert", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':7}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Woods -> desert on street", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':7}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Woods -> desert in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':7}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Woods -> desert on street in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':7}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Woods -> woods", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':3}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Woods -> woods on street", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':3}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Woods -> woods in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':3}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Woods -> woods on street in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':3}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Woods -> swamp", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':8}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Woods -> swamp on street", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':8}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Woods -> swamp in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':8}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Woods -> swamp on street in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':8}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Woods -> hills", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':4}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Woods -> hills on street", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':4}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Woods -> hills in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':4}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Woods -> hills on street in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':4}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Woods -> highlands", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':5}];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Woods -> mountains", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':6}];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Woods -> shallows", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, -1, 1);
        GameState.armies = [army, fleet];
        GameState.fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':0}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 0, height: 2, landunit: true,x: 0, y: -1, load: true} );
    });
    test( "Woods -> shallows with harbor", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, -1, 1);
        GameState.armies = [army, fleet];
        GameState.fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':0}];
        buildings = [{'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': 0, 'direction': "nw"}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 0, height: 1, landunit: true,x: 0, y: -1, load: true} );
    });
    test( "Woods -> deepsea", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, -1, 1);
        GameState.armies = [army, fleet];
        GameState.fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':1}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 0, height: 2, landunit: true,x: 0, y: -1, load: true} );
    });
    test( "Woods -> deepsea with harbor", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, -1, 1);
        GameState.armies = [army, fleet];
        GameState.fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':1}];
        buildings = [{'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': 0, 'direction': "nw"}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 0, height: 1, landunit: true,x: 0, y: -1, load: true} );
    });
    test( "Swamp -> lowlands", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':2}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Swamp -> lowlands on street", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':2}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Swamp -> lowlands in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':2}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Swamp -> lowlands on street in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':2}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Swamp -> desert", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':7}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Swamp -> desert on street", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':7}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Swamp -> desert in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':7}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Swamp -> desert on street in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':7}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Swamp -> woods", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':3}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Swamp -> woods on street", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':3}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Swamp -> woods in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':3}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Swamp -> woods on street in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':3}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Swamp -> swamp", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':8}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Swamp -> swamp on street", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':8}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Swamp -> swamp in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':8}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Swamp -> swamp on street in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':8}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Swamp -> hills", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':4}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Swamp -> hills on street", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':4}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Swamp -> hills in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':4}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Swamp -> hills on street in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':4}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Swamp -> highlands", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':5}];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Swamp -> mountains", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':6}];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Swamp -> shallows", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, -1, 1);
        GameState.armies = [army, fleet];
        GameState.fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':0}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 0, height: 2, landunit: true,x: 0, y: -1, load: true} );
    });
    test( "Swamp -> shallows with harbor", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, -1, 1);
        GameState.armies = [army, fleet];
        GameState.fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':0}];
        buildings = [{'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': 0, 'direction': "nw"}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 0, height: 1, landunit: true,x: 0, y: -1, load: true} );
    });
    test( "Swamp -> deepsea", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, -1, 1);
        GameState.armies = [army, fleet];
        GameState.fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':1}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 0, height: 2, landunit: true,x: 0, y: -1, load: true} );
    });
    test( "Swamp -> deepsea with harbor", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, -1, 1);
        GameState.armies = [army, fleet];
        GameState.fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':1}];
        buildings = [{'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': 0, 'direction': "nw"}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 0, height: 1, landunit: true,x: 0, y: -1, load: true} );
    });
    test( "Hills -> lowlands", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':2}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Hills -> lowlands on street", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':2}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Hills -> lowlands in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':2}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Hills -> lowlands on street in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':2}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Hills -> desert", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':7}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Hills -> desert on street", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':7}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Hills -> desert in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':7}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Hills -> desert on street in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':7}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Hills -> woods", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':3}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Hills -> woods on street", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':3}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Hills -> woods in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':3}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Hills -> woods on street in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':3}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Hills -> swamp", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':8}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Hills -> swamp on street", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':8}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Hills -> swamp in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':8}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Hills -> swamp on street in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':8}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Hills -> hills", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':4}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Hills -> hills on street", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':4}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Hills -> hills in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':4}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Hills -> hills on street in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':4}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Hills -> highlands", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':5}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Hills -> highlands on street", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':5}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Hills -> highlands in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':5}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Hills -> highlands on street in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':5}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Hills -> mountains", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':6}];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Hills -> shallows", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, -1, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':0}];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Hills -> deepsea", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, -1, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':1}];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Highlands -> lowlands", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':5}, {'x':0, 'y':-1, 'type':2}];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Highlands -> desert", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':5}, {'x':0, 'y':-1, 'type':7}];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Highlands -> woods", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':5}, {'x':0, 'y':-1, 'type':3}];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Highlands -> swamp", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':5}, {'x':0, 'y':-1, 'type':8}];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Highlands -> hills", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':5}, {'x':0, 'y':-1, 'type':4}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Highlands -> hills on street", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':5}, {'x':0, 'y':-1, 'type':4}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Highlands -> hills in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':5}, {'x':0, 'y':-1, 'type':4}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Highlands -> hills on street in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':5}, {'x':0, 'y':-1, 'type':4}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Highlands -> highlands", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':5}, {'x':0, 'y':-1, 'type':5}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Highlands -> highlands on street", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':5}, {'x':0, 'y':-1, 'type':5}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Highlands -> highlands in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':5}, {'x':0, 'y':-1, 'type':5}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Highlands -> highlands on street in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':5}, {'x':0, 'y':-1, 'type':5}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Highlands -> mountains", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':5}, {'x':0, 'y':-1, 'type':6}];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Highlands -> mountains on street", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':5}, {'x':0, 'y':-1, 'type':6}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Highlands -> mountains on street in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':5}, {'x':0, 'y':-1, 'type':6}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Highlands -> shallows", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, -1, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':5}, {'x':0, 'y':-1, 'type':0}];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Highlands -> deepsea", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, -1, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':5}, {'x':0, 'y':-1, 'type':1}];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Mountains -> lowlands", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':6}, {'x':0, 'y':-1, 'type':2}];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Mountains -> desert", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':6}, {'x':0, 'y':-1, 'type':7}];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Mountains -> woods", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':6}, {'x':0, 'y':-1, 'type':3}];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Mountains -> swamp", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':6}, {'x':0, 'y':-1, 'type':8}];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Mountains -> hills", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':6}, {'x':0, 'y':-1, 'type':4}];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Mountains -> highlands", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':6}, {'x':0, 'y':-1, 'type':5}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Mountains -> highlands on street", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':6}, {'x':0, 'y':-1, 'type':5}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Mountains -> highlands in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':6}, {'x':0, 'y':-1, 'type':5}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Mountains -> highlands on street in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':6}, {'x':0, 'y':-1, 'type':5}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Mountains -> mountains", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':6}, {'x':0, 'y':-1, 'type':6}];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Mountains -> mountains on street", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':6}, {'x':0, 'y':-1, 'type':6}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Mountains -> mountains on street in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':6}, {'x':0, 'y':-1, 'type':6}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Mountains -> shallows", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, -1, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':6}, {'x':0, 'y':-1, 'type':0}];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Mountains -> deepsea", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, -1, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':6}, {'x':0, 'y':-1, 'type':1}];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Shallows -> lowlands", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [{'x':0, 'y':0, 'type':0}, {'x':0, 'y':-1, 'type':2}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1, unload: true} );
    });
    test( "Shallows -> lowlands with harbor", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [{'x':0, 'y':0, 'type':0}, {'x':0, 'y':-1, 'type':2}];
        buildings = [{'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': -1, 'direction': "se"}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 1, landunit: true,x: 0, y: -1, unload: true} );
    });
    test( "Shallows -> lowlands in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [{'x':0, 'y':0, 'type':0}, {'x':0, 'y':-1, 'type':2}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1, unload: true} );
    });
    test( "Shallows -> lowlands with harbor in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [{'x':0, 'y':0, 'type':0}, {'x':0, 'y':-1, 'type':2}];
        buildings = [{'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': -1, 'direction': "se"}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 1, landunit: true,x: 0, y: -1, unload: true} );
    });
    test( "Shallows -> desert", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [{'x':0, 'y':0, 'type':0}, {'x':0, 'y':-1, 'type':7}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1, unload: true} );
    });
    test( "Shallows -> desert with harbor", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [{'x':0, 'y':0, 'type':0}, {'x':0, 'y':-1, 'type':7}];
        buildings = [{'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': -1, 'direction': "se"}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 1, landunit: true,x: 0, y: -1, unload: true} );
    });
    test( "Shallows -> desert in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [{'x':0, 'y':0, 'type':0}, {'x':0, 'y':-1, 'type':7}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1, unload: true} );
    });
    test( "Shallows -> desert with harbor in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [{'x':0, 'y':0, 'type':0}, {'x':0, 'y':-1, 'type':7}];
        buildings = [{'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': -1, 'direction': "se"}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 1, landunit: true,x: 0, y: -1, unload: true} );
    });
    test( "Shallows -> woods", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [{'x':0, 'y':0, 'type':0}, {'x':0, 'y':-1, 'type':3}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1, unload: true} );
    });
    test( "Shallows -> woods with harbor", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [{'x':0, 'y':0, 'type':0}, {'x':0, 'y':-1, 'type':3}];
        buildings = [{'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': -1, 'direction': "se"}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 1, landunit: true,x: 0, y: -1, unload: true} );
    });
    test( "Shallows -> woods in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [{'x':0, 'y':0, 'type':0}, {'x':0, 'y':-1, 'type':3}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1, unload: true} );
    });
    test( "Shallows -> woods with harbor in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [{'x':0, 'y':0, 'type':0}, {'x':0, 'y':-1, 'type':3}];
        buildings = [{'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': -1, 'direction': "se"}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 1, landunit: true,x: 0, y: -1, unload: true} );
    });
    test( "Shallows -> swamp", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [{'x':0, 'y':0, 'type':0}, {'x':0, 'y':-1, 'type':8}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1, unload: true} );
    });
    test( "Shallows -> swamp with harbor", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [{'x':0, 'y':0, 'type':0}, {'x':0, 'y':-1, 'type':8}];
        buildings = [{'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': -1, 'direction': "se"}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 1, landunit: true,x: 0, y: -1, unload: true} );
    });
    test( "Shallows -> swamp in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [{'x':0, 'y':0, 'type':0}, {'x':0, 'y':-1, 'type':8}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1, unload: true} );
    });
    test( "Shallows -> swamp with harbor in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [{'x':0, 'y':0, 'type':0}, {'x':0, 'y':-1, 'type':8}];
        buildings = [{'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': -1, 'direction': "se"}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 1, landunit: true,x: 0, y: -1, unload: true} );
    });
    test( "Shallows -> hills", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [{'x':0, 'y':0, 'type':0}, {'x':0, 'y':-1, 'type':4}];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Shallows -> highlands", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [{'x':0, 'y':0, 'type':0}, {'x':0, 'y':-1, 'type':5}];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Shallows -> mountains", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [{'x':0, 'y':0, 'type':0}, {'x':0, 'y':-1, 'type':6}];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Shallows -> shallows", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        let anotherFleet = new Fleet(322, 21, 1, 0, 0, false, 0, -1, 1);
        GameState.armies = [army, fleet, anotherFleet];
        fleet.loadArmy(army);
        GameState.fields = [{'x':0, 'y':0, 'type':0}, {'x':0, 'y':-1, 'type':0}];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Shallows -> deepsea", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        let anotherFleet = new Fleet(322, 21, 1, 0, 0, false, 0, -1, 1);
        GameState.armies = [army, fleet, anotherFleet];
        fleet.loadArmy(army);
        GameState.fields = [{'x':0, 'y':0, 'type':0}, {'x':0, 'y':-1, 'type':1}];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Deepsea -> lowlands", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [{'x':0, 'y':0, 'type':1}, {'x':0, 'y':-1, 'type':2}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1, unload: true} );
    });
    test( "Deepsea -> lowlands with harbor", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [{'x':0, 'y':0, 'type':1}, {'x':0, 'y':-1, 'type':2}];
        buildings = [{'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': -1, 'direction': "se"}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 1, landunit: true,x: 0, y: -1, unload: true} );
    });
    test( "Deepsea -> lowlands in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [{'x':0, 'y':0, 'type':1}, {'x':0, 'y':-1, 'type':2}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1, unload: true} );
    });
    test( "Deepsea -> lowlands with harbor in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [{'x':0, 'y':0, 'type':1}, {'x':0, 'y':-1, 'type':2}];
        buildings = [{'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': -1, 'direction': "se"}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 1, landunit: true,x: 0, y: -1, unload: true} );
    });
    test( "Deepsea -> desert", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [{'x':0, 'y':0, 'type':1}, {'x':0, 'y':-1, 'type':7}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1, unload: true} );
    });
    test( "Deepsea -> desert with harbor", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [{'x':0, 'y':0, 'type':1}, {'x':0, 'y':-1, 'type':7}];
        buildings = [{'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': -1, 'direction': "se"}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 1, landunit: true,x: 0, y: -1, unload: true} );
    });
    test( "Deepsea -> desert in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [{'x':0, 'y':0, 'type':1}, {'x':0, 'y':-1, 'type':7}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1, unload: true} );
    });
    test( "Deepsea -> desert with harbor in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [{'x':0, 'y':0, 'type':1}, {'x':0, 'y':-1, 'type':7}];
        buildings = [{'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': -1, 'direction': "se"}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 1, landunit: true,x: 0, y: -1, unload: true} );
    });
    test( "Deepsea -> woods", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [{'x':0, 'y':0, 'type':1}, {'x':0, 'y':-1, 'type':3}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1, unload: true} );
    });
    test( "Deepsea -> woods with harbor", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [{'x':0, 'y':0, 'type':1}, {'x':0, 'y':-1, 'type':3}];
        buildings = [{'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': -1, 'direction': "se"}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 1, landunit: true,x: 0, y: -1, unload: true} );
    });
    test( "Deepsea -> woods in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [{'x':0, 'y':0, 'type':1}, {'x':0, 'y':-1, 'type':3}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1, unload: true} );
    });
    test( "Deepsea -> woods with harbor in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [{'x':0, 'y':0, 'type':1}, {'x':0, 'y':-1, 'type':3}];
        buildings = [{'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': -1, 'direction': "se"}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 1, landunit: true,x: 0, y: -1, unload: true} );
    });
    test( "Deepsea -> swamp", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [{'x':0, 'y':0, 'type':1}, {'x':0, 'y':-1, 'type':8}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1, unload: true} );
    });
    test( "Deepsea -> swamp with harbor", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [{'x':0, 'y':0, 'type':1}, {'x':0, 'y':-1, 'type':8}];
        buildings = [{'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': -1, 'direction': "se"}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 1, landunit: true,x: 0, y: -1, unload: true} );
    });
    test( "Deepsea -> swamp in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [{'x':0, 'y':0, 'type':1}, {'x':0, 'y':-1, 'type':8}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1, unload: true} );
    });
    test( "Deepsea -> swamp with harbor in homeland", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [{'x':0, 'y':0, 'type':1}, {'x':0, 'y':-1, 'type':8}];
        buildings = [{'realm': 1, 'name': '', 'type': 6, 'x': 0, 'y': -1, 'direction': "se"}];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: true, dir: 0, movepoints: 7, height: 1, landunit: true,x: 0, y: -1, unload: true} );
    });
    test( "Deepsea -> hills", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [{'x':0, 'y':0, 'type':1}, {'x':0, 'y':-1, 'type':4}];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Deepsea -> highlands", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [{'x':0, 'y':0, 'type':1}, {'x':0, 'y':-1, 'type':5}];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Deepsea -> mountains", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        GameState.armies = [army, fleet];
        fleet.loadArmy(army);
        GameState.fields = [{'x':0, 'y':0, 'type':1}, {'x':0, 'y':-1, 'type':6}];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Deepsea -> shallows", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        let anotherFleet = new Fleet(322, 21, 1, 0, 0, false, 0, -1, 1);
        GameState.armies = [army, fleet, anotherFleet];
        fleet.loadArmy(army);
        GameState.fields = [{'x':0, 'y':0, 'type':1}, {'x':0, 'y':-1, 'type':0}];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Deepsea -> deepsea", function(t: any) {
        let army = new FootArmy(111, 1000, 1, 1, 0, 0, false, 0, 0, 1);
        let fleet = new Fleet(311, 21, 1, 0, 0, false, 0, 0, 1);
        let anotherFleet = new Fleet(322, 21, 1, 0, 0, false, 0, -1, 1);
        GameState.armies = [army, fleet, anotherFleet];
        fleet.loadArmy(army);
        GameState.fields = [{'x':0, 'y':0, 'type':1}, {'x':0, 'y':-1, 'type':1}];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
}