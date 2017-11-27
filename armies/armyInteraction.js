function battleHandler(participants, x, y) {
	//participating armies
	this.unsortedArmies = participants;
	this.attackSide = [];
	this.defenseSide = [];
	//coordinates of the battle
	this.x = x;
	this.y = y;
	this.battle = null;

	//UI elements to display armies of both sides
	this.attackList = document.getElementById("attackArmiesBox");
	this.unsortedList = document.getElementById("unsortedArmiesBox");
	this.defenseList = document.getElementById("defenseArmiesBox");
	//both boxes under the lists of troops and the Fight! button
	this.attackTroopCount = document.getElementById("attackBattleSide");
	this.defenseTroopCount = document.getElementById("defenseBattleSide");
	this.battleButton = document.getElementById("battleButton");
	//dice rolls
	this.attackDice = document.getElementById("attackDiceRoll");
	this.defenseDice = document.getElementById("defenseDiceRoll");

	this.attackSoldiers = 0;
	this.attackOfficers = 0;
	this.attackRiders = 0;
	this.attackGuardSoldiers = 0;
	this.attackGuardRiders = 0;

	this.attackShips = 0;
	this.attackLightWarships = 0;
	this.attackHeavyWarships = 0;
	this.attackGuardShips = 0;

	this.defenseSoldiers = 0;
	this.defenseOfficers = 0;
	this.defenseRiders = 0;
	this.defenseGuardSoldiers = 0;
	this.defenseGuardRiders = 0;

	this.defenseShips = 0;
	this.defenseLightWarships = 0;
	this.defenseHeavyWarships = 0;
	this.defenseGuardShips = 0;

	this.moveToAttack = function (i) {
		var ctx = this;
		return function () {
			var t = ctx.unsortedArmies.splice(i, 1);
			ctx.attackSide.push(t[0]);
			ctx.updateTroopCounts();
			ctx.updateDisplay();
		}
	}

	this.moveToDefense = function (i) {
		var ctx = this;
		return function () {
			var t = ctx.unsortedArmies.splice(i, 1);
			ctx.defenseSide.push(t[0]);
			ctx.updateTroopCounts();
			ctx.updateDisplay();
		}
	}

	this.removeFromDefense = function (i) {
		var ctx = this;
		return function () {
			var t = ctx.defenseSide.splice(i, 1);
			ctx.unsortedArmies.push(t[0]);
			ctx.updateTroopCounts();
			ctx.updateDisplay();
		}
	}

	this.removeFromAttack = function (i) {
		var ctx = this;
		return function () {
			var t = ctx.attackSide.splice(i, 1);
			ctx.unsortedArmies.push(t[0]);
			ctx.updateTroopCounts();
			ctx.updateDisplay();
		}
	}

	this.updateTroopCounts = function () {
		this.attackSoldiers = 0;
		this.attackOfficers = 0;
		this.attackRiders = 0;
		this.attackGuardSoldiers = 0;
		this.attackGuardRiders = 0;

		this.attackShips = 0;
		this.attackLightWarships = 0;
		this.attackHeavyWarships = 0;
		this.attackGuardShips = 0;

		this.defenseSoldiers = 0;
		this.defenseOfficers = 0;
		this.defenseRiders = 0;
		this.defenseGuardSoldiers = 0;
		this.defenseGuardRiders = 0;

		this.defenseShips = 0;
		this.defenseLightWarships = 0;
		this.defenseHeavyWarships = 0;
		this.defenseGuardShips = 0;
		var ctx = this;

		this.attackSide.forEach(function (item) {
			if (item.armyId < 200) {//footman army
				if (item.isGuard) {
					ctx.attackGuardSoldiers += item.count;
				} else {
					ctx.attackSoldiers += item.count;
				}
			} else if (item.armyId < 300) {//rider army
				if (item.isGuard) {
					ctx.attackGuardRiders += item.count;
				} else {
					ctx.attackRiders += item.count;
				}
			} else if (item.armyId < 400) {//navy
				if (item.isGuard) {
					ctx.attackGuardShips += item.count;
				} else {
					ctx.attackShips += item.count;
				}
				ctx.attackLightWarships += item.lkp;
				ctx.attackHeavyWarships += item.skp;
			}
			ctx.attackOfficers += item.leaders;
		});
		this.defenseSide.forEach(function (item) {
			if (item.armyId < 200) {//footman army
				if (item.isGuard) {
					ctx.defenseGuardSoldiers += item.count;
				} else {
					ctx.defenseSoldiers += item.count;
				}
			} else if (item.armyId < 300) {//rider army
				if (item.isGuard) {
					ctx.defenseGuardRiders += item.count;
				} else {
					ctx.defenseRiders += item.count;
				}
			} else if (item.armyId < 400) {//navy
				if (item.isGuard) {
					ctx.defenseGuardShips += item.count;
				} else {
					ctx.defenseShips += item.count;
				}
				ctx.defenseLightWarships += item.lkp;
				ctx.defenseHeavyWarships += item.skp;
			}
			ctx.defenseOfficers += item.leaders;
		});
	}

	this.updateDisplay = function () {
		if (this.attackSide.length === 0 || this.defenseSide.length === 0) {
			this.battleButton.disabled = true;
			this.battleButton.style.cursor = "not-allowed";
		} else {
			this.battleButton.disabled = false;
			this.battleButton.style.cursor = "initial";
		}

		this.attackList.innerHTML = "";
		this.attackSide.forEach(function (item, index) {
			var listItem = document.createElement("DIV");
			this.attackList.appendChild(listItem);
			listItem.classList.add("armyListItem");

			var div = document.createElement("DIV");
			div.classList.add("center");
			div.innerHTML = item.ownerTag() + " " + item.armyId;
			listItem.appendChild(div);

			var moveBtn = document.createElement("BUTTON");
			moveBtn.classList.add("armyListButton");
			moveBtn.classList.add("moveRightButton");
			moveBtn.onclick = this.removeFromAttack(index);
			listItem.appendChild(moveBtn);
		}, this);

		this.unsortedList.innerHTML = "";
		this.unsortedArmies.forEach(function (item, index) {
			var listItem = document.createElement("DIV");
			this.unsortedList.appendChild(listItem);
			listItem.classList.add("armyListItem");

			var moveLeftBtn = document.createElement("BUTTON");
			moveLeftBtn.classList.add("armyListButton");
			moveLeftBtn.classList.add("moveLeftButton");
			moveLeftBtn.onclick = this.moveToAttack(index);
			listItem.appendChild(moveLeftBtn);

			var div = document.createElement("DIV");
			div.classList.add("center");
			div.innerHTML = item.ownerTag() + " " + item.armyId;
			listItem.appendChild(div);

			var moveRightBtn = document.createElement("BUTTON");
			moveRightBtn.classList.add("armyListButton");
			moveRightBtn.classList.add("moveRightButton");
			moveRightBtn.onclick = this.moveToDefense(index);
			listItem.appendChild(moveRightBtn);
		}, this);

		this.defenseList.innerHTML = "";
		this.defenseSide.forEach(function (item, index) {
			var listItem = document.createElement("DIV");
			this.defenseList.appendChild(listItem);
			listItem.classList.add("armyListItem");

			var moveBtn = document.createElement("BUTTON");
			moveBtn.classList.add("armyListButton");
			moveBtn.classList.add("moveLeftButton");
			moveBtn.onclick = this.removeFromDefense(index);
			listItem.appendChild(moveBtn);

			var div = document.createElement("DIV");
			div.classList.add("center");
			div.innerHTML = item.ownerTag() + " " + item.armyId;
			listItem.appendChild(div);
		}, this);

		this.attackTroopCount.innerHTML = "";
		this.defenseTroopCount.innerHTML = "";
		if (this.attackShips + this.attackLightWarships + this.attackHeavyWarships + this.attackGuardShips > 0 ||
			this.defenseShips + this.defenseLightWarships + this.defenseHeavyWarships + this.defenseGuardShips > 0) {
			//naval combat
			if (this.attackShips > 0) { this.attackTroopCount.innerHTML += "<p>Shiffe: " + this.attackShips + "</p>"; }
			if (this.attackGuardShips > 0) { this.attackTroopCount.innerHTML += "<p>Gardeschiffe: " + this.attackGuardShips + "</p>"; }

			if (this.defenseShips > 0) { this.defenseTroopCount.innerHTML += "<p>Shiffe: " + this.defenseShips + "</p>"; }
			if (this.defenseGuardShips > 0) { this.defenseTroopCount.innerHTML += "<p>Gardeschiffe: " + this.defenseGuardShips + "</p>"; }
			if (this.defenseLightWarships > 0) { this.defenseTroopCount.innerHTML += "<p>Leichte Kreigsschiffe: " + this.defenseLightWarships + "</p>"; }
			if (this.defenseHeavyWarships > 0) { this.defenseTroopCount.innerHTML += "<p>Schwere Kriegsschiffe: " + this.defenseHeavyWarships + "</p>"; }
		} else {
			//land combat
			if (this.attackSoldiers > 0) { this.attackTroopCount.innerHTML += "<p>Soldaten: " + this.attackSoldiers + "</p>"; }
			if (this.attackRiders > 0) { this.attackTroopCount.innerHTML += "<p>Reiter: " + this.attackRiders + "</p>"; }
			if (this.attackGuardSoldiers > 0) { this.attackTroopCount.innerHTML += "<p>Gardesoldaten: " + this.attackGuardSoldiers + "</p>"; }
			if (this.attackGuardRiders > 0) { this.attackTroopCount.innerHTML += "<p>Gardereiter: " + this.attackGuardRiders + "</p>"; }

			if (this.defenseSoldiers > 0) { this.defenseTroopCount.innerHTML += "<p>Soldaten: " + this.defenseSoldiers + "</p>"; }
			if (this.defenseRiders > 0) { this.defenseTroopCount.innerHTML += "<p>Reiter: " + this.defenseRiders + "</p>"; }
			if (this.defenseGuardSoldiers > 0) { this.defenseTroopCount.innerHTML += "<p>Gardesoldaten: " + this.defenseGuardSoldiers + "</p>"; }
			if (this.defenseGuardRiders > 0) { this.defenseTroopCount.innerHTML += "<p>Gardereiter: " + this.defenseGuardRiders + "</p>"; }
		}
		if (this.attackOfficers > 0) { this.attackTroopCount.innerHTML += "<p>Heerführer: " + this.attackOfficers + "</p>"; }
		if (this.defenseOfficers > 0) { this.defenseTroopCount.innerHTML += "<p>Heerführer: " + this.defenseOfficers + "</p>"; }

		this.attackTroopCount.innerHTML += "<p>Würfelwurf: " + this.attackDice.value + "</p>";
		this.defenseTroopCount.innerHTML += "<p>Würfelwurf: " + this.defenseDice.value + "</p>";

		//Instant result preview (remove if not desired)
		this.battle = new schlacht(this.attackSide.map((val) => (val)), this.defenseSide.map((val) => (val)), [], [], this.x, this.y);
		var result = this.battle.result(parseInt(this.attackDice.value), parseInt(this.defenseDice.value));

		var attackFootLosses = result.attackerLosses.reduce((total, current, index) => {
			if (this.attackSide[index].armyType() === 1 && !this.attackSide[index].isGuard) { return total + Math.round(current); }
			else { return total; }
		}, 0);
		var attackCavLosses = result.attackerLosses.reduce((total, current, index) => {
			if (this.attackSide[index].armyType() === 2 && !this.attackSide[index].isGuard) { return total + Math.round(current); }
			else { return total; }
		}, 0);
		var attackFleetLosses = result.attackerLosses.reduce((total, current, index) => {
			if (this.attackSide[index].armyType() === 3 && !this.attackSide[index].isGuard) { return total + Math.round(current); }
			else { return total; }
		}, 0);
		var attackGuardFootLosses = result.attackerLosses.reduce((total, current, index) => {
			if (this.attackSide[index].armyType() === 1 && this.attackSide[index].isGuard) { return total + Math.round(current); }
			else { return total; }
		}, 0);
		var attackGuardCavLosses = result.attackerLosses.reduce((total, current, index) => {
			if (this.attackSide[index].armyType() === 2 && this.attackSide[index].isGuard) { return total + Math.round(current); }
			else { return total; }
		}, 0);
		var attackGuardFleetLosses = result.attackerLosses.reduce((total, current, index) => {
			if (this.attackSide[index].armyType() === 3 && this.attackSide[index].isGuard) { return total + Math.round(current); }
			else { return total; }
		}, 0);

		var defenseFootLosses = result.defenderLosses.reduce((total, current, index) => {
			if (this.defenseSide[index].armyType() === 1 && !this.defenseSide[index].isGuard) { return total + Math.round(current); }
			else { return total; }
		}, 0);
		var defenseCavLosses = result.defenderLosses.reduce((total, current, index) => {
			if (this.defenseSide[index].armyType() === 2 && !this.defenseSide[index].isGuard) { return total + Math.round(current); }
			else { return total; }
		}, 0);
		var defenseFleetLosses = result.defenderLosses.reduce((total, current, index) => {
			if (this.defenseSide[index].armyType() === 3 && !this.defenseSide[index].isGuard) { return total + Math.round(current); }
			else { return total; }
		}, 0);
		var defenseGuardFootLosses = result.defenderLosses.reduce((total, current, index) => {
			if (this.defenseSide[index].armyType() === 1 && this.defenseSide[index].isGuard) { return total + Math.round(current); }
			else { return total; }
		}, 0);
		var defenseGuardCavLosses = result.defenderLosses.reduce((total, current, index) => {
			if (this.defenseSide[index].armyType() === 2 && this.defenseSide[index].isGuard) { return total + Math.round(current); }
			else { return total; }
		}, 0);
		var defenseGuardFleetLosses = result.defenderLosses.reduce((total, current, index) => {
			if (this.defenseSide[index].armyType() === 3 && this.defenseSide[index].isGuard) { return total + Math.round(current); }
			else { return total; }
		}, 0);

		if (result.victor === 'attacker') {
			if (this.battle.overrunAttack()) {
				this.defenseTroopCount.innerHTML += "<p class=\"red\">Überrant!</p>";
			} else {
				this.defenseTroopCount.innerHTML += "<p class=\"red\">Besiegt!</p>";
				this.attackTroopCount.innerHTML = "";
				if (this.attackShips + this.attackLightWarships + this.attackHeavyWarships + this.attackGuardShips > 0 ||
					this.defenseShips + this.defenseLightWarships + this.defenseHeavyWarships + this.defenseGuardShips > 0) {
					//naval battle
					var lossProportion = ((attackFleetLosses + attackGuardFleetLosses) / (this.attackShips + this.attackGuardShips));
					var officerLosses = Math.round(lossProportion * this.attackOfficers);
					if (this.attackShips > 0) {
						this.attackTroopCount.innerHTML += "<div>Schiffe: " +
							this.attackShips + "<div class=\"red inline\"> -" + attackFleetLosses + "</div></div>";
					}
					if (this.attackGuardShips > 0) {
						this.attackTroopCount.innerHTML += "<div>Gardeschiffe: " +
							this.attackGuardShips + "<div class=\"red inline\"> -" + attackGuardFleetLosses + "</div></div>";
					}
					if (this.attackOfficers > 0) {
						this.attackTroopCount.innerHTML += "<div>Heerführer: " +
							this.attackOfficers + "<div class=\"red inline\"> -" + officerLosses + "</div></div>";
					}
				} else {
					//land battle
					var officerLosses = Math.round(((attackFootLosses + attackCavLosses + attackGuardFootLosses + attackGuardCavLosses) /
						(this.attackSoldiers + this.attackRiders + this.attackGuardSoldiers + this.attackGuardRiders)) * this.attackOfficers);
					if (this.attackSoldiers > 0) {
						this.attackTroopCount.innerHTML += "<div>Soldaten: " +
							this.attackSoldiers + "<div class=\"red inline\"> -" + attackFootLosses + "</div></div>";
					}
					if (this.attackRiders > 0) {
						this.attackTroopCount.innerHTML += "<div>Reiter: " +
							this.attackRiders + "<div class=\"red inline\"> -" + attackCavLosses + "</div></div>";
					}
					if (this.attackGuardSoldiers > 0) {
						this.attackTroopCount.innerHTML += "<div>Gardesoldaten: " +
							this.attackGuardSoldiers + "<div class=\"red inline\"> -" + attackGuardFootLosses + "</div></div>";
					}
					if (this.attackGuardRiders > 0) {
						this.attackTroopCount.innerHTML += "<div>Gardereiter: " +
							this.attackGuardRiders + "<div class=\"red inline\"> -" + attackGuardCavLosses + "</div></div>";
					}
					if (this.attackOfficers > 0) {
						this.attackTroopCount.innerHTML += "<div>Heerführer: " +
							this.attackOfficers + "<div class=\"red inline\"> -" + officerLosses + "</div></div>";
					}
				}
			}
		} else if (result.victor === 'defender') {
			if (this.battle.overrunDefense()) {
				this.attackTroopCount.innerHTML += "<p class=\"red\">Überrant!</p>";
			} else {
				this.attackTroopCount.innerHTML += "<p class=\"red\">Besiegt!</p>";
				this.defenseTroopCount.innerHTML = "";
				if (this.attackShips + this.attackLightWarships + this.attackHeavyWarships + this.attackGuardShips > 0 ||
					this.defenseShips + this.defenseLightWarships + this.defenseHeavyWarships + this.defenseGuardShips > 0) {
					//naval battle
					var lossProportion = ((defenseFleetLosses + defenseGuardFleetLosses) / (this.defenseShips + this.defenseGuardShips));
					var officerLosses = Math.round(lossProportion * this.defenseOfficers);
					var lightWarshipLosses = Math.round(lossProportion * this.defenseLightWarships);
					var heavyWarshipLosses = Math.round(lossProportion * this.defenseHeavyWarships);
					if (this.defenseShips > 0) {
						this.defenseTroopCount.innerHTML += "<div>Schiffe: " +
							this.defenseShips + "<div class=\"red inline\"> -" + defenseFleetLosses + "</div></div>";
					}
					if (this.defenseGuardShips > 0) {
						this.defenseTroopCount.innerHTML += "<div>Gardeschiffe: " +
							this.defenseGuardShips + "<div class=\"red inline\"> -" + defenseGuardFleetLosses + "</div></div>";
					}
					if (this.defenseLightWarships > 0) {
						this.defenseTroopCount.innerHTML += "<div>Leichte Kriegsschiffe: " +
							this.defenseLightWarships + "<div class=\"red inline\"> -" + lightWarshipLosses + "</div></div>";
					}
					if (this.defenseHeavyWarships > 0) {
						this.defenseTroopCount.innerHTML += "<div>Schwere Kriegsschiffe: " +
							this.defenseHeavyWarships + "<div class=\"red inline\"> -" + heavyWarshipLosses + "</div></div>";
					}
					if (this.defenseOfficers > 0) {
						this.defenseTroopCount.innerHTML += "<div>Heerführer: " +
							this.defenseOfficers + "<div class=\"red inline\"> -" + officerLosses + "</div></div>";
					}
				} else {
					//land battle
					var officerLosses = Math.round(((defenseFootLosses + defenseCavLosses + defenseGuardFootLosses + defenseGuardCavLosses) /
						(this.defenseSoldiers + this.defenseRiders + this.defenseGuardSoldiers + this.defenseGuardRiders)) * this.defenseOfficers);
					if (this.defenseSoldiers > 0) {
						this.defenseTroopCount.innerHTML += "<div>Soldaten: " +
							this.defenseSoldiers + "<div class=\"red inline\"> -" + defenseFootLosses + "</div></div>";
					}
					if (this.defenseRiders > 0) {
						this.defenseTroopCount.innerHTML += "<div>Reiter: " +
							this.defenseRiders + "<div class=\"red inline\"> -" + defenseCavLosses + "</div></div>";
					}
					if (this.defenseGuardSoldiers > 0) {
						this.defenseTroopCount.innerHTML += "<div>Gardesoldaten: " +
							this.defenseGuardSoldiers + "<div class=\"red inline\"> -" + defenseGuardFootLosses + "</div></div>";
					}
					if (this.defenseGuardRiders > 0) {
						this.defenseTroopCount.innerHTML += "<div>Gardereiter: " +
							this.defenseGuardRiders + "<div class=\"red inline\"> -" + defenseGuardCavLosses + "</div></div>";
					}
					if (this.defenseOfficers > 0) {
						this.defenseTroopCount.innerHTML += "<div>Heerführer: " +
							this.defenseOfficers + "<div class=\"red inline\"> -" + officerLosses + "</div></div>";
					}
				}
			}
		}
	}

	this.resolve = function () {
		this.battle = new schlacht(this.attackSide.map((val) => (val)), this.defenseSide.map((val) => (val)), [], [], this.x, this.y);
		if (this.battle.overrunAttack()) {
			this.attackSide.forEach(function (item) {
				item.remainingMovePoints -= 7;
				conquer(item);//try to conquer the land
			});
			this.defenseSide.forEach(function (item) {
				item.decimate(item.count);
			});
		} else if (this.battle.overrunDefense()) {
			this.attackSide.forEach(function (item) {
				item.decimate(item.count);
			});
		} else {
			var result = this.battle.result(parseInt(this.attackDice.value), parseInt(this.defenseDice.value));
			if (result.victor === 'attacker') {
				//wipe the looser out
				this.defenseSide.forEach(function (item) {
					item.decimate(item.count);
				});
				//null move points of the victor and inflict losses
				this.attackSide.forEach(function (item, index) {
					item.remainingMovePoints = 0;
					item.decimate(result.attackerLosses[index]);
					conquer(item);//try to conquer the land
				}, this);
			} else if (result.victor === 'defender') {
				//wipe the looser out
				this.attackSide.forEach(function (item) {
					item.decimate(item.count);
				});
				//null move points of the victor and inflict losses
				this.defenseSide.forEach(function (item, index) {
					item.decimate(result.defenderLosses[index]);
				}, this);
			} else if (result.victor === 'tie') {
				//wipe all combatants out
				this.attackSide.forEach(function (item) {
					item.decimate(item.count);
				});
				this.defenseSide.forEach(function (item) {
					item.decimate(item.count);
				});
			} else {
				console.log("Battle resolution error.");
			}
		}
		checkArmiesForLiveliness();
	}
}


