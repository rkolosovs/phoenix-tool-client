"use strict";
class Realm {
    constructor(name, tag, color, homeTurf, active) {
        this.name = "";
        this.tag = "";
        this.color = "000,000,000";
        this.homeTurf = FieldType.SHALLOWS;
        this.territory = [];
        this.name = name;
        this.tag = tag;
        this.color = color;
        this.homeTurf = homeTurf;
        this.active = active;
    }
}
