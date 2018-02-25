import {GameState} from "../gameState";
import {HexFunction} from "../libraries/hexFunctions";
import {Drawing} from "../gui/drawingFunctions";
import {Army} from "./army";
import {Direction} from "../map/direction";
//when unit is clicked generates a list of neighbors that can be moved to
function clickedMoves(army: MobileEntity): void{
    if(army.owner.tag === login || login === "sl"){
        army.possibleMoves = [];
        //goes through all neighbors to see if the army can move there
        for(let direction in Direction){
            if(!isNaN(Number(direction))){
                army.checkForPossibleMove(parseInt(direction) as Direction);
            }
        }
    }
}

//checks the current field for other armies and adds it accordingly
function createMultifield(army: Army){
	for (let j = 0; j < GameState.armies.length; j++) {
		let someArmy = GameState.armies[j];
		if (someArmy.x === army.getPosition()[0] && someArmy.y === army.getPosition()[1] && someArmy !== army) {
			if(someArmy.multiArmyField === true || army.multiArmyField === true){
				addToMultifield(someArmy, army);
			}
			else{
				let templist = [someArmy, army];//creating a list of armies to add to the list of multifieldarmies
				Drawing.listOfMultiArmyFields.push(templist);
				someArmy.multiArmyField = true;
				army.multiArmyField = true;
			}
		}
	}
}

//Adds an army to an existing multifield
function addToMultifield(armyOnMultifield: Army, armyToAdd: Army){
	if(Drawing.listOfMultiArmyFields !== undefined){
		let alreadyInList = false;
		let placeToAdd;
		for(let i = 0; i < Drawing.listOfMultiArmyFields.length; i++){
			for(let j = 0; j < Drawing.listOfMultiArmyFields[i].length; j++){
				if(Drawing.listOfMultiArmyFields[i][j] === armyOnMultifield){
					placeToAdd = i;
				}
				else if(Drawing.listOfMultiArmyFields[i][j] === armyToAdd){
					alreadyInList = true;
				}
			}
		}
		if(alreadyInList == false && placeToAdd !== undefined){
			Drawing.listOfMultiArmyFields[placeToAdd].push(armyToAdd);
			console.log("added to multi");
		}
		armyToAdd.multiArmyField = true;
	}
}

//to find all fields in a two tile proximity
function findShootingTargets(army: Army){
    let tilesInRange:[number, number][] = []
    if(army.getHeavyCatapultCount() - army.getHeavyCatapultsShot() > 0){//in a 2 tile range
        tilesInRange = HexFunction.neighborInRange([army.getPosition()[0], army.getPosition()[0]],2);
    }
    else if(army.getLightCatapultCount() - army.getLightCatapultsShot() > 0){//one tile range
        tilesInRange = HexFunction.neighborInRange([army.getPosition()[0], army.getPosition()[0]],1);
    }
    army.targetList = checkAllConditions(army, tilesInRange);
}

function checkAllConditions(army: Army, targetTileList:[number,number][]){
    let templist = targetTileList.slice();
    let hasSKP = false;
    if(army.getHeavyCatapultCount() - army.getHeavyCatapultsShot() > 0){
        hasSKP = true;
    }
    //to find out the conditions and maybe kick out if not shootable
    for(let i = templist.length -1; i >= 0; i--){
        if(checkCondition(army, templist[i], hasSKP) === 'impossible shot'){
            targetTileList.splice(i,1);
        }
    }

    return targetTileList;
}
function checkCondition(army: Army, target: [number, number], skpShot: boolean){//TODO mixed shooting
    let condition = 'impossible shot';
    let range = HexFunction.distance([army.getPosition()[0], army.getPosition()[1]], target);
    if(skpShot){//skp shooting
        if(range == 1){//for range of 1
            if(HexFunction.height(target) - HexFunction.height([army.getPosition()[0], army.getPosition()[1]]) <= 2){
                condition = 'high';
            }
            if(HexFunction.height(target) - HexFunction.height([army.getPosition()[0], army.getPosition()[1]]) <= 1){
                condition = 'short';
            }
            if(HexFunction.height(target) - HexFunction.height([army.getPosition()[0], army.getPosition()[1]]) === 1 &&
             findWallInWay([army.getPosition()[0], army.getPosition()[1]], target).length > 0){
                condition = 'high';
            }
        }else if(range == 2){//for range of 2
            if(HexFunction.height(target) - HexFunction.height([army.getPosition()[0], army.getPosition()[1]]) <= 1){
                condition = 'farAndUp';
            }
            if(HexFunction.height(target) - HexFunction.height([army.getPosition()[0], army.getPosition()[1]]) < 1){
                condition = 'far';
            }
            if(HexFunction.height(target) - HexFunction.height([army.getPosition()[0], army.getPosition()[1]]) === 0 &&
             findWallInWay([army.getPosition()[0], army.getPosition()[1]], target).length > 0){
                condition = 'farAndUp';
            }
            //if neighbor with range 1 has height diff of 2(in case a high mountain is not allowed)
            let commonNeig = HexFunction.findCommonNeighbor([army.getPosition()[0], army.getPosition()[1]], target);
            let walls = findWallInWay([army.getPosition()[0], army.getPosition()[1]], target);
            for(let i = 0; i < commonNeig.length; i++){
                if(walls.length > 0){
                    for(let j = 0; j < walls.length; j++){
                        if(((HexFunction.height([commonNeig[i][0], commonNeig[i][1]]) - 
                        HexFunction.height([army.getPosition()[0], army.getPosition()[1]]) === 1)
                                && GameState.buildings[walls[j]].getPosition()[0] === commonNeig[i][0] &&
                                 GameState.buildings[walls[j]].getPosition()[1] === commonNeig[i][1])){
                            condition = 'impossible shot';
                        }
                    }
                }
                if(HexFunction.height([commonNeig[i][0], commonNeig[i][1]]) - 
                HexFunction.height([army.getPosition()[0], army.getPosition()[1]]) > 1){
                    condition = 'impossible shot';
                }
            }
            
        }
    }else{//for lkp shooting
        if(HexFunction.height(target) - HexFunction.height([army.getPosition()[0], army.getPosition()[1]]) <= 1){
            condition = 'lkp';
        }
    }
    return condition;
}

