'use strict';
// TODO: before pushing check added and deleted buildings if one is already inside the other, if it is then delete it.

		var factionToCreateBuildingsFor = 1;
		function setFactionToCreateBuildingsFor(faction){
			factionToCreateBuildingsFor = faction;
			console.log("buildings for faction " + factionToCreateBuildingsFor);
		}

		function toggleOnClickWorldCreationMode(){
			if(worldCreationModeOnClick && (changeFieldToType == -1)){
				worldCreationModeOnClick = false;
				document.getElementById("creationWarning").style.display = "none";
			} else if (!worldCreationModeOnClick || (worldCreationModeOnClick && (changeFieldToType != -1))){
				changeFieldToType = -1;
				worldCreationModeOnClick = true;
				document.getElementById("creationWarning").style.display = "";
			}
			resizeCanvas()
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
			resizeCanvas()
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
			if(found){
				changedBuildings.push([true, {"type": 0, "x": sf[0], "y": sf[1], "realm":factionToCreateBuildingsFor}]);	//<----------------------------------------Realm
				console.log({"type": 0, "x": sf[0], "y": sf[1], "realm":factionToCreateBuildingsFor});
			} else {
				changedBuildings.push([true, {"type": 0, "x": sf[0], "y": sf[1], "realm":factionToCreateBuildingsFor}]);
				buildings.push({"type": 0, "x": sf[0], "y": sf[1], "realm":factionToCreateBuildingsFor});
				console.log("this is a new:");
				console.log(changedBuildings[changedBuildings.length-1]);
			}
			resizeCanvas()
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
			if(found){
				changedBuildings.push([true, {"type": 1, "x": sf[0], "y": sf[1], "realm":factionToCreateBuildingsFor}]);
				console.log({"type": 1, "x": sf[0], "y": sf[1], "realm":factionToCreateBuildingsFor});
			} else {
				changedBuildings.push([true, {"type": 1, "x": sf[0], "y": sf[1], "realm":factionToCreateBuildingsFor}]);
				buildings.push({"type": 1, "x": sf[0], "y": sf[1], "realm":factionToCreateBuildingsFor});
				console.log("this is a new:");
				console.log(changedBuildings[changedBuildings.length-1]);
			}
			resizeCanvas()
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
			if(found){
				changedBuildings.push([true, {"type": 2, "x": sf[0], "y": sf[1], "realm":factionToCreateBuildingsFor}]);
				console.log({"type": 2, "x": sf[0], "y": sf[1], "realm":factionToCreateBuildingsFor});
			} else {
				changedBuildings.push([true, {"type": 2, "x": sf[0], "y": sf[1], "realm":factionToCreateBuildingsFor}]);
				buildings.push({"type": 2, "x": sf[0], "y": sf[1], "realm":factionToCreateBuildingsFor});
				console.log("this is a new:");
				console.log(changedBuildings[changedBuildings.length-1]);
			}
			resizeCanvas()
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
			if(found){
				changedBuildings.push([true, {"type": 3, "x": sf[0], "y": sf[1], "realm":factionToCreateBuildingsFor}]);
				console.log({"type": 3, "x": sf[0], "y": sf[1], "realm":factionToCreateBuildingsFor});
			} else {
				changedBuildings.push([true, {"type": 3, "x": sf[0], "y": sf[1], "realm":factionToCreateBuildingsFor}]);
				buildings.push({"type": 3, "x": sf[0], "y": sf[1], "realm":factionToCreateBuildingsFor});
				console.log("this is a new:");
				console.log(changedBuildings[changedBuildings.length-1]);
			}
			resizeCanvas()
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
			if(found){
				changedBuildings.push([true, {"type": 4, "x": sf[0], "y": sf[1], "realm":factionToCreateBuildingsFor}]);
				console.log({"type": 4, "x": sf[0], "y": sf[1], "realm":factionToCreateBuildingsFor});
			} else {
				changedBuildings.push([true, {"type": 4, "x": sf[0], "y": sf[1], "realm":factionToCreateBuildingsFor}]);
				buildings.push({"type": 4, "x": sf[0], "y": sf[1], "realm":factionToCreateBuildingsFor});
				console.log("this is a new:");
				console.log(changedBuildings[changedBuildings.length-1]);
			}
			resizeCanvas()
		}

		// delete the building in the selectedField
		function deleteBuilding(){
			var sf = selectedFields[0];
			for(var i = 0; i < buildings.length; i++){
				var building = buildings[i];
				if(building.type < 5 && building.x == sf[0] && building.y == sf[1]){
					changedBuildings.push([false, {"type": building.type, "x": sf[0], "y": sf[1], "realm":factionToCreateBuildingsFor}]);
					if(i == buildings.length-1){
						buildings.pop();
					} else {
						buildings[i] = buildings.pop();
					}
				}
			}
			resizeCanvas()
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
				if((building.type == 8 && (building.firstX == sf[0] && building.firstY == sf[1] && building.secondX == target[0] && building.secondY == target[1])) || 
				(building.type == 8 &&(building.firstX == target[0] && building.firstY == target[1] && building.secondX == sf[0] && building.secondY == sf[1]))){
					found = true;
				}
			}
			if(found){
			} else {
				changedBuildings.push([true, {"type": 8, "firstX":sf[0], "firstY":sf[1], "secondX": target[0], "secondY": target[1], "realm":factionToCreateBuildingsFor}]);
				buildings.push({"type": 8, "firstX":sf[0], "firstY":sf[1], "secondX": target[0], "secondY": target[1], "realm":factionToCreateBuildingsFor});
				selectedFields[0]=[target[0], target[1]];
			}
			resizeCanvas()
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
				if(building.type == 8 && ((building.firstX == sf[0] && building.firstY == sf[1] && building.secondX == target[0] && building.secondY == target[1]) || 
				(building.firstX == target[0] && building.firstY == target[1] && building.secondX == sf[0] && building.secondY == sf[1]))){
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
			resizeCanvas()
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
			resizeCanvas()
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
			resizeCanvas()
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
			resizeCanvas()
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
			// TODO be able to generate guard armies
			guardBuffer = false;
			if(armyIdBuffer < 101 || armyIdBuffer > 399){
				window.alert("Die Armee-Id muss zwischen 101 und 399 liegen.");
				return false;
			}
			// check for any other armies with the same armyId
			for(var i=0; i < listOfArmies.length; i++){
				if(listOfArmies[i].a.armyId == armyIdBuffer && listOfArmies[i].a.owner == ownerBuffer){
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

		// used to delete the selected army
		function godDeleteSelectedArmy(){
			if (confirm('Are you sure you want to delete your currenty selected army?')) {
//				listOfArmies[selectedArmy] = listOfArmies[listOfArmies.length-1];
//				listOfArmies.pop()
				listOfArmies.splice(selectedArmy, 1);
			}
			resizeCanvas();
		}

		// This is used by the infoChangeBox to manipulate an armies Stats.
		function changeArmyInfo(){
			for(var i = 0; i<listOfArmies.length; i++){
				if(i!=selectedArmy && listOfArmies[i].a.owner == document.getElementById("ownerChangeInput").value &&
				listOfArmies[i].a.armyId == document.getElementById("armyIdChangeInput").value){
					window.alert("Diese Armee-Id ist in diesem Reich bereits vergeben.");
				} else {
					if(document.getElementById("guardChangeInput").checked){
						listOfArmies[selectedArmy].a.isGuard = true;
					} else {
						listOfArmies[selectedArmy].a.isGuard = false;
					}
					listOfArmies[selectedArmy].a.owner = Number(document.getElementById("ownerChangeInput").value);
					listOfArmies[selectedArmy].a.armyId = Number(document.getElementById("armyIdChangeInput").value);
					listOfArmies[selectedArmy].a.count = Number(document.getElementById("countChangeInput").value);
					listOfArmies[selectedArmy].a.leaders = Number(document.getElementById("leadersChangeInput").value);
					listOfArmies[selectedArmy].a.mounts = Number(document.getElementById("mountsChangeInput").value);
					listOfArmies[selectedArmy].a.lkp = Number(document.getElementById("lkpChangeInput").value);
					listOfArmies[selectedArmy].a.skp = Number(document.getElementById("skpChangeInput").value);
					listOfArmies[selectedArmy].a.remainingMovePoints = Number(document.getElementById("movePointsChangeInput").value);
					listOfArmies[selectedArmy].a.remainingHeightPoints = Number(document.getElementById("heightPointsChangeInput").value);
				}
			}
			resizeCanvas()
		}