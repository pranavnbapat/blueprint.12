<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\platform_images;
use App\Models\platform_master;
use Illuminate\Http\Request;
use File;

class PlatformC extends Controller {

    public function index(Request $request) {
        if($request->isMethod('get')):
            if($request->segment(3)):
                $platform = platform_master::where([['is_deleted', 'n'], ['id', $request->segment(3)]])->first();
                return view('admin.platform_update')->with(['platform' => $platform]);
            else:
                $platform = platform_master::where([['is_deleted', 'n']])->get();
                return view('admin.platform')->with(['platform' => $platform]);
            endif;
        endif;
    }

    public function insert(Request $request) {
        if($request->isMethod('post')):
            if ($request->segment(3) == 'update'):
                $request->validate([
                    'pf_art_name' => 'required|max:50',
                    'pf_ft_img' => 'mimes:jpg,JPG,jpeg,JPEG,png,PNG',
                    'pf_ft_img_alt' => 'max:100',
                    'pf_descr' => 'max:65535',
                    'pf_img_ord' => 'required|numeric'
                ]);
                $platform = platform_master::findOrFail($request->row_id);
                $platform->pf_art_name = trim(htmlspecialchars($request->pf_art_name));
                $platform->pf_img_ord = $request->pf_img_ord;
                $platform->pf_descr = htmlspecialchars(trim($request->pf_descr));

                if ($request->file('pf_ft_img')):
                    if($platform->pf_ft_img):
                        File::move(public_path('img/platform/' . $platform->pf_ft_img), public_path('img/platform/deleted/' . $platform->pf_ft_img));
                    endif;

                    $fileName = 'platform_' . time() . '.' . $request->pf_ft_img->extension();
                    $request->pf_ft_img->move(public_path('img/platform'), $fileName);
                    $platform->pf_ft_img = $fileName;
                endif;

                $platform->pf_ft_img_alt = htmlspecialchars(trim($request->pf_ft_img_alt));
                if ($platform->save()):
                    return redirect('/admin/platform')->with('success', 'Platform updated.');
                else:
                    return redirect('/admin/platform')->with('error', 'Something went wrong. Please contactMaster the administrator.');
                endif;
            elseif ($request->segment(3) == 'insert'):
                $request->validate([
                    'pf_art_name' => 'required|max:50',
                    'pf_ft_img' => 'required|mimes:jpg,JPG,jpeg,JPEG,png,PNG',
                    'pf_ft_img_alt' => 'max:100',
                    'pf_descr' => 'max:65535',
                    'pf_img_ord' => 'required|numeric'
                ]);

                //INSERT
                $platform = new platform_master();
                $platform->pf_art_name = htmlspecialchars(trim($request->pf_art_name));
                $platform->pf_img_ord = $request->pf_img_ord;
                $platform->pf_descr = htmlspecialchars(trim($request->pf_descr));

                $fileName = 'platform_' . time() . '.' . $request->pf_ft_img->extension();
                $request->pf_ft_img->move(public_path('img/platform'), $fileName);
                $platform->pf_ft_img = $fileName;

                $platform->pf_ft_img_alt = htmlspecialchars(trim($request->pf_ft_img_alt));

                if ($platform->save()):
                    return back()->with('success', 'Platform added.');
                else:
                    return back()->with('error', 'Something went wrong. Please contactMaster the administrator.');
                endif;
            endif;
        endif;
    }

