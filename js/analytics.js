$(document).ready(function(){

    function analytics(variant){
        console.log('analytics:', variant);
        switch(variant){
            case 'prizes':
                ga('send', 'event', 'ClickToPrize', 'HomePage', 'Prizy');
                break;
            case 'user-register':
                ga('send', 'event', 'ClickToReg', 'HomePage', 'Registration');
                break;
            case 'auth':
                ga('send', 'event', 'ClickToAuth', 'HomePage', 'Authorization');
                break;
            case 'password-recover':
                ga('send', 'event', 'ClickToPasswordForgot', 'AuthModal', 'PasswordForgot');
                break;
            case 'code-register':
                ga('send', 'event', 'ClickToCodeReg', 'HomePage', 'CodeRegistration');
                break;
            case 'feedback-send':
                ga('send', 'event', 'ClickToSentFeedbackButton', 'FeedbackPage', 'Otpravit');
                break;
        }
    }

    $('[data-analytics]').click(function(){
        var variant = $(this).data('analytics');

        analytics(variant);
    });

});