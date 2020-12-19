@extends('admin.layouts.app')

@section('content')
<section class="content-header">
    <h1>About</h1>
    <ol class="breadcrumb">
        <li class="active">
            <a href="#">
                <i class="livicon" data-name="ul-list" data-size="14" data-color="#333" data-hovercolor="#333"></i> About
            </a>
        </li>
    </ol>
</section>
<section class="content">
    <div class="row ">
        <div class="col-lg-12 col-md-8 col-sm-6">
            <div class="panel panel-primary" id="add_course_div">
                <div class="panel-heading">
                    <h3 class="panel-title">
                        Add About Info
                    </h3>
                </div>
                <div class="panel-body">
                    <form class="form-horizontal" action="{{ url('/admin/about/update') }}" method="post" id="about_form" name="about_form" enctype="multipart/form-data">
                        @csrf

                        <div class="form-group">
                            <label class="col-md-3 control-label" for="about_img">Image</label>
                            <div class="col-md-8">
                                <div class="fileinput fileinput-new" data-provides="fileinput">
                                    <div class="fileinput-new thumbnail" style="width: 200px; height: 150px;">
                                        <img src="{{ url('/img/about/' . $about->about_img) }}" />
                                    </div>
                                    <div class="fileinput-preview fileinput-exists thumbnail" style="max-width: 200px; max-height: 150px;"></div>
                                    <div>
                                        <span class="btn btn-default btn-file">
                                            <span class="fileinput-new">Select image</span>
                                            <span class="fileinput-exists">Change</span>
                                            <input type="file" name="about_img" id="about_img" />
                                        </span>
                                        <a href="#" class="btn btn-default fileinput-exists" data-dismiss="fileinput">Remove</a>
                                    </div>
                                </div>
                            </div>
                            @if($errors->has('about_img'))
                                <small class="error">
                                    {{ $errors->first('about_img') }}
                                </small>
                            @endif
                        </div>

                        <div class="form-group">
                            <label class="col-md-3 control-label" for="about_img_alt">Alt Text</label>
                            <div class="col-md-8">
                                <input id="about_img_alt" name="about_img_alt" type="text" placeholder="Alt Text" class="form-control" maxlength="60" autocomplete value="{{ $about->about_img_alt }}" />
                                @if($errors->has('about_img_alt'))
                                    <small class="error">
                                        {{ $errors->first('about_img_alt') }}
                                    </small>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-3 control-label" for="name">About</label>
                            <div class="col-md-8">
                                <textarea id="about_info" class="form-control" name="about_info" rows="10">{!! html_entity_decode($about->about_info) !!}</textarea>
                            </div>
                        </div>

                        <input type="hidden" value="{{ $about->id }}" id="row_id" name="row_id" />

                        <div class="form-group">
                            <label class="col-md-3 control-label" for="submit"></label>
                            <div class="col-md-8">
                                <button type="submit" id="about_submit" name="about_submit" class="btn btn-responsive btn-primary btn-sm">Submit</button>
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
