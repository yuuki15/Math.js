/**
 * Split a string into tokens.
 */
function tokenize(expr: string): any[] {
  const tokens: any[] = [];

  // Iterate over each character.
  for (let i: number = 0; i < expr.length; i++) {
    const character: string = expr[i];

    // If a digit is found, collect digits into a number.
    if (/[0-9]/.test(character)) {
      let value: string = character;

      while (/[0-9]/.test(expr[i + 1])) {
        value += expr[i + 1];
        i++;
      }

      tokens.push({ type: 'Number', value });
    } else if (character === '+') {
      tokens.push({ type: 'Plus' })
    } else if (character === '(') {
      tokens.push({ type: 'LeftParen' })
    } else if (character === ')') {
      tokens.push({ type: 'RightParen' })
    }
  }

  return tokens;
}

/**
 * Convert an array of tokens into a tree.
 */
function parse(tokens: any[]): any {
  const stack: any[] = [];

  for (let token of tokens) {
    if (token.type === 'RightParen') {
      const right: any = stack.pop();
      const operator: any = stack.pop();
      const left: any = stack.pop();

      // Remove the left paren.
      stack.pop();

      if (operator.type === 'Plus') {
        stack.push({ type: 'Add', left, right });
      }
    } else {
      stack.push(token);
    }
  }

  return stack.pop();
}

/**
 * Convert a tree into a value.
 */
function evaluate(tree: any): number {
  if (tree.type === 'Number') {
    return Number(tree.value);
  }

  if (tree.type === 'Add') {
    return evaluate(tree.left) + evaluate(tree.right);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const calc = document.getElementById('calc') as HTMLFormElement;
  const input = document.getElementById('input') as HTMLInputElement;
  const output = document.getElementById('output') as HTMLOutputElement;

  calc.addEventListener('submit', (event) => {
    event.preventDefault();
    const expr: string = input.value;

    const tokens: any[] = tokenize(expr);
    const tree: any = parse(tokens);
    const value: number = evaluate(tree);

    output.textContent = [
      value,
      JSON.stringify(tree, null, 2),
      JSON.stringify(tokens, null, 2),
    ].join('\n\n');
  });
});