function schlacht(armiesAttack, armiesDefense, charsAttack, charsDefense, posX, posY) {
	this.fieldType =
		(new showHex(posX, posY)).fieldType();
	//        fields.find((field) => (field.x === posX && field.y === posY)).type;

	this.armyArrayCount = function (armyArray) {
		return armyArray.filter((val) => (
			(val.armyType() === 3 && this.fieldType <= 1) || (this.fieldType >= 2 && val.armyType() <= 2)), this).
			reduce((total, elem) => (elem.count + total), 0);
	}

	this.overrunAttack = function () {
		return this.armyArrayCount(armiesAttack) >= 10 * this.armyArrayCount(armiesDefense) &&
			armiesDefense.filter((elem) => (elem.isGuard)).length === 0 && this.armyArrayCount(armiesAttack) > 0;
	}

	this.overrunDefense = function () {
		return 10 * this.armyArrayCount(armiesAttack) <= this.armyArrayCount(armiesDefense) &&
			armiesAttack.filter((elem) => (elem.isGuard)).length === 0 && this.armyArrayCount(armiesDefense) > 0;
	}

	this.terrainGP = function (army, attacker) {
		//TODO: home terrain bonus missing
		//BLOCKER: The home terrain of a realm isn't saved anywhere
		var fieldType = this.fieldType;
		var buildingsOnTheField = buildings.filter((current) => (current.x === posX && current.y === posY && current.type <= 4));
		if (buildingsOnTheField.length > 0) {
			if (attacker) { return 0; }
			if (buildingsOnTheField[0].realm !== army.owner) { return 50; }
			switch (buildingsOnTheField[0].type) {
				case 0: return 100;
				case 1: return 200;
				case 2: return 300;
				case 3: return 400;
				case 4: return 500;
			}
		} else {
			//TODO: home terrain bonus goes here
			if ((army.armyType() === 1 && (fieldType === 3 || fieldType === 8)) ||
				(army.armyType() === 2 && (fieldType === 2 || fieldType === 4 || fieldType === 7))) {
				return 140;
			} else { return 0; }
		}
	}

	this.characterGP = function (army) {
		//TODO: compute GP from own character fighting in battle.
		//BLOCKER: requires characters to know their realm allegiance.
		return 0;
	}

	this.directionalTerrainGP = function (army, attacker, attackingArmies) {
		let result = 0;
		let targetField = new showHex(army.x, army.y);
		if (attacker) {
			let startingField = new showHex(army.oldX, army.oldY);
			if (startingField.height() > targetField.height()) { result += 20; }//fighting downhill
			if (targetField.fieldType() === 7 || targetField.fieldType() === 8) { result += 20; }//attacking into swamp or desert
			if (startingField.fieldType() === 3) { result += 20; }//attacking out of a forest
			if (targetField.hasStreet()) { result += 20; }//attacking onto a street
		} else {
			let adjacentWalls = targetField.walls();
			let adjacentRivers = targetField.fluesse();
			let adjacentBridges = targetField.bridges();
			let neighbors = targetField.neighbors();
			let downhillBonus = false;
			let wallBonus = false;
			let bridgeBonus = false;
			let riverBonus = false;
			attackingArmies.forEach((attackingArmy) => {
				if ((new showHex(attackingArmy.oldX, attackingArmy.oldY)).height() < targetField.height()) {
					downhillBonus = true;
				}
				neighbors.forEach((neighbor, index) => {
					if (neighbor[0] === attackingArmy.oldX && neighbor[1] === attackingArmy.oldY) {
						if (adjacentWalls[index] === 1) { wallBonus = true; }
						if (adjacentRivers[index] === 1) {
							if (adjacentBridges[index] === 1) {
								bridgeBonus = true;
							} else {
								riverBonus = true;
							}
						}
					}
				});
			});
			result = downhillBonus ? 20 : 0 + wallBonus ? 50 : 0 + riverBonus ? 50 : 0 + bridgeBonus ? 30 : 0;
		}
		return result;
	}

	this.computeCombatRating = function (strengthArmy, totalArmyGP) {
		return strengthArmy.map((elem, index) => (elem * (1 + (totalArmyGP[index] / 200))));
	}

	this.computeLossFactor = function (ownForces, enemyForces, victorious) {
		var baseFactor = (ownForces / enemyForces) / 10;
		if (victorious && ownForces >= enemyForces) {
			return - baseFactor;
		} else if (victorious && ownForces < enemyForces) {
			return 0.2 - baseFactor;
		} else {
			return 0;
		}
	}

	this.computeFinalLosses = function (baseArmyLosses, armyGPDiff, armyStrength, totalStrength) {
		var lossesWithGP = 0;
		if (armyGPDiff >= 0) {
			lossesWithGP = baseArmyLosses / (1 + armyGPDiff);
		} else {
			lossesWithGP = baseArmyLosses * (1 - armyGPDiff);
		}
		return (lossesWithGP / totalStrength) * armyStrength;
	}

	this.result = function (attackRoll, defenseRoll) {
		var totalStrengthAttackerArmy = armiesAttack.map((elem) => (elem.count));
		var totalStrengthDefenderArmy = armiesDefense.map((elem) => {
			if (elem.armyType() === 3) {
				return elem.count + elem.lkp * 5 + elem.skp * 10;
			} else {
				return elem.count;
			}
		});

		var totalAttackerArmyGP = armiesAttack.map((elem) => (
			attackRoll + elem.leaderGp() + this.terrainGP(elem, true) + this.characterGP(elem) + this.directionalTerrainGP(elem, true, null)
		));
		var totalDefenderArmyGP = armiesDefense.map((elem) => (
			defenseRoll + elem.leaderGp() + this.terrainGP(elem, false) + this.characterGP(elem) + this.directionalTerrainGP(elem, false, armiesAttack)
		));

		var combatRatingAttackerArmy = this.computeCombatRating(totalStrengthAttackerArmy, totalAttackerArmyGP);
		var combatRatingDefenderArmy = this.computeCombatRating(totalStrengthDefenderArmy, totalDefenderArmyGP);

		var totalAttackerStrength = totalStrengthAttackerArmy.reduce((total, elem) => (total + elem), 0);
		var totalDefenderStrength = totalStrengthDefenderArmy.reduce((total, elem) => (total + elem), 0);

		var attackerTotalCombatRating = combatRatingAttackerArmy.reduce((total, elem) => (total + elem), 0);
		var defenderTotalCombatRating = combatRatingDefenderArmy.reduce((total, elem) => (total + elem), 0);

		var victor = '';
		if (this.overrunAttack() || attackerTotalCombatRating > defenderTotalCombatRating) {
			victor = 'attacker';
		} else if (this.overrunDefense() || attackerTotalCombatRating < defenderTotalCombatRating) {
			victor = 'defender';
		} else {
			victor = 'tie';
		}

		var attackerBaseLosses = totalDefenderStrength;
		var defenderBaseLosses = totalAttackerStrength;

		var attackerLossFactor = this.computeLossFactor(totalAttackerStrength, totalDefenderStrength, (victor === 'attacker'));
		var defenderLossFactor = this.computeLossFactor(totalDefenderStrength, totalAttackerStrength, (victor === 'defender'));

		//multiplication and subsequent division by 100 done for reasons of numerical stability
		var attackerNewBaseLosses = Math.floor((attackerBaseLosses * (100 + (attackerLossFactor * 100))) / 100);
		var defenderNewBaseLosses = Math.floor((defenderBaseLosses * (100 + (defenderLossFactor * 100))) / 100);

		var baseLossesAttackerArmy = totalStrengthAttackerArmy.map((elem) => ((elem / totalAttackerStrength) * attackerNewBaseLosses));
		var baseLossesDefenderArmy = totalStrengthDefenderArmy.map((elem) => ((elem / totalDefenderStrength) * defenderNewBaseLosses));

		var attackerMeanGP = ((attackerTotalCombatRating / totalAttackerStrength) - 1) * 100;
		var defenderMeanGP = ((defenderTotalCombatRating / totalDefenderStrength) - 1) * 100;

		var attackerGPDiffArmy = totalAttackerArmyGP.map((elem) => ((elem / 200) - (defenderMeanGP / 100)));
		var defenderGPDiffArmy = totalDefenderArmyGP.map((elem) => ((elem / 200) - (attackerMeanGP / 100)));

		var finalLossesAttackerArmy = baseLossesAttackerArmy.map((elem, index) => (
			this.computeFinalLosses(elem, attackerGPDiffArmy[index], totalStrengthAttackerArmy[index], totalStrengthAttackerArmy[index])
		));
		var finalLossesDefenderArmy = baseLossesDefenderArmy.map((elem, index) => (
			this.computeFinalLosses(elem, defenderGPDiffArmy[index], armiesDefense[index].count, totalStrengthDefenderArmy[index])
		));

		return { victor: victor, attackerLosses: finalLossesAttackerArmy, defenderLosses: finalLossesDefenderArmy };
	}
}


