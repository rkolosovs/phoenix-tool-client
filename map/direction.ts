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
        default: return -1;
    }
}