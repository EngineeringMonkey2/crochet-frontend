// product-reviews.js (With UI Fixes, Toggling Load Button, and Pagination)

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
    let allReviews = [];
    let reviewsToShowCount = 1; // Start by showing only 1 review
    const reviewsPerPage = 10;

    // Inject the necessary CSS for the modern star rating system
    const starRatingStyles = `
        .star-rating { display: inline-flex; flex-direction: row-reverse; }
        .star-rating input { display: none; }
        .star-rating label { font-size: 2.5rem; color: #e0e0e0; cursor: pointer; transition: color 0.2s; }
        /* FIX: Corrected hover logic to only color the hovered star and those before it */
        .star-rating input:checked ~ label,
        .star-rating label:hover ~ label,
        .star-rating label:hover { color: #ffc107; }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = starRatingStyles;
    document.head.appendChild(styleSheet);


    async function fetchReviews() {
        try {
            const response = await fetch(`${backendUrl}/api/reviews/${productId}`);
            allReviews = await response.json();
            reviewsToShowCount = 1; // Reset to 1 on every fresh fetch
            renderPage();
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    }

    function renderPage() {
        reviewsContainer.innerHTML = ''; // Clear previous content
        renderReviewSummary(allReviews);
        renderReviewsSlice(allReviews);
    }
    
    function renderReviewSummary(reviews) {
        let summaryHtml = '';
        if (reviews.length > 0) {
            const totalReviews = reviews.length;
            const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;
            const fullStars = Math.floor(averageRating);
            const halfStar = averageRating % 1 >= 0.25 ? 1 : 0;
            const emptyStars = 5 - fullStars - halfStar;

            summaryHtml = `
                <div class="review-summary bg-white p-4 rounded-lg shadow-sm mb-6 flex items-center border-b">
                    <span class="text-4xl font-bold text-gray-700 mr-4">${averageRating.toFixed(1)}</span>
                    <div class="flex items-center text-2xl text-yellow-500 mr-4">
                        ${'<i class="fas fa-star"></i>'.repeat(fullStars)}
                        ${halfStar ? '<i class="fas fa-star-half-alt"></i>' : ''}
                        ${'<i class="far fa-star"></i>'.repeat(emptyStars)}
                    </div>
                    <span class="text-lg text-gray-600">${totalReviews} rating${totalReviews === 1 ? '' : 's'}</span>
                </div>
            `;
        }
        reviewsContainer.insertAdjacentHTML('beforeend', summaryHtml);
    }

    function renderReviewsSlice(reviews) {
        const reviewsToShow = reviews.slice(0, reviewsToShowCount);

        if (reviews.length === 0) {
            reviewsContainer.innerHTML += '<p class="text-gray-600">Be the first to review this product!</p>';
        } else {
            reviewsToShow.forEach(review => {
                const reviewDate = new Date(review.created_at).toLocaleDateString();
                const isOwnReview = currentUser && currentUser.google_id === review.user_id;
                
                const editDeleteButtons = isOwnReview ? `
                    <div class="review-actions text-xs mt-2">
                        <button class="text-blue-600 hover:underline edit-review-btn" data-review-id="${review.id}">Edit</button>
                        <button class="text-red-600 hover:underline ml-2 delete-review-btn" data-review-id="${review.id}">Delete</button>
                    </div>
                ` : '';

                reviewsContainer.innerHTML += `
                    <div class="bg-white p-5 rounded-lg shadow-sm mb-4" id="review-${review.id}">
                        <div class="flex items-center justify-between mb-1">
                            <h4 class="font-bold text-gray-900">${review.user_name || 'Anonymous'}</h4>
                            <span class="text-xs text-gray-500">${reviewDate}</span>
                        </div>
                        <div class="flex items-center text-yellow-500 mb-2">
                            ${'<i class="fas fa-star"></i>'.repeat(review.rating)}
                            ${'<i class="far fa-star text-gray-300"></i>'.repeat(5 - review.rating)}
                        </div>
                        <p class="text-gray-700 text-sm leading-relaxed">${review.comment}</p>
                        ${editDeleteButtons}
                    </div>`;
            });
        }

        // NEW: Toggle button logic
        if (reviews.length > 1) { // Only show buttons if there's more than one review
            if (reviewsToShowCount < reviews.length) {
                const loadMoreBtn = document.createElement('button');
                loadMoreBtn.textContent = 'Load More Reviews';
                loadMoreBtn.className = 'w-full bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-md hover:bg-gray-300 mt-4';
                loadMoreBtn.id = 'load-more-reviews';
                reviewsContainer.appendChild(loadMoreBtn);
            } else if (reviewsToShowCount > 1) {
                const showLessBtn = document.createElement('button');
                showLessBtn.textContent = 'Show Less';
                showLessBtn.className = 'w-full bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-md hover:bg-gray-300 mt-4';
                showLessBtn.id = 'show-less-reviews';
                reviewsContainer.appendChild(showLessBtn);
            }
        }
    }

    reviewsContainer.addEventListener('click', (e) => {
        if (e.target.id === 'load-more-reviews') {
            reviewsToShowCount += reviewsPerPage;
            renderPage();
        }
        if (e.target.id === 'show-less-reviews') {
            reviewsToShowCount = 1;
            renderPage();
        }
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
            const response = await fetch(`${backendUrl}/api/reviews/${reviewId}`, { method: 'DELETE', credentials: 'include' });
            if (response.ok) {
                await setupPage();
            } else {
                alert('Failed to delete review.');
            }
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    }

    function showEditForm(reviewId) {
        const reviewElement = document.getElementById(`review-${reviewId}`);
        const currentName = reviewElement.querySelector('h4').textContent;
        const currentComment = reviewElement.querySelector('p').textContent;
        const currentRating = reviewElement.querySelectorAll('.fa-star').length;

        reviewElement.innerHTML = `
            <div class="edit-form-container bg-gray-50 p-4 rounded-md">
                <div class="mb-2">
                    <label class="block text-gray-700 text-sm font-bold mb-1">Display Name</label>
                    <input type="text" class="w-full p-2 border rounded-md" value="${currentName}" placeholder="Leave blank for Anonymous">
                </div>
                <div class="star-rating">
                    ${[5,4,3,2,1].map(star => `<input type="radio" id="edit-star${star}" name="edit-rating" value="${star}" ${currentRating === star ? 'checked' : ''} required/><label for="edit-star${star}">&#9733;</label>`).join('')}
                </div>
                <textarea class="w-full p-2 border rounded-md my-2">${currentComment}</textarea>
                <button class="bg-green-600 text-white px-3 py-1 rounded-md text-sm save-edit-btn" data-review-id="${reviewId}">Save</button>
                <button class="bg-gray-400 text-white px-3 py-1 rounded-md text-sm ml-2 cancel-edit-btn">Cancel</button>
            </div>
        `;
        reviewElement.querySelector('.save-edit-btn').addEventListener('click', saveReviewEdit);
        reviewElement.querySelector('.cancel-edit-btn').addEventListener('click', () => fetchReviews());
    }

    async function saveReviewEdit(e) {
        const reviewId = e.target.dataset.reviewId;
        const reviewElement = document.getElementById(`review-${reviewId}`);
        const newName = reviewElement.querySelector('input[type="text"]').value;
        const newRating = reviewElement.querySelector('input[name="edit-rating"]:checked').value;
        const newComment = reviewElement.querySelector('textarea').value;

        try {
            const response = await fetch(`${backendUrl}/api/reviews/${reviewId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ rating: parseInt(newRating), comment: newComment, userName: newName })
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
            <h3 class="text-2xl font-bold mb-4 text-gray-800">Write a Review</h3>
            <form id="verify-order-form" class="bg-white p-6 rounded-lg shadow-sm">
                <p class="text-gray-700 mb-4">To leave a review, please enter an Order ID from your purchase history that has reviews remaining.</p>
                <div class="mb-4">
                    <label for="order-id-input" class="block text-gray-700 font-bold mb-2">Order ID</label>
                    <input type="text" id="order-id-input" class="w-full p-3 border border-gray-300 rounded-md" placeholder="Enter your Order ID (e.g., #AbCdEfGh)" required>
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
                    renderNewReviewForm(orderId);
                } else {
                    errorMessageEl.textContent = result.message || 'Verification failed.';
                }
            } catch (error) {
                errorMessageEl.textContent = 'An unexpected error occurred.';
            }
        });
    }

    function renderNewReviewForm(orderId) {
        reviewFormContainer.innerHTML = `
            <h3 class="text-2xl font-bold mb-4 text-gray-800">Write a Review</h3>
            <form id="new-review-form" class="bg-white p-6 rounded-lg shadow-sm">
                <div class="mb-4">
                    <label for="review-user-name" class="block text-gray-700 font-bold mb-2">Display Name</label>
                    <input type="text" id="review-user-name" class="w-full p-3 border border-gray-300 rounded-md" value="${currentUser.display_name}" placeholder="Leave blank for Anonymous">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2">Your Rating</label>
                    <div class="star-rating">
                        ${[5,4,3,2,1].map(star => `<input type="radio" id="star${star}" name="rating" value="${star}" required/><label for="star${star}">&#9733;</label>`).join('')}
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
            const userName = document.getElementById('review-user-name').value;
            try {
                const response = await fetch(`${backendUrl}/api/reviews`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ orderId, productId, rating: parseInt(rating), comment, userName })
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
        await fetchReviews();
        const hasExistingReview = allReviews.some(review => currentUser && review.user_id === currentUser.google_id);
        if (currentUser && !hasExistingReview) {
            renderOrderVerificationForm();
        } else if (!currentUser) {
            reviewFormContainer.innerHTML = `<div class="bg-gray-100 p-4 rounded-lg text-center"><p class="text-gray-700">Please <a href="login.html" class="font-bold text-blue-600 hover:underline">log in</a> to write a review.</p></div>`;
        } else {
            reviewFormContainer.innerHTML = '';
        }
    }
    
    setupPage();
});
