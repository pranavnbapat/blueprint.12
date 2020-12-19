@extends('admin.layouts.app')

@section('content')
    <section class="content-header">
        <h1>Artist Images</h1>
        <ol class="breadcrumb">
            <li class="active">
                <a href="#">
                    <i class="livicon" data-name="users" data-size="14" data-color="#333" data-hovercolor="#333"></i> Artist Images
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
                            Add artist images
                        </h3>
                    </div>
                    <div class="panel-body">
                        <form class="form-horizontal" action="{{ url('/admin/artists/upload-images') }}" method="post" id="artist_form" name="artist_form" enctype="multipart/form-data">
                            @csrf

                            <div class="form-group">
                                <label class="col-md-3 control-label" for="artist_name">Artist</label>
                                <div class="col-md-8">
                                    <input id="artist_name" name="artist_name" type="text" placeholder="Arpita Akhanda" class="form-control" maxlength="50" readonly autocomplete value="{{ $artist->artist_name }}" />
                                    @if($errors->has('artist_name'))
                                        <small class="error">
                                            {{ $errors->first('artist_name') }}
                                        </small>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-3 control-label" for="art_img">Image</label>
                                <div class="col-md-8">
                                    <div class="fileinput fileinput-new" data-provides="fileinput">
                                        <div class="fileinput-new thumbnail" style="width: 200px; height: 150px;"></div>
                                        <div class="fileinput-preview fileinput-exists thumbnail" style="max-width: 200px; max-height: 150px;"></div>
                                        <div>
                                            <span class="btn btn-default btn-file">
                                                <span class="fileinput-new">Select image</span>
                                                <span class="fileinput-exists">Change</span>
                                                <input type="file" name="art_img" id="art_img" required />
                                            </span>
                                            <a href="#" class="btn btn-default fileinput-exists" data-dismiss="fileinput">Remove</a>
                                        </div>
                                    </div>
                                </div>
                                @if($errors->has('art_img'))
                                    <small class="error col-md-6 col-md-offset-3">
                                        {{ $errors->first('art_img') }}
                                    </small>
                                @endif
                            </div>

                            <div class="form-group">
                                <label class="col-md-3 control-label" for="art_img_alt">Alt Text</label>
                                <div class="col-md-8">
                                    <input id="art_img_alt" name="art_img_alt" type="text" placeholder="Alt Text" class="form-control" maxlength="60" autocomplete value="{{ old('art_img_alt') }}" />
                                    @if($errors->has('art_img_alt'))
                                        <small class="error">
                                            {{ $errors->first('art_img_alt') }}
                                        </small>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-3 control-label" for="art_img_caption">Image Caption</label>
                                <div class="col-md-8">
                                    <textarea id="art_img_caption" name="art_img_caption"></textarea>
                                    @if($errors->has('art_img_caption'))
                                        <small class="error">
                                            {{ $errors->first('art_img_caption') }}
                                        </small>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-3 control-label" for="art_info">Image Info (right side)</label>
                                <div class="col-md-8">
                                    <textarea id="art_info" name="art_info"></textarea>
                                    @if($errors->has('art_info'))
                                        <small class="error">
                                            {{ $errors->first('art_info') }}
                                        </small>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-3 control-label" for="art_img_ord">Image Order</label>
                                <div class="col-md-8">
                                    <input id="art_img_ord" name="art_img_ord" type="text" placeholder="2" class="form-control" maxlength="2" autocomplete value="{{ old('art_img_ord') }}" required />
                                    @if($errors->has('art_img_ord'))
                                        <small class="error">
                                            {{ $errors->first('art_img_ord') }}
                                        </small>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-3 control-label" for="view_on_wall">View On Wall</label>
                                <div class="col-md-8">
                                    <select required name="view_on_wall" id="view_on_wall" class="form-control">
                                        <option value="y" selected>Yes</option>
                                        <option value="n">No</option>
                                    </select>
                                    @if($errors->has('view_on_wall'))
                                        <small class="error">
                                            {{ $errors->first('view_on_wall') }}
                                        </small>
                                    @endif
                                </div>
                            </div>

                            <div id="view_on_wall_div">
                                <div class="form-group">
                                    <label class="col-md-3 control-label" for="vr_width">Viewing Room Image Width</label>
                                    <div class="col-md-8">
                                        <input id="vr_width" name="vr_width" type="number" placeholder="100" class="form-control" maxlength="3" autocomplete value="100" />
                                        @if($errors->has('vr_width'))
                                            <small class="error">
                                                {{ $errors->first('vr_width') }}
                                            </small>
                                        @endif
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-md-3 control-label" for="vr_wall_type">Wall Type</label>
                                    <div class="col-md-8">
                                        <select required name="vr_wall_type" id="vr_wall_type" class="form-control">
                                            <option value="brick">Brick</option>
                                            <option value="standard" selected>Standard</option>
                                        </select>
                                        @if($errors->has('vr_wall_type'))
                                            <small class="error">
                                                {{ $errors->first('vr_wall_type') }}
                                            </small>
                                        @endif
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-md-3 control-label" for="vr_fur_type">Furniture Type</label>
                                    <div class="col-md-8">
                                        <select required name="vr_fur_type" id="vr_fur_type" class="form-control">
                                            <option value="bench">Bench</option>
                                            <option value="chair" selected>Chair</option>
                                            <option value="chair2">Chair 2</option>
                                            <option value="mobler_chair">Mobler Chair</option>
                                            <option value="madsens_chair">Madsens Chair</option>
                                            <option value="raffles_sofa">Raffles Sofa</option>
                                            <option value="chesterfield_sofa">Chesterfield Sofa</option>
                                            <option value="leathersofa">Leather Sofa</option>
                                            <option value="measure">Measure</option>
                                        </select>
                                        @if($errors->has('vr_fur_type'))
                                            <small class="error">
                                                {{ $errors->first('vr_fur_type') }}
                                            </small>
                                        @endif
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-md-3 control-label" for="vr_flr_type">Floor Type</label>
                                    <div class="col-md-8">
                                        <select required name="vr_flr_type" id="vr_flr_type" class="form-control">
                                            <option value="standard" selected>Standard</option>
                                            <option value="wood">Wood</option>
                                        </select>
                                        @if($errors->has('vr_flr_type'))
                                            <small class="error">
                                                {{ $errors->first('vr_flr_type') }}
                                            </small>
                                        @endif
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-md-3 control-label" for="vr_img_ord">Viewing Room Image Order</label>
                                    <div class="col-md-8">
                                        <input id="vr_img_ord" name="vr_img_ord" type="text" placeholder="2" class="form-control" maxlength="2" autocomplete value="{{ old('vr_img_ord') }}" />
                                        @if($errors->has('vr_img_ord'))
                                            <small class="error">
                                                {{ $errors->first('vr_img_ord') }}
                                            </small>
                                        @endif
                                    </div>
                                </div>
                            </div>

                            <input type="hidden" id="artist_master_id" name="artist_master_id" value="{{ $artist->id }}" />

                            <div class="form-group">
                                <label class="col-md-3 control-label" for="submit"></label>
                                <div class="col-md-8">
                                    <button type="submit" id="add_artist" name="add_artist" class="btn btn-responsive btn-primary btn-sm">Submit</button>
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
                            @if($artist_images)
                                @foreach($artist_images as $ai)
                                    <div class="col-lg-2 col-md-2 col-xs-6 col-sm-3 gallery-border" id="{{ $ai->id }}">
                                        <a class="fancybox" href="{{ url('img/artists/' . $ai->art_img) }}" data-fancybox-group="gallery" title="{{ $ai->art_img_caption }}">
                                            <img src="{{ url('img/artists/' . $ai->art_img) }}" class="img-responsive gallery-style" alt="Image" />
                                            <a href="#" class="btn btn-danger btn-xs" title='Delete' data-toggle="modal" data-target="#delete_modal" onclick="artist_transaction_id = {{ $ai->id }}" style="margin-top: 5px;">
                                                <i class="fa fa-trash-o"></i>
                                            </a>
                                            <a href="{{ url('admin/artists/upload-images/update/' . $ai->id) }}" class="btn btn-info btn-xs" title='Edit' style="margin-top: 5px;">
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
                    <button class="btn btn-danger" data-dismiss="modal" onclick="delete_image(artist_transaction_id)">Yes</button>
                    <button class="btn btn-primary" data-dismiss="modal">No</button>
                </div>
            </div>
        </div>
    </div>
@endsection