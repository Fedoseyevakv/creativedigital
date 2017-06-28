$(document).ready(function () {

    $('.works__slider').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        prevArrow: $('.works__arrow-left'),
        nextArrow: $('.works__arrow-right'),
    });

    $('.team__slider').slick({
        dots: false,
        infinite: true,
        speed: 300,
        prevArrow: $('.team__arrow-left'),
        nextArrow: $('.team__arrow-right'),
        slidesToShow: 3,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    infinite: true,
                    dots: true
                }
    },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
    }
  ]
    });

    $("[data-fancybox]").fancybox({
        loop: true,
        infobar: true,
    });

    $("#fancy").on('click', function () {

        $.fancybox.open([
            {
                src: ".works__slide1",
                type: 'inline'
                    },
            {
                src: ".works__slide2",
                type: 'inline'
                    },
            {
                src: ".works__slide3",
                type: 'inline'
                    },
            {
                src: ".works__slide4",
                type: 'inline'
                    }
                ]);
    });

    // Go to top
    $(window).scroll(function () {
        if ($(this).scrollTop() > 700) {
            $('#scroller').fadeIn();
        } else {
            $('#scroller').fadeOut();
        }
    });
    $('#scroller').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 400);
        return false;
    });

    // Smooth Scrolling
    $('a[href*="#"]')

    .not('[href="#"]')
        .not('[href="#0"]')

    .click(function (event) {
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, function () {
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) {
                        return false;
                    } else {
                        $target.attr('tabindex', '-1');
                        $target.focus();
                    };
                });
            }
        }
    });

    // Fixed menu
    var $menu = $("#nav");
    $(window).scroll(function () {
        if ($(this).scrollTop() > 737 && $menu.hasClass("default")) {
            $menu.removeClass("default").addClass("fixed");
        } else if ($(this).scrollTop() <= 737 && $menu.hasClass("fixed")) {
            $menu.removeClass("fixed").addClass("default");
        }
    });

    //Menu active
    var menu_selector = "#cd-navbar__collapse";

    function onScroll() {
        var scroll_top = $(document).scrollTop();
        $(menu_selector + " a").each(function () {
            var hash = $(this).attr("href");
            var target = $(hash);
            if (target.position().top <= scroll_top && target.position().top + target.outerHeight() > scroll_top) {
                $(menu_selector + " a").parent('.active').removeClass("active");
                $(this).parent().addClass("active");
            } else {
                $(this).parent().removeClass("active");
            }
        });
    }


    $(document).on("scroll", onScroll);

    $("a[href^=#]").click(function (e) {
        e.preventDefault();

        $(document).off("scroll");
        $(menu_selector + " a").parent(".active").removeClass("active");
        $(this).parent().addClass("active");
        var hash = $(this).attr("href");
        var target = $(hash);

        $("html, body").animate({
            scrollTop: target.offset().top
        }, 500, function () {
            window.location.hash = hash;
            $(document).on("scroll", onScroll);
        });

    });
});