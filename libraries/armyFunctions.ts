import {Controls} from "../controls/controlVariables";
import {GameState} from "../gameState";
import {Realm} from "../realm";
import {Army} from "../armies/army";
import {LandArmy} from "../armies/landArmy";
import {Fleet} from "../armies/fleet";
import {FootArmy} from "../armies/footArmy";
import {RiderArmy} from "../armies/riderArmy";

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
        let ownedArmies: Army[] = GameState.armies.filter(army => army.owner === owner);
        if (type === 1) {//foot armies
            let ownedFootArmies: Army[] = ownedArmies.filter(army => army instanceof FootArmy);
            for(let result = 101; result < 200; result++){
                if(!ownedFootArmies.some(army => army.getErkenfaraID() === result)){
                    return result;
                }
            }
            throw new Error("Du hast die maximale Anzahl an Fußheeren erreicht.");
        } else if (type === 2) {//rider armies
            let ownedRiderArmies: Army[] = ownedArmies.filter(army => army instanceof RiderArmy);
            for(let result = 201; result < 300; result++){
                if(!ownedRiderArmies.some(army => army.getErkenfaraID() === result)){
                    return result;
                }
            }
            throw new Error("Du hast die maximale Anzahl an Reiterheeren erreicht.");
        } else if (type === 3) {//fleets
            let ownedFleets: Army[] = ownedArmies.filter(army => army instanceof Fleet);
            for(let result = 301; result < 400; result++){
                if(!ownedFleets.some(army => army.getErkenfaraID() === result)){
                    return result;
                }
            }
            throw new Error("Du hast die maximale Anzahl an Flotten erreicht.");
        } else {
            throw new Error("Unknown army type.");
        }
    }

    export function checkArmiesForLiveliness() {
        //find all dead armies
        let deadArmies: Army[] = GameState.armies.filter(army => !army.isAlive());
        //delete them
        deadArmies.forEach(deadArmy => deleteArmy(deadArmy));
    }
}