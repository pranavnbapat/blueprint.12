var platform_id = '';
var pf_img_id = '';

$("#platform_form").bootstrapValidator({
    fields: {
        pf_name: {
            validators: {
                notEmpty: {
                    message: 'Please fill out this field'
                },
                regexp: {
                    regexp: /^[a-zA-Z0-9-'",.?/()&%!\s]+$/i,
                    message: 'Invalid characters entered'
                },
                stringLength: {
                    message: 'Please enter no more than 100 characters',
                    max: function (value, validator, $field) {
                        return 100 - (value.match(/\r/g) || []).length;
                    }
                }
            }
        },
        pf_ft_img: {
            validators: {
                file: {
                    extension: 'jpeg,png,jpg',
                    type: 'image/jpeg,image/png,image/jpg',
                    maxSize: 5184 * 3456,
                    message: 'The selected file is not valid'
                }
            }
        },
        pf_ft_img_alt: {
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
        pf_ord: {
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
        },
        pf_img_price: {
            validators: {
                stringLength: {
                    message: 'Please enter no more than 10 characters',
                    max: function (value, validator, $field) {
                        return 10 - (value.match(/\r/g) || []).length;
                    }
                },
                regexp: {
                    regexp: /^[0-9.]+$/i,
                    message: 'Invalid characters entered'
                }
            }
        }
    }
});

var platform_table = $('#platform_table').DataTable({
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
        data: {keyword: 'platform', id: id}
    }).success(function(resp) {
        if(resp == 0) {
            if($("#platform_table tr#"+id+" td a.status_class").hasClass('btn-success')) {
                $("#platform_table tr#"+id+" td a.status_class").removeClass('btn-success').addClass('btn-danger');
                Command: toastr['success']("Inactive", "Success")
            } else {
                $("#platform_table tr#"+id+" td a.status_class").removeClass('btn-danger').addClass('btn-success');
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
        data: {keyword: 'platform', id: id}
    }).success(function (resp) {
        if(resp == 0) {
            $("#platform_table tr#"+id).remove();
            Command: toastr['success']("Record deleted.", "Success")
        } else {
            Command: toastr['error']("Something went wrong.", "Error")
        }
    });
}

function delete_image(id) {
    $.ajax({
        type: 'post',
        url: '/admin/platform/delete-platform-image',
        data: {id: id}
    }).success(function (resp) {
        if(resp == 0) {
            $("div.gallery-padding > div#"+id).remove();
            Command: toastr['success']("Image deleted.", "Success")
        } else {
            Command: toastr['error']("Something went wrong.", "Error")
        }
    });
}

$("#cancel").click(function () {
    window.history.back();
});
