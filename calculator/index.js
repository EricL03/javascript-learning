// Get the text area
const result = document.getElementById("result"); 

// Get all buttons 
const clearButton = document.querySelector(".clear"); 
const removeButton = document.querySelector(".remove"); 
const numberButtons = document.querySelectorAll(".number");  
const commaButton = document.querySelector(".comma"); 


// Add event handling to buttons using javascript fucntions
clearButton.addEventListener("click", () => {
    result.value = ""; 
}); 

removeButton.addEventListener("click", () => {
    result.value = result.value.slice(0, -1); 
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