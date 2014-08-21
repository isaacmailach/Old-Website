$(document).ready(function() {

    // Fixed About Block
    $(window).scroll(function () {
        CheckScrollPosition2();
    });
    $(window).resize(function () {
        CheckScrollPosition2();
    });
    
});

function CheckScrollPosition2 () {
    if ($(document).scrollTop() > $('.content').offset().top - 50 && Viewport().width > 1047) {
        $('.content-aside').css({'position': 'fixed', 'right': '15px', 'top': '65px'});
        if (Viewport().width > 1092) {
            $('.content-aside').css({'right': '30px', 'top': '80px'});
        }
    } else {
        $('.content-aside').css({'position': 'static'});
    }
}