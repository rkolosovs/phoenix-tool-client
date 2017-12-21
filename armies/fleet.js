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
        //TODO
    };
    Fleet.prototype.fireLightCatapults = function (args) {
        //TODO
    };
    Fleet.prototype.fireHeavyCatapults = function (args) {
        //TODO
    };
    Fleet.prototype.takeDamage = function (losses) {
        _super.prototype.takeDamage.call(this, losses);
        this.killTransportedTroops();
    };
    Fleet.prototype.usedTransportCapacity = function () {
        //TODO
    };
    Fleet.prototype.maxTransportCapacity = function () {
        //TODO
    };
    Fleet.prototype.freeTransportCapacity = function () {
        //TODO
    };
    Fleet.prototype.canLoad = function (armyToLoad) {
        //TODO
    };
    Fleet.prototype.loadArmy = function (army) {
        //TODO
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
