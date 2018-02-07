"use strict";
class LandArmy extends Army {
    constructor(id, owner, troopCount, officerCount, lightCatapultCount, heavyCatapultCount, position, movePoints, heightPoints, isGuard) {
        if (isGuard != undefined) {
            super(id, owner, troopCount, officerCount, lightCatapultCount, heavyCatapultCount, position, movePoints, heightPoints, isGuard);
        }
        else {
            super(id, owner, troopCount, officerCount, lightCatapultCount, heavyCatapultCount, position, movePoints, heightPoints);
        }
        this.isTransported = false;
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
                let fleetsOnDestination = GameState.armies.filter(army => army instanceof Fleet && army.getPosition() === move.destination).map(army => army);
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
            this.oldPosition = this.position;
            this.position = move.destination;
            this.setMovePoints(this.getMovePoints() - move.movePoints);
            this.setHeightPoints(this.getHeightPoints() - move.heightPoints);
        }
        // TODO: Throw errors. Compute new possible moves.
        // //to see and return the error why you cant move
        // clickedMoves(army);
        // return moveToList(army, direction);
    }
    canConquer() {
        return this.getRoomPointsSansOfficers() >= 1000 && this.officerCount >= 1;
        //TODO: Consider characters once those are a thing.
    }
}
