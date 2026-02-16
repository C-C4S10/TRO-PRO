const form = document.getElementById('driver-login-form');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  resultDiv.textContent = 'Logging in...';

  try {
    const res = await fetch('http://localhost:3001/api/driver/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const json = await res.json();

    if (res.ok && json.token && json.driverId) {
      localStorage.setItem('driverToken', json.token);
      window.location.href = "driver.html";
    } else {
      resultDiv.textContent = json.error || 'Login failed.';
    }
  } catch (err) {
    resultDiv.textContent = 'Network error.';
  }
});