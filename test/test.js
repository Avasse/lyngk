'use strict';

var LyngkTestCase = TestCase("LyngkTestCase");

Math.seedrandom("Lyngk");

LyngkTestCase.prototype.testStory1 = function(){
    var coordinates = new Lyngk.Coordinates('A',1);
    assertFalse(coordinates.isValid());

    var coordinates = new Lyngk.Coordinates('B',6);
    assertFalse(coordinates.isValid());

    var coordinates = new Lyngk.Coordinates('C',3);
    assertTrue(coordinates.isValid());

    var coordinates = new Lyngk.Coordinates('D',2);
    assertTrue(coordinates.isValid());

    var coordinates = new Lyngk.Coordinates('G',5);
    assertTrue(coordinates.isValid());
};

LyngkTestCase.prototype.testStory2 = function(){
    var sum = 0;
    //For A1 TO I9 increment sum;
    for(var i = 'A'.charCodeAt(0); i <= 'J'.charCodeAt(0); i++ ){
        for (var j = 1; j < 10; j++){
            var coordinates = new Lyngk.Coordinates(String.fromCharCode(i),j);
            if (coordinates.isValid()) sum ++;
        }
    }
    assertEquals("Not valid sum of valid coordinates", sum, 43);
};

LyngkTestCase.prototype.testStory3 = function(){
    var coordinates = new Lyngk.Coordinates('B',3);
    assertEquals("Coordinates aren't String", coordinates.toString(), "B3");
};

LyngkTestCase.prototype.testStory4 = function(){
    var coordinates = new Lyngk.Coordinates('A',1);
    assertEquals("toString should return 'invalid'", coordinates.toString(), "invalid");
};

LyngkTestCase.prototype.testStory5 = function(){
    var coordinates1 = new Lyngk.Coordinates('A',1);
    var coordinates2 = coordinates1.clone();
    assertEquals("Coordinates are not equals", coordinates2.toString(), coordinates1.toString());
};

LyngkTestCase.prototype.testStory6 = function(){
    var firstCoordinates = new Lyngk.Coordinates('A',1);
    var secondCoordinates = new Lyngk.Coordinates('B',4);
    var thirdCoordinates = new Lyngk.Coordinates('D',2);
    var firstHash = firstCoordinates.toHash();
    var secondHash = secondCoordinates.toHash();
    var thirdHash = thirdCoordinates.toHash();
    assertTrue("Hashes shouldn't be equals", firstHash.toHash !== secondHash.toHash !== thirdHash.toHash);
};

LyngkTestCase.prototype.testStory7 = function(){
    var intersection = new Lyngk.Intersection();
    assertEquals("Default intersection state should be VACANT", intersection.getState(), Lyngk.State.VACANT);
};

LyngkTestCase.prototype.testStory8 = function(){
    var bluePiece = new Lyngk.Piece(Lyngk.Color.BLUE);
    var intersection = new Lyngk.Intersection();
    intersection.addCoin(bluePiece);
    assertEquals("Intersection state should be ONE_PIECE", intersection.getState(), Lyngk.State.ONE_PIECE);
};

LyngkTestCase.prototype.testStory9 = function(){
    var bluePiece = new Lyngk.Piece(Lyngk.Color.BLUE);
    var redPiece = new Lyngk.Piece(Lyngk.Color.RED);
    var intersection = new Lyngk.Intersection();
    intersection.addCoin(bluePiece);
    intersection.addCoin(redPiece);
    assertEquals("Intersection state should be STACK", intersection.getState(), Lyngk.State.STACK);
    assertEquals("Intersection color should be RED", intersection.getColor(), Lyngk.Color.RED);
};

LyngkTestCase.prototype.testStory10 = function(){
    var bluePiece = new Lyngk.Piece(Lyngk.Color.BLUE);
    var redPiece = new Lyngk.Piece(Lyngk.Color.RED);
    var blackPiece = new Lyngk.Piece(Lyngk.Color.BLACK);
    var greenPiece = new Lyngk.Piece(Lyngk.Color.GREEN);
    var ivoryPiece = new Lyngk.Piece(Lyngk.Color.IVORY);
    var intersection = new Lyngk.Intersection();
    intersection.addCoin(bluePiece);
    intersection.addCoin(redPiece);
    intersection.addCoin(blackPiece);
    intersection.addCoin(greenPiece);
    intersection.addCoin(ivoryPiece);
    assertEquals("Intersection state should be FULL_STACK", intersection.getState(), Lyngk.State.FULL_STACK);
};

