"use strict";
class Wall extends DestructibleBuilding {
    //TODO: Know number of soldiers inside
    constructor(type, position, owner, buildPoints, facing, guardCount) {
        super(type, position, owner, buildPoints);
        this.facing = facing;
        //TODO: set number of soldiers
    }
}
