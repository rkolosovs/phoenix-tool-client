"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Move {
    constructor(movePoints, heightPoints, loading, unloading, destination, direction) {
        this.movePoints = movePoints;
        this.heightPoints = heightPoints;
        this.loading = loading;
        this.unloading = unloading;
        this.destination = destination;
        this.direction = direction;
    }
}
exports.Move = Move;
