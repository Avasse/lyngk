"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function (coord) {
    var state = Lyngk.State.VACANT;
    var stack = [];
    var coordinates;

    var init = function(coord) {
        coordinates = coord;
    }
    init(coord);

    this.get_state = function () {
        if (stack.length === 0) return Lyngk.State.VACANT;
        else if (stack.length === 1) return Lyngk.State.ONE_PIECE;
        else if (stack.length > 1 && stack.length < 5) return Lyngk.State.STACK
        else return Lyngk.State.FULL_STACK;
    }

    this.add_coin = function (p) {
        if (state === Lyngk.State.VACANT) {
            stack.push(p)
            state = Lyngk.State.ONE_PIECE;
        } else if (state === Lyngk.State.ONE_PIECE){
            stack.push(p)
            state = Lyngk.State.STACK;
        } else if (stack.length > 1 && stack.length < 4){
            stack.push(p);
        } else {
            stack.push(p);
            state = Lyngk.State.FULL_STACK;
        }
    }

    this.get_color = function () {
        return stack[stack.length-1].get_color();
    }

    this.get_stack = function () {
        return stack;
    }
    
    this.get_height = function () {
        return stack.length;
    }

    this.get_Coordinates = function () {
        return coordinates;
    }

    this.remove_stack = function () {
        var res = stack;
        stack = [];
        return res;
    }

    this.add_stack = function (s) {
        stack = stack.concat(s);
    }
};
