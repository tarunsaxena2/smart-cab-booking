// --- LOGIN PAGE ---
function handleLogin() {
    const loginForm = document.getElementById("loginForm");
    if (!loginForm) return;

    loginForm.addEventListener("submit", function(e){
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if(email && password) {
            localStorage.setItem("userEmail", email);
            alert(`Welcome back, ${email}! ✅`);
            window.location.href = "location.html";
        } else {
            alert("Please enter email and password!");
        }
    });
}

// --- SIGNUP PAGE ---
function handleSignup() {
    const signupForm = document.getElementById("signupForm");
    if (!signupForm) return;

    signupForm.addEventListener("submit", function(e){
        e.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if(name && email && password) {
            localStorage.setItem("userEmail", email);
            alert(`Account created for ${name} ✅`);
            window.location.href = "location.html";
        } else {
            alert("Please fill all fields!");
        }
    });
}

// --- LOCATION / BOOK RIDE PAGE ---
function handleRideBooking() {
    const rideForm = document.getElementById("rideForm");
    if (!rideForm) return;

    rideForm.addEventListener("submit", function(e){
        e.preventDefault();
        const pickup = document.getElementById("pickup").value;
        const drop = document.getElementById("drop").value;
        const time = document.getElementById("time").value;

        if(pickup && drop && time) {
            const rideDetails = { pickup, drop, time };
            localStorage.setItem("rideDetails", JSON.stringify(rideDetails));
            alert("Ride details saved! Proceed to payment.");
            window.location.href = "payment.html";
        } else {
            alert("Please fill all fields!");
        }
    });
}

// --- PAYMENT PAGE ---
function handlePayment() {
    const paymentForm = document.getElementById("paymentForm");
    if (!paymentForm) return;

    // Show ride details
    const ride = JSON.parse(localStorage.getItem("rideDetails"));
    if(ride) {
        document.getElementById("rideInfo").innerText = `Ride from ${ride.pickup} to ${ride.drop} at ${ride.time}`;
    }

    paymentForm.addEventListener("submit", function(e){
        e.preventDefault();
        const card = document.getElementById("card").value;
        const expiry = document.getElementById("expiry").value;
        const cvv = document.getElementById("cvv").value;

        if(card && expiry && cvv) {
            alert("Payment Successful! ✅ Your ride is booked.");
            paymentForm.reset();
            localStorage.removeItem("rideDetails");
            window.location.href = "index.html";
        } else {
            alert("Please fill all payment details!");
        }
    });
}

// --- INIT FUNCTION TO CALL ON ALL PAGES ---
function init() {
    handleLogin();
    handleSignup();
    handleRideBooking();
    handlePayment();
}

// Run JS after DOM is loaded
document.addEventListener("DOMContentLoaded", init);
