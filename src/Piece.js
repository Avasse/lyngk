"use strict";

Lyngk.Piece = function (c) {
    var color;
    var init = function(c) {
        color = c;
    }
    init(c);

    this.get_Color = function () {
        return color;
    }
};
