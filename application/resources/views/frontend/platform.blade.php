@extends('frontend.layouts.app')

@section('content')
    <main>
        <section class="container">
            <div class="scrollArea">
                <div class="platformArea">
                    <div class="platformGrids">
                        @foreach($platform as $p)
                            <div class="platformGridItem">
                                <a href="{{ url('platform/' . strtolower(str_replace(' ', '-', $p->pf_art_name))) }}" class="platformGridItemInner">
                                    <img src="{{ url('img/platform/' . $p->pf_ft_img) }}" alt="{{ $p->pf_ft_img_alt }}" />
                                </a>
                            </div>
                        @endforeach
                    </div> <!-- /.platformGrids -->

                    <div class="platform-right">
                        <ul>
                            @foreach($platform as $p)
                                <li><a href="{{ url('platform/' . strtolower(str_replace(' ', '-', $p->pf_art_name))) }}">{{ $p->pf_art_name }}</a></li>
                            @endforeach
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    </main>
@endsection
