var popup_open = false;

$(document).ready(function () {
    if ($(document).height() > $(window).height() === false) {
        $('.footer').css({'position': 'absolute', 'bottom': '0'});
    }
    $('.content-block-item-heading').click(function () {
        $('.popup').css('display', 'block')
        setTimeout(function () {$('.popup').css('opacity', '1');}, 1);
        var item_id = $(this).parent().data('id');
        $.get('data/item_info.xml', function (item_info){
            $('.popup-content-heading').html($(item_info).find('item[id="' + item_id + '"]').find('heading').text());
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
    setTimeout(function () {$('.popup').css('display', 'none');}, 150);
    popup_open = false;
}
