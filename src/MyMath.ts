/**
 * Reimplementation of the built-in Math object
 * @hideconstructor
 */
export default abstract class MyMath {
  /**
   * Absolute value
   *
   * $$|x| ≝ \begin{cases}
   *   -x, & \text{if } x < 0 \\\\
   *   x,  & \text{otherwise}
   * \end{cases}$$
   */
  public static abs(x: number): number {
    return x < 0 ? -x : x;
  }

  /**
   * Exponential function
   *
   * $$\exp(x) ≝ \sum_{n = 0}^\infty \frac{x^n}{n!}$$
   */
  public static exp(x: number): number {
    return this.sum((n) => x**n / this.factorial(n), 0, Infinity);
  }

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
  public static sum(
    f: (i: number) => number,
    m: number,
    n: number,
  ): number {
    if (n === Infinity) {
      return this.lim((n) => this.sum(f, m, n));
    }

    let result = 0;
    for (let i = m; i <= n; i++) {
      result += f(i);
    }
    return result;
  }

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
  public static product(
    f: (i: number) => number,
    m: number,
    n: number,
  ): number {
    if (n === Infinity) {
      return this.lim((n) => this.product(f, m, n));
    }

    let result = 1;
    for (let i = m; i <= n; i++) {
      result *= f(i);
    }
    return result;
  }

  /**
   * Factorial
   *
   * $$n! ≝ \prod_{i = 1}^n i$$
   *
   * @group Auxiliary Methods
   */
  public static factorial(n: number): number {
    return this.product((i) => i, 1, n);
  }

  /**
   * Limit
   *
   * $$\lim_{n \to \infty} f(n)$$
   *
   * @group Auxiliary Methods
   */
  public static lim(f: (n: number) => number): number {
    let previous = f(0);

    for (let n = 1;; n *= 2) {
      const current = f(n);
      const relativeDifference = (
        Math.abs(current - previous) / Math.abs(current)
      );

      if (relativeDifference < Number.EPSILON) {
        return current;
      }

      previous = current;
    }
  }
}
