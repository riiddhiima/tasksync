# ⚡ TaskSync — Smart Task Manager with Reminders

A full-stack web application for managing tasks with deadline tracking, priority levels, and automated email reminders.

![Tech Stack](https://img.shields.io/badge/Backend-Flask-blue) ![Database](https://img.shields.io/badge/Database-MySQL-orange) ![Auth](https://img.shields.io/badge/Auth-JWT-green) ![Frontend](https://img.shields.io/badge/Frontend-HTML%2FCSS%2FJS-yellow)

---

## 🚀 Live Demo

🌐 **Frontend:** [tasksync.netlify.app](https://amazing-sable-ecf7f9.netlify.app/)

🔗 **Backend API:** [tasksync-api.onrender.com](https://planned-lilly-riddhima-66db14f3.koyeb.app/)

---

## ✨ Features

- 🔐 **User Authentication** — Secure signup/login with JWT tokens and bcrypt password hashing
- ✅ **Task Management** — Create, update, and delete tasks with full CRUD support
- 🎯 **Priority Levels** — Categorize tasks as Low, Medium, or High priority
- ⏰ **Deadline Tracking** — Set deadlines and visually track overdue tasks
- 📧 **Email Reminders** — Automated emails sent 24 hours before task deadlines
- 📊 **Task Filtering** — Filter tasks by All / Pending / Done status
- 📱 **Responsive UI** — Clean, dark-themed interface that works on all screen sizes

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Backend | Python, Flask, Flask-SQLAlchemy |
| Database | MySQL |
| Authentication | JWT (Flask-JWT-Extended) |
| Email | Flask-Mail + Gmail SMTP |
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Hosting (Backend) | Render |
| Hosting (Frontend) | Netlify |
| Hosting (Database) | Railway |

---

## 📁 Project Structure

```
tasksync/
├── backend/
│   ├── app/
│   │   ├── __init__.py       # App factory, extensions init
│   │   ├── models.py         # SQLAlchemy models (User, Task)
│   │   ├── auth.py           # Register & login routes
│   │   ├── tasks.py          # Task CRUD routes
│   │   └── reminders.py      # Email reminder scheduler
│   ├── config.py             # App configuration
│   ├── run.py                # Entry point
│   └── requirements.txt
├── frontend/
│   ├── index.html            # Login / Register page
│   ├── dashboard.html        # Main task dashboard
│   ├── style.css             # Styling
│   └── app.js                # API calls & UI logic
└── README.md
```

---

## ⚙️ Local Setup

### Prerequisites
- Python 3.9+
- MySQL Server
- Git

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/tasksync.git
cd tasksync
```

### 2. Set up the backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
pip install -r requirements.txt
```

### 3. Create the database
```sql
CREATE DATABASE tasksync_db;
```

### 4. Configure environment variables
Create a `.env` file inside the `backend/` folder:
```
SECRET_KEY=your_secret_key
JWT_SECRET_KEY=your_jwt_secret
DATABASE_URL=mysql+pymysql://root:YOUR_PASSWORD@localhost/tasksync_db
MAIL_USERNAME=yourgmail@gmail.com
MAIL_PASSWORD=your_gmail_app_password
```

### 5. Run the backend
```bash
python run.py
```
Backend runs at `http://127.0.0.1:5000`

### 6. Run the frontend
Open `frontend/index.html` with **Live Server** (VS Code extension) or any static file server.

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT token |

### Tasks *(all require `Authorization: Bearer <token>` header)*
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks/` | Get all tasks for logged-in user |
| POST | `/api/tasks/` | Create a new task |
| PUT | `/api/tasks/<id>` | Update a task |
| DELETE | `/api/tasks/<id>` | Delete a task |

---

## 📧 Email Reminders

The app uses APScheduler to check every hour for tasks with deadlines within the next 24 hours. When found, it sends an automated reminder email to the task owner via Gmail SMTP.

To use this feature, generate a **Gmail App Password** from your Google account security settings and add it to your `.env` file.

---

## 🚀 Deployment

- **Backend** hosted on [Koyeb](https://koyeb.com) as a Web Service
- **Database** hosted on [Railway](https://railway.app) (MySQL)
- **Frontend** hosted on [Netlify](https://netlify.com) via drag-and-drop deploy

---

## 🙋 Author

**Riddhima Singh**  
[LinkedIn](https://www.linkedin.com/in/riddhima-singh-b848bb2a7/) • [GitHub](https://github.com/riiddhiima)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).