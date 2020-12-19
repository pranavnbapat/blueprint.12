@extends('admin.layouts.app')

@section('content')
    <section class="content-header">
        <h1>Menu</h1>
        <ol class="breadcrumb">
            <li class="active">
                <a href="#">
                    <i class="livicon" data-name="list-ul" data-size="14" data-color="#333" data-hovercolor="#333"></i> Menu
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
                            Add Menu
                        </h3>
                    </div>
                    <div class="panel-body">
                        <form class="form-horizontal" action="{{ url('/admin/menu-management') }}" method="post" id="menu_form" name="menu_form">
                            @csrf
                            <div class="form-group">
                                <label class="col-md-3 control-label" for="name">Menu Name</label>
                                <div class="col-md-8">
                                    <input id="menu_name" name="menu_name" type="text" placeholder="Menu Name" class="form-control" maxlength="20" required autocomplete />
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-3 control-label" for="name">Menu Order</label>
                                <div class="col-md-8">
                                    <input id="menu_ord" name="menu_ord" type="text" placeholder="Menu Order" class="form-control" maxlength="2" required autocomplete />
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-3 control-label" for="submit"></label>
                                <div class="col-md-8">
                                    <button type="submit" id="add_menu" name="add_menu" class="btn btn-responsive btn-primary btn-sm">Submit</button>
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
                                Menu
                            </div>
                        </div>
                    </div>
                    <div class="panel-body">
                        <div class="panel-body table-responsive">
                            <table class="table table-striped table-bordered" id="menu_table">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Menu</th>
                                    <th>Order</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                    @php
                                        $count = 1;
                                    @endphp
                                    @foreach($menu as $m)
                                    <tr>
                                        <td>@php echo $count; @endphp</td>
                                        <td>
                                            <input type="text" class="form-control" id="menu_name_{{ $m->id }}" name="menu_name_{{ $m->id }}" value="{{ $m->menu_name }}" onchange="update('{{ $m->id }}')" />
                                        </td>
                                        <td>
                                            <input type="text" class="form-control" id="menu_ord_{{ $m->id }}" name="menu_ord_{{ $m->id }}" value="{{ $m->menu_ord }}" onchange="update('{{ $m->id }}')" />
                                        </td>
                                        <td>

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
    </section>
@endsection
