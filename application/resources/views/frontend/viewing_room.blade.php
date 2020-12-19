@extends('frontend.layouts.app')

@section('content')
    <main>
        <section class="container">
            <div class="scrollArea">
                <!-- <div class="artistsArea">  -->
                <div id="image_gallery" class="clearwithin record-layout-standard artwork available image_gallery_has_caption">
                    <div class="artistsArea">
                        <div class="artistsGrids">
                            @foreach($artist_images as $ai)
                                <div class="artistsGridItem">
                                    <span class="image artistsGridItemInner" data-width="3740" data-height="2992">
                                        <img src="{{ asset('img/artists/' . $ai->art_img) }}" data-src="{{ asset('img/artists/' . $ai->art_img) }}" class="roomview-image" data-roomview-id="artwork-{{$ai->id}}-main_image" data-roomview-artwork-cm-width="{{$ai->vr_width}}" data-roomview-custom-config='{"wall_type": "{{$ai->vr_wall_type}}", "floor_type": "{{$ai->vr_flr_type}}", "furniture_type": "{{$ai->vr_fur_type}}"}' />
                                        <a href="#" class="roomview-button-custom artistsGridItemTxt" data-roomview-id="artwork-{{$ai->id}}-main_image" style="width: 100%; float: left;">
                                            View on a wall
                                        </a>
                                    </span>
                                </div>
                            @endforeach
                        </div>
                    </div>
                </div>
                <div class="viewing-share">
                    <span class="shareTxt">Share </span>
                    <a href="#" class="share s_whatsapp"><img src="{{ asset('img/share-whatsapp.jpg') }}" alt="" /></a>

                    <a href="#" class="share s_facebook"><img src="{{ asset('img/share-facebook.jpg') }}" alt="" style="cursor: pointer;" class="fb_share" /></a>
                </div>
            </div>
        </section>
    </main>
@endsection
