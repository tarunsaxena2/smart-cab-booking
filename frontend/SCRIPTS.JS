// --- Signup ---
function handleSignup() {
    const signupForm = document.getElementById("signupForm");
    if (!signupForm) return;

    signupForm.addEventListener("submit", async function(e){
        e.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const res = await fetch('/api/signup', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({name, email, password})
        });
        const data = await res.json();
        if(data.success){
            localStorage.setItem("userId", data.userId);
            alert("Signup successful! ✅");
            window.location.href = "location.html";
        } else alert(data.message);
    });
}

// --- Login ---
function handleLogin() {
    const loginForm = document.getElementById("loginForm");
    if (!loginForm) return;

    loginForm.addEventListener("submit", async function(e){
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({email, password})
        });
        const data = await res.json();
        if(data.success){
            localStorage.setItem("userId", data.userId);
            alert(`Welcome ${data.name}! ✅`);
            window.location.href = "location.html";
        } else alert(data.message);
    });
}

// --- Book Ride ---
function handleRideBooking() {
    const rideForm = document.getElementById("rideForm");
    if (!rideForm) return;

    rideForm.addEventListener("submit", async function(e){
        e.preventDefault();
        const userId = localStorage.getItem("userId");
        const pickup = document.getElementById("pickup").value;
        const dropoff = document.getElementById("drop").value;
        const time = document.getElementById("time").value;

        const res = await fetch('/api/book', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({userId, pickup, dropoff, time})
        });
        const data = await res.json();
        if(data.success){
            localStorage.setItem("rideId", data.rideId);
            alert("Ride booked! Proceed to payment.");
            window.location.href = "payment.html";
        } else alert(data.message);
    });
}

// --- Payment ---
function handlePayment() {
    const paymentForm = document.getElementById("paymentForm");
    if (!paymentForm) return;

    const rideId = localStorage.getItem("rideId");
    const rideInfo = document.getElementById("rideInfo");
    if(rideInfo){
        const pickup = document.getElementById("pickup")?.value || 'Your Pickup';
        const drop = document.getElementById("drop")?.value || 'Your Drop';
        rideInfo.innerText = `Ride from ${pickup} to ${drop}`;
    }

    paymentForm.addEventListener("submit", async function(e){
        e.preventDefault();
        const card = document.getElementById("card").value;
        const expiry = document.getElementById("expiry").value;
        const cvv = document.getElementById("cvv").value;

        const res = await fetch('/api/payment', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({rideId, card, expiry, cvv})
        });
        const data = await res.json();
        if(data.success){
            alert("Payment successful! ✅");
            localStorage.removeItem("rideId");
            window.location.href = "index.html";
        } else alert(data.message);
    });
}

function init() {
    handleLogin();
    handleSignup();
    handleRideBooking();
    handlePayment();
}
document.addEventListener("DOMContentLoaded", init);
