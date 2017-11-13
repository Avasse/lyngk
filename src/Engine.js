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

    this.get_intersection = function (coordinate) {
        return intersections.find(function(intersection){
            return intersection.get_Coordinates().to_string() === coordinate;
        });
    }
    
    this.move_stack = function (interStart, interEnd) {
        if (this.move_validator(interStart, interEnd)) {
            var stack = interStart.remove_stack();
            interEnd.add_stack(stack);
        } else console.log('ERROR: Invalid move')
    }

    this.get_diagonals = function (startCoordinates) {
        var diagonals = [];
        var column = startCoordinates.charCodeAt(0);
        var line = startCoordinates[1];
        for (var i = column; i > 'A'.charCodeAt(0) ; i--){
            var coordinates = String.fromCharCode(i - 1) + (+line - 1);
            diagonals.push(coordinates);
            line--;
        }
        line = startCoordinates[1];
        for (var i = column; i < 'I'.charCodeAt(0) ; i++){
            var coordinates = String.fromCharCode(i + 1) + (+line + 1);
            diagonals.push(coordinates);
            line++;
        }
        return diagonals;
    }

    this.is_linear_move = function (startCoordinates, endCoordinates) {
        var diagonals = this.get_diagonals(startCoordinates);
        // Check if move is on the same column / line / diagonal
        if(startCoordinates[0] === endCoordinates[0] | startCoordinates[1] === endCoordinates[1] | diagonals.includes(endCoordinates)) return true;
    }

    this.is_neighbour = function (startCoordinates, endCoordinates) {
        var ok = true;
        var startColumn = startCoordinates.charCodeAt(0);
        var startLine = parseInt(startCoordinates[1]);
        var endColumn = endCoordinates.charCodeAt(0);
        var endLine = parseInt(endCoordinates[1]);
        var deltaColumn = endColumn - startColumn;
        var deltaLine = endLine - startLine;
        while (ok && deltaLine > 1 || deltaLine < -1 || deltaColumn > 1 || deltaColumn < -1) {
            if (deltaColumn > 0) {
                startColumn++;
                deltaColumn--;
            }
            if (deltaColumn < 0){
                startColumn--;
                deltaColumn++
            }
            if (deltaLine > 0) {
                startLine++;
                deltaLine--;
            }
            if (deltaLine < 0) {
                startLine--;
                deltaLine++;
            }
            var coord = String.fromCharCode(startColumn) + startLine;
            var intersection = this.get_intersection(coord);
            ok = intersection.get_height() === 0;
        }
        return ok;
    }

    this.isnt_maxHeight = function (interStart, interEnd) {
        if (interStart.get_height() + interEnd.get_height() <= 5) return true;
        else return false;
    }

    this.move_validator = function (interStart, interEnd) {
        var startCoordinates = interStart.get_Coordinates().to_string();
        var endCoordinates = interEnd.get_Coordinates().to_string();
        // 1 - Check if positions are valids
        if (Lyngk.validPositions.includes(startCoordinates) && Lyngk.validPositions.includes(endCoordinates)){
            // 2 - Check if interEnd is not empty
            if (interEnd.get_height() !== 0) {
                // 3 - Check if move is linear
                if (this.is_linear_move(startCoordinates, endCoordinates)) {
                    if(this.is_neighbour(startCoordinates, endCoordinates)) {
                        if (this.isnt_maxHeight(interStart, interEnd)) return true;
                        else {
                            console.log('ERROR: Stack length cannot be > 5');
                            return false;
                        }
                    }
                    else {
                        console.log('ERROR: Stacks should be neighbour');
                        return false;
                    }
                }
                else {
                    console.log('ERROR: Move should only be linear');
                    return false;
                }
            } else {
                console.log('ERROR: Moving Stack on empty Intersection is forbidden');
                return false;
            }
        } else {
            console.log('ERROR: Moving Stack on invalid Coordinates is forbidden');
            return false;
        }
    }
};
