class BattleHandler {
    unsortedArmies: Army[];
    attackerArmies: Army[] = [];
    defenderArmies: Army[] = [];
    location: [number, number];

    constructor(participants: Army[], location: [number, number]){
        this.unsortedArmies = participants;
        this.location = location;
    }

    resolve(attackDie, defenceDie): void{
        let battleResult: BattleResult = this.calculateResult(this.attackerArmies.map((val) => (val)),
            this.defenderArmies.map((val) => (val)), [], [], this.location, attackDie, defenceDie);
        if (battleResult.result === Result.ATTACKER_OVERRUN) {
            this.attackerArmies.forEach(function (item) {
                item.setMovePoints(item.getMovePoints() -7);
                item.conquer();//try to conquer the land
            });
            this.defenderArmies.forEach(function (item) {
                item.takeDamage(item.getTroopCount());
            });
        } else if (battleResult.result === Result.DEFENDER_OVERRUN) {
            this.attackerArmies.forEach(function (item) {
                item.takeDamage(item.getTroopCount());
            });
        } else {
            if (battleResult.result === Result.ATTACKER_VICTORY) {
                //wipe the looser out
                this.defenderArmies.forEach(function (item) {
                    item.takeDamage(item.getTroopCount());
                });
                //null move points of the victor and inflict losses
                this.attackerArmies.forEach(function (item, index) {
                    item.setMovePoints(0);
                    item.takeDamage(battleResult.attackerLosses[index]);
                    item.conquer();//try to conquer the land
                }, this);
            } else if (battleResult.result === Result.DEFENDER_VICTORY) {
                //wipe the looser out
                this.attackerArmies.forEach(function (item) {
                    item.takeDamage(item.getTroopCount());
                });
                //null move points of the victor and inflict losses
                this.defenderArmies.forEach(function (item, index) {
                    item.takeDamage(battleResult.defenderLosses[index]);
                }, this);
            } else if (battleResult.result === Result.TIE) {
                //wipe all combatants out
                this.attackerArmies.forEach(function (item) {
                    item.takeDamage(item.getTroopCount());
                });
                this.defenderArmies.forEach(function (item) {
                    item.takeDamage(item.getTroopCount());
                });
            } else {
                console.log("Battle resolution error.");
            }
        }
        GameState.purgeDeadArmies();
    }

    private static armyArrayCount(armyArray: Army[], fieldType: FieldType) {
        return armyArray.filter((val) => (
            (val instanceof Fleet && fieldType <= 1) || (fieldType >= 2 && val instanceof LandArmy)), this).
        reduce((total, elem) => (elem.getTroopCount() + total), 0);
    }

    private static terrainGP(army: Army, attacker: boolean, fieldType: FieldType, location: [number, number]): number {
        let buildingsOnTheField = GameState.buildings.filter(current =>
            (current.getPosition()[0] === location[0] && current.getPosition()[1] === location[1] && current.type <= 4));
        if (buildingsOnTheField.length > 0) { //production buildings on field negate usual terrain bonus
            if (attacker) { return 0; }
            if (buildingsOnTheField[0].owner !== army.owner) { return 50; }
            switch (buildingsOnTheField[0].type) {
                case 0: return 100;
                case 1: return 200;
                case 2: return 300;
                case 3: return 400;
                case 4: return 500;
                default: return 0;
            }
        } else { //usual terrain bonus applies
            let terrainGPBonus = 0;
            let homeTurf = GameState.realms.find(realm => (realm === army.owner)).homeTurf;
            if(homeTurf === fieldType || (homeTurf === FieldType.HIGHLANDS && fieldType === FieldType.MOUNTAINS) ||
                (homeTurf === FieldType.MOUNTAINS && fieldType === FieldType.HIGHLANDS)) { //home terrain bonus applies
                terrainGPBonus += 50;
            }
            if ((army instanceof FootArmy && (fieldType === FieldType.WOODS || fieldType === FieldType.SWAMP)) ||
                (army instanceof RiderArmy && (fieldType === FieldType.LOWLANDS || fieldType === FieldType.HILLS ||
                    fieldType === FieldType.DESERT))) { //footmen/rider terrain bonus
                terrainGPBonus += 140;
            }
            return terrainGPBonus;
        }
    }

    private static characterGP(army: Army, characters: any[]): number {
        //TODO: compute GP from own character fighting in battle.
        //BLOCKER: requires characters to be a thing.
        return 0;
    }

    private static directionalTerrainGP(army: Army, attacker: boolean, attackingArmies: Army[]): number {
        let result = 0;
        let armyPosition: [number, number] = army.getPosition();
        let oldArmyPosition: [number, number] = army.getOldPosition();
        if (attacker) {
            if (HexFunction.height(oldArmyPosition[0], oldArmyPosition[1]) >
                HexFunction.height(armyPosition[0], armyPosition[1])) { result += 20; }//fighting downhill
            if (HexFunction.fieldType(armyPosition[0], armyPosition[1]) === FieldType.DESERT ||
                HexFunction.fieldType(armyPosition[0], armyPosition[1]) === FieldType.SWAMP) { result += 20; }//attacking into swamp or desert
            if (HexFunction.fieldType(oldArmyPosition[0], oldArmyPosition[1]) === FieldType.WOODS) { result += 20; }//attacking out of a forest
            if (HexFunction.hasStreet(armyPosition[0], armyPosition[1])) { result += 20; }//attacking onto a street
        } else {
            let adjacentWalls = HexFunction.walls(armyPosition[0], armyPosition[1]);
            let adjacentRivers = HexFunction.fluesse(armyPosition[0], armyPosition[1]);
            let adjacentBridges = HexFunction.bridges(armyPosition[0], armyPosition[1]);
            let neighbor = HexFunction.neighbors(armyPosition[0], armyPosition[1]);
            let downhillBonus = false;
            let wallBonus = false;
            let bridgeBonus = false;
            let riverBonus = false;
            attackingArmies.forEach((attackingArmy) => {
                if (HexFunction.height(oldArmyPosition[0], oldArmyPosition[1]) < HexFunction.height(armyPosition[0], armyPosition[1])) {
                    downhillBonus = true;
                }
                neighbor.forEach((neighbor, index) => {
                    if (neighbor[0] === oldArmyPosition[0] && neighbor[1] === oldArmyPosition[1]) {
                        if (adjacentWalls[index] === true) { wallBonus = true; }
                        if (adjacentRivers[index] === true) {
                            if (adjacentBridges[index] === true) {
                                bridgeBonus = true;
                            } else {
                                riverBonus = true;
                            }
                        }
                    }
                });
            });
            result = (downhillBonus ? 20 : 0) + (wallBonus ? 50 : 0) + (riverBonus ? 50 : 0) + (bridgeBonus ? 30 : 0);
        }
        return result;
    }

