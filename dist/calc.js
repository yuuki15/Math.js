var result = 'Enter an expression';
while (true) {
    var input = prompt(result, '');
    if (input == null || input === '') {
        break;
    }
    try {
        result = eval(input);
    }
    catch (error) {
        result = error;
    }
}
