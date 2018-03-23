"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function stringToDirection(dir) {
    switch (dir) {
        case "nw": return 0 /* NW */;
        case "ne": return 1 /* NE */;
        case "e": return 2 /* E */;
        case "se": return 3 /* SE */;
        case "sw": return 4 /* SW */;
        case "w": return 5 /* W */;
        default: throw new Error("Invalid direction.");
    }
}
exports.stringToDirection = stringToDirection;
function directionToString(dir) {
    switch (dir) {
        case 0 /* NW */: return "nw";
        case 1 /* NE */: return "ne";
        case 2 /* E */: return "e";
        case 3 /* SE */: return "se";
        case 4 /* SW */: return "sw";
        case 5 /* W */: return "w";
        default: throw new Error("Invalid direction.");
    }
}
exports.directionToString = directionToString;
function reverseDirection(direction) {
    switch (direction) {
        case 0 /* NW */: return 3 /* SE */;
        case 1 /* NE */: return 4 /* SW */;
        case 2 /* E */: return 5 /* W */;
        case 3 /* SE */: return 0 /* NW */;
        case 4 /* SW */: return 1 /* NE */;
        case 5 /* W */: return 2 /* E */;
        default: throw new Error("Invalid direction.");
    }
}
exports.reverseDirection = reverseDirection;
