@extends('frontend.layouts.app')

@section('content')
    <main>
        <section class="container">
            <div class="scrollArea">
                <div class="artistsArea">
                    <div class="artist-left">
                        <div class="artist-leftSlider slider" data-slick='{"slidesToShow" : 1, "slidesToScroll" : 1, "infinite" : true, "pauseOnHover" : false, "dots" : false, "arrows" : true, "speed" : 0, "autoplay" : false }'>
                            @foreach($exhibition_images as $ei)
                                <div data-item="item{{$ei->id}}" class="artist-leftSliderItem">
                                    <img src="{{ url('img/exhibitions/' . $ei->ex_img) }}" alt="{{ $ei->ex_img_alt }}" />
                                    <div class="artist-leftImgTxt">
                                        <p>{!! html_entity_decode($ei->ex_img_caption) !!}</p>
                                    </div>
                                </div>
                            @endforeach
                        </div>

                        <div class="artist-leftTxt">
                            <div class="artist-leftDesc">
                                <p><a href="#" class="blueTxt">{{ $exhibition->ex_name }}</a></p>
                                {!! html_entity_decode($exhibition->ex_descr) !!}
                            </div>
                        </div>
                    </div> <!-- /.artist-left -->

                    <div class="exhibitionsInner-right">
                        <div class="exhibitionsInner-rightItem">
                            <div class="exhibitionsInner-rightItemHead grayTxt">{{ $exhibition->ex_year }}</div>
                        </div>
                        @if($exhibition->ex_info)
                        <div class="exhibitionsInner-rightItem">
                            <div class="exhibitionsInner-rightItemHead">Artists</div>
                            {!! html_entity_decode($exhibition->ex_info) !!}
                        </div>
                        @endif
                        @if($exhibition->ex_cat_pdf)
                        <div class="exhibitionsInner-rightItem">
                            <a href="{{ url('pdf/exhibitions/' . $exhibition->ex_cat_pdf) }}" class="downloadPDF" download>Download Catalogue PDF</a>
                        </div>
                        @endif
                    </div>
                </div> <!-- /.artistsArea -->
            </div>
        </section>

        <div class="product-pp">
            <div class="product-ppInner">
                @foreach($exhibition_images as $ei)
                    <div id="item{{$ei->id}}" class="product-ppItem">
                        <div class="product-ppImg">
                            <img src="{{ url('img/exhibitions/' . $ei->ex_img) }}" alt="{{ $ei->ex_img_alt }}" />
                            <p>{{ $ei->ex_img_caption }}</p>
                        </div>
                        <div class="product-ppTxt">
                            <h6>{{ $exhibition->ex_name }}</h6>
                            {!! html_entity_decode($ei->ex_info) !!}
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
