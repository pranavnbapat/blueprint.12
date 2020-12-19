<?php

namespace App\Http\Controllers\admin;

use App\Models\contact_leads;

class DashboardC {
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct() {

    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index() {
        $contact_leads = contact_leads::get();
        return view('admin.dashboard')->with(compact('contact_leads'));
    }
}
