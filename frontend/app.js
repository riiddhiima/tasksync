const API = 'http://127.0.0.1:5000/api';  // Change this to your deployed URL later

// ---- AUTH ----

function showTab(tab) {
  document.getElementById('login-form').style.display = tab === 'login' ? 'block' : 'none';
  document.getElementById('register-form').style.display = tab === 'register' ? 'block' : 'none';
  document.querySelectorAll('.tab').forEach((t, i) => t.classList.toggle('active', (tab === 'login') === (i === 0)));
}

async function register() {
  const data = {
    username: document.getElementById('reg-username').value,
    email: document.getElementById('reg-email').value,
    password: document.getElementById('reg-password').value
  };
  const res = await fetch(`${API}/auth/register`, {
    method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)
  });
  const json = await res.json();
  document.getElementById('auth-message').textContent = res.ok ? 'Registered! Please login.' : json.error;
  if (res.ok) showTab('login');
}

async function login() {
  const data = {
    email: document.getElementById('login-email').value,
    password: document.getElementById('login-password').value
  };
  const res = await fetch(`${API}/auth/login`, {
    method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)
  });
  const json = await res.json();
  if (res.ok) {
    localStorage.setItem('token', json.token);
    localStorage.setItem('username', json.username);
    window.location.href = 'dashboard.html';
  } else {
    document.getElementById('auth-message').textContent = json.error;
  }
}

function logout() {
  localStorage.clear();
  window.location.href = 'index.html';
}

// ---- DASHBOARD ----

let allTasks = [];

async function loadDashboard() {
  if (!window.location.href.includes('dashboard')) return;
  const token = localStorage.getItem('token');
  if (!token) { window.location.href = 'index.html'; return; }
  document.getElementById('welcome-msg').textContent = `Hi, ${localStorage.getItem('username')} 👋`;
  await fetchTasks();
}

async function fetchTasks() {
  const res = await fetch(`${API}/tasks/`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
  allTasks = await res.json();
  renderTasks(allTasks);
}

function renderTasks(tasks) {
  const container = document.getElementById('tasks-container');
  if (!tasks.length) { container.innerHTML = '<p style="color:#64748b">No tasks yet. Add one!</p>'; return; }
  container.innerHTML = tasks.map(t => `
    <div class="task-card ${t.is_done ? 'done' : t.priority}">
      <div class="task-info">
        <h4>${t.is_done ? '✅ ' : ''}${t.title}</h4>
        ${t.description ? `<p>${t.description}</p>` : ''}
        <div class="task-meta">
          Priority: ${t.priority.toUpperCase()} 
          ${t.deadline ? `• Due: ${new Date(t.deadline).toLocaleString()}` : ''}
        </div>
      </div>
      <div class="task-actions">
        ${!t.is_done ? `<button class="btn-done" onclick="markDone(${t.id})">Done</button>` : ''}
        <button class="btn-delete" onclick="deleteTask(${t.id})">Delete</button>
      </div>
    </div>
  `).join('');
}

function filterTasks(type) {
  document.querySelectorAll('.filter-bar button').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  if (type === 'all') renderTasks(allTasks);
  else if (type === 'done') renderTasks(allTasks.filter(t => t.is_done));
  else renderTasks(allTasks.filter(t => !t.is_done));
}

async function createTask() {
  const data = {
    title: document.getElementById('task-title').value,
    description: document.getElementById('task-desc').value,
    priority: document.getElementById('task-priority').value,
    deadline: document.getElementById('task-deadline').value || null
  };
  if (!data.title) { alert('Title is required'); return; }
  await fetch(`${API}/tasks/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
    body: JSON.stringify(data)
  });
  document.getElementById('task-title').value = '';
  document.getElementById('task-desc').value = '';
  document.getElementById('task-deadline').value = '';
  fetchTasks();
}

async function markDone(id) {
  await fetch(`${API}/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
    body: JSON.stringify({ is_done: true })
  });
  fetchTasks();
}

async function deleteTask(id) {
  if (!confirm('Delete this task?')) return;
  await fetch(`${API}/tasks/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  });
  fetchTasks();
}

// Run on page load
loadDashboard();