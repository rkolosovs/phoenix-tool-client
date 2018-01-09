"use strict";
class MapEntity {
    constructor(position, owner) {
        this.position = position;
        this.owner = owner;
    }
    getPosition() {
        return this.position;
    }
}
