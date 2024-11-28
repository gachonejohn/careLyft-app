(function ($) {
  "use strict";

  // PRE LOADER
  $(window).load(function () {
    $(".preloader").fadeOut(1000); // set duration in brackets
  });

  //Navigation Section
  $(".navbar-collapse a").on("click", function () {
    $(".navbar-collapse").collapse("hide");
  });

  // Owl Carousel
  $(".owl-carousel").owlCarousel({
    animateOut: "fadeOut",
    items: 1,
    loop: true,
    autoplay: true,
  });

  // PARALLAX EFFECT
  $.stellar();

  // SMOOTHSCROLL
  $(function () {
    $(".navbar-default a, #home a, footer a").on("click", function (event) {
      var $anchor = $(this);
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $($anchor.attr("href")).offset().top - 49,
          },
          1000
        );
      event.preventDefault();
    });
  });

  // WOW ANIMATION
  new WOW({ mobile: false }).init();
})(jQuery);

document.addEventListener("DOMContentLoaded", () => {
  const profileContainer = document.getElementById("profile-container");
  const avatar = document.getElementById("profile-avatar");
  const fileInput = document.getElementById("file-upload");
  const dropdownMenu = document.getElementById("dropdown-menu");

  // Update Profile Image
  window.updateProfileImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        avatar.src = reader.result; // Update avatar with the uploaded image
      };
      reader.readAsDataURL(file);
    }
  };

  // Logout Functionality
  window.logout = () => {
    alert("Logging out...");
  };

  // Toggle dropdown menu on click (optional for better mobile support)
  profileContainer.addEventListener("click", () => {
    profileContainer.classList.toggle("active");
  });

  // Close menu if clicked outside
  document.addEventListener("click", (e) => {
    if (!profileContainer.contains(e.target)) {
      profileContainer.classList.remove("active");
    }
  });
});
