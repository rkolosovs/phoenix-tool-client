'use strict';

var worldCreationModeOn = false;
var worldCreationModeOnClick = false;
var riverCreationModeOn = false;
var buildingCreationModeOn = false;
var streetBuildingModeOn = false;
var harborBuildingModeOn = false;
var bridgeBuildingModeOn = false;
var wallBuildingModeOn = false;
var changeFieldToType = -1;
var armyCreationModeOn = false;
var armyWithNextClick = false;
var ownerBuffer = 0;
var armyIdBuffer = 0;
var countBuffer = 0;
var leaderBuffer = 0;
var mountsBuffer = 0;
var lkpBuffer = 0; 
var skpBuffer = 0;
var guardBuffer = false;

//TODO: Unify the handling of showing/hiding UI elements.
function toggleVisibility(element){
	var classes = element.classList;
	if(classes.contains("invisible")){
		classes.remove("invisible");
	} else {
		classes.add("invisible");
	}
}

function show(element) {
	var classes = element.classList;
	if(classes.contains("invisible")){
		classes.remove("invisible");
	}
}

function hide(element) {
	var classes = element.classList;
	if(!classes.contains("invisible")){
		classes.add("invisible");
	}
}

// switches bunttonBoxContent.style.visibility to "" and all others to "none"
		function switchBtnBoxTo(buttonBoxContent){
			document.getElementById("worldBenderBox").style.display = "none";
			document.getElementById("riverBenderBox").style.display = "none";
			document.getElementById("creationWarning").style.display = "none";
			document.getElementById("buildingCreationBox").style.display = "none";
			document.getElementById("streetCreationBox").style.display = "none";
			document.getElementById("harborCreationBox").style.display = "none";
			document.getElementById("bridgeCreationBox").style.display = "none";
			document.getElementById("wallCreationBox").style.display = "none";
			document.getElementById("buttonsBox").style.display = "none";
			document.getElementById("armyGeneratorBox").style.display = "none";
			document.getElementById(buttonBoxContent).style.display = "";
		}

		// switches activeMode to True and all others to false
		function switchModeTo(activeMode){
			worldCreationModeOn = false;
			worldCreationModeOnClick = false;
			riverCreationModeOn = false;
			buildingCreationModeOn = false;
			streetBuildingModeOn = false;
			harborBuildingModeOn = false;
			bridgeBuildingModeOn = false;
			wallBuildingModeOn = false;
			changeFieldToType = -1;
			armyWithNextClick = false;
			armyCreationModeOn = false;
			switch(activeMode){
				//worldCreationModeOnClick also has worldCreationModeOn enabled
				case "worldCreationModeOnClick": worldCreationModeOnClick = true;
				case "worldCreationModeOn": worldCreationModeOn = true; break;
				case "riverCreationModeOn": riverCreationModeOn = true; break;
				case "buildingCreationModeOn": buildingCreationModeOn = true; break;
				case "streetBuildingModeOn": streetBuildingModeOn = true; break;
				case "harborBuildingModeOn": harborBuildingModeOn = true; break;
				case "bridgeBuildingModeOn": bridgeBuildingModeOn = true; break;
				case "wallBuildingModeOn": wallBuildingModeOn = true; break;
				case "armyWithNextClick": armyWithNextClick = true; break;
				case "armyCreationModeOn": armyCreationModeOn = true; break;
				case "none": break;
			}
		}

		function toggleArmyCreationMode(){
			if(armyCreationModeOn){
				switchModeTo("none");
				switchBtnBoxTo("buttonsBox");
			} else if (!armyCreationModeOn){
				switchModeTo("armyCreationModeOn");
				switchBtnBoxTo("armyGeneratorBox");
			}
		}

		function toggleWorldCreationMode(){
			if(worldCreationModeOn){
				switchModeTo("none");
				switchBtnBoxTo("buttonsBox");
			} else if (!worldCreationModeOn){
				switchModeTo("worldCreationModeOn");
				switchBtnBoxTo("worldBenderBox");
			}
		}

		function toggleRiverCreationMode(){
			if(riverCreationModeOn){
				switchModeTo("none");
				switchBtnBoxTo("buttonsBox");
			} else if (!riverCreationModeOn){
				switchModeTo("riverCreationModeOn");
				switchBtnBoxTo("riverBenderBox");
			}
		}

		function toggleBuildingCreationMode(){
			if(buildingCreationModeOn){
				switchModeTo("none");
				switchBtnBoxTo("buttonsBox");
			} else if (!buildingCreationModeOn){
				switchBtnBoxTo("buildingCreationBox");
				switchModeTo("buildingCreationModeOn");
			}
		}
		
		function toggleStreetBuildingMode(){
			if(streetBuildingModeOn){
				switchModeTo("none");
				switchBtnBoxTo("buttonsBox");
			} else if (!streetBuildingModeOn){
				switchModeTo("streetBuildingModeOn");
				switchBtnBoxTo("streetCreationBox");
			}
		}

		function toggleHarborBuildingMode(){
			if(harborBuildingModeOn){
				switchModeTo("none");
				switchBtnBoxTo("buttonsBox");
			} else if (!harborBuildingModeOn){
				switchModeTo("harborBuildingModeOn");
				switchBtnBoxTo("harborCreationBox");
			}
		}

		function toggleBridgeBuildingMode(){
			if(bridgeBuildingModeOn){
				switchModeTo("none");
				switchBtnBoxTo("buttonsBox");
			} else if (!bridgeBuildingModeOn){
				switchModeTo("bridgeBuildingModeOn");
				switchBtnBoxTo("bridgeCreationBox");
			}
		}

		function toggleWallBuildingMode(){
			if(wallBuildingModeOn){
				switchModeTo("none");
				switchBtnBoxTo("buttonsBox");
			} else if (!wallBuildingModeOn){
				switchModeTo("wallBuildingModeOn");
				switchBtnBoxTo("wallCreationBox");
			}
		}

		function toggleGodModeBar(){
			if(document.getElementById("godmodeBox").style.visibility == "hidden"){
				restoreInfoBox();
				document.getElementById("godmodeBox").style.visibility = "visible";
				document.getElementById("infoChangeBox").style.display = "";
				document.getElementById("infoBox").style.display = "none";
			} else if(document.getElementById("godmodeBox").style.visibility == "visible"){
				document.getElementById("godmodeBox").style.visibility = "hidden";
				document.getElementById("infoChangeBox").style.display = "none";
				document.getElementById("infoBox").style.display = "";
				updateInfoBox();
			}
		}

		// this is used to update the infoBox and the infoChangeBox with the currently selected Army
		function updateInfoBox(){
			if(selectedArmy != undefined){
				// info Box
				console.log(listOfArmies[selectedArmy].a.armyId);
				console.log("This a guard army: " + listOfArmies[selectedArmy].a.isGuard);
				if(listOfArmies[selectedArmy].a.isGuard){
					document.getElementById("guard").innerHTML = "Garde";
				} else {
					document.getElementById("guard").innerHTML = null;
				}
				if(listOfArmies[selectedArmy].a.armyType() == 1 || listOfArmies[selectedArmy].a.armyType() == 2)
				{
					document.getElementById("armyId").innerHTML = "Heer " + listOfArmies[selectedArmy].a.armyId;
				}
				else if(listOfArmies[selectedArmy].a.armyType() == 3)
				{
					document.getElementById("armyId").innerHTML = "Flotte " + listOfArmies[selectedArmy].a.armyId;
				}
				document.getElementById("count").innerHTML = "Truppen: " + listOfArmies[selectedArmy].a.count;
				document.getElementById("leaders").innerHTML = "Heerführer: " + listOfArmies[selectedArmy].a.leaders;
				document.getElementById("mounts").innerHTML = "mitgeführte Reittiere: " + listOfArmies[selectedArmy].a.mounts;
				document.getElementById("lkp").innerHTML = "leichte Katapulte: " + listOfArmies[selectedArmy].a.lkp;
				document.getElementById("skp").innerHTML = "schwere Katapulte: " + listOfArmies[selectedArmy].a.skp;
				document.getElementById("movePoints").innerHTML = "Bewegungspunkte: " + listOfArmies[selectedArmy].a.remainingMovePoints;
				document.getElementById("heightPoints").innerHTML = "Höhenstufen: " + listOfArmies[selectedArmy].a.remainingHeightPoints;
				document.getElementById("splitBtn").style.display = "";
				if(Math.floor(listOfArmies[selectedArmy].a.armyId/100) == 1){
					document.getElementById("mount").style.display = "";
					document.getElementById("unMount").style.display = "none";
				} else if(Math.floor(listOfArmies[selectedArmy].a.armyId/100) == 2){
					document.getElementById("unMount").style.display = "";
					document.getElementById("mount").style.display = "none";
				} else {
					document.getElementById("mount").style.display = "none";
					document.getElementById("unMount").style.display = "none";
				}
				// change Box (GodMode)
				if(listOfArmies[selectedArmy].a.isGuard){
					document.getElementById("guardChangeInput").checked = true;
				} else {
					document.getElementById("guardChangeInput").checked = false;
				}
				document.getElementById("guardChangeInput").style.display = "";
				document.getElementById("ownerChangeInput").value = listOfArmies[selectedArmy].owner;
				document.getElementById("ownerChange").style.display = "";
				document.getElementById("armyIdChangeInput").value = listOfArmies[selectedArmy].a.armyId;
				document.getElementById("armyIdChange").style.display = "";
				document.getElementById("countChangeInput").value = listOfArmies[selectedArmy].a.count;
				document.getElementById("countChange").style.display = "";
				document.getElementById("leadersChangeInput").value = listOfArmies[selectedArmy].a.leaders;
				document.getElementById("leadersChange").style.display = "";
				document.getElementById("mountsChangeInput").value = listOfArmies[selectedArmy].a.mounts;
				document.getElementById("mountsChange").style.display = "";
				document.getElementById("lkpChangeInput").value = listOfArmies[selectedArmy].a.lkp;
				document.getElementById("lkpChange").style.display = "";
				document.getElementById("skpChangeInput").value = listOfArmies[selectedArmy].a.skp;
				document.getElementById("skpChange").style.display = "";
				document.getElementById("movePointsChangeInput").value = listOfArmies[selectedArmy].a.remainingMovePoints;
				document.getElementById("movePointsChange").style.display = "";
				document.getElementById("heightPointsChangeInput").value = listOfArmies[selectedArmy].a.remainingHeightPoints;
				document.getElementById("heightPointsChange").style.display = "";
				document.getElementById("changeArmyInfo").style.display = "";
			} else {
				// info Box
				document.getElementById("guard").innerHTML = null;
				document.getElementById("armyId").innerHTML = null;
				document.getElementById("count").innerHTML = null;
				document.getElementById("leaders").innerHTML = null;
				document.getElementById("mounts").innerHTML = null;
				document.getElementById("lkp").innerHTML = null;
				document.getElementById("skp").innerHTML = null;
				document.getElementById("movePoints").innerHTML = null;
				document.getElementById("heightPoints").innerHTML = null;
				document.getElementById("mount").style.display = "none";
				document.getElementById("unMount").style.display = "none";
				document.getElementById("splitBtn").style.display = "none";
				// change Box (GM)
				document.getElementById("guardChangeInput").style.display = "none";
				document.getElementById("ownerChange").style.display = "none";
				document.getElementById("armyIdChange").style.display = "none";
				document.getElementById("countChange").style.display = "none"
				document.getElementById("leadersChange").style.display = "none"
				document.getElementById("mountsChange").style.display = "none"
				document.getElementById("lkpChange").style.display = "none"
				document.getElementById("skpChange").style.display = "none"
				document.getElementById("movePointsChange").style.display = "none"
				document.getElementById("heightPointsChange").style.display = "none"
				document.getElementById("changeArmyInfo").style.display = "none";
			};
		}

