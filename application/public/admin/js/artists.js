var artist_id = ''
var artist_transaction_id = '';

$("#artist_form").bootstrapValidator({
    fields: {
        artist_name: {
            validators: {
                notEmpty: {
                    message: 'Please fill out this field'
                },
                regexp: {
                    regexp: /^[a-zA-Z0-9-'",.?/()&%!\s]+$/i,
                    message: 'Invalid characters entered'
                },
                stringLength: {
                    message: 'Please enter no more than 50 characters',
                    max: function (value, validator, $field) {
                        return 50 - (value.match(/\r/g) || []).length;
                    }
                }
            }
        },
        art_img: {
            validators: {
                file: {
                    extension: 'jpeg,png,jpg',
                    type: 'image/jpeg,image/png,image/jpg',
                    maxSize: 5184 * 3456,
                    message: 'The selected file is not valid'
                }
            }
        },
        art_img_alt: {
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
        art_img_caption: {
            validators: {
                regexp: {
                    regexp: /^[a-zA-Z0-9-'",.?/()&%!\s]+$/i,
                    message: 'Invalid characters entered'
                },
                stringLength: {
                    message: 'Please enter no more than 300 characters',
                    max: function (value, validator, $field) {
                        return 300 - (value.match(/\r/g) || []).length;
                    }
                }
            }
        },
        art_img_ord: {
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

var artist_table = $('#artist_table').DataTable({
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
        data: {keyword: 'artist', id: id}
    }).success(function(resp) {
        if(resp == 0) {
            if($("#artist_table tr#"+id+" td a.status_class").hasClass('btn-success')) {
                $("#artist_table tr#"+id+" td a.status_class").removeClass('btn-success').addClass('btn-danger');
                Command: toastr['success']("Inactive", "Success")
            } else {
                $("#artist_table tr#"+id+" td a.status_class").removeClass('btn-danger').addClass('btn-success');
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
        data: {keyword: 'artist', id: id}
    }).success(function (resp) {
        if(resp == 0) {
            $("#artist_table tr#"+id).remove();
            Command: toastr['success']("Record deleted.", "Success")
        } else {
            Command: toastr['error']("Something went wrong.", "Error")
        }
    });
}

function delete_image(id) {
    $.ajax({
        type: 'post',
        url: '/admin/artists/delete-artist-image',
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

$("#view_on_wall").change(function(){
    if($("#view_on_wall").val() == 'n') {
        $("#view_on_wall_div").hide();
    } else if($("#view_on_wall").val() == 'y') {
        $("#view_on_wall_div").show();
    }
});

$(document).ready(function(){
    if($("#view_on_wall").val() == 'n') {
        $("#view_on_wall_div").hide();
    } else if($("#view_on_wall").val() == 'y') {
        $("#view_on_wall_div").show();
    }
});
