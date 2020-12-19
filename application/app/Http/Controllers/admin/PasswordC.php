<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Mail\ForgotPasswordMail;
use App\Mail\ResetPasswordMail;
use App\Models\password_resets;
use App\Models\user_master;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class PasswordC extends Controller
{

    private $reset_message;

    public function reset_password(Request $request)
    {
        if ($request->isMethod('get')):
            if ($request->segment(2)):
                $password_resets = password_resets::where([['reset_password_token', $request->segment(2)]])->firstOrFail();
                if ($password_resets):
                    $curr_time = strtotime("now");
                    if ($password_resets->new_password_sent == 'y'):
                        $this->reset_message = 'Password reset link has already been used. Please request a new link.';
                        return view('admin.reset_password')->with(['reset_message' => $this->reset_message]);
                    elseif ($curr_time < $password_resets->token_expiry):
                        $password_resets->new_password_sent = 'y';
                        if ($password_resets->save()):
                            $user_master = user_master::where([['id', $password_resets->user_master_id]])->firstOrFail();
                            $new_pass = Str::random(8);
                            $user_master->password = bcrypt($new_pass);
                            if ($user_master->save()):
                                $request['new_password'] = $new_pass;
                                Mail::to($user_master->email)->send(new ResetPasswordMail($request));
                                $this->reset_message = 'Password has been reset and sent to your email address.';
                                return view('admin.reset_password')->with(['reset_message' => $this->reset_message]);
                            endif;
                        else:
                            $this->reset_message = 'Something went wrong. Please contactMaster the administrator.';
                            return view('admin.reset_password')->with(['reset_message' => $this->reset_message]);
                        endif;
                    else:
                        $this->reset_message = 'Reset password link expired. Please reset the password again.';
                        return view('admin.reset_password')->with(['reset_message' => $this->reset_message]);
                    endif;
                else:
                    $this->reset_message = 'Reset password token not found. Did you mess with it? Please reset the password again.';
                    return view('admin.reset_password')->with(['reset_message' => $this->reset_message]);
                endif;
            else:
                $this->reset_message = 'Invalid token.';
                return view('admin.reset_password')->with(['reset_message' => $this->reset_message]);
            endif;
        elseif ($request->isMethod('post')):
        endif;
    }

    public function forgot_password(Request $request)
    {
        if ($request->isMethod('get')):
            return new \App\Mail\ForgotPasswordMail();
        elseif ($request->isMethod('post')):
            $check_user = user_master::where([['email', $request->email]])->firstOrFail();
            if ($check_user):
                $password_resets = new password_resets();
                $password_resets->user_master_id = $check_user->id;
                $password_resets->reset_password_token = Str::random(50);
                $request['reset_password_token'] = $password_resets->reset_password_token;
                $password_resets->token_expiry = strtotime('+1 day');
                if ($password_resets->save()):
                    Mail::to($request->email)->send(new ForgotPasswordMail($request));
                    return 0;
                else:
                    return 1;
                endif;
            else:
                return 'User not found. Please check the email.';
            endif;
        endif;
    }
}
