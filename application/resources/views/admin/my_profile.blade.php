@extends('admin.layouts.app')

@section('content')
    <section class="content-header">
        <!--section starts-->
        <h1>User Profile</h1>
        <ol class="breadcrumb">
            <li>
                <a href="/admin/dashboard">
                    <i class="livicon" data-name="home" data-size="14" data-loop="true"></i> Dashboard
                </a>
            </li>
            <li>
                <a href="#">User</a>
            </li>
            <li class="active">User Profile</li>
        </ol>
    </section>

    <section class="content">
        <div class="row">
            <div class="col-lg-12">
                <ul class="nav  nav-tabs ">
                    <li class="active">
                        <a href="#tab1" data-toggle="tab">
                            <i class="livicon" data-name="user" data-size="16" data-c="#000" data-hc="#000" data-loop="true"></i> User Profile</a>
                    </li>
                    <li>
                        <a href="#tab2" data-toggle="tab">
                            <i class="livicon" data-name="key" data-size="16" data-loop="true" data-c="#000" data-hc="#000"></i> Change Password</a>
                    </li>
                </ul>
                <div class="tab-content mar-top">
                    <div id="tab1" class="tab-pane fade active in">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="panel">
                                    <div class="panel-heading">
                                        <h3 class="panel-title">
                                            {{--                                            User Profile--}}
                                        </h3>
                                    </div>
                                    <div class="panel-body">
                                        <form class="form-horizontal" id="my_profile_form" name="my_profile_form" enctype="multipart/form-data" method="post" action="{{ url('/admin/my-profile/change-profile-photo') }}">
                                            @csrf
                                            <div class="col-md-4">
                                                <div class="text-center">
                                                    <div class="fileinput fileinput-new" data-provides="fileinput">
                                                        <div class="fileinput-new thumbnail img-file">
                                                            @if(Auth::user()->profile_photo)
                                                                <img src="{{ url('admin/img/user_profile_photo') . '/' . Auth::user()->profile_photo }}" width="200" class="img-responsive" height="150" alt="">
                                                            @else
                                                                <img src="img/authors/avatar3.jpg" width="200" class="img-responsive" height="150" alt="">
                                                            @endif
                                                        </div>
                                                        <div class="fileinput-preview fileinput-exists thumbnail img-max">
                                                        </div>
                                                        <div>
                                                            <span class="btn btn-default btn-file ">
                                                                <span class="fileinput-new">Select image</span>
                                                                <span class="fileinput-exists">Change</span>
                                                                <input type="file" name="user_profile_photo" id="user_profile_photo" />
                                                            </span>
                                                            <a href="#" class="btn btn-default fileinput-exists" data-dismiss="fileinput">Remove</a>
                                                        </div>
                                                        @if($errors->has('user_profile_photo'))
                                                            <small class="col-md-6-offset text-danger">
                                                                {{ $errors->first('user_profile_photo') }}
                                                            </small>
                                                        @endif
                                                    </div>
                                                </div>
                                                <div class="text-center">
                                                    <input type="submit" class="form-control btn btn-default" name="submit" id="submit" value="Submit" />
                                                </div>
                                            </div>
                                        </form>
                                        <div class="col-md-8">
                                            <div class="panel-body">
                                                <div class="table-responsive">
                                                    <table class="table table-bordered table-striped" id="users">
                                                        <tr>
                                                            <td>Name</td>
                                                            <td>
                                                                <a href="#" data-pk="1" class="editable" data-title="Edit User Name">{{ Auth::user()->fname }}</a>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>E-mail</td>
                                                            <td>
                                                                <a href="#" data-pk="1" class="editable" data-title="Edit E-mail">{{ Auth::user()->email }}</a>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Phone Number</td>
                                                            <td>
                                                                <a href="#" data-pk="1" class="editable" data-title="Edit Phone Number">{{ Auth::user()->mobile }}</a>
                                                            </td>
                                                        </tr>
                                                        {{--<tr>
                                                            <td>Address</td>
                                                            <td>
                                                                <a href="#" data-pk="1" class="editable" data-title="Edit Address">Sydney, Australia</a>
                                                            </td>
                                                        </tr>--}}
                                                        <tr>
                                                            <td>Created At</td>
                                                            <td>
                                                                {{ Auth::user()->created_at->format('d M Y H:i:s') }}
                                                            </td>
                                                        </tr>
                                                        {{--                                                        <tr>
                                                                                                                    <td>City</td>
                                                                                                                    <td>
                                                                                                                        <a href="#" data-pk="1" class="editable" data-title="Edit City">Nakia</a>
                                                                                                                    </td>
                                                                                                                </tr>--}}
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="tab2" class="tab-pane fade">
                        <div class="row">
                            <div class="col-md-12 pd-top">
                                <form action="{{ url('/admin/my-profile/change-password') }}" method="post" id="user_profile_password_form" name="user_profile_password_form" class="form-horizontal">
                                    @csrf
                                    <div class="form-body">
                                        <div class="form-group">
                                            <label for="curr_pass" class="col-md-3 control-label">Current Password<span class='require'>*</span></label>
                                            <div class="col-md-9">
                                                <div class="input-group">
                                                    <input type="password" id="curr_pass" name="curr_pass" placeholder="Current Password" class="form-control" required autofocus autocomplete="curr_pass" />
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <label for="password" class="col-md-3 control-label">Password<span class='require'>*</span></label>
                                            <div class="col-md-9">
                                                <div class="input-group">
                                                    <input type="password" id="password" name="password" placeholder="Password" class="form-control" required />
                                                    @if($errors->has('password'))
                                                        <small class="col-md-6 text-danger">
                                                            {{ $errors->first('password') }}
                                                        </small>
                                                    @endif
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-group">
                                            <label for="password_confirmation" class="col-md-3 control-label">Confirm Password<span class='require'>*</span></label>
                                            <div class="col-md-9">
                                                <div class="input-group">
                                                    <input type="password" id="password_confirmation" name="password_confirmation" placeholder="Confirm Password" class="form-control" required />
                                                    @if($errors->has('password_confirmation'))
                                                        <small class="col-md-6 text-danger">
                                                            {{ $errors->first('password_confirmation') }}
                                                        </small>
                                                    @endif
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-actions">
                                        <div class="col-md-offset-3 col-md-9">
                                            <button type="submit" class="btn btn-primary">Submit</button>
                                            &nbsp;
                                            <input type="reset" class="btn btn-default hidden-xs" value="Reset">
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
