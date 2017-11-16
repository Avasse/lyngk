"use strict";

Lyngk.Piece = function (col) {
    var color;
    var init = function(col) {
        color = col;
    };
    init(col);

    this.getColor = function () {
        return color;
    };
};
