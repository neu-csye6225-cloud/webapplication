#!/bin/bash

sudo apt-get update

echo "installing cloudwatch"
wget https://s3.amazonaws.com/amazoncloudwatch-agent/amazon_linux/amd64/latest/amazon-cloudwatch-agent.rpm
rpm -U ./amazon-cloudwatch-agent.rpm

echo "updating configuration of cloud watch agent"
cat << EOF > /opt/aws/amazon-cloudwatch-agent/etc/cwagentconfig.json
{
  "agent": {
    "metrics_collection_interval": 60,
    "run_as_user": "cwagent"
  },
  "metrics": {
    "append_dimensions": {
      "AutoScalingGroupName": "\${aws:AutoScalingGroupName}",
      "ImageId": "\${aws:ImageId}",
      "InstanceId": "\${aws:InstanceId}",
      "InstanceType": "\${aws:InstanceType}"
    },
    "metrics_collected": {
      "cpu": {
        "measurement": [
          "usage_idle",
          "usage_iowait",
          "usage_user",
          "usage_system"
        ],
        "metrics_collection_interval": 60,
        "resources": [
          "*"
        ]
      },
      "disk": {
        "measurement": [
          "used_percent",
          "inodes_free"
        ],
        "metrics_collection_interval": 60,
        "resources": [
          "/"
        ]
      },
      "mem": {
        "measurement": [
          "mem_used_percent"
        ],
        "metrics_collection_interval": 60
      }
    }
  },
  "logs": {
    "logs_collected": {
      "files": {
        "collect_list": [
          {
            "file_path": "/var/log/messages",
            "log_group_name": "var_log_messages",
            "log_stream_name": "{instance_id}"
          }
        ]
      }
    },
    "log_stream_name": "log_stream_name",
    "force_flush_interval" : 15
  }
}

# Start the CloudWatch Agent
/opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m onPremise -c file:/opt/aws/amazon-cloudwatch-agent/etc/cwagentconfig.json -s
In this script,

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