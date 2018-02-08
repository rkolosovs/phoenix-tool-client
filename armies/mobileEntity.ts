abstract class MobileEntity extends MapEntity{
    static readonly MAX_MOVE_POINTS: number = 42;
    static readonly MAX_HEIGHT_POINTS: number = 2;
    protected oldPosition: [number, number];
    protected movePoints: number = MobileEntity.MAX_MOVE_POINTS;
    protected heightPoints: number = MobileEntity.MAX_HEIGHT_POINTS;
    protected id: number;
    public possibleMoves: Move[] = [];

    constructor(id: number, owner: Realm, position: [number, number], movePoints: number, heightPoints: number){
        super(position, owner);
        this.oldPosition = position;
        this.setID(id);
        this.setMovePoints(movePoints);
        this.setHeightPoints(heightPoints);
    }

    abstract getErkenfaraID(): number;

    abstract move(direction: Direction): void;

    abstract checkForPossibleMove(direction: Direction): void;

    abstract getRoomPoints(): number;

    changePosition(newPos: [number, number]): void {
        this.oldPosition = newPos;
        this.position = newPos;
    }

    getOldPosition(): [number, number]{
        return this.oldPosition;
    }

    getMovePoints(): number {
        return this.movePoints;
    }

    getMaxMovePoints(): number{
        return MobileEntity.MAX_MOVE_POINTS;
    }

    getMaxHeightPoints(): number{
        return MobileEntity.MAX_HEIGHT_POINTS;
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