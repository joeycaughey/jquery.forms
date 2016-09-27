jquery.forms
============

The jQuery.forms library has been written to simply:
1) Frontend validation and styling of forms.
2) Validation types using regex and validation function set.
3) Dynamically populating multiteir object data into forms.
4) Calls that check to ensure the data is valid before proceeding

jQuery Forms and Frontend Validation.  Validation any form element by adding a data-required attribue and a validation function to the validation class in jquery.forms.js


----------------------------------------------------
USAGE AND INITIALIZATION / GENERAL HTML
----------------------------------------------------
Adding a data-required attribue and a validation function will set that fields in the form have valid data.  On a form check if there is an error an ".error" class will be added to the input/textarea/select tag.

```html
<form id="form-id-name" method="POST">
  <input type="text" name="name" value="" data-required="valid_notnull" />
  <input type="text" name="email" value="" data-required="valid_email" />
  <input type="text" name="phone[mobile]" value="" data-required="valid_phone" />
  <button type="submit">Submit</button>
</form>
```


----------------------------------------------------
USAGE AND INITIALIZATION / GENERAL HTML
----------------------------------------------------
```javascript
$(document).ready(function() {
    var form = $("#form-id-name");
    
    $("button[type=submit]", form[0]).on("click", function(event) {
        //  The "Form.validates(form)" function calls the validation check
        if (Form.validates(form)) {
            // On a sucessfull validation call
            return true;
        } else {
            // On failed validation call
            event.preventDefault();
            return false;
        }
    });
});
```

----------------------------------------------------
USAGE AND INITIALIZATION / ERROR REPORTING
----------------------------------------------------
```
If 
```


----------------------------------------------------
POPULATING FORM DATA
----------------------------------------------------

```javascript
var form = $("#form-id-name");
var variables = {
  "name": "Test User Name",
  "email: "Test@User.Email",
  "phone": {
    "mobile": "123-123-1234"
  }
}
$(document).ready(function() {
  form.values(variables)
})

```


----------------------------------------------------
VALIDATION FUNCTIONS
----------------------------------------------------
There are already basic validation functions in the validation library.  

```text
valid: 
valid_notnull: 
valid_isnotnull:
valid_email:
valid_phone:
valid_username:
valid_password:
valid_password_confirm: 
valid_new_password_confirm: 
valid_postal_code: 
valid_captcha: (ReCaptcha)
valid_terms_of_service: 
```

Custom validation functions can also be created in other assets/pages that are specific to that asset or page.

```javascript
Forms.add_validation(name, function(input) {
   // Add your check on the input and return true/false 
   // depending on the result of the validation
});
```

