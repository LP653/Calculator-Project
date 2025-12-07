// Define operations
const add = (a, b) => {
    return Number(a)+Number(b);
}

const sub = (a, b) => {
    return Number(a)-Number(b);
}

const mul = (a, b) => {
    return Number(a)*Number(b);
}

const divide = (a,b) => {
    if (Number(b) === 0) return "You sly dog! You can't divide by 0!";
    const digits = 1000000;
    return Math.round(Number(a)*digits/Number(b))/digits;
}

// Define aesthetic button functionality
const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
    button.addEventListener('mouseenter', () => {
        button.style.opacity = "1";
    });

    button.addEventListener('mouseleave', () => {
        if (button.className === 'operation C') button.style.opacity = "0.8";
        else button.style.opacity = "0.6";
    });

    button.addEventListener('mousedown', () => {
        button.style.backgroundColor = "#aa5000";
        button.style.opacity = "1";
    });

    button.addEventListener('mouseup', () => {
        button.style.backgroundColor = "#ffa500";
        button.style.opacity = "0.6";
    });
});

let display = '0';
let operator = '';
let num1 = '';
let num2 = '';

let op = true; // Flag if you can perform an operation: true = can add an operation; false = cannot perform an operations
let reset = false; // Flag if adding numbers will reset the display value: false = don't reset; true = reset
let decimal = false; // Flag if decimal is present in current number

const dispOb = document.querySelector(".result");
dispOb.textContent = display;

// Make interactivity for number buttons
const numbers = document.querySelectorAll(".number");
numbers.forEach((button) => {
    button.addEventListener('click', () => {
        if (reset) {
            clearFtn();
        }
        if (button.className === 'number .') {
            if (!decimal) {
                display += '.';
                decimal = true;
            }
        } else {
            let number = button.className.split(' ')[1];
            if (display === '0') display = number;
            else display += number;
        }
        dispOb.textContent = display;
    });
});

let clearFtn = () => {
    display = '0';
    dispOb.textContent = display;
    operator = '';
    num1 = '';
    num2 = '';
    op = true;
    reset = false;
    decimal = false;
}

const clear = document.querySelector(".C");
clear.addEventListener('click', () => {
    clearFtn();
});

let operation = (oper) => {
    if (!op) {
        equal();
    }
    operator = ` ${oper} `;
    display += operator;
    dispOb.textContent = display;
    op = false;
    reset = false;
    decimal = false;
};

const addButton = document.querySelector(".add");
addButton.addEventListener('click', () => {operation('+')});

const subButton = document.querySelector(".sub");
subButton.addEventListener('click', () => {operation('-')});

const mulButton = document.querySelector(".mul");
mulButton.addEventListener('click', () => {operation('*')});

const divButton = document.querySelector(".divide");
divButton.addEventListener('click', () => {operation('/')});

const eqButton = document.querySelector(".eq");
let equal = () => {
    if (operator !== '') {
        [num1, num2] = display.split(operator);
        if (num2 === '') return;
        switch(operator) {
            case ' + ':
                display = `${add(num1, num2)}`;
                operator = '';
                break;
            case ' - ':
                display = `${sub(num1, num2)}`;
                operator = '';
                break;
            case ' * ':
                display = `${mul(num1, num2)}`;
                operator = '';
                break;
            case ' / ':
                display = `${divide(num1, num2)}`;
                operator = '';
                break;
        }
        op = true;
        dispOb.textContent = display;
    }
}
eqButton.addEventListener('click', () => {
    equal();
    reset = true;
});