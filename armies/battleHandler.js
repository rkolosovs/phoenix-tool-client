"use strict";
class BattleHandler {
    constructor(participants, location) {
        this.attackSide = [];
        this.defenseSide = [];
        this.battleBox = GUI.getBattleBox();
        this.unsortedArmies = participants;
        this.location = location;
    }
    resolve() {
    }
}
function battleHandler(participants, x, y) {
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
        let ctx = this;
        return function () {
            let t = ctx.unsortedArmies.splice(i, 1);
            ctx.attackSide.push(t[0]);
            ctx.updateTroopCounts();
            ctx.updateDisplay();
        };
    };
    this.moveToDefense = function (i) {
        let ctx = this;
        return function () {
            let t = ctx.unsortedArmies.splice(i, 1);
            ctx.defenseSide.push(t[0]);
            ctx.updateTroopCounts();
            ctx.updateDisplay();
        };
    };
    this.removeFromDefense = function (i) {
        let ctx = this;
        return function () {
            let t = ctx.defenseSide.splice(i, 1);
            ctx.unsortedArmies.push(t[0]);
            ctx.updateTroopCounts();
            ctx.updateDisplay();
        };
    };
    this.removeFromAttack = function (i) {
        let ctx = this;
        return function () {
            let t = ctx.attackSide.splice(i, 1);
            ctx.unsortedArmies.push(t[0]);
            ctx.updateTroopCounts();
            ctx.updateDisplay();
        };
    };
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
        let ctx = this;
        this.attackSide.forEach(function (item) {
            if (item.armyId < 200) {
                if (item.isGuard) {
                    ctx.attackGuardSoldiers += item.count;
                }
                else {
                    ctx.attackSoldiers += item.count;
                }
            }
            else if (item.armyId < 300) {
                if (item.isGuard) {
                    ctx.attackGuardRiders += item.count;
                }
                else {
                    ctx.attackRiders += item.count;
                }
            }
            else if (item.armyId < 400) {
                if (item.isGuard) {
                    ctx.attackGuardShips += item.count;
                }
                else {
                    ctx.attackShips += item.count;
                }
                ctx.attackLightWarships += item.lkp;
                ctx.attackHeavyWarships += item.skp;
            }
            ctx.attackOfficers += item.leaders;
        });
        this.defenseSide.forEach(function (item) {
            if (item.armyId < 200) {
                if (item.isGuard) {
                    ctx.defenseGuardSoldiers += item.count;
                }
                else {
                    ctx.defenseSoldiers += item.count;
                }
            }
            else if (item.armyId < 300) {
                if (item.isGuard) {
                    ctx.defenseGuardRiders += item.count;
                }
                else {
                    ctx.defenseRiders += item.count;
                }
            }
            else if (item.armyId < 400) {
                if (item.isGuard) {
                    ctx.defenseGuardShips += item.count;
                }
                else {
                    ctx.defenseShips += item.count;
                }
                ctx.defenseLightWarships += item.lkp;
                ctx.defenseHeavyWarships += item.skp;
            }
            ctx.defenseOfficers += item.leaders;
        });
    };
    this.updateDisplay = function () {
        if (this.attackSide.length === 0 || this.defenseSide.length === 0) {
            this.battleButton.disabled = true;
            this.battleButton.style.cursor = "not-allowed";
        }
        else {
            this.battleButton.disabled = false;
            this.battleButton.style.cursor = "initial";
        }
        this.attackList.innerHTML = "";
        this.attackSide.forEach(function (item, index) {
            let listItem = document.createElement("DIV");
            this.attackList.appendChild(listItem);
            listItem.classList.add("armyListItem");
            let div = document.createElement("DIV");
            div.classList.add("center");
            div.innerHTML = item.ownerTag() + " " + item.armyId;
            listItem.appendChild(div);
            let moveBtn = document.createElement("BUTTON");
            moveBtn.classList.add("armyListButton");
            moveBtn.classList.add("moveRightButton");
            moveBtn.onclick = this.removeFromAttack(index);
            listItem.appendChild(moveBtn);
        }, this);
        this.unsortedList.innerHTML = "";
        this.unsortedArmies.forEach(function (item, index) {
            let listItem = document.createElement("DIV");
            this.unsortedList.appendChild(listItem);
            listItem.classList.add("armyListItem");
            let moveLeftBtn = document.createElement("BUTTON");
            moveLeftBtn.classList.add("armyListButton");
            moveLeftBtn.classList.add("moveLeftButton");
            moveLeftBtn.onclick = this.moveToAttack(index);
            listItem.appendChild(moveLeftBtn);
            let div = document.createElement("DIV");
            div.classList.add("center");
            div.innerHTML = item.ownerTag() + " " + item.armyId;
            listItem.appendChild(div);
            let moveRightBtn = document.createElement("BUTTON");
            moveRightBtn.classList.add("armyListButton");
            moveRightBtn.classList.add("moveRightButton");
            moveRightBtn.onclick = this.moveToDefense(index);
            listItem.appendChild(moveRightBtn);
        }, this);
        this.defenseList.innerHTML = "";
        this.defenseSide.forEach(function (item, index) {
            let listItem = document.createElement("DIV");
            this.defenseList.appendChild(listItem);
            listItem.classList.add("armyListItem");
            let moveBtn = document.createElement("BUTTON");
            moveBtn.classList.add("armyListButton");
            moveBtn.classList.add("moveLeftButton");
            moveBtn.onclick = this.removeFromDefense(index);
            listItem.appendChild(moveBtn);
            let div = document.createElement("DIV");
            div.classList.add("center");
            div.innerHTML = item.ownerTag() + " " + item.armyId;
            listItem.appendChild(div);
        }, this);
        this.attackTroopCount.innerHTML = "";
        this.defenseTroopCount.innerHTML = "";
        if (this.attackShips + this.attackLightWarships + this.attackHeavyWarships + this.attackGuardShips > 0 ||
            this.defenseShips + this.defenseLightWarships + this.defenseHeavyWarships + this.defenseGuardShips > 0) {
            //naval combat
            if (this.attackShips > 0) {
                this.attackTroopCount.innerHTML += "<p>Shiffe: " + this.attackShips + "</p>";
            }
            if (this.attackGuardShips > 0) {
                this.attackTroopCount.innerHTML += "<p>Gardeschiffe: " + this.attackGuardShips + "</p>";
            }
            if (this.defenseShips > 0) {
                this.defenseTroopCount.innerHTML += "<p>Shiffe: " + this.defenseShips + "</p>";
            }
            if (this.defenseGuardShips > 0) {
                this.defenseTroopCount.innerHTML += "<p>Gardeschiffe: " + this.defenseGuardShips + "</p>";
            }
            if (this.defenseLightWarships > 0) {
                this.defenseTroopCount.innerHTML += "<p>Leichte Kreigsschiffe: " + this.defenseLightWarships + "</p>";
            }
            if (this.defenseHeavyWarships > 0) {
                this.defenseTroopCount.innerHTML += "<p>Schwere Kriegsschiffe: " + this.defenseHeavyWarships + "</p>";
            }
        }
        else {
            //land combat
            if (this.attackSoldiers > 0) {
                this.attackTroopCount.innerHTML += "<p>Soldaten: " + this.attackSoldiers + "</p>";
            }
            if (this.attackRiders > 0) {
                this.attackTroopCount.innerHTML += "<p>Reiter: " + this.attackRiders + "</p>";
            }
            if (this.attackGuardSoldiers > 0) {
                this.attackTroopCount.innerHTML += "<p>Gardesoldaten: " + this.attackGuardSoldiers + "</p>";
            }
            if (this.attackGuardRiders > 0) {
                this.attackTroopCount.innerHTML += "<p>Gardereiter: " + this.attackGuardRiders + "</p>";
            }
            if (this.defenseSoldiers > 0) {
                this.defenseTroopCount.innerHTML += "<p>Soldaten: " + this.defenseSoldiers + "</p>";
            }
            if (this.defenseRiders > 0) {
                this.defenseTroopCount.innerHTML += "<p>Reiter: " + this.defenseRiders + "</p>";
            }
            if (this.defenseGuardSoldiers > 0) {
                this.defenseTroopCount.innerHTML += "<p>Gardesoldaten: " + this.defenseGuardSoldiers + "</p>";
            }
            if (this.defenseGuardRiders > 0) {
                this.defenseTroopCount.innerHTML += "<p>Gardereiter: " + this.defenseGuardRiders + "</p>";
            }
        }
        if (this.attackOfficers > 0) {
            this.attackTroopCount.innerHTML += "<p>Heerführer: " + this.attackOfficers + "</p>";
        }
        if (this.defenseOfficers > 0) {
            this.defenseTroopCount.innerHTML += "<p>Heerführer: " + this.defenseOfficers + "</p>";
        }
        this.attackTroopCount.innerHTML += "<p>Würfelwurf: " + this.attackDice.value + "</p>";
        this.defenseTroopCount.innerHTML += "<p>Würfelwurf: " + this.defenseDice.value + "</p>";
        //Instant result preview (remove if not desired)
        this.battle = new schlacht(this.attackSide.map((val) => (val)), this.defenseSide.map((val) => (val)), [], [], this.x, this.y);
        let result = this.battle.result(parseInt(this.attackDice.value), parseInt(this.defenseDice.value));
        let attackFootLosses = result.attackerLosses.reduce((total, current, index) => {
            if (this.attackSide[index].armyType() === 1 && !this.attackSide[index].isGuard) {
                return total + Math.round(current);
            }
            else {
                return total;
            }
        }, 0);
        let attackCavLosses = result.attackerLosses.reduce((total, current, index) => {
            if (this.attackSide[index].armyType() === 2 && !this.attackSide[index].isGuard) {
                return total + Math.round(current);
            }
            else {
                return total;
            }
        }, 0);
        let attackFleetLosses = result.attackerLosses.reduce((total, current, index) => {
            if (this.attackSide[index].armyType() === 3 && !this.attackSide[index].isGuard) {
                return total + Math.round(current);
            }
            else {
                return total;
            }
        }, 0);
        let attackGuardFootLosses = result.attackerLosses.reduce((total, current, index) => {
            if (this.attackSide[index].armyType() === 1 && this.attackSide[index].isGuard) {
                return total + Math.round(current);
            }
            else {
                return total;
            }
        }, 0);
        let attackGuardCavLosses = result.attackerLosses.reduce((total, current, index) => {
            if (this.attackSide[index].armyType() === 2 && this.attackSide[index].isGuard) {
                return total + Math.round(current);
            }
            else {
                return total;
            }
        }, 0);
        let attackGuardFleetLosses = result.attackerLosses.reduce((total, current, index) => {
            if (this.attackSide[index].armyType() === 3 && this.attackSide[index].isGuard) {
                return total + Math.round(current);
            }
            else {
                return total;
            }
        }, 0);
        let defenseFootLosses = result.defenderLosses.reduce((total, current, index) => {
            if (this.defenseSide[index].armyType() === 1 && !this.defenseSide[index].isGuard) {
                return total + Math.round(current);
            }
            else {
                return total;
            }
        }, 0);
        let defenseCavLosses = result.defenderLosses.reduce((total, current, index) => {
            if (this.defenseSide[index].armyType() === 2 && !this.defenseSide[index].isGuard) {
                return total + Math.round(current);
            }
            else {
                return total;
            }
        }, 0);
        let defenseFleetLosses = result.defenderLosses.reduce((total, current, index) => {
            if (this.defenseSide[index].armyType() === 3 && !this.defenseSide[index].isGuard) {
                return total + Math.round(current);
            }
            else {
                return total;
            }
        }, 0);
        let defenseGuardFootLosses = result.defenderLosses.reduce((total, current, index) => {
            if (this.defenseSide[index].armyType() === 1 && this.defenseSide[index].isGuard) {
                return total + Math.round(current);
            }
            else {
                return total;
            }
        }, 0);
        let defenseGuardCavLosses = result.defenderLosses.reduce((total, current, index) => {
            if (this.defenseSide[index].armyType() === 2 && this.defenseSide[index].isGuard) {
                return total + Math.round(current);
            }
            else {
                return total;
            }
        }, 0);
        let defenseGuardFleetLosses = result.defenderLosses.reduce((total, current, index) => {
            if (this.defenseSide[index].armyType() === 3 && this.defenseSide[index].isGuard) {
                return total + Math.round(current);
            }
            else {
                return total;
            }
        }, 0);
        if (result.victor === 'attacker') {
            if (this.battle.overrunAttack()) {
                this.defenseTroopCount.innerHTML += "<p class=\"red\">Überrant!</p>";
            }
            else {
                this.defenseTroopCount.innerHTML += "<p class=\"red\">Besiegt!</p>";
                this.attackTroopCount.innerHTML = "";
                if (this.attackShips + this.attackLightWarships + this.attackHeavyWarships + this.attackGuardShips > 0 ||
                    this.defenseShips + this.defenseLightWarships + this.defenseHeavyWarships + this.defenseGuardShips > 0) {
                    //naval battle
                    let lossProportion = ((attackFleetLosses + attackGuardFleetLosses) / (this.attackShips + this.attackGuardShips));
                    let officerLosses = Math.round(lossProportion * this.attackOfficers);
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
                }
                else {
                    //land battle
                    let officerLosses = Math.round(((attackFootLosses + attackCavLosses + attackGuardFootLosses + attackGuardCavLosses) /
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
        }
        else if (result.victor === 'defender') {
            if (this.battle.overrunDefense()) {
                this.attackTroopCount.innerHTML += "<p class=\"red\">Überrant!</p>";
            }
            else {
                this.attackTroopCount.innerHTML += "<p class=\"red\">Besiegt!</p>";
                this.defenseTroopCount.innerHTML = "";
                if (this.attackShips + this.attackLightWarships + this.attackHeavyWarships + this.attackGuardShips > 0 ||
                    this.defenseShips + this.defenseLightWarships + this.defenseHeavyWarships + this.defenseGuardShips > 0) {
                    //naval battle
                    let lossProportion = ((defenseFleetLosses + defenseGuardFleetLosses) / (this.defenseShips + this.defenseGuardShips));
                    let officerLosses = Math.round(lossProportion * this.defenseOfficers);
                    let lightWarshipLosses = Math.round(lossProportion * this.defenseLightWarships);
                    let heavyWarshipLosses = Math.round(lossProportion * this.defenseHeavyWarships);
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
                }
                else {
                    //land battle
                    let officerLosses = Math.round(((defenseFootLosses + defenseCavLosses + defenseGuardFootLosses + defenseGuardCavLosses) /
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
    };
    this.resolve = function () {
        this.battle = new schlacht(this.attackSide.map((val) => (val)), this.defenseSide.map((val) => (val)), [], [], this.x, this.y);
        if (this.battle.overrunAttack()) {
            this.attackSide.forEach(function (item) {
                item.remainingMovePoints -= 7;
                conquer(item); //try to conquer the land
            });
            this.defenseSide.forEach(function (item) {
                item.decimate(item.count);
            });
        }
        else if (this.battle.overrunDefense()) {
            this.attackSide.forEach(function (item) {
                item.decimate(item.count);
            });
        }
        else {
            let result = this.battle.result(parseInt(this.attackDice.value), parseInt(this.defenseDice.value));
            if (result.victor === 'attacker') {
                //wipe the looser out
                this.defenseSide.forEach(function (item) {
                    item.decimate(item.count);
                });
                //null move points of the victor and inflict losses
                this.attackSide.forEach(function (item, index) {
                    item.remainingMovePoints = 0;
                    item.decimate(result.attackerLosses[index]);
                    conquer(item); //try to conquer the land
                }, this);
            }
            else if (result.victor === 'defender') {
                //wipe the looser out
                this.attackSide.forEach(function (item) {
                    item.decimate(item.count);
                });
                //null move points of the victor and inflict losses
                this.defenseSide.forEach(function (item, index) {
                    item.decimate(result.defenderLosses[index]);
                }, this);
            }
            else if (result.victor === 'tie') {
                //wipe all combatants out
                this.attackSide.forEach(function (item) {
                    item.decimate(item.count);
                });
                this.defenseSide.forEach(function (item) {
                    item.decimate(item.count);
                });
            }
            else {
                console.log("Battle resolution error.");
            }
        }
        checkArmiesForLiveliness();
    };
}
