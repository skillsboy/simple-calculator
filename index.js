class Calculator {
    constructor() {
        this.clear();
    }

    calculate(numberOrOperator) {
        let isEqualOperator = numberOrOperator == "=";
        let isNumber = !isNaN(numberOrOperator) || numberOrOperator == ".";

        // is number
        if (isNumber) {
            this.currentNumber = this.currentNumber + numberOrOperator;

            if (!this.previousOperator && this.currentOperator || this.previousOperator && this.currentOperator) {
                this.previousOperator = this.currentOperator;
                this.currentOperator = "";
            }

            return this.currentNumber;
        }

        // is operator
        this.currentOperator = isEqualOperator ? "" : numberOrOperator;
        let num1 = parseFloat(this.previousNumber);
        let num2 = parseFloat(this.currentNumber);
        let result;

        if (this.previousOperator) numberOrOperator = this.previousOperator;

        if (isEqualOperator) {
            if (isNaN(num1) && isNaN(num2)) {
                this.previousNumber = "";
                this.currentNumber = "";

                return "0";
            }

            if (!isNaN(num2) && isNaN(num1)) {
                this.currentNumber = num2.toString();
                this.previousOperator = "";
                this.currentOperator = "";

                return this.currentNumber;
            }

            if (!isNaN(num1) && isNaN(num2)) {
                this.currentNumber = num1.toString();
                this.previousOperator = "";
                this.currentOperator = "";
                this.previousNumber = "";

                return this.currentNumber;
            }

            this.currentOperator = "";
            this.previousOperator = "";
        }

        if (isNaN(num2) && isNaN(num1) && numberOrOperator != "-") {
            this.currentOperator = "";
            this.currentNumber = "";
            return "0";
        }

        if (isNaN(num2) && isNaN(num1) && numberOrOperator == "-") {
            this.currentOperator = "";
            this.currentNumber = "-";
            return this.currentNumber;
        }

        if (isNaN(num2)) {
            return this.previousNumber;
        }

        if (isNaN(num1)) {
            this.previousNumber = this.currentNumber;
            this.currentNumber = "";
            return this.previousNumber;
        }

        switch (numberOrOperator) {
            case "+":
                result = num1 + num2;
                break;
            case "-":
                result = num1 - num2;
                break;
            case "×":
                result = num1 * num2;
                break;
            case "÷":
                result = num1 / num2;
                break;
            default:
                break;
        }

        if (isEqualOperator) {
            this.previousNumber = "";
            this.currentNumber = result.toString();

            return this.currentNumber;
        }

        this.previousNumber = result.toString();
        this.currentNumber = "";

        return this.previousNumber;
    }

    clear() {
        this.previousNumber = "";
        this.currentNumber = "";
        this.previousOperator = "";
        this.currentOperator = "";

        return "0";
    }

    del() {
        let num1 = parseFloat(this.previousNumber);
        let num2 = parseFloat(this.currentNumber);

        if (num2) {
            num2 = num2.toString().slice(0, -1);
            num2 = parseFloat(num2) ? parseFloat(num2) : 0;

            this.currentNumber = num2 != 0 ? num2.toString() : "";

            if (num2) return this.currentNumber;
            if (num1) return this.previousNumber;

            return "0";
        }

        if (num1) {
            return this.previousNumber;
        }



        return "0";

        // .slice(0, -1));
    }
}

const numberBtns = document.querySelectorAll("[data-number]");
const operationBtns = document.querySelectorAll("[data-operation]");
const equalsBtn = document.querySelector("[data-equals]");
const clearBtn = document.querySelector("[data-clear]");
const delBtn = document.querySelector("[data-delete]");
const display = document.getElementById("display");

const calculator = new Calculator();

numberBtns.forEach(function (number) {
    number.onclick = function (event) {
        display.textContent = calculator.calculate(this.textContent);
    };
});

operationBtns.forEach(function (operation) {
    operation.onclick = function (event) {
        display.textContent = calculator.calculate(this.textContent);
    };
});

equalsBtn.onclick = function (event) {
    display.textContent = calculator.calculate(this.textContent);
};

clearBtn.onclick = function (event) {
    display.textContent = calculator.clear();
};

delBtn.onclick = function (event) {
    display.textContent = calculator.del();
};

