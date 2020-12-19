<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\Controller;
use App\Models\about;
use Illuminate\Http\Request;

class AboutC extends Controller {
    public function index(Request $request) {
        if($request->isMethod('get')):
            $about = about::where([['is_deleted', 'n'], ['status', 'a']])->limit(1)->first();
            return view('frontend.about')->with(compact('about'));
        endif;
    }
}
