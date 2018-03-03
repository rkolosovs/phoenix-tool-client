"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gui_1 = require("../gui/gui");
const boxVisibilty_1 = require("../gui/boxVisibilty");
const drawingFunctions_1 = require("../gui/drawingFunctions");
const gameState_1 = require("../gameState");
const event_1 = require("./event");
const buttonFunctions_1 = require("../controls/buttonFunctions");
class ShootEvent extends event_1.PhoenixEvent {
    constructor(listPosition, status, prerequisiteEvents, realm, armyId, to, from, lkpCount, skpCount, target, databasePrimaryKey) {
        super(listPosition, status, prerequisiteEvents, databasePrimaryKey);
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
    validGameState() {
        // TODO
        return false;
    }
    getLightCatapultCount() {
        return this.lkpCount;
    }
    getHeavyCatapultCount() {
        return this.skpCount;
    }
    getTo() {
        return this.to;
    }
    getTarget() {
        return this.target;
    }
    getArmyId() {
        return this.armyId;
    }
    getRealm() {
        return this.realm;
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
        shootButton.addEventListener("click", (e) => buttonFunctions_1.ButtonFunctions.shootButtonLogic(this));
        shootBox.getCloseRangedBattleButton().onclick = function () {
            boxVisibilty_1.BoxVisibility.hide(shootBox.getSelf());
        };
        gui_1.GUI.getBigBox().fillEventList();
        //sendCheckEvent(event.pk, event.type);
        drawingFunctions_1.Drawing.drawStuff();
    }
    determineEventStatus() {
        if (!(this.status === 0 /* Checked */ || this.status === 1 /* Deleted */)) {
            let shooter = gameState_1.GameState.armies[this.findArmyPlaceInList(this.armyId, this.realm)];
            let canShoot = true;
            //check if remaining Lkp that have not shot yet
            if (shooter.getLightCatapultCount() - shooter.getLightCatapultsShot() < this.lkpCount) {
                canShoot = false;
            }
            //check if remaining Lkp that have not shot yet
            if (shooter.getHeavyCatapultCount() - shooter.getHeavyCatapultsShot() < this.skpCount) {
                canShoot = false;
            }
            if (this.armyExistsAndIsLocated(shooter.owner.tag, this.armyId, this.from[0], this.from[1]) && canShoot) {
                this.status = 4 /* Available */;
            }
            else if (this.armyExists(this.realm, this.armyId) &&
                this.possibleMoveOfArmyTo(shooter.owner.tag, this.armyId, this.from[0], this.from[1])) {
                this.status = 3 /* Withheld */;
            }
            else {
                this.status = 2 /* Impossible */;
            }
        }
    }
    makeEventListItemText() {
        return "" + this.realm.tag + "'s army " + this.armyId + " shoots a Field (" + this.to[0] + ", " + this.to[1] + ") with " +
            this.lkpCount + " LKP and " + this.skpCount + " SKP";
    }
}
exports.ShootEvent = ShootEvent;
