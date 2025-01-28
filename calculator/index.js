// Get the text area
const result = document.getElementById("result"); 

// Get all buttons 
const clearButton = document.querySelector(".clear"); 
const removeButton = document.querySelector(".remove"); 
const numberButtons = document.querySelectorAll(".number");  
const operationButtons = document.querySelectorAll(".operation");  
const commaButton = document.querySelector(".comma"); 
const parenthesesButton = document.querySelector(".parentheses"); 
const equalsButton = document.querySelector(".equals"); 

// Global variables
let parenthesesOpened = false; 

let data = []; 
let numberOpened = false; 


// Add event handling to buttons using javascript fucntions
clearButton.addEventListener("click", () => {
    result.value = ""; 

    parenthesesOpened = false; 

    data = []; 
    numberOpened = false; 
}); 

removeButton.addEventListener("click", () => {
    result.value = result.value.slice(0, -1); 

    if (data.length > 0) {
        removed = data.pop(); 

        if (removed === ")") {
            parenthesesOpened = true; 
        } 
        else if (removed === "(") {
            parenthesesOpened = false; 
        }
    }
});

parenthesesButton.addEventListener("click", () => {
    parenthesesAdded = true; 

    if (parenthesesOpened) {
        result.value += ")";  
        data.push(")"); 
        parenthesesOpened = false; 
    }
    else {
        result.value += "(";  
        data.push("("); 
        parenthesesOpened = true; 
    }
});

commaButton.addEventListener("click", () => {
    // You can only add one (1) comma in a row
    if (!(result.value[result.value.length - 1] === ".")) {
        if (!numberOpened) {
            result.value += "0."; 
            data.push("0."); 
        }
        else {
            result.value += "."; 
            data[data.length - 1] = data[data.length - 1] + "."; 
        }
        
        numberOpened = true; 
    }
});

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (!numberOpened) {
            data.push(button.getAttribute("data-value"));  
        }
        else {
            data[data.length - 1] = data[data.length - 1] + button.getAttribute("data-value"); 
        }

        result.value += button.getAttribute("data-value");
        numberOpened = true; 
    })
}); 

operationButtons.forEach(operation => {
    operation.addEventListener("click", () => {
        operationValue = operation.getAttribute("data-value"); 

        // You can only add an operation if a number precedes it!!!
        if (numberOpened) {
            result.value += operationValue; 
            data.push(operationValue);  
            numberOpened = false; 
        }
    })
}); 

equalsButton.addEventListener("click", () => {
    result.value = "yay!!!";  
});
