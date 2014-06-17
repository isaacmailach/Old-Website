$(document).ready(function () {
    if ($(document).height() > $(window).height() === false) {
        $('.footer').css({'position': 'absolute', 'bottom': '0'});
    }
    $('.content-block-item-heading').click(function () {
        $.get('data/item_info.xml', function (item_info){
                alert('success');
        })
            .fail(function() {
                alert('fail');
            });
        $(this).parent().data('id')
    });
});
