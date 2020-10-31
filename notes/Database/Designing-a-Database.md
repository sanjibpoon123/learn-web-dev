# Designing a Database:

# What Is A Database Schema?

## Introduction

Welcome! In this lesson, you will learn what a database schema is and how to create one with PostgreSQL. PostgreSQL is a popular database management system that stores information on a dedicated database server instead of on a local file system. The benefits of using a database system include better organization of related information, more efficient storage and faster retrieval.

Like an architectural blueprint, a database schema is documentation that helps its audience such as a database designer, administrator and other users interact with a database. It gives an overview of the purpose of the database along with the data that makes up the database, how the data is organized into tables, how the tables are internally structured and how they relate to one another.

When designing a database schema consider the following steps:

*   Define the purpose of your database
*   Find the information that make up the database
*   Organize your information into tables
*   Structure your tables into columns of information
*   Avoid redundant data that leads to inaccuracy and waste in space
*   Identify the relationships between your tables and implement them

The last two items ensure data accuracy and integrity anytime you need to add or update information in the database. It also makes querying the database much more efficient.

You can design database schemas by hand or by software. Here are a few examples of free online database design tools:

*   [DbDiagram.io](http://dbdiagram.io) \- a free, simple tool to draw ER diagrams by just writing code, designed for developers and data analysts.
*   [SQLDBM](http://sqldbm.com/home) \- SQL Database Modeler
*   [DB Designer](http://dbdesigner.net) \- online database schema design and modeling tool

On the right is a sample database schema diagram generated from DbDiagram.io. Let’s take a look at what it entails.

The purpose of this database is to maintain a book inventory. The information in the database is organized into four tables and they are `book`, `chapter`, `author`, and `book_list`. What data are we storing about a book? What is the `book_list` table used for?

In this particular schema diagram, the symbols `1` and `*` on the lines denote a one-to-many relationship between these tables:

*   `book` and `chapter`
*   `book` and `book_list`
*   `author` and `book_list`

We will delve into relationships in more detail in a later lesson.

Different database tools illustrate table relationships with different symbols.

Your database schema should contain the following:

*   table names
*   column names per table
*   column types per table
*   constraints per table, if any
*   relationships between tables, if any


![](https://content.codecademy.com/programs/data-engineering-postgres/designing-a-database-schema/book_chap_auth_booklist.png)

In this lesson, we will focus mainly on the first three items. In subsequent lessons, we will address constraints and relationships.

## Identifying Your Tables

In this exercise, we are going to delve into designing our own database schema. The purpose of our database is to enable an online bookstore to show its catalog of books to potential buyers and for a buyer to preview sample chapters for a selected book. Imagine you are book browsing on Amazon.com.

After gathering information for this database, we found that our database should have:

*   book information which includes title, isbn, number of pages, price, description, and publisher for an overview of the book
*   author information which includes author bio and contact
*   book chapter information which includes chapter number, chapter title and chapter content that is available for online previewing

As you can see, there is quite a lot of information to maintain in our database. The next step would be to organize the information in our database into tables.

Take a look at a sample row below if we decide to store all our information in a single table. For the sake of space, we made the chapter information very small and unrealistic. If you would like to make this image bigger, you can expand this panel, or find the image [here](https://content.codecademy.com/programs/data-engineering-postgres/designing-a-database-schema/table_for_narrative_books.png).

![](https://content.codecademy.com/programs/data-engineering-postgres/designing-a-database-schema/table_for_narrative_books.png)

From the information provided, does it make sense to organize our data in one table? Is the table easy to use as is? Does it have too many columns covering different topics?

What makes up the bulk of this table? You are correct if you guess it’s the chapter content. The chapter content is useful when a potential buyer wants to preview a book. But not all books make their content available to the public. In such a case, the chapter content columns will be empty. To make this table easier to use, storing the chapter content in its own table makes more logical sense. This would also make the current table more lightweight and manageable. Therefore, we should restructure this table so that chapter-related information resides in its own table.

Now we are left with a table containing just book and author information. What if we are interested in contacting an author without needing to know what books they write? Would it make sense to consult this table which always links a book to its author? Or would it make more sense to keep the author information separate as well? The answer is ‘yes’ to the latter question.

Let’s practice organizing information by identifying tables in the following exercises.

## Creating Your Tables

Once we have identified our tables for our schema, the next step is to declare what should be in our tables. A database table is made up of columns of information. Each column is assigned a name and data type. You can see this information represented in the schema diagram from exercise 1.

To create a table in PostgreSQL, we would use the following SQL syntax:

```sql
CREATE TABLE person (
  first_name varchar(15),
  last_name varchar(15),
  age integer,
  …
  ssn char(9)
);
```

In this example, the table name is `person`, and its column names include `first_name`, `last_name` and `ssn`. You can think of a column name representing a property, attribute or field in the table. The naming convention that we are using for this course in defining PostgreSQL tables is snake case, which uses lower case letters with underscores between words for columns and table names.

Each column name is associated with a column type which is a data type such as numeric, character, boolean or other interesting types. Here is a summary of common data types, what they represent, their sample values and how they display on Postgres:

| Data Type | Representation | Value | Display |
| --- | --- | --- | --- |
| integer | whole number | 617 | 617 |
| decimal | floating-point number | 26.17345 | 26.17345 |
| money | fixed floating-point number with 2 decimal places | 6.17 | $6.17 |
| boolean | logic | TRUE, FALSE | t, f |
| char(n) | fixed-length string removes trailing blanks | ‘123 ‘ | ‘123’ |
| varchar(n) | variable-length string | ‘123 ‘ | ‘123 ‘ |
| text | unlimited-length string | ‘123 ‘ | ‘123 ‘ |

What Is A Database Schema?

Querying Your Tables

Now that we have defined our three tables, `book`, `chapter` and `author`, let’s populate our tables with sample data and make queries.

To insert data into a PostgreSQL table, use this syntax:

```sql
INSERT INTO table_name VALUES (
  column_one_value,
  column_two_value,
  …
  column_N_value
);
```

To query a table to return all the columns, type:

```sql
SELECT * from table_name;
```

In order to have a useful schema, we need to prevent a database table from storing inaccurate data and returning multiple rows when we expect only one. We do this by constraining the table with the help of a primary key assigned to one or more columns. This will ensure that the column or combination of columns contains only unique values. We will explore this topic further in a subsequent lesson on keys.

## Relationships Between Tables

You may remember from the diagram in Exercise 1, that the database tables are connected by lines. The lines connecting the tables depict the relationships between them. For instance, the `book` table is related to two other tables - `chapter` table and the `book_list` table, via related columns - `isbn` and `book_isbn`.

Let’s say we have a `person` table and an `email` table, where a person can have many email addresses, but an email address can only belong to one person. To implement this type of relationship, we need to apply a constraint on the `email` table by adding another column to it and designating it to associate with the `person` table.

Let’s say we have a `hobby` table as well and populate it with all kinds of hobbies. If we try to query both the `hobby` and `person` tables, how do we know for sure that a hobby is tied to a particular person? There is nothing in the `person` table that links it to a hobby.

To associate a hobby with a person, we need to relate the `person` table to the `hobby` table with the type of relationship they have. Can a person have only one hobby or multiple hobbies? Can a hobby apply to only one person or can it be shared by multiple people?

We will discuss these interesting relationships between tables and how to implement them in subsequent lessons about keys and relationships. So far, the tables that you have created are stand alone tables that are unrelated to one another. Let’s see if we can relate the tables in this schema in the following exercises.

---------------

## Review

Nice work! In this lesson, you have accomplished the following:

*   You have learned what a database schema is.
*   You have learned how to go about designing a database schema.
*   You have learned how to organize data in a database through tables.
*   You have learned how to define a table in Postgres.
*   You have learned about data types supported in Postgres.
*   You have successfully created the tables: `book`, `chapter` and `author` in Postgres for your schema.
*   You have populated the schema you created with sample data and validated it through querying.
*   You have learned that your current schema is incomplete.
*   You have thought about how the tables you created can relate to each other.

&nbsp;
&nbsp;

--------------

# What Are Database Keys?

## Introduction

A database schema gives an overview of the purpose of the database along with the data that makes up the database, how the data is organized into tables, how the tables are internally structured and how they relate to one another.

Suppose we have successfully created a database schema for a book inventory with three standalone tables - `book`, `chapter` and `author`. See image on the right pane.

The `book` table has these columns:

*   `title` for the book title, a `varchar` of 100 characters
    
*   `isbn` for the book isbn, a `varchar` of 50 characters
    
*   `pages` for the number of pages in the book, an `integer`
    
*   `price` for the book price, a `money` type
    
*   `description` for the book description, a `varchar` of 256 characters
    
*   `publisher` for the book publisher name, a `varchar` of 100 characters
    
    The `chapter` table has these columns:
    
*   `id` for a unique chapter identifier, an `integer`
    
*   `number` for chapter number, an `integer`
    
*   `title` for the chapter title, a `varchar` of 50 characters
    
*   `content` for the chapter content, a `varchar` of 1024 characters.
    

The `author` table has these columns:

*   `name` for author name, a `varchar` of 50 characters
*   `bio` for author bio, a `varchar` of 100 characters
*   `email` for author email, a `varchar` of 20 characters

Because our database tables are not yet related to one another, our book schema is not complete until we fine-tune it by providing additional structure. In this lesson, we will learn how to designate certain columns of a database table as keys.

What are keys? A database key is a column or group of columns in a table that uniquely identifies a row in a table.

Why do we need keys? Keys enable a database designer to place constraints on the data in a table. We want to enforce data integrity in our tables so that we avoid duplicity of information and strictly maintain relationships between tables. For example, a primary key will ensure that each row in a table is unique.

There are many types of keys: Super, Candidate, Primary, Foreign, Composite, and Secondary. In this course we will focus on primary, foreign and composite keys as these are the most commonly used. 

![](https://content.codecademy.com/programs/data-engineering-postgres/designing-a-database-schema/book_chap_auth.png)


## Primary Key

A primary key is a designation that applies to a column or multiple columns of a table that uniquely identifies each row in the table. For example, a Social Security Number for an employee may serve as a primary key in an employee table with rows of employee data.

Designating a primary key on a particular column in a table ensures that this column data is always unique and not null. For example, there may be multiple recipes of the same name, each with its own id but no two recipes should share the same id.

To designate a primary key in a table, type the `PRIMARY KEY` keyword in all caps next to the selected column when creating a table. For example, the following code designates the `id` column as the primary key for the `recipe` table.

```sql
CREATE TABLE recipe (
  id integer PRIMARY KEY,
  name varchar(20),
  ...
);

```

## Key Validation

In this lesson, you will learn how to validate the keys that you have designated to specific column(s) in a database table. There are several ways to do so, however, we will focus on utilizing the information schema database that comes with PostgreSQL.

#### Information Schema

As part of an international SQL standard, the [information schema](https://www.postgresql.org/docs/9.1/information-schema.html) is a database containing meta information about objects in the database including tables, columns and constraints. This schema provides users with read-only views of many topics of interest.

For example, to determine if a column has been designated correctly as a primary key, we can query a special view, `key_column_usage`, generated from this database. This view identifies all columns in the current database that are restricted by some constraint such as primary key or foreign key.

Suppose you would like to find out the constraints that have been placed on certain columns in a table, such as `recipe`, you would type the following query.

```sql
SELECT
  constraint_name, table_name, column_name
FROM
  information_schema.key_column_usage
WHERE
  table_name = 'recipe';
```

This should display the following output:

```sql
 constraint_name | table_name | column_name 
-----------------+------------+-------------
 recipe_pkey     | recipe     | id
(1 row)
```

The `constraint_name` value, such as `recipe_pkey`, is generated by default to begin with a table name followed by the type of constraint. `pkey` refers to a primary key constraint, while `fkey` refers to a foreign key constraint.

## Composite Primary Key

Sometimes, none of the columns in a table can uniquely identify a record. When this happens, we can designate multiple columns in a table to serve as the primary key, also known as a composite primary key. For example, we have a table, `popular_books` that contains the most popular books previewed and/or sold in a particular week.

`popular_books` will have these columns:

*   book_title,
*   author_name,
*   number_sold
*   number_previewed

Since an author can have many books and a book can have many authors, there could be repeated listings of a particular book or author in the table.

For example, a listing of `popular_books` sorted by book title may show the following:

```sql
 book_title      | author_name | number_sold | number_previewed 
----------------------+-------------+-------------+------------------
 Postgres Made Easy   | Liz Key     |          33 |               50
 Postgres Made Easy   | Tom Index   |          33 |               50
 Beginner Postgres    | Tom Index   |          55 |               75
 Postgres for Dummies | Liz Key     |          25 |               33
```

In the above example, the book title `Postgres Made Easy` is listed twice since it has two authors. If we list `popular_books` by author name, we may find an author appearing twice such as the following:

```sql
 author_name |      book_title      
-------------+----------------------
 Liz Key     | Postgres Made Easy
 Liz Key     | Postgres for Dummies
 Tom Index   | Postgres Made Easy
 Tom Index   | Beginner Postgres
```

As we see from above, neither `book_title` nor `author_name` can be a unique column. A composite primary key, however, can be derived from the combination of both `book_title` and `author_name` that would make a row unique.

To designate multiple columns as a composite primary key, use this syntax:

```sql
PRIMARY KEY (column_one, column_two)
```

For example, if we were to designate both `recipe_id` and `ingredient_id` as the composite primary key for the `popular_recipes` table, we would write the `CREATE TABLE` statement for `popular_recipes` as follows.

```sql
CREATE TABLE popular_recipes (
  recipe_id varchar(20),
  ingredient_id varchar(20),
  downloaded integer,
  PRIMARY KEY (recipe_id, ingredient_id)
);
```
What Are Database Keys?

Foreign Key Part 1

When we have a situation where one table is related to another table in a database, we may want to bind those tables back together in a query. For example, let’s say we have a `person` table and an `email` table. If we want a list of names and associated emails, we would need to join these tables together.

To maintain data integrity and ensure that we can join tables together correctly, we can use another type of key called a foreign key. A foreign key is a key that references a column in another table.

Where do we place this foreign key? Should it be in the `person` table or `email` table? To answer this question, we need to figure out how `person` is related to `email`. Does creating a `person` record require that an `email` record exists as well? This is not usually the case. A person can have no email address or one or more email addresses. So when creating a record in the `person` table, we don’t insist that this person should have a record in the `email` table as well.

Does creating an `email` record require that a valid `person` record exists? This is usually the case, since we shouldn’t create an email address for a non-existent person. Hence, we should place the foreign key in the `email` table to ensure that a valid record in the `person` table must pre-exist before adding a record in the `email` table.

In the illustration below, the foreign key is `person_id` in the `email` table.

![](https://content.codecademy.com/programs/data-engineering-postgres/designing-a-database-schema/person_email.png)

To designate a foreign key on a single column in PostgreSQL, we use the `REFERENCES` keyword:

```sql
CREATE TABLE person (
  id integer PRIMARY KEY,
  name varchar(20),
  age integer
);
CREATE TABLE email (
  email varchar(20) PRIMARY KEY,
  person_id integer REFERENCES person(id),
  storage integer,
  price money
);
```


## Foreign Key Part 2

Now that you have related two tables together via a foreign key, you have ensured that you can correctly join the tables back together in a query.

For example, suppose that we want to join the `person` and `email` tables from the following schema back together:

![](https://content.codecademy.com/programs/data-engineering-postgres/designing-a-database-schema/person_email.png)

We could use the following query to return a table of names and associated emails:

```sql
SELECT person.name AS name, email.email AS email
FROM person, email
WHERE person.id = email.person_id;
```

--------------

# Review

Nice work! In this lesson, you have accomplished the following:

*   You have learned about keys in a database and why they are important.
*   You have created primary keys in the book schema and verified them.
*   You have created a composite primary key in a new table, `popular_books`, in the schema and verified it.
*   You have created a foreign key in the `chapter` table in the schema and verified it.
*   You have run queries from both `book` and `chapter` tables to validate the functions of primary and foreign keys.
*   You have learned how to use the `key_column_usage` view from the `information_schema` database to validate the existence of designated keys to columns.
*   You have improved your overall book schema, uploaded it and verified it in the database.

&nbsp;
&nbsp;

-------------------------------

# What Are Database Relationships?

## Introduction

In this lesson, we will learn about relationships between tables and how to use this knowledge to enhance our database. This lesson is built upon prior knowledge of database keys in the [Database Keys lesson](https://www.codecademy.com/content-items/f1d38fdbf33d6a8aebd30dd0577206d2).

On the right is a sample database schema diagram. Let’s take a look at what it entails. There are seven tables in this diagram and most of them are related to each other with the exception of a standalone table, `popular_books`. In each table, primary keys are bolded. The lines between tables connect foreign keys and primary keys.

What are relationships? A database relationship establishes the way in which connected tables are dependent on one another.

What are the different types of database relationships? There are three types: one-to-one, one-to-many and many-to-many. We will delve into each one in the upcoming exercises. Let’s get started.

![](https://content.codecademy.com/programs/data-engineering-postgres/designing-a-database-schema/books_large.png)


## One-to-One Relationship

In a one-to-one relationship, a row of table A is associated with exactly one row of table B and vice-versa. For example, a person may only have one passport assigned to them. Conversely, a passport may only be issued to one person. A car may only have one vehicle identification number assigned to it and vice-versa. A driver may only have one driver’s license issued to them in their home state.

Let’s elaborate on the last example further. Let’s say we have a `driver` table with the following columns:

*   `name`
*   `address`
*   `date_of_birth`
*   `license_id`

We also have a `license` table with the following columns:

*   `id`
*   `state_issued`
*   `date_issued`
*   `date_expired`

In the `driver` table, the primary key that uniquely identifies a driver would be the `license_id`. Similarly, the primary key that uniquely identifies a driver’s license in the `license` table would be the `id` itself. To establish a one-to-one relationship in PostgreSQL between these two tables, we need to designate a foreign key in one of the tables. We can pick the `license_id` from `driver` to be the foreign key in the `license` table. However, doing this is not enough to ensure that duplicate rows will not exist in the `license` table.

To enforce a strictly one-to-one relationship in PostgreSQL, we need another keyword, `UNIQUE`. By appending this keyword to the declaration of the foreign key, we should be all set.

```sql
license_id char(20) REFERENCES driver(license_id) UNIQUE
```

![](https://content.codecademy.com/programs/data-engineering-postgres/designing-a-database-schema/license_driver.png)

The full PostgreSQL script for creating these two tables is as follows:

```sql
CREATE TABLE driver (
    license_id char(20) PRIMARY KEY,
    name varchar(20),
    address varchar(100),
    date_of_birth date
);      
CREATE TABLE license (
    id integer PRIMARY KEY,
    state_issued varchar(20),
    date_issued date,
    date_expired  date,
    license_id char(20) REFERENCES driver(license_id) UNIQUE
); 
```

## One-to-Many Relationship

As opposed to one-to-one, a one-to-many relationship cannot be represented in a single table. Why? Because there will be multiple rows that need to exist for a primary key and this will result in redundant data that breaks the constraint placed upon a primary key.

For example, consider a table where we want one person to be able to have many email addresses. However, if there is a primary key in the table, such as `id`, the following rows will be rejected by the database.

```sql
name   id (PK)     email       
Cody   2531       cody@yahoo.com 
Cody   2531       cody@google.com
Cody   2531       cody@bing.com


```

To resolve this, we need to represent a one-to-many relationship with two tables - a parent and a child table. Analogous to a parent-child relationship where a parent can have multiple children, a parent table will house a primary key and the child table will house both primary and foreign keys. The foreign key binds the child table to the parent table.

The following illustration shows the one-to-many relationship between `person` and `email` tables. ![](https://content.codecademy.com/programs/data-engineering-postgres/designing-a-database-schema/person_email.png)


## Many-to-Many Relationship

Consider the following examples of many to many relationships:

*   A student can take many courses while a course can have enrollments from many students.
*   A recipe can have many ingredients while an ingredient can belong to many different recipes.
*   A customer can patronize many banks while a bank can service many different customers.

In each of the above examples, we see that a many-to-many relationship can be broken into two one-to-many relationships.

To implement a many-to-many relationship in a relational database, we would create a third cross-reference table also known as a join table. It will have these two constraints:

*   foreign keys referencing the primary keys of the two member tables.
*   a composite primary key made up of the two foreign keys.

Let’s elaborate on this further with the recipe and ingredient many-to-many relationship. Let’s say a `recipe` table has the following columns:

*   `id` (primary key)
*   `name`
*   `serving_size`
*   `preparation_time`
*   `cook_time`

An `ingredient` table has the following columns:

*   `id` (primary key)
*   `name`
*   `amount`

A third cross-reference table, `recipes_ingredients`, will support the following columns:

*   `recipe_id` (foreign key referencing `recipe` table’s `id`)(primary key)
*   `ingredient_id` (foreign key referencing `ingredient` table’s `id`) (primary key)

Both `recipe_id` and `ingredient_id` also serve as a composite primary key for `recipes_ingredients`.

![](https://content.codecademy.com/programs/data-engineering-postgres/designing-a-database-schema/recipe_ingredient_recing.png)
 Many-to-many relationship database schema

-------------
## Review

Well done! In this lesson, you have accomplished the following:

*   You learned about one-to-one relationship, created a new table, `book_details` to show its one-to-one correspondence with `book` and vice-versa, and imported dummy data and ran queries to validate the keys in the table.
*   You learned about one-to-many relationship, created a new table, `page` to show a one-to-many relationship between `chapter` and `page`, imported sample data and ran queries to validate the relationship.
*   You learned about many-to-many relationship, created a cross-reference table, `books_authors`, to bind both `book` and `author` into a many-to-many relationship, populated the table and ran queries to validate the relationship.

At this point, you have designed a solid book database schema that you can be proud of. If you were to import your schema into a database design software, you might have a schema diagram like the one on the right. Does it meet the requirements of a well-defined schema?

Are you able to do the following for your schema?

*   Name the tables in your schema.
*   Name the column names and types for each table in the schema.
*   Name the constraints for each table.
*   Name the relationships between tables.
