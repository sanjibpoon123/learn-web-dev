# Introduction To Indexes

## What is an Index?

When working with databases on Codecademy, many lessons use relatively small databases. However, when working with databases in practice, they can become massive very quickly. Imagine, for instance, if you had a database with all the purchases, sales, employees, shipping data, and so on for a large retailer like Target, Wal-Mart, or Amazon. Their databases must be massive! Without good organization, large databases like that can become nothing more than a pile of unusable information. Designing your database thoughtfully with multiple tables, keys, and relationships can help, but what if you want to search through this massive amount of data and find specific records? That is where indexing comes into play.

An index is an organization of the data in a table to help with performance when searching and filtering records. A table can have zero, one, or many indexes. There are some costs when using indexes, which we will cover later in this lesson.

Let’s start by learning how to see what indexes already exist on a table. Say you want to see what indexes exist on your `products` table you would run the following query:

```sql
SELECT *
FROM pg_Indexes
WHERE tablename = 'products';
```

`pg_Indexes` is a built-in view in PostgreSQL. Different database servers have different ways to see their indexes.

During this lesson, we will be working mostly with a table `customers` created with randomly generated information. Depending on the exercise, the number of records might change to help with run times, but the structure of the table will remain unchanged.

In this lesson you will learn about:

*   What an index is and how they function.
*   How to build an index.
*   How to drop an index.
*   Multicolumn indexes to expand the power of your indexes.
*   Some of the benefits and burdens of indexes.

## What is the benefit of an Index?

Indexing allows you to organize your database structure in such a way that it makes finding specific records much faster. By default it divides the possible matching records in half, then half, then half, and so on until the specific match you are searching for is found. This is known as a Binary Tree, or B-Tree.

Let’s consider an example to expand on this concept. Say you had a sales department where you ranked your clients from number 1 to 100 in order of loyalty. If you wanted to search the database for your most loyal client, who would have a loyalty score of 100, you would have to search every record (the highest loyalty score could be anywhere in the data set). If you created an index on `loyality_score`, you could now use the B-Tree structure to speed up that search. The search would divide all results in half, so in this case, the first check would be if the record you are searching for is greater than or less than 50.

If you are familiar with logarithms, the worst-case speed for a B-Tree to find a record is log2n, where without it you would have to check every record, so the read time would be n.

In small databases this is negligible, but as the datasets get larger this becomes more significant. To highlight this, let us say you were searching 1,000,000 records. Without an index on the column you were searching, you would need to look through all 1,000,000 records (assuming its a non-unique column). With a B-Tree index, in the worst case, you would have to search 20 comparisons (log2n).

## Impact of Indexes

Let’s do some experimenting now to see the power of indexes in practice. We will cover the cost of indexes later on, for now, let’s just focus on the positive aspects of them: filtering data.

As a note, this page will most likely run slower for you than any other exercise in this lesson. In order to see the benefits of an index, you need a large database. It may take some time to load the database and run your code. In future exercises, we will be working with smaller databases to not slow down your experience, but it’s important for you to see the impact indexes can have, so please have patience with this exercise.

To get insight into how PostgreSQL breaks down your statements into runnable parts, we can investigate the query plan by adding `EXPLAIN ANALYZE` before your query. Rather than returning the results of the query, it will return information _about_ the query.

```sql
EXPLAIN ANALYZE SELECT *
FROM customers;
```

This would return the plan that the server will use to give you every row from every record from the `customers` table.

