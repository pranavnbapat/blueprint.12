<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\about;
use Illuminate\Http\Request;

class AboutC extends Controller {

    public function index(Request $request) {
        if($request->isMethod('get')):
            if($request->segment(3)):
                $about = about::where([['is_deleted', 'n'], ['id', $request->segment(3)]])->first();
                return view('admin.about_update')->with(compact('about'));
            else:
                $about = about::where([['is_deleted', 'n']])->get();
                return view('admin.about')->with(compact('about'));
            endif;
        endif;
    }

    public function insert(Request $request) {
        if($request->isMethod('post')):
            $request->validate([
                'about_info' => 'required|max:5000',
                'about_img' => 'mimes:jpg,JPG,jpeg,JPEG,png,PNG|max:2048',
                'about_img_alt' => 'max:100',
            ]);

            if($request->segment(3) == 'insert'):
                $about = new about();
                $about->about_info = trim(htmlspecialchars($request->about_info));

                $fileName = 'about_'.time().'.'.$request->about_img->extension();
                $request->about_img->move(public_path('img/about'), $fileName);
                $about->about_img = $fileName;

                $about->about_img_alt = trim(htmlspecialchars($request->about_img_alt));

                if($about->save()):
                    return redirect('/admin/about')->with('success', 'About information added.');
                else:
                    return redirect('/admin/about')->with('error', 'Something went wrong. Please contactMaster the administrator.');
                endif;
            elseif($request->segment(3) == 'update'):
                $about = about::findOrFail($request->row_id);
                $about->about_info = trim(htmlspecialchars($request->about_info));

                if($request->file('about_img')):
                    if($about->about_img):
                        File::move(public_path('img/about/' . $about->about_img), public_path('img/about/deleted/' . $about->about_img));
                    endif;

                    $fileName = 'about_'.time().'.'.$request->about_img->extension();
                    $request->about_img->move(public_path('img/about'), $fileName);
                    $about->about_img = $fileName;
                endif;
                $about->about_img_alt = trim(htmlspecialchars($request->about_img_alt));

                if($about->save()):
                    return redirect('/admin/about')->with('success', 'About information updated.');
                else:
                    return redirect('/admin/about')->with('error', 'Something went wrong. Please contactMaster the administrator.');
                endif;
            endif;
        endif;
    }
}
