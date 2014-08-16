var popup_open = false;

$(document).ready(function () {
    
    // Fade-In on Image Load
    if (!ie()) {
        $('img').addClass('invisible')
        $('img').bind('load', function() {
            $(this).addClass('fadein');
        });
    }
    
    // AJAX Info Popup
    $('.content-block-itembox-item-overlay-audio').click(function () {
        event.stopPropagation();
    });
    $('.content-block-itembox-item').click(function () {
        var item_id = $(this).data('id');
        $('.popup-viewer').empty();
        $('.popup-content-image').attr('src','');
        //$('.popup-viewer').html('<i class="icon icon-loading"></i>')
        $('.popup').css('display', 'block');
        setTimeout(function () {$('.popup').css('opacity', '1');}, 1);
        $.get('data/item-info.xml', function (item_info){
            $('.popup-content-text-heading').html($(item_info).find('item[id="' + item_id + '"]').find('heading').text());
            $('.popup-viewer').append($(item_info).find('item[id="' + item_id + '"]').find('other').text());
            var video = $(item_info).find('item[id="' + item_id + '"]').find('video');
            for (var id = 0; id < video.length; id++) {
                $('.popup-viewer').append('<iframe class="popup-viewer-video" src="' + video[id].textContent + '" frameborder="0" allowfullscreen></iframe>');
            }
            var audio = $(item_info).find('item[id="' + item_id + '"]').find('audio');
            for (var id = 0; id < audio.length; id++) {
                $('.popup-viewer').append('<audio class="popup-viewer-audio"><source src="audio/' + audio[id].textContent + '.ogg" type="audio/ogg" /><source src="audio/' + audio[id].textContent + '.mp3" type="audio/mpeg" /></audio>');
            }
            var image = $(item_info).find('item[id="' + item_id + '"]').find('image');
            for (var id = 0; id < image.length; id++) {
                if (id == 0) {
                    $('.popup-content-image').attr('src', 'img/' + image[id].textContent);
                } else {
                    $('.popup-viewer').append('<img class="popup-viewer-image" src="img/' + image[id].textContent + '" />');
                }
            }
            $('.popup-content-text-body').html($(item_info).find('item[id="' + item_id + '"]').find('text').text());
            if ($('.popup-viewer > *').length > 1) {
                $('.popup-viewer > *:nth-child(n+2)').css('display', 'none');
                $('.popup-controls-buttonbox-button_right').addClass('popup-controls-buttonbox-button_clickable');
                var counter = 1;
                $('.popup-controls-buttonbox-button_right.popup-controls-buttonbox-button_clickable').click(function () {
                    counter++;
                    $('.popup-viewer > *:nth-child(' + (counter - 1) + ')').css('display', 'none');
                    $('.popup-viewer > *:nth-child(' + counter + ')').css('display', 'block');
                    if (counter > 1) {
                        $('.popup-controls-buttonbox-button_left').addClass('popup-controls-buttonbox-button_clickable');
                    }
                    if (counter = $('.popup-viewer > *').length) {
                        $('.popup-controls-buttonbox-button_right').removeClass('popup-controls-buttonbox-button_clickable');
                    }
                });
                $('.popup-controls-buttonbox-button_left.popup-controls-buttonbox-button_clickable').click(function () {
                    counter += -1;
                    $('.popup-viewer > *:nth-child(' + (counter + 1) + ')').css('display', 'none');
                    $('.popup-viewer > *:nth-child(' + counter + ')').css('display', 'block');
                    if (counter = 1) {
                        $('.popup-controls-buttonbox-button_left').removeClass('popup-controls-buttonbox-button_clickable');
                    }
                    $('.popup-controls-buttonbox-button_right').addClass('popup-controls-buttonbox-button_clickable');
                });
            } else {
                $('.popup-controls-buttonbox-button_right').removeClass('popup-controls-buttonbox-button_clickable');
                $('.popup-controls-buttonbox-button_left').removeClass('popup-controls-buttonbox-button_clickable');
            }
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
});

function ClosePopup () {
    $('.popup').css('opacity', '0');
    setTimeout(function () {$('.popup').css('display', 'none');}, 150);
    popup_open = false;
}
function viewport() {
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