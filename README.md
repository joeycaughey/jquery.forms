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

```
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
```
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
POPULATING FORM DATA
----------------------------------------------------

```
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
