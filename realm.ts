class Realm {
    name: string = "";
    tag: string = "";
    color: string = "000,000,000";
    homeTurf: number = 0; //TODO: use terrain type enum once available

    constructor(name: string, tag: string, color: string, homeTurf: number){
        this.name = name;
        this.tag = tag;
        this.color = color;
        this.homeTurf = homeTurf;
    }
}