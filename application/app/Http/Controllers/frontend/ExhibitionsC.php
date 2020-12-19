<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\Controller;
use App\Models\exhibition_images;
use App\Models\exhibitions_master;
use Illuminate\Http\Request;

class ExhibitionsC extends Controller {

    private $year;

    public function __construct(Request $request) {
        $this->year = exhibitions_master::select('ex_year')
            ->where([
                ['is_deleted', 'n'],
                ['status', 'a'],
                ['ex_year', '!=', date('Y')]
            ])
            ->orderBy('ex_year', 'DESC')
            ->get()
            ->unique('ex_year');
    }

    public function index(Request $request) {
        if($request->isMethod('get')):
            if(!$request->segment(2) && !$request->segment(3)):
                $exhibitions = exhibitions_master::where([['is_deleted', 'n'], ['status', 'a'], ['ex_year', date('Y')]])->orderBy('ex_ord', 'ASC')->get();
                return view('frontend.exhibitions')->with(['year' => $this->year, 'exhibitions' => $exhibitions]);
            elseif($request->segment(2) && !$request->segment(3)):
                $exhibitions = exhibitions_master::where([['is_deleted', 'n'], ['status', 'a'], ['ex_year', $request->segment(2)]])->orderBy('ex_ord', 'ASC')->get();
                return view('frontend.exhibitions')->with(['year' => $this->year, 'exhibitions' => $exhibitions]);
            elseif($request->segment(2) && $request->segment(3)):
                $exhibition = exhibitions_master::where([['is_deleted', 'n'], ['status', 'a'], ['ex_year', $request->segment(2)], ['ex_name', ucwords(str_replace('-', ' ', $request->segment(3)))]])->first();
                $exhibition_images = exhibition_images::where([['status', 'a'], ['is_deleted', 'n'], ['exhibitions_master_id', $exhibition->id]])->get();
                return view('frontend.exhibition_inner')->with(['year' => $this->year, 'exhibition' => $exhibition, 'exhibition_images' => $exhibition_images]);
            endif;
        endif;
    }
}
