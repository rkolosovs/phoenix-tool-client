import {Controls} from "../controls/controlVariables";
import {GameState} from "../gameState";
import {Realm} from "../realm";
import {Army} from "../armies/army";
import {LandArmy} from "../armies/landArmy";
import {Fleet} from "../armies/fleet";

export namespace ArmyFunctions{

    export function deleteArmy(army: Army) {
        GameState.armies.splice(GameState.armies.indexOf(army), 1);
        //if the army is loaded in a fleet, throw it out of it
        if(army instanceof LandArmy && (army as LandArmy).isTransported()){
            let transportingFleet: Fleet|undefined = (army as LandArmy).transportingFleet;
            if(transportingFleet != undefined){
                transportingFleet.unloadArmy(army);
            }
        }
        if (Controls.selectedArmyIndex === GameState.armies.length) {
            Controls.selectedArmyIndex = -1;
        }
    }

    // returns the next armyId not yet assigned for the caller
    export function generateArmyId(type: number, owner: Realm): number {
        if (type === 1) {
            let j = 101;
            while (j < 200) {
                let found = false;
                for (let i = 0; i < GameState.armies.length; i++) {
                    if (GameState.armies[i].getErkenfaraID() === j && GameState.armies[i].owner === owner) {
                        j++;
                        found = true;
                    }
                }
                if (!found) {
                    return j;
                }
            }
            window.alert("Du hast die maximale Anzahl an Fußheeren erreicht.")
            return -1;
        } else if (type === 2) {
            let j = 201;
            while (j < 300) {
                let found = false;
                for (let i = 0; i < GameState.armies.length; i++) {
                    if (GameState.armies[i].getErkenfaraID() === j && GameState.armies[i].owner === owner) {
                        j++;
                        found = true;
                    }
                }
                if (!found) {
                    return j;
                }
            }
            window.alert("Du hast die maximale Anzahl an Reiterheeren erreicht.")
            return -1;
        } else if (type === 3) {
            let j = 301;
            while (j < 400) {
                let found = false;
                for (let i = 0; i < GameState.armies.length; i++) {
                    if (GameState.armies[i].getErkenfaraID() === j && GameState.armies[i].owner === owner) {
                        j++;
                        found = true;
                    }
                }
                if (!found) {
                    return j;
                }
            }
            window.alert("Du hast die maximale Anzahl an Flotten erreicht.")
            return -1;
        } else {
            return -1;
        }
    }

    export function checkArmiesForLiveliness() {
        //find all dead armies
        let deadArmies: Army[] = GameState.armies.filter(army => !army.isAlive());
        //delete them
        deadArmies.forEach(deadArmy => deleteArmy(deadArmy));
    }
}