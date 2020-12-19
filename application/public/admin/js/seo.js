var seo_id = ''

$("#seo_form").bootstrapValidator({
    fields: {
        page_route: {
            validators: {
                notEmpty: {
                    message: 'Please fill out this field'
                }
            }
        },
        title: {
            validators: {
                stringLength: {
                    message: 'Please enter no more than 60 characters',
                    max: function (value, validator, $field) {
                        return 60 - (value.match(/\r/g) || []).length;
                    }
                },
                regexp: {
                    regexp: /^[a-zA-Z0-9-'",.?/()&%!\s]+$/i,
                    message: 'Invalid characters entered'
                }
            }
        },
        keywords: {
            validators: {
                regexp: {
                    regexp: /^[a-zA-Z0-9-'",.?/()&%!\s]+$/i,
                    message: 'Invalid characters entered'
                },
                stringLength: {
                    message: 'Please enter no more than 500 characters',
                    max: function (value, validator, $field) {
                        return 500 - (value.match(/\r/g) || []).length;
                    }
                },
            }
        },
        description: {
            validators: {
                /*notEmpty: {
                    message: 'Please fill out this field'
                },*/
                regexp: {
                    regexp: /^[a-zA-Z0-9-'",.?/()&%!\s]+$/i,
                    message: 'Invalid characters entered'
                },
                stringLength: {
                    message: 'Please enter no more than 160 characters',
                    max: function (value, validator, $field) {
                        return 160 - (value.match(/\r/g) || []).length;
                    }
                },
            }
        }
    }
});

var seo_table = $('#seo_table').DataTable({
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
        data: {keyword: 'seo', id: id}
    }).success(function(resp) {
        if(resp == 0) {
            if($("#seo_table tr#"+id+" td a.status_class").hasClass('btn-success')) {
                $("#seo_table tr#"+id+" td a.status_class").removeClass('btn-success').addClass('btn-danger');
                Command: toastr['error']("Inactive", "Success")
            } else {
                $("#seo_table tr#"+id+" td a.status_class").removeClass('btn-danger').addClass('btn-success');
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
        data: {keyword: 'seo', id: id}
    }).success(function (resp) {
        if(resp == 0) {
            $("#seo_table tr#"+id).remove();
            Command: toastr['success']("Record deleted.", "Success")
        } else {
            Command: toastr['error']("Something went wrong.", "Error")
        }
    });
}

$("#cancel").click(function () {
    window.history.back();
});
