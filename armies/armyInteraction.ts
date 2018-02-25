import GameState;
// array der Würfelergebnisse leichte, array der Würfelergebnisse schwere, badConditions("far"/"farAndUp"/"high"/null),
// schießende Armee, ziel Armee, Charaktere und Zauberer auf dem Zielfeld
function fernkampf(dicerollsL, dicerollsS, shooter, target, targetField: [number, number], chars) {
    let charGpSum = 0;
    if(chars != undefined){
        let cLen = chars.length;
        for (let i = 0; i<cLen; i++){
            charGpSum += chars[i].gp;
        }
	}

	let damage = shooter.fireLkp(dicerollsL, checkCondition(shooter, targetField, false)) +
		shooter.fireSkp(dicerollsS, checkCondition(shooter, targetField, true));
	let allTargets = [];
	let sumAllBP = 0;
	if(target === "On Field"){
		for(let i = 0; i < GameState.buildings.length; i++){
			if(GameState.buildings[i].x === targetField[0] && GameState.buildings[i].y === targetField[1] && GameState.buildings[i].type < 5){
				//TODO building takes 2/3 damage
				//building[i].takeFire(damage * (2/3));
				damage = damage * (1/3);
			}
		}

		for(let i = 0; i < GameState.armies.length; i++){
			if(GameState.armies[i].x === targetField[0] && GameState.armies[i].y === targetField[1]){
				allTargets.push(GameState.armies[i]);
				sumAllBP += GameState.armies[i].sumBP();
			}
		}
		for(let i = 0; i < allTargets.length; i++){
			//target may be a building. GameState.buildings need to have this funktion
			allTargets[i].takeFire(damage/(1+(allTargets[i].leaderGp()+charGpSum)/100) * (allTargets[i].sumBP() / sumAllBP));
		}
	}
	//TODO Wall Damage
	checkArmiesForLiveliness();

	shooter.LKPShotThisTurn += dicerollsL.length;
	shooter.SKPShotThisTurn += dicerollsS.length;

	//check to see if shooting after moving and stop the army if it moved this turn.
	if(shooter.remainingMovePoints <= shooter.startingMovepoints){
		shooter.remainingMovePoints = 0;
		shooter.possibleMoves = [];
	}
}

//to fill the targetList(fields)
function findPossibleTargetFields(){
	findShootingTargets(GameState.armies[selectedArmyIndex]);
}

//to actually shoot stuff, with events
function shoot(){
	if(login == 'guest')
	{
		window.alert("Zuschauer haben keine Rechte.");
		return false;
	}
	let LKPshooting = parseInt(GUI.getShootingLKPInput().value);
	let SKPshooting = parseInt(GUI.getShootingSKPInput().value);
	let shootingarmy = GameState.armies[selectedArmyIndex];

	if(isNaN(LKPshooting)|| LKPshooting === undefined){
		LKPshooting = 0;
	}
	if(isNaN(SKPshooting) || SKPshooting === undefined){
		SKPshooting = 0;
	}
	if(shootingarmy.lkp - shootingarmy.LKPShotThisTurn < LKPshooting){//check if remaining Lkp that have not shot yet
		window.alert("Die Armee hat nur noch " + (shootingarmy.lkp - shootingarmy.LKPShotThisTurn) +" leichte Katapulte/Kriegsschiffe die noch nicht geschossen haben.");
		return false;
	}
	if(shootingarmy.skp - shootingarmy.SKPShotThisTurn < SKPshooting){//check if remaining Skp that have not shot yet
		window.alert("Die Armee hat nur noch " + (shootingarmy.skp - shootingarmy.SKPShotThisTurn) +" schwere Katapulte/Kriegsschiffe die noch nicht geschossen haben.");
		return false;
	}
	if(LKPshooting > shootingarmy.lkp){
		window.alert("Die Armee hat nicht genug leichte Katapulte/Kriegsschiffe");
		return false;
	}
	if(SKPshooting > shootingarmy.skp){
		window.alert("Die Armee hat nicht genug schwere Katapulte/Kriegsschiffe");
		return false;
	}
	if(LKPshooting === 0 && SKPshooting === 0){
		window.alert("Sie müssen eine Anzahl Katapulte eintragen");
		return false;
	}
	if(selectedFields[1] === undefined){
		window.alert("Wählen Sie ein Feld auf das Sie schießen wollen");
		return false;
	}
	if(shootingarmy.targetList === undefined){
		window.alert("bitte Zielen Sie erst");
		return false;
	}else{
		let aimedTargetFound = false;
		for(let i = 0; i < shootingarmy.targetList.length; i++){
			if(shootingarmy.targetList[i][0] === selectedFields[1][0] && shootingarmy.targetList[i][1] === selectedFields[1][1]){
				aimedTargetFound = true;
			}
		}
		if(aimedTargetFound === false){
			window.alert("Schießen Sie auf ein markiertes Feld");
			return false;
		}
	}//TODO get target to shoot at
	let target = "On Field";

	//check for mixed shooting(reachable by both lkp and skp)
	if(LKPshooting < 0){
		let cond = checkCondition(shootingarmy, selectedFields[1], false);
		if(cond === 'impossible shot'){
			window.alert("Sie müssen auf ein gemeinsam erreichbares Feld schießen");
			return false;
		}
	}

	preparedEvents.push({
		type: "shoot", content: {
			shooterID: GameState.armies[selectedArmyIndex].armyId, 
			realm: GameState.armies[selectedArmyIndex].ownerTag(),
			LKPcount: LKPshooting,
			SKPcount: SKPshooting,
			toX: selectedFields[1][0],
			toY: selectedFields[1][1],
			target: target,
			fromX: GameState.armies[selectedArmyIndex].x,
			fromY: GameState.armies[selectedArmyIndex].y
		}
	});

	shootingarmy.LKPShotThisTurn += LKPshooting;
	shootingarmy.SKPShotThisTurn += SKPshooting;

	//check to see if shooting after moving and stop the army if it moved this turn.
	if(shootingarmy.remainingMovePoints <= shootingarmy.startingMovepoints){
		shootingarmy.remainingMovePoints = 0;
		shootingarmy.possibleMoves = [];
	}
	updateInfoBox();
	window.alert("Die Geschosse sind unterwegs.");
}

