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
var RiderArmy = /** @class */ (function (_super) {
    __extends(RiderArmy, _super);
    function RiderArmy(id, owner, troopCount, officerCount, position, movePoints, heightPoints, isGuard) {
        var _this = this;
        if (isGuard != undefined) {
            _this = _super.call(this, id, owner, troopCount, officerCount, 0, 0, position, movePoints, heightPoints, isGuard) || this;
        }
        else {
            _this = _super.call(this, id, owner, troopCount, officerCount, 0, 0, position, movePoints, heightPoints) || this;
        }
        return _this;
    }
    RiderArmy.prototype.takeRPDamage = function (rpDamage) {
        this.takeDamage(Math.ceil(rpDamage / (RIDER_RP +
            OFFICER_RP * (this.officerCount / this.troopCount))));
    };
    RiderArmy.prototype.canHaveCatapults = function () {
        return false;
    };
    RiderArmy.prototype.getRoomPointsSansOfficers = function () {
        return this.troopCount * RIDER_RP;
    };
    RiderArmy.prototype.takeBPDamage = function (bpDamage) {
        var totalBP = this.troopCount * RIDER_BP;
        this.setOfficerCount(this.officerCount - this.troopCount * (bpDamage / totalBP));
        this.setTroopCount(this.troopCount - bpDamage / RIDER_BP);
        this.wasShotAt = true;
    };
    RiderArmy.prototype.fireLightCatapults = function (dicerolls, badConditions) {
        return 0;
    };
    RiderArmy.prototype.fireHeavyCatapults = function (dicerolls, badConditions) {
        return 0;
    };
    RiderArmy.MAX_MOVE_POINTS = 21;
    return RiderArmy;
}(LandArmy));
