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

import {Turn} from "../gameState/gameState";
import config from "../../config/config";
import {XMLHttpRequest} from "xmlhttprequest";

export type RealmJSON = {
    tag: string,
    name: string,
    color: string,
    homeTurf: number,
    active: boolean
}

export type FieldJSON = {
    type: number,
    x: number,
    y: number
}

export type RiverJSON = {
    firstX: number,
    firstY: number,
    secondX: number,
    secondY: number
}

export type BuildingJSON = {
    name: string,
    type: number,
    x: number,
    y: number
}

export type BorderJSON = {
    land: number[][],
    tag: string
}

export type ArmyJSON = {
    armyId: number,
    count: number,
    leaders: number,
    mounts: number,
    lkp: number,
    skp: number,
    x: number,
    y: number,
    realm: string,
    isGuard: boolean,
    isLoadedIn: number,
    heightPoints: number,
    movementPoints: number
}

export type EventJSON = {
    type: string,
    content: Object,
    pk: string
}

function loadAny(message: string, urlSuffix: string, retries: number = 0): Promise<any> {
    console.log(message, retries);
    return new Promise<any>((resolve, reject) => {
        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && this.status === 200) {
                console.log("Response text is " + xhr.responseText.slice(0,
                    Math.min(500, xhr.responseText.length)));
                resolve(JSON.parse(xhr.responseText));
            }
            else if (xhr.readyState === 4) {
                console.log('Request failed.  Returned status of ' + this.status);
                if (this.status === 0 && retries < config.max_retries){
                    setTimeout(() => loadAny(message, urlSuffix,retries+1), 100);
                } else {
                    reject();
                }
            } else {
                console.log('Waiting for request to be done. Current ready state is ' + xhr.readyState);
            }
        };

        xhr.open('GET', config.server_url + urlSuffix);
        xhr.send();
    });
}

export async function loadCurrentTurn(): Promise<Turn> {
    return (loadAny("Loading current turn. Attempt ",
        "/databaseLink/getturn/") as Promise<Turn>);
}

export async function loadRealms(): Promise<RealmJSON[]> {
    return (loadAny("Loading realms. Attempt ",
        "/databaseLink/getrealms/") as Promise<RealmJSON[]>);
}

export async function loadFields(): Promise<FieldJSON[]> {
    return (loadAny("Loading fields. Attempt ",
        "/databaseLink/fielddata/") as Promise<FieldJSON[]>);
}

export async function loadRivers(): Promise<RiverJSON[]> {
    return (loadAny("Loading rivers. Attempt ",
        "/databaseLink/getriverdata/") as Promise<RiverJSON[]>);
}

export async function loadBuildings(): Promise<BuildingJSON[]> {
    return (loadAny("Loading buildings. Attempt ",
        "/databaseLink/buildingdata/") as Promise<BuildingJSON[]>);
}

export async function loadBorders(): Promise<BorderJSON[]> {
    return (loadAny("Loading borders. Attempt ",
        "/databaseLink/getborderdata/") as Promise<BorderJSON[]>);
}

export async function loadArmies(): Promise<ArmyJSON[]> {
    return (loadAny("Loading armies. Attempt ",
        "/databaseLink/armydata/") as Promise<ArmyJSON[]>);
}

export async function loadEvents(): Promise<EventJSON[]> {
    return (loadAny("Loading events. Attempt ",
        "/databaseLink/getevents/") as Promise<EventJSON[]>);
}