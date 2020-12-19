CKEDITOR.replace('contact_info')

$("#contact_form").bootstrapValidator({
    fields: {
        contact_info: {
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

var contact_table = $('#contact_table').DataTable({
    "responsive":true
});
var contact_leads_table = $('#contact_leads_table').DataTable({
    "responsive":true
});

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

function delete_record(id) {
    $.ajax({
        type: 'post',
        url: '/admin/delete',
        data: {keyword: 'contact', id: id}
    }).success(function (resp) {
        if(resp == 0) {
            $("#contact_table tr#"+id).remove();
            Command: toastr['success']("Record deleted.", "Success")
        } else {
            Command: toastr['error']("Something went wrong.", "Error")
        }
    });
}

$("#cancel").click(function () {
    window.history.back();
});
