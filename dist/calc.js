function isNumber(character) {
    return /^[0-9]$/.test(character);
}
function isOperator(character) {
    return character === '+';
}
function parse(expression) {
    var stack = [];
    for (var i = 0; i < expression.length; i++) {
        var character = expression[i];
        if (isNumber(character)) {
            stack.push({
                type: 'Number',
                value: Number(character),
            });
        }
        else if (isOperator(character) || character === '(') {
            stack.push(character);
        }
        else if (character === ')') {
            parseOperation(stack);
        }
    }
    if (stack.length > 1) {
        parseOperation(stack, true);
    }
    return stack.pop();
}
function parseOperation(stack, isOutermost) {
    if (isOutermost === void 0) { isOutermost = false; }
    var right = stack.pop();
    var operator = stack.pop();
    var left = stack.pop();
    if (!isOutermost) {
        // Removes "(".
        stack.pop();
    }
    if (operator === '+') {
        stack.push({
            type: "Add",
            left: left,
            right: right,
        });
    }
}
document.addEventListener('DOMContentLoaded', function () {
    var calc = document.getElementById('calc');
    var input = document.getElementById('input');
    var output = document.getElementById('output');
    calc.addEventListener('submit', function (event) {
        event.preventDefault();
        var inputValue = input.value;
        output.value = JSON.stringify(parse(inputValue), null, 2);
    });
});
