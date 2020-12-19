@extends('admin.layouts.app')

@section('content')
<section class="content-header">
    <h1>Contact</h1>
    <ol class="breadcrumb">
        <li class="active">
            <a href="#">
                <i class="livicon" data-name="ul-list" data-size="14" data-color="#333" data-hovercolor="#333"></i> Contact
            </a>
        </li>
    </ol>
</section>
<section class="content">
    <div class="row ">

        <div class="col-lg-12">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <h3 class="panel-title">
                        Update contact data
                    </h3>
                </div>
                <div class="panel-body">
                    <form class="form-horizontal" action="{{ url('/admin/contact/update') }}" method="post" id="contact_form" name="contact_form">
                        @csrf

                        <div class="form-group">
                            <label class="col-md-3 control-label" for="contact_info">Contact Information</label>
                            <div class="col-md-8">
                                <textarea class="form-control" id="contact_info" name="contact_info">{!! html_entity_decode($contact_master->contact_info) !!}</textarea>
                                @if($errors->has('contact_info'))
                                    <small class="help-block col-md-6 col-md-offset-3">
                                        {{ $errors->first('contact_info') }}
                                    </small>
                                @endif
                            </div>
                        </div>

                        <input type="hidden" value="{{ $contact_master->id }}" id="row_id" name="row_id" />

                        <div class="form-group">
                            <label class="col-md-3 control-label" for="submit"></label>
                            <div class="col-md-8">
                                <button type="submit" id="update_contact_info" name="update_contact_info" class="btn btn-responsive btn-primary btn-sm">Submit</button>
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
