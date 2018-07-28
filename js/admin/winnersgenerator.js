var prizes_all =[];
var week = false;


$(document).ready(function(){



    function GetAllPrizes() {
        $.post("/GetAllPrizes", {_token: $("input[name='_token']").val(),week: $("#selectedwekk").val() },
            function (data) {
               //  console.log(data.items);
                for (var i = 0; i < data.items.length; i++) {
                   //console.log(data.items[i]);
                    prizes_all[i] =  { name :data.items[i].name, id :data.items[i].id  };
                }
            }
        );
    }
    GetAllPrizes();


    //GetWinnersWeek
    function GetWinnersWeek() {
        $.post("/GetWinnersWeek", {_token: $("input[name='_token']").val(),week: $("#selectedwekk").val() },
            function (data) {
              // console.log(data.items);
                //render_users_winners
                $("#render_users_winners").html('');
                for (var i = 0; i < data.items.length; i++) {
                    RenderWinners(data.items[i].id_user);
                }
            }
        );
    }
    GetWinnersWeek();
    


    $("#GetWinners").click(function () {
        UpdateWinnersSelect();
        return false;
    });
    UpdateWinnersSelect();
    function UpdateWinnersSelect() {

        $.post("/getwinners", {_token: $("input[name='_token']").val(),week: $("#selectedwekk").val() },
            function (data) {
                week = $("#selectedwekk").val();
                $("#render_users").html('');
                for (var i = 0; i < data.items.length; i++) {
                    RenderItemWinner( data.items[i].id_user, data.items[i].user, data.items[i].user.prize_id);
                }
        });
    }

    function RenderItemWinner(id_user, data, prize_id) {
        //Сделать пост запрос на инфу по пользователю
        $("#render_users")
            .append('<hr /><div class="row"><div class="col-lg-5">' +
            '<p>ID: '+id_user+'</p>' +
            '<p>Имя: '+data.name+'</p>' +
                '<p>День рождения: '+data.datebirth+'</p><p>Адрес: '+data.address+'</p>' +
                '<p>Телефон: '+data.phone+'</p>' +
            '<p>ИНН: '+data.inn+'</p>' +
            '<p>Email: '+data.email+'</p>' +
                GetPrizesALLHTML(prize_id)+
                '<button id_user="'+id_user+'" onclick="setwinners(this)">Выбрать победителем</button><button id_user="'+id_user+'" onclick="NotCallBackFromUser(this)">Не удалось связаться</button>' +
                '</div></div>');
    }
});

//render_users_winners

function GetPrizesALLHTML(prize_id) {
    var html='<select>';
    for (var i = 0; i < prizes_all.length; i++) {
        html+='<option value="'+prizes_all[i].id+'" '+ (prize_id == prizes_all[i].id ? ' selected ' : '')+' >'+prizes_all[i].name+'</option>';
    }
    html+='</select>';
    return html;
}

function RenderWinners(id_user) {
    $.post("/GetInfoUser", {_token: $("input[name='_token']").val(),id: id_user },
        function (data) {
            $("#render_users_winners").append('<div class="row">' +
                '<img style="width: 100px; height: 100px;" src="http://3dcafe.ru/Uploads/2016/%D0%BA%D0%B0%D1%82%D0%B0%D0%BF%D1%83%D0%BB%D1%8C%D1%82%D0%B0.png" />'+
                '<div><a href="admin/users/'+id_user+'/edit">'+data.user.init+'</a></div>'+
                '<button id_user="'+id_user+'" onclick="SendSmsWinners(this)">Отправить смс и email</button>' +
                '<button id_user="'+id_user+'" onclick="NotCallBackFromUser(this)">Не удалось связаться</button>'+
                '</div>');
        });
}

function setwinners(ele) {
    var id_user = $(ele).attr('id_user');
    var id_prize = $(ele).prev().val();
    console.log(id_user,id_prize);
    $.post("/SetWinners", {
        _token: $("input[name='_token']").val(),
        week: $("#selectedwekk").val(),
        id_user:id_user,
        prize:id_prize  },
        function (data) {
            console.log(data);
    });
    RenderWinners(id_user);
    $(ele).parent().hide();
}

function NotCallBackFromUser(ele) {
    var id_user = $(ele).attr('id_user');
    $.post("/SetNotFeedBack", {
            _token: $("input[name='_token']").val(),
            id_user:id_user,
            week: $("#selectedwekk").val(),
        },
        function (data) {
            console.log(data);
    });
    $(ele).parent().hide();
}


function SendSmsWinners(ele) {
    //SendSmsWinners
    console.log("i am send sms winners call funtion test SendSmsWinners");
    var id_user = $(ele).attr('id_user');
    $.post("/SendSmsWinners", {
            _token: $("input[name='_token']").val(),
            id_user:id_user,
            week: week
        },
        function (data) {
            console.log(data);
    });
}