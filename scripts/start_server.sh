#!/bin/bash
set -e

cat > /etc/systemd/system/my-nodejs-app.service <<'UNIT'
[Unit]
Description=my-nodejs-app
After=network.target

[Service]
Type=simple
WorkingDirectory=/home/ec2-user/app
ExecStart=/usr/bin/node /home/ec2-user/app/app.js
Restart=always

[Install]
WantedBy=multi-user.target
UNIT

systemctl daemon-reload
systemctl enable my-nodejs-app
systemctl restart my-nodejs-app
