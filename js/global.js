$(document).ready(function () {
    if ($(document).height() > $(window).height() === false) {
        $('.footer').css({'position': 'absolute', 'bottom': '0'});
    }
    $('.content-block-item-heading').click(function () {
        $('.popup').css({'display': 'block', 'opacity': '1'});
        var item_id = $(this).parent().data('id');
        $.get('data/item_info.xml', function (item_info){
            $('.popup-content-heading').html($(item_info).find('item[id="' + item_id + '"]').find('heading').text());
            $('.popup-content-text').html($(item_info).find('item[id="' + item_id + '"]').find('text').text());
        })
            .fail(function() {
                alert('fail');
            });
    });
});
