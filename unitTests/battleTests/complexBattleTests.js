"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const qunit_1 = require("qunit");
const { test } = qunit_1.QUnit;
function complexBattleTest() {
    test("Large land battle at the defenders castle.", function (t) {
        realms = [{ active: true, color: '000,000,000', homeTurf: 9, name: "Realm 1", tag: 'r01' },
            { active: true, color: '000,000,000', homeTurf: 9, name: "Realm 2", tag: 'r02' },
            { active: true, color: '000,000,000', homeTurf: 9, name: "Realm 3", tag: 'r03' }];
        let attackingArmies = [
            new heer(121, 12000, 40, 0, 0, 0, true, 0, 0, 2),
            new heer(122, 32000, 80, 0, 0, 0, false, 0, 0, 2),
            new reiterHeer(221, 16000, 80, false, 0, 0, 2) //army of attacker realm
        ];
        let defendingArmies = [
            new heer(111, 29000, 80, 0, 0, 0, false, 0, 0, 1),
            new reiterHeer(211, 13500, 70, false, 0, 0, 1),
            new heer(112, 8000, 50, 0, 0, 0, true, 0, 0, 3) //army of a third realm
        ];
        let battle = new schlacht(attackingArmies, defendingArmies, [], [], 3, 3);
        t.resultEquals(battle.result(18, 3), { victor: 'attacker', attackerLosses: [5192.2, 37638.48, 18819.24], defenderLosses: [29575.49, 14385.3, 4196.45] });
        //TODO Defender not completely wiped out. Check in with the SL to see what is to be done about it.
    });
    test("Large naval battle.", function (t) {
        let attackingArmies = [
            new seeHeer(321, 120, 40, 0, 0, true, 0, 0, 1),
            new seeHeer(322, 300, 100, 0, 0, false, 0, 0, 1),
            new seeHeer(323, 340, 60, 0, 0, false, 0, 0, 1) //army of attacker realm
        ];
        let defendingArmies = [
            new seeHeer(311, 225, 25, 10, 0, false, 0, 0, 2),
            new seeHeer(312, 175, 25, 0, 5, false, 0, 0, 2),
            new seeHeer(313, 100, 50, 0, 0, true, 0, 0, 2) //army of a defending realm
        ];
        let battle = new schlacht(attackingArmies, defendingArmies, [], [], 2, 2);
        t.resultEquals(battle.result(12, 8), { victor: 'attacker', attackerLosses: [35.60, 184, 252.20], defenderLosses: [426.08, 331.39, 59.47] });
        //TODO Defender not completely wiped out. Check in with the SL to see what is to be done about it.
    });
}
exports.complexBattleTest = complexBattleTest;
