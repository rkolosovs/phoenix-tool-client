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

import {test, module} from "../node_modules/qunit";
import {Field, FieldType} from "../src/model/map/field";
import {Realm} from "../src/model/realm";

module("Game model", function () {
    module("Field height", function () {
        test("Deep sea", function (t: any) {
            const field: Field = new Field([0, 0], FieldType.DEEPSEA);
            t.strictEqual(field.getHeight(), 0, "Height of a deepsea field should be 0.");
        });
        test("Shallow sea", function (t: any) {
            const field: Field = new Field([0, 0], FieldType.SHALLOWS);
            t.strictEqual(field.getHeight(), 0, "Height of a shallow sea field should be 0.");
        });
        test("Lowlands", function (t: any) {
            const field: Field = new Field([0, 0], FieldType.LOWLANDS);
            t.strictEqual(field.getHeight(), 1, "Height of a lowlands field should be 1.");
        });
        test("Woods", function (t: any) {
            const field: Field = new Field([0, 0], FieldType.WOODS);
            t.strictEqual(field.getHeight(), 1, "Height of a woodland field should be 1.");
        });
        test("Desert", function (t: any) {
            const field: Field = new Field([0, 0], FieldType.DESERT);
            t.strictEqual(field.getHeight(), 1, "Height of a desert field should be 1.");
        });
        test("Swamp", function (t: any) {
            const field: Field = new Field([0, 0], FieldType.SWAMP);
            t.strictEqual(field.getHeight(), 1, "Height of a swamp field should be 1.");
        });
        test("Hills", function (t: any) {
            const field: Field = new Field([0, 0], FieldType.HILLS);
            t.strictEqual(field.getHeight(), 2, "Height of a hills field should be 2.");
        });
        test("Highlands", function (t: any) {
            const field: Field = new Field([0, 0], FieldType.HIGHLANDS);
            t.strictEqual(field.getHeight(), 3, "Height of a highlands field should be 3.");
        });
        test("Mountains", function (t: any) {
            const field: Field = new Field([0, 0], FieldType.MOUNTAINS);
            t.strictEqual(field.getHeight(), 4, "Height of a mountain field should be 4.");
        });
    });
    module("Realm.getTerritoryCoordinates", function () {
        test("Empty territory", function (t: any) {
            const realm: Realm = new Realm("Realm 1", "r01", "000,000,000", FieldType.SHALLOWS, true);
            t.deepEqual(realm.getTerritoryCoordinates(), [], "No territory should result in an empty array.");
        });
        test("One field territory", function (t: any) {
            const realm: Realm = new Realm("Realm 1", "r01", "000,000,000", FieldType.SHALLOWS, true);
            realm.territory = [new Field([0, 0], FieldType.LOWLANDS)];
            t.deepEqual(realm.getTerritoryCoordinates(), [[0, 0]], "Result should be array containing [0, 0].");
        });
        test("Multiple field territory", function (t: any) {
            const realm: Realm = new Realm("Realm 1", "r01", "000,000,000", FieldType.SHALLOWS, true);
            realm.territory = [
                new Field([0, 0], FieldType.LOWLANDS),
                new Field([1, 1], FieldType.LOWLANDS),
                new Field([2, 3], FieldType.LOWLANDS)
            ];
            t.deepEqual(realm.getTerritoryCoordinates(),
                [[0, 0], [1, 1], [2, 3]],
                "Result should be array containing [0, 0], [1, 1], [2, 3]."
            );
        });
    });
});