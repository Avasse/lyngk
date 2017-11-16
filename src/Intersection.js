"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function (coord) {
    var state = Lyngk.State.VACANT, stack = [], coordinates;
    var init = function(coord) {
        coordinates = coord;
    };
    init(coord);

    this.getState = function () {
        return state;
    };

    this.addCoin = function (p) {
        stack.push(p);
        if (state < 3) {
            state += 1;
        }
    };

    this.getColor = function () {
        return stack[stack.length - 1].getColor();
    };

    this.getStack = function () {
        return stack;
    };
    this.getHeight = function () {
        return stack.length;
    };

    this.getCoordinates = function () {
        return coordinates;
    };

    this.removeStack = function () {
        var res = stack;
        stack = [];
        state = Lyngk.State.VACANT;
        return res;
    };

    this.addStack = function (s) {
        stack = stack.concat(s);
    };
};
