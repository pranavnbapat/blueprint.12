@extends('admin.layouts.app')

@section('content')
    <section class="content-header">
        <h1>Artworks</h1>
        <ol class="breadcrumb">
            <li class="active">
                <a href="#">
                    <i class="livicon" data-name="users" data-size="14" data-color="#333" data-hovercolor="#333"></i> Artworks
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
                            Add artworks
                        </h3>
                    </div>
                    <div class="panel-body">
                        <form class="form-horizontal" action="{{ url('/admin/artworks/insert') }}" method="post" id="artworks_form" name="artworks_form">
                            @csrf

                            <div class="form-group">
                                <label class="col-md-3 control-label" for="artist_master_id">Artists</label>
                                <div class="col-md-8">
                                    <select id="artist_master_id" name="artist_master_id" class="form-control" required>
                                        <option value="">Please select an artist</option>
                                        @foreach($artists as $a)
                                            <option value="{{ $a->id }}">{{ $a->artist_name }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            {{--<div class="form-group">
                                <label class="col-md-3 control-label" for="artworks">Images</label>
                                <div class="col-md-8">
                                    <div class="input-group hdtuto control-group lst increment" >
                                        <input type="file" name="filenames[]" class="myfrm form-control">
                                        <div class="input-group-btn">
                                            <button class="btn btn-success add_image" type="button"><i class="fldemo glyphicon glyphicon-plus"></i>Add</button>
                                        </div>
                                    </div>
                                    <div class="clone hide">
                                        <div class="hdtuto control-group lst input-group" style="margin-top:10px">
                                            <input type="file" name="filenames[]" class="myfrm form-control">
                                            <div class="input-group-btn">
                                                <button class="btn btn-danger remove_image" type="button"><i class="fldemo glyphicon glyphicon-remove"></i> Remove</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>--}}
                            <div class="form-group">
                                <label class="col-md-3 control-label" for="artworks">Images</label>
                                <div class="col-md-8">
                                    <div id="uploader">
                                        <p>Your browser doesn't have Flash, Silverlight or HTML5 support.</p>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-3 control-label" for="submit"></label>
                                <div class="col-md-8">
                                    <button type="submit" id="add_artwork" name="add_artwork" class="btn btn-responsive btn-primary btn-sm">Submit</button>
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
                                Artworks
                            </div>
                        </div>
                    </div>
                    <div class="panel-body">
                        <div class="panel-body table-responsive">
                            <table class="table table-striped table-bordered" id="artworks_table">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Images</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
