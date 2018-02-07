class MoveEvent extends PhoenixEvent{
    
    constructor(protected id: number, protected type: string, protected status: string){
        super(id, type, status);
    }

    checkEvent(){

    }
    
    determineEventStatus(): void{

    }
    
    makeEventListItem(i: number): HTMLElement{
    let eli = document.createElement("DIV");
    eli.classList.add("eventListItem");
    eli.id = "eli" + i;
    
    //TODO fill with individual listItem style

    return this.commonEventListItem(eli, i);
    }
}