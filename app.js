let balance = 100;
let orders = [];
let nextOrderId = 1001;

function showPage(pageId) {

    document.querySelectorAll(".page").forEach(function(page) {
        page.classList.add("hidden");
    });

    document.getElementById(pageId).classList.remove("hidden");
}


function calculatePrice() {

    const service = document.getElementById("service");

    const selected = service.options[service.selectedIndex];

    const rate = Number(selected.dataset.rate);
    const unit = Number(selected.dataset.unit);

    const quantity =
        Number(document.getElementById("quantity").value) || 0;

    const price = (rate * quantity) / unit;

    document.getElementById("price").textContent =
        price.toFixed(2);
}


function placeOrder() {

    const serviceElement =
        document.getElementById("service");

    const selected =
        serviceElement.options[serviceElement.selectedIndex];

    const service = selected.value;

    const rate = Number(selected.dataset.rate);
    const unit = Number(selected.dataset.unit);

    const link =
        document.getElementById("link").value.trim();

    const quantity =
        Number(document.getElementById("quantity").value);

    const price =
        (rate * quantity) / unit;


    if (link === "") {

        document.getElementById("orderMessage").textContent =
            "Please enter a link.";

        return;
    }


    if (quantity <= 0) {

        document.getElementById("orderMessage").textContent =
            "Please enter a valid quantity.";

        return;
    }


    if (price > balance) {

        document.getElementById("orderMessage").textContent =
            "Insufficient balance. Please add funds.";

        return;
    }


    balance = balance - price;


    const order = {

        id: nextOrderId,

        service: service,

        quantity: quantity,

        amount: price,

        status: "Pending"

    };


    nextOrderId++;

    orders.push(order);


    updateBalance();

    displayOrders();


    document.getElementById("orderMessage").textContent =
        "Order placed successfully!";


    document.getElementById("link").value = "";
}


function addFunds() {

    const amount =
        Number(document.getElementById("fundAmount").value);


    if (amount < 10) {

        document.getElementById("fundMessage").textContent =
            "Minimum amount is ₹10.";

        return;
    }


    balance = balance + amount;


    updateBalance();


    document.getElementById("fundMessage").textContent =
        "₹" + amount.toFixed(2) +
        " demo funds added successfully.";
}


function updateBalance() {

    document.getElementById("balance").textContent =
        balance.toFixed(2);

    document.getElementById("balance2").textContent =
        balance.toFixed(2);

    document.getElementById("totalOrders").textContent =
        orders.length;
}


function displayOrders() {

    const orderList =
        document.getElementById("orderList");


    if (orders.length === 0) {

        orderList.innerHTML =
            "<tr><td colspan='5'>No orders yet.</td></tr>";

        return;
    }


    orderList.innerHTML = "";


    orders.forEach(function(order) {

        const row = document.createElement("tr");


        row.innerHTML =

            "<td>#" + order.id + "</td>" +

            "<td>" + order.service + "</td>" +

            "<td>" + order.quantity + "</td>" +

            "<td>₹" + order.amount.toFixed(2) + "</td>" +

            "<td>" + order.status + "</td>";


        orderList.appendChild(row);

    });
}


calculatePrice();
updateBalance();
displayOrders();