// the splitArmy funtion of the split box
// TODO: If the army has moved, set the new split army's move points to the appropriate, non-max value.
function splitSelectedArmy() {
	if (login == 'guest') {
		window.alert("Zuschauer haben keine Rechte.");
		return false;
	}
	if (GameState.armies[selectedArmyIndex].isGuard) {
		window.alert("Garde Armeen können nicht geteilt werden.");
		return false;
	}
	let toSplit = 0;
	let leadersToSplit = 0;
	let mountsToSplit = 0;
	let lkpToSplit = 0;
	let skpToSplit = 0;
	// depending on army type different fields are needed
	if (GameState.armies[selectedArmyIndex].armyType() === 1) {
		toSplit = parseInt(GUI.getSplitInput().value);
		leadersToSplit = parseInt(GUI.getSplitLeadersInput().value);
		mountsToSplit = parseInt(GUI.getSplitMountsInput().value);
		lkpToSplit = parseInt(GUI.getSplitLkpInput().value);
		skpToSplit = parseInt(GUI.getSplitSkpInput().value);
		if (toSplit > (GameState.armies[selectedArmyIndex].count - 100)) {
			window.alert("Es müssen mindestens 100 Heeresstärke beim Ursprungsheer verbleiben.")
			return false;
		}
		if (toSplit < 100) {
			window.alert("Es müssen mindestens 100 Heeresstärke abgespalten werden.")
			return false;
		}
		if (mountsToSplit > GameState.armies[selectedArmyIndex].mounts) {
			window.alert("So viele Reittiere hast du nicht.")
			return false;
		}
		if (lkpToSplit > GameState.armies[selectedArmyIndex].lkp) {
			window.alert("So viele leichte Katapulte hast du nicht.")
			return false;
		}
		if (skpToSplit > GameState.armies[selectedArmyIndex].skp) {
			window.alert("So viele schwere Katapulte hast du nicht.")
			return false;
		}
	}
	else if (GameState.armies[selectedArmyIndex].armyType() === 2) {
		toSplit = parseInt(GUI.getSplitMountedInput().value);
		leadersToSplit = parseInt(GUI.getSplitMountedLeadersInput().value);
		if (toSplit > (GameState.armies[selectedArmyIndex].count - 50)) {
			window.alert("Es müssen mindestens 100 Heeresstärke beim Ursprungsheer verbleiben.")
			return false;
		}
		if (toSplit < 50) {
			window.alert("Es müssen mindestens 100 Heeresstärke abgespalten werden. (50 Reiter)")
			return false;
		}
	}
	else if (GameState.armies[selectedArmyIndex].armyType() === 3) {
		toSplit = parseInt(GUI.getSplitFleetInput().value);
		leadersToSplit = parseInt(GUI.getSplitFleetLeadersInput().value);
		lkpToSplit = parseInt(GUI.getSplitFleetLkpInput().value);
		skpToSplit = parseInt(GUI.getSplitFleetSkpInput().value);
		if (toSplit > (GameState.armies[selectedArmyIndex].count - 1)) {
			window.alert("Es müssen mindestens 100 Heeresstärke beim Ursprungsheer verbleiben.")
			return false;
		}
		if (toSplit * 100 > (GameState.armies[selectedArmyIndex].currentCapacity())) {
			window.alert("Du kannst keine beladenen Schiffe abspalten.")
			return false;
		}
		if (toSplit < 1) {
			window.alert("Es müssen mindestens 100 Heeresstärke abgespalten werden. (1 Schiff)")
			return false;
		}
		if (lkpToSplit > GameState.armies[selectedArmyIndex].lkp) {
			window.alert("So viele leichte Kriegsschiffe hast du nicht.")
			return false;
		}
		if (skpToSplit > GameState.armies[selectedArmyIndex].skp) {
			window.alert("So viele schwere Kriegsschiffe hast du nicht.")
			return false;
		}
	}
	if (leadersToSplit > (GameState.armies[selectedArmyIndex].leaders - 1)) {
		window.alert("Es muss mindestens 1 Heerführer beim Ursprungsheer verbleiben.")
		return false;
	}
	if (leadersToSplit < 1) {
		window.alert("Es muss mindestens 1 Heerführer abgespalten werden.")
		return false;
	}
	if (GameState.armies[selectedArmyIndex].armyType() == 1) {
		let newArmyId = generateArmyId(1, GameState.armies[selectedArmyIndex].owner);
		let newArmy = new heer(newArmyId, toSplit, leadersToSplit, lkpToSplit, skpToSplit, mountsToSplit, false,
			GameState.armies[selectedArmyIndex].x, GameState.armies[selectedArmyIndex].y, GameState.armies[selectedArmyIndex].owner);
			GameState.armies.push(newArmy);
			GameState.armies[selectedArmyIndex].removeSoldiers(toSplit);
			GameState.armies[selectedArmyIndex].removeLeaders(leadersToSplit);
			GameState.armies[selectedArmyIndex].removeLkp(lkpToSplit);
			GameState.armies[selectedArmyIndex].removeSkp(skpToSplit);
			GameState.armies[selectedArmyIndex].removeMounts(mountsToSplit);
			GameState.armies.push({
			type: "split", content: {
				fromArmyId: GameState.armies[selectedArmyIndex].armyId,
				realm: GameState.armies[selectedArmyIndex].ownerTag(),
				troops: toSplit,
				leaders: leadersToSplit,
				lkp: lkpToSplit,
				skp: skpToSplit,
				mounts: mountsToSplit,
				x: GameState.armies[selectedArmyIndex].x,
				y: GameState.armies[selectedArmyIndex].y,
				newArmysId: newArmyId
			}
		});
	}
	if (GameState.armies[selectedArmyIndex].armyType() == 2) {
		let newArmyId = generateArmyId(2, GameState.armies[selectedArmyIndex].owner);
		let newArmy = new reiterHeer(newArmyId, toSplit, leadersToSplit, false,
			GameState.armies[selectedArmyIndex].x, GameState.armies[selectedArmyIndex].y, GameState.armies[selectedArmyIndex].owner);
			GameState.armies.push(newArmy);
			GameState.armies[selectedArmyIndex].removeSoldiers(toSplit);
			GameState.armies[selectedArmyIndex].removeLeaders(leadersToSplit);
		preparedEvents.push({
			type: "split", content: {
				fromArmyId: GameState.armies[selectedArmyIndex].armyId,
				realm: GameState.armies[selectedArmyIndex].ownerTag(),
				troops: toSplit,
				leaders: leadersToSplit,
				lkp: 0,
				skp: 0,
				mounts: 0,
				x: GameState.armies[selectedArmyIndex].x,
				y: GameState.armies[selectedArmyIndex].y,
				newArmysId: newArmyId
			}
		});
	}
	if (GameState.armies[selectedArmyIndex].armyType() == 3) {
		let newArmyId = generateArmyId(3, GameState.armies[selectedArmyIndex].owner);
		let newArmy = new seeHeer(newArmyId, toSplit, leadersToSplit, lkpToSplit,
			skpToSplit, false, GameState.armies[selectedArmyIndex].x, GameState.armies[selectedArmyIndex].y, GameState.armies[selectedArmyIndex].owner);
			GameState.armies.push(newArmy);
			GameState.armies[selectedArmyIndex].removeSoldiers(toSplit);
			GameState.armies[selectedArmyIndex].removeLeaders(leadersToSplit);
			GameState.armies[selectedArmyIndex].removeLkp(lkpToSplit);
			GameState.armies[selectedArmyIndex].removeSkp(skpToSplit);
		preparedEvents.push({
			type: "split", content: {
				fromArmyId: GameState.armies[selectedArmyIndex].armyId,
				realm: GameState.armies[selectedArmyIndex].ownerTag(),
				troops: toSplit,
				leaders: leadersToSplit,
				lkp: lkpToSplit,
				skp: skpToSplit,
				mounts: 0,
				x: GameState.armies[selectedArmyIndex].x,
				y: GameState.armies[selectedArmyIndex].y,
				newArmysId: newArmyId
			}
		});
	}
	restoreInfoBox();
	updateInfoBox();
}

