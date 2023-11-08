#!/bin/bash

sudo apt-get update


sudo DEBIAN_FRONTEND=noninteractive apt-get install -y nodejs npm

sudo DEBIAN_FRONTEND=noninteractive node -v
 
sudo DEBIAN_FRONTEND=noninteractive apt install -y unzip


echo "installing cloudwatch"
sudo apt-get install rpm
wget https://amazoncloudwatch-agent.s3.amazonaws.com/debian/amd64/latest/amazon-cloudwatch-agent.deb

sudo dpkg -i amazon-cloudwatch-agent.deb
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-config-wizard
sudo unzip WebAppRenamed -d WebApp

sudo groupadd csye6225

sudo useradd -s /bin/false -g csye6225 -d /opt/csye6225 -m csye6225 

sudo cp /home/admin/WebApp/webapplication.service /lib/systemd/system/webapplication.service

sudo systemctl daemon-reload
sudo systemctl enable webapplication
sudo systemctl start webapplication