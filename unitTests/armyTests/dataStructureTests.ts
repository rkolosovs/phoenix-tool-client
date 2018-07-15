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

import {Realm} from "../../realm";
import {FieldType} from "../../map/field";
import {FootArmy} from "../../armies/footArmy";
import {RiderArmy} from "../../armies/riderArmy";
import {Fleet} from "../../armies/fleet";
import {QUnit} from "../qunit";

const { test } = QUnit;
const { module } = QUnit;

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