var Forms = {
    validate: function(form) {
        var self = this;
        elements = form.elements;

        $(form).find("div.errors").html("");

        if (!self.check(elements)) {
            // Coment this out to disable popup.
            //console.log(form, $(form).find("div.errors"))
            if ($(form).find("div.errors")) {
                $(form).find("div.errors")
                    .html('Your form has erros and they are <span class="error">marked in red</span>')
                    .show();    

                $("html,body").animate({
                    scrollTop: 0
                }, 1000);           
            } else {
                Popup.init({
                    width: 320,
                    height: 80,
                    content: '<h2>Your form has errors</h2><p>Your form has erros and they are <span class="error">marked in red</span>. Update them and try again.</p>'
                });
                Loading.hide();
            }
        }

        return self.check(elements);
    },
    elements_are_valid: function(elements) {
        var self = this;
        return self.check(elements);
    },
    check: function(elements) {
        checked = [];

        //console.log(elements);

        $.each(elements, function(key, element) {
            valid = false;
            name = element.getAttribute("name");
            value = element.value;
            required = element.getAttribute("data-required");

            if (required) {
                elements[key].className.replace(/\berror\b/, '');

                required = required.toLowerCase();

                //console.log(required);

                if (required === "true" || required === "valid_isnotnull" || required === "valid_notnull") {
                    valid = validation.valid(value);
                } else {
                    valid = validation[required](value);
                }

                checked.push(valid);

                if (!valid) {
                    element.classList.add("error");
                    element.classList.remove("valid");

                    $(element).parent().find("small").addClass("error")
                        //elements[key].placeholder = elements[key].name + " is a required field";
                } else {
                    element.classList.remove("error");
                    element.classList.add("valid");

                    $(element).parent().find("small").removeClass("error")
                }
            }
        });

        return checked.contains(false) ? false : true;
    },
    add_validation(name, func) {
        validation[name] = func;
    }
}

var validation = {
    valid: function(input) {
        return (input != null && input != "");
    },
    valid_notnull: function(input) {
        return this.valid(input);
    },
    valid_isnotnull: function(input) {
        return this.valid(input);
    },
    valid_password: function(input) {
        return this.valid(input);
    },
    valid_email: function(input) {
        // /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/
        var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return regex.test(input);
    },
    valid_phone: function(input) {
        var phone = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
        var digits = p.replace(/\D/g, "");
        return regex.test(phone);
    },
    valid_username: function() {
        return true;
    },
    valid_password: function(input) {
        var regex = new RegExp(/^(?=.*\d)(?=.*[A-Za-z])[0-9A-Za-z!@#$%]{8,20}$/);
        if (regex.test(input))
            return true;
        else return false;
    },
    valid_password_confirm: function(input) {
        var error = false;

        if (input === "") {
            error = "<br />Your new password can not be blank.";
        }

        if (input !== $("INPUT[name=password]").val()) {
            error = "<br />Your new pasword and confirmation does not match.";
        }

        if (!validation.valid_password(input)) {
            error = "<br />Your password must be at least 8 characters and be alphanumberic."
        }

        if (error) {
            $("div.errors").append(error);

            $("INPUT[name=passwordagain]").addClass("error");
            return false;
        }
        $("INPUT[name=passwordagain]").removeClass("error");
        return true;


    },
    valid_new_password_confirm: function(input) {
        var error = false;

        if (input === "") {
            error = "<br />Your new password can not be blank.";
        }

        if (input !== $("INPUT[name=password_new]").val()) {
            error = "<br />Your new pasword and confirmation does not match.";
        }

        if (!validation.valid_password(input)) {
            error = "<br />Your password must be at least 8 characters and be alphanumberic."
        }

        if (error) {
            $("div.errors").append(error);

            $("INPUT[name=passwordagain]").addClass("error");
            return false;
        }
        $("INPUT[name=passwordagain]").removeClass("error");
        return true;


    },
    valid_postal_code: function(input) {
        var regex = new RegExp(/^[a-zA-Z]\d[a-zA-Z]( )?\d[a-zA-Z]\d$/i);
        if (regex.test(input))
            return true;
        else return false;
    },
    valid_location: function(input) {
        var self = this;

        if (!$("INPUT[name=anywhere]").is(":checked")) {
            if (!self.valid_notnull($("INPUT[name=intersection]").val())) {
                $("INPUT[name=intersection]").addClass("error");
                return false;
            }

            if (!self.valid_postal_code($("INPUT[name=zip_postal_code]").val())) {
                $("INPUT[name=zip_postal_code]").addClass("error");
                return false;
            }
        }
        return true;
    },
    valid_captcha: function() {
        if (ReCaptcha.length === 1 && ReCaptcha.is_valid()) return true;
        //alert("Captcha invalid.")
        return true;
    },
    valid_terms_of_service: function(input) {
        if ($("INPUT[name=terms_of_service]").is(":checked")) {
            $("INPUT[name=terms_of_service]").parent().removeClass("error");
            return true;
        }
        $("INPUT[name=terms_of_service]").parent().addClass("error");
        return false;
    }
}

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] == obj) {
            return true;
        }
    }
    return false;
}

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

function load_form_features() {
    $("select[data-json]").each(function() {
        var self = $(this);
        var params = $(this).data("json").split("|");
        var value_key = params[1];
        var name_key = params[2];

        $(this).removeAttr("data-json");

        $.getJSON("/_assets/json/" + params[0], function(json_data) {
            $.each(json_data, function(j, data) {
                self.append(
                    $("<option>").html(data[name_key])
                    .val(data[value_key])
                );
            })
        })
    });
}

// Removes Form error class on form focus
$(document).ready(function() {
    $("INPUT, TEXTAREA, SELECT").on("focus", function() {
        $(this).removeClass("error")
    });
    
    $( "form" ).submit(function( event ) {
      if (!Forms.validates($(this)[0])) event.preventDefault();
    });
});

// Disables Form submission on Enter
$('form input').keypress(function(e) {
    if (e.which == 13) return false;
    if (e.which == 13) e.preventDefault();
});
