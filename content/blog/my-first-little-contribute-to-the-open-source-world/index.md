---
title: My first, little, contribute to the Open Source world!
date: 2020-10-31T18:48:31.326Z
description: My first, little, contribute to the Open Source world!
---
Instead of a post, this is a note, really.

Since I was ten-years-old I was fascinated by the magic Open Source world, but it also scared me 'cause I see in this world un-available for me, for my limited skills. 

So, over the years I made many things, except to contribute to this world, but today I found the brave to spread something that I wrote and put it on *Drupal Community*.

My choice is dictated by the fact that Drupal is growing right now more than other CMS, and it losing it's CMS identity to become something more, especially with the new version. Thanks to this, contribute to this project is perfect for me.

## The problem I found

Related to contrib project called Bootstrap Italia for Drupal 8 (link [here](https://www.drupal.org/project/bootstrap_italia)) I found a problem: the components! Really, if you want to use the default components that Bootstrap Italia offers you can't in some easy way. 

Idea: can I create a contrib module so other people can use it to include Bootstrap components easly into their projects? Of course, yes. In poor words, this is the birth of **Bootstrap Block Italia**.

## How I created the module

It is simple. With Drupal you can define your own block, so you can place it where you want: into Layout Builder or Block Layout. 

So, I taked the Bootstrap Italia components (that are defined in HTML and CSS) and re-make they with TWIG layouts. 

There are some objects to know: 

* *.module file*: with this file I can define a theme for my module, so I can inject dynamic variables to my template,
* *block files*: with this file I can define the structure of my block, so the fields and the property of the fiels (textfield, textarea, boolean, and so on),
* *twig files*: the twig file provide the template for specific block, and uses the dynamic variables that the block file inject into it self;

You can see the code on GitLab or on the community page of the module. 

## How I deploy Bootstrap Block Italia

Drupal provide a page where you can create a project easly: [here!](https://www.drupal.org/project/add) 

In that page you can choose the entity of your project: theme, module, or other. Of course, our mission is to create a module project.