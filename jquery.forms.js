
function validate(form) {
    elements = form.elements;
    checked = [];

    for(key = 0; key < elements.length; key++) {
        valid = false;
        name = elements[key].getAttribute("name");
        value = elements[key].value;
        required = elements[key].getAttribute("data-required");

        //console.log(name, elements[key].tagName.toLowerCase(), "Req: ", required, "Value: ", value);

        if (required) {
            elements[key].className.replace(/\berror\b/,'');

            required = required.toLowerCase();

            if (required === "true" || required === "valid_isnotnull"  || required === "valid_notnull") {
                valid = validation.valid(value);
            } else {
                valid = validation[required](value);
            }

            checked.push(valid);

            if (!valid) {
                elements[key].classList.add("error");    
                //elements[key].placeholder = elements[key].name + " is a required field";
            } else {
                elements[key].classList.remove("error"); 
            }
        }
    }

    return checked.contains(false) ? false : true;
}


var validation = {
    valid: function(input) {
        return (input!=null && input !="");
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
    valid_username: function(){
        return true;
    },
    valid_password: function() {
        return true;
    },
    valid_password_confirm: function(){
        return true;
    },
    valid_postal_code: function(input){
        var regex = new RegExp(/^[a-zA-Z]\d[a-zA-Z]( )?\d[a-zA-Z]\d$/i);
        if (regex.test(input))
            return true;
        else return false;
    },
    valid_location: function(input){
        var self = this;

        if (!$("INPUT[name=anywhere]").is(":checked")) {
            if (
                !self.valid_notnull($("INPUT[name=intersection]").val())
            ) {
                $("INPUT[name=intersection]").addClass("error");
                return false;
            }

            if (
                !self.valid_postal_code($("INPUT[name=zip_postal_code]").val())
            ) {
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

jQuery('form.standard input').keypress(function(e){
    if (e.which == 13 ) return false;
    if (e.which == 13 ) e.preventDefault();
});

function load_form_features() {
	$("select[data-json]").each(function(){
        var self = $(this);
        var params = $(this).data("json").split("|");
        var value_key = params[1];
        var name_key = params[2];

        $.getJSON("_assets/json/"+params[0], function(timezones) {
            $.each(timezones, function(j, data) {
                self.append(
                    $("<option>").html(data[name_key])
                        .val(data[value_key])
                );
            })
        })
    });
}

console.log("Loaded form validation.");

var css = document.createElement("link")
css.setAttribute("rel", "stylesheet")
css.setAttribute("type", "text/css")
css.setAttribute("href", "/_assets/jquery.forms/jquery.forms.css");
document.getElementsByTagName("head")[0].appendChild(css);
