<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\contact_leads;
use App\Models\contact_master;
use Illuminate\Http\Request;

class ContactC extends Controller {

    public function index(Request $request) {
        if($request->isMethod('get')):
            if($request->segment(3)):
                $contact_master = contact_master::where([['is_deleted', 'n'], ['id', $request->segment(3)]])->first();
                return view('admin.contact_update')->with(compact('contact_master'));
            else:
                $contact_master = contact_master::where([['is_deleted', 'n']])->get();
                $contact_leads = contact_leads::where([['is_deleted', 'n']])->get();
                return view('admin.contact')->with(compact('contact_master', 'contact_leads'));
            endif;
        endif;
    }

    public function insert(Request $request) {
        if($request->isMethod('post')):
            $request->validate([
                'contact_info' => 'required|max:5000',
            ]);

            if($request->segment(3) == 'insert'):
                $contact = new contact_master();
                $contact->contact_info = htmlspecialchars(trim($request->contact_info));
                if($contact->save()):
                    return redirect('/admin/contact')->with('success', 'Contact information added.');
                else:
                    return redirect('/admin/contact')->with('error', 'Something went wrong. Please contactMaster the administrator.');
                endif;
            elseif($request->segment(3) == 'update'):
                $contact_master = contact_master::findOrFail($request->row_id);
                $contact_master->contact_info = htmlspecialchars(trim($request->contact_info));
                if($contact_master->save()):
                    return redirect('/admin/contact')->with('success', 'Contact information updated.');
                else:
                    return redirect('/admin/contact')->with('error', 'Something went wrong. Please contactMaster the administrator.');
                endif;
            endif;
        endif;
    }
}
