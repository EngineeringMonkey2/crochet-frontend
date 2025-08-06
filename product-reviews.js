// product-reviews.js (With Edit/Delete/Custom Name Functionality - Modern CSS)

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
        reviewsContainer.innerHTML = '<h2 class="text-4xl font-extrabold mb-8 text-gray-900 tracking-tight">Customer Reviews</h2>';
        if (reviews.length === 0) {
            reviewsContainer.innerHTML += '<p class="text-gray-500 text-lg font-medium">Be the first to review this product!</p>';
        } else {
            reviews.forEach(review => {
                const reviewDate = new Date(review.created_at).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                });
                const isOwnReview = currentUser && currentUser.google_id === review.user_id;
                
                const editDeleteButtons = isOwnReview ? `
                    <div class="review-actions flex gap-3 mt-4">
                        <button class="text-indigo-600 hover:text-indigo-800 font-medium text-sm transition-colors duration-200 edit-review-btn" data-review-id="${review.id}">
                            <i class="fas fa-edit mr-1"></i>Edit
                        </button>
                        <button class="text-red-600 hover:text-red-800 font-medium text-sm transition-colors duration-200 delete-review-btn" data-review-id="${review.id}">
                            <i class="fas fa-trash-alt mr-1"></i>Delete
                        </button>
                    </div>
                ` : '';

                const reviewHtml = `
                    <div class="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 mb-6 border border-gray-100" id="review-${review.id}">
                        <div class="flex items-start justify-between mb-3">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                                    ${(review.user_name || 'A')[0].toUpperCase()}
                                </div>
                                <div>
                                    <h4 class="font-bold text-gray-900 text-lg">${review.user_name || 'Anonymous'}</h4>
                                    <span class="text-xs text-gray-500 font-medium">${reviewDate}</span>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center mb-3">
                            ${[...Array(5)].map((_, i) => 
                                `<i class="fas fa-star ${i < review.rating ? 'text-amber-400' : 'text-gray-200'} text-lg"></i>`
                            ).join('')}
                            <span class="ml-2 text-sm font-semibold text-gray-600">${review.rating}.0</span>
                        </div>
                        <p class="text-gray-700 leading-relaxed">${review.comment}</p>
                        ${editDeleteButtons}
                    </div>`;
                reviewsContainer.innerHTML += reviewHtml;
            });
        }
    }
    
    reviewsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-review-btn')) {
            const reviewId = e.target.dataset.reviewId;
            if (confirm('Are you sure you want to delete this review? This will restore your review credit.')) {
                deleteReview(reviewId);
            }
        }
        if (e.target.classList.contains('edit-review-btn')) {
            const reviewId = e.target.dataset.reviewId;
            showEditForm(reviewId);
        }
    });

    async function deleteReview(reviewId) {
        try {
            const response = await fetch(`${backendUrl}/api/reviews/${reviewId}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (response.ok) {
                await setupPage(); // Fully refresh the page state
            } else {
                alert('Failed to delete review.');
            }
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    }

    function showEditForm(reviewId) {
        const reviewElement = document.getElementById(`review-${reviewId}`);
        const currentComment = reviewElement.querySelector('p').textContent;
        const currentRating = reviewElement.querySelectorAll('.fa-star.text-amber-400').length;

        reviewElement.innerHTML = `
            <div class="edit-form-container bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200">
                <h4 class="text-lg font-bold text-gray-800 mb-4">Edit Your Review</h4>
                <div class="mb-4">
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Rating</label>
                    <div class="star-rating-edit flex gap-1">
                        ${[1,2,3,4,5].map(star => `
                            <input type="radio" id="edit-star${star}" name="edit-rating" value="${star}" class="hidden peer" ${currentRating === star ? 'checked' : ''} required/>
                            <label for="edit-star${star}" class="cursor-pointer text-3xl text-gray-300 hover:text-amber-400 peer-checked:text-amber-400 transition-colors duration-200">
                                <i class="fas fa-star"></i>
                            </label>
                        `).join('')}
                    </div>
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Your Review</label>
                    <textarea class="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors duration-200 resize-none" rows="4">${currentComment}</textarea>
                </div>
                <div class="flex gap-3">
                    <button class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg save-edit-btn" data-review-id="${reviewId}">
                        Save Changes
                    </button>
                    <button class="bg-gray-200 text-gray-700 px-6 py-2.5 rounded-xl font-semibold hover:bg-gray-300 transition-colors duration-200 cancel-edit-btn">
                        Cancel
                    </button>
                </div>
            </div>
        `;

        // Add CSS for checked stars to cascade
        const style = document.createElement('style');
        style.textContent = \`
            .star-rating-edit input:checked ~ input + label i,
            .star-rating-edit input:checked + label i {
                color: #fbbf24 !important;
            }
        \`;
        reviewElement.appendChild(style);

        reviewElement.querySelector('.save-edit-btn').addEventListener('click', saveReviewEdit);
        reviewElement.querySelector('.cancel-edit-btn').addEventListener('click', () => fetchReviews());
    }

    async function saveReviewEdit(e) {
        const reviewId = e.target.dataset.reviewId;
        const reviewElement = document.getElementById(`review-${reviewId}`);
        const newRating = reviewElement.querySelector('input[name="edit-rating"]:checked').value;
        const newComment = reviewElement.querySelector('textarea').value;

        try {
            const response = await fetch(`${backendUrl}/api/reviews/${reviewId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ rating: parseInt(newRating), comment: newComment })
            });
            if (response.ok) {
                fetchReviews();
            } else {
                alert('Failed to save changes.');
            }
        } catch (error) {
            console.error('Error saving review edit:', error);
        }
    }

    function renderOrderVerificationForm() {
        reviewFormContainer.innerHTML = `
            <div class="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl shadow-lg border border-indigo-100">
                <h3 class="text-3xl font-extrabold mb-6 text-gray-900 tracking-tight">Write a Review</h3>
                <form id="verify-order-form" class="space-y-6">
                    <div class="bg-white p-6 rounded-xl">
                        <p class="text-gray-600 mb-6 leading-relaxed">To leave a review, please enter an Order ID from your purchase history that has reviews remaining.</p>
                        <div>
                            <label for="order-id-input" class="block text-sm font-semibold text-gray-700 mb-2">Order ID</label>
                            <div class="relative">
                                <input type="text" 
                                    id="order-id-input" 
                                    class="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-all duration-200 font-mono text-lg" 
                                    placeholder="e.g., #AbCdEfGh" 
                                    required>
                                <i class="fas fa-receipt absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                            </div>
                        </div>
                    </div>
                    <button type="submit" class="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-4 px-6 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-xl transform hover:-translate-y-0.5">
                        <i class="fas fa-check-circle mr-2"></i>Verify Purchase
                    </button>
                    <p id="verify-error-message" class="text-red-600 text-sm font-medium text-center"></p>
                </form>
            </div>
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
                    renderNewReviewForm(orderId);
                } else {
                    errorMessageEl.textContent = result.message || 'Verification failed.';
                }
            } catch (error) {
                errorMessageEl.textContent = 'An unexpected error occurred.';
            }
        });
    }

    // UPDATED: Added a name input field with modern styling
    function renderNewReviewForm(orderId) {
        reviewFormContainer.innerHTML = `
            <div class="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl shadow-lg border border-indigo-100">
                <h3 class="text-3xl font-extrabold mb-6 text-gray-900 tracking-tight">Write Your Review</h3>
                <form id="new-review-form" class="space-y-6">
                    <div class="bg-white p-6 rounded-xl space-y-6">
                        <div>
                            <label for="review-user-name" class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-user mr-2 text-indigo-600"></i>Display Name
                            </label>
                            <input type="text" 
                                id="review-user-name" 
                                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-all duration-200" 
                                value="${currentUser.display_name}" 
                                placeholder="Leave blank for Anonymous">
                            <p class="text-xs text-gray-500 mt-1">This is how your name will appear with your review</p>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-3">
                                <i class="fas fa-star mr-2 text-amber-400"></i>Your Rating
                            </label>
                            <div class="star-rating-new flex gap-2 items-center">
                                ${[1,2,3,4,5].map(star => `
                                    <input type="radio" id="star${star}" name="rating" value="${star}" class="hidden peer" required/>
                                    <label for="star${star}" class="cursor-pointer text-4xl text-gray-300 hover:text-amber-400 peer-checked:text-amber-400 transition-all duration-200 transform hover:scale-110">
                                        <i class="fas fa-star"></i>
                                    </label>
                                `).join('')}
                                <span class="ml-3 text-sm font-medium text-gray-600" id="rating-text"></span>
                            </div>
                        </div>
                        
                        <div>
                            <label for="review-comment" class="block text-sm font-semibold text-gray-700 mb-2">
                                <i class="fas fa-comment-alt mr-2 text-indigo-600"></i>Your Review
                            </label>
                            <textarea 
                                id="review-comment" 
                                rows="5" 
                                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-all duration-200 resize-none" 
                                placeholder="Share your experience with this product..." 
                                required></textarea>
                            <p class="text-xs text-gray-500 mt-1">Tell others what you liked or disliked about this product</p>
                        </div>
                    </div>
                    
                    <button type="submit" class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-xl transform hover:-translate-y-0.5">
                        <i class="fas fa-paper-plane mr-2"></i>Submit Review
                    </button>
                </form>
            </div>
        `;

        // Add dynamic rating text and star interaction
        const ratingTexts = ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'];
        const style = document.createElement('style');
        style.textContent = `
            .star-rating-new input:checked ~ input + label i,
            .star-rating-new input:checked + label i {
                color: #fbbf24 !important;
            }
            .star-rating-new label:hover ~ label i {
                color: #d1d5db !important;
            }
        `;
        document.head.appendChild(style);

        document.querySelectorAll('input[name="rating"]').forEach(input => {
            input.addEventListener('change', (e) => {
                document.getElementById('rating-text').textContent = ratingTexts[e.target.value];
            });
        });

        document.getElementById('new-review-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const rating = document.querySelector('input[name="rating"]:checked').value;
            const comment = document.getElementById('review-comment').value;
            const userName = document.getElementById('review-user-name').value; // Get the name from the new input

            try {
                const response = await fetch(`${backendUrl}/api/reviews`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ orderId, productId, rating: parseInt(rating), comment, userName }) // Send the custom name
                });

                if (response.ok) {
                    reviewFormContainer.innerHTML = `
                        <div class="bg-green-50 border-2 border-green-200 p-6 rounded-xl text-center">
                            <i class="fas fa-check-circle text-5xl text-green-500 mb-3"></i>
                            <p class="text-green-800 font-bold text-lg">Thank you for your review!</p>
                            <p class="text-green-600 text-sm mt-2">Your feedback helps others make better decisions.</p>
                        </div>
                    `;
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
        await fetchReviews();
        
        const hasExistingReview = Array.from(reviewsContainer.querySelectorAll('.edit-review-btn')).length > 0;

        if (currentUser && !hasExistingReview) {
            renderOrderVerificationForm();
        } else if (!currentUser) {
            reviewFormContainer.innerHTML = `
                <div class="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl text-center border-2 border-gray-200">
                    <i class="fas fa-lock text-4xl text-gray-400 mb-4"></i>
                    <p class="text-gray-700 text-lg font-medium">
                        Please <a href="login.html" class="font-bold text-indigo-600 hover:text-indigo-800 underline decoration-2 underline-offset-2 transition-colors duration-200">log in</a> to write a review.
                    </p>
                </div>
            `;
        } else {
            reviewFormContainer.innerHTML = '';
        }
    }
    
    setupPage();
});