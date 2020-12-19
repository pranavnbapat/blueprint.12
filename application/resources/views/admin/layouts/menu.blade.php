<aside class="left-side sidebar-offcanvas">
    <section class="sidebar ">
        <div class="page-sidebar  sidebar-nav">
            <div class="clearfix"></div>
            <!-- BEGIN SIDEBAR MENU -->
            <ul id="menu" class="page-sidebar-menu">
                @foreach ($main_menu as $m)
                    <li class="{{ Request::segment(2) == $m->menu_route ? 'active' : '' }}">
                        <a href="{{ url('admin') . '/' . $m->menu_route }}">
                            <i class="livicon" data-name="{{ $m->menu_icon }}" data-size="{{ $m->menu_size }}" data-c="#{{ $m->menu_colour }}" data-hc="#{{ $m->menu_highlight_colour }}" data-loop="{{ $m->menu_loop }}"></i>
                            <span class="title">{{ $m->menu_name }}</span>
                        </a>
                    </li>
                @endforeach
            </ul>
            <!-- END SIDEBAR MENU -->
        </div>
    </section>
    <!-- /.sidebar -->
</aside>
