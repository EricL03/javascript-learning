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
        else if (containsNumber(removed) || removed === ".") {
            removed = removed.slice(0, -1); 

            if (removed !== "") {
                data.push(removed); 
                numberOpened = true; 
            }
            else {
                numberOpened = false; 
            }
        }
        else {
            // We have removed an operation, hence a number is opened 
            numberOpened = true; 
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

        // You can only add an operation if a number precedes it
        // or if a percentage precedes a normal operation!!!
        if (numberOpened || (data[data.length - 1] === "%" && operationValue !== "%")) {
            result.value += operationValue; 
            data.push(operationValue);  
            numberOpened = false; 
        }
    })
}); 

equalsButton.addEventListener("click", () => {
    //result.value = "yay!!!";  
    //console.log(data); 
    
    // Evaluate all percentages in equation
    evalPercentages(); 

    
    console.log(data); 
});


// Helper functions 
function containsNumber(str) {
    // Regular expression to check for digits (0-9)
    const regex = /\d/;
    return regex.test(str);
}

function evalPercentages() {
    // Find percentages
    let foundPercentagesIndex = []; 
    for (let i = 0; i < data.length; i++) {
        if (data[i] === "%") {
            foundPercentagesIndex.push(i); 
        }
    }

    // Reverse array to remove biggest index first...
    foundPercentagesIndex.reverse(); 

    // Evaluate percentages
    for (let percent of foundPercentagesIndex) {
        // Calculate the value 
        let newValue = Number(data[percent-1]) / 100; 

        // Remove the elements at index1 and index2
        data.splice(percent, 1); // Remove the element at the higher index first
        data.splice(percent - 1, 1); // Remove the element at the lower index
        // Insert the new object at the position of index1
        data.splice(percent - 1, 0, String(newValue));
    }
}
