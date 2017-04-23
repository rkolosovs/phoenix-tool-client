'use strict';

		function toggleOnClickWorldCreationMode(){
			if(worldCreationModeOnClick && (changeFieldToType == -1)){
				worldCreationModeOnClick = false;
				document.getElementById("creationWarning").style.display = "none";
			} else if (!worldCreationModeOnClick || (worldCreationModeOnClick && (changeFieldToType != -1))){
				changeFieldToType = -1;
				worldCreationModeOnClick = true;
				document.getElementById("creationWarning").style.display = "";
			}
		}

		function changeFieldClickedTo(number){
			if(changeFieldToType != number){
				switchModeTo("worldCreationModeOnClick");
				changeFieldToType = number;
				document.getElementById("creationWarning").style.display = "";
			} else {
				changeFieldToType = -1;
				switchModeTo("worldCreationModeOn");
				document.getElementById("creationWarning").style.display = "none";
			}
		}

		// add a castle in the selectedField
		function addCastle(){
			var sf = selectedFields[0];
			var found = false;
			for(var i = 0; i < buildings.length; i++){
				var building = buildings[i]
				if(building.type < 5 && building.x == sf[0] && building.y == sf[1]){
					buildings[i].type = 0;
					found = true;
				}
			}
			var building = {"type": 0, "x": sf[0], "y": sf[1]};
			if(found){
			} else {
				buildings.push(building);
			}
		}

		// add a city in the selectedField
		function addCity(){
			var sf = selectedFields[0];
			var found = false;
			for(var i = 0; i < buildings.length; i++){
				var building = buildings[i]
				if(building.type < 5 && building.x == sf[0] && building.y == sf[1]){
					buildings[i].type = 1;
					found = true;
				}
			}
			var building = {"type": 1, "x": sf[0], "y": sf[1]};
			if(found){
			} else {
				buildings.push(building);
			}
		}

		// add a fortress in the selectedField
		function addFortress(){
			var sf = selectedFields[0];
			var found = false;
			for(var i = 0; i < buildings.length; i++){
				var building = buildings[i]
				if(building.type < 5 && building.x == sf[0] && building.y == sf[1]){
					buildings[i].type = 2;
					found = true;
				}
			}
			var building = {"type": 2, "x": sf[0], "y": sf[1]};
			if(found){
			} else {
				buildings.push(building);
			}
		}

		// add a capital city in the selectedField
		function addCapital(){
			var sf = selectedFields[0];
			var found = false;
			for(var i = 0; i < buildings.length; i++){
				var building = buildings[i]
				if(building.type < 5 && building.x == sf[0] && building.y == sf[1]){
					buildings[i].type = 3;
					found = true;
				}
			}
			var building = {"type": 3, "x": sf[0], "y": sf[1]};
			if(found){
			} else {
				buildings.push(building);
			}
		}

		// add a capital fortress in the selectedField
		function addCapitalFortress(){
			var sf = selectedFields[0];
			var found = false;
			for(var i = 0; i < buildings.length; i++){
				var building = buildings[i]
				if(building.type < 5 && building.x == sf[0] && building.y == sf[1]){
					buildings[i].type = 4;
					found = true;
				}
			}
			var building = {"type": 4, "x": sf[0], "y": sf[1]};
			if(found){
			} else {
				buildings.push(building);
			}
		}

		// delete the building in the selectedField
		function deleteBuilding(){
			var sf = selectedFields[0];
			for(var i = 0; i < buildings.length; i++){
				var building = buildings[i];
				if(building.type < 5 && building.x == sf[0] && building.y == sf[1]){
					if(i == buildings.length-1){
						delete buildings[i];
					}else{
						buildings[i] = buildings.pop();
					}
				}
			}
		}

		// adds a street in the target direction
		function addStreet(direction){
			var sf = selectedFields[0];
			var field = new showHex(sf[0], sf[1]);
			var targets = field.neighbors();
			var target = targets[direction];
			var found = false;
			for(var i = 0; i < buildings.length; i++){
				var building = buildings[i];
				if(building.type == 8 && ((building.first[0] == sf[0] && building.first[1] == sf[1] && building.second[0] == target[0] && building.second[1] == target[1]) || 
				(building.first[0] == target[0] && building.first[1] == target[1] && building.second[0] == sf[0] && building.second[1] == sf[1]))){
					found = true;
				}
			}
			var building = {"type": 8, "first": [sf[0], sf[1]], "second": [target[0], target[1]]};
			if(found){
			} else {
				buildings.push(building);
				selectedFields[0]=[target[0], target[1]];
			}
		}

		// removes a street in the target direction
		function removeStreet(direction){
			var sf = selectedFields[0];
			var field = new showHex(sf[0], sf[1]);
			var targets = field.neighbors();
			var target = targets[direction];
			var found = undefined;
			for(var i = 0; i < buildings.length; i++){
				var building = buildings[i];
				if(building.type == 8 && ((building.first[0] == sf[0] && building.first[1] == sf[1] && building.second[0] == target[0] && building.second[1] == target[1]) || 
				(building.first[0] == target[0] && building.first[1] == target[1] && building.second[0] == sf[0] && building.second[1] == sf[1]))){
					found = i;
				}
			}
			if(found != undefined){
				if(found == buildings.length-1){
					buildings.pop();
					selectedFields[0]=[target[0], target[1]];
				} else {
					buildings[found] = buildings.pop();
					selectedFields[0]=[target[0], target[1]];
				}
			}
		}

		// adds a river in the target direction
		function addRiver(direction){
			var sf = selectedFields[0];
			var field = new showHex(sf[0], sf[1]);
			var targets = field.neighbors();
			var target = targets[direction];
			var found = false;
			for(var i = 0; i < rivers.length; i++){
				var river = rivers[i];
				if((river[0][0] == sf[0] && river[0][1] == sf[1] && river[1][0] == target[0] && river[1][1] == target[1] ) || 
				(river[1][0] == sf[0] && river[1][1] == sf[1] && river[0][0] == target[0] && river[0][1] == target[1])){
					found = true;
				}
			}
			if(found){
			} else {
				rivers.push([[sf[0],sf[1]],[target[0],target[1]]]);
			}
		}

		// removes a river in the target direction
		function removeRiver(direction){
			var sf = selectedFields[0];
			var field = new showHex(sf[0], sf[1]);
			var targets = field.neighbors();
			var target = targets[direction];
			var found = undefined;
			for(var i = 0; i < rivers.length; i++){
				var river = rivers[i];
				if((river[0][0] == sf[0] && river[0][1] == sf[1] && river[1][0] == target[0] && river[1][1] == target[1] ) || 
				(river[1][0] == sf[0] && river[1][1] == sf[1] && river[0][0] == target[0] && river[0][1] == target[1])){
					found = i;
				}
			}
			if(found != undefined){
				if(found == rivers.length-1){
					rivers.pop();
				} else {
					rivers[found] = rivers.pop();
				}
			}
		}

		//add = true means add a building, else remove it.
		function manipulateBorderBuilding(type, direction, add){
			var sf = selectedFields[0];
			var found = undefined;
			for(var i = 0; i < buildings.length; i++){
				var building = buildings[i];
				if(building.type == type && (building.x == sf[0] && building.y == sf[1] && building.direction == direction)){
					found = i;
				}
			}
			if(add){
				var building = {"type": type, "x": sf[0], "y": sf[1], "direction": direction};
				if(found){
				} else {
					buildings.push(building);
				}
			} else {
				if(found != undefined){
					if(found == buildings.length-1){
						buildings.pop();
					}else{
						buildings[found] = buildings.pop();
					}
				}
			}
		}

		// the function for the Gm posibility to make an army out of nothing
		function generateArmyBtn(){
			ownerBuffer = Number(document.getElementById("ownerField").value);
			armyIdBuffer = Number(document.getElementById("armyNumberField").value);
			countBuffer = Number(document.getElementById("countField").value);
			leaderBuffer = Number(document.getElementById("leaderField").value);
			mountsBuffer = Number(document.getElementById("mountsField").value);
			lkpBuffer = Number(document.getElementById("lkpField").value); 
			skpBuffer = Number(document.getElementById("skpField").value);
			guardBuffer = document.getElementById("guardField").value;
			if(armyIdBuffer < 101 || armyIdBuffer > 399){
				window.alert("Die Armee-Id muss zwischen 101 und 399 liegen.");
				return false;
			}
			// check for any other armies with the same armyId
			for(var i=0; i < listOfArmyCoordinates.length; i++){
				if(listOfArmyCoordinates[i].a.armyId == armyIdBuffer && listOfArmyCoordinates[i].owner == ownerBuffer){
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
		}

		// This is used by the infoChangeBox to manipulate an armies Stats.
		function changeArmyInfo(){
			for(var i = 0; i<listOfArmyCoordinates.length; i++){
				if(i!=selectedArmy && listOfArmyCoordinates[i].owner == document.getElementById("ownerChangeInput").value &&
				listOfArmyCoordinates[i].a.armyId == document.getElementById("armyIdChangeInput").value){
					window.alert("Diese Armee-Id ist in diesem Reich bereits vergeben.");
				} else {
					if(document.getElementById("guardChangeInput").checked){
						listOfArmyCoordinates[selectedArmy].a.isGuard = true;
					} else {
						listOfArmyCoordinates[selectedArmy].a.isGuard = false;
					}
					listOfArmyCoordinates[selectedArmy].owner = Number(document.getElementById("ownerChangeInput").value);
					listOfArmyCoordinates[selectedArmy].a.armyId = Number(document.getElementById("armyIdChangeInput").value);
					listOfArmyCoordinates[selectedArmy].a.count = Number(document.getElementById("countChangeInput").value);
					listOfArmyCoordinates[selectedArmy].a.leaders = Number(document.getElementById("leadersChangeInput").value);
					listOfArmyCoordinates[selectedArmy].a.mounts = Number(document.getElementById("mountsChangeInput").value);
					listOfArmyCoordinates[selectedArmy].a.lkp = Number(document.getElementById("lkpChangeInput").value);
					listOfArmyCoordinates[selectedArmy].a.skp = Number(document.getElementById("skpChangeInput").value);
					listOfArmyCoordinates[selectedArmy].remainingMovePoints = Number(document.getElementById("movePointsChangeInput").value);
					listOfArmyCoordinates[selectedArmy].remainingHeightPoints = Number(document.getElementById("heightPointsChangeInput").value);
				}
			}
		}