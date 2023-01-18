---
title: "My first approach to Drupal Commerce: the standard for the robust
  enterprise e-commerce solution. Loved it!"
date: 2023-01-17T20:58:24.298Z
description: I found that Drupal Commerce is not just a module. It is an entire
  world with powerful features and objects, fundamental to every Drupal
  developer and builder.
---
I found that **Drupal Commerce** is not just a module. It is an entire world with powerful features and objects, fundamental to every Drupal developer and builder.

But first, let me introduce what Drupal Commerce is (for the few that didn't hear about it): it is open-source software (a set of modules) which empowers Drupal as a complete e-commerce platform, including the most important payment systems and so on.

Drupal Commerce was created by **Commerce Guys** (founded by Ryan Szrama). Then, it was renamed to its current name and released version 1.0 on August 2011. It can be extended with custom code and features as a simple Drupal instance.

I'm not here to write a Wikipedia-like article about Drupal Commerce, if you want to know something about it, you can find everything on the official website: *https://drupalcommerce.org* (the documentation is DOC, as we say in Italy :-)

### The requirements:

We want to create a custom module to provide a specific price in a specific slot of time. The slot of time, of course, is dynamically changeable by the administrator. Plus, on every slot, you can set a *free shipping bonus*.

An example:

**1° slot:** 08:00-12:00 -> 10.25€ (free shipping: true)

**2° slot:** 12:00-18:00 -> 25.14€ (free shipping: false)

**3° slot:** 18:00-20:00 -> 16.00€ (free shipping: false)

The default price should be used for the product in any other case.

### How I made it:

I used Drush generate to create the prototype of the module, and I continued to use it to create the element of my module, such as services, controllers, and so on. I suggest you use this tool in every Drupal development process: \[more link]

The first element I created was the configuration form. The structure of the configuration saved thanks to this form is the following:

```yaml
[product_variation]:
  times:
    start_time:    # time
    end_time:      # time
    free_shipping: # boolean
    UUID:          # a random string
 
 # For each product variation.
 # [...]
```

Of course, this structure is repeated for each product variation type (retrieved by a specific method); and the slots were checked by a validator before the submission to make sure they don't overlap each other.

\[CODE]

I saved this information in the configurations because this should not be changed in the future so frequently. Instead, the thing that can be changed much more often will be the price for every product in the specific slot of time. This is the reason I created a custom table with the following columns:

ID | product_variation_sku | product_variation | slot_uuid | number | currency_code | created

Where **slot_uuid** is the bridge between the specific row in this table and the specific slot of time for this **product_variation**.

The second step was to think of something that changes dynamically the price of a product based on specific conditions (the current time). This "something" is the **price resolver** (this is the documentation: \[LINK]).

Essentially: the price of a product is calculated dynamically by one or more price resolvers. You can use the resolver to write your module or use some other contrib modules (like Pricelist - before this custom module I read about this module but it doesn't fit my needs).

\[CODE]

Resolvers are registered as a normal service in the **my_module.services.yml** file and implement an interface called **PriceResolverInterface**. In implementing this interface, we need to override consequently the method called **resolve()**.

In the end, using this method we can manipulate the price.

The code is simple:

* We get the specific row from the custom table with the following condition: the records with an SKU passed (the array should be keyed using the UUID of the slots);
* We load all the configuration information based on the bundle (the product variation);
* For every slot (the configuration) we compare the current time with all the start and end times retrieved;
* If the current time is between the start and end times of one of the slots, we return the Price object with the number and currency code specified in the record only if is set the specific UUID in the results array of the query;

The third step has been the most difficult for me. The search fell on the order processor (link to the documentation: \[LINK]). Also in this case the order processor can be registered as a simple service in the previously cited file.

I think this solves the problem: using the order processor we can apply fees or bonuses during the order processing, so using a specific bonus that will be ever equivalent to the shipping cost, we can cancel dynamically the shipping cost itself. In particular, the object that can make this magic possible is called an **adjustment**.

We can specify an adjustment using a simple YAML file and using a structure like this:

\[CODE]

This adjustment will have the same cost of the shipping applied to the order and will be substituted from the order itself. This is only if the current time is between the start and end date of a specific slot and the shipping boolean is set to true.

\[CODE for check]

Given these considerations, free shipping will be applied only if in the order there is at least one of the product of product variations enabled in the configuration of the module.

All the other things of the module are siding things, such as permissions, routing, info files, etc. You can give a look at the whole code and structure on my GitHub repository: here \[LINK].

### What can be improved:

Today, the slot is fixed to the number of four, but one day can be added Ajax handlers to make time slots dynamically added or removed for each product variation (on the module configuration page).

Again, add unit test (or test in general) to make sure that the code works properly in every case;

And again, dynamically create a **Shipment method** (for the free shipping bonus) so that in the checkout process we can use it (instead of the bonus - more suitable for discount or gift cards);