LyngkTestCase.prototype.testStory11 = function(){
    // init_board will create an intersection with a single coin on each validPosition (create the gaming board).
    var engine = new Lyngk.Engine();

    // Get all intersections of our gaming board.
    var intersections = engine.getIntersections()

    // Verify that intersections array contain our 43 intersections.
    assertEquals("Init should create 43 intersections", intersections.length, 43);

    // For each validPosition, check if the state of the intersection is ONE_PIECE;
    intersections.forEach(function(intersection) {
        assertEquals("Intersection state should be ONE_PIECE", intersection.getState(), Lyngk.State.ONE_PIECE);
    });
};


LyngkTestCase.prototype.testStory12 = function(){
    var ivoryPieces = 0, bluePieces = 0, redPieces = 0, blackPieces = 0, greenPieces = 0, whitePieces = 0;
    var engine = new Lyngk.Engine();
    var intersections = engine.getIntersections();

    intersections.forEach(function(intersection) {
        if (intersection.getColor() === Lyngk.Color.IVORY) ivoryPieces ++;
        else if (intersection.getColor() === Lyngk.Color.BLUE) bluePieces ++;
        else if (intersection.getColor() === Lyngk.Color.RED) redPieces ++;
        else if (intersection.getColor() === Lyngk.Color.BLACK) blackPieces ++;
        else if (intersection.getColor() === Lyngk.Color.GREEN) greenPieces ++;
        else if (intersection.getColor() === Lyngk.Color.WHITE) whitePieces ++;
    });

    assertEquals("We should have 8 IVORY coins", ivoryPieces, 8);
    assertEquals("We should have 8 BLUE coins", bluePieces, 8);
    assertEquals("We should have 8 RED coins", redPieces, 8);
    assertEquals("We should have 8 BLACK coins", blackPieces, 8);
    assertEquals("We should have 8 GREEN coins", greenPieces, 8);
    assertEquals("We should have 8 WHITE coins", whitePieces, 3);

};

LyngkTestCase.prototype.testStory13 = function(){
    var engine = new Lyngk.Engine();
    var intersections = engine.getIntersections();

    intersections.forEach(function(intersection) {
        var hauteur = intersection.getHeight();
        assertEquals("Intersection height should be 1", hauteur, 1);
    });
};

LyngkTestCase.prototype.testStory14 = function(){
    var engine = new Lyngk.Engine();
    var intersections = engine.getIntersections();

    intersections.forEach(function(intersection) {
        var stackInter = intersection.getStack();
        assertEquals("Intersection height should be 1", intersection.getColor(), stackInter[stackInter.length-1].getColor());
    });
};

LyngkTestCase.prototype.testStory15 = function(){
    var engine = new Lyngk.Engine();
    var intersections = engine.getIntersections();
    var interA3 = engine.getIntersection("A3");
    var interB3 = engine.getIntersection("B3");
    var colorBeforeMove = interA3.getColor();
    engine.moveStack(interA3, interB3);
    assertEquals("B3 Color should be A3 color before moveStack", colorBeforeMove, interB3.getColor());
    assertEquals("A3 state should be VACANT", Lyngk.State.VACANT, interA3.getState());
};

LyngkTestCase.prototype.testStory16 = function(){
    var engine = new Lyngk.Engine();
    var intersections = engine.getIntersections();
    var interA3 = engine.getIntersection("A3");
    var interB3 = engine.getIntersection("B3");
    var interB2 = engine.getIntersection("B2");
    engine.moveStack(interA3, interB3);
    var colorBeforeMove = interB3.getColor();
    engine.moveStack(interB3, interB2);
    assertEquals("B2 height should be 3", interB2.getHeight(), 3);
    assertEquals("B2 color should be B3 color before moveStack", colorBeforeMove, interB2.getColor());
};

