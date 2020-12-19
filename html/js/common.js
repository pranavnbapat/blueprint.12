$(document).ready(function () {

    // Header js

    /*mobile menu*/
    $('.mobile-nav').click(function () {
        $(this).toggleClass('open');
        $("nav").toggleClass('open-menu');
        if ($('.mobile-nav').hasClass('open')) {
            //$('html,body').css('overflow', 'hidden');
            $('.mobNavOverlay').fadeIn();
        } else {
            //$('html,body').css('overflow', 'auto')
            $('.mobNavOverlay').hide();
        }
    });
    $('.mobNavOverlay').click(function () {
        $(this).hide();
        $('.mobile-nav').removeClass('open');
        $("nav").removeClass('open-menu');
        //$('html,body').css('overflow', 'auto')
    });
    $('.subMenuArea li').click(function () {
        $('.mobNavOverlay').hide();
        $('.mobile-nav').removeClass('open');
        $("nav").removeClass('open-menu');
        //$('html,body').css('overflow', 'auto')
    });

    /* $('.slider').slick({
        prevArrow:"<img class='slick-prev' src='img/prev.png'>",
        nextArrow:"<img class='slick-next' src='img/next.png'>"
    }); */

    /* var scrollpane;
    $(".stayUpdatedLink [data-fancybox]").fancybox({
        afterLoad: function () {
            scrollpane = $('.stayUpdatedScroll').jScrollPane({
                resizeSensor: true,
                resizeSensorDelay: 100,
                autoReinitialise: true,
            }).data().jsp;
        },
        afterClose: function () {
            scrollpane.destroy();
        }
    });

    $('.temp2-rightScroll').jScrollPane({
        resizeSensor: true,
        resizeSensorDelay: 100,
        autoReinitialise: true,
    }); */

    
});