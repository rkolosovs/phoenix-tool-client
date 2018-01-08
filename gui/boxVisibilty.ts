'use strict';

let worldCreationModeOn = false;
let worldCreationModeOnClick = false;
let riverCreationModeOn = false;
let buildingCreationModeOn = false;
let streetBuildingModeOn = false;
let harborBuildingModeOn = false;
let bridgeBuildingModeOn = false;
let wallBuildingModeOn = false;
let shootingModeOn = false;
let changeFieldToType = -1;
let armyCreationModeOn = false;
let armyWithNextClick = false;
let ownerBuffer: string = "";
let armyIdBuffer = 0;
let countBuffer = 0;
let leaderBuffer = 0;
let mountsBuffer = 0;
let lkpBuffer = 0;
let skpBuffer = 0;
let guardBuffer = false;

//TODO: Unify the handling of showing/hiding UI elements.
function toggleVisibility(element: HTMLElement): void{
	let classes = element.classList;
	if(classes.contains("invisible")){
		classes.remove("invisible");
	} else {
		classes.add("invisible");
	}
}

function show(element: HTMLElement): void{
    let classes = element.classList;
	if(classes.contains("invisible")){
		classes.remove("invisible");
	}
}

function hide(element: HTMLElement): void{
    let classes = element.classList;
	if(!classes.contains("invisible")){
		classes.add("invisible");
	}
}

// switches bunttonBoxContent.style.visibility to "" and all others to "none"
function switchBtnBoxTo(buttonBoxContent: HTMLElement): void{
    hide(GUI.getWorldBenderBox());
    hide(GUI.getRiverBenderBox());
    hide(GUI.getWorldBenderBox().getCreationWarning());
    hide(GUI.getBuildingCreationBox());
    hide(GUI.getStreetCreationBox());
    hide(GUI.getHarborCreationBox());
    hide(GUI.getBridgeCreationBox());
    hide(GUI.getWallCreationBox());
    hide(GUI.getButtonsBox());
    hide(GUI.getArmyGeneratorBox());
	show(buttonBoxContent);
}

// switches activeMode to True and all others to false
function switchModeTo(activeMode): void{
	worldCreationModeOn = false;
	worldCreationModeOnClick = false;
	riverCreationModeOn = false;
	buildingCreationModeOn = false;
	streetBuildingModeOn = false;
	harborBuildingModeOn = false;
	bridgeBuildingModeOn = false;
	wallBuildingModeOn = false;
	shootingModeOn = false;
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
		case "shootingModeOn": shootingModeOn = true; break;
		case "none": break;
	}
}

function toggleArmyCreationMode(): void{
	if(armyCreationModeOn){
		switchModeTo("none");
		switchBtnBoxTo(GUI.getButtonsBox());
	} else if (!armyCreationModeOn){
		switchModeTo("armyCreationModeOn");
		switchBtnBoxTo(GUI.getArmyGeneratorBox().getSelf());
	}
}

function toggleWorldCreationMode(): void{
	if(worldCreationModeOn){
		switchModeTo("none");
		switchBtnBoxTo(GUI.getButtonsBox());
	} else if (!worldCreationModeOn){
		switchModeTo("worldCreationModeOn");
		switchBtnBoxTo(GUI.getWorldBenderBox().getSelf());
	}
}

function toggleRiverCreationMode(): void{
	if(riverCreationModeOn){
	    switchModeTo("none");
		switchBtnBoxTo(GUI.getButtonsBox());
	} else if (!riverCreationModeOn){
		switchModeTo("riverCreationModeOn");
		switchBtnBoxTo(GUI.getRiverBenderBox().getSelf());
	}
}

function toggleBuildingCreationMode(): void{
	if(buildingCreationModeOn){
		switchModeTo("none");
		switchBtnBoxTo(GUI.getButtonsBox());
	} else if (!buildingCreationModeOn){
		switchBtnBoxTo(GUI.getBuildingCreationBox().getSelf());
		switchModeTo("buildingCreationModeOn");
	}
}
		
function toggleStreetBuildingMode(): void{
	if(streetBuildingModeOn){
		switchModeTo("none");
		switchBtnBoxTo(GUI.getButtonsBox());
	} else if (!streetBuildingModeOn){
		switchModeTo("streetBuildingModeOn");
		switchBtnBoxTo(GUI.getStreetCreationBox().getSelf());
	}
}

function toggleHarborBuildingMode(): void{
	if(harborBuildingModeOn){
		switchModeTo("none");
		switchBtnBoxTo(GUI.getButtonsBox());
	} else if (!harborBuildingModeOn){
		switchModeTo("harborBuildingModeOn");
		switchBtnBoxTo(GUI.getHarborCreationBox().getSelf());
	}
}

