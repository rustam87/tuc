/**
 * Created by Nikolay on 08.04.2016.
 */
var Timeout;
function WarningModal(selector) {
    if($("#mobile").length != 0) return;
    $(selector).jrumble({
        speed: 100
    });
    clearTimeout(Timeout);
    $(selector).trigger('startRumble');
    Timeout = setTimeout(function(){$(selector).trigger('stopRumble');}, 500)
}