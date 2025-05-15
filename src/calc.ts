let result: string = 'Enter an expression';

while (true) {
  const input: string | null = prompt(result, '');

  if (input == null || input === '') {
    break;
  }

  try {
    result = eval(input);
  } catch (error) {
    result = error;
  }
}
