// Fetch and display all drivers and their ratings
fetch('/api/admin/drivers')
  .then(res => res.json())
  .then(data => {
    const tbody = document.querySelector('#drivers-table tbody');
    tbody.innerHTML = '';
    data.forEach(driver => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${driver.id}</td>
        <td>${driver.name}</td>
        <td>${driver.email}</td>
        <td>${driver.avg_rating?.toFixed(2) ?? 'N/A'}</td>
        <td><a href="../dashboard/driver.html?id=${driver.id}" class="button">View</a></td>
      `;
      tbody.appendChild(tr);
    });
  });
