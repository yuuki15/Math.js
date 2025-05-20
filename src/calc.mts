import { parse } from '../dist/parser.mjs';

document.addEventListener('DOMContentLoaded', () => {
  const calc = document.getElementById('calc') as HTMLFormElement;
  const input = document.getElementById('input') as HTMLInputElement;
  const output = document.getElementById('output') as HTMLOutputElement;

  calc.addEventListener('submit', (event) => {
    event.preventDefault();
    const expr: string = input.value;
    const result: any = parse(expr);
    output.textContent = result;
  });
});
