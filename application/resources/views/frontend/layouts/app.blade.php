<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">

    <title>@if($seo) {{ $seo->title }} @endif</title>

    <meta name="keywords" content="@if($seo) {{ $seo->keywords }} @endif">
    <meta name="description" content="@if($seo) {{ $seo->description }} @endif">

    <meta property="og:url"           content="{{ Request::url() }}" />
    <meta property="og:type"          content="website" />
    <meta property="og:title"         content="@if($seo) {{ $seo->keywords }} @endif" />
    <meta property="og:description"   content="@if($seo) {{ $seo->description }} @endif" />
    <meta property="og:image"         content="{{ url('/img/blueprint12-logo.png') }}" />

    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap" rel="stylesheet">

    <link href="{{ asset('css/style.css') }}" rel="stylesheet" />

    @if(Request::segment(3) == 'viewing-room')
        <link data-context="helper" rel="stylesheet" type="text/css" href="https://aperture2.artlogic.net/lib/jquery/plugins/roomview/1.0/jquery.roomview.1.0.css?c=2704205000160&g=9e7fda794a47518ecf9dc7f8c8bc9218"/>
{{--        <link data-context="helper" rel="stylesheet" type="text/css" href="https://aperture2.artlogic.net/lib/webfonts/font-awesome/font-awesome-4.6.3/css/font-awesome.min.css?c=2704205000164&g=9e7fda794a47518ecf9dc7f8c8bc9218"/>--}}
{{--        <link data-context="helper" rel="stylesheet" type="text/css" href="https://aperture2.artlogic.net/lib/webfonts/artlogic-site-icons/artlogic-site-icons-1.0/artlogic-site-icons.css?c=2704205000164&g=9e7fda794a47518ecf9dc7f8c8bc9218"/>--}}
    @endif
    @if(Request::segment(1) == 'platform' && Request::segment(2) != '')
        <link href="{{ asset('vendors/bootstrap-magnify/bootstrap-magnify.css') }}" rel="stylesheet" />
    @endif

</head>
<body>
@if(Request::segment(1) != '')
    <header>
        <div class="brandLogo">
            <a href="/"><img src="{{ asset('img/blueprint12-logo.png') }}" alt="blueprint.12 logo" /></a>
            {{--                <a href="/" class="infoLink">Information</a>--}}
        </div>
        <div class="leftNav">
            <div class="leftNavTop">
                <p class="leftNavDay">Tuesday – Saturday <span class="dotSml"></span> 11 am - 7 pm</p>
            </div>
            <nav>
                <ul>
                    @foreach($main_menu as $m)
                        <li><a href="{{ url($m->page_route) }}" {{ Request::segment(1) == $m->page_route ? 'class=leftNavActive' : '' }}>{{ $m->menu_name }}</a></li>
                    @endforeach
                </ul>
            </nav>
            <div class="leftNavBtm">
                <p class="leftNavMail">
                    <a href="mailto:blueprint2012@gmail.com" target="_blank">blueprint2012@gmail.com</a>
                </p>
                <p class="leftNavSocial">
                    <a href="https://www.instagram.com/blueprint2012/" target="_blank"><img src="{{ asset('img/insta-icon.png') }}" alt="instagram"></a>
                    <a href="https://www.facebook.com/blueprint2012/" target="_blank"><img src="{{ asset('img/fb-icon.png') }}" alt="facebook"></a>
                </p>
                <p class="leftNavCopyright">All rights reserved for Blueprint.12</p>
            </div>
        </div>
    </header>
    @yield('content')
@else
    @yield('content')
@endif

<script src="{{ asset('js/jquery.min.js') }}"></script>
<script src="{{ asset('js/plugin.js') }}"></script>
<script src="{{ asset('js/common.js') }}"></script>
@if(Request::segment(1) == '')
    <script>
        $('.slider').slick({
            prevArrow:"<div class='slick-prev'></div>",
            nextArrow:"<div class='slick-next'></div>"
        });
    </script>
