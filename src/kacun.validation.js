/* ================================================================================== */
/*                                KACUN FORM VALIDATION                               */
/*                              Created by Imam Nurcholis                             */
/*                                      Versi 1.0                                     */
/* ================================================================================== */
(function($){
    $.fn.validate = function(callback) {
        var form = '#' + this[0].attributes[2].value;
        var error = [];
        /* 1. Validate Required */
        var required = $(form + ' .required').get();
        required.forEach(elem => {
            // Define variable
            var elemId = elem.attributes[2].value;
            if(elem.value == ''){
                $("#"+elemId).addClass('not-valid');
                if(error.findIndex(id => id == elemId) == -1){
                    error.push(elemId);
                }
            }else{
                $("#"+elemId).removeClass('not-valid');
                if(error.findIndex(id => id == elemId) != -1){
                    indeks = error.findIndex(id => id == elemId);
                    error.splice(indeks, 1);
                }
            }
        });
        /* 2. Validate Email */
        var email = $(form + ' .email').get();
        email.forEach(elem => {
            // Define variable
            var elemId = elem.attributes[2].value;
            var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var emailStatus = emailPattern.test(String(elem.value).toLowerCase());
            if(emailStatus == false){
                $("#"+elemId).addClass('not-valid');
                if(error.findIndex(id => id == elemId) == -1){
                    error.push(elemId);
                }
            }else{
                $("#"+elemId).removeClass('not-valid');
                if(error.findIndex(id => id == elemId) != -1){
                    indeks = error.findIndex(id => id == elemId);
                    error.splice(indeks, 1);
                }
            }
        });
        /* 3. Validate Phone */
        var phone = $(form + ' .phone').get();
        phone.forEach(elem => {
            // Define variable
            var elemId = elem.attributes[2].value;
            var phonePattern = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
            var phoneStatus = phonePattern.test(String(elem.value));
            if(phoneStatus == false){
                $("#"+elemId).addClass('not-valid');
                if(error.findIndex(id => id == elemId) == -1){
                    error.push(elemId);
                }
            }else{
                $("#"+elemId).removeClass('not-valid');
                if(error.findIndex(id => id == elemId) != -1){
                    indeks = error.findIndex(id => id == elemId);
                    error.splice(indeks, 1);
                }
            }
        });
        /* 5. Minimal Length */
        var minLengthElem = $(form).find("input[type=text],textarea").get();
        minLengthElem.forEach(elem => {
            if(elem.localName == 'input'){
                var elemId = elem.attributes[2].value;
            }else if(elem.localName == 'textarea'){
                var elemId = elem.attributes[1].value;
            }
            if($("#"+elemId).data('minlength') != undefined){
                var minLength = $("#" + elemId).data('minlength');
                if($("#"+elemId).val().length < minLength){
                    $("#"+elemId).addClass('not-valid');
                    if(error.findIndex(id => id == elemId) == -1){
                        error.push(elemId);
                    }
                }else{
                    $("#"+elemId).removeClass('not-valid');
                    if(error.findIndex(id => id == elemId) != -1){
                        indeks = error.findIndex(id => id == elemId);
                        error.splice(indeks, 1);
                    }
                }
            }
        });
        /* 6. Pattern */
        var patternElem = $(form).find("input[type=text],input[type=password],textarea").get();
        patternElem.forEach(elem => {
            // Define variable
            if(elem.localName == 'input'){
                var elemId = elem.attributes[2].value;
            }else if(elem.localName == 'textarea'){
                var elemId = elem.attributes[1].value;
            }
            // Validate pattern
            if($("#"+elemId).data('pattern') != undefined){
                if($("#"+elemId).data('pattern') == 'strong'){
                    var pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])");
                }else if($("#"+elemId).data('pattern') == 'alfanumeric'){                
                    var pattern = new RegExp("^(((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))");                
                }else if($("#"+elemId).data('pattern') == 'alfanumericsymbol'){
                    var pattern = new RegExp("^(((?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]))|((?=.*[A-Z])(?=.*[0-9]))(?=.*[!@#\$%\^&\*]))");
                }else{
                    var pattern = $("#"+elemId).data('pattern');
                }
                var patternStatus = pattern.test(String(elem.value));
                if(patternStatus == false){
                    $("#"+elemId).addClass('not-valid');
                    if(error.findIndex(id => id == elemId) == -1){
                        error.push(elemId);
                    }
                }else{
                    $("#"+elemId).removeClass('not-valid');
                    if(error.findIndex(id => id == elemId) != -1){
                        indeks = error.findIndex(id => id == elemId);
                        error.splice(indeks, 1);
                    }
                }
            }
        });
        // console.log(error);
        /* Execute callback */
        if(error.length == 0){
            callback();
        }else{
            // throw('Form not valid !');
        }
    };
})(jQuery);

(function($){
    $.fn.checkPassword = function() {
        var inputElemen = this[0].attributes[2].value;
        var labelInfo = this.data('label');
        var strongPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        var mediumPassword = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
        if(this.val() == ''){
            $('#'+labelInfo).text('');
            $('#'+labelInfo).removeClass('weakPassword');
            $('#'+labelInfo).removeClass('mediumPassword');
            $('#'+labelInfo).removeClass('strongPassword');
        }else{
            if(strongPassword.test(this.val())){
                $('#'+labelInfo).text('Strong !');
                $('#'+labelInfo).removeClass('weakPassword');
                $('#'+labelInfo).removeClass('mediumPassword');
                $('#'+labelInfo).addClass('strongPassword');
            }else if(mediumPassword.test(this.val())){
                $('#'+labelInfo).text('Medium !');
                $('#'+labelInfo).removeClass('weakPassword');
                $('#'+labelInfo).removeClass('strongPassword');
                $('#'+labelInfo).addClass('mediumPassword');
            }else{
                $('#'+labelInfo).text('Weak !');
                $('#'+labelInfo).removeClass('strongPassword');
                $('#'+labelInfo).removeClass('mediumPassword');
                $('#'+labelInfo).addClass('weakPassword');
            }
        }
    }
})(jQuery);