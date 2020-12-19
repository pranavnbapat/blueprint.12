<?php


namespace App\Http\View\Composers;

use App\Models\admin_menu_master;
use Illuminate\View\View;

class AdminComposers {

    public function compose(View $view) {
        $main_menu = admin_menu_master::where([
                        ['status', '=', 'a']
                    ])
                    ->orderBy('menu_order', 'ASC')
                    ->get();

        $view->with('main_menu', $main_menu);
    }
}
