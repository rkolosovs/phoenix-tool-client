class MapEntity{
    protected position: [number, number] = [0, 0];
    owner: Realm;

    constructor(position: [number, number], owner: Realm){
        // copy the position so that this object doesn't share a reference with anything else
        this.position[0] = position[0];
        this.position[1] = position[1];
        this.owner = owner;
    }

    getPosition(): [number, number]{
        return [this.position[0], this.position[1]];
    }
}