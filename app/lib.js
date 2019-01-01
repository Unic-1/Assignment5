/**
 * Sample function for testing
 *
 */


// Container for lib
var lib = {};

// Return square of a number
lib.square = function (number) {
    number = typeof (number) == 'number' ? number : false;
    if (number) return number * number;
    else return false;

}

// Check if a string is palindorme or not
lib.palindrome = function (str) {
    str = typeof (str) == 'string' && str.length > 0 ? str : false;

    if (str) {
        // Split the string
        var strArr = str.split('');

        // Reverse the array
        var revArr = strArr.reverse();

        // Join the array to make a string
        var revStr = revArr.join('');

        return str == revStr;
    } else {
        return false;
    }
}

// Add two numbers
lib.add = function (a, b) {
    a = typeof(a) == 'number' ? a : false;
    b = typeof(b) == 'number' ? b : false;

    if(a && b) return a + b;
    else return false;
}

// Export the module
module.exports = lib;