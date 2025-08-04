/**
 * This script runs on the customizationproduct.html page.
 * It reads the image URLs for each character part from the URL query parameters
 * and sets the 'src' attribute for each corresponding image element on the page.
 * It also handles adding the custom product to the cart.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Create a URLSearchParams object to easily access the query parameters
    const urlParams = new URLSearchParams(window.location.search);

    // An array of the character part IDs to easily loop through them
    const parts = [
        'head', 'left-ear', 'right-ear', 'body', 
        'left-arm', 'right-arm', 'legs', 'tail'
    ];
    
    // NEW: Add a list of parts for the eyes and mouth to save them to the customImages object
    const nonImageParts = ['left-eye', 'right-eye', 'mouth'];
    
    const customImages = {};

    // Loop through each part ID to load images
    parts.forEach(partId => {
        const imageElement = document.getElementById(partId);
        const imageUrl = urlParams.get(partId);

        if (imageElement && imageUrl) {
            const decodedUrl = decodeURIComponent(imageUrl);
            imageElement.src = decodedUrl;
            customImages[partId] = decodedUrl; // Store for cart
        } else {
            console.warn(`Could not find element or URL for part: ${partId}`);
        }
    });
    
    // NEW: Loop through the non-image parts to add them to the metadata
    // We are simply saving a placeholder string for the non-image parts
    nonImageParts.forEach(partId => {
        // Here we capture a simple 'Static' value for the non-image parts, as they are not
        // part of the dynamic image-changing logic. This ensures they are included in the metadata.
        customImages[partId] = document.getElementById(partId).style.backgroundImage || 'Static';
    });
    
    // --- Cart Logic ---
    const addToCartBtn = document.querySelector('.add-to-cart');
    const buyNowBtn = document.querySelector('.buy-now');

    /**
     * Handles adding the custom monkey to the shopping cart.
     * It creates a unique item object with all custom image URLs.
     */
    function handleAddToCart() {
        const quantity = parseInt(document.getElementById('quantity').value);
        
        // Create a unique ID for this custom creation using a timestamp
        const uniqueId = 'custom-' + Date.now();
        
        const item = {
            id: uniqueId,
            name: 'Custom Monkey',
            price: '$64.99',
            quantity: quantity,
            // Store the full customImages object with all part URLs as metadata
            images: customImages, 
            // Use the head image as the main image for the cart preview thumbnail
            image: customImages['head'] 
        };
        
        // Add the new item to the cart using the global addToCart function from cart.js
        addToCart(item);
        return item;
    }
    
    // Event listener for the "Add to Cart" button
    addToCartBtn.addEventListener('click', () => {
        const item = handleAddToCart();
        // Show a temporary success message (toast notification)
        showToast(`${item.quantity} x ${item.name} added to cart!`);
    });
    
    // Event listener for the "Buy Now" button
    buyNowBtn.addEventListener('click', () => {
        // Add the item to the cart, then immediately redirect to the cart page
        handleAddToCart();
        window.location.href = 'cart.html';
    });
});
