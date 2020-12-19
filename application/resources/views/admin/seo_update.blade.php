@extends('admin.layouts.app')

@section('content')
    <section class="content-header">
        <h1>SEO</h1>
        <ol class="breadcrumb">
            <li class="active">
                <a href="#">
                    <i class="livicon" data-name="home" data-size="14" data-color="#333" data-hovercolor="#333"></i> SEO
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
                            Update SEO data
                        </h3>
                    </div>
                    <div class="panel-body">
                        <form class="form-horizontal" action="{{ url('/admin/seo/update') }}" method="post" id="seo_form" name="seo_form">
                            @csrf
                            <div class="form-group">
                                <label class="col-md-3 control-label" for="page">Page</label>
                                <div class="col-md-8">
                                    <input id="page_route" name="page_route" type="text" placeholder="Page Route" class="form-control" maxlength="60" autocomplete value="{{ $seo[0]->page_route }}" readonly />
                                    @if($errors->has('title'))
                                        <small class="help-block col-md-6 col-md-offset-3">
                                            {{ $errors->first('title') }}
                                        </small>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-3 control-label" for="title">Title</label>
                                <div class="col-md-8">
                                    <input id="title" name="title" type="text" placeholder="Title" class="form-control" maxlength="60" autocomplete autofocus value="{{ $seo[0]->title }}" />
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
                                    <input id="keywords" name="keywords" type="text" placeholder="Keywords" class="form-control" maxlength="500" autocomplete value="{{ $seo[0]->keywords }}" />
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
                                    <input id="description" name="description" type="text" placeholder="Description" class="form-control" maxlength="160" autocomplete value="{{ $seo[0]->description }}" />
                                    @if($errors->has('description'))
                                        <small class="help-block col-md-6 col-md-offset-3">
                                            {{ $errors->first('description') }}
                                        </small>
                                    @endif
                                </div>
                            </div>

                            <input type="hidden" value="{{ $seo[0]->id }}" id="row_id" name="row_id" />

                            <div class="form-group">
                                <label class="col-md-3 control-label" for="submit"></label>
                                <div class="col-md-8">
                                    <button type="submit" id="add_seo" name="add_seo" class="btn btn-responsive btn-primary btn-sm">Update</button>
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
