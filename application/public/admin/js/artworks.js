var artwork_id = ''

$("#artworks_form").bootstrapValidator({
    fields: {
        artist_master_id: {
            validators: {
                notEmpty: {
                    message: 'Please fill out this field'
                },
            }
        }
    }
});

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

var artworks_table = $('#artworks_table').DataTable({
    "responsive":true
});

function change_status(id) {
    $.ajax({
        type: 'post',
        url: '/admin/change_status',
        data: {keyword: 'artwork', id: id}
    }).success(function(resp) {
        if(resp == 0) {
            if($("#artworks_table tr#"+id+" td a.status_class").hasClass('btn-success')) {
                $("#artworks_table tr#"+id+" td a.status_class").removeClass('btn-success').addClass('btn-danger');
                Command: toastr['success']("Inactive", "Success")
            } else {
                $("#artworks_table tr#"+id+" td a.status_class").removeClass('btn-danger').addClass('btn-success');
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
        data: {keyword: 'artwork', id: id}
    }).success(function (resp) {
        if(resp == 0) {
            $("#artworks_table tr#"+id).remove();
            Command: toastr['success']("Record deleted.", "Success")
        } else {
            Command: toastr['error']("Something went wrong.", "Error")
        }
    });
}

$("#cancel").click(function () {
    window.history.back();
});
