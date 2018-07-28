$(document).ready(function(){
   $("#loginphone,#forgotphone").mask("+7 (999) 999-9999",{completed:function(){
       $("#phonevalid").addClass('success');
   }});
    $("#phoneregisterform").mask("+7 (999) 999-9999",{completed:function(){
        $("#phonevalidregister").addClass('success');
    }});
   $("#btn_login").click(function () {
        $.post("/auth/login", {_token: $("input[name='_token']").val(),phone: $("#loginphone").val().replace(/[^\d.]/g, ''), password: $("#loginpassword").val() },
            function (data) {
                if(data.state==='true') {
                    location.reload();
                }else{
                    $("#loginpassword").val("");
                    WarningModal('#authModal');
                    $('#validateenterLogin').show();
                }
            });
        return false;
    });
    /*Регистрация*/
    var tryLogin=0;
    $("#btn_registration").click(function () {
        var movereg =true;
        $.each( $('.radio'), function( key, value ) {
            if(!$( value).hasClass( "active" )){
                WarningModal('#authModal');
                movereg = false;
                return false;
            }
        });
        if(movereg) {
            $.post("/regis", {
                    _token: $("input[name='_token']").val(),
                    phone: $("#phoneregisterform").val().replace(/[^\d.]/g, '')
                },
                function (data) {
                    if (data.state === 'true') {
                        $('.registration').hide();
                        $('.login').show();
                        $("#loginphone").val($("#phoneregisterform").val());
                        $('.tabs-block a').removeClass('active');
                        $('#login_tab').addClass('active');
                        setTimeout(function(){
                            $('#loginphone').focus();
                        }, 100);
                    } else {
                        //validateenter
                        tryLogin++;
                        WarningModal('#authModal');
                        if (tryLogin >= 1) {
                            $("#validateenter").show();
                        }
                    }
                });
        }else{

        }
        return false;
    });

    $('#registration_code, #btn_register_code').click(function(){

        $(".registration").hide();
        $("#login_tab").addClass('active');
        setTimeout(function(){
            $('#loginphone').focus();
        }, 100);
        $("#register_tab").removeClass('active');
        return;

        $('#authModal').arcticmodal({
            overlay: {
                css: {
                    backgroundColor: '#000000',
                    opacity: .6
                }
            }
        });
        $('#registrationCodeModal').arcticmodal('close');
        return false;
        $('#registrationCodeModal').arcticmodal({
            overlay: {
                css: {
                    backgroundColor: '#000000',
                    opacity: .6
                }
            }
        });
    });

    $("#btn_open_auth_modal").click(function () {
        $(".registration").hide();
        $("#login_tab").addClass('active');
        $("#register_tab").removeClass('active');
        setTimeout(function(){
            $('#loginphone').focus();
        }, 100);
    });

    //forgotpassword
    $("#forgotpassword").click(function () {
        $("#authModal").arcticmodal('close');
        $("#forgotpassword").show();
        $("#login_tab").addClass("active");
        $('#forgotModal').arcticmodal({
            overlay: {
                css: {
                    backgroundColor: '#000000',
                    opacity: .9
                }
            }
        });

        setTimeout(function(){
            $('#forgotphone').focus();
        }, 100);
        return false;
    });

    var phone_forgot;
    $(".forgot_password_recover").click(function () {
        
        $("#forgotstep1").hide();
        $("#forgotstep2").show();
        phone_forgot =  $("#forgotphone").val().replace(/[^\d.]/g, '');
        $.post("/forgot", {_token: $("input[name='_token']").val(),phone: phone_forgot },
            function (data) {
                setTimeout(function(){
                    $('#passwordlogin').focus();
                }, 100);
               console.log(data);
        });
        return false;
    });

    $(".forgot_enter").click(function () {
        $.post("/auth/login", {_token: $("input[name='_token']").val(),phone: phone_forgot, password: $("#passwordlogin").val() },
            function (data) {
                if(data.state==='true') {
                    location.reload();
                }else{
                    $("#loginpassword").val("");
                    WarningModal('#forgotModal');
                }
            });
        return false;
    });

});
