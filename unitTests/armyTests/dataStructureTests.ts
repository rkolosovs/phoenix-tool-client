import {Realm} from "../../realm";
import {FieldType} from "../../map/field";
import {FootArmy} from "../../armies/footArmy";
import {RiderArmy} from "../../armies/riderArmy";
import {Fleet} from "../../armies/fleet";

export function dataStructureTests() {
    module( "Maximum MP and HP" , function() {
        test( "Foot army respects MP maximum", function(t: any){
            let realm = new Realm("Realm 1", "r01", "000,000,000", FieldType.SHALLOWS, true);
            let army = new FootArmy(1, realm, 1000, 1,
                0,0, 0,[0, 0], 0, 0);
            army.setMovePoints(100);
            t.strictEqual(army.getMovePoints(), 9, "Success!");
        });
        test( "Foot army respects MP minimum", function(t: any){
            let realm = new Realm("Realm 1", "r01", "000,000,000", FieldType.SHALLOWS, true);
            let army = new FootArmy(1, realm, 1000, 1,
                0,0, 0,[0, 0], 0, 0);
            army.setMovePoints(-100);
            t.strictEqual(army.getMovePoints(), 0, "Success!");
        });
        test( "Foot army respects HP maximum", function(t: any){
            let realm = new Realm("Realm 1", "r01", "000,000,000", FieldType.SHALLOWS, true);
            let army = new FootArmy(1, realm, 1000, 1,
                0,0, 0,[0, 0], 0, 0);
            army.setHeightPoints(10);
            t.strictEqual(army.getHeightPoints(), 2, "Success!");
        });
        test( "Foot army respects HP minimum", function(t: any){
            let realm = new Realm("Realm 1", "r01", "000,000,000", FieldType.SHALLOWS, true);
            let army = new FootArmy(1, realm, 1000, 1,
                0,0, 0,[0, 0], 0, 0);
            army.setHeightPoints(-10);
            t.strictEqual(army.getHeightPoints(), 0, "Success!");
        });
        test( "Rider army respects MP maximum", function(t: any){
            let realm = new Realm("Realm 1", "r01", "000,000,000", FieldType.SHALLOWS, true);
            let army = new RiderArmy(1, realm, 1000, 1,[0, 0], 0, 0);
            army.setMovePoints(100);
            t.strictEqual(army.getMovePoints(), 21, "Success!");
        });
        test( "Rider army respects MP minimum", function(t: any){
            let realm = new Realm("Realm 1", "r01", "000,000,000", FieldType.SHALLOWS, true);
            let army = new RiderArmy(1, realm, 1000, 1,[0, 0], 0, 0);
            army.setMovePoints(-100);
            t.strictEqual(army.getMovePoints(), 0, "Success!");
        });
        test( "Rider army respects HP maximum", function(t: any){
            let realm = new Realm("Realm 1", "r01", "000,000,000", FieldType.SHALLOWS, true);
            let army = new RiderArmy(1, realm, 1000, 1,[0, 0], 0, 0);
            army.setHeightPoints(10);
            t.strictEqual(army.getHeightPoints(), 2, "Success!");
        });
        test( "Rider army respects HP minimum", function(t: any){
            let realm = new Realm("Realm 1", "r01", "000,000,000", FieldType.SHALLOWS, true);
            let army = new RiderArmy(1, realm, 1000, 1,[0, 0], 0, 0);
            army.setHeightPoints(-10);
            t.strictEqual(army.getHeightPoints(), 0, "Success!");
        });
        test( "Fleet army respects MP maximum", function(t: any){
            let realm = new Realm("Realm 1", "r01", "000,000,000", FieldType.SHALLOWS, true);
            let army = new Fleet(1, realm, 1000, 1,
                0,0,[0, 0], 0);
            army.setMovePoints(100);
            t.strictEqual(army.getMovePoints(), 42, "Success!");
        });
        test( "Fleet army respects MP minimum", function(t: any){
            let realm = new Realm("Realm 1", "r01", "000,000,000", FieldType.SHALLOWS, true);
            let army = new Fleet(1, realm, 1000, 1,
                0,0,[0, 0], 0);
            army.setMovePoints(-100);
            t.strictEqual(army.getMovePoints(), 0, "Success!");
        });
        test( "Fleet army respects HP maximum", function(t: any){
            let realm = new Realm("Realm 1", "r01", "000,000,000", FieldType.SHALLOWS, true);
            let army = new Fleet(1, realm, 1000, 1,
                0,0,[0, 0], 0);
            army.setHeightPoints(10);
            t.strictEqual(army.getHeightPoints(), 0, "Success!");
        });
        test( "Fleet army respects HP minimum", function(t: any){
            let realm = new Realm("Realm 1", "r01", "000,000,000", FieldType.SHALLOWS, true);
            let army = new Fleet(1, realm, 1000, 1,
                0,0,[0, 0], 0);
            army.setHeightPoints(-10);
            t.strictEqual(army.getHeightPoints(), 0, "Success!");
        });
    });
}