function activateMountBox(){
	document.getElementById("infoBox").style.display = "none";
	document.getElementById("mountBox").style.display = "";
}

function activateUnMountBox(){
	document.getElementById("infoBox").style.display = "none";
	document.getElementById("unMountBox").style.display = "";
}

function activateSplitbox(){
	if(listOfArmies[selectedArmy].a.armyType() == 1)
	{
		document.getElementById("splitBox").style.display = "";
	} 
	else if(listOfArmies[selectedArmy].a.armyType() == 2)
	{
		document.getElementById("splitMountedBox").style.display = "";
	}
	else if(listOfArmies[selectedArmy].a.armyType() == 3)
	{
		document.getElementById("splitFleetBox").style.display = "";
	}
	document.getElementById("infoBox").style.display = "none";
}

function activateTransmuteBox(){
	var toSplit = 0;
	var leadersToSplit = 0;
	var mountsToSplit = 0;
	var lkpToSplit = 0;
	var skpToSplit = 0;
	// depending on army type different fields are needed
	if(listOfArmies[selectedArmy].a.armyType() == 1)
	{
		toSplit = parseInt(document.getElementById("splitInput").value);
		leadersToSplit = parseInt(document.getElementById("splitLeadersInput").value);
		mountsToSplit = parseInt(document.getElementById("splitMountsInput").value);
		lkpToSplit = parseInt(document.getElementById("splitLkpInput").value);
		skpToSplit = parseInt(document.getElementById("splitSkpInput").value);
		if(toSplit > (listOfArmies[selectedArmy].a.count-100))
		{
			window.alert("Es müssen mindestens 100 Heeresstärke beim Ursprungsheer verbleiben.")
			return false;
		}
		if(mountsToSplit > listOfArmies[selectedArmy].a.mounts)
		{
			window.alert("So viele Reittiere hast du nicht.")
			return false;
		}
		if(lkpToSplit > listOfArmies[selectedArmy].a.lkp)
		{
			window.alert("So viele leichte Katapulte hast du nicht.")
			return false;
		}
		if(skpToSplit > listOfArmies[selectedArmy].a.skp)
		{
			window.alert("So viele schwere Katapulte hast du nicht.")
			return false;
		}
	}
	else if(listOfArmies[selectedArmy].a.armyType() == 2)
	{
		toSplit = parseInt(document.getElementById("splitMountedInput").value);
		leadersToSplit = parseInt(document.getElementById("splitMountedLeadersInput").value);
		if(toSplit > (listOfArmies[selectedArmy].a.count-50))
		{
			window.alert("Es müssen mindestens 100 Heeresstärke beim Ursprungsheer verbleiben.")
			return false;
		}
	}
	else if(listOfArmies[selectedArmy].a.armyType() == 3)
	{
		toSplit = parseInt(document.getElementById("splitFleetInput").value);
		leadersToSplit = parseInt(document.getElementById("splitFleetLeadersInput").value);
		lkpToSplit = parseInt(document.getElementById("splitFleetLkpInput").value);
		skpToSplit = parseInt(document.getElementById("splitFleetSkpInput").value);
		if(toSplit > (listOfArmies[selectedArmy].a.count-1))
		{
			window.alert("Es müssen mindestens 100 Heeresstärke beim Ursprungsheer verbleiben.")
			return false;
		}
		if(toSplit*100 > (listOfArmies[selectedArmy].a.currentCapacity()))
		{
			window.alert("Du kannst keine beladenen Schiffe verschieben.")
			return false;
		}
		if(lkpToSplit > listOfArmies[selectedArmy].a.lkp)
		{
			window.alert("So viele leichte Kriegsschiffe hast du nicht.")
			return false;
		}
		if(skpToSplit > listOfArmies[selectedArmy].a.skp)
		{
			window.alert("So viele schwere Kriegsschiffe hast du nicht.")
			return false;
		}
	}
	if(leadersToSplit > (listOfArmies[selectedArmy].a.leaders-1))
	{
		window.alert("Es muss mindestens 1 Heerführer beim Ursprungsheer verbleiben.")
		return false;
	}
	document.getElementById("transmuteBox").style.display = "";
	var targetType = listOfArmies[selectedArmy].a.armyType();
	if(targetType == 1)
	{
		document.getElementById("splitBox").style.display = "none";
	}
	else if(targetType == 2)
	{
		document.getElementById("splitMountedBox").style.display = "none";
	}
	else if(targetType == 3)
	{
		document.getElementById("splitFleetBox").style.display = "none";
	}
	var onlyLeaders = false;
	if(targetType == 1)
	{
		if(parseInt(document.getElementById("splitInput").value) == 0 &&
		parseInt(document.getElementById("splitLeadersInput").value) > 0 &&
		parseInt(document.getElementById("splitMountsInput").value) == 0 &&
		parseInt(document.getElementById("splitLkpInput").value) == 0 &&
		parseInt(document.getElementById("splitSkpInput").value) == 0)
		{
			onlyLeaders = true;
		}
	}
	else if(targetType == 2)
	{
		if(parseInt(document.getElementById("splitMountedInput").value) == 0 &&
		parseInt(document.getElementById("splitMountedLeadersInput").value) > 0)
		{
			onlyLeaders = true;
		}
	}
	else if(targetType == 3)
	{
		if(parseInt(document.getElementById("splitFleetInput").value) == 0 &&
		parseInt(document.getElementById("splitFleetLeadersInput").value) > 0 &&
		parseInt(document.getElementById("splitFleetLkpInput").value) == 0 &&
		parseInt(document.getElementById("splitFleetSkpInput").value) == 0)
		{
			onlyLeaders = true;
		}
	}
	var selectedX = listOfArmies[selectedArmy].a.x;
	var selectedY = listOfArmies[selectedArmy].a.y;
	var possibleTargets = [];
	var targetOwner = listOfArmies[selectedArmy].a.owner;
	console.log("only Leaders?: " + onlyLeaders);
	for(var i = 0; i < listOfArmies.length; i++)
	{
		if(i != selectedArmy){
			if(onlyLeaders)
			{
				if(listOfArmies[i].a.owner == targetOwner &&
				listOfArmies[i].a.x == selectedX &&
				 listOfArmies[i].a.y == selectedY)
				{
					possibleTargets.push(i);
				}
			}
			else
			{
				if(listOfArmies[i].a.owner == targetOwner &&
				listOfArmies[i].a.x == selectedX &&
				 listOfArmies[i].a.y == selectedY &&
				  listOfArmies[i].a.armyType() == targetType)
				{
					possibleTargets.push(i);
				}
			}
		}
	}
	if(possibleTargets != [])
	{
		if(document.getElementById("transmuteArmyButtonsSection") != null){
			var d = document.getElementById("transmuteArmyButtonsPartition");
			d.removeChild(document.getElementById("transmuteArmyButtonsSection"));
		}
		if(possibleTargets.length != 0){
			var x = document.createElement("SECTION");
			x.setAttribute("id", "transmuteArmyButtonsSection")
			for (var i = 0; i < possibleTargets.length; i++){
				var btn = document.createElement("BUTTON");
				btn.setAttribute("class", "fixedPrettyButton");
				btn.name = "transmuteBtn " + possibleTargets[i];
				var t = document.createTextNode(listOfArmies[possibleTargets[i]].a.armyId);
				btn.appendChild(t);
				btn.addEventListener('click', function(event) 
				{
					var posiInList = this.name.split(" ")[1];
					transferTroopsFromSelectedArmy(posiInList);	
				});
				x.appendChild(btn);
			}
			document.getElementById("transmuteArmyButtonsPartition").appendChild(x);
		}
	} 
	else 
	{
		if(document.getElementById("transmuteArmyButtonsSection") != null){
			var d = document.getElementById("transmuteArmyButtonsPartition");
			d.removeChild(document.getElementById("transmuteArmyButtonsSection"));
		}
	}
}

