#!/bin/bash

pm2 delete 0 1 && \
pm2 start express/index.js && \
pm2 start npm -- run dev && \
sleep 2 && \
curl http://localhost:5001/update/ca
curl http://localhost:5001/update/vca