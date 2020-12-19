<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\user_master;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Auth;
use File;

class MyProfileC extends Controller {

    public function index(Request $request) {
        if($request->isMethod('get')):
            return view('admin.my_profile');
        elseif ($request->isMethod('post')):
        endif;
    }

    public function change_password(Request $request) {
        if($request->isMethod('post')):
            $request->validate([
                'password' => 'required|string|min:8|required_with:password_confirmation|same:password_confirmation',
                'password_confirmation' => 'required|string|min:8|same:password_confirmation'
            ]);

            if(Hash::check($request->curr_pass, Auth::user()->password)):
                $user_master = user_master::findOrFail(Auth::user()->id);
                if($user_master):
                    $user_master->password = bcrypt(htmlspecialchars(trim($request->password)));
                    if($user_master->save()):
                        return redirect('/admin/my-profile')->with('success', 'Password has been changed successfully.');
                    else:
                        return redirect('/admin/my-profile')->with('error', 'Something went wrong. Please contactMaster the administrator.');
                    endif;
                else:
                    return redirect('/admin/my-profile')->with('error', 'The user does not exist.');
                endif;
            else:
                return redirect('/admin/my-profile')->with('error', 'Current password is wrong.');
            endif;
        endif;
    }

    public function change_profile_photo(Request $request) {
        if($request->isMethod('post')):
            $request->validate([
                'user_profile_photo' => 'required|mimes:jpg,jpeg,gif,png|max:2048',
            ]);
            $fileName = time() . '.' . $request->user_profile_photo->extension();
            if($request->user_profile_photo->move(public_path('admin/img/user_profile_photo'), $fileName)):
                $user_master = user_master::findOrFail(Auth::user()->id);
                if($user_master->profile_photo):
                    File::move(public_path('admin/img/user_profile_photo/' . $user_master->profile_photo), public_path('admin/img/user_profile_photo/deleted_files/' . $user_master->profile_photo));
                endif;
                $user_master->profile_photo = $fileName;
                if($user_master->save()):
                    return redirect('/admin/my-profile')->with('success', 'Profile photo has been changed successfully.');
                else:
                    return redirect('/admin/my-profile')->with('error', 'Something went wrong. Please contactMaster the administrator.');
                endif;
            else:
                return redirect('/admin/my-profile')->with('error', 'Something went wrong. Please contactMaster the administrator.');
            endif;
        endif;
    }
}
