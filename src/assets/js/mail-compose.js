/*===================================================================================================

 - TEMPLATE : PROTOTIPO
 - DESCRIPTION : MODERN BOOTSTRAP 4 ADMIN TEMPLATE - FULLY RESPONSIVE
 - AUTHOR : SNAZZYSHEET (http://www.snazzysheet.com/)
 - VERSION : 1.0
 - FILE : MAIL COMPOSE JS

 ===================================================================================================*/

$(document).ready(function () {

    //---------------------------------------------------------------------------------------------
    // - MAIL NAV TOGGLE --------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------

    $('#mail-nav-toggle').on('click', function(){
        $(".box-mail .nav").slideToggle();
    });

    //---------------------------------------------------------------------------------------------
    // - SUMMERNOTE INIT --------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------

    $('#summernote').summernote({
        placeholder: 'Compose your new mail',
        minHeight: 350,
        maxHeight: 350
    });

});

