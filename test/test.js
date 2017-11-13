'use strict';

var LyngkTestCase = TestCase("LyngkTestCase");

LyngkTestCase.prototype.testStory1 = function(){
    var coordinates = new Lyngk.Coordinates('A',1);
    assertFalse(coordinates.is_valid());

    var coordinates = new Lyngk.Coordinates('B',6);
    assertFalse(coordinates.is_valid());

    var coordinates = new Lyngk.Coordinates('C',3);
    assertTrue(coordinates.is_valid());

    var coordinates = new Lyngk.Coordinates('D',2);
    assertTrue(coordinates.is_valid());

    var coordinates = new Lyngk.Coordinates('G',5);
    assertTrue(coordinates.is_valid());
};

LyngkTestCase.prototype.testStory2 = function(){
    var sum = 0;
    //For A1 TO I9 increment sum;
    for(var i = 'A'.charCodeAt(0); i <= 'J'.charCodeAt(0); i++ ){
        for (var j = 1; j < 10; j++){
            var coordinates = new Lyngk.Coordinates(String.fromCharCode(i),j);
            if (coordinates.is_valid()) sum ++;
        }
    }
    assertEquals("Not valid sum of valid coordinates", sum, 43);
};

LyngkTestCase.prototype.testStory3 = function(){
    var coordinates = new Lyngk.Coordinates('B',3);
    assertEquals("Coordinates aren't String", coordinates.to_string(), "B3");
};

LyngkTestCase.prototype.testStory4 = function(){
    var coordinates = new Lyngk.Coordinates('A',1);
    assertEquals("toString should return 'invalid'", coordinates.to_string(), "invalid");
};

LyngkTestCase.prototype.testStory5 = function(){
    var coordinates1 = new Lyngk.Coordinates('A',1);
    var coordinates2 = coordinates1.clone();
    assertEquals("Coordinates are not equals", coordinates2.to_string(), coordinates1.to_string());
};

LyngkTestCase.prototype.testStory6 = function(){
    var firstCoordinates = new Lyngk.Coordinates('A',1);
    var secondCoordinates = new Lyngk.Coordinates('B',4);
    var thirdCoordinates = new Lyngk.Coordinates('D',2);
    var firstHash = firstCoordinates.to_hash();
    var secondHash = secondCoordinates.to_hash();
    var thirdHash = thirdCoordinates.to_hash();
    assertTrue("Hashes shouldn't be equals", firstHash.to_hash !== secondHash.to_hash !== thirdHash.to_hash);
};

LyngkTestCase.prototype.testStory7 = function(){
    var intersection = new Lyngk.Intersection();
    assertEquals("Default intersection state should be VACANT", intersection.get_state(), Lyngk.State.VACANT);
};

LyngkTestCase.prototype.testStory8 = function(){
    var bluePiece = new Lyngk.Piece(Lyngk.Color.BLUE);
    var intersection = new Lyngk.Intersection();
    intersection.add_coin(bluePiece);
    assertEquals("Intersection state should be ONE_PIECE", intersection.get_state(), Lyngk.State.ONE_PIECE);
};

LyngkTestCase.prototype.testStory9 = function(){
    var bluePiece = new Lyngk.Piece(Lyngk.Color.BLUE);
    var redPiece = new Lyngk.Piece(Lyngk.Color.RED);
    var intersection = new Lyngk.Intersection();
    intersection.add_coin(bluePiece);
    intersection.add_coin(redPiece);
    assertEquals("Intersection state should be STACK", intersection.get_state(), Lyngk.State.STACK);
    assertEquals("Intersection color should be RED", intersection.get_color(), Lyngk.Color.RED);
};

LyngkTestCase.prototype.testStory10 = function(){
    var bluePiece = new Lyngk.Piece(Lyngk.Color.BLUE);
    var redPiece = new Lyngk.Piece(Lyngk.Color.RED);
    var blackPiece = new Lyngk.Piece(Lyngk.Color.BLACK);
    var greenPiece = new Lyngk.Piece(Lyngk.Color.GREEN);
    var ivoryPiece = new Lyngk.Piece(Lyngk.Color.IVORY);
    var intersection = new Lyngk.Intersection();
    intersection.add_coin(bluePiece);
    intersection.add_coin(redPiece);
    intersection.add_coin(blackPiece);
    intersection.add_coin(greenPiece);
    intersection.add_coin(ivoryPiece);
    assertEquals("Intersection state should be STACK", intersection.get_state(), Lyngk.State.FULL_STACK);
};

