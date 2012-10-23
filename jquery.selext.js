(function( $ ) {
  $.fn.selext = function() {
    return this.filter('select').each(function() {
        var $this = $(this),
        $options = $this.children(),
        $selected = $('<span class=selext-current/>'),
        $list = $('<ul class=selext-options/>');
        $options.each(function(){
            var $this = $(this);
            $option = $('<li/>').addClass('selext-option');
            if($this.filter(':selected').length > 0){
                $option.addClass('selext-selected');
            }
            $option.text($this.text()).data('value',$this.attr('value')||$this.text());
            $list.append($option);
        });
        $selected.text($options.filter(':selected').text() || $options.first().text())
        $list.on('click','li', function(){
            $list.children().removeClass('selext-selected');
            $selected.text($(this).addClass('selext-selected').text());
            $list.hide();
            $this.val($(this).data('value'));
            $selected.removeClass('selext-open');
        });
        $container = $('<div class=selext>').append($selected).append($list).hover(function(){$list.show(); $selected.addClass('selext-open');},function(){$list.hide(); $selected.removeClass('selext-open');});
        $this.before($container).hide();
        $list.css('top',$container.height());
    });
  };
})( jQuery );