LyngkTestCase.prototype.testStory17 = function(){
    var engine = new Lyngk.Engine();
    var intersections = engine.getIntersections();
    var interB2 = engine.getIntersection("B2");
    var interB3 = engine.getIntersection("B3");
    var stackHeight = interB2.getHeight() + interB3.getHeight();
    engine.moveStack(interB2, interB3);
    engine.moveStack(interB3, interB2);
    assertEquals("Stack should be on B3", interB3.getHeight(), stackHeight);
    assertEquals("B2 should be empty", interB2.getHeight(), 0);
};

LyngkTestCase.prototype.testStory18 = function(){
    var engine = new Lyngk.Engine();
    var intersections = engine.getIntersections();
    var interB2 = engine.getIntersection("B2");
    var interB3 = engine.getIntersection("B3");
    var interC2 = engine.getIntersection("C2");
    var stackHeight = interB2.getHeight() + interB3.getHeight();
    var stackC2 = interC2.getHeight();
    engine.moveStack(interB2, interB3);
    engine.moveStack(interB3, interC2);
    assertEquals("Stack should be on B3", interB3.getHeight(), stackHeight);
    assertEquals("C2 height shouldn't have changed", interC2.getHeight(), stackC2);
};

LyngkTestCase.prototype.testStory19 = function(){
    var engine = new Lyngk.Engine();
    var intersections = engine.getIntersections();
    var interB2 = engine.getIntersection("I7");
    var interB3 = engine.getIntersection("H6");
    var interH5 = engine.getIntersection("H5");
    var interH8 = engine.getIntersection("H8");
    var interF5 = engine.getIntersection("F5");
    var interF3 = engine.getIntersection("F3");
    var stackHeight = interB2.getHeight() + interB3.getHeight() + interH5.getHeight();
    engine.moveStack(interB2, interB3);
    engine.moveStack(interB3, interH5);
    engine.moveStack(interH5, interH8);
    engine.moveStack(interH5, interF5);
    engine.moveStack(interH5, interF3);
    assertEquals("Stack should be on H5", interH5.getHeight(), stackHeight);
    // test tall possibilities :
    var interE2 = engine.getIntersection("E2");
    var interI6 = engine.getIntersection("I6");
    var interH3 = engine.getIntersection("H3");
    engine.moveStack(interH5, interE2);
    engine.moveStack(interF3, interH5);
    engine.moveStack(interF5, interF3);
    engine.moveStack(interF5, interH5);
};

LyngkTestCase.prototype.testStory20 = function(){
    var engine = new Lyngk.Engine();
    var intersections = engine.getIntersections();
    var interA3 = engine.getIntersection("A3");
    var interB3 = engine.getIntersection("B3");
    var interB2 = engine.getIntersection("B2");
    var interC2 = engine.getIntersection("C2");
    var interD2 = engine.getIntersection("D2");
    var interE2 = engine.getIntersection("E2");
    engine.moveStack(interA3, interB3);
    engine.moveStack(interB3, interB2);
    engine.moveStack(interB2, interC2);
    engine.moveStack(interC2, interD2);
    var E2Height = interE2.getHeight()
    engine.moveStack(interD2, interE2);
    var D2Height = interD2.getHeight();
    assertEquals("Stack should be on D2", interD2.getHeight(), D2Height);
    assertEquals("Stack should not be on E2", interE2.getHeight(), E2Height);
};

LyngkTestCase.prototype.testStory21 = function(){
    var engine = new Lyngk.Engine();
    var intersections = engine.getIntersections();
    var interA3 = engine.getIntersection("A3");
    var interB3 = engine.getIntersection("B3");
    var interC3 = engine.getIntersection("C3");
    var C3Height = interC3.getHeight();
    engine.moveStack(interA3, interB3);
    var B3Height = interB3.getHeight();
    engine.moveStack(interC3, interB3);
    assertEquals("B3 Shouldn't have changed", interB3.getHeight(), B3Height);
    assertEquals("C3 Shouldn't have changed", interC3.getHeight(), C3Height);
};

