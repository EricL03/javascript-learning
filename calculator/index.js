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
let parenthesesAdded = 0; 
let percentsAdded = 0;  
let dividesAdded = 0;  
let multipliesAdded = 0;  
let minusAdded = 0;  
let plusAdded = 0;  

let data = []; 
let numberOpened = false; 


// Add event handling to buttons using javascript fucntions
clearButton.addEventListener("click", () => {
    result.value = ""; 

    parenthesesOpened = false; 
    parenthesesAdded = 0; 
    percentsAdded = 0;  
    dividesAdded = 0;  
    multipliesAdded = 0;  
    minusAdded = 0;  
    plusAdded = 0;  

    data = []; 
    numberOpened = false; 
}); 

removeButton.addEventListener("click", () => {
    result.value = result.value.slice(0, -1); 
});

parenthesesButton.addEventListener("click", () => {
    parenthesesAdded = true; 

    if (parenthesesOpened) {
        result.value += ")";  
        parenthesesAdded++; 
        parenthesesOpened = false; 
    }
    else {
        result.value += "(";  
        parenthesesOpened = true; 
    }
});

commaButton.addEventListener("click", () => {
    // You can only add one (1) comma in a row
    if (!(result.value[result.value.length - 1] === ".")) {
        result.value += "."; 
    }
});

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        result.value += button.getAttribute("data-value"); 
    })
}); 

operationButtons.forEach(operation => {
    operation.addEventListener("click", () => {
        operationValue = operation.getAttribute("data-value"); 
        if (operationValue === "+") {
            plusAdded++; 
        }
        else if (operationValue === "-") {
            minusAdded++; 
        }
        else if (operationValue === "*") {
            multipliesAdded++; 
        }
        else if (operationValue === "/") {
            dividesAdded++; 
        }
        else if (operationValue === "%") {
            percentsAdded++; 
        }

        result.value += operationValue; 
    })
}); 

equalsButton.addEventListener("click", () => {
    result.value = "yay!!!";  

    // Evaluate parentheses first
    if (parenthesesAdded) {
        if (parenthesesOpened) {
            result.value = "Error"; 
        }
        else {

        }
    }

    // Evaluate addition
    while (plusAdded > 0) {
        result.value = "addition!!!";  
        
        plusAdded--; 
    }
    
});