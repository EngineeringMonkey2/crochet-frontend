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

    async function fetchReviews() {
        try {
            const response = await fetch(`${backendUrl}/api/reviews/${productId}`);
            const reviews = await response.json();
            renderAllReviews(reviews);
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    }

    function renderAllReviews(reviews) {
        reviewsContainer.innerHTML = '<h2 class="text-3xl font-bold mb-6 text-gray-800">Customer Reviews</h2>';
        if (reviews.length === 0) {
            reviewsContainer.innerHTML += '<p class="text-gray-600">Be the first to review this product!</p>';
        } else {
            reviews.forEach(review => {
                const reviewDate = new Date(review.created_at).toLocaleDateString();
                reviewsContainer.innerHTML += `
                    <div class="bg-white p-5 rounded-lg shadow-sm mb-4">
                        <h4 class="font-bold text-gray-900">${review.user_name || 'Anonymous'}</h4>
                        <div class="flex items-center text-yellow-500 my-2">
                            ${'<i class="fas fa-star"></i>'.repeat(review.rating)}
                            ${'<i class="far fa-star text-gray-300"></i>'.repeat(5 - review.rating)}
                        </div>
                        <p class="text-gray-700 text-sm">${review.comment}</p>
                        <span class="text-xs text-gray-500 mt-2 block">${reviewDate}</span>
                    </div>`;
            });
        }
    }
    
    function renderOrderVerificationForm() {
        reviewFormContainer.innerHTML = `
            <h3 class="text-2xl font-bold mb-4 text-gray-800">Write a Review</h3>
            <form id="verify-order-form" class="bg-white p-6 rounded-lg shadow-sm">
                <p class="text-gray-700 mb-4">To leave a review, please enter an Order ID from your purchase history that has reviews remaining.</p>
                <div class="mb-4">
                    <label for="order-id-input" class="block text-gray-700 font-bold mb-2">Order ID</label>
                    <input type="text" id="order-id-input" class="w-full p-3 border border-gray-300 rounded-md" placeholder="cs_test_..." required>
                </div>
                <button type="submit" class="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-md hover:bg-green-700">Verify Purchase</button>
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
                    renderNewReviewForm(orderId); // Pass the verified orderId
                } else {
                    errorMessageEl.textContent = result.message || 'Verification failed.';
                }
            } catch (error) {
                errorMessageEl.textContent = 'An unexpected error occurred.';
            }
        });
    }

    // UPDATED: Now accepts the verified orderId
    function renderNewReviewForm(orderId) {
        reviewFormContainer.innerHTML = `
            <h3 class="text-2xl font-bold mb-4 text-gray-800">Write a Review</h3>
            <form id="new-review-form" class="bg-white p-6 rounded-lg shadow-sm">
                 <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2">Your Rating</label>
                    <div class="star-rating-new flex flex-row-reverse justify-end text-3xl">
                        ${[5,4,3,2,1].map(star => `<input type="radio" id="star${star}" name="rating" value="${star}" class="hidden peer" required/><label for="star${star}" class="cursor-pointer text-gray-300 peer-hover:text-yellow-400 peer-checked:text-yellow-500">★</label>`).join('')}
                    </div>
                </div>
                <div class="mb-4">
                    <label for="review-comment" class="block text-gray-700 font-bold mb-2">Your Review</label>
                    <textarea id="review-comment" rows="4" class="w-full p-3 border border-gray-300 rounded-md" placeholder="What did you like or dislike?" required></textarea>
                </div>
                <button type="submit" class="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700">Submit Review</button>
            </form>
        `;

        document.getElementById('new-review-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const rating = document.querySelector('input[name="rating"]:checked').value;
            const comment = document.getElementById('review-comment').value;

            try {
                const response = await fetch(`${backendUrl}/api/reviews`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    // UPDATED: Send the verified orderId along with the review
                    body: JSON.stringify({ orderId, productId, rating: parseInt(rating), comment })
                });

                if (response.ok) {
                    reviewFormContainer.innerHTML = '<p class="text-green-600 font-bold text-center">Thank you for your review!</p>';
                    fetchReviews();
                } else {
                    const errorData = await response.json();
                    alert(`Failed to submit review: ${errorData.error || 'Please try again.'}`);
                }
            } catch (error) {
                alert('An error occurred. Please try again.');
            }
        });
    }

    async function setupPage() {
        currentUser = await window.checkUserStatus();
        if (currentUser) {
            renderOrderVerificationForm();
        } else {
            reviewFormContainer.innerHTML = `<div class="bg-gray-100 p-4 rounded-lg text-center"><p class="text-gray-700">Please <a href="login.html" class="font-bold text-blue-600 hover:underline">log in</a> to write a review.</p></div>`;
        }
    }

    fetchReviews();
    setupPage();
});
