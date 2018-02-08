'use strict';
// TODO: before pushing check added and deleted buildings if one is already inside the other, if it is then delete it.

namespace GodFunctions{

	let factionToCreateBuildingsFor = realms[0].tag;

	export function setFactionToCreateBuildingsFor(faction): void{
		factionToCreateBuildingsFor = faction;
	}

	export function toggleOnClickWorldCreationMode(): void{
		if(worldCreationModeOnClick && (changeFieldToType == -1)){
			worldCreationModeOnClick = false;
			hide(GUI.getWorldBenderBox().getCreationWarning());
		} else if (!worldCreationModeOnClick || (worldCreationModeOnClick && (changeFieldToType != -1))){
			changeFieldToType = -1;
			worldCreationModeOnClick = true;
			show(GUI.getWorldBenderBox().getCreationWarning());
		}
		Drawing.resizeCanvas()
	}

	export function changeFieldClickedTo(number): void{
		if(changeFieldToType != number){
			switchModeTo("worldCreationModeOnClick");
			changeFieldToType = number;
			show(GUI.getWorldBenderBox().getCreationWarning());
		} else {
			changeFieldToType = -1;
			switchModeTo("worldCreationModeOn");
			hide(GUI.getWorldBenderBox().getCreationWarning());
		}
		Drawing.resizeCanvas()
	}

	// add a castle in the selectedField
	export function addCastle(): void{
		let sf = selectedFields[0];
		let found = false;
		for(let i = 0; i < GameState.buildings.length; i++){
			let building = GameState.buildings[i]
			if(building.type < 5 && building.getPosition()[0] === sf[0] && building.getPosition()[1] == sf[1]){
				GameState.buildings[i].type = 0;
				found = true;
			}
		}
		if(found){
			changedBuildings.push([true, {"type": 0, "x": sf[0], "y": sf[1], "realm":factionToCreateBuildingsFor}]);	//<----------------------------------------Realm
			// console.log({"type": 0, "x": sf[0], "y": sf[1], "realm":factionToCreateBuildingsFor});
		} else {
			changedBuildings.push([true, {"type": 0, "x": sf[0], "y": sf[1], "realm":factionToCreateBuildingsFor}]);
			GameState.buildings.push(new ProductionBuilding( 0,[sf[0], sf[1]], factionToCreateBuildingsFor, 500));//TODO correct BP
			// console.log("this is a new:");
			// console.log(changedBuildings[changedBuildings.length-1]);
		}
		Drawing.resizeCanvas()
	}

	// add a city in the selectedField
	export function addCity(): void{
		let sf = selectedFields[0];
		let found = false;
		for(let i = 0; i < GameState.buildings.length; i++){
			let building = GameState.buildings[i]
			if(building.type < 5 && building.getPosition()[0] === sf[0] && building.getPosition()[1] === sf[1]){
				GameState.buildings[i].type = 1;
				found = true;
			}
		}
		if(found){
			changedBuildings.push([true, {"type": 1, "x": sf[0], "y": sf[1], "realm":factionToCreateBuildingsFor}]);
			// console.log({"type": 1, "x": sf[0], "y": sf[1], "realm":factionToCreateBuildingsFor});
		} else {
			changedBuildings.push([true, {"type": 1, "x": sf[0], "y": sf[1], "realm":factionToCreateBuildingsFor}]);
			GameState.buildings.push(new ProductionBuilding(1, [sf[0], sf[1]], factionToCreateBuildingsFor,500));//TODO correct BP
			// console.log("this is a new:");
			// console.log(changedBuildings[changedBuildings.length-1]);
		}
		Drawing.resizeCanvas()
	}

	// add a fortress in the selectedField
	export function addFortress(): void{
		let sf = selectedFields[0];
		let found = false;
		for(let i = 0; i < GameState.buildings.length; i++){
			let building = GameState.buildings[i]
			if(building.type < 5 && building.getPosition()[0] === sf[0] && building.getPosition()[1] === sf[1]){
				GameState.buildings[i].type = 2;
				found = true;
			}
		}
		if(found){
			changedBuildings.push([true, {"type": 2, "x": sf[0], "y": sf[1], "realm":factionToCreateBuildingsFor}]);
			// console.log({"type": 2, "x": sf[0], "y": sf[1], "realm":factionToCreateBuildingsFor});
		} else {
			changedBuildings.push([true, {"type": 2, "x": sf[0], "y": sf[1], "realm":factionToCreateBuildingsFor}]);
			GameState.buildings.push(new ProductionBuilding(2,[sf[0], sf[1]], factionToCreateBuildingsFor, 500));//TODO correct BP
			// console.log("this is a new:");
			// console.log(changedBuildings[changedBuildings.length-1]);
			
		}
		Drawing.resizeCanvas()
	}

