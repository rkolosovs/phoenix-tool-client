/*Copyright 2018 Janos Klieber, Roberts Kolosovs, Peter Spieler
This file is part of Phoenixclient.

Phoenixclient is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Phoenixclient is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Phoenixclient.  If not, see <http://www.gnu.org/licenses/>.*/

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