function toggleBridgeBuildingMode(): void{
	if(bridgeBuildingModeOn){
		switchModeTo("none");
		switchBtnBoxTo(GUI.getButtonsBox());
	} else if (!bridgeBuildingModeOn){
		switchModeTo("bridgeBuildingModeOn");
		switchBtnBoxTo(GUI.getBridgeCreationBox().getSelf());
	}
}

function toggleWallBuildingMode(): void{
	if(wallBuildingModeOn){
		switchModeTo("none");
		switchBtnBoxTo(GUI.getButtonsBox());
	} else if (!wallBuildingModeOn){
		switchModeTo("wallBuildingModeOn");
		switchBtnBoxTo(GUI.getWallCreationBox().getSelf());
	}
}

function toggleShootingMode(): void{
	if(shootingModeOn){
		closeShootBox();
	} else if (!shootingModeOn){
		switchModeTo("shootingModeOn");
		activateShootBox();
	}
}

function toggleGodModeBar(): void{
    if(GUI.getGodModeBox().getSelf().classList.contains("invisible")){
        restoreInfoBox();
        show(GUI.getGodModeBox().getSelf());
        show(GUI.getInfoChangeBox().getSelf());
        hide(GUI.getInfoBox().getSelf());
    } else {
        hide(GUI.getGodModeBox().getSelf());
        hide(GUI.getInfoChangeBox().getSelf());
        show(GUI.getInfoBox().getSelf());
        updateInfoBox();
    }
}

// this is used to update the infoBox and the infoChangeBox with the currently selected Army
function updateInfoBox(): void{
    let infoBox: InfoBox = GUI.getInfoBox();
    let changeBox: InfoChangeBox = GUI.getInfoChangeBox();
	if(selectedArmyIndex != undefined){
		// info Box
		let infoArmy = listOfArmies[selectedArmyIndex];
		if(infoArmy.isGuard){
            infoBox.getGuardText().innerHTML = "Garde";
		} else {
            infoBox.getGuardText().innerHTML = null;
		}
		if(infoArmy.armyType() === 1 || infoArmy.armyType() === 2){
		    infoBox.getArmyIdText().innerHTML = "Heer " + infoArmy.armyId;
		}
		else if(infoArmy.armyType() === 3){
            infoBox.getArmyIdText().innerHTML = "Flotte " + infoArmy.armyId;
		}
		infoBox.getCountText().innerHTML = "Truppen: " + infoArmy.count;
		infoBox.getLeadersText().innerHTML = "Heerführer: " + infoArmy.leaders;
		infoBox.getMountsText().innerHTML = "mitgeführte Reittiere: " + infoArmy.mounts;
		if(infoArmy.armyType() === 2){
			hide(infoBox.getLKPText());
			hide(infoBox.getSKPText());
		}else{
            show(infoBox.getLKPText());
            show(infoBox.getSKPText());
		}
        infoBox.getLKPText().innerHTML = "leichte Katapulte: " + infoArmy.lkp + " (" + (infoArmy.lkp - infoArmy.LKPShotThisTurn) + ")";
        infoBox.getSKPText().innerHTML = "schwere Katapulte: " + infoArmy.skp + " (" + (infoArmy.skp - infoArmy.SKPShotThisTurn) + ")";
		infoBox.getMovePointsText().innerHTML = "Bewegungspunkte: " + infoArmy.remainingMovePoints;
		infoBox.getHeightPointsText().innerHTML = "Höhenstufen: " + infoArmy.remainingHeightPoints;
		show(infoBox.getSplitButton());
		if(Math.floor(infoArmy.armyId/100) == 1){
		    show(infoBox.getMountButton());
		    hide(infoBox.getUnMountButton());
		} else if(Math.floor(infoArmy.armyId/100) == 2){
            hide(infoBox.getMountButton());
            show(infoBox.getUnMountButton());
		} else {
            hide(infoBox.getMountButton());
            hide(infoBox.getUnMountButton());
		}
		//show shoot button
		if(infoArmy.lkp > 0 || infoArmy.skp > 0 || !infoArmy.isLoadedIn){
		    show(infoBox.getShootButton());
		}
		else{
            hide(infoBox.getShootButton());
		}
		// change Box (GodMode)
		changeBox.getGuardChangeInput().checked = infoArmy.isGuard;
		show(changeBox.getGuardChangeInput());
		show(changeBox.getOwnerChange());
		changeBox.getOwnerChangeInput().value = infoArmy.owner;
        show(changeBox.getArmyIdChange());
        changeBox.getArmyIdChangeInput().value = infoArmy.armyId;
        show(changeBox.getCountChange());
        changeBox.getCountChangeInput().value = infoArmy.count;
        show(changeBox.getLeadersChange());
        changeBox.getLeadersChangeInput().value = infoArmy.leaders;
        show(changeBox.getMountsChange());
        changeBox.getMountsChangeInput().value = infoArmy.mounts;
        show(changeBox.getLKPChange());
        changeBox.getLKPChangeInput().value = infoArmy.lkp;
        show(changeBox.getSKPChange());
        changeBox.getSKPChangeInput().value = infoArmy.skp;
        show(changeBox.getMovePointsChange());
        changeBox.getMovePointsChangeInput().value = infoArmy.remainingMovePoints;
        show(changeBox.getHeightPointsChange());
        changeBox.getHeightPointsChangeInput().value = infoArmy.remainingHeightPoints;
        show(changeBox.getChangeArmyInfoButton());
	} else {
		// info Box
		infoBox.getGuardText().innerHTML = null;
        infoBox.getArmyIdText().innerHTML = null;
        infoBox.getCountText().innerHTML = null;
        infoBox.getLeadersText().innerHTML = null;
        infoBox.getMountsText().innerHTML = null;
        infoBox.getLKPText().innerHTML = null;
        infoBox.getSKPText().innerHTML = null;
        infoBox.getMovePointsText().innerHTML = null;
        infoBox.getHeightPointsText().innerHTML = null;
		hide(infoBox.getMountButton());
        hide(infoBox.getUnMountButton());
        hide(infoBox.getShootButton());
        hide(infoBox.getSplitButton());
		// change Box (GM)
        hide(changeBox.getGuardChangeInput());
        hide(changeBox.getGuardChangeInput());
        hide(changeBox.getGuardChangeInput());
        hide(changeBox.getGuardChangeInput());
        hide(changeBox.getGuardChangeInput());
        hide(changeBox.getGuardChangeInput());
        hide(changeBox.getGuardChangeInput());
        hide(changeBox.getGuardChangeInput());
        hide(changeBox.getGuardChangeInput());
        hide(changeBox.getGuardChangeInput());
        hide(changeBox.getGuardChangeInput());
	}
}

