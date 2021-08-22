---
title: How to search in files content using Apache Tika and Drupal Content Views
date: 2021-08-20T15:27:17.719Z
description: There are some contrib modules for Drupal 8 that make you search
  into the files, all of these uses Apache Tika, which is a framework used for
  content analysis and detection.
---
There are some contrib modules for Drupal 8 that make you search into the files, all of these uses Apache Tika, which is a framework used for content analysis and detection.

But, before the start, I need to expose my limitations so you can understand why a choice instead of another:

1. I can't use Search API, consequently, I cannot use Search API Attachments, a module that uses Search API to perform the extraction and the analysis of the file contents,
2. I need to use the default Drupal search engine, and the default indexing system that it uses,
3. I need to perform the searching into an existing content view and it has to work with a pre-existent filter on this view;

The module that I used to accomplish all the three points above is Search File Attachments... with some extra functions that I wrote for!

In particular, what I made *in plus* for this module is the possibility of the use of a filter it already exists into a view to make a search into the files. For my example, I used the "title" exposed filter on a view to make a search both into content title and files content, to do this I added a hook into the .module file that alters the query that the view makes to display the elements.

<pre><code>/**
 * Implements hook_views_query_alter().
 */
function search_file_attachments_views_query_alter(ViewExecutable $view, QueryPluginBase $query) {
  $config = \Drupal::config('search_file_attachments.settings');
  $view_machine_name = $config->get('view_machine_name');
  $filter_machine_name = $config->get('filter_machine_name');

  if ($view->id() === $view_machine_name) {
    $filter_value = $view->filter[$filter_machine_name]->value;

    if(!empty($filter_value)) {
      $filter_value = str_replace(' ', '|', $filter_value);
      $database = \Drupal::database();
      $file_join = $database->select('file_usage', 'fu');
      $file_join->join('search_dataset', 'sd', 'fu.fid = sd.sid');
      $file_join->condition('sd.data', $filter_value, 'REGEXP');
      $file_join->fields('fu', ['id']);
      $file_results = $file_join->execute();
      $ids = array_keys($file_results->fetchAllAssoc('id'));

      if(!empty($ids)) {
        $in_statement = db_or()->condition('node_field_data.nid', $ids, 'IN');
        $query->addWhere(2, $in_statement);
      }
    }
  }
}
</code></pre>

Of course, the name of the view and filter can be specified from users into the configuration page of the module (I added three more forms for this purpose).

\[image]

Another improvement that I make is to limit the indexing of files into the file search page (that is the default in Drupal), so if we need to limit the search only on specific files related to specific content types, we can do this altering some queries into a file.

\[code query]

In the end, using a contrib module we extended their functionalities to adapt it to our needs. That is the Drupal world, baby!

ps. I will publish a patch for this (at least, the first change on the official project page).