// array der Würfelergebnisse leichte, array der Würfelergebnisse schwere, badConditions("far"/"farAndUp"/"high"/null), 
// schießende Armee, ziel Armee, Charaktere und Zauberer auf dem Zielfeld
// TODO rüstorte vermindern Schaden
function fernkampf(dicerollsL, dicerollsS, badConditions, shooter, target, chars) {
	var charGpSum = 0;
	if (chars != null) {
		var cLen = chars.length;
		for (var i = 0; i < cLen; i++) {
			charGpSum += chars[i].gp;
		}
	}
	target.takeFire((shooter.fireLkp(dicerollsL, badConditions) + shooter.fireSkp(dicerollsS, badConditions)) / (1 + (target.leaderGp() + charGpSum) / 100));
}

// the splitArmy funtion of the split box
// TODO: If the army has moved, set the new split army's move points to the appropriate, non-max value.
function splitSelectedArmy() {
	if (login == 'guest') {
		window.alert("Zuschauer haben keine Rechte.");
		return false;
	}
	if (listOfArmies[selectedArmyIndex].isGuard) {
		window.alert("Garde Armeen können nicht geteilt werden.");
		return false;
	}
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
			window.alert("Es müssen mindestens 100 Heeresstärke beim Ursprungsheer verbleiben.")
			return false;
		}
		if (toSplit < 100) {
			window.alert("Es müssen mindestens 100 Heeresstärke abgespalten werden.")
			return false;
		}
		if (mountsToSplit > listOfArmies[selectedArmyIndex].mounts) {
			window.alert("So viele Reittiere hast du nicht.")
			return false;
		}
		if (lkpToSplit > listOfArmies[selectedArmyIndex].lkp) {
			window.alert("So viele leichte Katapulte hast du nicht.")
			return false;
		}
		if (skpToSplit > listOfArmies[selectedArmyIndex].skp) {
			window.alert("So viele schwere Katapulte hast du nicht.")
			return false;
		}
	}
	else if (listOfArmies[selectedArmyIndex].armyType() == 2) {
		toSplit = parseInt(document.getElementById("splitMountedInput").value);
		leadersToSplit = parseInt(document.getElementById("splitMountedLeadersInput").value);
		if (toSplit > (listOfArmies[selectedArmyIndex].count - 50)) {
			window.alert("Es müssen mindestens 100 Heeresstärke beim Ursprungsheer verbleiben.")
			return false;
		}
		if (toSplit < 50) {
			window.alert("Es müssen mindestens 100 Heeresstärke abgespalten werden. (50 Reiter)")
			return false;
		}
	}
	else if (listOfArmies[selectedArmyIndex].armyType() == 3) {
		toSplit = parseInt(document.getElementById("splitFleetInput").value);
		leadersToSplit = parseInt(document.getElementById("splitFleetLeadersInput").value);
		lkpToSplit = parseInt(document.getElementById("splitFleetLkpInput").value);
		skpToSplit = parseInt(document.getElementById("splitFleetSkpInput").value);
		if (toSplit > (listOfArmies[selectedArmyIndex].count - 1)) {
			window.alert("Es müssen mindestens 100 Heeresstärke beim Ursprungsheer verbleiben.")
			return false;
		}
		if (toSplit * 100 > (listOfArmies[selectedArmyIndex].currentCapacity())) {
			window.alert("Du kannst keine beladenen Schiffe abspalten.")
			return false;
		}
		if (toSplit < 1) {
			window.alert("Es müssen mindestens 100 Heeresstärke abgespalten werden. (1 Schiff)")
			return false;
		}
		if (lkpToSplit > listOfArmies[selectedArmyIndex].lkp) {
			window.alert("So viele leichte Kriegsschiffe hast du nicht.")
			return false;
		}
		if (skpToSplit > listOfArmies[selectedArmyIndex].skp) {
			window.alert("So viele schwere Kriegsschiffe hast du nicht.")
			return false;
		}
	}
	if (leadersToSplit > (listOfArmies[selectedArmyIndex].leaders - 1)) {
		window.alert("Es muss mindestens 1 Heerführer beim Ursprungsheer verbleiben.")
		return false;
	}
	if (leadersToSplit < 1) {
		window.alert("Es muss mindestens 1 Heerführer abgespalten werden.")
		return false;
	}
	if (listOfArmies[selectedArmyIndex].armyType() == 1) {
		var newArmyId = generateArmyId(1, listOfArmies[selectedArmyIndex].owner);
		var newArmy = new heer(newArmyId, toSplit, leadersToSplit, lkpToSplit, skpToSplit, mountsToSplit, false,
			listOfArmies[selectedArmyIndex].x, listOfArmies[selectedArmyIndex].y, listOfArmies[selectedArmyIndex].owner);
		listOfArmies.push(newArmy);
		listOfArmies[selectedArmyIndex].removeSoldiers(toSplit);
		listOfArmies[selectedArmyIndex].removeLeaders(leadersToSplit);
		listOfArmies[selectedArmyIndex].removeLkp(lkpToSplit);
		listOfArmies[selectedArmyIndex].removeSkp(skpToSplit);
		listOfArmies[selectedArmyIndex].removeMounts(mountsToSplit);
		preparedEvents.push({
			type: "split", content: {
				fromArmyId: listOfArmies[selectedArmyIndex].armyId,
				realm: listOfArmies[selectedArmyIndex].ownerTag(),
				troops: toSplit,
				leaders: leadersToSplit,
				lkp: lkpToSplit,
				skp: skpToSplit,
				mounts: mountsToSplit,
				x: listOfArmies[selectedArmyIndex].x,
				y: listOfArmies[selectedArmyIndex].y,
				newArmysId: newArmyId
			}
		});
	}
	if (listOfArmies[selectedArmyIndex].armyType() == 2) {
		var newArmyId = generateArmyId(2, listOfArmies[selectedArmyIndex].owner);
		var newArmy = new reiterHeer(newArmyId, toSplit, leadersToSplit, false,
			listOfArmies[selectedArmyIndex].x, listOfArmies[selectedArmyIndex].y, listOfArmies[selectedArmyIndex].owner);
		listOfArmies.push(newArmy);
		listOfArmies[selectedArmyIndex].removeSoldiers(toSplit);
		listOfArmies[selectedArmyIndex].removeLeaders(leadersToSplit);
		preparedEvents.push({
			type: "split", content: {
				fromArmyId: listOfArmies[selectedArmyIndex].armyId,
				realm: listOfArmies[selectedArmyIndex].ownerTag(),
				troops: toSplit,
				leaders: leadersToSplit,
				lkp: 0,
				skp: 0,
				mounts: 0,
				x: listOfArmies[selectedArmyIndex].x,
				y: listOfArmies[selectedArmyIndex].y,
				newArmysId: newArmyId
			}
		});
	}
	if (listOfArmies[selectedArmyIndex].armyType() == 3) {
		var newArmyId = generateArmyId(3, listOfArmies[selectedArmyIndex].owner);
		var newArmy = new seeHeer(newArmyId, toSplit, leadersToSplit, lkpToSplit,
			skpToSplit, false, listOfArmies[selectedArmyIndex].x, listOfArmies[selectedArmyIndex].y, listOfArmies[selectedArmyIndex].owner);
		listOfArmies.push(newArmy);
		listOfArmies[selectedArmyIndex].removeSoldiers(toSplit);
		listOfArmies[selectedArmyIndex].removeLeaders(leadersToSplit);
		listOfArmies[selectedArmyIndex].removeLkp(lkpToSplit);
		listOfArmies[selectedArmyIndex].removeSkp(skpToSplit);
		preparedEvents.push({
			type: "split", content: {
				fromArmyId: listOfArmies[selectedArmyIndex].armyId,
				realm: listOfArmies[selectedArmyIndex].ownerTag(),
				troops: toSplit,
				leaders: leadersToSplit,
				lkp: lkpToSplit,
				skp: skpToSplit,
				mounts: 0,
				x: listOfArmies[selectedArmyIndex].x,
				y: listOfArmies[selectedArmyIndex].y,
				newArmysId: newArmyId
			}
		});
	}
	restoreInfoBox();
	updateInfoBox();
}

