// product-reviews.js (Rewritten for Render Backend)

const backendUrl = 'https://crochet-backend-ho1l.onrender.com';

document.addEventListener('DOMContentLoaded', () => {
    const reviewsContainer = document.getElementById('reviews-container');
    const reviewFormContainer = document.getElementById('review-form-container');
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('productId'));

    if (!reviewsContainer || !productId) return;

    let currentUser = null;

    // Fetch and display reviews for the product
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
    
    // Check user status and render the review form if applicable
    async function setupReviewForm() {
        if (typeof window.checkUserStatus !== 'function') {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        currentUser = await window.checkUserStatus();

        if (currentUser) {
            renderNewReviewForm();
        } else {
            reviewFormContainer.innerHTML = `
                <div class="bg-gray-100 p-4 rounded-lg text-center">
                    <p class="text-gray-700">Please <a href="login.html" class="font-bold text-blue-600 hover:underline">log in</a> to write a review.</p>
                </div>
            `;
        }
    }

    function renderNewReviewForm() {
        // ... (The HTML for the form itself is the same as your old file)
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
            const rating = document.querySelector('input[name="rating"]:checked').value;
            const comment = document.getElementById('review-comment').value;

            try {
                const response = await fetch(`${backendUrl}/api/reviews`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ productId, rating: parseInt(rating), comment })
                });

                if (response.ok) {
                    reviewFormContainer.innerHTML = '<p class="text-green-600 font-bold">Thank you for your review!</p>';
                    fetchReviews(); // Refresh the reviews list
                } else {
                    alert('Failed to submit review. Please try again.');
                }
            } catch (error) {
                console.error('Error submitting review:', error);
                alert('An error occurred. Please try again.');
            }
        });
    }

    // Initial load
    fetchReviews();
    setupReviewForm();
});
