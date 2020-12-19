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
                    <form class="form-horizontal" action="{{ url('/admin/about/insert') }}" method="post" id="about_form" name="about_form" enctype="multipart/form-data">
                        @csrf

                        <div class="form-group">
                            <label class="col-md-3 control-label" for="about_img">Image</label>
                            <div class="col-md-8">
                                <div class="fileinput fileinput-new" data-provides="fileinput">
                                    <div class="fileinput-new thumbnail" style="width: 200px; height: 150px;"></div>
                                    <div class="fileinput-preview fileinput-exists thumbnail" style="max-width: 200px; max-height: 150px;"></div>
                                    <div>
                                            <span class="btn btn-default btn-file">
                                                <span class="fileinput-new">Select image</span>
                                                <span class="fileinput-exists">Change</span>
                                                <input type="file" name="about_img" id="about_img" required />
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
                                <input id="about_img_alt" name="about_img_alt" type="text" placeholder="Alt Text" class="form-control" maxlength="60" autocomplete value="{{ old('about_img_alt') }}" />
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
                                <textarea id="about_info" class="form-control" name="about_info" rows="10"></textarea>
                                @if($errors->has('about_info'))
                                    <small class="text-danger help-block">
                                        {{ $errors->first('about_info') }}
                                    </small>
                                @endif
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-3 control-label" for="submit"></label>
                            <div class="col-md-8">
                                <button type="submit" id="about_submit" name="about_submit" class="btn btn-responsive btn-primary btn-sm">Submit</button>
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
                            About
                        </div>
                    </div>
                </div>
                <div class="panel-body">
                    <div class="panel-body table-responsive">
                        <table class="table table-striped table-bordered" id="about_table">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>About Info</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            @php
                                $count = 1;
                            @endphp
                            @foreach($about as $a)
                                <tr id="{{ $a->id }}">
                                    <td>@php echo $count; @endphp</td>
                                    <td>
                                        @if($a->about_img)
                                            <img src="{{ url('img/about/' . $a->about_img) }}" style="width: 400px;" />
                                        @endif
                                    </td>
                                    <td>
                                        {!! html_entity_decode($a->about_info) !!}
                                    </td>
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
                                        <a href="{{url('/admin/about/'.$a->id)}}" class="btn btn-info btn-xs" title='Edit'>
                                            <i class="fa fa-pencil"></i>
                                        </a>
                                        <a href="javascript:void(0)" class="btn btn-danger btn-xs" title='Delete' data-toggle="modal" data-target="#delete_modal" onclick="about_id = {{ $a->id }}">
                                            <i class="fa fa-trash-o"></i>
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
                    <button class="btn btn-danger" data-dismiss="modal" onclick="delete_record(about_id)">Yes</button>
                    <button class="btn btn-primary" data-dismiss="modal">No</button>
                </div>
            </div>
        </div>
    </div>
</section>
@endsection
