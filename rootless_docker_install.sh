#!/bin/sh
set -e
command -v curl >/dev/null 2>&1
curl -fsSL https://get.docker.com/rootless | sh
dockerd-rootless-setuptool.sh install
echo "export PATH=$HOME/bin:$PATH" >> ~/.profile
echo "export DOCKER_HOST=unix:///run/user/$(id -u)/docker.sock" >> ~/.profile
