@extends('frontend.layouts.app')

@section('content')
    <main>
        <section class="container">
            <div class="scrollArea">
                <div class="artistsArea">
                    <div class="artist-left">
                        @if($artist_images)
                            <div class="artist-leftSlider slider" data-slick='{"slidesToShow" : 1, "slidesToScroll" : 1, "infinite" : true, "pauseOnHover" : false, "dots" : false, "arrows" : true, "speed" : 0, "autoplay" : false }'>
                                @foreach($artist_images as $ai)
                                    <div data-item="item{{$ai->id}}" class="artist-leftSliderItem">
                                        <img src="{{ asset('img/artists/' . $ai->art_img) }}" alt="{{ $ai->art_img_alt }}" />

                                        <div class="artist-leftImgTxt">
                                            <p>{!! html_entity_decode($ai->art_img_caption) !!}</p>
                                        </div>
                                        <div class="viewingRoomBtn">
                                            <a href="{{ Request::url() }}/viewing-room">Viewing Room</a>
                                        </div>
                                    </div>
                                @endforeach
                            </div>
                        @endif
                        <div class="artist-leftTxt">
                            <div class="artist-leftDesc">
                                {!! html_entity_decode($artist->art_descr) !!}
                            </div>
                        </div>
                    </div>

                    <div class="artist-right">
                        <h4 class="artist-rightName">{{ $artist->artist_name }}</h4>
                        <div class="artist-exhibition">
                            {!! html_entity_decode($artist->art_info) !!}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <div class="product-pp">
            <div class="product-ppInner">
                @foreach($artist_images as $ai)
                    <div id="item{{$ai->id}}" class="product-ppItem">
                        <div class="product-ppImg">
                            <img src="{{ url('img/artists/' . $ai->art_img) }}" alt="{{ $ai->art_img_alt }}" />
                            <p>{{ $ai->art_img_caption }}</p>
                        </div>
                        <div class="product-ppTxt">
                            <h6>{{ $artist->artist_name }}</h6>
                            {!! html_entity_decode($ai->art_info) !!}
                            <br />
                            <div style="margin-top: 20px; cursor: pointer;" class="back"><p>< Back</p></div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>

        <div class="product-overlay"></div>
    </main>
@endsection
