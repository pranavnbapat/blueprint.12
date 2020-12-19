@extends('frontend.layouts.app')

@section('content')
    <main>
        <section class="container">
            <div class="scrollArea">
                <div class="about">
                    <div class="aboutImg">
                        <img src="{{ asset('img/about/' . $about->about_img) }}" alt="{!! html_entity_decode($about->about_img_alt) !!}" />
                    </div>
                    <div class="aboutTxt">
                        {!! html_entity_decode($about->about_info) !!}
                    </div>
                </div> <!-- /.about -->
            </div>
        </section>
    </main>
@endsection
