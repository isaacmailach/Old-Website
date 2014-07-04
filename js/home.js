$(document).ready(function() {

    // Fixed About Block
    $(window).scroll(function() {
        if ($(document).scrollTop() > $('.content').offset().top) {
            $('.content-aside').css({'position': 'fixed', 'right': '30px', 'top': '30px'});
        } else if ($(document).scrollTop() < $('.content').offset().top) {
            $('.content-aside').css({'position': 'static'});
        }
    });
});
