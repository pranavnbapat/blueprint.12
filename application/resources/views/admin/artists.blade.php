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
                        Add an artist
                    </h3>
                </div>
                <div class="panel-body">
                    <form class="form-horizontal" action="{{ url('/admin/artists/insert') }}" method="post" id="artist_form" name="artist_form" enctype="multipart/form-data">
                        @csrf

                        <div class="form-group">
                            <label class="col-md-3 control-label" for="artist_name">Artist</label>
                            <div class="col-md-8">
                                <input id="artist_name" name="artist_name" type="text" placeholder="Arpita Akhanda" class="form-control" maxlength="50" autocomplete value="{{ old('artist_name') }}" />
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
                            <label class="col-md-3 control-label" for="art_descr">Art Description</label>
                            <div class="col-md-8">
                                <textarea id="art_descr" name="art_descr"></textarea>
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
                                <textarea id="art_info" name="art_info"></textarea>
                                @if($errors->has('art_info'))
                                    <small class="error">
                                        {{ $errors->first('art_info') }}
                                    </small>
                                @endif
                            </div>
                        </div>

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

        <div class="col-lg-12">
            <div class="panel panel-primary filterable">
                <div class="panel-heading clearfix">
                    <div class="panel-title pull-left">
                        <div class="caption">
                            Artists
                        </div>
                    </div>
                </div>
                <div class="panel-body">
                    <div class="panel-body table-responsive">
                        <table class="table table-striped table-bordered" id="artist_table">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Image</th>
                                <th>Alt Text</th>
                                <th>Order</th>
                                <th>Description</th>
                                <th>Info</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            @php
                                $count = 1;
                            @endphp
                            @foreach($artists as $a)
                                <tr id="{{ $a->id }}">
                                    <td>@php echo $count; @endphp</td>
                                    <td>{{ $a->artist_name }}</td>
                                    <td>
                                        @if($a->art_img)
                                        <img src="{{ url('/img/artists/' . $a->art_img) }}" style="width: 200px; height: auto" />
                                        @endif
                                    </td>
                                    <td>{{ $a->art_img_alt }}</td>
                                    <td>{{ $a->art_img_ord }}</td>
                                    <td>{!! html_entity_decode($a->art_descr) !!}</td>
                                    <td>{!! html_entity_decode($a->art_info) !!}</td>
                                    <td>
                                        <strong>Created At:</strong> {{ \Carbon\Carbon::parse($a->created_at)->format('d M Y H:i:s') }}
                                        <br />
                                        <strong>Updated At:</strong> {{ \Carbon\Carbon::parse($a->updated_at)->format('d M Y H:i:s') }}
                                    </td>
                                    <td class="status_class">
                                        @if($a->status == 'a')
                                            <a href="javascript:void(0)" class="btn btn-success btn-xs status_class" title='Status' onclick="change_status('{{ $a->id }}')">
                                                <i class="fa fa-check"></i>
                                            </a>
                                        @else
                                            <a href="javascript:void(0)" class="btn btn-danger btn-xs status_class" title='Status' onclick="change_status('{{ $a->id }}')">
                                                <i class="fa fa-check"></i>
                                            </a>
                                        @endif
                                        <a href="{{url('/admin/artists/'.$a->id)}}" class="btn btn-info btn-xs" title='Edit'>
                                            <i class="fa fa-pencil"></i>
                                        </a>
                                        <a href="javascript:void(0)" class="btn btn-danger btn-xs" title='Delete' data-toggle="modal" data-target="#delete_modal" onclick="artist_id = {{ $a->id }}">
                                            <i class="fa fa-trash-o"></i>
                                        </a>
                                        <a href="{{url('/admin/artists/upload-images/'.$a->id)}}" class="btn btn-primary btn-xs" title='Add Images'>
                                            <i class="fa fa-image"></i>
                                        </a>
                                    </td>
                                </tr>
                                @php $count++; @endphp
                            @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

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
                    <button class="btn btn-danger" data-dismiss="modal" onclick="delete_record(artist_id)">Yes</button>
                    <button class="btn btn-primary" data-dismiss="modal">No</button>
                </div>
            </div>
        </div>
    </div>

</section>
@endsection