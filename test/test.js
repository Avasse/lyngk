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
    assertEquals("Coordonnées are not equals", coordinates2.to_string(), "A1");
};