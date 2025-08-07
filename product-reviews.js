// product-reviews.js (With UI Fixes, Toggling Load Button, and Pagination - NO TAILWIND)

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

    // Inject the necessary CSS for the modern star rating and buttons
    const customStyles = `
        /* --- Layout Fixes for Review Section --- */
        #reviews-container, #review-form-container {
            max-width: 25% !important; /* FIX: Constrain to left side even more */
            margin-left: 0 !important;   /* Override HTML class */
            margin-right: auto !important;  /* Override HTML class */
        }

        /* --- Star Rating Styles --- */
        .star-rating { display: inline-flex; flex-direction: row-reverse; }
        .star-rating input { display: none; }
        .star-rating label { font-size: 2.5rem; color: #e0e0e0; cursor: pointer; transition: color 0.2s; }
        .star-rating input:checked ~ label,
        .star-rating label:hover ~ label,
        .star-rating label:hover { color: #ffc107; }

        /* --- Custom Button Styles (No Tailwind) --- */
        .btn {
            width: 100%;
            padding: 12px 16px;
            font-size: 16px;
            font-weight: bold;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            transition: all 0.3s ease-in-out;
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box; /* Ensures padding doesn't break width */
        }

        .btn-verify {
            background: linear-gradient(to right, #06b6d4, #3b82f6); /* Gradient from cyan to blue */
            color: white;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
        }

        .btn-verify:hover {
            transform: scale(1.02);
            box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
        }

        .btn-verify svg {
            width: 20px;
            height: 20px;
            margin-right: 8px;
        }

        .btn-load {
            background-color: #e5e7eb; /* Gray background */
            color: #374151; /* Dark gray text */
            margin-top: 16px;
            width: auto; /* FIX: Make button fit content */
            padding: 8px 16px; /* FIX: Adjust padding for smaller size */
        }

        .btn-load:hover {
            background-color: #d1d5db; /* Lighter gray on hover */
        }
        
        /* FIX: Make review components transparent and remove underlines */
        .review-summary, .review-card, .review-form-wrapper { 
            background-color: transparent; 
            padding: 1rem; 
            border-radius: 0; 
            margin-bottom: 1.5rem; 
            border-bottom: none; /* FIX: Remove underline */
            box-shadow: none; 
        }
        .review-summary {
             display: flex; align-items: center;
        }
        .review-card {
            border-bottom: 1px solid #e0e0e0; /* Add a subtle separator for individual reviews */
            padding-bottom: 1.5rem;
        }


        .form-label { display: block; color: #374151; font-weight: bold; margin-bottom: 0.5rem; }
        .form-input { width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 0.375rem; box-sizing: border-box; }
        .error-message { color: #ef4444; font-size: 0.875rem; margin-top: 0.5rem; }
        
        /* FIX: Remove background and center alignment from login prompt */
        .login-prompt { 
            background-color: transparent; 
            padding: 0; 
            border-radius: 0; 
            text-align: left; /* Align text to the left */
            margin-top: 1rem; /* Add some space */
        }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = customStyles;
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
                <div class="review-summary">
                    <span style="font-size: 2.25rem; font-weight: bold; color: #374151; margin-right: 1rem;">${averageRating.toFixed(1)}</span>
                    <div style="display: flex; align-items: center; font-size: 1.5rem; color: #f59e0b; margin-right: 1rem;">
                        ${'<i class="fas fa-star"></i>'.repeat(fullStars)}
                        ${halfStar ? '<i class="fas fa-star-half-alt"></i>' : ''}
                        ${'<i class="far fa-star"></i>'.repeat(emptyStars)}
                    </div>
                    <span style="font-size: 1.125rem; color: #4b5563;">${totalReviews} rating${totalReviews === 1 ? '' : 's'}</span>
                </div>
            `;
        }
        reviewsContainer.insertAdjacentHTML('beforeend', summaryHtml);
    }

    function renderReviewsSlice(reviews) {
        if (reviews.length === 0) {
            reviewsContainer.innerHTML += '<p>Be the first to review this product!</p>';
        } else {
            const reviewsToShow = reviews.slice(0, reviewsToShowCount);
            reviewsToShow.forEach(review => {
                const reviewDate = new Date(review.created_at).toLocaleDateString();
                const isOwnReview = currentUser && currentUser.google_id === review.user_id;
                
                const editDeleteButtons = isOwnReview ? `
                    <div style="font-size: 0.75rem; margin-top: 0.5rem;">
                        <button class="edit-review-btn" data-review-id="${review.id}" style="color: #2563eb; background: none; border: none; cursor: pointer;">Edit</button>
                        <button class="delete-review-btn" data-review-id="${review.id}" style="color: #dc2626; background: none; border: none; cursor: pointer; margin-left: 0.5rem;">Delete</button>
                    </div>
                ` : '';

                reviewsContainer.innerHTML += `
                    <div class="review-card" id="review-${review.id}">
                        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.25rem;">
                            <h4 style="font-weight: bold; color: #111827;">${review.user_name || 'Anonymous'}</h4>
                            <span style="font-size: 0.75rem; color: #6b7280;">${reviewDate}</span>
                        </div>
                        <div style="display: flex; align-items: center; color: #f59e0b; margin-bottom: 0.5rem;">
                            ${'<i class="fas fa-star"></i>'.repeat(review.rating)}
                            ${'<i class="far fa-star" style="color: #d1d5db;"></i>'.repeat(5 - review.rating)}
                        </div>
                        <p style="color: #374151; font-size: 0.875rem; line-height: 1.6;">${review.comment}</p>
                        ${editDeleteButtons}
                    </div>`;
            });
        }

        // Toggle button logic
        if (reviews.length > 1) {
            if (reviewsToShowCount < reviews.length) {
                const loadMoreBtn = document.createElement('button');
                loadMoreBtn.textContent = 'Load More Reviews';
                loadMoreBtn.className = 'btn btn-load';
                loadMoreBtn.id = 'load-more-reviews';
                reviewsContainer.appendChild(loadMoreBtn);
            } else if (reviewsToShowCount > 1) {
                const showLessBtn = document.createElement('button');
                showLessBtn.textContent = 'Show Less';
                showLessBtn.className = 'btn btn-load';
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
            <div class="edit-form-container">
                <div style="margin-bottom: 0.5rem;">
                    <label class="form-label">Display Name</label>
                    <input type="text" class="form-input" value="${currentName}" placeholder="Leave blank for Anonymous">
                </div>
                <div class="star-rating">
                    ${[5,4,3,2,1].map(star => `<input type="radio" id="edit-star${star}" name="edit-rating" value="${star}" ${currentRating === star ? 'checked' : ''} required/><label for="edit-star${star}">&#9733;</label>`).join('')}
                </div>
                <textarea class="form-input" style="margin-top: 0.5rem; margin-bottom: 0.5rem;">${currentComment}</textarea>
                <button class="btn btn-verify save-edit-btn" data-review-id="${reviewId}" style="width: auto; padding: 6px 12px; font-size: 14px;">Save</button>
                <button class="btn btn-load cancel-edit-btn" style="width: auto; padding: 6px 12px; font-size: 14px; margin-left: 0.5rem;">Cancel</button>
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
            <div class="review-form-wrapper">
                <h3 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem; color: #1f2937;">Write a Review</h3>
                <form id="verify-order-form">
                    <p style="color: #374151; margin-bottom: 1rem;">To leave a review, please enter an Order ID from your purchase history that has reviews remaining.</p>
                    <div style="margin-bottom: 1rem;">
                        <label for="order-id-input" class="form-label">Order ID</label>
                        <input type="text" id="order-id-input" class="form-input" placeholder="Enter your Order ID (e.g., #AbCdEfGh)" required>
                    </div>
                    <button type="submit" class="btn btn-verify">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        Verify Purchase
                    </button>
                    <p id="verify-error-message" class="error-message"></p>
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

    function renderNewReviewForm(orderId) {
        reviewFormContainer.innerHTML = `
            <div class="review-form-wrapper">
                <h3 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem; color: #1f2937;">Write a Review</h3>
                <form id="new-review-form">
                    <div style="margin-bottom: 1rem;">
                        <label for="review-user-name" class="form-label">Display Name</label>
                        <input type="text" id="review-user-name" class="form-input" value="${currentUser.display_name}" placeholder="Leave blank for Anonymous">
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <label class="form-label">Your Rating</label>
                        <div class="star-rating">
                            ${[5,4,3,2,1].map(star => `<input type="radio" id="star${star}" name="rating" value="${star}" required/><label for="star${star}">&#9733;</label>`).join('')}
                        </div>
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <label for="review-comment" class="form-label">Your Review</label>
                        <textarea id="review-comment" rows="4" class="form-input" placeholder="What did you like or dislike?" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-verify">Submit Review</button>
                </form>
            </div>
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
                    reviewFormContainer.innerHTML = '<p style="color: #16a34a; font-weight: bold; text-align: center;">Thank you for your review!</p>';
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
            reviewFormContainer.innerHTML = `<div class="login-prompt"><p>Please <a href="login.html" style="font-weight: bold; color: #2563eb; text-decoration: underline;">log in</a> to write a review.</p></div>`;
        } else {
            reviewFormContainer.innerHTML = '';
        }
    }
    
    setupPage();
});