LyngkTestCase.prototype.testStory22 = function(){
    var engine = new Lyngk.Engine();
    var intersections = engine.getIntersections();
    var interI7 = engine.getIntersection("I7");
    var interH6 = engine.getIntersection("H6");
    var interG4 = engine.getIntersection("G4");
    var interG5 = engine.getIntersection("G5");
    var interG6 = engine.getIntersection("G6");
    engine.moveStack(interI7, interH6);
    engine.moveStack(interG4, interG5);
    engine.moveStack(interG5, interG6);
    var H6Height = interH6.getHeight();
    var G6Height = interG6.getHeight();
    engine.moveStack(interH6, interG6);
    assertEquals("H6 Shouldn't have changed", interH6.getHeight(), H6Height);
    assertEquals("G6 Shouldn't have changed", interG6.getHeight(), G6Height);
};

LyngkTestCase.prototype.testStory23 = function(){
    var ok = true;
    while(ok) {
        var engine = new Lyngk.Engine();
        var intersections = engine.getIntersections();
        var interC1 = engine.getIntersection("C1");
        var interC2 = engine.getIntersection("C2");
        var interC3 = engine.getIntersection("C3");
        var interC4 = engine.getIntersection("C4");
        var interC5 = engine.getIntersection("C5");
        if (interC1.getColor() !== interC2.getColor() !== interC3.getColor() !== interC4.getColor() !== interC5.getColor()) ok = false;
    }
    engine.moveStack(interC1, interC2);
    engine.moveStack(interC2, interC3);
    engine.moveStack(interC3, interC4);
    engine.moveStack(interC4, interC5);
    assertEquals("C5 Shouldn't contain stack of 5 coins", interC5.getHeight(), 5);
};

LyngkTestCase.prototype.testStory24 = function(){
    var engine = new Lyngk.Engine();
    assertEquals("P1 always start game", engine.getPlayerTurn(), 'P1');
};

LyngkTestCase.prototype.testStory25 = function(){
    var engine = new Lyngk.Engine();
    var interC1 = engine.getIntersection("C1");
    var interC2 = engine.getIntersection("C2");
    engine.moveStack(interC1, interC2);
    assertEquals("P1 just played, now it's P2 turn", engine.getPlayerTurn(), 'P2');
};

LyngkTestCase.prototype.testStory26 = function(){
    var engine = new Lyngk.Engine();
    var interA3 = engine.getIntersection("A3");
    var interB3 = engine.getIntersection("B3");
    engine.claim(Lyngk.Color.RED);
    engine.moveStack(interA3, interB3);
    engine.claim(Lyngk.Color.GREEN);
    assertEquals("P1 color is red", engine.getPlayerColor(0), Lyngk.Color.RED);
    assertEquals("P2 color is green", engine.getPlayerColor(1), Lyngk.Color.GREEN);

};

LyngkTestCase.prototype.testStory28 = function(){
    var engine = new Lyngk.Engine();
    var interB5 = engine.getIntersection("B5");
    var interB4 = engine.getIntersection("B4");
    var interA3 = engine.getIntersection("A3");
    engine.claim(Lyngk.Color.RED);
    engine.moveStack(interB5, interB4);
    interA3.addCoin(new Lyngk.Piece(Lyngk.Color.RED));
    var B4Height = interB4.getHeight();
    var A3Height = interA3.getHeight();
    engine.moveStack(interA3, interB4);
    assertEquals("A3 shouldn't have changed", interA3.getHeight(), A3Height);
    assertEquals("B4 shouldn't have changed", interB4.getHeight(), B4Height);
};

LyngkTestCase.prototype.testStory29 = function(){
    var engine = new Lyngk.Engine();
    assertEquals("Should be 40 valid moves", engine.getNbPossibleMoves(), 40);
};

LyngkTestCase.prototype.testStory30 = function(){
    var engine = new Lyngk.Engine();
    var interA3 = engine.getIntersection("A3");
    var interB3 = engine.getIntersection("B3");
    engine.claim(Lyngk.Color.BLACK);
    engine.moveStack(interA3, interB3);
    assertEquals("Should be 32 valid moves", engine.getNbPossibleMoves(), 32);
};