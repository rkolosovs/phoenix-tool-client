"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GameState {
    static reset() {
        this.realms = [];
        this.fields = [];
        this.rivers = [];
        this.armies = [];
        this.buildings = [];
        this.newEvents = [];
        this.loadedEvents = [];
        this.login = "guest";
        this.currentTurn = { 'turn': 0, 'realm': "sl", 'status': "st" };
    }
}
GameState.realms = [];
GameState.fields = [];
GameState.rivers = [];
GameState.armies = [];
GameState.buildings = [];
GameState.newEvents = [];
GameState.loadedEvents = [];
GameState.login = "guest"; // either realm tag, "sl", or "guest"
//"st" for start, "fi" for finished
GameState.currentTurn = { 'turn': 0, 'realm': "sl", 'status': "st" };
exports.GameState = GameState;
