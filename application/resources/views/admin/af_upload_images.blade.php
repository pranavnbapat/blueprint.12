@extends('admin.layouts.app')

@section('content')
    <section class="content-header">
        <h1>Art Fair Images</h1>
        <ol class="breadcrumb">
            <li class="active">
                <a href="#">
                    <i class="livicon" data-name="users" data-size="14" data-color="#333" data-hovercolor="#333"></i> Art Fair Images
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
                            Add art fair images
                        </h3>
                    </div>
                    <div class="panel-body">
                        <form class="form-horizontal" action="{{ url('/admin/art-fairs/upload-images') }}" method="post" id="art_fair_form" name="art_fair_form" enctype="multipart/form-data">
                            @csrf

                            <div class="form-group">
                                <label class="col-md-3 control-label" for="af_name">Art Fair</label>
                                <div class="col-md-8">
                                    <input id="af_name" name="af_name" type="text" placeholder="Arpita Akhanda" class="form-control" maxlength="50" readonly autocomplete value="{{ $art_fair->af_name }}" />
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
                                        <div class="fileinput-new thumbnail" style="width: 200px; height: 150px;"></div>
                                        <div class="fileinput-preview fileinput-exists thumbnail" style="max-width: 200px; max-height: 150px;"></div>
                                        <div>
                                            <span class="btn btn-default btn-file">
                                                <span class="fileinput-new">Select image</span>
                                                <span class="fileinput-exists">Change</span>
                                                <input type="file" name="af_img" id="af_img" required />
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
                                    <input id="af_img_alt" name="af_img_alt" type="text" placeholder="Alt Text" class="form-control" maxlength="60" autocomplete value="{{ old('af_img_alt') }}" />
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
                                    <textarea name="af_img_caption" id="af_img_caption" class="form-control">{{ old('af_img_caption') }}</textarea>
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
                                    <textarea id="af_info" name="af_info"></textarea>
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
                                    <input id="af_img_ord" name="af_img_ord" type="text" placeholder="2" class="form-control" maxlength="2" autocomplete value="{{ old('af_img_ord') }}" required />
                                    @if($errors->has('af_img_ord'))
                                        <small class="help-block col-md-6 col-md-offset-3">
                                            {{ $errors->first('af_img_ord') }}
                                        </small>
                                    @endif
                                </div>
                            </div>

                            <input type="hidden" id="art_fairs_master_id" name="art_fairs_master_id" value="{{ $art_fair->id }}" />

                            <div class="form-group">
                                <label class="col-md-3 control-label" for="submit"></label>
                                <div class="col-md-8">
                                    <button type="submit" id="add_art_fair" name="add_art_fair" class="btn btn-responsive btn-primary btn-sm">Submit</button>
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
                            @if($af_images)
                                @foreach($af_images as $ai)
                                    <div class="col-lg-2 col-md-2 col-xs-6 col-sm-3 gallery-border" id="{{ $ai->id }}">
                                        <a class="fancybox" href="{{ url('img/art_fairs/' . $ai->af_img) }}" data-fancybox-group="gallery" title="{{ $ai->af_img_caption }}">
                                            <img src="{{ url('img/art_fairs/' . $ai->af_img) }}" class="img-responsive gallery-style" alt="Image" />
                                            <a href="#" class="btn btn-danger btn-xs" title='Delete' data-toggle="modal" data-target="#delete_modal" onclick="af_images_id = {{ $ai->id }}" style="margin-top: 5px;">
                                                <i class="fa fa-trash-o"></i>
                                            </a>
                                            <a href="{{ url('admin/art-fairs/upload-images/update/' . $ai->id) }}" class="btn btn-info btn-xs" title='Edit' style="margin-top: 5px;">
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
                    <button class="btn btn-danger" data-dismiss="modal" onclick="delete_image(af_images_id)">Yes</button>
                    <button class="btn btn-primary" data-dismiss="modal">No</button>
                </div>
            </div>
        </div>
    </div>
@endsection
