<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\Controller;
use App\Models\art_fair_images;
use App\Models\art_fairs_master;
use Illuminate\Http\Request;

class ArtFairsC extends Controller {
    private $year;

    public function __construct(Request $request) {
        $this->year = art_fairs_master::select('af_year')
            ->where([
                ['is_deleted', 'n'],
                ['status', 'a'],
                ['af_year', '!=', date('Y')]
            ])
            ->orderBy('af_year', 'DESC')
            ->get()
            ->unique('af_year');
    }

    public function index(Request $request) {
        if($request->isMethod('get')):
            if(!$request->segment(2) && !$request->segment(3)):
                $art_fairs = art_fairs_master::where([['is_deleted', 'n'], ['status', 'a'], ['af_year', date('Y')]])->orderBy('af_ord', 'ASC')->get();
                return view('frontend.art_fairs')->with(['year' => $this->year, 'art_fairs' => $art_fairs]);
            elseif($request->segment(2) && !$request->segment(3)):
                $art_fairs = art_fairs_master::where([['is_deleted', 'n'], ['status', 'a'], ['af_year', $request->segment(2)]])->orderBy('af_ord', 'ASC')->get();
                return view('frontend.art_fairs')->with(['year' => $this->year, 'art_fairs' => $art_fairs]);
            elseif($request->segment(2) && $request->segment(3)):
                $art_fair = art_fairs_master::where([['is_deleted', 'n'], ['status', 'a'], ['af_year', $request->segment(2)], ['af_name', ucwords(str_replace('-', ' ', $request->segment(3)))]])->first();
                $art_fair_images = art_fair_images::where([['status', 'a'], ['is_deleted', 'n'], ['art_fairs_master_id', $art_fair->id]])->get();
                return view('frontend.art_fair_inner')->with(['year' => $this->year, 'art_fair' => $art_fair, 'art_fair_images' => $art_fair_images]);
            endif;
        endif;
    }
}
