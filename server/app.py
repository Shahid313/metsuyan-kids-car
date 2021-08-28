from application import app, db
import socket

hostname = socket.gethostname()

ip_address = socket.gethostbyname(hostname)

if __name__ == '__main__':
    app.run(host=ip_address,debug=True)