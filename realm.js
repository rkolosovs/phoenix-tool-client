"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Realm {
    constructor(name, tag, color, homeTurf, active) {
        this.name = "";
        this.tag = "";
        this.color = "000,000,000";
        this.homeTurf = 0 /* SHALLOWS */;
        this.territory = [];
        this.name = name;
        this.tag = tag;
        this.color = color;
        this.homeTurf = homeTurf;
        this.active = active;
    }
    getTerritoryCoordinates() {
        return this.territory.map(field => field.coordinates);
    }
}
exports.Realm = Realm;
