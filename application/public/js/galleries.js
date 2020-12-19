(function($) {

    // object to keep track of which images have already had the image brightness detected
    var imagesAlreadyChecked = {};

    window.app = {
        checkEmail: {
            check: function(which) {

                if ($(which).val() != "") {
                    var str=$(which).val();
                    var at="@";
                    var dot=".";
                    var lat=str.indexOf(at);
                    var lstr=str.length;
                    var ldot=str.indexOf(dot);

                    if (str.indexOf(at)==-1){
                        return false;
                    }

                    if (str.indexOf(at)==-1 || str.indexOf(at)==0 || str.indexOf(at)==lstr){
                        return false;
                    }

                    if (str.indexOf(dot)==-1 || str.indexOf(dot)==0 || str.indexOf(dot)==lstr){
                        return false;
                    }

                    if (str.indexOf(at,(lat+1))!=-1){
                        return false;
                    }

                    if (str.substring(lat-1,lat)==dot || str.substring(lat+1,lat+2)==dot){
                        return false;
                    }

                    if (str.indexOf(dot,(lat+2))==-1){
                        return false;
                    }

                    if (str.indexOf(" ")!=-1){
                        return false;
                    }

                    return true;
                }

                else {
                    return false;
                }
            }
        }
    }

    window.galleries = {

        init: function() {

            window.galleries.plugin_tweaks.init();
            window.galleries.device.init();
            window.galleries.navigation.init();
            window.galleries.responsive.init();
            window.galleries.layout.init();
            window.galleries.lists.init();
            window.galleries.slideshow.init();
            window.galleries.vertical_homepage_slideshow.init();
            window.galleries.artworks.init();
            if ($('#artworks_filter_panel').data('artworks_api_enabled') !== true) {
                window.galleries.artwork_filters.init();
            }
            window.galleries.image_gallery.init();
            window.galleries.artist_list_slideshow.init();
            window.galleries.cover_page_slideshow.init();
            window.galleries.slide_brightness.init();
            window.galleries.artist_list_preview.init();
            window.galleries.artist_list_columns.init();
            window.galleries.image_popup.init();
            window.galleries.publications.init();
            window.galleries.quicksearch.init();
            window.galleries.artist.init();
            //window.galleries.contact_form.init();
            window.galleries.contact_form_popup.init();
            window.galleries.mailing_list_form.init();
            window.galleries.pageload.init();
            window.galleries.pageload_load_more_pagination.init();
            window.galleries.parallax.init();
            window.galleries.forms.init();
            window.galleries.mailinglist_signup_form_popup.init();
            window.galleries.google_map_popup.init();
            window.galleries.prevent_user_image_save.init();
            window.galleries.cookie_notification.init();
            window.galleries.google_maps.init();
            window.galleries.misc.init();
            window.galleries.accessibility.init();

            window.galleries.scroll.init();
            window.galleries.sub_navigation.init();
            window.galleries.scroll_sections.init();

            window.galleries.global_analytics.init();

            window.galleries.viewing_room.init();

            // Fix for IE6-7 image link problem..
            // Image links in record lists are unclickable in IE6/7
            if (navigator.userAgent.indexOf('MSIE 7') > -1 || navigator.userAgent.indexOf('MSIE 6') > -1) {

                $('div.records_list a span.image img').click(function() {
                    var parent_a = $(this).parents('a');
                    if (!parent_a.hasClass('image_popup')) {
                        window.location.href = parent_a.attr('href');
                    }

                })

            }

            if ($('[data-main-content-record-id]').length) {
                var record_id_value = $('[data-main-content-record-id]').attr('data-main-content-record-id');
                if (record_id_value && typeof record_id_value != 'undefined') {
                    $('body').addClass('page-content-record-id-' + String(record_id_value));
                }
            }

        },

        misc: {

            init: function() {
                window.galleries.misc.loaders();
                window.galleries.misc.extended_click_area();
            },

            loaders: function() {
                $('.button').each(function() {
                    if (!$('.button_loader', this).length) {
                        $(this).append('<div class="button_loader"></div>');
                    }
                });
                $('.loader_simple, .button_loader, .loader_basic').each(function() {
                    if (!$('svg', this).length) {
                        $(this).append('<svg class="loader" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="3" stroke-miterlimit="10"/></svg>');
                    }
                });
            },

            extended_click_area: function() {
                $('.extended_click_area:not(.click_event_added)').addClass('click_event_added').click(function(){
                    var link_element = $(this).closest('li, .item').find('a');
                    if (link_element.length) {
                        link_element[0].click();
                    } else {
                        $(this).removeClass('extended_click_area');
                    }
                });
            }

        },

        sharing: {

            init: function() {
                window.modules.sharing.init();
            }

        },

        device: {

            init: function() {

                // Find out the current browser

                if ($.browser.name) {
                    var browserVersion = parseInt($.browser.version);
                    var browserName = $.browser.name;
                    if (browserVersion) {
                        $('body').addClass('browser-' + browserName);
                        $('body').addClass('browser-' + browserName + '-' + browserVersion);
                    }
                    if ($.browser.platform) {
                        $('body').addClass('platform-' + $.browser.platform);
                    }
                    if ($.browser.platform == 'iphone' || $.browser.platform == 'ipad') {
                        $('body').addClass('platform-ios');
                    }
                }

                // Find out if this is the Android default browser and add a class to the body
                // This is NOT a very good way of testing for this browser, but there does not seem to be a conclusive way to do it
                var nua = navigator.userAgent;
                var is_android_default_browser = ((nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1) && !(nua.indexOf('Chrome') > -1));
                if (is_android_default_browser) {
                    $('body').addClass('browser-android-internet');
                }

                // Find outo if this is a high res device and add a class to the body
                // This allows us to change graphics to high-res versions on compatible devices
                if (window.devicePixelRatio > 1) {
                    $('body').addClass('device-highres');
                }

                if (window.galleries.device.handheld()) {
                    $('body').addClass('device-handheld');
                } else {
                    $('body').addClass('device-desktop');
                }

                // Detect support for AR
                var test_anchor = document.createElement("a");
                if ($.browser.name && $.browser.name == 'safari' && test_anchor.relList.supports("ar")) {
                    $('body').addClass('ar-supported');
                }
            },

            handheld: function() {

                /* Detect mobile device */
                return (
                    //Uncomment to force for testing
                    //true ||

                    //Dev mode
                    (window.location.search.indexOf("?handheld=1") != -1) ||
                    //Detect iPhone
                    (navigator.platform.indexOf("iPhone") != -1) ||
                    //Detect iPod
                    (navigator.platform.indexOf("iPod") != -1) ||
                    //Detect iPad
                    (navigator.platform.indexOf("iPad") != -1) ||
                    //Detect iPad ios 13+
                    (navigator.platform.indexOf("MacIntel") != -1 && navigator.maxTouchPoints > 1) ||
                    //Detect Android
                    (navigator.userAgent.toLowerCase().indexOf("android") != -1) ||
                    //Detect Surface (ARM chip version e.g. low powered tablets) will also detect other windows tablets with the same chip
                    (navigator.userAgent.toLowerCase().indexOf("arm;") != -1 && navigator.userAgent.toLowerCase().indexOf("windows nt") != -1) ||
                    //Detect Opera Mini
                    (navigator.userAgent.toLowerCase().indexOf("opera mini") != -1) ||
                    //Detect Blackberry
                    (navigator.userAgent.toLowerCase().indexOf("blackberry") != -1) ||
                    //Detect webos
                    (navigator.userAgent.toLowerCase().indexOf("webos") != -1) ||
                    //Detect iemobile (old version of windows phone)
                    (navigator.userAgent.toLowerCase().indexOf("iemobile") != -1)
                );

            }

        },

        scroll: {

            init: function() {

                last_scroll_position = 0;
                scrolling_down_offset = 50;
                $(window).bind('scroll', window.galleries.throttle(50, function() {
                    window.galleries.scroll.run();
                }));
                $(window).bind('scroll', window.galleries.debounce(200, function() {
                    window.galleries.scroll.run();
                }));
                window.galleries.scroll.run();

            },

            run: function() {
                var scroll_top = $(window).scrollTop();

                if (scroll_top > 0) {
                    if (last_scroll_position > scroll_top) {
                        if (last_scroll_position + 5 > scroll_top) {
                            if (!$('body').hasClass('window-forced-scroll-up')) {
                                if (!$('body').hasClass('page-popup-active') && !$('body').hasClass('overlay-open') && !$('body').hasClass('slide-nav-open')) {
                                    $('#container').addClass('scrolling-up');
                                    $('#container').removeClass('scrolling-down');
                                    window.galleries.sub_navigation.enable_page_header(scroll_top, 'up');
                                }
                            }
                        }
                    } else {
                        if (scroll_top > last_scroll_position) {
                            if (scroll_top > scrolling_down_offset) {
                                if (!$('body').hasClass('page-popup-active') && !$('body').hasClass('overlay-open') && !$('body').hasClass('slide-nav-open')) {
                                    $('#container').removeClass('scrolling-up');
                                    $('#container').addClass('scrolling-down');
                                    window.galleries.sub_navigation.enable_page_header(scroll_top, 'down');
                                }
                            }
                        }
                    }
                } else {
                    $('#container').removeClass('scrolling-down scrolling-up');
                }
                if ($('body').hasClass('page-popup-visible')) {
                    $('#container').removeClass('page-top');
                } else {
                    if ($(window).scrollTop() > 40) {
                        if ($('#container').hasClass('page-top')) {
                            $('#container').removeClass('page-top');
                        }
                        if (!$('#container').hasClass('page-scroll')) {
                            $('#container').addClass('page-scroll');
                        }
                    } else {
                        if (!$('#container').hasClass('page-top')) {
                            $('#container').addClass('page-top');
                        }
                        if ($('#container').hasClass('page-scroll')) {
                            $('#container').removeClass('page-scroll');
                        }
                    }
                }

                if ($('.record-page-content-combined').length) {
                    window.galleries.scroll_sections.subnav_active_change();
                }

                last_scroll_position = $(window).scrollTop();

            }

        },

        scroll_sections: {

            init: function() {
                $('.record-page-content-combined').each(function() {
                    if (!$('#container.record-page-content-combined-container').length) {
                        $('#container').addClass('record-page-content-combined-container');
                    }
                    var subnav = $(this).find('#sub_nav ul li:not(#sub-item-share):not(#sub-item-cv):not(#sub-item-artist-website) a, #sticky_sub_nav ul li:not(#sub-item-share-page_header):not(#sub-item-cv-page_header):not(#sub-item-artist-website-page_header) a');
                    var sections = $('.record-page-content-combined').find('.scroll_section_container > section');
                    subnav.unbind('click').bind('click.scroll_sections', function() {
                        $('body').addClass('window-forced-scroll-up');
                        var this_type = $(this).attr('data-subsection-type');
                        var related_item = sections.filter('[data-subsection-type="' + this_type + '"]');

                        if (related_item.length) {
                            var direction = (related_item.offset().top > $(window).scrollTop() ? 'down' : 'up');
                            if ($('#header').length > 0 && direction == 'down' && !$('#sticky_sub_nav').is(':visible')) {
                                var offset = -60;
                                var offset = offset + $('#header').outerHeight();
                            }
                            else if ($('#header').length > 0 && direction == 'up' || $('#sticky_sub_nav').length) {
                                var offset = 20;
                                var offset = offset + $('#header').outerHeight();
                            } else {
                                var offset = 40;
                            }

                            if ($('#cms-frontend-toolbar-container').length > 0) {
                                var offset = offset + $('#cms-frontend-toolbar-container').outerHeight();
                            }
                            var related_item_offset = related_item.offset().top - offset;
                            var related_item_offset = (related_item_offset < 1 ? 0 : related_item_offset);
                            $('html,body').animate(
                                {scrollTop: related_item_offset},
                                800,
                                'easeInOutQuad',
                                function() {
                                    $('body').delay(100).queue(function() {
                                        $(this).removeClass('window-forced-scroll-up');
                                        $(this).dequeue();
                                    });
                                    window.galleries.scroll_sections.subnav_active_change();
                                    // Accessibility - set focus on new section
                                    $(related_item).get(0).focus({preventScroll:true});
                                }
                            );
                        }
                        return false;
                    });
                });

            },

            subnav_active_change: function() {
                var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page
                var windowHeight = $(window).height(); // get the height of the window
                var docHeight = $(document).height();

                $('.record-page-content-combined #sub_nav ul li a, .record-page-content-combined #sticky_sub_nav ul li a')
                    .each(function() {
                        var this_type = $(this).attr('data-subsection-type');
                        var sections = $('.record-page-content-combined .scroll_section_container > section');
                        var related_item = sections.filter('[data-subsection-type="' + this_type + '"]');
                        if (related_item.length) {
                            var offset = windowHeight/2;
                            if ($('#cms-frontend-toolbar-container').length > 0) {
                                var offset = offset + $('#cms-frontend-toolbar-container').outerHeight();
                            }
                            var divPos = related_item.offset().top - offset; // get the offset of the div from the top of page
                            var divHeight = related_item.outerHeight(); // get the height of the div in question
                            if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
                                $(".record-page-content-combined #sub_nav ul li a[data-subsection-type='" + this_type + "']").closest('li').addClass("active");
                                $(".record-page-content-combined #sticky_sub_nav ul li a[data-subsection-type='" + this_type + "']").closest('li').addClass("active");
                            } else {
                                $(".record-page-content-combined #sub_nav ul li a[data-subsection-type='" + this_type + "']").closest('li').removeClass("active");
                                $(".record-page-content-combined #sticky_sub_nav ul li a[data-subsection-type='" + this_type + "']").closest('li').removeClass("active");
                            }
                        }
                    })
                    .promise()
                    .done(function() {

                    })
                ;

                if(windowPos + windowHeight == docHeight) {
                    if (!$("#scroll_section_nav ul li:last-child").closest('li').hasClass("active")) {
                        var navActiveCurrent = $(".active").attr("href");
                        $("#scroll_section_nav ul li[href='" + navActiveCurrent + "']").closest('li').removeClass("active");
                        $("#scroll_section_nav ul l li:last-child").closest('li').addClass("active");
                    }
                }
            }

        },

        layout: {

            init: function() {

                $('.reveal_more_text_container').each(function() {
                    if ($('.full_content', this).length) {
                        $('.read_more_link a', this).unbind().click(function() {
                            $(this).closest('.reveal_more_text_container').find('.initial_content, .read_more_link').slideUp();
                            $(this).closest('.reveal_more_text_container').find('.full_content').slideDown().focus();
                            return false;
                        });
                    }
                });

                if ($("#container").fitVids) {
                    $("#container").fitVids({ ignore: '.video_inline'});
                    $(window).bind('resize.fitvids', function() {
                        $('.fluid-width-video-wrapper').each(function() {
                            if ($(window).width() > 767) {
                                if (parseInt($(this).css('padding-top')) > parseInt($(this).parent().height()) || $(this).hasClass('dynamic-width-downscaled')) {
                                    var new_padding_top = (($(this).parent().height() / $(this).parent().width()) * 100);
                                    if (parseInt(new_padding_top) < 20) {
                                        var new_padding_top = 20;
                                    }
                                    $(this).css('padding-top', new_padding_top + '%');
                                    $(this).addClass('dynamic-width-downscaled');
                                }
                            }
                            if (false) {
                                try {
                                    if (parseInt($(this)[0].style.paddingTop) > 100) {
                                        $(this).css('padding-top', '100%');
                                    }
                                } catch(error) {

                                }
                            }
                        });
                    });
                }

                window.galleries.layout.header.init();
                if ($('#header').hasClass('header_fixed')) {
                    window.galleries.layout.header_fixed();
                }

                if ($('#content_module').length) {
                    if ($.trim($('#content_module').html()) == '') {
                        $('#content_module').addClass('no_content');
                    }
                }

                setTimeout(function(){window.galleries.layout.inview.init()}, 100);

                if ($('.parallax-element').length && typeof $(window).parallax != 'undefined') {
                    $(window).parallax.setup();
                    $(window).trigger('scroll'); // Added by Dan H on 25/09/2018 to fix a pageload bug https://artlogic.monday.com/boards/117534001/pulses/114995279
                }

            },

            inview: {

                elements: '.records_list:not(#list_preview_navigation) ul li, #popup_content #image_gallery #image_container, .artwork_detail_wrapper:not(.site-popup-enabled-content) #image_gallery #image_container, #sidebar, .feature_panels ul li.panel',

                init: function(custom_elements) {
                    if ($.isFunction($.fn.inview)) {
                        if (custom_elements && typeof custom_elements != 'undefined') {
                            var inview_elements = $(custom_elements);
                        } else {
                            var inview_elements = $(window.galleries.layout.inview.elements);
                        }
                        var lazyload_enabled = $('body').hasClass('layout-lazyload-enabled');

                        inview_elements.inview({
                            'lazyload': lazyload_enabled,
                            'lazyload_selector': '.image',
                            'lazyload_loader_html': '<svg class="loader" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="3" stroke-miterlimit="10"/></svg>'
                        });
                    }
                },

                destroy: function() {

                    if (typeof $.fn.inview.destroy != 'undefined') {
                        $.fn.inview.destroy();
                    }

                }

            },

            header: {

                init: function() {

                    if ($('#hero_header').length) {
                        if (typeof $('#hero_header').attr('data-height-override') != 'undefined') {
                            $('body').addClass('layout-hero-header-height-override-' + $('#hero_header').attr('data-height-override'));
                        }
                    }

                    window.galleries.layout.header.process();
                    $(window).resize(function() {
                        window.galleries.layout.header.process();
                    });
                },

                process: function() {


                    var elements_to_offset = '.hero_splash_text, #hero_header > .inner, #slideshow.fullscreen_slideshow .content';
                    if ($('#header').length && $('.header-ui-wrapper').length && $('#logo').length) {
                        var header_height = $('#header').height();

                        if ($('#hero_header').hasClass('hero-mode-fullbleed')) {
                            $(elements_to_offset).css('padding-top', header_height);
                        }

                        var logo_bottom_offset = $('#logo').offset().top + $('#logo').height();
                        var toolbar_top_offset = $('.header-ui-wrapper').offset().top;
                        if (logo_bottom_offset - 1 < toolbar_top_offset) {
                            $('#header').addClass('header_toolbar_wrapped');
                        } else {
                            $('#header').removeClass('header_toolbar_wrapped');
                        }
                    } else {
                        $(elements_to_offset).css('padding-top', '');
                    }

                    // add .subnav_wrapped class if subnav is too long and has wrapped
                    if ($('.heading_wrapper').length && $('.heading_wrapper #h1_wrapper').length && $('.heading_wrapper #sub_nav ul li').length) {


                        $('.heading_wrapper #sub_nav').removeClass('subnav_wrapped')

                        //DC - not sure why we were previously accounting for element heights in this, so removed..
                        var subnav_top_offset = ($('.heading_wrapper #sub_nav').offset().top) - parseInt($('.heading_wrapper #sub_nav').css('margin-top'));
                        var h1_wrapper_top_offset = ($('.heading_wrapper #h1_wrapper').offset().top) - parseInt($('.heading_wrapper #h1_wrapper').css('margin-top'));

                        var offset_difference = function(subnav_top_offset, h1_wrapper_top_offset) {
                            return Math.abs(subnav_top_offset - h1_wrapper_top_offset);
                        }(subnav_top_offset, h1_wrapper_top_offset);

                        // if the top offsets are different then we know it has wrapped
                        // Allow 3 px for differences in font rendering between browsers
                        if (offset_difference >= 3) {
                            $('.heading_wrapper #sub_nav').addClass('subnav_wrapped')
                        }
                    }
                }

            },

            header_fixed: function() {

                $('body').addClass('layout-fixed-header');

            },

            navigation_centered: function(element) {
                $(element).fadeTo(0, 0).css({'float': 'left', 'visibility': 'visible'});
                $(window).bind("load", function() {
                    $(element)
                        .css({
                            'width': $(element).width() + 2,
                            'margin': '0 auto',
                            'float': 'none'
                        })
                        .fadeTo(250, 1)
                    ;
                    $(element).css({'display': '', 'float': ''});
                });
            },

            content_follower: function(element, sticky_element) {
                var sticky_element = sticky_element && typeof sticky_element != 'undefined' ? sticky_element : false;

                /*
                    Now uses css 'position:sticky' if supported. This may need to be applied to a *different* element
                    to the old js method. In which case, specify the original element first and the separate sticky_element for newer browsers.
                */
                if ($(element).length > 0){

                    var supportsPositionSticky;
                    // Detect whether '@supports' CSS is supported, preventing errors in IE
                    var supports_supportsCSS = !!((window.CSS && window.CSS.supports) || window.supportsCSS || false);
                    if (supports_supportsCSS){
                        // Older Edge supports '@supports' but not position sticky
                        supportsPositionSticky = CSS.supports('position','sticky');
                        console.log('sticky supported');
                    } else {
                        //IE doesn't support '@supports' or 'object-fit', so we can consider them the same
                        supportsPositionSticky = false;
                    }


                    if (supportsPositionSticky || typeof supportsPositionSticky !== 'undefined') {

                        if (sticky_element) {
                            console.log('sticky added to sticky_element');
                            var $sticky = $(sticky_element);
                        } else {
                            console.log('sticky added to element');
                            var $sticky = $(element);
                        }

                        $sticky.addClass('content_follow_sticky');
                        var header_height = ($('#header').is(':visible') ? $('#header').outerHeight() : 0);
                        // Not needed when an element is sticky: $sticky.css('top', header_height + 30);

                        $(window).resize(function(){
                            var header_height = ($('#header').is(':visible') ? $('#header').outerHeight() : 0);
                            // Not needed when an element is sticky: $sticky.css('top', header_height + 30);
                        });

                    } else {

                        console.log('legacy content-follow');
                        var $scrolling_div = $(element);
                        // Older method
                        var offset = $scrolling_div.offset().top;
                        if ($('#header.header_fixed').length > 0) {
                            var offset = offset - $('#header.header_fixed').outerHeight();
                        }
                        if ($('#cms-frontend-toolbar-container').length > 0) {
                            var offset = offset - $('#cms-frontend-toolbar-container').outerHeight();
                        }
                        $(window).scroll(function() {
                            var window_scroll_pos = $(window).scrollTop();
                            if(window_scroll_pos > offset) {
                                $scrolling_div.stop().animate({"marginTop": (window_scroll_pos - offset) + 10 + "px"}, "slow");
                            }
                            else if(window_scroll_pos == 0) {
                                $scrolling_div.stop().animate({"marginTop": (window_scroll_pos) + "px"}, "slow");
                            }
                        });
                    }

                }
            },

            push_to_fullheight: function(element, css_height_rule, subtract_px, add_px) {
                var $elem = $(element);
                var subtract_css = ' - 0px';
                var add_css = ' + 0px';

                if ( $elem.length ) {
                    var content_module_offset = $elem.offset().top;
                    if ($(subtract_px).length) {
                        var subtract_css = ' - ' + subtract_px.toString() + 'px'
                    }
                    if ($(add_px).length) {
                        var add_css = ' + ' + add_px.toString() + 'px'
                    }
                    // if ( $('body.cms-frontend-toolbar-active').length ) {
                    //     content_module_offset -= 28;
                    // }
                    var height = 'calc((100vh - '+content_module_offset+'px)'+subtract_css+add_css+')'
                    $elem.css(css_height_rule,height);
                } else {
                    console.log("Element pushed to fullheight doesn't exist.");
                }
            },

        },

        navigation: {

            init: function() {

                if ($('.navigation.navigation_expandable').size() > 0) {
                    window.galleries.navigation.expandable();
                }

                window.galleries.navigation.has_subnav();

            },

            expandable: function() {

                $('.navigation.navigation_expandable').each(function() {
                    var this_instance = $(this);
                    $('ul > li', this).each(function() {
                        if (false && $('.expandable_item_container ul li', this).size() == 1) {
                            $('> a', this).click(function() {
                                window.location.href = $(this).parent().find('.expandable_item_container ul li:eq(0) a').attr('href');
                                return false;
                            });
                        } else if ($('.expandable_item_container ul li', this).size() > 0) {
                            $('> a', this).click(function() {
                                $('.expandable_item_container', this_instance).slideUp();
                                $(this).parent().find('.expandable_item_container').slideDown();
                                return false;
                            });
                        }
                    });
                    $('ul li .expandable_item_container', this).each(function() {
                        if (!$(this).parent().hasClass('active')) {
                            $(this).hide();
                        }
                    });
                });

            },

            // This function needs to be called before any widths or heights are calculated for grids due to the class 'page_has_subnav' changing the position and size of a grid
            has_subnav: function() {
                if ($('#sub_nav.navigation ul li, #exhibitions_nav.navigation ul li, .list_grid_control.navigation ul li').length) {
                    $('body').addClass('page_has_subnav');
                }
            },

        },

        sub_navigation: {

            init: function() {
                window.galleries.sub_navigation.inject_sub_nav();
                window.galleries.sub_navigation.page_header_setup();
                window.galleries.sub_navigation.disable_page_header();
            },

            inject_sub_nav: function() {

                if ($('.scroll_sub_nav_enabled').length && $('.scroll_section_container').length && $('.page-param-type-artist_id #sub_nav.navigation, .page-param-type-exhibition_id #sub_nav.navigation').length) {
                    $('.page-param-type-artist_id #sub_nav.navigation, .page-param-type-exhibition_id #sub_nav.navigation').each(function() {
                        $('#header .inner').after('<div class="page-header-container record-page-content-combined" aria-hidden="true"><div id="page_header"><span class="page-header-inner"></span></div>');

                        var original_html = $(this).parent().clone();
                        original_html.find('.has_subtitle').removeAttr('hidden');
                        original_html.find('#h1_wrapper').removeClass('hidden');

                        // Accessibillity changes to remove duplicate ids and change cloned h1 tags to h2

                        original_html.find('h1, h1.has_subtitle, h1.has_subnav').replaceWith(function() {
                            return $('<h2>', {
                                'class': this.className,
                                html: $(this).html()
                            },'</h2>')
                        })
                        original_html.find("#sub_nav").prop("id", "sticky_sub_nav");
                        original_html.find('#sticky_sub_nav ul li, #exhibition-status-current').each(function() {
                            $(this).attr("id", $(this).attr("id") + "-page_header");
                        })

                        $('.page-header-inner').append(original_html.html());
                    });
                }
            },

            page_header_setup: function() {

                if ($('.scroll_sub_nav_enabled').length && $('.scroll_section_container').length && $('.page-param-type-artist_id #sub_nav.navigation, .page-param-type-exhibition_id #sub_nav.navigation').length) {
                    if (!$('.layout-hero-header').length) {
                        if ($('.scroll_section_container').length && $('.page-param-type-artist_id #sub_nav.navigation, .page-param-type-exhibition_id #sub_nav.navigation').length) {
                            $(window).resize(function() {
                                $('.header-fixed-wrapper').height($('.header_fixed').height());
                            }).trigger('resize');
                        }
                    }
                }
            },

            enable_page_header: function(window_scroll_top, scroll_direction) {

                if ($('.scroll_sub_nav_enabled').length && $('.scroll_section_container').length && $('.page-param-type-artist_id #sub_nav.navigation, .page-param-type-exhibition_id #sub_nav.navigation').length) {
                    if (!$('.layout-hero-header').length) {
                        $('#container').addClass('page_header_enable');
                    } else {

                        var sub_nav_top = $('#sub_nav').offset().top;
                        var sub_nav_height = $('#sub_nav').outerHeight(true);
                        var sub_nav_offset = sub_nav_top + sub_nav_height;
                        var sub_nav_offset_scroll_down = sub_nav_offset + 300;
                        var sub_nav_offset_scroll_up = sub_nav_offset - 200;

                        if ($('.page-top').length) {
                            $('#container').removeClass('page_header_enable');
                        } else if (window_scroll_top > sub_nav_offset_scroll_down && scroll_direction =='down') {
                            $('#container').addClass('page_header_enable');
                        } else if (window_scroll_top < sub_nav_offset_scroll_up && scroll_direction =='up') {
                            $('#container').removeClass('page_header_enable');
                        }
                    }
                }
            },

            disable_page_header: function() {
                if (!$('.scroll_section_container').length || !$('.page-param-type-artist_id, .page-param-type-exhibition_id').length) {
                    $('#container').removeClass('page_header_enable');
                }
            }

        },


        responsive: {

            init: function() {
                if ($('body').hasClass('site-responsive')) {

                    window.galleries.responsive.navigation();
                    window.galleries.responsive.records_lists();

                }
            },

            navigation: function() {

                if ( $('body').hasClass('responsive-nav-slide-nav') ) {

                    if (!$('#responsive_slide_nav_wrapper').length) {
                        $('#header .navigation').wrapAll('<div id="responsive_slide_nav_wrapper"></div>');
                    }
                    if (!$('#slide_nav_reveal').length) {
                        $('<div id="slide_nav_reveal" tabindex="0" role="button">Menu</div>').appendTo('#header .inner');
                    }

                    if ($('#top_nav ul.topnav li').length == 0 && $('#topnav_translations ul li').length == 0) {
                        $('#slide_nav_reveal').hide();
                    }


                    // CUSTOM TIMING
                    var li_class_delay = 80;

                    var custom_delay_attr = $('#responsive_slide_nav_wrapper').attr('data-nav-items-animation-delay');
                    if (typeof custom_delay_attr !== typeof undefined && custom_delay_attr !== false) {
                        if (custom_delay_attr){
                            li_class_delay = parseInt(custom_delay_attr);
                        }
                    }

                    $('#top_nav_reveal, #slide_nav_reveal').click(function(e) {

                        e.preventDefault();

                        // For accessibility - tracks which element to refocus on
                        try {
                            h.accessibility.global_variables.element_to_refocus_to = $(this);
                        } catch(error) {
                            console.error(error);
                        }

                        if ($('body').hasClass('slide-nav-open')) {
                            $('body').removeClass('slide-nav-open');
                            setTimeout(function() {
                                $('body').removeClass('slide-nav-active');
                            }, 400);
                            $('#responsive_slide_nav_wrapper ul li, .header_social_links_mobile, #topnav_search').removeClass('item-visible');
                            // if the nav is closed allow fullpage.js vertical slideshow to scroll
                            if (typeof fullpage_api != 'undefined') {
                                fullpage_api.setAllowScrolling(true);
                            }
                            h.accessibility.on_popup_closing('#slide_nav_reveal');
                            // Accessibility - iOS fix - remove aria-hidden attributes once the mobile nav has been closed
                            $('#header .inner > *:not(.header-ui-wrapper)').attr('aria-hidden', 'false');
                            $('#slide_nav_reveal').attr('aria-hidden', 'false');
                            $('#main_content').attr('aria-hidden', 'false');
                            $('#footer').attr('aria-hidden', 'false');
                        } else {
                            $('body').addClass('slide-nav-active');
                            setTimeout(function() {
                                $('body').addClass('slide-nav-open');
                            }, 10);
                            h.accessibility.on_popup_opening('#responsive_slide_nav_wrapper', '#top_nav .topnav a:first-of-type', '#top_nav_reveal');

                            // Accessibility - iOS fix - hide all other elements other than the nav menu from the screen reader
                            $('#header .inner > *:not(.header-ui-wrapper)').attr('aria-hidden', 'true');
                            $('#slide_nav_reveal').attr('aria-hidden', 'true');
                            $('#main_content').attr('aria-hidden', 'true');
                            $('#footer').attr('aria-hidden', 'true');

                            // if the nav is open don't allow fullpage.js vertical slideshow to scroll
                            if (typeof fullpage_api != 'undefined') {
                                fullpage_api.setAllowScrolling(false);
                            }

                            var delay = 0;
                            $('#responsive_slide_nav_wrapper ul li, .header_social_links_mobile, #topnav_search').each(function() {
                                var $li = $(this);
                                setTimeout(function() {
                                    $li.addClass('item-visible');
                                }, delay += li_class_delay);
                            });
                        }
                    });

                    // trigger above click function if the enter or space keys are pressed (for accessibility)
                    $('#top_nav_reveal, #slide_nav_reveal').keydown(function(event) {
                        var curElement = document.activeElement;
                        if ($(this)[0] === curElement && (event.keyCode === 13 || event.keyCode === 32)) {
                            event.preventDefault();
                            $(this).click();
                        }
                    });

                } else {

                    // Initialise the menu button

                    $('#top_nav_reveal').click(function() {
                        ///$('.parallax-mirror').animate({'margin-top': '300px'}, 300);
                        if ($('.topnav').css('display') == 'none') {
                            $('.topnav, #translations_nav, #header_quick_search').slideDown();
                            $('#header').addClass('responsive-nav-open');
                        } else {
                            $('.topnav, #translations_nav, #header_quick_search').slideUp(function() {
                                $(this).attr('style', '');
                            });
                            $('#header').removeClass('responsive-nav-open');
                        }
                        return false;
                    });


                } // end of if

            },

            records_lists: function() {

                $('.records_list').not('.columns_list').not('.tile_list').not('.flow_list').not('.reading_list').not('.records_list_noprocess').each(function() {

                    if ($('> ul', this).length) {
                        // Remove extra ULs in lists, these are not responsive friendly
                        if ($('> ul', this).length > 1) {
                            $('> ul', this).replaceWith(function() {
                                return $(this).html();
                            });
                            $(this).wrapInner('<ul></ul>');
                        }

                        // Remove whitespace between list items (removes space between inline-block elements)
                        if ($('> ul > li', this).length > 1) {
                            $(this).html($(this).html().replace(/>\s+</g,'><'));
                        }

                        $(this).find('.records_list').each(function() {
                            // Run the same commands for any nested elements
                            if ($('> ul', this).length > 1) {
                                $('> ul', this).replaceWith(function() {
                                    return $(this).html();
                                });
                                $(this).wrapInner('<ul></ul>');
                            }
                            if ($('> ul > li', this).length > 1) {
                                $(this).html($(this).html().replace(/>\s+</g,'><'));
                            }
                        });

                        if ($('body.site-lib-version-1-0').length || !$('body[class*="site-lib-version"]').length) {
                            $('> ul > li', this).each(function() {
                                $('.image', this).wrap('<span class="outer"></span>');
                                $('.image', this).wrap('<span class="image_wrapper"></span>');
                                $('.outer', this).prepend('<span class="fill"></span>');
                            });
                        }
                    }

                });

                $('.records_list.columns_list').each(function() {
                    // Remove whitespace between list items (removes space between inline-block elements)
                    $(this).html($(this).html().replace(/>\s+</g,'><'));
                });

                // Run the archimedes core init again, as removing spaces between elements will have removed any javascript events on the modified grid
                window.archimedes.archimedes_core.init();

                $(".records_list ul").each(function() {
                    var item_count = $( this ).children('li').length;
                    $(this).closest('.records_list').addClass('record-count-' + item_count);
                });

                window.galleries.responsive.tile_list_setup();
                window.galleries.responsive.flow_list_setup();
                window.galleries.responsive.grid_dynamic_layout();
                var resize_timeout;
                var last_window_width = $(window).width();
                $(window).resize(function() {
                    clearTimeout(resize_timeout);
                    resize_timeout = setTimeout(function() {
                        window.galleries.layout.init();
                        if ($(window).width() !== last_window_width) {
                            last_window_width = $(window).width();
                            window.galleries.responsive.tile_list_init();
                            window.galleries.responsive.tile_list_after_resize();
                            window.galleries.responsive.flow_list_init();
                            window.galleries.responsive.flow_list_after_resize();
                        }
                        window.galleries.responsive.grid_dynamic_layout();
                    },400);
                });


                // Depricated in 2.0
                window.galleries.responsive.dynamic_grid_image_size();
                $(window).resize(function() {
                    // Depricated in 2.0
                    window.galleries.responsive.dynamic_grid_image_size();
                });


            },

            tile_list_setup: function(context) {
                if (context && typeof context != 'undefined') {
                    var context = context;
                } else {
                    var context = 'body';
                }
                $('.records_list.tile_list', context).each(function() {
                    var original_html = $(this).html();
                    $(this).html('');
                    $(this).append('<div class="tile_list_formatted"></div>');
                    $(this).append('<div class="tile_list_original"></div>');
                    $('.tile_list_original', this).html(original_html).css('visibility', 'hidden');
                });
                window.galleries.responsive.tile_list_init(context);
            },

            tile_list_init: function(context, force) {

                if (context && typeof context != 'undefined') {
                    var context = context;
                } else {
                    var context = 'body';
                }

                if (force && typeof force != 'undefined') {
                    var force = force;
                } else {
                    var force = false;
                }

                $('.records_list.tile_list', context).each(function() {

                    if ($('.tile_list_original ul', this).length) {

                        // Check if the script has already been run before and set variables
                        if ($(this).hasClass('initialised')) {
                            init_rerun = true;
                            existing_formatted_list_column_count = $('.tile_list_formatted ul', this).length;
                        } else {
                            $(this).addClass('initialised');
                            init_rerun = false;
                        }

                        // Start initialising the new list

                        init_allowed = true;

                        $('.tile_list_original', this).removeClass('hidden');

                        tile_list_instance = $(this);
                        var $tile_list_formatted = $('.tile_list_formatted', tile_list_instance);
                        tile_list_width = $(this).width();
                        tile_list_column_width = Math.floor($('.tile_list_original ul', this)[0].getBoundingClientRect().width + parseInt($('.tile_list_original ul', this).css('margin-left')) + parseInt($('.tile_list_original ul', this).css('margin-right')));
                        var column_count = 3;
                        var column_count_calculated = Math.floor(tile_list_width / tile_list_column_width);
                        if (column_count_calculated < 7) {
                            var column_count = column_count_calculated;
                        }

                        if (init_rerun && !force) {
                            // If the script is being run again, check if the column count is different to before. If not, stop the list from being rebuilt.
                            if (existing_formatted_list_column_count == column_count) {
                                init_allowed = false;
                            }
                        }

                        var caption_heights = [];
                        $('.tile_list_original li:not(.hidden)', this).each(function() {
                            var orginal_item_caption_height = $(this).find('.content').outerHeight();
                            if(orginal_item_caption_height){
                                caption_heights.push(orginal_item_caption_height);
                            } else {
                                caption_heights.push(0);
                            }
                        });

                        $('.tile_list_original', this).addClass('hidden');

                        if (init_allowed) {
                            var columns = {}
                            $.each(Array(column_count), function(index, value) {
                                columns[index] = {'height': 0, 'objects': []};
                            });

                            $('.tile_list_original li:not(.hidden)', this).each(function(index) {
                                if ($(this).attr('data-width') && $(this).attr('data-height')) {
                                    var data_width = $(this).attr('data-width');
                                    var data_height = $(this).attr('data-height');
                                } else {
                                    var data_width, data_height = '400';
                                    console.warn('tile_list_init: Width and height of each image is required as a data attribute for this script to work.');
                                }
                                var caption_height = caption_heights[index];
                                var height_to_width_factor = parseInt(data_width) / tile_list_column_width;
                                var relative_item_height = Math.ceil( (parseInt(data_height) / height_to_width_factor) + caption_height );
                                lowest_height_index = 0;
                                if (columns[0] && typeof columns[0] != 'undefined') {
                                    loop_current_lowest_height = columns[0]['height'];
                                    $.each(columns, function(index, value) {
                                        if ((value.height < loop_current_lowest_height)) {
                                            lowest_height_index = index;
                                            loop_current_lowest_height = value.height;
                                        }
                                    });
                                    columns[lowest_height_index]['height'] = columns[lowest_height_index]['height'] + relative_item_height;
                                    columns[lowest_height_index]['objects'].push($(this).clone().find('.video_inline').remove().end());
                                    // console.log('column ', lowest_height_index, '. height ', caption_height, $(this).text());
                                }
                            });

                            // console.log(columns);

                            // Generate formatted tile list
                            $tile_list_formatted.html('');
                            $.each(columns, function(index, value) {
                                $tile_list_formatted.append('<ul></ul>');
                                $tile_list_formatted.find('ul:last-child').append(value.objects);
                            });

                            window.galleries.responsive.tile_list_after_init();

                        }

                        // Scatter list functions
                        if ($(this).hasClass('scatter_list')) {
                            window.galleries.responsive.tile_list_scatter();
                        }

                        // Process formatted tile list
                        $tile_list_formatted.each(function() {
                            var $this = $(this);

                            $this.find('ul:last-child').addClass('last');

                            // Video inline not currently supported
                            $this.find('.video_inline').remove();

                            // Set the size of the image container as a placeholder for lazyload
                            $this.find('li').each(function() {
                                window.galleries.responsive.set_item_min_height($(this));
                            });

                        });

                    }

                });
            },

            set_item_min_height: function($element) {
                // Set the size of the image container as a placeholder for lazyload
                var item_width = $element.find('.image').width();
                var image_width = $element.attr('data-width');
                var image_height = $element.attr('data-height');
                var image_width_proportional = 0;
                var image_height_proportional = 0;
                if (image_width && image_height) {
                    var image_width_proportional = item_width / image_width;
                    var image_height_proportional = image_height * image_width_proportional;
                    if (image_height_proportional) {
                        $element.find('.image').css('min-height', image_height_proportional);
                    }
                }
            },

            tile_list_append_refresh: function(tile_list_instance) {

                //Refreshes the visible tile list (tile_list_formatted) after manually appending list items to the tile_list_original, for example after list-ajax-load-more button is used
                var column_count = tile_list_instance.find('.tile_list_formatted ul').length;
                var $tile_list_formatted = $('.tile_list_formatted', tile_list_instance);

                var columns = {}
                $.each(Array(column_count), function(index, value) {
                    columns[index] = {'height': 0, 'objects': []};
                });


                // Work out columns with all items in tile_list_original, not just the incoming ones.
                // This ensures that we retain all of the correct column heights - exactly as if we were building the list from scratch.

                //TODO this code that sorts items into columns is basically a duplication of the same funcationality in tile_list_init.
                $('.tile_list_original li', tile_list_instance).each(function(index) {

                    if ($(this).attr('data-width') && $(this).attr('data-height')) {
                        var data_width = $(this).attr('data-width');
                        var data_height = $(this).attr('data-height');
                    } else {
                        var data_width, data_height = '400';
                        console.warn('tile_list_init: Width and height of each image is required as a data attribute for this script to work.');
                    }
                    var height_to_width_factor = parseInt(data_width) / tile_list_column_width;
                    var relative_item_height = Math.ceil(parseInt(data_height) / height_to_width_factor);
                    var lowest_height_index = 0;
                    if (columns[0] && typeof columns[0] != 'undefined') {
                        var loop_current_lowest_height = columns[0]['height'];
                        $.each(columns, function(index, value) {
                            if ((value.height < loop_current_lowest_height)) {
                                lowest_height_index = index;
                                loop_current_lowest_height = value.height;
                            }
                        });
                        columns[lowest_height_index]['height'] = columns[lowest_height_index]['height'] + relative_item_height;
                        columns[lowest_height_index]['objects'].push($(this).clone().find('.video_inline').remove().end());
                    }
                });


                $.each(columns, function(index, value) {

                    var $formatted_column = $tile_list_formatted.find('ul:eq('+index+')');

                    //Check how many items are already in the visible column
                    var existing_items_in_visible_col = $formatted_column.find('li').length;

                    //Append all items in column object from the existing length to the total length
                    $formatted_column.append(value.objects.slice( existing_items_in_visible_col, value.objects.length));

                    $tile_list_formatted.find('.video_inline').remove();
                    $tile_list_formatted.find('li').each(function() {
                        window.galleries.responsive.set_item_min_height($(this));
                    });

                });

            },
            tile_list_after_init: function() {
                window.galleries.layout.init();
            },
            tile_list_after_resize: function() {
                window.galleries.layout.init();
                if (window.cart && typeof window.cart != 'undefined') {
                    window.cart.init();
                }
                window.galleries.contact_form_popup.init();
                $('.tile_list .click_event_added').removeClass('click_event_added');
                window.galleries.misc.extended_click_area();
                $.pageload.refresh('.tile_list');
            },

            flow_list_setup: function(context) {
                if (context && typeof context != 'undefined') {
                    var context = context;
                } else {
                    var context = 'body';
                }
                $('.records_list.flow_list', context).each(function() {
                    var original_html = $(this).html();
                    $(this).html('');
                    $(this).append('<div class="flow_list_formatted"></div>');
                    $(this).append('<div class="flow_list_original"></div>');
                    $('.flow_list_original', this).html(original_html).css('visibility', 'hidden');
                });
                window.galleries.responsive.flow_list_init(context);
            },

            flow_list_format: function($flow_list_formatted,target_height,column_count,row_class_to_target) {

                var row_heights = [];
                var tallest_height = 0;
                var cur_tallest_height = 0;
                var row_count = 0;

                // row_class_to_target is a class which has been added to specific rows and only those rows should be formatted
                // For example when ajax load more button is pressed we only want to format the new/modified rows.
                row_class_to_target = (typeof row_class_to_target !== 'undefined') ?  row_class_to_target : '.flow_list_row';

                // Process formatted flow list
                $flow_list_formatted.find(row_class_to_target).each(function() {

                    var $this = $(this);
                    row_count += 1;
                    var items = $this.find("li");
                    var total_margin = 0;
                    var items_array = items.get();
                    var combinedWidth = items_array.reduce(function(sum, item) {  // .get returns the jQuery object's elements as an array

                        var scaled_width;
                        if ("width" in item.dataset && "height" in item.dataset) {
                            var data_width = item.dataset.width;
                            var data_height = item.dataset.height;
                            var scale_ratio = target_height / data_height;
                            var scaled_width = data_width * scale_ratio;
                            var style = window.getComputedStyle(item);
                            var marginLeft = parseInt(style.getPropertyValue('margin-left'));
                            var marginRight = parseInt(style.getPropertyValue('margin-right'));

                            total_margin += (marginLeft + marginRight);

                        } else {
                            console.warn('flow_list_init: Width and height of each image is required as a data attribute for this script to work.');
                        }

                        return sum + scaled_width;

                    }, 0);

                    var diff = ($this.width() - total_margin) / combinedWidth;
                    var final_item_height = (target_height - 1) * diff; // 999 allows 1 px of wiggle room, in case it's too wide by subpixels

                    // Add all of the rows except the last one to the row_heights list.
                    // When we calculate the average row height later, we don't want to use the last row as it can be an anomaly
                    if (row_count != $flow_list_formatted.find(row_class_to_target).length) {
                        row_heights.push(final_item_height);
                    }

                    // Get the current tallest height or if no current tallest - get target height
                    var cur_tallest_height = ((tallest_height) ? tallest_height : target_height);

                    if ( (items_array.length < (column_count - 1) || column_count == 2 && items_array.length == 1) && final_item_height > cur_tallest_height ) {

                        // - For the last row, use the average height of the other rows to determine the height if there are not enough items to fill all the columns
                        // - We check against (column_count - 1) because we want the items to fill the full width of the row if there is only one less item.
                        // - If the column number is set to 2, we don't want a singular item on the last row to go full width because it would be too big. Therefore we use the average height.

                        var total = 0;
                        for(var i = 0; i < row_heights.length; i++) {
                            total += row_heights[i];
                        }
                        var average_row_height = total / row_heights.length;
                        final_item_height = average_row_height

                    } else {
                        if (final_item_height > tallest_height){
                            tallest_height = final_item_height;
                        }
                    }

                    items.find('.image').height(final_item_height);
                    items_array.forEach(function(item, index) {
                        var final_height_scale = final_item_height / item.dataset.height;
                        $(item).width(item.dataset.width * final_height_scale);
                    });

                    $this.find('ul:last-child').addClass('last');
                    // Video inline not currently supported
                    $this.find('.video_inline').remove();
                    $this.removeClass('row_requires_formatting');
                });

            },

            flow_list_create_rows: function(flow_list_formatted_instance, list_items_to_be_added, column_count) {

                // TO DO: add in some logic that when a setting is turned on, the quantity of images added to a row depend on the image proportions within the row.
                // For example if there are 4 columns but there are 2 lanscape images next to each other, set the column number to 2 for that row.

                var columns = {}
                var column_split = Math.ceil(list_items_to_be_added.length / column_count);
                $.each(Array(column_split), function(index, value) {
                    columns[index] = {'objects': []};
                });

                list_items_to_be_added.each(function() {
                    var lowest_height_index = 0;
                    if (columns[0] && typeof columns[0] != 'undefined') {
                        $.each(columns, function(index, value) {
                            if ((this.objects.length < column_count)) {
                                lowest_height_index = index;
                                return false;
                            }
                        });
                        columns[lowest_height_index]['objects'].push($(this).clone().find('.video_inline').remove().end());
                    }
                });

                $.each(columns, function(index, value) {
                    flow_list_formatted_instance.append('<ul class="flow_list_row row_requires_formatting"></ul>');
                    flow_list_formatted_instance.find('ul:last-child').append(value.objects);
                });

            },

            flow_list_init: function(context) {

                if (context && typeof context != 'undefined') {
                    var context = context;
                } else {
                    var context = 'body';
                }

                $('.records_list.flow_list', context).each(function() {

                    var $flow_list = $(this);
                    var $flow_list_original = $('.flow_list_original ul', this);
                    var init_rerun
                    var existing_formatted_list_column_count

                    if ($flow_list_original.length) {
                        // Check if the script has already been run before and set variables
                        if ($(this).hasClass('initialised')) {
                            init_rerun = true;

                            existing_formatted_list_column_count = $('.flow_list_formatted ul.flow_list_row:first li', this).length;

                        } else {
                            $(this).addClass('initialised');
                            init_rerun = false;
                        }

                        // Start initialising the new list
                        var init_allowed = true;
                        $flow_list_original.removeClass('hidden');
                        var flow_list_instance = $(this);
                        var $flow_list_formatted = $('.flow_list_formatted', flow_list_instance);
                        var flow_list_width = $flow_list.width();
                        var item_widths = $flow_list_original.find('li').first().width();
                        var number_of_items_in_grid = $flow_list_original.find('li').length;
                        var column_count_calculated = Math.round((flow_list_width / item_widths) * 10) / 10;
                        var column_count = column_count_calculated;

                        // If we can't detect any columns, do not initialise
                        if (!column_count) {
                            init_allowed = false
                        }

                        // If there are less items in the grid that the number of columns, set the column number to the number of items
                        // This needs to be done to stop the grid from trying to be formatted on resize etc
                        if (column_count > number_of_items_in_grid) {
                            column_count = number_of_items_in_grid
                        }
                        $flow_list_formatted.attr('data-column-count', column_count);

                        if (init_rerun) {
                            // If the script is being run again, check if the column count is different to before. If not, stop the list from being rebuilt.
                            if (existing_formatted_list_column_count == column_count) {
                                init_allowed = false;
                            }
                        }

                        $flow_list_original.addClass('hidden');

                        var target_height = 600; //MOSTLY ARBITRARY - JUST A UNIFYING NUMBER. IS THE MAX HEIGHT OF

                        if (init_allowed) {

                            $flow_list_formatted.html('');
                            window.galleries.responsive.flow_list_create_rows($flow_list_formatted, $flow_list_original.find('li'), column_count);
                            window.galleries.responsive.flow_list_format($flow_list_formatted,target_height,column_count);
                            window.galleries.responsive.flow_list_after_init();

                        } else {
                            //just run the formatting to ensure the sizes are correct
                            window.galleries.responsive.flow_list_format($flow_list_formatted,target_height,column_count);
                        }
                    }
                });

            },

            flow_list_append_refresh: function(flow_list_instance) {

                // This function gets called when new items get appended to the list - for example when the ajax load more button gets pressed.

                var $flow_list_original = $('.flow_list_original', flow_list_instance);
                var $flow_list_formatted = $('.flow_list_formatted', flow_list_instance);
                var column_count = $flow_list_formatted.attr('data-column-count');
                var last_row_column_count = $flow_list_formatted.find('ul:last li').length;
                var $last_row_before_new_content = $flow_list_formatted.find('ul:last');
                var $ajax_loaded_list_items = $flow_list_original.find('ul li.ajax-loaded-list-item').not(".pageload-refreshed");

                // Work out if the last row before adding the new items needs new items added to it to fill the row and then adds them.
                // For example if the last row had 2 items and the column count was 4, we would need to add 2 of the new ajax loaded items into that already existing row to fill it.
                if (last_row_column_count < column_count) {

                    // Don't scroll list position if we are adding new items to the last row.
                    flow_list_instance.addClass('no_scroll_after_load');
                    // Add class so width & height of existing items in the last row can be transitioned
                    $last_row_before_new_content.find('li').addClass('transition_size');
                    // Calculate how many new items need to be added to the previously last row.
                    var number_of_items_required_to_complete_last_row = column_count - last_row_column_count;
                    // Get the required amount of items from the new ajax loaded items list.
                    var items_to_fill_spaces = $ajax_loaded_list_items.slice(0,number_of_items_required_to_complete_last_row);

                    // Insert the new items into what previously was the existing last row.
                    items_to_fill_spaces.clone().insertAfter($last_row_before_new_content.find('li:last'));

                    // Add a class to this row so we know it requires reformatting it because the items within it have changed.
                    $last_row_before_new_content.addClass('row_requires_formatting');

                    // Set the ajax loaded list of items to not include the ones which have just been added to the existing row.
                    $ajax_loaded_list_items = $ajax_loaded_list_items.slice(number_of_items_required_to_complete_last_row);

                    // Remove class once size has transitioned
                    setTimeout(function(){
                        $flow_list_formatted.find('li.transition_size').removeClass('transition_size');
                    }, 1500);
                }

                window.galleries.responsive.flow_list_create_rows($flow_list_formatted, $ajax_loaded_list_items, column_count);
                window.galleries.responsive.flow_list_format($flow_list_formatted,600,column_count,'.flow_list_row.row_requires_formatting');

            },

            flow_list_after_init: function() {
                window.galleries.layout.init();
            },
            flow_list_after_resize: function() {
                window.galleries.layout.init();
                $(window).trigger('resize');
            },

            tile_list_scatter: function() {

                /*
                    Scatter items are 'pulled' out of place to create a random effect.
                    The maximum they can deviate is the margin/padding of the column, this prevents them from touching.
                */
                var max_x_pull = ($('.tile_list_formatted ul').outerWidth(true) - $('.tile_list_formatted ul').outerWidth(false)) / 2;
                var min_x_pull = - max_x_pull;

                $('.tile_list_formatted ul').each(function() {
                    var $this = $(this);
                    var y_pull = window.galleries.responsive.tile_list_scatter_bounds((min_x_pull / 2),(max_x_pull * 2));
                    $this.css({
                        'padding-top': y_pull +'px'
                    });
                });

                $('.tile_list_formatted ul li').each(function() {
                    var $this = $(this);
                    var x_pull = window.galleries.responsive.tile_list_scatter_bounds(min_x_pull , max_x_pull);
                    if (!$this.find('.wrap_inner').length) {
                        $this.wrapInner('<div class="wrap_inner"></div');
                    }
                    $this.attr('data-x-pull',x_pull);
                    $this.find('.wrap_inner').css({
                        'transform':'translateX('+ x_pull +'px )',
                        'margin-bottom': max_x_pull * 2
                    });
                });

                if (!$('.tile_list').hasClass('scatter-list-initialised')){
                    window.setTimeout(function() {
                        $('.tile_list').addClass('scatter-list-initialised');
                    }, 1000);
                }

            },

            tile_list_scatter_bounds: function(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            },

            grid_dynamic_layout: function() {

                $('.records_list.set_minimum_heights_per_row').each(function() {
                    initial_rows = $(this).attr('data-initial-rows') && typeof $(this).attr('data-initial-rows') != 'undefined' ? $(this).attr('data-initial-rows') : false;
                    row_number = 0;
                    row_offset = 0;

                    $('li', this).each(function() {
                        $(this).find('.image > span').css('min-height', '');
                        var item_width = $(this).find('.image').width();
                        var image_width = $(this).attr('data-width');
                        var image_height = $(this).attr('data-height');
                        var image_width_proportional = 0;
                        var image_height_proportional = 0;
                        if (image_width && image_height) {
                            var image_width_proportional = item_width / image_width;
                            var image_height_proportional = image_height * image_width_proportional;
                            if (image_height_proportional) {
                                $(this).find('.image > span').css('min-height', image_height_proportional);
                            }
                        }
                        $(this).removeClass('revealable');
                    });
                    $('li', this).each(function() {
                        // Find adjacent elements
                        var offset_top = $(this).offset().top;
                        var this_image_height = $(this).find('.image').height();
                        if (offset_top > row_offset) {
                            row_number = row_number + 1;
                            row_offset = offset_top;
                        }
                        $(this).parent().find('li').each(function() {
                            if ($(this).offset().top == offset_top) {
                                $(this).attr('data-row-number', row_number);
                                if ($(this).find('.image').height() < this_image_height) {
                                    $(this).find('.image > span').css('min-height', this_image_height);
                                }
                            }
                        });
                    });
                    $('li', this).not('.revealed').each(function() {
                        // Hide revealable elements

                        var row_number = $(this).attr('data-row-number');
                        if (row_number && parseInt(row_number) > parseInt(initial_rows)) {
                            $(this).addClass('revealable');
                        }
                    });
                });

            },

            dynamic_grid_image_size: function() {
                // Depricated in 2.0
                if ($('body').hasClass('responsive-layout-forced-image-lists')) {
                    var selector_context = $('body.responsive-layout-forced-image-lists .records_list.image_list, body.responsive-layout-forced-image-lists .records_list.detail_list');
                    $(selector_context).each(function() {
                        $('li', this).each(function() {

                            // Save the original style as a data tag if it already has one
                            var image_span_el = $('.image > span', this);
                            if (typeof image_span_el.attr('data-style') !== typeof undefined && image_span_el.attr('data-style') !== false) {
                                var image_span_el_original_style = image_span_el.attr('data-style');
                            } else {
                                if (typeof image_span_el.attr('style') != typeof undefined && image_span_el.attr('style') != false) {
                                    var image_span_el_original_style = image_span_el.attr('style');
                                } else {
                                    var image_span_el_original_style = '';
                                }
                                image_span_el.attr('data-style', image_span_el_original_style);
                            }

                            // Add the dynamic heights for each image element if required
                            if ($('.fill', this).css('display') == 'block') {
                                var image_wrapper_height = $('.image_wrapper', this).height();
                                $('.image', this).attr('style', 'height:' + image_wrapper_height + 'px !important;');
                                $('.image > span', this).attr('style', 'height:' + image_wrapper_height + 'px !important;' + image_span_el_original_style);
                                $('.image span > img', this).attr('style', 'max-height:' + image_wrapper_height + 'px !important;');
                            } else if ($('.image, .image > span', this).attr('style')) {
                                if ($('.image, .image > span', this).attr('style').indexOf('height') > -1) {
                                    $('.image', this).attr('style', '');
                                    $('.image > span:not(.hover-element)', this).attr('style', image_span_el_original_style);
                                }
                                $('.image img', this).attr('style', '');
                            }
                        });
                    });
                }

            },

        },

        lists: {

            init: function() {
                window.galleries.lists.ajax.init();
                window.galleries.lists.ajax.rewrite_links();
                window.galleries.lists.cleanup_whitespace.init();
                window.galleries.lists.css_image_cropping.init();
                window.galleries.lists.lists_filter_reveal.init();
            },

            cleanup_whitespace: {
                init: function() {
                    $('.remove_html_whitespace').each(function() {
                        $(this).html($(this).html().replace(/>\s+</g,'><'));
                    });
                }
            },

            ajax: {

                init: function() {

                    ajax_list_loopcount = 0;
                    $('.records_list_ajax').each(function() {
                        if ($('ul li > a', this).size() > 0) {

                            ajax_list_loopcount = ajax_list_loopcount + 1;
                            $(this).attr('data-relative', String(ajax_list_loopcount));

                            var ajax_preview_area = '<div class="records_list_preview" data-relative="' + String(ajax_list_loopcount) + '"><div class="loader_simple">Loading</div><div class="ajax_content"></div></div>';

                            if ($(this).closest('.records_list_ajax').attr('data-ajax-preview-position') == 'top') {
                                $(this).before(ajax_preview_area);
                            } else {
                                $(this).after(ajax_preview_area);
                            }

                            if ($(this).attr('data-ajax-list-type') == 'hover') {
                                $('ul li > a', this).each(function() {
                                    var instance = $(this).closest('li');
                                    $(this)
                                        .mouseover(function() {
                                            $(this).closest('.records_list_ajax').stop().clearQueue();
                                            $(this).closest('.records_list_ajax').animate({'min-height': 0}, 300, function() {
                                                window.galleries.lists.ajax.load(instance, '', true);
                                            });
                                            return false;
                                        })
                                        .mouseout(function() {
                                            $(this).closest('.records_list_ajax').stop().clearQueue();
                                        })
                                    ;
                                });
                            } else {
                                $('ul li > a', this).each(function() {
                                    $(this).addClass('ajax_link').click(function() {
                                        window.galleries.lists.ajax.load($(this).closest('li'));
                                        return false;
                                    });
                                });
                            }

                            if (window.location.hash && window.location.hash != '#' && window.location.hash != '#'+window.location.pathname && window.location.hash != '#undefined') {
                                var this_hash = window.location.hash.split('#')[1];
                                if (this_hash != window.location.pathname) {
                                    window.galleries.lists.ajax.load([], this_hash, false);
                                }
                            } else {
                                $('li:eq(0) > a', this).each(function() {
                                    // Display the first one by default
                                    window.galleries.lists.ajax.load($(this).closest('li'), '', true);
                                });
                            }

                        }
                    });

                },

                load: function(instance, url, background_load, no_scroll) {

                    if (!$(instance).closest('li').hasClass('active') || url) {

                        if ($(instance).length) {
                            var url_method = $(instance).closest('.records_list_ajax').attr('data-ajax-list-url-type') && typeof $(instance).closest('.records_list_ajax').attr('data-ajax-list-url-type') != 'undefined' ? $(instance).closest('.records_list_ajax').attr('data-ajax-list-url-type') : 'hash';
                        }

                        if (url) {
                            url = url;
                            var preview_area = $('.records_list_preview');
                        } else {
                            url = $('a', instance).attr('href');
                            $(instance).closest('.records_list_ajax').find('ul li').removeClass('active');
                            $(instance).addClass('active');
                            var preview_area = $('.records_list_preview[data-relative=' + $(instance).closest('.records_list_ajax').attr('data-relative') + ']');
                        }

                        if ($(preview_area).is(':visible')) {

                            // Position the preview area so it can be seen by the user
                            if ($(instance).size() > 0) {
                                var top_offset = $(window).scrollTop() - $(instance).closest('.records_list_ajax').offset().top + 140;
                                if (top_offset < 0) {
                                    var top_offset = 0;
                                }
                                $('.records_list_preview').animate({'padding-top': top_offset}, 0, 'easeInOutQuint');
                            }

                            $('.loader_simple', preview_area).show();
                            $('.ajax_content', preview_area).fadeTo(0, 0);

                            window.galleries.lists.ajax.before(instance, preview_area, url);

                            $.ajax({
                                url: url,
                                data: 'modal=1',
                                cache: false,
                                dataType: 'html',
                                success: function(data) {
                                    $('.loader_simple', preview_area).hide();
                                    $('.ajax_content', preview_area).html(data).fadeTo(500, 1);
                                    $('#content, #content_module, #sidebar', preview_area).each(function() {
                                        $(this).attr('id', $(this).attr('id') + '_ajax');
                                    });
                                    $('.navigation', preview_area).remove();

                                    if (!background_load) {
                                        if ($(preview_area).offset().top > $(window).scrollTop() + ($(window).height() / 1.5)) {
                                            // Scrolls to the preview area if it is out of view (e.g. responsive version)
                                            $('html,body').animate(
                                                {scrollTop: $(preview_area).offset().top + (-140)},
                                                800,
                                                'easeInOutQuad'
                                            );
                                        }
                                    }

                                    if (false) {
                                        // Removed as we are now just showing the preview area relative to the user scroll, this is done above the ajax call
                                        if (!background_load) {
                                            if ($(instance).size() > 0) {
                                                $('html,body').animate(
                                                    {scrollTop: $(instance).offset().top + (-180)},
                                                    800,
                                                    'easeInOutQuad'
                                                );
                                            }
                                        }
                                        if ($(instance).size() > 0) {
                                            var top_offset = $(instance).offset().top - $(instance).closest('.records_list_ajax').offset().top;
                                            $('.records_list_preview').animate({'padding-top': top_offset}, 0, 'easeInOutQuint');
                                        }
                                    }
                                    if (url_method == 'full_url') {
                                        history.pushState(null, null, url);
                                    } else {
                                        window.location.hash = url;
                                    }
                                    window.galleries.lists.ajax.after(instance, preview_area, url);
                                }
                            });
                        }
                    }

                },

                before: function(original_instance, preview_area, url) {

                },

                after: function(original_instance, preview_area, url) {

                },

                rewrite_links: function() {
                    if (window.core.ajax_sections_link_rewrite) {
                        var t;
                        for (var i = 0; i < window.core.ajax_sections_link_rewrite.length; i ++) {
                            t = '/' + window.core.ajax_sections_link_rewrite[i] + '/';
                            if (window.location.pathname.substring(0, t.length) != t) {
                                $("a[href^='" + t + "']").not("a[href='" + t + "']").not('.ajax_link').each(function() {
                                    var new_href = '' + t + '#' + $(this).attr('href');
                                    $(this).attr('href', new_href);
                                });
                            }
                        }
                    }
                }

            },

            css_image_cropping: {
                /*
                    Simple polyfill for image grids that use object-fit css for 'soft' cropping.
                    Mostly required for all versions of Internet Explorer and older versions of Edge.
                */
                init: function() {

                    var polyfill_images = '.records_list ul li img';
                    var verbose = false;
                    if ($(polyfill_images).length){
                        if (verbose){
                            console.log('css_image_cropping -- grid imgs on page');
                        }
                        var objectfitcover_on_page = $(polyfill_images).filter(function() {
                            // If css cropping is being used, we pass a flag - a font-family on an impossible pseudo-element (invisible) from user_custom.css
                            return window.getComputedStyle($(this)[0]).getPropertyValue('font-family') == ('object-fit');
                            //return window.getComputedStyle($(this)[0], ':first-letter').getPropertyValue('font-family') == ('object-fit');
                        });

                        if (objectfitcover_on_page.length) {
                            if (verbose){
                                console.log('css_image_cropping -- object-fit used in grid, polyfill checking for support');
                            }

                            var supportsObjectfit;

                            // Detect whether '@supports' CSS is supported, preventing errors in IE
                            var supports_supportsCSS = !!((window.CSS && window.CSS.supports) || window.supportsCSS || false);

                            if (supports_supportsCSS){
                                // Older Edge supports '@supports' but not object-fit
                                supportsObjectfit = CSS.supports('object-fit','cover');
                            } else {
                                //IE doesn't support '@supports' or 'object-fit', so we can consider them the same
                                supportsObjectfit = false;
                            }

                            if (!supportsObjectfit || typeof supportsObjectfit == 'undefined') {

                                if (verbose){
                                    console.log('css_image_cropping -- polyfill running');
                                }
                                $(polyfill_images).each(function() {
                                    var $img = $(this);
                                    if ($img.attr('data-src') && typeof $img.attr('data-src') != 'undefined') {
                                        var imageURL = $img.attr('data-src');
                                    } else {
                                        var imageURL = $img.attr('src');
                                    }
                                    if (window.getComputedStyle($img[0], ':first-letter').getPropertyValue('font-family') == 'object-fit' && imageURL) {
                                        var bg_positioning = '50% 50%';
                                        if ($img.css('object-position')) {
                                            var positioning = $img.css('object-position');
                                        }
                                        $img.parent().addClass('objectfit-fallback-bg').css({'background-image':'url('+imageURL+')','background-position':bg_positioning});
                                        $img.css('visibility','hidden');

                                        if (!$('body').hasClass('objectfit-polyfill-active')){
                                            $('body').addClass('objectfit-polyfill-active')
                                        }
                                    }
                                });
                            } else {
                                if (verbose){
                                    console.log('css_image_cropping -- polyfill not required, object-fit supported');
                                }
                            }
                        }
                    }
                },
            },

            lists_filter_reveal: {

                init: function() {

                    if ($("body.publications_enable_filters_artists").length) {

                        $('body.publications_enable_filters_artists #nav_artists').click(function(event) {
                            event.preventDefault();
                            if ($( "#publications_artists_nav" ).hasClass('open')) {
                                $( "#publications_artists_nav" ).removeClass('open');
                                $('#publications_artists_nav').removeClass('forced-open');
                                $("#publications_nav ul li a[data-filter-group='#publications_artists_nav']").removeClass('open')
                            } else {
                                $( "#publications_artists_nav" ).addClass('open');
                                $("#publications_nav ul li a[data-filter-group='#publications_artists_nav']").addClass('open')
                            }
                        });
                    }
                },
            }
        },

        dynamic_ar: {

            init: function() {

                console.log('dynamic ar called')
                if ($('vctr-viewer').length) {
                    try {
                        // Assigned lib/g/ar.js
                        window.dynamicAR();

                    } catch(e) {
                        console.log('Failed to run dynamicAR');
                        console.log(e)
                    }

                }

            }

        },

        pageload: {

            init: function() {
                if ($('body').hasClass('pageload-splash-active') || $('body').hasClass('pageload-ajax-navigation-active')) {
                    var site_name = '';
                    //if ($('meta[property="og:site_name"]').length) {
                    //    if ($('meta[property="og:site_name"]').attr('content') && typeof $('meta[property="og:site_name"]').attr('content') != 'undefined') {
                    //        var site_name = $('meta[property="og:site_name"]').attr('content');
                    //    }
                    //}
                    var ajax_navigation_active = $('body').hasClass('pageload-ajax-navigation-active');
                    //if (site_name != 'London Original Print Fair') {
                    //    var ajax_navigation_active = false;
                    //}
                    $.pageload({
                        'splash_screen_enabled': $('body').hasClass('pageload-splash-active'),
                        'splash_screen_always_enabled': ($('body').hasClass('pageload-ajax-navigation-active') && $('body').hasClass('pageload-splash-active') ? true : false),

                        //'development_mode': true,
                        //'development_mode_pause_splash_screen': true,

                        'disable_ajax_param' : true,
                        'popup_content_enabled': true,
                        'popup_content_force_open': true,
                        'body_classes_to_retain': '',
                        'page_scroll_history': true,
                        'ajax_navigation_enabled': $('body').hasClass('pageload-ajax-navigation-active'),
                        'splash_screen_primary_preload_images_selector': '#home_splash .content',
                        'splash_screen_secondary_preload_images_selector': '#home_splash #home_splash_image_container',
                        'splash_screen_click_to_close': $('body').hasClass('pageload-splash-pause') ? true : false,
                        'content_area_selector': '#container',
                        'preload_images_selector': '#slideshow li img, .parallax-image .parallax-image-inner .image, .feature_list .image, .header, #sidebar .image, #detail-slideshow .image, .svg, .fullscreen_slideshow .image',
                        'splash_screen_delay_after_complete': (typeof $('#home_splash').attr('data-timeout') != 'undefined' ? $('#home_splash').attr('data-timeout') : 1500),
                        'destroy_after_load': function() {
                            if (typeof $(window).parallax != 'undefined') {
                                $(window).parallax.destroy();
                            }
                            $('.parallax-mirror, #protected_path_login').remove();

                            $('#slideshow ul, #mirror-slideshow ul, #ig_slideshow_thumbnails, #ig_slideshow, .image_gallery_multiple, #artist_list_slideshow ul, #list_preview_slideshow, #cover_page_slideshow ul').cycle('destroy');

                            $('video').remove();

                            window.galleries.layout.inview.destroy();

                            if ($('body').hasClass('page-popup-active')) {
                                // A popup is open, close it
                                $.pageload.popup_close(true);
                            }
                            if (typeof fullpage_api != 'undefined') {
                                fullpage_api.destroy('all');
                            }


                        },
                        'popup_after': function(original_click_element) {
                            $('#popup_content').scrollTop(0);

                            $('#container').removeClass('scrolling-down scrolling-up');
                            if (typeof window.cart != 'undefined') {
                                window.cart.init();
                                if (!window.cart.ticketing_enabled()) {
                                    // This should only be done if you are already interacting with the cart
                                    window.cart.cart_summary.get_summary(false);
                                }
                            }

                            if (h.element_exists('.image_gallery_multiple') && h.element_exists('#secondary_image_thumbnails')) {
                                window.galleries.image_gallery.standard();
                            }
                            if ($('#image_gallery.image_gallery_no_caption').length > 0) {
                                $('#popup_box').addClass('image_gallery_no_caption');
                            } else {
                                $('#popup_box').removeClass('image_gallery_no_caption');
                            }

                            if (!$('#popup_container .records_list.tile_list .tile_list_formatted').length) {
                                window.galleries.responsive.tile_list_setup($('#popup_container'));
                            }

                            if (!$('#popup_container .records_list.flow_list .flow_list_formatted').length) {
                                window.galleries.responsive.flow_list_setup($('#popup_container'));
                            }

                            if ($("#popup_content").fitVids) {
                                $("#popup_content").fitVids({ ignore: '.video_inline'});
                            }
                            // Trigger AR quick look mode on hidden link
                            $('.view-in-ar').click(function() {
                                $(".ar-quick-look-wrapper a").get(0).click();
                            });

                            $(window).resize(function() {
                                if ($('#popup_content #image_gallery.image_gallery_no_caption #image_container_wrapper').length) {
                                    var screen_height = $(window).height();
                                    $('#popup_content #image_gallery.image_gallery_no_caption #image_container_wrapper').css('min-height', screen_height);
                                }
                            });

                            window.modules.sharing.init(true);
                            window.galleries.artworks.init();
                            window.galleries.contact_form_popup.init();
                            window.galleries.image_popup.init();
                            window.galleries.misc.loaders();
                            window.galleries.pageload.popup_after_callback();

                            window.galleries.global_analytics.track_popup();

                            $.pageload.refresh('#popup_box');

                            $(window).trigger('resize');

                            window.galleries.layout.inview.init(); // must come after resize!

                            if (typeof $.fn.lazyload.fire === "function") {
                                $.fn.lazyload.fire($('#popup_content .lazyload_wrapper'));
                            }


                            if (typeof window.dynamicAR == "function") {
                                window.dynamicAR();
                            }

                        },
                        'popup_after_close': function() {
                            $('body').removeClass('popup-hidable-content user-distraction-free');
                            $('body').removeClass('content-reversed content-not-reversed');
                            $('.image_gallery_multiple').cycle('destroy');

                            if (typeof fullpage_api != 'undefined') {
                                fullpage_api.destroy('all');
                            }

                            if (window.galleries.artworks.favourites !== undefined
                                && window.galleries.artworks.favourites.init !== undefined) {
                                window.galleries.artworks.favourites.init();
                            }

                            // remove keyboard pagination listener
                            $(window).off('keydown.popup_pagination');

                        },
                        'before_load': function() {
                            $(document).unbind('mouseover.exitintent');
                            $(document).unbind('mouseout.exitintent');
                            if (typeof exit_intent_timeout != 'undefined') {
                                clearTimeout(exit_intent_timeout);
                            }
                            $('body.slide-nav-open').removeClass('slide-nav-open');
                            setTimeout(function() {
                                $('body').removeClass('slide-nav-active');
                            }, 400);
                            $('#responsive_slide_nav_wrapper .navigation ul li.item-visible').removeClass('item-visible');
                        },
                        'after_load_complete': function() {
                            // function showForms() {

                            $('.jsSubmit').css('display','block');
                            $('.nojsSubmit').css('display','none');
                            // }
                            // showForms();

                            if ($('.formRow.form_row.captchaFormRow').length) {
                                location.reload(true);
                            }
                        },
                        'on_page_transition': function() {
                            setTimeout(function() {
                                $('body').removeClass('type-fullscreen layout-hero-header');
                            }, 400);
                        },
                        'splash_screen_out': function() {
                            window.galleries.mailinglist_signup_form_popup.auto_popup();
                        }
                    });

                }
            },

            popup_after_callback: function() {

            }

        },


        pageload_load_more_pagination: {

            // Dynamically loads in new items into a records_list, rather than traditional pagination

            init: function() {

                var verbose_mode = false;

                if (($('body').hasClass('pageload-ajax-navigation-active')) && $('.page_stats').length && $('.ajax_load_more_pagination_enabled').length) {

                    window.galleries.pageload_load_more_pagination.setup(verbose_mode);
                }
            },

            setup: function (verbose_mode) {

                $('.page_stats').each(function(i, element) {

                    var $this = $(this),

                        incoming_url = $this.find('.ps_next').attr('href');
                    page_stats_id = $this.attr('id'),
                        corresponding_list_ref = $this.attr('id'),
                        $list = $('[data-pagestats-id="'+corresponding_list_ref+'"]')
                    ajax_load_more_auto = $this.hasClass('pagination_type_ajax_load_more_auto');

                    if (!$list.length && verbose_mode){
                        console.log("Can't find a corresponding list that relates to your pagination. Supply 'data-pagestats-id' to list that matches your page_stats_id.")
                    }


                    if (typeof page_stats_id !== 'undefined' && $list.length){

                        // Hide the original pagination
                        $this.addClass('hidden');
                        $this.find('.list-ajax-load-more-wrapper').remove();

                        if (typeof incoming_url !== 'undefined'){

                            // Create our new dynamic button
                            $this.after('<div class="list-ajax-load-more-wrapper ' + (ajax_load_more_auto ? 'list-ajax-load-more-auto': '') + ' clearwithin"><button class="list-ajax-load-more button button_compact" data-list="'+page_stats_id+'" data-url="'+incoming_url+'" aria-label="Load more items"><span class="list-ajax-load-more-label">Load more</span></button></div>');

                            $this.next('.list-ajax-load-more-wrapper').find('.list-ajax-load-more')
                                .bind("click", function(e) {
                                    e.preventDefault();
                                    var $button = $(this),
                                        incoming_url = $button.attr('data-url'); // URL detected at this level, later may be data-attr or any value
                                    corresponding_list_ref = $button.data('list'),
                                        $list = $('[data-pagestats-id="'+corresponding_list_ref+'"]')
                                    //Load the new records
                                    window.galleries.pageload_load_more_pagination.load_content($button, incoming_url, $list, verbose_mode);
                                })
                            ;
                            window.galleries.layout.inview.init('.list-ajax-load-more-auto');
                            $this.next('.list-ajax-load-more-wrapper')
                                .on('inview.visible', function() {
                                    console.log($('.list-ajax-load-more', this));
                                    if (!$('.list-ajax-load-more', this).hasClass('loading')) {
                                        $('.list-ajax-load-more', this).trigger('click');
                                    }
                                })
                            ;
                        }

                        // If this URL already has a skip value, prepend a load previous button
                        if (window.location.search && typeof window.location.search != 'undefined') {
                            if (window.location.search.indexOf('skip=') != -1) {
                                $list.before('<div class="list-ajax-load-previous-wrapper clearwithin"><button class="list-ajax-load-previous button button_compact" data-list="'+page_stats_id+'" aria-label="Load previous items"><span class="list-ajax-load-previous-label">Load previous items</span></button></div>');

                                $('.list-ajax-load-previous').bind("click", function(e) {
                                    e.preventDefault();
                                    //Load the initial records list
                                    $.pageload.load(window.location.pathname, true, function() {

                                    });
                                });
                            }
                        }
                    }
                });

            },

            load_content: function ($button, incoming_url, $list, verbose_mode) {

                $button.addClass('loading');

                var incoming_content_type = 'inner',
                    current_button_offset = $button.offset().top - ($(window).height() / 3),
                    corresponding_list_ref = $list.data('pagestats-id'),
                    inner_content_selector = '[data-pagestats-id="'+corresponding_list_ref+'"]';

                $.pageload.load(incoming_url, true, function() {

                    $button.removeClass('loading');
                    if (new_page_inner_content) {

                        $new_page_inner_content = $(new_page_main_content);

                        var updated_url = $new_page_inner_content.find('.page_stats#'+corresponding_list_ref).find('.ps_next').attr('href'),
                            $new_list = $new_page_inner_content.find('[data-pagestats-id="'+corresponding_list_ref+'"]'),
                            $new_list_items = $new_list.find('li').addClass('ajax-loaded-list-item');

                        if ($list.hasClass('tile_list')){
                            $list.find('.tile_list_original ul').append($new_list_items);
                        } else if ($list.hasClass('flow_list')) {
                            $list.find('.flow_list_original ul').append($new_list_items);
                        } else {
                            $list.find('ul').append($new_list_items);
                        }

                        if (updated_url){
                            $button.attr('data-url', updated_url);
                        } else {
                            $button.attr('data-url', '');
                            $button.addClass('disabled');
                            $button.closest('.list-ajax-load-more-wrapper').addClass('disabled');
                        }

                        //General resets
                        if ($list.hasClass('tile_list')){
                            window.galleries.responsive.tile_list_append_refresh($list);
                        } else if ($list.hasClass('flow_list')) {
                            window.galleries.responsive.flow_list_append_refresh($list);
                        }
                        window.galleries.layout.inview.init();
                        $(window).trigger('resize');
                        $(window).trigger('scroll');

                        setTimeout(function() {
                            if (!$list.hasClass('no_scroll_after_load')) {
                                $('html,body').stop().animate({
                                    scrollTop: current_button_offset
                                }, 800, 'easeInOutQuad', function() {
                                    //Refresh pageload only on the new list items
                                    $.pageload.refresh('.ajax-loaded-list-item:not(.pageload-refreshed)');
                                    $('.ajax-loaded-list-item').addClass('pageload-refreshed');
                                });
                            } else {
                                //Refresh pageload only on the new list items
                                $.pageload.refresh('.ajax-loaded-list-item:not(.pageload-refreshed)');
                                $('.ajax-loaded-list-item').addClass('pageload-refreshed');
                                $list.removeClass('no_scroll_after_load')
                            }
                        }, 100);


                    }

                }, null, null, null, incoming_content_type, inner_content_selector);
            }
        },

        slideshow: {

            init: function() {

                plyr_loopcount_global = 0;

                if (window.galleries.device.handheld()) {
                    $('.hero-parallax-element').removeClass('hero-parallax-element');
                }

                // Accessibility - Hide parallax hero header from screen readers
                $('#parallax-hero_header').attr('aria-hidden', true);

                // Accessibility -  remove links and buttons within mirror slideshow from tab order
                $('#mirror-slideshow a, #mirror-slideshow button').each(function() {
                    $(this).attr('tabindex', -1);
                });

                // Combine duplicate pagination labels when using location records
                if ($('body.homepage_slideshow_continuous_cycle').length && $('#slideshow .slideshow_pager.location_pagination_enabled .slideshow-pager-item-wrapper.slideshow-text .slideshow-pager-item').length) {
                    var seen = {};
                    $('#slideshow .slideshow_pager.location_pagination_enabled .slideshow-pager-item-wrapper.slideshow-text .slideshow-pager-item').each(function() {

                        var location = $(this).text();

                        if (seen[location]) {
                            $(this).hide();
                            $(this).parent().hide();
                            $(this).parent().css('padding', '0');
                            $(this).parent().addClass('inactive');
                        } else {
                            seen[location] = true
                            $(this).parent().addClass('remain_active')
                        }
                    })
                }

                if ($('.slide_has_video').length || $('#slideshow.fullscreen_video').length) {
                    window.galleries.slideshow.video_content('body');
                }

                $('#slideshow ul, #mirror-slideshow ul').each(function() {

                    $(this).find('.cycle-sentinel').remove();

                    if (!$(this).hasClass('hero-parallax-element')) {

                        var autoHeight = 'calc';
                        if ($("#slideshow, #mirror-slideshow").attr('data-cycle-autoheight-setting'))  {
                            var autoHeight = $("#slideshow").attr('data-cycle-autoheight-setting');
                        }

                        var slideshowtimeout = 5500;
                        // if ($("#slideshow, #mirror-slideshow").attr('data-cycle-timeout-setting'))  {
                        if ($("#slideshow").attr('data-cycle-timeout-setting'))  {
                            var slideshowtimeout = parseInt($("#slideshow").attr('data-cycle-timeout-setting'));
                        }

                        var newsettings;
                        if ($("#slideshow, #mirror-slideshow").attr('data-cycle-custom-settings'))  {
                            var newsettings = $.parseJSON($("#slideshow, #mirror-slideshow").attr('data-cycle-custom-settings'));
                        }

                        if ($(this).find('.slide_has_video')) {
                            var $instance = $(this);
                            window.galleries.slideshow.video_content_embed_scale($instance);

                            var rtime, timeout = false, delta = 300;

                            $(window).resize(function() {
                                rtime = new Date();
                                if (timeout === false) {
                                    timeout = true;
                                    setTimeout(resizeend, delta);
                                }
                            });
                            function resizeend() {
                                if (new Date() - rtime < delta) {
                                    setTimeout(resizeend, delta);
                                } else {
                                    timeout = false;
                                    window.galleries.slideshow.video_content_embed_scale($instance);
                                }
                            }
                        }

                        var mastersettings = {
                            fx:     'fade',
                            speed:    1200,
                            timeout:  slideshowtimeout,
                            pause:   0,
                            slides: '>',
                            autoHeight: autoHeight,
                            swipe: true
                        }

                        for (var newkey in newsettings) {
                            mastersettings[newkey] = newsettings[newkey];
                        }

                        var onfunction = $('#slideshow').on;
                        if (onfunction) {
                            $('#slideshow ul, #mirror-slideshow ul').on('cycle-post-initialize', function(event, optionHash) {
                                //$(this).on('cycle-post-initialize', function(event, optionHash) {
                                var first_slide = $('>', this).not('.cycle-sentinel').filter(':eq(0)');
                                if (first_slide.find('.video_container.active').length) {
                                    var plyr_loopcount = parseInt(first_slide.attr('data-plyr-index')) - 1;
                                    // console.log(plyr_loopcount);
                                    // if (!isNaN(plyr_loopcount)){
                                    plyr_video_players[plyr_loopcount].on('ready', function(event) {
                                        if (!$('#hero_image_responsive').is(':visible')) {
                                            plyr_video_players[plyr_loopcount].play();
                                        }
                                    });
                                    // }
                                    // window.player = plyr_video_players[0]; //sometimes requires this to expose player
                                }

                                // Set position of pagination controls for standard homepage slideshow layout
                                function setSlideshowPaginationControlsPosition() {
                                    if ($('.section-home #slideshow.full_list ul li .image').length) {
                                        var slideshow_image_height = $('.section-home #slideshow.full_list ul li .image').outerHeight(true);
                                        // If there is no caption set the pagination position higher as it no longer needs to sit inline with the caption
                                        if (!$('.section-home #slideshow.full_list ul li .content.slide_has_caption').length) {
                                            slideshow_image_height -= 10
                                        }
                                        $('.section-home #slideshow.full_list .slideshow-pagination-controls').css({"bottom": "auto", "top": slideshow_image_height});
                                    }
                                }

                                setSlideshowPaginationControlsPosition();

                                $(window).resize(function() {
                                    setSlideshowPaginationControlsPosition();
                                });

                                // Pause slideshow if link inside gets focus
                                $('#slideshow a, #mirror-slideshow a').focusin(function(){
                                    $('#slideshow ul, #mirror-slideshow ul').cycle('pause');
                                });

                                // Slideshow pagination controls
                                if ($('#slideshow .slideshow-pagination-controls').length) {

                                    $('#slideshow .slideshow-pagination-controls .btn-next').off("click.nextSlideshowSlide");
                                    $('#slideshow .slideshow-pagination-controls .btn-next').on('click.nextSlideshowSlide', function() {
                                        $('#slideshow ul, #mirror-slideshow ul').cycle('pause').cycle('next');
                                    });

                                    $('#slideshow .slideshow-pagination-controls .btn-prev').off("click.prevSlideshowSlide");
                                    $('#slideshow .slideshow-pagination-controls .btn-prev').on('click.prevSlideshowSlide', function() {
                                        $('#slideshow ul, #mirror-slideshow ul').cycle('pause').cycle('prev');
                                    });
                                }

                                if ($('#slideshow .slideshow_pager').length){
                                    $('body').addClass('homepage-slideshow-pagination-enabled');

                                    $('#slideshow .slideshow_pager').each(function() {

                                        var pager = $(this);

                                        pager.find('.slideshow-pager-item-wrapper:nth-child(1)').addClass('active');
                                        pager.find('.slideshow-pager-item-wrapper').each(function() {
                                            var dotwrapper = $(this);

                                            if (!$('.slideshow-pager-item-wrapper.remain_active').length) {
                                                dotwrapper.click(function() {
                                                    var paged_slideshow = dotwrapper.closest('.paged-slideshow-wrapper').find('ul');
                                                    $(paged_slideshow).cycle(parseInt(dotwrapper.attr('data-rel')));
                                                    pager.find('.slideshow-pager-item-wrapper').removeClass('active');
                                                    dotwrapper.addClass('active');
                                                    $(paged_slideshow).cycle('pause');

                                                    if ($('#mirror-slideshow ul').length) {
                                                        $('#mirror-slideshow ul').cycle(parseInt(dotwrapper.attr('data-rel')));
                                                        $('#mirror-slideshow ul').cycle('pause');
                                                    }
                                                });
                                            }
                                        });
                                    });
                                }

                                // Accessibility - stop any parallax slideshow links from being focusable
                                if ($('#parallax-slideshow a').length){
                                    $('#parallax-slideshow a').attr('tabindex', -1);
                                }

                                window.galleries.slideshow.initialized(event, optionHash);
                            });

                            // Function fired directly before the slide has changed
                            $('#slideshow ul, #mirror-slideshow ul').on('cycle-before', function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {
                                // $(this).on('cycle-before', function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {
                                if ($(incomingSlideEl).find('.video_container.active').length) {
                                    var plyr_loopcount = parseInt($(incomingSlideEl).attr('data-plyr-index')) - 1;
                                    if (!$('#hero_image_responsive').is(':visible')) {
                                        plyr_video_players[plyr_loopcount].play();
                                    }
                                }

                                if ($('#slideshow .slideshow_pager.location_pagination_enabled').length) {
                                    var previous_slide_text = ($('.slideshow-pager-item-wrapper.active').attr('aria-label'));
                                    var previous_slide_text_edit = previous_slide_text.substring(0, previous_slide_text.indexOf(' (Current slide)'));
                                    var new_aria_label = previous_slide_text_edit
                                } else {
                                    var previous_slide_number = parseInt($('.slideshow-pager-item-wrapper.active').attr('data-rel')) + 1;
                                    var new_aria_label = 'Go to slide ' + previous_slide_number
                                    $('.slideshow-pager-item-wrapper.active').removeClass('active').attr('aria-label', new_aria_label);
                                }

                                $('.slideshow-pager-item-wrapper.active').removeClass('active').attr('aria-label', new_aria_label);
                                var next_slideshow_item = (optionHash.nextSlide).toString();
                                var new_slide_aria_label = $('.slideshow-pager-item-wrapper[data-rel='+next_slideshow_item+']').attr('aria-label') + ' (Current slide)'

                                if ($('.slideshow-pager-item-wrapper[data-rel='+next_slideshow_item+']').hasClass('inactive')) {
                                    var current_aria_label = $('.slideshow-pager-item-wrapper[data-rel='+next_slideshow_item+']').first().text()
                                    $('.slideshow-pager-item-wrapper[data-rel='+next_slideshow_item+']').prevAll('.slideshow-pager-item-wrapper.remain_active:not(".active"):contains("' + current_aria_label + '")').addClass('active').attr('aria-label', new_slide_aria_label);
                                } else {
                                    $('.slideshow-pager-item-wrapper[data-rel='+next_slideshow_item+']').addClass('active').attr('aria-label', new_slide_aria_label);
                                }

                                window.galleries.slideshow.after(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag);
                            });

                            $(this).on('cycle-after', function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {
                                if ($(outgoingSlideEl).find('.video_container.active').length) {
                                    var plyr_loopcount = parseInt($(outgoingSlideEl).attr('data-plyr-index')) - 1;
                                    plyr_video_players[plyr_loopcount].pause();
                                    //console.log('pausing player' + plyr_loopcount);
                                }
                            });
                        }

                        $('#slideshow ul, #mirror-slideshow ul').cycle(mastersettings);

                        $(this).closest('#slideshow').find('.slideshow_pagination_prev').bind('click', function() {
                            $(this).closest('#slideshow').find('ul').cycle('pause').cycle('prev');
                            return false;
                        });

                        $(this).closest('#slideshow').find('.slideshow_pagination_next').bind('click', function() {
                            $(this).closest('#slideshow').find('ul').cycle('pause').cycle('next');
                            return false;
                        });

                        $('#slideshow.paused, #mirror-slideshow.paused')
                            .each(function () {
                                pausePlay();
                            })
                        ;
                    }

                    window.galleries.slideshow.homepage_slideshow.init();
                });

                if ($('#hero_image_responsive .slide_has_video').length) {
                    var plyr_loopcount = parseInt($('#hero_image_responsive .slide_has_video').attr('data-plyr-index')) - 1;
                    plyr_video_players[plyr_loopcount].on('ready', function(event) {
                        if ($('#hero_image_responsive').is(':visible')) {
                            plyr_video_players[plyr_loopcount].play();
                        }
                    });
                    if ($('#hero_image_responsive').is(':visible')) {
                        plyr_video_players[plyr_loopcount].play();
                    }
                }
            },

            initialized: function(event, optionHash) {

            },

            after: function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {

            },

            video_content: function(instance) {

                // instances = {}
                // plyr_video_players = Plyr.setup('.slide_video', {
                //     captions: {
                //         active: true
                //     },
                //     muted: true,
                //     loop: { active: true },
                //     controls: [] //controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'] //['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen']
                // });

                //plyr_video_players = Array.from(document.querySelectorAll('.slide_video')).map(player => new Plyr(player));

                if ($('.slide_has_video', instance).length) {

                    plyr_array = [];

                    $('.slide_has_video', instance).each(function () {
                        plyr_loopcount_global = parseInt(parseInt(plyr_loopcount_global) + parseInt(1));

                        $(this).attr('data-plyr-index', plyr_loopcount_global);
                        ////PLAYERS SETUP WAS PREVIOUSLY HERE... WHY?
                        if ($(this).find('.slide_video')){
                            $(this).find('.video_container').addClass('active');
                            plyr_array.push($(this).find('.slide_video')[0]);
                        }

                    }).promise().done( function(){

                        plyr_video_players = Plyr.setup(plyr_array, {

                            // These seem to replace, not extend the config options supplied in the markup. TBC
                            captions: {
                                active: true
                            },
                            muted: true,
                            volume: 0,
                            autoplay: false,
                            clickToPlay: false,
                            hideControls: false,
                            controls: []
                            // ratio: '1:1'
                        });
                    });
                }

                // Click event for video play/pause button
                $('#slideshow .video_pause_button, #hero_header .video_pause_button').each(function() {
                    $(this).off("click.videoPauseButton");
                    $(this).on("click.videoPauseButton", function(){
                        if ($(".pause_symbol", this).hasClass('paused')) {
                            var current_status = 'playing';
                            $(".pause_symbol", this).removeClass("paused");
                        } else {
                            var current_status = 'paused';
                            $(".pause_symbol", this).addClass("paused");
                        }
                        if ($(this).closest('#slideshow').length) {
                            var selector ='#slideshow .fullscreen_slideshow_video video';
                            var selector_active ='#slideshow .fullscreen_slideshow_video video';
                        } else {
                            var selector = '#mirror-slideshow .slide_has_video video';
                            var selector_active = '#mirror-slideshow .slide_has_video.cycle-slide-active video';
                        }
                        var active_video = $(selector);
                        if (active_video.length) {
                            if (current_status == 'playing') {
                                console.log('play');
                                console.log($(selector_active));
                                $(selector_active).each(function() {
                                    console.log('each');
                                    $(this).get(0).play();
                                });
                            } else {
                                $(selector).each(function(){
                                    $(this).addClass('paused');
                                    $(this).get(0).pause();
                                });
                            }
                        } else {
                            console.log('Cant find active video');
                        }
                    });
                });
            },


            video_content_embed_scale: function(instance) {

                //Simulate object fit for the video inside the iframe, based on the ratio of the video inside

                $(instance).find('.slide_has_video').each(function () {

                    var slideindex = parseInt($(this).attr('data-plyr-index')) - 1;
                    var embed_wrapper_height = $(this).find('.plyr__video-embed').closest('.video_container').height();
                    var embed_wrapper_width = $(this).find('.plyr__video-embed').closest('.video_container').width();
                    var embed_wrapper_portrait_landscape =  ((embed_wrapper_height >= embed_wrapper_width) ? 'portrait' : 'landscape');
                    if (typeof plyr_video_players[slideindex].config.ratio != 'undefined' && plyr_video_players[slideindex].config.ratio) {
                        var embed_ratio = plyr_video_players[slideindex].config.ratio;
                    } else {
                        var embed_ratio = '16:9'
                    }
                    var ratio_split = embed_ratio.split(':');

                    if (ratio_split.length == 2){

                        var embed_portrait_landscape = ((parseInt(ratio_split[1]) >= parseInt(ratio_split[0])) ? 'portrait' : 'landscape');
                        var embed_width_to_height_scale = ratio_split[1] / ratio_split[0];

                        if (embed_wrapper_portrait_landscape == 'portrait' && embed_portrait_landscape == 'landscape' || embed_wrapper_portrait_landscape == 'landscape' && embed_portrait_landscape == 'landscape'){

                            // Work out the height of the inner embed based on the aspect ratio
                            var embed_video_height = embed_width_to_height_scale * embed_wrapper_width;

                            if (embed_video_height <= embed_wrapper_height) {
                                var height_difference_scale = embed_wrapper_height / embed_video_height;
                                $(this).find('.plyr__video-embed').css('transform', 'scale(' + height_difference_scale + ')');
                                $(this).find('.plyr__video-embed').css('width', 'auto');
                            } else {
                                $(this).find('.plyr__video-embed').css('transform', 'scale(1.0)');
                                $(this).find('.plyr__video-embed').css('width', '100%');
                            }

                        }
                    }

                });
            },

            homepage_slideshow: {

                init: function() {

                    if ($('#content #slideshow.fullscreen_slideshow').length) {
                        var header_size = ($('#header:not(.header_transparent)').is(':visible') ? $('#header').outerHeight() : 0);
                        if (!$('.parallax-mirror #slideshow').length && header_size > 0) {

                            $(window).bind("load", function() {
                                // If the header height has changed after the page 'load' event, update the main_content padding again
                                // e.g. the height may change after webfonts have properly loaded
                                var header_size = $('#header').outerHeight();
                                if (parseInt($('#slideshow.fullscreen_slideshow').css('top')) > header_size) {
                                    $('#slideshow.fullscreen_slideshow').css('top', header_size);
                                    window.galleries.slideshow.homepage_slideshow.process();
                                }
                            });
                        }
                        $('body').addClass('type-fullscreen');
                        window.galleries.slideshow.homepage_slideshow.process();
                        $(window).resize(function() {
                            window.galleries.slideshow.homepage_slideshow.process();
                        });

                        if ($('#content #slideshow.fullscreen_slideshow').hasClass('fullscreen_video') && !$('#slideshow .fullscreen_slideshow_video').hasClass('initialized')) {
                            $('#slideshow .fullscreen_slideshow_video').addClass('initialized');
                            var isMobile = window.galleries.device.handheld();
                            if (!isMobile) {
                                var videobackground_muted = false
                                if ($('#slideshow .fullscreen_slideshow_video').attr('data-muted') == "True"){
                                    videobackground_muted = true
                                }
                                var videobackground = new $.backgroundVideo($('#slideshow .fullscreen_slideshow_video'), {
                                    "align": "centerX",
                                    "width": 1920,
                                    "height": 1080,
                                    "path": "",
                                    "filename": $('#slideshow .fullscreen_slideshow_video').attr('data-video'),
                                    "container": "#slideshow .fullscreen_slideshow_video",
                                    "muted": videobackground_muted
                                    //"types": ["mp4","webm"]
                                });

                                if (!videobackground_muted) {
                                    // Only unmute video if an interaction has already taken place with the page - this is because certain browsers block video sound if no interactions have taken place
                                    // If auto-unmute is not possible, unmute on click
                                    $('#slideshow .fullscreen_slideshow_video video').click(function() {
                                        $('#slideshow .fullscreen_slideshow_video video')[0].muted = false;
                                    });
                                }
                                if ($.browser.safari) {
                                    $('#video_background').get(0).play();
                                }
                            }
                        }
                    }

                    if ($('#content #slideshow.split_slideshow').length) {
                        var header_size = ($('#header:not(.header_transparent)').is(':visible') ? $('#header').outerHeight() : 0);
                        if (!$('.parallax-mirror #slideshow').length && header_size > 0) {

                            $(window).bind("load", function() {
                                // If the header height has changed after the page 'load' event, update the main_content padding again
                                // e.g. the height may change after webfonts have properly loaded
                                var header_size = $('#header').outerHeight();
                                if (parseInt($('#slideshow.split_slideshow').css('top')) > header_size) {
                                    $('#slideshow.split_slideshow').css('top', header_size);
                                    window.galleries.slideshow.homepage_slideshow.process();
                                }
                            });
                        }
                        $('body').addClass('type-split-slideshow');
                        window.galleries.slideshow.homepage_slideshow.process();
                        $(window).resize(function() {
                            window.galleries.slideshow.homepage_slideshow.process();
                        });

                    }
                },

                process: function() {
                    if ($('#slideshow.fullscreen_slideshow').length) {
                        var cms_toolbar_height = 0;
                        if ($('body').hasClass('cms-frontend-toolbar-active') && $('#cms-frontend-toolbar-container').length) {
                            var cms_toolbar_height = $('#cms-frontend-toolbar-container').outerHeight();
                        }
                        // var header_offset = ($('#header').is(':visible') ? $('#header').outerHeight() : 0);
                        // if ($('#header').css('position') == 'fixed' || $('#header').css('position') == 'absolute') {
                        //     var header_offset = 0;
                        // }
                        var slideshow_offset_top = parseInt($('#content #slideshow.fullscreen_slideshow').offset().top);
                        var slideshow_height = $(window).height() - ($('#header').is(':visible') ? slideshow_offset_top : 0);
                        var header_height = $('.header-fixed-wrapper').height();
                        $('#content #slideshow.fullscreen_slideshow').height(slideshow_height);
                        // debugger;
                        $('#main_content').css('padding-top', $('#content #slideshow.fullscreen_slideshow').outerHeight(true) + (slideshow_offset_top - cms_toolbar_height) - header_height);
                        if (!window.galleries.device.handheld()) {
                            $('.fullscreen_slideshow_parallax').each(function() {
                                //$(this).parallax({imageSrc: $(this).attr('data-image-src')});
                            });
                        }
                    }

                    if ($('#slideshow.split_slideshow').length) {
                        var cms_toolbar_height = 0;
                        if ($('body').hasClass('cms-frontend-toolbar-active') && $('#cms-frontend-toolbar-container').length) {
                            var cms_toolbar_height = $('#cms-frontend-toolbar-container').outerHeight();
                        }
                        // var header_offset = ($('#header').is(':visible') ? $('#header').outerHeight() : 0);
                        // if ($('#header').css('position') == 'fixed' || $('#header').css('position') == 'absolute') {
                        //     var header_offset = 0;
                        // }
                        var slideshow_offset_top = parseInt($('#content #slideshow.split_slideshow').offset().top);
                        var slideshow_height = $(window).height() - ($('#header').is(':visible') ? slideshow_offset_top : 0);
                        var header_height = $('.header-fixed-wrapper').height();
                        $('#content #slideshow.split_slideshow').height(slideshow_height);
                        // debugger;
                        $('#main_content').css('padding-top', $('#content #slideshow.split_slideshow').outerHeight(true) + (slideshow_offset_top - cms_toolbar_height) - header_height);
                        if (!window.galleries.device.handheld()) {
                            // $('.fullscreen_slideshow_parallax').each(function() {
                            //     //$(this).parallax({imageSrc: $(this).attr('data-image-src')});
                            // });
                        }
                    }

                }

            }

        },

        vertical_homepage_slideshow: {

            init: function() {
                $('.fullscreen_vertical_slideshow').each(function() {

                    $('body').addClass("type-fullscreen");

                    // adjust height of slideshow placeholder to take into account a header which is not position absolute or fixed
                    function adjustPlaceholderHeight() {
                        if (($('#header').css('position') != 'absolute') && $('#header').css('position') != 'fixed') {
                            $(".vertical_slideshow_placeholder").height($(window).height() - $('#header').height() - parseInt($('#main_content').css('padding-top')));
                        }
                    }
                    // adjust placeholder height on window resize
                    $(window).resize(function() {
                        adjustPlaceholderHeight();
                    });

                    //remove padding from #main_content if there is no content to show below the slideshow other than the footer
                    if ($(this).hasClass("enable-content-below") && !$(this).hasClass("content_below_slideshow")) {
                        $('#main_content').css("padding-top", 0);
                    }

                    // default selected options
                    var fullpagejs_options = {
                        licenseKey: '5A2280FB-CB764510-B00655ED-19C855BB',
                        scrollBar: false,
                        css3: true,
                        autoScrolling: true,
                        verticalCentered: false,
                        navigation: true,
                        navigationPosition: 'right',

                        // on the last section of the slideshow, decouple the slideshow and allow normal scroll if there is content below
                        nextOnLastSection: function(next){
                            if (next && $('.fullscreen_vertical_slideshow').hasClass("enable-content-below")) {

                                $('body').addClass("fp-scroll-enabled");
                                $('body').removeClass("fp-scroll-locked");
                                $('#fp-nav').addClass("hide-nav");
                                fullpage_api.setAllowScrolling(false);
                                fullpage_api.setKeyboardScrolling(false);
                                $('html').css({'overflow' : 'visible'});
                                $('body').css({'overflow' : 'visible'});
                                if (window.galleries.device.handheld()) {
                                    // $("body").animate({ scrollTop: window.innerHeight }, 500);
                                    $('body').addClass("auto-scrolling");
                                    $('html,body').animate(
                                        {scrollTop: $(window).height()},
                                        300,
                                        'easeInOutQuad',
                                        function() { $('body').removeClass("auto-scrolling"); }
                                    );
                                }
                                // window.scrollBy(0, window.innerHeight, 'smooth');
                            }
                        },

                        // add scrolling direction class so that it can work with headers which roll away on scroll
                        onLeave: function(origin, destination, direction){
                            if (direction == 'up') {
                                $('#container').removeClass("scrolling-down");
                            } else if (direction == 'down') {
                                $('#container').addClass("scrolling-down");
                            }
                            // remove the zero opacity which is added so the second from last slide cant be seen when the page bounces when it reaches the top
                            if ( origin.index == ($('.fp-section').length - 1) && $('body').hasClass("fp-scroll-enabled") ) {
                                $('body').removeClass("fp-scroll-enabled");
                                $('body').addClass("fp-scroll-locked");
                            }
                            window.galleries.slide_brightness.slide_brightness_change_class(destination.item, $('body'));
                        },

                        afterLoad: function(origin, destination, direction){
                            window.galleries.slide_brightness.slide_brightness_change_class(destination.item, $('body'));
                        }
                    }

                    // pass through custom fullpage.js options - set as a dict within gallery setting - 'homepage_slideshow_fullpagejs_settings'
                    var fullpagejs_new_settings;
                    if ($(".fullscreen_vertical_slideshow").attr('data-fullpagejs-custom-settings'))  {
                        var fullpagejs_new_settings = $.parseJSON($(".fullscreen_vertical_slideshow").attr('data-fullpagejs-custom-settings'));
                    }

                    // add new settings to the default settings dict
                    for (var newkey in fullpagejs_new_settings) {
                        fullpagejs_options[newkey] = fullpagejs_new_settings[newkey];
                    }

                    // Run slideshow
                    $(this).fullpage(fullpagejs_options);

                    // Check for single slideshow items
                    if ($('.section', this).length < 2) {
                        $('#fp-nav').addClass("single-slideshow-item");
                    }

                    // if there is content below the slideshow this allows you to scroll back into the slideshow
                    $(window).bind('scroll.vertical_slideshow', function (event) {
                        var scroll = $(window).scrollTop();

                        if (scroll <= 0 && $('.fullscreen_vertical_slideshow').hasClass("enable-content-below") && !$('body').hasClass("auto-scrolling")) {
                            $('body').addClass("fp-scroll-locked");
                            $('html').css({'overflow' : 'hidden'});
                            $('body').css({'overflow' : 'hidden'});
                            $('#fp-nav').removeClass("hide-nav");
                            fullpage_api.setAllowScrolling(true);
                            fullpage_api.setKeyboardScrolling(true);
                        }
                    }).trigger('scroll.vertical_slideshow');
                });

                // clear history of scroll position so that on reload the page scroll is at the top
                if ('scrollRestoration' in history) {
                    history.scrollRestoration = 'manual';
                }
            }
        },

        cover_page_slideshow: {

            init: function() {

                $('#cover_page_slideshow').each(function() {

                    var cycleSpeed = 1200;
                    if ($('#cover_page_slideshow').attr('data-cycle-speed-setting'))  {
                        var cycleSpeed = $("#cover_page_slideshow").attr('data-cycle-speed-setting');
                    }

                    var cycleFx = 'fade';
                    if ($('#cover_page_slideshow').attr('data-cycle-fx-setting'))  {
                        var cycleFx = $("#cover_page_slideshow").attr('data-cycle-fx-setting');
                    }

                    var startingSlide = 0;
                    if ($('#cover_page_slideshow .item.item_starting_slide').length) {
                        var startingSlide = $('#cover_page_slideshow .item.item_starting_slide').index();
                    }

                    var slideshowtimeout = 6000;
                    if ($("#cover_page_slideshow").attr('data-cycle-timeout-setting'))  {
                        var slideshowtimeout = parseInt($("#cover_page_slideshow").attr('data-cycle-timeout-setting'));
                    }

                    $('body').addClass('type-cover-page type-fullscreen');

                    $('#cover_page_slideshow ul').cycle({
                        fx:       cycleFx,
                        //loader: 'wait',
                        speed:    cycleSpeed,
                        timeout:  slideshowtimeout,
                        pause:    0,
                        slides: '.item',
                        //autoHeight: 'calc',
                        autoHeight: false,
                        swipe: true,
                        startingSlide: startingSlide
                    });
                    window.galleries.cover_page_slideshow.cover_page_pager();
                    window.galleries.cover_page_slideshow.cover_page_caption();
                });

            },
            cover_page_pager: function() {
                var $pager = $('#cover_page_slideshow_number');
                var onfunction = $('#cover_page_slideshow').on;
                if (onfunction) {
                    $('#cover_page_slideshow').on('cycle-before', function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {
                        var next_number = (optionHash.nextSlide + 1).toString();
                        $pager.find('.pager-number-current').text(next_number);
                    });
                }
                $('#cover_page_slideshow_button_prev').click(function() {
                    $('#cover_page_slideshow ul').cycle('pause');
                    $('#cover_page_slideshow ul').cycle('prev');
                });
                $('#cover_page_slideshow_button_next').click(function() {
                    $('#cover_page_slideshow ul').cycle('pause');
                    $('#cover_page_slideshow ul').cycle('next');
                });
            },
            cover_page_caption: function() {

                var $caption = $('#cover_page_slideshow_pager');
                var onfunction = $('#cover_page_slideshow').on;
                if (onfunction) {
                    $('#cover_page_slideshow').on('cycle-before', function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {
                        var this_instance = $caption.closest('#cover_page_slideshow_container').find('#cover_page_slideshow ul');
                        var this_caption = ($(incomingSlideEl, this_instance).attr('data-rel') && typeof $(incomingSlideEl, this_instance).attr('data-rel') != 'undefined' ? $(incomingSlideEl, this_instance).attr('data-rel') : $(incomingSlideEl, this_instance).attr('rel'));
                        if (this_caption && typeof this_caption != 'undefined') {
                            var this_caption = this_caption.replace(/\n/g,'');
                        }
                        $('#cover_page_slideshow_caption .content').html(this_caption);
                    });

                }
            }
        },

        slide_brightness: {

            init: function() {

                // if ($("#logo").hasClass('auto_brightness_disabled')){

                //     if ($("#logo").attr('data-logo-image-variant-light') && typeof $("#logo").attr('data-logo-image-variant-light') !== 'undefined') {
                //         var logo = document.getElementById("#logo");
                //         var logo_image_url = $("#logo").attr('data-logo-image-variant-light');
                //         logo.pseudoStyle("after","background-image",logo_image_url);
                //     }
                // }

                var $slideshow_selector = $('#slideshow.fullscreen_slideshow.override-slide-brightness ul, #slideshow.fullscreen_slideshow.detect-slide-brightness ul, #cover_page_slideshow.detect-slide-brightness ul, .fullscreen_vertical_slideshow');
                var $addclass_element = $('body');

                $slideshow_selector.each(function() {
                    var $slideshow = $(this);
                    var section_element;

                    if ($slideshow.hasClass('fullscreen_vertical_slideshow')) {
                        section_element = '.section'
                    } else {
                        section_element = 'li'
                    }
                    if ($(this).closest('.override-slide-brightness').length == 0) {
                        $slideshow.find(section_element).each(function() {
                            var $slide = $(this),
                                $image
                            if (section_element == '.section') {
                                $image = $slide
                            } else {
                                $image = $slide.find('.image');
                            }
                            if ($image.css('background-image') != 'none') {
                                $slide.addClass('fullscreen-slide-brightness-detected');
                                var bg_image = $image.css('background-image');
                                var image_src = bg_image.replace('url(','').replace(')','').replace(/\"/gi, "");

                                window.galleries.slide_brightness.image_brightness(image_src,function(lightordark) {
                                    $slide.addClass('fullscreen-slide-image-'+lightordark);
                                    if ($slideshow.find('.cycle-slide-active').length || $slideshow.find('.active').length) {
                                        if ($slide.hasClass('cycle-slide-active') || $slide.hasClass('active')){
                                            window.galleries.slide_brightness.slide_brightness_change_class($slide,$addclass_element);
                                            $addclass_element.addClass('fullscreen-slide-brightness-initiated');
                                        }
                                    } else if (!$addclass_element.hasClass('fullscreen-slide-brightness-initiated')) {
                                        var $first_slide = $slideshow.find(section_element).first();
                                        window.galleries.slide_brightness.slide_brightness_change_class($first_slide,$addclass_element);
                                        $addclass_element.addClass('fullscreen-slide-brightness-initiated');
                                    }
                                });
                            }
                        });
                    }
                    window.galleries.slideshow.after = function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {
                        window.galleries.slide_brightness.slide_brightness_change_class(incomingSlideEl,$addclass_element);
                    }
                    var onfunction = $slideshow_selector.on;
                    if (onfunction) {
                        $slideshow_selector.on('cycle-before', function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {
                            window.galleries.slide_brightness.slide_brightness_change_class(incomingSlideEl,$addclass_element);
                        });
                    }

                    // Process brightness on the first slide initially
                    if ($('#slideshow.fullscreen_slideshow.override-slide-brightness ul').length) {
                        window.galleries.slide_brightness.slide_brightness_change_class($('#slideshow ul li').not('.cycle-sentinel').filter(':eq(0)'),$('body'));
                    }
                    setTimeout(function() {
                        if ($('#slideshow.fullscreen_slideshow.detect-slide-brightness ul').length) {
                            window.galleries.slide_brightness.slide_brightness_change_class($('#slideshow ul li').not('.cycle-sentinel').filter(':eq(0)'),$('body'));
                        } else if ($('#cover_page_slideshow.detect-slide-brightness ul').length) {
                            window.galleries.slide_brightness.slide_brightness_change_class($('#cover_page_slideshow ul li').not('.cycle-sentinel').filter(':eq(0)'),$('body'));
                        } else if ($('.fullscreen_vertical_slideshow').length) {
                            window.galleries.slide_brightness.slide_brightness_change_class($('.fullscreen_vertical_slideshow .section').not('.cycle-sentinel').filter(':eq(0)'),$('body'));
                        }
                    }, 500);
                });

            },

            image_brightness: function detect(imageSrc, callback) {

                var fuzzy = 0.2;
                var img = document.createElement("img");

                img.crossOrigin = "Anonymous";
                img.src = imageSrc;
                img.style.display = "none";

                if (!(imageSrc in imagesAlreadyChecked)) {
                    document.body.appendChild(img);
                    imagesAlreadyChecked[imageSrc] = false
                }

                // if image has previously been check return previous results otherwise run the calculation
                if (imagesAlreadyChecked[imageSrc]) {
                    callback(imagesAlreadyChecked[imageSrc]);

                } else {

                    img.onload = function() {
                        // create canvas
                        var canvas = document.createElement("canvas");
                        //create it at a third of the size
                        canvas.width = this.width;
                        canvas.height = this.height;

                        //brightness of the channel as is done in the HSV color space
                        var ctx = canvas.getContext("2d");
                        ctx.drawImage(this,0,0);
                        var imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
                        var data = imageData.data;
                        var r,g,b, max_rgb;
                        var light = 0, dark = 0;

                        for(var x = 0, len = data.length; x < len; x+=4) {
                            r = data[x];
                            g = data[x+1];
                            b = data[x+2];
                            max_rgb = Math.max(Math.max(r, g), b);
                            /*if (max_rgb < 128) {*/
                            ///console.log(max_rgb);
                            if (max_rgb < 193) {
                                dark++;
                            } else {
                                light++;
                            }
                        }
                        var dl_diff = ((light - dark) / (this.width*this.height));
                        if (dl_diff + fuzzy < 0) {
                            callback('dark');
                            imagesAlreadyChecked[imageSrc] = 'dark';
                        } else {
                            callback('light');
                            imagesAlreadyChecked[imageSrc] = 'light';
                        }
                        document.body.removeChild(img);
                    };

                }
            },

            slide_brightness_change_class: function (slide,$addclass_element){
                var $slide = $(slide);

                if ($slide.length && $slide.hasClass('fullscreen-slide-brightness-detected') && ($slide.hasClass('fullscreen-slide-image-dark') || $slide.hasClass('fullscreen-slide-image-light'))) {

                    $addclass_element.removeClass('fullscreen-slide-light fullscreen-slide-dark');

                    if ($slide.hasClass('fullscreen-slide-brightness-detected')){
                        if ($slide.hasClass('fullscreen-slide-image-dark')){
                            $addclass_element.addClass('fullscreen-slide-dark');
                        } else if ($slide.hasClass('fullscreen-slide-image-light')){
                            $addclass_element.addClass('fullscreen-slide-light');
                        }
                    }
                    setTimeout(function () {
                        if (! $addclass_element.hasClass('fullscreen-slide-brightness-transition')){
                            $addclass_element.addClass('fullscreen-slide-brightness-transition');
                        }
                    }, 500);

                }

            }
        },

        artist_list_preview: {

            init: function() {
                if (h.element_exists('#list_preview_slideshow') && !$('#list_preview_slideshow').hasClass('no-slideshow')) {

                    var selector = $("#list_preview_slideshow >").not('.cycle-sentinel');
                    var random_slide_index = Math.floor(Math.random() * selector.length);



                    if ($('#list_preview_slideshow').hasClass('content_follow')) {
                        window.galleries.layout.content_follower('#list_preview_slideshow', '#sidebar');
                    }

                    var params = {
                        fx:     'fade',
                        speed:    400,
                        timeout:  4500,
                        pause:   0,
                        before: function(cSlide, nSlide, options) {

                        },
                        after: function(cSlide, nSlide, options) {

                        },
                        slides: '>',
                        startingSlide: parseInt(random_slide_index),
                        autoHeight: 'calc'
                    };

                    // Accessibility - initiate slideshow in a paused state. Enabled by disable_artist_list_slideshow_autoplay gallery setting
                    if ($('#list_preview_slideshow').length && $('#list_preview_slideshow').hasClass('start_paused')) {
                        params.paused = true
                    }

                    //if($.browser.safari){
                    //    params["loader"] = "wait";
                    //}

                    $('#list_preview_slideshow').cycle(params);

                    if (!window.galleries.device.handheld()) {
                        $('#list_preview_navigation a').mouseover(function () {
                            if ($('#list_preview_slideshow').is(':visible')) {
                                $('#list_preview_slideshow').cycle('pause');
                                $('#list_preview_slideshow').cycle(parseInt($(this).attr('data-index')) - 1);
                                return false;
                            }
                        });
                    }

                    window.galleries.artist_list_preview.sidebar_height();

                    $(window).resize(function(){
                        window.galleries.artist_list_preview.sidebar_height();
                    });

                    if ($('.subsection-artist-list-preview.list-preview-fullbleed, .subsection-artist-list-preview.list-preview-random-position').length) {

                        window.galleries.artist_list_preview.vertically_centre_artist_list.init();

                        if ($('.subsection-artist-list-preview.list-preview-fullbleed').length) {
                            $('body').addClass('type-fullscreen');
                        }
                        $('#list_preview_slideshow').each(function() {
                            $('.image', this).each(function() {

                                var image_src = $(this).find('img').attr('src');
                                if (image_src && typeof image_src != 'undefined') {
                                    //DC - not sure, but this breaks the list sometimes, and seems to not be needed.
                                    // if ($('.subsection-artist-list-preview.list-preview-random-position').length) {
                                    //     //window.theme.list_preview_slideshow.shuffle_position(this);
                                    // }
                                    $('a', this).css({
                                        'background-image': 'url(' + image_src + ')'
                                    });
                                }

                            });

                            if ($('.subsection-artist-list-preview.list-preview-random-position').length) {
                                $('#list_preview_slideshow').on('cycle-before', function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {
                                    $(incomingSlideEl).each(function() {
                                        window.galleries.artist_list_preview.shuffle_position(this);
                                    });
                                });
                            }
                        });
                        $(window).resize(function() {
                            window.galleries.layout.push_to_fullheight('.subsection-artists-list', 'min-height',  0, 0);
                        });

                    }

                }
            },

            sidebar_height: function(){
                var img_height = 0;
                $( window ).load( function() {
                    img_height = $("#sidebar .cycle-sentinel").height();
                    $('#sidebar').height(img_height);
                });
            },

            shuffle_position: function(instance) {

                if (instance) {
                    $(instance).each(function() {
                        var pos_x = Math.floor(Math.random() * 100) + 1;
                        var pos_y = Math.floor(Math.random() * 100) + 1;
                        var offset_top_y = Math.floor(Math.random() * 100) + 1;
                        var offset_bottom_y = Math.floor(Math.random() * 100) + 1;
                        $('a', this).css({
                            'background-position': pos_x + '% ' + pos_y + '%',
                            'top': offset_top_y + 'px',
                            'bottom': offset_bottom_y + 'px'
                        });
                    });
                }
            },

            vertically_centre_artist_list: {

                init: function() {
                    if ($('.x-subsection-artist-list-preview, .subsection-artist-list-standard').length) {
                        $('body').addClass('list-type-vertical-align');
                        $('.subsection-artist-list-preview, .subsection-artist-list-standard').each(function() {
                            $(this).closest('#content').addClass('vertical-align-middle');
                            window.galleries.artist_list_preview.vertically_centre_artist_list.push_to_fullheight();
                            $(window).resize(function() {
                                window.galleries.artist_list_preview.vertically_centre_artist_list.push_to_fullheight();
                            });
                        });
                    }
                },
                push_to_fullheight: function() {
                    var content_module_offset = $('#content').offset().top;
                    $('#content').css({'min-height':'calc(100vh - '+content_module_offset+'px)'});
                }
            },

        },
        artist_list_columns: {

            init: function() {


                if ($('.artists_list_dynamic_columns').length) {

                    window.galleries.artist_list_preview.vertically_centre_artist_list.init();

                    $('.artists_list_dynamic_columns .artist_list_section_wrapper').each(function(i) {

                        var $this = $(this);
                        var instance_number = (i + 1).toString();
                        var list_original_id = '#artists_list_original_wrapper_' + instance_number;
                        var list_formatted_id = '#artists_list_formatted_wrapper_' + instance_number;

                        /*
                            1.  Format the column widths correctly. It takes the desktop column width as an 'ideal' size, and tries to maintain that as the
                                browser scales down. As each column becomes too small, the number of columns reduces.

                            2.  Distributes the items into each column correctly. The items flow downwards then are broken into the next column. E.g 15 items / 5 column grid:
                                A   D   G   J   M
                                B   E   H   K   N
                                C   F   I   L   O

                                --------------------------------------------------------

                                E.g. 17 items / 5 column grid

                                DISTRIBUTION METHOD A:
                                The script works out how to fill the columns as evenly as possible, then works out which columns should have more items.
                                Visually appears a bit like inline-block flowing (horizontal), although the items still actually flow vertically:

                                A   D   G   J   M
                                B   E   H   K   N
                                C   F   I   L   O
                                P   Q


                                DISTRIBUTION METHOD B:

                                A   E   I   M   Q
                                B   F   J   N
                                C   G   K   O
                                D   H   L   P
                        */

                        //Take the lists and break them into a hidden original list and container for our reformatted version.
                        $this.append('<div id="'+list_original_id.substring(1)+'" class="artists-list-original-wrapper">' + $this.html() + '</div>');
                        $this.children('ul').remove();
                        $this.append('<div id="'+list_formatted_id.substring(1)+'" class="artists-list-formatted-wrapper clearwithin"></div>');


                        // Ideal column width is influenced by the font size to ensure bunching of columns does not occur.
                        var ideal_column_width = 220;
                        var font_size = parseInt($('.artists-list-original-wrapper h2').css('font-size'));
                        ideal_column_width = ideal_column_width * (font_size / 13);

                        $(window).resize(function() {

                            $(list_original_id).show();
                            $(list_formatted_id).html('');

                            var columns;
                            var column_fill_method = 'a'; //OPTIONS A or B... EXPLAINED ABOVE
                            var container_width = parseInt($this.width());

                            //How many desired columns fit within the container (at desktop size).
                            var initially_set_columns = Math.floor(container_width + 20) / $(list_original_id+' > ul').outerWidth();

                            //How many columns actually fit within the container at the *current* viewport size.
                            var columns_that_fit = Math.floor(container_width / ideal_column_width);


                            //If we can use our desired amount, great - otherwise fit as many as possible in this viewport.
                            if (initially_set_columns >= columns_that_fit) {
                                columns = columns_that_fit;
                            } else {
                                columns = initially_set_columns;
                            }

                            // NEW CODE 2018
                            // THERE SHOULD ALWAYS BE AT LEAST 1 COLUMN
                            // THIS ATTEMPTS TO FIX A BUG WHERE WHEN THE SCREEN SIZE WAS < 387px THE LIST WOULD NOT RENDER. REMOVE THE FOLLOWING TO TEST.
                            if(columns < 1){
                                columns = 1;
                            }
                            // END OF NEW CODE

                            var column_width = 1 / columns * 100;
                            var total_items = $(list_original_id).find('li').length;


                            if (column_fill_method == 'a') {
                                /*
                                    DISTRIBUTION METHOD A:

                                    A   D   G   J   M
                                    B   E   H   K   N
                                    C   F   I   L   O
                                    P   Q

                                */
                                //Work out how many items would 'evenly' fill up the columns
                                var evenly_filled_items_number = Math.floor(total_items / columns);

                                // How many extra items are we left with? These to be evenly distributed across columns.
                                remainder = total_items % columns;

                            } else {

                                /*
                                    DISTRIBUTION METHOD B:

                                    A   E   I   M   Q
                                    B   F   J   N
                                    C   G   K   O
                                    D   H   L   P

                                */
                                var evenly_filled_items_number = Math.ceil(total_items / columns);
                                remainder = 0;
                            }


                            var current_item_index = 0;

                            for (var i = 0; i < columns; i++) {
                                var extra_items_in_col = 0;
                                if (remainder > 0) {
                                    var extra_items_in_col = 1;
                                    remainder = remainder - 1;
                                }
                                // Create columns with correct distribution.
                                $(list_formatted_id).append('<ul class="dynamic-column"></ul>');
                                $(list_original_id).find('li').slice(current_item_index, current_item_index + evenly_filled_items_number + extra_items_in_col).each(function() {
                                    var this_li_html = $(this).clone().wrap('<div>').parent().html();
                                    $(list_formatted_id+' ul:last-child').append(this_li_html);
                                });
                                var current_item_index = current_item_index + evenly_filled_items_number + extra_items_in_col;
                            }
                            $(list_formatted_id+' ul').css('width',column_width + '%');
                            $(list_original_id).hide();

                            window.galleries.artist_list_preview.init();
                            if ($.pageload && typeof $.pageload != 'undefined') {
                                if($.pageload.fn && $.pageload.fn != 'undefined'){
                                    $.pageload.fn.pages.add_click_events();
                                }
                            }

                        }).trigger('resize');
                        window.galleries.layout.init();
                    });



                }
            }
        },
        artist_list_slideshow: {

            init: function() {
                if (h.element_exists('#artist_list_slideshow') && !$('#artist_list_slideshow').hasClass('no-slideshow')) {

                    if ($('#artist_list_slideshow').hasClass('content_follow')) {
                        window.galleries.layout.content_follower('#artist_list_slideshow', '#sidebar');
                    }

                    $('#artist_list_slideshow ul').cycle({
                        fx:     'fade',
                        speed:    400,
                        timeout:  7000,
                        pause:   0,
                        before: function(cSlide, nSlide, options) {
                            $('#artist_list_slideshow_nav a').removeClass('active');
                            link_id = nSlide.id.replace('artist_list_slideshow_', 'artist_list_');
                            $('#artist_list_slideshow_nav #' + link_id).addClass('active');
                        },
                        after: function(cSlide, nSlide, options) {
                            link_id = nSlide.id.replace('artist_list_slideshow_', 'artist_list_');
                            $('#artist_list_slideshow_nav #' + link_id).addClass('active');
                        },
                        slides: '>',
                        autoHeight: 'calc'
                    });

                    var onfunction = $('#artist_list_slideshow ul').on;
                    if (onfunction) {
                        // Method for jQuery Cycle 2 ONLY

                        // Function fired directly before the slide changes
                        $('#artist_list_slideshow ul').on('cycle-before', function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {
                            $('#artist_list_slideshow_nav a').removeClass('active');
                            link_id = $(incomingSlideEl).attr('id').replace('artist_list_slideshow_', 'artist_list_');
                            $('#artist_list_slideshow_nav #' + link_id).addClass('active');
                        });
                    }

                    if ($('#artist_list_slideshow.slideshow_pause').size() > 0) {
                        $('#artist_list_slideshow ul').cycle('pause');
                    }

                    $('#artist_list_slideshow_nav a').mouseover(function () {
                        if ($('#artist_list_slideshow').is(':visible')) {
                            $('#artist_list_slideshow ul').cycle('pause');
                            $('#artist_list_slideshow ul').cycle(parseInt($(this).attr('id').split('artist_list_item')[1] - 1));
                            return false;
                        }
                    });

                }
            }
        },

        artworks: {

            init: function() {
                // If using the version of the template where the filter panel is loaded
                // in via AJAX (it's slow to render so this method can take advantage of
                // caching), load in the panel and make it visible.
                if ($('#artworks_filter_panel').length) {

                    var queryString = $('#artworks_filter_panel').data('query_string');
                    queryString = queryString ? '?' + queryString : '';
                    if ($('#artworks_filter_panel').html().trim() === '' && $('#artworks_filter_panel').hasClass('hidden')) {
                        $.get('/artwork_filters/' + queryString, function(html) {
                            $('#artworks_filter_panel').html(html).removeClass('hidden');
                            window.galleries.artwork_filters.init();
                            if ($('#artworks_grid_ajax').html().trim() === '') {
                                window.galleries.artwork_filters.load_works_api();
                            }
                            $('#artworks_filter_panel').css('min-height', '');
                        });
                    } else {
                        window.galleries.artwork_filters.init();
                    }

                    // Load hash permalinks
                    var filterPermalink = '';
                    if (window.location.hash && typeof window.location.hash != 'undefined') {
                        if (window.location.hash.indexOf('#filters=') == 0) {
                            filterPermalink = window.location.hash.replace('#filters=', '');
                            var queryString = filterPermalink ? '?' + filterPermalink : '';
                            if (queryString && queryString != '') {
                                window.galleries.artwork_filters.load_works_api('/modules/get_artworks/' + queryString);
                                $.get('/artwork_filters/' + queryString, function(html) {
                                    $('#artworks_filter_panel').html(html);
                                    window.galleries.artwork_filters.init();
                                });
                                $('body').addClass('artwork-filters-active');
                            }
                        }
                    }

                    if (typeof window.onpopstate != 'undefined') {
                        window.onpopstate = function(event) {
                            if (!$('#filterpanel_form').hasClass('forced-hash-change') && window.location.hash && typeof window.location.hash != 'undefined') {
                                if (window.location.hash.indexOf('#filters=') == 0) {
                                    filterPermalink = window.location.hash.replace('#filters=', '');
                                    var queryString = filterPermalink ? '?' + filterPermalink : '';
                                    if (queryString && queryString != '') {
                                        window.galleries.artwork_filters.load_works_api('/modules/get_artworks/' + queryString);
                                        $.get('/artwork_filters/' + queryString, function(html) {
                                            $('#artworks_filter_panel').html(html);
                                            window.galleries.artwork_filters.init();
                                        });
                                    }
                                }
                            }
                            $('#filterpanel_form').removeClass('forced-hash-change');
                        };
                    }
                }

                if ($('#artwork_description2_reveal_button').size() > 0) {
                    window.galleries.artworks.artwork_description2_reveal_button();
                }
                if ($('#artwork_description2_hide_button').size() > 0) {
                    window.galleries.artworks.artwork_description2_hide_button();
                }
                if ($('#artist_list.artist_image_on_hover').size() > 0) {
                    window.galleries.artworks.artist_list_artist_image_on_hover();
                }
                if ($('#artwork_descriptive_read_more_button').size() > 0) {
                    window.galleries.artworks.artwork_descriptive_read_more_button();
                }

                if ($(".roomview-image").length) {

                    $(".roomview-image").each(function(){

                        if ($(this).hasClass('roomview-photo-image')) {

                            var rv_options = {
                                zoom_enabled: typeof $(this).attr('data-roomview-zoom-disabled') != 'undefined' ? false : true,
                                zoom_scrollwheel_enabled: typeof $(this).attr('data-roomview-scrollwheel-disabled') != 'undefined' ? false : true
                            }

                            $(this).roomViewPhoto(rv_options);

                        } else {

                            var rv_options = {
                                furniture_type: 'chair',
                                wall_type: 'standard', // Options: 'standard', 'concrete', 'brick'
                                verbose_mode: false
                            }
                            // Supply a json config in the html:  data-roomview-custom-config='{"furniture_type":"my_chair","furniture_items": {"rs_chair":{"classname_suffix":"my_chair","furniture_width_cm":148}}}'
                            var custom_config = $(this).data('roomview-custom-config');

                            if (custom_config && typeof custom_config != 'undefined') {
                                if (custom_config.furniture_type && typeof custom_config.furniture_type != 'undefined') {
                                    rv_options["furniture_type"] = custom_config.furniture_type;
                                }
                                if (custom_config.furniture_items && typeof custom_config.furniture_items != 'undefined') {
                                    rv_options.furniture_items = custom_config.furniture_items;
                                }
                                if (custom_config.wall_type && typeof custom_config.wall_type != 'undefined') {
                                    rv_options["wall_type"] = custom_config.wall_type;
                                }
                                if (custom_config.floor_type && typeof custom_config.floor_type != 'undefined') {
                                    rv_options["floor_type"] = custom_config.floor_type;
                                }
                            }

                            $(this).roomView(rv_options);
                        }

                    });

                    $('.roomview-button-custom').unbind().click(function(e) {

                        e.preventDefault();

                        // For accessibility - tracks which element to refocus on
                        try {
                            h.accessibility.global_variables.element_to_refocus_to = $(this).children('a');
                        } catch(error) {
                            console.error(error);
                        }

                        var roomview_id = $(this).attr('data-roomview-id');
                        if (roomview_id && typeof roomview_id != 'undefined') {
                            if ($('#image_gallery').find('.image_gallery_multiple').length) {
                                var roomview_instance = $('#image_gallery .item:not(.cycle-sentinel) .roomview-image[data-roomview-id="' + roomview_id + '"]');
                            } else {
                                var roomview_instance = $('#image_gallery .roomview-image[data-roomview-id="' + roomview_id + '"]');
                            }
                            if ($('#image_gallery').find('.image_gallery_multiple').length && !$('.image_gallery_multiple .item:not(.cycle-sentinel) .roomview-image[data-roomview-id="' + roomview_id + '"]').closest('.item').hasClass('cycle-slide-active')) {

                                // Change slide before view in a room starts
                                var this_slide_index = roomview_instance.closest('.cycle-slide').index($('#image_gallery .image_gallery_multiple .cycle-slide').not('.cycle-sentinel'));
                                if (this_slide_index > -1) {
                                    $('.image_gallery_multiple').cycle(this_slide_index);
                                    setTimeout(function() {
                                        roomview_instance.roomView('open')
                                    }, 600, roomview_instance);
                                }
                            } else {
                                roomview_instance.roomView('open');
                            }
                        }

                        if (window.ga && typeof window.ga != 'undefined') {
                            analytics_params = {
                                'hitType': 'event',
                                'eventCategory': 'View on a wall clicked',
                                'eventAction': window.location.pathname,
                                'eventLabel': ''
                            };
                            ga('send', analytics_params);
                            ga('tracker2.send', analytics_params);
                            ga('artlogic_tracker.send', analytics_params);
                        }
                    });
                }

                $(window).unbind('resize.image_gallery_images').bind('resize.image_gallery_images', function() {
                    $('#image_gallery .image[data-width]').each(function() {
                        var image_width = $(this).attr('data-width') && typeof $(this).attr('data-width') != 'undefined' ? $(this).attr('data-width') : false;
                        var image_height = $(this).attr('data-height') && typeof $(this).attr('data-height') != 'undefined' ? $(this).attr('data-height') : false;
                        if (image_width && image_height) {
                            var item_width = $(this).find('.image').width();
                            var image_width_proportional = 0;
                            var image_height_proportional = 0;
                            if (image_width && image_height) {
                                var image_width_proportional = item_width / image_width;
                                var image_height_proportional = image_height * image_width_proportional;
                                if (image_height_proportional) {
                                    $(this).css('min-height', image_height_proportional);
                                }
                            }
                        }
                    });
                }).trigger('resize.image_gallery_images');

                if ($('.image_hover_zoom').length) {
                    if (!window.galleries.device.handheld()) {
                        $('.image_hover_zoom').each(function() {
                            // Disabled on handheld as this stops users from swiping through the works.
                            var zoom_image = $(this).attr('data-zoom-url');
                            var zoom_type = window.galleries.device.handheld() ? 'click' : 'mouseover';
                            if (zoom_image && typeof zoom_image != 'undefined') {
                                $(this).zoom({
                                    url: zoom_image,
                                    duration: 400,
                                    on: zoom_type,
                                    onZoomIn: function(){
                                        $('body').addClass('zoom-active');
                                    },
                                    onZoomOut: function(){
                                        $('body').removeClass('zoom-active');
                                    }}
                                );
                            }
                        });
                    }
                }

                if (window.galleries.device.handheld()) {
                    prevous_drag_percentage = 0;
                    var x;

                    var freezeVp = function(e) {
                        e.preventDefault();
                    };
                    function stopBodyScrolling (bool) {
                        if (bool === true) {
                            document.body.addEventListener("touchmove", function(e) {
                                e.preventDefault();
                            }, {passive: false});
                        } else {
                            document.body.removeEventListener("touchmove", function(e) {
                                e.preventDefault();
                            }, {passive: false});
                        }
                    }

                    var debounce_flag = false;
                    var debounce_timeout = false;
                    $('#popup_content').unbind('scroll').bind('scroll', function() {
                        var scrolling_element = $(this);
                        if (!debounce_flag) {
                            debounce_flag = true;
                            $(scrolling_element).addClass('scrolling').removeClass('not-scrolling');
                        }
                        clearTimeout(debounce_timeout);
                        debounce_timeout = setTimeout(function() {
                            $(scrolling_element).removeClass('scrolling').addClass('not-scrolling');
                            debounce_flag = false;
                        }, 800, scrolling_element);
                    });

                    $('#image_gallery')
                        .on('touchstart', function(e) {
                            x = e.originalEvent.targetTouches[0].pageX // anchor point
                        })
                        .on('touchmove', function(e) {
                            $('#image_gallery').addClass('dragging');
                            var change = e.originalEvent.targetTouches[0].pageX - x;
                            var percentage = 100 * change / window.innerWidth;
                            var drag_element = $('#image_gallery .draginner');
                            if (change < -10 || change > 10) {
                                var condition_context = $('#image_gallery').closest('#popup_content').length ? '#popup_content' : '#container_outer';
                                var condition = !$(condition_context).hasClass('scrolling') && !$('body').hasClass('roomview-active');
                                if (condition) {
                                    // not yet working ios: stopBodyScrolling(true);
                                    $('body').addClass('content-swipe');
                                    drag_element.css({'transform': 'translate3d(' + percentage + '%, 0, 0)'});
                                    $('#image_gallery .draginner').attr('data-left', percentage);
                                    prevous_drag_percentage = percentage;
                                } else {

                                }
                            }
                        })
                        .on('touchend', function(e) {
                            $('#image_gallery').removeClass('dragging');
                            var percentage = $('#image_gallery .draginner').attr('data-left');
                            var drag_element = $('#image_gallery .draginner');
                            $('#image_gallery').removeClass('dragging');
                            window.setTimeout(function() {
                                $('body').removeClass('content-swipe');
                            }, 200);
                            if (percentage > 30) {
                                // Previous
                                if ($('body').hasClass('page-popup-active')) {
                                    var link = $('#popup_box > .inner > .pagination_controls .previous').not('.disabled');
                                } else {
                                    var link = $('#image_gallery .pagination_controls .previous a').not('.disabled');
                                }
                                if (link.length) {
                                    $('.draginner_loader').addClass('loading');
                                    drag_element.css({'transform': 'translate3d(201%, 0, 0)'});
                                    link.trigger('click');
                                } else {
                                    prevous_drag_percentage = 0;
                                    drag_element.css({'transform': 'translate3d(0, 0, 0)'});
                                    $('#image_gallery.draginner').attr('data-left', '0');
                                }
                            } else if (percentage < -30) {
                                // Next
                                if ($('body').hasClass('page-popup-active')) {
                                    var link = $('#popup_box > .inner > .pagination_controls .next').not('.disabled');
                                } else {
                                    var link = $('#image_gallery .pagination_controls .next a').not('.disabled');
                                }
                                if (link.length) {
                                    $('.draginner_loader').addClass('loading');
                                    drag_element.css({'transform': 'translate3d(-201%, 0, 0)'});
                                    link.trigger('click');
                                } else {
                                    prevous_drag_percentage = 0;
                                    drag_element.css({'transform': 'translate3d(0, 0, 0)'});
                                    $('#image_gallery .draginner').attr('data-left', '0');
                                }
                            } else {
                                prevous_drag_percentage = 0;
                                drag_element.css({'transform': 'translate3d(0, 0, 0)'});
                                $('#image_gallery .draginner').attr('data-left', '0');
                            }
                        })
                    ;
                }
            },

            artwork_description2_reveal_button: function() {
                $('#artwork_description2_reveal_button').click(function() {
                    //$('#artwork_description').slideUp();
                    $(' #artwork_description2_reveal_button, #artwork_description_container').slideUp();
                    $(' #artwork_description2_hide_button').slideDown();
                    $('#artwork_description_2').slideDown();
                    $('#image_gallery').addClass('artwork_full_details_open');
                    $('#artwork_description_2').get(0).focus();
                    return false;
                });
            },

            artwork_description2_hide_button: function() {
                $('#artwork_description2_hide_button').click(function() {
                    //$('#artwork_description').slideUp();
                    $(' #artwork_description2_hide_button').slideUp();
                    $(' #artwork_description2_reveal_button, #artwork_description_container').slideDown();
                    $('#artwork_description_2').slideUp(function() {
                        $('#artwork_description2_reveal_button a').get(0).focus();
                    });
                    $('#image_gallery').removeClass('artwork_full_details_open');
                    return false;
                });
            },

            artist_list_artist_image_on_hover: function() {
                $('#artist_list.artist_image_on_hover ul li a img')
                    .each(function() {
                        if (!$(this).closest('a').hasClass('no-hover')) {
                            $(this).mouseover(function() {
                                $(this).stop().clearQueue().fadeTo(300, 0.0001);
                            });
                            $(this).mouseout(function() {
                                $(this).fadeTo(500, 1);
                            });
                        }
                    })
                ;
            },

            artwork_descriptive_read_more_button: function() {

                $('#artwork_descriptive_read_more_button').unbind().bind('click', function() {

                    if ($('#popup_content #image_gallery').length) {
                        $('#popup_content').animate({
                            scrollTop: ($("#secondary_content_module").offset().top + $('#popup_content').scrollTop() - $('html,body').scrollTop())
                        }, 600, function() {
                            if ($('#popup_content #secondary_content_module').length) {
                                $("#popup_content #secondary_content_module").get(0).focus({preventScroll:true});
                            }
                        });
                        return false;
                    } else {
                        $('html, body').animate({
                            scrollTop: $("#secondary_content_module").offset().top
                        }, 600, function() {
                            if ($('#secondary_content_module').length) {
                                $("#secondary_content_module").get(0).focus({preventScroll:true});
                            }
                        });
                    }

                });
            }

        },

        artwork_filters: {

            init: function() {

                window.galleries.artwork_filters.checked_items();
                window.galleries.artwork_filters.clear_filters();
                window.galleries.artwork_filters.responsive_filter_btn();
                // Responsive show/hide filter menu handler
                $('.artwork-filter-responsive-btn').on('click', function(e){
                    $('#artwork-filter-panel').toggleClass('show')
                });

                // Individual filter item click handler
                if ($('.filters_panel').hasClass('filters_enable_autosubmit')) {
                    $('#filterpanel_form input').not('[type="text"]').on('change', function(e){
                        window.galleries.artwork_filters.checked_items();
                        window.galleries.artwork_filters.processUniqueOptionCheckbox($(this));
                        if ($('#artworks_filter_panel').data('artworks_api_enabled') === true) {
                            window.galleries.artwork_filters.load_works_api();
                        } else {
                            window.galleries.artwork_filters.load_works();
                        }
                    });
                }

                $('#filterpanel_form .fp-button-submit, #filterpanel_form .fp-keyword-submit').click(function() {
                    window.galleries.artwork_filters.checked_items();
                    window.galleries.artwork_filters.processUniqueOptionCheckbox($(this));
                    if ($('#artworks_filter_panel').data('artworks_api_enabled') === true) {
                        window.galleries.artwork_filters.load_works_api();
                    } else {
                        window.galleries.artwork_filters.load_works();
                    }
                    return false;
                });

                $('#filterpanel_form input[type="text"]')
                    .keypress(function(event) {
                        if (event.which == 13) {
                            event.preventDefault();
                            $('#filterpanel_form .fp-button-submit').trigger('click');
                            return false;
                        }
                    })
                ;

                $('#filterpanel_form label').on('click', function(e) {
                    // Prevents a bug where the checkbox click event was triggered twice.
                    e.stopPropagation();
                });

                // /**
                //  * OPEN/CLOSE THE FILTER LIST CONTAINER
                //  */
                // $('.fp-legend').on('click', function(e){

                //     if(!$(this).closest('.fp-module').hasClass('visible')){
                //         // Prevent the window handler from being triggered.
                //         e.stopPropagation();
                //         // Hide any already open panels
                //         $('.fp-module').removeClass('visible');
                //         // Show the list attached to the clicked heading
                //         $(this).closest('.fp-module').toggleClass('visible');

                //         // Clicking anywhere else on the page will close the opened group
                //         $(window).one('click', function(){
                //             $('.fp-module').removeClass('visible');
                //         });
                //     } else {
                //         // No need to do anything as the click listener on window will remove the visible class.
                //         return;
                //     }
                // });

                if (typeof window.site != 'undefined') {
                    if (typeof window.site.filter_ui != 'undefined') {
                        window.site.filter_ui();
                    }
                }
            },

            checked_items: function(){

                $('#filterpanel_form input[type="text"]')
                    .each(function() {
                        if ($(this).val() != '') {
                            $(this).closest('.fp-module').addClass('active');
                        } else {
                            $(this).closest('.fp-module').removeClass('active');
                        }
                    })
                ;
                $('#filterpanel_form .fp-module').each(function(){
                    if ($(this).find('input[type="checkbox"]').length) {
                        var checked_count = $(this).find('input[type="checkbox"]:checked').length;
                        if(checked_count > 0) {
                            $(this).addClass('active');
                            $(this).find('.group-count').html('('+ String(checked_count) + ')');
                        } else {
                            $(this).removeClass('active');
                            $(this).find('.group-count').html('');
                        }
                    }
                });

            },

            processUniqueOptionCheckbox: function(instance) {
                if (instance && instance.length) {
                    if (instance.closest('.unique-option-parent').length) {
                        instance.closest('.unique-option-parent').find('input').not(instance).prop('checked', false);
                    }
                }
            },

            processRangeCheckbox: function(){
                /**
                 * This function requires: data-min and data-max to be set on the checkbox input and 2 hidden inputs, .range_min and .range_max to be added as children of .range_parent. The hidden inputs need to be disabled by default.
                 * For all the selected checkboxes find the data-min and data-max values(which should be set on the input element).
                 * Assign the min/max values to relevant array selectedMins/selectedMaxs and then use the ARRAY.sort() func to order them in ascending order.
                 * Set the min value as the FIRST item in the sorted selectedMins array. Set the max value as the LAST item in the selectedMaxs array.
                 * Assign these to the hidden inputs so they are passed when the form is serialized/submitted.
                 */
                $('.range-parent').each(function(){
                    var selectedRanges = $(this).find('input:checked');

                    if(!selectedRanges.length){
                        $(this).find('.range_min, .range_max').attr('disabled', true); // Disable the min and max fields so the empty values aren't sent when the form is submitted.
                        return; // Don't bother to process if there aren't any checked checkboxes
                    }

                    // Remove the disabled attribute for the min and max inputs as a checkbox is selected
                    $(this).find('.range_min, .range_max').removeAttr('disabled');

                    var parent = $(this).closest('.range-parent');
                    var selectedMins = [];
                    var selectedMaxs = [];
                    for (var i = 0; i < selectedRanges.length; i++) {
                        selectedMins.push(parseInt( ($(selectedRanges[i]).data('min') || 0) ));
                        selectedMaxs.push(parseInt( ($(selectedRanges[i]).data('max') || 100000000) ));
                    }
                    // Order the min and max arrays in ascending order
                    var selectedMinsSorted = selectedMins.sort(function(a,b){return a-b}); // By default the sort is alphabetical, the weird callback function forces it to sort numerically.
                    var selectedMaxsSorted = selectedMaxs.sort(function(a,b){return a-b}); // By default the sort is alphabetical, the weird callback function forces it to sort numerically.

                    var minValue = selectedMinsSorted[0];
                    var maxValue = selectedMaxsSorted[selectedMaxsSorted.length - 1]; // the last item

                    // Update the hidden inputs with the corresponding values
                    $(this).find('.range_min').val(minValue);
                    $(this).find('.range_max').val(maxValue);
                });
            },

            load_works: function($filterPanelForm) {
                /**
                 * Serializes and submits the form.
                 * The result will be loaded into the inner_content_selector element.
                 */
                if(typeof $filterPanelForm == 'undefined') {
                    $filterPanelForm = $('#filterpanel_form');
                }

                var pathToSubmitForm = $filterPanelForm.attr('action');
                if (pathToSubmitForm){
                    window.galleries.artwork_filters.processRangeCheckbox();
                    window.galleries.artwork_filters.processUniqueOptionCheckbox();

                    var serializedForm = $filterPanelForm.serialize();
                    var keyword = $('input.fp-textfield').attr('name');
                    if (keyword && keyword.length) {
                        // Remove empty '&keyword=' parameter from the query string.
                        serializedForm = serializedForm.replace(new RegExp('(&?' + keyword + '=)(&|$)', 'g'), "$2");
                        serializedForm = serializedForm.replace(/^&?/, "");
                        serializedForm = serializedForm.replace(/&?$/, "");;
                    }

                    if(serializedForm.length){
                        var updated_url = pathToSubmitForm + '?' + serializedForm;
                    } else {
                        var updated_url = pathToSubmitForm
                    }

                }

                if ($('.filter_results').length && !$('.filter_results_no_results').length) {
                    var incoming_content_type = 'inner';
                    var pushstate = false;
                } else {
                    var incoming_content_type = 'standard';
                    var pushstate = true;
                }

                $.pageload.load(updated_url, pushstate, function(new_page_inner_content, element_href, new_page_main_content) {

                    if (new_page_inner_content) {
                        $('.filter_results')
                            .addClass('filter_transition')
                            .delay(400)
                            .queue(function() {

                                history.replaceState({'ajaxPageLoad': true}, null, updated_url);

                                var full_html = $(new_page_main_content);
                                var results_html = full_html.find('.filter_results').html();
                                var pagestats_id = full_html.find('.filter_results').attr('data-pagestats-id');
                                var page_stats = full_html.find('.filter_results_pagination').html();

                                $('.filter_results').html(results_html).attr('data-pagestats-id', pagestats_id);
                                $('.filter_results').removeClass('filter_transition');

                                $('.filter_results_pagination').remove();
                                if (page_stats && typeof page_stats != 'undefined') {
                                    $('.filter_results').after('<div class="filter_results_pagination"></div>');
                                    $('.filter_results_pagination').append(page_stats);
                                }

                                window.galleries.responsive.records_lists();
                                window.galleries.pageload_load_more_pagination.init();
                                if (window.cart && typeof window.cart != 'undefined') {
                                    window.cart.init();
                                }

                                window.galleries.misc.init();
                                window.galleries.responsive.tile_list_append_refresh($('.filter_results'));
                                window.galleries.layout.inview.init();

                                $(window).trigger('scroll');
                                $(window).trigger('resize');

                                $.pageload.refresh();

                                $(this).dequeue();
                            })
                        ;
                    }
                }, null, null, null, incoming_content_type);

            },

            load_works_api: function(url) {
                /**
                 * Serializes and submits the form.
                 * The result will be loaded into the inner_content_selector element.
                 */

                $('body').addClass('ajax-loading loader-active');

                $filterPanelForm = $('#filterpanel_form');

                var pathToSubmitForm = $filterPanelForm.attr('action');
                if (pathToSubmitForm && url == undefined){
                    window.galleries.artwork_filters.processRangeCheckbox();
                    window.galleries.artwork_filters.processUniqueOptionCheckbox();

                    var serializedForm = $filterPanelForm.serialize();
                    var keyword = $('input.fp-textfield').attr('name');
                    if (keyword && keyword.length) {
                        // Remove empty '&keyword=' parameter from the query string.
                        serializedForm = serializedForm.replace(new RegExp('(&?' + keyword + '=)(&|$)', 'g'), "$2");
                        serializedForm = serializedForm.replace(/^&?/, "");
                        serializedForm = serializedForm.replace(/&?$/, "");
                    }

                    var queryString = '';

                    if(serializedForm.length){
                        var updated_url = pathToSubmitForm + '?' + serializedForm;
                        // Update the query string in the url bar so the selection of
                        // filters can be shared as a link.
                        queryString = '?' + serializedForm;
                        $('#artworks_filter_panel').data('query_string', serializedForm);
                    } else {
                        var updated_url = pathToSubmitForm
                    }

                    // if (queryString != window.location.search) {
                    //     window.history.pushState(
                    //         "object or string",
                    //         window.title,
                    //         window.location.pathname + queryString
                    //     );
                    // }

                    if (queryString && queryString != '') {
                        $('#filterpanel_form').addClass('forced-hash-change');
                        window.location.hash = queryString.replace('?', 'filters=');
                        $('body').addClass('artwork-filters-active');
                    }
                } else {
                    var updated_url = url;
                }

                $.get(updated_url, function(html) {
                    if (html) {
                        $('.filter_results')
                            .addClass('filter_transition')
                            .delay(400)
                            .queue(function() {
                                $('#artworks_grid_ajax').removeClass('loader_simple');
                                $('.filter_results').html(html);
                                $('.filter_results').removeClass('filter_transition');

                                window.galleries.responsive.records_lists();
                                window.galleries.pageload_load_more_pagination.init();
                                if (window.cart && typeof window.cart != 'undefined') {
                                    window.cart.init();
                                }

                                window.galleries.misc.init();
                                window.galleries.responsive.tile_list_append_refresh($('.filter_results'));
                                window.galleries.layout.inview.init();
                                window.galleries.contact_form_popup.init();
                                $(window).trigger('scroll');
                                $(window).trigger('resize');

                                $('.filter_results').find('.filter_results_pagination')
                                    .find('a.ps_link')
                                    .click(function(event) {
                                        event.preventDefault();
                                        var url = $(this).attr('href');
                                        $(this).attr('href', '#');

                                        window.galleries.artwork_filters.checked_items();
                                        window.galleries.artwork_filters.processUniqueOptionCheckbox();
                                        window.galleries.artwork_filters.load_works_api(url);
                                    });

                                window.galleries.artwork_filters.load_works_api_after_callback();
                                $.pageload.refresh('#artworks_grid_ajax');


                                //Quick method to check if scrollup is needed - probably improve this later
                                var header_height = ($('.header-fixed-wrapper').length ? $('.header-fixed-wrapper').height() : 0);


                                var buffer = 100;

                                var top_of_results = $(".filter_results").offset().top;
                                var bottom_of_screen = $(window).scrollTop() + $(window).innerHeight() - buffer;
                                var top_of_screen = $(window).scrollTop()  + buffer;

                                if ((top_of_screen > top_of_results)){
                                    $("html, body").animate({scrollTop: top_of_results - header_height - 60}, 500);
                                } else if (top_of_results > bottom_of_screen){
                                    $("html, body").animate({scrollTop: top_of_results - header_height - 60}, 500);
                                }

                                $('body').removeClass('ajax-loading loader-active');

                                // Customisation for nada chicago 2020 - remove prices if the item is not available for sale
                                $('#artworks_grid_ajax li').each(function() {
                                    if ($('.store_item.store_item_sold_out', this).length) {
                                        $('.content > .artwork_price, .content > a > .price, .content > a > .artwork_price, .content > .price', this).remove();
                                    }
                                });

                                $(this).dequeue();
                            })
                        ;
                    }
                });
            },

            load_works_api_after_callback: function() {

            },

            clear_filters: function(){

                $('.clear_filters').on('click', function(e){
                    e.preventDefault();
                    $('#filterpanel_form input').prop('checked', false);
                    $('#filterpanel_form').find('.group-count').html('');
                    if (window.location.hash.startsWith('#filters=')) {
                        window.location.hash = '';
                    }
                    if ($('#artworks_filter_panel').data('artworks_api_enabled') === true) {
                        window.galleries.artwork_filters.load_works_api();
                    } else {
                        window.galleries.artwork_filters.load_works();
                    }
                    $('body').removeClass('artwork-filters-active');
                });

            },

            responsive_filter_btn: function() {

                $('.artwork-filter-open-btn').on('click', function() {
                    console.log('open responsive');
                    if($('#filterpanel_form').hasClass('open')){
                        $('#filterpanel_form').removeClass('open');
                        $('#filterpanel_form').attr('style','')
                    } else {
                        $('#filterpanel_form').addClass('open');
                        window.galleries.helpers.animate_height($('#filterpanel_form'));
                    }
                });

            }

        },

        image_gallery: {

            init: function() {

                var first_load = true

                if (h.element_exists('.image_gallery_multiple') && h.element_exists('#secondary_image_thumbnails')) {
                    window.galleries.image_gallery.standard();
                }

                if (h.element_exists('#ig_slideshow')) {
                    window.galleries.image_gallery.dynamic();
                }

                if (h.element_exists('#ig_slider') || h.element_exists('.ig_slider')) {
                    window.galleries.image_gallery.slider.init();
                }

                if (h.element_exists('.detail_expand_grid') || h.element_exists('.detail_expand_grid')) {
                    window.galleries.image_gallery.detail_expand_grid.init();
                }

            },

            standard: function() {
                var overrideSettings;
                if ($('.image_gallery_multiple').attr('data-cycle-custom-settings'))  {
                    var overrideSettings = $.parseJSON($('.image_gallery_multiple').attr('data-cycle-custom-settings'));
                }

                var masterSettings = {
                    fx:       'fade',
                    speed:    600,
                    timeout:  12000,
                    paused:    true,
                    slides: '>',
                    autoHeight: 'container',
                    swipe: true
                };

                for(var overrideSetting in overrideSettings) {
                    masterSettings[overrideSetting] = overrideSettings[overrideSetting];
                }

                $('.image_gallery_multiple').cycle(masterSettings);

                // Accessibility - cycle sentinel slide should be ignored by focus trapping.
                setTimeout(function(){
                    $('#popup_content .image_gallery_multiple .item.cycle-sentinel a').removeClass('focustrap-first focustrap-focusable focustrap-item').addClass('focustrap-ignore');
                }, 500);

                // remove roomview attributes from cycle sentinels
                setTimeout(function(){
                    $('.image_gallery_multiple .cycle-sentinel img').removeAttr('data-roomview-id data-roomview-artwork-cm-width data-roomview-custom-config').removeClass('roomview-image roomview-initialised');
                    console.log('remove roomview attributes from cycle sentinels');
                }, 500);

                var currenltySelectedMessage = '<span class="screen-reader-only active-thumbnail-message">, currently selected.</span>'

                $('#secondary_image_thumbnails a')
                    .click(function() {
                        var scroll_context = 'html,body';
                        var element_offset_scroll = $(window).scrollTop();
                        var element_offset_top = $('.image_gallery_multiple').offset().top;
                        if ($(this).closest('#popup_content').length) {
                            var scroll_context = '#popup_content';
                            var element_offset_scroll = $('#popup_content').scrollTop();
                            var element_offset_top = 0;
                        }
                        if (element_offset_scroll > element_offset_top) {
                            $(scroll_context).animate(
                                {scrollTop: element_offset_top + (-20)},
                                300,
                                'easeInOutQuad'
                            );
                        }
                        $('.image_gallery_multiple').cycle(parseInt($(this).attr('data-index')));
                        $('#secondary_image_thumbnails a .active-thumbnail-message').remove();
                        $(currenltySelectedMessage).insertAfter($(this).find(".screen-reader-only"));

                        // Accessibility - Update focus trapping when a different image is selected to show in the slideshow if it is the first focus item
                        if (!$(this).hasClass('active') && $('#popup_content .image_gallery_multiple .item a').hasClass('focustrap-first')) {
                            $('#popup_content .image_gallery_multiple .item:not(.cycle-sentinel) a').removeClass('focustrap-ignore');
                            $('#popup_content .image_gallery_multiple .item:not(.cycle-slide-active) a').addClass('focustrap-ignore');
                            h.accessibility.focus_untrap();
                            h.accessibility.focus_trap('#popup_box .inner', false, '#popup_container .close');
                        }

                        $('#secondary_image_thumbnails a').removeClass('active');
                        $(this).addClass('active');

                        return false;
                    })
                    .attr("role", "button");
                $(currenltySelectedMessage).insertAfter("#secondary_image_thumbnails a:first .screen-reader-only");
                $('#secondary_image_thumbnails a:first').addClass('active');
            },

            detail_expand_grid: {

                init: function() {
                    var selectors = '.detail_expand_grid';

                    $('li a', selectors).click(function() {
                        var wrapper = $(this).closest('li');
                        var hash = $(this).attr('href');
                        if ($(window).width() < 459) {
                            $.pageload.load($(this).attr('href'), true, false);
                        } else {
                            if (!$(wrapper).hasClass('active')) {
                                window.galleries.image_gallery.detail_expand_grid.load_work(wrapper, $(this).attr('href'));
                            }
                        }
                        return false;
                    });
                    var original_browser_width = $(window).width();
                    $(window).resize(function() {
                        if ($(window).width() != original_browser_width) {
                            $('.detail_expand_grid').each(function() {
                                if ($('.expander_detail', this).size() > 0) {
                                    $('.expander_detail', this).remove();
                                }
                                if ($('li', this).attr('style') && $('li', this).attr('style') != 'undefined') {
                                    $('li', this).removeClass('active').removeAttr('style');
                                }
                            });
                        }
                    });
                    //$('> ul', selectors).addClass('loading');
                    //$(window).bind("load", function() {
                    //    $('> ul', selectors).removeClass('loading');
                    //});
                },

                load_work: function(wrapper, link) {
                    console.log('do ajax');

                    if ($(wrapper).closest('ul').hasClass('loading')) {

                        $(window).unbind("load.load_work_pre_click");
                        $(window).bind("load.load_work_pre_click", function() {
                            window.galleries.image_gallery.detail_expand_grid.load_work(wrapper, link);
                        });

                    } else {
                        console.log('do ajax');

                        $(wrapper).closest('ul').find('li').removeClass('active');
                        $(wrapper).addClass('active').addClass('loading');

                        if (typeof detail_expand_load_work_ajax_request != 'undefined') {
                            detail_expand_load_work_ajax_request.abort();
                        }

                        detail_expand_load_work_ajax_request = $.ajax({
                            url: link,
                            data: {'modal': '1'},
                            cache: false,
                            success: function(data) {

                                $(wrapper).closest('ul').find('li').not(wrapper).find('.expander_detail').css('opacity', '0');
                                $(wrapper).append('<div class="expander_detail">' + data + '</div>');
                                window.galleries.contact_form_popup.init();
                                $(".expander_detail #image_container a, #secondary_image_thumbnails a").fancybox({
                                    'overlayShow': true,
                                    'overlayOpacity': 0.7,
                                    'overlayColor': '#d9d9d9',
                                    'imageScale': 'true',
                                    'zoomOpacity': 'true',
                                    prevEffect: 'fade',
                                    nextEffect: 'fade',
                                    closeEffect: 'fade',
                                    openEffect: 'fade',
                                    helpers : {
                                        title: {
                                            type: 'inside'
                                        }
                                    }
                                });


                                $('.expander_detail', wrapper).waitForImages({
                                    finished: function() {
                                        window.setTimeout(function() {

                                            console.log(link);
                                            history.replaceState(null, null, link);
                                            //should clear on scroll - to be built

                                            window.galleries.contact_form_popup.init();
                                            window.galleries.sharing.init();
                                            if (typeof addthis === 'undefined') { } else {
                                                addthis.toolbox('#social_sharing_links');
                                                addthis.update('share', 'url', $('#social_sharing_params').attr('data-url'));
                                                //addthis.url = $('#social_sharing_params').attr('data-url');

                                            }
                                            $(".expander_detail #content").each(function(){
                                                var id = $(this).attr('id')
                                                $(this).attr('id', 'ajax_' + id)
                                            });

                                            //change .image class to prevent dynamic grid sizing
                                            $(".expander_detail .image").each(function(){
                                                var base_class = $(this).attr('class')
                                                $(this).attr('class', 'ajax_' + base_class)
                                            });
                                            //scroll to show only half of clicked grid item
                                            var scroll_offset = $(wrapper).offset().top + ($(wrapper).height()/2 );
                                            if ($(window).width() <= 459) {
                                                var scroll_offset = $(wrapper).offset().top - 70;
                                            }
                                            var detail_above = $(wrapper).prevAll().find('.expander_detail');
                                            var existing_detail = $(wrapper).closest('ul').find('li').not(wrapper).find('.expander_detail');

                                            // If there is already an expanded area above, work out the final scroll position once this area is removed
                                            if (detail_above.size() > 0 && detail_above.closest('li').offset().top != $(wrapper).offset().top) {
                                                var scroll_offset = scroll_offset - $(wrapper).prevAll().find('.expander_detail').height();
                                            }
                                            if (existing_detail.size() > 0 && existing_detail.closest('li').offset().top == $(wrapper).offset().top) {
                                                $(wrapper).addClass('no-animation');
                                            }

                                            $(wrapper).closest('ul').find('li').not(wrapper).find('.expander_detail').remove();

                                            var wrapper_height = $(wrapper).height();
                                            $(wrapper).closest('ul').find('li').css('height', wrapper_height);
                                            $(wrapper).css('height', $('#image_gallery', wrapper).outerHeight() + wrapper_height);

                                            $('.expander_detail,.expander_detail #content_module', wrapper).css({
                                                'height': $('.expander_detail #image_gallery', wrapper).outerHeight(),
                                                'opacity': '1'
                                            });
                                            $('.expander_detail #image_gallery', wrapper).append('<button class="close" aria-label="Close expanded detail view">Close</button>');
                                            $('.expander_detail .close', wrapper).click(function() {
                                                window.galleries.image_gallery.detail_expand_grid.close_work($(wrapper).closest('ul'));
                                            });
                                            $('html,body').animate(
                                                {scrollTop: scroll_offset},
                                                400,
                                                'easeInOutQuad'
                                            );
                                            $(wrapper).removeClass('loading');
                                            $(wrapper).closest('ul').find('li').removeClass('no-animation');
                                            $('.expander_detail .ps_item a', wrapper).click(function(e) {
                                                e.preventDefault();
                                                if ($(this).hasClass('ps_next')) {
                                                    $(this).closest('.detail_expand_grid').find('ul li.active').next('li').find('a').trigger('click');
                                                } else if ($(this).hasClass('ps_previous')) {
                                                    $(this).closest('.detail_expand_grid').find('ul li.active').prev('li').find('a').trigger('click');
                                                }
                                            });
                                            $(".expander_detail #content_module #secondary_image_thumbnails a").attr('rel','group');

                                            window.galleries.artworks.init();
                                        }, 200);



                                        detail_expand_load_work_ajax_request = undefined;
                                    },
                                    waitForAll: true
                                });

                                $("#ajax_content_module #secondary_image_thumbnails a").fancybox({
                                    'overlayShow': true,
                                    'overlayOpacity': 0.7,
                                    'overlayColor': '#d9d9d9',
                                    'imageScale': 'true',
                                    'zoomOpacity': 'true',
                                    prevEffect: 'fade',
                                    nextEffect: 'fade',
                                    closeEffect: 'fade',
                                    openEffect: 'fade',
                                    afterLoad: function () {
                                        $(".fancybox-overlay").addClass("fancybox-overlay-image");
                                    },
                                    helpers : {
                                        title: {
                                            type: 'inside'
                                        }
                                    }
                                });
                                //window.galleries.image_gallery.standard();
                                if (h.element_exists('.store_item')){
                                    window.cart.add_to_cart($('.store_item .store_item_add_to_cart'));
                                    window.cart.remove_from_cart($('.store_item .store_item_remove_from_cart'));
                                }

                                /*
                                Placeholder function to call after the AJAX event completes.
                                Functionality can be added in main.js with window.galleries.image_gallery.detail_expand_grid.afterLoadWork = function(){...}
                                */
                                window.galleries.image_gallery.detail_expand_grid.afterLoadWork();

                            }
                        });
                    }
                },

                afterLoadWork: function() {

                    h.accessibility.closeWithEscapeKey('.expander_detail .close');
                    $('.detail_expand_grid ul li.active > a:first-child').attr("aria-expanded", "true").focus()

                },

                close_work: function(artworks_wrapper) {
                    if ($(artworks_wrapper).size() > 0) {
                        $(artworks_wrapper).find('.expander_detail').closest('li').each(function() {
                            $('.detail_expand_grid ul li.active > a:first-child').attr("aria-expanded", "false")
                            $('.expander_detail', this).css('height', '0').css('opacity', '0');
                            $('.expander_detail', this).remove();
                            $(this).removeClass('active').height($('> a', this).height());
                        });
                        $(artworks_wrapper).find('.expander_detail');
                        $('.detail_expand_grid ul li.active .artwork_detail_wrapper').removeAttr("tabindex");
                    }
                }

            },

            slider: {

                init: function() {

                    $('#ig_slider, .ig_slider').each(function() {
                        if (!$(this).hasClass('ig_slider_single_image') && !$(this).hasClass('slick-slider')) {
                            window.galleries.image_gallery.slider.load(this);
                            window.galleries.image_gallery.slider.max_height();
                            $( window ).resize(function() {
                                window.galleries.image_gallery.slider.max_height();
                                $('#ig_slider, .ig_slider').slick('setPosition');
                            });
                        } else {
                            window.galleries.image_gallery.slider.max_height();
                            $( window ).resize(function() {
                                window.galleries.image_gallery.slider.max_height();
                            });
                        }
                    });
                },

                load: function(ig_instance) {
                    var slide_count = $('.item', ig_instance).length;
                    var variable_width = true;
                    if (slide_count <= 2) {
                        var variable_width = false;
                    }
                    var startingSlide = 0;
                    if ($(ig_instance).find('.item.starting_slide').length) {
                        var startingSlide = $(ig_instance).find('.item.starting_slide').index();
                    }
                    $(ig_instance).slick({
                        infinite: true,
                        speed: 300,
                        slidesToShow: 1,
                        accessibility:true, //left right arrow keys
                        centerMode: true,
                        variableWidth: variable_width,
                        autoplay: false,
                        autoplaySpeed: 6000,
                        arrows:true,
                        centerPadding:'0',
                        lazyLoad: 'progressive',
                        initialSlide: startingSlide,
                        focusOnChange: true
                    });

                    // Before slide change
                    $(ig_instance).on('beforeChange', function(slick, currentSlide){
                        ig_slideshow_wrapper = $(slick.target).closest('.ig_slider_container_wrapper');
                        if ($('#ig_slider_caption, .ig_slider_caption', ig_slideshow_wrapper).length){
                            $('#ig_slider_caption, .ig_slider_caption', ig_slideshow_wrapper).addClass('transition');
                        }
                    });
                    $(ig_instance).on('afterChange', function(slick, currentSlide){
                        ig_slideshow_wrapper = $(slick.target).closest('.ig_slider_container_wrapper');
                        if ($('#ig_slider_caption, .ig_slider_caption', ig_slideshow_wrapper).length){
                            window.galleries.image_gallery.slider.caption(ig_slideshow_wrapper);
                        }
                        $(window).trigger('resize');
                    });

                },

                max_height: function(){
                    $('#ig_slider, .ig_slider').each(function() {
                        var slick_carousel_container = $(this);
                        ////Use original image dimensions to scale proportionally
                        var slideshow_width = $(slick_carousel_container).width();
                        var windowHeight = $(window).height();


                        var slideshow_ratio = 1.8;
                        if( $(this).attr('data-slideshow-ratio') ){
                            slideshow_ratio = $(this).attr('data-slideshow-ratio');
                        }
                        //ideal slideshow height, a ratio of the width
                        var proportional_height = Math.floor(slideshow_width/slideshow_ratio);

                        var upperLimit = 550;
                        if ($(slick_carousel_container).attr('data-carousel-max-height')) {
                            upperLimit = $(slick_carousel_container).attr('data-carousel-max-height');
                        }

                        var set_height = upperLimit;
                        //if the proportional height can't fit into the window height, use the window height instead
                        if (proportional_height > windowHeight) {
                            proportional_height = windowHeight;
                        }
                        //allow the slideshow to scale proportionately, up to the upper limit
                        if (proportional_height < upperLimit) {
                            set_height = proportional_height;
                        } else {
                            set_height = upperLimit;
                        }
                        $('.item', this).each(function(){
                            var scaleRatio = set_height  /  $(this).data('imgheight');
                            var scaledWidth = Math.round($(this).data('imgwidth') * scaleRatio);
                            var scaledHeight = Math.round($(this).data('imgheight') * scaleRatio);
                            var scaledWidth = Math.round($(this).data('imgwidth') * scaleRatio);

                            $(this).height(scaledHeight).width(scaledWidth).find('img').height(scaledHeight).width(scaledWidth);
                        });
                        $('#ig_slider_container_outer, #ig_slider_container, #ig_slider, .ig_slider_container_outer, .ig_slider_container, .ig_slider, .ig_slider_container .slick-list, .ig_slider_container .slick-track, .feature_panels .panel_slider .slider_panel_fill').height(set_height);
                    });
                },

                caption: function(slick_carousel_wrapper){
                    $('#ig_slider_caption, .ig_slider_caption', slick_carousel_wrapper).removeClass('transition');
                    ////Load the caption into the caption space, from data attribute
                    var caption = $(".slick-slide.slick-center", slick_carousel_wrapper).attr('data-caption');
                    $('#ig_slider_caption, .ig_slider_caption', slick_carousel_wrapper).html(caption);
                }

            },

            dynamic: function() {

                var slideshow_selector = '.ig_slideshow_container';
                if ($(slideshow_selector).size() < 1) {
                    var slideshow_selector = '#ig_slideshow_container';
                }

                $(slideshow_selector).each(function() {

                    var onfunction = $('#ig_slideshow', this).on;
                    if (onfunction) {
                        // Method for jQuery Cycle 2 ONLY

                        // Function fired directly after the slideshow is initialized
                        $('#ig_slideshow', this).on('cycle-post-initialize', function(event, optionHash) {
                            window.setTimeout(function() {
                                var this_instance = $(this).closest('#ig_slideshow_container');
                                if ($('#ig_slideshow .item.cycle-slide:eq(0)', this_instance).find('img').height() > 0 && $('#ig_slideshow .item.cycle-slide:eq(0)', this_instance).find('img').height() > $('#ig_slideshow', this_instance).height()) {
                                    $('#ig_slideshow', this_instance).height($('#ig_slideshow .item.cycle-slide:eq(0)', this_instance).find('img').height());
                                }
                            }, 400);
                        });

                        // Display the controller count
                        if ($('#ig_slideshow_controller_count').size() > 0) {
                            $('#ig_slideshow_controller_count').html('1 ' + $('#ig_slideshow_controller_count').attr('data-separator') + ' ' + $('#ig_slideshow >').not('cycle-sentinel').size());
                            if ($('#ig_slideshow >').not('cycle-sentinel').length < 2) {
                                $('#ig_slideshow_controller').addClass('ig_slideshow_controller_single_item');
                            }
                        }

                        // Display the first caption
                        // Dan - I have started working on adding an enquire button for the works slideshow layout
                        var initial_caption = ($('#ig_slideshow > :eq(0)', this).attr('data-rel') && typeof $('#ig_slideshow > :eq(0)', this).attr('data-rel') != 'undefined' ? $('#ig_slideshow > :eq(0)', this).attr('data-rel') : $('#ig_slideshow > :eq(0)', this).attr('rel'));
                        // var initial_enquire_button = $('#ig_slideshow > :eq(0)', this).find('.enquire').clone();
                        if ($('#ig_slideshow .item.item_starting_slide').length) {
                            var initial_caption = ($('#ig_slideshow .item.item_starting_slide', this).attr('data-rel') && typeof $('#ig_slideshow .item.item_starting_slide', this).attr('data-rel') != 'undefined' ? $('#ig_slideshow .item.item_starting_slide', this).attr('data-rel') : $('#ig_slideshow .item.item_starting_slide', this).attr('rel'));
                            // var initial_enquire_button = $('#ig_slideshow .item.item_starting_slide', this).find('.enquire').clone();
                        }
                        if (initial_caption && typeof initial_caption != 'undefined') {
                            var initial_caption = initial_caption.replace(/\n/g,'');
                        }

                        $('#ig_slideshow_caption, .ig_slideshow_caption', this).html(initial_caption);

                        // Optional: Some sites can include an external custom defined caption area, this doesn't relate to the current slideshow instance
                        $('#ig_slideshow_caption_external').html(initial_caption);

                        // $('#ig_slideshow_enquire').html(initial_enquire_button);

                        // Function fired directly before the slide changes
                        $('#ig_slideshow', this).on('cycle-before', function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {
                            var this_instance = $(this).closest('#ig_slideshow_container');
                            var this_caption = ($(incomingSlideEl, this_instance).attr('data-rel') && typeof $(incomingSlideEl, this_instance).attr('data-rel') != 'undefined' ? $(incomingSlideEl, this_instance).attr('data-rel') : $(incomingSlideEl, this_instance).attr('rel'));
                            if (this_caption && typeof this_caption != 'undefined') {
                                var this_caption = this_caption.replace(/\n/g,'');
                            }
                            $('#ig_slideshow_caption, .ig_slideshow_caption', this_instance).html(this_caption);
                            // Optional: Some sites can include an external custom defined caption area, this doesn't relate to the current slideshow instance
                            $('#ig_slideshow_caption_external').html(this_caption);

                            // var this_enquire_button = $(incomingSlideEl, this_instance).find('.enquire').clone();
                            // console.log(this_enquire_button);
                            // $('#ig_slideshow_enquire').html(this_enquire_button);
                            // window.galleries.contact_form_popup.init();

                            if ($('#ig_slideshow_controller_count').size() > 0) {
                                $('#ig_slideshow_controller_count').html(optionHash.nextSlide + 1 + ' ' + $('#ig_slideshow_controller_count').attr('data-separator') + ' ' + optionHash.slideCount);
                            }
                            $('#ig_slideshow_thumbnails a', this_instance).removeClass('active');

                            var selected_slide_index = $('#ig_slideshow >', this_instance).not('.cycle-sentinel').index(incomingSlideEl);

                            // Use data-rel if available (changed for W3C compliance), otherwise fall-back to rel
                            if ($('#ig_slideshow_thumbnails a[data-rel=' + selected_slide_index + ']').length) {
                                var active_thumbnail = $('#ig_slideshow_thumbnails a[data-rel=' + selected_slide_index + ']');
                            } else {
                                var active_thumbnail = $('#ig_slideshow_thumbnails a[rel=' + selected_slide_index + ']');
                            }
                            active_thumbnail.addClass('active');
                        });

                        // Function fired directly after the slide has changed
                        $('#ig_slideshow', this).on('cycle-after', function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {

                        });
                    }


                    var autoHeight = 'container';
                    if ($('#ig_slideshow', this).attr('data-cycle-autoheight-setting'))  {
                        var autoHeight = $("#ig_slideshow", this).attr('data-cycle-autoheight-setting');
                    }

                    var cycleSpeed = 1200;
                    if ($('#ig_slideshow', this).attr('data-cycle-speed-setting'))  {
                        var cycleSpeed = $("#ig_slideshow", this).attr('data-cycle-speed-setting');
                    }

                    var cycleFx = 'fade';
                    if ($('#ig_slideshow', this).attr('data-cycle-fx-setting'))  {
                        var cycleFx = $("#ig_slideshow", this).attr('data-cycle-fx-setting');
                    }

                    var startingSlide = 0;
                    if ($('#ig_slideshow .item.item_starting_slide').length) {
                        var startingSlide = $('#ig_slideshow .item.item_starting_slide').index();
                    }

                    var newsettings;
                    if ($('#ig_slideshow', this).attr('data-cycle-custom-settings'))  {
                        var newsettings = $.parseJSON($('#ig_slideshow', this).attr('data-cycle-custom-settings').replace(/'/g, '"'));
                    }

                    var mastersettings = {
                        fx:     cycleFx,
                        speed:    cycleSpeed,
                        timeout:  6000,
                        pause:    0,

                        slides: '>',
                        //autoHeight: 'calc',
                        autoHeight: autoHeight,
                        swipe: true,
                        startingSlide: startingSlide
                    }

                    for (var newkey in newsettings) {
                        mastersettings[newkey] = newsettings[newkey];
                    }


                    $('#ig_slideshow', this)
                        .cycle(mastersettings)
                        .each(function () {
                            if ($('.artwork_video_link', this).size() > 0) {
                                var artwork_video_object = $('.artwork_video_object', this);
                                $('.artwork_video_link', this).click(function () {
                                    $(this).hide();
                                    artwork_video_object.html($(this).attr('rel'));
                                    return false;
                                });
                            }

                            $(this).bind('cycle-initialized', function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {
                                if ($('.artwork_video_link', this).size() > 0) {
                                    var artwork_video_object = $('.artwork_video_object', this);
                                    $('.artwork_video_link', this).click(function () {
                                        $(this).hide();
                                        artwork_video_object.html($(this).attr('rel'));
                                        return false;
                                    });
                                }
                            });

                            // NEW CODE ////
                            var onfunction = $(this).on;
                            if (onfunction) {
                                $(this).on('cycle-post-initialize', function(event, optionHash) {
                                    window.galleries.image_gallery.initialized(event, optionHash);
                                });
                                // Function fired directly before the slide has changed
                                $(this).on('cycle-before', function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {
                                    window.galleries.image_gallery.after(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag);
                                    if(history.replaceState && $(incomingSlideEl).attr('data-href')) {
                                        var new_url = $(incomingSlideEl).attr('data-href');
                                        history.replaceState(null, null, new_url);
                                    }
                                });
                            }




                        })
                    ;


                    $('#ig_slideshow_thumbnails a:eq(0)', this).addClass('active');

                    // Accessibility - Make the links act as buttons
                    $('#ig_slideshow_thumbnails a', this).attr("role", "button");
                    h.accessibility.role_button();

                    $('#ig_slideshow_thumbnails a', this).click(function () {
                        var this_instance = $(this).closest('#ig_slideshow_container');
                        $('#ig_slideshow .artwork_video_object', this_instance).html('');
                        $('#ig_slideshow .artwork_video_link', this_instance).show();
                        $('#ig_slideshow', this_instance).cycle('pause');

                        var slide_index = false;
                        if ($(this).attr('data-rel') && typeof $(this).attr('data-rel') != 'undefined') {
                            var slide_index = $(this).attr('data-rel');
                        } else if ($(this).attr('rel') && typeof $(this).attr('rel') != 'undefined') {
                            var slide_index = $(this).attr('rel');
                        }
                        if (slide_index) {
                            $('#ig_slideshow', this_instance).cycle(parseInt(slide_index));
                        }
                        return false;
                    });

                    if ($("#ig_slideshow_thumbnails_container", this).hasClass('ig_thumbnails_type_scroller')) {
                        if (!$("#ig_slideshow_thumbnails_container", this).hasClass('ig_thumbnails_type_scroller_disabled')) {

                            var scroller_type = '';
                            if ($("#ig_slideshow_thumbnails_container", this).hasClass('ig_thumbnails_type_scroller_click')) {
                                var scroller_type = 'clickButtons';
                            }

                            if (!window.galleries.device.handheld()) {

                                window.galleries.jscroller_start.init($("#ig_slideshow_thumbnails_container", this), scroller_type);

                                $(window).resize(function() {
                                    // TODO: Need to re-initialise this script on resize, but to do this we also need to find a way of destroying the function first
                                    // window.galleries.jscroller_start.init("#ig_slideshow_thumbnails_container");
                                });

                            } else {

                                $("#ig_slideshow_thumbnails_container", this).addClass('ig_thumbnails_type_scroller_handheld');

                            }

                            if ($('#ig_slideshow_thumbnails', this).width() < $('#ig_slideshow_thumbnails_container', this).width()) {
                                $('#ig_slideshow_thumbnails_container', this).addClass('ig_slideshow_thumbnails_inactive');
                            }

                        }
                    } else {

                        //count the ul's and add first and last classes
                        var ul_count = parseInt($('#ig_slideshow_thumbnails', this).find('ul').length) -1;
                        $('#ig_slideshow_thumbnails ul', this).eq(0).addClass('first');
                        $('#ig_slideshow_thumbnails ul', this).eq(ul_count).addClass('last');
                        //check if support for on method
                        if (onfunction) {
                            $( '#ig_slideshow_thumbnails', this).on( 'cycle-update-view', function( event, optionHash, slideOptionsHash, currentSlideEl) {
                                var this_instance = $(this).closest('#ig_slideshow_container');
                                $('#ig_slideshow_thumbnails_container', this_instance).removeClass('last_slide_active').removeClass('first_slide_active');
                                //slidecount
                                //optionHash.slideCount
                                //optionHash.currSlide
                                //console.log(optionHash.slideCount);
                                if (optionHash && typeof optionHash != 'undefined') {
                                    if (optionHash.slideCount > 1) {
                                        //check if current slide is last and add class
                                        if (optionHash.currSlide == optionHash.slideCount-1) {
                                            $('#ig_slideshow_thumbnails_container', this_instance).addClass('last_slide_active');
                                        }
                                        //check if current slide is the first add class first
                                        if (optionHash.currSlide == 0) {
                                            $('#ig_slideshow_thumbnails_container', this_instance).addClass('first_slide_active');
                                        }
                                    }
                                }
                            });
                        }//end of if onfunction


                        $('#ig_slideshow_thumbnails', this).cycle({
                            fx:      'scrollHorz',
                            speed:    500,
                            timeout:  1000,
                            slides: '>'
                        });
                        $('#ig_slideshow_thumbnails', this).cycle('pause');
                        $('#ig_slideshow_thumbnails_prev a', this).click(function () {
                            var this_instance = $(this).closest('#ig_slideshow_container');
                            $('#ig_slideshow_thumbnails', this_instance).cycle('prev');
                            return false;
                        });
                        $('#ig_slideshow_thumbnails_next a', this).click(function () {
                            var this_instance = $(this).closest('#ig_slideshow_container');
                            $('#ig_slideshow_thumbnails', this_instance).cycle('next');
                            return false;
                        });
                    }

                    $('#ig_slideshow_controller').each(function() {
                        $('#ig_slideshow_controller_prev a').click(function() {
                            var this_instance = $('#ig_slideshow_container');
                            $('#ig_slideshow').cycle('pause').cycle('prev');
                            return false;
                        });
                        $('#ig_slideshow_controller_next a').click(function() {
                            var this_instance = $('#ig_slideshow_container');
                            $('#ig_slideshow').cycle('pause').cycle('next');
                            return false;
                        });
                    });

                });

            },

            initialized: function() {

            },

            after: function() {

            }

        },

        jscroller_start: {

            init: function(element, scroller_type) {

                $(element).thumbnailScroller({
                    /* scroller type based on mouse interaction
                    values: "hoverPrecise", "hoverAccelerate", "clickButtons"
                    default: "hoverPrecise" */
                    scrollerType: scroller_type,
                    /* scroller orientation
                    values: "horizontal", "vertical"
                    default: "horizontal" */
                    scrollerOrientation:"horizontal",
                    /* scroll easing type only for "hoverPrecise" scrollers
                    available values here: http://jqueryui.com/demos/effect/easing.html
                    default: "easeOutCirc" */
                    scrollEasing:"easeOutCirc",
                    /* scroll easing amount only for "hoverPrecise" and "clickButtons" scrollers (0 for no easing)
                    values: milliseconds
                    default: 800 */
                    scrollEasingAmount:800,
                    /* acceleration value only for "hoverAccelerate" scrollers
                    values: integer
                    default: 2 */
                    acceleration:1,
                    /* scrolling speed only for "clickButtons" scrollers
                    values: milliseconds
                    default: 600 */
                    scrollSpeed:800,
                    /* scroller null scrolling area only for "hoverAccelerate" scrollers
                    0 being the absolute center of the scroller
                    values: pixels
                    default: 0 */
                    noScrollCenterSpace:80,
                    /* initial auto-scrolling
                    0 equals no auto-scrolling
                    values: amount of auto-scrolling loops (integer)
                    default: 0 */
                    autoScrolling:0,
                    /* initial auto-scrolling speed
                    values: milliseconds
                    default: 8000 */
                    autoScrollingSpeed:2000,
                    /* initial auto-scrolling easing type
                    available values here: http://jqueryui.com/demos/effect/easing.html
                    default: "easeInOutQuad" */
                    autoScrollingEasing:"easeInOutQuad",
                    /* initial auto-scrolling delay for each loop
                    values: milliseconds
                    default: 2500 */
                    autoScrollingDelay:500,
                    callbacks: {
                        onInit: function() {
                            if ($('#ig_slideshow_thumbnails_container .jTscrollerPrevButton.disabled')) {
                                $('#ig_slideshow_thumbnails_container .jTscrollerPrevButton.disabled').attr('disabled', true);
                            } else {
                                $('#ig_slideshow_thumbnails_container .jTscrollerPrevButton.disabled').removeAttr('disabled');
                            }
                            if ($('#ig_slideshow_thumbnails_container .jTscrollerNextButton.disabled')) {
                                $('#ig_slideshow_thumbnails_container .jTscrollerNextButton.disabled').attr('disabled', true);
                            } else {
                                $('#ig_slideshow_thumbnails_container .jTscrollerNextButton.disabled').removeAttr('disabled');
                            }
                        },
                        onScroll: function() {
                            if ($('#ig_slideshow_thumbnails_container .jTscrollerPrevButton.disabled')) {
                                $('#ig_slideshow_thumbnails_container .jTscrollerPrevButton.disabled').attr('disabled', true);
                            } else {
                                $('#ig_slideshow_thumbnails_container .jTscrollerPrevButton.disabled').removeAttr('disabled');
                            }
                            if ($('#ig_slideshow_thumbnails_container .jTscrollerNextButton.disabled')) {
                                $('#ig_slideshow_thumbnails_container .jTscrollerNextButton.disabled').attr('disabled', true);
                            } else {
                                $('#ig_slideshow_thumbnails_container .jTscrollerNextButton.disabled').removeAttr('disabled');
                            }
                        }
                    }
                });
            }

        },

        image_popup: {

            init: function(custom_fancybox_options) {

                if( $('body.prevent_user_image_save').length > 0 ){
                    $('.image_popup').not('.fancybox-filtered').each(function(i){
                        var image_url = $('.image_popup').eq(i).attr('href');
                        $('.image_popup').eq(i).attr('data-fancybox-href', image_url).attr('href', "#");
                    });
                }
                reset_hash_on_close = false;

                var fancybox_options = {
                    overlayShow: true,
                    overlayOpacity: 0.7,
                    overlayColor: '#d9d9d9',
                    imageScale: 'true',
                    zoomOpacity: 'true',
                    // Fancybox 2.0 and above
                    prevEffect: 'fade',
                    nextEffect: 'fade',
                    closeEffect: 'fade',
                    openEffect: 'fade',
                    padding: 40,
                    helpers : {
                        title: {
                            type: 'inside'
                        }
                    },
                    beforeLoad:function(current, previous) {
                        window.galleries.image_popup.beforeLoad(current, previous);

                        // Modify the fancybox caption to the hidden .fancybox-caption element if it exists.
                        // The hidden element allows virtualurls to replace the href as the content is not encoded for use as an attribute.
                        this.title = ($(this.element).parent().find('.fancybox-caption').html() || $(this.element).data('fancybox-title'));

                        if (window.location.hash.indexOf('#/image_popup/') == -1) {
                            original_page_hash = window.location.hash;
                        } else {
                            original_page_hash = false;
                        }
                    },
                    afterLoad: function(current, previous) {
                        popup_has_zoom = $(current.element).hasClass('image_popup_zoom');
                        if (popup_has_zoom) {
                            big_image_link = current.element.attr('data-popup_zoom_image');
                        }
                        if (current.element.attr('data-fancybox-hash')) {
                            var image_popup_hash = '#/image_popup/' + current.element.attr('data-fancybox-hash') + '/';
                            location.replace(image_popup_hash);
                            reset_hash_on_close = true;
                        }
                        $('.fancybox-overlay').addClass('fancybox-overlay-image');
                        window.galleries.image_popup.afterLoad(current, previous);
                    },
                    afterShow: function() {
                        window.galleries.image_popup.afterShow();
                        $('.zoomContainer').remove();
                        if (popup_has_zoom) {
                            $('.fancybox-wrap').addClass('elevatezoom-enabled');
                            $('.fancybox-image').addClass('elevatezoom').attr( "data-zoom-image", big_image_link);
                            $(".elevatezoom").elevateZoom({
                                zoomType: "inner",
                                cursor: "default",
                                zoomWindowFadeIn: 200,
                                zoomWindowFadeOut: 200,
                                zoomWindowWidth: 0,
                                zoomWindowHeight: 0
                            });
                        }
                        // Add accessibility role and aria attributes
                        $('.fancybox-skin').attr({role: "dialog", "aria-label": "image popup", 'aria-modal': true});
                        // Make the close link element act like a button
                        $('.fancybox-skin a[title="Close"], .fancybox-skin a[title="Previous"], .fancybox-skin a[title="Next"]').attr("role", "button");
                        h.accessibility.role_button();

                        // add image alt tag
                        var imgAlt = $(this.element).find("img").attr("alt");
                        var dataAlt = $(this.element).data("alt");
                        if (imgAlt) {
                            $(".fancybox-image").attr("alt", imgAlt);
                        } else if (dataAlt) {
                            $(".fancybox-image").attr("alt", dataAlt);
                        }

                        // focus trap the popup
                        var focus_element
                        if (popup_has_zoom && $('.fancybox-skin button:first').length) {
                            focus_element = '.fancybox-skin button:first'
                        } else {
                            focus_element = '.fancybox-skin a:first'
                        }
                        h.accessibility.on_popup_opening('.fancybox-skin', focus_element, false);
                    },
                    beforeClose: function() {
                        window.galleries.image_popup.beforeClose();
                        if ($('.powerzoom_image').length) {
                            if ($('.fancybox-image').powerzoom) {
                                $('.powerzoom_image').hide();
                                $('.powerzoom_image').powerzoom("destroy");
                            }
                        }

                        if (reset_hash_on_close == true) {
                            if(history.pushState) {
                                var original_page_state = ((original_page_hash.length) ? original_page_hash : ' ');
                                history.pushState(null, null, original_page_state);
                            } else {
                                original_page_state = ((original_page_hash.length) ? original_page_hash : '#/');
                                location.hash = original_page_state;
                            }
                        }
                        h.accessibility.on_popup_closing();

                    },
                    afterClose: function() {
                        window.galleries.image_popup.afterClose();
                        $('.zoomContainer').remove();
                    }
                };

                // Filter out certain descendents
                var image_popup_elements = $('a.image_popup, a.fancybox').filter(function() {
                    return !$(this).closest('.tile_list_formatted').length;
                });


                $(image_popup_elements).each(function() {
                    $(this).addClass('fancybox-filtered');
                });

                $('.fancybox-filtered').fancybox(fancybox_options);

                $(image_popup_elements).click(function() {
                    // For accessibility - tracks which element to refocus on
                    try {
                        h.accessibility.global_variables.element_to_refocus_to = $(this);
                    } catch(error) {
                        console.error(error);
                    }
                });

                // Apply special rules to descendents of tile lists, so the images show in their original order
                $('.tile_list_formatted a.image_popup').click(function() {
                    var this_href = $(this).attr('data-fancybox-href') && typeof $(this).attr('data-fancybox-href') != 'undefined' ? $(this).attr('data-fancybox-href') : $(this).attr('href');
                    var related_element = $('.tile_list_original a.image_popup[href="' + this_href + '"], .tile_list_original a.image_popup[data-fancybox-href="' + this_href + '"]');
                    if (related_element && typeof related_element != 'undefined') {
                        related_element.trigger('click');
                        return false;
                    }
                });

                has_been_clicked = false;

                var fancybox_options_with_zoom = {
                    overlayShow: true,
                    overlayOpacity: 0.7,
                    overlayColor: '#d9d9d9',
                    imageScale: 'true',
                    zoomOpacity: 'true',
                    // Fancybox 2.0 and above
                    prevEffect: 'fade',
                    nextEffect: 'fade',
                    closeEffect: 'fade',
                    openEffect: 'fade',
                    margin: 0,
                    padding: 0,
                    helpers : {
                        title: {
                            type: 'inside'
                        }
                    },
                    beforeLoad:function(current, previous) {
                        window.galleries.image_popup.beforeLoad(current, previous);
                    },
                    afterLoad: function(current, previous) {
                        popup_has_zoom = $(current.element).hasClass('image_popup_zoom');
                        if (popup_has_zoom) {
                            big_image_link = current.element.attr('data-popup_zoom_image');
                        }
                        popup_has_zoom_buttons = $(current.element).hasClass('image_popup_zoom_buttons');
                        if (popup_has_zoom_buttons) {
                            $('body').addClass('fancybox-powerzoom');
                            if ((current.element.attr('href') && current.element.attr('href') != "#")){
                                original_image_link = current.element.attr('href')
                            } else {
                                original_image_link = current.element.attr('data-fancybox-href');
                            }
                            $('.fancybox-inner').text('');
                            $('.fancybox-inner').html('<div class="fancybox-image disabled"><span class="powerzoom-lowres" style="background-image:url(' + original_image_link +' );"><span class="powerzoom-lowres-upscale"></span></span></div>');
                            big_image_link = current.element.attr('data-popup_zoom_image');

                            $('.fancybox-inner').append('<div class="powerzoom_controls loading powerzoom-initial"><div class="powerzoom_pan"><div class="zoom-button pz_n"><i class="fa fa-chevron-up"></i></div><div class="zoom-button pz_s"><i class="fa fa-chevron-down"></i></div><div class="zoom-button pz_e"><i class="fa fa-chevron-right"></i></div><div class="zoom-button pz_w"><i class="fa fa-chevron-left"></i></div></div><div class="powerzoom_loading_indicator zoom-button powerzoom_zoom"> <span class="loading-dots"><i class="fa fa-circle"></i><i class="fa fa-circle"></i><i class="fa fa-circle"></i></span></div> <button id="zoomOutButton" class="zoomOutButton zoom-button powerzoom_zoom" aria-label="Zoom out"><i class="fa fa-search-minus"></i></button><button id="zoomInButton" class="zoomInButton zoom-button powerzoom_zoom" aria-label="Zoom in"><i class="fa fa-search-plus"></i></button><button id="zoomResetButton" class="zoomResetButton zoom-button powerzoom_zoom" aria-label="Reset zoom"><i class="fa fa-repeat"></i></button></div>');
                            $('.fancybox-image').append('<img src="" class="powerzoom-highres powerzoom-min powerzoom-transition preloading"/>');

                            $('.powerzoom_controls .zoom-button, .powerzoom-lowres').click(function(event) {
                                if ($('.powerzoom_controls').hasClass('powerzoom-initial')) {
                                    $('.powerzoom_controls').addClass('showloader');
                                    has_been_clicked = true;
                                }
                            });
                            $('img.powerzoom-highres').attr('src', big_image_link).on('load', function() {
                                $('.powerzoom_controls .zoom-button, .powerzoom-lowres').unbind('click');
                                var original_image_width = $('img.powerzoom-highres').width();
                                var original_image_height = $('img.powerzoom-highres').height();
                                $(this).addClass('loaded');
                                if ($(window).width() > 950) {
                                    $('.powerzoom-lowres-upscale').css({'background-image': "url(" + big_image_link + ")"});
                                    setTimeout(function(){
                                        $('.powerzoom-lowres').css({'background-image': "none"});
                                    },3000);
                                }

                                window.galleries.image_popup.powerzoom(original_image_width,original_image_height);
                                // if (has_been_clicked) {
                                //     $('.powerzoom_controls #zoomInButton.zoom-button').trigger('click');
                                // }
                            });
                        }
                        window.galleries.image_popup.afterLoad(current, previous);
                    },
                    afterShow: function() {
                        window.galleries.image_popup.afterShow();
                        $('.zoomContainer').remove();
                        if (popup_has_zoom) {
                            $('.fancybox-wrap').addClass('elevatezoom-enabled');
                            $('.fancybox-image').addClass('elevatezoom').attr( "data-zoom-image", big_image_link);
                            $(".elevatezoom").elevateZoom({
                                zoomType: "inner",
                                cursor: "default",
                                zoomWindowFadeIn: 200,
                                zoomWindowFadeOut: 200,
                                zoomWindowWidth: 1100,
                                zoomWindowHeight: 800
                            });
                        }
                        if (popup_has_zoom_buttons) {
                            $('body').addClass('fancybox-powerzoom');
                            $('.fancybox-image').css('line-height', $('.fancybox-inner').height() + 'px');
                            //window.galleries.image_popup.powerzoom();
                            focus_element = '.fancybox-skin button:first'
                        } else {
                            focus_element = '.fancybox-skin a:first'
                        }
                        // add ARIA landmark
                        $('.fancybox-overlay').attr({role: "dialog", "aria-label": "image popup", 'aria-modal': true});
                        // Make the close link element act like a button
                        $('.fancybox-skin a[title="Close"], .fancybox-skin a[title="Previous"], .fancybox-skin a[title="Next"]').attr("role", "button");
                        h.accessibility.role_button();
                        // add image alt tag
                        var imgAlt = $(this.element).find("img").attr("alt");
                        var dataAlt = $(this.element).data("alt");
                        if (imgAlt) {
                            $(".powerzoomFrame img").attr("alt", imgAlt);
                        } else if (dataAlt) {
                            $(".powerzoomFrame img").attr("alt", dataAlt);
                        }
                        // Class added to detect when fancybox is showing - this is to get around an issue where beforeClose gets called before fancybox opens
                        $('body').addClass('fancybox-visible');
                        // focus trap the popup
                        h.accessibility.on_popup_opening('.fancybox-overlay', focus_element, '.fancybox-overlay .fancybox-close');
                    },
                    beforeClose: function() {
                        window.galleries.image_popup.beforeClose();
                        // Only call on_popup_closing when the popup is actually open. (beforeClose gets called before fancybox opens)
                        if ($('body').hasClass('fancybox-visible')) {
                            h.accessibility.on_popup_closing();
                        }
                        $('body').removeClass('fancybox-visible');
                    },
                    afterClose: function() {
                        window.galleries.image_popup.afterClose();
                        $('.zoomContainer').remove();
                        $('body').removeClass('fancybox-powerzoom');
                        $('.powerzoom_controls').addClass('initial');
                        $('.powerzoom-lowres').removeClass('hidden');
                        $('.powerzoom-highres').addClass('preloading');
                    }
                };

                if (custom_fancybox_options && typeof custom_fancybox_options !== 'undefined') {
                    $.extend(fancybox_options, custom_fancybox_options)
                }

                //Additional fancybox settings, for powerzoom only
                fancybox_options_with_zoom['width'] = '100%';
                fancybox_options_with_zoom['height'] = '100%';
                fancybox_options_with_zoom['autoSize'] = false;
                fancybox_options_with_zoom['type'] = 'html';
                fancybox_options_with_zoom['content'] = '<div></div>';
                fancybox_options_with_zoom['closeClick'] = false;
                fancybox_options_with_zoom['arrows'] = false;
                fancybox_options_with_zoom['helpers'] = {overlay:{closeClick: false},title: null};

                $("a.image_popup_zoom_buttons").fancybox(fancybox_options_with_zoom);

                if (window.location.hash.indexOf('/image_popup/') == 1) {
                    window.galleries.image_popup.detect_popup_hash();
                }


            },

            beforeLoad: function(current, previous) {
                //call this in main.js
            },
            afterLoad: function(current, previous) {
                //call this in main.js
            },
            afterShow: function() {
                //call this in main.js
            },
            beforeClose: function() {
                //call this in main.js
            },
            afterClose: function() {
                //call this in main.js
            },

            powerzoom: function (original_image_width, original_image_height) {

                $('.powerzoom_controls').addClass('loaded').removeClass('loading');

                function get_framesize() {
                    var window_width = $('.fancybox-inner').width();
                    var window_height = $('.fancybox-inner').height();
                    return {w: window_width, h: window_height};
                }

                function min_max_zoom() {

                    var powerzoom = $('.powerzoom-highres').data('powerzoom');
                    if (powerzoom.percent > 1.99){
                        $('.powerzoom_controls').addClass('powerzoom-max');
                    } else {
                        $('.powerzoom_controls').removeClass('powerzoom-max');
                    }
                    if (powerzoom.percent == powerzoom.minPercent){
                        $('.powerzoom_controls').addClass('powerzoom-min');
                    } else {
                        $('.powerzoom_controls').removeClass('powerzoom-min');
                    }
                }

                $( window ).resize(function() {
                    setTimeout(function(){
                        var new_height = get_framesize().h
                        var new_width = get_framesize().w
                        $('.powerzoom-highres').powerzoom({width: new_width, height:new_height });
                        $('.fancybox-image').css('line-height', new_height + 'px');
                        var powerzoom = $('.powerzoom-highres').data('powerzoom');
                    },600);
                });

                //CHECK FRAME SIZE TO RENDER ZOOM AREA
                var height = get_framesize().h
                var width = get_framesize().w


                //RENDER ZOOM AREA AT CORRECT SIZE
                $('.powerzoom-highres').powerzoom({
                    zoom: 5,
                    maxZoom: 2,
                    zoomTouch: 40,
                    maxZoomTouch:2,
                    image_width: original_image_width,
                    image_height: original_image_height,
                    width: width,
                    height: height,
                    controls: '<span style="display:none;"></span>'
                });

                $(".powerzoom-highres").mousedown(function() {
                    $(this).removeClass('powerzoom-transition');
                    return false;
                });
                //SAVE ZOOM OBJECT AS VARIABLE, AND UPDATE ALL PARAMETERS
                var powerzoom = $('.powerzoom-highres').data('powerzoom');


                //LOAD HI-RES IF CLICK ON LOW-RES VERSION
                $('.powerzoom-lowres').click(function(event) {
                    if ($('.powerzoom_controls').hasClass('powerzoom-initial')) {
                        has_been_clicked = true;
                        if ($('.powerzoom_controls').hasClass('loaded')){
                            window.setTimeout(function() {
                                $('.powerzoom_controls').removeClass('powerzoom-initial showloader');
                                $('.powerzoom-lowres').hide().addClass('hidden');
                                $('.powerzoom-highres').hide().removeClass('preloading').fadeIn();
                            }, 400);
                        } else {
                            //show loader
                            $('.powerzoom_controls').addClass('showloader');
                        }
                        powerzoom.update();
                    }
                });

                $('.powerzoom_controls .zoom-button').click(function(event) {

                    $('.powerzoom-highres').addClass('powerzoom-transition');
                    var powerzoom = $('.powerzoom-highres').data('powerzoom');
                    var scrollValue = 300
                    var curX = powerzoom.img_left
                    var curY = powerzoom.img_top
                    if ($(this).hasClass('zoomInButton') && $('.powerzoom_controls').hasClass('powerzoom-initial')) {
                        has_been_clicked = true;
                        if ($('.powerzoom_controls').hasClass('loaded')){
                            window.setTimeout(function() {
                                $('.powerzoom_controls').removeClass('powerzoom-initial showloader');
                                $('.powerzoom-lowres').hide().addClass('hidden');
                                $('.powerzoom-highres').hide().removeClass('preloading').fadeIn();
                            }, 400);
                        } else {
                            //show loader
                            $('.powerzoom_controls').addClass('showloader');
                        }
                        powerzoom.update();
                    } else if ($(this).hasClass('pz_w')){
                        powerzoom.drag({startX: curX, startY: curY, dx: scrollValue, dy: 0});
                    } else if ($(this).hasClass('pz_e')) {
                        powerzoom.drag({startX: curX, startY: curY, dx: -scrollValue, dy: 0});
                    } else if ($(this).hasClass('pz_n')) {
                        powerzoom.drag({startX: curX, startY: curY, dx: 0, dy: scrollValue});
                    } else if ($(this).hasClass('pz_s')) {
                        powerzoom.drag({startX: curX, startY: curY , dx: 0, dy: -scrollValue});
                    } else if ($(this).hasClass('zoomInButton')) {
                        powerzoom.zoomIn();
                    } else if ($(this).hasClass('zoomOutButton') && $('.powerzoom_controls').hasClass('powerzoom-min')) {
                        if (!$('.powerzoom_controls').hasClass('powerzoom-initial')){
                            $('.powerzoom_controls').addClass('powerzoom-initial');
                            $('.powerzoom-highres').hide().addClass('hidden');
                            $('.powerzoom-lowres').hide().fadeIn().removeClass('hidden');
                        }
                    } else if ($(this).hasClass('zoomOutButton')) {
                        powerzoom.zoomOut();
                    } else if ($(this).hasClass('zoomResetButton') && $('.powerzoom_controls').hasClass('powerzoom-min')) {
                        if (!$('.powerzoom_controls').hasClass('powerzoom-initial')){
                            $('.powerzoom_controls').addClass('powerzoom-initial');
                            $('.powerzoom-highres').hide().addClass('hidden');
                            $('.powerzoom-lowres').hide().fadeIn().removeClass('hidden');
                        }
                    } else if ($(this).hasClass('zoomResetButton')) {
                        powerzoom.zoom(0);
                    }

                });

                $('.powerzoom-highres').powerzoom().on('powerzoom', function (e, result) {
                    min_max_zoom();
                });

                powerzoom.update();

            },

            detect_popup_hash: function() {
                //detect image_popup hash on load and
                //trigger click for relevant image popup
                var hash_segments = window.location.hash.split('/');
                if (hash_segments.length >= 3 && hash_segments[1] == 'image_popup'){
                    $('a[data-fancybox-hash="' + hash_segments[2] + '"]').trigger('click');
                }

            }

        },

        quicksearch: {

            init: function() {

                if ($('.header_quick_search').length) {
                    $('.header_quick_search .inputField')
                        .unbind()
                        .each(function() {
                            if ($(this).attr('data-default-value') && !$(this).val()) {
                                $(this).val($(this).attr('data-default-value'));
                            }
                            if ($('.header_quick_search').hasClass('header_quick_search_reveal')) {
                                //$(this).attr('data-width', '68');
                                //$(this).width(0);
                            }
                        })
                        .focus(function(){
                            if ($(this).val() == $(this).attr('data-default-value')){
                                $(this).val( '' ).closest('.header_quick_search').addClass('active');
                                $('#top_nav').addClass('header_quick_search_reveal_open');
                                $('body').addClass('header_quick_search_open');
                            }
                        })
                        .blur(function(){
                            if ($(this).val() == ''){
                                if ($(this).closest('.header_quick_search').hasClass('header_quick_search_reveal')) {
                                    //$(this).animate({'width': '0'});
                                }
                                $(this).val($(this).attr('data-default-value')).closest('.header_quick_search').removeClass('active');
                                $('#top_nav').removeClass('header_quick_search_reveal_open');
                                $('body').removeClass('header_quick_search_open');
                            }
                        })
                    ;
                    $('.header_quick_search .header_quicksearch_btn').click(function() {
                        if (!$(this).closest('.header_quick_search').find('.header_quicksearch_field').val() || $(this).closest('.header_quick_search').find('.header_quicksearch_field').val() == $(this).closest('.header_quick_search').find('.header_quicksearch_field').attr('data-default-value')) {

                            if ($(this).closest('.header_quick_search').hasClass('header_quick_search_reveal')) {
                                //$('#header_quicksearch_field').animate({'width': $('#header_quicksearch_field').attr('data-width') + 'px'});
                            }
                            $(this).closest('.header_quick_search').find('.header_quicksearch_field').select().focus();
                            return false;
                        } else {
                            $(this).closest('.header_quick_search').find('form')[0].submit()
                        }

                        $(this).closest('form').submit();
                        return false;
                    });
                }

                $('#quicksearch_field')
                    .each(function() {
                        if ($(this).attr('data-default-value') && !$(this).val()) {
                            $(this).val($(this).attr('data-default-value'));
                        }
                    })
                    .click(function() {
                        if ($('#quicksearch_field').val() == $('#quicksearch_field').attr('data-default-value') || $('#quicksearch_field').val() == 'Search...') {
                            $('#quicksearch_field').val('');
                        }
                        $('#quicksearch_field').addClass('active');
                    })
                ;

                $('#quicksearch_btn').click(function() {
                    if (!$('#quicksearch_field').val() || $('#quicksearch_field').val() == $('#quicksearch_field').attr('data-default-value')) {
                        h.alert('You have not entered a search term!');
                        $('#quicksearch_field').select();
                    } else {
                        $('#quicksearch_form')[0].submit()
                    }
                });

            }

        },

        publications: {
            init: function() {
                //$(".publications_show_samples").click(function() {
                $("a.fancybox_gallery").fancybox();
                //    $("a.fancybox_gallery#sample_image_1").click();
                //})
            }
        },

        artist: {
            init: function() {
                window.galleries.artist.enquire.init();
            },

            enquire: {
                init: function() {
                    if ($('#artist_enquire_form.errorOccurred').size() != 0) {
                        h.alert('Error: Some of the information entered was missing or incorrect.');
                    } else if ($('#artist_enquire_form.captchaError').size() != 0) {
                        h.alert('Error: The text entered did not match the image. Please try again.');
                    }
                },

                check_form: function() {
                    if ($('#f_name').val()=='') {
                        h.alert('Please enter your name.');
                        return false
                    } else if (window.app.checkEmail.check('#f_email') == false) {
                        h.alert('Please enter a valid email address.');
                        return false
                    } else if ($('#f_message').val()=='') {
                        h.alert('Please enter a message.');
                        return false
                    } else if ($('#captcha_answer').val()=='') {
                        h.alert('Ooops! The text entered did not match the image. Please try again.');
                        return false
                    }

                    return true;

                },

                submit: function() {

                    if (window.galleries.artist.enquire.check_form()) {
                        document.artist_enquire_form.submit();
                    }

                }
            }
        },

        cookie_notification: {

            init: function () {
                var cookie_settings = {
                    time_to_wait: 2000
                };
                var custom_cookie_settings = $('#cookie_notification').data('cookie-notification-settings') || {};
                $.extend(cookie_settings, custom_cookie_settings);

                $('#cookie_notification').each(function () {
                    mode = 'notify';
                    if ($(this).attr('data-mode')){
                        mode = $(this).attr('data-mode');
                    }
                    console.log('mode', mode);
                    if(mode == 'consent'){
                        var has_preferences = window.galleries.cookie_notification.get_cookie_preferences();
                        if(!has_preferences){
                            // Display the cookie notification after a set amount of time
                            setTimeout(function () {
                                $('#cookie_notification').addClass('active')
                            }, cookie_settings.time_to_wait)

                            // Accept btn event listener
                            $('#cookie_notification_accept').click(
                                window.galleries.cookie_notification.cookie_consent_accept_btn_callback
                            );

                            window.galleries.cookie_notification.manage_cookies_popup.init();
                        }
                        else {
                            $(this).hide();
                        }

                    } else {
                        var notification_cookie = h.getCookie('cookie_notification_dismissed');
                        if (!notification_cookie) {
                            // Display the cookie notification after a set amount of time
                            setTimeout(function () {
                                $('#cookie_notification').addClass('active')
                            }, cookie_settings.time_to_wait)

                            // Accept btn event listener
                            $('#cookie_notification_accept').click(
                                window.galleries.cookie_notification.cookie_notification_accept_btn_callback
                            );

                        }
                        else {
                            $(this).hide();
                        }
                    }

                });


            },

            cookie_notification_accept_btn_callback: function (e) {
                h.setCookie('cookie_notification_dismissed', '1', 365);
                /* Display:none the banner once it's transformed off the screen
                    - do this instead of $.hide because it's janky */
                $('#cookie_notification').on('transitionend', function (te) {
                    if (te.originalEvent.propertyName == 'transform') {
                        $('#cookie_notification').hide();
                    }
                });
                $('#cookie_notification').removeClass('active');
                e.preventDefault();
            },

            cookie_consent_accept_btn_callback: function (e) {

                // Set all cookie consent options to true as they have accepted all
                var cookie_consent = {
                    'essential': true,
                    'functionality': true,
                    'statistics': true,
                    'marketing': true
                }

                // h.setCookie('cookie_consent', JSON.stringify(cookie_consent), 365);
                window.galleries.cookie_notification.set_cookie_preferences(
                    cookie_consent
                );
                window.galleries.cookie_notification.hide_cookie_notification_banner();
                e.preventDefault();
            },

            hide_cookie_notification_banner: function (e) {

                /* Display:none the banner once it's transformed off the screen
                    - do this instead of $.hide because it's janky */
                $('#cookie_notification').on('transitionend', function (te) {
                    if (te.originalEvent.propertyName == 'transform') {
                        $('#cookie_notification').hide();
                    }
                });
                $('#cookie_notification').removeClass('active');

            },

            set_cookie_preferences: function (cookie_preferences) {

                if (hasLocalStorage) {
                    today = new Date();
                    today = today.toISOString().substr(0, 10);
                    cookie_preferences['date'] = today;
                    localStorage.setItem(
                        "cookie_preferences",
                        JSON.stringify(cookie_preferences)
                    );
                    window.google_analytics_init(location.pathname);
                }

            },

            get_cookie_preferences: function(){
                result = false;
                if(hasLocalStorage){
                    var cookie_preferences = localStorage.getItem('cookie_preferences') || "";
                    if (cookie_preferences) {
                        cookie_preferences = JSON.parse(cookie_preferences);
                        if (cookie_preferences.date) {
                            var expires_on = new Date(cookie_preferences.date);
                            expires_on.setDate(expires_on.getDate() + 365);
                            console.log('cookie preferences expire on', expires_on.toISOString());
                            var valid = expires_on > new Date();
                            if (valid){
                                result = cookie_preferences;
                            }
                        }
                    }
                }
                console.log('cookie preferences', result);
                return result;
            },

            get_cookie_preference: function (category) {
                result = false;
                try {
                    var cookie_preferences = localStorage.getItem('cookie_preferences') || "";
                    if (cookie_preferences) {
                        cookie_preferences = JSON.parse(cookie_preferences);
                        if (cookie_preferences.date) {
                            var expires_on = new Date(cookie_preferences.date);
                            expires_on.setDate(expires_on.getDate() + 365);
                            console.log('cookie preferences expire on', expires_on.toISOString());
                            var valid = expires_on > new Date();
                            if (valid && cookie_preferences.hasOwnProperty(category) && cookie_preferences[category]) {
                                result = true;
                            }
                        }
                    }
                }
                catch(e) {
                    console.warn('get_cookie_preference() failed');
                    return result;
                }
                console.log('cookie preference', category, result);
                return result;
            },

            manage_cookies_popup: {

                init: function(){

                    $('#cookie_notification_preferences').unbind()
                        .click(function () {
                            window.galleries.cookie_notification.manage_cookies_popup.open();
                        });

                    $('#manage_cookie_preferences_close_popup_link a, #manage_cookie_preferences_popup_overlay')
                        .unbind()
                        .click(function () {
                            window.galleries.cookie_notification.manage_cookies_popup.close(true);
                            return false;
                        })
                    ;


                    $('#cookie_preferences_form').submit(function(e){
                        e.preventDefault();
                        var cookie_consent = {};
                        $('input', this).not(':input[type=button], :input[type=submit], :input[type=reset]').each(function(){
                            cookie_consent[$(this).attr('name')] = $(this).prop('checked') ? true : false;
                        });
                        window.galleries.cookie_notification.set_cookie_preferences(cookie_consent);
                        window.galleries.cookie_notification.manage_cookies_popup.close(false);
                    });

                },

                open: function(){
                    $('body').addClass('manage_cookie_preferences_popup_active');
                    $('#cookie_notification').removeClass('active');
                    setTimeout(function () {
                        $('body').addClass('manage_cookie_preferences_popup_visible');
                        h.accessibility.on_popup_opening($('#manage_cookie_preferences_popup_box'), false, '#manage_cookie_preferences_close_popup_link a');
                        window.galleries.cookie_notification.manage_cookies_popup.after_popup();
                    }, 50);
                },

                close: function(reopen_notification){
                    $('body').removeClass('manage_cookie_preferences_popup_visible');
                    setTimeout(function () {
                        $('body').removeClass('manage_cookie_preferences_popup_active');
                        if(reopen_notification){
                            $('#cookie_notification').addClass('active');
                        }
                        else {
                            window.galleries.cookie_notification.hide_cookie_notification_banner();
                        }
                    }, 400);

                    h.accessibility.on_popup_closing();
                },

                after_popup: function(){

                }

            }

        },

        depricated_contact_form: {

            init: function(which) {

                $('#contact_form .link a, #contact_form .button a').click(function () {
                    if (window.galleries.depricated_contact_form.doOnSubmit()) {
                        $('#contact_form').submit();
                    }
                    return false;
                });

                if ($('#contact_form.errorOccurred').size() != 0) {
                    window.location = '#contact_form';
                    h.alert('Please fill in the required information.');
                } else if ($('#contact_form.captchaError').size() != 0) {
                    window.location = '#contact_form';
                    h.alert('The verification text did not match the image.');
                }
            },

            doOnSubmit: function() {

                if ($('#f_name').val()=='') {
                    h.alert('Please enter your name.');
                    return false
                } else if ($('#f_email').val()=='') {
                    h.alert('Please enter your email address.');
                    return false
                } else if ($('#f_email').val()!='' && window.app.checkEmail.check('#f_email') == false) {
                    h.alert('Please enter a valid email address.');
                    return false
                } else if ($('#f_phone').val()=='') {
                    h.alert('Please enter your phone number.');
                    return false
                } else if ($('#f_occupation').val()=='') {
                    h.alert('Please enter your occupation.');
                    return false
                } else if ($('#f_organisation').val()=='') {
                    h.alert('Please enter your occupation.');
                    return false
                } else if ($('#f_address').val()=='') {
                    h.alert('Please enter your address.');
                    return false
                } else if ($('#f_message').val()=='') {
                    h.alert('Please enter your message.');
                    return false
                }

                return true;

            }

        },

        contact_form_popup: {

            init: function() {

                window.galleries.contact_form_popup.inline();
                window.galleries.contact_form_popup.custom();

                $('a[href$="/contact/form/"], .website_contact_form')
                    .unbind()
                    .addClass('website_contact_form')
                    .addClass('link-no-ajax')
                    .click(function() {

                        // For accessibility - tracks which element to refocus on
                        try {
                            h.accessibility.global_variables.element_to_refocus_to = $(this);
                        } catch(error) {
                            console.error(error);
                        }

                        if (window.ga) {
                            // Track the click in Analytics
                            ga('send', {
                                'hitType': 'event',
                                'eventCategory': 'Contact form popup',
                                'eventAction': window.location.pathname,
                                'eventLabel': $(document).attr('title')
                            });
                            // Track the click in second Analytics account
                            ga('tracker2.send', {
                                'hitType': 'event',
                                'eventCategory': 'Contact form popup',
                                'eventAction': window.location.pathname,
                                'eventLabel': $(document).attr('title')
                            });
                            ga('artlogic_tracker.send', {
                                'hitType': 'event',
                                'eventCategory': 'Contact form popup',
                                'eventAction': window.location.pathname,
                                'eventLabel': $(document).attr('title')
                            });
                        }

                        var item_id = typeof $(this).attr('data-contact-form-item-id') != 'undefined' ? $(this).attr('data-contact-form-item-id') : '';
                        var item_table = typeof $(this).attr('data-contact-form-item-table') != 'undefined' ? $(this).attr('data-contact-form-item-table') : '';
                        var gallery_id = typeof $(this).attr('data-contact-form-gallery-id') != 'undefined' ? $(this).attr('data-contact-form-gallery-id') : '';
                        var gallery_email_address = typeof $(this).attr('data-contact-form-to') != 'undefined' ? $(this).attr('data-contact-form-to') : '';
                        var gallery_email_address_bcc = typeof $(this).attr('data-contact-form-to-bcc') != 'undefined' ? $(this).attr('data-contact-form-to-bcc') : '';
                        var form_heading = typeof $(this).attr('data-contact-form-heading') != 'undefined' ? $(this).attr('data-contact-form-heading') : '';
                        var hide_additional_field_content = $(this).attr('data-contact-form-hide-context') && typeof $(this).attr('data-contact-form-hide-context') != 'undefined' ? ($(this).attr('data-contact-form-hide-context') == '1' ? true : false) : false;
                        var additional_field_content = $(this).attr('data-contact-form-details');
                        var additional_field_image = $(this).attr('data-contact-form-image');
                        var additional_field_parent_id = $(this).attr('data-contact-form-parent-id');
                        var additional_field_type = $(this).attr('data-contact-form-type');

                        var form_url_params = '?modal=1';
                        if (additional_field_parent_id) {
                            var form_url_params = form_url_params + '&id=' + additional_field_parent_id;
                        }

                        var url_prefix = '';
                        if (typeof window.archimedes.proxy_dir != 'undefined') {
                            var url_prefix = window.archimedes.proxy_dir;
                        }

                        if (window.location.search && typeof window.location.search != 'undefined') {
                            if (window.location.search.indexOf('_holding_preview_uid') > -1) {
                                var form_url_params = form_url_params + '&' + window.location.search.replace('?', '');
                            }
                        }

                        $.fancybox.open(
                            url_prefix + '/contact/form/' + form_url_params,
                            {
                                type: 'ajax',
                                autoSize: false,
                                height: 'auto',
                                width: 420,
                                arrows: false,
                                prevEffect: 'fade',
                                nextEffect: 'fade',
                                closeEffect: 'fade',
                                openEffect: 'fade',
                                wrapCSS: 'fancybox_ajax_popup',
                                prevSpeed: 750,
                                nextSpeed: 750,
                                closeSpeed: 200,
                                padding: 25,
                                openSpeed: 400,
                                overlayColor: 'transparent',
                                keys: {close: null},
                                afterLoad: function() {
                                    $('.fancybox-overlay').addClass('fancybox-overlay-ajax');

                                    setTimeout(function() {
                                        if (form_heading && typeof form_heading != 'undefined') {
                                            $('#contact_form #contact_form_header').text(form_heading);
                                        }
                                    }, 20, form_heading);
                                },
                                afterShow: function() {
                                    // focus on first input field
                                    $('.fancybox-inner form').find('*').filter(':input:visible:first').focus();
                                    window.galleries.contact_form_popup.after_popup();
                                    if (additional_field_content || gallery_email_address) {
                                        if ($('#contact_form #contact_form_item_preview').length) {
                                            if (additional_field_content) {
                                                $('#contact_form #contact_form_item_preview .inner').html('<div class="content">' + decodeURIComponent(additional_field_content) + '</div>');
                                            }
                                            if (additional_field_image) {
                                                var website_domain = '';
                                                if (additional_field_image.substr(0,7) != 'http://' && additional_field_image.substr(0,8) != 'https://') {
                                                    var website_domain = 'http://' + document.location.host;
                                                }
                                                $('#contact_form #contact_form_item_preview .inner').prepend('<div class="image"><img src="' + website_domain + additional_field_image + '" alt="' + jQuery(decodeURIComponent(additional_field_content)).text() + '"/></div>');
                                            }
                                            if (hide_additional_field_content) {
                                                $('#contact_form #contact_form_item_preview').hide();
                                            } else {
                                                $('#contact_form #contact_form_item_preview').slideDown(function() {
                                                    if ($(window).height() < $('.fancybox-wrap').height()) {
                                                        $.fancybox.update();
                                                    }
                                                });
                                            }

                                            $('#contact_form #f_item_id').val(item_id);
                                            $('#contact_form #f_item_table').val(item_table);
                                            $('#contact_form #f_gallery_id').val(gallery_id);
                                            $('#contact_form #f_gallery_email_address').val(gallery_email_address);
                                            $('#contact_form #f_gallery_email_address_bcc').val(gallery_email_address_bcc);


                                            if (form_heading && typeof form_heading != 'undefined') {
                                                $('#contact_form #contact_form_header').text(form_heading);
                                            }

                                            $('#contact_form #f_product').val(encodeURIComponent($('#contact_form #contact_form_item_preview').html()));
                                            $('#contact_form #form_type').val('Enquiry form');
                                            $('#contact_form #email_type').val('enquiry-form');
                                            if (additional_field_type && typeof additional_field_type != 'undefined') {
                                                $('#contact_form #form_type_name').val(additional_field_type);
                                            } else {
                                                $('#contact_form #form_type_name').val('enquiry');
                                            }
                                        } else {
                                            $('#contact_form #f_message').val(additional_field_content);
                                        }
                                    }

                                    h.accessibility.on_popup_opening('.fancybox-opened .fancybox-skin', false, '.fancybox-wrap .fancybox-close');
                                    $('.fancybox-wrap .fancybox-skin').attr({role: "dialog", 'aria-modal': true, 'aria-labelledby': "contact_form_header"});
                                    // Make the close link element act like a button
                                    $('.fancybox-skin a[title="Close"], .fancybox-skin a[title="Previous"], .fancybox-skin a[title="Next"]').attr("role", "button");
                                    h.accessibility.role_button();
                                    // If the contact/enquiry form contains work/product info, set focus to the form header instead of first input field
                                    if ($('#contact_form #contact_form_item_preview:visible').length && $('.fancybox-wrap #contact_form_header').length) {
                                        $('.fancybox-wrap #contact_form_header')[0].focus({preventScroll:true});
                                    }
                                    window.galleries.contact_form_popup.after_popup_callback();
                                },

                                afterClose: function () {
                                    h.accessibility.on_popup_closing();
                                }
                            }
                        );

                        return false;
                    })
                ;

            },

            custom: function() {

                $('#contact_form_custom').each(function() {
                    $('#contact_form_custom .link a, #contact_form_custom .button a').unbind('click.contactform').bind('click.contactform', function() {
                        window.galleries.contact_form_popup.submit_form($(this).closest('#contact_form'));
                        return false;
                    });
                });

            },

            inline: function() {

                var url_prefix = '';
                if (typeof window.archimedes.proxy_dir != 'undefined') {
                    var url_prefix = window.archimedes.proxy_dir;
                }
                $('#contact_form_inline, .section-contact.page-form').each(function() {
                    $.ajax({
                        url: url_prefix + "/contact/form/",
                        data: 'modal=1&inline=1',
                        cache: false,
                        dataType: 'html',
                        success: function(data) {
                            $('#contact_form_inline').html(data);
                            window.galleries.contact_form_popup.after_popup();
                            $('#contact_form .link a, #contact_form .button a').unbind('click.contactform').bind('click.contactform', function() {
                                window.galleries.contact_form_popup.submit_form($(this).closest('#contact_form'));
                                return false;
                            });
                            $('#contact_form_inline #contact_form').attr('role', 'region');
                        }
                    });
                });

            },

            after_popup_callback: function() {

            },

            after_popup: function() {

                window.archimedes.archimedes_core.analytics.track_campaigns.set_forms();

                window.galleries.misc.loaders();

                $('#contact_form .link a, #contact_form .button a').unbind('click.contactform').bind('click.contactform', function() {
                    var instance = $(this).closest('#contact_form');
                    if (!instance.hasClass('submitting')) {
                        window.galleries.contact_form_popup.submit_form(instance);
                    }
                    return false;
                });

            },

            submit_form: function(instance) {

                if (instance) {

                    data = {};

                    field_validation_error = false;

                    $('input, select, textarea', instance).each(function() {
                        if ($(this).closest('.form_row').hasClass('form_row_required')) {
                            if ($(this).is(':radio')) {
                                var checked_radio = $('input[name="' + $(this).attr('name') + '"]:checked').val();
                                if (!checked_radio || typeof checked_radio == 'undefined') {
                                    field_validation_error = true;
                                }
                            } else if ($(this).is(':text') || $(this).is(':textarea')) {
                                if ($(this).val() == '') {
                                    field_validation_error = true;
                                }
                            }
                        }
                        if ($(this).is(':radio')) {
                            var checked_radio = $('input[name="' + $(this).attr('name') + '"]:checked').val();
                            if (!checked_radio || typeof checked_radio == 'undefined') {
                                var checked_radio = '';
                            }
                            data[$(this).attr('name')] = checked_radio;
                        } else if ($(this).attr('name') == 'f_message') {
                            data[$(this).attr('name')] = $(this).val().replace(/\n/g, '<br />');
                        } else {
                            data[$(this).attr('name')] = $(this).val().replace(/\n/g, '<br />');
                        }
                    });

                    if (field_validation_error) {
                        $(instance).removeClass('submitting');

                        // For accessibility - tracks which element to refocus on
                        try {
                            h.accessibility.global_variables.element_to_refocus_to = $('#contactFormSubmit a');
                        } catch(error) {
                            console.error(error);
                        }

                        h.alert('<h2>Sorry</h2>Please fill in all the required fields');

                        //$('.error_row', instance).text('Please fill in all the required fields');
                        //window.galleries.effects.pulsate($('.error_row', instance));
                        return;
                    }

                    $(instance).addClass('submitting');
                    $('.button', instance).addClass('loading');

                    window.archimedes.archimedes_core.analytics.track_campaigns.save_form_data($(instance));

                    //data = encodeURI(data); // Encode form data so that unicode characters work
                    data['originating_page'] = encodeURIComponent(window.location.pathname + window.location.search);

                    var url_prefix = '';
                    if (typeof window.archimedes.proxy_dir != 'undefined') {
                        var url_prefix = window.archimedes.proxy_dir;
                    }

                    $.ajax({
                        url: url_prefix + "/contact/form/process/",
                        data: data,
                        cache: false,
                        type: 'POST',
                        dataType: 'json',
                        success: function(data) {
                            $('.button', instance).removeClass('loading');
                            $(instance).removeClass('submitting');
                            if (data['success'] == 1) {
                                $.fancybox((url_prefix + '/contact/form/?modal=1&complete=1'), window.galleries.fancybox.ajax_defaults());

                                $('input[type="text"], select, textarea', instance).each(function() {
                                    $(this).val('');
                                });

                                if (window.fbq && typeof window.fbq != 'undefined') {
                                    // Track in Facebook Pixel
                                    fbq('track', 'Lead');
                                }
                                if (window.ga) {
                                    // Track in Analytics
                                    ga('send', {
                                        'hitType': 'event',
                                        'eventCategory': 'Contact form submit success',
                                        'eventAction': window.location.pathname,
                                        'eventLabel': $(document).attr('title')
                                    });
                                    // Track in second Analytics account
                                    ga('tracker2.send', {
                                        'hitType': 'event',
                                        'eventCategory': 'Contact form submit success',
                                        'eventAction': window.location.pathname,
                                        'eventLabel': $(document).attr('title')
                                    });
                                    ga('artlogic_tracker.send', {
                                        'hitType': 'event',
                                        'eventCategory': 'Contact form submit success',
                                        'eventAction': window.location.pathname,
                                        'eventLabel': $(document).attr('title')
                                    });
                                }

                                window.galleries.contact_form_popup.after_submit();
                            } else {
                                var error_message = '';
                                if (data['error_message'] && typeof data['error_message'] != 'undefined') {
                                    var error_message = data['error_message'];
                                }
                                if (error_message) {
                                    h.alert(error_message);
                                    //$('.error_row', instance).text(error_message);
                                } else {
                                    h.alert('<h2>Sorry</h2>An error occurred. Please try again.');
                                }
                                //window.galleries.effects.pulsate($('.error_row', instance));

                                if (window.ga) {
                                    // Track in Analytics
                                    ga('send', {
                                        'hitType': 'event',
                                        'eventCategory': 'Contact form submit error',
                                        'eventAction': window.location.pathname,
                                        'eventLabel': $(document).attr('title')
                                    });
                                    // Track in second Analytics account
                                    ga('tracker2.send', {
                                        'hitType': 'event',
                                        'eventCategory': 'Contact form submit error',
                                        'eventAction': window.location.pathname,
                                        'eventLabel': $(document).attr('title')
                                    });
                                    ga('artlogic_tracker.send', {
                                        'hitType': 'event',
                                        'eventCategory': 'Contact form submit error',
                                        'eventAction': window.location.pathname,
                                        'eventLabel': $(document).attr('title')
                                    });
                                }

                            }
                        }
                    });
                }

            },

            after_submit: function() {

            }

        },

        forms: {

            init: function() {

                $('.form').each(function() {
                    if ($(this).hasClass('form_layout_hidden_labels')) {
                        $('.form_row input[type="text"], .form_row input[type="email"], .form_row input[type="phone"], .form_row input[type="password"]', this)
                            .each(function() {
                                var field_label = $(this).siblings('label').text();
                                if (field_label) {
                                    $(this).attr('data-default-value', field_label).val(field_label);
                                    if ($(this).val() != '' && $(this).val() != $(this).attr('data-default-value')) {
                                        $(this).addClass('active');
                                    } else {
                                        $(this).val($(this).attr('data-default-value'));
                                    }
                                }
                            })
                            .change(function() {
                                $(this).closest('.form_row').removeClass('error');
                            })
                            .focus(function() {
                                $(this).removeClass('required-field');
                                $(this).closest('.form_row').removeClass('error');
                                if ($(this).val() == $(this).attr('data-default-value')) {
                                    $(this).addClass('active');
                                    $(this).val('');
                                }
                            })
                            .blur(function() {
                                $(this).attr('data-default-value', $(this).parent().find('label').text());
                                if ($(this).val() == '' || $(this).val() == $(this).attr('data-default-value')) {
                                    $(this).val($(this).attr('data-default-value'));
                                    $(this).removeClass('active');
                                }
                            })
                        ;
                    }
                });

            }

        },

        mailinglist_signup_form_popup: {

            init: function() {

                $('#mailinglist_signup_close_popup_link, #mailinglist_signup_close_popup_link a, #mailing_list_popup_overlay')
                    .unbind()
                    .click(function() {
                        window.galleries.mailinglist_signup_form_popup.close();
                        return false;
                    })
                ;

                $('a.mailinglist_signup_popup_link')
                    .unbind()
                    .click(function() {
                        // For accessibility - tracks which element to refocus on
                        try {
                            h.accessibility.global_variables.element_to_refocus_to = $(this);
                        } catch(error) {
                            console.error(error);
                        }
                        if ($('body').hasClass('slide-nav-active')) {
                            $('#top_nav_reveal').trigger('click');
                        }

                        window.galleries.mailinglist_signup_form_popup.open();

                        if (false) {
                            var element_link = $(this).attr('href');
                            $.fancybox.open(
                                element_link + '?simplified=1',
                                {
                                    type: 'iframe',
                                    autoSize: false,
                                    height: 'auto',
                                    width: 400,
                                    height: 520,
                                    arrows: false,
                                    prevEffect: 'fade',
                                    nextEffect: 'fade',
                                    closeEffect: 'fade',
                                    openEffect: 'fade',
                                    wrapCSS: 'fancybox_ajax_popup',
                                    prevSpeed: 750,
                                    nextSpeed: 750,
                                    closeSpeed: 200,
                                    openSpeed: 400,
                                    padding: 25,
                                    afterLoad: function () {
                                        $(".fancybox-overlay").addClass("fancybox-overlay-iframe");
                                    },
                                    afterShow: function() {
                                        // Close modal using esc key
                                        $("iframe.fancybox-iframe").contents().on("keyup.mailingsEsc", function(event){
                                            if (event.keyCode == 27){
                                                $.fancybox.close(true)
                                            }
                                        });
                                        window.galleries.mailinglist_signup_form_popup.after_popup();
                                        // For accessibility - focus trap
                                        var mailingListElement = $("iframe.fancybox-iframe").contents().find('#content');
                                        h.accessibility.on_popup_opening(mailingListElement, mailingListElement.find('input:first'),'.fancybox-wrap .fancybox-close');
                                        // transfer the tabbing-detected to the body of the iframe if it exists
                                        if ($('body').hasClass('tabbing-detected')) {
                                            mailingListElement.addClass('tabbing-detected');
                                        }
                                    },
                                    afterClose: function () {
                                        h.accessibility.on_popup_closing();
                                        $("iframe.fancybox-iframe").contents().off( ".mailingsEsc" );
                                    }
                                }
                            );
                        }

                        return false;
                    })
                ;

                if (!$('body').hasClass('splash-loader-active')) {
                    window.galleries.mailinglist_signup_form_popup.auto_popup();
                }
                if ($('#mailing_list_popup_container').hasClass('auto_popup_exit')) {
                    // Exit intent
                    if (!h.getCookie('shown_mailing_list_popup_exit_intent')) {
                        setTimeout(function() {
                            $(document).unbind('mouseout.exitintent').bind("mouseout.exitintent", function(evt) {
                                exit_intent_timeout = setTimeout(function() {
                                    if(evt.toElement === null && evt.relatedTarget === null) {
                                        $(evt.currentTarget).unbind('mouseout.exitintent');
                                        $(evt.currentTarget).unbind('mouseover.exitintent');
                                        window.galleries.mailinglist_signup_form_popup.auto_popup(true, 'exit_intent');
                                    }
                                }, 750);
                            });
                            $(document).unbind('mouseover.exitintent').bind("mouseover.exitintent", function(evt) {
                                if (typeof exit_intent_timeout != 'undefined') {
                                    clearTimeout(exit_intent_timeout);
                                }
                            });
                        }, 2000);
                    }
                }

                //
                // DEPRICATED METHOD
                //
                $('a#mailinglist_signup_popup_link')
                    .click(function() {

                        $.fancybox.open(
                            '/contact/mailinglist_signup/?modal=1',
                            {
                                type: 'ajax',
                                autoSize: false,
                                height: 'auto',
                                width: 420,
                                arrows: false,
                                prevEffect: 'fade',
                                nextEffect: 'fade',
                                closeEffect: 'fade',
                                openEffect: 'fade',
                                wrapCSS: 'fancybox_ajax_popup',
                                prevSpeed: 750,
                                nextSpeed: 750,
                                closeSpeed: 200,
                                openSpeed: 400,
                                padding: 25,
                                afterShow: function() {
                                    window.galleries.mailinglist_signup_form_popup.after_popup();
                                }
                            }
                        );

                        return false;
                    })
                ;

            },

            open: function() {

                $('body').addClass('mailing_list_popup_active');
                setTimeout(function() {
                    $('body').addClass('mailing_list_popup_visible');
                    h.accessibility.on_popup_opening($('#mailing_list_popup_box'), $('#mailing_list_popup_box').find('input[type!="hidden"]:first'), '#mailinglist_signup_close_popup_link a');
                    window.galleries.mailinglist_signup_form_popup.after_popup();
                }, 50);

            },

            close: function() {

                $('body').removeClass('mailing_list_popup_visible');
                setTimeout(function() {
                    $('body').removeClass('mailing_list_popup_active');
                }, 400);

                h.accessibility.on_popup_closing();

            },

            auto_popup: function(instant, context_name) {
                var instant = typeof instant != 'undefined' ? instant : false;
                var context_name = typeof context_name != 'undefined' ? '_' + context_name : '';
                if ($('#mailing_list_popup_container').hasClass('auto_popup')) {
                    var timeout = 1000;
                    var expiry = 3600;

                    if ($('#mailing_list_popup_container').attr('data-timeout')) {
                        timeout = parseFloat($('#mailing_list_popup_container').attr('data-timeout'))*1000;
                    }

                    if ($('#mailing_list_popup_container').attr('data-cookie-expiry')){
                        expiry = parseFloat($('#mailing_list_popup_container').attr('data-cookie-expiry'));
                    }

                    if (typeof mailing_list_popup_timeout != 'undefined') {
                        clearTimeout(mailing_list_popup_timeout);
                    }

                    if (window.location.search == '?mailings_popup_forced=1') {
                        timeout = 2000;
                    }
                    if (instant) {
                        timeout = 0;
                    }

                    mailing_list_popup_timeout = setTimeout(function() {
                        if (!$('body').hasClass('protected-path-login-mode')) {
                            if(instant || !h.getCookie('shown_mailing_list_popup' + context_name) || window.location.search == '?mailings_popup_forced=1'){

                                var element_in_focus = $(':focus');
                                if (element_in_focus.length < 1) {
                                    var element_in_focus = $('#logo a');
                                }

                                try {
                                    h.accessibility.global_variables.element_to_refocus_to = element_in_focus;
                                } catch(error) {
                                    console.error(error);
                                }

                                window.galleries.mailinglist_signup_form_popup.open();

                                $(document).unbind('mouseover.exitintent');
                                $(document).unbind('mouseout.exitintent');

                                h.setCookie('shown_mailing_list_popup' + context_name, 'true', '', expiry); // Set cookie for chosen seconds
                            }
                        }
                    }, timeout);
                }
            },

            after_popup: function() {

            }

        },

        mailing_list_form: {

            _send_url: '/mailing-list/signup/',
            _error_messages: '',

            init: function() {
                var self = this;
                $('#mailing_list_form, .mailing_list_form')
                    .unbind()
                    .each(function() {
                        $('.field', this)
                            .each(function() {
                                $(this).val($(this).attr('data-default-value'));
                            })
                            .focus(function() {
                                if ($(this).val() == $(this).attr('data-default-value')) {
                                    $(this).addClass('active').val('');
                                }
                            })
                            .blur(function() {
                                if ($(this).val() == '') {
                                    $(this).removeClass('active').val($(this).attr('data-default-value'));
                                }
                            })
                        ;
                        $('.submit_button', this).click(function() {
                            $(this).closest('form').submit();
                            return false;
                        });
                        $('input, textarea', this).keypress(function(event) {
                            if (event.which == 13) {
                                $(this).closest('form').submit();
                                return false;
                            }
                        });
                    })
                    .submit(function(e){
                        e.preventDefault();
                        $('.submit_button', this).closest('.button').addClass('loading');
                        if ($("#mailing_list_form, #artlogic_mailinglist_signup_form").hasClass("submit_disabled")) {
                            return false;
                        } else {
                            $("#mailing_list_form, #artlogic_mailinglist_signup_form").addClass("submit_disabled");
                        }
                        self._send_form($(this).closest('form'));
                    })
                ;
            },

            _form_data: function(instance) {

                var data = {}
                $('input, textarea', instance).each(function() {
                    if ($(this).val() != $(this).attr('data-default-value')) {
                        if($(this).attr('type')=='checkbox'){
                            if ($(this).prop('checked')) {
                                (data[$(this).attr('name')]) ? data[$(this).attr('name')] += ','+$(this).val() :  data[$(this).attr('name')] = $(this).val();
                            }
                        } else {
                            data[$(this).attr('name')] = $(this).val();
                        }
                    } else {
                        data[$(this).attr('name')] = '';
                    }
                });
                return data;
            },

            _clear_form_data: function(instance) {
                //:not([type="hidden"] added new by DC - prevent hidden fields from being cleared as they ofter contain static campaign data etc
                $('input:not([type="checkbox"], [type="hidden"], [type="submit"]), textarea', instance).each(function() {
                    $(this).val($(this).attr('data-default-value'));
                });
                $('input[type="checkbox"]', instance).each(function() {
                    if ($(this).attr('data-autoset') && typeof $(this).attr('data-autoset') != 'undefined') {
                        // Dont reset this as it was auto set as checked
                    } else {
                        $(this).prop('checked', false);
                    }
                });
                $('.error', instance).text('').hide();
            },

            _mandatory_fields: function(instance) {
                var self = this,
                    flag = true;
                $('input[type!="hidden"], textarea', instance).each(function(i) {
                    var currentInput = $('input[type!="hidden"], textarea', instance).eq(i);
                    if (currentInput.attr('required') && (currentInput.val() == '' || currentInput.val() == currentInput.attr('data-default-value'))) {
                        currentInput.addClass('required-field');
                        flag = false;
                    } else {
                        currentInput.removeClass('required-field');
                    }
                });
                if (!flag) {
                    var error_message = $(instance).attr('data-field-error') && typeof $(instance).attr('data-field-error') != 'undefined' ? $(instance).attr('data-field-error') : 'Please fill in all required fields.';
                    self._set_error(error_message);
                    return false;
                }
                return flag;
            },

            _email_is_valid: function(instance) {
                var self = this,
                    flag = false,
                    email = self._form_data(instance)['email'];

                if (!self._form_data(instance)['email']) {
                    flag = false;
                } else if (email.indexOf('@') > -1 && email.split('@')[1].indexOf('.') > -1 && email.indexOf(' ') == -1) {
                    flag = true;
                }

                /* Set error message */
                if (!flag) {
                    self._set_error('Please enter a valid email address.');
                    return false
                }
                return flag;


            },

            _emails_match: function(instance) {

                // We are NOT matching the emails on this form
                return true;

                var self = window.galleries.mailing_list_form,
                    flag = false;

                self._form_data(instance)['email2'] == self._form_data(instance)['email'] ? flag = true : flag = false;

                /* Set error message */
                if (!flag) {
                    self._set_error('Your email addresses do not match.');
                }
                return flag;
            },

            _email_not_exists: function(instance) {

                // Depricated function - not currently used

                var self = window.galleries.mailing_list_form,
                    flag = false;

                $.ajax({
                    url: '/mailing-list/artlogicmailings/email_exists/',
                    type: "POST",
                    dataType: 'json',
                    data: {'email': self._form_data(instance)['email']},
                    success: function(data){
                        flag = data['exists'] ? flag = false : flag = true;
                    },
                    error: function(jqXHR,textStatus,errorThrown){
                        console.log(errorThrown);
                    },
                    async: false
                });

                /* Set error message */
                if (!flag) {
                    self._set_error('Your email address already exists on our mailing list.');
                }
                return flag;
            },

            _set_error: function(error) {
                this._error_messages = error;
            },

            _display_error: function(instance) {
                $('.submit_button', instance).closest('.button').removeClass('loading');

                var self = this;
                error_messages_str = '' + self._error_messages + ''
                error_element = $('.error', instance);
                if (!error_element.length) {
                    // Fall back to error container outside the mailing list form
                    error_element = $('.error');
                }

                $(error_element).text(error_messages_str);
                window.galleries.effects.pulsate($(error_element));
                $(error_element).focus();

                //var error_heading = $(instance).attr('data-field-error-heading') && typeof $(instance).attr('data-field-error-heading') != 'undefined' ? '<h2>' + $(instance).attr('data-field-error-heading') + '</h2>' : '';
                //h.alert(error_heading + error_messages_str);
            },

            _send_form: function(instance) {
                var self = this;

                if (self._mandatory_fields(instance) && self._email_is_valid(instance) && self._emails_match(instance)) {
                    $.ajax({
                        url: self._send_url,
                        type: "POST",
                        dataType: 'json',
                        data: self._form_data(instance),
                        success: function(data) {

                            $('.submit_button', instance).closest('.button').removeClass('loading');

                            if (data.success) {

                                if (window.ga) {
                                    // Track in Analytics
                                    ga('send', {
                                        'hitType': 'event',
                                        'eventCategory': 'Mailing list submit success',
                                        'eventAction': window.location.pathname,
                                        'eventLabel': $(document).attr('title')
                                    });
                                    // Track in second Analytics account
                                    ga('tracker2.send', {
                                        'hitType': 'event',
                                        'eventCategory': 'Mailing list submit success',
                                        'eventAction': window.location.pathname,
                                        'eventLabel': $(document).attr('title')
                                    });
                                    ga('artlogic_tracker.send', {
                                        'hitType': 'event',
                                        'eventCategory': 'Mailing list submit success',
                                        'eventAction': window.location.pathname,
                                        'eventLabel': $(document).attr('title')
                                    });
                                }

                                if (data.already_exists) {
                                    var thanks_message_heading = $(instance).attr('data-field-exists-heading') && typeof $(instance).attr('data-field-exists-heading') != 'undefined' ? $(instance).attr('data-field-exists-heading') : 'Thank you';
                                    var thanks_message_content = $(instance).attr('data-field-exists-content') && typeof $(instance).attr('data-field-exists-content') != 'undefined' ? $(instance).attr('data-field-exists-content') : 'You are already on our mailing list';
                                } else {
                                    var thanks_message_heading = $(instance).attr('data-field-thanks-heading') && typeof $(instance).attr('data-field-thanks-heading') != 'undefined' ? $(instance).attr('data-field-thanks-heading') : 'Thank you';
                                    var thanks_message_content = $(instance).attr('data-field-thanks-content') && typeof $(instance).attr('data-field-thanks-content') != 'undefined' ? $(instance).attr('data-field-thanks-content') : 'You have been added to our mailing list';
                                }
                                h.alert('<h2>' + thanks_message_heading + '</h2> ' + thanks_message_content + '.');
                                self._clear_form_data(instance);

                                if ($('body').hasClass('mailing_list_popup_active')) {
                                    window.galleries.mailinglist_signup_form_popup.close();
                                }

                            } else {

                                if (window.ga) {
                                    // Track in Analytics
                                    ga('send', {
                                        'hitType': 'event',
                                        'eventCategory': 'Mailing list submit error',
                                        'eventAction': window.location.pathname,
                                        'eventLabel': $(document).attr('title')
                                    });
                                    // Track in second Analytics account
                                    ga('tracker2.send', {
                                        'hitType': 'event',
                                        'eventCategory': 'Mailing list submit error',
                                        'eventAction': window.location.pathname,
                                        'eventLabel': $(document).attr('title')
                                    });
                                    ga('artlogic_tracker.send', {
                                        'hitType': 'event',
                                        'eventCategory': 'Mailing list submit error',
                                        'eventAction': window.location.pathname,
                                        'eventLabel': $(document).attr('title')
                                    });
                                }

                                self._set_error('There was a problem adding you to the mailing list, please check the form and try again.');
                                if (data.error_message) {
                                    self._set_error(data.error_message);
                                }
                                self._display_error(instance);
                            }
                            $("#mailing_list_form, #artlogic_mailinglist_signup_form").removeClass("submit_disabled");
                        }
                    });
                } else {
                    self._display_error(instance);
                    $("#mailing_list_form, #artlogic_mailinglist_signup_form").removeClass("submit_disabled");
                }
            }
        },

        google_map_popup: {

            init: function() {

                $('#footer .website_map_popup')
                    .addClass('website_map_popup')
                    .click(function() {

                        // For accessibility - tracks which element to refocus on
                        try {
                            h.accessibility.global_variables.element_to_refocus_to = $(this);
                        } catch(error) {
                            console.error(error);
                        }

                        var dataLatLng = $(this).attr("data-latlng");
                        var dataZoom = $(this).attr("data-zoom");
                        var dataUrl = $(this).attr('href');
                        var dataTitle = $(this).attr("data-title");

                        $.fancybox(
                            {
                                type: 'html',
                                content: '<div id="map_basic_popup" class="google-map" data-latlng="' + dataLatLng + '" data-url="' + dataUrl + '" data-title="' + dataTitle + '" data-zoom="' + dataZoom + '" style=""></div>',
                                autoSize: false,
                                width: '90%',
                                height: '90%',
                                arrows: false,
                                padding: 0,
                                prevEffect: 'fade',
                                nextEffect: 'fade',
                                closeEffect: 'fade',
                                openEffect: 'fade',
                                prevSpeed: 750,
                                nextSpeed: 750,
                                closeSpeed: 300,
                                openSpeed: 750,
                                beforeShow: function () {
                                    window.galleries.google_maps.init();
                                },
                                afterLoad: function () {
                                    $(".fancybox-overlay").addClass("no_max_height fancybox-overlay-html");
                                },
                                afterShow: function() {
                                    h.accessibility.on_popup_opening('.fancybox-opened .fancybox-skin', '.fancybox-wrap .fancybox-close', '.fancybox-wrap .fancybox-close');
                                    $('.fancybox-skin #map_basic').attr({role: "dialog", 'aria-modal': true});
                                    // Make the close link element act like a button
                                    $('.fancybox-skin a.fancybox-close').attr("role", "button");
                                    h.accessibility.role_button();
                                },
                                afterClose: function () {
                                    h.accessibility.on_popup_closing();
                                }

                            }
                        );

                        return false;
                    })
                ;

            }

        },

        google_maps: {

            init: function(map_id) {

                if(typeof map_id == "undefined") {
                    var map_id = '[id*="map_basic"]';
                }
                if($(map_id).length > 0) {
                    // FIXME: not sure these should be here!
                    // var new_styles = [{"featureType":"landscape","stylers":[{"visibility":"simplified"},{"color":"#2b3f57"},{"weight":0.1}]},{"featureType":"administrative","stylers":[{"visibility":"on"},{"hue":"#ff0000"},{"weight":0.4},{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"labels.text","stylers":[{"weight":1.3},{"color":"#FFFFFF"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#f55f77"},{"weight":3}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#f55f77"},{"weight":1.1}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#f55f77"},{"weight":0.4}]},{},{"featureType":"road.highway","elementType":"labels","stylers":[{"weight":0.8},{"color":"#ffffff"},{"visibility":"on"}]},{"featureType":"road.local","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"color":"#ffffff"},{"weight":0.7}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"color":"#6c5b7b"}]},{"featureType":"water","stylers":[{"color":"#f3b191"}]},{"featureType":"transit.line","stylers":[{"visibility":"on"}]}]
                    var new_styles=[{"featureType":"road","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#d0d2d2"}]},{"featureType":"road","stylers":[{"visibility":"simplified"},{"color":"#efefef"}]},{"featureType":"landscape.man_made","stylers":[{"visibility":"simplified"},{"color":"#f6f1ec"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#585a5b"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#eff0ef"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#efefef"},{"visibility":"on"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#d0e2c9"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f9f9f9"}]},{"featureType":"transit.station.bus","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"water","stylers":[{"color":"#a5c8ea"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"color":"#e0e2e0"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#afafaf"}]},{"featureType":"poi.school","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"poi.medical","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"poi.government","stylers":[{"visibility":"off"}]},{"featureType":"poi.sports_complex","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"poi.attraction","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"poi.place_of_worship","elementType":"geometry.fill","stylers":[{"visibility":"off"}]},{}];
                    if($('body').hasClass('theme-preset_dark_mode')){
                        console.log('dark theme map')
                        new_styles = [{"featureType": "all","elementType": "all","stylers": [{"visibility": "on"}]},{"featureType": "all","elementType": "geometry","stylers": [{"visibility": "off"},{"weight": "1.34"}]},{"featureType": "all","elementType": "labels","stylers": [{"visibility": "off"}]},{"featureType": "all","elementType": "labels.text.fill","stylers": [{"saturation": 36},{"color": "#ffffff"},{"lightness": 40}]},{"featureType": "all","elementType": "labels.text.stroke","stylers": [{"visibility": "off"},{"color": "#000000"},{"lightness": 16}]},{"featureType": "all","elementType": "labels.icon","stylers": [{"visibility": "off"}]},{"featureType": "administrative","elementType": "all","stylers": [{"visibility": "off"}]},{"featureType": "administrative","elementType": "geometry.fill","stylers": [{"color": "#ffffff"},{"lightness": 20}]},{"featureType": "administrative","elementType": "geometry.stroke","stylers": [{"color": "#000000"},{"lightness": 17},{"weight": 1.2}]},{"featureType": "landscape","elementType": "all","stylers": [{"visibility": "off"},{"color": "#34302d"}]},{"featureType": "landscape","elementType": "geometry","stylers": [{"color": "#222223"},{"lightness": "0"},{"visibility": "simplified"},{"gamma": "1"}]},{"featureType": "landscape.man_made","elementType": "all","stylers": [{"visibility": "off"}]},{"featureType": "landscape.man_made","elementType": "geometry","stylers": [{"visibility": "off"}]},{"featureType": "landscape.man_made","elementType": "geometry.fill","stylers": [{"visibility": "off"},{"saturation": "-100"},{"lightness": "-100"},{"gamma": "0.00"},{"weight": "2.20"}]},{"featureType": "landscape.man_made","elementType": "geometry.stroke","stylers": [{"visibility": "off"}]},{"featureType": "poi","elementType": "all","stylers": [{"visibility": "off"}]},{"featureType": "poi","elementType": "geometry","stylers": [{"color": "#000000"},{"lightness": 21}]},{"featureType": "poi.attraction","elementType": "all","stylers": [{"visibility": "off"}]},{"featureType": "road","elementType": "all","stylers": [{"visibility": "simplified"},{"weight": "1.00"},{"color": "#ffffff"}]},{"featureType": "road","elementType": "geometry","stylers": [{"visibility": "simplified"},{"color": "#434343"}]},{"featureType": "road","elementType": "labels","stylers": [{"visibility": "simplified"}]},{"featureType": "road","elementType": "labels.text.fill","stylers": [{"visibility": "on"},{"color": "#8a8a8a"}]},{"featureType": "road","elementType": "labels.text.stroke","stylers": [{"visibility": "off"},{"color": "#333333"},{"weight": "3"}]},{"featureType": "road.highway","elementType": "labels","stylers": [{"visibility": "off"}]},{"featureType":"transit.station.bus","stylers":[{"visibility":"off"}]},{"featureType": "water","elementType": "geometry","stylers": [{"color": "#525358"},{"lightness": "0"},{"visibility": "on"}]}];
                    }

                    //In IE11 Google IS defined - incorrectly - as some random meta value. Further check for google.maps when google happens to exist already.
                    if((typeof google == "undefined") || (typeof google != "undefined" && typeof google.maps == "undefined")) {

                        console.info('window.google was not found, loading script...');
                        $.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBOUBY0_1OPrX16l05nPOhBIbc78wb66dI&sensor=false', function(){
                            // CALLBACK FUNCTION!!!
                            console.log('LOADED');
                            window.galleries.google_maps.google_map_setup(map_id);
                        });
                    } else {
                        console.info('window.google was found');
                        window.galleries.google_maps.google_map_setup(map_id);
                    }

                }

            },

            google_map_setup: function(map_id) {
                if($(map_id).length > 0) {

                    // FIXME: not sure these should be here!
                    // var new_styles = [{"featureType":"landscape","stylers":[{"visibility":"simplified"},{"color":"#2b3f57"},{"weight":0.1}]},{"featureType":"administrative","stylers":[{"visibility":"on"},{"hue":"#ff0000"},{"weight":0.4},{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"labels.text","stylers":[{"weight":1.3},{"color":"#FFFFFF"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#f55f77"},{"weight":3}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#f55f77"},{"weight":1.1}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#f55f77"},{"weight":0.4}]},{},{"featureType":"road.highway","elementType":"labels","stylers":[{"weight":0.8},{"color":"#ffffff"},{"visibility":"on"}]},{"featureType":"road.local","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"color":"#ffffff"},{"weight":0.7}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"color":"#6c5b7b"}]},{"featureType":"water","stylers":[{"color":"#f3b191"}]},{"featureType":"transit.line","stylers":[{"visibility":"on"}]}]
                    //var new_styles = [{"featureType": "all","elementType": "all","stylers": [{"visibility": "on"}]},{"featureType": "all","elementType": "geometry","stylers": [{"visibility": "off"},{"weight": "1.34"}]},{"featureType": "all","elementType": "labels","stylers": [{"visibility": "off"}]},{"featureType": "all","elementType": "labels.text.fill","stylers": [{"saturation": 36},{"color": "#ffffff"},{"lightness": 40}]},{"featureType": "all","elementType": "labels.text.stroke","stylers": [{"visibility": "off"},{"color": "#000000"},{"lightness": 16}]},{"featureType": "all","elementType": "labels.icon","stylers": [{"visibility": "off"}]},{"featureType": "administrative","elementType": "all","stylers": [{"visibility": "off"}]},{"featureType": "administrative","elementType": "geometry.fill","stylers": [{"color": "#ffffff"},{"lightness": 20}]},{"featureType": "administrative","elementType": "geometry.stroke","stylers": [{"color": "#000000"},{"lightness": 17},{"weight": 1.2}]},{"featureType": "landscape","elementType": "all","stylers": [{"visibility": "off"},{"color": "#34302d"}]},{"featureType": "landscape","elementType": "geometry","stylers": [{"color": "#222223"},{"lightness": "0"},{"visibility": "simplified"},{"gamma": "1"}]},{"featureType": "landscape.man_made","elementType": "all","stylers": [{"visibility": "off"}]},{"featureType": "landscape.man_made","elementType": "geometry","stylers": [{"visibility": "off"}]},{"featureType": "landscape.man_made","elementType": "geometry.fill","stylers": [{"visibility": "off"},{"saturation": "-100"},{"lightness": "-100"},{"gamma": "0.00"},{"weight": "2.20"}]},{"featureType": "landscape.man_made","elementType": "geometry.stroke","stylers": [{"visibility": "off"}]},{"featureType": "poi","elementType": "all","stylers": [{"visibility": "off"}]},{"featureType": "poi","elementType": "geometry","stylers": [{"color": "#000000"},{"lightness": 21}]},{"featureType": "poi.attraction","elementType": "all","stylers": [{"visibility": "off"}]},{"featureType": "road","elementType": "all","stylers": [{"visibility": "simplified"},{"weight": "1.00"},{"color": "#ffffff"}]},{"featureType": "road","elementType": "geometry","stylers": [{"visibility": "simplified"},{"color": "#434343"}]},{"featureType": "road","elementType": "labels","stylers": [{"visibility": "simplified"}]},{"featureType": "road","elementType": "labels.text.fill","stylers": [{"visibility": "on"},{"color": "#8a8a8a"}]},{"featureType": "road","elementType": "labels.text.stroke","stylers": [{"visibility": "off"},{"color": "#333333"},{"weight": "3"}]},{"featureType": "road.highway","elementType": "labels","stylers": [{"visibility": "off"}]},{"featureType": "transit","elementType": "all","stylers": [{"visibility": "off"}]},{"featureType": "transit","elementType": "geometry","stylers": [{"color": "#000000"},{"lightness": 19}]},{"featureType": "water","elementType": "geometry","stylers": [{"color": "#525358"},{"lightness": "0"},{"visibility": "on"}]}];
                    var new_styles=[{"featureType":"road","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#d0d2d2"}]},{"featureType":"road","stylers":[{"visibility":"simplified"},{"color":"#efefef"}]},{"featureType":"landscape.man_made","stylers":[{"visibility":"simplified"},{"color":"#f6f1ec"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#585a5b"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#eff0ef"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#efefef"},{"visibility":"on"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#d0e2c9"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f9f9f9"}]},{"featureType":"transit.station.bus","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"water","stylers":[{"color":"#a5c8ea"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"color":"#e0e2e0"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#afafaf"}]},{"featureType":"poi.school","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"poi.medical","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"poi.government","stylers":[{"visibility":"off"}]},{"featureType":"poi.sports_complex","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"poi.attraction","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"poi.place_of_worship","elementType":"geometry.fill","stylers":[{"visibility":"off"}]},{}];
                    if($('body').hasClass('theme-preset_dark_mode')){
                        new_styles = [{"featureType": "all","elementType": "all","stylers": [{"visibility": "on"}]},{"featureType": "all","elementType": "geometry","stylers": [{"visibility": "off"},{"weight": "1.34"}]},{"featureType": "all","elementType": "labels","stylers": [{"visibility": "off"}]},{"featureType": "all","elementType": "labels.text.fill","stylers": [{"saturation": 36},{"color": "#ffffff"},{"lightness": 40}]},{"featureType": "all","elementType": "labels.text.stroke","stylers": [{"visibility": "off"},{"color": "#000000"},{"lightness": 16}]},{"featureType": "all","elementType": "labels.icon","stylers": [{"visibility": "off"}]},{"featureType": "administrative","elementType": "all","stylers": [{"visibility": "off"}]},{"featureType": "administrative","elementType": "geometry.fill","stylers": [{"color": "#ffffff"},{"lightness": 20}]},{"featureType": "administrative","elementType": "geometry.stroke","stylers": [{"color": "#000000"},{"lightness": 17},{"weight": 1.2}]},{"featureType": "landscape","elementType": "all","stylers": [{"visibility": "off"},{"color": "#34302d"}]},{"featureType": "landscape","elementType": "geometry","stylers": [{"color": "#222223"},{"lightness": "0"},{"visibility": "simplified"},{"gamma": "1"}]},{"featureType": "landscape.man_made","elementType": "all","stylers": [{"visibility": "off"}]},{"featureType": "landscape.man_made","elementType": "geometry","stylers": [{"visibility": "off"}]},{"featureType": "landscape.man_made","elementType": "geometry.fill","stylers": [{"visibility": "off"},{"saturation": "-100"},{"lightness": "-100"},{"gamma": "0.00"},{"weight": "2.20"}]},{"featureType": "landscape.man_made","elementType": "geometry.stroke","stylers": [{"visibility": "off"}]},{"featureType": "poi","elementType": "all","stylers": [{"visibility": "off"}]},{"featureType": "poi","elementType": "geometry","stylers": [{"color": "#000000"},{"lightness": 21}]},{"featureType": "poi.attraction","elementType": "all","stylers": [{"visibility": "off"}]},{"featureType": "road","elementType": "all","stylers": [{"visibility": "simplified"},{"weight": "1.00"},{"color": "#ffffff"}]},{"featureType": "road","elementType": "geometry","stylers": [{"visibility": "simplified"},{"color": "#434343"}]},{"featureType": "road","elementType": "labels","stylers": [{"visibility": "simplified"}]},{"featureType": "road","elementType": "labels.text.fill","stylers": [{"visibility": "on"},{"color": "#8a8a8a"}]},{"featureType": "road","elementType": "labels.text.stroke","stylers": [{"visibility": "off"},{"color": "#333333"},{"weight": "3"}]},{"featureType": "road.highway","elementType": "labels","stylers": [{"visibility": "off"}]},{"featureType": "transit","elementType": "labels","stylers": [{"visibility": "on"}]},{"featureType": "transit.station.bus","elementType": "labels","stylers": [{"visibility": "off"}]},{"featureType": "water","elementType": "geometry","stylers": [{"color": "#525358"},{"lightness": "0"},{"visibility": "on"}]}];
                    }
                    // if(typeof google == "undefined") {
                    //     $.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBOUBY0_1OPrX16l05nPOhBIbc78wb66dI&sensor=false', function(){
                    //         // CALLBACK FUNCTION!!!
                    //         // CALLBACK FUNCTION!!!
                    //         // CALLBACK FUNCTION!!!
                    //         // CALLBACK FUNCTION!!!
                    //     });
                    // }
                    $(map_id).each(function(){

                        if ($(this).attr('data-latlng') && typeof $(this).attr('data-latlng') !== 'undefined') {

                            var lat = $(this).attr('data-latlng').split(',')[0];
                            var lng = $(this).attr('data-latlng').split(',')[1];
                            var map_title = $(this).attr('data-title');
                            var map_link = $(this).attr('data-url');
                            var map_zoom = parseInt($(this).attr('data-zoom'));
                            var custom_styles = (typeof $(this).attr("data-custom-styles") != 'undefined' ? $(this).attr("data-custom-styles") : false);
                            if (custom_styles) {
                                new_styles = $.parseJSON(custom_styles);
                            }

                            //locations
                            var position = new google.maps.LatLng(lat, lng);

                            //center on location
                            var center = new google.maps.LatLng(lat, lng);

                            //map options
                            var myOptions = {
                                zoom: map_zoom,
                                center: center,
                                mapTypeId: google.maps.MapTypeId.ROADMAP,
                                panControl: false,
                                //panControl: true,
                                //panControlOptions: {
                                //    position: google.maps.ControlPosition.TOP_RIGHT
                                //},
                                zoomControl: true,
                                zoomControlOptions: {
                                    style: google.maps.ZoomControlStyle.SMALL,
                                    position: google.maps.ControlPosition.LEFT_TOP
                                },
                                scaleControl: false,
                                streetViewControl: false,
                                overviewMapControl: false,
                                scrollwheel: false,
                                draggable: true,
                                styles: new_styles,
                                mapTypeControl: false,
                                fullscreenControl: false
                            }
                            //insert the map into the id on page using map options etc
                            // map_id = 'map_basic';
                            var map = new google.maps.Map(this, myOptions);

                            //each marker config
                            var marker = new google.maps.Marker({
                                position: position,
                                map: map,
                                url: map_link,
                                title: map_title
                            });

                            if (map_link != '') {
                                google.maps.event.addListener(marker, 'click', function() {
                                    window.open(
                                        marker.url,
                                        '_blank'
                                    );
                                });
                            }
                        } else {
                            console.log('Requires data-latlng to render map.')
                        }
                    });

                }
            }

        },

        effects: {

            pulsate: function(effect_element) {
                $(effect_element)
                    .clearQueue()
                    .hide()
                    .fadeTo(250, 1)
                    .fadeTo(250, 0)
                    .fadeTo(250, 1)
                    .fadeTo(250, 0)
                    .fadeTo(250, 1)
                    .fadeTo(250, 0)
                    .fadeTo(250, 1)
                ;
            }

        },

        fancybox: {

            ajax_defaults: function() {
                return {
                    type: 'ajax',
                    autoSize: false,
                    height: 'auto',
                    width: 495,
                    arrows: false,
                    prevEffect: 'fade',
                    nextEffect: 'fade',
                    closeEffect: 'fade',
                    openEffect: 'fade',
                    wrapCSS: 'fancybox_ajax_popup',
                    prevSpeed: 750,
                    nextSpeed: 750,
                    closeSpeed: 300,
                    openSpeed: 750,
                    afterShow: function() {

                    }
                }
            }

        },

        plugin_tweaks: {

            init: function() {
                $('#mc_embed_signup .mc-field-group #mce-EMAIL').not('[name]').attr('name', 'EMAIL');
                if ($('body').hasClass('page-param-type-simplified')) {
                    $('#mc_embed_signup > form[target="_blank"]').each(function() {
                        // $(this).submit(function() {
                        //     window.parent.$.fancybox.close();
                        // });
                    });
                }
            }

        },

        parallax: {

            init: function() {
                if (!window.galleries.device.handheld()) {
                    $('.parallax-element').each(function() {
                        $('body').addClass('page-parallax-animate');
                        $(this).parallax({imageSrc: $(this).attr('data-image-src')});
                        setTimeout(function() {
                            $('body').removeClass('page-parallax-animate')
                        }, 50);
                    });
                }
                $(window).resize(function(){
                    if (($(window).width() <= 767 || window.galleries.device.handheld()) && $('#hero_header').length) {
                        $('#hero_header').addClass('parallax-disabled');
                    } else if ($('#hero_header').length) {
                        $('#hero_header').removeClass('parallax-disabled');
                    }
                });
            }

        },

        prevent_user_image_save: {

            init: function() {
                if ( $('body.prevent_user_image_save').length > 0 ) {
                    $('.image a, .records_list a, .image-wrapper a').attr('draggable', 'false');
                }
            }

        },

        throttle: function(delay, callback) {
            var previousCall = new Date().getTime();
            return function() {
                var time = new Date().getTime();
                if ((time - previousCall) >= delay) {
                    previousCall = time;
                    callback.apply(null, arguments);
                }
            };
        },

        debounce: function(wait, func, immediate) {
            var timeout;
            return function() {
                var context = this, args = arguments;
                var later = function() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                var callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        },

        accessibility: {

            init: function() {
                window.galleries.accessibility.top_nav();

                // Wrapped in document ready to ensure it is called last
                // We know this is weird because its already nested in another $(document).ready and should be improved in the future if possible
                $(document).ready(function() {
                    h.accessibility.role_button();

                    // Some screen readers read out Horizontal rules, so we add aria-hidden to them
                    // This is a temporary fix until we update tinymce to allow html attriubtes to be added or to always add the aria-hidden
                    // attribute if a horizontal rule is added with tinymce
                    $('hr').attr('aria-hidden', 'true');
                });
            },

            top_nav: function() {

                // Add dialog role to the top nav when it turns into an overlay.
                var responsive_top_size = $('#header #responsive_slide_nav_wrapper_inner').attr('data-responsive-top-size');
                if (responsive_top_size == 'responsive_nav_always_enabled') {
                    $('#header #responsive_slide_nav_wrapper_inner').attr({
                        role: "dialog",
                        'aria-label': "Main navigation",
                        'aria-modal': true
                    });
                } else {
                    $(window).resize(function(){
                        if ($(window).width() < parseInt(responsive_top_size)) {
                            $('#header #responsive_slide_nav_wrapper_inner').attr({
                                role: "dialog",
                                'aria-label': "Main navigation",
                                'aria-modal': true
                            });
                        } else {
                            $('#header #responsive_slide_nav_wrapper_inner').removeAttr('role aria-label');
                        }
                    });
                }

            },

        },

        global_analytics:{

            init: function() {

                var artwork_count = $('[data-record-type="artwork"]').length;
                // console.log("Artwork count: " + artwork_count);

                if (window.ga) {
                    var site_name = $('body').attr('date-site-name');
                    ga('artlogic_tracker.send', 'event', 'artworks', 'view', {
                        'dimension1':  site_name,
                        'metric1': artwork_count
                    });
                }

            },

            track_popup: function(){

                var artwork_count = $('#popup_content [data-record-type="artwork"]').length;
                // console.log("Artwork count: " + artwork_count);

                if (window.ga) {
                    var site_name = $('body').attr('date-site-name');
                    ga('artlogic_tracker.send', 'event', 'artworks', 'view', {
                        'dimension1':  site_name,
                        'metric1': artwork_count
                    });
                }

            }

        },

        google_analytics: function(page){

        },

        viewing_room: {

            init: function() {
                window.galleries.viewing_room.countdown_clock();
            },

            countdown_clock: function() {

                $('.countdown_clock').each(function() {

                    var $this = $(this);

                    // Set the date we're counting down to
                    var start_date = $(this).attr('data-target-time');
                    var countDownDate = new Date(start_date.replace(/-/g,"/")).getTime();

                    // Clock is active
                    if (!$this.closest('.countdown_clock').hasClass('active')) {
                        $this.closest('.countdown_clock').addClass('active');
                    }

                    // Set clock on first load
                    $this.html(window.galleries.viewing_room.update_clock_html(countDownDate));

                    // Update the countdown every 1 second
                    setInterval(function() {
                        $this.html(window.galleries.viewing_room.update_clock_html(countDownDate));
                    }, 1000);

                });

            },

            update_clock_html: function(countDownDate) {

                var clock_format = 'full';

                // Get today's date and time
                //var now = new Date().getTime();
                // Get in UTC
                var d =new Date();
                var timezone_offset = d.getTimezoneOffset();
                // Reverse timezone offset for the calculation below
                var timezone_offset = timezone_offset - (timezone_offset * 2)
                // Get current time adjusted to UTC
                var now = d.getTime() - (timezone_offset * 1000 * 60);

                // Find the distance between now and the count down date
                var distance = countDownDate - now;

                var _html_ = '';


                if (distance <= 0) {
                    _html_ = ''
                    $('.countdown_text').each(function() {
                        $(this).text('');
                        if ($(this).closest('.countdown_container').hasClass('countdown_reload_on_completion')) {
                            //    window.location.reload();
                        } else {
                            $(this).closest('.countdown_container').remove();
                        }
                    });
                } else {

                    if (clock_format == 'days') {
                        // Time calculations for days, hours, minutes and seconds
                        var days = Math.ceil(distance / (1000 * 60 * 60 * 24));
                        _html_ += (days != 0 ? '<span class="numeral">'+ days+ '</span>' : '');
                        _html_ += (days != 0 ? ' <span class="countdown_text">'+ (days > 1 ? 'days' : 'day') + '</span>' : '');

                    } else if (clock_format == 'full') {
                        // Time calculations for days, hours, minutes and seconds
                        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                        _html_ += ('<span class="segment"><span class="numeral">'+ days+ '</span><span class="period">Days</span></span><span class="segment-divide">:</span>' || '');
                        _html_ += ('<span class="segment"><span class="numeral">'+ hours+ '</span><span class="period">Hours</span></span><span class="segment-divide">:</span>' || '');
                        _html_ += ('<span class="segment"><span class="numeral">'+ minutes+ '</span><span class="period">Mins</span></span><span class="segment-divide">:</span>' || '');
                        _html_ += '<span class="segment"><span class="numeral">'+ seconds+ '</span><span class="period">Secs</span></span>';
                    }

                }

                return _html_;

            }

        }

    }

    $(document).ready(function() {

        window.galleries.init();

    });


})(jQuery);
