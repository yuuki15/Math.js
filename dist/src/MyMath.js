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
     * $$|x| ≝ \begin{cases}
     *   -x, & \text{if } x < 0 \\\\
     *   x,  & \text{otherwise}
     * \end{cases}$$
     */
    MyMath.abs = function (x) {
        return x < 0 ? -x : x;
    };
    /**
     * Exponential function
     *
     * $$\exp(x) ≝ \sum_{n = 0}^\infty \frac{x^n}{n!}$$
     */
    MyMath.exp = function (x) {
        var _this = this;
        return this.sum(function (n) { return Math.pow(x, n) / _this.factorial(n); }, 0, Infinity);
    };
    /**
     * Summation
     *
     * $$\begin{align}
     * \sum_{i = m}^n f(i)      &≝ f(m) + f(m + 1) + \cdots + f(n) \\\\
     * \sum_{i = m}^\infty f(i) &≝ \lim_{n \to \infty} \sum_{i = m}^n f(i)
     * \end{align}$$
     *
     * @group Auxiliary Methods
     */
    MyMath.sum = function (f, m, n) {
        var _this = this;
        if (n === Infinity) {
            return this.lim(function (n) { return _this.sum(f, m, n); });
        }
        var result = 0;
        for (var i = m; i <= n; i++) {
            result += f(i);
        }
        return result;
    };
    /**
     * Product
     *
     * $$\begin{align}
     * \prod_{i = m}^n f(i)      &≝ f(m) f(m + 1) \cdots f(n) \\\\
     * \prod_{i = m}^\infty f(i) &≝ \lim_{n \to \infty} \prod_{i = m}^n f(i)
     * \end{align}$$
     *
     * @group Auxiliary Methods
     */
    MyMath.product = function (f, m, n) {
        var _this = this;
        if (n === Infinity) {
            return this.lim(function (n) { return _this.product(f, m, n); });
        }
        var result = 1;
        for (var i = m; i <= n; i++) {
            result *= f(i);
        }
        return result;
    };
    /**
     * Factorial
     *
     * $$n! ≝ \prod_{i = 1}^n i$$
     *
     * @group Auxiliary Methods
     */
    MyMath.factorial = function (n) {
        return this.product(function (i) { return i; }, 1, n);
    };
    /**
     * Limit
     *
     * $$\lim_{n \to \infty} f(n)$$
     *
     * @group Auxiliary Methods
     */
    MyMath.lim = function (f) {
        var previous = f(0);
        for (var n = 1;; n *= 2) {
            var current = f(n);
            var relativeDifference = (Math.abs(current - previous) / Math.abs(current));
            if (relativeDifference < Number.EPSILON) {
                return current;
            }
            previous = current;
        }
    };
    return MyMath;
}());
exports.default = MyMath;
