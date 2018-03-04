"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gui_1 = require("../gui/gui");
const boxVisibilty_1 = require("../gui/boxVisibilty");
const drawingFunctions_1 = require("../gui/drawingFunctions");
const gameState_1 = require("../gameState");
const event_1 = require("./event");
const buttonFunctions_1 = require("../controls/buttonFunctions");
class ShootEvent extends event_1.PhoenixEvent {
    constructor(listPosition, status, prerequisiteEvents, realm, shooterId, to, from, lkpCount, skpCount, target, databasePrimaryKey) {
        super(listPosition, status, prerequisiteEvents, databasePrimaryKey);
        this.realm = realm;
        this.shooterId = shooterId;
        this.to = to;
        this.from = from;
        this.lkpCount = lkpCount;
        this.skpCount = skpCount;
        this.target = target;
    }
    getType() {
        return "shoot";
    }
    getContent() {
        return "{'armyId': " + this.shooterId + ", 'realm': " + this.realm.tag +
            ", 'LKPcount': " + this.lkpCount + ", 'SKPcount': " + this.skpCount +
            ", 'fromX': " + this.from[0] + ", 'fromY': " + this.from[1] +
            ", 'toX': " + this.to[0] + ", 'toY': " + this.to[1] + "}";
    }
    validGameState() {
        //Shooter exists, is positioned on the from-field, has enough catapults and the target is valid
        let shooter = gameState_1.GameState.armies.find(army => army.owner === this.realm &&
            army.getErkenfaraID() === this.shooterId &&
            army.getPosition()[0] === this.from[0] &&
            army.getPosition()[1] === this.from[1]);
        if (shooter != undefined) {
            shooter.findShootingTargets();
            return (shooter.getLightCatapultCount() - shooter.getLightCatapultsShot() >= this.lkpCount) &&
                (shooter.getHeavyCatapultCount() - shooter.getHeavyCatapultsShot() >= this.skpCount) &&
                shooter.targetList.some(target => target[0] === this.to[0] && target[1] === this.to[1]);
        }
        else {
            return false;
        }
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
    getShooterId() {
        return this.shooterId;
    }
    getRealm() {
        return this.realm;
    }
    checkEvent() {
        let shootBox = gui_1.GUI.getShootingBigBox();
        boxVisibilty_1.BoxVisibility.show(shootBox.getSelf());
        shootBox.getShooterTitleText().innerHTML = this.shooterId + ", " + this.realm.tag;
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
    makeEventListItemText() {
        return "" + this.realm.tag + "'s army " + this.shooterId + " shoots a Field (" + this.to[0] + ", " + this.to[1] + ") with " +
            this.lkpCount + " LKP and " + this.skpCount + " SKP";
    }
}
exports.ShootEvent = ShootEvent;
