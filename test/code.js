if ( typeof window === 'undefined' ) {
  	var expect = require("chai").expect;
	var _ = require("../app/code.js")._;
}

describe("reUnderScore - Collection Functions", function() {

	describe("Map", function() {
		var mapFn = function(n) {
			return n * 2;
		};

		it("Mutiply each element in input array by 2", function() {
			expect(_.map(_.range(1, 5), mapFn)).to.deep.equal([2, 4, 6, 8, 10]);
		});

		it("Mutiply each property in input object by 2", function() {

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

	describe("Reduce", function() {
		it("Sum all elements in array", function() {
			var reduceFn = function(a, b, index, col) {
				return a + b;
			};
			expect(_.reduce(_.range(1, 15), reduceFn)).to.equal(120);
		});
	});

	describe("ReduceRight", function() {
		it("Concatenates array items in reverse order", function() {
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

	describe("Find", function() {
		it("Searches list returns first item to pass true for predicate", function() {
			var even = _.find([1, 2, 3, 4, 5, 6], function(num) {
				return num % 2 === 0;
			});
			expect(even).to.equal(2);
		});
	});

	describe("Filter", function() {
		it("Searches list returns all items to pass true for predicate", function() {
			var even = _.filter([1, 2, 3, 4, 5, 6], function(num) {
				return num % 2 === 0;
			});
			expect(even).to.deep.equal([2, 4, 6]);
		});
	});

	describe("Where", function() {
		it("Searches list, returns array of all values that match properties key value pairs.", function() {

			var listOfPlays = [{
				title: "Cymbeline",
				author: "Shakespeare",
				year: 1611
			}, {
				title: "The Tempest",
				author: "Shakespeare",
				year: 1611
			}, {
				title: "Cymbeline1",
				author: "Shakespeare1",
				year: 1614
			}, {
				title: "The Tempest",
				author: "Shakespeare",
				year: 1613
			}];

			var result = _.where(listOfPlays, {
				author: "Shakespeare",
				year: 1611
			});

			var expected = [{
				title: "Cymbeline",
				author: "Shakespeare",
				year: 1611
			}, {
				title: "The Tempest",
				author: "Shakespeare",
				year: 1611
			}];

			expect(result).to.deep.equal(expected);
		});
	});

	describe("FindWhere", function() {
		it("Searches list, returns first value that matches properties key value pairs.", function() {

			var listOfPlays = [{
				title: "Cymbeline",
				author: "Shakespeare",
				year: 1611
			}, {
				title: "The Tempest",
				author: "Shakespeare",
				year: 1611
			}, {
				title: "Cymbeline1",
				author: "Shakespeare1",
				year: 1614
			}, {
				title: "The Tempest",
				author: "Shakespeare",
				year: 1613
			}];

			var result = _.findWhere(listOfPlays, {
				author: "Shakespeare",
				year: 1611
			});

			var expected = {
				title: "Cymbeline",
				author: "Shakespeare",
				year: 1611
			};

			expect(result).to.deep.equal(expected);
		});
	});

	describe("Reject", function() {
		it("Returns values in list that return false for predicate", function() {
			var odds = _.reject([1, 2, 3, 4, 5, 6], function(num) {
				return num % 2 === 0;
			});
			expect(odds).to.deep.equal([1, 3, 5]);
		});
	});

	describe("Every", function() {
		var isEven = function(input) {
			return input % 2 === 0;
		};

		it("Returns true if all values in list return true for predicate", function() {
			var result = _.every(_.range(2, 30, 2), isEven);
			expect(result).to.equal(true);

			result = _.every(_.range(1, 30, 2), isEven);
			expect(result).to.equal(false);
		});
	});

	describe("Some", function() {
		var isEven = function(input) {
			return input % 2 === 0;
		};

		it("Returns true if any values in list return true for predicate", function() {
			var result = _.some([1, 3, 5, 7, 9, 10], isEven);
			expect(result).to.equal(true);

			result = _.some([1, 3, 5, 7, 9], isEven);
			expect(result).to.equal(false);
		});
	});

	describe("Contains", function() {
		it("Returns true value is present in list.", function() {
			var result = _.contains([1, 2, 3], 3);
			expect(result).to.equal(true);
		});
	});

	describe("Invoke", function() {
		it("Call function for each value in list.", function() {
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

	describe("Pluck", function() {
		it("Extracts a list of property values", function() {
			var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
			var result = _.pluck(stooges, 'name');
			expect(result).to.deep.equal(["moe", "larry", "curly"]);
		});
	});

	describe("Max", function() {
		it("Returns max value in list.", function() {
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
	});

	describe("Min", function() {
		it("Returns min value in list.", function() {
			var numbers = [10, 5, 100, 2, 1000];
			var result = _.min(numbers);
			expect(result).to.equal(2);
		});
	});

	describe("Sort By", function() {
		it("Returns sorted copy of list.", function() {
			var result = _.sortBy([1, 2, 3, 4, 5, 6], function(num) {
				return Math.sin(num);
			});
			expect(result).to.deep.equal([5, 4, 6, 3, 1, 2]);

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
			result = _.sortBy(stooges, 'name');
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

	describe("Group By", function() {
		it("Splits Collection into lists, grouped by predicate result.", function() {
			var result = _.groupBy([1.3, 2.1, 2.4], function(num) {
				return Math.floor(num);
			});
			expect(result).to.deep.equal({
				1: [1.3],
				2: [2.1, 2.4]
			});

			result = _.groupBy(['one', 'two', 'three'], 'length');
			expect(result).to.deep.equal({
				3: ["one", "two"],
				5: ["three"]
			});
		});
	});

	describe("Index By", function() {
		it("Returns key for each element in list.", function() {
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
				"40": {
					name: 'moe',
					age: 40
				},
				"50": {
					name: 'larry',
					age: 50
				},
				"60": {
					name: 'curly',
					age: 60
				}
			});
		});
	});

	describe("Count By", function() {
		it("Sort list into groups, return count by group.", function() {
			var result = _.countBy([1, 2, 3, 4, 5], function(num) {
				return num % 2 === 0 ? 'even' : 'odd';
			});
			expect(result).to.deep.equal({odd: 3, even: 2}); 
		});
	});

	describe("Shuffle", function() {
		it("Returns shuffled copy of list.", function() {
			var input = [1, 2, 3, 4, 5, 6];
			var result = _.shuffle([1, 2, 3, 4, 5, 6]);
			
			expect(result.length).to.equal(input.length); 
			expect(result).to.not.deep.equal(input); 
			expect(result.sort()).to.deep.equal(input.sort()); 
		});
	});

	describe("Sample", function() {
		it("Returns random sample from list.", function() {
			var result = _.sample([1, 2, 3, 4, 5, 6]);
			expect(result.length).to.equal(1); 

			result = _.sample([1, 2, 3, 4, 5, 6], 3);
			expect(result.length).to.equal(3); 
			
		});
	});

	describe("To Array", function() {
		it("Returns array from list", function() {
			var result = (function(){ return _.toArray(arguments).slice(1); })(1, 2, 3, 4);
			expect(result.sort()).to.deep.equal([2, 3, 4]); 
		});
	});

	describe("Size", function() {
		it("Returns number of values in list", function() {
			var result = _.size({one: 1, two: 2, three: 3});
			expect(result).to.equal(3); 
		});
	});

	describe("Partition", function() {
		it("Splits array into two groups based on predicate result from each item.", function() {
			var isOdd = function(input) {
				return input % 2 !== 0;
			};
			var result = _.partition([0, 1, 2, 3, 4, 5], isOdd);
			expect(result).to.deep.equal([[1, 3, 5], [0, 2, 4]]); 
		});
	});

});