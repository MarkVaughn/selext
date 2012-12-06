(function( $ ) {
  $.fn.selext = function(o) {
  s = {
		openOn: 'hover', // 'click', 'hover',
		keepClases: true // transfer the select boxes classes to the new element
	};
	/* Processing settings */
	s = jQuery.extend(s, o || {});
    return this.filter('select').each(function() {
        var $this = $(this),
        $options = $this.children(),
        classes = $this.attr('class'),
        $selected = $('<span class=selext-current/>'),
        $list = $('<ul class=selext-options/>'),
        fShow = function(){$list.show(); $selected.addClass('selext-open');},
        fHide = function(){$list.hide(); $selected.removeClass('selext-open');};
        $options.each(function(){
            var $this = $(this);
            $option = $('<li/>').addClass('selext-option');
            if($this.filter(':selected').length > 0){
                $option.addClass('selext-selected');
            }
            $option.text($this.text()).data('value',$this.attr('value')||$this.text());
            $list.append($option);
        });
        
        $selected.text($options.filter(':selected').text() || $options.first().text());
        $list.on('click','li', function(){
            $list.children().removeClass('selext-selected');
            $selected.text($(this).addClass('selext-selected').text());
            $list.hide();
            $this.val($(this).data('value'));
            $selected.removeClass('selext-open');
        });
        $container = $('<div class="'+(s.keepClases &&  classes.length > 0 ? classes + ' ' : '' )+'selext">').append($selected).append($list);
        switch(s.openOn){
        	case 'click':
        		$selected.on('click',fShow);
        	break;
        	case 'hover':
        	default:
        		$container.on('mouseenter',fShow);
        	break;
        }
        $container.on('mouseleave',fHide);
        $this.before($container).hide();
        $list.css('top',$container.height());
    });
  };
})( jQuery );