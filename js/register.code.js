$(document).ready(function(){
    $("#btn_send_registaration_code").click(function (e) {
        e.preventDefault();
        $.post("/registercode", {_token: $("input[name='_token']").val(),code: $("#registercode").val() },
                function (data) {
                    if ($('#ballsserverside').length > 0){
                        UpdateUIBalls();
                    }
                    if(data.state==='true') {
                        $("#registercode").val('');
                        $("#actionsuccess").html('Ваш код принят').css({'margin-top': '150px'});
                        $(".registrecodeblock").hide();

                        function funcTimer() {
                            $("#actionsuccess").html('Регистрация кода').css({'margin-top': '50px'});;
                            $(".registrecodeblock").show();
                        }
                        setTimeout(funcTimer, 2000);
                    }else{
                        $("#registercode").val("");
                        WarningModal('#registrationCodeModal');
                        var text = $("#validateentercode").text();
                        if(data.reason){
                            $("#validateentercode").text(data.reason);
                        }
                        $("#validateentercode").show();
                        function funcTimerError() {
                            $("#validateentercode").text(text);
                            $("#validateentercode").hide();

                        }
                        setTimeout(funcTimerError, 7000);
                    }
                });
       return false;
    });

    $(".exit_from_system").click(function () {
        window.location.href = "/logout";
    });


    function UpdateUIBalls() {
        $.post("/getballs", {_token: $("input[name='_token']").val(),code: $("#registercode").val() },
            function (data) {
                if ($('#ballsserverside').length > 0){
                    $('#ballsserverside').html(data.balls);
                }
            });
    }

});
