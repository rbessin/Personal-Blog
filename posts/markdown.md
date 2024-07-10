---
title: How to use Markdown?
subtitle: The details and examples for how to use markdown.
date: 2024-06-29T11:00:00Z
update: 2024-06-30
tags: 
  - general
---

## Headings

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

## Text

This is an example of **bold text**

This is __also bold text__

This is an example of *italicised* text

This is _also italicised text_

This is ***bold and italicised text***

> This is a  
> Blockquote

All of the bold & italic entries above are examples of paragraphs.

A `<br />` can be created by entering 2 spaces  
at the end of a line

## Ordered Lists

1. First item
2. Second item
3. Third item
4. Fourth item

### Numbers don't matter

As long as the first is a 1

1. First item
9. Second item
1. Third item
9. Fourth item

## Unordered lists

- First item
- Second item
- Third item
- Fourth item

## Mixtures

1. First item
2. Second item
3. Third item
    - First indented item
    - Second indented item
4. Fourth item

## Adding images

The syntax shown below assumes a file called *logo.png* will be rendered by a Next.js app with the file in question stored in the `public/images` folder.

![example image](/public/images/next.svg)

## Links

Links are also structured using a combination of square brackets and parentheses. The square brackets hold the text that will appear in the document; the path to the linked resource goes between the parentheses.

[Link to Wikipedia](https://www.wikipedia.org/wiki/Main_Page)