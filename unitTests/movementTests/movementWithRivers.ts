import {FootArmy} from "../../armies/footArmy";
import {RiderArmy} from "../../armies/riderArmy";
import {GameState} from "../../gameState";
import {QUnit} from "qunit";

const { test } = QUnit;

export function movementWithRiversTests() {
    test( "Foot lowlands -> lowlands over a river", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':2}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 9, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Foot lowlands -> lowlands over a river with a bridge", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':2}];
        buildings = [{'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw"}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Foot lowlands -> lowlands over a river with a street", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':2}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 9, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Foot lowlands -> lowlands over a river with a bridge and a street", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':2}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1},
            {'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw"}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Foot lowlands -> lowlands over a river in homeland", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':2}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 9, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Foot lowlands -> lowlands over a river with a bridge in homeland", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':2}];
        buildings = [{'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw"}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 4, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Foot lowlands -> lowlands over a river with a street in homeland", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':2}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 9, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Foot lowlands -> lowlands over a river with a bridge and a street in homeland", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':2}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1},
            {'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw"}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 3, height: 1, landunit: true,x: 0, y: -1} );
    });
    test( "Foot lowlands -> hills over a river", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':4}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Foot lowlands -> hills over a river with a street", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':4}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Foot lowlands -> hills over a river in homeland", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':4}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Foot lowlands -> hills over a river with a street in homeland", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':4}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Foot lowlands -> desert over a river", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':7}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 9, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Foot lowlands -> desert over a river with a bridge", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':7}];
        buildings = [{'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw"}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Foot lowlands -> woods over a river", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':3}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 9, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Foot lowlands -> woods over a river with a bridge", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':3}];
        buildings = [{'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw"}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Foot lowlands -> swamp over a river", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':8}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 9, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Foot lowlands -> swamp over a river with a bridge", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':8}];
        buildings = [{'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw"}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Foot lowlands -> highlands over a river", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':5}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Foot lowlands -> mountains over a river", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':6}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Foot desert -> lowlands over a river", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':2}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 9, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Foot desert -> lowlands over a river with a bridge", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':2}];
        buildings = [{'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw"}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Foot desert -> desert over a river", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':7}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 9, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Foot desert -> desert over a river with a bridge", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':7}];
        buildings = [{'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw"}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Foot desert -> woods over a river", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':3}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 9, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Foot desert -> woods over a river with a bridge", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':3}];
        buildings = [{'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw"}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Foot desert -> swamp over a river", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':8}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 9, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Foot desert -> swamp over a river with a bridge", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':8}];
        buildings = [{'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw"}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Foot desert -> hills over a river", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':4}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Foot desert -> highlands over a river", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':5}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Foot desert -> mountains over a river", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':6}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Foot woods -> lowlands over a river", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':2}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 9, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Foot woods -> lowlands over a river with a bridge", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':2}];
        buildings = [{'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw"}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Foot woods -> desert over a river", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':7}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 9, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Foot woods -> desert over a river with a bridge", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':7}];
        buildings = [{'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw"}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Foot woods -> woods over a river", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':3}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 9, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Foot woods -> woods over a river with a bridge", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':3}];
        buildings = [{'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw"}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Foot woods -> swamp over a river", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':8}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 9, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Foot woods -> swamp over a river with a bridge", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':8}];
        buildings = [{'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw"}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Foot woods -> hills over a river", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':4}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Foot woods -> highlands over a river", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':5}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Foot woods -> mountains over a river", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':6}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Foot swamp -> lowlands over a river", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':2}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 9, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Foot swamp -> lowlands over a river with a bridge", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':2}];
        buildings = [{'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw"}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Foot swamp -> desert over a river", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':7}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 9, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Foot swamp -> desert over a river with a bridge", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':7}];
        buildings = [{'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw"}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Foot swamp -> woods over a river", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':3}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 9, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Foot swamp -> woods over a river with a bridge", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':3}];
        buildings = [{'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw"}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Foot swamp -> swamp over a river", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':8}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 9, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Foot swamp -> swamp over a river with a bridge", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':8}];
        buildings = [{'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw"}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Foot swamp -> hills over a river", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':4}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Foot swamp -> highlands over a river", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':5}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Foot swamp -> mountains over a river", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':6}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Foot hills -> lowlands over a river", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':2}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Foot hills -> lowlands over a river with a street", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':2}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Foot hills -> lowlands over a river in homeland", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':2}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Foot hills -> lowlands over a river with a street in homeland", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':2}];
        buildings = [{'realm': 1, 'name': '', 'type': 8, 'firstX': 0, 'firstY': 0, 'secondX': 0, 'secondY': -1}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        borders = [{'tag': 'r01', 'land': [[0, -1]]}];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Foot hills -> desert over a river", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':7}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Foot hills -> woods over a river", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':3}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Foot hills -> swamp over a river", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':8}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Foot hills -> hills over a river", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':4}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 9, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Foot hills -> hills over a river with a bridge", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':4}];
        buildings = [{'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw"}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Foot hills -> highlands over a river", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':5}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Foot hills -> mountains over a river", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':6}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Foot highlands -> lowlands over a river", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':5}, {'x':0, 'y':-1, 'type':2}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Foot highlands -> desert over a river", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':5}, {'x':0, 'y':-1, 'type':7}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Foot highlands -> woods over a river", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':5}, {'x':0, 'y':-1, 'type':3}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Foot highlands -> swamp over a river", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':5}, {'x':0, 'y':-1, 'type':8}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Foot highlands -> hills over a river", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':5}, {'x':0, 'y':-1, 'type':4}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Foot highlands -> highlands over a river", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':5}, {'x':0, 'y':-1, 'type':5}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 9, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Foot highlands -> highlands over a river with a bridge", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':5}, {'x':0, 'y':-1, 'type':5}];
        buildings = [{'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw"}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Foot highlands -> mountains over a river", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':5}, {'x':0, 'y':-1, 'type':6}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Foot mountains -> lowlands over a river", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':6}, {'x':0, 'y':-1, 'type':2}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Foot mountains -> desert over a river", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':6}, {'x':0, 'y':-1, 'type':7}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Foot mountains -> woods over a river", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':6}, {'x':0, 'y':-1, 'type':3}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Foot mountains -> swamp over a river", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':6}, {'x':0, 'y':-1, 'type':8}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Foot mountains -> hills over a river", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':6}, {'x':0, 'y':-1, 'type':4}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Foot mountains -> highlands over a river", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':6}, {'x':0, 'y':-1, 'type':5}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Foot mountains -> mountains over a river", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':6}, {'x':0, 'y':-1, 'type':6}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 9, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Foot mountains -> mountains over a river with a bridge", function(t: any) {
        let army= new FootArmy(111, 1000, 1, 0, 0, 0, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':6}, {'x':0, 'y':-1, 'type':6}];
        buildings = [{'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw"}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Horse lowlands -> lowlands over a river", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':2}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 21, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Horse lowlands -> lowlands over a river with a bridge", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':2}];
        buildings = [{'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw"}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Horse lowlands -> desert over a river", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':7}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 21, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Horse lowlands -> desert over a river with a bridge", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':7}];
        buildings = [{'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw"}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Horse lowlands -> woods over a river", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':3}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 21, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Horse lowlands -> woods over a river with a bridge", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':3}];
        buildings = [{'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw"}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 10, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Horse lowlands -> swamp over a river", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':8}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 21, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Horse lowlands -> swamp over a river with a bridge", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':8}];
        buildings = [{'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw"}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 10, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Horse lowlands -> hills over a river", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':4}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Horse lowlands -> highlands over a river", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':5}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Horse lowlands -> mountains over a river", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':2}, {'x':0, 'y':-1, 'type':6}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Horse desert -> lowlands over a river", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':2}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 21, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Horse desert -> lowlands over a river with a bridge", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':2}];
        buildings = [{'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw"}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Horse desert -> desert over a river", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':7}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 21, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Horse desert -> desert over a river with a bridge", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':7}];
        buildings = [{'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw"}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Horse desert -> woods over a river", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':3}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 21, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Horse desert -> woods over a river with a bridge", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':3}];
        buildings = [{'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw"}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 10, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Horse desert -> swamp over a river", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':8}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 21, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Horse desert -> swamp over a river with a bridge", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':8}];
        buildings = [{'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw"}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 10, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Horse desert -> hills over a river", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':4}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Horse desert -> highlands over a river", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':5}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Horse desert -> mountains over a river", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':7}, {'x':0, 'y':-1, 'type':6}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Horse woods -> lowlands over a river", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':2}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 21, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Horse woods -> lowlands over a river with a bridge", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':2}];
        buildings = [{'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw"}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Horse woods -> desert over a river", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':7}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 21, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Horse woods -> desert over a river with a bridge", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':7}];
        buildings = [{'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw"}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Horse woods -> woods over a river", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':3}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 21, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Horse woods -> woods over a river with a bridge", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':3}];
        buildings = [{'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw"}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 10, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Horse woods -> swamp over a river", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':8}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 21, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Horse woods -> swamp over a river with a bridge", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':8}];
        buildings = [{'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw"}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 10, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Horse woods -> hills over a river", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':4}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Horse woods -> highlands over a river", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':5}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Horse woods -> mountains over a river", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':3}, {'x':0, 'y':-1, 'type':6}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Horse swamp -> lowlands over a river", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':2}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 21, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Horse swamp -> lowlands over a river with a bridge", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':2}];
        buildings = [{'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw"}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Horse swamp -> desert over a river", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':7}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 21, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Horse swamp -> desert over a river with a bridge", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':7}];
        buildings = [{'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw"}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Horse swamp -> woods over a river", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':3}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 21, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Horse swamp -> woods over a river with a bridge", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':3}];
        buildings = [{'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw"}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 10, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Horse swamp -> swamp over a river", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':8}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 21, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Horse swamp -> swamp over a river with a bridge", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':8}];
        buildings = [{'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw"}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 10, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Horse swamp -> hills over a river", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':4}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Horse swamp -> highlands over a river", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':5}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Horse swamp -> mountains over a river", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':8}, {'x':0, 'y':-1, 'type':6}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Horse hills -> lowlands over a river", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':2}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Horse hills -> desert over a river", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':7}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Horse hills -> woods over a river", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':3}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Horse hills -> swamp over a river", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':8}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Horse hills -> hills over a river", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':4}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 21, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Horse hills -> hills over a river with a bridge", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':4}];
        buildings = [{'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw"}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 7, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Horse hills -> highlands over a river", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':5}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Horse hills -> mountains over a river", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':4}, {'x':0, 'y':-1, 'type':6}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Horse highlands -> lowlands over a river", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':5}, {'x':0, 'y':-1, 'type':2}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Horse highlands -> desert over a river", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':5}, {'x':0, 'y':-1, 'type':7}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Horse highlands -> woods over a river", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':5}, {'x':0, 'y':-1, 'type':3}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Horse highlands -> swamp over a river", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':5}, {'x':0, 'y':-1, 'type':8}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Horse highlands -> hills over a river", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':5}, {'x':0, 'y':-1, 'type':4}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
    test( "Horse highlands -> highlands over a river", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':5}, {'x':0, 'y':-1, 'type':5}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 21, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Horse highlands -> highlands over a river with a bridge", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':5}, {'x':0, 'y':-1, 'type':5}];
        buildings = [{'realm': 1, 'name': '', 'type': 7, 'x': 0, 'y': 0, 'direction': "nw"}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.movePossible( army.possibleMoves, {changHeight: false, dir: 0, movepoints: 21, height: 2, landunit: true,x: 0, y: -1} );
    });
    test( "Horse highlands -> mountains over a river", function(t: any) {
        let army= new RiderArmy(211, 1000, 1, false, 0, 0, 1);
        GameState.fields = [{'x':0, 'y':0, 'type':5}, {'x':0, 'y':-1, 'type':6}];
        GameState.rivers = [[[0, 0], [0, -1]]];
        army.clickedMoves();
        t.moveImpossible( army.possibleMoves, {dir: 0,x: 0, y: -1} );
    });
}