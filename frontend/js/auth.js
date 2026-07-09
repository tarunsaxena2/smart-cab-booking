const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
<<<<<<< HEAD
    // 1. Updated to read the hidden role field from the login tabs
    const role = document.getElementById("loginRole").value; 
=======
>>>>>>> origin/main

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
<<<<<<< HEAD
          role, // Passing role if your backend login controller validates it
=======
>>>>>>> origin/main
        }),
      });

      const data = await response.json();

      if (!data.success) {
        loginMessage.style.color = "red";
        loginMessage.innerText = data.message || "Login Failed!";
        return;
      }

      // Save JWT Token
      setToken(data.token);

      // Save User Details
      localStorage.setItem("user", JSON.stringify(data.user));

<<<<<<< HEAD
      loginMessage.style.color = "green"; // Changed from lime to stand out cleanly on white
=======
      loginMessage.style.color = "lime";
>>>>>>> origin/main
      loginMessage.innerText = "Login Successful... Redirecting";

      // Redirect according to role
      setTimeout(() => {
<<<<<<< HEAD
        if (data.user.role === "admin") {
          window.location.href = "admin-dashboard.html";
        } else if (data.user.role === "driver") {
          window.location.href = "drivers.html";
        } else {
          window.location.href = "booking.html";
        }
=======

        if (data.user.role === "admin") {
          window.location.href = "admin-dashboard.html";

        } else if (data.user.role === "driver") {
          window.location.href = "drivers.html";

        } else {
          window.location.href = "booking.html";
        }

>>>>>>> origin/main
      }, 1000);

    } catch (error) {
      console.error(error);
      loginMessage.style.color = "red";
      loginMessage.innerText = "Unable to connect to server!";
    }
  });
}
<<<<<<< HEAD

=======
>>>>>>> origin/main
const signupForm = document.getElementById("signupForm");
const signupMessage = document.getElementById("signupMessage");

if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("signupPassword").value.trim();
<<<<<<< HEAD
    // 2. FIXED: Now accurately targeting the hidden role selector field populated by our tabs
    const role = document.getElementById("signupRole").value;
=======
    const role = document.getElementById("role").value;
>>>>>>> origin/main

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          password,
          role
        })
      });

      const data = await response.json();

      if (!data.success) {
        signupMessage.style.color = "red";
        signupMessage.innerText =
          data.message || data.errors?.[0]?.msg || "Signup failed";
        return;
      }

<<<<<<< HEAD
      signupMessage.style.color = "green";
=======
      signupMessage.style.color = "lime";
>>>>>>> origin/main
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