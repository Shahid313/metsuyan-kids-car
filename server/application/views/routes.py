from flask import Flask, jsonify, request
from application import app, db
from application.models.models import *
from werkzeug.security import generate_password_hash,check_password_hash
from sqlalchemy import text

@app.route("/signup", methods=['POST'])
def signup():
    name = request.form.get('name')
    email = request.form.get('email')
    password = request.form.get('password')
    status = request.form.get('status')
    hashed_password = generate_password_hash(password, method='sha256')
    if status == 'parent':
        users = User(name,email,hashed_password, False, False, True, False, '0')
        db.session.add(users)
        db.session.commit()
        return user_schema.jsonify({'users':users})
    elif status == 'staff':
        users = User(name,email,hashed_password, False, True, False, False, '0')
        db.session.add(users)
        db.session.commit()
        return user_schema.jsonify({'users':users})
        

@app.route("/admin_signup", methods=['POST'])
def admin_signup():
    name = request.form.get('name')
    email = request.form.get('email')
    password = request.form.get('password')
    hashed_password = generate_password_hash(password, method='sha256')
    users = User(name,email,hashed_password, False, False, False, True, '0')
    db.session.add(users)
    db.session.commit()
    return user_schema.jsonify({'users':users})


@app.route("/signin", methods=['POST'])
def signin():
    email = request.form.get('email')
    password = request.form.get('password')
    user = User.query.filter_by(email=email).first()
    if user and check_password_hash(user.password, password):
        users = user_schema.dump(user)
        return jsonify({'loggedIn':True, 'user':users})
    else:
        return jsonify({'loggedIn':False})


@app.route("/get_kids/<user_id>", methods=['GET'])
def get_kids(user_id):
    kid = User.query.filter_by(parent_id=user_id).all()
    result = users_schema.dump(kid)
    return jsonify({'kids':result})


@app.route("/delete_kid/<kid_id>", methods=['DELETE'])
def delete_kid(kid_id):
    kid_to_delete = User.query.filter_by(user_id=kid_id).first()
    db.session.delete(kid_to_delete)
    db.session.commit()
    return jsonify({'isDeleted':True})

@app.route("/get_all_kids", methods=['GET'])
def get_all_kids():
    kids = User.query.filter_by(kid=True).all()
    result = users_schema.dump(kids)
    return jsonify({'kids':result})

@app.route("/get_all_Parents", methods=['GET'])
def get_all_Parents():
    kids = User.query.filter_by(parent=True).all()
    result = users_schema.dump(kids)
    return jsonify({'kids':result})

@app.route("/get_all_staff", methods=['GET'])
def get_all_staff():
    staff = User.query.filter_by(staff=True).all()
    result = users_schema.dump(staff)
    return jsonify({'staff':result})


@app.route("/add_kid/<user_id>", methods=['POST'])
def add_kid(user_id):
    name = request.form.get('name')
    email = request.form.get('email')
    password = request.form.get('password')
    hashed_password = generate_password_hash(password, method='sha256')
    users = User(name,email,hashed_password, True, False, False, False, user_id)
    db.session.add(users)
    db.session.commit()
    return user_schema.jsonify({'users':users})


@app.route("/delete_teacher/<teacher_id>", methods=['DELETE'])
def delete_teacher(teacher_id):
    teacher_to_delete = User.query.filter_by(user_id=teacher_id).first()
    db.session.delete(teacher_to_delete)
    db.session.commit()
    return jsonify({'TeacherDeleted':True})

@app.route("/kid_dropped/<kid_id>/<parent_id>", methods=['POST'])
def kid_dropped(kid_id, parent_id):
    new_notification = ParentNotications(kid_id,parent_id,True,False,False,datetime.now())
    db.session.add(new_notification)
    db.session.commit()
    return jsonify({'isDropped':True})

@app.route("/kid_left/<kid_id>/<parent_id>", methods=['POST'])
def kid_left(kid_id, parent_id):
    new_notification = ParentNotications(kid_id,parent_id,False,True,False,datetime.now())
    db.session.add(new_notification)
    db.session.commit()
    return jsonify({'isLeft':True})

