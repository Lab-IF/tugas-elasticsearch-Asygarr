#!/bin/bash

echo 'vm.max_map_count=524288' | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
pip install pymongo elasticsearch tqdm
docker-compose -f .devcontainer/docker-compose.yml up -d
