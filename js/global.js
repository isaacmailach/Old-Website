$(document).ready(function () {
    if ($(document).height() > $(window).height() === false) {
        $('.footer').css({'position': 'absolute', 'bottom': '0'});
    }
});
var ItemInfoPopup = function(item_id) {
        alert('I have been clicked!' + item_id);
}
