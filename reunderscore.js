(function() {

  if (typeof window !== 'undefined') exports = window;

  var _ = {};

  _.indentity = function(val) {
    return val;
  };
  /**
   * returns true if list is an array
   * @param  {Object}  list
   * @return {Boolean}
   */
  _.isArray = function(list) {
    return Array.isArray(list);
  };
  /**
   * returns true if list is an object
   * @param  {Object}  list
   * @return {Boolean}
   */
  _.isObject = function(list) {
    return typeof list === 'object';
  };

  /**
   * Iterates over list invoking callback fn on each item
   * @param  {[object,array]}   list
   * @param  {Function} fn
   */
  _.each = function(list, fn) {
    if (_.isArray(list)) {
      for (var i = 0; i < list.length; i++) {
        fn(list[i]);
      }
    } else if (_.isObject(list)) {
      for (var key in list) {
        fn(list[key]);
      }
    }
  };
  /**
   * Returns new array based on mapping list items though fn
   * @param  {Array,Object}   list
   * @param  {Function} fn
   * @return {Array}
   */
  _.map = function(list, fn) {
    var result = [];
    _.each(list, function(item) {
      result.push(fn(item));
    });
    return result;
  };
  /**
   * Reduces list down to single value
   * @param  {Array}   list
   * @param  {Function} fn
   * @param  {mixed}   memo
   * @return {mixed}   memo
   */
  _.reduce = function(list, fn, memo) {
    var init = arguments.length === 3;
    fn = fn || _.indentity();
    _.each(list, function(item) {
      if (!init) {
        memo = item;
        init = true;
      } else {
        memo = fn(memo, item);
      }
    });
    return memo;
  };
  /**
   * Performs reduce in reverse order
   * @param  {Array}   list
   * @param  {Function} fn
   * @param  {mixed}   memo
   * @return {mixed}   memo
   */
  _.reduceRight = function(list, fn, memo) {
    return _.reduce(list.reverse(), fn, memo);
  };
  /**
   * Searches list returns first item to pass true for predicate
   * @param  {Array,Object}   list
   * @param  {Function} fn
   * @return {mixed}
   */
  _.find = function(list, fn) {
    if (_.isArray(list)) {
      for (var i = 0; i < list.length; i++) {
        if (fn(list[i]) === true) {
          return list[i];
        }
      }
    } else if (_.isObject(list)) {
      for (var key in list) {
        if (fn(list[key]) === true) {
          return list[key];
        }
      }
    }
    return null;
  };
  /**
   * Searches list returns all items to pass true for predicate
   * @param  {Array,Object}   list
   * @param  {Function} fn
   * @return {Array}
   */
  _.filter = function(list, fn) {
    var result = [];
    _.each(list, function(item) {
      if (fn(item)) {
        result.push(item);
      }
    });
    return result;
  };
  /**
   * Searches list, returns array of all values that match properties key value pairs.
   * @param  {Array} list
   * @param  {Object} properties
   * @return {Array}
   */
  _.where = function(list, properties) {
    var result = [];
    for (var i = 0, match; i < list.length; i++) {
      match = true;
      for (var key in properties) {
        if (list[i][key] !== properties[key]) {
          match = false;
        }
      }
      if (match) result.push(list[i]);
    }
    return result;
  };
  /**
   * Searches list, returns first value that matches properties key value pairs.
   * @param  {Array} list
   * @param  {Object} properties
   * @return {Mixed}
   */
  _.findWhere = function(list, properties) {
    var result = [];
    for (var i = 0, match; i < list.length; i++) {
      match = true;
      for (var key in properties) {
        if (list[i][key] !== properties[key]) {
          match = false;
        }
      }
      if (match) return list[i];
    }
    return result;
  };
  /**
   * Returns values in list that return false for predicate
   * @param  {Array,Object}   list
   * @param  {Function} fn
   * @return {Array}
   */
  _.reject = function(list, fn) {
    var result = [];
    _.each(list, function(item) {
      if (!fn(item)) {
        result.push(item);
      }
    });
    return result;
  };
  /**
   * Returns true if all values in list return true for predicate
   * @param  {Array,Object}   list
   * @param  {Function} fn
   * @return {Bool}
   */
  _.every = function(list, fn) {
    if (_.isArray(list)) {
      for (var i = 0; i < list.length; i++) {
        if (fn(list[i]) === false) {
          return false;
        }
      }
    } else if (_.isObject(list)) {
      for (var key in list) {
        if (fn(list[key]) === false) {
          return false;
        }
      }
    }
    return true;
  };
  /**
   * Returns true if any values in list return true for predicate
   * @param  {Array,Object}   list
   * @param  {Function} fn
   * @return {Bool}
   */
  _.some = function(list, fn) {
    if (_.isArray(list)) {
      for (var i = 0; i < list.length; i++) {
        if (fn(list[i]) === true) {
          return true;
        }
      }
      return false;
    } else if (_.isObject(list)) {
      for (var key in list) {
        if (fn(list[key]) === true) {
          return true;
        }
      }
    }
    return false;
  };
  /**
   * Returns true value is present in list.
   * @param  {Array} list
   * @param  {mixed} value
   * @param  {int} fromIndex
   * @return {Bool}
   */
  _.contains = function(list, value, fromIndex) {
    if (!fromIndex) {
      fromIndex = 0;
    }

    for (var i = fromIndex; i < list.length; i++) {
      if (list[i] === value) return true;
    }
    return false;
  };
  /**
   * Calls methodName for each value in list.
   * @param  {Array} list
   * @param  {String} methodName
   * @return {Array}
   */
  _.invoke = function(list, methodName) {
    var result = [];
    for (var i = 0; i < list.length; i++) {
      var item = list[i];
      if (_.isFunction(item[methodName])) {
        result.push(item[methodName].apply(item));
      }
    }
    return result;
  };
  /**
   * Extracts a list of property values
   * @param  {Array,Object} list
   * @param  {String} propertyName
   * @return {Array}
   */
  _.pluck = function(list, propertyName) {
    var result = [];

    _.each(list, function(item) {
      result.push(item[propertyName]);
    });

    return result;
  };
  /**
   * Returns max value in list.
   * @param  {Array,Object}   list
   * @param  {Function} fn
   * @return {Mixed}
   */
  _.max = function(list, fn) {
    var value, result;
    if (_.isFunction(fn)) {
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
        return parseInt(b, 10) - parseInt(a, 10);
      });
      return result[0];
    }

    if (result) {
      return result;
    }

    return 'Infinity';
  };
  /**
   * Returns min value in list.
   * @param  {Array,Object}   list
   * @param  {Function} fn
   * @return {Mixed}
   */
  _.min = function(list, fn) {
    var value, result;
    if (_.isFunction(fn)) {
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
        return parseInt(a, 10) - parseInt(b, 10);
      })[0];
    }

    if (result) {
      return result;
    }
    return 'Infinity';
  };
  /**
   * Returns sorted copy of list.
   * @param  {Array} list
   * @param  {Function,String} iteratee
   * @return {Array}
   */
  _.sortBy = function(list, iteratee) {
    if (_.isFunction(iteratee)) {
      //sort by iteratee fn
      return list.sort(function(a, b) {
        return iteratee(a) > iteratee(b);
      });
    }
    //sort by iteratee property
    return list.sort(function(a, b) {
      return a[iteratee] > b[iteratee];
    });
  };
  /**
   * Splits Collection into lists, grouped by predicate result.
   * @param  {Array} list
   * @param  {Function,String} iteratee
   * @return {object}
   */
  _.groupBy = function(list, iteratee) {
    var result = {};
    var value, i;
    if (_.isFunction(iteratee)) {
      for (i = 0; i < list.length; i++) {
        value = iteratee(list[i]);

        if (result[value]) {
          result[value].push(list[i]);
        } else {
          result[value] = [];
          result[value].push(list[i]);
        }
      }
    } else if (_.isString(iteratee)) {
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
  };
  /**
   * Returns key value pairs for each element in list based on interatee property.
   * @param  {Array} list
   * @param  {String} iteratee
   * @return {Object}
   */
  _.indexBy = function(list, iteratee) {
    var result = {};
    for (var i = 0, value; i < list.length; i++) {
      value = list[i][iteratee];
      result[value] = list[i];
    }
    return result;
  };
  /**
   * Sort list into groups, return count by group.
   * @param  {Array} list
   * @param  {Function} iteratee
   * @return {Object}
   */
  _.countBy = function(list, iteratee) {
    var result = {};
    for (var i = 0; i < list.length; i++) {
      var value = iteratee(list[i]);

      if (result[value]) {
        result[value]++;
      } else {
        result[value] = 1;
      }
    }
    return result;
  };
  /**
   * Returns shuffled copy of list.
   * @param  {Array} list
   * @return {Array}
   */
  _.shuffle = function(list) {
    var length = list.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.getRandom(index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = list[index];
    }
    return shuffled;
  };
  /**
   * Returns random sample from list."
   * @param  {Array} list
   * @param  {Int} n
   * @return {Array}
   */
  _.sample = function(list, n) {
    n = n || 1;
    var shuffle = _.shuffle(list);
    return shuffle.splice(0, n);
  };
  /**
   * Returns array from list
   * @param  {List} list - anything that can be iterated over (i.e. arguments param)
   * @return {Array}
   */
  _.toArray = function(list) {
    return Array.prototype.slice.call(list);
  };
  /**
   * Returns number of values in list
   * @param  {Array,Object} list
   * @return {int}
   */
  _.size = function(list) {
    if (_.isArray(list)) {
      return list.length;
    } else if (_.isObject(list)) {
      return Object.keys(list).length;
    }
    return 0;
  };
  /**
   * Splits array into two groups based on predicate result from each item.
   * @param  {Array,Object}   list
   * @param  {Function} fn
   * @return {Array}
   */
  _.partition = function(list, fn) {
    var result = [];
    var yes = [];
    var no = [];

    _.each(list, function(item) {
      if (fn(item)) {
        yes.push(item);
      } else {
        no.push(item);
      }
    });

    result.push(yes);
    result.push(no);

    return result;
  };

  _.first = function(list, n) {
    n = n || 1;
    return list.slice(0, n);
  };

  /**
   * returns number between 1 and n
   * @param  {int} n
   * @return {int}
   */
  _.getRandom = function(n) {
    return Math.floor(Math.random() * n);
  };

  /**
   * returns true is object is a string
   * @param  {Object}  object
   * @return {Boolean}
   */
  _.isString = function(object) {

    if (typeof object === 'string') {
      return true;
    }
    return false;
  };

  /**
   * returns true if object is a function
   * @param  {object}  object
   * @return {Boolean}
   */
  _.isFunction = function(object) {
    if (typeof object === 'function') {
      return true;
    }
    return false;
  };

  /**
   * returns array of numbers based on start, end and step values
   * @param  {Int} start optional
   * @param  {Int} end   used as start point if no other params sent
   * @param  {Int} step  optional
   * @return {Array}
   */
  _.range = function(start, end, step) {
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
  };
  /**
   * Invokes callback fn one time, subsequent calls result in no action
   * @param  {Function} fn
   * @return {Function}
   */
  _.once = function(fn) {
    var once = false;
    var result;
    return function() {
      if (once === false) {
        result = fn(arguments);
        once = true;
      }
      return result;
    };
  };

  module.exports = _;
}());
