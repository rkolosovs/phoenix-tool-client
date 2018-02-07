class Move {
    constructor(public movePoints: number, public heightPoints: number, public loading: boolean,
                public unloading: boolean, public destination: [number, number], public direction: Direction) {}
}