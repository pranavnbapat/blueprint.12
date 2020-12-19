<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\Controller;
use App\Models\artist_master;
use App\Models\platform_images;
use App\Models\platform_master;
use Illuminate\Http\Request;

class PlatformC extends Controller {

    private $artists;

    public function __construct(Request $request) {

    }

    public function index(Request $request) {
        if($request->isMethod('get')):
            if($request->segment(1) && !$request->segment(2)):
//                $artists = artist_master::where([['status', 'a'], ['is_deleted', 'n']])->orderBy('artist_name', 'ASC')->get();
                $platform = platform_master::where([['is_deleted', 'n'], ['status', 'a']])->orderBy('pf_img_ord', 'ASC')->get();
                return view('frontend.platform')->with(compact('platform'));
            elseif($request->segment(1) && $request->segment(2)):
                $platform = platform_master::where([['is_deleted', 'n'], ['status', 'a'], ['pf_art_name', ucwords(str_replace('-', ' ', $request->segment(2)))]])->first();
                $platform_images = platform_images::where([['status', 'a'], ['is_deleted', 'n'], ['platform_master_id', $platform->id]])->orderBy('pf_img_ord', 'ASC')->get();
                return view('frontend.platform_inner')->with(['platform' => $platform, 'platform_images' => $platform_images]);
            endif;
        endif;
    }
}
