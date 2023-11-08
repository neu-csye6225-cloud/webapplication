#!/bin/bash

sudo apt-get update

echo "installing cloudwatch"
# Update the package manager
sudo yum update -y

# Install the CloudWatch Agent
sudo yum install -y amazon-cloudwatch-agent

# Start the CloudWatch Agent Configuration Wizard
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-config-wizard

sudo systemctl enable amazon-cloudwatch-agent

# Start the CloudWatch Agent service
sudo systemctl start amazon-cloudwatch-agent

# Verify the status of the agent
sudo systemctl status amazon-cloudwatch-agent


sudo DEBIAN_FRONTEND=noninteractive apt-get install -y nodejs npm

sudo DEBIAN_FRONTEND=noninteractive node -v
 
sudo DEBIAN_FRONTEND=noninteractive apt install -y unzip

sudo unzip WebAppRenamed -d WebApp

sudo groupadd csye6225

sudo useradd -s /bin/false -g csye6225 -d /opt/csye6225 -m csye6225 

sudo cp /home/admin/WebApp/webapplication.service /lib/systemd/system/webapplication.service

sudo systemctl daemon-reload
sudo systemctl enable webapplication
sudo systemctl start webapplication