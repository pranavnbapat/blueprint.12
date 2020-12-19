<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\about;
use App\Models\art_fair_images;
use App\Models\art_fairs_master;
use App\Models\artist_master;
use App\Models\artist_transaction;
use App\Models\contact_master;
use App\Models\exhibition_images;
use App\Models\exhibitions_master;
use App\Models\homepage;
use App\Models\platform_images;
use App\Models\platform_master;
use App\Models\seo_master;
use Illuminate\Http\Request;
use File;
use Illuminate\Support\Facades\DB;

class AjaxC extends Controller {

    private $status, $delete;

    public function change_status(Request $request) {
        if($request->isMethod('post')):
            if($request->keyword == 'seo'):
                $this->status = seo_master::findOrFail($request->id);
                if($this->status):
                    if($this->status->status == 'a'):
                        $this->status->status = 'i';
                    else:
                        $this->status->status = 'a';
                    endif;
                endif;
            elseif($request->keyword == 'homepage'):
                $this->status = homepage::findOrFail($request->id);
                if($this->status):
                    if($this->status->status == 'a'):
                        $this->status->status = 'i';
                    else:
                        $this->status->status = 'a';
                    endif;
                endif;
            elseif($request->keyword == 'artist'):
                $this->status = artist_master::findOrFail($request->id);
                if($this->status):
                    if($this->status->status == 'a'):
                        $this->status->status = 'i';
                    else:
                        $this->status->status = 'a';
                    endif;
                endif;
            elseif($request->keyword == 'about'):
                $this->status = homepage::findOrFail($request->id);
                if($this->status):
                    if($this->status->status == 'a'):
                        $this->status->status = 'i';
                    else:
                        $this->status->status = 'a';
                    endif;
                endif;
            elseif($request->keyword == 'exhibition'):
                $this->status = exhibitions_master::findOrFail($request->id);
                if($this->status):
                    if($this->status->status == 'a'):
                        $this->status->status = 'i';
                    else:
                        $this->status->status = 'a';
                    endif;
                endif;
            elseif($request->keyword == 'art_fair'):
                $this->status = art_fairs_master::findOrFail($request->id);
                if($this->status):
                    if($this->status->status == 'a'):
                        $this->status->status = 'i';
                    else:
                        $this->status->status = 'a';
                    endif;
                endif;
            elseif($request->keyword == 'platform'):
                $this->status = platform_master::findOrFail($request->id);
                if($this->status):
                    if($this->status->status == 'a'):
                        $this->status->status = 'i';
                    else:
                        $this->status->status = 'a';
                    endif;
                endif;
            endif;

            if($this->status->save()):
                return 0;
            else:
                return 1;
            endif;
        endif;
    }

