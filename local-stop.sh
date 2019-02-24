#!/bin/sh
docker stop nip-local-front-dev
docker rm nip-local-front-dev
docker rmi nip/local-front-dev
