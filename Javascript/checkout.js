// Retrieve the cart items from local storage or initialize an empty array
let purchased = JSON.parse(localStorage.getItem('cart')) || [];

// Get reference to the HTML body element and the clear button
const body = document.querySelector("#body");
const clear = document.getElementById("clear");

// Function to update the displayed cart items
function jodi() {
    // Clear the existing content in the body
    body.innerHTML = "";

    // Initialize the total cost variable
    let total = 0;

    // Loop through each item in the cart and display its details
    purchased.forEach((item, i) => {
        body.innerHTML += `
            <tr>
                <td><i class='bx bx-x-circle' onclick="dltItem(${i})"></i><a href="#"></a></td>
                <td><img src="${item.url}" alt=""></td>
                <td>${item.name}</td>
                <td>R${item.price}</td>
                <td><input type="number" value="${item.quantity}" onchange="updQutity(${i}, this.value)"></td>
                <td>R${item.price * item.quantity}</td>
            </tr>
        `;

        // Update the total cost with the current item's cost
        total += item.price * item.quantity;
    });

    // Display the total cost row at the end
    body.innerHTML += `
        <tr>
            <td colspan="5">Total:</td>
            <td>R${total}</td>
        </tr>
    `;
}

// Function to update the quantity of an item in the cart
function updQutity(index, newQuantity) {
    // Update the quantity in the cart array
    purchased[index].quantity = parseInt(newQuantity);
    // Update the cart in local storage
    localStorage.setItem('cart', JSON.stringify(purchased));
    // Update the displayed cart
    jodi();
}

// Function to delete an item from the cart
function dltItem(index) {
    // Remove the item from the cart array
    purchased.splice(index, 1);
    // Update the cart in local storage
    localStorage.setItem('cart', JSON.stringify(purchased));
    // Update the displayed cart
    jodi();
}

// Event listener for the clear button
clear.addEventListener("click", () => {
    // Remove the cart from local storage
    localStorage.removeItem('cart');
    // Clear the displayed cart
    body.innerHTML = "";
});

// Event listener when the window is loaded
window.addEventListener('load', () => {
    // Retrieve the cart from local storage and display it
    purchased = JSON.parse(localStorage.getItem('cart')) || [];
    jodi();
});

// Get reference to the purchase button
const BuyButton = document.querySelector('.purchase');

// Event listener for the purchase button
if (BuyButton) {
    BuyButton.addEventListener('click', () => {
        // Add logic related to the purchase action here
        alert('Thank you for your purchase!');
        // Clear the cart and update the displayed cart
        localStorage.removeItem('cart');
        body.innerHTML = "";
    });
}