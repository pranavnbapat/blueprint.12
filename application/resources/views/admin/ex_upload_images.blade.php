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
                            Add exhibition images
                        </h3>
                    </div>
                    <div class="panel-body">
                        <form class="form-horizontal" action="{{ url('/admin/exhibitions/upload-images') }}" method="post" id="exhibition_form" name="exhibition_form" enctype="multipart/form-data">
                            @csrf

                            <div class="form-group">
                                <label class="col-md-3 control-label" for="ex_name">Exhibition</label>
                                <div class="col-md-8">
                                    <input id="ex_name" name="ex_name" type="text" placeholder="Arpita Akhanda" class="form-control" maxlength="50" readonly autocomplete value="{{ $exhibition->ex_name }}" />
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
                                        <div class="fileinput-new thumbnail" style="width: 200px; height: 150px;"></div>
                                        <div class="fileinput-preview fileinput-exists thumbnail" style="max-width: 200px; max-height: 150px;"></div>
                                        <div>
                                            <span class="btn btn-default btn-file">
                                                <span class="fileinput-new">Select image</span>
                                                <span class="fileinput-exists">Change</span>
                                                <input type="file" name="ex_img" id="ex_img" required />
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
                                    <input id="ex_img_alt" name="ex_img_alt" type="text" placeholder="Alt Text" class="form-control" maxlength="60" autocomplete value="{{ old('ex_img_alt') }}" />
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
                                    <textarea name="ex_img_caption" id="ex_img_caption" class="form-control">{!! old('ex_img_caption') !!}</textarea>
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
                                    <textarea id="ex_info" name="ex_info"></textarea>
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
                                    <input id="ex_img_ord" name="ex_img_ord" type="text" placeholder="2" class="form-control" maxlength="2" autocomplete value="{{ old('ex_img_ord') }}" required />
                                    @if($errors->has('ex_img_ord'))
                                        <small class="help-block col-md-6 col-md-offset-3">
                                            {{ $errors->first('ex_img_ord') }}
                                        </small>
                                    @endif
                                </div>
                            </div>

                            <input type="hidden" id="exhibitions_master_id" name="exhibitions_master_id" value="{{ $exhibition->id }}" />

                            <div class="form-group">
                                <label class="col-md-3 control-label" for="submit"></label>
                                <div class="col-md-8">
                                    <button type="submit" id="add_exhibition" name="add_exhibition" class="btn btn-responsive btn-primary btn-sm">Submit</button>
                                    <button type="button" id="cancel" name="cancel" class="btn btn-responsive btn-default btn-sm">Cancel</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="content">
        <div class="row">
            <div class="col-lg-12">
                <div class="panel panel-primary tabtop">
                    <div class="panel-body">
                        <div class="gallery-padding">
                            @if($ex_images)
                                @foreach($ex_images as $ei)
                                    <div class="col-lg-2 col-md-2 col-xs-6 col-sm-3 gallery-border" id="{{ $ei->id }}">
                                        <a class="fancybox" href="{{ url('img/exhibitions/' . $ei->ex_img) }}" data-fancybox-group="gallery" title="{{ $ei->ex_img_caption }}">
                                            <img src="{{ url('img/exhibitions/' . $ei->ex_img) }}" class="img-responsive gallery-style" alt="Image" />
                                            <a href="#" class="btn btn-danger btn-xs" title='Delete' data-toggle="modal" data-target="#delete_modal" onclick="ex_images_id = {{ $ei->id }}" style="margin-top: 5px;">
                                                <i class="fa fa-trash-o"></i>
                                            </a>
                                            <a href="{{ url('admin/exhibitions/upload-images/update/' . $ei->id) }}" class="btn btn-info btn-xs" title='Edit' style="margin-top: 5px;">
                                                <i class="fa fa-pencil"></i>
                                            </a>
                                        </a>
                                    </div>
                                @endforeach
                            @endif
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <div class="modal fade" id="delete_modal" role="dialog" aria-labelledby="modalLabelprimary">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header bg-danger">
                    <h4 class="modal-title" id="modalLabelprimary">Confirm Delete?</h4>
                </div>
                <div class="modal-body">
                    <p>
                        This action is irreversible. Confirm delete?
                    </p>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-danger" data-dismiss="modal" onclick="delete_image(ex_images_id)">Yes</button>
                    <button class="btn btn-primary" data-dismiss="modal">No</button>
                </div>
            </div>
        </div>
    </div>
@endsection
