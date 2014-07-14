$(document).ready(function() {

    // Fixed About Block
    $(window).scroll(function() {
        if ($(document).scrollTop() > $('.content').offset().top && viewport().width > 1147) {
            $('.content-aside').css({'position': 'fixed', 'right': '15px', 'top': '15px'});
            if (viewport().width > 1192) {
                $('.content-aside').css({'right': '30px', 'top': '30px'});
            }
        } else {
            $('.content-aside').css({'position': 'static'});
        }
    });
    $(window).resize(function() {
        if ($(document).scrollTop() > $('.content').offset().top && viewport().width > 1147) {
            $('.content-aside').css({'position': 'fixed', 'right': '15px', 'top': '15px'});
            if (viewport().width > 1192) {
                $('.content-aside').css({'right': '30px', 'top': '30px'});
            }
        } else {
            $('.content-aside').css({'position': 'static'});
        }
    });
    
    // "Read more" Link
    
});
