'use strict';
var worldCreationModeOn = false;
var worldCreationModeOnClick = false;
var riverCreationModeOn = false;
var buildingCreationModeOn = false;
var streetBuildingModeOn = false;
var harborBuildingModeOn = false;
var bridgeBuildingModeOn = false;
var wallBuildingModeOn = false;
var shootingModeOn = false;
var changeFieldToType = -1;
var armyCreationModeOn = false;
var armyWithNextClick = false;
var ownerBuffer = "";
var armyIdBuffer = 0;
var countBuffer = 0;
var leaderBuffer = 0;
var mountsBuffer = 0;
var lkpBuffer = 0;
var skpBuffer = 0;
var guardBuffer = false;
//TODO: Unify the handling of showing/hiding UI elements.
function toggleVisibility(element) {
    var classes = element.classList;
    if (classes.contains("invisible")) {
        classes.remove("invisible");
    }
    else {
        classes.add("invisible");
    }
}
function show(element) {
    var classes = element.classList;
    if (classes.contains("invisible")) {
        classes.remove("invisible");
    }
}
function hide(element) {
    var classes = element.classList;
    if (!classes.contains("invisible")) {
        classes.add("invisible");
    }
}
// switches bunttonBoxContent.style.visibility to "" and all others to "none"
function switchBtnBoxTo(buttonBoxContent) {
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
function switchModeTo(activeMode) {
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
    switch (activeMode) {
        //worldCreationModeOnClick also has worldCreationModeOn enabled
        case "worldCreationModeOnClick": worldCreationModeOnClick = true;
        case "worldCreationModeOn":
            worldCreationModeOn = true;
            break;
        case "riverCreationModeOn":
            riverCreationModeOn = true;
            break;
        case "buildingCreationModeOn":
            buildingCreationModeOn = true;
            break;
        case "streetBuildingModeOn":
            streetBuildingModeOn = true;
            break;
        case "harborBuildingModeOn":
            harborBuildingModeOn = true;
            break;
        case "bridgeBuildingModeOn":
            bridgeBuildingModeOn = true;
            break;
        case "wallBuildingModeOn":
            wallBuildingModeOn = true;
            break;
        case "armyWithNextClick":
            armyWithNextClick = true;
            break;
        case "armyCreationModeOn":
            armyCreationModeOn = true;
            break;
        case "shootingModeOn":
            shootingModeOn = true;
            break;
        case "none": break;
    }
}
function toggleArmyCreationMode() {
    if (armyCreationModeOn) {
        switchModeTo("none");
        switchBtnBoxTo("buttonsBox");
    }
    else if (!armyCreationModeOn) {
        switchModeTo("armyCreationModeOn");
        switchBtnBoxTo("armyGeneratorBox");
    }
}
function toggleWorldCreationMode() {
    if (worldCreationModeOn) {
        switchModeTo("none");
        switchBtnBoxTo("buttonsBox");
    }
    else if (!worldCreationModeOn) {
        switchModeTo("worldCreationModeOn");
        switchBtnBoxTo("worldBenderBox");
    }
}
function toggleRiverCreationMode() {
    if (riverCreationModeOn) {
        switchModeTo("none");
        switchBtnBoxTo("buttonsBox");
    }
    else if (!riverCreationModeOn) {
        switchModeTo("riverCreationModeOn");
        switchBtnBoxTo("riverBenderBox");
    }
}
function toggleBuildingCreationMode() {
    if (buildingCreationModeOn) {
        switchModeTo("none");
        switchBtnBoxTo("buttonsBox");
    }
    else if (!buildingCreationModeOn) {
        switchBtnBoxTo("buildingCreationBox");
        switchModeTo("buildingCreationModeOn");
    }
}
function toggleStreetBuildingMode() {
    if (streetBuildingModeOn) {
        switchModeTo("none");
        switchBtnBoxTo("buttonsBox");
    }
    else if (!streetBuildingModeOn) {
        switchModeTo("streetBuildingModeOn");
        switchBtnBoxTo("streetCreationBox");
    }
}
function toggleHarborBuildingMode() {
    if (harborBuildingModeOn) {
        switchModeTo("none");
        switchBtnBoxTo("buttonsBox");
    }
    else if (!harborBuildingModeOn) {
        switchModeTo("harborBuildingModeOn");
        switchBtnBoxTo("harborCreationBox");
    }
}
function toggleBridgeBuildingMode() {
    if (bridgeBuildingModeOn) {
        switchModeTo("none");
        switchBtnBoxTo("buttonsBox");
    }
    else if (!bridgeBuildingModeOn) {
        switchModeTo("bridgeBuildingModeOn");
        switchBtnBoxTo("bridgeCreationBox");
    }
}
function toggleWallBuildingMode() {
    if (wallBuildingModeOn) {
        switchModeTo("none");
        switchBtnBoxTo("buttonsBox");
    }
    else if (!wallBuildingModeOn) {
        switchModeTo("wallBuildingModeOn");
        switchBtnBoxTo("wallCreationBox");
    }
}
function toggleShootingMode() {
    if (shootingModeOn) {
        closeShootBox();
    }
    else if (!shootingModeOn) {
        switchModeTo("shootingModeOn");
        activateShootBox();
    }
}
function toggleGodModeBar() {
    if (document.getElementById("godmodeBox").style.visibility == "hidden") {
        restoreInfoBox();
        document.getElementById("godmodeBox").style.visibility = "visible";
        document.getElementById("infoChangeBox").style.display = "";
        document.getElementById("infoBox").style.display = "none";
    }
    else if (document.getElementById("godmodeBox").style.visibility == "visible") {
        document.getElementById("godmodeBox").style.visibility = "hidden";
        document.getElementById("infoChangeBox").style.display = "none";
        document.getElementById("infoBox").style.display = "";
        updateInfoBox();
    }
}
// this is used to update the infoBox and the infoChangeBox with the currently selected Army
function updateInfoBox() {
    if (selectedArmyIndex !== undefined) {
        // info Box
        let infoArmy = listOfArmies[selectedArmyIndex];
        console.log(infoArmy.armyId + " selected.");
        console.log("This a guard army: " + infoArmy.isGuard);
        if (infoArmy.isGuard) {
            document.getElementById("guard").innerHTML = "Garde";
        }
        else {
            document.getElementById("guard").innerHTML = null;
        }
        if (infoArmy.armyType() === 1 || infoArmy.armyType() === 2) {
            document.getElementById("armyId").innerHTML = "Heer " + infoArmy.armyId;
        }
        else if (infoArmy.armyType() === 3) {
            document.getElementById("armyId").innerHTML = "Flotte " + infoArmy.armyId;
        }
        document.getElementById("count").innerHTML = "Truppen: " + infoArmy.count;
        document.getElementById("leaders").innerHTML = "Heerführer: " + infoArmy.leaders;
        document.getElementById("mounts").innerHTML = "mitgeführte Reittiere: " + infoArmy.mounts;
        if (infoArmy.armyType() === 2) {
            document.getElementById("lkp").style.display = "none";
            document.getElementById("skp").style.display = "none";
        }
        else {
            document.getElementById("lkp").style.display = "";
            document.getElementById("skp").style.display = "";
        }
        document.getElementById("lkp").innerHTML = "leichte Katapulte: " + infoArmy.lkp + " (" + (infoArmy.lkp - infoArmy.LKPShotThisTurn) + ")";
        document.getElementById("skp").innerHTML = "schwere Katapulte: " + infoArmy.skp + " (" + (infoArmy.skp - infoArmy.SKPShotThisTurn) + ")";
        document.getElementById("movePoints").innerHTML = "Bewegungspunkte: " + infoArmy.remainingMovePoints;
        document.getElementById("heightPoints").innerHTML = "Höhenstufen: " + infoArmy.remainingHeightPoints;
        document.getElementById("splitBtn").style.display = "";
        if (Math.floor(infoArmy.armyId / 100) == 1) {
            document.getElementById("mount").style.display = "";
            document.getElementById("unMount").style.display = "none";
        }
        else if (Math.floor(infoArmy.armyId / 100) == 2) {
            document.getElementById("unMount").style.display = "";
            document.getElementById("mount").style.display = "none";
        }
        else {
            document.getElementById("mount").style.display = "none";
            document.getElementById("unMount").style.display = "none";
        }
        //show shoot button
        if (infoArmy.lkp > 0 || infoArmy.skp > 0 || infoArmy.isLoadedIn == false) {
            document.getElementById("shoot").style.display = "";
        }
        else {
            document.getElementById("shoot").style.display = "none";
        }
        // change Box (GodMode)
        if (infoArmy.isGuard) {
            document.getElementById("guardChangeInput").checked = true;
        }
        else {
            document.getElementById("guardChangeInput").checked = false;
        }
        document.getElementById("guardChangeInput").style.display = "";
        document.getElementById("ownerChangeInput").value = infoArmy.owner;
        document.getElementById("ownerChange").style.display = "";
        document.getElementById("armyIdChangeInput").value = infoArmy.armyId;
        document.getElementById("armyIdChange").style.display = "";
        document.getElementById("countChangeInput").value = infoArmy.count;
        document.getElementById("countChange").style.display = "";
        document.getElementById("leadersChangeInput").value = infoArmy.leaders;
        document.getElementById("leadersChange").style.display = "";
        document.getElementById("mountsChangeInput").value = infoArmy.mounts;
        document.getElementById("mountsChange").style.display = "";
        document.getElementById("lkpChangeInput").value = infoArmy.lkp;
        document.getElementById("lkpChange").style.display = "";
        document.getElementById("skpChangeInput").value = infoArmy.skp;
        document.getElementById("skpChange").style.display = "";
        document.getElementById("movePointsChangeInput").value = infoArmy.remainingMovePoints;
        document.getElementById("movePointsChange").style.display = "";
        document.getElementById("heightPointsChangeInput").value = infoArmy.remainingHeightPoints;
        document.getElementById("heightPointsChange").style.display = "";
        document.getElementById("changeArmyInfo").style.display = "";
    }
    else {
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
        document.getElementById("shoot").style.display = "none";
        document.getElementById("splitBtn").style.display = "none";
        // change Box (GM)
        document.getElementById("guardChangeInput").style.display = "none";
        document.getElementById("ownerChange").style.display = "none";
        document.getElementById("armyIdChange").style.display = "none";
        document.getElementById("countChange").style.display = "none";
        document.getElementById("leadersChange").style.display = "none";
        document.getElementById("mountsChange").style.display = "none";
        document.getElementById("lkpChange").style.display = "none";
        document.getElementById("skpChange").style.display = "none";
        document.getElementById("movePointsChange").style.display = "none";
        document.getElementById("heightPointsChange").style.display = "none";
        document.getElementById("changeArmyInfo").style.display = "none";
    }
    ;
}
function activateMountBox() {
    document.getElementById("infoBox").style.display = "none";
    document.getElementById("mountBox").style.display = "";
}
function activateUnMountBox() {
    document.getElementById("infoBox").style.display = "none";
    document.getElementById("unMountBox").style.display = "";
}
function activateShootBox() {
    document.getElementById("shootBox").style.display = "";
    findPossibleTargetFields();
    drawStuff();
}
function closeShootBox() {
    document.getElementById("shootBox").style.display = "none";
    switchModeTo("none");
    if (selectedFields[1] !== undefined)
        selectedFields.pop();
    drawStuff();
}
function activateSplitbox() {
    if (listOfArmies[selectedArmyIndex].armyType() == 1) {
        document.getElementById("splitBox").style.display = "";
    }
    else if (listOfArmies[selectedArmyIndex].armyType() == 2) {
        document.getElementById("splitMountedBox").style.display = "";
    }
    else if (listOfArmies[selectedArmyIndex].armyType() == 3) {
        document.getElementById("splitFleetBox").style.display = "";
    }
    document.getElementById("infoBox").style.display = "none";
}
function activateTransmuteBox() {
    var toSplit = 0;
    var leadersToSplit = 0;
    var mountsToSplit = 0;
    var lkpToSplit = 0;
    var skpToSplit = 0;
    // depending on army type different fields are needed
    if (listOfArmies[selectedArmyIndex].armyType() == 1) {
        toSplit = parseInt(document.getElementById("splitInput").value);
        leadersToSplit = parseInt(document.getElementById("splitLeadersInput").value);
        mountsToSplit = parseInt(document.getElementById("splitMountsInput").value);
        lkpToSplit = parseInt(document.getElementById("splitLkpInput").value);
        skpToSplit = parseInt(document.getElementById("splitSkpInput").value);
        if (toSplit > (listOfArmies[selectedArmyIndex].count - 100)) {
            window.alert("Es müssen mindestens 100 Heeresstärke beim Ursprungsheer verbleiben.");
            return false;
        }
        if (mountsToSplit > listOfArmies[selectedArmyIndex].mounts) {
            window.alert("So viele Reittiere hast du nicht.");
            return false;
        }
        if (lkpToSplit > listOfArmies[selectedArmyIndex].lkp) {
            window.alert("So viele leichte Katapulte hast du nicht.");
            return false;
        }
        if (skpToSplit > listOfArmies[selectedArmyIndex].skp) {
            window.alert("So viele schwere Katapulte hast du nicht.");
            return false;
        }
    }
    else if (listOfArmies[selectedArmyIndex].armyType() == 2) {
        toSplit = parseInt(document.getElementById("splitMountedInput").value);
        leadersToSplit = parseInt(document.getElementById("splitMountedLeadersInput").value);
        if (toSplit > (listOfArmies[selectedArmyIndex].count - 50)) {
            window.alert("Es müssen mindestens 100 Heeresstärke beim Ursprungsheer verbleiben.");
            return false;
        }
    }
    else if (listOfArmies[selectedArmyIndex].armyType() == 3) {
        toSplit = parseInt(document.getElementById("splitFleetInput").value);
        leadersToSplit = parseInt(document.getElementById("splitFleetLeadersInput").value);
        lkpToSplit = parseInt(document.getElementById("splitFleetLkpInput").value);
        skpToSplit = parseInt(document.getElementById("splitFleetSkpInput").value);
        if (toSplit > (listOfArmies[selectedArmyIndex].count - 1)) {
            window.alert("Es müssen mindestens 100 Heeresstärke beim Ursprungsheer verbleiben.");
            return false;
        }
        if (toSplit * 100 > (listOfArmies[selectedArmyIndex].currentCapacity())) {
            window.alert("Du kannst keine beladenen Schiffe verschieben.");
            return false;
        }
        if (lkpToSplit > listOfArmies[selectedArmyIndex].lkp) {
            window.alert("So viele leichte Kriegsschiffe hast du nicht.");
            return false;
        }
        if (skpToSplit > listOfArmies[selectedArmyIndex].skp) {
            window.alert("So viele schwere Kriegsschiffe hast du nicht.");
            return false;
        }
    }
    if (leadersToSplit > (listOfArmies[selectedArmyIndex].leaders - 1)) {
        window.alert("Es muss mindestens 1 Heerführer beim Ursprungsheer verbleiben.");
        return false;
    }
    document.getElementById("transmuteBox").style.display = "";
    var targetType = listOfArmies[selectedArmyIndex].armyType();
    if (targetType == 1) {
        document.getElementById("splitBox").style.display = "none";
    }
    else if (targetType == 2) {
        document.getElementById("splitMountedBox").style.display = "none";
    }
    else if (targetType == 3) {
        document.getElementById("splitFleetBox").style.display = "none";
    }
    var onlyLeaders = false;
    if (targetType == 1) {
        if (parseInt(document.getElementById("splitInput").value) == 0 &&
            parseInt(document.getElementById("splitLeadersInput").value) > 0 &&
            parseInt(document.getElementById("splitMountsInput").value) == 0 &&
            parseInt(document.getElementById("splitLkpInput").value) == 0 &&
            parseInt(document.getElementById("splitSkpInput").value) == 0) {
            onlyLeaders = true;
        }
    }
    else if (targetType == 2) {
        if (parseInt(document.getElementById("splitMountedInput").value) == 0 &&
            parseInt(document.getElementById("splitMountedLeadersInput").value) > 0) {
            onlyLeaders = true;
        }
    }
    else if (targetType == 3) {
        if (parseInt(document.getElementById("splitFleetInput").value) == 0 &&
            parseInt(document.getElementById("splitFleetLeadersInput").value) > 0 &&
            parseInt(document.getElementById("splitFleetLkpInput").value) == 0 &&
            parseInt(document.getElementById("splitFleetSkpInput").value) == 0) {
            onlyLeaders = true;
        }
    }
    var selectedX = listOfArmies[selectedArmyIndex].x;
    var selectedY = listOfArmies[selectedArmyIndex].y;
    var possibleTargets = [];
    var targetOwner = listOfArmies[selectedArmyIndex].owner;
    console.log("only Leaders?: " + onlyLeaders);
    for (var i = 0; i < listOfArmies.length; i++) {
        if (i != selectedArmyIndex) {
            if (onlyLeaders) {
                if (listOfArmies[i].owner == targetOwner &&
                    listOfArmies[i].x == selectedX &&
                    listOfArmies[i].y == selectedY) {
                    possibleTargets.push(i);
                }
            }
            else {
                if (listOfArmies[i].owner == targetOwner &&
                    listOfArmies[i].x == selectedX &&
                    listOfArmies[i].y == selectedY &&
                    listOfArmies[i].armyType() == targetType) {
                    possibleTargets.push(i);
                }
            }
        }
    }
    if (possibleTargets != []) {
        if (document.getElementById("transmuteArmyButtonsSection") != null) {
            var d = document.getElementById("transmuteArmyButtonsPartition");
            d.removeChild(document.getElementById("transmuteArmyButtonsSection"));
        }
        if (possibleTargets.length != 0) {
            var x = document.createElement("SECTION");
            x.setAttribute("id", "transmuteArmyButtonsSection");
            for (var i = 0; i < possibleTargets.length; i++) {
                var btn = document.createElement("BUTTON");
                btn.setAttribute("class", "fixedPrettyButton");
                btn.name = "transmuteBtn " + possibleTargets[i];
                var t = document.createTextNode(listOfArmies[possibleTargets[i]].armyId);
                btn.appendChild(t);
                btn.addEventListener('click', function (event) {
                    var posiInList = this.name.split(" ")[1];
                    transferTroopsFromSelectedArmy(posiInList);
                });
                x.appendChild(btn);
            }
            document.getElementById("transmuteArmyButtonsPartition").appendChild(x);
        }
    }
    else {
        if (document.getElementById("transmuteArmyButtonsSection") != null) {
            var d = document.getElementById("transmuteArmyButtonsPartition");
            d.removeChild(document.getElementById("transmuteArmyButtonsSection"));
        }
    }
}
function activateMergeBox() {
    document.getElementById("mergeBox").style.display = "";
    var targetType = listOfArmies[selectedArmyIndex].armyType();
    if (targetType == 1) {
        document.getElementById("splitBox").style.display = "none";
    }
    else if (targetType == 2) {
        document.getElementById("splitMountedBox").style.display = "none";
    }
    else if (targetType == 3) {
        document.getElementById("splitFleetBox").style.display = "none";
    }
    var selectedX = listOfArmies[selectedArmyIndex].x;
    var selectedY = listOfArmies[selectedArmyIndex].y;
    var possibleTargets = [];
    var targetOwner = listOfArmies[selectedArmyIndex].owner;
    for (var i = 0; i < listOfArmies.length; i++) {
        if (i != selectedArmyIndex) {
            if (listOfArmies[i].owner == targetOwner &&
                listOfArmies[i].x == selectedX &&
                listOfArmies[i].y == selectedY &&
                listOfArmies[i].armyType() == targetType) {
                possibleTargets.push(i);
            }
        }
    }
    if (possibleTargets != []) {
        if (document.getElementById("mergeArmyButtonsSection") != null) {
            var d = document.getElementById("mergeArmyButtonsPartition");
            d.removeChild(document.getElementById("mergeArmyButtonsSection"));
        }
        if (possibleTargets.length != 0) {
            var x = document.createElement("SECTION");
            x.setAttribute("id", "mergeArmyButtonsSection");
            for (var i = 0; i < possibleTargets.length; i++) {
                var btn = document.createElement("BUTTON");
                btn.setAttribute("class", "fixedPrettyButton");
                btn.name = "mergeBtn " + possibleTargets[i];
                var t = document.createTextNode(listOfArmies[possibleTargets[i]].armyId);
                btn.appendChild(t);
                btn.addEventListener('click', function (event) {
                    var posiInList = this.name.split(" ")[1];
                    mergeSelectedArmy(posiInList);
                });
                x.appendChild(btn);
            }
            document.getElementById("mergeArmyButtonsPartition").appendChild(x);
        }
    }
    else {
        if (document.getElementById("mergeArmyButtonsSection") != null) {
            var d = document.getElementById("mergeArmyButtonsPartition");
            d.removeChild(document.getElementById("mergeArmyButtonsSection"));
        }
    }
}
function backToSplitBox() {
    document.getElementById("mergeBox").style.display = "none";
    document.getElementById("transmuteBox").style.display = "none";
    if (listOfArmies[selectedArmyIndex].armyType() == 1) {
        document.getElementById("splitBox").style.display = "";
    }
    else if (listOfArmies[selectedArmyIndex].armyType() == 2) {
        document.getElementById("splitMountedBox").style.display = "";
    }
    else if (listOfArmies[selectedArmyIndex].armyType() == 3) {
        document.getElementById("splitFleetBox").style.display = "";
    }
}
// this is the cancel function for the mount/unmount and split boxes
function restoreInfoBox() {
    document.getElementById("mountBox").style.display = "none";
    document.getElementById("unMountBox").style.display = "none";
    document.getElementById("splitBox").style.display = "none";
    document.getElementById("splitMountedBox").style.display = "none";
    document.getElementById("splitFleetBox").style.display = "none";
    document.getElementById("transmuteBox").style.display = "none";
    document.getElementById("mergeBox").style.display = "none";
    closeShootBox();
    if (document.getElementById("godmodeBox").style.visibility != "visible") {
        document.getElementById("infoBox").style.display = "";
    }
}
