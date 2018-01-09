"use strict";
class WallCreationBox {
    getSelf() {
        if (this.self == undefined) {
            this.self = document.getElementById("wallCreationBox");
        }
        return this.self;
    }
    getBuildWall() {
        if (this.buildWall == undefined) {
            this.buildWall = document.getElementById("buildWall");
        }
        return this.buildWall;
    }
    getAddWallNW() {
        if (this.addWallNW == undefined) {
            this.addWallNW = document.getElementById("addWallNW");
        }
        return this.addWallNW;
    }
    getAddWallNE() {
        if (this.addWallNE == undefined) {
            this.addWallNE = document.getElementById("addWallNE");
        }
        return this.addWallNE;
    }
    getAddWallE() {
        if (this.addWallE == undefined) {
            this.addWallE = document.getElementById("addWallE");
        }
        return this.addWallE;
    }
    getAddWallSE() {
        if (this.addWallSE == undefined) {
            this.addWallSE = document.getElementById("addWallSE");
        }
        return this.addWallSE;
    }
    getAddWallSW() {
        if (this.addWallSW == undefined) {
            this.addWallSW = document.getElementById("addWallSW");
        }
        return this.addWallSW;
    }
    getAddWallW() {
        if (this.addWallW == undefined) {
            this.addWallW = document.getElementById("addWallW");
        }
        return this.addWallW;
    }
    getRemoveWall() {
        if (this.removeWall == undefined) {
            this.removeWall = document.getElementById("removeWall");
        }
        return this.removeWall;
    }
    getRemoveWallNW() {
        if (this.removeWallNW == undefined) {
            this.removeWallNW = document.getElementById("removeWallNW");
        }
        return this.removeWallNW;
    }
    getRemoveWallNE() {
        if (this.removeWallNE == undefined) {
            this.removeWallNE = document.getElementById("removeWallNE");
        }
        return this.removeWallNE;
    }
    getRemoveWallE() {
        if (this.removeWallE == undefined) {
            this.removeWallE = document.getElementById("removeWallE");
        }
        return this.removeWallE;
    }
    getRemoveWallSE() {
        if (this.removeWallSE == undefined) {
            this.removeWallSE = document.getElementById("removeWallSE");
        }
        return this.removeWallSE;
    }
    getRemoveWallSW() {
        if (this.removeWallSW == undefined) {
            this.removeWallSW = document.getElementById("removeWallSW");
        }
        return this.removeWallSW;
    }
    getRemoveWallW() {
        if (this.removeWallW == undefined) {
            this.removeWallW = document.getElementById("removeWallW");
        }
        return this.removeWallW;
    }
    getSaveBuildings() {
        if (this.saveBuildings == undefined) {
            this.saveBuildings = document.getElementById("SaveBuildings");
        }
        return this.saveBuildings;
    }
}
