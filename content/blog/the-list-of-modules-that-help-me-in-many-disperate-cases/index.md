---
title: The list of modules that help me in many disparate (and desperate) cases...
date: 2022-08-05T11:50:36.189Z
description: The most important focal point of Drupal is the modules and the
  community that help to develop them. The efficiency and the stability of the
  modules garantee the widely use of Drupal in the big enterprises and
  governement.
---
The most important focal point of Drupal is the modules and the community that help to develop them. The efficiency and the stability of the modules guarantee the widely use of Drupal in big enterprises and governments.

The following list won't be a complete list of the most important and used modules of Drupal (obviously). These modules are starred by me for a reason: they save my professional life many times.



* ### **Tokens in Views Filter Criteria**

I need this module in the past for filtering some views with some dynamic information about the group membership of the current user. Think about this scenario: you have some groups, and every group have some users. You want to create a view that shows only the content created by users that belong to one specific group (the group of the current user).

How do accomplish this? Using the token!

We can create a custom token that gets the current user group ID membership and use this module to filter the contents.

Link: <https://www.drupal.org/project/token_views_filter>



* ### **Entity Group Field**

Many websites use Groups. This last is so powerful that it become one of the most used modules in the Drupal world. One of the problems I faced with is to add a specific user contextually to its creation. This module provides a field that can be added to user fields so you can specify the group's members of the user in the creation/updating phase.

Link: <https://www.drupal.org/project/entitygroupfield>



* ### **Menu Trail By Path**

Every website uses breadcrumb, contextually every uses a menu (specifically the main menu). So, when a user navigates our website, the breadcrumb change and goes deeper; when he is on the third level or just the second level of the menu, the parent menu item doesn't label with anything (any border bottom are visible). This module provides a method to follow the breadcrumb and highlight the main menu item so the user knows where he is.

Link: <https://www.drupal.org/project/menu_trail_by_path>



* ### **Hook Post Action**

Drupal has hooks. One of the best hooks you surely widely used in your Drupal development path is the *presave*. But, image a scenario in which you should execute some operations *after* the node was saved. This module provides some extra hooks you can use as a normal hook: it includes also the *postsave* hook for entity or node.

Link: <https://www.drupal.org/project/hook_post_action>



* ### **External Links**

I hate to manage manually the internal or external links, in particular, the Italian law for development for the Public Administration forces you to specify if the URL is external or not and warn the user about that. This module provides some interesting and useful tools that help you to add an icon to the external links, add automatically a target blank for them, and so on. Your life has been simplified even further, fortunately.

Link: <https://www.drupal.org/project/extlink>



* ### **Translatable menu link URI**

As before, another thing that I hate is the multilanguage websites. One of my nightmares is to have different links for different languages (I know that Path Auto make the magic for the translated content), but the problem was another for me: It was needed to override a redirected menu link (I used Redirect contrib module) because, in the other languages different from the default language, the user will be redirected every time to the original page language.

Link: <https://www.drupal.org/project/translatable_menu_link_uri>