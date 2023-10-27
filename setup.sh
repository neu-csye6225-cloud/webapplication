#!/bin/bash


 

 
sudo apt-get update
# Check Node.js version

 
sudo DEBIAN_FRONTEND=noninteractive apt-get install -y nodejs npm

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


echo "web application service starting now"
# webapplication system service
# Install and configure your service


sudo cp /home/admin/WebApp/webapplication.service /lib/systemd/system/webapplication.service


sudo cp /home/admin/WebApp/webapplication.service /lib/systemd/system/webapplication.service
echo "did we copy the files"


echo "started the web application"


sudo systemctl start webapplication.service
echo "enabled the web application"
sudo systemctl enable webapplication.service


sudo systemctl daemon-reload


# webapplication system service
