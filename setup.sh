#!/bin/bash

sudo apt-get update

sudo DEBIAN_FRONTEND=noninteractive node -v
 

sudo DEBIAN_FRONTEND=noninteractive apt install -y unzip


# Unzip the WebAppRenamed file to the WebApp directory

sudo unzip WebAppRenamed -d WebApp

# Start MySQL shell

sudo mysql


sudo mysql --execute="ALTER USER 'root'@'localhost' IDENTIFIED BY 'root'; FLUSH PRIVILEGES; CREATE DATABASE Assignment3;"
# Exit MySQL shell


sudo mysql --execute="EXIT;"

# Display a message

echo "foo"
echo "web application service starting now"
# webapplication system service
sudo cp webapplication.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable webapplication.service
sudo systemctl start webapplication.service
