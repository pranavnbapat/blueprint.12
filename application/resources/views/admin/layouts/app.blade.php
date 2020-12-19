<!DOCTYPE html>
<html>

    <head>
        <meta charset="UTF-8">
        <title></title>
        <meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>
        <meta name="csrf-token" content="{{ csrf_token() }}" />
        <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
        <![endif]-->

        <!-- global css -->
        <link href="{{ asset('admin/css/app.css') }}" rel="stylesheet" />
        <link href="//cdnjs.cloudflare.com/ajax/libs/jquery.bootstrapvalidator/0.5.2/css/bootstrapValidator.min.css" rel="stylesheet" type="text/css" />

        <link href="{{ asset('admin/vendors/toastr/css/toastr.css') }}" rel="stylesheet" type="text/css" />
        <link href="{{ asset('admin/css/pages/toastr.css') }}" rel="stylesheet" type="text/css" />

        <link href="{{ asset('admin/vendors/jasny-bootstrap/css/jasny-bootstrap.css') }}" rel="stylesheet" type="text/css" />
        <link href="{{ asset('admin/vendors/iCheck/css/all.css') }}" rel="stylesheet" type="text/css" />
        <!-- end of global css -->

        @if(Request::segment(2) == 'seo' || Request::segment(2) == 'homepage' || Request::segment(2) == 'artists' || Request::segment(2) == 'about' || Request::segment(2) == 'exhibitions' || Request::segment(2) == 'art-fairs' || Request::segment(2) == 'platform' || Request::segment(2) == 'contact')
        <link rel="stylesheet" type="text/css" href="{{ asset('admin/vendors/datatables/css/dataTables.bootstrap.css') }}">
        <link rel="stylesheet" type="text/css" href="{{ asset('admin/vendors/select2/css/select2.min.css') }}" />
        <link rel="stylesheet" type="text/css" href="{{ asset('admin/vendors/select2/css/select2-bootstrap.css') }}" />
        <link href="{{ asset('admin/css/pages/tables.css') }}" rel="stylesheet" type="text/css" />
        @endif

        @if(Request::segment(3) == 'upload-images')
            <link rel="stylesheet" type="text/css" href="{{ asset('admin/vendors/fancybox/jquery.fancybox.css') }}" media="screen" />
            <link href="{{ asset('admin/vendors/bootstrap3-wysihtml5-bower/css/bootstrap3-wysihtml5.min.css') }}" rel="stylesheet" media="screen" />
            <link href="{{ asset('admin/css/pages/editor.css') }}" rel="stylesheet" type="text/css" />
            <style>
                .carousel-inner>.item>a>img, .carousel-inner>.item>img, .img-responsive, .thumbnail a>img, .thumbnail>img {
                    float: left;
                }
            </style>
        @endif

        @if(Request::segment(2) == 'my-profile')
            <link href="{{ asset('admin/css/pages/user_profile.css') }}" rel="stylesheet" type="text/css" />
        @endif

        <link href="{{ asset('admin/vendors/modal/css/component.css') }}" rel="stylesheet" type="text/css" />
        <link href="{{ asset('admin/css/pages/advmodals.css') }}" rel="stylesheet" type="text/css" />
    </head>

    <body class="skin-josh">
        <header class="header">
            <a href="/admin/dashboard" class="logo">
                <img src="{{ asset('admin/img/blueprint12-logo.png') }}" alt="Logo">
            </a>
            <nav class="navbar navbar-static-top" role="navigation">
                <!-- Sidebar toggle button-->
                <div>
                    <a href="#" class="navbar-btn sidebar-toggle" data-toggle="offcanvas" role="button">
                        <div class="responsive_nav"></div>
                    </a>
                </div>
                <div class="navbar-right">
                    <ul class="nav navbar-nav">
                        <li class="dropdown user user-menu">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                <img src="{{ asset('admin/img/authors/avatar3.jpg') }}" width="35" class="img-circle img-responsive pull-left" height="35" alt="riot">
                                <div class="riot">
                                    <div>
                                        Riot
                                        <span>
                                                <i class="caret"></i>
                                        </span>
                                    </div>
                                </div>
                            </a>
                            <ul class="dropdown-menu">
                                <!-- User image -->
                                <li class="user-header bg-light-blue">
                                    <img src="{{ asset('admin/img/authors/avatar3.jpg') }}" width="90" class="img-circle img-responsive" height="90" alt="User Image" />
                                    <p class="topprofiletext">Riot Zeast</p>
                                </li>
                                <!-- Menu Body -->
                                <li>
                                    <a href="/admin/my-profile">
                                        <i class="livicon" data-name="user" data-s="18"></i> My Profile
                                    </a>
                                </li>
                                <!-- Menu Footer-->
                                <li class="user-footer">
                                    <div class="pull-right">
                                        <form id="logout" name="logout" method="POST">
                                            @csrf
                                            <a href="{{ url('/logout') }}">
                                                <i class="livicon" data-name="sign-out" data-s="18"></i> Logout
                                            </a>
                                        </form>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
        <div class="wrapper row-offcanvas row-offcanvas-left">
            <!-- Left side column. contains the logo and sidebar -->
            @include('admin.layouts.menu')

            <!-- Right side column. Contains the navbar and content of the page -->
                {{--<div class="alert alert-success alert-dismissable margin5">
                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                    <strong>Success:</strong> You have successfully logged in.
                </div>--}}
            <!-- Main content -->
            <aside class="right-side">
                @yield('content')
            </aside>
            <!-- right-side -->
        </div>
        <a id="back-to-top" href="#" class="btn btn-primary btn-lg back-to-top" role="button" title="Return to top" data-toggle="tooltip" data-placement="left">
            <i class="livicon" data-name="plane-up" data-size="18" data-loop="true" data-c="#fff" data-hc="white"></i>
        </a>

        <!-- global js -->
        <script src="{{ asset('admin/js/jquery.min.js') }}"></script>
        <script src="{{ asset('admin/js/jquery-ui.min.js') }}"></script>
        <script src="{{ asset('admin/js/bootstrap.min.js') }}"></script>
        <script src="{{ asset('admin/js/app.js') }}"></script>
        <script type="text/javascript" src="{{ asset('admin/vendors/countUp.js/js/countUp.js') }}"></script>

