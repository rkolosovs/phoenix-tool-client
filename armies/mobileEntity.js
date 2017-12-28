class MobileEntity extends MapEntity {
    constructor(id, owner, position, movePoints, heightPoints) {
        super(position, owner);
        this.movePoints = MapEntity.MAX_MOVE_POINTS;
        this.heightPoints = MapEntity.MAX_HEIGHT_POINTS;
        this.oldPosition = position;
        this.setID(id);
        this.setMovePoints(movePoints);
        this.setHeightPoints(heightPoints);
    }
    getOldPosition() {
        return this.oldPosition;
    }
    getMovePoints() {
        return this.movePoints;
    }
    getMaxMovePoints() {
        return MapEntity.MAX_MOVE_POINTS;
    }
    getMaxHeightPoints() {
        return MapEntity.MAX_HEIGHT_POINTS;
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
