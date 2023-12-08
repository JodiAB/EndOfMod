// Initialize an empty array to store product information
let products = [];

// Get references to HTML elements
let input = document.querySelector('.form');
let out = document.querySelector('.out');
let section = document.querySelector('.pro-container');
let main = document.querySelector('main');
let cart = [];

// Check if products array is empty and display a loading spinner or products
if (products.length === 0) {
  section.innerHTML = `<div class="spinner-border m-5" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>`;
} else {
  display(products);
}

// Constructor function to create product objects
function Constructor(id, name, price, url, quantity) {
  this.id = id,
  this.name = name,
  this.price = price,
  this.url = url,
  this.quantity = quantity === 1
}

// Function to search for products based on user input
function search() {
  let searVal = input.value.toLowerCase();
  let filteredPro = products.filter(product => product.name.toLowerCase().includes(searVal));

  if (filteredPro.length > 0) {
    display(filteredPro);
    out.textContent = '';
  } else {
    section.innerHTML = '';
    out.textContent = 'Nothing to see here!';
  }
}

// Function to sort and display products alphabetically
function sortProd() {
  let sortedProd = [...products];
  sortedProd.sort((a, b) => a.name.localeCompare(b.name));
  display(sortedProd);
}

// Event listeners for search and sort buttons
let searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', search);

let sortBtn = document.getElementById('sortBtn');
sortBtn.addEventListener('click', sortProd);

// Create instances of the Constructor to represent different products
let item = new Constructor(0, 'Graphic Tee:', 150, 'https://i.postimg.cc/3JTgF62R/f1.jpg');
let item1 = new Constructor(1, 'Nomads Embrace Shirt', 300, 'https://i.postimg.cc/7LbHmVN5/f2.jpg');
let item2 = new Constructor(2, 'Ethereal Essence Tee',  250, 'https://i.postimg.cc/t4kdhXrX/f3.jpg');
let item3 = new Constructor(3, 'Floral Print Blouse: ', 325, 'https://i.postimg.cc/4x27fnLh/f4.jpg');
let item4 = new Constructor(4, 'Timeless Elegance Tee', 175, 'https://i.postimg.cc/25dsdLs1/f5.jpg');
let item5 = new Constructor(5, 'Striped Oxford Shirt', 200, 'https://i.postimg.cc/xTWhWPYk/f6.jpg');
let item6 = new Constructor(6, 'Aurora Allure Tee', 150, 'https://i.postimg.cc/3NkfqkcC/f7.jpg');
let item7 = new Constructor(7, 'Bohemian-inspired Peasant Blouse',  325, 'https://i.postimg.cc/wBFWT5KQ/f8.jpg');
let item8 = new Constructor(8, 'Linen Button-Up Shirt: ', 310, 'https://i.postimg.cc/qR5j2kvt/n1.jpg');
let item9 = new Constructor(9, 'Classic White Button-Down Shirt:', 260, 'https://i.postimg.cc/GmRw4jfW/n2.jpg');
let item10 = new Constructor(10, 'Prism Panache Shirt', 240, 'https://i.postimg.cc/SQYwV5b0/n3.jpg');
let item12 = new Constructor(12, 'Chambray Denim Shirt', 175, 'https://i.postimg.cc/5Nnqz4Kf/n4.jpg');
let item13 = new Constructor(13, 'Metro Maven Blouse', 270, 'https://i.postimg.cc/J46ZnTtn/n5.jpg');
let item14 = new Constructor(14, 'Comfort Stretch Cotton Chinos: ', 110, 'https://i.postimg.cc/ydySzjw7/n6.jpg');
let item15 = new Constructor(15, 'Frontier Fusion Polo', 240, 'https://i.postimg.cc/mDjhnDHD/n7.jpg');
let item16 = new Constructor(16, 'Mountain Majesty Shirt', 300, 'https://i.postimg.cc/gkQjQ1nv/n8.jpg');

// Add products to the products array
products.push(item, item1, item2, item3, item4, item5, item6, item7, item8, item9, item10, item12, item13, item14, item15, item16);

// Store the products array in local storage
localStorage.setItem('products', JSON.stringify(products));

// Retrieve products from local storage
products = JSON.parse(localStorage.getItem('products'));

// Function to display products in the section element
function display(productList) {
  let items = productList.map(function (product, index) {
    return `<div class="pro">
            <img src="${product.url}" alt="">
            <div class="des">
                <h5>${product.name}</h5>
                <div class="star">
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                    <i class='bx bxs-star'></i>
                </div>
                <h4>R${product.price}</h4>
            </div>
            <button value ='${index}' id="name"<i class='bx bxs-cart'></i></button>
        </div>`;
  });

  section.innerHTML = items.join('');
}

// Display the products initially
display(products);

// Get references to cart buttons and add event listeners
const buttons = [...document.querySelectorAll('#name')];
console.log(buttons);

buttons.forEach((item, i) => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(i);
    let prod = products.find(product => product.id === i);
    console.log(cart);

    // Add the selected product to the cart
    cart.push(prod);
    
    // Delay the update of local storage to ensure cart is updated
    setTimeout(() => {
      localStorage.setItem("cart", JSON.stringify(cart));
    }, 100);
  });
});