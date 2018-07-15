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
define(["require", "exports", "../gui/gui", "../gui/boxVisibilty", "../gui/drawingFunctions", "../gameState", "./event", "../controls/buttonFunctions"], function (require, exports, gui_1, boxVisibilty_1, drawingFunctions_1, gameState_1, event_1, buttonFunctions_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ShootEvent extends event_1.PhoenixEvent {
        constructor(listPosition, status, realm, shooterId, to, from, lkpCount, skpCount, target, prerequisiteEvents, databasePrimaryKey) {
            super(listPosition, status, prerequisiteEvents, databasePrimaryKey);
            this.realm = realm;
            this.shooterId = shooterId;
            this.to = to;
            this.from = from;
            this.lkpCount = lkpCount;
            this.skpCount = skpCount;
            this.target = target;
        }
        typeAsString() {
            return "shoot";
        }
        getContent() {
            return "{'armyId': " + this.shooterId + ", 'realm': " + this.realm.tag +
                ", 'LKPcount': " + this.lkpCount + ", 'SKPcount': " + this.skpCount +
                ", 'fromX': " + this.from[0] + ", 'fromY': " + this.from[1] +
                ", 'toX': " + this.to[0] + ", 'toY': " + this.to[1] +
                ", 'target': " + (this.target === 0 /* OnField */) ? "on field" : "wall" + "}";
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
            shootBox.getTargetText().innerHTML = this.target === 0 /* OnField */ ? "On Field" : "Wall";
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
});
//# sourceMappingURL=shootEvent.js.map