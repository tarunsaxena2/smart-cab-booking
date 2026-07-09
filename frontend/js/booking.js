// 1. Core Security Check: Force login wall
if (!getToken()) {
  alert("Please login first.");
  window.location.href = "login.html";
}

const bookingForm = document.getElementById("bookingForm");
const bookingMessage = document.getElementById("bookingMessage");

if (bookingForm) {
  bookingForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // 2. Safely capture input variables
    const pickupLocation = document.getElementById("pickupLocation").value.trim();
    const dropLocation = document.getElementById("dropLocation").value.trim();
    const cabType = document.getElementById("cabType").value;
    const distanceKm = Number(document.getElementById("distanceKm").value);
    const estimatedFare = Number(document.getElementById("estimatedFare").value);

    try {
      // 3. Make post payload call to backend route
      const response = await fetch(`${API_BASE_URL}/bookings`, {
        method: "POST",
        headers: getAuthHeaders(), // Attaches Bearer JWT token from your api.js core helper
        body: JSON.stringify({
          pickupLocation,
          dropLocation,
          cabType,
          distanceKm,
          estimatedFare
        })
      });

      const data = await response.json();

      if (!data.success) {
        bookingMessage.style.color = "red";
        bookingMessage.innerText =
          data.message || data.errors?.[0]?.msg || "Booking failed!";
        return;
      }

      // 4. Alert user with localized theme coloring feedback
      bookingMessage.style.color = "green";
      bookingMessage.innerText = "Ride booked successfully!";

      bookingForm.reset();

      // 5. Relocate to history log page after brief timeout delay
      setTimeout(() => {
        window.location.href = "stored-bookings.html";
      }, 1200);

    } catch (error) {
      console.error(error);
      bookingMessage.style.color = "red";
      bookingMessage.innerText = "Unable to connect to server!";
    }
  });
}