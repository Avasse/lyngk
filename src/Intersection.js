"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function () {
    var state = Lyngk.State.VACANT;
    var pieces = [];

    var init = function() {}
    init();

    this.get_State = function () {
        return state;
    }

    this.add_Piece = function (p) {
        if (state === Lyngk.State.VACANT) {
            pieces.push(p)
            state = Lyngk.State.ONE_PIECE;
        }
        else if(state === Lyngk.State.ONE_PIECE){
            pieces.push(p)
            state = Lyngk.State.STACK;
        }
    }

    this.get_Color = function () {
        return pieces[pieces.length-1].get_Color();
    }
};
