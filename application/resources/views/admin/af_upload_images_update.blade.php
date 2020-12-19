@extends('admin.layouts.app')

@section('content')
    <section class="content-header">
        <h1>Exhibition Images</h1>
        <ol class="breadcrumb">
            <li class="active">
                <a href="#">
                    <i class="livicon" data-name="users" data-size="14" data-color="#333" data-hovercolor="#333"></i> Art fair Images
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
                            Update art fair image
                        </h3>
                    </div>
                    <div class="panel-body">
                        <form class="form-horizontal" action="{{ url('/admin/art-fairs/upload-images/update') }}" method="post" id="art_fairs_form" name="art_fairs_form" enctype="multipart/form-data">
                            @csrf

                            <div class="form-group">
                                <label class="col-md-3 control-label" for="af_name">Art Fair</label>
                                <div class="col-md-8">
                                    <input id="af_name" name="af_name" type="text" placeholder="Arpita Akhanda" class="form-control" maxlength="50" readonly autocomplete value="{{ $af_image->af_name }}" />
                                    @if($errors->has('af_name'))
                                        <small class="help-block col-md-6 col-md-offset-3">
                                            {{ $errors->first('af_name') }}
                                        </small>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-3 control-label" for="af_img">Image</label>
                                <div class="col-md-8">
                                    <div class="fileinput fileinput-new" data-provides="fileinput">
                                        <div class="fileinput-new thumbnail" style="width: 200px; height: 150px;">
                                            <img src="{{ url('img/art_fairs/' . $af_image->af_img) }}" />
                                        </div>
                                        <div class="fileinput-preview fileinput-exists thumbnail" style="max-width: 200px; max-height: 150px;"></div>
                                        <div>
                                            <span class="btn btn-default btn-file">
                                                <span class="fileinput-new">Select image</span>
                                                <span class="fileinput-exists">Change</span>
                                                <input type="file" name="af_img" id="af_img" />
                                            </span>
                                            <a href="#" class="btn btn-default fileinput-exists" data-dismiss="fileinput">Remove</a>
                                        </div>
                                    </div>
                                </div>
                                @if($errors->has('af_img'))
                                    <small class="error col-md-6 col-md-offset-3">
                                        {{ $errors->first('af_img') }}
                                    </small>
                                @endif
                            </div>

                            <div class="form-group">
                                <label class="col-md-3 control-label" for="af_img_alt">Alt Text</label>
                                <div class="col-md-8">
                                    <input id="af_img_alt" name="af_img_alt" type="text" placeholder="Alt Text" class="form-control" maxlength="60" autocomplete value="{{ $af_image->af_img_alt }}" />
                                    @if($errors->has('af_img_alt'))
                                        <small class="help-block col-md-6 col-md-offset-3">
                                            {{ $errors->first('af_img_alt') }}
                                        </small>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-3 control-label" for="af_img_caption">Image Caption</label>
                                <div class="col-md-8">
                                    <textarea name="af_img_caption" id="af_img_caption" class="form-control">{!! $af_image->af_img_caption !!}</textarea>
                                    @if($errors->has('af_img_caption'))
                                        <small class="help-block col-md-6 col-md-offset-3">
                                            {{ $errors->first('af_img_caption') }}
                                        </small>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-3 control-label" for="af_info">Image Info (right side)</label>
                                <div class="col-md-8">
                                    <textarea id="af_info" name="af_info">{!! $af_image->af_info !!}</textarea>
                                    @if($errors->has('af_info'))
                                        <small class="help-block col-md-6 col-md-offset-3">
                                            {{ $errors->first('af_info') }}
                                        </small>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-3 control-label" for="af_img_ord">Image Order</label>
                                <div class="col-md-8">
                                    <input id="af_img_ord" name="af_img_ord" type="text" placeholder="2" class="form-control" maxlength="2" autocomplete value="{{ $af_image->af_img_ord }}" required />
                                    @if($errors->has('af_img_ord'))
                                        <small class="help-block col-md-6 col-md-offset-3">
                                            {{ $errors->first('af_img_ord') }}
                                        </small>
                                    @endif
                                </div>
                            </div>

                            <input type="hidden" id="art_fair_images_id" name="art_fair_images_id" value="{{ $af_image->id }}" />

                            <div class="form-group">
                                <label class="col-md-3 control-label" for="submit"></label>
                                <div class="col-md-8">
                                    <button type="submit" id="add_art_fair" name="add_art_fair" class="btn btn-responsive btn-primary btn-sm">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
