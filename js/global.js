var popup_open = false;

$(document).ready(function () {

    // Background Paralax Effect
    var scroll_height = $(document).height() - $(window).height();
    $(document).scroll(function () {
        $('.background').css('top', - $(document).scrollTop() / scroll_height * $(window).height() / 10);
    })

    // AJAX Info Popup
    $('.content-block-item').click(function () {
        var item_id = $(this).data('id');
        $('.popup-viewer').empty();
        $('.popup-content-image').attr('src','');
        $('.popup-content-other').html('<img class="popup-content-loading" src="img/loading.gif" />')
        $('.popup').addClass('displayflex');
        setTimeout(function () {$('.popup').css('opacity', '1');}, 1);
        $.get('data/item-info.xml', function (item_info){
            $('.popup-content-heading').html($(item_info).find('item[id="' + item_id + '"]').find('heading').text());
            $('.popup-viewer').append($(item_info).find('item[id="' + item_id + '"]').find('other').text());
            var images = $(item_info).find('item[id="' + item_id + '"]').find('image');
            for (var id = 0; id < images.length; id++) {
                if (id == 0) {
                    $('.popup-content-image').attr('src', 'img/' + images[id].textContent);
                } else {
                    $('.popup-viewer').append('<img class="popup-viewer-image" src="img/' + images[id].textContent + '" />');
                }
            }
            $('.popup-content-text').html($(item_info).find('item[id="' + item_id + '"]').find('text').text());
        })
            .fail(function() {
                alert('fail');
            });
        popup_open = true;
        event.stopPropagation();
    });
    $('.popup-content').click(function () {
        event.stopPropagation();
    });
    $(document).click(function () {
        ClosePopup();
    });
    $(document).keydown(function (e) {
        if (e.keyCode === 27) {
            ClosePopup();
        }
    });

});

function ClosePopup () {
    $('.popup').css('opacity', '0');
    setTimeout(function () {$('.popup').removeClass('displayflex');}, 150);
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