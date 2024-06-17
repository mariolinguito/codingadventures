---
title: A simple guide to splitting with Config Split in Drupal
date: 2024-06-15T12:51:07.862Z
description: A simple guide to splitting with Config Split in Drupal
---
The most comprehensive explanation of the module comes from the official project page [[this](https://www.drupal.org/project/config_split)]: *"This module allows to define sets of configuration that will get exported to separate directories when exporting, and get merged together when importing. It is possible to define in settings.php which of these sets should be active and considered for the export and import."*

Imagine that we have three environments such as **local**, **testing** and **production**; and that you created a custom module \[my-best-module] in which there is a config form with some different fields:

*field_key* and *field_secrets*. The value of these fields should change for every environment we have to manage.

How do you manage to do it?

Using **Config Split!**

## Create the different environments:

Before the settings of Config Split, we need to create the folders in which the module needs to export the YML files.

In this case, we can have three folders:

* *config/default \[the previous config/sync]*
* *config/local*
* *config/testing*
* *config/production*

In particular, *config/default* should be the folder in which you exported all the configurations, so the folder we set in **settings.local.php**

![Structure of folder for configurations](folder_sync.png "Structure of folder for configurations")







```php
<?php
# [...]
# Choose the env.
if (isset($_ENV['APP_ENV'])) {
  $envSettings = [
    'local' => [
      'config_split.config_split.local' => true,
      'config_split.config_split.testing' => false,
      'config_split.config_split.production' => false,
    ],
    'testing' => [
      'config_split.config_split.local' => false,
      'config_split.config_split.testing' => true,
      'config_split.config_split.production' => false,
    ],
    'production' => [
      'config_split.config_split.local' => false,
      'config_split.config_split.testing' => false,
      'config_split.config_split.production' => true,
    ],
    # Add more environments here as needed...
  ];

  $currentEnv = $_ENV['APP_ENV'];
  if (array_key_exists($currentEnv, $envSettings)) {
    foreach ($envSettings[$currentEnv] as $key => $value) {
      $config[$key]['status'] = $value;
    }
  }
}
```