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
var Army = /** @class */ (function (_super) {
    __extends(Army, _super);
    function Army(id, owner, troopCount, officerCount, lightCatapultCount, heavyCatapultCount, position, movePoints, heightPoints, isGuard) {
        var _this = _super.call(this, id, owner, position, movePoints, heightPoints) || this;
        _this.lightCatapultCount = 0;
        _this.heavyCatapultCount = 0;
        _this.isGuard = false;
        _this.wasShotAt = false;
        _this.setTroopCount(troopCount);
        _this.setOfficerCount(officerCount);
        if (isGuard != undefined) {
            _this.isGuard = isGuard;
        }
        _this.setLightCatapultCount(lightCatapultCount);
        _this.setHeavyCatapultCount(heavyCatapultCount);
        return _this;
    }
    Army.prototype.getTroopCount = function () {
        return this.troopCount;
    };
    Army.prototype.setTroopCount = function (value) {
        this.troopCount = Math.max(0, value);
    };
    Army.prototype.getOfficerCount = function () {
        return this.officerCount;
    };
    Army.prototype.setOfficerCount = function (value) {
        this.officerCount = Math.max(0, value);
    };
    Army.prototype.getLightCatapultCount = function () {
        return this.lightCatapultCount;
    };
    Army.prototype.setLightCatapultCount = function (value) {
        if (this.canHaveCatapults()) {
            this.lightCatapultCount = Math.max(0, value);
        }
    };
    Army.prototype.getHeavyCatapultCount = function () {
        return this.heavyCatapultCount;
    };
    Army.prototype.setHeavyCatapultCount = function (value) {
        if (this.canHaveCatapults()) {
            this.heavyCatapultCount = Math.max(0, value);
        }
    };
    Army.prototype.takeDamage = function (losses) {
        var factor = losses / this.troopCount;
        this.setTroopCount(this.troopCount - Math.floor(losses));
        this.setOfficerCount(this.officerCount - Math.floor(this.officerCount * factor));
        this.setLightCatapultCount(this.lightCatapultCount - Math.floor(this.lightCatapultCount * factor));
        this.setHeavyCatapultCount(this.heavyCatapultCount - Math.floor(this.heavyCatapultCount * factor));
    };
    Army.prototype.getRoomPoints = function () {
        return getRoomPointsSansOfficers() + this.officerCount * OFFICER_RP;
    };
    Army.prototype.leaderGp = function () {
        var gp = 0;
        if (this.officerCount < 101) {
            gp += this.officerCount;
        }
        else if (this.officerCount < 201) {
            gp += (100 + (this.officerCount - 100) / 2);
        }
        else {
            gp += 200;
        }
        if (this.isGuard) {
            gp += 300;
        }
        return gp;
    };
    Army.prototype.isAlive = function () {
        //TODO: Check for character leaders on the field once characters are implemented.
        return this.getRoomPointsSansOfficers() >= 100 && this.officerCount >= 1;
    };
    return Army;
}(MapEntity));