function activateMergeBox(){
	document.getElementById("mergeBox").style.display = "";
	var targetType = listOfArmies[selectedArmy].a.armyType();
	if(targetType == 1)
	{
		document.getElementById("splitBox").style.display = "none";
	}
	else if(targetType == 2)
	{
		document.getElementById("splitMountedBox").style.display = "none";
	}
	else if(targetType == 3)
	{
		document.getElementById("splitFleetBox").style.display = "none";
	}
	var selectedX = listOfArmies[selectedArmy].a.x;
	var selectedY = listOfArmies[selectedArmy].a.y;
	var possibleTargets = [];
	var targetOwner = listOfArmies[selectedArmy].a.owner;
	for(var i = 0; i < listOfArmies.length; i++)
	{
		if(i != selectedArmy){
			if(listOfArmies[i].a.owner == targetOwner &&
			listOfArmies[i].a.x == selectedX &&
			 listOfArmies[i].a.y == selectedY &&
			  listOfArmies[i].a.armyType() == targetType)
			{
				possibleTargets.push(i);
			}
		}
	}
	if(possibleTargets != [])
	{
		if(document.getElementById("mergeArmyButtonsSection") != null){
			var d = document.getElementById("mergeArmyButtonsPartition");
			d.removeChild(document.getElementById("mergeArmyButtonsSection"));
		}
		if(possibleTargets.length != 0){
			var x = document.createElement("SECTION");
			x.setAttribute("id", "mergeArmyButtonsSection")
			for (var i = 0; i < possibleTargets.length; i++){
				var btn = document.createElement("BUTTON");
				btn.setAttribute("class", "fixedPrettyButton");
				btn.name = "mergeBtn " + possibleTargets[i];
				var t = document.createTextNode(listOfArmies[possibleTargets[i]].a.armyId);
				btn.appendChild(t);
				btn.addEventListener('click', function(event) 
				{
					var posiInList = this.name.split(" ")[1];
					mergeSelectedArmy(posiInList);	
				});
				x.appendChild(btn);
			}
			document.getElementById("mergeArmyButtonsPartition").appendChild(x);
		}
	} 
	else 
	{
		if(document.getElementById("mergeArmyButtonsSection") != null){
			var d = document.getElementById("mergeArmyButtonsPartition");
			d.removeChild(document.getElementById("mergeArmyButtonsSection"));
		}
	}
}

function backToSplitBox(){
	document.getElementById("mergeBox").style.display = "none";
	document.getElementById("transmuteBox").style.display = "none";
	if(listOfArmies[selectedArmy].a.armyType() == 1)
	{
		document.getElementById("splitBox").style.display = "";
	}
	else if(listOfArmies[selectedArmy].a.armyType() == 2)
	{
		document.getElementById("splitMountedBox").style.display = "";
	}
	else if(listOfArmies[selectedArmy].a.armyType() == 3)
	{
		document.getElementById("splitFleetBox").style.display = "";
	}
}

// this is the cancel function for the mount/unmount and split boxes
function restoreInfoBox(){
	document.getElementById("mountBox").style.display = "none";
	document.getElementById("unMountBox").style.display = "none";
	document.getElementById("splitBox").style.display = "none";
	document.getElementById("splitMountedBox").style.display = "none";
	document.getElementById("splitFleetBox").style.display = "none";
	document.getElementById("transmuteBox").style.display = "none";
	document.getElementById("mergeBox").style.display = "none";
	if(document.getElementById("godmodeBox").style.visibility != "visible")
	{
		document.getElementById("infoBox").style.display = "";
	}
}