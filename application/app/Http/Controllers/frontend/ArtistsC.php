<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\Controller;
use App\Models\artist_master;
use App\Models\artist_transaction;
use Illuminate\Http\Request;

class ArtistsC extends Controller {

    private $artist_name;

    public function index(Request $request) {
        if($request->isMethod('get')):
            $artists = artist_master::where([['is_deleted', 'n'], ['status', 'a']])->orderBy('art_img_ord', 'ASC')->get();
            return view('frontend.artists')->with(compact('artists'));
        endif;
    }

    public function artist_info(Request $request) {
        if($request->isMethod('get')):
            $this->artist_name = ucwords(str_replace('-', ' ', $request->segment(2)));

            $artist = artist_master::where([['is_deleted', 'n'], ['status', 'a'], ['artist_name', $this->artist_name]])->first();

            $artist_images = artist_transaction::where(
                [
                    ['is_deleted', 'n'],
                    ['status', 'a'],
                    ['artist_master_id', $artist->id]
                ])
                ->orderBy('art_img_ord', 'ASC')
                ->get();

            return view('frontend.artist_info')->with(compact('artist', 'artist_images'));
        endif;
    }

    public function viewing_room(Request $request) {
        if($request->isMethod('get')):
            $this->artist_name = ucwords(str_replace('-', ' ', $request->segment(2)));
            $artist = artist_master::where([['is_deleted', 'n'], ['status', 'a'], ['artist_name', $this->artist_name]])->first();
            $artist_images = artist_transaction::where(
                [
                    ['is_deleted', 'n'],
                    ['status', 'a'],
                    ['artist_master_id', $artist->id],
                    ['view_on_wall', 'y']
                ])
                ->orderBy('vr_img_ord', 'ASC')
                ->get();
            return view('frontend.viewing_room')->with(compact('artist', 'artist_images'));
        endif;
    }
}
