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
    assertTrue("Hashes shouldn't be equals", firstCoordinates.to_hash !== secondCoordinates.to_hash !== thirdCoordinates.to_hash);
};

LyngkTestCase.prototype.testStory7 = function(){
    var intersection = new Lyngk.Intersection();
    assertEquals("Default intersection state should be 0", intersection.get_State(), 0);
};

LyngkTestCase.prototype.testStory8 = function(){
    var pieceBleu = new Lyngk.Piece(Lyngk.Color.BLUE);
    var intersection = new Lyngk.Intersection();
    intersection.add_Piece(pieceBleu);
    assertEquals("Intersection state should be 1", intersection.get_State(), 1);
};