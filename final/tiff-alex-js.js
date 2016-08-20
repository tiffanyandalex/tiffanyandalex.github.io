
$(document).ready(function(){
    var contentSections = $('.cd-section'),
        navigationItems = $('#cd-vertical-nav a');

    var slickOptions = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        variableWidth: true,
        pauseOnHover: true,
        adaptiveHeight: false
    };

    //Init carousel
    $('.carousel').slick(slickOptions);

    //---------------------NAVIGATION----------------------//
    updateNavigation();
    $(window).on('scroll', function(){
        updateNavigation();
    });
    //smooth scroll to the section
    navigationItems.on('click', function(event){
        event.preventDefault();
        console.log('hash: '  + this.hash)
        console.log($(this.hash))
        smoothScroll($(this.hash));
    });
    //smooth scroll to second section
    $('.cd-scroll-down').on('click', function(event){
        event.preventDefault();
        smoothScroll($(this.hash));
    });

    //open-close navigation on touch devices
    $('.touch .cd-nav-trigger').on('click', function(){
        $('.touch #cd-vertical-nav').toggleClass('open');
  
    });
    //close navigation on touch devices when selecting an element from the list
    $('.touch #cd-vertical-nav a').on('click', function(){
        $('.touch #cd-vertical-nav').removeClass('open');
    });

    function updateNavigation() {
        contentSections.each(function(){
            $this = $(this);
            var activeSection = $('#cd-vertical-nav a[href="#'+$this.attr('id')+'"]').data('number') - 1;
            if ( ( $this.offset().top - $(window).height()/2 < $(window).scrollTop() ) && ( $this.offset().top + $this.height() - $(window).height()/2 > $(window).scrollTop() ) ) {
                navigationItems.eq(activeSection).addClass('is-selected');
            }else {
                navigationItems.eq(activeSection).removeClass('is-selected');
            }
        });
    }

    function smoothScroll(target) {
        $('.parallax').animate(
            {'scrollTop': target.offset().top},
            2000
        );
        console.log(target.offset().top)
    }

    //--------------TIMELINE----------------//

    var items = document.querySelectorAll(".timeline li");

    window.onscroll = function() {scrollFunction()};
    function scrollFunction() {
        for (var i = 0; i < items.length; i++) {
            if(isScrolledIntoView(items[i])){
                 items[i].classList.add("in-view");
            }
        }
    }

    function isScrolledIntoView(el) {
        var elemTop = el.getBoundingClientRect().top;
        var elemBottom = el.getBoundingClientRect().bottom;

        var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
        return isVisible;
    }

});

