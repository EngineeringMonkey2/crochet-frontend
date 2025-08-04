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
    nonImageParts.forEach(partId => {
        // You'll need to capture the state of these non-image parts if they are customizable.
        // For now, we'll assume they are static and can be represented by a placeholder or simple text.
        customImages[partId] = document.getElementById(partId).style.backgroundImage || 'Static';
    });
    
    // --- Cart Logic ---
    const addToCartBtn = document.querySelector('.add-to-cart');
    const buyNowBtn = document.querySelector('.buy-now');

    function handleAddToCart() {
        const quantity = parseInt(document.getElementById('quantity').value);
        
        // Create a unique ID for this custom creation using a timestamp
        const uniqueId = 'custom-' + Date.now();
        
        const item = {
            id: uniqueId,
            name: 'Custom Monkey',
            price: '$64.99',
            quantity: quantity,
            // FIX: Store the full customImages object, not just a single image
            images: customImages, 
            image: customImages['head'] // Keep a single image for the cart preview
        };
        
        addToCart(item);
        return item;
    }
    
    addToCartBtn.addEventListener('click', () => {
        const item = handleAddToCart();
        showToast(`${item.quantity} x ${item.name} added to cart!`);
    });
    
    buyNowBtn.addEventListener('click', () => {
        handleAddToCart();
        window.location.href = 'cart.html';
    });
});
