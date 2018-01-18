class GameState{
    static realms: Realm[] = [];
    static fields: Field[] = [];
    static rivers: River[] = [];
    static armies: Army[] = [];
    static buildings: Building[] = [];
    //TODO: containers for characters, mages, etc.

    static purgeDeadArmies(){
        GameState.armies = GameState.armies.filter(army => army.isAlive());
        //TODO: Check if living fleets may have a reference to supposedly removed transported armies
    }
}