    public function upload_images(Request $request) {
        if ($request->isMethod('get')):
            $platform = platform_master::where([['is_deleted', 'n'], ['id', $request->segment(4)]])->first();
            $pf_images = platform_images::select('platform_images.id', 'platform_images.pf_img', 'platform_images.pf_img_alt', 'platform_images.pf_img_ord', 'platform_images.pf_img_info')
                ->join('platform_master', 'platform_master.id', '=', 'platform_images.platform_master_id')
                ->where(
                    [
                        ['platform_images.is_deleted', 'n'],
                        ['platform_images.platform_master_id', $platform->id]
                    ]
                )
                ->orderBy('platform_images.pf_img_ord', 'ASC')
                ->get();
            if ($platform):
                return view('admin.pf_upload_images')->with(compact('platform', 'pf_images'));
            endif;
        elseif ($request->isMethod('post')):
            $request->validate([
                'pf_img' => 'required|mimes:jpg,JPG,jpeg,JPEG,png,PNG',
                'pf_img_alt' => 'max:100',
                'pf_img_ord' => 'numeric',
                'pf_img_caption' => 'max: 900',
                'pf_img_info' => 'max:1000'
            ]);

            $platform_images = new platform_images();
            $platform_images->platform_master_id = $request->platform_master_id;

            $fileName = 'platform_' . time() . '.' . $request->pf_img->extension();
            $request->pf_img->move(public_path('img/platform'), $fileName);
            $platform_images->pf_img = $fileName;

            $platform_images->pf_img_alt = htmlspecialchars(trim($request->pf_img_alt));
            $platform_images->pf_img_info = htmlspecialchars(trim($request->pf_img_info));
            $platform_images->pf_img_price = trim($request->pf_img_price);
            $platform_images->pf_img_caption = htmlspecialchars(trim($request->pf_img_caption));
            $platform_images->pf_img_ord = $request->pf_img_ord;

            if ($platform_images->save()):
                return back()->with('success', 'Platform image added.');
            else:
                return back()->with('error', 'Something went wrong. Please contactMaster the administrator.');
            endif;
        endif;
    }

    public function delete_images(Request $request) {
        if ($request->isMethod('post')):
            $check = platform_images::where([['id', $request->id]])->first();
            if ($check):
                if($check->pf_img):
                    File::move(public_path('img/platform/' . $check->pf_img), public_path('img/platform/deleted/' . $check->pf_img));
                endif;

                $platform_images = platform_images::findOrFail($request->id);
                $platform_images->is_deleted = 'y';
                if($platform_images->save()):
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
            $pf_image = platform_images::select('platform_images.id', 'platform_images.pf_img', 'platform_images.pf_img_alt', 'platform_images.pf_img_ord', 'platform_images.pf_img_caption', 'platform_master.pf_art_name', 'platform_images.pf_img_info', 'platform_images.pf_img_price')
                ->join('platform_master', 'platform_master.id', '=', 'platform_images.platform_master_id')
                ->where(
                    [
                        ['platform_images.id', $request->segment(5)],
                        ['platform_images.is_deleted', 'n']
                    ]
                )
                ->first();

            if($pf_image):
                return view('admin.pf_upload_images_update')->with(compact('pf_image'));
            endif;
        elseif ($request->isMethod('post')):
            $request->validate([
                'pf_img' => 'nullable|mimes:jpg,JPG,jpeg,JPEG,png,PNG',
                'pf_img_alt' => 'max:100',
                'pf_img_ord' => 'numeric',
                'pf_img_caption' => 'max: 900',
                'pf_info' => 'max:1000'
            ]);

            $platform_images = platform_images::where([['id', $request->platform_images_id]])->first();
            if ($request->file('pf_img')):
                if($platform_images->pf_img):
                    File::move(public_path('img/platform/' . $platform_images->pf_img), public_path('img/platform/deleted/' . $platform_images->pf_img));
                endif;

                $fileName = 'artist_' . time() . '.' . $request->pf_img->extension();
                $request->pf_img->move(public_path('img/platform'), $fileName);
                $platform_images->pf_img = $fileName;
            endif;

            $platform_images->pf_img_alt = htmlspecialchars(trim($request->pf_img_alt));
            $platform_images->pf_img_info = htmlspecialchars(trim($request->pf_img_info));
            $platform_images->pf_img_caption = htmlspecialchars(trim($request->pf_img_caption));
            $platform_images->pf_img_ord = $request->pf_img_ord;
            $platform_images->pf_img_price = trim($request->pf_img_price);

            if ($platform_images->save()):
                return redirect('/admin/platform/upload-images/' . $platform_images->platform_master_id)->with('success', 'Exhibition image updated.');
            else:
                return redirect('/admin/platform/upload-images/' . $platform_images->platform_master_id)->with('error', 'Something went wrong. Please contactMaster the administrator.');
            endif;
        endif;
    }
}
