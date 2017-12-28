class MapEntity{
    protected position: [number, number];
    owner: Realm;

    constructor(position: [number, number], owner: Realm){
        this.position = position;
        this.owner = owner;
    }

    getPosition(): [number, number]{
        return this.position;
    }
}