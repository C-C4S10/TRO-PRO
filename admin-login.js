document.getElementById("adminLoginForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/api/admin/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (res.ok) {
    // ✅ Save token
    localStorage.setItem("adminToken", data.token);

    // ✅ Redirect to dashboard
    window.location.href = "admin.html"; 
  } else {
    document.getElementById("message").innerText = data.error;
  }
});