    public function delete(Request $request) {
        if($request->isMethod('post')):
            if($request->keyword == 'seo'):
                $this->delete = seo_master::findOrFail($request->id);
                if($this->delete):
                    $this->delete->is_deleted = 'y';
                endif;
            elseif ($request->keyword == 'homepage'):
                $this->delete = homepage::findOrFail($request->id);
                if($this->delete):
                    if($this->delete->home_img):
                        File::move(public_path('img/homepage/' . $this->delete->home_img), public_path('img/homepage/deleted/' . $this->delete->home_img));
                    endif;
                    $this->delete->is_deleted = 'y';
                endif;
            elseif ($request->keyword == 'artist'):
                $this->delete = artist_master::findOrFail($request->id);
                if($this->delete):
                    if($this->delete->art_img):
                        File::move(public_path('img/artists/' . $this->delete->art_img), public_path('img/artists/deleted/' . $this->delete->art_img));
                        $art_images = artist_transaction::where([['artist_master_id', $this->delete->id], ['is_deleted', 'n']])->get();
                        if(count($art_images) > 0):
                            foreach($art_images as $ex):
                                File::move(public_path('img/artists/' . $ex->pf_img), public_path('img/artists/deleted/' . $ex->pf_img));
                            endforeach;
                            DB::table('artist_transaction')
                                ->where('artist_master_id', $this->delete->id)
                                ->update(
                                    ['is_deleted' => 'y']
                                );
                        endif;
                    endif;
                    $this->delete->is_deleted = 'y';
                endif;
            elseif ($request->keyword == 'about'):
                $this->delete = about::findOrFail($request->id);
                if($this->delete):
                    if($this->delete->about_img):
                        File::move(public_path('img/about/' . $this->delete->about_img), public_path('img/about/deleted/' . $this->delete->about_img));
                    endif;
                    $this->delete->is_deleted = 'y';
                endif;
            elseif ($request->keyword == 'exhibition'):
                $this->delete = exhibitions_master::findOrFail($request->id);
                if($this->delete):
                    if($this->delete->ex_ft_img):
                        File::move(public_path('img/exhibitions/' . $this->delete->ex_ft_img), public_path('img/exhibitions/deleted/' . $this->delete->ex_ft_img));
                        $ex_images = exhibition_images::where([['exhibitions_master_id', $this->delete->id], ['is_deleted', 'n']])->get();
                        if(count($ex_images) > 0):
                            foreach($ex_images as $ex):
                                File::move(public_path('img/exhibitions/' . $ex->pf_img), public_path('img/exhibitions/deleted/' . $ex->pf_img));
                            endforeach;
                            DB::table('exhibition_images')
                                ->where('exhibitions_master_id', $this->delete->id)
                                ->update(
                                    ['is_deleted' => 'y']
                                );
                        endif;
                    endif;
                    $this->delete->is_deleted = 'y';
                endif;
            elseif ($request->keyword == 'art_fair'):
                $this->delete = art_fairs_master::findOrFail($request->id);
                if($this->delete):
                    if($this->delete->af_ft_img):
                        File::move(public_path('img/art_fairs/' . $this->delete->af_ft_img), public_path('img/art_fairs/deleted/' . $this->delete->af_ft_img));
                        $af_images = art_fair_images::where([['art_fairs_master_id', $this->delete->id], ['is_deleted', 'n']])->get();
                        if(count($af_images) > 0):
                            foreach($af_images as $af):
                                File::move(public_path('img/art_fairs/' . $af->pf_img), public_path('img/art_fairs/deleted/' . $af->pf_img));
                            endforeach;
                            DB::table('art_fair_images')
                                ->where('art_fairs_master_id', $this->delete->id)
                                ->update(
                                    ['is_deleted' => 'y']
                                );
                        endif;
                    endif;
                    $this->delete->is_deleted = 'y';
                endif;
            elseif ($request->keyword == 'platform'):
                $this->delete = platform_master::findOrFail($request->id);
                if($this->delete):
                    if($this->delete->pf_ft_img):
                        File::move(public_path('img/platform/' . $this->delete->pf_ft_img), public_path('img/platform/deleted/' . $this->delete->pf_ft_img));
                        $platform_images = platform_images::where([['platform_master_id', $this->delete->id], ['is_deleted', 'n']])->get();
                        if(count($platform_images) > 0):
                            foreach($platform_images as $pi):
                                File::move(public_path('img/platform/' . $pi->pf_img), public_path('img/platform/deleted/' . $pi->pf_img));
                            endforeach;
                            DB::table('platform_images')
                                ->where('platform_master_id', $this->delete->id)
                                ->update(
                                    ['is_deleted' => 'y']
                                );
                        endif;
                    endif;
                    $this->delete->is_deleted = 'y';
                endif;
            elseif ($request->keyword == 'contact'):
                $this->delete = contact_master::findOrFail($request->id);
                if($this->delete):
                    $this->delete->is_deleted = 'y';
                endif;
            endif;

            if($this->delete->save()):
                return 0;
            else:
                return 1;
            endif;
        endif;
    }
}
