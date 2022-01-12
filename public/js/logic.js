    $(".lcnt").hide();

    $('.far').click(function() {
        $(this).toggleClass('fas');
        $(this).toggleClass('far');
    });

    // $(".menu").show();

    var nav=$(".nav");
    var togglecollapse=$(".menu");

    togglecollapse.click(function(){
        nav.toggleClass("collapse")
    });

    