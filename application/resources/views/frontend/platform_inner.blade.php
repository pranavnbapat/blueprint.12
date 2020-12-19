@extends('frontend.layouts.app')

@section('content')
    <main>
        <section class="container">
            <div class="scrollArea">
                <div class="platformArea platformInner">
                    @if(count($platform_images) > 0)
                    <div class="platformGrids">
                        @foreach($platform_images as $pi)
                            <div data-item="item{{$pi->id}}" class="platformGridItem">
                                <a href="javascript:void(0);" class="platformGridItemInner">
                                    <img src="{{ url('img/platform/' . $pi->pf_img) }}" alt="{{ $pi->pf_img_alt }}" />
                                    <div class="platformGridItem-txt">
                                        <p>{!! html_entity_decode($pi->pf_img_caption) !!}</p>
                                        <div class="platformGridItem-txtPrice"><span>Price: {{ substr(number_format($pi->pf_img_price, '2'), 0, -3) }}</span></div>
                                    </div>
                                </a>
                            </div>
                        @endforeach
                    </div> <!-- /.platformGrids -->
                    @endif

                    <div class="platformInner-right">
                        {!! html_entity_decode($platform->pf_descr) !!}
                    </div>
                </div> <!-- /.platformArea -->
            </div>
        </section>

        <div class="product-pp">
            <div class="product-ppInner">
                @foreach($platform_images as $pi)
                    <div id="item{{$pi->id}}" class="product-ppItem">
                        <div class="product-ppImg">
                            <div class="col-md-3 col-xs-6">
                                <div class="mag img-responsive">
                                    <br />
                                    <img src="{{ url('img/platform/' . $pi->pf_img) }}" alt="{{ $pi->pf_img_alt }}" data-toggle="magnify" class="mag-style img-responsive" />
                                    <p>{!!  html_entity_decode($pi->pf_img_caption) !!}</p>
                                </div>
                            </div>
                        </div>
                        <div class="product-ppTxt">
                            {!! html_entity_decode($pi->pf_img_info) !!}
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
