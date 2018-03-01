import {GameState} from "../gameState";
import {Army} from "./army";
import {Direction} from "../map/direction";
import {Move} from "./move";
import {Fleet} from "./fleet";
import {Realm} from "../realm";
import {HexFunction} from "../libraries/hexFunctions";
import {BuildingType} from "../buildings/building";
import {NonDestructibleBuilding} from "../buildings/nonDestructibleBuilding";
import {FieldType} from "../map/field";

export abstract class LandArmy extends Army{
    transportingFleet: Fleet|undefined;

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
                    army => army instanceof Fleet && army.getPosition()[0] === move.destination[0] &&
                        army.getPosition()[1] === move.destination[1]).map(
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
                            let loadString = foundFleet.loadArmy(this);
                            // TODO: throw error
                            // return (loadString);
                        } else {
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

    checkForPossibleMove(direction: Direction): void {
        let neighborCoords: [number, number][] = HexFunction.neighbors(this.position);
        let target: [number, number] = neighborCoords[direction];
        let heightCost: number;
        let thereIsAStreet: boolean = false;
        let thereIsABridge: boolean = false;
        let thereIsAHarbor: boolean = false;
        // TODO: effects of diplomacy go here
        let rightOfPassage = borders.some((realm) => (realm === this.owner && realm.land.some((field) =>
            (target[0] === field[0] && target[1] === field[1]))));
        let thereIsARiver = GameState.rivers.some((river) =>
            (river[0][0] === this.position[0] && river[0][1] === this.position[1] && river[1][0] === target[0] && river[1][1] === target[1]) ||
            (river[0][0] === target[0] && river[0][1] === target[1] && river[1][0] === this.position[0] && river[1][1] === this.position[1])
        );
        // check if there is a steet, a harbor or a bridge on the route
        GameState.buildings.forEach(building => {
            if(building.type === BuildingType.STREET &&
                ((building.getPosition() === this.position && (building as NonDestructibleBuilding).getSecondPosition() === target) ||
                    ((building as NonDestructibleBuilding).getSecondPosition() === this.position && building.getPosition() === target))){
                thereIsAStreet = true;
            }
            if(building.type === BuildingType.HARBOR &&
                ((building.getPosition() === this.position && (building as NonDestructibleBuilding).getSecondPosition() === target) ||
                    ((building as NonDestructibleBuilding).getSecondPosition() === this.position && building.getPosition() === target))){
                thereIsAHarbor = true;
            }
            if(building.type === BuildingType.BRIDGE &&
                ((building.getPosition() === this.position && (building as NonDestructibleBuilding).getSecondPosition() === target) ||
                    ((building as NonDestructibleBuilding).getSecondPosition() === this.position && building.getPosition() === target))){
                thereIsABridge = true;
            }
            //TODO: Walls!
        });


        // check if there is a change in height on the route
        if(HexFunction.height(this.position) != HexFunction.height(target)){
            if(Math.abs(HexFunction.height(this.position) - HexFunction.height(target)) >= 2){
                throw new Error("The height difference is too big.");
            } else if((this.heightPoints < 2 && (!thereIsAStreet || !thereIsAHarbor)) || this.heightPoints < 1){
                throw new Error("Not enough height points left.");
            } else {
                heightCost = (thereIsAStreet || thereIsABridge)?1:2;
                if(thereIsARiver){ throw new Error("Can't traverse height difference with a river."); }
            }
        }

        let moveCost: number = this.computeMoveCost(thereIsAStreet, thereIsAHarbor, thereIsARiver, thereIsABridge,
            rightOfPassage, target);

        this.possibleMoves.push(new Move(moveCost, heightCost,
            (HexFunction.fieldType(target) === FieldType.SHALLOWS ||
                HexFunction.fieldType(target) === FieldType.DEEPSEA),
            (HexFunction.fieldType(this.position) === FieldType.SHALLOWS ||
                HexFunction.fieldType(this.position) === FieldType.DEEPSEA), target, direction));
    }

    protected abstract computeMoveCost(thereIsAStreet: boolean, thereIsAHarbor: boolean, thereIsARiver: boolean,
                             thereIsABridge: boolean, rightOfPassage: boolean, target: [number, number]): number;

    canConquer(): boolean{
        return this.getRoomPointsSansOfficers() >= 1000 && this.officerCount >= 1;
        //TODO: Consider characters once those are a thing.
    }
}