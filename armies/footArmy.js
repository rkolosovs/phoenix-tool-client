var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var FootArmy = /** @class */ (function (_super) {
    __extends(FootArmy, _super);
    function FootArmy(id, owner, troopCount, officerCount, lightCatapultCount, heavyCatapultCount, position, movePoints, heightPoints, isGuard) {
        var _this = this;
        if (isGuard != undefined) {
            _this = _super.call(this, id, owner, troopCount, officerCount, lightCatapultCount, heavyCatapultCount, position, movePoints, heightPoints, isGuard) || this;
        }
        else {
            _this = _super.call(this, id, owner, troopCount, officerCount, lightCatapultCount, heavyCatapultCount, position, movePoints, heightPoints) || this;
        }
        return _this;
    }
    FootArmy.prototype.getMountCount = function () {
        return this.mountCount;
    };
    FootArmy.prototype.setMountCount = function (value) {
        this.mountCount = Math.max(0, value);
    };
    FootArmy.prototype.takeRPDamage = function (rpDamage) {
        this.takeDamage(Math.ceil(rpDamage / (FOOTMAN_RP +
            OFFICER_RP * (this.officerCount / this.troopCount) +
            this.mountCount / this.troopCount +
            LIGHT_CATA_RP * (this.lightCatapultCount / this.troopCount) +
            HEAVY_CATA_RP * (this.heavyCatapultCount / this.troopCount))));
    };
    FootArmy.prototype.canHaveCatapults = function () {
        return !this.isGuard;
    };
    FootArmy.prototype.getRoomPointsSansOfficers = function () {
        return this.troopCount * FOOTMAN_RP +
            this.lightCatapultCount * LIGHT_CATA_RP +
            this.heavyCatapultCount * HEAVY_CATA_RP +
            this.mountCount * MOUNT_RP;
    };
    FootArmy.prototype.takeBPDamage = function (bpDamage) {
        var totalBP = this.troopCount * FOOTMAN_BP + this.mountCount * MOUNT_BP +
            this.lightCatapultCount * LIGHT_CATA_BP + this.heavyCatapultCount * HEAVY_CATA_BP;
        this.setOfficerCount(this.officerCount - this.troopCount * (bpDamage / totalBP));
        this.setTroopCount(this.troopCount - bpDamage * (this.troopCount * FOOTMAN_BP / totalBP) / FOOTMAN_BP);
        this.setMountCount(this.mountCount - bpDamage * (this.mountCount * MOUNT_BP / totalBP) / MOUNT_BP);
        this.setLightCatapultCount(this.lightCatapultCount - bpDamage * (this.lightCatapultCount * LIGHT_CATA_BP /
            totalBP) / LIGHT_CATA_BP);
        this.setHeavyCatapultCount(this.heavyCatapultCount - bpDamage * (this.heavyCatapultCount * HEAVY_CATA_BP /
            totalBP) / HEAVY_CATA_BP);
        this.wasShotAt = true;
    };
    FootArmy.prototype.fireLightCatapults = function (dicerolls, badConditions) {
        var rollLen = dicerolls.length;
        var damageBP = 0;
        if (badConditions === "lkp") {
            for (var i = 0; i < rollLen; i++) {
                switch (dicerolls[i]) {
                    case 9:
                        damageBP += 5;
                        break;
                    case 8:
                        damageBP += 10;
                        break;
                    case 7:
                        damageBP += 40;
                        break;
                    case 6:
                        damageBP += 70;
                        break;
                    case 5:
                        damageBP += 100;
                        break;
                    case 4:
                        damageBP += 125;
                        break;
                    case 3:
                        damageBP += 150;
                        break;
                    case 2:
                        damageBP += 175;
                        break;
                    case 1:
                        damageBP += 200;
                        break;
                    case 0:
                        damageBP += 225;
                        break;
                }
            }
        }
        return damageBP;
    };
    FootArmy.prototype.fireHeavyCatapults = function (dicerolls, badConditions) {
        var rollLen = dicerolls.length;
        var damageBP = 0;
        if (badConditions === "short") {
            for (var i = 0; i < rollLen; i++) {
                switch (dicerolls[i]) {
                    case 9:
                        damageBP += 30;
                        break;
                    case 8:
                        damageBP += 60;
                        break;
                    case 7:
                        damageBP += 90;
                        break;
                    case 6:
                        damageBP += 120;
                        break;
                    case 5:
                        damageBP += 150;
                        break;
                    case 4:
                        damageBP += 180;
                        break;
                    case 3:
                        damageBP += 210;
                        break;
                    case 2:
                        damageBP += 240;
                        break;
                    case 1:
                        damageBP += 270;
                        break;
                    case 0:
                        damageBP += 300;
                        break;
                }
            }
        }
        else if (badConditions === "high") {
            for (var i = 0; i < rollLen; i++) {
                switch (dicerolls[i]) {
                    case 9:
                        damageBP += 0;
                        break;
                    case 8:
                        damageBP += 5;
                        break;
                    case 7:
                        damageBP += 10;
                        break;
                    case 6:
                        damageBP += 30;
                        break;
                    case 5:
                        damageBP += 40;
                        break;
                    case 4:
                        damageBP += 50;
                        break;
                    case 3:
                        damageBP += 65;
                        break;
                    case 2:
                        damageBP += 80;
                        break;
                    case 1:
                        damageBP += 100;
                        break;
                    case 0:
                        damageBP += 120;
                        break;
                }
            }
        }
        else if (badConditions === "farAndUp") {
            for (var i = 0; i < rollLen; i++) {
                switch (dicerolls[i]) {
                    case 9:
                        damageBP += 5;
                        break;
                    case 8:
                        damageBP += 10;
                        break;
                    case 7:
                        damageBP += 30;
                        break;
                    case 6:
                        damageBP += 40;
                        break;
                    case 5:
                        damageBP += 50;
                        break;
                    case 4:
                        damageBP += 65;
                        break;
                    case 3:
                        damageBP += 80;
                        break;
                    case 2:
                        damageBP += 100;
                        break;
                    case 1:
                        damageBP += 120;
                        break;
                    case 0:
                        damageBP += 150;
                        break;
                }
            }
        }
        else if (badConditions === "far") {
            for (var i = 0; i < rollLen; i++) {
                switch (dicerolls[i]) {
                    case 9:
                        damageBP += 0;
                        break;
                    case 8:
                        damageBP += 5;
                        break;
                    case 7:
                        damageBP += 10;
                        break;
                    case 6:
                        damageBP += 30;
                        break;
                    case 5:
                        damageBP += 50;
                        break;
                    case 4:
                        damageBP += 70;
                        break;
                    case 3:
                        damageBP += 90;
                        break;
                    case 2:
                        damageBP += 110;
                        break;
                    case 1:
                        damageBP += 130;
                        break;
                    case 0:
                        damageBP += 150;
                        break;
                }
            }
        }
        return damageBP;
    };
    FootArmy.MAX_MOVE_POINTS = 9;
    return FootArmy;
}(LandArmy));
