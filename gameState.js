"use strict";
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
