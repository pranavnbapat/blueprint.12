<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\Controller;
use App\Models\contact_leads;
use App\Models\contact_master;
use Illuminate\Http\Request;

class ContactC extends Controller {

    public function index(Request $request) {
        if($request->isMethod('get')):
            $contact = contact_master::where([['is_deleted', 'n']])->first();
            return view('frontend.contact')->with(compact('contact'));
        endif;
    }

    public function submit(Request $request) {
        if($request->isMethod('post')):
            $request->validate([
                'v_name' => 'required|max:100',
                'v_email' => 'required|email|max:50',
                'v_city' => 'required|max:50',
            ]);

            $contact_leads = new contact_leads();
            $contact_leads->v_name = htmlspecialchars(trim($request->v_name));
            $contact_leads->v_email = htmlspecialchars(trim($request->v_email));
            $contact_leads->v_city = htmlspecialchars(trim($request->v_city));
            if($contact_leads->save()):
                return back()->with('success', 'Thank you.');
            else:
                return back()->with('error', 'Something went wrong. Please contactMaster the administrator.');
            endif;
        endif;
    }
}
