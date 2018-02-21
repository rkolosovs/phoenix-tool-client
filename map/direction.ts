export const enum Direction{
    NW, //North-west
    NE, //North-east
    E, //East
    SE, //South-east
    SW, //South-west
    W //West
}

export function stringToDirection(dir: string): Direction{
    switch(dir){
        case "nw": return Direction.NW;
        case "ne": return Direction.NE;
        case "e": return Direction.E;
        case "se": return Direction.SE;
        case "sw": return Direction.SW;
        case "w": return Direction.W;
        default: return -1; //TODO: Throw error here.
    }
}

export function directionToString(dir: Direction): string{
    switch(dir){
        case Direction.NW: return "nw";
        case Direction.NE: return "ne";
        case Direction.E: return "e";
        case Direction.SE: return "se";
        case Direction.SW: return "sw";
        case Direction.W: return "w";
        default: return ""; //TODO: Throw error here.
    }
}