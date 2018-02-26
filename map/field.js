"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Field {
    constructor(coordinates, type) {
        this.coordinates = coordinates;
        this.type = type;
    }
    getHeight() {
        switch (this.type) {
            case 0 /* SHALLOWS */:
            case 1 /* DEEPSEA */: return 0;
            case 2 /* LOWLANDS */:
            case 3 /* WOODS */:
            case 7 /* DESERT */:
            case 8 /* SWAMP */: return 1;
            case 4 /* HILLS */: return 2;
            case 5 /* HIGHLANDS */: return 3;
            case 6 /* MOUNTAINS */: return 4;
            default: return -1;
        }
    }
}
exports.Field = Field;
