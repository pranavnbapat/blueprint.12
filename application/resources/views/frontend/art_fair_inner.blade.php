@extends('frontend.layouts.app')

@section('content')
    <main>
        <section class="container">
            <div class="scrollArea">
                <div class="artistsArea">
                    <div class="artist-left">
                        <div class="artist-leftSlider slider" data-slick='{"slidesToShow" : 1, "slidesToScroll" : 1, "infinite" : true, "pauseOnHover" : false, "dots" : false, "arrows" : true, "speed" : 0, "autoplay" : false }'>
                            @foreach($art_fair_images as $afi)
                                <div class="artist-leftSliderItem">
                                    <img src="{{ url('img/art_fairs/' . $afi->af_img) }}" alt="{{ $afi->af_img_alt }}" />
                                    <div class="artist-leftImgTxt">
                                        <p>{!! html_entity_decode($afi->af_img_caption) !!}</p>
                                    </div>
                                </div>
                            @endforeach
                        </div>

                        <div class="artist-leftTxt">
                            <div class="artist-leftDesc">
                                <p><a href="#" class="blueTxt">{{ $art_fair->af_name }}</a></p>
                                {!! html_entity_decode($art_fair->af_descr) !!}
                            </div>
                        </div>
                    </div> <!-- /.artist-left -->

                    <div class="exhibitionsInner-right">
                        <div class="exhibitionsInner-rightItem">
                            <div class="exhibitionsInner-rightItemHead grayTxt">{{ $art_fair->af_year }}</div>
                        </div>
                        <div class="exhibitionsInner-rightItem">
                            <div class="exhibitionsInner-rightItemHead">Artists</div>
                            {!! html_entity_decode($art_fair->af_info) !!}
                        </div>
                        @if($art_fair->af_cat_pdf)
                        <div class="exhibitionsInner-rightItem">
                            <a href="{{ url('pdf/art_fairs/' . $art_fair->af_cat_pdf) }}" class="downloadPDF" download>Download Catalogue PDF</a>
                        </div>
                        @endif
                    </div>
                </div> <!-- /.artistsArea -->
            </div>
        </section>

        <div class="product-pp">
            <div class="product-ppInner">
                @foreach($art_fair_images as $afi)
                    <div id="item{{$afi->id}}" class="product-ppItem">
                        <div class="product-ppImg">
                            <img src="{{ url('img/art_fairs/' . $afi->af_img) }}" alt="{{ $afi->af_img_alt }}" />
                            <p>{{ $afi->af_img_caption }}</p>
                        </div>
                        <div class="product-ppTxt">
                            <h6>{{ $art_fair->af_name }}</h6>
                            {!! html_entity_decode($afi->af_info) !!}
                            <br />
                            <div style="margin-top: 20px; cursor: pointer;" class="back">< Back</div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>

        <div class="product-overlay"></div>
    </main>
@endsection
