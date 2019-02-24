#!/bin/sh
git checkout dev
docker build -t nip/local-front-dev .
docker run -p 4200:4200 --name nip-local-front-dev nip/local-front-dev
