"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Reimplementation of the built-in Math object
 * @hideconstructor
 */
var Math = /** @class */ (function () {
    function Math() {
    }
    /**
     * Absolute value
     *
     * $$|x| = \begin{cases}
     *    x, & \text{if } x \ge 0 \\\\
     *   -x, & \text{if } x < 0
     * \end{cases}$$
     */
    Math.abs = function (x) {
        return x < 0 ? -x : x;
    };
    return Math;
}());
exports.default = Math;
console.log(Math.abs.toString());
