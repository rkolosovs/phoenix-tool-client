class InfoBox{
    private self: HTMLDivElement;
    private armySelectBtns: HTMLDivElement;
    private armyId: HTMLHeadingElement;
    private guard: HTMLParagraphElement;
    private count: HTMLParagraphElement;
    private leaders: HTMLParagraphElement;
    private mounts: HTMLParagraphElement;
    private lkp: HTMLParagraphElement;
    private skp: HTMLParagraphElement;
    private movePoints: HTMLParagraphElement;
    private heightPoints: HTMLParagraphElement;
    private mount: HTMLButtonElement;
    private unMount: HTMLButtonElement;
    private splitBtn: HTMLButtonElement;
    private shoot: HTMLButtonElement;
    private logoutBtn: HTMLButtonElement;

    getSelf(): HTMLDivElement{
        if(this.self == undefined){
            this.self = document.getElementById("infoBox") as HTMLDivElement;
        }
        return this.self;
    }

    getArmySelectButtons(): HTMLDivElement{
        if(this.armySelectBtns == undefined){
            this.armySelectBtns = document.getElementById("armySelectBtns") as HTMLDivElement;
        }
        return this.armySelectBtns;
    }

    getArmyIdText(): HTMLHeadingElement{
        if(this.armyId == undefined){
            this.armyId = document.getElementById("armyId") as HTMLHeadingElement;
        }
        return this.armyId;
    }

    getGuardText(): HTMLParagraphElement{
        if(this.guard == undefined){
            this.guard = document.getElementById("guard") as HTMLParagraphElement;
        }
        return this.guard;
    }

    getCountText(): HTMLParagraphElement{
        if(this.count == undefined){
            this.count = document.getElementById("count") as HTMLParagraphElement;
        }
        return this.count;
    }

    getLeadersText(): HTMLParagraphElement{
        if(this.leaders == undefined){
            this.leaders = document.getElementById("leaders") as HTMLParagraphElement;
        }
        return this.leaders;
    }

    getMountsText(): HTMLParagraphElement{
        if(this.mounts == undefined){
            this.mounts = document.getElementById("mounts") as HTMLParagraphElement;
        }
        return this.mounts;
    }

    getLKPText(): HTMLParagraphElement{
        if(this.lkp == undefined){
            this.lkp = document.getElementById("lkp") as HTMLParagraphElement;
        }
        return this.lkp;
    }

    getSKPText(): HTMLParagraphElement{
        if(this.skp == undefined){
            this.skp = document.getElementById("skp") as HTMLParagraphElement;
        }
        return this.skp;
    }

    getMovePointsText(): HTMLParagraphElement{
        if(this.movePoints == undefined){
            this.movePoints = document.getElementById("movePoints") as HTMLParagraphElement;
        }
        return this.movePoints;
    }

    getHeightPointsText(): HTMLParagraphElement{
        if(this.heightPoints == undefined){
            this.heightPoints = document.getElementById("heightPoints") as HTMLParagraphElement;
        }
        return this.heightPoints;
    }

    getMountButton(): HTMLButtonElement{
        if(this.mount == undefined){
            this.mount = document.getElementById("mount") as HTMLButtonElement;
        }
        return this.mount;
    }

    getUnMountButton(): HTMLButtonElement{
        if(this.unMount == undefined){
            this.unMount = document.getElementById("unMount") as HTMLButtonElement;
        }
        return this.unMount;
    }

    getSplitButton(): HTMLButtonElement{
        if(this.splitBtn == undefined){
            this.splitBtn = document.getElementById("splitBtn") as HTMLButtonElement;
        }
        return this.splitBtn;
    }

    getShootButton(): HTMLButtonElement{
        if(this.shoot == undefined){
            this.shoot = document.getElementById("shoot") as HTMLButtonElement;
        }
        return this.shoot;
    }

    getLogoutButton(): HTMLButtonElement{
        if(this.logoutBtn == undefined){
            this.logoutBtn = document.getElementById("logoutBtn") as HTMLButtonElement;
        }
        return this.logoutBtn;
    }
}