export const enum Result{
    ATTACKER_VICTORY,
    ATTACKER_OVERRUN,
    DEFENDER_VICTORY,
    DEFENDER_OVERRUN,
    TIE
}

export class BattleResult {
    result: Result;
    attackerLosses: number[];
    defenderLosses: number[];

    constructor(result: Result, attackerLosses: number[], defenderLosses: number[]){
        this.result = result;
        this.attackerLosses = attackerLosses;
        this.defenderLosses = defenderLosses;
    }
}