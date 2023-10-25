#!/bin/bash

 


 

sudo apt-get update

 

 

 

# Install Node.js and npm

 

sudo DEBIAN_FRONTEND=noninteractive apt-get install -y nodejs npm


# Install MariaDB server and client

 

sudo DEBIAN_FRONTEND=noninteractive apt-get install -y mariadb-server mariadb-client

 

 

 

# Check Node.js version

 

sudo DEBIAN_FRONTEND=noninteractive node -v

 

 

 

# Check npm version

 

npm -v

 

 

 

# Install unzip

 

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

# webapplication system service
# Install and configure your service
sudo cp /home/admin/webapplication.service /lib/systemd/system/webapplication.service
sudo systemctl start webapplication
sudo systemctl enable webapplication


sudo systemctl daemon-reload
