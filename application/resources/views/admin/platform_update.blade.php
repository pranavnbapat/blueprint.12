@extends('admin.layouts.app')

@section('content')
<section class="content-header">
    <h1>Platform</h1>
    <ol class="breadcrumb">
        <li class="active">
            <a href="#">
                <i class="livicon" data-name="users" data-size="14" data-color="#333" data-hovercolor="#333"></i> Platform
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
                        Edit a platform
                    </h3>
                </div>
                <div class="panel-body">
                    <form class="form-horizontal" action="{{ url('/admin/platform/update') }}" method="post" id="platform_form" name="platform_form" enctype="multipart/form-data">
                        @csrf

                        <div class="form-group">
                            <label class="col-md-3 control-label" for="pf_art_name">Platform Artist</label>
                            <div class="col-md-8">
                                <input id="pf_art_name" name="pf_art_name" type="text" placeholder="" class="form-control" maxlength="100" autocomplete value="{{ $platform->pf_art_name }}" />
                                @if($errors->has('pf_art_name'))
                                    <small class="error">
                                        {{ $errors->first('pf_art_name') }}
                                    </small>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-3 control-label" for="pf_ft_img">Featured Image</label>
                            <div class="col-md-8">
                                <div class="fileinput fileinput-new" data-provides="fileinput">
                                    <div class="fileinput-new thumbnail" style="width: 200px; height: 150px;">
                                        <img src="{{ url('img/platform/' . $platform->pf_ft_img) }}" />
                                    </div>
                                    <div class="fileinput-preview fileinput-exists thumbnail" style="max-width: 200px; max-height: 150px;"></div>
                                    <div>
                                            <span class="btn btn-default btn-file">
                                                <span class="fileinput-new">Select image</span>
                                                <span class="fileinput-exists">Change</span>
                                                <input type="file" name="pf_ft_img" id="pf_ft_img" />
                                            </span>
                                        <a href="#" class="btn btn-default fileinput-exists" data-dismiss="fileinput">Remove</a>
                                    </div>
                                </div>
                            </div>
                            @if($errors->has('pf_ft_img'))
                                <small class="error">
                                    {{ $errors->first('pf_ft_img') }}
                                </small>
                            @endif
                        </div>

                        <div class="form-group">
                            <label class="col-md-3 control-label" for="pf_ft_img_alt">Alt Text</label>
                            <div class="col-md-8">
                                <input id="pf_ft_img_alt" name="pf_ft_img_alt" type="text" placeholder="Alt Text" class="form-control" maxlength="60" autocomplete value="{{ $platform->pf_ft_img_alt }}" />
                                @if($errors->has('pf_ft_img_alt'))
                                    <small class="error">
                                        {{ $errors->first('pf_ft_img_alt') }}
                                    </small>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-3 control-label" for="pf_img_ord">Image Order</label>
                            <div class="col-md-8">
                                <input id="pf_img_ord" name="pf_img_ord" type="text" placeholder="2" class="form-control" maxlength="2" autocomplete value="{{ $platform->pf_img_ord }}" required />
                                @if($errors->has('pf_img_ord'))
                                    <small class="error">
                                        {{ $errors->first('pf_img_ord') }}
                                    </small>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-3 control-label" for="pf_descr">Platform Description</label>
                            <div class="col-md-8">
                                <textarea id="pf_descr" name="pf_descr">{!! $platform->pf_descr !!}</textarea>
                                @if($errors->has('pf_descr'))
                                    <small class="error">
                                        {{ $errors->first('pf_descr') }}
                                    </small>
                                @endif
                            </div>
                        </div>

                        <input type="hidden" value="{{ $platform->id }}" id="row_id" name="row_id" />

                        <div class="form-group">
                            <label class="col-md-3 control-label" for="submit"></label>
                            <div class="col-md-8">
                                <button type="submit" id="add_platform" name="add_platform" class="btn btn-responsive btn-primary btn-sm">Submit</button>
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
