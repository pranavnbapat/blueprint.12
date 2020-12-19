@extends('frontend.layouts.app')

@section('content')
    <main>
        <section class="container">
            <div class="scrollArea">
                <div class="exhibitionsArea">
                    <div class="exhibitionsGrids">
                        @foreach($exhibitions as $e)
                            <div class="exhibitionsGridItem">
                                <a href="{{ url('exhibitions/' . $e->ex_year . '/' . strtolower(str_replace(' ', '-', $e->ex_name))) }}" class="exhibitionsGridItemInner">
                                    <img src="{{ url('img/exhibitions/' . $e->ex_ft_img) }}" alt="{{ $e->ex_ft_img_alt }}" />
                                </a>
                            </div>
                        @endforeach
                    </div> <!-- /.exhibitionsGrids -->

                    <div class="exhibitions-right">
                        <div class="exhibitions-rightItem">
                            @if(count($exhibitions) > 0)
                            <div class="exhibitions-rightItemHead">Current</div>
                            <ul>
                                <li><a href="{{ url('exhibitions') }}">{{ now()->year }}</a></li>
                            </ul>
                            @endif
                        </div>
                        <div class="exhibitions-rightItem">
                            @if(count($year) > 0)
                                <div class="exhibitions-rightItemHead">Past</div>
                            @endif
                            <ul>
                                @foreach($year as $y)
                                    <li><a href="{{ url('exhibitions/' . $y->ex_year) }}">{{ $y->ex_year }}</a></li>
                                @endforeach
                            </ul>
                        </div>
                    </div>

                </div> <!-- /.exhibitionsArea -->

            </div>
        </section>

    </main>
@endsection
