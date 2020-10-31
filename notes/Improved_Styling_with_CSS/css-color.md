# CSS Color

## Introduction to Color

CSS supports a wide variety of colors. These include _named colors_, like `blue`, `black`, and `LimeGreen`, along with colors described by a numeric value. Using a numeric system allows us to take advantage of the whole spectrum of colors that browsers support. In this lesson, we’re going to explore all the color options CSS offers.

Colors in CSS can be described in three different ways:

*   _Named colors_ — English words that describe colors, also called _keyword colors_
*   _RGB_ — numeric values that describe a mix of red, green, and blue
*   _HSL_ — numeric values that describe a mix of hue, saturation, and lightness

We’ll learn about and explore the benefits of each of these in depth. Using only named colors, you may feel like you’re picking labeled crayons out of a box. By the end of this lesson, you’ll feel like a painter mixing paints on a palette.

## Foreground vs Background

Before discussing the specifics of color, it’s important to make two distinctions about color. Color can affect the following design aspects:

1.  The foreground color
2.  The background color

Foreground color is the color that an element appears in. For example, when a heading is styled to appear green, the _foreground color_ of the heading has been styled.

Conversely, when a heading is styled so that its background appears yellow, the _background color_ of the heading has been styled

In CSS, these two design aspects can be styled with the following two properties:

1.  `color` \- this property styles an element’s foreground color.
2.  `background-color` \- this property styles an element’s background color.

```
h1 {
  color: Red;
  background-color: Blue;
}
```

In the example above, the text of the heading will appear in red, and the background of the heading will appear blue.

## Hexadecimal

One syntax that we can use to specify colors is called _hexadecimal_. Colors specified using this system are called _hex colors_. A hex color begins with a hash character (`#`) which is followed by three or six characters. The characters represent values for red, blue and green.

```css
DarkSeaGreen: #8FBC8F
Sienna:       #A0522D
SaddleBrown:  #8B4513
Brown:        #A52A2A
Black:        #000000 or #000
White:        #FFFFFF or #FFF
Aqua:         #00FFFF or #0FF
```

In the example above, you may notice that there are both letters and numbers in the values. This is because the hexadecimal number system has 16 digits (0-15) instead of 10 (0-9) like you are used to. To represent 10-15, we use A-F. [Here](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) is a list of many different colors and their hex values.

Notice that `Black`, `White`, and `Aqua` are all represented with both three characters and six characters. This can be done with hex colors whose number pairs are the same characters. In the example above, `Aqua` can be represented as `#0FF` because both of the first two characters are `0` and the second and third pairs of characters are both `F`s. Keep in mind that all three character hex colors can be represented with six characters (by repeating each character twice) but the same is not true in reverse.

You can include hex colors just as you would include named colors: `background-color: #9932cc;`.

## RGB Colors

There is another syntax for representing RGB values that uses decimal numbers. It looks like this:

```css
h1 {
  color: rgb(23, 45, 23);
}
```

Here, each of the three values represents a color component, and each can have a decimal number value from 0 to 255. The first number represents the amount of red, the second is green, and the third is blue. These colors are exactly the same as hex, but with a different syntax and a different number system.

In general, hex and decimal color representations are equivalent. Which you choose is a matter of personal taste. That said, it’s good to choose one and be consistent throughout your CSS, because it’s easier to compare hex to hex and decimal to decimal.

## Hex and RGB

The hexadecimal and RGB color system can represent many more colors than the small set of CSS named colors. We can use this new set of colors to refine our web page’s style.

In both hex and decimal, we have three values, one for each color. Each can be one of 256 values. Specifically, `256 * 256 * 256 = 16,777,216`. That is the amount of colors we can now represent. Compare that to the 147 nameds!

Recall that we started with named colors, converted them to hex, and then converted some of the hex colors to decimal. Unless we made a mistake, all of the colors should still be the same, visually. Let’s use our broadened palette to make some more refined color choices.

## Hue, Saturation, and Lightness

The RGB color scheme is convenient because it’s very close to how computers represent colors internally. There’s another equally powerful system in CSS called the hue-saturation-lightness color scheme, abbreviated as _HSL_.

