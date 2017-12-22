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
var Fleet = /** @class */ (function (_super) {
    __extends(Fleet, _super);
    function Fleet(id, owner, troopCount, officerCount, lightCatapultCount, heavyCatapultCount, position, movePoints, heightPoints, isGuard) {
        var _this = this;
        _this.transportedArmies = [];
        if (isGuard != undefined) {
            _this = _super.call(this, id, owner, troopCount, officerCount, lightCatapultCount, heavyCatapultCount, position, movePoints, heightPoints, isGuard) || this;
        }
        else {
            _this = _super.call(this, id, owner, troopCount, officerCount, lightCatapultCount, heavyCatapultCount, position, movePoints, heightPoints) || this;
        }
        return _this;
    }
    Fleet.prototype.getErkenfaraID = function () {
        return 300 + this.id;
    };
    Fleet.prototype.canHaveCatapults = function () {
        return !this.isGuard;
    };
    Fleet.prototype.getRoomPointsSansOfficers = function () {
        if (isGuard) {
            return this.troopCount * SHIP_RP * GUARD_RP_MULT +
                this.lightCatapultCount * LIGHT_WS_RP + this.heavyCatapultCount * HEAVY_WS_RP;
        }
        else {
            return this.troopCount * SHIP_RP +
                this.lightCatapultCount * LIGHT_WS_RP + this.heavyCatapultCount * HEAVY_WS_RP;
        }
    };
    Fleet.prototype.canConquer = function () {
        return false;
    };
    Fleet.prototype.takeBPDamage = function (bpDamage) {
        var totalBP = this.troopCount * SHIP_BP +
            this.lightCatapultCount * LIGHT_WS_BP + this.heavyCatapultCount * HEAVY_WS_BP;
        this.setOfficerCount(this.officerCount - this.troopCount * (bpDamage / totalBP));
        this.setTroopCount(this.troopCount - bpDamage * (this.troopCount * SHIP_BP / totalBP) / SHIP_BP);
        this.setLightCatapultCount(this.lightCatapultCount - bpDamage * (this.lightCatapultCount * LIGHT_WS_BP /
            totalBP) / LIGHT_WS_BP);
        this.setHeavyCatapultCount(this.heavyCatapultCount - bpDamage * (this.heavyCatapultCount * HEAVY_WS_BP /
            totalBP) / HEAVY_WS_BP);
        this.killTransportedTroops();
        this.wasShotAt = true;
    };
    Fleet.prototype.fireLightCatapults = function (dicerolls, badConditions) {
        var rollLen = dicerolls.length;
        var damageBP = 0;
        if (badConditions === "lkp") {
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
                        damageBP += 25;
                        break;
                    case 5:
                        damageBP += 50;
                        break;
                    case 4:
                        damageBP += 75;
                        break;
                    case 3:
                        damageBP += 100;
                        break;
                    case 2:
                        damageBP += 125;
                        break;
                    case 1:
                        damageBP += 150;
                        break;
                    case 0:
                        damageBP += 175;
                        break;
                }
            }
        }
        return damageBP;
    };
    Fleet.prototype.fireHeavyCatapults = function (dicerolls, badConditions) {
        var rollLen = dicerolls.length;
        var damageBP = 0;
        if (badConditions === "short") {
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
                        damageBP += 130;
                        break;
                    case 3:
                        damageBP += 160;
                        break;
                    case 2:
                        damageBP += 190;
                        break;
                    case 1:
                        damageBP += 220;
                        break;
                    case 0:
                        damageBP += 250;
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
                        damageBP += 0;
                        break;
                    case 7:
                        damageBP += 5;
                        break;
                    case 6:
                        damageBP += 10;
                        break;
                    case 5:
                        damageBP += 30;
                        break;
                    case 4:
                        damageBP += 40;
                        break;
                    case 3:
                        damageBP += 50;
                        break;
                    case 2:
                        damageBP += 65;
                        break;
                    case 1:
                        damageBP += 80;
                        break;
                    case 0:
                        damageBP += 100;
                        break;
                }
            }
        }
        else if (badConditions === "farAndUp") {
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
        else if (badConditions === "far") {
            for (var i = 0; i < rollLen; i++) {
                switch (dicerolls[i]) {
                    case 9:
                        damageBP += 0;
                        break;
                    case 8:
                        damageBP += 0;
                        break;
                    case 7:
                        damageBP += 0;
                        break;
                    case 6:
                        damageBP += 5;
                        break;
                    case 5:
                        damageBP += 10;
                        break;
                    case 4:
                        damageBP += 20;
                        break;
                    case 3:
                        damageBP += 40;
                        break;
                    case 2:
                        damageBP += 60;
                        break;
                    case 1:
                        damageBP += 80;
                        break;
                    case 0:
                        damageBP += 100;
                        break;
                }
            }
        }
        return damageBP;
    };
    Fleet.prototype.takeDamage = function (losses) {
        _super.prototype.takeDamage.call(this, losses);
        this.killTransportedTroops();
    };
    Fleet.prototype.usedTransportCapacity = function () {
        var loaded = 0;
        this.transportedArmies.forEach(function (transportedArmy) { return loaded += transportedArmy.getRoomPoints(); });
        return loaded;
    };
    Fleet.prototype.maxTransportCapacity = function () {
        return this.troopCount * SHIP_TRANSPORT_CAPACITY;
    };
    Fleet.prototype.freeTransportCapacity = function () {
        return this.maxTransportCapacity() - this.usedTransportCapacity();
    };
    Fleet.prototype.canLoad = function (armyToLoad) {
        return this.freeTransportCapacity() >= armyToLoad.getRoomPoints();
    };
    Fleet.prototype.loadArmy = function (army) {
        if (listOfArmies[index].raumpunkte() <= this.currentCapacity()) {
            this.loadedArmies.push(army);
            army.isTransported = true;
            return "ok";
        }
        else {
            return "This army is too big for this fleet.";
        }
    };
    Fleet.prototype.unloadArmy = function (army) {
        var armyIndex = this.transportedArmies.indexOf(army);
        if (armyIndex >= 0) {
            this.transportedArmies.splice(armyIndex, 1);
        }
    };
    Fleet.prototype.killTransportedTroops = function () {
        var usedCapacity = this.usedTransportCapacity();
        var overload = usedCapacity - this.maxTransportCapacity();
        if (overload > 0) {
            this.transportedArmies.forEach(function (transportedArmy) {
                return transportedArmy.takeRPDamage(Math.ceil(overload * (transportedArmy.getRoomPoints() / usedCapacity)));
            });
        }
    };
    Fleet.MAX_HEIGHT_POINTS = 0;
    return Fleet;
}(Army));
