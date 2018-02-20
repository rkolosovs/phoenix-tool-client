"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GameState {
    //TODO: containers for characters, mages, etc.
    static purgeDeadArmies() {
        GameState.armies = GameState.armies.filter(army => army.isAlive());
        //TODO: Check if living fleets may have a reference to supposedly removed transported armies
    }
}
GameState.realms = [];
GameState.fields = [];
GameState.rivers = [];
GameState.armies = [];
GameState.buildings = [];
GameState.pendingNewEvents = [];
GameState.login = "guest"; // either realm tag, "sl", or "guest"
//"st" for start, "fi" for finished
GameState.currentTurn = { 'turn': 0, 'realm': "sl", 'status': "st" };
exports.GameState = GameState;
