<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\exhibitions_master;
use App\Models\exhibition_images;
use App\Models\year_master;
use Illuminate\Http\Request;
use File;

class ExhibitionsC extends Controller {

    public function index(Request $request) {
        if($request->isMethod('get')):
            if ($request->segment(3)):
                //LOAD EXHIBITION UPDATE PAGE
                $year = year_master::where([['is_deleted', 'n']])->get();
                $exhibition = exhibitions_master::where([['is_deleted', 'n'], ['id', $request->segment(3)]])->first();
                return view('admin.exhibition_update')->with(compact('exhibition', 'year'));
            else:
                //LOAD EXHIBITION PAGE
                $exhibitions = exhibitions_master::where([['is_deleted', 'n']])->get();
                return view('admin.exhibitions')->with(compact('exhibitions'));
            endif;
        endif;
    }

    public function insert(Request $request) {
        if($request->isMethod('post')):
            $request->validate([
                'ex_year' => 'required',
                'ex_ft_img' => 'mimes:jpg,JPG,jpeg,JPEG,png,PNG',
                'ex_ft_img_alt' => 'max:100',
                'ex_descr' => 'max:65535',
                'ex_info' => 'max:65535',
                'ex_name' => 'required|max:100',
                'ex_cat_pdf' => 'mimes:pdf,PDF|max:20480',
                'ex_ord' => 'required|numeric'
            ]);

            if ($request->segment(3) == 'update'):
                //UPDATE
                $exhibition = exhibitions_master::findOrFail($request->row_id);
                $exhibition->ex_year = htmlspecialchars(trim($request->ex_year));
                $exhibition->ex_name = htmlspecialchars(trim($request->ex_name));
                $exhibition->ex_ft_img_alt = htmlspecialchars(trim($request->ex_ft_img_alt));
                $exhibition->ex_descr = htmlspecialchars(trim($request->ex_descr));
                $exhibition->ex_info = htmlspecialchars(trim($request->ex_info));
                $exhibition->ex_ord = htmlspecialchars(trim($request->ex_ord));

                if ($request->file('ex_ft_img')):
                    if($exhibition->ex_ft_img):
                        File::move(public_path('img/exhibitions/' . $exhibition->ex_ft_img), public_path('img/exhibitions/deleted/' . $exhibition->ex_ft_img));
                    endif;

                    $fileName = 'exhibition_' . time() . '.' . $request->ex_ft_img->extension();
                    $request->ex_ft_img->move(public_path('img/exhibitions'), $fileName);
                    $exhibition->ex_ft_img = $fileName;
                endif;

                if ($request->file('ex_cat_pdf')):
                    if($exhibition->ex_cat_pdf):
                        File::move(public_path('pdf/exhibitions/' . $exhibition->ex_cat_pdf), public_path('pdf/exhibitions/deleted/' . $exhibition->ex_cat_pdf));
                    endif;

                    $fileName = $request->file('ex_cat_pdf')->getClientOriginalName();
                    $request->ex_cat_pdf->move(public_path('pdf/exhibitions'), $fileName);
                    $exhibition->ex_cat_pdf = $fileName;
                endif;
                if ($exhibition->save()):
                    return redirect('/admin/exhibitions')->with('success', 'Exhibition updated.');
                else:
                    return redirect('/admin/exhibitions')->with('error', 'Something went wrong. Please contactMaster the administrator.');
                endif;
            elseif ($request->segment(3) == 'insert'):
                //INSERT
                $exhibition = new exhibitions_master();
                $exhibition->ex_year = htmlspecialchars(trim($request->ex_year));
                $exhibition->ex_name = htmlspecialchars(trim($request->ex_name));
                $exhibition->ex_ft_img_alt = htmlspecialchars(trim($request->ex_ft_img_alt));
                $exhibition->ex_descr = htmlspecialchars(trim($request->ex_descr));
                $exhibition->ex_info = htmlspecialchars(trim($request->ex_info));
                $exhibition->ex_ord = htmlspecialchars(trim($request->ex_ord));

                if ($request->file('ex_ft_img')):
                    $fileName = 'exhibition_' . time() . '.' . $request->ex_ft_img->extension();
                    $request->ex_ft_img->move(public_path('img/exhibitions'), $fileName);
                    $exhibition->ex_ft_img = $fileName;
                endif;

                if ($request->file('ex_cat_pdf')):
                    $fileName = $request->file('ex_cat_pdf')->getClientOriginalName();
                    $request->ex_cat_pdf->move(public_path('pdf/exhibitions'), $fileName);
                    $exhibition->ex_cat_pdf = $fileName;
                endif;

                if ($exhibition->save()):
                    return back()->with('success', 'Exhibition added.');
                else:
                    return back()->with('error', 'Something went wrong. Please contactMaster the administrator.');
                endif;
            endif;
        endif;
    }

