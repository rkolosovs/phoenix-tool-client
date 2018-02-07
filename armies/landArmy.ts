abstract class LandArmy extends Army{
    transportingFleet: Fleet;

    constructor(id: number, owner: Realm, troopCount: number, officerCount: number, lightCatapultCount: number,
                heavyCatapultCount: number, position: [number, number], movePoints: number, heightPoints: number,
                isGuard?: boolean){
        if(isGuard != undefined){
            super(id, owner, troopCount, officerCount, lightCatapultCount, heavyCatapultCount, position,
                movePoints, heightPoints, isGuard);
        } else {
            super(id, owner, troopCount, officerCount, lightCatapultCount, heavyCatapultCount, position,
                movePoints, heightPoints);
        }
        this.isTransported = false;
    }

    abstract takeRPDamage(rpDamage: number): void;

    getMaxMovePoints(): number{
        return LandArmy.MAX_MOVE_POINTS;
    }

    getMaxHeightPoints(): number{
        return LandArmy.MAX_HEIGHT_POINTS;
    }

    isTransported(): boolean {
        return this.transportingFleet != undefined;
    }

    move(direction: Direction): void {
        let move: Move = this.possibleMoves.find(possMove => possMove.direction === direction);
        if(move != undefined){
            if(move.unloading && this.isTransported()){
                this.transportingFleet.unloadArmy(this);
            } else if(move.loading && !this.isTransported()) {
                let fleetsOnDestination: Fleet[] = GameState.armies.filter(
                    army => army instanceof Fleet && army.getPosition() === move.destination).map(
                    army => army as Fleet);
                if(fleetsOnDestination.length === 0){
                    // TODO: throw error
                    // return "You can't walk on Water.";
                } else if(fleetsOnDestination.length === 1){
                    fleetsOnDestination[0].loadArmy(this);
                } else {
                    let fleetString: String = fleetsOnDestination.reduce(
                        (accumulator, fleet) => accumulator += " " + fleet.getErkenfaraID(), "");
                    let chosenFleet = prompt("Mögliche Flotten sind: " + fleetString);
                    if (chosenFleet === null) {
                        // TODO: throw error
                        // return "Embarkation canceled."
                    } else if (chosenFleet !== undefined && chosenFleet !== '') {
                        let foundFleet = fleetsOnDestination.find(
                            fleet => fleet.getErkenfaraID() === parseInt(chosenFleet));
                        if (foundFleet != undefined) {
                            let loadString = foundFleet.loadArmy(army.indexInListOfArmies());
                            // TODO: throw error
                            // return (loadString);
                        } else {
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

    canConquer(): boolean{
        return this.getRoomPointsSansOfficers() >= 1000 && this.officerCount >= 1;
        //TODO: Consider characters once those are a thing.
    }
}