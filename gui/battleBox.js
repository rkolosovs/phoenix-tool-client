"use strict";
/*Copyright 2018 Janos Klieber, Roberts Kolosovs, Peter Spieler
This file is part of Phoenixclient.

Phoenixclient is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Phoenixclient is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Phoenixclient.  If not, see <http://www.gnu.org/licenses/>.*/
Object.defineProperty(exports, "__esModule", { value: true });
const battleHandler_1 = require("../armies/battleHandler");
const footArmy_1 = require("../armies/footArmy");
const riderArmy_1 = require("../armies/riderArmy");
const fleet_1 = require("../armies/fleet");
class BattleBox {
    constructor() {
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
    }
    newBattle(participants, location) {
        this.battleHandler = new battleHandler_1.BattleHandler(participants, location);
        this.updateTroopCounts();
        this.updateDisplay();
    }
    moveToAttack(i) {
        let ctx = this;
        return function () {
            let t = ctx.battleHandler.unsortedArmies.splice(i, 1);
            ctx.battleHandler.attackerArmies.push(t[0]);
            ctx.updateTroopCounts();
            ctx.updateDisplay();
        };
    }
    moveToDefense(i) {
        let ctx = this;
        return function () {
            let t = ctx.battleHandler.unsortedArmies.splice(i, 1);
            ctx.battleHandler.defenderArmies.push(t[0]);
            ctx.updateTroopCounts();
            ctx.updateDisplay();
        };
    }
    removeFromDefense(i) {
        let ctx = this;
        return function () {
            let t = ctx.battleHandler.defenderArmies.splice(i, 1);
            ctx.battleHandler.unsortedArmies.push(t[0]);
            ctx.updateTroopCounts();
            ctx.updateDisplay();
        };
    }
    removeFromAttack(i) {
        let ctx = this;
        return function () {
            let t = ctx.battleHandler.attackerArmies.splice(i, 1);
            ctx.battleHandler.unsortedArmies.push(t[0]);
            ctx.updateTroopCounts();
            ctx.updateDisplay();
        };
    }
    updateTroopCounts() {
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
        this.battleHandler.attackerArmies.forEach(function (item) {
            if (item instanceof footArmy_1.FootArmy) { //footman army
                if (item.isGuard) {
                    ctx.attackGuardSoldiers += item.getTroopCount();
                }
                else {
                    ctx.attackSoldiers += item.getTroopCount();
                }
            }
            else if (item instanceof riderArmy_1.RiderArmy) { //rider army
                if (item.isGuard) {
                    ctx.attackGuardRiders += item.getTroopCount();
                }
                else {
                    ctx.attackRiders += item.getTroopCount();
                }
            }
            else if (item instanceof fleet_1.Fleet) { //navy
                if (item.isGuard) {
                    ctx.attackGuardShips += item.getTroopCount();
                }
                else {
                    ctx.attackShips += item.getTroopCount();
                }
                ctx.attackLightWarships += item.getLightCatapultCount();
                ctx.attackHeavyWarships += item.getHeavyCatapultCount();
            }
            ctx.attackOfficers += item.getOfficerCount();
        });
        this.battleHandler.defenderArmies.forEach(function (item) {
            if (item instanceof footArmy_1.FootArmy) { //footman army
                if (item.isGuard) {
                    ctx.defenseGuardSoldiers += item.getTroopCount();
                }
                else {
                    ctx.defenseSoldiers += item.getTroopCount();
                }
            }
            else if (item instanceof riderArmy_1.RiderArmy) { //rider army
                if (item.isGuard) {
                    ctx.defenseGuardRiders += item.getTroopCount();
                }
                else {
                    ctx.defenseRiders += item.getTroopCount();
                }
            }
            else if (item instanceof fleet_1.Fleet) { //navy
                if (item.isGuard) {
                    ctx.defenseGuardShips += item.getTroopCount();
                }
                else {
                    ctx.defenseShips += item.getTroopCount();
                }
                ctx.defenseLightWarships += item.getLightCatapultCount();
                ctx.defenseHeavyWarships += item.getHeavyCatapultCount();
            }
            ctx.defenseOfficers += item.getOfficerCount();
        });
    }
    updateDisplay() {
        //enable / disable the battle button
        if (this.battleHandler.attackerArmies.length === 0 || this.battleHandler.defenderArmies.length === 0) {
            this.getBattleButton().disabled = true;
            this.getBattleButton().style.cursor = "not-allowed";
        }
        else {
            this.getBattleButton().disabled = false;
            this.getBattleButton().style.cursor = "initial";
        }
        this.updateArmyLists();
        this.updateTroopSummaries();
        this.updateResultPreview();
    }
    updateArmyLists() {
        //fill the sortable lists of armies
        this.getAttackArmiesBox().innerHTML = "";
        this.battleHandler.attackerArmies.forEach((item, index) => {
            let listItem = document.createElement("DIV");
            this.getAttackArmiesBox().appendChild(listItem);
            listItem.classList.add("armyListItem");
            let div = document.createElement("DIV");
            div.classList.add("center");
            div.innerHTML = item.owner + " " + item.getErkenfaraID();
            listItem.appendChild(div);
            let moveBtn = document.createElement("BUTTON");
            moveBtn.classList.add("armyListButton");
            moveBtn.classList.add("moveRightButton");
            moveBtn.onclick = this.removeFromAttack(index);
            listItem.appendChild(moveBtn);
        }, this);
        this.getUnsortedArmiesBox().innerHTML = "";
        this.battleHandler.unsortedArmies.forEach((item, index) => {
            let listItem = document.createElement("DIV");
            this.getUnsortedArmiesBox().appendChild(listItem);
            listItem.classList.add("armyListItem");
            let moveLeftBtn = document.createElement("BUTTON");
            moveLeftBtn.classList.add("armyListButton");
            moveLeftBtn.classList.add("moveLeftButton");
            moveLeftBtn.onclick = this.moveToAttack(index);
            listItem.appendChild(moveLeftBtn);
            let div = document.createElement("DIV");
            div.classList.add("center");
            div.innerHTML = item.owner + " " + item.getErkenfaraID();
            listItem.appendChild(div);
            let moveRightBtn = document.createElement("BUTTON");
            moveRightBtn.classList.add("armyListButton");
            moveRightBtn.classList.add("moveRightButton");
            moveRightBtn.onclick = this.moveToDefense(index);
            listItem.appendChild(moveRightBtn);
        }, this);
        this.getDefenseArmiesBox().innerHTML = "";
        this.battleHandler.defenderArmies.forEach((item, index) => {
            let listItem = document.createElement("DIV");
            this.getDefenseArmiesBox().appendChild(listItem);
            listItem.classList.add("armyListItem");
            let moveBtn = document.createElement("BUTTON");
            moveBtn.classList.add("armyListButton");
            moveBtn.classList.add("moveLeftButton");
            moveBtn.onclick = this.removeFromDefense(index);
            listItem.appendChild(moveBtn);
            let div = document.createElement("DIV");
            div.classList.add("center");
            div.innerHTML = item.owner + " " + item.getErkenfaraID();
            listItem.appendChild(div);
        }, this);
    }
    updateTroopSummaries() {
        //write the troop count summaries
        this.getAttackBattleSide().innerHTML = "";
        this.getDefenseBattleSide().innerHTML = "";
        if (this.attackShips + this.attackLightWarships + this.attackHeavyWarships + this.attackGuardShips > 0 ||
            this.defenseShips + this.defenseLightWarships + this.defenseHeavyWarships + this.defenseGuardShips > 0) {
            //naval combat
            if (this.attackShips > 0) {
                this.getAttackBattleSide().innerHTML += "<p>Shiffe: " + this.attackShips + "</p>";
            }
            if (this.attackGuardShips > 0) {
                this.getAttackBattleSide().innerHTML += "<p>Gardeschiffe: " + this.attackGuardShips + "</p>";
            }
            if (this.defenseShips > 0) {
                this.getDefenseBattleSide().innerHTML += "<p>Shiffe: " + this.defenseShips + "</p>";
            }
            if (this.defenseGuardShips > 0) {
                this.getDefenseBattleSide().innerHTML += "<p>Gardeschiffe: " + this.defenseGuardShips + "</p>";
            }
            if (this.defenseLightWarships > 0) {
                this.getDefenseBattleSide().innerHTML += "<p>Leichte Kreigsschiffe: " + this.defenseLightWarships + "</p>";
            }
            if (this.defenseHeavyWarships > 0) {
                this.getDefenseBattleSide().innerHTML += "<p>Schwere Kriegsschiffe: " + this.defenseHeavyWarships + "</p>";
            }
        }
        else {
            //land combat
            if (this.attackSoldiers > 0) {
                this.getAttackBattleSide().innerHTML += "<p>Soldaten: " + this.attackSoldiers + "</p>";
            }
            if (this.attackRiders > 0) {
                this.getAttackBattleSide().innerHTML += "<p>Reiter: " + this.attackRiders + "</p>";
            }
            if (this.attackGuardSoldiers > 0) {
                this.getAttackBattleSide().innerHTML += "<p>Gardesoldaten: " + this.attackGuardSoldiers + "</p>";
            }
            if (this.attackGuardRiders > 0) {
                this.getAttackBattleSide().innerHTML += "<p>Gardereiter: " + this.attackGuardRiders + "</p>";
            }
            if (this.defenseSoldiers > 0) {
                this.getDefenseBattleSide().innerHTML += "<p>Soldaten: " + this.defenseSoldiers + "</p>";
            }
            if (this.defenseRiders > 0) {
                this.getDefenseBattleSide().innerHTML += "<p>Reiter: " + this.defenseRiders + "</p>";
            }
            if (this.defenseGuardSoldiers > 0) {
                this.getDefenseBattleSide().innerHTML += "<p>Gardesoldaten: " + this.defenseGuardSoldiers + "</p>";
            }
            if (this.defenseGuardRiders > 0) {
                this.getDefenseBattleSide().innerHTML += "<p>Gardereiter: " + this.defenseGuardRiders + "</p>";
            }
        }
        if (this.attackOfficers > 0) {
            this.getAttackBattleSide().innerHTML += "<p>Heerführer: " + this.attackOfficers + "</p>";
        }
        if (this.defenseOfficers > 0) {
            this.getDefenseBattleSide().innerHTML += "<p>Heerführer: " + this.defenseOfficers + "</p>";
        }
        this.getAttackBattleSide().innerHTML += "<p>Würfelwurf: " + this.getAttackDiceRoll().value + "</p>";
        this.getDefenseBattleSide().innerHTML += "<p>Würfelwurf: " + this.getDefenseDiceRoll().value + "</p>";
    }
    updateResultPreview() {
        //Instant result preview (remove if not desired)
        let battleResult = this.battleHandler.calculateResult(this.battleHandler.attackerArmies.map((val) => (val)), this.battleHandler.defenderArmies.map((val) => (val)), [], [], this.battleHandler.location, parseInt(this.getAttackDiceRoll().value), parseInt(this.getDefenseDiceRoll().value));
        let attackFootLosses = battleResult.attackerLosses.reduce((total, current, index) => {
            if (this.battleHandler.attackerArmies[index] instanceof footArmy_1.FootArmy && !this.battleHandler.attackerArmies[index].isGuard) {
                return total + Math.round(current);
            }
            else {
                return total;
            }
        }, 0);
        let attackCavLosses = battleResult.attackerLosses.reduce((total, current, index) => {
            if (this.battleHandler.attackerArmies[index] instanceof riderArmy_1.RiderArmy && !this.battleHandler.attackerArmies[index].isGuard) {
                return total + Math.round(current);
            }
            else {
                return total;
            }
        }, 0);
        let attackFleetLosses = battleResult.attackerLosses.reduce((total, current, index) => {
            if (this.battleHandler.attackerArmies[index] instanceof fleet_1.Fleet && !this.battleHandler.attackerArmies[index].isGuard) {
                return total + Math.round(current);
            }
            else {
                return total;
            }
        }, 0);
        let attackGuardFootLosses = battleResult.attackerLosses.reduce((total, current, index) => {
            if (this.battleHandler.attackerArmies[index] instanceof footArmy_1.FootArmy && this.battleHandler.attackerArmies[index].isGuard) {
                return total + Math.round(current);
            }
            else {
                return total;
            }
        }, 0);
        let attackGuardCavLosses = battleResult.attackerLosses.reduce((total, current, index) => {
            if (this.battleHandler.attackerArmies[index] instanceof riderArmy_1.RiderArmy && this.battleHandler.attackerArmies[index].isGuard) {
                return total + Math.round(current);
            }
            else {
                return total;
            }
        }, 0);
        let attackGuardFleetLosses = battleResult.attackerLosses.reduce((total, current, index) => {
            if (this.battleHandler.attackerArmies[index] instanceof fleet_1.Fleet && this.battleHandler.attackerArmies[index].isGuard) {
                return total + Math.round(current);
            }
            else {
                return total;
            }
        }, 0);
        let defenseFootLosses = battleResult.defenderLosses.reduce((total, current, index) => {
            if (this.battleHandler.defenderArmies[index] instanceof footArmy_1.FootArmy && !this.battleHandler.defenderArmies[index].isGuard) {
                return total + Math.round(current);
            }
            else {
                return total;
            }
        }, 0);
        let defenseCavLosses = battleResult.defenderLosses.reduce((total, current, index) => {
            if (this.battleHandler.defenderArmies[index] instanceof riderArmy_1.RiderArmy && !this.battleHandler.defenderArmies[index].isGuard) {
                return total + Math.round(current);
            }
            else {
                return total;
            }
        }, 0);
        let defenseFleetLosses = battleResult.defenderLosses.reduce((total, current, index) => {
            if (this.battleHandler.defenderArmies[index] instanceof fleet_1.Fleet && !this.battleHandler.defenderArmies[index].isGuard) {
                return total + Math.round(current);
            }
            else {
                return total;
            }
        }, 0);
        let defenseGuardFootLosses = battleResult.defenderLosses.reduce((total, current, index) => {
            if (this.battleHandler.defenderArmies[index] instanceof footArmy_1.FootArmy && this.battleHandler.defenderArmies[index].isGuard) {
                return total + Math.round(current);
            }
            else {
                return total;
            }
        }, 0);
        let defenseGuardCavLosses = battleResult.defenderLosses.reduce((total, current, index) => {
            if (this.battleHandler.defenderArmies[index] instanceof riderArmy_1.RiderArmy && this.battleHandler.defenderArmies[index].isGuard) {
                return total + Math.round(current);
            }
            else {
                return total;
            }
        }, 0);
        let defenseGuardFleetLosses = battleResult.defenderLosses.reduce((total, current, index) => {
            if (this.battleHandler.defenderArmies[index] instanceof fleet_1.Fleet && this.battleHandler.defenderArmies[index].isGuard) {
                return total + Math.round(current);
            }
            else {
                return total;
            }
        }, 0);
        if (battleResult.result === 1 /* ATTACKER_OVERRUN */ || battleResult.result === 0 /* ATTACKER_VICTORY */) {
            if (battleResult.result === 1 /* ATTACKER_OVERRUN */) {
                this.getDefenseBattleSide().innerHTML += "<p class=\"red\">Überrant!</p>";
            }
            else {
                this.getDefenseBattleSide().innerHTML += "<p class=\"red\">Besiegt!</p>";
                this.getAttackBattleSide().innerHTML = "";
                if (this.attackShips + this.attackLightWarships + this.attackHeavyWarships + this.attackGuardShips > 0 ||
                    this.defenseShips + this.defenseLightWarships + this.defenseHeavyWarships + this.defenseGuardShips > 0) {
                    //naval battle
                    let lossProportion = ((attackFleetLosses + attackGuardFleetLosses) / (this.attackShips + this.attackGuardShips));
                    let officerLosses = Math.round(lossProportion * this.attackOfficers);
                    if (this.attackShips > 0) {
                        this.getAttackBattleSide().innerHTML += "<div>Schiffe: " +
                            this.attackShips + "<div class=\"red inline\"> -" + attackFleetLosses + "</div></div>";
                    }
                    if (this.attackGuardShips > 0) {
                        this.getAttackBattleSide().innerHTML += "<div>Gardeschiffe: " +
                            this.attackGuardShips + "<div class=\"red inline\"> -" + attackGuardFleetLosses + "</div></div>";
                    }
                    if (this.attackOfficers > 0) {
                        this.getAttackBattleSide().innerHTML += "<div>Heerführer: " +
                            this.attackOfficers + "<div class=\"red inline\"> -" + officerLosses + "</div></div>";
                    }
                }
                else {
                    //land battle
                    let officerLosses = Math.round(((attackFootLosses + attackCavLosses + attackGuardFootLosses + attackGuardCavLosses) /
                        (this.attackSoldiers + this.attackRiders + this.attackGuardSoldiers + this.attackGuardRiders)) * this.attackOfficers);
                    if (this.attackSoldiers > 0) {
                        this.getAttackBattleSide().innerHTML += "<div>Soldaten: " +
                            this.attackSoldiers + "<div class=\"red inline\"> -" + attackFootLosses + "</div></div>";
                    }
                    if (this.attackRiders > 0) {
                        this.getAttackBattleSide().innerHTML += "<div>Reiter: " +
                            this.attackRiders + "<div class=\"red inline\"> -" + attackCavLosses + "</div></div>";
                    }
                    if (this.attackGuardSoldiers > 0) {
                        this.getAttackBattleSide().innerHTML += "<div>Gardesoldaten: " +
                            this.attackGuardSoldiers + "<div class=\"red inline\"> -" + attackGuardFootLosses + "</div></div>";
                    }
                    if (this.attackGuardRiders > 0) {
                        this.getAttackBattleSide().innerHTML += "<div>Gardereiter: " +
                            this.attackGuardRiders + "<div class=\"red inline\"> -" + attackGuardCavLosses + "</div></div>";
                    }
                    if (this.attackOfficers > 0) {
                        this.getAttackBattleSide().innerHTML += "<div>Heerführer: " +
                            this.attackOfficers + "<div class=\"red inline\"> -" + officerLosses + "</div></div>";
                    }
                }
            }
        }
        else if (battleResult.result === 3 /* DEFENDER_OVERRUN */ || battleResult.result === 2 /* DEFENDER_VICTORY */) {
            if (battleResult.result === 3 /* DEFENDER_OVERRUN */) {
                this.getAttackBattleSide().innerHTML += "<p class=\"red\">Überrant!</p>";
            }
            else {
                this.getAttackBattleSide().innerHTML += "<p class=\"red\">Besiegt!</p>";
                this.getDefenseBattleSide().innerHTML = "";
                if (this.attackShips + this.attackLightWarships + this.attackHeavyWarships + this.attackGuardShips > 0 ||
                    this.defenseShips + this.defenseLightWarships + this.defenseHeavyWarships + this.defenseGuardShips > 0) {
                    //naval battle
                    let lossProportion = ((defenseFleetLosses + defenseGuardFleetLosses) / (this.defenseShips + this.defenseGuardShips));
                    let officerLosses = Math.round(lossProportion * this.defenseOfficers);
                    let lightWarshipLosses = Math.round(lossProportion * this.defenseLightWarships);
                    let heavyWarshipLosses = Math.round(lossProportion * this.defenseHeavyWarships);
                    if (this.defenseShips > 0) {
                        this.getDefenseBattleSide().innerHTML += "<div>Schiffe: " +
                            this.defenseShips + "<div class=\"red inline\"> -" + defenseFleetLosses + "</div></div>";
                    }
                    if (this.defenseGuardShips > 0) {
                        this.getDefenseBattleSide().innerHTML += "<div>Gardeschiffe: " +
                            this.defenseGuardShips + "<div class=\"red inline\"> -" + defenseGuardFleetLosses + "</div></div>";
                    }
                    if (this.defenseLightWarships > 0) {
                        this.getDefenseBattleSide().innerHTML += "<div>Leichte Kriegsschiffe: " +
                            this.defenseLightWarships + "<div class=\"red inline\"> -" + lightWarshipLosses + "</div></div>";
                    }
                    if (this.defenseHeavyWarships > 0) {
                        this.getDefenseBattleSide().innerHTML += "<div>Schwere Kriegsschiffe: " +
                            this.defenseHeavyWarships + "<div class=\"red inline\"> -" + heavyWarshipLosses + "</div></div>";
                    }
                    if (this.defenseOfficers > 0) {
                        this.getDefenseBattleSide().innerHTML += "<div>Heerführer: " +
                            this.defenseOfficers + "<div class=\"red inline\"> -" + officerLosses + "</div></div>";
                    }
                }
                else {
                    //land battle
                    let officerLosses = Math.round(((defenseFootLosses + defenseCavLosses + defenseGuardFootLosses + defenseGuardCavLosses) /
                        (this.defenseSoldiers + this.defenseRiders + this.defenseGuardSoldiers + this.defenseGuardRiders)) * this.defenseOfficers);
                    if (this.defenseSoldiers > 0) {
                        this.getDefenseBattleSide().innerHTML += "<div>Soldaten: " +
                            this.defenseSoldiers + "<div class=\"red inline\"> -" + defenseFootLosses + "</div></div>";
                    }
                    if (this.defenseRiders > 0) {
                        this.getDefenseBattleSide().innerHTML += "<div>Reiter: " +
                            this.defenseRiders + "<div class=\"red inline\"> -" + defenseCavLosses + "</div></div>";
                    }
                    if (this.defenseGuardSoldiers > 0) {
                        this.getDefenseBattleSide().innerHTML += "<div>Gardesoldaten: " +
                            this.defenseGuardSoldiers + "<div class=\"red inline\"> -" + defenseGuardFootLosses + "</div></div>";
                    }
                    if (this.defenseGuardRiders > 0) {
                        this.getDefenseBattleSide().innerHTML += "<div>Gardereiter: " +
                            this.defenseGuardRiders + "<div class=\"red inline\"> -" + defenseGuardCavLosses + "</div></div>";
                    }
                    if (this.defenseOfficers > 0) {
                        this.getDefenseBattleSide().innerHTML += "<div>Heerführer: " +
                            this.defenseOfficers + "<div class=\"red inline\"> -" + officerLosses + "</div></div>";
                    }
                }
            }
        }
    }
    getSelf() {
        if (this.self == undefined) {
            this.self = document.getElementById("battleBox");
        }
        return this.self;
    }
    getCloseBattleButton() {
        if (this.closeBattleButton == undefined) {
            this.closeBattleButton = document.getElementById("closeBattleButton");
            // onclick gets set in battleevents
        }
        return this.closeBattleButton;
    }
    getAttackersTitleText() {
        if (this.attackersTitleText == undefined) {
            this.attackersTitleText = document.getElementById("attackersTitleText");
        }
        return this.attackersTitleText;
    }
    getDefendersTitleText() {
        if (this.defendersTitleText == undefined) {
            this.defendersTitleText = document.getElementById("defendersTitleText");
        }
        return this.defendersTitleText;
    }
    getAttackArmiesBox() {
        if (this.attackArmiesBox == undefined) {
            this.attackArmiesBox = document.getElementById("attackArmiesBox");
        }
        return this.attackArmiesBox;
    }
    getUnsortedArmiesBox() {
        if (this.unsortedArmiesBox == undefined) {
            this.unsortedArmiesBox = document.getElementById("unsortedArmiesBox");
        }
        return this.unsortedArmiesBox;
    }
    getDefenseArmiesBox() {
        if (this.defenseArmiesBox == undefined) {
            this.defenseArmiesBox = document.getElementById("defenseArmiesBox");
        }
        return this.defenseArmiesBox;
    }
    getAttackBattleSide() {
        if (this.attackBattleSide == undefined) {
            this.attackBattleSide = document.getElementById("attackBattleSide");
        }
        return this.attackBattleSide;
    }
    getAttackDiceRoll() {
        if (this.attackDiceRoll == undefined) {
            this.attackDiceRoll = document.getElementById("attackDiceRoll");
        }
        return this.attackDiceRoll;
    }
    getDefenseDiceRoll() {
        if (this.defenseDiceRoll == undefined) {
            this.defenseDiceRoll = document.getElementById("defenseDiceRoll");
        }
        return this.defenseDiceRoll;
    }
    getDefenseBattleSide() {
        if (this.defenseBattleSide == undefined) {
            this.defenseBattleSide = document.getElementById("defenseBattleSide");
        }
        return this.defenseBattleSide;
    }
    getBattleButton() {
        if (this.battleButton == undefined) {
            this.battleButton = document.getElementById("battleButton");
            // onclick gets set in battle events or shoot events
        }
        return this.battleButton;
    }
}
exports.BattleBox = BattleBox;
//# sourceMappingURL=battleBox.js.map