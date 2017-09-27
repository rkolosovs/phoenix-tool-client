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
				console.log(listOfArmyCoordinates[selectedArmy].a.armyId);
				console.log("This a guard army: " + listOfArmyCoordinates[selectedArmy].a.isGuard);
				if(listOfArmyCoordinates[selectedArmy].a.isGuard){
					document.getElementById("guard").innerHTML = "Garde";
				} else {
					document.getElementById("guard").innerHTML = null;
				}
				if(listOfArmyCoordinates[selectedArmy].a.armyType() == 1 || listOfArmyCoordinates[selectedArmy].a.armyType() == 2)
				{
					document.getElementById("armyId").innerHTML = "Heer " + listOfArmyCoordinates[selectedArmy].a.armyId;
				}
				else if(listOfArmyCoordinates[selectedArmy].a.armyType() == 3)
				{
					document.getElementById("armyId").innerHTML = "Flotte " + listOfArmyCoordinates[selectedArmy].a.armyId;
				}
				document.getElementById("count").innerHTML = "Truppen: " + listOfArmyCoordinates[selectedArmy].a.count;
				document.getElementById("leaders").innerHTML = "Heerführer: " + listOfArmyCoordinates[selectedArmy].a.leaders;
				document.getElementById("mounts").innerHTML = "mitgeführte Reittiere: " + listOfArmyCoordinates[selectedArmy].a.mounts;
				document.getElementById("lkp").innerHTML = "leichte Katapulte: " + listOfArmyCoordinates[selectedArmy].a.lkp;
				document.getElementById("skp").innerHTML = "schwere Katapulte: " + listOfArmyCoordinates[selectedArmy].a.skp;
				document.getElementById("movePoints").innerHTML = "Bewegungspunkte: " + listOfArmyCoordinates[selectedArmy].remainingMovePoints;
				document.getElementById("heightPoints").innerHTML = "Höhenstufen: " + listOfArmyCoordinates[selectedArmy].remainingHeightPoints;
				document.getElementById("splitBtn").style.display = "";
				if(Math.floor(listOfArmyCoordinates[selectedArmy].a.armyId/100) == 1){
					document.getElementById("mount").style.display = "";
					document.getElementById("unMount").style.display = "none";
				} else if(Math.floor(listOfArmyCoordinates[selectedArmy].a.armyId/100) == 2){
					document.getElementById("unMount").style.display = "";
					document.getElementById("mount").style.display = "none";
				} else {
					document.getElementById("mount").style.display = "none";
					document.getElementById("unMount").style.display = "none";
				}
				//show shoot button
				if(listOfArmyCoordinates[selectedArmy].a.lkp>0 | listOfArmyCoordinates[selectedArmy].a.skp > 0){
					document.getElementById("shoot").style.display = "";
				}
				else{
					document.getElementById("shoot").style.display = "none";
				}
				// change Box (GodMode)
				if(listOfArmyCoordinates[selectedArmy].a.isGuard){
					document.getElementById("guardChangeInput").checked = true;
				} else {
					document.getElementById("guardChangeInput").checked = false;
				}
				document.getElementById("ownerChangeInput").value = listOfArmyCoordinates[selectedArmy].owner;
				document.getElementById("ownerChange").style.display = "";
				document.getElementById("armyIdChangeInput").value = listOfArmyCoordinates[selectedArmy].a.armyId;
				document.getElementById("armyIdChange").style.display = "";
				document.getElementById("countChangeInput").value = listOfArmyCoordinates[selectedArmy].a.count;
				document.getElementById("countChange").style.display = "";
				document.getElementById("leadersChangeInput").value = listOfArmyCoordinates[selectedArmy].a.leaders;
				document.getElementById("leadersChange").style.display = "";
				document.getElementById("mountsChangeInput").value = listOfArmyCoordinates[selectedArmy].a.mounts;
				document.getElementById("mountsChange").style.display = "";
				document.getElementById("lkpChangeInput").value = listOfArmyCoordinates[selectedArmy].a.lkp;
				document.getElementById("lkpChange").style.display = "";
				document.getElementById("skpChangeInput").value = listOfArmyCoordinates[selectedArmy].a.skp;
				document.getElementById("skpChange").style.display = "";
				document.getElementById("movePointsChangeInput").value = listOfArmyCoordinates[selectedArmy].remainingMovePoints;
				document.getElementById("movePointsChange").style.display = "";
				document.getElementById("heightPointsChangeInput").value = listOfArmyCoordinates[selectedArmy].remainingHeightPoints;
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

		function activateShootBox(){
			document.getElementById("shootBox").style.display = "";
		}

		function activateSplitbox(){
			if(listOfArmyCoordinates[selectedArmy].a.armyType() == 1)
			{
				document.getElementById("splitBox").style.display = "";
			} 
			else if(listOfArmyCoordinates[selectedArmy].a.armyType() == 2)
			{
				document.getElementById("splitMountedBox").style.display = "";
			}
			else if(listOfArmyCoordinates[selectedArmy].a.armyType() == 3)
			{
				document.getElementById("splitFleetBox").style.display = "";
			}
			document.getElementById("infoBox").style.display = "none";
		}

		// this is the cancel function for the mount/unmount and split boxes
		function restoreInfoBox(){
			document.getElementById("mountBox").style.display = "none";
			document.getElementById("unMountBox").style.display = "none";
			document.getElementById("splitBox").style.display = "none";
			document.getElementById("splitMountedBox").style.display = "none";
			document.getElementById("splitFleetBox").style.display = "none";
			document.getElementById("shootBox").style.display = "none";
			if(document.getElementById("godmodeBox").style.visibility != "visible")
			{
				document.getElementById("infoBox").style.display = "";
			}
		}