// the mount function of the mount box
function mountSelected() {
	var toMount = document.getElementById("mountInput").value;
	var leadersToMount = document.getElementById("mountLeaderInput").value;
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
		newArmyId = generateArmyId(2, listOfArmies[armyIndex].owner);
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
	if (toMount != listOfArmies[armyIndex].count && leadersToMount === listOfArmies[armyIndex].leaders) {
		window.alert("Es muss mindestens ein Heerführer bei der Armee verbleiben.");
		return false;
	}
	// genug Truppen vorhanden?
	if (toMount != listOfArmies[armyIndex].count && (toMount * 2 > listOfArmies[armyIndex].raumpunkteOhneHf() - 100)) {
		window.alert("Es müssen alle aufsitzen, oder mindestens 100 Raumpunkte verbleiben");
		return false;
		// genug Reittiere vorhanden?
	}
	// genug Truppen vorhanden?
	if (toMount > listOfArmies[armyIndex].count) {
		window.alert("Du hast zu wenige Truppen zum aufsitzen");
		return false;
		// genug Reittiere vorhanden?
	}
	else if (toMount > listOfArmies[armyIndex].mounts) {
		window.alert("Du hast zu wenige Reittiere zum aufsitzen");
		return false;
		// Sitzen alle auf?
	}
	else if (toMount === listOfArmies[armyIndex].count) {
		// neues Reiterheer mit generierter Id an selben Koordinaten
		var newArmy = new reiterHeer(newArmyId, toMount,
			listOfArmies[armyIndex].leaders, listOfArmies[armyIndex].isGuard, listOfArmies[armyIndex].x,
			listOfArmies[armyIndex].y, listOfArmies[armyIndex].owner);
		newArmy.setRemainingHeightPoints(listOfArmies[armyIndex].remainingHeightPoints);
		if (listOfArmies[armyIndex].remainingMovePoints !== listOfArmies[armyIndex].startingMovepoints) {
			newArmy.setRemainingMovePoints(0);
		} else newArmy.setRemainingMovePoints(newArmy.startingMovepoints);
		// Nachricht, falls Katapulte vorhanden waren.
		if (listOfArmies[armyIndex].skp > 0 || listOfArmies[armyIndex].lkp > 0) {
			window.alert("Da kein Fußheer mehr bestehen bleibt, wurden die Katapulte zerstört.")
		}
		// in listOfArmies einfügen und alte Armee löschen, ist dann automatisch armyIndex
		listOfArmies.push(newArmy);
		//in preparedEvents pushen
		preparedEvents.push({
			type: "mount", content: {
				fromArmyId: listOfArmies[armyIndex].armyId,
				realm: listOfArmies[armyIndex].ownerTag(),
				troops: toMount,
				leaders: leadersToMount,
				x: listOfArmies[armyIndex].x,
				y: listOfArmies[armyIndex].y,
				newArmysId: newArmy.armyId
			}
		});
		deleteArmy(armyIndex);
		restoreInfoBox();
		drawStuff();
		updateInfoBox();
	}
	else if (leadersToMount >= listOfArmies[armyIndex].leaders) {
		window.alert("Du hast zu wenige Heerführer zum aufsitzen")
	}
	else if (listOfArmies[armyIndex].isGuard) {
		window.alert("Die Garde muss zusammen bleiben");
	}
	else {
		// neues Reiterheer mit generierter Id an selben Koordinaten
		var newArmy = new reiterHeer(newArmyId, toMount, leadersToMount, false,
			listOfArmies[armyIndex].x, listOfArmies[armyIndex].y, listOfArmies[selectedArmyIndex].owner);
		newArmy.setRemainingHeightPoints(listOfArmies[armyIndex].remainingHeightPoints);
		if (listOfArmies[armyIndex].remainingMovePoints !== listOfArmies[armyIndex].startingMovepoints) {
			newArmy.setRemainingMovePoints(0);
		} else newArmy.setRemainingMovePoints(newArmy.startingMovepoints);
		// zahlen im alten Heer anpassen
		listOfArmies[armyIndex].removeSoldiers(toMount);
		listOfArmies[armyIndex].removeLeaders(leadersToMount);
		listOfArmies[armyIndex].removeMounts(toMount);
		// in listOfArmies einfügen
		listOfArmies.push(newArmy);
		//in preparedEvents pushen
		preparedEvents.push({
			type: "mount", content: {
				fromArmyId: listOfArmies[armyIndex].armyId,
				realm: listOfArmies[armyIndex].ownerTag(),
				troops: toMount,
				leaders: leadersToMount,
				x: listOfArmies[armyIndex].x,
				y: listOfArmies[armyIndex].y,
				newArmysId: newArmy.armyId
			}
		});
		// selectedArmyIndex zeigt auf neues Heer
		selectedArmyIndex = listOfArmies.length - 1;
		drawStuff();
		restoreInfoBox();
		updateInfoBox();
	}
}

