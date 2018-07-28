$(document).ready(function(){
    $( "#btn_open_auth_modal" ).html('Выйти');
    $( "#btn_open_auth_modal" ).attr('href','/logout');
    if($("#mobile").length==0) {
        if ($('.prizes').length > 0) {
            $('.prizes').niceScroll({
                cursorcolor: '#fdd00f',
                cursorfixedheight: 70
            });
        }
    }


    $('[data-modal-click="prizeModal"]').click(function(){

        var data = $(this).data();
        console.log(data);

        if(data.modalPic){
            $('[data-modal-class]').css('background','url('+data.modalPic+') no-repeat 50% 50%');
            $('[data-modal-class]').css('background-size','80%');
        } else {
            $('[data-modal-class]').css('background', '');
            $('[data-modal-class]').css('background-size','');
        }

        $('[data-modal-class]').attr('class', '');
        $('[data-modal-class]').addClass('prize-photo');
        $('[data-modal-class]').addClass(data.modalCssname);



        $('[data-modal-score]').text(data.balls+'-');

        $('[data-modal-class]').attr('data-modal-class', data.modalCssname);
        $('[data-modal-class]').data('modal-class', data.modalCssname);

        $('[data-modal-header]').text(data.modalName);
        $('[data-modal-date]').text('Заказ оформлен '+ data.orderDate);
        $('[data-modal-address]').html(data.addr + '<br>' + data.mail);

        $('#prizeModal').arcticmodal({
            overlay: {
                css: {
                    backgroundColor: '#ffffff',
                    opacity: .9
                }
            }
        });
    });

});
