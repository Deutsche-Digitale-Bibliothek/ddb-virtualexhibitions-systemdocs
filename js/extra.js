(function( $ ) {
  $(function() {
    $('figure > img').click(function(event) {
        event.preventDefault();
        event.stopPropagation();
        var lightboxContainer = $('<div class="lightbox"/>');
        lightboxContainer.append($(this).clone());
        $('body').append(lightboxContainer);
        lightboxContainer.click(function(event) {
            event.preventDefault();
            event.stopPropagation();
            $(this).remove();
        });
    });
  });
})(jQuery);