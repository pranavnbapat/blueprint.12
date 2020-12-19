<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\artist_master;
use App\Models\artist_transaction;
use Illuminate\Http\Request;
use File;

class ArtistsC extends Controller {

    public function index(Request $request) {
        if ($request->isMethod('get')):
            if ($request->segment(3)):
                //LOAD ARTIST UPDATE PAGE
                $artist = artist_master::where([['is_deleted', 'n'], ['id', $request->segment(3)]])->first();
                return view('admin.artist_update')->with(compact('artist'));
            else:
                //LOAD ARTIST PAGE
                $artists = artist_master::where([['is_deleted', 'n']])->get();
                return view('admin.artists')->with(compact('artists'));
            endif;
        endif;
    }

    public function insert(Request $request) {
        if ($request->isMethod('post')):
            if ($request->segment(3) == 'update'):
                $request->validate([
                    'artist_name' => 'required|max:50',
                    'art_img' => 'mimes:jpg,JPG,jpeg,JPEG,png,PNG',
                    'art_img_alt' => 'max:100',
                    'art_descr' => 'max:65535',
                    'art_info' => 'max:65535',
                    'art_img_ord' => 'required|numeric'
                ]);
                //UPDATE
                $artist = artist_master::findOrFail($request->row_id);
                $artist->artist_name = trim(htmlspecialchars($request->artist_name));
                $artist->art_img_ord = $request->art_img_ord;
                $artist->art_descr = htmlspecialchars(trim($request->art_descr));
                $artist->art_info = htmlspecialchars(trim($request->art_info));

                if ($request->file('art_img')):
                    if($artist->art_img):
                        File::move(public_path('img/artists/' . $artist->art_img), public_path('img/artists/deleted/' . $artist->art_img));
                    endif;

                    $fileName = 'artist_' . time() . '.' . $request->art_img->extension();
                    $request->art_img->move(public_path('img/artists'), $fileName);
                    $artist->art_img = $fileName;
                endif;

                $artist->art_img_alt = htmlspecialchars(trim($request->art_img_alt));
                if ($artist->save()):
                    return redirect('/admin/artists')->with('success', 'Artist updated.');
                else:
                    return redirect('/admin/artists')->with('error', 'Something went wrong. Please contactMaster the administrator.');
                endif;
            elseif ($request->segment(3) == 'insert'):
                $request->validate([
                    'artist_name' => 'required|max:50',
                    'art_img' => 'required|mimes:jpg,JPG,jpeg,JPEG,png,PNG',
                    'art_img_alt' => 'max:100',
                    'art_descr' => 'max:65535',
                    'art_info' => 'max:65535',
                    'art_img_ord' => 'required|numeric'
                ]);
                //INSERT
                $artist = new artist_master();
                $artist->artist_name = htmlspecialchars(trim($request->artist_name));
                $artist->art_img_ord = $request->art_img_ord;
                $artist->art_descr = htmlspecialchars(trim($request->art_descr));
                $artist->art_info = htmlspecialchars(trim($request->art_info));

                $fileName = 'artist_' . time() . '.' . $request->art_img->extension();
                $request->art_img->move(public_path('img/artists'), $fileName);
                $artist->art_img = $fileName;

                $artist->art_img_alt = htmlspecialchars(trim($request->art_img_alt));

                if ($artist->save()):
                    return back()->with('success', 'Artist added.');
                else:
                    return back()->with('error', 'Something went wrong. Please contactMaster the administrator.');
                endif;
            endif;
        endif;
    }

    public function upload_images(Request $request) {
        if ($request->isMethod('get')):
            $artist = artist_master::where([['is_deleted', 'n'], ['id', $request->segment(4)]])->first();
            $artist_images = artist_transaction::select('artist_transaction.id', 'artist_transaction.art_img')
                ->join('artist_master', 'artist_master.id', '=', 'artist_transaction.artist_master_id')
                ->where(
                    [
                        ['artist_transaction.is_deleted', 'n'],
                        ['artist_master.is_deleted', 'n'],
                        ['artist_transaction.artist_master_id', $artist->id]
                    ]
                )
                ->orderBy('artist_transaction.art_img_ord', 'ASC')
                ->get();
            if ($artist):
                return view('admin.upload_images')->with(compact('artist', 'artist_images'));
            endif;
        elseif ($request->isMethod('post')):
            $request->validate([
                'art_img' => 'required|mimes:jpg,JPG,jpeg,JPEG,png,PNG',
                'art_img_alt' => 'max:100',
                'art_img_ord' => 'numeric',
                'vr_img_ord' => 'nullable|numeric',
                'art_img_caption' => 'max: 900',
                'art_info' => 'max:2000'
            ]);

            $artist_transaction = new artist_transaction();
            $artist_transaction->artist_master_id = $request->artist_master_id;

            $fileName = 'artist_' . time() . '.' . $request->art_img->extension();
            $request->art_img->move(public_path('img/artists'), $fileName);
            $artist_transaction->art_img = $fileName;

            $artist_transaction->art_img_alt = htmlspecialchars(trim($request->art_img_alt));
            $artist_transaction->art_info = htmlspecialchars(trim($request->art_info));
            $artist_transaction->art_img_caption = htmlspecialchars(trim($request->art_img_caption));
            $artist_transaction->art_img_ord = $request->art_img_ord;
            $artist_transaction->vr_width = $request->vr_width;
            $artist_transaction->vr_wall_type = $request->vr_wall_type;
            $artist_transaction->vr_fur_type = $request->vr_fur_type;
            $artist_transaction->vr_flr_type = $request->vr_flr_type;
            $artist_transaction->vr_img_ord = $request->vr_img_ord;
            $artist_transaction->view_on_wall = $request->view_on_wall;

            if ($artist_transaction->save()):
                return back()->with('success', 'Artist image added.');
            else:
                return back()->with('error', 'Something went wrong. Please contactMaster the administrator.');
            endif;
        endif;
    }

