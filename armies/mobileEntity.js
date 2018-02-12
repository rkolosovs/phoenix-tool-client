"use strict";
class MobileEntity extends MapEntity {
    constructor(id, owner, position, movePoints, heightPoints) {
        super(position, owner);
        this.oldPosition = [0, 0];
        this.movePoints = MobileEntity.MAX_MOVE_POINTS;
        this.heightPoints = MobileEntity.MAX_HEIGHT_POINTS;
        this.possibleMoves = [];
        this.onMultifield = false;
        // copy the position so that this object doesn't share a reference with anything else
        this.oldPosition[0] = position[0];
        this.oldPosition[1] = position[1];
        this.setID(id);
        this.setMovePoints(movePoints);
        this.setHeightPoints(heightPoints);
    }
    changePosition(newPos) {
        this.oldPosition[0] = newPos[0];
        this.oldPosition[1] = newPos[1];
        this.position[0] = newPos[0];
        this.position[1] = newPos[1];
    }
    getOldPosition() {
        return [this.oldPosition[0], this.oldPosition[1]];
    }
    getMovePoints() {
        return this.movePoints;
    }
    getMaxMovePoints() {
        return MobileEntity.MAX_MOVE_POINTS;
    }
    getMaxHeightPoints() {
        return MobileEntity.MAX_HEIGHT_POINTS;
    }
    setMovePoints(value) {
        this.movePoints = Math.min(this.getMaxMovePoints(), Math.max(0, value));
    }
    getHeightPoints() {
        return this.heightPoints;
    }
    setHeightPoints(value) {
        this.heightPoints = Math.min(this.getMaxHeightPoints(), Math.max(0, value));
    }
    getID() {
        return this.id;
    }
    setID(value) {
        this.id = value % 100;
    }
}
MobileEntity.MAX_MOVE_POINTS = 42;
MobileEntity.MAX_HEIGHT_POINTS = 2;