	// add a capital city in the selectedField
	export function addCapital(): void{
		let sf = selectedFields[0];
		let found = false;
		for(let i = 0; i < GameState.buildings.length; i++){
			let building = GameState.buildings[i];
			if(building.type < 5 && building.getPosition()[0] === sf[0] && building.getPosition()[1] === sf[1]){
				GameState.buildings[i].type = 3;
				found = true;
			}
		}
		if(found){
			changedBuildings.push([true, {"type": 3, "x": sf[0], "y": sf[1], "realm":factionToCreateBuildingsFor}]);
			// console.log({"type": 3, "x": sf[0], "y": sf[1], "realm":factionToCreateBuildingsFor});
		} else {
			changedBuildings.push([true, {"type": 3, "x": sf[0], "y": sf[1], "realm":factionToCreateBuildingsFor}]);
			GameState.buildings.push(new ProductionBuilding(3, [sf[0], sf[1]], factionToCreateBuildingsFor, 500));//TODO correct BP
			// console.log("this is a new:");
			// console.log(changedBuildings[changedBuildings.length-1]);
		}
		Drawing.resizeCanvas();
	}

	// add a capital fortress in the selectedField
	export function addCapitalFortress(): void{
		let sf = selectedFields[0];
		let found = false;
		for(let i = 0; i < GameState.buildings.length; i++){
			let building = GameState.buildings[i]
			if(building.type < 5 && building.getPosition()[0] === sf[0] && building.getPosition()[1] === sf[1]){
				GameState.buildings[i].type = 4;
				found = true;
			}
		}
		if(found){
			changedBuildings.push([true, {"type": 4, "x": sf[0], "y": sf[1], "realm":factionToCreateBuildingsFor}]);
			// console.log({"type": 4, "x": sf[0], "y": sf[1], "realm":factionToCreateBuildingsFor});
		} else {
			changedBuildings.push([true, {"type": 4, "x": sf[0], "y": sf[1], "realm":factionToCreateBuildingsFor}]);
			GameState.buildings.push(new ProductionBuilding( 4, [sf[0], sf[1]], factionToCreateBuildingsFor, 500));//TODO correct BP
			// console.log("this is a new:");
			// console.log(changedBuildings[changedBuildings.length-1]);
		}
		Drawing.resizeCanvas()
	}

	// delete the building in the selectedField
	export function deleteBuilding(): void{
		let sf = selectedFields[0];
		for(let i = 0; i < GameState.buildings.length; i++){
			let building = GameState.buildings[i];
			if(building.type < 5 && building.getPosition()[0] === sf[0] && building.getPosition()[1] === sf[1]){
				changedBuildings.push([false, {"type": building.type, "x": sf[0], "y": sf[1], "realm":factionToCreateBuildingsFor}]);
				if(i === GameState.buildings.length-1){
					GameState.buildings.pop();
				} else {
					GameState.buildings[i] = GameState.buildings.pop();
				}
			}
		}
		Drawing.resizeCanvas()
	}

	// adds a street in the target direction
	export function addStreet(direction): void{
		let sf = selectedFields[0];
		let targets = HexFunction.neighbors(sf[0], sf[1]);
		let target = targets[direction];
		let found = false;
		for(let i = 0; i < buildings.length; i++){
			let building = buildings[i];//TODO change this to accomodate new Types probably with differentlist for streets
			if((building.type === 8 && (building.firstX === sf[0] && building.firstY === sf[1] && building.secondX === target[0] && building.secondY === target[1])) || 
			(building.type === 8 &&(building.firstX === target[0] && building.firstY === target[1] && building.secondX === sf[0] && building.secondY === sf[1]))){
				found = true;
			}
		}
		if(found){
		} else {
			changedBuildings.push([true, {"type": 8, "firstX":sf[0], "firstY":sf[1], "secondX": target[0], "secondY": target[1], "realm":factionToCreateBuildingsFor}]);
			buildings.push({"type": 8, "firstX":sf[0], "firstY":sf[1], "secondX": target[0], "secondY": target[1], "realm":factionToCreateBuildingsFor});
			selectedFields[0]=[target[0], target[1]];
		}
		Drawing.resizeCanvas()
	}

