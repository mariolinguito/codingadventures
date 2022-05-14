---
title: So, you want limit actions on node based on workflow state...
date: 2022-04-09T13:09:20.797Z
description: So, you want limit actions on node based on workflow state...
---
## Some harmless chatter...

In some cases, I need to limit the actions (for the contents) based on the workflow state and simultaneously for specific roles. This can be a tremendous challenge and a strange and much in demand request for a Drupal-made website.

At first look, the problem seems pretty simple the first thing that come to my mind was to delete some operation terms from the menu near the element (in the content view). It was the first and most simple task I did, so the editorial roles (like a content editor) cannot see these operations.

But, there is a problem: the problem is the infamous notorious *smart content editor*. In fact, to the detriment of the hiding of some operation terms, the operation itself exists and can be used in any case (knowing, for example, the specific URL). This is a big problem because bypasses the limit of the role. Again, an important thing to know is that the content editor can also perform this operation in bulk mode.

The problem starts to be a hard adventure...

The first element to understand (that I used in this case) is an *EventSubscriber*, for checking the users' permissions before the operation (on the node). It is a powerful tool that we can use in more circumstances because it stands in the way between two operations. As official documentation says:

*Event systems are used in many complex applications as a way to allow extensions to modify how the system works.*

And again:

**\*Event Subscribers** - Sometimes called "Listeners", are callable methods or functions that react to an event being propagated throughout the Event Registry.*

This element can be extremely useful in some cases like this, just because we can perform some controls before the operation will be accomplished by the system; our check will be about the role of the user and the moderation state of the content.

## Okay, show me the code, please!

Based on these sentences, I wrote some pieces of code:

```php
 <?php
  # [...]

  public function Redirection(GetResponseEvent $event) {
    $attributes = $event->getRequest()->attributes;
    $route_name = $event->getRequest()->get('_route');
    $helper = \Drupal::service('workflow_hooks_helper.roles_actions_workflow');
    $routes = $helper->getRoutes();

    if(in_array($route_name, $routes)) {
      if(!$helper->checkModerationAccessForNode($attributes->get('node'))) {
        $this->messenger->addWarning(
          t('You cannot do this operation!<br>Maybe the content is in moderation state protected from you!')
        );

        $front = Url::fromRoute('system.admin_content')->toString();
        $event->setResponse(new TrustedRedirectResponse($front));
      }
    }
  }
```

We use some service methods, such as: 

```php
<?php

  # [...]

  public function checkModerationAccessForNode($node) {
    $rules = $this->getRules();
    $current_roles = $this->currentUserRoles();
    $node_states = $node !== null ? $this->flatArrayOneLevel($node->get('moderation_state')->getValue()) : [];

    foreach ($rules as $key => $rule) {
      $current_rule = array_map('trim', explode('=', $rule));
      $rule_roles = $this->roles($current_rule[0]);
      $rule_actions = $this->actions($current_rule[1]);
      $rule_states = $this->states($current_rule[2]);

      if(empty(array_intersect($current_roles, $rule_roles))) {
        return true;
      }

      if(empty($node_states)) {
        return false;
      }

      if(empty(array_intersect($node_states, $rule_states))) {
        return true;
      }
    }
  }

  public function getRules() {
    $configuration = \Drupal::config('workflow_hooks_helper.settings');
    return explode("\r\n", $configuration->get('actions_allowed_on_roles'));
  }

  public function getRoutes() {
    $configuration = \Drupal::config('workflow_hooks_helper.settings');
    return array_map('trim', explode("\r\n", $configuration->get('routes_subscriber')));
  }

  public function currentUserRoles() {
    $current_user = \Drupal::currentUser();
    $current_roles = $current_user->getRoles();

    if(($key = array_search('authenticated', $current_roles)) !== false) {
      unset($current_roles[$key]);
    } return $current_roles;
  }

  public function roles($roles) {
    $rule_roles = trim(str_replace(['[', ']'], '', $roles));
    $rule_roles = array_map('trim', explode(',', $rule_roles));

    return $rule_roles;
  }

  public function actions($actions) {
    $rule_actions = trim(str_replace(['[', ']'], '', $actions));
    $rule_actions = array_map('trim', explode(',', $rule_actions));

    return $rule_actions;
  }

  public function states($states) {
    $rule_states = trim(str_replace(['[', ']'], '', $states));
    $rule_states = array_map('trim', explode(',', $rule_states));

    return $rule_states;
  }

  public function flatArrayOneLevel($array_to_flat) {
    $array_flatted = [];
    foreach ($array_to_flat as $key => $value) {
      $array_flatted[] = $value['value'];
    } return $array_flatted;
  }

  public function workflowStatesChecking($rule_states, $node_states) {
    $operation_status = false;
    if(!empty(array_intersect($rule_states, $node_states))) {
      $operation_status = true;
    } return $operation_status;
  }

  public function workflowRolesChecking($rule_roles, $node_roles) {
    $operation_status = false;
    if(!empty(array_intersect($rule_roles, $node_roles))) {
      $operation_status = true;
    } return $operation_status;
  }

  public function workflowActionsChecking($rule_actions, $node_actions) {
    $operation_actions = $node_actions;
    foreach ($rule_actions as $key => $action) {
      if(substr($action, 0, 1) === '!') {
        unset($operation_actions[ltrim($action, '!')]);
      }
    } return $operation_actions;
  }
```



## The settings and their form:

I have the defect (is it a bad thing!?) to make everything as dynamically as possible, so I wanted to make this piece of code/module dynamically using the settings. But, let me explain the form of a specific configuration:

\[CONFIGURATION]

The first text area regards the roles, actions and workflow states; you can specify the role of the user, the action that he can or cannot perform (based on ! before the action name) in which workflow states. For example:

*\[content_editor] = \[!edit] = \[revision, approved, archived]*

This line means that all users with the role of the content editor cannot edit the content if it is in revision, approved or archived workflow state. Again:

*\[content_editor] = \[!delete] = \[revision, approved, published, archived]*

Instead, this means that the content editor cannot delete an element if it is in revision, approved, published or archived workflow state.

Based on the second part of each line we need to specify the route that should be subscribed; we can use the second text area for this:

*entity.node.delete_form*

*entity.node.delete_multiple_form*

*entity.node.edit_form*

Remember the bulk operation. In the end, if the user wants to perform these operations on items in these workflow states, he would be redirected to the content page.

## The improvements:

One improvement that someone can make is to use an asynchronous operation that checks all the things described previously and show an error message to the users. This avoids the use of redirecting the user to the content page and makes the system more usability than now.

Another improvement is to use PHPStan ([How to use PHPStan on your Drupal module: a practical example of mine](https://codingadventures.netlify.app/how-to-use-phpstan-on-your-drupal-module-a-practical-example-of-mine/)) to clean and make better the module (using for example service injection and others).