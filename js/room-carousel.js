jQuery(document).ready(function($) {

    // Check slider exists
    if ($("#room-carousel").length === 0) {
        console.log("Slider not found!");
        return;
    }

    console.log("Slider found, initializing...");

    var owl = $("#room-carousel");

    owl.owlCarousel({
        items: 3,
        loop: true,
        margin: 20,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        nav: false,
        dots: false
    });

    $(".btn-next").click(function () {
        owl.trigger("next.owl.carousel");
    });

    $(".btn-prev").click(function () {
        owl.trigger("prev.owl.carousel");
    });

});
