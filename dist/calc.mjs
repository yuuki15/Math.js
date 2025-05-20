import { parse } from '../dist/parser.mjs';
document.addEventListener('DOMContentLoaded', function () {
    var calc = document.getElementById('calc');
    var input = document.getElementById('input');
    var output = document.getElementById('output');
    calc.addEventListener('submit', function (event) {
        event.preventDefault();
        var expr = input.value;
        var result = parse(expr);
        output.textContent = result;
    });
});
