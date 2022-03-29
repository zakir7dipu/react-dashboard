/*===================================================================================================

 - TEMPLATE : PROTOTIPO
 - DESCRIPTION : MODERN BOOTSTRAP 4 ADMIN TEMPLATE - FULLY RESPONSIVE
 - AUTHOR : SNAZZYSHEET (http://www.snazzysheet.com/)
 - VERSION : 1.0
 - FILE : GALLERY JS

 ===================================================================================================*/

$(document).ready(function () {

    //---------------------------------------------------------------------------------------------
    // - INITIALISATION ---------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------

    $(".gallery-item").click(function(){
        $("#myModal").modal().find(".current").attr("src",$(this).find("img").attr("src"));
    });

});