@elseif(Request::segment(1) == 'artists' && Request::segment(2) == '')
    <script>
        $(document).ready(function () {
            // init Isotope
            var $grid = $('.artistsGrids').isotope({
                itemSelector: '.artistsGridItem',
                percentPosition: true,
            });
            // layout Isotope after each image loads
            $grid.imagesLoaded().progress( function() {
                $grid.isotope('layout');
            });
        });
    </script>
@elseif(Request::segment(1) == 'platform' && Request::segment(2) != '')
    <script type="text/javascript" src="{{ asset('vendors/bootstrap-magnify/bootstrap-magnify.js') }}"></script>
    <script>
        $(document).ready(function () {
            // init Isotope
            var $grid = $('.platformGrids').isotope({
                itemSelector: '.platformGridItem',
                percentPosition: true,
            });
            // layout Isotope after each image loads
            $grid.imagesLoaded().progress( function() {
                $grid.isotope('layout');
            });

            if ($(window).width() >= 650) {
                $('.platformGridItem').on('click', function () {
                    var dataItem = $(this).attr('data-item');
                    $('.container, .leftNavTop, nav').fadeOut('fast');
                    $('.product-overlay, .product-pp').fadeIn('fast');
                    $('#' + dataItem).fadeIn('fast');

                    var $menu = $('.product-ppItem');
                    $(document).mouseup(function(e) {
                        if (!$menu.is(e.target) && $menu.has(e.target).length === 0) {
                            $('.product-overlay, .product-ppItem').fadeOut('fast');
                            $('.container, .leftNavTop, nav').fadeIn('fast');
                            $('.product-pp').fadeOut('fast');
                        }
                    });
                });
            } else {
                $('.platformGridItem').on('click', function() {
                    var dataItem = $(this).attr('data-item');
                    $('.container').fadeOut('fast');
                    $('.product-pp').fadeIn('fast');
                    $('#' + dataItem).fadeIn('fast');
                });

                var $menu = $('.product-ppItem');
                $(document).mouseup(function(e) {
                    if (!$menu.is(e.target) && $menu.has(e.target).length === 0) {
                        $('.product-ppItem').fadeOut('fast');
                        $('.container').fadeIn('fast');
                        $('.product-pp').fadeOut('fast');
                    }
                });
            }

            $(".back").click(function(){
                $('.product-overlay, .product-ppItem, .product-pp').fadeOut('fast');
                $('.container, .leftNavTop, nav').fadeIn('fast');
            });
        });
    </script>
@elseif(Request::segment(1) == 'artists' && Request::segment(2) != '' && Request::segment(3) != 'viewing-room')
    <script>
        $(document).ready(function () {
            if ($(window).width() >= 650) {
                $('.artist-leftSliderItem').on('click', function () {
                    var dataItem = $(this).attr('data-item');
                    $('.container, .leftNavTop, nav').fadeOut('fast');
                    $('.product-overlay, .product-pp').fadeIn('fast');
                    $('#' + dataItem).fadeIn('fast');

                    var $menu = $('.product-ppItem');
                    $(document).mouseup(function(e) {
                        if (!$menu.is(e.target) && $menu.has(e.target).length === 0) {
                            $('.product-overlay, .product-ppItem').fadeOut('fast');
                            $('.container, .leftNavTop, nav').fadeIn('fast');
                            $('.product-pp').fadeOut('fast');
                        }
                    });
                });
            } else {
                $('.artist-leftSliderItem').on('click', function() {
                    var dataItem = $(this).attr('data-item');
                    $('.container').fadeOut('fast');
                    $('.product-pp').fadeIn('fast');
                    $('#' + dataItem).fadeIn('fast');
                });

                var $menu = $('.product-ppItem');
                $(document).mouseup(function(e) {
                    if (!$menu.is(e.target) && $menu.has(e.target).length === 0) {
                        $('.product-ppItem').fadeOut('fast');
                        $('.container').fadeIn('fast');
                        $('.product-pp').fadeOut('fast');
                    }
                });
            }

            $(".back").click(function(){
                $('.product-overlay, .product-ppItem, .product-pp').fadeOut('fast');
                $('.container, .leftNavTop, nav').fadeIn('fast');
            });

            /* slider Arrow auto position js */
            $('.slider').on('init', function(event, slick, currentSlide){
                var loadAct = $('.artist-leftSliderItem.slick-current');
                setTimeout(() => {
                    $('.slick-next').animate({ left: ($(loadAct).find('img').width() - 33) }, 0);
                }, 500);
            }).on('afterChange', function(event, slick, currentSlide){
                var cur = $('.artist-leftSliderItem').get(currentSlide + 1);
                $('.slick-next').animate({left:($(cur).find('img').width() - 33)}, 0);

            }).slick({
                prevArrow:"<div class='slick-prev'></div>",
                nextArrow:"<div class='slick-next'></div>"
            });
        });
    </script>
