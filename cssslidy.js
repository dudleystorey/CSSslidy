var cssSlidy = function(newOptions){
  var options = (function(){
    var mergedOptions = {},
      defaultOptions = {
        timeOnSlide: 3,
        timeBetweenSlides: 1,
        slidyContainerSelector: '#slidy-container',
        slidySelector: '#slidy',
        fallbackFunction: function(){},
        cssAnimationName: 'slidy',
      };

      for( var option in defaultOptions ) mergedOptions[option] = defaultOptions[option];
      for( var option in newOptions ) mergedOptions[option] = newOptions[option];

    return mergedOptions;
  })(),
  CS = this;

  CS.animationString = 'animation';
  CS.hasAnimation = false;
    CS.keyframeprefix = '';
    CS.domPrefixes = 'Webkit Moz O Khtml'.split(' ');
      CS.pfx = '';
    CS.element = document.getElementById(options.slidySelector.replace('#', ''));

  CS.init = (function(){
      // browser supports keyframe animation w/o prefixes
        if (CS.element.style.animationName !== undefined) CS.hasAnimation = true;

        // browser supports keyframe animation w/ prefixes
      if( CS.hasAnimation === false ) {
        for( var i = 0; i < CS.domPrefixes.length; i++ ) {
          if( CS.slidy.style[ CS.domPrefixes[i] + 'AnimationName' ] !== undefined ) {
            CS.pfx = domPrefixes[i];
            CS.animationString = pfx + 'Animation';
            CS.keyframeprefix = '-' + pfx.toLowerCase() + '-';
            CS.hasAnimation = true;
            break;
          }
        }
      }

    if( CS.hasAnimation === true ) {
      var images = CS.element.getElementsByTagName("img"),
          firstImg = images[0], 
            // get the first image inside the "slidy" element.
            imgWrap = firstImg.cloneNode(false);  // copy it.
            CS.element.appendChild(imgWrap); // add the clone to the end of the images

        var imgCount = images.length, // count the number of images in the slide, including the new cloned element
            totalTime = (options.timeOnSlide + options.timeBetweenSlides) * (imgCount - 1), // calculate the total length of the animation by multiplying the number of _actual_ images by the amount of time for both static display of each image and motion between them
            slideRatio = (options.timeOnSlide / totalTime)*100, // determine the percentage of time an induvidual image is held static during the animation
            moveRatio = (options.timeBetweenSlides / totalTime)*100, // determine the percentage of time for an individual movement
            basePercentage = 100/imgCount, // work out how wide each image should be in the slidy, as a percentage.
            position = 0, // set the initial position of the slidy element
            css = document.createElement("style"); // start marking a new style sheet

        // creating css style tag
          css.type = "text/css";
          css.id = options.slidySelector.replace('#', '') + "-css";
          css.innerHTML += options.slidyContainerSelector + " { overflow: hidden; }\n";
          css.innerHTML += options.slidySelector + " { margin: 0; font-size: 0; position: relative; width: " + (imgCount * 100) + "%;  }\n"; // set the width for the slidy container
          css.innerHTML += options.slidySelector + " img { width: " + basePercentage + "%; }\n";
          css.innerHTML += "@"+keyframeprefix+"keyframes "+options.cssAnimationName+" {\n"; 
          for (i=0;i<(imgCount-1); i++) { // 
            position += slideRatio; // make the keyframe the position of the image
            css.innerHTML += position + "% { left: -"+(i * 100)+"%; }\n";
            position += moveRatio; // make the postion for the _next_ slide
            css.innerHTML += position + "% { left: -"+((i+1) * 100)+"%; }\n";
        }
        css.innerHTML += "}\n";
          css.innerHTML += options.slidySelector + " { left: 0%; " + keyframeprefix + "transform: translate3d(0,0,0); " + keyframeprefix + "animation: " + totalTime + "s " + options.cssAnimationName + " infinite; }\n"; // call on the completed keyframe animation sequence
        
          // placing css style tag
          if(options.cssLocation !== undefined)
            options.cssLocation.appendChild(css);
          else
          document.body.appendChild(css);
    } else {
        // fallback function
        options.fallbackFunction();
    }
  })();
}