The syntax for HSL is similar to the decimal form of RGB, though it differs in important ways. The first number represents the degree of the hue, and can be between 0 and 360. The second and third numbers are percentages representing saturation and lightness respectively. Here is an example:

```css
color: hsl(120, 60%, 70%);
```

_Hue_ is the first number. It refers to an angle on a color wheel. Red is 0 degrees, Green is 120 degrees, Blue is 240 degrees, and then back to Red at 360. You can see an example of a color wheel below:

![](https://content.codecademy.com/courses/learn-css-color/color_wheel_4_background.svg)

_Saturation_ refers to the intensity or purity of the color. If you imagine a line segment drawn from the center of the color wheel to the perimeter, the saturation is a point on that line segment. If you spin that line segment to different angles, you’ll see how that saturation looks for different hues. The saturation increases towards 100% as the point gets closer to the edge (the color becomes more rich). The saturation decreases towards 0% as the point gets closer to the center (the color becomes more gray).

_Lightness_ refers to how light or dark the color is. Halfway, or 50%, is normal lightness. Imagine a sliding dimmer on a light switch that starts halfway. Sliding the dimmer up towards 100% makes the color lighter, closer to white. Sliding the dimmer down towards 0% makes the color darker, closer to black.

HSL is convenient for adjusting colors. In RGB, making the color a little darker may affect all three color components. In HSL, that’s as easy as changing the lightness value. HSL is also useful for making a set of colors that work well together by selecting various colors that have the same lightness and saturation but different hues.

## Opacity and Alpha

All of the colors we’ve seen so far have been opaque, or non-transparent. When we overlap two opaque elements, nothing from the bottom element shows through the top element. In this exercise, we’ll change the _opacity_, or the amount of transparency, of some colors so that some or all of the bottom elements are visible through a covering element.

To use opacity in the HSL color scheme, use `hsla` instead of `hsl`, and four values instead of three. For example:

```css
color: hsla(34, 100%, 50%, 0.1);
```

The first three values work the same as `hsl`. The fourth value (which we have not seen before) is the _alpha_. This last value is sometimes called the opacity.

Alpha is a decimal number from zero to one. If alpha is zero, the color will be completely transparent. If alpha is one, the color will be opaque. The value for half transparent would be `0.5`.

You can think of the alpha value as, “the amount of the background to mix with the foreground”. When a color’s alpha is below one, any color behind it will be blended in. The blending happens for each pixel; no blurring occurs.

The RGB color scheme has a similar syntax for opacity, `rgba`. Again, the first three values work the same as `rgb` and the last value is the alpha. Here’s an example:

```css
color: rgba(234, 45, 98, 0.33);
```

Alpha can only be used with HSL and RGB colors; we cannot add the alpha value to `color: green` `color: #FFFFF`.

There is, however, a named color keyword for zero opacity, `transparent`. It’s equivalent to `rgba(0, 0, 0, 0)`. It’s used like any other color keyword:

```css
color: transparent;
```

## Color Review

We’ve completed our extensive tour of the colors in CSS! Let’s review the key information we’ve learned.

There are four ways to represent color in CSS:

*   Named colors — there are 147 named colors, which you can review [here](https://msdn.microsoft.com/en-us/library/aa358802(v=vs.85).aspx).
    
*   Hexadecimal or hex colors
    
    *   Hexadecimal is a number system with has sixteen digits, 0 to 9 followed by “A” to “F”.
    *   Hex values always begin with `#` and specify values of red, blue and green using hexademical numbers such as `#23F41A`.
*   RGB
    
    *   RGB colors use the `rgb()` syntax with one value for red, one value for blue and one value for green.
    *   RGB values range from 0 to 255 and look like this: `rgb(7, 210, 50)`.
*   HSL
    
    *   HSL stands for hue (the color itself), saturation (the intensity of the color), and lightness (how light or dark a color is).
    *   Hue ranges from 0 to 360 and saturation and lightness are both represented as percentages like this: `hsl(200, 20%, 50%)`.
*   You can add opacity to color in RGB and HSL by adding a fourth value, `a`, which is represented as a percentage.
    

Great job! Feel empowered to add a bit of color to each of your projects!