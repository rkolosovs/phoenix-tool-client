class River{
    readonly leftBank: [number, number];
    readonly rightBank: [number, number];

    constructor(leftBank: [number, number], rightBank: [number, number]){
        this.leftBank = leftBank;
        this.rightBank = rightBank;
    }
}