@extends('admin.layouts.app')

@section('content')
    <section class="content-header">
        <h1>SEO</h1>
        <ol class="breadcrumb">
            <li class="active">
                <a href="#">
                    <i class="livicon" data-name="list-ul" data-size="14" data-color="#333" data-hovercolor="#333"></i> SEO
                </a>
            </li>
        </ol>
    </section>
    <section class="content">
        <div class="row ">
            <div class="col-md-6">
                <div class="panel panel-primary">
                    <div class="panel-heading">
                        <h3 class="panel-title">
                            Add SEO data
                        </h3>
                    </div>
                    <div class="panel-body">
                        <form class="form-horizontal" action="{{ url('/admin/seo/insert') }}" method="post" id="seo_form" name="seo_form">
                            @csrf
                            <div class="form-group">
                                <label class="col-md-3 control-label" for="page_route">Page</label>
                                <div class="col-md-8">
                                    <select id="page_route" name="page_route" class="form-control" required>
                                        <option value="">Please select a page</option>
                                        @foreach($page_routes as $p)
                                            <option value="{{ strtolower(str_replace(' ', '-', $p->menu_name)) }}">{{ $p->menu_name }}</option>
                                        @endforeach
                                        @foreach($artists as $a)
                                            <option value="artists/{{ strtolower(str_replace(' ', '-', $a->artist_name)) }}">Artist - {{ $a->artist_name }}</option>
                                        @endforeach
                                        @foreach($exhibitions as $e)
                                            <option value="exhibitions/{{ strtolower(str_replace(' ', '-', $e->ex_name)) }}">Exhibitions - {{ $e->ex_name }}</option>
                                        @endforeach
                                        @foreach($art_fairs as $af)
                                            <option value="art-fairs/{{ strtolower(str_replace(' ', '-', $af->af_name)) }}">Art Fairs - {{ $af->af_name }}</option>
                                        @endforeach
                                        @foreach($platforms as $pf)
                                            <option value="platforms/{{ strtolower(str_replace(' ', '-', $pf->pf_name)) }}">Platforms - {{ $pf->pf_name }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-3 control-label" for="title">Title</label>
                                <div class="col-md-8">
                                    <input id="title" name="title" type="text" placeholder="Title" class="form-control" maxlength="60" autocomplete value="{{ old('title') }}" />
                                    @if($errors->has('title'))
                                        <small class="help-block col-md-6 col-md-offset-3">
                                            {{ $errors->first('title') }}
                                        </small>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-3 control-label" for="keywords">Keywords</label>
                                <div class="col-md-8">
                                    <input id="keywords" name="keywords" type="text" placeholder="Keywords" class="form-control" maxlength="500" autocomplete value="{{ old('keywords') }}" />
                                    @if($errors->has('keywords'))
                                        <small class="help-block col-md-6 col-md-offset-3">
                                            {{ $errors->first('keywords') }}
                                        </small>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-3 control-label" for="description">Description</label>
                                <div class="col-md-8">
                                    <input id="description" name="description" type="text" placeholder="Description" class="form-control" maxlength="160" autocomplete value="{{ old('description') }}" />
                                    @if($errors->has('description'))
                                        <small class="help-block col-md-6 col-md-offset-3">
                                            {{ $errors->first('description') }}
                                        </small>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-3 control-label" for="submit"></label>
                                <div class="col-md-8">
                                    <button type="submit" id="add_seo" name="add_seo" class="btn btn-responsive btn-primary btn-sm">Submit</button>
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
                                SEO data
                            </div>
                        </div>
                    </div>
                    <div class="panel-body">
                        <div class="panel-body table-responsive">
                            <table class="table table-striped table-bordered" id="seo_table">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Page</th>
                                    <th>Title</th>
                                    <th>Keywords</th>
                                    <th>Description</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                @php
                                    $count = 1;
                                @endphp
                                @foreach($seo as $s)
                                    <tr id="{{ $s->id }}">
                                        <td>@php echo $count; @endphp</td>
                                        <td>
                                            {{ $s->page_route }}
                                        </td>
                                        <td>
                                            {{ $s->title }}
                                        </td>
                                        <td>
                                            {{ $s->keywords }}
                                        </td>
                                        <td>
                                            {{ $s->description }}
                                        </td>
                                        <td>
                                            <strong>Created At:</strong> {{ \Carbon\Carbon::parse($s->created_at)->format('d M Y H:i:s') }}
                                            <br />
                                            <strong>Updated At:</strong> {{ \Carbon\Carbon::parse($s->updated_at)->format('d M Y H:i:s') }}
                                        </td>
                                        <td class="status_class">
                                            @if($s->status == 'a')
{{--                                                <span class="label label-sm label-success" style="cursor: pointer;" onclick="change_status('{{ $s->id }}')">Active</span>--}}
                                                <a href="javascript:void(0)" class="btn btn-success btn-xs status_class" title='Status' onclick="change_status('{{ $s->id }}')">
                                                    <i class="fa fa-check"></i>
                                                </a>
                                            @else
{{--                                                <span class="label label-sm label-danger" style="cursor: pointer;" onclick="change_status('{{ $s->id }}')">Inactive</span>--}}
                                                <a href="javascript:void(0)" class="btn btn-danger btn-xs status_class" title='Status' onclick="change_status('{{ $s->id }}')">
                                                    <i class="fa fa-check"></i>
                                                </a>
                                            @endif
                                            <a href="{{url('/admin/seo/'.$s->id)}}" class="btn btn-info btn-xs" title='Edit'>
                                                <i class="fa fa-pencil"></i>
                                            </a>
                                            <a href="javascript:void(0)" class="btn btn-danger btn-xs" title='Delete' data-toggle="modal" data-target="#delete_modal" onclick="seo_id = {{ $s->id }}">
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
                        <button class="btn btn-danger" data-dismiss="modal" onclick="delete_record(seo_id)">Yes</button>
                        <button class="btn btn-primary" data-dismiss="modal">No</button>
                    </div>
                </div>
            </div>
        </div>

    </section>
@endsection
