// Load existing products from local storage, or initialize an empty array if none
let prod = JSON.parse(localStorage.getItem('products')) || [];
// Reference to the HTML body element
const body = document.querySelector("#body");
// Reference to the "Save" button
let saveBTN = document.getElementById('saveBTN');
// Reference to the "Add Product" label/button
let ALabel = document.querySelector('.see');
// Variable to track the index of the product being edited
let editIn = null;

// Function to save products to local storage
function saveStorage(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

// Function to display products in the HTML body
function display() {
    // Clear the existing content in the body
    body.innerHTML = "";
    
    // Check if 'prod' is an array and not empty
    if (prod && Array.isArray(prod)) {
        // Loop through each product and append HTML to display in a table
        prod.forEach((item, i) => {
            body.innerHTML += `
                <tr>
                    <td>${item.id}</td>
                    <td><img src="${item.url}" alt=""></td>
                    <td>${item.name}</td>
                    <td>R${item.price}</td>
           
                    <td></td>
                    <td>
                        <button class="normal edit-btn" data-bs-toggle="modal" data-bs-target="#exampleModal" data-index="${i}">Edit</button>
                        <button class="normal delete" data-index="${i}">Delete</button>
                    </td>
                </tr>
            `;
        });

        // Add event listeners to the "Edit" and "Delete" buttons
        document.querySelectorAll('.edit-btn').forEach((editBtn, index) => {
            editBtn.addEventListener('click', () => {
                // Set the index of the product being edited
                editIn = index;
                // Populate the modal with the selected product's information
                populate(prod[editIn]);
            });
        });

        document.querySelectorAll('.delete').forEach((deleteBtn, index) => {
            deleteBtn.addEventListener('click', () => {
                // Delete the selected product
                deleteProduct(index);
            });
        });
    }
}

// Function to add a new product
function moreProd(newPro) {
    // Assign a unique ID to the new product
    newPro.id = prod.length + 1;
    // Add the new product to the 'prod' array
    prod.push(newPro);
    // Save the updated product list to local storage
    saveStorage(prod);
    // Refresh the displayed products
    display();
}

// Function to update an existing product
function upPro(index, datedPro) {
    // Retrieve the existing product at the specified index
    let existPro = prod[index];
    
    // Check if the existing product exists
    if (existPro) {
        // Update the properties of the existing product with new values
        existPro.name = datedPro.name || existPro.name;
        existPro.description = datedPro.description || existPro.description;
        existPro.price = datedPro.price || existPro.price;
        existPro.url = datedPro.url || existPro.url;

        // Update the product ID if provided
        if (datedPro.id !== null && datedPro.id !== undefined) {
            existPro.id = datedPro.id;
        }

        // Save the updated product list to local storage
        saveStorage(prod);
        // Refresh the displayed products
        display();
    } else {
        console.error("Put in another index because it's invalid");
    }
}

// Function to delete a product
function deleteProduct(index) {
    // Remove the product at the specified index from the 'prod' array
    prod.splice(index, 1);
    // Save the updated product list to local storage
    saveStorage(prod);
    // Refresh the displayed products
    display();
}

// Function to populate the modal with product information for editing
function populate(item) {
    // Populate the modal form fields with the selected product's information
    document.querySelector('.Nick').value = item.name || '';
    document.querySelector('.des').value = item.description || '';
    document.querySelector('.money').value = item.price || 0;
    document.querySelector('.pic').value = item.url || '';

    // Add a click event listener to the "Save" button within the modal
    saveBTN.addEventListener('click', () => {
        // Create an object with updated product information
        let upItem = {
            id: item.id || null,
            name: document.querySelector('.Nick').value,
            description: document.querySelector('.des').value,
            price: document.querySelector('.money').value,
            url: document.querySelector('.pic').value,
        };

        // Check if the edit index is valid and update the product
        if (editIn !== null && editIn < prod.length) {
            // Update the existing product
            upPro(editIn, upItem);
            // Create a new Bootstrap modal and hide it
            let modal = new bootstrap.Modal(document.getElementById('exampleModal'));
            modal.hide();
            // Refresh the displayed products
            display();
        } else {
            console.error("Updating index because it's invalid");
        }
    });
}

// Event listener for the "Add Product" button
ALabel.addEventListener('click', () => {
    // Create a new product with default values
    let newPro = {
        name: "New Product",
        description: "Description",
        price: 0,
        url: "https://example.com/image.jpg",
    };
    // Add the new product to the list
    moreProd(newPro);
    // Populate the modal with the new product's information
    populate(newPro);
    // Set the edit index to the last index in the product list
    editIn = prod.length - 1;
});

// Display the products when the page loads
display();

// Event listener for the "Add Product" button within the modal
document.getElementById('addProductBtn').addEventListener('click', () => {
    // Retrieve values from the modal form fields
    let newName = document.getElementById('newProductName').value;
    let newDescription = document.getElementById('newProductDescription').value;
    let newPrice = document.getElementById('newProductPrice').value;
    let newImageUrl = document.getElementById('newProductImageUrl').value;

    // Create a new product object with the retrieved values
    let newProduct = {
        name: newName,
        description: newDescription,
        price: newPrice,
        url: newImageUrl
    };

    // Add the new product to the list
    moreProd(newProduct);
    // Refresh the displayed products
    display();

    // Clear the modal form fields
    document.getElementById('newProductName').value = '';
    document.getElementById('newProductDescription').value = '';
    document.getElementById('newProductPrice').value = '';
    document.getElementById('newProductImageUrl').value = '';

    // Create a new Bootstrap modal and hide it
    let modal = new bootstrap.Modal(document.getElementById('exampleModal'));
    modal.hide();
});