    private static computeCombatRating(strengthArmy, totalArmyGP): number[] {
        return strengthArmy.map((elem, index) => (elem * (1 + (totalArmyGP[index] / 200))));
    }

    private static computeLossFactor(ownForces, enemyForces, victorious): number {
        let baseFactor = (ownForces / enemyForces) / 10;
        if (victorious && ownForces >= enemyForces) {
            return - baseFactor;
        } else if (victorious && ownForces < enemyForces) {
            return 0.2 - baseFactor;
        } else {
            return 0;
        }
    }

    private static computeFinalLosses(baseArmyLosses, armyGPDiff, armyStrength, totalStrength): number {
        let lossesWithGP = 0;
        if (armyGPDiff >= 0) {
            lossesWithGP = baseArmyLosses / (1 + armyGPDiff);
        } else {
            lossesWithGP = baseArmyLosses * (1 - armyGPDiff);
        }
        return (lossesWithGP / totalStrength) * armyStrength;
    }

    calculateResult(armiesAttack: Army[], armiesDefense: Army[], charsAttack: MobileEntity[], charsDefense: MobileEntity[],
                    location: [number, number], attackDieRoll: number, defenseDieRoll: number): BattleResult {
        let fieldType: FieldType = HexFunction.fieldType(location[0], location[1]);

        let overrunAttack = BattleHandler.armyArrayCount(armiesAttack, fieldType) >=
                10 * BattleHandler.armyArrayCount(armiesDefense, fieldType) &&
            armiesDefense.filter((elem) => (elem.isGuard)).length === 0 &&
            BattleHandler.armyArrayCount(armiesAttack, fieldType) > 0;

        let overrunDefense = 10 * BattleHandler.armyArrayCount(armiesAttack, fieldType) <=
                BattleHandler.armyArrayCount(armiesDefense, fieldType) &&
            armiesAttack.filter((elem) => (elem.isGuard)).length === 0 &&
            BattleHandler.armyArrayCount(armiesDefense, fieldType) > 0;

        let totalStrengthAttackerArmy = armiesAttack.map((elem) => (elem.getTroopCount()));
        let totalStrengthDefenderArmy = armiesDefense.map((elem) => {
            if (elem instanceof Fleet) {
                return elem.getTroopCount() + elem.getLightCatapultCount() * 5 + elem.getHeavyCatapultCount() * 10;
            } else {
                return elem.getTroopCount();
            }
        });

        let totalAttackerArmyGP = armiesAttack.map((elem) => (
            attackDieRoll + elem.leaderGp() + BattleHandler.terrainGP(elem, true, fieldType, location) +
            BattleHandler.characterGP(elem, charsAttack) + BattleHandler.directionalTerrainGP(elem, true, null)
        ));
        let totalDefenderArmyGP = armiesDefense.map((elem) => (
            defenseDieRoll + elem.leaderGp() + BattleHandler.terrainGP(elem, false, fieldType, location) +
            BattleHandler.characterGP(elem, charsDefense) + BattleHandler.directionalTerrainGP(elem, false, armiesAttack)
        ));

        let combatRatingAttackerArmy = BattleHandler.computeCombatRating(totalStrengthAttackerArmy, totalAttackerArmyGP);
        let combatRatingDefenderArmy = BattleHandler.computeCombatRating(totalStrengthDefenderArmy, totalDefenderArmyGP);

        let totalAttackerStrength = totalStrengthAttackerArmy.reduce((total, elem) => (total + elem), 0);
        let totalDefenderStrength = totalStrengthDefenderArmy.reduce((total, elem) => (total + elem), 0);

        let attackerTotalCombatRating = combatRatingAttackerArmy.reduce((total, elem) => (total + elem), 0);
        let defenderTotalCombatRating = combatRatingDefenderArmy.reduce((total, elem) => (total + elem), 0);

        let result: Result;
        if (overrunAttack) {
            result = Result.ATTACKER_OVERRUN;
        } else if (attackerTotalCombatRating > defenderTotalCombatRating) {
            result = Result.ATTACKER_VICTORY;
        } else if (overrunDefense) {
            result = Result.DEFENDER_OVERRUN;
        } else if (attackerTotalCombatRating < defenderTotalCombatRating) {
            result = Result.DEFENDER_VICTORY;
        } else {
            result = Result.TIE;
        }

        let attackerBaseLosses = totalDefenderStrength;
        let defenderBaseLosses = totalAttackerStrength;

        let attackerLossFactor = BattleHandler.computeLossFactor(totalAttackerStrength, totalDefenderStrength,
            (result === Result.ATTACKER_VICTORY || result === Result.ATTACKER_OVERRUN));
        let defenderLossFactor = BattleHandler.computeLossFactor(totalDefenderStrength, totalAttackerStrength,
            (result === Result.DEFENDER_VICTORY || result === Result.DEFENDER_OVERRUN));

        //multiplication and subsequent division by 100 done for reasons of numerical stability
        let attackerNewBaseLosses = Math.floor((attackerBaseLosses * (100 + (attackerLossFactor * 100))) / 100);
        let defenderNewBaseLosses = Math.floor((defenderBaseLosses * (100 + (defenderLossFactor * 100))) / 100);

        let baseLossesAttackerArmy = totalStrengthAttackerArmy.map((elem) => ((elem / totalAttackerStrength) * attackerNewBaseLosses));
        let baseLossesDefenderArmy = totalStrengthDefenderArmy.map((elem) => ((elem / totalDefenderStrength) * defenderNewBaseLosses));

        let attackerMeanGP = ((attackerTotalCombatRating / totalAttackerStrength) - 1) * 100;
        let defenderMeanGP = ((defenderTotalCombatRating / totalDefenderStrength) - 1) * 100;

        let attackerGPDiffArmy = totalAttackerArmyGP.map((elem) => ((elem / 200) - (defenderMeanGP / 100)));
        let defenderGPDiffArmy = totalDefenderArmyGP.map((elem) => ((elem / 200) - (attackerMeanGP / 100)));

        let finalLossesAttackerArmy = baseLossesAttackerArmy.map((elem, index) => (
            BattleHandler.computeFinalLosses(elem, attackerGPDiffArmy[index], totalStrengthAttackerArmy[index], totalStrengthAttackerArmy[index])
        ));
        let finalLossesDefenderArmy = baseLossesDefenderArmy.map((elem, index) => (
            BattleHandler.computeFinalLosses(elem, defenderGPDiffArmy[index], armiesDefense[index].getTroopCount(), totalStrengthDefenderArmy[index])
        ));

        return new BattleResult(result, finalLossesAttackerArmy, finalLossesDefenderArmy);
    }
}


