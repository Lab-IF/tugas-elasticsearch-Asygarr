[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-7f7980b617ed060a017424585567c406b6ee15c891e84e1186181d67ecf80aa0.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=11566252)
# elasticsearch

## 0. Persiapan
The vm.max_map_count kernel setting must be set to at least 262144 for production use.

How you set vm.max_map_count depends on your platform.

Untuk melihat nilai saat ini pengaturan vm.max_map_count, jalankan:
`grep vm.max_map_count /etc/sysctl.conf`

Untuk menerapkan pengaturan pada sistem, jalankan:
`sysctl -w vm.max_map_count=262144`

Untuk mengubah nilai secara permanen untuk pengaturan vm.max_map_count, perbarui nilai di /etc/sysctl.conf.

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
`docker-compose up -d` (menghidupkan elesaticsearch di docker)

Jika terjadi error seperti di tahap ini maka jalankan :
`cd .devcontainer` lalu jalankan kembali perintah di atas

## 2. Install Logstash
Download dan install Public Signing Key, yang fungsi nya untuk memverifikasi paket yang di download dari repository elastic.co :
`wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo gpg --dearmor -o /usr/share/keyrings/elastic-keyring.gpg`

Install apt-transport-https di debian sebelum melanjutkan, yang berfungsi untuk mengizinkan apt untuk menggunakan repositori melalui HTTPS:
`sudo apt-get install apt-transport-https`

Save repository definition ke /etc/apt/sources.list.d/elastic-8.x.list, yang berfungsi untuk menambahkan repository elastic.co ke dalam daftar repository yang ada di debian :
`echo "deb [signed-by=/usr/share/keyrings/elastic-keyring.gpg] https://artifacts.elastic.co/packages/8.x/apt stable main" | sudo tee -a /etc/apt/sources.list.d/elastic-8.x.list`

Jalankan perintah berikut untuk menginstall logstash :
`sudo apt-get update && sudo apt-get install logstash`


Install Plugin untuk logstash, yaitu plugin untuk input data dari mongodb :
`sudo /usr/share/logstash/bin/logstash-plugin install logstash-input-mongodb`

Copy config file
sesuaikan file config sebelum di copy, fungsinya untuk menghubungkan logstash dengan mongodb :
`sudo cp logstash-people.conf /etc/logstash/conf.d/logstash.conf`

Buat Folder :
`mkdir logstash/logstash-people`

Buat Index :

Contoh menggunakan nama index = people :
`curl --location --request PUT 'http://localhost:9200/people' --header 'Content-Type: application/json' --data '{
    "settings": { "number_of_shards": 5, "number_of_replicas": 1 }
}'`

Jalankan Logstash :
`sudo /usr/share/logstash/bin/logstash -f /etc/logstash/conf.d/logstash.conf`

## 3. Ketika keluar dan memulai kembali (menyalakan kembali)
Pertama kita jalankan perintah 
`sudo sysctl -p` untuk mengaktifkan vm.max_map_count

Kemudian kita jalankan perintah untuk menghidupkan kembali elasticsearch :
`docker-compose up -d`

Kemudian kita jalankan perintah untuk menghidupkan kembali logstash :
`sudo /usr/share/logstash/bin/logstash -f /etc/logstash/conf.d/logstash.conf` atau `sudo apt-get update && sudo apt-get install logstash`

Kemudian kita install kembali plugin untuk logstash :
`sudo /usr/share/logstash/bin/logstash-plugin install logstash-input-mongodb`

## 4. Menjalankan file latihan.es untuk menacari query dari elasticsearch

Disklaimer :
Maaf pak saya tidak bisa membuatkan video karena terkendala device yang saya miliki, saya hanya bisa membuatkan dokumentasi saja. Terima kasih pak.