// the mount function of the mount box
function mountSelected() {
	let toMount = GUI.getMountInput().value;
	let leadersToMount = GUI.getMountLeaderInput().value;
	mountWithParams(selectedArmyIndex, toMount, leadersToMount, null);
}

// mounting with parameters
//TODO: If the army has moved, set the new mounted army's move points to the apropriate, non-max value.
function mountWithParams(armyIndex, toMount, leadersToMount, newArmyId) {
	if (toMount === "" || leadersToMount === "" || toMount === null || leadersToMount === null) {
		window.alert("Alle felder müssen ausgefüllt sein");
		return false;
	}
	// generiere armyId falls keine vorhanden
	if (newArmyId === null) {
		newArmyId = generateArmyId(2, GameState.armies[armyIndex].owner);
	}
	// sitzen genug Truppen auf?
	if (toMount < 50) {
		window.alert("Es müssen mindestens 50 Reiter in einem Reiterheer sein.");
		return false;
	}
	// sitzen genug Heerführer auf?
	if (leadersToMount < 1) {
		window.alert("Es muss mindestens ein Heerführer bei der neuen Armee sein.");
		return false;
	}
	// bleibt ein Hf bei der armee zurück?
	if (toMount != GameState.armies[armyIndex].count && leadersToMount === GameState.armies[armyIndex].leaders) {
		window.alert("Es muss mindestens ein Heerführer bei der Armee verbleiben.");
		return false;
	}
	// genug Truppen vorhanden?
	if (toMount != GameState.armies[armyIndex].count && (toMount * 2 > GameState.armies[armyIndex].raumpunkteOhneHf() - 100)) {
		window.alert("Es müssen alle aufsitzen, oder mindestens 100 Raumpunkte verbleiben");
		return false;
		// genug Reittiere vorhanden?
	}
	// genug Truppen vorhanden?
	if (toMount > GameState.armies[armyIndex].count) {
		window.alert("Du hast zu wenige Truppen zum aufsitzen");
		return false;
		// genug Reittiere vorhanden?
	}
	else if (toMount > GameState.armies[armyIndex].mounts) {
		window.alert("Du hast zu wenige Reittiere zum aufsitzen");
		return false;
		// Sitzen alle auf?
	}
	else if (toMount === GameState.armies[armyIndex].count) {
		// neues Reiterheer mit generierter Id an selben Koordinaten
		let newArmy = new reiterHeer(newArmyId, toMount,
			GameState.armies[armyIndex].leaders, GameState.armies[armyIndex].isGuard, GameState.armies[armyIndex].x,
			listOGameState.armiesfArmies[armyIndex].y, GameState.armies[armyIndex].owner);
		newArmy.setRemainingHeightPoints(GameState.armies[armyIndex].remainingHeightPoints);
		if (GameState.armies[armyIndex].remainingMovePoints !== GameState.armies[armyIndex].startingMovepoints) {
			newArmy.setRemainingMovePoints(0);
		} else newArmy.setRemainingMovePoints(newArmy.startingMovepoints);
		// Nachricht, falls Katapulte vorhanden waren.
		if (GameState.armies[armyIndex].skp > 0 || GameState.armies[armyIndex].lkp > 0) {
			window.alert("Da kein Fußheer mehr bestehen bleibt, wurden die Katapulte zerstört.")
		}
		// in GameState.armies einfügen und alte Armee löschen, ist dann automatisch armyIndex
		GameState.armies.push(newArmy);
		//in preparedEvents pushen
		preparedEvents.push({
			type: "mount", content: {
				fromArmyId: GameState.armies[armyIndex].armyId,
				realm: GameState.armies[armyIndex].ownerTag(),
				troops: toMount,
				leaders: leadersToMount,
				x: GameState.armies[armyIndex].x,
				y: GameState.armies[armyIndex].y,
				newArmysId: newArmy.armyId
			}
		});
		deleteArmy(armyIndex);
		restoreInfoBox();
		Drawing.drawStuff();
		updateInfoBox();
	}
	else if (leadersToMount >= GameState.armies[armyIndex].leaders) {
		window.alert("Du hast zu wenige Heerführer zum aufsitzen")
	}
	else if (GameState.armies[armyIndex].isGuard) {
		window.alert("Die Garde muss zusammen bleiben");
	}
	else {
		// neues Reiterheer mit generierter Id an selben Koordinaten
		let newArmy = new reiterHeer(newArmyId, toMount, leadersToMount, false,
			GameState.armies[armyIndex].x, GameState.armies[armyIndex].y, GameState.armies[selectedArmyIndex].owner);
		newArmy.setRemainingHeightPoints(GameState.armies[armyIndex].remainingHeightPoints);
		if (GameState.armies[armyIndex].remainingMovePoints !== GameState.armies[armyIndex].startingMovepoints) {
			newArmy.setRemainingMovePoints(0);
		} else newArmy.setRemainingMovePoints(newArmy.startingMovepoints);
		// zahlen im alten Heer anpassen
		GameState.armies[armyIndex].removeSoldiers(toMount);
		GameState.armies[armyIndex].removeLeaders(leadersToMount);
		GameState.armies[armyIndex].removeMounts(toMount);
		// in GameState.armies einfügen
		GameState.armies.push(newArmy);
		//in preparedEvents pushen
		preparedEvents.push({
			type: "mount", content: {
				fromArmyId: GameState.armies[armyIndex].armyId,
				realm: GameState.armies[armyIndex].ownerTag(),
				troops: toMount,
				leaders: leadersToMount,
				x: GameState.armies[armyIndex].x,
				y: GameState.armies[armyIndex].y,
				newArmysId: newArmy.armyId
			}
		});
		// selectedArmyIndex zeigt auf neues Heer
		selectedArmyIndex = GameState.armies.length - 1;
		Drawing.drawStuff();
		restoreInfoBox();
		updateInfoBox();
	}
}

