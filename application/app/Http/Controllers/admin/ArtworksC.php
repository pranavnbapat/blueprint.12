<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\artist_master;
use App\Models\artworks;
use Illuminate\Http\Request;

class ArtworksC extends Controller {
    public function index(Request $request) {
        if($request->isMethod('get')):
            if($request->segment(3)):
                //LOAD ARTWORKS UPDATE PAGE
                $artworks = artworks::where([['is_deleted', 'n'], ['id', $request->segment(3)]])->get();
                return view('admin.artworks')->with(compact('artworks'));
            else:
                //LOAD ARTWORKS PAGE
                $artworks = artworks::where([['is_deleted', 'n']])->get();
                $artists = artist_master::where([['is_deleted', 'n']])->get();
                return view('admin.artworks')->with(compact('artworks', 'artists'));
            endif;
        endif;
    }

    public function insert(Request $request) {
        if($request->isMethod('post')):
            $request->validate([
                'artist_master_id' => 'required',
                'art_descr' => 'max:5000',
                'art_info' => 'max:1000'
            ]);
            if($request->segment(3) == 'update'):
                //UPDATE
                $artwork = artworks::findOrFail($request->row_id);
                $artwork->artist_master_id = $request->artist_master_id;
                $artwork->art_descr = $request->art_descr;
                $artwork->art_info = $request->art_info;
                if($artwork->save()):
                    return redirect('/admin/artists')->with('success', 'Artwork updated.');
                else:
                    return redirect('/admin/artists')->with('error', 'Something went wrong. Please contactMaster the administrator.');
                endif;
            elseif($request->segment(3) == 'insert'):
                //INSERT
                $artwork = new artworks();
                $artwork->artist_master_id = $request->artist_master_id;
                $artwork->art_descr = $request->art_descr;
                $artwork->art_info = $request->art_info;
                if($artwork->save()):
                    return back()->with('success', 'Artwork added.');
                else:
                    return back()->with('error', 'Something went wrong. Please contactMaster the administrator.');
                endif;
            endif;
        endif;
    }
}
