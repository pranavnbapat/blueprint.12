@extends('admin.layouts.app')

@section('content')
    <section class="content-header">
        <h1>Exhibition Images</h1>
        <ol class="breadcrumb">
            <li class="active">
                <a href="#">
                    <i class="livicon" data-name="users" data-size="14" data-color="#333" data-hovercolor="#333"></i> Exhibition Images
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
                            Update exhibition image
                        </h3>
                    </div>
                    <div class="panel-body">
                        <form class="form-horizontal" action="{{ url('/admin/exhibitions/upload-images/update') }}" method="post" id="exhibition_form" name="exhibition_form" enctype="multipart/form-data">
                            @csrf

                            <div class="form-group">
                                <label class="col-md-3 control-label" for="ex_name">Exhibition</label>
                                <div class="col-md-8">
                                    <input id="ex_name" name="ex_name" type="text" placeholder="Arpita Akhanda" class="form-control" maxlength="50" readonly autocomplete value="{{ $ex_image->ex_name }}" />
                                    @if($errors->has('ex_name'))
                                        <small class="help-block col-md-6 col-md-offset-3">
                                            {{ $errors->first('ex_name') }}
                                        </small>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-3 control-label" for="ex_img">Image</label>
                                <div class="col-md-8">
                                    <div class="fileinput fileinput-new" data-provides="fileinput">
                                        <div class="fileinput-new thumbnail" style="width: 200px; height: 150px;">
                                            <img src="{{ url('img/exhibitions/' . $ex_image->ex_img) }}" />
                                        </div>
                                        <div class="fileinput-preview fileinput-exists thumbnail" style="max-width: 200px; max-height: 150px;"></div>
                                        <div>
                                            <span class="btn btn-default btn-file">
                                                <span class="fileinput-new">Select image</span>
                                                <span class="fileinput-exists">Change</span>
                                                <input type="file" name="ex_img" id="ex_img" />
                                            </span>
                                            <a href="#" class="btn btn-default fileinput-exists" data-dismiss="fileinput">Remove</a>
                                        </div>
                                    </div>
                                </div>
                                @if($errors->has('ex_img'))
                                    <small class="error col-md-6 col-md-offset-3">
                                        {{ $errors->first('ex_img') }}
                                    </small>
                                @endif
                            </div>

                            <div class="form-group">
                                <label class="col-md-3 control-label" for="ex_img_alt">Alt Text</label>
                                <div class="col-md-8">
                                    <input id="ex_img_alt" name="ex_img_alt" type="text" placeholder="Alt Text" class="form-control" maxlength="60" autocomplete value="{{ $ex_image->ex_img_alt }}" />
                                    @if($errors->has('ex_img_alt'))
                                        <small class="help-block col-md-6 col-md-offset-3">
                                            {{ $errors->first('ex_img_alt') }}
                                        </small>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-3 control-label" for="ex_img_caption">Image Caption</label>
                                <div class="col-md-8">
                                    <textarea name="ex_img_caption" id="ex_img_caption" class="form-control">{!! $ex_image->ex_img_caption !!}</textarea>
                                    @if($errors->has('ex_img_caption'))
                                        <small class="help-block col-md-6 col-md-offset-3">
                                            {{ $errors->first('ex_img_caption') }}
                                        </small>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-3 control-label" for="ex_info">Image Info (right side)</label>
                                <div class="col-md-8">
                                    <textarea id="ex_info" name="ex_info">{!! $ex_image->ex_info !!}</textarea>
                                    @if($errors->has('ex_info'))
                                        <small class="help-block col-md-6 col-md-offset-3">
                                            {{ $errors->first('ex_info') }}
                                        </small>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-3 control-label" for="ex_img_ord">Image Order</label>
                                <div class="col-md-8">
                                    <input id="ex_img_ord" name="ex_img_ord" type="text" placeholder="2" class="form-control" maxlength="2" autocomplete value="{{ $ex_image->ex_img_ord }}" required />
                                    @if($errors->has('ex_img_ord'))
                                        <small class="help-block col-md-6 col-md-offset-3">
                                            {{ $errors->first('ex_img_ord') }}
                                        </small>
                                    @endif
                                </div>
                            </div>

                            <input type="hidden" id="exhibition_images_id" name="exhibition_images_id" value="{{ $ex_image->id }}" />

                            <div class="form-group">
                                <label class="col-md-3 control-label" for="submit"></label>
                                <div class="col-md-8">
                                    <button type="submit" id="add_exhibition" name="add_exhibition" class="btn btn-responsive btn-primary btn-sm">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
