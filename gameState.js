"use strict";
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
//# sourceMappingURL=gameState.js.map