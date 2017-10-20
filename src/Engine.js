"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};

Lyngk.Engine = function () {
    var intersections = [];
    var initPiecesNbColors = [
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
    ]
    //Array prototype created to randomize elements array.
    //Return shuffled array. (found in StackOverflow)
    // Array.prototype.randomize = function() {
    //     var i = this.length, j, temp;
    //     if ( i == 0 ) return this;
    //     while ( --i ) {
    //         j = Math.floor( Math.random() * ( i + 1 ) );
    //         temp = this[i];
    //         this[i] = this[j];
    //         this[j] = temp;
    //     }
    //     return this;
    // }

    var init = function() {
        var initPieces = [];

        //For each number of a given colored piece, add corresponding piece into initPiece array.
        initPiecesNbColors.forEach((function (pieces){
            while (pieces.nb !== 0) {
                var piece = new Lyngk.Piece(pieces.color);
                initPieces.push(piece);
                pieces.nb--;
            }
        }))

        //Randomize initPieces array
        // initPieces = initPieces.randomize();

        // For each validPosition add a random piece stocked in initPiece into an intersection
        // Then add the intersection in intersections array.
        for (var i = 0; i < Lyngk.validPositions.length; i++){
            var col = Lyngk.validPositions[i].charAt(0);
            var line = Lyngk.validPositions[i].charAt(1);
            var coordinates = new Lyngk.Coordinates(col,line);
            var intersection = new Lyngk.Intersection(coordinates);
            intersection.add_piece(initPieces[i]);
            intersections.push(intersection);
        }
    }
    init();

    this.get_intersections = function () {
        return intersections;
    }
    
    this.move_pile = function (interRemove, interAdd) {
        var pile = interRemove.remove_pile();
        interAdd.add_pile(pile);
    }
};
