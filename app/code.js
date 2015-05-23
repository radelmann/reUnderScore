if ( typeof window !== 'undefined' ) exports = window;
  	
exports._ = {
	/**
	 * Iterates over list invoking callback fn on each item
	 * @param  {[object,array]}   list 
	 * @param  {Function} fn   
	 */
	each: function(list, fn) {
		if (this.isArray(list)) {
			for (var i = 0; i < list.length; i++) {
				fn(list[i]);
			}
		} else if (this.isObject(list)) {
			for (var key in list) {
				fn(list[key]);
			}
		}
	},
	/**
	 * Returns new array based on mapping list items though fn
	 * @param  {[Array,Object]}   list 
	 * @param  {Function} fn   
	 * @return {[Array]}        
	 */
	map: function(list, fn) {
		var result = [];
		var mapFn = function(item) {
			result.push(fn(item));
		};
		this.each(list, mapFn);
		return result;
	},
	/**
	 * Reduces list down to single value
	 * @param  {[Array]}   list 
	 * @param  {Function} fn   
	 * @param  {[type]}   memo 
	 * @return {[type]}   memo  
	 */
	reduce: function(list, fn, memo) {
		for (var i = 0; i < list.length; i++) {
			if (memo) {
				memo = fn(memo, list[i], i, list);
			} else {
				memo = list[i];
			}
		}
		return memo;
	},
	/**
	 * Performs reduce in reverse order
	 * @param  {[Array]}   list  
	 * @param  {Function} fn   
	 * @param  {[type]}   memo 
	 * @return {[type]}   memo     
	 */
	reduceRight: function(list, fn, memo) {
		for (var i = list.length - 1; i >= 0; i--) {
			if (memo) {
				memo = fn(memo, list[i], i, list);
			} else {
				memo = list[i];
			}
		}
		return memo;
	},
	/**
	 * Searches list returns first item to pass true for predicate
	 * @param  {[Array,Object]}   list 
	 * @param  {Function} fn   
	 * @return {[type]}        
	 */
	find: function(list, fn) {
		if (this.isArray(list)) {
			for (var i = 0; i < list.length; i++) {
				if (fn(list[i]) === true) {
					return list[i];
				}
			}
		} else if (this.isObject(list)) {
			for (var key in list) {
				if (fn(list[key]) === true) {
					return list[key];
				}
			}
		}
		return;
	},
	/**
	 * Searches list returns all items to pass true for predicate
	 * @param  {[Array,Object]}   list 
	 * @param  {Function} fn   
	 * @return {[type]}        
	 */
	filter: function(list, fn) {
		var result = [];
		var filterFn = function(item) {
			if (fn(item)) {
				result.push(item);
			}
		};
		this.each(list, filterFn);
		return result;
	},
	/**
	 * Searches list, returns array of all values that match properties key value pairs.
	 * @param  {Array} list       
	 * @param  {[type]} properties 
	 * @return {[type]}            
	 */
	where: function(list, properties) {
		var result = [];
		for (var i = 0; i < list.length; i++) {
			var match = true;
			for (var key in properties) {
				if (list[i][key] !== properties[key]) {
					match = false;
				}
			}
			if (match) result.push(list[i]);
		}
		return result;
	},
	/**
	 * Searches list, returns first value that matches properties key value pairs.
	 * @param  {[type]} list       
	 * @param  {[type]} properties 
	 * @return {[type]}            
	 */
	findWhere: function(list, properties) {
		var result = [];
		for (var i = 0; i < list.length; i++) {
			var match = true;
			for (var key in properties) {
				if (list[i][key] !== properties[key]) {
					match = false;
				}
			}
			if (match) return list[i];
		}
		return;
	},
	/**
	 * Returns values in list that return false for predicate
	 * @param  {[Array,Object]}   list 
	 * @param  {Function} fn   
	 * @return {[type]}        
	 */
	reject: function(list, fn) {
		var result = [];
		var rejectFn = function(item) {
			if (fn(item) === false) {
				result.push(item);
			}
		};
		this.each(list, rejectFn);
		return result;
	},
	/**
	 * Returns true if all values in list return true for predicate
	 * @param  {[Array,Object]}   list 
	 * @param  {Function} fn   
	 * @return {[type]}        
	 */
	every: function(list, fn) {
		if (this.isArray(list)) {
			for (var i = 0; i < list.length; i++) {
				if (fn(list[i]) === false) {
					return false;
				}
			}
		} else if (this.isObject(list)) {
			for (var key in list) {
				if (fn(list[key]) === false) {
					return false;
				}
			}
		}
		return true;
	},
	/**
	 * Returns true if any values in list return true for predicate
	 * @param  {[Array,Object]}   list 
	 * @param  {Function} fn   
	 * @return {[type]}        
	 */
	some: function(list, fn) {
		if (this.isArray(list)) {
			for (var i = 0; i < list.length; i++) {
				if (fn(list[i]) === true) {
					return true;
				}
			}
			return false;
		} else if (this.isObject(list)) {
			for (var key in list) {
				if (fn(list[key]) === true) {
					return true;
				}
			}
			return false;
		}
	},
	/**
	 * Returns true value is present in list.
	 * @param  {[type]} list      
	 * @param  {[type]} value     
	 * @param  {[type]} fromIndex 
	 * @return {[type]}           
	 */
	contains: function(list, value, fromIndex) {
		if (!fromIndex) {
			fromIndex = 0;
		}

		for (var i = fromIndex; i < list.length; i++) {
			if (list[i] === value) return true;
		}
		return false;
	},
	/**
	 * Calls methodName for each value in list.
	 * @param  {[type]} list       
	 * @param  {[type]} methodName 
	 * @return {[type]}            
	 */
	invoke: function(list, methodName) {
		var result = [];
		for (var i = 0; i < list.length; i++) {
			var item = list[i];
			if (this.isFunction(item[methodName])) {
				result.push(item[methodName].apply(item));
			}
		}
		return result;
	},
	/**
	 * Extracts a list of property values
	 * @param  {[type]} list         
	 * @param  {string} propertyName 
	 * @return {Array}              
	 */
	pluck: function(list, propertyName) {
		result = [];
		if (this.isArray(list)) {
			for (var i = 0; i < list.length; i++) {
				result.push(list[i][propertyName]);
			}
		} else if (this.isObject(list)) {
			for (var key in list) {
				result.push(list[key][propertyName]);
			}
		}
		return result;
	},
	/**
	 * Returns max value in list.
	 * @param  {[Array,Object]}   list 
	 * @param  {Function} fn   
	 * @return {[type]}        
	 */
	max: function(list, fn) {
		var value, result;
		if (this.isFunction(fn)) {
			for (var i = 0; i < list.length; i++) {
				var itemValue = fn(list[i]);
				if (i === 0) {
					value = itemValue;
					result = list[i];
				} else if (itemValue > value) {
					value = itemValue;
					result = list[i];
				}
			}
		} else {
			//no iteratee func - use array sort
			result = list.sort(function(a, b) {
				return b > a;
			})[0];
		}

		if (result) {
			return result;
		} else {
			return 'Infinity';
		}
	},	
	/**
	 * Returns min value in list.
	 * @param  {[Array,Object]}   list 
	 * @param  {Function} fn   
	 * @return {[type]}        
	 */
	min: function(list, fn) {
		var value, result;
		if (this.isFunction(fn)) {
			for (var i = 0; i < list.length; i++) {
				var itemValue = fn(list[i]);
				if (i === 0) {
					value = itemValue;
					result = list[i];
				} else if (itemValue < value) {
					value = itemValue;
					result = list[i];
				}
			}
		} else {
			result = list.sort(function(a, b) {
				return b < a;
			})[0];
		}

		if (result) {
			return result;
		} else {
			return 'Infinity';
		}
	},
	/**
	 * Returns sorted copy of list.
	 * @param  {[type]} list     
	 * @param  {[type]} iteratee 
	 * @return {Array}          
	 */
	sortBy: function(list, iteratee) {
		if (this.isFunction(iteratee)) {
			//sort by iteratee fn
			return list.sort(function(a, b) {
				return iteratee(a) > iteratee(b);
			});
		} else {
			//sort by iteratee property
			return list.sort(function(a, b) {
				return a[iteratee] > b[iteratee];
			});
		}
	},
	/**
	 * Splits Collection into lists, grouped by predicate result.
	 * @param  {[type]} list     
	 * @param  {[type]} iteratee 
	 * @return {object}          
	 */
	groupBy: function(list, iteratee) {
		var result = {};
		var value, i;
		if (this.isFunction(iteratee)) {
			for (i = 0; i < list.length; i++) {
				value = iteratee(list[i]);

				if (result[value]) {
					result[value].push(list[i]);
				} else {
					result[value] = [];
					result[value].push(list[i]);
				}
			}
		} else if (this.isString(iteratee)) {
			for (i = 0; i < list.length; i++) {
				value = list[i][iteratee];

				if (result[value]) {
					result[value].push(list[i]);
				} else {
					result[value] = [];
					result[value].push(list[i]);
				}
			}
		}
		return result;
	},
	/**
	 * Returns key for each element in list.
	 * @param  {[type]} list     
	 * @param  {[type]} iteratee 
	 * @return {object}          
	 */
	indexBy: function(list, iteratee) {
		var result = {};
		for (i = 0; i < list.length; i++) {
			value = list[i][iteratee];
			result[value] = list[i];
		}
		return result;
	},
	/**
	 * Sort list into groups, return count by group.
	 * @param  {[type]} list     
	 * @param  {[type]} iteratee 
	 * @return {object}          
	 */
	countBy: function(list, iteratee) {
		var result = {};
		for (var i = 0; i < list.length; i++) {
			var value = iteratee(list[i]);

			if (result[value]) {
				result[value] ++;
			} else {
				result[value] = 1;
			}
		}
		return result;
	},
	/**
	 * Returns shuffled copy of list.
	 * @param  {[type]} list 
	 * @return {Array}      
	 */
	shuffle: function(list) {
		var length = list.length;
		var shuffled = Array(length);
		for (var index = 0, rand; index < length; index++) {
			rand = this.getRandom(index);
			if (rand !== index) shuffled[index] = shuffled[rand];
			shuffled[rand] = list[index];
		}
		return shuffled;
	},
	/**
	 * Returns random sample from list."
	 * @param  {[type]} list 
	 * @param  {[type]} n    
	 * @return {Array}      
	 */
	sample: function(list, n) {
		if (!n) n = 1;

		var shuffle = this.shuffle(list);
		return shuffle.splice(0, n);
	},
	/**
	 * Returns array from list
	 * @param  {[type]} list 
	 * @return {Array}      
	 */
	toArray: function(list) {
		var result = [];
		for (var i = 0; i < list.length; i++) {
			result.push(list[i]);
		}
		return result;
	},
	/**
	 * Returns number of values in list
	 * @param  {[type]} list 
	 * @return {int}      
	 */
	size: function(list) {
		if (this.isArray(list)) {
			return list.length;
		} else if (this.isObject(list)) {
			return Object.keys(list).length;
		}
	},
	/**
	 * Splits array into two groups based on predicate result from each item.
	 * @param  {[Array,Object]}   list 
	 * @param  {Function} fn   
	 * @return {Array}        
	 */
	partition: function(list, fn) {
		var result = [];
		var yes = [],
			no = [];
		for (var i = 0; i < list.length; i++) {
			if (fn(list[i])) {
				yes.push(list[i]);
			} else {
				no.push(list[i]);
			}
		}
		result.push(yes);
		result.push(no);
		return result;
	},

	/**
	 * returns number between 1 and n
	 * @param  {int} n 
	 * @return {int}   
	 */
	getRandom: function(n) {
		return Math.floor(Math.random() * n);
	},

	/**
	 * returns true is object is a string
	 * @param  {[type]}  object 
	 * @return {Boolean}        
	 */
	isString: function(object) {
		if (typeof object === 'string') {
			return true;
		} else {
			return false;
		}
	},

	/**
	 * returns true if object is a function
	 * @param  {object}  object 
	 * @return {Boolean}        
	 */
	isFunction: function(object) {
		if (typeof object === 'function') {
			return true;
		} else {
			return false;
		}
	},
	/**
	 * returns true if list is an array
	 * @param  {[type]}  list 
	 * @return {Boolean}      
	 */
	isArray: function(list) {
		return Array.isArray(list);
	},
	/**
	 * returns true if list is an object
	 * @param  {[type]}  list 
	 * @return {Boolean}      
	 */
	isObject: function(list) {
		return typeof list === 'object';
	},
	/**
	 * Invokes callback fn one time, subsequent calls result in no action
	 * @param  {Function} fn 
	 * @return {Function}      
	 */
	once: function(fn) {
		var once = false;
		return function() {
			if (once === false) {
				fn(arguments);
				once = true;
			}
		};
	},
	/**
	 * returns array of numbers based on start, end and step values
	 * @param  {[type]} start [optional]
	 * @param  {[type]} end   used as start point if no other params sent 
	 * @param  {[type]} step  [optional]
	 * @return {Array}       
	 */
	range: function(start, end, step) {
		if (!end) {
			end = start;
			start = 0;
		}
		if (!step) {
			step = 1;
		}
		var arr = [];
		for (var i = start; i <= end; i += step) {
			arr.push(i);
		}
		return arr;
	}
};