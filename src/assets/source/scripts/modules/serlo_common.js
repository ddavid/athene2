/**
 * 
 * Athene2 - Advanced Learning Resources Manager
 *
 * @author  Julian Kempff (julian.kempff@serlo.org)
 * @license   http://www.apache.org/licenses/LICENSE-2.0  Apache License 2.0
 * @link        https://github.com/serlo-org/athene2 for the canonical source repository
 */

/*global define, window, console, requestAnimationFrame*/
define(['underscore', 'events'], function (_, eventScope) {
    "use strict";
    var Common = {},
        intervals,
        slice = Array.prototype.slice;

    Common.log = (function () {
        var history = [];
        return function () {
            history.push(arguments);
            if (window.console) {
                console.log(Array.prototype.slice.call(arguments));
            }
        };
    }());

    Common.KeyCode = {
        left: 37,
        up : 38,
        right: 39,
        down: 40,
        enter: 13,
        backspace: 8,
        entf: 46,
        esc: 27,
        shift: 16,
        cmd: 91
    };

    Common.CarbonCopy = function (element) {
        if (!(element instanceof Array) && !(element instanceof Object)) {
            return element;
        }

        var copy = (function () {
            if (element instanceof Array) {
                return slice.call(element, 0);
            }

            if (element instanceof Object) {
                return _.extend({}, element);
            }

            throw new Error('Cant copy element');
        }());

        _.each(copy, function (item, i) {
            copy[i] = Common.CarbonCopy(item);
        });

        return copy;
    };

    Common.sortArrayByObjectKey = function (key, array, ascending) {
        ascending = ascending || false;
        return array.sort(function (a, b) {
            return ((a[key] < b[key]) ? -1 : ((a[key] > b[key]) ? 1 : 0)) * (ascending ? 1 : -1);
        });
    };

    Common.findObjectByKey = function (key, value, object) {
        var item;
        _.each(object, function (val) {
            if (val[key] === value) {
                item = val;
                return;
            }
        });
        return item;
    };

    Common.genericError = function () {
        if (console && "trace" in console) {
            console.trace();
        }
        Common.log(arguments);
        Common.trigger('generic error');
    };

    /*
    * memoize.js
    * by @philogb and @addyosmani
    * with further optimizations by @mathias
    * and @DmitryBaranovsk
    * perf tests: http://bit.ly/q3zpG3
    * Released under an MIT license.
    */
    Common.memoize = function (fn) {
        return function () {
            var args = Array.prototype.slice.call(arguments),
                hash = "",
                i = args.length,
                currentArg = null;
            while (i--) {
                currentArg = args[i];
                hash += (currentArg === Object(currentArg)) ? JSON.stringify(currentArg) : currentArg;
                if (!fn.memoize) {
                    fn.memoize = {};
                }
            }
            return (hash in fn.memoize) ? fn.memoize[hash] : (fn.memoize[hash] = fn.apply(this, args));
        };
    };

    Common.expr = function (statement) {
        return statement;
    };

    Common.trim = function (str) {
        return str.replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
    };

    intervals = {};

    Common.setInterval = function (fn, timeout) {
        var interval = +new Date();

        intervals[interval] = true;

        function loop() {
            if (intervals[interval]) {
                setTimeout(function () {
                    requestAnimationFrame(loop);
                }, timeout);

                fn();
            }
        }

        loop();

        return interval;
    };

    Common.clearInterval = function (interval) {
        if (intervals[interval]) {
            delete intervals[interval];
        }
    };

    eventScope(Common);
    window.Common = Common;
    return Common;
});