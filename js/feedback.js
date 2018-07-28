$(document).ready(function(){

    //feedback-input

    feedbackEmailValidation($(".input-email"));
    feedbackSubjectValidation($(".person_name"));
    sendFormValidation();
    $( ".input-email" ).on('input', function() {
        feedbackEmailValidation($(this));
        sendFormValidation();
    });
    $( ".person_name" ).on('input', function() {
        feedbackSubjectValidation($(this));
        sendFormValidation();
    });

    function feedbackEmailValidation(element){
        var regularEmail = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
        if(regularEmail.test(element.val())){
            element.next().addClass('success');
        }else{
            element.next().removeClass('success');
        }
    }

    function feedbackSubjectValidation(element){
        if(element.val().length){
            element.next().addClass('success');
        }else{
            element.next().removeClass('success');
        }
    }

    function sendFormValidation(){
        console.log($( ".callback-form .validate.success").length)
        if(2 != $( ".callback-form .validate.success").length){
            $("#btn_send_callback").attr('disabled', 'disabled');
            $("#btn_send_callback").addClass('disabled');
        }else{
            $("#btn_send_callback").removeAttr('disabled');
            $("#btn_send_callback").removeClass('disabled');
        }
    }
});
