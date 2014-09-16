var popup_open = false;

$(document).ready(function () {
    
    $(window).scroll(function () {
        CheckScrollPosition();
    });
    $(window).resize(function () {
        CheckScrollPosition();
        UpdatePopupViewerRatio();
    });
    
    // Sticky Nav
    var navTop = $('.header-nav').offset().top;
    function CheckScrollPosition () {
        if ($(document).scrollTop() > navTop && Viewport().width > 1047) {
            $('.header-nav').addClass('fixednav');
            $('#spacer1').css('display', 'block');
        } else {
            $('.header-nav').removeClass('fixednav');
            $('#spacer1').css('display', 'none');
        }
    }
    
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
    var ratio = 0;
    function UpdatePopupViewerRatio () {
        ratio = $('.popup-viewer').width() / $('.popup-viewer').height();
        if ($('.popup-viewer img:nth-child(' + counter + ')').width() / $('.popup-viewer img:nth-child(' + counter + ')').height() > ratio) {
            $('.popup-viewer img:nth-child(' + counter + ')').css({'width': '100%', 'height': 'auto'});
        } else if ($('.popup-viewer img:nth-child(' + counter + ')').width() / $('.popup-viewer img:nth-child(' + counter + ')').height() < ratio) {
            $('.popup-viewer img:nth-child(' + counter + ')').css({'width': 'auto', 'height': '100%'});                                                      
        }
        if (1.77777 > ratio) {
            $('.popup-viewer iframe:nth-child(' + counter + ')').css('width', '100%');
            $('.popup-viewer iframe:nth-child(' + counter + ')').css('height', $('.popup-viewer iframe:nth-child(' + counter + ')').width() / 1.77777);
        } else if (1.77777 < ratio) {
            $('.popup-viewer iframe:nth-child(' + counter + ')').css('height', '100%');
            $('.popup-viewer iframe:nth-child(' + counter + ')').css('width', $('.popup-viewer iframe:nth-child(' + counter + ')').height() * 1.77777);
        }
    }
    function AddPinterestLink () {
        if ($('.popup-viewer > a').index() > -1) {
            if (counter >= $('.popup-viewer > a:has(img)').index() + 1) {
                $('.popup-controls-buttonbox-button_pinterest').addClass('popup-controls-buttonbox-button_clickable');
                $('a:has(.popup-controls-buttonbox-button_pinterest)').attr('href', 'http://pinterest.com/pin/create/button/?url=http://isaacmailach.github.io' + window.location.pathname + '&amp;media=http://isaacmailach.github.io/' + $('.popup-viewer > a:nth-child(' + counter + ') > img').attr('src') + '&amp;description=')
            } else {
                $('.popup-controls-buttonbox-button_pinterest').removeClass('popup-controls-buttonbox-button_clickable');
                $('a:has(.popup-controls-buttonbox-button_pinterest)').removeAttr('href');
            }
        } else {
            $('.popup-controls-buttonbox-button_pinterest').removeClass('popup-controls-buttonbox-button_clickable');
            $('a:has(.popup-controls-buttonbox-button_pinterest)').removeAttr('href');
        }
    }
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
            $('.popup-content-image_link').attr('href', $(item_info).find('item[id="' + item_id + '"]').find('link').text())
            $('.popup-viewer').append($(item_info).find('item[id="' + item_id + '"]').find('other').text());
            var video = $(item_info).find('item[id="' + item_id + '"]').find('video');
            for (var id = 0; id < video.length; id++) {
                $('.popup-viewer').append('<iframe class="popup-viewer-videobox-video" src="' + video[id].textContent + '" frameborder="0" allowfullscreen></iframe>');
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
                    $('.popup-viewer').append('<a href="img/' + image[id].textContent + '" target="_blank"><img class="popup-viewer-image" src="img/' + image[id].textContent + '" /></a>');
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
            AddPinterestLink();
            setTimeout(function () {UpdatePopupViewerRatio(); $('.popup-viewer > *').css('opacity', '1');}, 280);
            $('.popup-viewer *').click(function () {
                event.stopPropagation();
            });
        })
            .fail(function() {
                alert('Sorry! Cannot connect to server. Please check your internet connection and try again.');
            });
        popup_open = true;
        event.stopPropagation();
    });
    $(document).keydown(function (e) {
        if (e.keyCode === 27) {
            ClosePopup();
        }
    });
    $('.popup-viewer').click(function () {
        ClosePopup();
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
        setTimeout(function () {UpdatePopupViewerRatio();}, 280);
    });
    $('.popup-controls-buttonbox-button_right').click(function () {
        if (right) {
            counter++;
            $('.popup-viewer > *:nth-child(' + (counter - 1) + ')').css('display', 'none');
            $('.popup-viewer > *:nth-child(' + counter + ')').css('display', 'initial');
            left = true;
            $('.popup-controls-buttonbox-button_left').addClass('popup-controls-buttonbox-button_clickable');
            if (counter === $('.popup-viewer > *').length) {
                right = false;
                $('.popup-controls-buttonbox-button_right').removeClass('popup-controls-buttonbox-button_clickable');
            }
            AddPinterestLink();
            setTimeout(function () {UpdatePopupViewerRatio();}, 1);
        }
    });
    $('.popup-controls-buttonbox-button_left').click(function () {
        if (left) {
            counter += -1;
            $('.popup-viewer > *:nth-child(' + (counter + 1) + ')').css('display', 'none');
            $('.popup-viewer > *:nth-child(' + counter + ')').css('display', 'initial');
            if (counter === 1) {
                left = false;
                $('.popup-controls-buttonbox-button_left').removeClass('popup-controls-buttonbox-button_clickable');
            }
            right = true;
            $('.popup-controls-buttonbox-button_right').addClass('popup-controls-buttonbox-button_clickable');
            AddPinterestLink();
            setTimeout(function () {UpdatePopupViewerRatio();}, 1);
        }
    });
    
});

function ClosePopup () {
    $('.popup').removeClass('hidden');
    $('.popup').removeClass('open');
    setTimeout(function () {$('.popup').css('display', 'none'); $('.popup-viewer').empty();}, 280);
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