"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function (coord) {
    var state = Lyngk.State.VACANT;
    var pilePieces = [];
    var coordinates;

    var init = function(coord) {
        coordinates = coord;
    }
    init(coord);

    this.get_state = function () {
        return state;
    }

    this.add_piece = function (p) {
        if (state === Lyngk.State.VACANT) {
            pilePieces.push(p)
            state = Lyngk.State.ONE_PIECE;
        } else if (state === Lyngk.State.ONE_PIECE){
            pilePieces.push(p)
            state = Lyngk.State.STACK;
        } else if (pilePieces.length > 1 && pilePieces.length < 4){
            pilePieces.push(p);
        } else {
            pilePieces.push(p);
            state = Lyngk.State.FULL_STACK;
        }
    }

    this.get_color = function () {
        return pilePieces[pilePieces.length-1].get_color();
    }

    this.get_pilePieces = function () {
        return pilePieces;
    }
    
    this.get_hauteur = function () {
        return pilePieces.length;
    }

    this.get_Coordinates = function () {
        return coordinates;
    }

    this.remove_piece = function () {
        var res = pilePieces.pop();
        state--;
        return res;
    }
};
