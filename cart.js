/**
 * cart.js
 * This script provides shopping cart functionality using localStorage.
 */

// Function to get the cart from localStorage
function getCart() {
    return JSON.parse(localStorage.getItem('shoppingCart')) || [];
}

// Function to save the cart to localStorage
function saveCart(cart) {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
}

// **NEW** Function to clear all items from the cart
function clearCart() {
    localStorage.removeItem('shoppingCart');
}

// Function to add an item to the cart
function addToCart(item) {
    const cart = getCart();
    
    const isCustomItem = typeof item.id === 'string' && item.id.startsWith('custom-');
    
    const existingItemIndex = isCustomItem
        ? -1 // Always treat custom items as unique
        : cart.findIndex(cartItem => cartItem.id === item.id);

    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += item.quantity;
    } else {
        cart.push(item);
    }
    
    saveCart(cart);
    updateCartIcon();
}

// Function to remove an item from the cart by its index
function removeFromCart(itemIndex) {
    const cart = getCart();
    cart.splice(itemIndex, 1);
    saveCart(cart);
}

// Function to update the quantity of an item
function updateQuantity(itemIndex, delta) {
    const cart = getCart();
    if (cart[itemIndex]) {
        cart[itemIndex].quantity += delta;
        if (cart[itemIndex].quantity <= 0) {
            removeFromCart(itemIndex);
        } else {
            saveCart(cart);
        }
    }
}

// Function to update the cart icon counter across all pages
function updateCartIcon() {
    const cart = getCart();
    const cartIcon = document.getElementById('cart-count');

    if (cartIcon) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartIcon.textContent = totalItems;
        cartIcon.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}


// --- Toast Notification for adding items ---
function showToast(message) {
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '-50px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.backgroundColor = 'rgba(0, 0, 0, 0.75)';
    toast.style.color = 'white';
    toast.style.padding = '12px 24px';
    toast.style.borderRadius = '8px';
    toast.style.zIndex = '2000';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease, bottom 0.3s ease';
    toast.style.fontWeight = 'bold';

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.bottom = '30px';
    }, 10);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.bottom = '-50px';
        setTimeout(() => {
            if (toast) toast.remove();
        }, 300);
    }, 3000);
}


// Update cart icon on initial page load for all pages
document.addEventListener('DOMContentLoaded', updateCartIcon);
