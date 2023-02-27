$( document ).ready(function() {

    $( ".menu-close" ).hide();
    $( ".menu" ).hide();
    $( ".hamburger" ).click(function() {
        $( ".menu" ).css({
            'left': '0',
            'right': '0'
        });
        $( ".menu" ).slideToggle( "slow", function() {
            $( ".hamburger" ).hide();
            $( ".menu-close" ).show();
        });
    });
    
    $( ".menu-close" ).click(function() {
        $( ".menu" ).slideToggle( "slow", function() {
            $( ".menu-close" ).hide();
            $( ".hamburger" ).show();
        });
    });
    
});

