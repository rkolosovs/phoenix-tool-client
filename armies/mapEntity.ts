class MapEntity{
    static readonly MAX_MOVE_POINTS = 42;
    static readonly MAX_HEIGHT_POINTS = 2;
    protected position: [number, number];
    protected oldPosition: [number, number];
    protected movePoints: number = MapEntity.MAX_MOVE_POINTS;
    protected heightPoints: number = MapEntity.MAX_HEIGHT_POINTS;
    protected id: number;
    owner: Realm;

    constructor(id: number, owner: Realm, position: [number, number], movePoints: number, heightPoints: number){
        this.position = position;
        this.oldPosition = position;
        this.owner = owner;
        this.setID(id);
        this.setMovePoints(movePoints);
        this.setHeightPoints(heightPoints);
    }

    getErkenfaraID(): number;

    move(destination: [number, number], moveCost: number, heightCost: number): void;
    //TODO: Move the appropriate part of the movement logic here.

    getRoomPoints(): number;

    getPosition(): [number, number]{
        return this.position;
    }

    getOldPosition(): [number, number]{
        return this.oldPosition;
    }

    getMovePoints(): number {
        return this.movePoints;
    }

    getMaxMovePoints(): number{
        return MapEntity.MAX_MOVE_POINTS;
    }

    getMaxHeightPoints(): number{
        return MapEntity.MAX_HEIGHT_POINTS;
    }

    setMovePoints(value: number): void{
        this.movePoints = Math.min(this.getMaxMovePoints(), Math.max(0, value));
    }

    getHeightPoints(): number {
        return this.heightPoints;
    }

    setHeightPoints(value: number): void{
        this.heightPoints = Math.min(this.getMaxHeightPoints(), Math.max(0, value));
    }

    getID(): number{
        return this.id;
    }

    setID(value: number): void{
        this.id = value%100;
    }
}