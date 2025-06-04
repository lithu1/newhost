document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    let currentInput = '';
    let operator = '';
    let firstOperand = null;
    let secondOperand = null;

    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            const action = this.getAttribute('data-action');

            if (action === 'clear') {
                clearCalculator();
            } else if (action === 'delete') {
                deleteLastDigit();
            } else if (action === 'operation') {
                chooseOperation(value);
            } else if (action === 'calculate') {
                calculateResult();
            } else {
                appendNumber(value);
            }
        });
    });

    function appendNumber(number) {
        if (currentInput === '0' && number !== '.') {
            currentInput = number;
        } else {
            currentInput += number;
        }
        updateDisplay();
    }

    function updateDisplay() {
        display.textContent = currentInput;
    }

    function clearCalculator() {
        currentInput = '0';
        operator = '';
        firstOperand = null;
        secondOperand = null;
        updateDisplay();
    }

    function deleteLastDigit() {
        currentInput = currentInput.slice(0, -1) || '0';
        updateDisplay();
    }

    function chooseOperation(op) {
        if (currentInput === '') return;
        if (firstOperand !== null) {
            calculateResult();
        }
        operator = op;
        firstOperand = currentInput;
        currentInput = '';
    }

    function calculateResult() {
        if (operator === '' || firstOperand === null) return;
        secondOperand = currentInput;
        const result = operate(Number(firstOperand), Number(secondOperand), operator);
        currentInput = result.toString();
        operator = '';
        firstOperand = null;
        secondOperand = null;
        updateDisplay();
    }

    function operate(a, b, operator) {
        switch (operator) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                return b !== 0 ? a / b : 'Error';
            default:
                return 0;
        }
    }
});
