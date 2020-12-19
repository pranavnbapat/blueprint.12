<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\art_fair_images;
use App\Models\art_fairs_master;
use App\Models\year_master;
use Illuminate\Http\Request;
use File;

class ArtFairsC extends Controller {

    public function index(Request $request) {
        if($request->isMethod('get')):
            if ($request->segment(3)):
                //LOAD EXHIBITION UPDATE PAGE
                $year = year_master::where([['is_deleted', 'n']])->get();
                $art_fair = art_fairs_master::where([['is_deleted', 'n'], ['id', $request->segment(3)]])->first();
                return view('admin.art_fair_update')->with(compact('art_fair', 'year'));
            else:
                //LOAD EXHIBITION PAGE
                $art_fairs = art_fairs_master::where([['is_deleted', 'n']])->get();
                return view('admin.art_fairs')->with(compact('art_fairs'));
            endif;
        endif;
    }

    public function insert(Request $request) {
        if($request->isMethod('post')):
            $request->validate([
                'af_year' => 'required',
                'af_ft_img' => 'mimes:jpg,JPG,jpeg,JPEG,png,PNG',
                'af_ft_img_alt' => 'max:100',
                'af_descr' => 'max:65535',
                'af_info' => 'max:65535',
                'af_name' => 'required|max:100',
                'af_cat_pdf' => 'mimes:pdf,PDF|max:20480',
                'af_ord' => 'required|numeric'
            ]);

            if ($request->segment(3) == 'update'):
                //UPDATE
                $art_fair = art_fairs_master::findOrFail($request->row_id);
                $art_fair->af_year = htmlspecialchars(trim($request->af_year));
                $art_fair->af_name = htmlspecialchars(trim($request->af_name));
                $art_fair->af_ft_img_alt = htmlspecialchars(trim($request->af_ft_img_alt));
                $art_fair->af_descr = htmlspecialchars(trim($request->af_descr));
                $art_fair->af_info = htmlspecialchars(trim($request->af_info));
                $art_fair->af_ord = htmlspecialchars(trim($request->af_ord));

                if ($request->file('af_ft_img')):
                    if($art_fair->af_ft_img):
                        File::move(public_path('img/art_fairs/' . $art_fair->af_ft_img), public_path('img/art_fairs/deleted/' . $art_fair->af_ft_img));
                    endif;

                    $fileName = 'art_fair_' . time() . '.' . $request->af_ft_img->extension();
                    $request->af_ft_img->move(public_path('img/art_fairs'), $fileName);
                    $art_fair->af_ft_img = $fileName;
                endif;

                if ($request->file('af_cat_pdf')):
                    if($art_fair->af_cat_pdf):
                        File::move(public_path('pdf/art_fairs/' . $art_fair->af_cat_pdf), public_path('pdf/art_fairs/deleted/' . $art_fair->af_cat_pdf));
                    endif;

                    $fileName = $request->file('af_cat_pdf')->getClientOriginalName();
                    $request->af_cat_pdf->move(public_path('pdf/art_fairs'), $fileName);
                    $art_fair->af_cat_pdf = $fileName;
                endif;
                if ($art_fair->save()):
                    return redirect('/admin/art-fairs')->with('success', 'Art Fair updated.');
                else:
                    return redirect('/admin/art-fairs')->with('error', 'Something went wrong. Please contactMaster the administrator.');
                endif;
            elseif ($request->segment(3) == 'insert'):
                //INSERT
                $art_fair = new art_fairs_master();
                $art_fair->af_year = htmlspecialchars(trim($request->af_year));
                $art_fair->af_name = htmlspecialchars(trim($request->af_name));
                $art_fair->af_ft_img_alt = htmlspecialchars(trim($request->af_ft_img_alt));
                $art_fair->af_descr = htmlspecialchars(trim($request->af_descr));
                $art_fair->af_info = htmlspecialchars(trim($request->af_info));
                $art_fair->af_ord = htmlspecialchars(trim($request->af_ord));

                if ($request->file('af_ft_img')):
                    $fileName = 'art_fair_' . time() . '.' . $request->af_ft_img->extension();
                    $request->af_ft_img->move(public_path('img/art_fairs'), $fileName);
                    $art_fair->af_ft_img = $fileName;
                endif;

                if ($request->file('af_cat_pdf')):
                    $fileName = $request->file('af_cat_pdf')->getClientOriginalName();
                    $request->af_cat_pdf->move(public_path('pdf/art_fairs'), $fileName);
                    $art_fair->af_cat_pdf = $fileName;
                endif;

                if ($art_fair->save()):
                    return back()->with('success', 'Art Fair added.');
                else:
                    return back()->with('error', 'Something went wrong. Please contactMaster the administrator.');
                endif;
            endif;
        endif;
    }