    public function upload_images_update(Request $request) {
        if($request->isMethod('get')):
            $artist_image = artist_transaction::select('artist_transaction.id', 'artist_transaction.art_img', 'artist_transaction.art_img_alt', 'artist_transaction.art_img_ord', 'artist_transaction.art_img_caption', 'artist_transaction.art_info', 'artist_transaction.vr_fur_type', 'artist_transaction.vr_wall_type', 'artist_transaction.vr_flr_type', 'artist_transaction.vr_width', 'artist_transaction.vr_img_ord', 'artist_master.artist_name', 'artist_transaction.view_on_wall')
                ->join('artist_master', 'artist_master.id', '=', 'artist_transaction.artist_master_id')
                ->where(
                    [
                        ['artist_transaction.id', $request->segment(5)],
                        ['artist_transaction.is_deleted', 'n']
                    ]
                )
                ->first();

            if($artist_image):
                return view('admin.upload_images_update')->with(compact('artist_image'));
            endif;
        elseif ($request->isMethod('post')):
            $request->validate([
                'art_img' => 'mimes:jpg,JPG,jpeg,JPEG,png,PNG',
                'art_img_alt' => 'max:100',
                'art_img_ord' => 'numeric',
                'vr_img_ord' => 'nullable|numeric',
                'art_img_caption' => 'max: 900',
                'art_info' => 'max:2000'
            ]);

            $artist_transaction = artist_transaction::where([['id', $request->artist_transaction_id]])->first();
            if ($request->file('art_img')):
                if($artist_transaction->art_img):
                    File::move(public_path('img/artists/' . $artist_transaction->art_img), public_path('img/artists/deleted/' . $artist_transaction->art_img));
                endif;

                $fileName = 'artist_' . time() . '.' . $request->art_img->extension();
                $request->art_img->move(public_path('img/artists'), $fileName);
                $artist_transaction->art_img = $fileName;
            endif;

            $artist_transaction->art_img_alt = htmlspecialchars(trim($request->art_img_alt));
            $artist_transaction->art_info = htmlspecialchars(trim($request->art_info));
            $artist_transaction->art_img_caption = htmlspecialchars(trim($request->art_img_caption));
            $artist_transaction->art_img_ord = $request->art_img_ord;
            $artist_transaction->vr_width = $request->vr_width;
            $artist_transaction->vr_wall_type = $request->vr_wall_type;
            $artist_transaction->vr_fur_type = $request->vr_fur_type;
            $artist_transaction->vr_flr_type = $request->vr_flr_type;
            $artist_transaction->vr_img_ord = $request->vr_img_ord;
            $artist_transaction->view_on_wall = $request->view_on_wall;

            if ($artist_transaction->save()):
                return redirect('/admin/artists/upload-images/' . $artist_transaction->artist_master_id)->with('success', 'Artist image updated.');
            else:
                return redirect('/admin/artists/upload-images/' . $artist_transaction->artist_master_id)->with('error', 'Something went wrong. Please contactMaster the administrator.');
            endif;
        endif;
    }

    public function delete_images(Request $request) {
        if ($request->isMethod('post')):
            $check = artist_transaction::where([['id', $request->id]])->first();
            if ($check):
                if($check->art_img):
                    File::move(public_path('img/artists/' . $check->art_img), public_path('img/artists/deleted/' . $check->art_img));
                endif;

                $artist_transaction = artist_transaction::findOrFail($request->id);
                $artist_transaction->is_deleted = 'y';
                if($artist_transaction->save()):
                    return 0;
                else:
                    return 1;
                endif;
            else:
                return 1;
            endif;
        endif;
    }

/*    public function viewing_room(Request $request) {
        if($request->isMethod('post')):
            $artist_transaction = artist_transaction::findOrFail($request->id);
            if($request->keyword == 'vr_fur_type'):
                $artist_transaction->vr_fur_type = $request->vr_fur_type;
            elseif($request->keyword == 'vr_wall_type'):
                $artist_transaction->vr_wall_type = $request->vr_wall_type;
            elseif($request->keyword == 'vr_flr_type'):
                $artist_transaction->vr_flr_type = $request->vr_flr_type;
            elseif($request->keyword == 'vr_width'):
                $artist_transaction->vr_width = $request->vr_width;
            elseif($request->keyword == 'vr_img_ord'):
                $artist_transaction->vr_img_ord = $request->vr_img_ord;
            elseif($request->keyword == 'art_img_caption'):
                $artist_transaction->art_img_caption = htmlspecialchars(trim($request->art_img_caption));
            elseif($request->keyword == 'art_info'):
                $artist_transaction->art_info = htmlspecialchars(trim($request->art_info));
            endif;
            $artist_transaction->save();
        endif;
    }*/
}