// function battleHandler(participants, x, y) {
    //participating armies
    // this.unsortedArmies = participants;
    // this.attackSide = [];
    // this.defenseSide = [];
    //coordinates of the battle
    // this.x = x;
    // this.y = y;
    // this.battle = null;

    //UI elements to display armies of both sides
    // this.attackList = GUI.getBattleBox().getAttackArmiesBox();
    // this.unsortedList = GUI.getBattleBox().getUnsortedArmiesBox();
    // this.defenseList = GUI.getBattleBox().getDefenseArmiesBox();
    //both boxes under the lists of troops and the Fight! button
    // this.attackTroopCount = GUI.getBattleBox().getAttackBattleSide();
    // this.defenseTroopCount = GUI.getBattleBox().getDefenseBattleSide();
    // this.battleButton = GUI.getBattleBox().getBattleButton();
    //dice rolls
    // this.attackDice = GUI.getBattleBox().getAttackDiceRoll();
    // this.defenseDice = GUI.getBattleBox().getDefenseDiceRoll();

    // this.attackSoldiers = 0;
    // this.attackOfficers = 0;
    // this.attackRiders = 0;
    // this.attackGuardSoldiers = 0;
    // this.attackGuardRiders = 0;

    // this.attackShips = 0;
    // this.attackLightWarships = 0;
    // this.attackHeavyWarships = 0;
    // this.attackGuardShips = 0;

    // this.defenseSoldiers = 0;
    // this.defenseOfficers = 0;
    // this.defenseRiders = 0;
    // this.defenseGuardSoldiers = 0;
    // this.defenseGuardRiders = 0;

    // this.defenseShips = 0;
    // this.defenseLightWarships = 0;
    // this.defenseHeavyWarships = 0;
    // this.defenseGuardShips = 0;

    // this.moveToAttack = function (i) {
    //     let ctx = this;
    //     return function () {
    //         let t = ctx.unsortedArmies.splice(i, 1);
    //         ctx.attackSide.push(t[0]);
    //         ctx.updateTroopCounts();
    //         ctx.updateDisplay();
    //     }
    // }

    // this.moveToDefense = function (i) {
    //     let ctx = this;
    //     return function () {
    //         let t = ctx.unsortedArmies.splice(i, 1);
    //         ctx.defenseSide.push(t[0]);
    //         ctx.updateTroopCounts();
    //         ctx.updateDisplay();
    //     }
    // }

    // this.removeFromDefense = function (i) {
    //     let ctx = this;
    //     return function () {
    //         let t = ctx.defenseSide.splice(i, 1);
    //         ctx.unsortedArmies.push(t[0]);
    //         ctx.updateTroopCounts();
    //         ctx.updateDisplay();
    //     }
    // }

    // this.removeFromAttack = function (i) {
    //     let ctx = this;
    //     return function () {
    //         let t = ctx.attackSide.splice(i, 1);
    //         ctx.unsortedArmies.push(t[0]);
    //         ctx.updateTroopCounts();
    //         ctx.updateDisplay();
    //     }
    // }

    // this.updateTroopCounts = function () {
    //     this.attackSoldiers = 0;
    //     this.attackOfficers = 0;
    //     this.attackRiders = 0;
    //     this.attackGuardSoldiers = 0;
    //     this.attackGuardRiders = 0;
    //
    //     this.attackShips = 0;
    //     this.attackLightWarships = 0;
    //     this.attackHeavyWarships = 0;
    //     this.attackGuardShips = 0;
    //
    //     this.defenseSoldiers = 0;
    //     this.defenseOfficers = 0;
    //     this.defenseRiders = 0;
    //     this.defenseGuardSoldiers = 0;
    //     this.defenseGuardRiders = 0;
    //
    //     this.defenseShips = 0;
    //     this.defenseLightWarships = 0;
    //     this.defenseHeavyWarships = 0;
    //     this.defenseGuardShips = 0;
    //     let ctx = this;
    //
    //     this.attackSide.forEach(function (item) {
    //         if (item.armyId < 200) {//footman army
    //             if (item.isGuard) {
    //                 ctx.attackGuardSoldiers += item.count;
    //             } else {
    //                 ctx.attackSoldiers += item.count;
    //             }
    //         } else if (item.armyId < 300) {//rider army
    //             if (item.isGuard) {
    //                 ctx.attackGuardRiders += item.count;
    //             } else {
    //                 ctx.attackRiders += item.count;
    //             }
    //         } else if (item.armyId < 400) {//navy
    //             if (item.isGuard) {
    //                 ctx.attackGuardShips += item.count;
    //             } else {
    //                 ctx.attackShips += item.count;
    //             }
    //             ctx.attackLightWarships += item.lkp;
    //             ctx.attackHeavyWarships += item.skp;
    //         }
    //         ctx.attackOfficers += item.leaders;
    //     });
    //     this.defenseSide.forEach(function (item) {
    //         if (item.armyId < 200) {//footman army
    //             if (item.isGuard) {
    //                 ctx.defenseGuardSoldiers += item.count;
    //             } else {
    //                 ctx.defenseSoldiers += item.count;
    //             }
    //         } else if (item.armyId < 300) {//rider army
    //             if (item.isGuard) {
    //                 ctx.defenseGuardRiders += item.count;
    //             } else {
    //                 ctx.defenseRiders += item.count;
    //             }
    //         } else if (item.armyId < 400) {//navy
    //             if (item.isGuard) {
    //                 ctx.defenseGuardShips += item.count;
    //             } else {
    //                 ctx.defenseShips += item.count;
    //             }
    //             ctx.defenseLightWarships += item.lkp;
    //             ctx.defenseHeavyWarships += item.skp;
    //         }
    //         ctx.defenseOfficers += item.leaders;
    //     });
    // }

    // this.updateDisplay = function () {
    //     if (this.attackSide.length === 0 || this.defenseSide.length === 0) {
    //         this.battleButton.disabled = true;
    //         this.battleButton.style.cursor = "not-allowed";
    //     } else {
    //         this.battleButton.disabled = false;
    //         this.battleButton.style.cursor = "initial";
    //     }
    
    //     this.attackList.innerHTML = "";
    //     this.attackSide.forEach(function (item, index) {
    //         let listItem = document.createElement("DIV");
    //         this.attackList.appendChild(listItem);
    //         listItem.classList.add("armyListItem");
    
    //         let div = document.createElement("DIV");
    //         div.classList.add("center");
    //         div.innerHTML = item.ownerTag() + " " + item.armyId;
    //         listItem.appendChild(div);
    
    //         let moveBtn = document.createElement("BUTTON");
    //         moveBtn.classList.add("armyListButton");
    //         moveBtn.classList.add("moveRightButton");
    //         moveBtn.onclick = this.removeFromAttack(index);
    //         listItem.appendChild(moveBtn);
    //     }, this);
    
    //     this.unsortedList.innerHTML = "";
    //     this.unsortedArmies.forEach(function (item, index) {
    //         let listItem = document.createElement("DIV");
    //         this.unsortedList.appendChild(listItem);
    //         listItem.classList.add("armyListItem");
    
    //         let moveLeftBtn = document.createElement("BUTTON");
    //         moveLeftBtn.classList.add("armyListButton");
    //         moveLeftBtn.classList.add("moveLeftButton");
    //         moveLeftBtn.onclick = this.moveToAttack(index);
    //         listItem.appendChild(moveLeftBtn);
    
    //         let div = document.createElement("DIV");
    //         div.classList.add("center");
    //         div.innerHTML = item.ownerTag() + " " + item.armyId;
    //         listItem.appendChild(div);
    
    //         let moveRightBtn = document.createElement("BUTTON");
    //         moveRightBtn.classList.add("armyListButton");
    //         moveRightBtn.classList.add("moveRightButton");
    //         moveRightBtn.onclick = this.moveToDefense(index);
    //         listItem.appendChild(moveRightBtn);
    //     }, this);
    
    //     this.defenseList.innerHTML = "";
    //     this.defenseSide.forEach(function (item, index) {
    //         let listItem = document.createElement("DIV");
    //         this.defenseList.appendChild(listItem);
    //         listItem.classList.add("armyListItem");
    
    //         let moveBtn = document.createElement("BUTTON");
    //         moveBtn.classList.add("armyListButton");
    //         moveBtn.classList.add("moveLeftButton");
    //         moveBtn.onclick = this.removeFromDefense(index);
    //         listItem.appendChild(moveBtn);
    
    //         let div = document.createElement("DIV");
    //         div.classList.add("center");
    //         div.innerHTML = item.ownerTag() + " " + item.armyId;
    //         listItem.appendChild(div);
    //     }, this);
    
    //     this.attackTroopCount.innerHTML = "";
    //     this.defenseTroopCount.innerHTML = "";
    //     if (this.attackShips + this.attackLightWarships + this.attackHeavyWarships + this.attackGuardShips > 0 ||
    //         this.defenseShips + this.defenseLightWarships + this.defenseHeavyWarships + this.defenseGuardShips > 0) {
    //         //naval combat
    //         if (this.attackShips > 0) { this.attackTroopCount.innerHTML += "<p>Shiffe: " + this.attackShips + "</p>"; }
    //         if (this.attackGuardShips > 0) { this.attackTroopCount.innerHTML += "<p>Gardeschiffe: " + this.attackGuardShips + "</p>"; }
    
    //         if (this.defenseShips > 0) { this.defenseTroopCount.innerHTML += "<p>Shiffe: " + this.defenseShips + "</p>"; }
    //         if (this.defenseGuardShips > 0) { this.defenseTroopCount.innerHTML += "<p>Gardeschiffe: " + this.defenseGuardShips + "</p>"; }
    //         if (this.defenseLightWarships > 0) { this.defenseTroopCount.innerHTML += "<p>Leichte Kreigsschiffe: " + this.defenseLightWarships + "</p>"; }
    //         if (this.defenseHeavyWarships > 0) { this.defenseTroopCount.innerHTML += "<p>Schwere Kriegsschiffe: " + this.defenseHeavyWarships + "</p>"; }
    //     } else {
    //         //land combat
    //         if (this.attackSoldiers > 0) { this.attackTroopCount.innerHTML += "<p>Soldaten: " + this.attackSoldiers + "</p>"; }
    //         if (this.attackRiders > 0) { this.attackTroopCount.innerHTML += "<p>Reiter: " + this.attackRiders + "</p>"; }
    //         if (this.attackGuardSoldiers > 0) { this.attackTroopCount.innerHTML += "<p>Gardesoldaten: " + this.attackGuardSoldiers + "</p>"; }
    //         if (this.attackGuardRiders > 0) { this.attackTroopCount.innerHTML += "<p>Gardereiter: " + this.attackGuardRiders + "</p>"; }
    
    //         if (this.defenseSoldiers > 0) { this.defenseTroopCount.innerHTML += "<p>Soldaten: " + this.defenseSoldiers + "</p>"; }
    //         if (this.defenseRiders > 0) { this.defenseTroopCount.innerHTML += "<p>Reiter: " + this.defenseRiders + "</p>"; }
    //         if (this.defenseGuardSoldiers > 0) { this.defenseTroopCount.innerHTML += "<p>Gardesoldaten: " + this.defenseGuardSoldiers + "</p>"; }
    //         if (this.defenseGuardRiders > 0) { this.defenseTroopCount.innerHTML += "<p>Gardereiter: " + this.defenseGuardRiders + "</p>"; }
    //     }
    //     if (this.attackOfficers > 0) { this.attackTroopCount.innerHTML += "<p>Heerführer: " + this.attackOfficers + "</p>"; }
    //     if (this.defenseOfficers > 0) { this.defenseTroopCount.innerHTML += "<p>Heerführer: " + this.defenseOfficers + "</p>"; }
    
    //     this.attackTroopCount.innerHTML += "<p>Würfelwurf: " + this.attackDice.value + "</p>";
    //     this.defenseTroopCount.innerHTML += "<p>Würfelwurf: " + this.defenseDice.value + "</p>";
    
    //     //Instant result preview (remove if not desired)
    //     this.battle = new schlacht(this.attackSide.map((val) => (val)), this.defenseSide.map((val) => (val)), [], [], this.x, this.y);
    //     let result = this.battle.result(parseInt(this.attackDice.value), parseInt(this.defenseDice.value));
    
    //     let attackFootLosses = result.attackerLosses.reduce((total, current, index) => {
    //         if (this.attackSide[index].armyType() === 1 && !this.attackSide[index].isGuard) { return total + Math.round(current); }
    //         else { return total; }
    //     }, 0);
    //     let attackCavLosses = result.attackerLosses.reduce((total, current, index) => {
    //         if (this.attackSide[index].armyType() === 2 && !this.attackSide[index].isGuard) { return total + Math.round(current); }
    //         else { return total; }
    //     }, 0);
    //     let attackFleetLosses = result.attackerLosses.reduce((total, current, index) => {
    //         if (this.attackSide[index].armyType() === 3 && !this.attackSide[index].isGuard) { return total + Math.round(current); }
    //         else { return total; }
    //     }, 0);
    //     let attackGuardFootLosses = result.attackerLosses.reduce((total, current, index) => {
    //         if (this.attackSide[index].armyType() === 1 && this.attackSide[index].isGuard) { return total + Math.round(current); }
    //         else { return total; }
    //     }, 0);
    //     let attackGuardCavLosses = result.attackerLosses.reduce((total, current, index) => {
    //         if (this.attackSide[index].armyType() === 2 && this.attackSide[index].isGuard) { return total + Math.round(current); }
    //         else { return total; }
    //     }, 0);
    //     let attackGuardFleetLosses = result.attackerLosses.reduce((total, current, index) => {
    //         if (this.attackSide[index].armyType() === 3 && this.attackSide[index].isGuard) { return total + Math.round(current); }
    //         else { return total; }
    //     }, 0);
    
    //     let defenseFootLosses = result.defenderLosses.reduce((total, current, index) => {
    //         if (this.defenseSide[index].armyType() === 1 && !this.defenseSide[index].isGuard) { return total + Math.round(current); }
    //         else { return total; }
    //     }, 0);
    //     let defenseCavLosses = result.defenderLosses.reduce((total, current, index) => {
    //         if (this.defenseSide[index].armyType() === 2 && !this.defenseSide[index].isGuard) { return total + Math.round(current); }
    //         else { return total; }
    //     }, 0);
    //     let defenseFleetLosses = result.defenderLosses.reduce((total, current, index) => {
    //         if (this.defenseSide[index].armyType() === 3 && !this.defenseSide[index].isGuard) { return total + Math.round(current); }
    //         else { return total; }
    //     }, 0);
    //     let defenseGuardFootLosses = result.defenderLosses.reduce((total, current, index) => {
    //         if (this.defenseSide[index].armyType() === 1 && this.defenseSide[index].isGuard) { return total + Math.round(current); }
    //         else { return total; }
    //     }, 0);
    //     let defenseGuardCavLosses = result.defenderLosses.reduce((total, current, index) => {
    //         if (this.defenseSide[index].armyType() === 2 && this.defenseSide[index].isGuard) { return total + Math.round(current); }
    //         else { return total; }
    //     }, 0);
    //     let defenseGuardFleetLosses = result.defenderLosses.reduce((total, current, index) => {
    //         if (this.defenseSide[index].armyType() === 3 && this.defenseSide[index].isGuard) { return total + Math.round(current); }
    //         else { return total; }
    //     }, 0);
    
    //     if (result.victor === 'attacker') {
    //         if (this.battle.overrunAttack()) {
    //             this.defenseTroopCount.innerHTML += "<p class=\"red\">Überrant!</p>";
    //         } else {
    //             this.defenseTroopCount.innerHTML += "<p class=\"red\">Besiegt!</p>";
    //             this.attackTroopCount.innerHTML = "";
    //             if (this.attackShips + this.attackLightWarships + this.attackHeavyWarships + this.attackGuardShips > 0 ||
    //                 this.defenseShips + this.defenseLightWarships + this.defenseHeavyWarships + this.defenseGuardShips > 0) {
    //                 //naval battle
    //                 let lossProportion = ((attackFleetLosses + attackGuardFleetLosses) / (this.attackShips + this.attackGuardShips));
    //                 let officerLosses = Math.round(lossProportion * this.attackOfficers);
    //                 if (this.attackShips > 0) {
    //                     this.attackTroopCount.innerHTML += "<div>Schiffe: " +
    //                         this.attackShips + "<div class=\"red inline\"> -" + attackFleetLosses + "</div></div>";
    //                 }
    //                 if (this.attackGuardShips > 0) {
    //                     this.attackTroopCount.innerHTML += "<div>Gardeschiffe: " +
    //                         this.attackGuardShips + "<div class=\"red inline\"> -" + attackGuardFleetLosses + "</div></div>";
    //                 }
    //                 if (this.attackOfficers > 0) {
    //                     this.attackTroopCount.innerHTML += "<div>Heerführer: " +
    //                         this.attackOfficers + "<div class=\"red inline\"> -" + officerLosses + "</div></div>";
    //                 }
    //             } else {
    //                 //land battle
    //                 let officerLosses = Math.round(((attackFootLosses + attackCavLosses + attackGuardFootLosses + attackGuardCavLosses) /
    //                     (this.attackSoldiers + this.attackRiders + this.attackGuardSoldiers + this.attackGuardRiders)) * this.attackOfficers);
    //                 if (this.attackSoldiers > 0) {
    //                     this.attackTroopCount.innerHTML += "<div>Soldaten: " +
    //                         this.attackSoldiers + "<div class=\"red inline\"> -" + attackFootLosses + "</div></div>";
    //                 }
    //                 if (this.attackRiders > 0) {
    //                     this.attackTroopCount.innerHTML += "<div>Reiter: " +
    //                         this.attackRiders + "<div class=\"red inline\"> -" + attackCavLosses + "</div></div>";
    //                 }
    //                 if (this.attackGuardSoldiers > 0) {
    //                     this.attackTroopCount.innerHTML += "<div>Gardesoldaten: " +
    //                         this.attackGuardSoldiers + "<div class=\"red inline\"> -" + attackGuardFootLosses + "</div></div>";
    //                 }
    //                 if (this.attackGuardRiders > 0) {
    //                     this.attackTroopCount.innerHTML += "<div>Gardereiter: " +
    //                         this.attackGuardRiders + "<div class=\"red inline\"> -" + attackGuardCavLosses + "</div></div>";
    //                 }
    //                 if (this.attackOfficers > 0) {
    //                     this.attackTroopCount.innerHTML += "<div>Heerführer: " +
    //                         this.attackOfficers + "<div class=\"red inline\"> -" + officerLosses + "</div></div>";
    //                 }
    //             }
    //         }
    //     } else if (result.victor === 'defender') {
    //         if (this.battle.overrunDefense()) {
    //             this.attackTroopCount.innerHTML += "<p class=\"red\">Überrant!</p>";
    //         } else {
    //             this.attackTroopCount.innerHTML += "<p class=\"red\">Besiegt!</p>";
    //             this.defenseTroopCount.innerHTML = "";
    //             if (this.attackShips + this.attackLightWarships + this.attackHeavyWarships + this.attackGuardShips > 0 ||
    //                 this.defenseShips + this.defenseLightWarships + this.defenseHeavyWarships + this.defenseGuardShips > 0) {
    //                 //naval battle
    //                 let lossProportion = ((defenseFleetLosses + defenseGuardFleetLosses) / (this.defenseShips + this.defenseGuardShips));
    //                 let officerLosses = Math.round(lossProportion * this.defenseOfficers);
    //                 let lightWarshipLosses = Math.round(lossProportion * this.defenseLightWarships);
    //                 let heavyWarshipLosses = Math.round(lossProportion * this.defenseHeavyWarships);
    //                 if (this.defenseShips > 0) {
    //                     this.defenseTroopCount.innerHTML += "<div>Schiffe: " +
    //                         this.defenseShips + "<div class=\"red inline\"> -" + defenseFleetLosses + "</div></div>";
    //                 }
    //                 if (this.defenseGuardShips > 0) {
    //                     this.defenseTroopCount.innerHTML += "<div>Gardeschiffe: " +
    //                         this.defenseGuardShips + "<div class=\"red inline\"> -" + defenseGuardFleetLosses + "</div></div>";
    //                 }
    //                 if (this.defenseLightWarships > 0) {
    //                     this.defenseTroopCount.innerHTML += "<div>Leichte Kriegsschiffe: " +
    //                         this.defenseLightWarships + "<div class=\"red inline\"> -" + lightWarshipLosses + "</div></div>";
    //                 }
    //                 if (this.defenseHeavyWarships > 0) {
    //                     this.defenseTroopCount.innerHTML += "<div>Schwere Kriegsschiffe: " +
    //                         this.defenseHeavyWarships + "<div class=\"red inline\"> -" + heavyWarshipLosses + "</div></div>";
    //                 }
    //                 if (this.defenseOfficers > 0) {
    //                     this.defenseTroopCount.innerHTML += "<div>Heerführer: " +
    //                         this.defenseOfficers + "<div class=\"red inline\"> -" + officerLosses + "</div></div>";
    //                 }
    //             } else {
    //                 //land battle
    //                 let officerLosses = Math.round(((defenseFootLosses + defenseCavLosses + defenseGuardFootLosses + defenseGuardCavLosses) /
    //                     (this.defenseSoldiers + this.defenseRiders + this.defenseGuardSoldiers + this.defenseGuardRiders)) * this.defenseOfficers);
    //                 if (this.defenseSoldiers > 0) {
    //                     this.defenseTroopCount.innerHTML += "<div>Soldaten: " +
    //                         this.defenseSoldiers + "<div class=\"red inline\"> -" + defenseFootLosses + "</div></div>";
    //                 }
    //                 if (this.defenseRiders > 0) {
    //                     this.defenseTroopCount.innerHTML += "<div>Reiter: " +
    //                         this.defenseRiders + "<div class=\"red inline\"> -" + defenseCavLosses + "</div></div>";
    //                 }
    //                 if (this.defenseGuardSoldiers > 0) {
    //                     this.defenseTroopCount.innerHTML += "<div>Gardesoldaten: " +
    //                         this.defenseGuardSoldiers + "<div class=\"red inline\"> -" + defenseGuardFootLosses + "</div></div>";
    //                 }
    //                 if (this.defenseGuardRiders > 0) {
    //                     this.defenseTroopCount.innerHTML += "<div>Gardereiter: " +
    //                         this.defenseGuardRiders + "<div class=\"red inline\"> -" + defenseGuardCavLosses + "</div></div>";
    //                 }
    //                 if (this.defenseOfficers > 0) {
    //                     this.defenseTroopCount.innerHTML += "<div>Heerführer: " +
    //                         this.defenseOfficers + "<div class=\"red inline\"> -" + officerLosses + "</div></div>";
    //                 }
    //             }
    //         }
    //     }
    // }

    // this.resolve = function () {
    //     this.battle = new schlacht(this.attackSide.map((val) => (val)), this.defenseSide.map((val) => (val)), [], [], this.x, this.y);
    //     if (this.battle.overrunAttack()) {
    //         this.attackSide.forEach(function (item) {
    //             item.remainingMovePoints -= 7;
    //             conquer(item);//try to conquer the land
    //         });
    //         this.defenseSide.forEach(function (item) {
    //             item.decimate(item.count);
    //         });
    //     } else if (this.battle.overrunDefense()) {
    //         this.attackSide.forEach(function (item) {
    //             item.decimate(item.count);
    //         });
    //     } else {
    //         let result = this.battle.result(parseInt(this.attackDice.value), parseInt(this.defenseDice.value));
    //         if (result.victor === 'attacker') {
    //             //wipe the looser out
    //             this.defenseSide.forEach(function (item) {
    //                 item.decimate(item.count);
    //             });
    //             //null move points of the victor and inflict losses
    //             this.attackSide.forEach(function (item, index) {
    //                 item.remainingMovePoints = 0;
    //                 item.decimate(result.attackerLosses[index]);
    //                 conquer(item);//try to conquer the land
    //             }, this);
    //         } else if (result.victor === 'defender') {
    //             //wipe the looser out
    //             this.attackSide.forEach(function (item) {
    //                 item.decimate(item.count);
    //             });
    //             //null move points of the victor and inflict losses
    //             this.defenseSide.forEach(function (item, index) {
    //                 item.decimate(result.defenderLosses[index]);
    //             }, this);
    //         } else if (result.victor === 'tie') {
    //             //wipe all combatants out
    //             this.attackSide.forEach(function (item) {
    //                 item.decimate(item.count);
    //             });
    //             this.defenseSide.forEach(function (item) {
    //                 item.decimate(item.count);
    //             });
    //         } else {
    //             console.log("Battle resolution error.");
    //         }
    //     }
    //     checkArmiesForLiveliness();
    // }
