from app import mail, db
from app.models import Task, User
from flask_mail import Message
from datetime import datetime, timedelta

def send_reminders(app):
    with app.app_context():
        now = datetime.utcnow()
        upcoming = now + timedelta(hours=24)

        tasks = Task.query.filter(
            Task.deadline <= upcoming,
            Task.deadline >= now,
            Task.is_done == False,
            Task.reminder_sent == False
        ).all()

        for task in tasks:
            user = User.query.get(task.user_id)
            if not user or not user.email:
                continue

            msg = Message(
                subject=f"⏰ Reminder: '{task.title}' is due soon!",
                sender=app.config['MAIL_USERNAME'],
                recipients=[user.email]
            )
            msg.body = (
                f"Hi {user.username},\n\n"
                f"Your task '{task.title}' is due by {task.deadline}.\n\n"
                f"Priority: {task.priority}\n\n"
                "Don't forget to complete it!\n\n— TaskSync"
            )

            mail.send(msg)
            task.reminder_sent = True

        db.session.commit()