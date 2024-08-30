---
title: If you want to use Lando with SQL-Server on Drupal without going crazy
date: 2024-08-28T14:59:31.954Z
description: If you want to use SQL-Server by Microsoft on your Lando
  environment, you may encounter several difficulties.
---
If you want to use SQL-Server by Microsoft on your Lando environment, you may encounter several difficulties. This is because (according to me) SQL-Server is difficult in any case \[especially if you use most of the time MySQL or MariaDB  :-]

Lando is perfect for local development if you are a Drupal \[or WordPress] developer because it is based on Docker, and makes development speed than other tools \[XAMPP, I'm looking at you].

Again, Lando has a lot of plugins that you can use, especially for your database: MySQL, MariaDB, MongoDB, Postgres, and SQL-Server [[here](https://docs.lando.dev/plugins/mssql/) is the official page of the plugin]. Using this last, for me, is a tremendous hell!