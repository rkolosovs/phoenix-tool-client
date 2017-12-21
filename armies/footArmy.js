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
    function FootArmy(args) {
        var _this = this;
        return _this;
        //TODO
    }
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
    FootArmy.prototype.canConquer = function () {
        //TODO
    };
    FootArmy.prototype.takeBPDamage = function (bpDamage) {
        //TODO
    };
    FootArmy.prototype.fireLightCatapults = function (args) {
        //TODO
    };
    FootArmy.prototype.fireHeavyCatapults = function (args) {
        //TODO
    };
    FootArmy.MAX_MOVE_POINTS = 9;
    return FootArmy;
}(LandArmy));
