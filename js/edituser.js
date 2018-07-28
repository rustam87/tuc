$(document).ready(function(){
    if ($('#radio_1,#radio_2').length > 0) {
        $('#radio_1,#radio_2').click(function () {
            var gender = $(this).attr('id') == 'radio_1' ? 0 : 1;
            $(".radio").removeClass("active");
            $(this).next().addClass('active');
            $.post("/updateGender", {_token: $("input[name='_token']").val(),sex: gender },
                function (data) {
                });
        });
    }
    if($('.person_name').length>0) {
        $( ".person_name" ).on('input', function(){
            if( $( ".person_name" ).val().length>=6) {
               var a =  $( ".person_name" ).val().split(' ');
               if(a.length==3){
                   $("#person_name_validate").addClass('success validate');
               }else{
                   $("#person_name_validate").removeClass('validate success');
               }
            }
        });
    }

    if($('#address').length>0) {
        $( "#address" ).on('input', function(){
            if( $( "#address" ).val().length>=6) {
                var a =  $( "#address" ).val().split(' ');
                if(a.length>=3){
                    $("#adress_validate").addClass('success validate');
                }else{
                    $("#adress_validate").removeClass('validate success');
                }
            }
        });
    }


    if($('#email').length>0) {
        $( "#email" ).on('input', function(){

                if(isEmail($( "#email" ).val())){
                    $("#email_validate").addClass('success validate');
                }else{
                    $("#email_validate").removeClass('validate success');
                }

        });
    }

    if($('#inn').length>0) {
        $( "#inn" ).on('input', function(){
            if(isInn($( "#inn" ).val())){
                $("#inn_validate").addClass('success validate');
            }else{
                $("#inn_validate").removeClass('validate success');
            }
        });
    }
    $("#inn").mask("999999999999",{completed:function(){
        $("#inn_validate").addClass('success validate');
    }});

    function isInn(inn) {
        var regex = /^(\d{10}|\d{12})$/;
        return regex.test(inn);
    }

    $("#loginphone,#forgotphone,#phoneedit").mask("+7 (999) 999-9999",{completed:function(){
        $("#phonevalid").addClass('success');
    }});

    function isEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }


    validateFullForm = function () {
        $(".personal-data-form :input").each(function () {
            if ($(this).val().length == 0 && ($(this).next().hasClass('validate') ||$(this).next().hasClass('success'))  ) {
                $(this).next().removeClass('validate success');
            }else{
               // $(this).next().addClass('validate');
                $(this).next('div').addClass('validate success');
            }
        });
    };
    validateFullForm();
    $( "#inn" ).change(function () {
        validateFullForm();
    });

    checkDateBirth();
    $('select[name="selectyear"]')
        .add('select[name="selectmonth"]')
        .add('select[name="selectday"]')
        .on('change', function() {
            checkDateBirth();
        });

    function checkDateBirth() {
        var $selectYear = $('select[name="selectyear"]'),
            $selectMonth = $('select[name="selectmonth"]'),
            $selectDay = $('select[name="selectday"]'),
            year = $selectYear.val(),
            month = $selectMonth.val(),
            day = $selectDay.val();

        if(year == '1998') {
            var months = $selectMonth.find('option').filter(function() {
                    return ((new Date()).getMonth() + 1) < $(this).val();
                }),
                days = $selectDay.find('option').filter(function() {
                    return (new Date()).getUTCDate() < $(this).val();
                });

            if(months.length > 0) {
                $selectMonth.data('hidden', months);
                months.remove();
            }

            if(month == (new Date()).getMonth() + 1) {
                if(days.length > 0) {
                    $selectDay.data('hidden', days);
                    days.remove();
                }
                if((new Date()).getUTCDate() < day) {
                    $selectDay.find('option').first().prop('selected', true);
                }
            }

            if(((new Date()).getMonth() + 1) < month) {
                $selectMonth.find('option').first().prop('selected', true);
            }
        } else {
            $selectMonth.append($selectMonth.data('hidden'));
            $selectDay.append($selectDay.data('hidden'));
        }
    }
});
