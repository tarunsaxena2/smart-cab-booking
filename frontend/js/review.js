if (!getToken()) {
  alert("Please login first.");
  window.location.href = "login.html";
}

const reviewForm = document.getElementById("reviewForm");
const reviewMessage = document.getElementById("reviewMessage");

if (reviewForm) {
  reviewForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const bookingId = Number(document.getElementById("bookingId").value);
    const driverId = Number(document.getElementById("driverId").value);
    const rating = Number(document.getElementById("rating").value);
    const comment = document.getElementById("comment").value.trim();

    try {
      const response = await fetch(`${API_BASE_URL}/reviews`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          bookingId,
          driverId,
          rating,
          comment
        })
      });

      const data = await response.json();

      if (!data.success) {
        reviewMessage.style.color = "red";
        reviewMessage.innerText =
          data.message || data.errors?.[0]?.msg || "Review failed!";
        return;
      }

      reviewMessage.style.color = "green";
      reviewMessage.innerText = "Review submitted successfully!";

      reviewForm.reset();

      setTimeout(() => {
        window.location.href = "stored-bookings.html";
      }, 1200);

    } catch (error) {
      console.error(error);
      reviewMessage.style.color = "red";
      reviewMessage.innerText = "Unable to connect to server!";
    }
  });
}