function activateMountBox(): void{
	hide(GUI.getInfoBox().getSelf());
	show(GUI.getMountBox());
}

function activateUnMountBox(): void{
    hide(GUI.getInfoBox().getSelf());
    show(GUI.getUnMountBox());
}


function activateShootBox(): void{
    show(GUI.getShootBox());
	findPossibleTargetFields();
	drawStuff();
}

function closeShootBox(): void{
    hide(GUI.getShootBox());
	switchModeTo("none");
	if(selectedFields[1] !== undefined)
		selectedFields.pop();
	drawStuff();
}

function activateSplitbox(): void{
	if(listOfArmies[selectedArmyIndex].armyType() == 1){
	    show(GUI.getSplitBox());
	} 
	else if(listOfArmies[selectedArmyIndex].armyType() == 2){
        show(GUI.getSplitMountedBox());
	}
	else if(listOfArmies[selectedArmyIndex].armyType() == 3){
        show(GUI.getSplitFleetBox());
	}
	hide(GUI.getInfoBox().getSelf());
}

function activateTransmuteBox(): boolean{
	let toSplit = 0;
	let leadersToSplit = 0;
	let mountsToSplit = 0;
	let lkpToSplit = 0;
	let skpToSplit = 0;
	// depending on army type different fields are needed
	if(listOfArmies[selectedArmyIndex].armyType() === 1)
	{
		toSplit = parseInt(GUI.getSplitInput().value);
		leadersToSplit = parseInt(GUI.getSplitLeadersInput().value);
		mountsToSplit = parseInt(GUI.getSplitMountsInput().value);
		lkpToSplit = parseInt(GUI.getSplitLkpInput().value);
		skpToSplit = parseInt(GUI.getSplitSkpInput().value);
		if(toSplit > (listOfArmies[selectedArmyIndex].count-100))
		{
			window.alert("Es müssen mindestens 100 Heeresstärke beim Ursprungsheer verbleiben.")
			return false;
		}
		if(mountsToSplit > listOfArmies[selectedArmyIndex].mounts)
		{
			window.alert("So viele Reittiere hast du nicht.")
			return false;
		}
		if(lkpToSplit > listOfArmies[selectedArmyIndex].lkp)
		{
			window.alert("So viele leichte Katapulte hast du nicht.")
			return false;
		}
		if(skpToSplit > listOfArmies[selectedArmyIndex].skp)
		{
			window.alert("So viele schwere Katapulte hast du nicht.")
			return false;
		}
	}
	else if(listOfArmies[selectedArmyIndex].armyType() == 2)
	{
		toSplit = parseInt(GUI.getSplitMountedInput().value);
		leadersToSplit = parseInt(GUI.getSplitMountedLeadersInput().value);
		if(toSplit > (listOfArmies[selectedArmyIndex].count-50))
		{
			window.alert("Es müssen mindestens 100 Heeresstärke beim Ursprungsheer verbleiben.")
			return false;
		}
	}
	else if(listOfArmies[selectedArmyIndex].armyType() == 3)
	{
		toSplit = parseInt(GUI.getSplitFleetInput().value);
		leadersToSplit = parseInt(GUI.getSplitFleetLeadersInput().value);
		lkpToSplit = parseInt(GUI.getSplitFleetLkpInput().value);
		skpToSplit = parseInt(GUI.getSplitFleetSkpInput().value);
		if(toSplit > (listOfArmies[selectedArmyIndex].count-1))
		{
			window.alert("Es müssen mindestens 100 Heeresstärke beim Ursprungsheer verbleiben.")
			return false;
		}
		if(toSplit*100 > (listOfArmies[selectedArmyIndex].currentCapacity()))
		{
			window.alert("Du kannst keine beladenen Schiffe verschieben.")
			return false;
		}
		if(lkpToSplit > listOfArmies[selectedArmyIndex].lkp)
		{
			window.alert("So viele leichte Kriegsschiffe hast du nicht.")
			return false;
		}
		if(skpToSplit > listOfArmies[selectedArmyIndex].skp)
		{
			window.alert("So viele schwere Kriegsschiffe hast du nicht.")
			return false;
		}
	}
	if(leadersToSplit > (listOfArmies[selectedArmyIndex].leaders-1))
	{
		window.alert("Es muss mindestens 1 Heerführer beim Ursprungsheer verbleiben.")
		return false;
	}
	document.getElementById("transmuteBox").style.display = "";
	let targetType = listOfArmies[selectedArmyIndex].armyType();
	if(targetType == 1){
        hide(GUI.getSplitBox());
	}
	else if(targetType == 2){
        hide(GUI.getSplitMountedBox());
	}
	else if(targetType == 3){
        hide(GUI.getSplitFleetBox());
	}
	let onlyLeaders = false;
	if(targetType === 1){
		if(parseInt(GUI.getSplitInput().value) === 0 &&
		parseInt(GUI.getSplitLeadersInput().value) > 0 &&
		parseInt(GUI.getSplitMountsInput().value) === 0 &&
		parseInt(GUI.getSplitLkpInput().value) === 0 &&
		parseInt(GUI.getSplitSkpInput().value) === 0){
			onlyLeaders = true;
		}
	}
	else if(targetType === 2){
		if(parseInt(GUI.getSplitMountedInput().value) === 0 &&
		parseInt(GUI.getSplitMountedLeadersInput().value) > 0){
			onlyLeaders = true;
		}
	}
	else if(targetType === 3){
		if(parseInt(GUI.getSplitFleetInput().value) === 0 &&
		parseInt(GUI.getSplitFleetLeadersInput().value) > 0 &&
		parseInt(GUI.getSplitFleetLkpInput().value) === 0 &&
		parseInt(GUI.getSplitFleetSkpInput().value) === 0){
			onlyLeaders = true;
		}
	}
	let selectedX = listOfArmies[selectedArmyIndex].x;
	let selectedY = listOfArmies[selectedArmyIndex].y;
	let possibleTargets = [];
	let targetOwner = listOfArmies[selectedArmyIndex].owner;
	for(let i = 0; i < listOfArmies.length; i++){
		if(i != selectedArmyIndex){
			if(onlyLeaders){
				if(listOfArmies[i].owner == targetOwner &&
                    listOfArmies[i].x == selectedX &&
                    listOfArmies[i].y == selectedY){
					possibleTargets.push(i);
				}
			} else{
			    if(listOfArmies[i].owner == targetOwner &&
                    listOfArmies[i].x == selectedX &&
                    listOfArmies[i].y == selectedY &&
                    listOfArmies[i].armyType() == targetType){
					possibleTargets.push(i);
				}
			}
		}
	}
	if(possibleTargets != []){
		if(document.getElementById("transmuteArmyButtonsSection") != undefined){
			let d = GUI.getTransmuteArmyButtonsPartition();
			d.removeChild(document.getElementById("transmuteArmyButtonsSection"));
		}
		if(possibleTargets.length !== 0){
			let x = document.createElement("SECTION");
			x.setAttribute("id", "transmuteArmyButtonsSection")
			for (let i = 0; i < possibleTargets.length; i++){
				let btn = document.createElement("BUTTON") as HTMLButtonElement;
				btn.setAttribute("class", "fixedPrettyButton");
				btn.name = "transmuteBtn " + possibleTargets[i];
				let t = document.createTextNode(listOfArmies[possibleTargets[i]].armyId);
				btn.appendChild(t);
				btn.addEventListener('click', function(event) 
				{
					let posiInList = this.name.split(" ")[1];
					transferTroopsFromSelectedArmy(posiInList);
				});
				x.appendChild(btn);
			}
            GUI.getTransmuteArmyButtonsPartition().appendChild(x);
		}
	} 
	else {
		if(document.getElementById("transmuteArmyButtonsSection") != undefined){
			let d = GUI.getTransmuteArmyButtonsPartition();
			d.removeChild(document.getElementById("transmuteArmyButtonsSection"));
		}
	}
}

