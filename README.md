[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-7f7980b617ed060a017424585567c406b6ee15c891e84e1186181d67ecf80aa0.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=11566252)
# elasticsearch

## 0. Persiapan
The vm.max_map_count kernel setting must be set to at least 262144 for production use.

How you set vm.max_map_count depends on your platform.

To view the current value for the vm.max_map_count setting, run:

`grep vm.max_map_count /etc/sysctl.conf`

To apply the setting on a live system, run:

`sysctl -w vm.max_map_count=262144`

To permanently change the value for the vm.max_map_count setting, update the value in /etc/sysctl.conf.

Untuk mengatur vm.max_map_count agar berlaku secara permanen, Anda perlu mengedit file konfigurasi sysctl.conf. Berikut adalah langkah-langkah yang dapat Anda ikuti:

Buka file sysctl.conf menggunakan editor teks seperti nano atau vi. Jalankan perintah berikut dengan akses root atau menggunakan sudo:

`sudo nano /etc/sysctl.conf`

Di dalam file sysctl.conf, tambahkan baris berikut:
`vm.max_map_count=524288`

Simpan perubahan yang Anda buat dan keluar dari editor teks.

Atau dengan perintah berikut:
`echo "vm.max_map_count=524288" | sudo tee -a /etc/sysctl.conf`


Terapkan perubahan yang baru saja Anda buat dengan menjalankan perintah berikut:

`sudo sysctl -p`

Untuk Mengeceknya bisa dengan menjalankan perintah berikut:
`sysctl vm.max_map_count`



## 1. Install Elasticsearch
Jalankan perintah berikut dari folder .devcontainer :
`docker-compose up -d`

## 2. Install Logstash
Download and install the Public Signing Key:

`wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo gpg --dearmor -o /usr/share/keyrings/elastic-keyring.gpg`

You may need to install the apt-transport-https package on Debian before proceeding:

`sudo apt-get install apt-transport-https`

Save the repository definition to /etc/apt/sources.list.d/elastic-8.x.list:

`echo "deb [signed-by=/usr/share/keyrings/elastic-keyring.gpg] https://artifacts.elastic.co/packages/8.x/apt stable main" | sudo tee -a /etc/apt/sources.list.d/elastic-8.x.list`

Run sudo apt-get update and the repository is ready for use. You can install it with:

`sudo apt-get update && sudo apt-get install logstash`


Install Plugin

`sudo /usr/share/logstash/bin/logstash-plugin install logstash-input-mongodb`

Copy config file
sesuaikan file config sebelum di copy
`sudo cp logstash-people.conf /etc/logstash/conf.d/logstash.conf`

Buat Folder :
`mkdir logstash/logstash-people`

Buat Index :

Contoh menggunakan nama index = people

`curl --location --request PUT 'http://localhost:9200/people' --header 'Content-Type: application/json' --data '{
    "settings": { "number_of_shards": 5, "number_of_replicas": 1 }
}'`

Jalanin Logstash

`sudo /usr/share/logstash/bin/logstash -f /etc/logstash/conf.d/logstash.conf`