@app.route("/kid_notification/<parent_id>", methods=['GET'])
def kid_notification(parent_id):
    sql = text("SELECT * FROM parent_notications LEFT JOIN user on user.user_id = parent_notications.kid_id WHERE parent_notications.parent_id = "+str(parent_id)+ " AND is_read = 0")
    notification = db.engine.execute(sql)
    if notification.rowcount > 0:
        update_query = "UPDATE parent_notications SET is_read = 1 WHERE parent_id = "+str(parent_id)
        db.engine.execute(update_query)
        notifications = parent_notifications_schema.dump(notification)
        return jsonify({"isFound":True, "notification":notifications})
    else:
        return jsonify({"isFound":False})

@app.route("/get_parent_notifications/<parent_id>", methods=['GET'])
def get_parent_notifications(parent_id):
    sql = text("SELECT * FROM parent_notications LEFT JOIN user on user.user_id = parent_notications.kid_id WHERE parent_notications.parent_id = "+str(parent_id))
    notification = db.engine.execute(sql)
    notifications = parent_notifications_schema.dump(notification)
    return jsonify({"notifications":notifications})

@app.route("/delete_parent_notification/<notification_id>", methods=['DELETE'])
def delete_parent_notification(notification_id):
    notification_to_delete = ParentNotications.query.filter_by(notifcation_id=notification_id).first()
    db.session.delete(notification_to_delete)
    db.session.commit()
    return jsonify({'isDeleted':True})


@app.route("/teacher_dropped/<teacher_id>", methods=['POST'])
def teacher_dropped(teacher_id):
    name = request.form.get('name')
    new_notification = AdminNotications(teacher_id,name,True,False,False,datetime.now())
    db.session.add(new_notification)
    db.session.commit()
    return jsonify({'isDropped':True})


@app.route("/teacher_left/<teacher_id>", methods=['POST'])
def teacher_left(teacher_id):
    name = request.form.get('name')
    new_notification = AdminNotications(teacher_id,name,False,True,False,datetime.now())
    db.session.add(new_notification)
    db.session.commit()
    return jsonify({'isLeft':True})

@app.route("/teacher_notification", methods=['GET'])
def teacher_notification():
    sql = text("SELECT * FROM admin_notications WHERE is_read = 0")
    notification = db.engine.execute(sql)
    if notification.rowcount > 0:
        update_query = "UPDATE admin_notications SET is_read = 1"
        db.engine.execute(update_query)
        notifications = admin_notifications_schema.dump(notification)
        return jsonify({"isFound":True, "notification":notifications})
    else:
        return jsonify({"isFound":False})


@app.route("/get_teachers_notifications", methods=['GET'])
def get_teachers_notifications():
    sql = text("SELECT * FROM admin_notications")
    notification = db.engine.execute(sql)
    notifications = admin_notifications_schema.dump(notification)
    return jsonify({"notifications":notifications})


@app.route("/delete_teacher_notification/<notification_id>", methods=['DELETE'])
def delete_teacher_notification(notification_id):
    notification_to_delete = AdminNotications.query.filter_by(notifcation_id=notification_id).first()
    db.session.delete(notification_to_delete)
    db.session.commit()
    return jsonify({'isDeleted':True})


@app.route("/get_names", methods=['GET'])
def get_names():
    sql = text("SELECT * FROM user WHERE kid = 1")
    result = db.engine.execute(sql)
    kids_invoices = users_schema.dump(result)
    return jsonify({'kids_invoices':kids_invoices})

@app.route("/get_kids_invoices/<user_id>", methods=['GET'])
def get_kids_invoices(user_id):
    sql = text("SELECT * FROM parent_notications LEFT JOIN user on user.user_id = parent_notications.kid_id WHERE parent_notications.kid_id = "+str(user_id))
    result = db.engine.execute(sql)
    kids_invoices = parent_notifications_schema.dump(result)
    return jsonify({'kids_invoices':kids_invoices})

@app.route("/get_staff_invoices_names", methods=['GET'])
def get_staff_invoices_names():
    sql = text("SELECT * FROM user WHERE staff = 1")
    result = db.engine.execute(sql)
    kids_invoices = users_schema.dump(result)
    return jsonify({'kids_invoices':kids_invoices})

@app.route("/get_staff_invoices/<staff_id>", methods=['GET'])
def get_staff_invoices(staff_id):
    sql = text("SELECT * FROM admin_notications WHERE staff_id = "+str(staff_id))
    result = db.engine.execute(sql)
    kids_invoices = parent_notifications_schema.dump(result)
    return jsonify({'kids_invoices':kids_invoices})