There is a good amount of information on what you can get from this and a full understanding is outside the scope of this lesson. If you would like to learn more, PostgreSQL’s official website has a full explanation of [EXPLAIN](https://www.postgresql.org/docs/current/sql-explain.html).

For now, there are a few key things you should take note of. The first is the planner will specifically tell you how it is searching. If you see “Seq Scan” this means that the system is scanning every record to find the specific records you are looking for. If you see “Index” (in our examples more specifically “Bitmap Index Scan”) you know that the server is taking advantage of an index to improve the speed of your search.

The other part to take note of is the “Planning time” and “Execution time”. The planning time is the amount of time the server spends deciding the best way to solve your query, should it use an index, or do a full scan of the table(s) for instance. The execution time is the amount of time the actual query takes to run after the server has decided on a plan of attack. You need to take both of these into consideration, and when examining your own indexes these are critical to understanding how effective your indexes are.

## How to Build an Index

Now that we have talked about what an index is for, let us now build one ourselves.

In PostgreSQL, the `CREATE INDEX` keywords can be used to create an index on a column of a table. Say you wanted to create an index called `customers_user_name_idx` on the `customers` table on the `user_name` column, this is how you would do that:

```sql
CREATE INDEX customers_user_name_idx ON customers (user_name);
```

Keep in mind that indexes are great for searching but like everything in life, nothing comes without a cost. In the case of indexes, it comes at the cost of increased runtime for any modification to the table data impacting the `user_name` column. Another cost is the space that the index takes up. We will go into more detail on these issues later.

## Index Filtering

When you are building indexes, keep in mind that they will be used for filtering your data quickly. Queries that filter data often use `WHERE` and `ON` clauses. If an index is created on the columns referenced in these clauses, the database server will examine the index to see if it will improve the speed of the query.

Say you were asked to get the number of orders placed by each person with the last name of `'Smith'` or `'Jones'`, you could get that by running the following query.

```sql
SELECT
    c.first_name,
    c.last_name,
    COUNT(o.order_id) AS NumOforders
FROM customers       AS c
INNER JOIN orders    AS o    
ON o.customer_id = c.customer_id
WHERE c.last_name IN ('Smith', 'Jones')
GROUP BY c.first_name, c.last_name;
```

(Note: if the codeblock is hard to read, drag the boundary of this pane to make it wider.)

In this script, the `WHERE` clause is filtering the possible customers by the `last_name`. If there is an index on `customers.last_name` the database server will use this to quickly find the specific customers to examine.

Another filter in this query is the `INNER JOIN` between `orders` and `customers` on the `customer_id`. If there are indexes on these columns (one on `orders.customer_id` and another for `customers.customer_id`) they could also be searched faster using the respective indexes.

Filtering isn’t perfect and when you add on ANDs and ORs it can complicate the filtering. Often real-world queries can get very complicated joining multiple tables each with an `ON` clause which may or may not use an index and multiple possible clauses in the `WHERE`.

The server needs to process all of these and identify the best way to filter the information. Sometimes even if you have an index for the specific situation, the server might not use it. Testing is critical for the specific queries you are working with. However, this in-depth analysis is outside the scope of this lesson, but it is important you are aware of it.

## Multicolumn Indexes

What if you have two or more columns that are always associated together. Can you combine them to make a more appropriate index? Much like constraints, you can combine multiple columns together as a single index. When using multicolumn indexes, the search structure will be based on the values found in all of the columns.

For example, an index on First and Last Name might be a good idea if it is common to search by both together in your situation. Consider a table where the last names `'Smith'` and `'Johnson'` appear many times. Having another filter for the first name can help you find someone named `'Sarah Smith'` much faster.

The index is built in the specific order listed at creation, so (`last_name`, `first_name`) is different from (`first_name`, `last_name`). Keep this in mind when you are building your indexes as the order will impact the efficiency of your searches.

Say you want to find `'David'`, `'Rachel'`, and `'Margaret'` from the `first_name` column with the `last_name` of `'Smith'`. If there is an index (`last_name`, `first_name`), the server would find everyone with the last name `'Smith'` then in that much smaller group, find the specific first names you are searching for. If the index is (`first_name`, `last_name`) the server would go to each of the `first_name` records you are interested in and then search for the last name `'Smith'` within each one. In general, there isn’t a right or wrong order, it’s about what is appropriate for your setup and what you expect the index to be used for. If there is a good use for it, you could create both indexes as well! If both are present, when you run your script, the database server will determine which index to use based on your query. But remember, indexes take up space, so you shouldn’t always create every index you can think of.

Recall the way to create an index is:

```
CREATE INDEX <index_name> ON <table_name> (<column_name>);
```

For a multicolumn index you only need to list out each of the columns in the order you wish them to be used. So if we wanted to create an index called `customers_last_name_first_name_idx` for the `customers` table for the combination of `last_name` and `first_name` it would be written like this

```sql
CREATE INDEX customers_last_name_first_name_idx ON customers (last_name, first_name);
```

In theory, you could list as many columns as your table has. We will discuss later why, in most cases, this would not be a good use of an index.

As a note, you might hear a multicolumn index referred to by other names as well, such as Composite or Compound.

## Drop an Index

In PostgreSQL, the `DROP INDEX` command can be used to drop an existing index. We will soon go over why you might want to drop an index you have built, but for now, let’s learn the syntax to drop an index.

Say we want to drop the index `customers_city_idx`, Note that we pair the `DROP` statement with the optional `IF EXISTS` to protect from execution errors.

```sql
DROP INDEX IF EXISTS customers_city_idx;
```

We will get into some situations where you might want to drop an index you have already created in the following exercises. For now, though, you need to know how to drop them when appropriate.

## Why not Index every Column?

You might be asking yourself if indexes are so wonderful and help speed searches up, why not create an index on every column? The short answer is that everything has a cost. Indexes speed up searching and filtering, however, they slow down insert, update, and delete statements.

Let’s look at each in turn. The easiest to understand is how an index works with an insert statement. When you insert a record into a non-indexed table the database server simply adds the record(s) onto the end of the table. However, when we add a record to a table that has an index, the index itself must be modified by the server as well. Recall that at its core, an index is an organization of the data in a table. When new data is added, the index will be reshaped to fit that new data into its organization. This means that when you write a single statement to modify the records, the server will have to modify every index that would be impacted by this change. If you are adding a large amount of data to an existing table, it may be better to drop the index, add the data, and then recreate the index rather than having to update the index on each insertion.

Keep in mind that these drawbacks are for each index you have on your table. If you have multiple indexes on a single table and you insert a record, you will need to update each index associated with the table. This can make indexes very costly.

Updates and deletes have similar drawbacks. When deleting a record that is associated with an index, it might be faster to find the record — by leveraging the index’s ability to search. However, once the record is found, removing or editing it will result in the same issue as inserting a new record. The index itself will need to be redone. Note that if you’re updating a non-indexed column, that update will be unaffected by the index. So if you are updating a non-indexed column while filtering by one with an index, an update statement can actually be faster with an index.

The key to indexes is to plan on when an index will help you and stay away from them when they will get in the way.

## Why not Index every Column (cont)?

Another place where an index falls short of perfection is that indexes take up space. The index data structures can sometimes take up as much space as the table itself. If you have not worked with large databases before you might be thinking to yourself, “who cares, storage space is cheap nowadays”. However, databases of decent size can easily get into the gigabyte size range quickly.

This means every time your Database Administrator does a full backup, all of that information, indexes included, are copied. Also consider copying the database to a different environment for testing/development, or running your database on different servers and at different physical locations. All of that data goes across the internet and some companies pay for data usage across networks on their plans. If you then bloat your database size by creating an index on every column, you have compounded all these issues and expenses. Given the speed advantages indexes can provide when used properly, you should not ignore them, but keep in mind this balance.

If you wanted to examine the size of a table `products` you would run:

```
SELECT pg_size_pretty (pg_total_relation_size('products'));
```


## When should I add an Index?

You may be asking “When should I add an index to my database?” The simple answer is when the benefits of searching outweigh the burdens of storage size and Insert/Update/Delete speed. One thing to consider is whether searching will occur often enough to make the advantages worth the time and effort.

In the real world, this often becomes a grey area and one that you might have to go back to after trying for a while. You will want to look at what a table is used for and by who. As a very rough rule of thumb, think carefully about any index on a table that gets regular Insert/Update/Delete. In contrast, a table that is fairly stable but is searched regularly might be a good candidate for an index.

There are some other conditions that can impact your search times you should be aware of when using an index.

The higher the percentage of a table you are returning the less useful an index becomes. If we’re only searching for 1 record in 1,000,000, an index could be incredibly useful. However, if we are searching for 900,000 out of that same 1,000,000 the advantages of an index become useless. At higher percentages, the query planner might completely ignore your index and do a full table scan, making your index only a burden on the system.

Along this same line, if you are combining filtering conditions be aware of what you will be searching on. AND statements are normally fine and the query planner will try to use an indexed field before non-indexed fields to cut down on the total number of records needed to be searched. OR on the other hand, can be very dangerous; even if you have a single non-indexed condition, if it’s in an OR, the system will still have to check every record in your table, making your index useless.

For instance, if you have the following index on the `customers` table

```sql
CREATE INDEX customers_idx ON customers (last_name);
```

Then you ran the following two queries

```sql
EXPLAIN ANALYZE VERBOSE SELECT *
FROM customers
WHERE last_name = 'Jones'
  AND first_name = 'David';
EXPLAIN ANALYZE VERBOSE SELECT *
FROM customers
WHERE last_name = 'Jones'
  OR first_name = 'David';
```

The first would run in ~1ms, the second would take ~33ms (in a local version of the `customers` table with 100k records). Because the first one uses the index it can jump right to just the records with the `last_name = 'Jones'`. However, in the second with the OR, the index is useless since every record has to be searched anyway for any record with `first_name = 'David'`. The index is ignored and the system looks at every record once, checking both conditions.

------------

## Review

Indexes are powerful tools that when used properly can drastically improve the speed of your database queries, but when used carelessly can cause more harm than good. Like all powerful tools the user needs to be responsible and know what they are doing. Plan ahead, test your changes in small batches and don’t be afraid to go back and undo/change an index you have created if it isn’t giving you the improvement you were expecting.

We covered:

*   What an index is and how they function.
*   How to see what indexes exist on a table```
    
    ```sql
    SELECT *
    FROM pg_indexes
    WHERE tablename = '<table_name>';
    ```
    
*   `EXPLAIN ANALYZE` can be a powerful tool to see how your queries are impacted by an index.
*   How to build an index```
    
    ```sql
    CREATE INDEX <index_name> ON <table_name> (column_name);
    ```
    
*   Multicolumn indexes allow for more than one column to be used in combination as an index on a table```
    
    ```sql
    CREATE INDEX <index_name> ON <table_name> (<column_name1>, <column_name2>...);
    ```
    
*   You can drop an index. This might be useful to do if you are modifying a large number of records on an indexed table.```
    
    ```sql
    DROP INDEX IF EXISTS <index_name>;
    ```
    
*   To see the size of a database table you can run the script```
    
    ```sql
    SELECT pg_size_pretty (pg_total_relation_size('<table_name>'));
    ```
    
*   Some of the benefits and burdens of indexes:
    *   Increase in speed of searches/filtering
    *   Increase in storage space
    *   Increase in runtime for Insert/Update/Delete on impacted indexes.

&nbsp;
&nbsp;

-------------------


# Intermediate Indexes

## What Else Is There To Learn About Indexes?

Now that you have a good base of understanding of indexes let us dive deeper to explore in more detail how they work and how you can use them to improve the systems you work on.

In the previous lesson you learned about:

*   What an index is and how they function.
*   How to build an index.
*   How to drop an index.
*   Multicolumn indexes used to expand the power of your indexes.
*   Some of the benefits and burdens of indexes:
    *   Increase in speed of searches/filtering
    *   Increase in storage space
    *   Increase in runtime for Insert/Update/Delete on impacted indexes.

In this lesson you will learn about:

*   How to build a partial index
*   How to improve the speed of ordering data
*   The Relationship between:
    *   Primary keys and unique indexes
    *   Unique constraints and unique indexes.
*   How clustered and non-clustered indexes work.
*   Index-Only Scans
*   Combining indexes vs multicolumn indexes
*   Indexes based on expressions

Like in the previous lesson, we will at times be working with larger databases so some of your execution times on the site might be longer than you have experienced. Please be patient.

We will be working with the same `customers` table we did in the first lesson. As a refresher let us take a look at it again.

## Partial Index

Many times companies have two sets of users in their databases, internal and external users. The numbers in each category tend to be far apart from each other, for example, [Wells Fargo has 70 Million customers and 258 Thousand employees](https://en.wikipedia.org/wiki/Wells_Fargo). If you were trying to get information about your internal employees, searching through all 70 million records would be a waste when you are looking for a group of users making up about 0.37% of the total. Even with a good index, with this many users, you are wasting time examining far more records than you are interested in.

A potential solution to this problem would be to put the internal and external users in separate tables. Unfortunately, this opens a whole can of worms. Every time you wanted users you would need to consider both tables and when looking for both types you would have to `UNION` them together. Any changes to the tables would have to be done to both, and in all relevant references to both, doubling the effort and risk to any change. So then, what’s the solution? We can create a partial index.

A partial index allows for indexing on a subset of a table, allowing searches to be conducted on just this group of records in the table. So in our example, you would be searching an index of ~258 Thousand instead of 70+ Million. Think how powerful this addition to your index toolset can be if you find yourself working with massive databases.

So, how do you create one? All you have to do is create an index like you normally would with a WHERE clause added on to specify the subgroup of data your index should encompass. Let’s assume that in our example the users are stored in a `users` table and we want an index based on `user_name`. If we know that all internal employees have an `email_address` ending in `'@wellsfargo.com'`, we would write the partial index like this:

```sql
CREATE INDEX users_user_name_internal_idx ON users (user_name)
WHERE email_address LIKE '%@wellsfargo.com';
```

Notice that the filtering of the index does not have to be for a column that is part of your index.

## Order By

If you are commonly ordering your data in a specific way on an indexed column, you can add this information to the index itself and PostgreSQL will store the data in your desired order. By doing this, the results that are returned to you will already be sorted. You won’t need a second step of sorting them, saving time on your query.

To specify the order of an index, you can add on the order you want your index sorted in when you create the index. Say you have a `logins` table that tracks the `user_name` and `date_time` each time a login occurs. If you wanted to check to see who has been logging in recently to use your site you could run:

```sql
SELECT
    user_name,
    date_time
FROM logins
WHERE date_time >= (NOW() - INTERVAL'1 month')
ORDER BY date_time DESC;
```

If you were running this query regularly you could improve the speed by creating your index like this:

```sql
CREATE INDEX logins_date_time_idx ON logins (date_time DESC, user_name);
```

You could also use ASC to switch the direction. If your column contains NULLs you can also specify the order they appear by adding `NULLS FIRST` or `NULLS LAST` to fit your needs. By default, PostgreSQL orders indexes by ascending order with NULLs last, so if this is the order you desire, you do not need to do anything.

Another way to think of this is that every index we have created so far has had this ordering applied to it without you even knowing the server was doing this ordering.

## Primary Keys and Indexes

PostgreSQL automatically creates a unique index on any primary key you have in your tables. It will also do this for any column you define as having a unique constraint. A unique index, primary key, and unique constraint all reject any attempt to have two records in a table that would have the same value (multicolumns versions of these would reject any record where all the columns are equal).

Recall that to view any indexes already associated with a table, such as `products`, including the index automatically created by the system upon creation of a primary key, there is a system view you can query against.

```sql
SELECT *
FROM pg_Indexes
WHERE tablename = 'products';
```

As a note, the primary key index standard is to end in `_pkey` instead of `_idx` to identify it as a specific type of index. It is also the way the system names it when created automatically.

## Clustered Index

We learned in the previous lesson that an index is an organization of the data in a table. A table can have many indexes. To expand on this, all indexes are either a clustered index or a non-clustered index. For now, let’s focus on the clustered index. A clustered index is often tied to the table’s primary key.

When a clustered index is created for a table, the data is physically organized in the table structure to allow for improved search times. You can think of the clustered index like searching a dictionary. In a dictionary, the data (words) and all their related information (definition) are physically ordered by their index (words sorted alphabetically). Just like a dictionary, you can seek your word by quickly jumping to the letter in the alphabet the word you’re looking for starts with. Then, even within that letter, you can get a good idea how deep in that subset your word will probably be (`'bat'` will be near the front of the b’s while `'burgundy'` will be near the end).

![](https://content.codecademy.com/programs/data-engineering-postgres/indexes/Clustered.png)

(Note that you can expand this panel to make the image larger. Or visit [this link](https://content.codecademy.com/programs/data-engineering-postgres/indexes/Clustered.png)).

This is how the clustered index physically organizes the data in your table, reorganizing it to allow faster searches. Because it is physically organizing the data in the table, there can only be one clustered index per table. In the next exercise, we’ll look into how non-clustered indexes are different.

When the system creates, alters, or refreshes a clustered index, it takes all the records in your database table that are in memory and rearranges them to match the order of your clustered index, physically altering their location in storage. Then when you go to do your searches for records based on this index, the system can use this index to find your records faster.

Something to note that PostgreSQL does differently than other systems is that it does not maintain this order automatically. When inserting data into a table with a clustered index on other systems, those systems will place the new records and altered records in their correct location in the database order in memory. PostgreSQL keeps modified records where they are and adds new records to the end, regardless of sorting. If you want to maintain the order, you must run the `CLUSTER` command again on the index when there have been changes. This will “re-cluster” the index to put all of those new records in the correct place.

Because PostgreSQL does not automatically recluster on `INSERT`, `UPDATE` and `DELETE` statements, those statements might run faster than equivalent statements using a different system. The flip side of this coin though is that after time, the more your table is modified the less useful the cluster will be on your searches. Reclustering the table has a cost, so you will need to find a balance on when to recluster your table(s). There are tools that can be used to help you identify when this would be useful, but these tools fall outside of this lesson.

To cluster your database table using an existing index (say `products_product_name_idx`) on the `products` table you would use:

```sql
CLUSTER products USING products_product_name_idx;
```

If you have already established what index should be clustered on you can simply tell the system which table to apply the cluster on.

```sql
CLUSTER products;
```

And if you want to cluster every table in your database that has an identified index to use you can simply call

```sql
CLUSTER;
```


## Non-Clustered Index

You can create many indexes on a table, but only one can be a clustered index, so what about the rest? They are known as non-clustered indexes. Non-clustered indexes have records of the columns they are indexing and a pointer back to the actual data in the table. If you are searching for just the records in the non-clustered index, the system will simply seek for your query results and return them. When you search on a non-clustered index for more information than is in the indexed columns, there are two searches. The first to find the record in the index and another to find the record the pointer identifies. There are some things you can do, such as creating a multicolumn index, that in some cases can help cut down or eliminate the need for the look back to the main table in memory.

Previously we compared how a clustered index functions as a dictionary. You can think of all other indexes (non-clustered) more akin to an index in a book. The keywords you are looking for are organized (by type, alphabetically, by the number of appearances, etc) and can be found quickly. However, the index doesn’t contain information beyond that. Instead, it contains a pointer (page number, paragraph number, etc) to where the rest of the data can be found. This is the same way non-clustered indexes in databases work. You have a key that is sorted and a pointer to where to find the rest of the data if needed.

In the next exercise, we will go over ways that this pointer look back can be avoided altogether in some cases. For now, the main take away is that a clustered index contains all the information in your table and physically reorganizes the way it is stored in memory. A non-clustered index creates a key on the columns you indicate and a pointer back to the main table for any columns not part of the index.

![](https://content.codecademy.com/programs/data-engineering-postgres/indexes/non-clustered-v2.png)

Once again, if you would like to make this image bigger, you can expand this panel, or find the image [here](https://content.codecademy.com/programs/data-engineering-postgres/indexes/non-clustered-v2.png).


## Index-Only Scans

The lookup that a non-clustered index does back to the table after finding records has a cost. If referencing a small number of records this cost is negligible, however, it can add up if many records are needed. If all columns being used in a query are part of an index then no secondary lookup is done. Let’s examine the following multicolumn index.

```sql
CREATE INDEX customers_idx ON customers (last_name, first_name);
```

This will improve the speed when searching for customers by `last_name` and `first_name`. What happens when we frequently want to know the customers `email_address` as well? For each record found, it will use the index to find a pointer then look up the `email_address` matched to that record found in the index to return the `last_name`, `first_name`, and `email_address`. If you include the information that is regularly looked for, even if it isn’t used in the filtering, as part of the index, a secondary search can be avoided. So in this example, you could add `email_address` as another column in the index to prevent the lookup step. Remember the order the columns are in when creating the index should be whatever is most useful for your particular situation for searches and filtering.

## Combining Indexes

Previously we went over multicolumn indexes as a way PostrgeSQL can speed searches on multicolumn filtering, but if you don’t have an appropriate single index for a query, the server can combine indexes together to speed the filter.

Like anything automatically handled by a system, there are some things to keep in mind when using this convenience.

*   A single multicolumn index is faster (if ordered well) than combining indexes.
*   A multicolumn index is less efficient than a single index in cases where a single index is needed.
*   You could create all of them, then the server will try to use the best one in each case, but if they are all not used relatively often/equally then this is a misuse of indexes.

Take for example, searching for `first_name` and `last_name` in the `customers` table.

*   If searches are most often for only one of the columns, that should be your index.
*   If searches are most often `last_name` and `first_name` then you should have a multicolumn index.
*   If the searches are frequent and evenly spread among; `first_name` alone, `last_name` alone, and the combination of the two, that is a situation where you would want to have all three indexes.

## Indexes Based On Expressions

An index is not limited to just a column reference, it can use the result of a function or scalar expression computed from one or more columns.

For example, if you want to ensure the `company_name` in a `manufactures` table is unique, you can add the `UNIQUE` option to make a unique index constraint on the results on your index. Any duplicate will then be rejected. Using `UNIQUE` here tells the system that your index also needs to be a constraint and only allow one record in the system that matches the criteria for your index. In other words, by creating an index with `UNIQUE` the system will automatically create the constraint to match the logic in the index at the same time. Just like the creation of a constraint, if you try to create an index in this way where the data already in the table does not pass, the system will reject your creation and notify you of the issue.

Let’s look at our `UNIQUE` example a bit more. In PostgreSQL, `'ExampleCompany'` is NOT the same thing as `'examplecompany'` even though we would probably want to reject this as a duplicate. You can add a function on your index to convert all your `company_name` data to lower case by using `LOWER`. This ensures that `'ExampleCompany'` would be considered the same as `'examplecompany'`. This combination of the `UNIQUE` constraint and the use of the function `LOWER` would look like this:

```sql
CREATE UNIQUE INDEX unique_manufacture_company_name_idx ON manufacture(LOWER(company_name));
```

These special indexes compound the pros and cons of indexes. Because the results of the expression are stored in the index, it saves the search function from having to perform it on every row on future searches. However, every change in the table data that impacts the index means it has to do the expression again, making Inserts and Updates more expensive on these indexes than a basic index. Be especially thoughtful about when to use indexes that use functions or expressions.

## Review

Indexes are very powerful tools and as a database engineer you have a lot of options on their implementation. With that customizability you have to be mindful not to misuse indexes. Make sure to carefully consider the indexes that you create in your database and don’t forget to review them to ensure continued benefit all around.

We covered:

*   How to build a partial index```
    
    ```sql
    CREATE INDEX <index_name> ON <table_name> (<column_name>)
    WHERE <condition>;
    
    
    ```
    
*   How to improve the speed of ordering data
*   The Relationship between:
    *   Primary keys and unique indexes
    *   Unique constraints and unique indexes.
*   What a clustered index is and how to refresh one```
    
    ```sql
    CLUSTER <table_name> USING <index_name>;
    
    
    ```
    
*   How non-clustered indexes work.
*   Index-only scans
*   Combining indexes vs multicolumn indexes
*   Indexes based on expressions```
    
    ```sql
    CREATE INDEX <index_name> ON <table_name>(<EXP>(<column_name>));
    
    
    ```
    