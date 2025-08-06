// product-reviews.js (With Summary, Pagination, and Edit Name)

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
    let currentPage = 1;
    const reviewsPerPage = 10;

    async function fetchReviews() {
        try {
            const response = await fetch(`${backendUrl}/api/reviews/${productId}`);
            allReviews = await response.json();
            currentPage = 1; // Reset to first page on every fetch
            renderPage();
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    }

    function renderPage() {
        renderReviewSummary(allReviews);
        renderReviewsSlice(allReviews);
    }
    
    // NEW: Renders the summary section at the top
    function renderReviewSummary(reviews) {
        let summaryHtml = '';
        if (reviews.length > 0) {
            const totalReviews = reviews.length;
            const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;
            const fullStars = Math.floor(averageRating);
            const halfStar = averageRating % 1 >= 0.5 ? 1 : 0;
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
        reviewsContainer.innerHTML = summaryHtml; // Set the summary first
    }

    // UPDATED: Renders only a slice of reviews and adds a "Load More" button
    function renderReviewsSlice(reviews) {
        const start = 0;
        const end = currentPage * reviewsPerPage;
        const reviewsToShow = reviews.slice(start, end);

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

        // Add "Load More" button if there are more reviews to show
        if (end < reviews.length) {
            const loadMoreBtn = document.createElement('button');
            loadMoreBtn.textContent = 'Load More Reviews';
            loadMoreBtn.className = 'w-full bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-md hover:bg-gray-300 mt-4';
            loadMoreBtn.id = 'load-more-reviews';
            reviewsContainer.appendChild(loadMoreBtn);
        }
    }

    // Event listener for dynamic buttons
    reviewsContainer.addEventListener('click', (e) => {
        if (e.target.id === 'load-more-reviews') {
            currentPage++;
            renderPage();
            e.target.remove(); // Remove the old button
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
        // ... (no changes to this function)
    }

    // UPDATED: Edit form now includes a name field
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

    // UPDATED: Save function now sends the updated name
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

    function renderOrderVerificationForm() { /* ... no changes ... */ }
    function renderNewReviewForm(orderId) { /* ... no changes ... */ }

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
