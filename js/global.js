var popup_open = false;

$(document).ready(function () {
    
    // Sticky Nav
    var navTop = $('.header-nav').offset().top;
    $(window).scroll(function () {
        CheckScrollPosition();
    });
    $(window).resize(function () {
        CheckScrollPosition();
    });
    
    // Fade-In on Image Load
    if (!ie()) {
        $('img').addClass('invisible')
        $('img').bind('load', function() {
            $(this).addClass('fadein');
        });
    }
    
    // AJAX Info Popup
    var hidden = false;
    var right = false;
    var left = false;
    var counter = 1;
    $('.content-block-itembox-item-overlay-audio').click(function () {
        event.stopPropagation();
    });
    $('.content-block-itembox-item').click(function () {
        var item_id = $(this).data('id');
        $('.popup-viewer').empty();
        $('.popup-content-image').attr('src','');
        //$('.popup-viewer').html('<i class="icon icon-loading"></i>')
        $('.popup').css('display', 'block');
        if (Viewport().width < 702) {
            hidden = true;
        }
        setTimeout(function () {
            $('.popup').addClass('open');
            if (hidden) {
                $('.popup').addClass('hidden');
            }
        }, 1);
        $.get('data/item-info.xml', function (item_info){
            $('.popup-content-text-heading').html($(item_info).find('item[id="' + item_id + '"]').find('heading').text());
            $('.popup-viewer').append($(item_info).find('item[id="' + item_id + '"]').find('other').text());
            var video = $(item_info).find('item[id="' + item_id + '"]').find('video');
            for (var id = 0; id < video.length; id++) {
                $('.popup-viewer').append('<iframe class="popup-viewer-video" src="' + video[id].textContent + '" frameborder="0" allowfullscreen></iframe>');
            }
            var audio = $(item_info).find('item[id="' + item_id + '"]').find('audio');
            for (var id = 0; id < audio.length; id++) {
                $('.popup-viewer').append('<audio class="popup-viewer-audio" controls><source src="audio/' + audio[id].textContent + '.ogg" type="audio/ogg" /><source src="audio/' + audio[id].textContent + '.mp3" type="audio/mpeg" /></audio>');
            }
            var image = $(item_info).find('item[id="' + item_id + '"]').find('image');
            for (var id = 0; id < image.length; id++) {
                if (id == 0) {
                    $('.popup-content-image').attr('src', 'img/' + image[id].textContent);
                } else {
                    $('.popup-viewer').append('<a href="img/' + image[id].textContent + '"><img class="popup-viewer-image" src="img/' + image[id].textContent + '" /></a>');
                }
            }
            $('.popup-content-text-body').html($(item_info).find('item[id="' + item_id + '"]').find('text').text());
            if ($('.popup-viewer > *').length > 1) {
                right = true;
                left = false;
                $('.popup-viewer > *:nth-child(n+2)').css('display', 'none');
                $('.popup-controls-buttonbox-button_right').addClass('popup-controls-buttonbox-button_clickable');
                $('.popup-controls-buttonbox-button_left').removeClass('popup-controls-buttonbox-button_clickable');
            } else {
                left = false;
                right = false;
                $('.popup-controls-buttonbox-button_right').removeClass('popup-controls-buttonbox-button_clickable');
                $('.popup-controls-buttonbox-button_left').removeClass('popup-controls-buttonbox-button_clickable');
            }
            counter = 1;
        })
            .fail(function() {
                alert('fail');
            });
        popup_open = true;
        event.stopPropagation();
    });
    $(document).keydown(function (e) {
        if (e.keyCode === 27) {
            ClosePopup();
        }
    });
    $('.popup-controls-buttonbox-button_close').click(function () {
        ClosePopup();
    });
    $('.popup-controls-buttonbox-button_toggle').click(function () {
        if (hidden) {
            hidden = false;
            $('.popup').removeClass('hidden');
        } else {
            hidden = true;
            $('.popup').addClass('hidden');
        }
    });
    $('.popup-controls-buttonbox-button_right').click(function () {
        if (right) {
            counter++;
            $('.popup-viewer > *:nth-child(' + (counter - 1) + ')').css('display', 'none');
            $('.popup-viewer > *:nth-child(' + counter + ')').css('display', 'block');
            left = true;
            $('.popup-controls-buttonbox-button_left').addClass('popup-controls-buttonbox-button_clickable');
            if (counter = $('.popup-viewer > *').length) {
                right = false;
                $('.popup-controls-buttonbox-button_right').removeClass('popup-controls-buttonbox-button_clickable');
            }
        }
    });
    $('.popup-controls-buttonbox-button_left').click(function () {
        if (left) {
            counter += -1;
            $('.popup-viewer > *:nth-child(' + (counter + 1) + ')').css('display', 'none');
            $('.popup-viewer > *:nth-child(' + counter + ')').css('display', 'block');
            if (counter = 1) {
                left = false;
                $('.popup-controls-buttonbox-button_left').removeClass('popup-controls-buttonbox-button_clickable');
            }
            right = true;
            $('.popup-controls-buttonbox-button_right').addClass('popup-controls-buttonbox-button_clickable');
        }
    });
    
    function CheckScrollPosition () {
        if ($(document).scrollTop() > navTop && Viewport().width > 1047) {
            $('.header-nav').addClass('fixednav');
            $('#spacer1').css('display', 'block');
        } else {
            $('.header-nav').removeClass('fixednav');
            $('#spacer1').css('display', 'none');
        }
    }
});

function ClosePopup () {
    $('.popup').removeClass('hidden');
    $('.popup').removeClass('open');
    $('.popup-viewer').empty();
    setTimeout(function () {$('.popup').css('display', 'none');}, 280);
    popup_open = false;
}
function Viewport() {
    var e = window, a = 'inner';
    if (!('innerWidth' in window )) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
}

function ie() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
        return true;
    } else {
        return false;
    }
}