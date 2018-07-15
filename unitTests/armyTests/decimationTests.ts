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

import {FootArmy} from "../../armies/footArmy";
import {RiderArmy} from "../../armies/riderArmy";
import {Fleet} from "../../armies/fleet";
import {GameState} from "../../gameState";
import {QUnit} from "../qunit";

const { test } = QUnit;
const { module } = QUnit;

export function decimationTests() {
    module( "Regular" , function() {
        test( "Foot army decimation", function(t: any){
            let army = new FootArmy(101, GameState.realms[0], 10000, 100, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
            army.takeDamage(1000);
            t.armyEquals(army, new FootArmy(101, GameState.realms[0], 10000, 100, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2));
        });
        test( "Foot army with catapults decimation", function(t: any){
            let army = new FootArmy(101, GameState.realms[0], 9000, 90, 9, 9, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
            army.takeDamage(1000);
            t.armyEquals(army, new FootArmy(101, GameState.realms[0], 9000, 90, 9, 9, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2));
        });
        test( "Foot army with mounts decimation", function(t: any){
            let army = new FootArmy(101, GameState.realms[0], 10000, 100, 0, 0, 10000, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
            army.takeDamage(1000);
            t.armyEquals(army, new FootArmy(101, GameState.realms[0], 9000, 90, 0, 0, 9000, [0, 0], FootArmy.MAX_MOVE_POINTS, 2));
        });
        test( "Rider army decimation", function(t: any){
            let army= new RiderArmy(201, GameState.realms[0], 10000, 100, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
            army.takeDamage(1000);
            t.armyEquals(army, new RiderArmy(201, GameState.realms[0], 9000, 90, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false));
        });
        test( "Fleet decimation", function(t: any){
            let army = new Fleet(301, GameState.realms[0], 100, 10, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
            army.takeDamage(10);
            t.armyEquals(army, new Fleet(301, GameState.realms[0], 90, 9, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false));
        });
        test( "Fleet with warships decimation", function(t: any){
            let army = new Fleet(301, GameState.realms[0], 100, 10, 10, 10, [0, 0], Fleet.MAX_MOVE_POINTS, false);
            army.takeDamage(10);
            t.armyEquals(army, new Fleet(301, GameState.realms[0], 90, 9, 9, 9, [0, 0], Fleet.MAX_MOVE_POINTS, false));
        });
    });
    module( "Transported Troops" , function() {
        test( "Fleet transporting at full capacity halved", function(t: any){
            let fleet = new Fleet(301, GameState.realms[0], 100, 10, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
            let transportedArmy = new FootArmy(101, GameState.realms[0], 9000, 10, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
            GameState.armies = [transportedArmy];
            fleet.loadArmy(transportedArmy);
            fleet.takeDamage(50);
            t.armyEquals(transportedArmy, new FootArmy(101, GameState.realms[0], 4500, 5, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2));
        });
        test( "Fleet transporting at 75% capacity halved", function(t: any){
            let fleet = new Fleet(301, GameState.realms[0], 100, 10, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
            let transportedArmy = new FootArmy(101, GameState.realms[0], 7000, 5, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
            GameState.armies = [transportedArmy];
            fleet.loadArmy(transportedArmy);
            fleet.takeDamage(50);
            t.armyEquals(transportedArmy, new FootArmy(101, GameState.realms[0], 4666, 3, 0, 0, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2));
        });
        test( "Fleet transporting riders at full capacity halved", function(t: any){
            let fleet = new Fleet(301, GameState.realms[0], 100, 10, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
            let transportedArmy= new RiderArmy(201, GameState.realms[0], 4500, 10, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false);
            GameState.armies = [transportedArmy];
            fleet.loadArmy(transportedArmy);
            fleet.takeDamage(50);
            t.armyEquals(transportedArmy, new RiderArmy(201, GameState.realms[0], 2250, 5, [0, 0], RiderArmy.MAX_MOVE_POINTS, 2, false));
        });
        test( "Fleet transporting army with catapults at full capacity halved", function(t: any){
            let fleet = new Fleet(301, GameState.realms[0], 100, 10, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
            let transportedArmy = new FootArmy(101, GameState.realms[0], 1000, 10, 4, 2, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
            GameState.armies = [transportedArmy];
            fleet.loadArmy(transportedArmy);
            fleet.takeDamage(50);
            t.armyEquals(transportedArmy, new FootArmy(101, GameState.realms[0], 500, 5, 2, 1, 0, [0, 0], FootArmy.MAX_MOVE_POINTS, 2));
        });
        test( "Fleet transporting army with mounts at full capacity halved", function(t: any){
            let fleet = new Fleet(301, GameState.realms[0], 100, 10, 0, 0, [0, 0], Fleet.MAX_MOVE_POINTS, false);
            let transportedArmy = new FootArmy(101, GameState.realms[0], 4500, 10, 0, 0, 4500, [0, 0], FootArmy.MAX_MOVE_POINTS, 2);
            GameState.armies = [transportedArmy];
            fleet.loadArmy(transportedArmy);
            fleet.takeDamage(50);
            t.armyEquals(transportedArmy, new FootArmy(101, GameState.realms[0], 2250, 5, 0, 0, 2250, [0, 0], FootArmy.MAX_MOVE_POINTS, 2));
        });
    });
}