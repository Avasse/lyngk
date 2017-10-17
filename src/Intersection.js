"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function () {
    var state = Lyngk.State.VACANT;

    this.get_State = function () {
        return state;
    }

    this.add_Piece = function (p) {
        state = Lyngk.State.ONE_PIECE;
    }
};