	// removes a street in the target direction
	export function removeStreet(direction): void{
		let sf = selectedFields[0];
		let targets = HexFunction.neighbors(sf[0], sf[1]);
		let target = targets[direction];
		let found = undefined;
		for(let i = 0; i < buildings.length; i++){
			let building = buildings[i];//TODO change this to accomodate new Types probably with differentlist for streets
			if(building.type === 8 && ((building.firstX === sf[0] && building.firstY === sf[1] && building.secondX === target[0] && building.secondY === target[1]) || 
			(building.firstX === target[0] && building.firstY === target[1] && building.secondX === sf[0] && building.secondY === sf[1]))){
				found = i;
			}
		}
		if(found != undefined){
			changedBuildings.push([false, {"type": 8, "firstX":sf[0], "firstY":sf[1], "secondX": target[0], "secondY": target[1], "realm":factionToCreateBuildingsFor}]);
			if(found == buildings.length-1){
				buildings.pop();
				selectedFields[0]=[target[0], target[1]];
			} else {
				buildings[found] = buildings.pop();
				selectedFields[0]=[target[0], target[1]];
			}
		}
		Drawing.resizeCanvas();
	}

	// adds a river in the target direction
	export function addRiver(direction): void{
		let sf = selectedFields[0];
		let targets = HexFunction.neighbors(sf[0], sf[1]);
		let target = targets[direction];
		let found = false;
		for(let i = 0; i < GameState.rivers.length; i++){
			let river = GameState.rivers[i];
			if((river.rightBank[0] === sf[0] && river.rightBank[1] === sf[1] && river.leftBank[0] === target[0] && river.leftBank[1] === target[1] ) || 
			(river.leftBank[0] === sf[0] && river.leftBank[1] === sf[1] && river.rightBank[0] === target[0] && river.rightBank[1] === target[1])){
				found = true;
			}
		}
		if(found){
		} else {
			GameState.rivers.push(new River([sf[0],sf[1]],[target[0],target[1]]));
		}
		Drawing.resizeCanvas();
	}

	// removes a river in the target direction
	export function removeRiver(direction): void{
		let sf = selectedFields[0];
		let targets = HexFunction.neighbors(sf[0], sf[1]);
		let target = targets[direction];
		let found = undefined;
		for(let i = 0; i < GameState.rivers.length; i++){
			let river = GameState.rivers[i];
			if((river.rightBank[0] == sf[0] && river.rightBank[1] == sf[1] && river.leftBank[0] == target[0] && river.leftBank[1] == target[1] ) || 
			(river.leftBank[0] == sf[0] && river.leftBank[1] == sf[1] && river.rightBank[0] == target[0] && river.rightBank[1] == target[1])){
				found = i;
			}
		}
		if(found != undefined){
			if(found == GameState.rivers.length-1){
				GameState.rivers.pop();
			} else {
				GameState.rivers[found] = GameState.rivers.pop();
			}
		}
		Drawing.resizeCanvas();
	}

	//add = true means add a building, else remove it.
	export function manipulateBorderBuilding(type, direction, add): void{
		let sf = selectedFields[0];
		let found = undefined;
		for(let i = 0; i < buildings.length; i++){
			let building = buildings[i];
			if(building.type == type && (building.x == sf[0] && building.y == sf[1] && building.direction == direction)){
				found = i;
			}
		}
		if(add){
			if(found){
				changedBuildings.push([true, {"type": type, "x": sf[0], "y": sf[1], "direction": direction, "realm":factionToCreateBuildingsFor}]);
			} else {
				changedBuildings.push([true, {"type": type, "x": sf[0], "y": sf[1], "direction": direction, "realm":factionToCreateBuildingsFor}]);
				buildings.push({"type": type, "x": sf[0], "y": sf[1], "direction": direction, "realm":factionToCreateBuildingsFor});
			}
		} else {
			if(found != undefined){
				changedBuildings.push([false, {"type": type, "x": sf[0], "y": sf[1], "direction": direction, "realm":factionToCreateBuildingsFor}]);
				if(found == buildings.length-1){
					buildings.pop();
				}else{
					buildings[found] = buildings.pop();
				}
			}
		}
		Drawing.resizeCanvas();
	}

