<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\Controller;
use App\Models\homepage;
use Illuminate\Http\Request;

class HomeC extends Controller {

    public function index(Request $request) {
        if($request->isMethod('get')):
            $home = homepage::where([['is_deleted', 'n'], ['status', 'a']])->orderBy('img_ord', 'ASC')->get();
            return view('frontend.home')->with(compact('home'));
        endif;
    }
}