@elseif(Request::segment(1) == 'exhibitions' && Request::segment(2) != '')
    @if(Request::segment(2) == now()->year)
        <script>
            $(document).ready(function () {
                if ($(window).width() >= 650) {
                    $('.artist-leftSliderItem').on('click', function () {
                        var dataItem = $(this).attr('data-item');
                        $('.container, .leftNavTop, nav').fadeOut('fast');
                        $('.product-overlay, .product-pp').fadeIn('fast');
                        $('#' + dataItem).fadeIn('fast');

                        var $menu = $('.product-ppItem');
                        $(document).mouseup(function(e) {
                            if (!$menu.is(e.target) && $menu.has(e.target).length === 0) {
                                $('.product-overlay, .product-ppItem').fadeOut('fast');
                                $('.container, .leftNavTop, nav').fadeIn('fast');
                                $('.product-pp').fadeOut('fast');
                            }
                        });
                    });
                } else {
                    $('.artist-leftSliderItem').on('click', function() {
                        var dataItem = $(this).attr('data-item');
                        $('.container').fadeOut('fast');
                        $('.product-pp').fadeIn('fast');
                        $('#' + dataItem).fadeIn('fast');
                    });

                    var $menu = $('.product-ppItem');
                    $(document).mouseup(function(e) {
                        if (!$menu.is(e.target) && $menu.has(e.target).length === 0) {
                            $('.product-ppItem').fadeOut('fast');
                            $('.container').fadeIn('fast');
                            $('.product-pp').fadeOut('fast');
                        }
                    });
                }

                $(".back").click(function(){
                    $('.product-overlay, .product-ppItem, .product-pp').fadeOut('fast');
                    $('.container, .leftNavTop, nav').fadeIn('fast');
                });
            });
        </script>
    @endif
    <script>
        /* slider Arrow auto position js */
        $('.slider').on('init', function(event, slick, currentSlide){
            var loadAct = $('.artist-leftSliderItem.slick-current');
            setTimeout(() => {
                $('.slick-next').animate({ left: ($(loadAct).find('img').width() - 33) }, 0);
            }, 500);
        }).on('afterChange', function(event, slick, currentSlide){
            var cur = $('.artist-leftSliderItem').get(currentSlide + 1);
            $('.slick-next').animate({left:($(cur).find('img').width() - 33)}, 0);

        }).slick({
            prevArrow:"<div class='slick-prev'></div>",
            nextArrow:"<div class='slick-next'></div>"
        });
    </script>
