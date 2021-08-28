from application import app, db, ma
from datetime import datetime

class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100))
    password = db.Column(db.String(100))
    kid = db.Column(db.Boolean, nullable=False, default=False)
    staff = db.Column(db.Boolean, nullable=False, default=False)
    parent = db.Column(db.Boolean, nullable=False, default=False)
    admin = db.Column(db.Boolean, nullable=False, default=False)
    parent_id = db.Column(db.Integer, primary_key=False, nullable=True)
    

    def __init__(self,name,email,password,kid,staff,parent,admin,parent_id):
        self.name = name
        self.email = email
        self.password = password
        self.kid = kid
        self.staff = staff
        self.parent = parent
        self.admin = admin
        self.parent_id = parent_id

class UserSchema(ma.Schema):
    class Meta:
        fields = ('user_id', 'name', 'email', 'password', 'kid', 'staff', 'parent', 'admin', 'parent_id')

user_schema = UserSchema()
users_schema = UserSchema(many=True)


class ParentNotications(db.Model):
    notifcation_id = db.Column(db.Integer, primary_key=True)
    kid_id = db.Column(db.Integer, primary_key=False, nullable=True)
    parent_id = db.Column(db.Integer, primary_key=False, nullable=True)
    is_dropped = db.Column(db.Boolean, nullable=False, default=False)
    is_left = db.Column(db.Boolean, nullable=False, default=False)
    is_read = db.Column(db.Boolean, nullable=False, default=False)
    notification_date = db.Column(db.DateTime(timezone=True), nullable=False)

    

    def __init__(self,kid_id,parent_id,is_dropped,is_left,is_read,notification_date):
        self.kid_id = kid_id
        self.parent_id = parent_id
        self.is_dropped = is_dropped
        self.is_left = is_left
        self.is_read = is_read
        self.notification_date = notification_date

class ParentNotificationSchema(ma.Schema):
    class Meta:
        fields = ('notifcation_id', 'kid_id', 'parent_id', 'is_dropped', 'is_left', 'is_read', 'name', 'user_id', 'notification_date')

parent_notification_schema = ParentNotificationSchema()
parent_notifications_schema = ParentNotificationSchema(many=True)


class AdminNotications(db.Model):
    notifcation_id = db.Column(db.Integer, primary_key=True)
    staff_id = db.Column(db.Integer, primary_key=False, nullable=True)
    name = db.Column(db.String(100))
    is_dropped = db.Column(db.Boolean, nullable=False, default=False)
    is_left = db.Column(db.Boolean, nullable=False, default=False)
    is_read = db.Column(db.Boolean, nullable=False, default=False)
    notification_date = db.Column(db.DateTime(timezone=True), nullable=False)

    

    def __init__(self,staff_id,name,is_dropped,is_left,is_read,notification_date):
        self.staff_id = staff_id
        self.name = name
        self.is_dropped = is_dropped
        self.is_left = is_left
        self.is_read = is_read
        self.notification_date = notification_date

class AdminNotificationSchema(ma.Schema):
    class Meta:
        fields = ('notifcation_id', 'staff_id', 'name', 'is_dropped', 'is_left', 'is_read', 'name', 'user_id', 'notification_date')

admin_notification_schema = AdminNotificationSchema()
admin_notifications_schema = AdminNotificationSchema(many=True)