    public function upload_images(Request $request) {
        if ($request->isMethod('get')):
            $exhibition = exhibitions_master::where([['is_deleted', 'n'], ['id', $request->segment(4)]])->first();
            $ex_images = exhibition_images::select('exhibition_images.id', 'exhibition_images.ex_img', 'exhibition_images.ex_img_alt', 'exhibition_images.ex_img_ord', 'exhibition_images.ex_info')
                ->join('exhibitions_master', 'exhibitions_master.id', '=', 'exhibition_images.exhibitions_master_id')
                ->where(
                    [
                        ['exhibition_images.is_deleted', 'n'],
                        ['exhibitions_master.is_deleted', 'n'],
                        ['exhibition_images.exhibitions_master_id', $exhibition->id]
                    ]
                )
                ->orderBy('exhibition_images.ex_img_ord', 'ASC')
                ->get();
            if ($exhibition):
                return view('admin.ex_upload_images')->with(compact('exhibition', 'ex_images'));
            endif;
        elseif ($request->isMethod('post')):
            $request->validate([
                'ex_img' => 'required|mimes:jpg,JPG,jpeg,JPEG,png,PNG',
                'ex_img_alt' => 'max:100',
                'ex_img_ord' => 'numeric',
                'ex_img_caption' => 'max: 900',
                'ex_info' => 'max:1000'
            ]);

            $exhibition_images = new exhibition_images();
            $exhibition_images->exhibitions_master_id = $request->exhibitions_master_id;

            $fileName = 'exhibition_' . time() . '.' . $request->ex_img->extension();
            $request->ex_img->move(public_path('img/exhibitions'), $fileName);
            $exhibition_images->ex_img = $fileName;

            $exhibition_images->ex_img_alt = htmlspecialchars(trim($request->ex_img_alt));
            $exhibition_images->ex_info = htmlspecialchars(trim($request->ex_info));
            $exhibition_images->ex_img_caption = htmlspecialchars(trim($request->ex_img_caption));
            $exhibition_images->ex_img_ord = $request->ex_img_ord;

            if ($exhibition_images->save()):
                return back()->with('success', 'Exhibition image added.');
            else:
                return back()->with('error', 'Something went wrong. Please contactMaster the administrator.');
            endif;
        endif;
    }

    public function delete_images(Request $request) {
        if ($request->isMethod('post')):
            $check = exhibition_images::where([['id', $request->id]])->first();
            if ($check):
                if($check->ex_img):
                    File::move(public_path('img/exhibitions/' . $check->ex_img), public_path('img/exhibitions/deleted/' . $check->ex_img));
                endif;

                $exhibition_images = exhibition_images::findOrFail($request->id);
                $exhibition_images->is_deleted = 'y';
                if($exhibition_images->save()):
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
            $ex_image = exhibition_images::select('exhibition_images.id', 'exhibition_images.ex_img', 'exhibition_images.ex_img_alt', 'exhibition_images.ex_img_ord', 'exhibition_images.ex_img_caption', 'exhibition_images.ex_info', 'exhibitions_master.ex_name')
                ->join('exhibitions_master', 'exhibitions_master.id', '=', 'exhibition_images.exhibitions_master_id')
                ->where(
                    [
                        ['exhibition_images.id', $request->segment(5)],
                        ['exhibition_images.is_deleted', 'n']
                    ]
                )
                ->first();

            if($ex_image):
                return view('admin.ex_upload_images_update')->with(compact('ex_image'));
            endif;
        elseif ($request->isMethod('post')):
            $request->validate([
                'ex_img' => 'nullable|mimes:jpg,JPG,jpeg,JPEG,png,PNG',
                'ex_img_alt' => 'max:100',
                'ex_img_ord' => 'numeric',
                'ex_img_caption' => 'max: 900',
                'ex_info' => 'max:1000'
            ]);

            $exhibition_images = exhibition_images::where([['id', $request->exhibition_images_id]])->first();
            if ($request->file('ex_img')):
                if($exhibition_images->ex_img):
                    File::move(public_path('img/exhibitions/' . $exhibition_images->ex_img), public_path('img/exhibitions/deleted/' . $exhibition_images->ex_img));
                endif;

                $fileName = 'artist_' . time() . '.' . $request->ex_img->extension();
                $request->ex_img->move(public_path('img/exhibitions'), $fileName);
                $exhibition_images->ex_img = $fileName;
            endif;

            $exhibition_images->ex_img_alt = htmlspecialchars(trim($request->ex_img_alt));
            $exhibition_images->ex_info = htmlspecialchars(trim($request->ex_info));
            $exhibition_images->ex_img_caption = htmlspecialchars(trim($request->ex_img_caption));
            $exhibition_images->ex_img_ord = $request->ex_img_ord;

            if ($exhibition_images->save()):
                return redirect('/admin/exhibitions/upload-images/' . $exhibition_images->exhibitions_master_id)->with('success', 'Exhibition image updated.');
            else:
                return redirect('/admin/exhibitions/upload-images/' . $exhibition_images->exhibitions_master_id)->with('error', 'Something went wrong. Please contactMaster the administrator.');
            endif;
        endif;
    }
}