// the unMount function of the unMount box
function unMountSelected() {
	let toUnMount = GUI.getUnMountInput().value;
	let leadersToUnMount = GUI.getUnMountLeaderInput().value;
	unMountWithParams(selectedArmyIndex, toUnMount, leadersToUnMount, null);
}

// the unMount function of the unMount box
//TODO: If the mounted army has moved, set the new foot army's move points to the apropriate, non-max value.
function unMountWithParams(armyIndex, toUnMount, leadersToUnMount, newArmyId) {
	if (toUnMount === "" || leadersToUnMount === "" || toUnMount == undefined || leadersToUnMount == undefined) {
		window.alert("Alle felder müssen ausgefüllt sein");
		return false;
	}
	// generiere armyId falls keine vorhanden
	if (newArmyId === null) {
		newArmyId = generateArmyId(1, GameState.armies[armyIndex].owner);
	}
	// sitzen genug Truppen ab?
	if (toUnMount < 100) {
		window.alert("Es müssen mindestens 100 Truppen in einem Fußheer sein.");
		return false;
	}
	// bleibt ein hf be der Armee?
	if (toUnMount != GameState.armies[armyIndex].count && leadersToUnMount === GameState.armies[armyIndex].leaders) {
		window.alert("Es muss mindestens ein Heerführer bei der Armee verbleiben.");
		return false;
	}
	// genug Truppen vorhanden?
	if (toUnMount != GameState.armies[armyIndex].count && (toUnMount * 2 > GameState.armies[armyIndex].raumpunkteOhneHf() - 100)) {
		window.alert("Es müssen alle aufsitzen, oder mindestens 100 Raumpunkte verbleiben");
		return false;
		// genug Reittiere vorhanden?
	}
	// sitzen genug Heerführer ab?
	if (leadersToUnMount < 1) {
		window.alert("Es muss mindestens ein Heerführer bei der neuen Armee sein.");
		return false;
	}
	console.log(toUnMount);
	if (toUnMount > GameState.armies[armyIndex].count) {
		window.alert("So viele Truppen hast du nicht zum absitzen")
		return false;
		// genug Truppen vorhanden?
	} else if ((toUnMount == GameState.armies[armyIndex].count)) {
		// neues Heer mit generierter Id an selben Koordinaten
		let newArmy = new heer(newArmyId, toUnMount,
			GameState.armies[armyIndex].leaders, 0, 0, toUnMount, GameState.armies[armyIndex].isGuard,
			GameState.armies[armyIndex].x, GameState.armies[armyIndex].y, GameState.armies[armyIndex].owner);
		newArmy.setRemainingHeightPoints(GameState.armies[armyIndex].remainingHeightPoints);
		if (GameState.armies[armyIndex].remainingMovePoints !== GameState.armies[armyIndex].startingMovepoints) {
			newArmy.setRemainingMovePoints(0);
		} else newArmy.setRemainingMovePoints(newArmy.startingMovepoints);
		// in GameState.armies einfügen und alte Armee löschen, ist dann automatisch armyIndex
		GameState.armies.push(newArmy);
		if (GameState.armies[armyIndex].multiArmyField === true) {
			addToMultifield(GameState.armies[armyIndex], newArmy);
			// deleteFromMultifield(GameState.armies[armyIndex]);
		}
		preparedEvents.push({
			type: "mount", content: {
				fromArmyId: GameState.armies[armyIndex].armyId,
				realm: GameState.armies[armyIndex].ownerTag(),
				troops: toUnMount,
				leaders: leadersToUnMount,
				x: GameState.armies[armyIndex].x,
				y: GameState.armies[armyIndex].y,
				newArmysId: newArmy.armyId
			}
		});
		deleteArmy(armyIndex);
		Drawing.drawStuff();
		restoreInfoBox();
		updateInfoBox();
		// genug Heerführer?
	} else if (leadersToUnMount >= GameState.armies[armyIndex].leaders) {
		window.alert("Du hast zu wenige Heerführer zum absitzen");
	} else if (GameState.armies[armyIndex].isGuard) {
		window.alert("Die Garde muss zusammen bleiben");
	} else {
		// neues Heer mit generierter Id an selben Koordinaten
		let newArmy = new heer(newArmyId, toUnMount, leadersToUnMount, 0, 0,
			toUnMount, false, GameState.armies[armyIndex].x, GameState.armies[armyIndex].y, GameState.armies[armyIndex].owner);
		newArmy.setRemainingHeightPoints(GameState.armies[armyIndex].remainingHeightPoints);
		if (GameState.armies[armyIndex].remainingMovePoints !== GameState.armies[armyIndex].startingMovepoints) {
			newArmy.setRemainingMovePoints(0);
		}  else newArmy.setRemainingMovePoints(newArmy.startingMovepoints);
		// zahlen im alten Reiterheer anpassen
		GameState.armies[armyIndex].removeSoldiers(toUnMount);
		GameState.armies[armyIndex].removeLeaders(leadersToUnMount);
		// in GameState.armies einfügen
		GameState.armies.push(newArmy);
		if (GameState.armies[armyIndex].multiArmyField === true) {
			addToMultifield(GameState.armies[armyIndex], newArmy);
			// deleteFromMultifield(GameState.armies[armyIndex]);
		}
		preparedEvents.push({
			type: "mount", content: {
				fromArmyId: GameState.armies[armyIndex].armyId,
				realm: GameState.armies[armyIndex].ownerTag(),
				troops: toUnMount,
				leaders: leadersToUnMount,
				x: GameState.armies[armyIndex].x,
				y: GameState.armies[armyIndex].y,
				newArmysId: newArmy.armyId
			}
		});
		// armyIndex zeigt auf neues Heer
		selectedArmyIndex = GameState.armies.length - 1;
		Drawing.drawStuff();
		restoreInfoBox();
		updateInfoBox();
	}
}

