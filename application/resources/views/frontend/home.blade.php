@extends('frontend.layouts.app')

@section('content')
    <header class="homeHeader">
        <div class="brandLogo">
            <a href="{{ url('about') }}"> <img src="img/blueprint12-logo.png" alt="blueprint.12 logo" /></a>
            {{--            <a href="{{ url('/about') }}" class="infoLink">Information</a>--}}
        </div>
    </header>
    <main>
        <section>
            <div class="homeSlider slider" data-slick='{ "slidesToShow" : 1, "slidesToScroll" : 1, "infinite" : true, "pauseOnHover" : false, "fade" : true, "dots" : false, "arrows" : false, "speed" : 0, "autoplay" : true, "autoplaySpeed" : 3500 }'>
                @foreach($home as $h)
                    <div class="homeSliderItem">
                        <div class="homeSliderImg">
                            <a href="{!! html_entity_decode($h->hyperlink) !!}">
                                <img src="{{ asset('img/homepage/' . $h->home_img) }}" alt="{{ $h->home_img_alt }}" />
                            </a>
                        </div>
                        <div class="homeSliderTxt">
                            <h2>
                                @if((new \Jenssegers\Agent\Agent())->isDesktop())
                                    {!! html_entity_decode($h->home_info) !!}
                                @else
                                    {!! html_entity_decode($h->home_info_mob) !!}
                                @endif
                            </h2>
                        </div>
                    </div>
                @endforeach
            </div>
        </section>
    </main>
@endsection
