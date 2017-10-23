"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};

Lyngk.Engine = function () {
    var intersections = [];
    var initCoinsNbColors = [
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
        var initCoins = [];

        //For each number of a given colored coin, add corresponding coin into initPiece array.
        initCoinsNbColors.forEach((function (coins){
            while (coins.nb !== 0) {
                var coin = new Lyngk.Piece(coins.color);
                initCoins.push(coin);
                coins.nb--;
            }
        }))

        //Randomize initCoins array
        // initCoins = initCoins.randomize();

        // For each validPosition add a random coin stocked in initPiece into an intersection
        // Then add the intersection in intersections array.
        for (var i = 0; i < Lyngk.validPositions.length; i++){
            var col = Lyngk.validPositions[i].charAt(0);
            var line = Lyngk.validPositions[i].charAt(1);
            var coordinates = new Lyngk.Coordinates(col,line);
            var intersection = new Lyngk.Intersection(coordinates);
            intersection.add_coin(initCoins[i]);
            intersections.push(intersection);
        }
    }
    init();

    this.get_intersections = function () {
        return intersections;
    }
    
    this.move_stack = function (interRemove, interAdd) {
        if (interAdd.get_height() !== 0) {
            var stack = interRemove.remove_stack();
            interAdd.add_stack(stack);
        } else console.log('Moving Pile on empty Intersection is forbidden')
    }
};
