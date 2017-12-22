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
var LandArmy = /** @class */ (function (_super) {
    __extends(LandArmy, _super);
    function LandArmy(id, owner, troopCount, officerCount, lightCatapultCount, heavyCatapultCount, position, movePoints, heightPoints, isGuard) {
        var _this = this;
        _this.isTransported = false;
        if (isGuard != undefined) {
            _this = _super.call(this, id, owner, troopCount, officerCount, lightCatapultCount, heavyCatapultCount, position, movePoints, heightPoints, isGuard) || this;
        }
        else {
            _this = _super.call(this, id, owner, troopCount, officerCount, lightCatapultCount, heavyCatapultCount, position, movePoints, heightPoints) || this;
        }
        return _this;
    }
    LandArmy.prototype.canConquer = function () {
        return;
    };
    return LandArmy;
}(Army));
