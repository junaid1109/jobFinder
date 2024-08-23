$(document).ready(function () {
    // Create the spinner div
    var spinnerDiv = '<div class="spinner-container"><div class="spinner-border text-primary"></div></div>';
    $('body').append(spinnerDiv);
    // $('.spinner-container').hide();
  });

  function deleteImage(container) {
     // Hide the corresponding image container
     $(container).hide();

     // Reorganize the layout by removing hidden containers
     $('.col.image:visible').each(function (index) {
         // Update the class to reflect the new position
         $(this).removeClass(`image${index}`).addClass(`image${index + 1}`);
     });
  }