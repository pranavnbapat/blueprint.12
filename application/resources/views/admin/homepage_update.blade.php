@extends('admin.layouts.app')

@section('content')
<section class="content-header">
    <h1>Homepage</h1>
    <ol class="breadcrumb">
        <li class="active">
            <a href="#">
                <i class="livicon" data-name="home" data-size="14" data-color="#333" data-hovercolor="#333"></i> Homepage
            </a>
        </li>
    </ol>
</section>
<section class="content">
    <div class="row ">
        <div class="col-md-12">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <h3 class="panel-title">
                        Update Homepage data
                    </h3>
                </div>
                <div class="panel-body">
                    <form class="form-horizontal" action="{{ url('/admin/homepage/update') }}" method="post" id="homepage_form" name="homepage_form" enctype="multipart/form-data">
                        @csrf
                        <div class="form-group">
                            <label class="col-md-3 control-label" for="home_img">Image</label>
                            <div class="col-md-8">
                                <div class="fileinput fileinput-new" data-provides="fileinput">
                                    <div class="fileinput-new thumbnail" style="width: 200px; height: 150px;">
                                        <img src="{{ url('/img/homepage/' . $home_image->home_img) }}" />
                                    </div>
                                    <div class="fileinput-preview fileinput-exists thumbnail" style="max-width: 200px; max-height: 150px;"></div>
                                    <div>
                                        <span class="btn btn-default btn-file">
                                            <span class="fileinput-new">Select image</span>
                                            <span class="fileinput-exists">Change</span>
                                            <input type="file" name="home_img" id="home_img" />
                                        </span>
                                        <a href="#" class="btn btn-default fileinput-exists" data-dismiss="fileinput">Remove</a>
                                    </div>
                                </div>
                            </div>
                            @if($errors->has('home_img'))
                                <small class="error">
                                    {{ $errors->first('home_img') }}
                                </small>
                            @endif
                        </div>

                        <div class="form-group">
                            <label class="col-md-3 control-label" for="home_img_alt">Alt Text</label>
                            <div class="col-md-8">
                                <input id="home_img_alt" name="home_img_alt" type="text" placeholder="Alt Text" class="form-control" maxlength="60" autocomplete value="{{ $home_image->home_img_alt }}" />
                                @if($errors->has('home_img_alt'))
                                    <small class="error">
                                        {{ $errors->first('home_img_alt') }}
                                    </small>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-3 control-label" for="home_info">Homepage Info</label>
                            <div class="col-md-8">
                                <textarea id="home_info" name="home_info">{!! $home_image->home_info !!}</textarea>
                                @if($errors->has('home_info'))
                                    <small class="error">
                                        {{ $errors->first('home_info') }}
                                    </small>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-3 control-label" for="home_info_mob">Homepage Info (Mobile)</label>
                            <div class="col-md-8">
                                <textarea id="home_info_mob" name="home_info_mob">{!! $home_image->home_info_mob !!}</textarea>
                                @if($errors->has('home_info_mob'))
                                    <small class="error">
                                        {{ $errors->first('home_info_mob') }}
                                    </small>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-3 control-label" for="img_ord">Image Order</label>
                            <div class="col-md-8">
                                <input id="img_ord" name="img_ord" type="text" placeholder="2" class="form-control" maxlength="2" autocomplete value="{{ $home_image->img_ord }}" />
                                @if($errors->has('img_ord'))
                                    <small class="error">
                                        {{ $errors->first('img_ord') }}
                                    </small>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-3 control-label" for="hyperlink">Hyperlink</label>
                            <div class="col-md-8">
                                <select name="hyperlink" id="hyperlink" class="form-control">
                                    <option value="#">Please select hyperlink</option>
                                    @foreach($artists as $a)
                                        <option value="{{ url('artists/' . strtolower(str_replace(' ', '-', $a->artist_name))) }}">Artist - {{ $a->artist_name }}</option>
                                    @endforeach
                                    @foreach($exhibitions as $e)
                                        <option value="{{ url('exhibitions/' . strtolower(str_replace(' ', '-', $e->ex_name))) }}">Exhibition - {{ $e->ex_name }}</option>
                                    @endforeach
                                    @foreach($art_fairs as $af)
                                        <option value="{{ url('art-fairs/' . strtolower(str_replace(' ', '-', $af->af_name))) }}">Art Fairs - {{ $af->af_name }}</option>
                                    @endforeach
                                    @foreach($platforms as $pf)
                                        <option value="{{ url('platforms/' . strtolower(str_replace(' ', '-', $pf->pf_name))) }}">Platform - {{ $pf->pf_name }}</option>
                                    @endforeach
                                </select>
                                @if($errors->has('hyperlink'))
                                    <small class="error">
                                        {{ $errors->first('hyperlink') }}
                                    </small>
                                @endif
                            </div>
                        </div>

                        <input type="hidden" value="{{ $home_image->id }}" id="row_id" name="row_id" />

                        <div class="form-group">
                            <label class="col-md-3 control-label" for="submit"></label>
                            <div class="col-md-8">
                                <button type="submit" id="update_homepage" name="update_homepage" class="btn btn-responsive btn-primary btn-sm">Update</button>
                                <button type="button" id="cancel" name="cancel" class="btn btn-responsive btn-default btn-sm">Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>
@endsection
