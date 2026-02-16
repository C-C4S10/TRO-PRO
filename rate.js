// Get driver ID from URL
const urlParams = new URLSearchParams(window.location.search);
const driverId = urlParams.get('id');
const form = document.getElementById('rating-form');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const rating = formData.get('rating');
  const comment = formData.get('comment');
  if (!rating) {
    resultDiv.textContent = 'Please select a star rating.';
    return;
  }
  resultDiv.textContent = 'Submitting...';
  try {
    const res = await fetch(`/api/driver/${driverId}/ratings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rating, comment })
    });
    if (res.ok) {
      resultDiv.textContent = 'Thank you for your feedback!';
      form.reset();
    } else {
      const json = await res.json();
      resultDiv.textContent = json.error || 'Error submitting rating.';
    }
  } catch (err) {
    resultDiv.textContent = 'Network error.';
  }
});
