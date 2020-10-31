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

![benefit-of-indexes](/home/sanjibpoon/Downloads/download.png)
