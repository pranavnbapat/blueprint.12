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
                        Edit an exhibition
                    </h3>
                </div>
                <div class="panel-body">
                    <form class="form-horizontal" action="{{ url('/admin/exhibitions/update') }}" method="post" id="exhibition_form" name="exhibition_form" enctype="multipart/form-data">
                        @csrf

                        <div class="form-group">
                            <label class="col-md-3 control-label" for="ex_year">Exhibition Year</label>
                            <div class="col-md-8">
                                <select required name="ex_year" id="ex_year" class="form-control">
                                    <option value="">Please select a year</option>
                                    @foreach($year as $y)
                                        @if($y->year == $exhibition->ex_year)
                                            <option value="{{ $y->year }}" selected>{{ $y->year }}</option>
                                        @else
                                            <option value="{{ $y->year }}">{{ $y->year }}</option>
                                        @endif
                                    @endforeach
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
                                <input id="ex_name" name="ex_name" type="text" placeholder="Reading Room" class="form-control" maxlength="100" autocomplete value="{{ $exhibition->ex_name }}" />
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
                                    <div class="fileinput-new thumbnail" style="width: 200px; height: 150px;">
                                        <img src="{{ url('img/exhibitions/' . $exhibition->ex_ft_img) }}" />
                                    </div>
                                    <div class="fileinput-preview fileinput-exists thumbnail" style="max-width: 200px; max-height: 150px;"></div>
                                    <div>
                                            <span class="btn btn-default btn-file">
                                                <span class="fileinput-new">Select image</span>
                                                <span class="fileinput-exists">Change</span>
                                                <input type="file" name="ex_ft_img" id="ex_ft_img" />
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
                                <input id="ex_ft_img_alt" name="ex_ft_img_alt" type="text" placeholder="Alt Text" class="form-control" maxlength="60" autocomplete value="{{ $exhibition->ex_ft_img_alt }}" />
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
                                <input id="ex_ord" name="ex_ord" type="text" placeholder="2" class="form-control" maxlength="2" autocomplete value="{{ $exhibition->ex_ord }}" required />
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
                                <textarea id="ex_descr" name="ex_descr">{!! $exhibition->ex_descr !!}</textarea>
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
                                <textarea id="ex_info" name="ex_info">{!! $exhibition->ex_info !!}</textarea>
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
                                        <span class="fileinput-filename">{{ $exhibition->ex_cat_pdf }}</span>
                                    </div>
                                    <span class="input-group-addon btn btn-default btn-file">
                                        <span class="fileinput-new">Select file</span>
                                        <span class="fileinput-exists">Change</span>
                                        <input type="file" id="ex_cat_pdf" name="ex_cat_pdf" />
                                    </span>
                                    <a href="#" class="input-group-addon btn btn-default fileinput-exists" data-dismiss="fileinput">Remove</a>
                                </div>
                            </div>
                        </div>

                        <input type="hidden" value="{{ $exhibition->id }}" id="row_id" name="row_id" />

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
@endsection
