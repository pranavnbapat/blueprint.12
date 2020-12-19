@extends('frontend.layouts.app')

@section('content')
    <main>
        <section class="container">
            <div class="scrollArea">
                <div class="exhibitionsArea">
                    <div class="exhibitionsGrids">
                        @foreach($art_fairs as $af)
                            <div class="exhibitionsGridItem">
                                <a href="{{ url('art-fairs/' . $af->af_year . '/' . strtolower(str_replace(' ', '-', $af->af_name))) }}" class="exhibitionsGridItemInner">
                                    <img src="{{ url('img/art_fairs/' . $af->af_ft_img) }}" alt="{{ $af->af_ft_img_alt }}" />
                                </a>
                            </div>
                        @endforeach
                    </div> <!-- /.exhibitionsGrids -->

                    <div class="exhibitions-right">
                        <div class="exhibitions-rightItem">
                            @if(count($art_fairs) > 0)
                            <div class="exhibitions-rightItemHead">Current</div>
                            <ul>
                                <li><a href="{{ url('art-fairs') }}">{{ now()->year }}</a></li>
                            </ul>
                            @endif
                        </div>
                        <div class="exhibitions-rightItem">
                            @if(count($year) > 0)
                                <div class="exhibitions-rightItemHead">Past</div>
                            @endif
                            <ul>
                                @foreach($year as $y)
                                    <li><a href="{{ url('art-fairs/' . $y->af_year) }}">{{ $y->af_year }}</a></li>
                                @endforeach
                            </ul>
                        </div>
                    </div>

                </div> <!-- /.exhibitionsArea -->

            </div>
        </section>

    </main>
@endsection
