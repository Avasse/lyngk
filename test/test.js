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