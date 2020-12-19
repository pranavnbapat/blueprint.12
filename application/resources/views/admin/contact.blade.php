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
                        Add contact data
                    </h3>
                </div>
                <div class="panel-body">
                    <form class="form-horizontal" action="{{ url('/admin/contact/insert') }}" method="post" id="contact_form" name="contact_form">
                        @csrf

                        <div class="form-group">
                            <label class="col-md-3 control-label" for="contact_info">Contact Information</label>
                            <div class="col-md-8">
                                <textarea class="form-control" id="contact_info" name="contact_info">{{ old('contact_info') }}</textarea>
                                @if($errors->has('contact_info'))
                                    <small class="help-block col-md-6 col-md-offset-3">
                                        {{ $errors->first('contact_info') }}
                                    </small>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-3 control-label" for="submit"></label>
                            <div class="col-md-8">
                                <button type="submit" id="add_contact_info" name="add_contact_info" class="btn btn-responsive btn-primary btn-sm">Submit</button>
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
                            Contact
                        </div>
                    </div>
                </div>
                <div class="panel-body">
                    <div class="panel-body table-responsive">
                        <table class="table table-striped table-bordered" id="contact_table">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Contact Information</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            @php
                                $count = 1;
                            @endphp
                            @foreach($contact_master as $cm)
                                <tr id="{{ $cm->id }}">
                                    <td>@php echo $count; @endphp</td>
                                    <td>{!! html_entity_decode($cm->contact_info) !!}</td>
                                    <td>
                                        <strong>Created At:</strong> {{ \Carbon\Carbon::parse($cm->created_at)->format('d M Y H:i:s') }}
                                        <br />
                                        <strong>Updated At:</strong> {{ \Carbon\Carbon::parse($cm->updated_at)->format('d M Y H:i:s') }}
                                    </td>
                                    <td class="status_class">
                                        {{--@if($cm->status == 'a')
                                            <a href="javascript:void(0)" class="btn btn-success btn-xs status_class" title='Status' onclick="change_status('{{ $cm->id }}')">
                                                <i class="fa fa-check"></i>
                                            </a>
                                        @else
                                            <a href="javascript:void(0)" class="btn btn-danger btn-xs status_class" title='Status' onclick="change_status('{{ $cm->id }}')">
                                                <i class="fa fa-check"></i>
                                            </a>
                                        @endif--}}
                                        <a href="{{url('/admin/contact/'.$cm->id)}}" class="btn btn-info btn-xs" title='Edit'>
                                            <i class="fa fa-pencil"></i>
                                        </a>
                                        <a href="javascript:void(0)" class="btn btn-danger btn-xs" title='Delete' data-toggle="modal" data-target="#delete_modal" onclick="contact_id = {{ $cm->id }}">
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

        <div class="col-lg-12">
            <div class="panel panel-primary filterable">
                <div class="panel-heading clearfix">
                    <div class="panel-title pull-left">
                        <div class="caption">
                            Contact Leads
                        </div>
                    </div>
                </div>
                <div class="panel-body">
                    <div class="panel-body table-responsive">
                        <table class="table table-striped table-bordered" id="contact_leads_table">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>City</th>
                                <th>Date</th>
                            </tr>
                            </thead>
                            <tbody>
                            @php
                                $count = 1;
                            @endphp
                            @foreach($contact_leads as $cl)
                                <tr id="{{ $cl->id }}">
                                    <td>@php echo $count; @endphp</td>
                                    <td>{{ $cl->v_name }}</td>
                                    <td>{{ $cl->v_email }}</td>
                                    <td>{{ $cl->v_city }}</td>
                                    <td>
                                        <strong>Created At:</strong> {{ \Carbon\Carbon::parse($cl->created_at)->format('d M Y H:i:s') }}
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
                    <button class="btn btn-danger" data-dismiss="modal" onclick="delete_record(contact_id)">Yes</button>
                    <button class="btn btn-primary" data-dismiss="modal">No</button>
                </div>
            </div>
        </div>
    </div>
</section>
@endsection
