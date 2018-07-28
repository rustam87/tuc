$(document).ready(function(){
    var selected_prize = 0;
    $(".box").click(function (e) {
        //$.post("/ValidateProfile", {_token: $("input[name='_token']").val() },
        //    function (data) {
        //        if(data.state!="1"){
        //            window.location.href = "/edit";
        //            return false;
        //        }
        //});
        if($(this).find('.not-available').length != 0) {
            e.preventDefault();
            return false;
        }

        if(parseInt($("#user_balls").val())< parseInt($(this).parent().attr('balls'))) {
            $('#notBallsModal').arcticmodal({
                overlay: {
                    css: {
                        backgroundColor: '#000000',
                        opacity: .6
                    }
                }
            });
            return false;
        }else {
            if ($(this).attr('location') != null) {
                window.location = $(this).attr('location');
                return;
            }
            selected_prize = $(this).attr('idprize');
            $('#selectPriseModal').arcticmodal({
                overlay: {
                    css: {
                        backgroundColor: '#000000',
                        opacity: .9
                    }
                },
                afterOpen: function(data, el) {
                    $.post("/ValidateProfile", {_token: $("input[name='_token']").val()},
                        function (data) {
                            $('#selectPriseModal p.error').hide();
                            $('#selectPriseModa p.data').removeClass('error');
                            if(data.state == "1"){
                                $("#btn_select_prize").show();
                            } else {
                                $('#selectPriseModal p.error').show();
                                for(i in data.fields) {
                                    $('input[data-id="'+data.fields[i]+'"]')
                                        .parents('p.data')
                                        .addClass('error');
                                }
                            }
                        }
                    );
                }
            });
        }
    });
    $("#radio_1").click(function () {
        console.log('disabled');
        $("#btn_select_prize").removeClass( "disabled" );
    });
    $("#radio_1").change(function () {
        console.log('disabled');
        $("#btn_select_prize").removeClass( "disabled" );
    });

    $("#btn_select_prize").click(function () {
        console.log('test');
        if ($("#btn_select_prize").hasClass("disabled")) {
            WarningModal('#selectPriseModal');
        }else{
            $.post("/getprize", {_token: $("input[name='_token']").val(),prize: selected_prize },
                function (data) {
                    if(data.state==='true') {
                        window.location.href = "/mypage";
                        $("#errorballs").hide();
                    }else{
                        $("#selectPriseModal").arcticmodal('close');
                        if(data.blogger !== 'true') {
                            $('#notBallsModal').arcticmodal({
                                overlay: {
                                    css: {
                                        backgroundColor: '#000000',
                                        opacity: .6
                                    }
                                }
                            });
                        } else {
                            $('#bloggerModal').arcticmodal({
                                overlay: {
                                    css: {
                                        backgroundColor: '#000000',
                                        opacity: .6
                                    }
                                }
                            });
                        }
                    }
                });
            return false;
        }
    });
});
