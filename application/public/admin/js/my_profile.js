$("#user_profile_password_form").bootstrapValidator({
    fields: {
        curr_pass: {
            validators: {
                notEmpty: {
                    message: 'Please fill out this field'
                },
                stringLength: {
                    message: 'Please enter no more than 50 characters',
                    max: function (value, validator, $field) {
                        return 50 - (value.match(/\r/g) || []).length;
                    }
                }
            }
        },
        password: {
            validators: {
                notEmpty: {
                    message: 'Please fill out this field'
                },
                stringLength: {
                    message: 'Please enter no more than 50 characters',
                    max: function (value, validator, $field) {
                        return 50 - (value.match(/\r/g) || []).length;
                    }
                }
            }
        },
        password_confirmation: {
            validators: {
                notEmpty: {
                    message: 'Please fill out this field'
                },

                stringLength: {
                    message: 'Please enter no more than 50 characters',
                    max: function (value, validator, $field) {
                        return 50 - (value.match(/\r/g) || []).length;
                    }
                },
            }
        }
    }
});

/*$("#my_profile_form").bootstrapValidator({
    fields: {
        user_profile_photo: {
            validators: {
                file: {
                    extension: 'jpeg,png',
                    type: 'image/jpeg,image/png',
                    maxSize: 2048 * 1024,
                    message: 'The selected file is not valid'
                }
            }
        },
    }
});*/
