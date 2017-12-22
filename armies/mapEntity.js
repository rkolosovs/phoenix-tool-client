class MapEntity {
    constructor(id, owner, position, movePoints, heightPoints) {
        this.movePoints = MapEntity.MAX_MOVE_POINTS;
        this.heightPoints = MapEntity.MAX_HEIGHT_POINTS;
        this.position = position;
        this.oldPosition = position;
        this.owner = owner;
        this.setID(id);
        this.setMovePoints(movePoints);
        this.setHeightPoints(heightPoints);
    }
    getPosition() {
        return this.position;
    }
    getOldPosition() {
        return this.oldPosition;
    }
    getMovePoints() {
        return this.movePoints;
    }
    setMovePoints(value) {
        this.movePoints = Math.min(this.MAX_MOVE_POINTS, Math.max(0, value));
    }
    getHeightPoints() {
        return this.heightPoints;
    }
    setHeightPoints(value) {
        this.heightPoints = Math.min(this.MAX_HEIGHT_POINTS, Math.max(0, value));
    }
    getID() {
        return this.id;
    }
    setID(value) {
        this.id = value % 100;
    }
}
MapEntity.MAX_MOVE_POINTS = 42;
MapEntity.MAX_HEIGHT_POINTS = 2;