{{--        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>--}}
        <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jquery.bootstrapvalidator/0.5.2/js/bootstrapValidator.min.js"></script>
        <!-- end of global js -->

        <!-- begining of page level js -->
        <script src="{{ asset('admin/vendors/toastr/js/toastr.min.js') }}"></script>
        <script src="{{ asset('admin/vendors/toastr/js/pages/ui-toastr.js') }}" type="text/javascript"></script>

        <script type="text/javascript" src="{{ asset('/admin/vendors/datatables/js/jquery.dataTables.js') }}"></script>
        <script type="text/javascript" src="{{ asset('/admin/vendors/datatables/js/dataTables.bootstrap.js') }}"></script>
        <script type="text/javascript" src="{{ asset('/admin/vendors/datatables/js/dataTables.responsive.js') }}"></script>
        <script type="text/javascript" src="{{ asset('/admin/vendors/select2/js/select2.js') }}"></script>

        <script>
            toastr.options = {
                "closeButton": true,
                "debug": false,
                "positionClass": "toast-top-right",
                "onclick": null,
                "showDuration": "1000",
                "hideDuration": "1000",
                "timeOut": "5000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "swing",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            }

            @if(session('success'))
                Command: toastr['success']("{{session('success')}}", "Success")
            @elseif(session('error'))
                Command: toastr['error']("{{session('error')}}", "Error")
            @endif
        </script>
        <!-- end of page level js -->

        @if(Request::segment(2) == 'dashboard')
            <!--   Realtime Server Load  -->
            <script src="{{ asset('admin/vendors/flotchart/js/jquery.flot.js') }}" type="text/javascript"></script>
            <script src="{{ asset('admin/vendors/flotchart/js/jquery.flot.resize.js') }}" type="text/javascript"></script>

            <script type="text/javascript" src="{{ asset('admin/vendors/flotchart/js/realtime_server_load.js') }}"></script>
        @endif

        @if(Request::segment(2) == 'seo')
            <script type="text/javascript" src="{{ asset('/admin/js/seo.js') }}"></script>
        @endif

        @if(Request::segment(2) == 'homepage')
            <script type="text/javascript" src="{{ asset('/admin/js/homepage.js') }}"></script>
            <script type="text/javascript" src="{{ asset('admin/vendors/ckeditor4/ckeditor.js') }}"></script>
            <script type="text/javascript">
                CKEDITOR.replace('home_info')
                CKEDITOR.replace('home_info_mob')
            </script>
        @endif

        @if(Request::segment(2) == 'my-profile')
            <script src="{{ asset('admin/js/pages/user_profile.js') }}" type="text/javascript"></script>
            <script src="{{ asset('admin/js/my_profile.js') }}" type="text/javascript"></script>
        @endif

        @if(Request::segment(2) == 'about')
{{--            <script src="{{ asset('admin/js/pages/ckeditor.js') }}" type="text/javascript"></script>--}}
            <script type="text/javascript" src="{{ asset('admin/js/about.js') }}"></script>
            <script type="text/javascript" src="{{ asset('admin/vendors/ckeditor4/ckeditor.js') }}"></script>
            <script>
                CKEDITOR.replace('about_info')
            </script>
        @endif

        @if(Request::segment(2) == 'artists' && Request::segment(3) == 'upload-images')
            <script type="text/javascript" src="{{ asset('admin/vendors/ckeditor4/ckeditor.js') }}"></script>
            <script type="text/javascript" src="{{ asset('admin/js/artists.js') }}"></script>
            <script>
                CKEDITOR.replace('art_info')
                CKEDITOR.replace('art_img_caption')
            </script>
            <script type="text/javascript" src="{{ asset('admin/vendors/fancybox/jquery.fancybox.js') }}"></script>
            <script>
                $(document).ready(function() {
                    $('.fancybox').fancybox();
                });
            </script>
        @endif

        @if(Request::segment(2) == 'artists' && Request::segment(3) != 'upload-images')
            <script type="text/javascript" src="{{ asset('admin/vendors/ckeditor4/ckeditor.js') }}"></script>
            <script type="text/javascript" src="{{ asset('admin/js/artists.js') }}"></script>
            <script>
                CKEDITOR.replace('art_descr')
                CKEDITOR.replace('art_info')
            </script>
        @endif

        @if(Request::segment(2) == 'exhibitions' && Request::segment(3) == 'upload-images')
            <script type="text/javascript" src="{{ asset('admin/vendors/ckeditor4/ckeditor.js') }}"></script>
            <script type="text/javascript" src="{{ asset('admin/js/exhibitions.js') }}"></script>
            <script>
                CKEDITOR.replace('ex_info')
                CKEDITOR.replace('ex_img_caption')
            </script>
            <script type="text/javascript" src="{{ asset('admin/vendors/fancybox/jquery.fancybox.js') }}"></script>
            <script>
                $(document).ready(function() {
                    $('.fancybox').fancybox();
                });
            </script>
        @endif

        @if(Request::segment(2) == 'exhibitions' && Request::segment(3) != 'upload-images')
            <script type="text/javascript" src="{{ asset('admin/vendors/ckeditor4/ckeditor.js') }}"></script>
            <script type="text/javascript" src="{{ asset('admin/js/exhibitions.js') }}"></script>
            <script>
                CKEDITOR.replace('ex_descr')
                CKEDITOR.replace('ex_info')
                CKEDITOR.replace('ex_img_caption')
            </script>
        @endif

        @if(Request::segment(2) == 'art-fairs' && Request::segment(3) == 'upload-images')
            <script type="text/javascript" src="{{ asset('admin/vendors/ckeditor4/ckeditor.js') }}"></script>
            <script type="text/javascript" src="{{ asset('admin/js/art_fairs.js') }}"></script>
            <script>
                CKEDITOR.replace('af_img_caption')
                CKEDITOR.replace('af_info')
            </script>
            <script type="text/javascript" src="{{ asset('admin/vendors/fancybox/jquery.fancybox.js') }}"></script>
            <script>
                $(document).ready(function() {
                    $('.fancybox').fancybox();
                });
            </script>
        @endif

        @if(Request::segment(2) == 'art-fairs' && Request::segment(3) != 'upload-images')
            <script type="text/javascript" src="{{ asset('admin/vendors/ckeditor4/ckeditor.js') }}"></script>
            <script type="text/javascript" src="{{ asset('admin/js/art_fairs.js') }}"></script>
            <script>
                CKEDITOR.replace('af_descr')
                CKEDITOR.replace('af_info')
            </script>
        @endif

        @if(Request::segment(2) == 'platform' && Request::segment(3) == 'upload-images')
            <script type="text/javascript" src="{{ asset('admin/vendors/ckeditor4/ckeditor.js') }}"></script>
            <script type="text/javascript" src="{{ asset('admin/js/platform.js') }}"></script>
            <script>
                CKEDITOR.replace('pf_img_caption')
                CKEDITOR.replace('pf_img_info')
                </script>
            <script type="text/javascript" src="{{ asset('admin/vendors/fancybox/jquery.fancybox.js') }}"></script>
            <script>
                $(document).ready(function() {
                    $('.fancybox').fancybox();
                });
            </script>
        @endif

        @if(Request::segment(2) == 'platform' && Request::segment(3) != 'upload-images')
            <script type="text/javascript" src="{{ asset('admin/vendors/ckeditor4/ckeditor.js') }}"></script>
            <script type="text/javascript" src="{{ asset('admin/js/platform.js') }}"></script>
            <script>
                CKEDITOR.replace('pf_descr')
            </script>
        @endif

        @if(Request::segment(2) == 'contact')
            <script type="text/javascript" src="{{ asset('admin/vendors/ckeditor4/ckeditor.js') }}"></script>
            <script type="text/javascript" src="{{ asset('admin/js/contact.js') }}"></script>
        @endif

        <!-- Back to Top-->

        <script src="{{ asset('admin/vendors/favicon/favicon.js') }}"></script>
        <script src="{{ asset('admin/vendors/jasny-bootstrap/js/jasny-bootstrap.js') }}"></script>
        <script src="{{ asset('admin/vendors/iCheck/js/icheck.js') }}"></script>
    </body>

</html>