function allMountSelected() {
	mountWithParams(selectedArmyIndex, GameState.armies[selectedArmyIndex].count, GameState.armies[selectedArmyIndex].leaders, null);
}

function allUnMountSelected() {
	unMountWithParams(selectedArmyIndex, GameState.armies[selectedArmyIndex].count, GameState.armies[selectedArmyIndex].leaders, null);
}

// move troops or leaders from selectedArmyIndex to the army at position mergeId in GameState.armies
function transferTroopsFromSelectedArmy(mergeId) {
	let toSplit = 0;
	let leadersToSplit = 0;
	let mountsToSplit = 0;
	let lkpToSplit = 0;
	let skpToSplit = 0;
	// depending on army type different fields are needed
	if (GameState.armies[selectedArmyIndex].armyType() === 1) {
		toSplit = parseInt(GUI.getSplitInput().value);
		leadersToSplit = parseInt(GUI.getSplitLeadersInput().value);
		mountsToSplit = parseInt(GUI.getSplitMountsInput().value);
		lkpToSplit = parseInt(GUI.getSplitLkpInput().value);
		skpToSplit = parseInt(GUI.getSplitSkpInput().value);
		if (toSplit >= 0 && leadersToSplit >= 0 && mountsToSplit >= 0 && lkpToSplit >= 0 && skpToSplit >= 0) {
			GameState.armies[selectedArmyIndex].count -= toSplit;
			GameState.armies[mergeId].count += toSplit;
			GameState.armies[selectedArmyIndex].leaders -= leadersToSplit;
			GameState.armies[mergeId].leaders += leadersToSplit;
			GameState.armies[selectedArmyIndex].mounts -= mountsToSplit;
			GameState.armies[mergeId].mounts += mountsToSplit;
			GameState.armies[selectedArmyIndex].lkp -= lkpToSplit;
			GameState.armies[mergeId].lkp += lkpToSplit;
			GameState.armies[selectedArmyIndex].skp -= skpToSplit;
			GameState.armies[mergeId].skp += skpToSplit;
			if (leadersToSplit > 0 && GameState.armies[selectedArmyIndex].remainingMovePoints < GameState.armies[selectedArmyIndex].startingMovepoints) {
				GameState.armies[mergeId].setRemainingMovePoints(0);
			} else if (GameState.armies[selectedArmyIndex].remainingMovePoints < GameState.armies[mergeId].remainingMovePoints) {
				GameState.armies[mergeId].setRemainingMovePoints(GameState.armies[selectedArmyIndex].remainingMovePoints);
			}
			if (GameState.armies[selectedArmyIndex].remainingHeightPoints < GameState.armies[mergeId].remainingHeightPoints) {
				console.log
				GameState.armies[mergeId].setRemainingHeightPoints(GameState.armies[selectedArmyIndex].remainingHeightPoints);

			}
			preparedEvents.push({
				type: "transfer", content: {
					fromArmyId: GameState.armies[selectedArmyIndex].armyId,
					toArmyId: GameState.armies[mergeId].armyId,
					realm: GameState.armies[selectedArmyIndex].ownerTag(),
					troops: toSplit,
					leaders: leadersToSplit,
					lkp: lkpToSplit,
					skp: skpToSplit,
					mounts: mountsToSplit,
					x: GameState.armies[selectedArmyIndex].x,
					y: GameState.armies[selectedArmyIndex].y
				}
			});
		} else {
			window.alert("Es müssen positive Werte abgespalten werden");
			return false;
		}
	}
	else if (GameState.armies[selectedArmyIndex].armyType() === 2) {
		toSplit = parseInt(GUI.getSplitMountedInput().value);
		leadersToSplit = parseInt(GUI.getSplitMountedLeadersInput().value);
		if (toSplit >= 0 && leadersToSplit >= 0) {
			GameState.armies[selectedArmyIndex].count -= toSplit;
			GameState.armies[mergeId].count += toSplit;
			GameState.armies[selectedArmyIndex].leaders -= leadersToSplit;
			GameState.armies[mergeId].leaders += leadersToSplit;
			GameState.armies[selectedArmyIndex].lkp -= lkpToSplit;
			GameState.armies[mergeId].lkp += lkpToSplit;
			GameState.armies[selectedArmyIndex].skp -= skpToSplit;
			GameState.armies[mergeId].skp += skpToSplit;

			if (leadersToSplit > 0 && GameState.armies[selectedArmyIndex].remainingMovePoints < GameState.armies[selectedArmyIndex].startingMovepoints) {
				GameState.armies[mergeId].setRemainingMovePoints(0);
			} else if (GameState.armies[selectedArmyIndex].remainingMovePoints < GameState.armies[mergeId].remainingMovePoints) {
				GameState.armies[mergeId].setRemainingMovePoints(GameState.armies[selectedArmyIndex].remainingMovePoints);
			}
			if (GameState.armies[selectedArmyIndex].remainingHeightPoints < GameState.armies[mergeId].remainingHeightPoints) {
				GameState.armies[mergeId].setRemainingHeightPoints(GameState.armies[selectedArmyIndex].remainingHeightPoints);
			}
			preparedEvents.push({
				type: "transfer", content: {
					fromArmyId: GameState.armies[selectedArmyIndex].armyId,
					toArmyId: GameState.armies[mergeId].armyId,
					realm: GameState.armies[selectedArmyIndex].ownerTag(),
					troops: toSplit,
					leaders: leadersToSplit,
					lkp: 0,
					skp: 0,
					mounts: 0,
					x: GameState.armies[selectedArmyIndex].x,
					y: GameState.armies[selectedArmyIndex].y
				}
			});
		} else {
			window.alert("Es müssen positive Werte abgespalten werden");
			return false;
		}
	}
	else if (GameState.armies[selectedArmyIndex].armyType() === 3) {
		toSplit = parseInt(GUI.getSplitFleetInput().value);
		leadersToSplit = parseInt(GUI.getSplitFleetLeadersInput().value);
		lkpToSplit = parseInt(GUI.getSplitFleetLkpInput().value);
		skpToSplit = parseInt(GUI.getSplitFleetSkpInput().value);
		if (toSplit >= 0 && leadersToSplit >= 0 && lkpToSplit >= 0 && skpToSplit >= 0) {
			GameState.armies[selectedArmyIndex].count -= toSplit;
			GameState.armies[mergeId].count += toSplit;
			GameState.armies[selectedArmyIndex].leaders -= leadersToSplit;
			GameState.armies[mergeId].leaders += leadersToSplit;
			GameState.armies[selectedArmyIndex].lkp -= lkpToSplit;
			GameState.armies[mergeId].lkp += lkpToSplit;
			GameState.armies[selectedArmyIndex].skp -= skpToSplit;
			GameState.armies[mergeId].skp += skpToSplit;
			if (leadersToSplit > 0 && GameState.armies[selectedArmyIndex].remainingMovePoints < GameState.armies[selectedArmyIndex].startingMovepoints) {
				GameState.armies[mergeId].setRemainingMovePoints(0);
			} else if (GameState.armies[selectedArmyIndex].remainingMovePoints < GameState.armies[mergeId].remainingMovePoints) {
				GameState.armies[mergeId].setRemainingMovePoints(GameState.armies[selectedArmyIndex].remainingMovePoints);
			}
			if (GameState.armies[selectedArmyIndex].remainingHeightPoints < GameState.armies[mergeId].remainingHeightPoints) {
				GameState.armies[mergeId].setRemainingHeightPoints(GameState.armies[selectedArmyIndex].remainingHeightPoints);
			}
			preparedEvents.push({
				type: "transfer", content: {
					fromArmyId: GameState.armies[selectedArmyIndex].armyId,
					toArmyId: GameState.armies[mergeId].armyId,
					realm: GameState.armies[selectedArmyIndex].ownerTag(),
					troops: toSplit,
					leaders: leadersToSplit,
					lkp: lkpToSplit,
					skp: skpToSplit,
					mounts: 0,
					x: GameState.armies[selectedArmyIndex].x,
					y: GameState.armies[selectedArmyIndex].y
				}
			});
		} else {
			window.alert("Es müssen positive Werte abgespalten werden");
			return false;
		}
	}
	updateInfoBox();
	restoreInfoBox();
}

