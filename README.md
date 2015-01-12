jquery.forms
============

jQuery Forms and Frontend Validation.  Validation any form element by adding a data-required attribue and a validation function to the validation class in jquery.forms.js

----------------------------------------------------
USAGE AND INITIALIZATION
----------------------------------------------------

```
<form id="validation-form" method="POST">
  <input type="text" name="name" value="" data-required="valid_notnull" />
  <input type="text" name="email" value="" data-required="valid_email" />
  <button type="submit">Submit</button>
</form>

<script>
$(document).ready(function(){
    var form = document.getElementById("validation-form");
    
    $("#validation-form").submit(function(event) {
        event.preventDefault();
        
        if (validates(form)) {
            return true;
        } 
        return false;
    });
});
</script>
```
