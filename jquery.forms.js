
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

            if (required === "true" || required === "valid_isnotnull") {
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
    valid_password: function() {
        
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

console.log("Loaded form validation.");

