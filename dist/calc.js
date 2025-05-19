/**
 * Split a string into tokens.
 */
function tokenize(expr) {
    var tokens = [];
    // Iterate over each character.
    for (var i = 0; i < expr.length; i++) {
        var character = expr[i];
        // If a digit is found, collect digits into a number.
        if (/[0-9]/.test(character)) {
            var value = character;
            while (/[0-9]/.test(expr[i + 1])) {
                value += expr[i + 1];
                i++;
            }
            tokens.push({ type: 'Number', value: value });
        }
        else if (character === '+') {
            tokens.push({ type: 'Plus' });
        }
        else if (character === '(') {
            tokens.push({ type: 'LeftParen' });
        }
        else if (character === ')') {
            tokens.push({ type: 'RightParen' });
        }
    }
    return tokens;
}
/**
 * Convert an array of tokens into a tree.
 */
function parse(tokens) {
    var stack = [];
    for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
        var token = tokens_1[_i];
        if (token.type === 'RightParen') {
            var right = stack.pop();
            var operator = stack.pop();
            var left = stack.pop();
            // Remove the left paren.
            stack.pop();
            if (operator.type === 'Plus') {
                stack.push({ type: 'Add', left: left, right: right });
            }
        }
        else {
            stack.push(token);
        }
    }
    return stack.pop();
}
/**
 * Convert a tree into a value.
 */
function evaluate(tree) {
    if (tree.type === 'Number') {
        return Number(tree.value);
    }
    if (tree.type === 'Add') {
        return evaluate(tree.left) + evaluate(tree.right);
    }
}
document.addEventListener('DOMContentLoaded', function () {
    var calc = document.getElementById('calc');
    var input = document.getElementById('input');
    var output = document.getElementById('output');
    calc.addEventListener('submit', function (event) {
        event.preventDefault();
        var inputValue = input.value;
        var tokens = tokenize(inputValue);
        var tree = parse(tokens);
        var value = evaluate(tree);
        output.textContent = [
            value,
            JSON.stringify(tree, null, 2),
            JSON.stringify(tokens, null, 2),
        ].join('\n\n');
    });
});