// }

// function schlacht(armiesAttack: any[], armiesDefense: any[], charsAttack: any[], charsDefense: any[], posX: number, posY: number) {
// 	this.fieldType = this.fieldType = fieldType(posX, posY);
// 	//        fields.find((field) => (field.x === posX && field.y === posY)).type;
//
// 	this.armyArrayCount = function (armyArray: any[]) {
// 		return armyArray.filter((val) => (
// 			(val.armyType() === 3 && this.fieldType <= 1) || (this.fieldType >= 2 && val.armyType() <= 2)), this).
// 			reduce((total, elem) => (elem.count + total), 0);
// 	}
//
// 	this.overrunAttack = function () {
// 		return this.armyArrayCount(armiesAttack) >= 10 * this.armyArrayCount(armiesDefense) &&
// 			armiesDefense.filter((elem) => (elem.isGuard)).length === 0 && this.armyArrayCount(armiesAttack) > 0;
// 	}
//
// 	this.overrunDefense = function () {
// 		return 10 * this.armyArrayCount(armiesAttack) <= this.armyArrayCount(armiesDefense) &&
// 			armiesAttack.filter((elem) => (elem.isGuard)).length === 0 && this.armyArrayCount(armiesDefense) > 0;
// 	}
//
// 	this.terrainGP = function (army, attacker) {
// 		let fieldType = this.fieldType;
// 		let buildingsOnTheField = buildings.filter((current) => (current.x === posX && current.y === posY && current.type <= 4));
// 		if (buildingsOnTheField.length > 0) { //production buildings on field negate usual terrain bonus
// 			if (attacker) { return 0; }
// 			if (buildingsOnTheField[0].realm !== army.owner) { return 50; }
// 			switch (buildingsOnTheField[0].type) {
// 				case 0: return 100;
// 				case 1: return 200;
// 				case 2: return 300;
// 				case 3: return 400;
// 				case 4: return 500;
// 			}
// 		} else { //usual terrain bonus applies
// 		    let terrainGPBonus = 0;
//
// 			if(realms.find(realm => (realm.tag === army.owner)).homeTurf === fieldType) { //home terrain bonus applies
// 			    terrainGPBonus += 50;
// 			}
// 			if ((army.armyType() === 1 && (fieldType === 3 || fieldType === 8)) ||
// 				(army.armyType() === 2 && (fieldType === 2 || fieldType === 4 || fieldType === 7))) { //footmen/rider terrain bonus
// 				terrainGPBonus += 140;
// 			}
// 			return terrainGPBonus;
// 		}
// 	}
//
// 	this.characterGP = function (army) {
// 		//TODO: compute GP from own character fighting in battle.
// 		//BLOCKER: requires characters to know their realm allegiance.
// 		return 0;
// 	}
//
// 	this.directionalTerrainGP = function (army, attacker, attackingArmies) {
// 		let result = 0;
// 		if (attacker) {
// 			if (height(army.oldX, army.oldY) > height(army.x, army.y)) { result += 20; }//fighting downhill
// 			if (fieldType(army.x, army.y) === 7 || fieldType(army.x, army.y) === 8) { result += 20; }//attacking into swamp or desert
// 			if (fieldType(army.oldX, army.oldY) === 3) { result += 20; }//attacking out of a forest
// 			if (hasStreet(army.x, army.y)) { result += 20; }//attacking onto a street
// 		} else {
// 			let adjacentWalls = walls(army.x, army.y);
// 			let adjacentRivers = fluesse(army.x, army.y);
// 			let adjacentBridges = bridges(army.x, army.y);
// 			let neighbor = neighbors(army.x, army.y);
// 			let downhillBonus = false;
// 			let wallBonus = false;
// 			let bridgeBonus = false;
// 			let riverBonus = false;
// 			attackingArmies.forEach((attackingArmy) => {
// 				if (height(attackingArmy.oldX, attackingArmy.oldY) < height(army.x, army.y)) {
// 					downhillBonus = true;
// 				}
// 				neighbor.forEach((neighbor, index) => {
// 					if (neighbor[0] === attackingArmy.oldX && neighbor[1] === attackingArmy.oldY) {
// 						if (adjacentWalls[index] === 1) { wallBonus = true; }
// 						if (adjacentRivers[index] === 1) {
// 							if (adjacentBridges[index] === 1) {
// 								bridgeBonus = true;
// 							} else {
// 								riverBonus = true;
// 							}
// 						}
// 					}
// 				});
// 			});
// 			result = downhillBonus ? 20 : 0 + wallBonus ? 50 : 0 + riverBonus ? 50 : 0 + bridgeBonus ? 30 : 0;
// 		}
// 		return result;
// 	}
//
// 	this.computeCombatRating = function (strengthArmy, totalArmyGP) {
// 		return strengthArmy.map((elem, index) => (elem * (1 + (totalArmyGP[index] / 200))));
// 	}
//
// 	this.computeLossFactor = function (ownForces, enemyForces, victorious) {
// 		let baseFactor = (ownForces / enemyForces) / 10;
// 		if (victorious && ownForces >= enemyForces) {
// 			return - baseFactor;
// 		} else if (victorious && ownForces < enemyForces) {
// 			return 0.2 - baseFactor;
// 		} else {
// 			return 0;
// 		}
// 	}
//
// 	this.computeFinalLosses = function (baseArmyLosses, armyGPDiff, armyStrength, totalStrength) {
// 		let lossesWithGP = 0;
// 		if (armyGPDiff >= 0) {
// 			lossesWithGP = baseArmyLosses / (1 + armyGPDiff);
// 		} else {
// 			lossesWithGP = baseArmyLosses * (1 - armyGPDiff);
// 		}
// 		return (lossesWithGP / totalStrength) * armyStrength;
// 	}
//
// 	this.result = function (attackRoll, defenseRoll) {
// 		let totalStrengthAttackerArmy = armiesAttack.map((elem) => (elem.count));
// 		let totalStrengthDefenderArmy = armiesDefense.map((elem) => {
// 			if (elem.armyType() === 3) {
// 				return elem.count + elem.lkp * 5 + elem.skp * 10;
// 			} else {
// 				return elem.count;
// 			}
// 		});
//
// 		let totalAttackerArmyGP = armiesAttack.map((elem) => (
// 			attackRoll + elem.leaderGp() + this.terrainGP(elem, true) + this.characterGP(elem) + this.directionalTerrainGP(elem, true, null)
// 		));
// 		let totalDefenderArmyGP = armiesDefense.map((elem) => (
// 			defenseRoll + elem.leaderGp() + this.terrainGP(elem, false) + this.characterGP(elem) + this.directionalTerrainGP(elem, false, armiesAttack)
// 		));
//
// 		let combatRatingAttackerArmy = this.computeCombatRating(totalStrengthAttackerArmy, totalAttackerArmyGP);
// 		let combatRatingDefenderArmy = this.computeCombatRating(totalStrengthDefenderArmy, totalDefenderArmyGP);
//
// 		let totalAttackerStrength = totalStrengthAttackerArmy.reduce((total, elem) => (total + elem), 0);
// 		let totalDefenderStrength = totalStrengthDefenderArmy.reduce((total, elem) => (total + elem), 0);
//
// 		let attackerTotalCombatRating = combatRatingAttackerArmy.reduce((total, elem) => (total + elem), 0);
// 		let defenderTotalCombatRating = combatRatingDefenderArmy.reduce((total, elem) => (total + elem), 0);
//
// 		let victor = '';
// 		if (this.overrunAttack() || attackerTotalCombatRating > defenderTotalCombatRating) {
// 			victor = 'attacker';
// 		} else if (this.overrunDefense() || attackerTotalCombatRating < defenderTotalCombatRating) {
// 			victor = 'defender';
// 		} else {
// 			victor = 'tie';
// 		}
//
// 		let attackerBaseLosses = totalDefenderStrength;
// 		let defenderBaseLosses = totalAttackerStrength;
//
// 		let attackerLossFactor = this.computeLossFactor(totalAttackerStrength, totalDefenderStrength, (victor === 'attacker'));
// 		let defenderLossFactor = this.computeLossFactor(totalDefenderStrength, totalAttackerStrength, (victor === 'defender'));
//
// 		//multiplication and subsequent division by 100 done for reasons of numerical stability
// 		let attackerNewBaseLosses = Math.floor((attackerBaseLosses * (100 + (attackerLossFactor * 100))) / 100);
// 		let defenderNewBaseLosses = Math.floor((defenderBaseLosses * (100 + (defenderLossFactor * 100))) / 100);
//
// 		let baseLossesAttackerArmy = totalStrengthAttackerArmy.map((elem) => ((elem / totalAttackerStrength) * attackerNewBaseLosses));
// 		let baseLossesDefenderArmy = totalStrengthDefenderArmy.map((elem) => ((elem / totalDefenderStrength) * defenderNewBaseLosses));
//
// 		let attackerMeanGP = ((attackerTotalCombatRating / totalAttackerStrength) - 1) * 100;
// 		let defenderMeanGP = ((defenderTotalCombatRating / totalDefenderStrength) - 1) * 100;
//
// 		let attackerGPDiffArmy = totalAttackerArmyGP.map((elem) => ((elem / 200) - (defenderMeanGP / 100)));
// 		let defenderGPDiffArmy = totalDefenderArmyGP.map((elem) => ((elem / 200) - (attackerMeanGP / 100)));
//
// 		let finalLossesAttackerArmy = baseLossesAttackerArmy.map((elem, index) => (
// 			this.computeFinalLosses(elem, attackerGPDiffArmy[index], totalStrengthAttackerArmy[index], totalStrengthAttackerArmy[index])
// 		));
// 		let finalLossesDefenderArmy = baseLossesDefenderArmy.map((elem, index) => (
// 			this.computeFinalLosses(elem, defenderGPDiffArmy[index], armiesDefense[index].count, totalStrengthDefenderArmy[index])
// 		));
//
// 		return { victor: victor, attackerLosses: finalLossesAttackerArmy, defenderLosses: finalLossesDefenderArmy };
// 	}
// }