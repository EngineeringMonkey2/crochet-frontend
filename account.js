// account.js (Rewritten for Render Backend)

// Define the base URL of your live backend on Render.
const backendUrl = 'https://crochet-backend.onrender.com';

document.addEventListener('DOMContentLoaded', async () => {
    const accountDetailsContainer = document.getElementById('account-details');
    const orderHistoryContainer = document.getElementById('order-history');

    // Wait for the checkUserStatus function (from auth.js) to be available
    if (typeof window.checkUserStatus !== 'function') {
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    const user = await window.checkUserStatus();

    if (user) {
        // User is signed in.
        displayAccountDetails(user);
        displayOrderHistory();
    } else {
        // No user is signed in. Redirect to login page.
        window.location.href = 'login.html';
    }

    function displayAccountDetails(user) {
        if (accountDetailsContainer) {
            accountDetailsContainer.innerHTML = `
                <p class="mb-2"><strong>Name:</strong> ${user.display_name || 'Not set'}</p>
                <p class="mb-4"><strong>Email:</strong> ${user.email}</p>
                <button id="sign-out-btn" class="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Sign Out
                </button>
            `;

            document.getElementById('sign-out-btn').addEventListener('click', async () => {
                try {
                    await fetch(`${backendUrl}/auth/logout`, { 
                        method: 'POST',
                        credentials: 'include' 
                    });
                    window.location.href = 'login.html';
                } catch (error) {
                    console.error('Sign out error', error);
                }
            });
        }
    }

    async function displayOrderHistory() {
        if (orderHistoryContainer) {
            orderHistoryContainer.innerHTML = `<p>Loading orders...</p>`;
            try {
                const response = await fetch(`${backendUrl}/api/orders`, {
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }

                const orders = await response.json();

                if (orders.length === 0) {
                    orderHistoryContainer.innerHTML = '<p class="text-gray-600">You have no recent orders.</p>';
                    return;
                }

                let ordersHtml = orders.map(order => {
                    const orderDate = new Date(order.created_at).toLocaleDateString();
                    const itemsHtml = order.line_items.map(item =>
                        `<li>${item.quantity} x ${item.description} - $${item.amount_total.toFixed(2)}</li>`
                    ).join('');

                    return `
                        <div class="border-t p-4">
                            <p class="font-bold">Order #${order.order_id.slice(-8)}</p>
                            <p>Date: ${orderDate}</p>
                            <p>Total: $${order.amount_total.toFixed(2)}</p>
                            <ul class="list-disc list-inside mt-2 text-sm text-gray-700">
                                ${itemsHtml}
                            </ul>
                        </div>
                    `;
                }).join('');
                
                orderHistoryContainer.innerHTML = ordersHtml;

            } catch (error) {
                console.error("Error fetching order history: ", error);
                orderHistoryContainer.innerHTML = `<p class="text-red-500">Could not load order history.</p>`;
            }
        }
    }
});
