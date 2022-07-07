#!/bin/bash

pm2 delete 0 1 && \
pm2 start express/index.js && pm2 start npm -- run dev && \
curl http://localhost:5001/update/ca