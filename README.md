#CSSslidy
An auto-generated, responsive CSS image slider

### Use:
* Ensure that all the images you wish to use are exactly the same size.
* Create an element with an `id` of `slidy-container` and an element with an `id` of `slidy` containing your images:
```html
<div id="slidy-container">
  <figure id="slidy">
    <img src="eyes.jpg" alt>
    <img src="lou.jpg" alt>
    <img src="lucielle.jpg" alt>
    <img src="lucie.jpg" alt>
  </figure>
</div>
```
* Add `cssslidy.js` to the bottom of the page.
* Call `cssSlidy()`:
```html
<script type="text/javascript"> cssSlidy(); </script>
```

### Customize:
To customize your slidy, pass an options object to the `cssSlidy()` call:
```html
<script type="text/javascript">
  cssSlidy({
  	timeOnSlide: 5,
  	timeBetweenSlides: .5,
  	slidyContainerSelector: 'custom-container',
  	slidySelector: 'custom-slidy',
  	fallbackFunction: function(){ alert("Oh noes! You can't animate!"); },
  	cssAnimationName: 'custom-animation'
  });
</script>
```


#### Available options:

Option | Type | Default Value | Description
---|---|---|---
`timeOnSlide` | number | `3` | Amount of time (in seconds) per slide
`timeBetweenSlides` | number | `1` | Amount of time (in seconds) per transition
`slidyContainerSelector` | string | `'#slidy-container'` | Define the *ID* used for the slidy container element
`slidySelector` | string | `'#slidy'` | Define the *ID* used for the slidy element
`fallbackFunction` | function | `function(){}` | Function called if CSS Animation is not supported
`cssAnimationName` | string | `'slidy'` | Name of CSS animation