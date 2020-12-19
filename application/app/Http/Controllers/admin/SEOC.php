<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\art_fairs_master;
use App\Models\artist_master;
use App\Models\exhibitions_master;
use App\Models\menu_master;
use App\Models\platform_master;
use App\Models\seo_master;
use Illuminate\Http\Request;

class SEOC extends Controller {

    public function index(Request $request) {
        if($request->isMethod('get')):
            if($request->segment(3)):
                //LOAD SEO UPDATE PAGE
                $seo = seo_master::where([['id', $request->segment(3)]])->get();
                return view('admin/seo_update')->with(compact('seo'));
            else:
                //LOAD SEO PAGE
                $seo = seo_master::where([['is_deleted', 'n']])->get();
                $page_routes = menu_master::where([['status', 'a'],['is_deleted', 'n']])->get();

                $artists = artist_master::where([['is_deleted', 'n']])->get();
                $exhibitions = exhibitions_master::where([['is_deleted', 'n']])->get();
                $art_fairs = art_fairs_master::where([['is_deleted', 'n']])->get();
                $platforms = platform_master::where([['is_deleted', 'n']])->get();

                //REMOVE MENU/PAGES THAT ALREADY HAVE SEO DATA
                $temp_page_routes = $page_routes;
                foreach ($page_routes as $p):
                    foreach ($seo as $s):
                        if($p->menu_name == $s->page_route):
                            $temp_page_routes->forget($p->id - 1);  //-1 BECAUSE ARRAY/COLLECTION STARTS FROM 0 AND OUR DB RECORDS START FROM 1.
                        endif;
                    endforeach;
                endforeach;
                $page_routes = $temp_page_routes;
                return view('admin/seo')->with(compact('seo', 'page_routes', 'artists', 'exhibitions', 'art_fairs', 'platforms'));
            endif;
        endif;
    }

    public function insert(Request $request) {
        if($request->isMethod('post')):
            $request->validate([
                'title' => 'max:60',
                'keywords' => 'max:500',
                'description' => 'max:160',
                'page_route' => 'required'
            ]);

            if($request->segment(3) == 'update'):
                //UPDATE
                $seo_master = seo_master::findOrFail($request->row_id);
                $seo_master->title = $request->title;
                $seo_master->keywords = $request->keywords;
                $seo_master->description = $request->description;
                if($seo_master->save()):
                    return redirect('/admin/seo')->with('success', 'SEO data updated.');
                else:
                    return redirect('/admin/seo')->with('error', 'Something went wrong. Please contactMaster the administrator.');
                endif;
            elseif($request->segment(3) == 'insert'):
                //INSERT
                $seo_master = new seo_master();
                $seo_master->title = $request->title;
                $seo_master->keywords = $request->keywords;
                $seo_master->description = $request->description;
                $seo_master->page_route = $request->page_route;
                if($seo_master->save()):
                    return back()->with('success', 'SEO data added.');
                else:
                    return back()->with('error', 'Something went wrong. Please contactMaster the administrator.');
                endif;
            endif;
        endif;
    }
}
