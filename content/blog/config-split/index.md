---
title: A simple guide to splitting with Config Split in Drupal
date: 2024-06-15T12:51:07.862Z
description: A simple guide to splitting with Config Split in Drupal
---
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