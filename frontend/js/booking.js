// Login check
if (!getToken()) {
  alert("Please login first.");
  window.location.href = "login.html";
}

const bookingForm = document.getElementById("bookingForm");
const bookingMessage = document.getElementById("bookingMessage");

if (bookingForm) {
  bookingForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const pickupLocation = document.getElementById("pickupLocation").value.trim();
    const dropLocation = document.getElementById("dropLocation").value.trim();
    const cabType = document.getElementById("cabType").value;
    const distanceKm = Number(document.getElementById("distanceKm").value);
    const estimatedFare = Number(document.getElementById("estimatedFare").value);

    try {
      const response = await fetch(`${API_BASE_URL}/bookings`, {
        method: "POST",
        headers: getAuthHeaders(),
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

      bookingMessage.style.color = "lime";
      bookingMessage.innerText = "Ride booked successfully!";

      bookingForm.reset();

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

const distanceInput = document.getElementById("distanceKm");
const fareInput = document.getElementById("estimatedFare");

if (distanceInput && fareInput) {
  distanceInput.addEventListener("input", () => {
    const distance = Number(distanceInput.value);

    if (!distance || distance <= 0) {
      fareInput.value = "";
      return;
    }

    const baseFare = 50;
    const perKmRate = 15;
    const fare = baseFare + distance * perKmRate;

    fareInput.value = Math.round(fare);
  });
}