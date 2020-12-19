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
                        Add a platform
                    </h3>
                </div>
                <div class="panel-body">
                    <form class="form-horizontal" action="{{ url('/admin/platform/insert') }}" method="post" id="platform_form" name="platform_form" enctype="multipart/form-data">
                        @csrf

                        <div class="form-group">
                            <label class="col-md-3 control-label" for="pf_art_name">Platform Artist</label>
                            <div class="col-md-8">
                                <input id="pf_art_name" name="pf_art_name" type="text" placeholder="" class="form-control" maxlength="50" autocomplete value="{{ old('pf_art_name') }}" />
                                @if($errors->has('pf_art_name'))
                                    <small class="error">
                                        {{ $errors->first('pf_art_name') }}
                                    </small>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-3 control-label" for="pf_ft_img">Image</label>
                            <div class="col-md-8">
                                <div class="fileinput fileinput-new" data-provides="fileinput">
                                    <div class="fileinput-new thumbnail" style="width: 200px; height: 150px;"></div>
                                    <div class="fileinput-preview fileinput-exists thumbnail" style="max-width: 200px; max-height: 150px;"></div>
                                    <div>
                                            <span class="btn btn-default btn-file">
                                                <span class="fileinput-new">Select image</span>
                                                <span class="fileinput-exists">Change</span>
                                                <input type="file" name="pf_ft_img" id="pf_ft_img" required />
                                            </span>
                                        <a href="#" class="btn btn-default fileinput-exists" data-dismiss="fileinput">Remove</a>
                                    </div>
                                </div>
                            </div>
                            @if($errors->has('pf_ft_img'))
                                <small class="error col-md-6 col-md-offset-3">
                                    {{ $errors->first('pf_ft_img') }}
                                </small>
                            @endif
                        </div>

                        <div class="form-group">
                            <label class="col-md-3 control-label" for="pf_ft_img_alt">Alt Text</label>
                            <div class="col-md-8">
                                <input id="pf_ft_img_alt" name="pf_ft_img_alt" type="text" placeholder="Alt Text" class="form-control" maxlength="60" autocomplete value="{{ old('pf_ft_img_alt') }}" />
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
                                <input id="pf_img_ord" name="pf_img_ord" type="text" placeholder="2" class="form-control" maxlength="2" autocomplete value="{{ old('pf_img_ord') }}" required />
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
                                <textarea id="pf_descr" name="pf_descr"></textarea>
                                @if($errors->has('pf_descr'))
                                    <small class="error">
                                        {{ $errors->first('pf_descr') }}
                                    </small>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-3 control-label" for="submit"></label>
                            <div class="col-md-8">
                                <button type="submit" id="add_platform" name="add_platform" class="btn btn-responsive btn-primary btn-sm">Submit</button>
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
                            Platform
                        </div>
                    </div>
                </div>
                <div class="panel-body">
                    <div class="panel-body table-responsive">
                        <table class="table table-striped table-bordered" id="platform_table">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Image</th>
                                <th>Alt Text</th>
                                <th>Order</th>
                                <th>Description</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            @php
                                $count = 1;
                            @endphp
                            @foreach($platform as $p)
                                <tr id="{{ $p->id }}">
                                    <td>@php echo $count; @endphp</td>
                                    <td>{{ $p->pf_art_name }}</td>
                                    <td>
                                        @if($p->pf_ft_img)
                                        <img src="{{ url('/img/platform/' . $p->pf_ft_img) }}" style="width: 200px; height: auto" />
                                        @endif
                                    </td>
                                    <td>{{ $p->pf_ft_img_alt }}</td>
                                    <td>{{ $p->pf_img_ord }}</td>
                                    <td>{!! html_entity_decode($p->pf_descr) !!}</td>
                                    <td>
                                        <strong>Created At:</strong> {{ \Carbon\Carbon::parse($p->created_at)->format('d M Y H:i:s') }}
                                        <br />
                                        <strong>Updated At:</strong> {{ \Carbon\Carbon::parse($p->updated_at)->format('d M Y H:i:s') }}
                                    </td>
                                    <td class="status_class">
                                        @if($p->status == 'a')
                                            <a href="javascript:void(0)" class="btn btn-success btn-xs status_class" title='Status' onclick="change_status('{{ $p->id }}')">
                                                <i class="fa fa-check"></i>
                                            </a>
                                        @else
                                            <a href="javascript:void(0)" class="btn btn-danger btn-xs status_class" title='Status' onclick="change_status('{{ $p->id }}')">
                                                <i class="fa fa-check"></i>
                                            </a>
                                        @endif
                                        <a href="{{url('/admin/platform/'.$p->id)}}" class="btn btn-info btn-xs" title='Edit'>
                                            <i class="fa fa-pencil"></i>
                                        </a>
                                        <a href="javascript:void(0)" class="btn btn-danger btn-xs" title='Delete' data-toggle="modal" data-target="#delete_modal" onclick="pf_id = {{ $p->id }}">
                                            <i class="fa fa-trash-o"></i>
                                        </a>
                                        <a href="{{url('/admin/platform/upload-images/'.$p->id)}}" class="btn btn-primary btn-xs" title='Add Images'>
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
                    <button class="btn btn-danger" data-dismiss="modal" onclick="delete_record(pf_id)">Yes</button>
                    <button class="btn btn-primary" data-dismiss="modal">No</button>
                </div>
            </div>
        </div>
    </div>

</section>
@endsection
