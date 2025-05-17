function isNumber(character: string): boolean {
  return /^[0-9]$/.test(character);
}

function isOperator(character: string): boolean {
  return character === '+';
}

function parse(expression: string): any {
  const stack: any[] = [];

  for (let i: number = 0; i < expression.length; i++) {
    const character: string = expression[i];

    if (isNumber(character)) {
      stack.push({
        type: 'Number',
        value: Number(character),
      });
    } else if (isOperator(character) || character === '(') {
      stack.push(character);
    } else if (character === ')') {
      parseOperation(stack);
    }
  }

  if (stack.length > 1) {
    parseOperation(stack, true);
  }

  return stack.pop();
}

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
