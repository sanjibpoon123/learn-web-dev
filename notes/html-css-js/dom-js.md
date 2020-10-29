# JavaScript and the DOM

## What is the DOM?

The *Document Object Model*, abbreviated DOM, is a powerful tree-like structure that allows programmers to conceptualize hierarchy and access the elements on a web page.

The DOM is one of the better-named acronyms in the field of Web Development. In fact, a useful way to understand what DOM does is by breaking down the acronym but out of order:

* The DOM is a logical tree-like **M**odel that organizes a web page’s HTML **D**ocument as an **O**bject.

**Note**: There are other types of documents, such as XML and SVG, that are also modeled as DOM structures.

The DOM is a *language-agnostic structure* implemented by browsers to allow for web scripting languages, like JavaScript, to access, modify, and update the structure of an HTML web page in an organized way.

For this reason, we like to think of the DOM as the link between an HTML web page and scripting languages.

&nbsp;
&nbsp;

## The DOM as a Tree Structure

The DOM tree follows similar logic to that of a family tree. A family tree is made up of family members and their relationships to the family name. In computer science, we would call each family member a *node*.

We define a **node** as an intersecting point in a tree that contains data.

In the DOM tree, the top-most node is called the **root node**, and it represents the HTML document.

A **parent node** is the closest connected node to another node in the direction towards the root.

A **child node** is the closest connected node to another node in the direction away from the root.
