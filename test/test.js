/* eslint-env node, mocha */
/* eslint block-scoped-var: "off" */

if (typeof window === 'undefined') {
  var expect = require('chai').expect;
  var _ = require('../reunderscore.js')._;
}

describe('reUnderScore - Collection Functions', function() {

  describe('Map - Each and Range also tested', function() {
    var mapFn = function(n) {
      return n * 2;
    };

    describe('Mutiply each element in input list by 2', function() {

      it('Test with array input', function() {
        expect(_.map(_.range(1, 5), mapFn)).to.deep.equal([2, 4, 6, 8, 10]);
      });

      it('Test with object input', function() {
        var col = {
          one: 1,
          two: 2,
          three: 3,
          four: 4,
          five: 5
        };
        expect(_.map(col, mapFn)).to.deep.equal([2, 4, 6, 8, 10]);
      });
    });

  });

  describe('Reduce', function() {
    it('Sum all elements in array', function() {
      var reduceFn = function(a, b) {
        return a + b;
      };
      expect(_.reduce(_.range(1, 15), reduceFn)).to.equal(120);
    });
  });

  describe('ReduceRight', function() {
    it('Concatenates array items in reverse order', function() {
      var list = [
        [0, 1],
        [2, 3],
        [4, 5]
      ];
      var flat = _.reduceRight(list, function(a, b) {
        return a.concat(b);
      }, []);

      expect(flat).to.deep.equal([4, 5, 2, 3, 0, 1]);
    });
  });

  describe('Find', function() {
    describe('Searches list returns first item to pass true for predicate', function() {

      it('Test with array input', function() {
        var even = _.find([1, 2, 3, 4, 5, 6], function(num) {
          return num % 2 === 0;
        });
        expect(even).to.equal(2);
      });

      it('Test with object input', function() {
        var col = {
          one: 1,
          two: 2,
          three: 3,
          four: 4,
          five: 5,
          six: 6
        };
        var even = _.find(col, function(num) {
          return num % 2 === 0;
        });
        expect(even).to.equal(2);
      });
    });
  });

  describe('Filter - Each also tested', function() {
    describe('Searches list returns all items to pass true for predicate', function() {

      it('Test with array input', function() {
        var even = _.filter([1, 2, 3, 4, 5, 6], function(num) {
          return num % 2 === 0;
        });
        expect(even).to.deep.equal([2, 4, 6]);
      });

      it('Test with object input', function() {
        var col = {
          one: 1,
          two: 2,
          three: 3,
          four: 4,
          five: 5,
          six: 6
        };
        var even = _.filter(col, function(num) {
          return num % 2 === 0;
        });
        expect(even).to.deep.equal([2, 4, 6]);
      });
    });
  });

  describe('Where', function() {
    it('Searches list, returns array of all values that match properties key value pairs.', function() {

      var listOfPlays = [{
        title: 'Cymbeline',
        author: 'Shakespeare',
        year: 1611
      }, {
        title: 'The Tempest',
        author: 'Shakespeare',
        year: 1611
      }, {
        title: 'Cymbeline1',
        author: 'Shakespeare1',
        year: 1614
      }, {
        title: 'The Tempest',
        author: 'Shakespeare',
        year: 1613
      }];

      var result = _.where(listOfPlays, {
        author: 'Shakespeare',
        year: 1611
      });

      var expected = [{
        title: 'Cymbeline',
        author: 'Shakespeare',
        year: 1611
      }, {
        title: 'The Tempest',
        author: 'Shakespeare',
        year: 1611
      }];

      expect(result).to.deep.equal(expected);
    });
  });

  describe('FindWhere', function() {
    it('Searches list, returns first value that matches properties key value pairs.', function() {

      var listOfPlays = [{
        title: 'Cymbeline',
        author: 'Shakespeare',
        year: 1611
      }, {
        title: 'The Tempest',
        author: 'Shakespeare',
        year: 1611
      }, {
        title: 'Cymbeline1',
        author: 'Shakespeare1',
        year: 1614
      }, {
        title: 'The Tempest',
        author: 'Shakespeare',
        year: 1613
      }];

      var result = _.findWhere(listOfPlays, {
        author: 'Shakespeare',
        year: 1611
      });

      var expected = {
        title: 'Cymbeline',
        author: 'Shakespeare',
        year: 1611
      };

      expect(result).to.deep.equal(expected);
    });
  });

  describe('Reject', function() {
    describe('Returns values in list that return false for predicate', function() {

      it('Test with array input', function() {
        var odds = _.reject([1, 2, 3, 4, 5, 6], function(num) {
          return num % 2 === 0;
        });
        expect(odds).to.deep.equal([1, 3, 5]);
      });

      it('Test with object input', function() {
        var col = {
          one: 1,
          two: 2,
          three: 3,
          four: 4,
          five: 5,
          six: 6
        };
        var odds = _.reject(col, function(num) {
          return num % 2 === 0;
        });
        expect(odds).to.deep.equal([1, 3, 5]);
      });
    });
  });

  describe('Every', function() {
    describe('Returns true if all values in list return true for predicate', function() {

      var isEven = function(input) {
        return input % 2 === 0;
      };

      it('Test with array input', function() {
        var result = _.every(_.range(2, 30, 2), isEven);
        expect(result).to.equal(true);

        result = _.every(_.range(1, 30, 2), isEven);
        expect(result).to.equal(false);
      });

      it('Test with object input', function() {
        var col = {
          one: 1,
          two: 2,
          three: 3,
          four: 4,
          five: 5,
          six: 6
        };

        var result = _.every(col, isEven);
        expect(result).to.equal(false);

        col = {
          two: 2,
          four: 4,
          six: 6
        };
        result = _.every(col, isEven);
        expect(result).to.equal(true);
      });
    });
  });

  describe('Some', function() {
    var isEven = function(input) {
      return input % 2 === 0;
    };

    describe('Returns true if any values in list return true for predicate', function() {
      it('Test with array input', function() {
        var result = _.some([1, 3, 5, 7, 9, 10], isEven);
        expect(result).to.equal(true);

        result = _.some([1, 3, 5, 7, 9], isEven);
        expect(result).to.equal(false);
      });

      it('Test with object input', function() {
        var col = {
          one: 1,
          two: 3,
          three: 5,
          four: 7,
          five: 9,
          six: 10
        };

        var result = _.some(col, isEven);
        expect(result).to.equal(true);

        col = {
          one: 1,
          two: 3,
          three: 5,
          four: 7,
          five: 9
        };

        result = _.some(col, isEven);
        expect(result).to.equal(false);
      });
    });
  });

  describe('Contains', function() {
    it('Returns true value is present in list.', function() {
      var result = _.contains([1, 2, 3], 3);
      expect(result).to.equal(true);
    });
  });

  describe('Invoke', function() {
    it('Call function for each value in list.', function() {
      var result = _.invoke([
        [5, 1, 7],
        [3, 2, 1]
      ], 'sort');
      expect(result).to.deep.equal([
        [1, 5, 7],
        [1, 2, 3]
      ]);
    });
  });

  describe('Pluck', function() {
    describe('Extracts a list of property values', function() {

      it('Test with array input', function() {
        var stooges = [{
          name: 'moe',
          age: 40
        }, {
          name: 'larry',
          age: 50
        }, {
          name: 'curly',
          age: 60
        }];
        var result = _.pluck(stooges, 'name');
        expect(result).to.deep.equal(['moe', 'larry', 'curly']);
      });

      it('Test with object input', function() {
        var stooges = {
          moe: {
            age: 40,
            height: 6.1,
            weight: 150
          },
          larry: {
            age: 50,
            height: 6.2,
            weight: 155
          },
          curly: {
            age: 60,
            height: 6.3,
            weight: 160
          }
        };

        var result = _.pluck(stooges, 'age');
        expect(result).to.deep.equal([40, 50, 60]);
      });
    });
  });

  describe('Max', function() {
    describe('Returns max value in list.', function() {
      it('Test with array input', function() {
        var stooges = [{
          name: 'moe',
          age: 40
        }, {
          name: 'larry',
          age: 50
        }, {
          name: 'curly',
          age: 60
        }];

        var result = _.max(stooges, function(stooge) {
          return stooge.age;
        });

        expect(result).to.deep.equal({
          name: 'curly',
          age: 60
        });
      });

      it('Test with no iteratee function, array sort used as default', function() {
        var result = _.max(_.range(15));
        expect(result).to.equal(15);
      });
    });
  });

  describe('Min', function() {
    describe('Returns min value in list.', function() {
      it('Test with array input', function() {
        var stooges = [{
          name: 'moe',
          age: 40
        }, {
          name: 'larry',
          age: 50
        }, {
          name: 'curly',
          age: 60
        }];

        var result = _.min(stooges, function(stooge) {
          return stooge.age;
        });

        expect(result).to.deep.equal({
          name: 'moe',
          age: 40
        });
      });

      it('Test with no iteratee function, array sort used as default', function() {
        var numbers = [10, 5, 100, 2, 1000];
        var result = _.min(numbers);
        expect(result).to.equal(2);
      });
    });
  });

  describe('Sort By', function() {
    describe('Returns sorted copy of list.', function() {

      it('Test with array input and interatee function', function() {
        var result = _.sortBy([1, 2, 3, 4, 5, 6], function(num) {
          return Math.sin(num);
        });
        expect(result).to.deep.equal([5, 4, 6, 3, 1, 2]);
      });

      it('Test with array input and interatee property', function() {
        var stooges = [{
          name: 'moe',
          age: 40
        }, {
          name: 'larry',
          age: 50
        }, {
          name: 'curly',
          age: 60
        }];
        var result = _.sortBy(stooges, 'name');

        expect(result).to.deep.equal([{
          name: 'curly',
          age: 60
        }, {
          name: 'larry',
          age: 50
        }, {
          name: 'moe',
          age: 40
        }]);
      });
    });
  });

  describe('Group By', function() {
    describe('Splits Collection into lists, grouped by predicate result.', function() {

      it('Test with array input and interatee function', function() {
        var result = _.groupBy([1.3, 2.1, 2.4], function(num) {
          return Math.floor(num);
        });
        expect(result).to.deep.equal({
          1: [1.3],
          2: [2.1, 2.4]
        });
      });

      it('Test with array input and interatee property', function() {
        var result = _.groupBy(['one', 'two', 'three'], 'length');
        expect(result).to.deep.equal({
          3: ['one', 'two'],
          5: ['three']
        });
      });
    });
  });

  describe('Index By', function() {
    it('Returns key value pairs for each element in list based on interatee property.', function() {
      var stooges = [{
        name: 'moe',
        age: 40
      }, {
        name: 'larry',
        age: 50
      }, {
        name: 'curly',
        age: 60
      }];

      var result = _.indexBy(stooges, 'age');

      expect(result).to.deep.equal({
        40: {
          name: 'moe',
          age: 40
        },
        50: {
          name: 'larry',
          age: 50
        },
        60: {
          name: 'curly',
          age: 60
        }
      });
    });
  });

  describe('Count By', function() {
    it('Sort list into groups, return count by group.', function() {
      var result = _.countBy([1, 2, 3, 4, 5], function(num) {
        return num % 2 === 0 ? 'even' : 'odd';
      });
      expect(result).to.deep.equal({
        odd: 3,
        even: 2
      });
    });
  });

  describe('Shuffle', function() {
    it('Returns shuffled copy of list.', function() {
      var input = [1, 2, 3, 4, 5, 6];
      var result = _.shuffle([1, 2, 3, 4, 5, 6]);

      expect(result.length).to.equal(input.length);
      expect(result).to.not.deep.equal(input);
      expect(result.sort()).to.deep.equal(input.sort());
    });
  });

  describe('Sample', function() {
    it('Returns random sample from list.', function() {
      var result = _.sample([1, 2, 3, 4, 5, 6]);
      expect(result.length).to.equal(1);

      result = _.sample([1, 2, 3, 4, 5, 6], 3);
      expect(result.length).to.equal(3);

    });
  });

  describe('To Array', function() {
    it('Returns array from list', function() {
      var result = (function() {
        return _.toArray(arguments).slice(1);
      }(1, 2, 3, 4));
      expect(result.sort()).to.deep.equal([2, 3, 4]);
    });
  });

  describe('Size', function() {
    it('Returns number of values in list', function() {
      var result = _.size({
        one: 1,
        two: 2,
        three: 3
      });
      expect(result).to.equal(3);
    });
  });

  describe('Partition', function() {
    it('Splits array into two groups based on predicate result from each item.', function() {
      var isOdd = function(input) {
        return input % 2 !== 0;
      };
      var result = _.partition([0, 1, 2, 3, 4, 5], isOdd);
      expect(result).to.deep.equal([
        [1, 3, 5],
        [0, 2, 4]
      ]);
    });
  });


  describe('First', function() {
    it('Returns first n elements of a list, if no param is supplied, return first element.', function() {
      var arr = _.range(1, 10);
      expect(_.first(arr)).to.deep.equal([1]);
      expect(_.first(arr, 3)).to.deep.equal([1, 2, 3]);
    });
  });
});
