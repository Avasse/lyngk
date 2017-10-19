"use strict";

Lyngk.Piece = function (col) {
    var color;
    var init = function(col) {
        color = col;
    }
    init(col);

    this.get_color = function () {
        return color;
    }
};
