// product-reviews.js (With Edit/Delete Functionality)

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
                const isOwnReview = currentUser && currentUser.google_id === review.user_id;
                
                const editDeleteButtons = isOwnReview ? `
                    <div class="review-actions text-xs mt-2">
                        <button class="text-blue-600 hover:underline edit-review-btn" data-review-id="${review.id}">Edit</button>
                        <button class="text-red-600 hover:underline ml-2 delete-review-btn" data-review-id="${review.id}">Delete</button>
                    </div>
                ` : '';

                const reviewHtml = `
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
                reviewsContainer.innerHTML += reviewHtml;
            });
        }
    }
    
    // Event listener for the entire reviews container to handle clicks on edit/delete buttons
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
                fetchReviews(); // Refresh the list of reviews
                setupPage(); // Re-check if user can post a new review
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
        const currentRating = reviewElement.querySelectorAll('.fa-star').length;

        reviewElement.innerHTML = `
            <div class="edit-form-container">
                <div class="star-rating-edit flex flex-row-reverse justify-end text-3xl mb-2">
                    ${[5,4,3,2,1].map(star => `<input type="radio" id="edit-star${star}" name="edit-rating" value="${star}" class="hidden peer" ${currentRating === star ? 'checked' : ''} required/><label for="edit-star${star}" class="cursor-pointer text-gray-300 peer-hover:text-yellow-400 peer-checked:text-yellow-500">★</label>`).join('')}
                </div>
                <textarea class="w-full p-2 border rounded-md mb-2">${currentComment}</textarea>
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
                fetchReviews(); // Refresh reviews to show the updated one
            } else {
                alert('Failed to save changes.');
            }
        } catch (error) {
            console.error('Error saving review edit:', error);
        }
    }

    function renderOrderVerificationForm() {
        // (No changes to this function)
        reviewFormContainer.innerHTML = `...`; // Omitted for brevity, no changes needed here
    }

    function renderNewReviewForm(orderId) {
        // (No changes to this function)
        reviewFormContainer.innerHTML = `...`; // Omitted for brevity, no changes needed here
    }

    async function setupPage() {
        currentUser = await window.checkUserStatus();
        await fetchReviews(); // Fetch reviews first, so we know if the user has one to edit
        
        // Check if the user has ALREADY posted a review for this product
        const hasExistingReview = Array.from(reviewsContainer.querySelectorAll('.edit-review-btn')).length > 0;

        if (currentUser && !hasExistingReview) {
            // If logged in AND they haven't reviewed, show the verification form
            renderOrderVerificationForm();
        } else if (!currentUser) {
            // If not logged in, show login prompt
            reviewFormContainer.innerHTML = `<div class="bg-gray-100 p-4 rounded-lg text-center"><p class="text-gray-700">Please <a href="login.html" class="font-bold text-blue-600 hover:underline">log in</a> to write a review.</p></div>`;
        } else {
            // If logged in AND they have a review, clear the form container
            reviewFormContainer.innerHTML = '';
        }
    }
    
    // Initial load
    setupPage();
});
