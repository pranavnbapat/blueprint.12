@extends('admin.layouts.app')

@section('content')
<section class="content-header">
    <h1>Artists</h1>
    <ol class="breadcrumb">
        <li class="active">
            <a href="#">
                <i class="livicon" data-name="users" data-size="14" data-color="#333" data-hovercolor="#333"></i> Artists
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
                        Update an artist
                    </h3>
                </div>
                <div class="panel-body">
                    <form class="form-horizontal" action="{{ url('/admin/artists/update') }}" method="post" id="artist_form" name="artist_form" enctype="multipart/form-data">
                        @csrf

                        <div class="form-group">
                            <label class="col-md-3 control-label" for="artist_name">Artist</label>
                            <div class="col-md-8">
                                <input id="artist_name" name="artist_name" type="text" placeholder="Arpita Akhanda" class="form-control" maxlength="50" autocomplete value="{{ $artist->artist_name }}" />
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
                                    <div class="fileinput-new thumbnail" style="width: 200px; height: 150px;">
                                        <img src="{{ url('/img/artists/' . $artist->art_img) }}" />
                                    </div>
                                    <div class="fileinput-preview fileinput-exists thumbnail" style="max-width: 200px; max-height: 150px;"></div>
                                    <div>
                                        <span class="btn btn-default btn-file">
                                            <span class="fileinput-new">Select image</span>
                                            <span class="fileinput-exists">Change</span>
                                            <input type="file" name="art_img" id="art_img" />
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
                                <input id="art_img_alt" name="art_img_alt" type="text" placeholder="Alt Text" class="form-control" maxlength="60" autocomplete value="{{ $artist->art_img_alt }}" />
                                @if($errors->has('art_img_alt'))
                                    <small class="error">
                                        {{ $errors->first('art_img_alt') }}
                                    </small>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-3 control-label" for="art_img_ord">Image Order</label>
                            <div class="col-md-8">
                                <input id="art_img_ord" name="art_img_ord" type="text" placeholder="2" class="form-control" maxlength="2" autocomplete value="{{ $artist->art_img_ord }}" required />
                                @if($errors->has('art_img_ord'))
                                    <small class="error">
                                        {{ $errors->first('art_img_ord') }}
                                    </small>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-3 control-label" for="art_descr">Art Description</label>
                            <div class="col-md-8">
                                <textarea id="art_descr" name="art_descr">{!! $artist->art_descr !!}</textarea>
                                @if($errors->has('art_descr'))
                                    <small class="error">
                                        {{ $errors->first('art_descr') }}
                                    </small>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-3 control-label" for="art_info">Art Info (right side)</label>
                            <div class="col-md-8">
                                <textarea id="art_info" name="art_info">{!! $artist->art_info !!} </textarea>
                                @if($errors->has('art_info'))
                                    <small class="error">
                                        {{ $errors->first('art_info') }}
                                    </small>
                                @endif
                            </div>
                        </div>

                        <input type="hidden" value="{{ $artist->id }}" id="row_id" name="row_id" />

                        <div class="form-group">
                            <label class="col-md-3 control-label" for="submit"></label>
                            <div class="col-md-8">
                                <button type="submit" id="update_artist" name="update_artist" class="btn btn-responsive btn-primary btn-sm">Update</button>
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
