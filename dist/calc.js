/**
 * Split a string into tokens.
 */
function tokenize(input) {
    var tokens = [];
    // Iterate over each character.
    for (var i = 0; i < input.length; i++) {
        var character = input[i];
        // If a digit is found, collect all following digits to make a number.
        if (/[0-9]/.test(character)) {
            var number = character;
            while (/[0-9]/.test(input[i + 1])) {
                number += input[i + 1];
                i++;
            }
            tokens.push({
                type: 'Number',
                value: number,
            });
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
 * Convert tokens into a tree.
 */
function parse(tokens) {
    var stack = [];
    for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
        var token = tokens_1[_i];
        if (token.type === 'Number') {
            stack.push({
                type: 'Number',
                value: token.value,
            });
        }
        else if (token.type === 'Plus') {
            stack.push({ type: 'Plus' });
        }
        else if (token.type === 'LeftParen') {
            stack.push({ type: 'LeftParen' });
        }
        else if (token.type === 'RightParen') {
            var right = stack.pop();
            var operator = stack.pop();
            var left = stack.pop();
            // Remove the left paren.
            stack.pop();
            if (operator.type === 'Plus') {
                stack.push({
                    type: 'Add',
                    left: left,
                    right: right,
                });
            }
        }
    }
    return stack.pop();
}
/**
 * Convert a tree into a value.
 */
function evaluateTree(tree) {
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
function evaluate(input) {
    var tokens = tokenize(input);
    var tree = parse(tokens);
    return evaluateTree(tree);
}
document.addEventListener('DOMContentLoaded', function () {
    var calc = document.getElementById('calc');
    var input = document.getElementById('input');
    var output = document.getElementById('output');
    calc.addEventListener('submit', function (event) {
        event.preventDefault();
        var inputValue = input.value;
        // output.textContent = String(evaluate(inputValue));
        var tokens = tokenize(inputValue);
        var tree = parse(tokens);
        var value = evaluateTree(tree);
        output.textContent = [
            value,
            JSON.stringify(tree, null, 2),
            JSON.stringify(tokens, null, 2),
        ].join('\n\n');
    });
});
