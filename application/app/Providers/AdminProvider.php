<?php

namespace App\Providers;

use App\Http\View\Composers\AdminComposers;
use App\Http\View\Composers\FrontendComposers;
//use http\Env\Request;
use App\Models\seo_master;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class AdminProvider extends ServiceProvider {

    private $seo;

    public function register() {

    }

    public function boot(Request $request) {
        //option 1
//        View::share('main_menu', $main_menu);

        //option 2
//        View::composer(['admin.*'], function($view) {
//            $main_menu = menu_master::where([
//                            ['status', '=', 'a']
//                        ])
//                        ->orderBy('menu_order', 'ASC')
//                        ->get();
//            $view->with('main_menu', $main_menu);
//        });

        $this->seo = seo_master::where([['is_deleted', 'n'], ['status', 'a'], ['page_route', $request->path()]])->first();

        View::composer(['frontend.*'], function($view) {
            $view->with('seo', $this->seo);
        });

//        Option 3
        View::composer('admin.*', AdminComposers::class);
        View::composer('frontend.*', FrontendComposers::class);
    }
}
