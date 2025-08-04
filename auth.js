// auth.js (Rewritten for Render Backend)

// Define the base URL of your live backend on Render.
// You can find this URL on your Render dashboard for the web service.
const backendUrl = 'https://crochet-backend-ho1l.onrender.com'; 

document.addEventListener('DOMContentLoaded', () => {
    const googleBtn = document.getElementById('google-signin');

    // When the Google Sign-In button is clicked, navigate to the backend's auth route.
    if (googleBtn) {
        googleBtn.addEventListener('click', () => {
            window.location.href = `${backendUrl}/auth/google`;
        });
    }

    // This function checks if the user is already logged in when a page loads.
    // It's called from other scripts like account.js.
    // We are defining it here to keep all auth logic in one place.
    async function checkUserStatus() {
        try {
            // The 'credentials: "include"' option is crucial. It tells the browser
            // to send the session cookie along with the request to the backend.
            const response = await fetch(`${backendUrl}/api/user`, {
                credentials: 'include' 
            });

            if (response.ok) {
                const data = await response.json();
                return data.user; // Returns the user object if logged in
            } else {
                return null; // Returns null if not logged in (e.g., 401 Unauthorized)
            }
        } catch (error) {
            console.error('Error checking user status:', error);
            return null;
        }
    }

    // Make the function available globally so other scripts can use it.
    window.checkUserStatus = checkUserStatus;
});

