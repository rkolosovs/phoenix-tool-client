"use strict";
class MapEntity {
    constructor(position, owner) {
        this.position = [0, 0];
        // copy the position so that this object doesn't share a reference with anything else
        this.position[0] = position[0];
        this.position[1] = position[1];
        this.owner = owner;
    }
    getPosition() {
        return [this.position[0], this.position[1]];
    }
}
