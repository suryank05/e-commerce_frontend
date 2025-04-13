// Product Data
const products = [
    {
        id: 1,
        name: "Fresh Tomatoes",
        category: "Vegetables",
        price: 40,
        originalPrice: 50,
        discount: "20%",
        image: "images/TOMATO.jpg",
        rating: 4.5,
        ratingCount: 120,
        description: "Fresh and juicy tomatoes from local farms. Perfect for salads and cooking."
    },
    {
        id: 2,
        name: "Organic Bananas",
        category: "Fruits",
        price: 60,
        originalPrice: 70,
        discount: "14%",
        image: "images/BANANA.jpg",
        rating: 4.8,
        ratingCount: 95,
        description: "Organic bananas rich in potassium and other essential nutrients."
    },
    {
        id: 3,
        name: "Wheat",
        category: "Grain",
        price: 55,
        originalPrice: 60,
        discount: "8%",
        image: "images/WHEAT.jpg",
        rating: 4.7,
        ratingCount: 210,
        description: "High quality wheat for delecious food making"
    },
    {
        id: 4,
        name: "Basmati Rice",
        category: "Grains",
        price: 150,
        originalPrice: 180,
        discount: "17%",
        image: "images/RICE.jpg",
        rating: 4.6,
        ratingCount: 85,
        description: "Premium quality basmati rice for delicious biryanis and pulao."
    },
    {
        id: 5,
        name: "Tata Tea Gold",
        category: "Beverages",
        price: 130,
        originalPrice: 150,
        discount: "13%",
        image: "images/product-7.jpeg",
        rating: 4.4,
        ratingCount: 150,
        description: "Premium tea leaves for a refreshing cup of tea."
    },
    {
        id: 6,
        name: "Whole Wheat Bread",
        category: "Bakery Items",
        price: 45,
        originalPrice: 50,
        discount: "10%",
        image: "images/product-5.jpg",
        rating: 4.3,
        ratingCount: 75,
        description: "Freshly baked whole wheat bread, healthy and nutritious."
    },
    {
        id: 7,
        name: "Spinach",
        category: "Vegetable",
        price: 85,
        originalPrice: 100,
        discount: "15%",
        image: "images/spinach.jpg",
        rating: 4.9,
        ratingCount: 180,
        description: "Good Spinach for flavorful dishes."
    },
    {
        id: 8,
        name: "Fresh Apples",
        category: "Fruits",
        price: 120,
        originalPrice: 140,
        discount: "14%",
        image: "images/apple.jpg",
        rating: 4.7,
        ratingCount: 110,
        description: "Crisp and juicy apples, rich in fiber and vitamins."
    },
    {
        id: 9,
        name: "Corn",
        category: "Dairy Products",
        price: 80,
        originalPrice: 90,
        discount: "11%",
        image: "images/CORN.jpg",
        rating: 4.6,
        ratingCount: 95,
        description: "Fresh and soft corn, perfect for Indian dishes."
    },
    {
        id: 10,
        name: "Kiwi",
        category: "Kiwi",
        price: 30,
        originalPrice: 35,
        discount: "14%",
        image: "images/kiwi.jpg",
        rating: 4.2,
        ratingCount: 220,
        description: "Nice Kiwi chips for a perfect snack time."
    },
    {
        id: 11,
        name: "Fresh Spinach",
        category: "Vegetables",
        price: 30,
        originalPrice: 40,
        discount: "25%",
        image: "images/ONION.jpg",
        rating: 4.4,
        ratingCount: 65,
        description: "Fresh and nutritious Onion leaves, rich in iron and vitamins."
    },
    {
        id: 12,
        name: "Ragi",
        category: "Grains",
        price: 220,
        originalPrice: 250,
        discount: "12%",
        image: "images/RAGI.jpg",
        rating: 4.8,
        ratingCount: 190,
        description: "Premium quality whole ragi flour for soft and fluffy food."
    }
];

// DOM Elements
const productGrid = document.getElementById('product-grid');
const cartIcon = document.querySelector('.cart-icon');
const cartModal = document.getElementById('cart-modal');
const closeCart = document.getElementById('close-cart');
const cartItems = document.getElementById('cart-items');
const cartCount = document.querySelector('.cart-count');
const cartTotalPrice = document.getElementById('cart-total-price');
const clearCartBtn = document.getElementById('clear-cart');
const checkoutBtn = document.getElementById('checkout');

