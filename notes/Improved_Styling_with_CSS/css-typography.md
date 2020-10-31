# CSS Typography

## Typography

In this lesson, we’ll focus on _typography_, the art of arranging text on a page. In particular, we’ll look at how to style fonts with CSS to make them legible and appealing and how to add external fonts to your web pages.

Some of the most important information a user will see on a web page will be textual. Styling text to make page content accessible and engaging can significantly improve user experience. Let’s begin!

## Font Family

If you’ve ever used a formatted word processor, chances are that you probably also used a feature that allowed you change the “type of font” you were typing in. The phrase “type of font” refers to the technical term [typeface](https://en.wikipedia.org/wiki/Typeface), or _font family_.

To change the typeface of text on your web page, you can use the `font-family` property.

```css
h1 {
  font-family: Garamond;
}
```

In the example above, the font family for all main heading elements has been set to `Garamond`.

When setting typefaces on a web page, keep the following points in mind:

1.  The font specified in a stylesheet must be installed on a user’s computer in order for that font to display when a user visit the web page. We’ll learn how to work around this issue in a later exercise.
    
2.  You’ve probably noticed that we haven’t been specifying a typeface in previous exercises of this course. How exactly does the browser know what typeface to use when displaying the web page? The default typeface for many browsers is [Times New Roman](https://en.wikipedia.org/wiki/Times_New_Roman). You may be familiar with this typeface if you have ever used a formatted word processor.
    
3.  It’s a good practice to limit the number of typefaces used on a web page to 2 or 3.
    
4.  When the name of a typeface consists of more than one word, it must be enclosed in double quotes (otherwise it will not be recognized), like so:
    

```css
h1 {
  font-family: "Courier New";
}
```

## Font Weight

You’ve probably noticed **bold** text in websites you use, especially in news or text-heavy sites. It’s common to bold important headings or keywords. In CSS, we can style bold text with the `font-weight` property.

If we want to `bold` text in a web page, we can set the `font-weight` to `bold`.

```css
p {
  font-weight: bold;
}
```

If we want to ensure that text is not bold, we can set the `font-weight` to `normal`.

```css
p {
  font-weight: normal;
}
```

By default, the `font-weight` of most text elements is set to `normal`. Some elements, like headers, have built-in bold styling. A good approach is to check to see if the text element has any default styling, and use the `font-weight` property accordingly.

## Font Weight II

The `font-weight` property can also be assigned a number value to style text on a numeric scale ranging from 100 to 900. Valid values are multiples of 100 within this range such as `200` or `500`.

When using numeric weights, there are a number of default font weights that we can use:

1.  `400` is the default `font-weight` of most text.
2.  `700` signifies a bold `font-weight`.
3.  `300` signifies a light `font-weight`.

Let’s take a look at an example of how numeric fonts are used.

```css
header {
  font-weight: 800;
}
footer {
  font-weight: 200;
}
```

Here, the header would appear as a deep bold, while the footer would appear rather light.

It’s important to note that not all fonts can be assigned a numeric `font-weight`. You can look up the font you are using to see which `font-weight` values are available.

## Font Style

You can also italicize text with the `font-style` property.

```css
h3 {
  font-style: italic;
}
```

The `italic` value causes text to appear in italics. The `font-style` property also has a `normal` value which is the default.

## Word Spacing

You can also increase the spacing between words in a body of text, technically known as _word spacing_.

To do so, you can use the `word-spacing` property:

```css
h1 {
  word-spacing: 0.3em;
}
```

Note that it’s good to use [`em` values](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size#Ems) in this case because `em` is dynamic — for word spacing, it sets the spacing based on the size of the font. In the example above, the word spacing is set to `0.3em`. The default amount of space between words is usually `0.25em` and can be set with the value `normal`. If you provide a value for `word-spacing` that’s **not** `normal`, then the value you provide is **added** to the default spacing. Therefore, since the `word-spacing` is set to `0.3em`, your `<h1>` elements get a total of `0.55em` word spacing when rendered.

It’s not common to increase the spacing between words, but it may help enhance the readability of bolded or enlarged text.

## Letter Spacing

You’ve learned how to increase the spacing between lines of text and words, but it’s possible to get even more detailed: increasing the spacing between individual letters.

The technical term for adjusting the spacing between letters is called _tracking_. Tracking can be adjusted with the `letter-spacing` property in CSS.

```css
h1 {
  letter-spacing: 0.3em;
}
```

Like word spacing, it’s not common to increase the tracking in text, but sometimes it enhances the readability of uppercase text.

## Text Transformation

Text can also be styled to appear in either all uppercase or lowercase with the `text-transform` property.

```css
h1 {
  text-transform: uppercase;
}
```

The code in the example above formats all `<h1>` elements to appear in `uppercase`, regardless of the case used for the heading within the HTML code. Alternatively, the `lowercase` value could be used to format text in all lowercase.

Since text can be directly typed in all uppercase or lowercase within an HTML file, what is the point of a CSS rule that allows you to format [letter case](https://en.wikipedia.org/wiki/Letter_case)?

Depending on the type of content a web page displays, it may make sense to always style a specific element in all uppercase or lowercase letters. For example, a website that reports breaking news may decide to format all `<h1>` heading elements such that they always appear in all uppercase, as in the example above. It would also avoid uppercase text in the HTML file, which could make code difficult to read.

## Text Alignment

No matter how much styling is applied to text (typeface, size, weight, etc.), text always appears on the left side of the browser.

To move, or align, text, we can use the `text-align` property.

```css
h1 {
  text-align: right;
}
```

The `text-align` property can be set to one of the following three values:

1.  `left` \- aligns text to the left hand side of the browser.
2.  `center` \- centers text.
3.  `right` \- aligns text to the right hand side of the browser.

Later in the course, you’ll learn exactly how the browser positions HTML elements by default, which will help you understand how the browser “aligns” text, since “align” is a relative term. For now, it’s enough to know that text can be moved to the left, center, or right side of the web page.

## Line Height Anatomy

Another property that we can set for text is `line-height`. This property modifies the _leading_ of text.

The [diagram](https://content.codecademy.com/courses/updated_images/htmlcss1-diagram__leading_updated_1-01.svg) to the right helps illustrate exactly what the terms “leading” and “line height” mean.



## Line Height

We often modify `line-height` to make text on a web page easier to read. When text is styled to appear larger, the vertical spacing between lines of text can decrease, creating text that is difficult to read, particularly in paragraphs.

We can use the `line-height` property to set how tall we want the line containing our text to be, regardless of the height of the text. Line heights can take one of several values:

1.  A unitless number, such as `1.2`. This number is an absolute value that will compute the line height as a ratio of the font size.
2.  A number specified by unit, such as `12px`. This number can be any valid CSS unit, such as pixels, percents, ems, or rems.

Generally, the unitless ratio value is the preferred method, since it is responsive and based exclusively on the current font size. In other words, if we change the font size, a unitless `line-height` would automatically readjust, whereas the pixel value would remain static.

```css
p {
  line-height: 1.4;
}
```

## Serif and Sans Serif

You’ve learned a lot of properties to modify text on a web page!

In the next exercise, you’ll set some text to be _serif_ and some text to be _sans-serif_. What exactly do these words mean?

1.  Serif — fonts that have extra details on the ends of each letter. Examples include fonts like Times New Roman or Georgia, among others.
    
2.  Sans-Serif — fonts that do not have extra details on the ends of each letter. Instead, letters have straight, flat edges, like Arial or Helvetica.

## Fallback Fonts

What happens when a stylesheet requires a font that is not installed on a user’s computer? Most computers have a small set of typefaces pre-installed. This small set includes serif fonts like Times New Roman and sans-serif fonts like Arial.

These pre-installed fonts serve as _fallback fonts_ if the stylesheet specifies a font which is not installed on a user’s computer.

To use fallback fonts, the following syntax is required:

```css
h1 {
  font-family: "Garamond", "Times", serif;
}
```

The CSS rule above says:

1.  Use the Garamond font for all `<h1>` elements on the web page.
2.  If Garamond is not available, use the Times font.
3.  If Garamond and Times are not available, use any serif font pre-installed on the user’s computer.

The fonts specified after Garamond are the fallback fonts (`Times`, `serif`). Fallback fonts help ensure a consistent experience for the diverse audience of users that visit a site.

## Linking Fonts I

With the number of fonts available with modern typography, it is unrealistic to expect users to have all fonts installed on their computers. New fonts are often centralized in directories made available for public use. We refer to these fonts as _non-user fonts_.

[Google Fonts](https://fonts.google.com/) is one such directory of thousands of open-source fonts, available for free use. Google Fonts gives us a way to retrieve the link for a single font, multiple fonts, or multiple fonts with the `font-weight` and `font-style` properties.

We’ll show you where to add this link in the next exercise.

## Linking Fonts II

When we have the link to the font of our choice, we can add the font to the `<head>` section of the HTML document, using the `<link>` tag and the `href`.

Let’s take a look at a few examples:

1\. A single linked font, using `Droid Serif` as an example:

```html
<head>
  <link href="https://fonts.googleapis.com/css?family=Droid%20Serif" type="text/css" rel="stylesheet">
</head>
```

2\. Multiple linked fonts, using the `Droid Serif` and `Playfair Display` fonts as an example:

```html
<head>
  <link href="https://fonts.googleapis.com/css?family=Droid%20Serif|Playfair%20Display" type="text/css" rel="stylesheet">
</head>
```

3\. Multiple linked fonts, along with weights and styles. Here `Droid Serif` has font weights of `400`, `700`, and `700i`, while `Playfair Display` has font weights of `400`, `700`, and `900i`:

```html
<head>
  <link href="https://fonts.googleapis.com/css?family=Droid%20Serif:400,700,700i|Playfair%20Display:400,700,900i" rel="stylesheet">
</head>
```

Once a font is linked, we can create CSS selectors to target elements, just as we do with other fonts.

## Font-Face I

There are other ways to link non-user fonts that don’t require the use of the `<link>` tag in the HTML document. CSS offers a way to import fonts directly into stylesheets with the `@font-face` property.

To load fonts with the `@font-face` property:

1.  Instead of using the font’s link in the HTML document, enter the link into the URL bar in the browser.
2.  The browser will load the CSS rules. You will need to focus on the rules that are directly labeled as `/* latin */`. Some of the latin rules are on separate lines. You will need each of these.
3.  Copy each of the CSS rules labeled latin, and paste the rules from the browser to the top of **style.css**.

It is important to stress the need to copy the `@font-face` rules to the top of the stylesheet for the font to load correctly in the project.

## Font-Face II

While Google Fonts and other resources can broaden font selection, you may wish to use an entirely different font or abstain from using a font from an external service.

We can modify our `@font-face` rule to use local font files as well. We can supply the user with the desired font family and host it along with our site instead of depending on a different site.

```css
@font-face {
  font-family: "Roboto";
  src: url(fonts/Roboto.woff2) format('woff2'),
       url(fonts/Roboto.woff) format('woff'),
       url(fonts/Roboto.tff) format('truetype');
}
```

Here, you’ll notice:

1.  The main difference is the use of a relative filepath instead of a web URL.
    
2.  We add a format for each file to specify which font to use. Different browsers support different font types, so providing multiple font file options will support more browsers.
    

As of now `.woff2` appears to be the way of the future, due to greatly reduced file sizes and improved performance, but many browsers still don’t support it. There are lots of great sources to find fonts to use locally, such as [Font Squirrel](https://www.fontsquirrel.com).

------------

## Review

Great job! You learned how to style an important aspect of the user experience, typography.

Let’s review what you’ve learned so far:

*   _Typography_ is the art of arranging text on a page.
    
*   Text can appear in any number of weights, with the `font-weight` property.
    
*   Text can appear in italics with the `font-style` property.
    
*   The vertical spacing between lines of text can be modified with the `line-height` property.
    
*   _Serif_ fonts have extra details on the ends of each letter. _Sans-Serif_ fonts do not.
    
*   _Fallback fonts_ are used when a certain font is not installed on a user’s computer.
    
*   Google Fonts provides free fonts that can be used in an HTML file with the `<link>` tag or the `@font-face` property.
    
*   Local fonts can be added to a document with the `@font-face` property and the path to the font’s source.
    
*   The `word-spacing` property changes how far apart individual words are.
    
*   The `letter-spacing` property changes how far apart individual letters are.
    
*   The `text-align` property changes the horizontal alignment of text.