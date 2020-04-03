var finalResult = null;

var calculator = {
    firstOperand : '',
    secondOperand : '',
    operator : null,
    waitingForOperator : false,
    waitingForSecondOperand : false,
};

function performCalculation(firstOp, operator, secondOp){

    switch(calculator.operator.id){
        case "quotient": return firstOp/secondOp;
        case 'product': return firstOp*secondOp;
        case 'sum': return firstOp+secondOp;
        case 'difference': return firstOp-secondOp;
    }
}

function display(obj){
    if(finalResult != null){
        restartCalculator();
        clearScreen();
        finalResult = null;
    } 
    addValue(obj);
    document.getElementById("screen").innerText += obj.value;
    
}

function addValue(obj){

    if(calculator.waitingForOperator && (obj.id == "sum" || obj.id == "difference" || obj.id == "quotient" || obj.id == "product")){
        calculator.operator = obj;
        switchColorOn(calculator.operator.id);
        calculator.waitingForSecondOperand = true;
        return;
    }

    if(calculator.waitingForSecondOperand){
        if(calculator.secondOperand == ''){
            clearScreen();  
            calculator.waitingForOperator = false;
        }   
        switchColorOff(calculator.operator.id);
        calculator.secondOperand += String(obj.value);
    }else{
        calculator.firstOperand += String(obj.value);
        calculator.waitingForOperator = true;
    }
    return;
}

function result(){
    finalResult =  performCalculation(parseFloat(calculator.firstOperand), calculator.operator, parseFloat(calculator.secondOperand));
    clearScreen();
    restartCalculator();
    document.getElementById("screen").innerText += finalResult;
}

function clearScreen(){
    document.getElementById("screen").innerText = '';
    switchColorOff("quotient");
    switchColorOff("product");
    switchColorOff("difference");
    switchColorOff("sum");
}

function switchColorOn(id){
    document.getElementById(id).style.backgroundColor = "white";
    document.getElementById(id).style.color = "#ff9500";
}
function switchColorOff(id){
    document.getElementById(id).style.backgroundColor = "#ff9500";
    document.getElementById(id).style.color = "white";
}

function toggleSign(){
    document.getElementById("screen").innerText = -1*(document.getElementById("screen").innerText);
}

function percentage(){
    document.getElementById("screen").innerText = (document.getElementById("screen").innerText)/100;
}

function restartCalculator(){
    calculator.waitingForOperator = false;
    calculator.waitingForSecondOperand = false;
    calculator.firstOperand = '' ;
    calculator.secondOperand = '';
    calculator.operator = null;
}


