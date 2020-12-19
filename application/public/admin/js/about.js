var about_id = ''

$("#about_form").bootstrapValidator({
    fields: {
        about: {
            validators: {
                notEmpty: {
                    message: 'Please fill out this field'
                },
                stringLength: {
                    message: 'Please enter no more than 5000 characters',
                    max: function (value, validator, $field) {
                        return 5000 - (value.match(/\r/g) || []).length;
                    }
                }
            }
        }
    }
});

var about_table = $('#about_table').DataTable({
    "responsive":true
});

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

function change_status(id) {
    $.ajax({
        type: 'post',
        url: '/admin/change_status',
        data: {keyword: 'about', id: id}
    }).success(function(resp) {
        if(resp == 0) {
            if($("#about_table tr#"+id+" td a.status_class").hasClass('btn-success')) {
                $("#about_table tr#"+id+" td a.status_class").removeClass('btn-success').addClass('btn-danger');
                Command: toastr['error']("Inactive", "Success")
            } else {
                $("#about_table tr#"+id+" td a.status_class").removeClass('btn-danger').addClass('btn-success');
                Command: toastr['success']("Active", "Success")
            }
        } else {
            Command: toastr['error']("Something went wrong.", "Error")
        }
    });
}

function delete_record(id) {
    $.ajax({
        type: 'post',
        url: '/admin/delete',
        data: {keyword: 'about', id: id}
    }).success(function (resp) {
        if(resp == 0) {
            $("#about_table tr#"+id).remove();
            Command: toastr['success']("Record deleted.", "Success")
        } else {
            Command: toastr['error']("Something went wrong.", "Error")
        }
    });
}

$("#cancel").click(function () {
    window.history.back();
});
