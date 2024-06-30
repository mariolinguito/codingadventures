---
title: A simple guide to splitting with Config Split in Drupal
date: 2024-06-15T12:51:07.862Z
description: A simple guide to splitting with Config Split in Drupal
---
The most comprehensive explanation of the module comes from the official project page [[this](https://www.drupal.org/project/config_split)]: *"This module allows to define sets of configuration that will get exported to separate directories when exporting, and get merged when importing. It is possible to define in settings.php which of these sets should be active and considered for the export and import."*

Imagine that we have three environments: **local**, **testing** and **production**; and you created a custom module with a config form with fields: *field_key* and *field_secrets*. The value of these fields should change for every environment we have to manage.

How do you manage to do it? Using **Config Split!**

## Create the different environments:

Before the settings of Config Split, we need to create the folders in which the module needs to export the YML files.

In this case, we can have three folders:

* *config/default \[the previous config/sync]*
* *config/**local***
* *config/**testing***
* *config/**production***

In particular, *config/default* should be the folder in which you exported all the configurations, so the folder we set in **settings.local.php**

![Structure of folder for configurations](folder_sync.png "Structure of folder for configurations")

Okay, now we can create the settings [go to */admin/config/development/configuration/config-split*]; we will make only one example in this instance, but you can replicate it for every other environment.

The first part we can set is the **storage type**:

![Settings for the storage type](configutations_settings.png "Settings for the storage type")

In this case, I chose a folder, specifically the corresponding folder for **local**. Every YML file for local will be put in this folder.

Let's skip the setup of the activation/or not of the setting because this is the task of the written code into **settings.local.php** and go on to the most important sections.

In the complete split section, we have some ways to split:

1. We can choose to split a complete module and its configuration files [example: *devel*, which should be enabled only on a local environment];
2. We can choose to split a specific YML file [example: *system.logging.yml*, to save all messages, with backtrace information but not in production];
3. We can choose to split specific YML files we can write directly in textarea: such as our fields mentioned before];

In my case, I choose to split completely [Devel](https://www.drupal.org/project/devel) and [Devel Entity Updates](https://www.drupal.org/project/devel_entity_updates) modules, to make this module active only in the **development** environment. In the same way, in the production environment, we want active, for example, the [OpenID Connect](https://www.drupal.org/project/openid_connect) module.

## Install Dotenv and switch to the right env:

In Drupal, we can use a **.env** file in which we can specify all the env-dependent variables, such as the specific env. An example can be the following: 

```yaml
# Environment.
APP_ENV=

# DB information.
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=
DB_DRIVER=
DB_PREFIX=
```

We can make this using this module: [Dotenv](https://www.drupal.org/project/dotenv).