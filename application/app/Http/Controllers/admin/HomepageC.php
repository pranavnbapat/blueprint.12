<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\art_fairs_master;
use App\Models\artist_master;
use App\Models\exhibitions_master;
use App\Models\homepage;
use App\Models\platform_master;
use Illuminate\Http\Request;

class HomepageC extends Controller {

    public function index(Request $request) {
        if($request->isMethod('get')):
            $artists = artist_master::where([['is_deleted', 'n']])->get();
            $exhibitions = exhibitions_master::where([['is_deleted', 'n']])->get();
            $art_fairs = art_fairs_master::where([['is_deleted', 'n']])->get();
            $platforms = platform_master::where([['is_deleted', 'n']])->get();
            if($request->segment(3)):
                //Update
                $home_image = homepage::where([['is_deleted', 'n'], ['id', $request->segment(3)]])->first();
                return view('admin.homepage_update')->with(compact('home_image', 'artists', 'exhibitions', 'art_fairs', 'platforms'));
            else:
                //Load
                $home_images = homepage::where([['is_deleted', 'n']])->get();
                return view('admin.homepage')->with(compact('home_images', 'artists', 'exhibitions', 'art_fairs', 'platforms'));
            endif;
        endif;
    }

    public function insert(Request $request) {
        if($request->isMethod('post')):
            if($request->segment(3) == 'update'):
                //UPDATE
                $request->validate([
                    'home_img' => 'mimes:jpg,JPG,jpeg,JPEG,png,PNG',
                    'home_img_alt' => 'max:100',
                    'artist_info' => 'max:255',
                    'img_ord' => 'required|numeric'
                ]);

                $homepage = homepage::findOrFail($request->row_id);
                $homepage->home_img_alt = $request->home_img_alt;
                $homepage->home_info = htmlspecialchars(trim($request->home_info));
                $homepage->home_info_mob = htmlspecialchars(trim($request->home_info_mob));
                $homepage->img_ord = $request->img_ord;
                $homepage->hyperlink = htmlspecialchars(trim($request->hyperlink));

                if($request->file('home_img')):
                    $fileName = 'home_'.time().'.'.$request->home_img->extension();
                    $request->home_img->move(public_path('img/homepage'), $fileName);
                    $homepage->home_img = $fileName;
                endif;

                if($homepage->save()):
                    return redirect('/admin/homepage')->with('success', 'Homepage data updated.');
                else:
                    return redirect('/admin/homepage')->with('error', 'Something went wrong. Please contactMaster the administrator.');
                endif;
            elseif($request->segment(3) == 'insert'):
                //INSERT
                $request->validate([
                    'home_img' => 'required|mimes:jpg,JPG,jpeg,JPEG,png,PNG',
                    'home_img_alt' => 'max:100',
                    'artist_info' => 'max:255',
                    'img_ord' => 'required|numeric'
                ]);

                $homepage = new homepage();
                $homepage->home_img_alt = $request->home_img_alt;
                $homepage->img_ord = $request->img_ord;
                $homepage->home_info = htmlspecialchars(trim($request->home_info));
                $homepage->home_info_mob = htmlspecialchars(trim($request->home_info_mob));
                $homepage->hyperlink = htmlspecialchars(trim($request->hyperlink));

                $fileName = 'home_'.time().'.'.$request->home_img->extension();
                $request->home_img->move(public_path('img/homepage'), $fileName);
                $homepage->home_img = $fileName;

                if($homepage->save()):
                    return back()->with('success', 'Homepage data added.');
                else:
                    return back()->with('error', 'Something went wrong. Please contactMaster the administrator.');
                endif;
            endif;
        endif;
    }

    public function change_slider_properties(Request $request) {
        if($request->isMethod('post')):
            $artist_transaction = artist_transaction::findOrFail($request->id);
        endif;
    }
}
