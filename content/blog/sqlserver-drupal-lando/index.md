---
title: If you want to use Lando with SQL-Server on Drupal without going crazy
date: 2024-08-28T14:59:31.954Z
description: If you want to use SQL-Server by Microsoft on your Lando
  environment, you may encounter several difficulties.
---
If you want to use SQL-Server by Microsoft on your Lando environment, you may encounter several difficulties. This is because (according to me) SQL-Server is difficult in any case \[especially if you use most of the time MySQL or MariaDB  :-]

Lando is perfect for local development if you are a Drupal \[or WordPress] developer because it is based on Docker, and makes development speed than other tools \[XAMPP, I'm looking at you]. I'm using Lando on my WSL Ubuntu LTS installed on Windows 11, and it goes great!

Again, Lando has a lot of plugins that you can use, especially for your database: MySQL, MariaDB, MongoDB, Postgres, and SQL-Server [[here](https://docs.lando.dev/plugins/mssql/) is the official page of the plugin]. Using this last, for me, is a tremendous hell!

## When you're forced!

Seeing the [ranking](https://db-engines.com/en/ranking), SQL-Server is the third most used worldwide, so you will necessarily meet him in some project order. 

Therefore, let's go swimming in the river Acheron.

First of all, we need to know that Lando is based on a specific configuration file called **.lando.yml** [that we can [override with other YML files](https://docs.lando.dev/core/v3/#override-file), if necessary].

A Lando configuration file looks like this:

```yaml
name: my-drupal-site

# Configuration for services
services:
  appserver:
    type: php:8.1
    name: appserver
    # Define additional PHP extensions or configuration here if needed
    build:
      - apt-get update && apt-get install -y libpng-dev libjpeg-dev libfreetype6-dev
    volumes:
      - ./web:/var/www/html
    # Environment variables for Drupal settings
    overrides:
      environment:
        DRUPAL_DB_HOST: database
        DRUPAL_DB_NAME: drupal
        DRUPAL_DB_USER: drupal
        DRUPAL_DB_PASSWORD: drupal
    # Expose ports or other service settings
    ports:
      - "8080:80"

  database:
    type: mysql:8.0
    name: database
    # Environment variables for MySQL settings
    overrides:
      environment:
        MYSQL_ROOT_PASSWORD: root
        MYSQL_DATABASE: drupal
        MYSQL_USER: drupal
        MYSQL_PASSWORD: drupal

  # Optional: Redis service for caching
  redis:
    type: redis:7
    name: redis

  # Optional: Solr service for search
  solr:
    type: solr:8
    name: solr
    ports:
      - "8983:8983"

# Tools are optional but useful for managing tasks
tooling:
  drush:
    service: appserver
    description: "Run drush commands"
  composer:
    service: appserver
    description: "Run composer commands"

# Optional: Define any additional environment variables or settings
config:
  webroot: web
  xdebug: true
  mailhog: true

# Optional: Define any custom build steps or other configuration
hooks:
  post-start:
    - lando drush cr # Clear cache after starting
  post-import:
    - lando drush updb # Run database updates after importing data
```