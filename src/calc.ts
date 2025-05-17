/**
 * Checks if a token is a number.
 */
function isNumber(token: string): boolean {
  return /^[0-9]$/.test(token);
}

/**
 * Checks if a token is an operator.
 */
function isOperator(token: string): boolean {
  return token === '+';
}

/**
 * Parses an expression.
 */
function parse(expression: string): any {
  const stack: any[] = [];

  // Iterates over each character.
  for (let i: number = 0; i < expression.length; i++) {
    const token: string = expression[i];

    if (isNumber(token)) {
      stack.push({
        type: 'Number',
        value: Number(token),
      });
    } else if (isOperator(token) || token === '(') {
      stack.push(token);
    } else if (token === ')') {
      parseOperation(stack);
    }
  }

  // Handles the outermost expression that is not wrapped in parentheses.
  if (stack.length > 1) {
    parseOperation(stack, true);
  }

  return stack.pop();
}

/**
 * Parses an operation.
 */
function parseOperation(stack: any[], isOutermost: boolean = false): void {
  const right: any = stack.pop();
  const operator: string = stack.pop();
  const left: any = stack.pop();

  if (!isOutermost) {
    // Removes "(".
    stack.pop();
  }

  if (operator === '+') {
    stack.push({
      type: "Add",
      left,
      right,
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const calc = document.getElementById('calc') as HTMLFormElement;
  const input = document.getElementById('input') as HTMLInputElement;
  const output = document.getElementById('output') as HTMLOutputElement;

  calc.addEventListener('submit', (event) => {
    event.preventDefault();
    const inputValue: string = input.value;
    output.textContent = JSON.stringify(parse(inputValue), null, 2);
  });
});
