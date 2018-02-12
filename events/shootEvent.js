"use strict";
class ShootEvent extends PhoenixEvent {
    constructor(id, type, status, realm, armyId, toX, toY, fromX, fromY, lkpCount, skpCount, target) {
        super(id, type, status);
        this.id = id;
        this.type = type;
        this.status = status;
        this.realm = realm;
        this.armyId = armyId;
        this.toX = toX;
        this.toY = toY;
        this.fromX = fromX;
        this.fromY = fromY;
        this.lkpCount = lkpCount;
        this.skpCount = skpCount;
        this.target = target;
    }
    checkEvent() {
        let shootBox = GUI.getShootingBigBox();
        show(shootBox.getSelf());
        shootBox.getShooterTitleText().innerHTML = this.armyId + ", " + this.realm.tag;
        ;
        shootBox.getAttackersLKPText().innerHTML = this.lkpCount.toString();
        shootBox.getAttackersSKPText().innerHTML = this.skpCount.toString();
        shootBox.getTargetText().innerHTML = this.target;
        shootBox.getXTargetText().innerHTML = this.toX.toString();
        shootBox.getYTargetText().innerHTML = this.toY.toString();
        let shootButton = shootBox.getRangedBattleButton();
        shootButton.addEventListener("click", (e) => this.shootButtonLogic(shootBox));
        shootBox.getCloseRangedBattleButton().onclick = function () {
            hide(shootBox.getSelf());
        };
        fillEventList();
        //sendCheckEvent(event.pk, event.type);
        Drawing.drawStuff();
    }
    determineEventStatus() {
        if (this.status === 'undetermined' || this.status === 'available' ||
            this.status === 'withheld' || this.status === 'impossible') {
            let shooter = GameState.armies[this.findArmyPlaceInList(this.armyId, this.realm)];
            let canShoot = true;
            if (shooter.getLightCatapultCount() - shooter.getLightCatapultsShot() < this.lkpCount) {
                canShoot = false;
            }
            if (shooter.getHeavyCatapultCount() - shooter.getHeavyCatapultsShot() < this.skpCount) {
                canShoot = false;
            }
            if (this.armyExistsAndIsLocated(shooter.owner.tag, this.armyId, this.fromX, this.fromY) && canShoot) {
                this.status = 'available';
            }
            else if (armyExists(this.realm, this.armyId) &&
                this.possibleMoveOfArmyTo(shooter.owner.tag, this.armyId, this.fromX, this.fromY)) {
                this.status = 'withheld';
            }
            else {
                this.status = 'impossible';
            }
        }
    }
    makeEventListItem() {
        let eli = document.createElement("DIV");
        eli.classList.add("eventListItem");
        eli.id = "eli" + this.id;
        eli.innerHTML = "<div>" + this.realm.tag + "'s army " + this.armyId + " shoots a Field (" + this.toX + ", " +
            this.toY + ") with " + this.lkpCount + " LKP and " + this.skpCount + " SKP.</div>";
        return this.commonEventListItem(eli, this.id);
    }
    shootButtonLogic(shootBox) {
        let shooter;
        let lkpRolls = [];
        let skpRolls = [];
        for (let i = 0; i < GameState.armies.length; i++) {
            if (GameState.armies[i].getErkenfaraID() === this.armyId && GameState.armies[i].owner === this.realm)
                shooter = GameState.armies[i];
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
            fernkampf(lkpRolls, skpRolls, shooter, this.target, [this.toX, this.toY], null); // TODO chars
            hide(shootBox.getSelf());
            this.status = 'checked';
            fillEventList();
            Drawing.drawStuff();
            return true;
        }
    }
}
