import {Army} from "./armies/army";
import {Field} from "./map/field";
import {Realm} from "./realm";
import {River} from "./map/river";
import {Building} from "./buildings/building";
import {PhoenixEvent} from "./events/event";

export class GameState{
    static realms: Realm[] = [];
    static fields: Field[] = [];
    static rivers: River[] = [];
    static armies: Army[] = [];
    static buildings: Building[] = [];
    static newEvents: PhoenixEvent[] = [];
    static loadedEvents: PhoenixEvent[] = [];
    static login: string = "guest"; // either realm tag, "sl", or "guest"
    //"st" for start, "fi" for finished
    static currentTurn: {'turn': number, 'realm': string, 'status': string} = {'turn': 0, 'realm': "sl", 'status': "st"};

    static reset(): void {
        this.realms = [];
        this.fields = [];
        this.rivers = [];
        this.armies = [];
        this.buildings = [];
        this.newEvents = [];
        this.loadedEvents = [];
        this.login = "guest";
        this.currentTurn = {'turn': 0, 'realm': "sl", 'status': "st"};
    }
    //TODO: containers for characters, mages, etc.
}