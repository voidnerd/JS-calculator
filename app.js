

(function() {
    function Calculator(displayId) {
        this.displayId = displayId;
        this.operationArray = [];
    }
   
    Calculator.prototype.updateDisplay = function() {
        document.getElementById(this.displayId).innerText = this.operationArray.join(' ');
    };
   
    Calculator.prototype.addToLast = function(input) {
        this.operationArray[this.operationArray.length - 1] += input;
    };
   
    Calculator.prototype.getLastItem = function() {
        return this.operationArray[this.operationArray.length - 1];
    };
    Calculator.prototype.handleNumber = function(number) {
        if (isNaN(this.getLastItem())) {
            this.operationArray.push(number.toString());
        } else {
            this.addToLast(number.toString());
        }
        this.updateDisplay()
    };
   
    Calculator.prototype.handleOperator = function(operator) {
        if (!isNaN(this.getLastItem())) {
            if (operator === '.') {
                this.addToLast(operator);
            } else {
                this.operationArray.push(operator);
            }
            this.updateDisplay();
        }
    };
   
    Calculator.prototype.allClear = function(funcName) {
        this.operationArray = [];
        this.updateDisplay();
    };

    Calculator.prototype.clearEntry = function() {
        this.operationArray[this.operationArray.length - 1] = this.getLastItem().toString().slice(0, -1);
        if (this.getLastItem().length < 1) {
            this.operationArray.pop();
        }
        this.updateDisplay();
    };
   
    Calculator.prototype.getTotal = function() {
        if (isNaN(this.getLastItem())) {
            this.operationArray.pop();
        }
        var total = eval(this.operationArray.join(''));
        this.operationArray = [total];
        this.updateDisplay();
    };
   
    var myCalculator = new Calculator('display');
   
    document.getElementById('ac').addEventListener('click', function() {
        myCalculator.allClear();
    });
   
    document.getElementById('ce').addEventListener('click', function() {
        myCalculator.clearEntry();
    });
   
    document.getElementById('=').addEventListener('click', function() {
        myCalculator.getTotal();
    });
   
    var operatorControls = document.getElementsByClassName('operator'),
        numberControls = document.getElementsByClassName('number');
   
    for (var i = 0; i < operatorControls.length; i++) {
        operatorControls[i].addEventListener('click', function() {
            myCalculator.handleOperator(this.getAttribute('id'));
        });
    }
    for (i = 0; i < numberControls.length; i++) {
        numberControls[i].addEventListener('click', function() {
            myCalculator.handleNumber(this.getAttribute('id'));
        });
    }
  })();