@extends('admin.layouts.app')

@section('content')
<section class="content-header">
    <h1>Art Fairs</h1>
    <ol class="breadcrumb">
        <li class="active">
            <a href="#">
                <i class="livicon" data-name="users" data-size="14" data-color="#333" data-hovercolor="#333"></i> Art Fairs
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
                        Edit an art fair
                    </h3>
                </div>
                <div class="panel-body">
                    <form class="form-horizontal" action="{{ url('/admin/art-fairs/update') }}" method="post" id="art_fair_form" name="art_fair_form" enctype="multipart/form-data">
                        @csrf

                        <div class="form-group">
                            <label class="col-md-3 control-label" for="af_year">Art Fair Year</label>
                            <div class="col-md-8">
                                <select required name="af_year" id="af_year" class="form-control">
                                    <option value="">Please select a year</option>
                                    @foreach($year as $y)
                                        @if($y->year == $art_fair->af_year)
                                            <option value="{{ $y->year }}" selected>{{ $y->year }}</option>
                                        @else
                                            <option value="{{ $y->year }}">{{ $y->year }}</option>
                                        @endif
                                    @endforeach
                                </select>
                                @if($errors->has('af_year'))
                                    <small class="error">
                                        {{ $errors->first('af_year') }}
                                    </small>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-3 control-label" for="af_name">Art Fair Name</label>
                            <div class="col-md-8">
                                <input id="af_name" name="af_name" type="text" placeholder="Reading Room" class="form-control" maxlength="100" autocomplete value="{{ $art_fair->af_name }}" />
                                @if($errors->has('af_name'))
                                    <small class="error">
                                        {{ $errors->first('af_name') }}
                                    </small>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-3 control-label" for="af_ft_img">Featured Image</label>
                            <div class="col-md-8">
                                <div class="fileinput fileinput-new" data-provides="fileinput">
                                    <div class="fileinput-new thumbnail" style="width: 200px; height: 150px;">
                                        <img src="{{ url('img/art_fairs/' . $art_fair->af_ft_img) }}" />
                                    </div>
                                    <div class="fileinput-preview fileinput-exists thumbnail" style="max-width: 200px; max-height: 150px;"></div>
                                    <div>
                                            <span class="btn btn-default btn-file">
                                                <span class="fileinput-new">Select image</span>
                                                <span class="fileinput-exists">Change</span>
                                                <input type="file" name="af_ft_img" id="af_ft_img" />
                                            </span>
                                        <a href="#" class="btn btn-default fileinput-exists" data-dismiss="fileinput">Remove</a>
                                    </div>
                                </div>
                            </div>
                            @if($errors->has('af_ft_img'))
                                <small class="error">
                                    {{ $errors->first('af_ft_img') }}
                                </small>
                            @endif
                        </div>

                        <div class="form-group">
                            <label class="col-md-3 control-label" for="af_ft_img_alt">Alt Text</label>
                            <div class="col-md-8">
                                <input id="af_ft_img_alt" name="af_ft_img_alt" type="text" placeholder="Alt Text" class="form-control" maxlength="60" autocomplete value="{{ $art_fair->af_ft_img_alt }}" />
                                @if($errors->has('af_ft_img_alt'))
                                    <small class="error">
                                        {{ $errors->first('af_ft_img_alt') }}
                                    </small>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-3 control-label" for="af_ord">Art Fair Order</label>
                            <div class="col-md-8">
                                <input id="af_ord" name="af_ord" type="text" placeholder="2" class="form-control" maxlength="2" autocomplete value="{{ $art_fair->af_ord }}" required />
                                @if($errors->has('af_ord'))
                                    <small class="error">
                                        {{ $errors->first('af_ord') }}
                                    </small>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-3 control-label" for="af_descr">Art Fair Description</label>
                            <div class="col-md-8">
                                <textarea id="af_descr" name="af_descr">{!! $art_fair->af_descr !!}</textarea>
                                @if($errors->has('af_descr'))
                                    <small class="error">
                                        {{ $errors->first('af_descr') }}
                                    </small>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-3 control-label" for="af_info">Art Fair Info (right side)</label>
                            <div class="col-md-8">
                                <textarea id="af_info" name="af_info">{!! $art_fair->af_info !!}</textarea>
                                @if($errors->has('af_info'))
                                    <small class="error">
                                        {{ $errors->first('af_info') }}
                                    </small>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-3 control-label" for="af_cat_pdf">Art Fair Catalogue</label>
                            <div class="col-md-8">
                                <div class="fileinput fileinput-new input-group" data-provides="fileinput">
                                    <div class="form-control" data-trigger="fileinput">
                                        <i class="glyphicon glyphicon-file fileinput-exists"></i>
                                        <span class="fileinput-filename">{{ $art_fair->af_cat_pdf }}</span>
                                    </div>
                                    <span class="input-group-addon btn btn-default btn-file">
                                        <span class="fileinput-new">Select file</span>
                                        <span class="fileinput-exists">Change</span>
                                        <input type="file" id="af_cat_pdf" name="af_cat_pdf" />
                                    </span>
                                    <a href="#" class="input-group-addon btn btn-default fileinput-exists" data-dismiss="fileinput">Remove</a>
                                </div>
                            </div>
                        </div>

                        <input type="hidden" value="{{ $art_fair->id }}" id="row_id" name="row_id" />

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
@endsection
