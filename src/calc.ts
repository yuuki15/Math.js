/**
 * Split a string into tokens.
 */
function tokenize(input: string): any[] {
  const tokens: any[] = [];

  // Iterate over each character.
  for (let i: number = 0; i < input.length; i++) {
    const character: string = input[i];

    // If a digit is found, collect all following digits to make a number.
    if (/[0-9]/.test(character)) {
      let number: string = character;

      while (/[0-9]/.test(input[i + 1])) {
        number += input[i + 1];
        i++;
      }

      tokens.push({
        type: 'Number',
        value: number,
      });
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
 * Convert tokens into a tree.
 */
function parse(tokens: any[]): any {
  const stack: any[] = [];

  for (let token of tokens) {
    if (token.type === 'Number') {
      stack.push({
        type: 'Number',
        value: token.value,
      });
    } else if (token.type === 'Plus') {
      stack.push({ type: 'Plus' });
    } else if (token.type === 'LeftParen') {
      stack.push({ type: 'LeftParen' });
    } else if (token.type === 'RightParen') {
      const right: any = stack.pop();
      const operator: any = stack.pop();
      const left: any = stack.pop();

      // Remove the left paren.
      stack.pop();

      if (operator.type === 'Plus') {
        stack.push({
          type: 'Add',
          left,
          right,
        });
      }
    }
  }

  return stack.pop();
}

/**
 * Convert a tree into a value.
 */
function evaluateTree(tree: any): number {
  if (tree.type === 'Number') {
    return Number(tree.value);
  }

  if (tree.type === 'Add') {
    return evaluateTree(tree.left) + evaluateTree(tree.right);
  }
}

/**
 * Evaluate a string.
 */
function evaluate(input: string): number {
  const tokens: any[] = tokenize(input);
  const tree: any = parse(tokens);
  return evaluateTree(tree);
}

document.addEventListener('DOMContentLoaded', () => {
  const calc = document.getElementById('calc') as HTMLFormElement;
  const input = document.getElementById('input') as HTMLInputElement;
  const output = document.getElementById('output') as HTMLOutputElement;

  calc.addEventListener('submit', (event) => {
    event.preventDefault();
    const inputValue: string = input.value;

    // output.textContent = String(evaluate(inputValue));

    const tokens: any[] = tokenize(inputValue);
    const tree: any = parse(tokens);
    const value: number = evaluateTree(tree);

    output.textContent = [
      value,
      JSON.stringify(tree, null, 2),
      JSON.stringify(tokens, null, 2),
    ].join('\n\n');
  });
});
