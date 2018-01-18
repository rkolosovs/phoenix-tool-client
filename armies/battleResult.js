"use strict";
var Result;
(function (Result) {
    Result[Result["ATTACKER_VICTORY"] = 0] = "ATTACKER_VICTORY";
    Result[Result["ATTACKER_OVERRUN"] = 1] = "ATTACKER_OVERRUN";
    Result[Result["DEFENDER_VICTORY"] = 2] = "DEFENDER_VICTORY";
    Result[Result["DEFENDER_OVERRUN"] = 3] = "DEFENDER_OVERRUN";
    Result[Result["TIE"] = 4] = "TIE";
})(Result || (Result = {}));
class BattleResult {
    constructor(result, attackerLosses, defenderLosses) {
        this.result = result;
        this.attackerLosses = attackerLosses;
        this.defenderLosses = defenderLosses;
    }
}
