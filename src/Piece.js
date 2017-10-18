"use strict";

Lyngk.Piece = function (c) {
    var color;
    var init = function(c) {
        color = c;
    }
    init(c);

    this.get_color = function () {
        return color;
    }
};
