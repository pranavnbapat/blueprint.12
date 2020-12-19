@extends('admin.layouts.app')

@section('content')
    <section class="content-header">
        <h1>Homepage</h1>
        <ol class="breadcrumb">
            <li class="active">
                <a href="#">
                    <i class="livicon" data-name="home" data-size="14" data-color="#333" data-hovercolor="#333"></i> Homepage
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
                            Add Homepage data
                        </h3>
                    </div>
                    <div class="panel-body">
                        <form class="form-horizontal" action="{{ url('/admin/homepage/insert') }}" method="post" id="homepage_form" name="homepage_form" enctype="multipart/form-data">
                            @csrf
                            <div class="form-group">
                                <label class="col-md-3 control-label" for="home_img">Image</label>
                                <div class="col-md-8">
                                    <div class="fileinput fileinput-new" data-provides="fileinput">
                                        <div class="fileinput-new thumbnail" style="width: 200px; height: 150px;"></div>
                                        <div class="fileinput-preview fileinput-exists thumbnail" style="max-width: 200px; max-height: 150px;"></div>
                                        <div>
                                            <span class="btn btn-default btn-file">
                                                <span class="fileinput-new">Select image</span>
                                                <span class="fileinput-exists">Change</span>
                                                <input type="file" name="home_img" id="home_img" required />
                                            </span>
                                            <a href="#" class="btn btn-default fileinput-exists" data-dismiss="fileinput">Remove</a>
                                        </div>
                                    </div>
                                </div>
                                @if($errors->has('home_img'))
                                    <small class="error">
                                        {{ $errors->first('home_img') }}
                                    </small>
                                @endif
                            </div>

                            <div class="form-group">
                                <label class="col-md-3 control-label" for="home_img_alt">Alt Text</label>
                                <div class="col-md-8">
                                    <input id="home_img_alt" name="home_img_alt" type="text" placeholder="Alt Text" class="form-control" maxlength="60" autocomplete value="{{ old('home_img_alt') }}" />
                                    @if($errors->has('home_img_alt'))
                                        <small class="error">
                                            {{ $errors->first('home_img_alt') }}
                                        </small>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-3 control-label" for="home_info">Homepage Info</label>
                                <div class="col-md-8">
                                    <textarea id="home_info" name="home_info"></textarea>
                                    @if($errors->has('home_info'))
                                        <small class="error">
                                            {{ $errors->first('home_info') }}
                                        </small>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-3 control-label" for="home_info_mob">Homepage Info (Mobile)</label>
                                <div class="col-md-8">
                                    <textarea id="home_info_mob" name="home_info_mob"></textarea>
                                    @if($errors->has('home_info_mob'))
                                        <small class="error">
                                            {{ $errors->first('home_info_mob') }}
                                        </small>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-3 control-label" for="img_ord">Image Order</label>
                                <div class="col-md-8">
                                    <input id="img_ord" name="img_ord" type="text" placeholder="2" class="form-control" maxlength="2" autocomplete value="{{ old('img_ord') }}" />
                                    @if($errors->has('img_ord'))
                                        <small class="error">
                                            {{ $errors->first('img_ord') }}
                                        </small>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-3 control-label" for="hyperlink">Hyperlink</label>
                                <div class="col-md-8">
                                    <select name="hyperlink" id="hyperlink" class="form-control">
                                        <option value="#">Please select hyperlink</option>
                                        @foreach($artists as $a)
                                        <option value="{{ url('artists/' . strtolower(str_replace(' ', '-', $a->artist_name))) }}">Artist - {{ $a->artist_name }}</option>
                                        @endforeach
                                        @foreach($exhibitions as $e)
                                            <option value="{{ url('exhibitions/' . strtolower(str_replace(' ', '-', $e->ex_name))) }}">Exhibition - {{ $e->ex_name }}</option>
                                        @endforeach
                                        @foreach($art_fairs as $af)
                                            <option value="{{ url('art-fairs/' . strtolower(str_replace(' ', '-', $af->af_name))) }}">Art Fairs - {{ $af->af_name }}</option>
                                        @endforeach
                                        @foreach($platforms as $pf)
                                            <option value="{{ url('platforms/' . strtolower(str_replace(' ', '-', $pf->pf_name))) }}">Platform - {{ $pf->pf_name }}</option>
                                        @endforeach
                                    </select>
                                    @if($errors->has('hyperlink'))
                                        <small class="error">
                                            {{ $errors->first('hyperlink') }}
                                        </small>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-3 control-label" for="submit"></label>
                                <div class="col-md-8">
                                    <button type="submit" id="add_homepage" name="add_homepage" class="btn btn-responsive btn-primary btn-sm">Submit</button>
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
                                Homepage data
                            </div>
                        </div>
                    </div>
                    <div class="panel-body">
                        <div class="panel-body table-responsive">
                            <table class="table table-striped table-bordered" id="homepage_table">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Image</th>
                                    <th>Alt</th>
                                    <th>Homepage Info</th>
                                    <th>Homepage Info (Mobile)</th>
                                    <th>Order</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                @php
                                    $count = 1;
                                @endphp
                                @foreach($home_images as $h)
                                    <tr id="{{ $h->id }}">
                                        <td>@php echo $count; @endphp</td>
                                        <td>
                                            <img src="{{ url('/img/homepage/'.$h->home_img) }}" style="width: 200px; height: auto" />
                                        </td>
                                        <td>
                                            {{ $h->home_img_alt }}
                                        </td>
                                        <td>{!! html_entity_decode($h->home_info) !!}</td>
                                        <td>{!! html_entity_decode($h->home_info_mob) !!}</td>
                                        <td>
                                            {{ $h->img_ord }}
                                        </td>
                                        <td>
                                            <strong>Created At:</strong> {{ \Carbon\Carbon::parse($h->created_at)->format('d M Y H:i:s') }}
                                            <br />
                                            <strong>Updated At:</strong> {{ \Carbon\Carbon::parse($h->updated_at)->format('d M Y H:i:s') }}
                                        </td>
                                        <td class="status_class">
                                            @if($h->status == 'a')
                                                <a href="javascript:void(0)" class="btn btn-success btn-xs status_class" title='Status' onclick="change_status('{{ $h->id }}')">
                                                    <i class="fa fa-check"></i>
                                                </a>
                                            @else
                                                <a href="javascript:void(0)" class="btn btn-danger btn-xs status_class" title='Status' onclick="change_status('{{ $h->id }}')">
                                                    <i class="fa fa-check"></i>
                                                </a>
                                            @endif
                                            <a href="{{url('/admin/homepage/'.$h->id)}}" class="btn btn-info btn-xs" title='Edit'>
                                                <i class="fa fa-pencil"></i>
                                            </a>
                                            <a href="javascript:void(0)" class="btn btn-danger btn-xs" title='Delete' data-toggle="modal" data-target="#delete_modal" onclick="homepage_id = {{ $h->id }}">
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
                        <button class="btn btn-danger" data-dismiss="modal" onclick="delete_record(homepage_id)">Yes</button>
                        <button class="btn btn-primary" data-dismiss="modal">No</button>
                    </div>
                </div>
            </div>
        </div>

    </section>
@endsection
