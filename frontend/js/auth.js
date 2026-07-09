const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        loginMessage.style.color = "red";
        loginMessage.innerText = data.message || "Login Failed!";
        return;
      }

      setToken(data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      loginMessage.style.color = "green";
      loginMessage.innerText = "Login Successful... Redirecting";

      setTimeout(() => {
        if (data.user.role === "admin") {
          window.location.href = "admin-dashboard.html";
        } else if (data.user.role === "driver") {
          window.location.href = "drivers.html";
        } else {
          window.location.href = "booking.html";
        }
      }, 1000);
    } catch (error) {
      console.error(error);
      loginMessage.style.color = "red";
      loginMessage.innerText = "Unable to connect to server!";
    }
  });
}

const signupForm = document.getElementById("signupForm");
const signupMessage = document.getElementById("signupMessage");

if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("signupPassword").value.trim();

    const roleElement =
      document.getElementById("signupRole") || document.getElementById("role");

    const role = roleElement ? roleElement.value : "user";

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          password,
          role,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        signupMessage.style.color = "red";
        signupMessage.innerText =
          data.message || data.errors?.[0]?.msg || "Signup failed";
        return;
      }

      signupMessage.style.color = "green";
      signupMessage.innerText = "Signup successful. Redirecting to login...";

      setTimeout(() => {
        window.location.href = "login.html";
      }, 1200);
    } catch (error) {
      console.error(error);
      signupMessage.style.color = "red";
      signupMessage.innerText = "Unable to connect to server!";
    }
  });
}