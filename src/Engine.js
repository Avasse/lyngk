"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};

Lyngk.Engine = function () {
    var intersections = [];

    const initPiecesNbColors = [
        {
            nb: 8,
            color: Lyngk.Color.IVORY
        },
        {
            nb: 8,
            color: Lyngk.Color.BLUE
        },
        {
            nb: 8,
            color: Lyngk.Color.RED
        },
        {
            nb: 8,
            color: Lyngk.Color.BLACK
        },
        {
            nb: 8,
            color: Lyngk.Color.GREEN
        },
        {
            nb: 3,
            color: Lyngk.Color.WHITE
        }
    ];

    // Init gaming_board
    var init = function() {
        // i represent the index of current valid position
        var i = 0;
        // For each number of pieces of a given color create an intersection and assign it a piece of the given color.
        initPiecesNbColors.forEach((function (pieces){
            while (pieces.nb !== 0) {
                var col = Lyngk.validPositions[i].charAt(0);
                var line = Lyngk.validPositions[i].charAt(1);
                var coordinates = new Lyngk.Coordinates(col,line);
                var intersection = new Lyngk.Intersection(coordinates);

                var piece = new Lyngk.Piece(pieces.color);
                intersection.add_piece(piece);
                intersections.push(intersection);
                pieces.nb--;
                // go to next valid position
                i++;
            }
        }))
    }
    init();

    this.get_intersections = function () {
        return intersections;
    }
};
