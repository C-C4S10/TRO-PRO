// Get driver ID from URL
const urlParams = new URLSearchParams(window.location.search);
const driverId = urlParams.get('id');

function getDriverToken() {
  return localStorage.getItem('driverToken');
}

function isSameMonth(dateStr) {
  const d = new Date(dateStr);
  const now = new Date();
  return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
}

// Fetch driver dashboard info (protected)
fetch(`/api/driver/${driverId}`, {
  headers: { 'Authorization': 'Bearer ' + getDriverToken() }
})
  .then(res => {
    if (res.status === 401 || res.status === 403) {
      window.location.href = 'driver-login.html';
      return null;
    }
    return res.json();
  })
  .then(driver => {
    if (!driver) return;

    // --- Top summary cards ---
    const avgEl = document.getElementById('avg-rating');
    const totalEl = document.getElementById('total-ratings');
    const monthRatingEl = document.getElementById('month-rating');
    const monthCountEl = document.getElementById('month-count');

    avgEl.textContent = driver.avg_rating !== null ? `${driver.avg_rating.toFixed(1)} ⭐` : 'N/A';
    totalEl.textContent = `${driver.total_ratings}`;

    const monthComments = driver.comments.filter(c => isSameMonth(c.created_at));
    if (monthComments.length === 0) {
      monthRatingEl.textContent = 'N/A';
      monthCountEl.textContent = '0 ratings';
    } else {
      const sum = monthComments.reduce((s, r) => s + Number(r.rating), 0);
      const avg = sum / monthComments.length;
      monthRatingEl.textContent = `${avg.toFixed(1)} ⭐`;
      monthCountEl.textContent = `${monthComments.length} ratings`;
    }

    // Driver info (below summary)
    document.getElementById('driver-info').innerHTML = `
      <h2 style="margin:0 0 .25rem 0;">${driver.name}</h2>
      <p style="margin:0 0.5rem 0 0;color:var(--muted);">${driver.email}</p>
      <div style="margin-top:0.5rem;"><img src="${driver.qr_code}" alt="QR Code" style="max-width:150px;"></div>
    `;

    // Show comments and rating history
    const list = document.getElementById('ratings-list');
    list.innerHTML = '';
    if (driver.comments.length === 0) {
      list.innerHTML = '<li>No ratings yet.</li>';
    } else {
      driver.comments.forEach(r => {
        const li = document.createElement('li');
        const date = new Date(r.created_at).toLocaleString();
        li.innerHTML = `<strong style="margin-right:.5rem">${r.rating}⭐</strong> ${r.comment ? `<span>${r.comment}</span>` : '<em>No comment</em>'} <div style="color:#888;font-size:.9rem;margin-top:.25rem">${date}</div>`;
        list.appendChild(li);
      });
    }
  })
  .catch(err => {
    console.error(err);
    document.getElementById('driver-info').innerHTML = '<div style="color:#c00">Could not load dashboard — network error.</div>';
  });