// Cart Array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize the website
function init() {
    displayProducts();
    updateCart();

    // Event Listeners
    cartIcon.addEventListener('click', toggleCart);
    closeCart.addEventListener('click', toggleCart);
    clearCartBtn.addEventListener('click', clearCart);
    checkoutBtn.addEventListener('click', handleCheckout);
}

// Display Products
function displayProducts() {
    productGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        
        // Generate star rating HTML
        const stars = generateStarRating(product.rating);
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">
                    <div>
                        <span class="current-price">₹${product.price}</span>
                        <span class="original-price">₹${product.originalPrice}</span>
                    </div>
                    <span class="discount">${product.discount} OFF</span>
                </div>
                <div class="product-rating">
                    <div class="rating-stars">${stars}</div>
                    <div class="rating-count">(${product.ratingCount})</div>
                </div>
                <button class="btn add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        
        productGrid.appendChild(productCard);
        
        // Add event listener to the Add to Cart button
        const addToCartBtn = productCard.querySelector('.add-to-cart');
        addToCartBtn.addEventListener('click', () => addToCart(product.id));
    });
}

// Generate Star Rating HTML
function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    let starsHTML = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    // Half star
    if (halfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    return starsHTML;
}

// Toggle Cart Modal
function toggleCart() {
    cartModal.classList.toggle('active');
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart UI
    updateCart();
    
    // Show notification
    showNotification(`${product.name} added to cart!`);
}

// Update Cart
function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartTotalPrice.textContent = '₹0.00';
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h3 class="cart-item-title">${item.name}</h3>
                <p class="cart-item-price">₹${item.price}</p>
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                    <button class="quantity-btn increase" data-id="${item.id}">+</button>
                </div>
                <button class="remove-item" data-id="${item.id}">Remove</button>
            </div>
        `;
        
        cartItems.appendChild(cartItem);
        
        // Add event listeners to quantity buttons and remove button
        const decreaseBtn = cartItem.querySelector('.decrease');
        const increaseBtn = cartItem.querySelector('.increase');
        const quantityInput = cartItem.querySelector('.quantity-input');
        const removeBtn = cartItem.querySelector('.remove-item');
        
        decreaseBtn.addEventListener('click', () => updateQuantity(item.id, item.quantity - 1));
        increaseBtn.addEventListener('click', () => updateQuantity(item.id, item.quantity + 1));
        quantityInput.addEventListener('change', (e) => updateQuantity(item.id, parseInt(e.target.value)));
        removeBtn.addEventListener('click', () => removeFromCart(item.id));
        
        // Calculate total
        total += item.price * item.quantity;
    });
    
    // Update total price
    cartTotalPrice.textContent = `₹${total.toFixed(2)}`;
}

// Update Quantity
function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(productId);
        return;
    }
    
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    }
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// Clear Cart
function clearCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
    showNotification('Cart cleared!');
}

// Checkout
function handleCheckout() {
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('cart-total-price').textContent;
    const amount = parseFloat(totalPrice.replace('₹', ''));
    
    // Create summary view
    let summaryHTML = `
        <div class="order-summary">
            <h2>Order Summary</h2>
            <div class="summary-items">
                ${cartItems.innerHTML}
            </div>
            <div class="summary-total">
                <h3>Total Amount: ${totalPrice}</h3>
            </div>
            <button onclick="initiatePayment(${amount})" class="btn payment-btn">
                Proceed to Payment
            </button>
        </div>
    `;
    
    // Replace cart items with summary
    cartItems.innerHTML = summaryHTML;
}

function initiatePayment(amount) {
    const options = {
        key: 'Your razorpay key', // Test mode key example
        amount: amount * 100, // Amount in paise
        currency: 'INR',
        name: 'DAN Store',
        description: 'Purchase from DAN Store',
        handler: function(response) {
            alert('Payment Successful! Payment ID: ' + response.razorpay_payment_id);
            // Clear cart
            document.getElementById('cart-items').innerHTML = '';
            document.getElementById('cart-total-price').textContent = '₹0.00';
            localStorage.removeItem('cart'); // Assuming you're using localStorage
            // Close cart modal
            document.getElementById('cart-modal').style.display = 'none';
        },
        prefill: {
            name: '',
            email: '',
            contact: ''
        },
        theme: {
            color: '#2c3e50'
        }
    };
    
    const rzp = new Razorpay(options);
    rzp.open();
}

// Show Notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.classList.add('notification', type);
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.add('hide');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const checkout = document.getElementById('checkout');
    if (checkout) {
        checkout.addEventListener('click', handleCheckout);
    }
});

document.addEventListener('DOMContentLoaded', init); 
