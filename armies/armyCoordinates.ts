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
function createMultifield(army){
	for (let j = 0; j < listOfArmies.length; j++) {
		let someArmy = listOfArmies[j];
		if (someArmy.x === army.x && someArmy.y === army.y && someArmy !== army) {
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
function addToMultifield(armyOnMultifield, armyToAdd){
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

function conquer(army) {
    if(fieldType(army.x, army.y) >= 2 && army.canConquer()){
        let found = false;
        //für i = 0 bis borders länge
        for(let i = 0; i<borders.length; i++){
            // sind das die Länder des Besitzers?
            if (borders[i].tag === army.ownerTag()){
                // ist das Zielland enthalten?
                for(let j = 0; j<borders[i].land.length; j++){
                    if(borders[i].land[j][0] === army.x && borders[i].land[j][1] === army.y){
                        // wenn ja, found = true
                        found = true;
                    }
                }
            // nicht die Länder des Besitzers
            } else {
                // ist das Zielland enthalten?
                for(let j = 0; j<borders[i].land.length; j++){
                    if(borders[i].land[j][0] === army.x && borders[i].land[j][1] === army.y){
                        // wenn ja nimm es raus.
                        borders[i].land.splice(j,1);
                    }
                }
            }
            //console.log(borders[i]);
        }
        // war nicht bereits Land des Besitzers.
        if (!found){
            for(let i = 0; i<borders.length; i++){
                if (borders[i].tag === army.ownerTag()){
                    // tu es zu den Ländern des Besitzers.
                    borders[i].land.push([army.x, army.y]);
                }
            }
        }
    }
}

//to find all fields in a two tile proximity
function findShootingTargets(army){

    if(army.skp - army.SKPShotThisTurn > 0){//in a 2 tile range
        army.targetList = neighborInRange(army.x, army.y,2);
    }
    else if(army.lkp - army.LKPShotThisTurn > 0){//one tile range
        army.targetList = neighborInRange(army.x, army.y,1);
    }
    army.targetList = checkAllConditions(army, army.targetList);
}

function checkAllConditions(army, targetList){
    let templist = targetList.slice();
    let hasSKP = false;
    if(army.skp - army.SKPShotThisTurn > 0){
        hasSKP = true;
    }
    //to find out the conditions and maybe kick out if not shootable
    for(let i = templist.length -1; i >= 0; i--){
        if(checkCondition(army,templist[i][0], templist[i][1], hasSKP) === 'impossible shot'){
            targetList.splice(i,1);
        }
    }

    return targetList;
}
function checkCondition(army, x, y, skpShot){//TODO mixed shooting
    let condition = 'impossible shot';
    let range = distance(army.x, army.y, x, y);
    if(skpShot){//skp shooting
        if(range == 1){//for range of 1
            if(height(x, y) - height(army.x, army.y) <= 2){
                condition = 'high';
            }
            if(height(x, y) - height(army.x, army.y) <= 1){
                condition = 'short';
            }
            if(height(x, y) - height(army.x, army.y) === 1 && findWallInWay(army.x, army.y, x, y).length > 0){
                condition = 'high';
            }
        }else if(range == 2){//for range of 2
            if(height(x, y) - height(army.x, army.y) <= 1){
                condition = 'farAndUp';
            }
            if(height(x, y) - height(army.x, army.y) < 1){
                condition = 'far';
            }
            if(height(x, y) - height(army.x, army.y) === 0 && findWallInWay(army.x, army.y, x, y).length > 0){
                condition = 'farAndUp';
            }
            //if neighbor with range 1 has height diff of 2(in case a high mountain is not allowed)
            let commonNeig = findCommonNeighbor(army.x, army.y, x, y);
            let walls = findWallInWay(army.x, army.y, x, y);
            for(let i = 0; i < commonNeig.length; i++){
                if(walls.length > 0){
                    for(let j = 0; j < walls.length; j++){
                        if(((height(commonNeig[i][0], commonNeig[i][1]) - height(army.x, army.y) === 1) && buildings[walls[j]].x === commonNeig[i][0] && buildings[walls[j]].y === commonNeig[i][1])){
                            condition = 'impossible shot';
                        }
                    }
                }
                if(height(commonNeig[i][0], commonNeig[i][1]) - height(army.x, army.y) > 1){
                    condition = 'impossible shot';
                }
            }
            
        }
    }else{//for lkp shooting
        if(height(x, y) - height(army.x, army.y) <= 1){
            condition = 'lkp';
        }
    }
    return condition;
}

function findWallInWay(fromX, fromY, toX, toY){
    let foundWallsIndeces = [];
    let dir = getDirectionToNeighbor(fromX, fromY, toX, toY);
    if(distance(fromX, fromY, toX, toY) === 1){
        dir = (dir + 3) % 6;
        let wallIndex = getWallIndexOnFieldInDirection(toX, toY, dir);
        if(wallIndex != -1){
            foundWallsIndeces.push(wallIndex)
            return foundWallsIndeces;
        }
    }else if(distance(fromX, fromY, toX, toY) === 2){
        if(dir % 1 === 0){
            let commonNeig = findCommonNeighbor(fromX, fromY, toX, toY);
            if(getWallIndexOnFieldInDirection(commonNeig[0][0], commonNeig[0][1], dir) !== -1){//case back facing wall on common neighbor
                foundWallsIndeces.push(getWallIndexOnFieldInDirection(commonNeig[0][0], commonNeig[0][1], dir));
            }
            dir = (dir + 3) % 6;
            if(getWallIndexOnFieldInDirection(commonNeig[0][0], commonNeig[0][1], dir) !== -1){//case front facing wall on common neighbor
                foundWallsIndeces.push(getWallIndexOnFieldInDirection(commonNeig[0][0], commonNeig[0][1], dir));
            }
            if(getWallIndexOnFieldInDirection(toX, toY, dir) !== -1){//case front wall on target
                foundWallsIndeces.push(getWallIndexOnFieldInDirection(toX, toY, dir));
            }
        }else{
            let commonNeig = findCommonNeighbor(fromX, fromY, toX, toY);
            dir = Math.floor(dir);
            let dirCommon1 = (dir + 3) % 6;
            if(getWallIndexOnFieldInDirection(commonNeig[0][0], commonNeig[0][1], dirCommon1) !== -1){//case front facing wall on common neighbor 1
                foundWallsIndeces.push(getWallIndexOnFieldInDirection(commonNeig[0][0], commonNeig[0][1], dirCommon1));
            }
            dirCommon1 = (dir + 1) % 6;
            if(getWallIndexOnFieldInDirection(commonNeig[0][0], commonNeig[0][1], dirCommon1) !== -1){//case back facing wall on common neighbor 1
                foundWallsIndeces.push(getWallIndexOnFieldInDirection(commonNeig[0][0], commonNeig[0][1], dirCommon1));
            }

            let dirCommon2 = (dir + 4) % 6;
            if(getWallIndexOnFieldInDirection(commonNeig[1][0], commonNeig[1][1], dirCommon2) !== -1){//case front facing wall on common neighbor 2
                foundWallsIndeces.push(getWallIndexOnFieldInDirection(commonNeig[1][0], commonNeig[1][1], dirCommon2));
            }
            dirCommon2 = dir;
            if(getWallIndexOnFieldInDirection(commonNeig[1][0], commonNeig[1][1], dirCommon2) !== -1){//case back facing wall on common neighbor 2
                foundWallsIndeces.push(getWallIndexOnFieldInDirection(commonNeig[1][0], commonNeig[1][1], dirCommon2));
            }

            let dirTarget = (dir + 3) % 6;
            if(getWallIndexOnFieldInDirection(toX, toY, dirTarget) !== -1){//case front facing wall on target
                foundWallsIndeces.push(getWallIndexOnFieldInDirection(toX, toY, dirTarget));
            }
            dirTarget = (dir + 4) % 6;
            if(getWallIndexOnFieldInDirection(toX, toY, dirTarget) !== -1){//case front facing wall on target
                foundWallsIndeces.push(getWallIndexOnFieldInDirection(toX, toY, dirTarget));
            }
        }
    }
    return foundWallsIndeces;
}

//returns all walls on target field
function getWallIndexOnFieldInDirection(x,y, direction){
    for(let i = 0; i < buildings.length; i++){
        if(buildings[i].type === 5 && buildings[i].x === x && buildings[i].y === y && buildings[i].direction === convertDirection(direction)){
           return i;
        }
    }
    return -1;
}


function convertDirection(dir){
    switch(dir){
        case 0: return "nw";
        case 1: return "ne";
        case 2: return "e";
        case 3: return "se";
        case 4: return "sw";
        case 5: return "w";
    }
}