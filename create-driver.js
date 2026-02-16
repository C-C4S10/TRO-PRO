const form = document.getElementById('create-driver-form');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  resultDiv.textContent = 'Creating driver...';
  try {
    const res = await fetch('/api/admin/drivers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (res.ok) {
      resultDiv.innerHTML = `<b>Driver created!</b><br>ID: ${json.id}<br><img src="${json.qr_code}" alt="QR Code" style="max-width:150px;">`;
    } else {
      resultDiv.textContent = json.error || 'Error creating driver.';
    }
  } catch (err) {
    resultDiv.textContent = 'Network error.';
  }
});
