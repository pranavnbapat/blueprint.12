@extends('admin.layouts.app')

@section('content')
<section class="content-header">
    <h1>Exhibitions</h1>
    <ol class="breadcrumb">
        <li class="active">
            <a href="#">
                <i class="livicon" data-name="users" data-size="14" data-color="#333" data-hovercolor="#333"></i> Exhibitions
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
                        Add an exhibition
                    </h3>
                </div>
                <div class="panel-body">
                    <form class="form-horizontal" action="{{ url('/admin/exhibitions/insert') }}" method="post" id="exhibition_form" name="exhibition_form" enctype="multipart/form-data">
                        @csrf

                        <div class="form-group">
                            <label class="col-md-3 control-label" for="ex_year">Exhibition Year</label>
                            <div class="col-md-8">
                                <select required name="ex_year" id="ex_year" class="form-control">
                                    <option value="">Please select a year</option>
                                    <option value="2020">2020</option>
                                    <option value="2019">2019</option>
                                    <option value="2018">2018</option>
                                    <option value="2017">2017</option>
                                    <option value="2016">2016</option>
                                    <option value="2015">2015</option>
                                    <option value="2014">2014</option>
                                    <option value="2013">2013</option>
                                    <option value="2012">2012</option>
                                    <option value="2011">2011</option>
                                    <option value="2010">2010</option>
                                </select>
                                @if($errors->has('ex_year'))
                                    <small class="error">
                                        {{ $errors->first('ex_year') }}
                                    </small>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-3 control-label" for="ex_name">Exhibition Name</label>
                            <div class="col-md-8">
                                <input id="ex_name" name="ex_name" type="text" placeholder="Reading Room" class="form-control" maxlength="100" autocomplete value="{{ old('ex_name') }}" />
                                @if($errors->has('ex_name'))
                                    <small class="error">
                                        {{ $errors->first('ex_name') }}
                                    </small>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-3 control-label" for="ex_ft_img">Featured Image</label>
                            <div class="col-md-8">
                                <div class="fileinput fileinput-new" data-provides="fileinput">
                                    <div class="fileinput-new thumbnail" style="width: 200px; height: 150px;"></div>
                                    <div class="fileinput-preview fileinput-exists thumbnail" style="max-width: 200px; max-height: 150px;"></div>
                                    <div>
                                            <span class="btn btn-default btn-file">
                                                <span class="fileinput-new">Select image</span>
                                                <span class="fileinput-exists">Change</span>
                                                <input type="file" name="ex_ft_img" id="ex_ft_img" required />
                                            </span>
                                        <a href="#" class="btn btn-default fileinput-exists" data-dismiss="fileinput">Remove</a>
                                    </div>
                                </div>
                            </div>
                            @if($errors->has('ex_ft_img'))
                                <small class="error">
                                    {{ $errors->first('ex_ft_img') }}
                                </small>
                            @endif
                        </div>

                        <div class="form-group">
                            <label class="col-md-3 control-label" for="ex_ft_img_alt">Alt Text</label>
                            <div class="col-md-8">
                                <input id="ex_ft_img_alt" name="ex_ft_img_alt" type="text" placeholder="Alt Text" class="form-control" maxlength="60" autocomplete value="{{ old('ex_ft_img_alt') }}" />
                                @if($errors->has('ex_ft_img_alt'))
                                    <small class="error">
                                        {{ $errors->first('ex_ft_img_alt') }}
                                    </small>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-3 control-label" for="ex_ord">Exhibition Order</label>
                            <div class="col-md-8">
                                <input id="ex_ord" name="ex_ord" type="text" placeholder="2" class="form-control" maxlength="2" autocomplete value="{{ old('ex_ord') }}" required />
                                @if($errors->has('ex_ord'))
                                    <small class="error">
                                        {{ $errors->first('ex_ord') }}
                                    </small>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-3 control-label" for="ex_descr">Exhibition Description</label>
                            <div class="col-md-8">
                                <textarea id="ex_descr" name="ex_descr"></textarea>
                                @if($errors->has('ex_descr'))
                                    <small class="error">
                                        {{ $errors->first('ex_descr') }}
                                    </small>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-3 control-label" for="ex_info">Exhibition Info (right side)</label>
                            <div class="col-md-8">
                                <textarea id="ex_info" name="ex_info"></textarea>
                                @if($errors->has('ex_info'))
                                    <small class="error">
                                        {{ $errors->first('ex_info') }}
                                    </small>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-3 control-label" for="ex_cat_pdf">Exhibition Catalogue</label>
                            <div class="col-md-8">
                                <div class="fileinput fileinput-new input-group" data-provides="fileinput">
                                    <div class="form-control" data-trigger="fileinput">
                                        <i class="glyphicon glyphicon-file fileinput-exists"></i>
                                        <span class="fileinput-filename"></span>
                                    </div>
                                    <span class="input-group-addon btn btn-default btn-file">
                                        <span class="fileinput-new">Select file</span>
                                        <span class="fileinput-exists">Change</span>
                                        <input type="file" id="ex_cat_pdf" name="ex_cat_pdf">
                                    </span>
                                    <a href="#" class="input-group-addon btn btn-default fileinput-exists" data-dismiss="fileinput">Remove</a>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-3 control-label" for="submit"></label>
                            <div class="col-md-8">
                                <button type="submit" id="add_exhibition" name="add_exhibition" class="btn btn-responsive btn-primary btn-sm">Submit</button>
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
                            Exhibitions
                        </div>
                    </div>
                </div>
                <div class="panel-body">
                    <div class="panel-body table-responsive">
                        <table class="table table-striped table-bordered" id="exhibition_table">
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
                            @foreach($exhibitions as $a)
                                <tr id="{{ $a->id }}">
                                    <td>@php echo $count; @endphp</td>
                                    <td>{{ $a->ex_name }}</td>
                                    <td>
                                        @if($a->ex_ft_img)
                                        <img src="{{ url('/img/exhibitions/' . $a->ex_ft_img) }}" style="width: 200px; height: auto" />
                                        @endif
                                    </td>
                                    <td>{{ $a->ex_ft_img_alt }}</td>
                                    <td>{{ $a->ex_ord }}</td>
                                    <td>{!! html_entity_decode($a->ex_descr) !!}</td>
                                    <td>{!! html_entity_decode($a->ex_info) !!}</td>
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
                                        <a href="{{url('/admin/exhibitions/'.$a->id)}}" class="btn btn-info btn-xs" title='Edit'>
                                            <i class="fa fa-pencil"></i>
                                        </a>
                                        <a href="javascript:void(0)" class="btn btn-danger btn-xs" title='Delete' data-toggle="modal" data-target="#delete_modal" onclick="exhibition_id = {{ $a->id }}">
                                            <i class="fa fa-trash-o"></i>
                                        </a>
                                        <a href="{{url('/admin/exhibitions/upload-images/'.$a->id)}}" class="btn btn-primary btn-xs" title='Add Images'>
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
                    <button class="btn btn-danger" data-dismiss="modal" onclick="delete_record(exhibition_id)">Yes</button>
                    <button class="btn btn-primary" data-dismiss="modal">No</button>
                </div>
            </div>
        </div>
    </div>

</section>
@endsection
