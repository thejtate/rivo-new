(function ($) {

  if (typeof Drupal != 'undefined') {
    Drupal.behaviors.projectName = {
      attach: function (context, settings) {
        init();
      },

      completedCallback: function () {
        // Do nothing. But it's here in case other modules/themes want to override it.
      }
    }
  }

  $(function () {
    if (typeof Drupal == 'undefined') {
      init();
    }
  });

  $(window).load(function() {

  });

  function init() {
    initMobileNav();
    initElmsAnimation();
    initSectionWidth();
    initSlickSlider();
  }

  function initSlickSlider() {
    var $body = $('body');

    if($body.hasClass('slickSliderActive')) return;
    $body.addClass('slickSliderActive');

    var $wrap = $('.b-slider');

    if (!$wrap.length) return;

    $wrap.each(function() {

      $(this).find('.slides').slick({
        dots: true,
        infinite: true,
        arrows: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<a href="#" class="slick-prev">Previous</a>',
        nextArrow: '<a href="#" class="slick-next">Next</a>',
        appendArrows: $(this).find('.slide-nav'),
        appendDots:  $(this).find('.slide-nav'),
        adaptiveHeight: true,
        fade: true,
        touchMove: false,
        swipe: false,
      });
    });
  }

  function initSectionWidth() {
   var clipPathImg = document.querySelectorAll('.section-what-we-do .left-bg .figure, .section-what-we-do .right-bg .figure, .section-top .left-bg .figure, .section-top .right-bg .figure');
    var clipPath = document.querySelectorAll('#left-bg polygon, #right-bg polygon, #section-top-left-bg polygon, #section-top-right-bg polygon');

    if (!clipPathImg.length || !clipPath.length) return;

    var isTouch = touchCheck();
    var isMobile = mobileCheck();
    var isSafari = safariCheck();

    setPoly();

    if (isSafari) {
      for (var i = 0; i < clipPathImg.length; i++) {
        clipPathImg[i].style.WebkitTransform = "translateZ(1px)";
      }
    }

    if(!isTouch && !isSafari) {
      timer = setTimeout(function () {
        initRendering(1);
      }, 20);
    }

    var timer;
    window.addEventListener('resize', function () {
      setPoly();

      if(!isTouch && !isSafari) {
        clearTimeout(timer);
        timer = setTimeout(function () {
          initRendering(1);
        }, 20);
      }

    });

    function setPoly() {
      var sectionLeftPart =  document.querySelector('.section-what-we-do .left-bg');
      var sectionRightPart =  document.querySelector('.section-what-we-do .right-bg');
      var sectionTopLeftPart = document.querySelector('.section-top .left-bg');
      var sectionTopRightPart = document.querySelector('.section-top .right-bg');

      try {
        if (sectionLeftPart) {
          var sectionLeftPartW = sectionLeftPart.clientWidth;
          clipPath[0].setAttribute('points', '0 0,0 650,' + sectionLeftPartW + ' 650,' + (sectionLeftPartW - 558) +' 0');
        }

        if (sectionRightPart) {
          var sectionRightPartW = sectionLeftPart.clientWidth;
          clipPath[1].setAttribute('points', '0 0,557 650,' + sectionRightPartW + ' 650,' + sectionRightPartW + ' 0');
        }

        if (sectionTopLeftPart) {
          var sectionTopLeftPartW = sectionTopLeftPart.clientWidth;
          clipPath[2].setAttribute('points', '0 0,0 646,' + (sectionTopLeftPartW - 554) + ' 646,' + sectionTopLeftPartW + ' 0');
        }

        if (sectionTopRightPart) {
          var sectionTopRightPartW = sectionTopRightPart.clientWidth;
          clipPath[3].setAttribute('points', '554 0,' + sectionTopRightPartW + ' 0,' + sectionTopRightPartW + ' 646, 0 646');
        }

      } catch (e) {
        if(console && console.log) {console.log('clipPath undefined: ' + e.message)}
      }

      if(!isTouch && !isSafari) {
        initRendering(0.99);
      }
    }

    function initRendering(o) {
      for (var i = 0; i < clipPathImg.length; i++) {
        clipPathImg[i].style.opacity = o;
      }
    }

    function safariCheck() {
      if($.browser.safari) return true;
    }

    function touchCheck() {
      if(document.documentElement.classList.contains('tablet') ||
        mobileCheck()) {
        return true;
      }
    }

    function mobileCheck() {
      if(document.documentElement.classList.contains('mobile')) {
        return true;
      }
    }
  }

  function initElmsAnimation() {

    var $body = $('body');

    if($body.hasClass('scrollRevealActive')) return;

    $body.addClass('scrollRevealActive');

    window.sr = ScrollReveal({
      duration: 1000,
      scale: 1,
      easing: 'ease',
      origin: 'left',
      mobile: false
    });

    sr.reveal(('.b-staff li'), {
      duration: 1300,
      distance: '50px'
    }, 100);

    sr.reveal(('.page-node-type-careers .b-with-photo h3'), {
      duration: 1700,
      distance: '150px'
    }, 700);

    sr.reveal('.front .section-what-we-do .right-bg, .section-top .right-bg, .section-top .content-wrap, .site-header .bg',  {
      duration: 1500,
      distance: '50px',
      origin: 'right',
      viewFactor: 0.2
    });

    sr.reveal('.front .section-what-we-do .left-bg, .front .section-what-we-do .content-wrap, .section-top .left-bg',  {
      duration: 1500,
      distance: '50px',
      viewFactor: 0.2
    });

    sr.reveal(('.site-header .nav .menu>li'), {
      delay: 700,
      duration: 1300,
      distance: '50px'
    }, 100);

    sr.reveal(('.site-header .logo img'), {
      delay: 700,
      duration: 1300,
      distance: '50px',
      origin: 'top',
    });

    sr.reveal(('.site-header .logo img'), {
      delay: 700,
      duration: 1300,
      distance: '50px',
      origin: 'top',
    });

    sr.reveal(('.section-who-we-are, .section-endorsements, .section-career' ), {
      duration: 1700,
      distance: '50px',
      origin: 'bottom',
     });

    //sr.reveal(('.section-who-we-are h2'), {
    //  duration: 1000,
    //  distance: '150px'
    //}, 700);

    sr.reveal(('.front .section-what-we-do h2'), {
      delay: 400,
      duration: 1000,
      distance: '150px'
    }, 700);

    sr.reveal(('.section-who-we-are h2'), {
      delay: 200,
      duration: 1000,
      distance: '70px',
    });

    sr.reveal(('.section-career h2'), {
      duration: 1300,
      distance: '100px'
    });

    sr.reveal(('.section-who-we-are .btn, .section-career .btn'), {
      delay: 400,
      duration: 1500,
      distance: '30px',
      origin: 'bottom',
    });

    sr.reveal('.section-endorsements .title', {
      duration: 1500,
      distance: '0',
      rotate: { x: 0, y: 100, z: 0 },
      origin: 'bottom',
      viewFactor: 1,
    });

    sr.reveal(('.site-footer .logo img'), {
      duration: 1300,
      distance: '50px',
      origin: 'right',
    });

    sr.reveal(('.site-footer .field--type-link '), {
      delay: 700,
      duration: 1000,
      distance: '20px'
    }, 100);

    sr.reveal('.b-with-photo .figure',  {
      duration: 1500,
      distance: '50px',
      origin: 'right',
      viewFactor: 0.2,
      viewOffset: { right: -51 },
    });

    sr.reveal('.b-with-photo .container',  {
      duration: 1500,
      distance: '50px',
    });

    sr.reveal('.content-wrapper .title',  {
      duration: 1500,
      distance: '100px',
      opacity: 1
    });

    sr.reveal('.content-wrapper .row .col', {
      distance: '100px',
      origin: 'top'
    }, 500 );

    var $testimonials = $('.b-testimonials');

    $testimonials.each(function(){
      var $items = $(this).find('.items:first-child .item');

      sr.reveal($items, {
        duration: 1500,
      }, 500);
    });

    sr.reveal('.content-wrapper .links li, .content-wrapper .list li', {
      distance: '30px',
      origin: 'top',
    }, 150 );

    sr.reveal('.b-bio', {
      duration: 1500,
      distance: '50px',
    });

    sr.reveal('.b-contact .left-part, .b-contact .right-part', {
      distance: '50px',
      origin: 'top'
    }, 500 );
  }

  function initMobileNav() {
    var $navWrapper = $('.nav');
    var $btn = $navWrapper.find('.btn-nav');

    $btn.on('click touch', checkNav);

    $('html').on('click touch', function (e) {
      if (!$(e.target).closest($navWrapper).length && $navWrapper.hasClass('nav-active')) {
        $navWrapper.removeClass('nav-active');
      }
    });

    function checkNav(e) {
      e.preventDefault();
      $navWrapper.toggleClass('nav-active');
    }
  }

  window.removeMarketoDefaultStyles = function(form) {
    form.find('style').remove();
    form.removeAttr('style');
    form.find('.mktoFormRow').addClass('form-item');
    form.find('.mktoButtonRow').removeClass('mktoButtonRow').addClass('form-actions');
    form.find('button').addClass('form-submit');
    form.find('input, textarea, label, .mktoFormCol, .mktoButtonWrap, .mktoRequired').removeAttr('style');
    form.find('.mktoOffset, .mktoGutter, .mktoClear, .mktoLabel').remove();
    form.removeClass('mktoForm').addClass('mktoFormWithoutStyles');
  };

  window.changeMarketoDefaultBtnText = function(form, text) {
    form.find('button').text(text);
  };

  window.addTextBeforeBtn = function(form, text) {
    form.find('button').before('<div class="text-before-btn">' + text + '</div>')
  };

  window.successMessage = function(form, text) {
    form.hide();
    form.after('<div class="success-message">' + text + '</div>')
  };

})(jQuery);