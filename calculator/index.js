// Get the text area
const result = document.getElementById("result"); 

// Get all buttons 
const clearButton = document.querySelector(".clear"); 
const removeButton = document.querySelector(".remove"); 
const numberButtons = document.querySelectorAll(".number");  
const operationButtons = document.querySelectorAll(".operation");  
const commaButton = document.querySelector(".comma"); 
const parenthesesButton = document.querySelector(".parentheses"); 

// Global variables
let parenthesesOpened = false; 


// Add event handling to buttons using javascript fucntions
clearButton.addEventListener("click", () => {
    result.value = ""; 
}); 

removeButton.addEventListener("click", () => {
    result.value = result.value.slice(0, -1); 
});

parenthesesButton.addEventListener("click", () => {
    if (parenthesesOpened) {
        result.value += ")";  
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
        result.value += operation.getAttribute("data-value"); 
    })
}); 