@elseif(Request::segment(1) == 'art-fairs' && Request::segment(2) != '')
    @if(Request::segment(2) == now()->year)
        <script>
            $(document).ready(function () {
                if ($(window).width() >= 650) {
                    $('.artist-leftSliderItem').on('click', function () {
                        var dataItem = $(this).attr('data-item');
                        $('.container, .leftNavTop, nav').fadeOut('fast');
                        $('.product-overlay, .product-pp').fadeIn('fast');
                        $('#' + dataItem).fadeIn('fast');

                        var $menu = $('.product-ppItem');
                        $(document).mouseup(function(e) {
                            if (!$menu.is(e.target) && $menu.has(e.target).length === 0) {
                                $('.product-overlay, .product-ppItem').fadeOut('fast');
                                $('.container, .leftNavTop, nav').fadeIn('fast');
                                $('.product-pp').fadeOut('fast');
                            }
                        });
                    });
                } else {
                    $('.artist-leftSliderItem').on('click', function() {
                        var dataItem = $(this).attr('data-item');
                        $('.container').fadeOut('fast');
                        $('.product-pp').fadeIn('fast');
                        $('#' + dataItem).fadeIn('fast');
                    });

                    var $menu = $('.product-ppItem');
                    $(document).mouseup(function(e) {
                        if (!$menu.is(e.target) && $menu.has(e.target).length === 0) {
                            $('.product-ppItem').fadeOut('fast');
                            $('.container').fadeIn('fast');
                            $('.product-pp').fadeOut('fast');
                        }
                    });
                }

                $(".back").click(function(){
                    $('.product-overlay, .product-ppItem, .product-pp').fadeOut('fast');
                    $('.container, .leftNavTop, nav').fadeIn('fast');
                });
            });
        </script>
    @endif
    <script>
        /* slider Arrow auto position js */
        $('.slider').on('init', function(event, slick, currentSlide){
            var loadAct = $('.artist-leftSliderItem.slick-current');
            setTimeout(() => {
                $('.slick-next').animate({ left: ($(loadAct).find('img').width() - 33) }, 0);
            }, 500);
        }).on('afterChange', function(event, slick, currentSlide){
            var cur = $('.artist-leftSliderItem').get(currentSlide + 1);
            $('.slick-next').animate({left:($(cur).find('img').width() - 33)}, 0);

        }).slick({
            prevArrow:"<div class='slick-prev'></div>",
            nextArrow:"<div class='slick-next'></div>"
        });
    </script>
@endif
@if(Request::segment(1) == 'contact')
    <script>
        @if(session('success'))
        alert("{{session('success')}}");
        @elseif(session('error'))
        alert("{{session('error')}}");
        @endif
    </script>
@endif
@if(Request::segment(3) == 'viewing-room')
    <script data-context="helper"  src="https://aperture2.artlogic.net/lib/jquery/1.12.4/plugins/jquery.browser.min.js?c=2704205000160&g=9e7fda794a47518ecf9dc7f8c8bc9218"></script>
    <script data-context="helper"  src="https://aperture2.artlogic.net/lib/jquery/plugins/roomview/1.0/jquery.roomview.1.0.js?c=2704205000160&g=9e7fda794a47518ecf9dc7f8c8bc9218"></script>
    <script data-context="helper"  src="https://aperture2.artlogic.net/core/dynamic.js?c=2704205000160&g=9e7fda794a47518ecf9dc7f8c8bc9218"></script>
    <script data-context="helper"  src="https://aperture2.artlogic.net/lib/archimedes/scripts/archimedes-frontend-core.js?c=2704205000160&g=9e7fda794a47518ecf9dc7f8c8bc9218"></script>
    <script data-context="helper"  src="https://aperture2.artlogic.net/lib/g/2.0/scripts/galleries.js?c=2704205000160&g=9e7fda794a47518ecf9dc7f8c8bc9218"></script>
    <script type="text/javascript" src="{{ asset('js/SocialShare.min.js') }}"></script>
    <script>
        // init Isotope
        var $grid = $('.artistsGrids').isotope({
            itemSelector: '.artistsGridItem',
            percentPosition: true,
        });
        // layout Isotope after each image loads
        $grid.imagesLoaded().progress( function() {
            $grid.isotope('layout');
        });

        $('.share').ShareLink({
            title: '{{ $artist->artist_name }}',
            text: 'This is a sample text',
            image: '{{ URL::current() }}',
            url: '{{ URL::current() }}'
        });

        /*(function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        $(".fb_share").click(function(){
            $("a.fb-share-button")[0].click();
        });*/
    </script>
@endif

<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-6EJ8MN8EKR"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-6EJ8MN8EKR');
</script>
</body>
</html>
