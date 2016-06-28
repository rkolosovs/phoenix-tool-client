function character (name, gp, positionX, positionY) {
    this.characterName = name;
    this.gp = gutpunkte;
    this.x = positionX;
    this.y = positionY;
    //benennt Charaktere um
    this.rename = function(newName) {
        this.characterName = newName;
    }
}