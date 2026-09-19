let walletBalance = 100;
let totalOrders = 0;
let orders = [];

// Section change
function showSection(sectionName) {
    const sections = document.querySelectorAll(".section");

    sections.forEach(function(section) {
        section.classList.add("hidden");
    });

    const selectedSection = document.getElementById(sectionName);

    if (selectedSection) {
        selectedSection.classList.remove("hidden");
    }
}

// Place order
function placeOrder() {
    const service = document.getElementById("service").value;
    const link = document.getElementById("orderLink").value.trim();
    const quantity = document.getElementById("quantity").value;
    const message = document.getElementById("orderMessage");

    if (service === "") {
        message.textContent = "Please select a service.";
        return;
    }

    if (link === "") {
        message.textContent = "Please enter a link.";
        return;
    }

    if (quantity === "" || Number(quantity) <= 0) {
        message.textContent = "Please enter a valid quantity.";
        return;
    }

    totalOrders++;

    const order = {
        id: totalOrders,
        service: service,
        link: link,
        quantity: quantity,
        status: "Pending"
    };

    orders.push(order);

    document.getElementById("totalOrders").textContent = totalOrders;

    message.textContent = "Order created successfully.";

    document.getElementById("orderLink").value = "";
    document.getElementById("quantity").value = "";

    updateOrderHistory();
}

// Add funds
function addFunds() {
    const amount = Number(
        document.getElementById("fundAmount").value
    );

    const message = document.getElementById("fundMessage");

    if (!amount || amount <= 0) {
        message.textContent = "Please enter a valid amount.";
        return;
    }

    walletBalance += amount;

    document.querySelector(".balance").textContent =
        "₹" + walletBalance.toFixed(2);

    message.textContent =
        "₹" + amount.toFixed(2) + " added successfully.";

    document.getElementById("fundAmount").value = "";
}

// Update order history
function updateOrderHistory() {
    const orderList = document.getElementById("orderList");

    if (orders.length === 0) {
        orderList.innerHTML = "<p>No orders yet.</p>";
        return;
    }

    orderList.innerHTML = "";

    orders.forEach(function(order) {
        const item = document.createElement("div");

        item.className = "order-item";

        item.innerHTML = `
            <p><strong>Order ID:</strong> ${order.id}</p>
            <p><strong>Service:</strong> ${order.service}</p>
            <p><strong>Quantity:</strong> ${order.quantity}</p>
            <p><strong>Status:</strong> ${order.status}</p>
        `;

        orderList.appendChild(item);
    });
}

// Show dashboard when page opens
document.addEventListener("DOMContentLoaded", function() {
    showSection("dashboard");
});
