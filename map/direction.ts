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
        default: throw new Error("Invalid direction.");
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
        default: throw new Error("Invalid direction.");
    }
}

export function reverseDirection(direction: Direction): Direction {
    switch(direction){
        case Direction.NW: return Direction.SE;
        case Direction.NE: return Direction.SW;
        case Direction.E: return Direction.W;
        case Direction.SE: return Direction.NW;
        case Direction.SW: return Direction.NE;
        case Direction.W: return Direction.E;
        default: throw new Error("Invalid direction.");
    }
}