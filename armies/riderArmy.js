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
    function RiderArmy(args) {
        var _this = this;
        return _this;
        //TODO
    }
    RiderArmy.prototype.takeRPDamage = function (rpDamage) {
        this.takeDamage(Math.ceil(rpDamage / (RIDER_RP +
            OFFICER_RP * (this.officerCount / this.troopCount))));
    };
    RiderArmy.prototype.canHaveCatapults = function () {
        return false;
    };
    RiderArmy.prototype.canConquer = function () {
        //TODO
    };
    RiderArmy.prototype.takeBPDamage = function (bpDamage) {
        //TODO
    };
    RiderArmy.prototype.fireLightCatapults = function (args) {
        //TODO
    };
    RiderArmy.prototype.fireHeavyCatapults = function (args) {
        //TODO
    };
    RiderArmy.MAX_MOVE_POINTS = 21;
    return RiderArmy;
}(LandArmy));
