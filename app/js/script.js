$(document).ready(function () {

    $('.works__slider').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
    });
    
    $('.team__slider').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
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
});