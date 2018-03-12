import {FootArmy} from "../../armies/footArmy";
import {RiderArmy} from "../../armies/riderArmy";
import {Fleet} from "../../armies/fleet";
import {GameState} from "../../gameState";

export function decimationTests() {
    module( "Regular" , function() {
        test( "Foot army decimation", function(t: any){
            let army = new FootArmy(101, 10000, 100, 0, 0, 0, false, 0, 0, 1);
            army.decimate(1000);
            t.armyEquals(army, new FootArmy(101, 9000, 90, 0, 0, 0, false, 0, 0, 1));
        });
        test( "Foot army with catapults decimation", function(t: any){
            let army = new FootArmy(101, 10000, 100, 10, 10, 0, false, 0, 0, 1);
            army.decimate(1000);
            t.armyEquals(army, new FootArmy(101, 9000, 90, 9, 9, 0, false, 0, 0, 1));
        });
        test( "Foot army with mounts decimation", function(t: any){
            let army = new FootArmy(101, 10000, 100, 0, 0, 10000, false, 0, 0, 1);
            army.decimate(1000);
            t.armyEquals(army, new FootArmy(101, 9000, 90, 0, 0, 9000, false, 0, 0, 1));
        });
        test( "Rider army decimation", function(t: any){
            let army = new RiderArmy(201, 10000, 100, false, 0, 0, 1);
            army.decimate(1000);
            t.armyEquals(army, new RiderArmy(201, 9000, 90, false, 0, 0, 1));
        });
        test( "Fleet decimation", function(t: any){
            let army = new Fleet(301, 100, 10, 0, 0, false, 0, 0, 1);
            army.decimate(10);
            t.armyEquals(army, new Fleet(301, 90, 9, 0, 0, false, 0, 0, 1));
        });
        test( "Fleet with warships decimation", function(t: any){
            let army = new Fleet(301, 100, 10, 10, 10, false, 0, 0, 1);
            army.decimate(10);
            t.armyEquals(army, new Fleet(301, 90, 9, 9, 9, false, 0, 0, 1));
        });
    });
    module( "Transported Troops" , function() {
        test( "Fleet transporting at full capacity halved", function(t: any){
            let fleet = new Fleet(301, 100, 10, 0, 0, false, 0, 0, 1);
            let transportedArmy = new FootArmy(101, 9000, 10, 0, 0, 0, false, 0, 0, 1);
            GameState.armies = [transportedArmy];
            fleet.loadArmy(transportedArmy);
            fleet.decimate(50);
            t.armyEquals(transportedArmy, new FootArmy(101, 4500, 5, 0, 0, 0, false, 0, 0, 1));
        });
        test( "Fleet transporting at 75% capacity halved", function(t: any){
            let fleet = new Fleet(301, 100, 10, 0, 0, false, 0, 0, 1);
            let transportedArmy = new FootArmy(101, 7000, 5, 0, 0, 0, false, 0, 0, 1);
            GameState.armies = [transportedArmy];
            fleet.loadArmy(transportedArmy);
            fleet.decimate(50);
            t.armyEquals(transportedArmy, new FootArmy(101, 4666, 3, 0, 0, 0, false, 0, 0, 1));
        });
        test( "Fleet transporting riders at full capacity halved", function(t: any){
            let fleet = new Fleet(301, 100, 10, 0, 0, false, 0, 0, 1);
            let transportedArmy = new RiderArmy(201, 4500, 10, false, 0, 0, 1);
            GameState.armies = [transportedArmy];
            fleet.loadArmy(transportedArmy);
            fleet.decimate(50);
            t.armyEquals(transportedArmy, new RiderArmy(201, 2250, 5, false, 0, 0, 1));
        });
        test( "Fleet transporting army with catapults at full capacity halved", function(t: any){
            let fleet = new Fleet(301, 100, 10, 0, 0, false, 0, 0, 1);
            let transportedArmy = new FootArmy(101, 1000, 10, 4, 2, 0, false, 0, 0, 1);
            GameState.armies = [transportedArmy];
            fleet.loadArmy(transportedArmy);
            fleet.decimate(50);
            t.armyEquals(transportedArmy, new FootArmy(101, 500, 5, 2, 1, 0, false, 0, 0, 1));
        });
        test( "Fleet transporting army with mounts at full capacity halved", function(t: any){
            let fleet = new Fleet(301, 100, 10, 0, 0, false, 0, 0, 1);
            let transportedArmy = new FootArmy(101, 4500, 10, 0, 0, 4500, false, 0, 0, 1);
            GameState.armies = [transportedArmy];
            fleet.loadArmy(transportedArmy);
            fleet.decimate(50);
            t.armyEquals(transportedArmy, new FootArmy(101, 2250, 5, 0, 0, 2250, false, 0, 0, 1));
        });
    });
}