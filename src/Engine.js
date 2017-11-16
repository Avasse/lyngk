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
    ];
    var initCoins = [];
    var players = ['P1', 'P2'];
    var playerTurn;
    var playersColor = ['Not claimed yet', 'Not claimed yet'];

    var init = function () {
        initCoinsNbColors.forEach((function (coins) {
            while (coins.nb !== 0) {
                var coin = new Lyngk.Piece(coins.color);
                initCoins.push(coin);
                coins.nb--;
            }
        }));

        // Then add the intersection in intersections array.
        for (var i = 0; i < Lyngk.validPositions.length; i++) {
            var col = Lyngk.validPositions[i].charAt(0);
            var line = Lyngk.validPositions[i].charAt(1);
            var coordinates = new Lyngk.Coordinates(col, line);
            var intersection = new Lyngk.Intersection(coordinates);
            intersection.addCoin(initCoins[i]);
            intersections.push(intersection);
        }
        playerTurn = players[0];
    };
    init();

    this.getIntersections = function () {
        return intersections;
    };

    this.getIntersection = function (coordinate) {
        return intersections.find(function (intersection) {
            return intersection.getCoordinates().toString() === coordinate;
        });
    };

    this.moveStack = function (interStart, interEnd) {
        if (this.moveValidator(interStart, interEnd)) {
            if (playerTurn === 'P1') playerTurn = players[1];
            else playerTurn = players[0];
            var stack = interStart.removeStack();
            interEnd.addStack(stack);
        } else console.log('ERROR: Invalid move');
    };

    this.getDiagonals = function (startCoordinates) {
        var diagonals = [], column = startCoordinates.charCodeAt(0);
        var line = startCoordinates[1];
        for (var i = column; i > 'A'.charCodeAt(0); i--) {
            diagonals.push(String.fromCharCode(i - 1) + (+line - 1));
            line--;
        }
        line = startCoordinates[1];
        for (var j = column; j < 'I'.charCodeAt(0); j++) {
            diagonals.push(String.fromCharCode(j + 1) + (+line + 1));
            line++;
        }
        return diagonals;
    };

    this.isLinearMove = function (startCoordinates, endCoordinates) {
        var diagonals = this.getDiagonals(startCoordinates);
        var sameColumn = startCoordinates[0] === endCoordinates[0];
        var sameLine = startCoordinates[1] === endCoordinates[1];
        var sameDiag = diagonals.includes(endCoordinates);
        // Check if move is on the same column / line / diagonal
        return sameColumn | sameLine | sameDiag;
    };
    this.testDeltaColumn = function (deltaColumn) {
        return deltaColumn > 1 || deltaColumn < -1;
    };
    this.getDeltaColumns = function (deltaColumn, startCoord) {
        var array = [], column, coord;
        while (this.testDeltaColumn(deltaColumn)) {
            if (deltaColumn < 0) {
                deltaColumn++;
                column = startCoord.charCodeAt(0) - 1;
            } else {
                deltaColumn--;
                column = startCoord.charCodeAt(0) + 1;
            }
            coord = String.fromCharCode(column) + startCoord[1];
            array.push(coord);
        }
        return array;
    };
    this.testDeltaLine = function (deltaLine) {
        return deltaLine > 1 || deltaLine < -1;
    };
    this.getDeltaLines = function (deltaLine, startCoord) {
        var array = [];
        while (this.testDeltaLine(deltaLine)) {
            if (deltaLine < 0) {
                deltaLine++;
                startCoord = startCoord[0] + (parseInt(startCoord[1]) - 1);
            } else {
                deltaLine--;
                startCoord = startCoord[0] + (parseInt(startCoord[1]) + 1);
            }
            array.push(startCoord);
        }
        return array;
    };
    this.linearNeighbours = function (deltaColumn, deltaLine, startCoord) {
        var coords;
        if (deltaColumn === 0) {
            coords = this.getDeltaLines(deltaLine, startCoord);
        } else {
            coords = this.getDeltaColumns(deltaColumn, startCoord);
        }
        return coords;
    };
    this.increaseDecreaseCoord = function (startCoord, deltaColumn) {
        var coord;
        if (deltaColumn > 1) {
            coord = String.fromCharCode((startCoord.charCodeAt(0) + 1));
            coord += parseInt(startCoord[1]) + 1;
        } else {
            coord = String.fromCharCode((startCoord.charCodeAt(0) - 1));
            coord += parseInt(startCoord[1]) - 1;
        }
        return coord;
    };
    this.diagNeighbours = function (deltaColumn,deltaLine,startCoord) {
        var coords = [], coord = startCoord;
        while (this.testDeltaColumn(deltaColumn)) {
            coord = this.increaseDecreaseCoord(coord, deltaColumn);
            if (deltaColumn > 1){
                deltaLine--;
                deltaColumn--;
            } else {
                deltaLine++;
                deltaColumn++;
            }
            coords.push(coord);
        }
        return coords;
    };
    this.testValidDelta = function (deltaColumn, deltaLine) {
        var testColumn = this.testDeltaColumn(deltaColumn);
        var testLine = this.testDeltaLine(deltaLine);
        return testColumn || testLine;
    };
    this.areEmptyCoords = function (coords) {
        var ok;
        for (var i = 0; i < coords.length; i++) {
            var intersection = this.getIntersection(coords[i]);
            ok = intersection.getHeight() === 0;
        }
        return ok;
    };
    this.isNullDelta = function (deltaColumn, deltaLine) {
        return deltaColumn === 0 || deltaLine === 0;
    };
    this.isNeighbour = function (startCoord, endCoord) {
        var ok = true, coords = [];
        var deltaC = endCoord.charCodeAt(0) - startCoord.charCodeAt(0);
        var deltaL = endCoord[1] - startCoord[1];
        if (this.testValidDelta(deltaC, deltaL)) {
            if (this.isNullDelta(deltaC, deltaL)) {
                coords = this.linearNeighbours(deltaC, deltaL, startCoord);
            } else {
                coords = this.diagNeighbours(deltaC, deltaL, startCoord);
            }
            ok = this.areEmptyCoords(coords);
        }
        return ok;
    };

    this.isntMaxHeight = function (interStart, interEnd) {
        if (interStart.getHeight() + interEnd.getHeight() <= 5) return true;
        else return false;
    };

    this.colorIsValid = function (interStart, interEnd) {
        var startStack = interStart.getStack();
        var endStack = interEnd.getStack();
        for (var i = 0; i < endStack.length; i++) {
            if (startStack.includes(endStack[i].getColor())) return false;
        }
        return true;
    };

    this.getPlayerTurn = function () {
        return playerTurn;
    };

    this.claim = function (color) {
        if (playerTurn === players[0]) playersColor[0] = color;
        else playersColor[1] = color;
    };

    this.getPlayerColor = function (player) {
        return playersColor[player];
    };

    // this.color_isNotClaimed = function (interStart) {
    //     var stack = interStart.getStack();
    //     if (playerTurn === players[0]) {
    //         stack.forEach(function (p) {
    //             if (playersColor[1] === p.getColor()) return false;
    //         })
    //     }
    //     else if (playerTurn === players[1]) {
    //         stack.forEach(function (p) {
    //             if (playersColor[0] === p.getColor()) return false;
    //         })
    //     }
    //     else return true;
    // }

    this.getNbPossibleMoves = function () {
        var result = 0;
        initCoins.forEach(function (c) {
            if (c.getColor() !== Lyngk.Color.WHITE) result++;
        });
        return result;
    };
    this.validPos = function (startCoordinates, endCoordinates) {
        var validStart = Lyngk.validPositions.includes(startCoordinates);
        var validEnd = Lyngk.validPositions.includes(endCoordinates);
        return  validStart || validEnd ;
    };
    this.EndHeightInfStartHeight = function (interStart, interEnd) {
        var validHeight = interStart.getHeight() >= interEnd.getHeight();
        var isNotMaxHeight = this.isntMaxHeight(interStart, interEnd);
        return validHeight && isNotMaxHeight && interEnd.getHeight() !== 0;
    };

    this.moveValidator = function (interStart, interEnd) {
        var startCoordinates = interStart.getCoordinates().toString();
        var endCoordinates = interEnd.getCoordinates().toString();
        var posValid = this.validPos(startCoordinates, endCoordinates);
        var linearMove = this.isLinearMove(startCoordinates, endCoordinates);
        var isNeighbour = this.isNeighbour(startCoordinates, endCoordinates);
        var heightValid = this.EndHeightInfStartHeight(interStart, interEnd);
        var colorValid = this.colorIsValid(interStart, interEnd);
        var validator1 = posValid && linearMove && isNeighbour;
        var validator2 = heightValid && colorValid;
        return validator1 && validator2;
    };
};
