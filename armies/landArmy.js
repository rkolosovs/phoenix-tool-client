"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gameState_1 = require("../gameState");
const army_1 = require("./army");
const move_1 = require("./move");
const fleet_1 = require("./fleet");
const hexFunctions_1 = require("../libraries/hexFunctions");
class LandArmy extends army_1.Army {
    constructor(id, owner, troopCount, officerCount, lightCatapultCount, heavyCatapultCount, position, movePoints, heightPoints, isGuard) {
        if (isGuard != undefined) {
            super(id, owner, troopCount, officerCount, lightCatapultCount, heavyCatapultCount, position, movePoints, heightPoints, isGuard);
        }
        else {
            super(id, owner, troopCount, officerCount, lightCatapultCount, heavyCatapultCount, position, movePoints, heightPoints);
        }
    }
    getMaxMovePoints() {
        return LandArmy.MAX_MOVE_POINTS;
    }
    getMaxHeightPoints() {
        return LandArmy.MAX_HEIGHT_POINTS;
    }
    isTransported() {
        return this.transportingFleet != undefined;
    }
    move(direction) {
        let move = this.possibleMoves.find(possMove => possMove.direction === direction);
        if (move != undefined) {
            if (move.unloading && this.isTransported()) {
                this.transportingFleet.unloadArmy(this);
            }
            else if (move.loading && !this.isTransported()) {
                let fleetsOnDestination = gameState_1.GameState.armies.filter(army => army instanceof fleet_1.Fleet && army.getPosition()[0] === move.destination[0] &&
                    army.getPosition()[1] === move.destination[1]).map(army => army);
                if (fleetsOnDestination.length === 0) {
                    // TODO: throw error
                    // return "You can't walk on Water.";
                }
                else if (fleetsOnDestination.length === 1) {
                    fleetsOnDestination[0].loadArmy(this);
                }
                else {
                    let fleetString = fleetsOnDestination.reduce((accumulator, fleet) => accumulator += " " + fleet.getErkenfaraID(), "");
                    let chosenFleet = prompt("Mögliche Flotten sind: " + fleetString);
                    if (chosenFleet === null) {
                        // TODO: throw error
                        // return "Embarkation canceled."
                    }
                    else if (chosenFleet !== undefined && chosenFleet !== '') {
                        let foundFleet = fleetsOnDestination.find(fleet => fleet.getErkenfaraID() === parseInt(chosenFleet));
                        if (foundFleet != undefined) {
                            let loadString = foundFleet.loadArmy(this);
                            // TODO: throw error
                            // return (loadString);
                        }
                        else {
                            window.alert("Bitte wähle eine der angegebenen Flotten aus.");
                        }
                    }
                }
            }
            this.oldPosition[0] = this.position[0];
            this.oldPosition[1] = this.position[1];
            this.position[0] = move.destination[0];
            this.position[1] = move.destination[1];
            this.setMovePoints(this.getMovePoints() - move.movePoints);
            this.setHeightPoints(this.getHeightPoints() - move.heightPoints);
        }
        // TODO: Throw errors. Compute new possible moves.
        // //to see and return the error why you cant move
        // clickedMoves(army);
        // return moveToList(army, direction);
    }
    checkForPossibleMove(direction) {
        let neighborCoords = hexFunctions_1.HexFunction.neighbors(this.position);
        let target = neighborCoords[direction];
        let heightCost;
        let thereIsAStreet = false;
        let thereIsABridge = false;
        let thereIsAHarbor = false;
        // TODO: effects of diplomacy go here
        let rightOfPassage = borders.some((realm) => (realm === this.owner && realm.land.some((field) => (target[0] === field[0] && target[1] === field[1]))));
        let thereIsARiver = gameState_1.GameState.rivers.some((river) => (river[0][0] === this.position[0] && river[0][1] === this.position[1] && river[1][0] === target[0] && river[1][1] === target[1]) ||
            (river[0][0] === target[0] && river[0][1] === target[1] && river[1][0] === this.position[0] && river[1][1] === this.position[1]));
        // check if there is a steet, a harbor or a bridge on the route
        gameState_1.GameState.buildings.forEach(building => {
            if (building.type === 8 /* STREET */ &&
                ((building.getPosition() === this.position && building.getSecondPosition() === target) ||
                    (building.getSecondPosition() === this.position && building.getPosition() === target))) {
                thereIsAStreet = true;
            }
            if (building.type === 6 /* HARBOR */ &&
                ((building.getPosition() === this.position && building.getSecondPosition() === target) ||
                    (building.getSecondPosition() === this.position && building.getPosition() === target))) {
                thereIsAHarbor = true;
            }
            if (building.type === 7 /* BRIDGE */ &&
                ((building.getPosition() === this.position && building.getSecondPosition() === target) ||
                    (building.getSecondPosition() === this.position && building.getPosition() === target))) {
                thereIsABridge = true;
            }
            //TODO: Walls!
        });
        // check if there is a change in height on the route
        if (hexFunctions_1.HexFunction.height(this.position) != hexFunctions_1.HexFunction.height(target)) {
            if (Math.abs(hexFunctions_1.HexFunction.height(this.position) - hexFunctions_1.HexFunction.height(target)) >= 2) {
                throw new Error("The height difference is too big.");
            }
            else if ((this.heightPoints < 2 && (!thereIsAStreet || !thereIsAHarbor)) || this.heightPoints < 1) {
                throw new Error("Not enough height points left.");
            }
            else {
                heightCost = (thereIsAStreet || thereIsABridge) ? 1 : 2;
                if (thereIsARiver) {
                    throw new Error("Can't traverse height difference with a river.");
                }
            }
        }
        let moveCost = this.computeMoveCost(thereIsAStreet, thereIsAHarbor, thereIsARiver, thereIsABridge, rightOfPassage, target);
        this.possibleMoves.push(new move_1.Move(moveCost, heightCost, (hexFunctions_1.HexFunction.fieldType(target) === 0 /* SHALLOWS */ ||
            hexFunctions_1.HexFunction.fieldType(target) === 1 /* DEEPSEA */), (hexFunctions_1.HexFunction.fieldType(this.position) === 0 /* SHALLOWS */ ||
            hexFunctions_1.HexFunction.fieldType(this.position) === 1 /* DEEPSEA */), target, direction));
    }
    canConquer() {
        return this.getRoomPointsSansOfficers() >= 1000 && this.officerCount >= 1;
        //TODO: Consider characters once those are a thing.
    }
}
exports.LandArmy = LandArmy;
