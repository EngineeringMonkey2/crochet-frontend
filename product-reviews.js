// product-reviews.js (With Order ID Verification)

// The backendUrl variable is now defined in config.js

document.addEventListener('DOMContentLoaded', () => {
    const reviewsContainer = document.getElementById('reviews-container');
    const reviewFormContainer = document.getElementById('review-form-container');
    const urlParams = new URLSearchParams(window.location.search);
    
    let productId = parseInt(urlParams.get('productId'));
    if (!productId && window.location.pathname.includes('customizationproduct.html')) {
        productId = 99; // Static ID for "Custom Monkey"
    }

    if (!reviewsContainer || !productId) return;

    let currentUser = null;

    // Fetch and display existing reviews for the product
    async function fetchReviews() {
        try {
            const response = await fetch(`${backendUrl}/api/reviews/${productId}`);
            const reviews = await response.json();
            renderAllReviews(reviews);
        } catch (error) {
            console.error("Error fetching reviews:", error);
            reviewsContainer.innerHTML = `<p class="text-red-500">Could not load reviews.</p>`;
        }
    }

    function renderAllReviews(reviews) {
        reviewsContainer.innerHTML = '<h2 class="text-3xl font-bold mb-6 text-gray-800">Customer Reviews</h2>';
        if (reviews.length === 0) {
            reviewsContainer.innerHTML += '<p class="text-gray-600">Be the first to review this product!</p>';
        } else {
            reviews.forEach(review => {
                const reviewDate = new Date(review.created_at).toLocaleDateString();
                const reviewHtml = `
                    <div class="bg-white p-5 rounded-lg shadow-sm mb-4">
                        <div class="flex items-center justify-between mb-1">
                            <h4 class="font-bold text-gray-900">${review.user_name || 'Anonymous'}</h4>
                            <span class="text-xs text-gray-500">${reviewDate}</span>
                        </div>
                        <div class="flex items-center text-yellow-500 mb-2">
                            ${'<i class="fas fa-star"></i>'.repeat(review.rating)}
                            ${'<i class="far fa-star text-gray-300"></i>'.repeat(5 - review.rating)}
                        </div>
                        <p class="text-gray-700 text-sm leading-relaxed">${review.comment}</p>
                    </div>
                `;
                reviewsContainer.innerHTML += reviewHtml;
            });
        }
    }
    
    // NEW: Renders the initial form to ask for an Order ID
    function renderOrderVerificationForm() {
        reviewFormContainer.innerHTML = `
            <h3 class="text-2xl font-bold mb-4 text-gray-800">Write a Review</h3>
            <form id="verify-order-form" class="bg-white p-6 rounded-lg shadow-sm">
                <p class="text-gray-700 mb-4">To leave a review, please enter the Order ID from your confirmation email that contains this product.</p>
                <div class="mb-4">
                    <label for="order-id-input" class="block text-gray-700 font-bold mb-2">Order ID</label>
                    <input type="text" id="order-id-input" class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="cs_test_..." required>
                </div>
                <button type="submit" class="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-md hover:bg-green-700 transition-colors">Verify Purchase</button>
                <p id="verify-error-message" class="text-red-500 text-sm mt-2"></p>
            </form>
        `;

        document.getElementById('verify-order-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const orderId = document.getElementById('order-id-input').value.trim();
            const errorMessageEl = document.getElementById('verify-error-message');
            errorMessageEl.textContent = '';

            try {
                const response = await fetch(`${backendUrl}/api/verify-order-for-review`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ orderId, productId })
                });

                const result = await response.json();

                if (response.ok && result.verified) {
                    // If verification is successful, show the actual review form
                    renderNewReviewForm();
                } else {
                    // Show an error message if verification fails
                    errorMessageEl.textContent = result.message || 'Verification failed. Please check the Order ID and try again.';
                }
            } catch (error) {
                console.error('Error verifying order:', error);
                errorMessageEl.textContent = 'An unexpected error occurred. Please try again later.';
            }
        });
    }

    // This function now only runs AFTER the order has been verified
    function renderNewReviewForm() {
        reviewFormContainer.innerHTML = `
            <h3 class="text-2xl font-bold mb-4 text-gray-800">Write a Review</h3>
            <form id="new-review-form" class="bg-white p-6 rounded-lg shadow-sm">
                 <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2">Your Rating</label>
                    <div class="star-rating-new flex flex-row-reverse justify-end text-3xl">
                        <input type="radio" id="star5" name="rating" value="5" class="hidden peer" required/><label for="star5" title="5 stars" class="cursor-pointer text-gray-300 peer-hover:text-yellow-400 hover:text-yellow-400 peer-checked:text-yellow-500 transition-colors">★</label>
                        <input type="radio" id="star4" name="rating" value="4" class="hidden peer" required/><label for="star4" title="4 stars" class="cursor-pointer text-gray-300 peer-hover:text-yellow-400 hover:text-yellow-400 peer-checked:text-yellow-500 transition-colors">★</label>
                        <input type="radio" id="star3" name="rating" value="3" class="hidden peer" required/><label for="star3" title="3 stars" class="cursor-pointer text-gray-300 peer-hover:text-yellow-400 hover:text-yellow-400 peer-checked:text-yellow-500 transition-colors">★</label>
                        <input type="radio" id="star2" name="rating" value="2" class="hidden peer" required/><label for="star2" title="2 stars" class="cursor-pointer text-gray-300 peer-hover:text-yellow-400 hover:text-yellow-400 peer-checked:text-yellow-500 transition-colors">★</label>
                        <input type="radio" id="star1" name="rating" value="1" class="hidden peer" required/><label for="star1" title="1 star" class="cursor-pointer text-gray-300 peer-hover:text-yellow-400 hover:text-yellow-400 peer-checked:text-yellow-500 transition-colors">★</label>
                    </div>
                </div>
                <div class="mb-4">
                    <label for="review-comment" class="block text-gray-700 font-bold mb-2">Your Review</label>
                    <textarea id="review-comment" rows="4" class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="What did you like or dislike?" required></textarea>
                </div>
                <button type="submit" class="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition-colors">Submit Review</button>
            </form>
        `;

        document.getElementById('new-review-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const ratingElement = document.querySelector('input[name="rating"]:checked');
            if (!ratingElement) {
                alert('Please select a star rating.');
                return;
            }
            const rating = ratingElement.value;
            const comment = document.getElementById('review-comment').value;

            try {
                const response = await fetch(`${backendUrl}/api/reviews`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ productId, rating: parseInt(rating), comment })
                });

                if (response.ok) {
                    reviewFormContainer.innerHTML = '<p class="text-green-600 font-bold text-center">Thank you for your review!</p>';
                    fetchReviews(); // Refresh the reviews list
                } else {
                    const errorData = await response.json();
                    alert(`Failed to submit review: ${errorData.error || 'Please try again.'}`);
                }
            } catch (error) {
                console.error('Error submitting review:', error);
                alert('An error occurred. Please try again.');
            }
        });
    }

    // Main logic to set up the page
    async function setupPage() {
        if (typeof window.checkUserStatus !== 'function') {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        currentUser = await window.checkUserStatus();

        if (currentUser) {
            // If the user is logged in, show the order verification form.
            renderOrderVerificationForm();
        } else {
            // If the user is not logged in, prompt them to log in.
            reviewFormContainer.innerHTML = `
                <div class="bg-gray-100 p-4 rounded-lg text-center">
                    <p class="text-gray-700">Please <a href="login.html" class="font-bold text-blue-600 hover:underline">log in</a> to write a review.</p>
                </div>
            `;
        }
    }

    // Initial load
    fetchReviews();
    setupPage();
});
