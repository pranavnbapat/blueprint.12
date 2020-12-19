@extends('frontend.layouts.app')

@section('content')
    <main>
        <section class="container">
            <div class="scrollArea">
                <div class="artistsArea">
                    <div class="artistsGrids">
                        @foreach($artists as $a)
                        <div class="artistsGridItem">
                            <a href="{{ url('artists/' . strtolower(str_replace(' ', '-', $a->artist_name))) }}" class="artistsGridItemInner">
                                <img src="{{ asset('img/artists/' . $a->art_img) }}" alt="{!! html_entity_decode($a->art_img_alt) !!}" />
                                <div class="artistsGridItemTxt">{{ $a->artist_name }}</div>
                            </a>
                        </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </section>
    </main>
@endsection