    public function upload_images(Request $request) {
        if ($request->isMethod('get')):
            $art_fair = art_fairs_master::where([['is_deleted', 'n'], ['id', $request->segment(4)]])->first();
            $af_images = art_fair_images::select('art_fair_images.id', 'art_fair_images.af_img', 'art_fair_images.af_img_alt', 'art_fair_images.af_img_ord', 'art_fair_images.af_info')
                ->join('art_fairs_master', 'art_fairs_master.id', '=', 'art_fair_images.art_fairs_master_id')
                ->where(
                    [
                        ['art_fair_images.is_deleted', 'n'],
                        ['art_fairs_master.is_deleted', 'n'],
                        ['art_fair_images.art_fairs_master_id', $art_fair->id]
                    ]
                )
                ->orderBy('art_fair_images.af_img_ord', 'ASC')
                ->get();
            if ($art_fair):
                return view('admin.af_upload_images')->with(compact('art_fair', 'af_images'));
            endif;
        elseif ($request->isMethod('post')):
            $request->validate([
                'af_img' => 'required|mimes:jpg,JPG,jpeg,JPEG,png,PNG',
                'af_img_alt' => 'max:100',
                'af_img_ord' => 'numeric',
                'af_img_caption' => 'max: 900',
                'af_info' => 'max:1000'
            ]);

            $art_fair_images = new art_fair_images();
            $art_fair_images->art_fairs_master_id = $request->art_fairs_master_id;

            $fileName = 'art_fair_' . time() . '.' . $request->af_img->extension();
            $request->af_img->move(public_path('img/art_fairs'), $fileName);
            $art_fair_images->af_img = $fileName;

            $art_fair_images->af_img_alt = htmlspecialchars(trim($request->af_img_alt));
            $art_fair_images->af_info = htmlspecialchars(trim($request->af_info));
            $art_fair_images->af_img_caption = htmlspecialchars(trim($request->af_img_caption));
            $art_fair_images->af_img_ord = $request->af_img_ord;

            if ($art_fair_images->save()):
                return back()->with('success', 'Art Fair image added.');
            else:
                return back()->with('error', 'Something went wrong. Please contactMaster the administrator.');
            endif;
        endif;
    }

    public function delete_images(Request $request) {
        if ($request->isMethod('post')):
            $check = art_fair_images::where([['id', $request->id]])->first();
            if ($check):
                if($check->af_img):
                    File::move(public_path('img/art_fairs/' . $check->af_img), public_path('img/art_fairs/deleted/' . $check->af_img));
                endif;

                $art_fair_images = art_fair_images::findOrFail($request->id);
                $art_fair_images->is_deleted = 'y';
                if($art_fair_images->save()):
                    return 0;
                else:
                    return 1;
                endif;
            else:
                return 1;
            endif;
        endif;
    }

    public function upload_images_update(Request $request) {
        if($request->isMethod('get')):
            $af_image = art_fair_images::select('art_fair_images.id', 'art_fair_images.af_img', 'art_fair_images.af_img_alt', 'art_fair_images.af_img_ord', 'art_fair_images.af_img_caption', 'art_fair_images.af_info', 'art_fairs_master.af_name')
                ->join('art_fairs_master', 'art_fairs_master.id', '=', 'art_fair_images.art_fairs_master_id')
                ->where(
                    [
                        ['art_fair_images.id', $request->segment(5)],
                        ['art_fair_images.is_deleted', 'n']
                    ]
                )
                ->first();

            if($af_image):
                return view('admin.af_upload_images_update')->with(compact('af_image'));
            endif;
        elseif ($request->isMethod('post')):
            $request->validate([
                'af_img' => 'nullable|mimes:jpg,JPG,jpeg,JPEG,png,PNG',
                'af_img_alt' => 'max:100',
                'af_img_ord' => 'numeric',
                'af_img_caption' => 'max: 900',
                'af_info' => 'max:1000'
            ]);

            $art_fair_images = art_fair_images::where([['id', $request->art_fair_images_id]])->first();
            if ($request->file('af_img')):
                if($art_fair_images->af_img):
                    File::move(public_path('img/art_fairs/' . $art_fair_images->af_img), public_path('img/art_fairs/deleted/' . $art_fair_images->af_img));
                endif;

                $fileName = 'artist_' . time() . '.' . $request->af_img->extension();
                $request->af_img->move(public_path('img/art_fairs'), $fileName);
                $art_fair_images->af_img = $fileName;
            endif;

            $art_fair_images->af_img_alt = htmlspecialchars(trim($request->af_img_alt));
            $art_fair_images->af_info = htmlspecialchars(trim($request->af_info));
            $art_fair_images->af_img_caption = htmlspecialchars(trim($request->af_img_caption));
            $art_fair_images->af_img_ord = $request->af_img_ord;

            if ($art_fair_images->save()):
                return redirect('/admin/art-fairs/upload-images/' . $art_fair_images->art_fairs_master_id)->with('success', 'Exhibition image updated.');
            else:
                return redirect('/admin/art-fairs/upload-images/' . $art_fair_images->art_fairs_master_id)->with('error', 'Something went wrong. Please contactMaster the administrator.');
            endif;
        endif;
    }
}
