const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator-keys');
const display = calculator.querySelector('.calculator-screen');

let firstValue = '';
let operator = '';
let secondValue = '';
let result = '';

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target;
        const action = key.classList.contains('operator') ? 'operator' :
                       key.classList.contains('decimal') ? 'decimal' :
                       key.classList.contains('all-clear') ? 'clear' :
                       key.classList.contains('equal-sign') ? 'calculate' :
                       'number';

        const keyContent = key.value;

        if (action === 'number') {
            if (operator === '') {
                firstValue += keyContent;
                display.value = firstValue;
            } else {
                secondValue += keyContent;
                display.value = secondValue;
            }
        }

        if (action === 'operator') {
            if (firstValue !== '' && secondValue !== '') {
                // If an operator is pressed again after a second number, calculate first
                performCalculation();
                operator = keyContent;
            } else if (firstValue !== '') {
                operator = keyContent;
            }
        }

        if (action === 'decimal') {
            if (operator === '' && !firstValue.includes('.')) {
                firstValue += '.';
                display.value = firstValue;
            } else if (secondValue !== '' && !secondValue.includes('.')) {
                secondValue += '.';
                display.value = secondValue;
            }
        }

        if (action === 'calculate') {
            performCalculation();
        }

        if (action === 'clear') {
            clearCalculator();
        }
    }
});

function performCalculation() {
    if (firstValue === '' || operator === '' || secondValue === '') return;

    let num1 = parseFloat(firstValue);
    let num2 = parseFloat(secondValue);
    let finalResult = 0;

    switch (operator) {
        case '+':
            finalResult = num1 + num2;
            break;
        case '-':
            finalResult = num1 - num2;
            break;
        case '*':
            finalResult = num1 * num2;
            break;
        case '/':
            if (num2 === 0) {
                finalResult = 'Error';
            } else {
                finalResult = num1 / num2;
            }
            break;
    }

    display.value = finalResult;
    firstValue = finalResult;
    operator = '';
    secondValue = '';
}

function clearCalculator() {
    firstValue = '';
    operator = '';
    secondValue = '';
    result = '';
    display.value = '';
}