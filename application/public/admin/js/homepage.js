var homepage_id = ''

$("#homepage_form").bootstrapValidator({
    fields: {
        home_img_alt: {
            validators: {
                stringLength: {
                    message: 'Please enter no more than 100 characters',
                    max: function (value, validator, $field) {
                        return 100 - (value.match(/\r/g) || []).length;
                    }
                },
                regexp: {
                    regexp: /^[a-zA-Z0-9-'",.?/()&%!\s]+$/i,
                    message: 'Invalid characters entered'
                }
            }
        },
        home_img: {
            validators: {
                file: {
                    extension: 'jpeg,png,jpg',
                    type: 'image/jpeg,image/png,image/jpg',
                    maxSize: 5184 * 3456,
                    message: 'The selected file is not valid'
                }
            }
        },
        home_info: {
            validators: {
                stringLength: {
                    message: 'Please enter no more than 500 characters',
                    max: function (value, validator, $field) {
                        return 500 - (value.match(/\r/g) || []).length;
                    }
                },
                regexp: {
                    regexp: /^[a-zA-Z0-9-'",.?/()&%!\s]+$/i,
                    message: 'Invalid characters entered'
                }
            }
        },
        home_info_mob: {
            validators: {
                stringLength: {
                    message: 'Please enter no more than 500 characters',
                    max: function (value, validator, $field) {
                        return 500 - (value.match(/\r/g) || []).length;
                    }
                },
                regexp: {
                    regexp: /^[a-zA-Z0-9-'",.?/()&%!\s]+$/i,
                    message: 'Invalid characters entered'
                }
            }
        },
        img_ord: {
            validators: {
                notEmpty: {
                    message: 'Please fill out this field'
                },
                stringLength: {
                    message: 'Please enter no more than 2 characters',
                    max: function (value, validator, $field) {
                        return 2 - (value.match(/\r/g) || []).length;
                    }
                },
                numeric: {
                    message: 'Please enter only digits'
                }
            }
        }
    }
});

var homepage_table = $('#homepage_table').DataTable({
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
        data: {keyword: 'homepage', id: id}
    }).success(function(resp) {
        if(resp == 0) {
            if($("#homepage_table tr#"+id+" td a.status_class").hasClass('btn-success')) {
                $("#homepage_table tr#"+id+" td a.status_class").removeClass('btn-success').addClass('btn-danger');
                Command: toastr['error']("Inactive", "Success")
            } else {
                $("#homepage_table tr#"+id+" td a.status_class").removeClass('btn-danger').addClass('btn-success');
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
        data: {keyword: 'homepage', id: id}
    }).success(function (resp) {
        if(resp == 0) {
            $("#homepage_table tr#"+id).remove();
            Command: toastr['success']("Record deleted.", "Success")
        } else {
            Command: toastr['error']("Something went wrong.", "Error")
        }
    });
}

$("#cancel").click(function () {
    window.history.back();
});
