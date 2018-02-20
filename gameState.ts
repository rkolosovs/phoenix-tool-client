export class GameState{
    static realms: Realm[] = [];
    static fields: Field[] = [];
    static rivers: River[] = [];
    static armies: Army[] = [];
    static buildings: Building[] = [];
    static pendingNewEvents: PhoenixEvent[] = [];
    static login: string = "guest"; // either realm tag, "sl", or "guest"
    //"st" for start, "fi" for finished
    static currentTurn: {'turn': number, 'realm': string, 'status': string} = {'turn': 0, 'realm': "sl", 'status': "st"};

    //TODO: containers for characters, mages, etc.

    static purgeDeadArmies(){
        GameState.armies = GameState.armies.filter(army => army.isAlive());
        //TODO: Check if living fleets may have a reference to supposedly removed transported armies
    }
}