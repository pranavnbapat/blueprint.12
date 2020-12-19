<?php


namespace App\Http\View\Composers;

use App\Models\menu_master;
use App\Models\seo_master;
use Illuminate\View\View;

class FrontendComposers {

    public function compose(View $view) {
        $main_menu = menu_master::where([
            ['status', 'a'],
            ['is_deleted', 'n']
        ])
            ->orderBy('menu_ord', 'ASC')
            ->get();
//        dd($view->segment(1));
//        $seo = seo_master::where([['is_deleted', 'n'], ['status', 'a']])->get();

        $view->with('main_menu', $main_menu);
    }
}