// the unMount function of the unMount box
function unMountSelected() {
	var toUnMount = document.getElementById("unMountInput").value;
	var leadersToUnMount = document.getElementById("unMountLeaderInput").value;
	unMountWithParams(selectedArmyIndex, toUnMount, leadersToUnMount, null);
}

// the unMount function of the unMount box
//TODO: If the mounted army has moved, set the new foot army's move points to the apropriate, non-max value.
function unMountWithParams(armyIndex, toUnMount, leadersToUnMount, newArmyId) {
	if (toUnMount === "" || leadersToUnMount === "" || toUnMount === null || leadersToUnMount === null) {
		window.alert("Alle felder müssen ausgefüllt sein");
		return false;
	}
	// generiere armyId falls keine vorhanden
	if (newArmyId === null) {
		newArmyId = generateArmyId(1, listOfArmies[armyIndex].owner);
	}
	// sitzen genug Truppen ab?
	if (toUnMount < 100) {
		window.alert("Es müssen mindestens 100 Truppen in einem Fußheer sein.");
		return false;
	}
	// bleibt ein hf be der Armee?
	if (toUnMount != listOfArmies[armyIndex].count && leadersToUnMount === listOfArmies[armyIndex].leaders) {
		window.alert("Es muss mindestens ein Heerführer bei der Armee verbleiben.");
		return false;
	}
	// genug Truppen vorhanden?
	if (toUnMount != listOfArmies[armyIndex].count && (toUnMount * 2 > listOfArmies[armyIndex].raumpunkteOhneHf() - 100)) {
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
	if (toUnMount > listOfArmies[armyIndex].count) {
		window.alert("So viele Truppen hast du nicht zum absitzen")
		return false;
		// genug Truppen vorhanden?
	} else if ((toUnMount == listOfArmies[armyIndex].count)) {
		// neues Heer mit generierter Id an selben Koordinaten
		var newArmy = new heer(newArmyId, toUnMount,
			listOfArmies[armyIndex].leaders, 0, 0, toUnMount, listOfArmies[armyIndex].isGuard,
			listOfArmies[armyIndex].x, listOfArmies[armyIndex].y, listOfArmies[armyIndex].owner);
		newArmy.setRemainingHeightPoints(listOfArmies[armyIndex].remainingHeightPoints);
		if (listOfArmies[armyIndex].remainingMovePoints !== listOfArmies[armyIndex].startingMovepoints) {
			newArmy.setRemainingMovePoints(0);
		} else newArmy.setRemainingMovePoints(newArmy.startingMovepoints);
		// in listOfArmies einfügen und alte Armee löschen, ist dann automatisch armyIndex
		listOfArmies.push(newArmy);
		if (listOfArmies[armyIndex].multiArmyField === true) {
			addToMultifield(listOfArmies[armyIndex], newArmy);
			deleteFromMultifield(listOfArmies[armyIndex]);
		}
		preparedEvents.push({
			type: "mount", content: {
				fromArmyId: listOfArmies[armyIndex].armyId,
				realm: listOfArmies[armyIndex].ownerTag(),
				troops: toUnMount,
				leaders: leadersToUnMount,
				x: listOfArmies[armyIndex].x,
				y: listOfArmies[armyIndex].y,
				newArmysId: newArmy.armyId
			}
		});
		deleteArmy(armyIndex);
		drawStuff();
		restoreInfoBox();
		updateInfoBox();
		// genug Heerführer?
	} else if (leadersToUnMount >= listOfArmies[armyIndex].leaders) {
		window.alert("Du hast zu wenige Heerführer zum absitzen");
	} else if (listOfArmies[armyIndex].isGuard) {
		window.alert("Die Garde muss zusammen bleiben");
	} else {
		// neues Heer mit generierter Id an selben Koordinaten
		var newArmy = new heer(newArmyId, toUnMount, leadersToUnMount, 0, 0,
			toUnMount, false, listOfArmies[armyIndex].x, listOfArmies[armyIndex].y, listOfArmies[armyIndex].owner);
		newArmy.setRemainingHeightPoints(listOfArmies[armyIndex].remainingHeightPoints);
		if (listOfArmies[armyIndex].remainingMovePoints !== listOfArmies[armyIndex].startingMovepoints) {
			newArmy.setRemainingMovePoints(0);
		}  else newArmy.setRemainingMovePoints(newArmy.startingMovepoints);
		// zahlen im alten Reiterheer anpassen
		listOfArmies[armyIndex].removeSoldiers(toUnMount);
		listOfArmies[armyIndex].removeLeaders(leadersToUnMount);
		// in listOfArmies einfügen
		listOfArmies.push(newArmy);
		if (listOfArmies[armyIndex].multiArmyField === true) {
			addToMultifield(listOfArmies[armyIndex], newArmy);
			deleteFromMultifield(listOfArmies[armyIndex]);
		}
		preparedEvents.push({
			type: "mount", content: {
				fromArmyId: listOfArmies[armyIndex].armyId,
				realm: listOfArmies[armyIndex].ownerTag(),
				troops: toUnMount,
				leaders: leadersToUnMount,
				x: listOfArmies[armyIndex].x,
				y: listOfArmies[armyIndex].y,
				newArmysId: newArmy.armyId
			}
		});
		// armyIndex zeigt auf neues Heer
		selectedArmyIndex = listOfArmies.length - 1;
		drawStuff();
		restoreInfoBox();
		updateInfoBox();
	}
}

function allMountSelected() {
	mountWithParams(selectedArmyIndex, listOfArmies[selectedArmyIndex].count, listOfArmies[selectedArmyIndex].leaders, null);
}

function allUnMountSelected() {
	unMountWithParams(selectedArmyIndex, listOfArmies[selectedArmyIndex].count, listOfArmies[selectedArmyIndex].leaders, null);
}

// move troops or leaders from selectedArmyIndex to the army at position mergeId in listOfArmies
function transferTroopsFromSelectedArmy(mergeId) {
	var toSplit = 0;
	var leadersToSplit = 0;
	var mountsToSplit = 0;
	var lkpToSplit = 0;
	var skpToSplit = 0;
	// depending on army type different fields are needed
	if (listOfArmies[selectedArmyIndex].armyType() === 1) {
		toSplit = parseInt(document.getElementById("splitInput").value);
		leadersToSplit = parseInt(document.getElementById("splitLeadersInput").value);
		mountsToSplit = parseInt(document.getElementById("splitMountsInput").value);
		lkpToSplit = parseInt(document.getElementById("splitLkpInput").value);
		skpToSplit = parseInt(document.getElementById("splitSkpInput").value);
		if (toSplit >= 0 && leadersToSplit >= 0 && mountsToSplit >= 0 && lkpToSplit >= 0 && skpToSplit >= 0) {
			listOfArmies[selectedArmyIndex].count -= toSplit;
			listOfArmies[mergeId].count += toSplit;
			listOfArmies[selectedArmyIndex].leaders -= leadersToSplit;
			listOfArmies[mergeId].leaders += leadersToSplit;
			listOfArmies[selectedArmyIndex].mounts -= mountsToSplit;
			listOfArmies[mergeId].mounts += mountsToSplit;
			listOfArmies[selectedArmyIndex].lkp -= lkpToSplit;
			listOfArmies[mergeId].lkp += lkpToSplit;
			listOfArmies[selectedArmyIndex].skp -= skpToSplit;
			listOfArmies[mergeId].skp += skpToSplit;
			if (leadersToSplit > 0 && listOfArmies[selectedArmyIndex].remainingMovePoints < listOfArmies[selectedArmyIndex].startingMovepoints()) {
				listOfArmies[mergeId].setRemainingMovePoints(0);
			} else if (listOfArmies[selectedArmyIndex].remainingMovePoints < listOfArmies[mergeId].remainingMovePoints) {
				listOfArmies[mergeId].setRemainingMovePoints(listOfArmies[selectedArmyIndex].remainingMovePoints);
			}
			if (listOfArmies[selectedArmyIndex].remainingHeightPoints < listOfArmies[mergeId].remainingHeightPoints) {
				console.log
				listOfArmies[mergeId].setRemainingHeightPoints(listOfArmies[selectedArmyIndex].remainingHeightPoints);

			}
			preparedEvents.push({
				type: "transfer", content: {
					fromArmyId: listOfArmies[selectedArmyIndex].armyId,
					toArmyId: listOfArmies[mergeId].armyId,
					realm: listOfArmies[selectedArmyIndex].ownerTag(),
					troops: toSplit,
					leaders: leadersToSplit,
					lkp: lkpToSplit,
					skp: skpToSplit,
					mounts: mountsToSplit,
					x: listOfArmies[selectedArmyIndex].x,
					y: listOfArmies[selectedArmyIndex].y
				}
			});
		} else {
			window.alert("Es müssen positive Werte abgespalten werden");
			return false;
		}
	}
	else if (listOfArmies[selectedArmyIndex].armyType() === 2) {
		toSplit = parseInt(document.getElementById("splitMountedInput").value);
		leadersToSplit = parseInt(document.getElementById("splitMountedLeadersInput").value);
		if (toSplit >= 0 && leadersToSplit >= 0) {
			listOfArmies[selectedArmyIndex].count -= toSplit;
			listOfArmies[mergeId].count += toSplit;
			listOfArmies[selectedArmyIndex].leaders -= leadersToSplit;
			listOfArmies[mergeId].leaders += leadersToSplit;
			listOfArmies[selectedArmyIndex].lkp -= lkpToSplit;
			listOfArmies[mergeId].lkp += lkpToSplit;
			listOfArmies[selectedArmyIndex].skp -= skpToSplit;
			listOfArmies[mergeId].skp += skpToSplit;

			if (leadersToSplit > 0 && listOfArmies[selectedArmyIndex].remainingMovePoints < listOfArmies[selectedArmyIndex].startingMovepoints()) {
				listOfArmies[mergeId].setRemainingMovePoints(0);
			} else if (listOfArmies[selectedArmyIndex].remainingMovePoints < listOfArmies[mergeId].remainingMovePoints) {
				listOfArmies[mergeId].setRemainingMovePoints(listOfArmies[selectedArmyIndex].remainingMovePoints);
			}
			if (listOfArmies[selectedArmyIndex].remainingHeightPoints < listOfArmies[mergeId].remainingHeightPoints) {
				listOfArmies[mergeId].setRemainingHeightPoints(listOfArmies[selectedArmyIndex].remainingHeightPoints);
			}
			preparedEvents.push({
				type: "transfer", content: {
					fromArmyId: listOfArmies[selectedArmyIndex].armyId,
					toArmyId: listOfArmies[mergeId].armyId,
					realm: listOfArmies[selectedArmy].ownerTag(),
					troops: toSplit,
					leaders: leadersToSplit,
					lkp: 0,
					skp: 0,
					mounts: 0,
					x: listOfArmies[selectedArmyIndex].x,
					y: listOfArmies[selectedArmyIndex].y
				}
			});
		} else {
			window.alert("Es müssen positive Werte abgespalten werden");
			return false;
		}
	}
	else if (listOfArmies[selectedArmyIndex].armyType() === 3) {
		toSplit = parseInt(document.getElementById("splitFleetInput").value);
		leadersToSplit = parseInt(document.getElementById("splitFleetLeadersInput").value);
		lkpToSplit = parseInt(document.getElementById("splitFleetLkpInput").value);
		skpToSplit = parseInt(document.getElementById("splitFleetSkpInput").value);
		if (toSplit >= 0 && leadersToSplit >= 0 && lkpToSplit >= 0 && skpToSplit >= 0) {
			listOfArmies[selectedArmyIndex].count -= toSplit;
			listOfArmies[mergeId].count += toSplit;
			listOfArmies[selectedArmyIndex].leaders -= leadersToSplit;
			listOfArmies[mergeId].leaders += leadersToSplit;
			listOfArmies[selectedArmyIndex].lkp -= lkpToSplit;
			listOfArmies[mergeId].lkp += lkpToSplit;
			listOfArmies[selectedArmyIndex].skp -= skpToSplit;
			listOfArmies[mergeId].skp += skpToSplit;
			if (leadersToSplit > 0 && listOfArmies[selectedArmyIndex].remainingMovePoints < listOfArmies[selectedArmyIndex].startingMovepoints()) {
				listOfArmies[mergeId].setRemainingMovePoints(0);
			} else if (listOfArmies[selectedArmyIndex].remainingMovePoints < listOfArmies[mergeId].remainingMovePoints) {
				listOfArmies[mergeId].setRemainingMovePoints(listOfArmies[selectedArmyIndex].remainingMovePoints);
			}
			if (listOfArmies[selectedArmyIndex].remainingHeightPoints < listOfArmies[mergeId].remainingHeightPoints) {
				listOfArmies[mergeId].setRemainingHeightPoints(listOfArmies[selectedArmyIndex].remainingHeightPoints);
			}
			preparedEvents.push({
				type: "transfer", content: {
					fromArmyId: listOfArmies[selectedArmyIndex].armyId,
					toArmyId: listOfArmies[mergeId].armyId,
					realm: listOfArmies[selectedArmyIndex].ownerTag(),
					troops: toSplit,
					leaders: leadersToSplit,
					lkp: lkpToSplit,
					skp: skpToSplit,
					mounts: 0,
					x: listOfArmies[selectedArmyIndex].x,
					y: listOfArmies[selectedArmyIndex].y
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

// merges selectedArmy with the army at position mergeId in listOfArmies
function mergeSelectedArmy(mergeId) {
	// depending on army type different fields are needed
	if (listOfArmies[selectedArmyIndex].armyType() === 1) {
		listOfArmies[mergeId].count += listOfArmies[selectedArmyIndex].count;
		listOfArmies[mergeId].leaders += listOfArmies[selectedArmyIndex].leaders;
		listOfArmies[mergeId].mounts += listOfArmies[selectedArmyIndex].mounts;
		listOfArmies[mergeId].lkp += listOfArmies[selectedArmyIndex].lkp;
		listOfArmies[mergeId].skp += listOfArmies[selectedArmyIndex].skp;
		if (listOfArmies[selectedArmyIndex].remainingMovePoints < listOfArmies[mergeId].remainingMovePoints) {
			listOfArmies[mergeId].setRemainingMovePoints(listOfArmies[selectedArmyIndex].remainingMovePoints);
		}
		if (listOfArmies[selectedArmyIndex].remainingHeightPoints < listOfArmies[mergeId].remainingHeightPoints) {
			listOfArmies[mergeId].setRemainingHeightPoints(listOfArmies[selectedArmyIndex].remainingHeightPoints);
		}
		preparedEvents.push({
			type: "merge", content: {
				fromArmyId: listOfArmies[selectedArmyIndex].armyId,
				toArmyId: listOfArmies[mergeId].armyId,
				realm: listOfArmies[selectedArmyIndex].ownerTag(),
				troops: listOfArmies[selectedArmyIndex].count,
				leaders: listOfArmies[selectedArmyIndex].leaders,
				lkp: listOfArmies[selectedArmyIndex].lkp,
				skp: listOfArmies[selectedArmyIndex].skp,
				mounts: listOfArmies[selectedArmyIndex].mounts,
				x: listOfArmies[selectedArmyIndex].x,
				y: listOfArmies[selectedArmyIndex].y
			}
		});
		deleteArmy(selectedArmyIndex);
	}
	else if (listOfArmies[selectedArmyIndex].armyType() === 2) {
		listOfArmies[mergeId].count += listOfArmies[selectedArmyIndex].count;
		listOfArmies[mergeId].leaders += listOfArmies[selectedArmyIndex].leaders;
		if (listOfArmies[selectedArmyIndex].remainingMovePoints < listOfArmies[mergeId].remainingMovePoints) {
			listOfArmies[mergeId].setRemainingMovePoints(listOfArmies[selectedArmyIndex].remainingMovePoints);
		}
		if (listOfArmies[selectedArmyIndex].remainingHeightPoints < listOfArmies[mergeId].remainingHeightPoints) {
			listOfArmies[mergeId].setRemainingHeightPoints(listOfArmies[selectedArmyIndex].remainingHeightPoints);
		}
		preparedEvents.push({
			type: "merge", content: {
				fromArmyId: listOfArmies[selectedArmyIndex].armyId,
				toArmyId: listOfArmies[mergeId].armyId,
				realm: listOfArmies[selectedArmyIndex].ownerTag(),
				troops: listOfArmies[selectedArmyIndex].count,
				leaders: listOfArmies[selectedArmyIndex].leaders,
				lkp: 0,
				skp: 0,
				mounts: 0,
				x: listOfArmies[selectedArmyIndex].x,
				y: listOfArmies[selectedArmyIndex].y
			}
		});
		deleteArmy(selectedArmyIndex)();
	}
	else if (listOfArmies[selectedArmyIndex].armyType() === 3) {
		listOfArmies[mergeId].count += listOfArmies[selectedArmyIndex].count;
		listOfArmies[mergeId].leaders += listOfArmies[selectedArmyIndex].leaders;
		listOfArmies[mergeId].lkp += listOfArmies[selectedArmyIndex].lkp;
		listOfArmies[mergeId].skp += listOfArmies[selectedArmyIndex].skp;
		listOfArmies[mergeId].loadedArmies = listOfArmies[mergeId].loadedArmies.concat(listOfArmies[selectedArmyIndex].loadedArmies);
		if (listOfArmies[selectedArmyIndex].remainingMovePoints < listOfArmies[mergeId].remainingMovePoints) {
			listOfArmies[mergeId].setRemainingMovePoints(listOfArmies[selectedArmyIndex].remainingMovePoints);
		}
		if (listOfArmies[selectedArmyIndex].remainingHeightPoints < listOfArmies[mergeId].remainingHeightPoints) {
			listOfArmies[mergeId].setRemainingHeightPoints(listOfArmies[selectedArmyIndex].remainingHeightPoints);
		}
		console.log("the loaded armies in the new fleet are:");
		console.log(listOfArmies[mergeId].loadedArmies);
		if (listOfArmies[selectedArmyIndex].loadedArmies.length > 0) {
			console.log("id = " + listOfArmies[selectedArmyIndex].loadedArmies[i]);
			for (var j = 0; j < listOfArmies[selectedArmyIndex].loadedArmies.length; j++) {
				for (var i = 0; i < listOfArmies.length; i++) {
					if (listOfArmies[selectedArmyIndex].loadedArmies[j] == listOfArmies[i].armyId &&
						listOfArmies[mergeId].owner == listOfArmies[i].owner) {
						console.log(listOfArmies[i].armyId + " was loaded in " + listOfArmies[i].isLoadedIn + ",");
						listOfArmies[i].isLoadedIn = listOfArmies[mergeId].armyId;
						console.log("but is now loaded in " + listOfArmies[i].isLoadedIn + ".");
					}
				}
			}
		}
		for (var j = 0; j < listOfArmies[mergeId].loadedArmies.length; j++) {
			for (var i = 0; i < listOfArmies.length; i++) {
				if (listOfArmies[mergeId].loadedArmies[j] == listOfArmies[i].armyId &&
					listOfArmies[mergeId].owner == listOfArmies[i].owner) {
					console.log(listOfArmies[i].armyId + " is loaded in " + listOfArmies[i].isLoadedIn + ".");
				}
			}
		}
		preparedEvents.push({
			type: "merge", content: {
				fromArmyId: listOfArmies[selectedArmyIndex].armyId,
				toArmyId: listOfArmies[mergeId].armyId,
				realm: listOfArmies[selectedArmyIndex].ownerTag(),
				troops: listOfArmies[selectedArmyIndex].count,
				leaders: listOfArmies[selectedArmyIndex].leaders,
				lkp: 0,
				skp: 0,
				mounts: 0,
				x: listOfArmies[selectedArmyIndex].x,
				y: listOfArmies[selectedArmyIndex].y
			}
		});
		deleteArmy(selectedArmyIndex)();
	}
	if (mergeId = listOfArmies.length) {
		mergeId -= 1;
	}
	selectedArmyIndex = mergeId;
	updateInfoBox();
	restoreInfoBox();
}

function deleteArmy(index) {
	listOfArmies.splice(index, 1);
	if (selectedArmyIndex === listOfArmies.length) {
		selectedArmyIndex = undefined;
	}
}

// returns the next armyId not yet assigned for the caller
function generateArmyId(type, owner) {
	if (type == 1) {
		var j = 101;
		while (j < 200) {
			var found = false;
			for (var i = 0; i < listOfArmies.length; i++) {
				if (listOfArmies[i].armyId == j && listOfArmies[i].owner == owner) {
					j++;
					found = true;
				}
			}
			if (found == false) {
				return j;
			}
		}
		window.alert("Du hast die maximale Anzahl an Fußheeren erreicht.")
		return false;
	} else if (type == 2) {
		var j = 201;
		while (j < 300) {
			var found = false;
			for (var i = 0; i < listOfArmies.length; i++) {
				if (listOfArmies[i].armyId == j && listOfArmies[i].owner == owner) {
					j++;
					found = true;
				}
			}
			if (found == false) {
				return j;
			}
		}
		window.alert("Du hast die maximale Anzahl an Reiterheeren erreicht.")
		return false;
	} else if (type == 3) {
		var j = 301;
		while (j < 400) {
			var found = false;
			for (var i = 0; i < listOfArmies.length; i++) {
				if (listOfArmies[i].armyId == j && listOfArmies[i].owner == owner) {
					j++;
					found = true;
				}
			}
			if (found == false) {
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
	listOfArmies = listOfArmies.filter((armyCoord) => (armyCoord.isAlive()));
}