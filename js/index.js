/**
 * Created by Rustam Ablyzalov on 04.04.2016.
 */

function openMenu(){
   $('.icon-menu').addClass('open');
   var backdrop_height;
   if($('#what-the-tuc').length > 0 || $('.prizes-page').length > 0){
      backdrop_height = $('.wrapper').height();
   } else{
      backdrop_height = $(document).height();
   }
   $('.backdrop-menu').css({height: backdrop_height}).show();
   $('#menu').animate({'left': 0});
}

function closeMenu(){
   $('.icon-menu').removeClass('open');
   $('#menu').animate({'left': '-191px'},{
      complete: function(){
         $('.backdrop-menu').hide();
      }
   });
}

$(window).load(function(){
   $('#prolongationModal').arcticmodal({
      overlay: {
         css: {
            backgroundColor: '#b38e37',
            opacity: .7
         }
      }
   });
});

$(document).ready(function(){
   if ($('#kv').length > 0) {
      $('.backpack').plaxify({"xRange":10,"yRange":40});
      $('.m_video').plaxify({"xRange":40,"yRange":70, invert: true});
      $('.ozon').plaxify({"xRange":25,"yRange":85});
      $('.powerbank').plaxify({"xRange":30,"yRange":60, invert: true});
      $('.slingshot').plaxify({"xRange":60,"yRange":55});
      $('.t_shirt').plaxify({"xRange":20,"yRange":50});
      $('.starbacs').plaxify({"xRange":50,"yRange":10, invert: true});
      $('.hunt-for-prises-text').plaxify({"xRange":30,"yRange":35});
      $('.open-tuc-text').plaxify({"xRange":15,"yRange":10, invert: true});
      $.plax.enable({"activityTarget": $('#kv')});
   }

   $('#registration_code, #btn_register_code').click(function(){
      if($('.auth_modal').length>0)return;
      $('#registrationCodeModal').arcticmodal({
         overlay: {
            css: {
               backgroundColor: '#000000',
               opacity: .6
            }
         }
      });
      setTimeout(function(){
         $('#registercode').focus();
      }, 100);
   });


   //if ($('.key-mobile').length > 0) {
   //   var x;
   //   window.ondevicemotion = function(event) {
   //      ax = event.accelerationIncludingGravity.x;
   //      ay = event.accelerationIncludingGravity.y;
   //      az = event.accelerationIncludingGravity.z;
   //       x = parseInt(ax.toFixed(0), 10);
   //   };
   //
   //   setInterval(function(){
   //      $('#key').css({'transform': 'rotate('+ x*3 + 'deg)'});
   //   }, 100);
   //
   //}



   if ($('#helloModal').length > 0) {
      $('#helloModal').arcticmodal({
         overlay: {
            css: {
               backgroundColor: '#b39c8a',
               opacity: .6
            }
         }
      });
   }

   $('.auth_modal').click(function(){
         $('#authModal').arcticmodal({
            overlay: {
               css: {
                  backgroundColor: '#000000',
                  opacity: .6
               }
            }
         });
         $(".login").show();
   });



   $('.tabs-block a').click(function(){
         var type = $(this).data('type');
         $('.tabs-block a').removeClass('active');
         $(this).addClass('active');
         $('.forms form').hide();
         $('.' + type).show();
   });

   $('#change_personal_data').click(function(){
      $(this).hide();
      $("#btn_select_prize").hide();
      $('#save_personal_data').show();
      $('.user-data input, .user-data select').attr('disabled', false).addClass('edit');
      $('.user-data input').eq(0).focus();

      $("#editformphone").mask("+7 (999) 999-9999",{completed:function(){
         $("#phonevalid").addClass('success');
      }});
      $( "#datebirth" ).datepicker({
         dateFormat: "dd.mm.yy",
         maxDate: "-18y"
      });
      $( "#datebirth").mask("99.99.9999");
      $("#editforminn").mask("999999999999",{completed:function(){
         $("#inn_validate").addClass('success');
      }});
   });
   if ($('#changegender').length > 0) {
      $('#changegender').change(function () {
         var gender = $(this).attr('value');// == 'radio_1' ? 0 : 1;
         $.post("/updateGender", {_token: $("input[name='_token']").val(),sex: gender },
             function (data) {
          });
      });
   }
   $('#save_personal_data').click(function(){
      var data = $( "#editform :input" ).serializeArray();
      $.post("/UpdateProfile", data,
          function (data) {
             $.post("/ValidateProfile", {_token: $("input[name='_token']").val() },
                 function (data) {
                     if(data.state=="1"){
                        $("#btn_select_prize").show();
                     }
              });
       });
      $(this).hide();
      $('#change_personal_data').show();
      $('.user-data input, .user-data select').attr('disabled', true).removeClass('edit');
   });
   if ($('.winners').length > 0){
      $('.owl-carousel.backpack-carusel').owlCarousel({
         nav: true,
         navText: [],
         margin: 0,
         items: 1,
         onChanged: function(element, info, callbackName){
            var index = element.item.index + 1;
            $('.number-backpack').text(index);
         },
         onInitialized: function(element){
            var index = element.item.index + 1;
            var count = element.item.count;
            $('.number-backpack').text(index);
            $('.total-backpack').text(count);
         }
      });

      $('.owl-carousel').owlCarousel({
         nav: true,
         navText: [],
         margin: 0,
         items: 1,
         onChanged: function(element, info, callbackName){
            var index = element.item.index + 1;
            $('.number-t-shirt').text(index);
         },
         onInitialized: function(element){
            var index = element.item.index + 1;
            var count = element.item.count;
            $('.number-t-shirt').text(index);
            $('.total-shirt').text(count);
         }
      });

   }

   $('.t-shirt, .backpack').click(function(){
      var className = $(this).attr('class').split(' ')[0];

      if (className == 't-shirt') {
         $('.backpacks').fadeOut(function(){
            $('.' + className + 's').fadeIn();
         });
      } else {
         $('.t-shirts').fadeOut(function(){
            $('.' + className + 's').fadeIn();
         });
      }
      $('.t-shirt, .backpack').removeClass('active');
      $('.' + className).addClass('active');
   });


   $('label.radio').click(function(){
     // $('label.radio').removeClass('active');
      if($(this).hasClass('active')){
         $(this).removeClass('active');
         return;
      }
      $(this).addClass('active');

   });


   $('.guaranteed-prizes .container').hover(function(){
      $(this).children().addClass('flip');
      var self = $(this);
      setTimeout(function(){
         self.find('.balls.origin').hide();
         self.find('.box-1 p').hide();
      }, 100);
   }, function(){
      $(this).children().removeClass('flip');
      var self = $(this);
      setTimeout(function(){
         self.find('.balls.origin').show();
         self.find('.box-1 p').show();
      }, 100);
   });

   $('.guaranteed-prizes-for-ie .container').hover(function(){
      $(this).find('.box-2').show();
   }, function(){
      $(this).find('.box-2').hide();
   });


   $('.how-to-get-more-balls').click(function(){
      $(this).addClass('active');
      if ($('.mobile-scope').length > 0) {

         $('.backdrop-lk').css({'height': $('.wrapper').height() + 96}).show();
      }
      $('.backdrop').show();
      $('.notify').show();
   });

   $('.backdrop, .backdrop-lk, .close-popup').click(function(){
      $('.how-to-get-more-balls').removeClass('active');
      if ($('.mobile-scope').length > 0) {
         $('.backdrop-lk').hide();
      }
      $('.backdrop').hide();
      $('.notify').hide();
      return false;
   });

   if ($('.prizes').length > 0) {
      /*$('.prizes').niceScroll({
         cursorcolor: '#fdd00f',
         cursorfixedheight: 70
      });*/
   }

   $('.personal-data-form .social a').click(function(){
         if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            return;
         }
         $(this).addClass('active');
   });

  
   if ($('.stickers').length > 0) {
      $('.stickers').owlCarousel({
         nav: true,
         navText: [],
         margin: 0,
         items: 5,
         slideBy: 5,
         navRewind: false
      });
   }

   if ($('.tabs-promo-codes-and-orders').length > 0 ) {
      $('.tabs-promo-codes-and-orders a').click(function(){
        // carouselSticker.trigger('to.owl.carousel', 0);
         $('.tabs-promo-codes-and-orders a').removeClass('active');
         $(this).addClass('active');

         var number = $(this).data('number');
         $('.tabs').hide();
         $('.tab-' + number).show();
         return false;
      });
   }


   $('.stickers-block .items li').click(function(){
      if(!($(this).hasClass('disabled'))) {
         $('.stickers-block .items li').removeClass('active');
         $(this).addClass('active');
      } else {
         $('.backdrop-constructor').show();
         $(this).find('.open-stickers-block').show();
      }
   });

   $('.backdrop-constructor').click(function(){
      $('.open-stickers-block').hide();
      if ($('.magnifier').length > 0) {
         $('.magnifier-block').removeClass('active');
         $('.magnifier').removeClass('active');
      }
      $(this).hide();
   });

   $('.man-and-woman-block > div').click(function(){
      $('.man-and-woman-block > div').removeClass('active');
      $(this).addClass('active');
   });


   $('.all-size-block > div').click(function(){
      $('.all-size-block > div').removeClass('active');
      $(this).addClass('active');
   });


   $('#add_text').click(function(){
      if( $('#point1').hasClass('disabled') && $('#point2').hasClass('disabled') && $('#point3').hasClass('disabled') ){
         $('.notBalls').css('z-index', 9999);
         $('.notBalls').show();
      } else {
         $('.notBalls').hide();
      }
      $('#addTextModal').arcticmodal({
         overlay: {
            css: {
               backgroundColor: '#000000',
               opacity: .6
            }
         }
      });


   });

   $('.all-size-block').mouseover(function(){
      $(this).css({'z-index': 100});
      $('.backdrop-constructor').show();
   }).mouseout(function(){
      $('.backdrop-constructor').hide();
      $(this).css({'z-index': 1});
   });


   
   $('.size').hover(function(){
      var gender = $('.man-and-woman-block').find('.active').attr('class');
      gender_type = gender.split('-')[0];
      $(this).css({'z-index': 100});
      $(this).find('.size-example'+ '.' + gender_type).show();
   }, function(){
      $(this).css({'z-index': 0});
      $(this).find('.size-example').hide();
   });

   $('.size-example').click(function(){
      return false;
   });

   $('.prise').click(function(){
      $(".notify").hide();
      $(".prise").removeClass('active');
      if ($(this).find('.notify').length > 0) {
         $(this).addClass('active');
         $(this).find('.notify').show();

         if($('.mobile-scope').length > 0) {
            var backdrop_height = $('.wrapper').height();
         } else {
            var backdrop_height = $(document).height();
         }

         $('.backdrop-prizes').css({'height': backdrop_height + 'px'}).show();
      }
   });

   $('.backdrop-prizes').click(function(){
      $('.prise').removeClass('active');
      $(this).hide();
      $('.notify').hide();
   });
   
   if($('.constructor-controller-item').length > 0) {
      $('.constructor-controller-item').click(function(){
         $('.constructor-controller-item').removeClass('active');
         $(this).addClass('active');
         if($(this).hasClass('sticker-item')){
            $('#stickerModal').arcticmodal({
               overlay: {
                  css: {
                     backgroundColor: '#b39c8a',
                     opacity: .9
                  }
               },

               afterOpen: function(){
                  $('#stickerModal .stickers-mobile').owlCarousel({
                     nav: true,
                     navText: [],
                     margin: 20,
                     items: 3
                  });
               },

               afterClose: function(){
                  $('.constructor-controller-item.active').removeClass('active');
               }
            });
         } else if ($(this).hasClass('pattern-item')){
            $('#slider').show();
            $('.backdrop-constructor').show();
            $('.backdrop-constructor').click(function(){
               $('.constructor-controller-item.active').removeClass('active');
               $('#slider').hide();
            })
         } else if ($(this).hasClass('add-text-item')){
            $('#addTextModal').arcticmodal({
               overlay: {
                  css: {
                     backgroundColor: '#b39c8a',
                     opacity: .9
                  }
               },
               afterClose: function(){
                  $('.constructor-controller-item.active').removeClass('active');
               }
            });
         }
      });
   }

   function GetParams( name, url ) {
      if (!url) url = location.href;
      name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
      var regexS = "[\\?&]"+name+"=([^&#]*)";
      var regex = new RegExp( regexS );
      var results = regex.exec( url );
      return results == null ? null : results[1];
   }
   var d = GetParams('modal', document.location);
   if(d=='login'){
      $('#authModal').arcticmodal({
         overlay: {
            css: {
               backgroundColor: '#000000',
               opacity: .9
            }
         }
      });
      $(".login").show();
      $("#register_tab").addClass("active");
      $("#login_tab").removeClass("active");
      $(".registration").show();
       setTimeout(function(){
           $('#phoneregisterform').focus();
       }, 100);
      $(".login").hide();
   }

    $('#register_tab').click(function(){
        setTimeout(function(){
            $('#phoneregisterform').focus();
        }, 100);
    });



   (function(){
      if ($('.mobile-scope').length > 0) {
         var count = 1;
         $('.fa-caret-right').click(function(){
            count = count + 1;
            if (count == 2) {
               $('.fa-caret-left').show();
               $('.open-group-text span b').text('3 балла');
               $('#stickerModal .notify').text('За 3 балла открой 1-ю и 2-ю группы сразу');
            }

            if (count == 3) {
               $('.fa-caret-right').hide();
               $('.fa-caret-left').show();
               $('.open-group-text span b').text('5 баллов');
               $('#stickerModal .notify').text('Получи доступ ко всем группам сразу за 5 баллов');
            }

            $('.group').css({'z-index': 1});
            $('.group-' + count).css({'z-index': 2});
            $('.number-group').text(count);
         });

         $('.fa-caret-left').click(function(){
            count = count - 1;

            if (count == 2) {
               $('.fa-caret-right').show();
               $('.open-group-text span b').text('3 балла');
               $('#stickerModal .notify').text('За 3 балла открой 1-ю и 2-ю группы сразу');
            }

            if (count == 1) {
               $('.fa-caret-left').hide();
               $('.open-group-text span b').text('2 балла');
               $('#stickerModal .notify').text('Получи доступко всем группам сразу за 5 баллов');
            }

            $('.group').css({'z-index': 1});
            $('.group-' + count).css({'z-index': 2});
            $('.number-group').text(count);

         });

         $('.btn-open-group').click(function(){
               //$('#stickerModal').arcticmodal('close');
         });

         $('#helloModal #btn_next').click(function(){
               $('#helloModal').arcticmodal('close');
         });

         $('.stickers-items li').click(function(){
            if ($(this).hasClass('disabled')){
               return;
            } else {
               $('.stickers-items li').removeClass('active');
               $(this).addClass('active');
               var number = $(this).data('number');
               $('.group').css({'z-index': 1});
               $('.group-' + number).css({'z-index': 2});
               $('.number-group').text(number);
            }
         });
      }
   }());


   if ($('.icon-menu').length > 0){
      $('.icon-menu').click(function(){
         if ($(this).hasClass('open')){
            closeMenu();
            return;
         }
         openMenu();
      });
   }

   $('.backdrop-menu').click(function(){
      closeMenu();
   });


   if ($('input[type="range"]').length > 0 && $('input[type="range"]').rangeslider) {
      $('input[type="range"]').rangeslider({ polyfill: false });
   }

   if($(".mypageredirect").length>0){
      $(".mypageredirect").click(function () {
         if($(".mypageredirect").html()=='Выйти'){
            window.location.href = "/logout";
         }else {
            window.location.href = "/mypage";
         }
      });
   }


   if ($('.magnifier').length > 0) {
      $('.magnifier').click(function(){
         var magnifier_block = $(this).find('.magnifier-block');

         magnifier_block.click(function(){
            return false;
         });

         if (magnifier_block.hasClass('active')){
            $(this).removeClass('active');
            magnifier_block.removeClass('active');
            $('.backdrop-constructor').hide();
            return;
         }
         magnifier_block.addClass('active');
         $(this).addClass('active');
         $('.backdrop-constructor').show();
      });
   }

});