// merges selectedArmy with the army at position mergeId in GameState.armies
function mergeSelectedArmy(mergeId) {
	// depending on army type different fields are needed
	if (GameState.armies[selectedArmyIndex].armyType() === 1) {
		GameState.armies[mergeId].count += GameState.armies[selectedArmyIndex].count;
		GameState.armies[mergeId].leaders += GameState.armies[selectedArmyIndex].leaders;
		GameState.armies[mergeId].mounts += GameState.armies[selectedArmyIndex].mounts;
		GameState.armies[mergeId].lkp += GameState.armies[selectedArmyIndex].lkp;
		GameState.armies[mergeId].skp += GameState.armies[selectedArmyIndex].skp;
		if (GameState.armies[selectedArmyIndex].remainingMovePoints < GameState.armies[mergeId].remainingMovePoints) {
			GameState.armies[mergeId].setRemainingMovePoints(GameState.armies[selectedArmyIndex].remainingMovePoints);
		}
		if (GameState.armies[selectedArmyIndex].remainingHeightPoints < GameState.armies[mergeId].remainingHeightPoints) {
			GameState.armies[mergeId].setRemainingHeightPoints(GameState.armies[selectedArmyIndex].remainingHeightPoints);
		}
		preparedEvents.push({
			type: "merge", content: {
				fromArmyId: GameState.armies[selectedArmyIndex].armyId,
				toArmyId: GameState.armies[mergeId].armyId,
				realm: GameState.armies[selectedArmyIndex].ownerTag(),
				troops: GameState.armies[selectedArmyIndex].count,
				leaders: GameState.armies[selectedArmyIndex].leaders,
				lkp: GameState.armies[selectedArmyIndex].lkp,
				skp: GameState.armies[selectedArmyIndex].skp,
				mounts: GameState.armies[selectedArmyIndex].mounts,
				x: GameState.armies[selectedArmyIndex].x,
				y: GameState.armies[selectedArmyIndex].y
			}
		});
		deleteArmy(selectedArmyIndex);
	}
	else if (GameState.armies[selectedArmyIndex].armyType() === 2) {
		GameState.armies[mergeId].count += GameState.armies[selectedArmyIndex].count;
		GameState.armies[mergeId].leaders += GameState.armies[selectedArmyIndex].leaders;
		if (GameState.armies[selectedArmyIndex].remainingMovePoints < GameState.armies[mergeId].remainingMovePoints) {
			GameState.armies[mergeId].setRemainingMovePoints(GameState.armies[selectedArmyIndex].remainingMovePoints);
		}
		if (GameState.armies[selectedArmyIndex].remainingHeightPoints < GameState.armies[mergeId].remainingHeightPoints) {
			GameState.armies[mergeId].setRemainingHeightPoints(GameState.armies[selectedArmyIndex].remainingHeightPoints);
		}
		preparedEvents.push({
			type: "merge", content: {
				fromArmyId: GameState.armies[selectedArmyIndex].armyId,
				toArmyId: GameState.armies[mergeId].armyId,
				realm: GameState.armies[selectedArmyIndex].ownerTag(),
				troops: GameState.armies[selectedArmyIndex].count,
				leaders: GameState.armies[selectedArmyIndex].leaders,
				lkp: 0,
				skp: 0,
				mounts: 0,
				x: GameState.armies[selectedArmyIndex].x,
				y: GameState.armies[selectedArmyIndex].y
			}
		});
		deleteArmy(selectedArmyIndex);
	}
	else if (GameState.armies[selectedArmyIndex].armyType() === 3) {
		GameState.armies[mergeId].count += GameState.armies[selectedArmyIndex].count;
		GameState.armies[mergeId].leaders += GameState.armies[selectedArmyIndex].leaders;
		GameState.armies[mergeId].lkp += GameState.armies[selectedArmyIndex].lkp;
		GameState.armies[mergeId].skp += GameState.armies[selectedArmyIndex].skp;
		GameState.armies[mergeId].loadedArmies = GameState.armies[mergeId].loadedArmies.concat(GameState.armies[selectedArmyIndex].loadedArmies);
		if (GameState.armies[selectedArmyIndex].remainingMovePoints < GameState.armies[mergeId].remainingMovePoints) {
			GameState.armies[mergeId].setRemainingMovePoints(GameState.armies[selectedArmyIndex].remainingMovePoints);
		}
		if (GameState.armies[selectedArmyIndex].remainingHeightPoints < GameState.armies[mergeId].remainingHeightPoints) {
			GameState.armies[mergeId].setRemainingHeightPoints(GameState.armies[selectedArmyIndex].remainingHeightPoints);
		}
		if (GameState.armies[selectedArmyIndex].loadedArmies.length > 0) {
			for (let j = 0; j < GameState.armies[selectedArmyIndex].loadedArmies.length; j++) {
				for (let i = 0; i < GameState.armies.length; i++) {
					if (GameState.armies[selectedArmyIndex].loadedArmies[j] == GameState.armies[i].armyId &&
						GameState.armies[mergeId].owner === GameState.armies[i].owner) {
						GameState.armies[i].isLoadedIn = GameState.armies[mergeId].armyId;
					}
				}
			}
		}
		for (let j = 0; j < GameState.armies[mergeId].loadedArmies.length; j++) {
			for (let i = 0; i < GameState.armies.length; i++) {
				if (GameState.armies[mergeId].loadedArmies[j] == GameState.armies[i].armyId &&
					GameState.armies[mergeId].owner === GameState.armies[i].owner) {
				}
			}
		}
		preparedEvents.push({
			type: "merge", content: {
				fromArmyId: GameState.armies[selectedArmyIndex].armyId,
				toArmyId: GameState.armies[mergeId].armyId,
				realm: GameState.armies[selectedArmyIndex].ownerTag(),
				troops: GameState.armies[selectedArmyIndex].count,
				leaders: GameState.armies[selectedArmyIndex].leaders,
				lkp: 0,
				skp: 0,
				mounts: 0,
				x: GameState.armies[selectedArmyIndex].x,
				y: GameState.armies[selectedArmyIndex].y
			}
		});
		deleteArmy(selectedArmyIndex);
	}
	if (mergeId = GameState.armies.length) {
		mergeId -= 1;
	}
	selectedArmyIndex = mergeId;
	updateInfoBox();
	restoreInfoBox();
}