function findWallInWay(from: [number, number], to: [number, number]){
    let foundWallsIndeces = [];
    let dir = HexFunction.getDirectionToNeighbor(from, to);
    if(HexFunction.distance(from, to) === 1){
        dir = (dir + 3) % 6;
        let wallIndex = getWallIndexOnFieldInDirection(to, dir);
        if(wallIndex != -1){
            foundWallsIndeces.push(wallIndex)
            return foundWallsIndeces;
        }
    }else if(HexFunction.distance(from, to) === 2){
        if(dir % 1 === 0){
            let commonNeig = HexFunction.findCommonNeighbor(from, to);
            if(getWallIndexOnFieldInDirection([commonNeig[0][0], commonNeig[0][1]], dir) !== -1){//case back facing wall on common neighbor
                foundWallsIndeces.push(getWallIndexOnFieldInDirection([commonNeig[0][0], commonNeig[0][1]], dir));
            }
            dir = (dir + 3) % 6;
            if(getWallIndexOnFieldInDirection([commonNeig[0][0], commonNeig[0][1]], dir) !== -1){//case front facing wall on common neighbor
                foundWallsIndeces.push(getWallIndexOnFieldInDirection([commonNeig[0][0], commonNeig[0][1]], dir));
            }
            if(getWallIndexOnFieldInDirection(to, dir) !== -1){//case front wall on target
                foundWallsIndeces.push(getWallIndexOnFieldInDirection(to, dir));
            }
        }else{
            let commonNeig = HexFunction.findCommonNeighbor(from, to);
            dir = Math.floor(dir);
            let dirCommon1 = (dir + 3) % 6;
            if(getWallIndexOnFieldInDirection([commonNeig[0][0], commonNeig[0][1]], dirCommon1) !== -1){//case front facing wall on common neighbor 1
                foundWallsIndeces.push(getWallIndexOnFieldInDirection([commonNeig[0][0], commonNeig[0][1]], dirCommon1));
            }
            dirCommon1 = (dir + 1) % 6;
            if(getWallIndexOnFieldInDirection([commonNeig[0][0], commonNeig[0][1]], dirCommon1) !== -1){//case back facing wall on common neighbor 1
                foundWallsIndeces.push(getWallIndexOnFieldInDirection([commonNeig[0][0], commonNeig[0][1]], dirCommon1));
            }

            let dirCommon2 = (dir + 4) % 6;
            if(getWallIndexOnFieldInDirection([commonNeig[1][0], commonNeig[1][1]], dirCommon2) !== -1){//case front facing wall on common neighbor 2
                foundWallsIndeces.push(getWallIndexOnFieldInDirection([commonNeig[1][0], commonNeig[1][1]], dirCommon2));
            }
            dirCommon2 = dir;
            if(getWallIndexOnFieldInDirection([commonNeig[1][0], commonNeig[1][1]], dirCommon2) !== -1){//case back facing wall on common neighbor 2
                foundWallsIndeces.push(getWallIndexOnFieldInDirection([commonNeig[1][0], commonNeig[1][1]], dirCommon2));
            }

            let dirTarget = (dir + 3) % 6;
            if(getWallIndexOnFieldInDirection(to, dirTarget) !== -1){//case front facing wall on target
                foundWallsIndeces.push(getWallIndexOnFieldInDirection(to, dirTarget));
            }
            dirTarget = (dir + 4) % 6;
            if(getWallIndexOnFieldInDirection(to, dirTarget) !== -1){//case front facing wall on target
                foundWallsIndeces.push(getWallIndexOnFieldInDirection(to, dirTarget));
            }
        }
    }
    return foundWallsIndeces;
}

//returns all walls on target field
function getWallIndexOnFieldInDirection(hex: [number,number], direction: number){
    for(let i = 0; i < GameState.buildings.length; i++){
        if(GameState.buildings[i] instanceof Wall){
            let thisIsAWall = GameState.buildings[i] as Wall;
            if(thisIsAWall.getPosition()[0] === hex[0] && 
            thisIsAWall.getPosition()[1] === hex[1] && thisIsAWall.facing === convertDirection(direction)){
                return i;
             }
        }
    }
    return -1;
}


function convertDirection(dir: number){
    switch(dir){
        case 0: return "nw";
        case 1: return "ne";
        case 2: return "e";
        case 3: return "se";
        case 4: return "sw";
        case 5: return "w";
        default: return "nw";
    }
}