LyngkTestCase.prototype.testStory11 = function(){
    // init_board will create an intersection with a single coin on each validPosition (create the gaming board).
    var engine = new Lyngk.Engine();

    // Get all intersections of our gaming board.
    var intersections = engine.get_intersections()

    // Verify that intersections array contain our 43 intersections.
    assertEquals("Init should create 43 intersections", intersections.length, 43);

    // For each validPosition, check if the state of the intersection is ONE_PIECE;
    intersections.forEach(function(intersection) {
        assertEquals("Intersection state should be ONE_PIECE", intersection.get_state(), Lyngk.State.ONE_PIECE);
    });
};


LyngkTestCase.prototype.testStory12 = function(){
    var ivoryPieces = 0, bluePieces = 0, redPieces = 0, blackPieces = 0, greenPieces = 0, whitePieces = 0;
    var engine = new Lyngk.Engine();
    var intersections = engine.get_intersections();

    intersections.forEach(function(intersection) {
        if (intersection.get_color() === Lyngk.Color.IVORY) ivoryPieces ++;
        else if (intersection.get_color() === Lyngk.Color.BLUE) bluePieces ++;
        else if (intersection.get_color() === Lyngk.Color.RED) redPieces ++;
        else if (intersection.get_color() === Lyngk.Color.BLACK) blackPieces ++;
        else if (intersection.get_color() === Lyngk.Color.GREEN) greenPieces ++;
        else if (intersection.get_color() === Lyngk.Color.WHITE) whitePieces ++;
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
    var intersections = engine.get_intersections();

    intersections.forEach(function(intersection) {
        var hauteur = intersection.get_height();
        assertEquals("Intersection height should be 1", hauteur, 1);
    });
};

LyngkTestCase.prototype.testStory14 = function(){
    var engine = new Lyngk.Engine();
    var intersections = engine.get_intersections();

    intersections.forEach(function(intersection) {
        var stackInter = intersection.get_stack();
        assertEquals("Intersection height should be 1", intersection.get_color(), stackInter[stackInter.length-1].get_color());
    });
};

LyngkTestCase.prototype.testStory15 = function(){
    var engine = new Lyngk.Engine();
    var intersections = engine.get_intersections();
    var interA3 = engine.get_intersection("A3");
    var interB3 = engine.get_intersection("B3");
    var colorBeforeMove = interA3.get_color();
    engine.move_stack(interA3, interB3);
    assertEquals("B3 Color should be A3 color before move_stack", colorBeforeMove, interB3.get_color());
    assertEquals("A3 state should be VACANT", Lyngk.State.VACANT, interA3.get_state());
};

LyngkTestCase.prototype.testStory16 = function(){
    var engine = new Lyngk.Engine();
    var intersections = engine.get_intersections();
    var interA3 = engine.get_intersection("A3");
    var interB3 = engine.get_intersection("B3");
    var interB2 = engine.get_intersection("B2");
    engine.move_stack(interA3, interB3);
    var colorBeforeMove = interB3.get_color();
    engine.move_stack(interB3, interB2);
    assertEquals("B2 height should be 3", interB2.get_height(), 3);
    assertEquals("B2 color should be B3 color before move_stack", colorBeforeMove, interB2.get_color());
};

LyngkTestCase.prototype.testStory17 = function(){
    var engine = new Lyngk.Engine();
    var intersections = engine.get_intersections();
    var interB2 = engine.get_intersection("B2");
    var interB3 = engine.get_intersection("B3");
    var stackHeight = interB2.get_height() + interB3.get_height();
    engine.move_stack(interB2, interB3);
    engine.move_stack(interB3, interB2);
    assertEquals("Stack should be on B3", interB3.get_height(), stackHeight);
    assertEquals("B2 should be empty", interB2.get_height(), 0);
};

LyngkTestCase.prototype.testStory18 = function(){
    var engine = new Lyngk.Engine();
    var intersections = engine.get_intersections();
    var interB2 = engine.get_intersection("B2");
    var interB3 = engine.get_intersection("B3");
    var interC2 = engine.get_intersection("C2");
    var stackHeight = interB2.get_height() + interB3.get_height();
    var stackC2 = interC2.get_height();
    engine.move_stack(interB2, interB3);
    engine.move_stack(interB3, interC2);
    assertEquals("Stack should be on B3", interB3.get_height(), stackHeight);
    assertEquals("C2 height shouldn't have changed", interC2.get_height(), stackC2);
};

LyngkTestCase.prototype.testStory19 = function(){
    var engine = new Lyngk.Engine();
    var intersections = engine.get_intersections();
    var interB2 = engine.get_intersection("I7");
    var interB3 = engine.get_intersection("H6");
    var interH5 = engine.get_intersection("H5");
    var interC8 = engine.get_intersection("H8");
    var interF5 = engine.get_intersection("F5");
    var interF3 = engine.get_intersection("F3");
    var stackHeight = interB2.get_height() + interB3.get_height() + interH5.get_height();
    engine.move_stack(interB2, interB3);
    engine.move_stack(interB3, interH5);
    engine.move_stack(interH5, interC8);
    engine.move_stack(interH5, interF5);
    engine.move_stack(interH5, interF3);
    assertEquals("Stack should be on H5", interH5.get_height(), stackHeight);
};

LyngkTestCase.prototype.testStory20 = function(){
    var engine = new Lyngk.Engine();
    var intersections = engine.get_intersections();
    var interA3 = engine.get_intersection("A3");
    var interB3 = engine.get_intersection("B3");
    var interB2 = engine.get_intersection("B2");
    var interC2 = engine.get_intersection("C2");
    var interD2 = engine.get_intersection("D2");
    var interE2 = engine.get_intersection("E2");
    engine.move_stack(interA3, interB3);
    engine.move_stack(interB3, interB2);
    engine.move_stack(interB2, interC2);
    engine.move_stack(interC2, interD2);
    var E2Height = interE2.get_height()
    engine.move_stack(interD2, interE2);
    var D2Height = interD2.get_height();
    assertEquals("Stack should be on D2", interD2.get_height(), D2Height);
    assertEquals("Stack should not be on E2", interE2.get_height(), E2Height);
};

LyngkTestCase.prototype.testStory21 = function(){
    var engine = new Lyngk.Engine();
    var intersections = engine.get_intersections();
    var interA3 = engine.get_intersection("A3");
    var interB3 = engine.get_intersection("B3");
    var interC3 = engine.get_intersection("C3");
    var C3Height = interC3.get_height();
    engine.move_stack(interA3, interB3);
    var B3Height = interB3.get_height();
    engine.move_stack(interC3, interB3);
    assertEquals("B3 Shouldn't have changed", interB3.get_height(), B3Height);
    assertEquals("C3 Shouldn't have changed", interC3.get_height(), C3Height);
};

LyngkTestCase.prototype.testStory22 = function(){
    var engine = new Lyngk.Engine();
    var intersections = engine.get_intersections();
    var interI7 = engine.get_intersection("I7");
    var interH6 = engine.get_intersection("H6");
    var interG4 = engine.get_intersection("G4");
    var interG5 = engine.get_intersection("G5");
    var interG6 = engine.get_intersection("G6");
    engine.move_stack(interI7, interH6);
    engine.move_stack(interH6, interG4);
    engine.move_stack(interG4, interG5);
    engine.move_stack(interG5, interG6);
    var H6Height = interH6.get_height();
    var G6Height = interG6.get_height();
    engine.move_stack(interH6, interG6);
    assertEquals("H6 Shouldn't have changed", interH6.get_height(), H6Height);
    assertEquals("G6 Shouldn't have changed", interG6.get_height(), G6Height);
};

LyngkTestCase.prototype.testStory23 = function(){
    var ok = true;
    while(ok) {
        var engine = new Lyngk.Engine();
        var intersections = engine.get_intersections();
        var interC1 = engine.get_intersection("C1");
        var interC2 = engine.get_intersection("C2");
        var interC3 = engine.get_intersection("C3");
        var interC4 = engine.get_intersection("C4");
        var interC5 = engine.get_intersection("C5");
        if (interC1.get_color() !== interC2.get_color() !== interC3.get_color() !== interC4.get_color() !== interC5.get_color()) ok = false;
    }
    engine.move_stack(interC1, interC2);
    engine.move_stack(interC2, interC3);
    engine.move_stack(interC3, interC4);
    engine.move_stack(interC4, interC5);
    assertEquals("C5 Shouldn't contain stack of 5 coins", interC5.get_height(), 5);
};

LyngkTestCase.prototype.testStory24 = function(){
    var engine = new Lyngk.Engine();
    assertEquals("P1 always start game", engine.get_playerTurn(), 'P1');
};

LyngkTestCase.prototype.testStory25 = function(){
    var engine = new Lyngk.Engine();
    var interC1 = engine.get_intersection("C1");
    var interC2 = engine.get_intersection("C2");
    engine.move_stack(interC1, interC2);
    assertEquals("P1 just played, now it's P2 turn", engine.get_playerTurn(), 'P2');
};