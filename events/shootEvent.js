"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gui_1 = require("../gui/gui");
const boxVisibilty_1 = require("../gui/boxVisibilty");
const drawingFunctions_1 = require("../gui/drawingFunctions");
const gameState_1 = require("../gameState");
const event_1 = require("./event");
const shootingFunctions_1 = require("../armies/shootingFunctions");
class ShootEvent extends event_1.PhoenixEvent {
    constructor(listPosition, status, realm, armyId, to, from, lkpCount, skpCount, target, databasePrimaryKey) {
        super(listPosition, status, databasePrimaryKey);
        this.realm = realm;
        this.armyId = armyId;
        this.to = to;
        this.from = from;
        this.lkpCount = lkpCount;
        this.skpCount = skpCount;
        this.target = target;
    }
    getContent() {
        // TODO
        return JSON.parse('{}');
    }
    checkEvent() {
        let shootBox = gui_1.GUI.getShootingBigBox();
        boxVisibilty_1.BoxVisibility.show(shootBox.getSelf());
        shootBox.getShooterTitleText().innerHTML = this.armyId + ", " + this.realm.tag;
        ;
        shootBox.getAttackersLKPText().innerHTML = this.lkpCount.toString();
        shootBox.getAttackersSKPText().innerHTML = this.skpCount.toString();
        shootBox.getTargetText().innerHTML = this.target;
        shootBox.getXTargetText().innerHTML = this.to[0].toString();
        shootBox.getYTargetText().innerHTML = this.to[1].toString();
        let shootButton = shootBox.getRangedBattleButton();
        shootButton.addEventListener("click", (e) => this.shootButtonLogic(shootBox));
        shootBox.getCloseRangedBattleButton().onclick = function () {
            boxVisibilty_1.BoxVisibility.hide(shootBox.getSelf());
        };
        gui_1.GUI.getBigBox().fillEventList();
        //sendCheckEvent(event.pk, event.type);
        drawingFunctions_1.Drawing.drawStuff();
    }
    determineEventStatus() {
        if (this.status === 'undetermined' || this.status === 'available' ||
            this.status === 'withheld' || this.status === 'impossible') {
            let shooter = gameState_1.GameState.armies[this.findArmyPlaceInList(this.armyId, this.realm)];
            let canShoot = true;
            if (shooter.getLightCatapultCount() - shooter.getLightCatapultsShot() < this.lkpCount) {
                canShoot = false;
            }
            if (shooter.getHeavyCatapultCount() - shooter.getHeavyCatapultsShot() < this.skpCount) {
                canShoot = false;
            }
            if (this.armyExistsAndIsLocated(shooter.owner.tag, this.armyId, this.from[0], this.from[1]) && canShoot) {
                this.status = 'available';
            }
            else if (this.armyExists(this.realm, this.armyId) &&
                this.possibleMoveOfArmyTo(shooter.owner.tag, this.armyId, this.from[0], this.from[1])) {
                this.status = 'withheld';
            }
            else {
                this.status = 'impossible';
            }
        }
    }
    makeEventListItemText() {
        return "" + this.realm.tag + "'s army " + this.armyId + " shoots a Field (" + this.to[0] + ", " + this.to[1] + ") with " +
            this.lkpCount + " LKP and " + this.skpCount + " SKP";
    }
    getType() {
        return "shoot";
    }
    shootButtonLogic(shootBox) {
        let shooter;
        let lkpRolls = [];
        let skpRolls = [];
        for (let i = 0; i < gameState_1.GameState.armies.length; i++) {
            if (gameState_1.GameState.armies[i].getErkenfaraID() === this.armyId && gameState_1.GameState.armies[i].owner === this.realm)
                shooter = gameState_1.GameState.armies[i];
        }
        for (let i = 0; i < 10; i++) {
            let currentRollLKP = parseInt(shootBox.getLKPInputs()[i].value, 10);
            let currentRollSKP = parseInt(shootBox.getSKPInputs()[i].value, 10);
            if (!isNaN(currentRollLKP) && currentRollLKP !== 0) {
                for (let j = 0; j < currentRollLKP; j++) {
                    lkpRolls.push(i);
                }
            }
            if (!isNaN(currentRollSKP) && currentRollSKP !== 0) {
                for (let j = 0; j < currentRollSKP; j++) {
                    skpRolls.push(i);
                }
            }
        }
        //TODO check target field
        if (lkpRolls.length < this.lkpCount) {
            window.alert("Sie haben zu wenig Würfe für leichte Katapulte/Kriegsschiffe eingetragenen");
            return false;
        }
        else if (skpRolls.length < this.skpCount) {
            window.alert("Sie haben zu wenig Würfe für schwere Katapulte/Kriegsschiffe eingetragenen");
            return false;
        }
        else if (lkpRolls.length > this.lkpCount) {
            window.alert("Sie haben zu viele Würfe für leichte Katapulte/Kriegsschiffe eingetragenen");
            return false;
        }
        else if (skpRolls.length > this.skpCount) {
            window.alert("Sie haben zu viele Würfe für schwere Katapulte/Kriegsschiffe eingetragenen");
            return false;
        }
        else {
            shootingFunctions_1.ShootingFunctions.fernkampf(lkpRolls, skpRolls, shooter, this.target, this.to, null); // TODO chars
            boxVisibilty_1.BoxVisibility.hide(shootBox.getSelf());
            this.status = 'checked';
            gui_1.GUI.getBigBox().fillEventList();
            drawingFunctions_1.Drawing.drawStuff();
            return true;
        }
    }
}
exports.ShootEvent = ShootEvent;
