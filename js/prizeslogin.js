$(document).ready(function(){
    $(".box").click(function () {
        $('#authModal').arcticmodal({
            overlay: {
                css: {
                    backgroundColor: '#000000',
                    opacity: .9
                }
            }
        });
    });
});
