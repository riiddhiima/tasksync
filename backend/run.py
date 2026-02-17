from app import create_app
from apscheduler.schedulers.background import BackgroundScheduler
from app.reminders import send_reminders

app = create_app()

scheduler = BackgroundScheduler()
scheduler.add_job(func=lambda: send_reminders(app), trigger='interval', hours=1)
scheduler.start()

if __name__ == '__main__':
    app.run(debug=True)