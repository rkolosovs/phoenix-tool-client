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

import {initialState, Turn} from "../gameState/gameState";
import config from "../../config/config";
import {XMLHttpRequest} from "xmlhttprequest";

export async function loadCurrentTurn(retries: number = 0): Promise<Turn> {
    console.log("Loading current turn. Attempt ", retries);
    return new Promise<Turn>((resolve, reject) => {
        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && this.status === 200) {
                console.log("Response text is " + xhr.responseText);
                resolve(JSON.parse(xhr.responseText));
            }
            else if (xhr.readyState === 4) {
                console.log('Request failed.  Returned status of ' + this.status);
                if (this.status === 0 && retries < config.max_retries){
                    setTimeout(() => loadCurrentTurn(retries+1), 100);
                } else {
                    reject(initialState.currentTurn);
                }
            } else {
                console.log('Waiting for request to be done. Current ready state is ' + xhr.readyState);
            }
        };

        xhr.open('GET', config.server_url + "/databaseLink/getturn/");
        xhr.send();
    });
}