function activateMergeBox(): void{
    show(GUI.getMergeBox());
	let targetType = listOfArmies[selectedArmyIndex].armyType();
	if(targetType === 1){
	    hide(GUI.getSplitBox());
	}
	else if(targetType === 2){
        hide(GUI.getSplitMountedBox());
	}
	else if(targetType === 3){
        hide(GUI.getSplitFleetBox());
	}
	let selectedX = listOfArmies[selectedArmyIndex].x;
	let selectedY = listOfArmies[selectedArmyIndex].y;
	let possibleTargets = [];
	let targetOwner = listOfArmies[selectedArmyIndex].owner;
	for(let i = 0; i < listOfArmies.length; i++) {
		if(i != selectedArmyIndex){
			if(listOfArmies[i].owner == targetOwner && listOfArmies[i].x == selectedX &&
                listOfArmies[i].y == selectedY && listOfArmies[i].armyType() == targetType) {
				possibleTargets.push(i);
			}
		}
	}
	if(possibleTargets != [])
	{
		if(document.getElementById("mergeArmyButtonsSection") != undefined){
			let d = GUI.getTransmuteArmyButtonsPartition();
			d.removeChild(document.getElementById("mergeArmyButtonsSection"));
		}
		if(possibleTargets.length !== 0){
			let x = document.createElement("SECTION");
			x.setAttribute("id", "mergeArmyButtonsSection")
			for (let i = 0; i < possibleTargets.length; i++){
				let btn = document.createElement("BUTTON") as HTMLButtonElement;
				btn.setAttribute("class", "fixedPrettyButton");
				btn.name = "mergeBtn " + possibleTargets[i];
				let t = document.createTextNode(listOfArmies[possibleTargets[i]].armyId);
				btn.appendChild(t);
				btn.addEventListener('click', function(event) {
					let posiInList = this.name.split(" ")[1];
					mergeSelectedArmy(posiInList);
				});
				x.appendChild(btn);
			}
            GUI.getTransmuteArmyButtonsPartition().appendChild(x);
		}
	} 
	else {
		if(document.getElementById("mergeArmyButtonsSection") != undefined){
			let d = GUI.getTransmuteArmyButtonsPartition();
			d.removeChild(document.getElementById("mergeArmyButtonsSection"));
		}
	}
}

function backToSplitBox(): void{
    hide(GUI.getMergeBox());
    hide(GUI.getTransmuteBox());
	if(listOfArmies[selectedArmyIndex].armyType() === 1){
	    show(GUI.getSplitBox());
		document.getElementById("splitBox").style.display = "";
	}
	else if(listOfArmies[selectedArmyIndex].armyType() === 2){
        show(GUI.getSplitMountedBox());
	}
	else if(listOfArmies[selectedArmyIndex].armyType() === 3){
        show(GUI.getSplitFleetBox());
	}
}

// this is the cancel function for the mount/unmount and split boxes
function restoreInfoBox(): void{
    hide(GUI.getMountBox());
    hide(GUI.getUnMountBox());
    hide(GUI.getSplitBox());
    hide(GUI.getSplitMountedBox());
    hide(GUI.getSplitFleetBox());
    hide(GUI.getTransmuteBox());
    hide(GUI.getMergeBox());
	closeShootBox();
	if(GUI.getGodModeBox().getSelf().classList.contains("invisible")){
		show(GUI.getInfoBox());
	}
}