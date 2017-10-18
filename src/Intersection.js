"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function (c) {
    var state = Lyngk.State.VACANT;
    var pieces = [];

    var init = function(c) {
        Lyngk.Coordinates = c;
    }
    init(c);

    this.get_state = function () {
        return state;
    }

    this.add_piece = function (p) {
        if (state === Lyngk.State.VACANT) {
            pieces.push(p)
            state = Lyngk.State.ONE_PIECE;
        } else if (state === Lyngk.State.ONE_PIECE){
            pieces.push(p)
            state = Lyngk.State.STACK;
        } else if (pieces.length > 1 && pieces.length < 4){
            pieces.push(p);
        } else {
            pieces.push(p);
            state = Lyngk.State.FULL_STACK;
        }

    }

    this.get_color = function () {
        return pieces[pieces.length-1].get_Color();
    }
};
