"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};

Lyngk.Engine = function () {
    var intersections = [];

    // Init gaming_board
    var init = function() {
        Lyngk.validPositions.forEach((function (position) {
            var col = position.charAt(0);
            var line = position.charAt(1);
            var coordinates = new Lyngk.Coordinates(col,line);
            var intersection = new Lyngk.Intersection(coordinates);
            var piece = new Lyngk.Piece(Lyngk.Color.WHITE);
            intersection.add_piece(piece);
            intersections.push(intersection);
        }))
    }
    init();

    this.get_intersections = function () {
        return intersections;
    }
};
