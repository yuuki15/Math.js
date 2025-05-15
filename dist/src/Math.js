"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Reimplementation of the built-in Math object
 * @hideconstructor
 */
var MyMath = /** @class */ (function () {
    function MyMath() {
    }
    /**
     * Absolute value
     *
     * $$|x| = \begin{cases}
     *   -x, & \text{if } x < 0 \\\\
     *    x, & \text{otherwise}
     * \end{cases}$$
     */
    MyMath.abs = function (x) {
        return x < 0 ? -x : x;
    };
    /**
     * Discrete limit of a sequence
     */
    MyMath.lim = function (f, tolerance, maxSteps) {
        if (tolerance === void 0) { tolerance = 1e-8; }
        if (maxSteps === void 0) { maxSteps = 1e4; }
        console.log(Math.abs.toString());
        var previousValue = f(0);
        for (var i = 1; i < maxSteps; i++) {
            var currentValue = f(i);
            if (Math.abs(currentValue - previousValue) < tolerance) {
                return currentValue;
            }
            previousValue = currentValue;
        }
    };
    return MyMath;
}());
exports.default = MyMath;
