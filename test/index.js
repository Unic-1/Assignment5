/**
 * Test Runner
 *
 */

// Dependencies
var lib = require('./../app/lib');
var assert = require('assert');

// Container for test runner
_app = {};

// Container for unit test
_app.tests = {
    unit: {}
};

// Square should return 9 (when paramerter is 3)
_app.tests.unit['square should return 9'] = function(done) {
    var square = lib.square(3);
    assert.equal(square, 9);
    done();
}

// Square should return the square of a number
_app.tests.unit['square should return a number'] = function(done) {
    var square = lib.square(3);
    assert.equal(typeof(square), 'number');
    done();
}

// Palindrome should return true (when paramerter is MADAM)
_app.tests.unit['Palindrome should return true'] = function(done) {
    var isPalindrome = lib.palindrome('MADAM');
    assert.equal(isPalindrome, true);
    done();
}

// Palindrome should not throw error when invalid paramerter is passed
_app.tests.unit['Palindrome should not throw error when invalid paramerter is passed'] = function(done) {
    assert.doesNotThrow(function() {
        lib.palindrome(123);
        done();
    }, TypeError);
}

// Palindrome should return false
_app.tests.unit['Palindrome should return false'] = function(done) {
    assert.doesNotThrow(function() {
        var isPalindrome = lib.palindrome('HILL');
        assert.equal(isPalindrome, false);
        done();
    }, TypeError);
}

// Add should return 8
_app.tests.unit['Add should return 8'] = function(done) {
    var sum = lib.add(5, 3);
    assert.ok(sum);
    assert.equal(sum, 8);
    done();
}

// Add should return false when invalid parameter is passed
_app.tests.unit['Add should return false'] = function(done) {
    assert.doesNotThrow(function() {
        var sum = lib.add('a', 'b');
        assert.equal(sum, false);
        done();
    }, TypeError);
}


// Count all the tests
_app.countTests = function () {
    var counter = 0;
    for (var key in _app.tests) {
        if (_app.tests.hasOwnProperty(key)) {
            var subTests = _app.tests[key];
            for (var testName in subTests) {
                if (subTests.hasOwnProperty(testName)) {
                    counter++;
                }
            }
        }
    }

    return counter;
}

// Run al lthe tests, collecting the errors and successes
_app.runTests = function () {
    var errors = [];
    var successes = 0;
    var limit = _app.countTests();
    var counter = 0;

    for (var key in _app.tests) {
        if (_app.tests.hasOwnProperty(key)) {
            var subTests = _app.tests[key];
            for (var testName in subTests) {
                if (subTests.hasOwnProperty(testName)) {
                    (function () {
                        var tmpTestName = testName;
                        var testValue = subTests[testName];
                        // Call the test
                        try {
                            testValue(function () {
                                // If it calls back without throwing, then it succeded, so log it in green
                                console.log('\x1b[32m%s\x1b[0m', tmpTestName);
                                counter++;
                                successes++;
                                if (counter == limit) {
                                    _app.produceTestReport(limit, successes, errors);
                                }
                            })
                        } catch (e) {
                            // If it throws, then it failed, so capture the error and log it in red
                            errors.push({
                                name: testName,
                                error: e
                            });
                            console.log('\x1b[31m%s\x1b[0m', tmpTestName);
                            counter++;
                            if (counter == limit) {
                                _app.produceTestReport(limit, successes, errors);
                            }
                        }
                    })();
                }
            }
        }
    }
}

// Produce a test outcome report
_app.produceTestReport = function (limit, successes, errors) {
    console.log("");
    console.log("--------BEGIN TEST REPORT-----------");
    console.log('');
    console.log('Total Tests: ', limit);
    console.log('Pass: ', successes);
    console.log('Fail: ', errors.length);
    console.log('');

    // If there are errors, print them in detail
    if (errors.length > 0) {
        console.log('-----------BEGIN ERROR DETAILS--------------');
        console.log('');

        errors.forEach(function(testError) {
            console.log('\x1b[31m%s\x1b[0m', testError.name);
            console.log(testError.error);
            console.log('');
        });

        console.log('');
        console.log('-----------END ERROR DETAILS--------------');
    }
    console.log('');
    console.log('-----------END TEST REPORT--------------');
    process.exit(0);
}

// Run the test
_app.runTests();