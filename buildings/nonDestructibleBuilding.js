class NonDestructibleBuilding extends Building {
    constructor(type, position, secondPosition, owner) {
        super(type, position, owner);
        this.secondPosition = secondPosition;
    }
}