	// the function for the Gm posibility to make an army out of nothing
	export function generateArmyBtn(): boolean{
		let armyMakerBox: ArmyGeneratorBox = GUI.getArmyGeneratorBox();
		ownerBuffer = armyMakerBox.getOwnerField().value;
		armyIdBuffer = Number(armyMakerBox.getArmyNumberField().value);
		countBuffer = Number(armyMakerBox.getCountField().value);
		leaderBuffer = Number(armyMakerBox.getLeaderField().value);
		mountsBuffer = Number(armyMakerBox.getMountsField().value);
		lkpBuffer = Number(armyMakerBox.getLKPField().value);
		skpBuffer = Number(armyMakerBox.getSKPField().value);
		// TODO be able to generate guard armies
		guardBuffer = false;
		if(armyIdBuffer < 101 || armyIdBuffer > 399){
			window.alert("Die Armee-Id muss zwischen 101 und 399 liegen.");
			return false;
		}
		// check for any other armies with the same armyId
		for(let i=0; i < listOfArmies.length; i++){
			if(listOfArmies[i].armyId == armyIdBuffer && listOfArmies[i].owner === ownerBuffer){
				window.alert("Ein Heer mit dieser Nummer existiert bereits in diesem Königreich.");
				return false;
			}
		}
		// check for catabults in a rider army, and for mounts in a rider army, or fleet
		if(Math.floor(armyIdBuffer/100) == 2) {
			if(mountsBuffer > 0 || lkpBuffer > 0 || skpBuffer > 0){
				window.alert("In einem Reiterheer sollten weder einzelne Reittiere, noch Katapulte sein. Wenn das Heer ein Fußheer sein sollte gib, ihm eine Nummer zwischen 100 und 199.")
				return false;
			}
		} else if (Math.floor(armyIdBuffer/100) == 3){
			if(mountsBuffer > 0){
				window.alert("In einer Flotte sollten keine Reittiere enthalten sein. Wenn das Heer ein Fußheer sein sollte, gib ihm eine Nummer zwischen 100 und 199.")
				return false;
			}
		}
		switchModeTo("armyWithNextClick");
		return true;
	}

	// used to delete the selected army
	export function godDeleteSelectedArmy(): void{
		if (confirm('Are you sure you want to delete your currenty selected army?')) {
			listOfArmies[selectedArmyIndex] = listOfArmies[listOfArmies.length-1];
			listOfArmies.pop()
		} else {
			// Do nothing!
		}
		Drawing.resizeCanvas();
	}

	// This is used by the infoChangeBox to manipulate an armies Stats.
	export function changeArmyInfo(): void{
		for(let i = 0; i<listOfArmies.length; i++){
			let infoChangeBox: InfoChangeBox = GUI.getInfoChangeBox();
			if(i!=selectedArmyIndex && listOfArmies[i].owner === infoChangeBox.getOwnerChangeInput().value &&
				listOfArmies[i].armyId === infoChangeBox.getArmyIdChangeInput().value){
					window.alert("Diese Armee-Id ist in diesem Reich bereits vergeben.");
			} else {
				listOfArmies[selectedArmyIndex].isGuard = infoChangeBox.getGuardChangeInput().checked;
				listOfArmies[selectedArmyIndex].owner = infoChangeBox.getOwnerChangeInput().value;
				listOfArmies[selectedArmyIndex].armyId = Number(infoChangeBox.getArmyIdChangeInput().value);
				listOfArmies[selectedArmyIndex].count = Number(infoChangeBox.getCountChangeInput().value);
				listOfArmies[selectedArmyIndex].leaders = Number(infoChangeBox.getLeadersChangeInput().value);
				listOfArmies[selectedArmyIndex].mounts = Number(infoChangeBox.getMountsChangeInput().value);
				listOfArmies[selectedArmyIndex].lkp = Number(infoChangeBox.getLKPChangeInput().value);
				listOfArmies[selectedArmyIndex].skp = Number(infoChangeBox.getSKPChangeInput().value);
				listOfArmies[selectedArmyIndex].remainingMovePoints = Number(infoChangeBox.getMovePointsChangeInput().value);
				listOfArmies[selectedArmyIndex].remainingHeightPoints = Number(infoChangeBox.getHeightPointsChangeInput().value);
			}
		}
		Drawing.resizeCanvas();
	}
}