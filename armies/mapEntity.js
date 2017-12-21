var MapEntity = /** @class */ (function () {
    function MapEntity(id, owner, position, movePoints, heightPoints) {
        this.movePoints = MapEntity.MAX_MOVE_POINTS;
        this.heightPoints = MapEntity.MAX_HEIGHT_POINTS;
        this.position = position;
        this.oldPosition = position;
        this.owner = owner;
        this.setID(id);
        this.setMovePoints(movePoints);
        this.setHeightPoints(heightPoints);
    }
    MapEntity.prototype.getPosition = function () {
        return this.position;
    };
    MapEntity.prototype.getOldPosition = function () {
        return this.oldPosition;
    };
    MapEntity.prototype.getMovePoints = function () {
        return this.movePoints;
    };
    MapEntity.prototype.setMovePoints = function (value) {
        this.movePoints = Math.min(this.class.MAX_MOVE_POINTS, Math.max(0, value));
    };
    MapEntity.prototype.getHeightPoints = function () {
        return this.heightPoints;
    };
    MapEntity.prototype.setHeightPoints = function (value) {
        this.heightPoints = Math.min(this.class.MAX_HEIGHT_POINTS, Math.max(0, value));
    };
    MapEntity.prototype.getID = function () {
        return this.id;
    };
    MapEntity.prototype.setID = function (value) {
        this.id = value % 100;
    };
    MapEntity.MAX_MOVE_POINTS = 42;
    MapEntity.MAX_HEIGHT_POINTS = 2;
    return MapEntity;
}());
