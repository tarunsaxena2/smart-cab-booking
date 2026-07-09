if (!getToken()) {
  alert("Please login first.");
  window.location.href = "login.html";
}

const paymentForm = document.getElementById("paymentForm");
const paymentMessage = document.getElementById("paymentMessage");

if (paymentForm) {
  paymentForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const bookingId = Number(document.getElementById("bookingId").value);
    const amount = Number(document.getElementById("amount").value);
    const paymentMethod = document.getElementById("paymentMethod").value;
    const transactionId = document.getElementById("transactionId").value.trim();

    try {
      const response = await fetch(`${API_BASE_URL}/payments`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          bookingId,
          amount,
          paymentMethod,
          transactionId
        })
      });

      const data = await response.json();

      if (!data.success) {
        paymentMessage.style.color = "red";
        paymentMessage.innerText =
          data.message || data.errors?.[0]?.msg || "Payment failed!";
        return;
      }

      paymentMessage.style.color = "lime";
      paymentMessage.innerText = "Payment completed successfully!";

      paymentForm.reset();

      setTimeout(() => {
        window.location.href = "review.html";
      }, 1200);

    } catch (error) {
      console.error(error);
      paymentMessage.style.color = "red";
      paymentMessage.innerText = "Unable to connect to server!";
    }
  });
}