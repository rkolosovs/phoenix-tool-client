"use strict";
class LandArmy extends Army {
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
                let fleetsOnDestination = GameState.armies.filter(army => army instanceof Fleet && army.getPosition()[0] === move.destination[0] &&
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
                            let loadString = foundFleet.loadArmy(army.indexInListOfArmies());
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
        let neighborCoords = HexFunction.neighbors(this.position);
        let target = neighborCoords[direction];
        let heightCost;
        let thereIsAStreet = false;
        let thereIsABridge = false;
        let thereIsAHarbor = false;
        // TODO: effects of diplomacy go here
        let rightOfPassage = borders.some((realm) => (realm === this.owner && realm.land.some((field) => (target[0] === field[0] && target[1] === field[1]))));
        let thereIsARiver = rivers.some((river) => (river[0][0] === this.position[0] && river[0][1] === this.position[1] && river[1][0] === target[0] && river[1][1] === target[1]) ||
            (river[0][0] === target[0] && river[0][1] === target[1] && river[1][0] === this.position[0] && river[1][1] === this.position[1]));
        // check if there is a steet, a harbor or a bridge on the route
        GameState.buildings.forEach(building => {
            if (building.type === BuildingType.STREET &&
                ((building.getPosition() === this.position && building.getSecondPosition() === target) ||
                    (building.getSecondPosition() === this.position && building.getPosition() === target))) {
                thereIsAStreet = true;
            }
            if (building.type === BuildingType.HARBOR &&
                ((building.getPosition() === this.position && building.getSecondPosition() === target) ||
                    (building.getSecondPosition() === this.position && building.getPosition() === target))) {
                thereIsAHarbor = true;
            }
            if (building.type === BuildingType.BRIDGE &&
                ((building.getPosition() === this.position && building.getSecondPosition() === target) ||
                    (building.getSecondPosition() === this.position && building.getPosition() === target))) {
                thereIsABridge = true;
            }
            //TODO: Walls!
        });
        // check if there is a change in height on the route
        if (HexFunction.height(this.position) != HexFunction.height(target)) {
            if (Math.abs(HexFunction.height(this.position) - HexFunction.height(target)) >= 2) {
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
        this.possibleMoves.push(new Move(moveCost, heightCost, (HexFunction.fieldType(target) === FieldType.SHALLOWS ||
            HexFunction.fieldType(target) === FieldType.DEEPSEA), (HexFunction.fieldType(this.position) === FieldType.SHALLOWS ||
            HexFunction.fieldType(this.position) === FieldType.DEEPSEA), target, direction));
    }
    canConquer() {
        return this.getRoomPointsSansOfficers() >= 1000 && this.officerCount >= 1;
        //TODO: Consider characters once those are a thing.
    }
}
