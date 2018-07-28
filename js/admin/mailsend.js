$(document).ready(function(){

    var email;
    var title;
    var text;
    $(".sendmail").click(function () {
        email = $(this).attr('email');
        title = $(this).attr('title');
        text = $(this).attr('text');

        $('#email').val(email);
        $('#title').val(title);
        $('#text').val(text);
    });

    $("#sendmailbutton").click(function () {
        $.post("/SendEmail", {_token: $("input[name='_token']").val(),email: $('#email').val(),title: $('#title').val(),text: $('#text').val() },
            function (data) {
                alert("Отправленно");
            }
        );
    });
});