function deleteArmy(index) {
	GameState.armies.splice(index, 1);
	if (selectedArmyIndex === GameState.armies.length) {
		selectedArmyIndex = undefined;
	}
}

// returns the next armyId not yet assigned for the caller
function generateArmyId(type, owner) {
	if (type === 1) {
		let j = 101;
		while (j < 200) {
			let found = false;
			for (let i = 0; i < GameState.armies.length; i++) {
				if (GameState.armies[i].armyId === j && GameState.armies[i].owner === owner) {
					j++;
					found = true;
				}
			}
			if (!found) {
				return j;
			}
		}
		window.alert("Du hast die maximale Anzahl an Fußheeren erreicht.")
		return false;
	} else if (type === 2) {
		let j = 201;
		while (j < 300) {
			let found = false;
			for (let i = 0; i < GameState.armies.length; i++) {
				if (GameState.armies[i].armyId === j && GameState.armies[i].owner === owner) {
					j++;
					found = true;
				}
			}
			if (!found) {
				return j;
			}
		}
		window.alert("Du hast die maximale Anzahl an Reiterheeren erreicht.")
		return false;
	} else if (type === 3) {
		let j = 301;
		while (j < 400) {
			let found = false;
			for (let i = 0; i < GameState.armies.length; i++) {
				if (GameState.armies[i].armyId === j && GameState.armies[i].owner === owner) {
					j++;
					found = true;
				}
			}
			if (!found) {
				return j;
			}
		}
		window.alert("Du hast die maximale Anzahl an Flotten erreicht.")
		return false;
	} else {
		return false;
	}
}

function checkArmiesForLiveliness() {
	GameState.armies = GameState.armies.filter((armyCoord) => (armyCoord.isAlive()));
}